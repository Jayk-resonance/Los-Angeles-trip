import {INITIAL_ITEMS} from './trip';
export const SHOPPING_REVISION='shopping-revision-2026-10-29';
const IDS=['hollywood','los-feliz','grove'];
// Update the owner's requested fields once; retain participants, completion and authorship.
export async function applyShoppingRevision(database:D1Database){
 if(await database.prepare('SELECT id FROM records WHERE id=?').bind(SHOPPING_REVISION).first())return;
 const previous=await database.prepare("SELECT * FROM records WHERE id IN ('hollywood','los-feliz','grove') AND kind='item'").all();
 const statements=INITIAL_ITEMS.filter(x=>IDS.includes(x.id)).map(x=>database.prepare("UPDATE records SET data=json_patch(data,?) WHERE id=? AND kind='item' AND deleted=0 AND NOT EXISTS (SELECT 1 FROM records WHERE id=?)").bind(JSON.stringify({time:x.time,title:x.title,english:x.english,place:x.place,note:x.note}),x.id,SHOPPING_REVISION));
 statements.push(database.prepare("INSERT OR IGNORE INTO records (id,kind,data,author,created) VALUES (?,'system',?,'system',?)").bind(SHOPPING_REVISION,JSON.stringify({revision:SHOPPING_REVISION,previous:previous.results}),new Date().toISOString()));
 await database.batch(statements);
}
