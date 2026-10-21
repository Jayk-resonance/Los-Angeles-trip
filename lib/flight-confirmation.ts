import {INITIAL_ITEMS} from './trip';

export const FLIGHT_CONFIRMATION='flight-confirmation-2026-10-22';
const IDS=['flight-out','lax-arrive','flight-back'];

// Apply the owner's ticket confirmation once to existing records as well as seeds.
// Retain completion flags, participants, authorship, deletion state and a snapshot.
export async function applyFlightConfirmation(database:D1Database){
 const applied=await database.prepare('SELECT id FROM records WHERE id=?').bind(FLIGHT_CONFIRMATION).first();
 if(applied)return;
 const previous=await database.prepare("SELECT id,kind,data,author,created,deleted FROM records WHERE id IN ('flight-out','lax-arrive','flight-back') AND kind='item'").all();
 const statements:D1PreparedStatement[]=INITIAL_ITEMS.filter(x=>IDS.includes(x.id)).map(item=>
  database.prepare("UPDATE records SET data=json_patch(data,?) WHERE id=? AND kind='item' AND deleted=0 AND NOT EXISTS (SELECT 1 FROM records WHERE id=?)")
   .bind(JSON.stringify({day:item.day,time:item.time,english:item.english,status:item.status,note:item.note}),item.id,FLIGHT_CONFIRMATION)
 );
 statements.push(database.prepare("INSERT OR IGNORE INTO records (id,kind,data,author,created) VALUES (?,'system',?,'system',?)")
  .bind(FLIGHT_CONFIRMATION,JSON.stringify({revision:FLIGHT_CONFIRMATION,previous:previous.results}),new Date().toISOString()));
 await database.batch(statements);
}
