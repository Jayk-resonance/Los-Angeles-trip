import { INITIAL_ITEMS, INITIAL_DECISIONS } from './trip';

// One-time data revision. Keep a snapshot, and preserve user-edited/booked rows.
// This runs before seeding so the retired Carnaval item cannot be reinserted.
export const ITINERARY_REVISION = 'itinerary-revision-2026-10-18';
const EXISTING_ITEM_IDS = ['universal','joshua','joshua-sunset','joshua-morning','return-la','getty','santa-monica','little-tokyo','arts-district','beverly','grove','airport-out'];
export async function applyItineraryRevision(database:D1Database){
 const applied=await database.prepare('SELECT id FROM records WHERE id=?').bind(ITINERARY_REVISION).first();
 if(applied)return;
 const old=await database.prepare("SELECT id,kind,data,author,created,deleted FROM records WHERE kind IN ('item','decision')").all();
 const statements:D1PreparedStatement[]=[];
 for(const value of INITIAL_ITEMS.filter(x=>EXISTING_ITEM_IDS.includes(x.id))){
  statements.push(database.prepare("UPDATE records SET data=json_set(?, '$.done', json(CASE WHEN json_extract(data,'$.done') THEN 'true' ELSE 'false' END)) WHERE id=? AND kind='item' AND author='system' AND deleted=0 AND COALESCE(json_extract(data,'$.status'),'')!='예약 완료' AND NOT EXISTS (SELECT 1 FROM records WHERE id=?)").bind(JSON.stringify(value),value.id,ITINERARY_REVISION));
 }
 statements.push(database.prepare("UPDATE records SET deleted=1 WHERE id='carnaval' AND kind='item' AND author='system' AND deleted=0 AND NOT EXISTS (SELECT 1 FROM records WHERE id=?)").bind(ITINERARY_REVISION));
 for(const value of INITIAL_DECISIONS.filter(x=>['hhn-choice','november-route'].includes(x.id))){
  statements.push(database.prepare("UPDATE records SET data=? WHERE id=? AND kind='decision' AND author='system' AND deleted=0 AND NOT EXISTS (SELECT 1 FROM records WHERE id=?)").bind(JSON.stringify(value),value.id,ITINERARY_REVISION));
 }
 statements.push(database.prepare("INSERT OR IGNORE INTO records (id,kind,data,author,created) VALUES (?,'system',?,'system',?)").bind(ITINERARY_REVISION,JSON.stringify({revision:ITINERARY_REVISION,previous:old.results}),new Date().toISOString()));
 await database.batch(statements);
}
