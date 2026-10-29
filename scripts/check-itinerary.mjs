import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import ts from 'typescript';
import { DatabaseSync } from 'node:sqlite';
const temporary=fs.mkdtempSync(path.join(os.tmpdir(),'la-itinerary-'));
try {
 for(const name of ['trip','itinerary-revision','flight-confirmation','shopping-revision']){
  let source=ts.transpileModule(fs.readFileSync(`lib/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  source=source.replace("from './trip'","from './trip.mjs'");
  fs.writeFileSync(path.join(temporary,`${name}.mjs`),source);
 }
 const {INITIAL_ITEMS,INITIAL_DECISIONS,DAYS,BOOKING_GUIDE}=await import(path.join(temporary,'trip.mjs'));
 const {applyItineraryRevision,ITINERARY_REVISION}=await import(path.join(temporary,'itinerary-revision.mjs'));
 const {applyFlightConfirmation,FLIGHT_CONFIRMATION}=await import(path.join(temporary,'flight-confirmation.mjs'));
 assert.equal(new Set(INITIAL_ITEMS.map(x=>x.id)).size,INITIAL_ITEMS.length);
 for(const day of DAYS)assert(INITIAL_ITEMS.some(x=>x.day===day),`Missing ${day}`);
 for(const x of INITIAL_ITEMS){assert(DAYS.includes(x.day));assert(/^([01]\d|2[0-3]):[0-5]\d$/.test(x.time));assert(x.people.length>0);}
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='mickys').status,'후보');
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='universal').day,'2026-11-04');
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='joshua').day,'2026-10-31');
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='joshua-morning').day,'2026-11-01');
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='griffith').day,'2026-11-03');
 assert(!INITIAL_ITEMS.some(x=>x.id==='carnaval'));
 assert.equal(BOOKING_GUIDE.find(x=>x.title==='게티센터').requirement,'무료 시간 지정 예약 필수');
 const sql=new DatabaseSync(':memory:');
 sql.exec('CREATE TABLE records (id TEXT PRIMARY KEY,kind TEXT,data TEXT,author TEXT,created TEXT,deleted INTEGER DEFAULT 0); CREATE TABLE votes (id TEXT PRIMARY KEY,choice TEXT);');
 const insert=sql.prepare('INSERT INTO records (id,kind,data,author,created) VALUES (?,?,?,?,?)');
 for(const x of INITIAL_ITEMS.filter(x=>['universal','joshua','joshua-morning','getty'].includes(x.id)))insert.run(x.id,'item',JSON.stringify({...x,day:'2026-10-30',done:x.id==='universal',status:x.id==='getty'?'예약 완료':x.status}),'system','old');
 insert.run('carnaval','item','{"title":"old carnival"}','system','old');
 insert.run('hhn-choice','decision','{"status":"open"}','system','old');
 insert.run('expense-1','expense','{"amount":25}','user','old');
 insert.run('memory-1','memory','{"text":"keep"}','user','old');
 sql.prepare('INSERT INTO votes VALUES (?,?)').run('vote-1','old vote');
 function prepare(query){return {bind(...args){const s=sql.prepare(query);return{first:async()=>s.get(...args)??null,all:async()=>({results:s.all(...args)}),run:async()=>s.run(...args)}} ,all:async()=>({results:sql.prepare(query).all()})};}
 const database={prepare,batch:async(stmts)=>{sql.exec('BEGIN');try{const result=[];for(const x of stmts)result.push(await x.run());sql.exec('COMMIT');return result;}catch(e){sql.exec('ROLLBACK');throw e;}}};
 await applyItineraryRevision(database);
 const value=id=>JSON.parse(sql.prepare('SELECT data FROM records WHERE id=?').get(id).data);
 assert.equal(value('universal').day,'2026-11-04');assert.equal(value('universal').done,true);
 assert.equal(value('getty').day,'2026-10-30'); // An already-booked row must survive.
 assert.equal(sql.prepare('SELECT deleted FROM records WHERE id=?').get('carnaval').deleted,1);
 assert.equal(value('hhn-choice').status,'closed');
 assert.equal(value('expense-1').amount,25);assert.equal(value('memory-1').text,'keep');
 assert.equal(sql.prepare('SELECT choice FROM votes WHERE id=?').get('vote-1').choice,'old vote');
 assert(value(ITINERARY_REVISION).previous.some(x=>x.id==='carnaval'));
 const edited={...value('universal'),time:'10:15'};sql.prepare('UPDATE records SET data=? WHERE id=?').run(JSON.stringify(edited),'universal');
 await applyItineraryRevision(database);assert.equal(value('universal').time,'10:15');
 for(const x of INITIAL_ITEMS.filter(x=>['flight-out','lax-arrive','flight-back'].includes(x.id))){
  insert.run(x.id,'item',JSON.stringify({...x,status:'후보',note:'previous note',done:true,people:['제우']}),'user','old');
 }
 await applyFlightConfirmation(database);
 assert.equal(value('flight-out').status,'예약 완료');
 assert.equal(value('flight-back').status,'예약 완료');
 assert.equal(value('lax-arrive').status,'계획 확정');
 assert(value('flight-out').note.includes('위탁수하물 1인당 1개'));
 assert(value('flight-back').note.includes('위탁수하물 1인당 2개'));
 assert(value('flight-back').note.includes('11/7'));
 assert(value('flight-out').done);assert.deepEqual(value('flight-out').people,['제우']);
 assert.equal(value(FLIGHT_CONFIRMATION).previous.length,3);
 assert.equal(sql.prepare('SELECT author FROM records WHERE id=?').get('flight-out').author,'user');
 sql.prepare("UPDATE records SET data=json_set(data,'$.note',?) WHERE id=?").run('later user edit','flight-out');
 await applyFlightConfirmation(database);assert.equal(value('flight-out').note,'later user edit');
 assert.equal(value('expense-1').amount,25);assert.equal(value('memory-1').text,'keep');
 console.log(`PASS: ${INITIAL_ITEMS.length} itinerary items, ${INITIAL_DECISIONS.length} decisions; date mapping, booking guidance, data preservation, flight confirmation and idempotent revisions.`);
 const {applyShoppingRevision,SHOPPING_REVISION}=await import(path.join(temporary,'shopping-revision.mjs'));
 for(const id of ['hollywood','los-feliz','grove']){const x=INITIAL_ITEMS.find(v=>v.id===id);insert.run(id,'item',JSON.stringify({...x,time:'old',done:true,people:['승빈']}),'user','old');}
 await applyShoppingRevision(database);
 assert.equal(value('hollywood').time,'14:30');assert(value('hollywood').done);assert.deepEqual(value('hollywood').people,['승빈']);
 assert(value(SHOPPING_REVISION).previous.length===3);
 sql.prepare("UPDATE records SET data=json_set(data,'$.time',?) WHERE id=?").run('15:30','hollywood');
 await applyShoppingRevision(database);assert.equal(value('hollywood').time,'15:30');
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='citadel').day,'2026-10-30');
 assert.deepEqual(INITIAL_ITEMS.find(x=>x.id==='citadel').people,['제우','승빈']);
 assert(!INITIAL_ITEMS.some(x=>x.day==='2026-11-01'&&x.category==='쇼핑'));
 assert.equal(INITIAL_ITEMS.find(x=>x.id==='trader-gifts').day,'2026-11-05');
 console.log('PASS: shopping revision preserves user state and applies once; two Trader Joe visits and Friday Citadel.');
 sql.close();
} finally {fs.rmSync(temporary,{recursive:true,force:true});}
