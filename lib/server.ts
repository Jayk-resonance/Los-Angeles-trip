import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '@/app/chatgpt-auth';
import { INITIAL_ITEMS, INITIAL_DECISIONS, INITIAL_EXPENSES, FAMILY, type RecordRow } from './trip';
import { applyItineraryRevision } from './itinerary-revision';

export class AppError extends Error{constructor(public status:number,message:string){super(message);}}
export function db(){if(!env.DB)throw new AppError(503,'저장소 연결을 확인할 수 없습니다. 잠시 후 다시 시도해주세요.');return env.DB;}
export function bucket(){if(!env.BUCKET)throw new AppError(503,'사진 저장소에 연결할 수 없습니다.');return env.BUCKET;}
export async function identity(){const user=await getChatGPTUser();if(!user)throw new AppError(401,'로그인이 필요합니다.');await db().prepare("INSERT OR IGNORE INTO records (id,kind,data,author,created) VALUES ('site-owner','system','{}',?,?)").bind(user.userId,new Date().toISOString()).run();const owner=await db().prepare("SELECT author FROM records WHERE id='site-owner'").first<{author:string}>();const admin=owner?.author===user.userId;const profile=await db().prepare('SELECT name FROM profiles WHERE user_id = ?').bind(user.userId).first<{name:string}>();return{...user,admin,name:admin?'제우':profile?.name??'',needsProfile:!admin&&!profile};}
export function adminOnly(user:{admin:boolean}){if(!user.admin)throw new AppError(403,'제우님만 변경할 수 있습니다.');}
export function named(user:{name:string}){if(!user.name)throw new AppError(400,'먼저 여행정보에서 이름을 선택해주세요.');}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)throw new AppError(403,'다른 사이트에서의 요청은 허용되지 않습니다.');}
export async function record(id:string,kind?:string){const r=await db().prepare('SELECT * FROM records WHERE id = ? AND deleted = 0').bind(id).first<RecordRow>();if(!r||kind&&r.kind!==kind)throw new AppError(404,'항목을 찾을 수 없습니다. 새로고침해주세요.');return{...r,value:JSON.parse(r.data)};}
export async function seed(){
 await applyItineraryRevision(db());
 const entries=[...INITIAL_ITEMS.map(x=>({kind:'item',value:x})),...INITIAL_DECISIONS.map(x=>({kind:'decision',value:x})),...INITIAL_EXPENSES.map(x=>({kind:'expense',value:x})),{kind:'settings',value:{id:'settings',rate:1400,rateLabel:'임시 환율 · 1 USD = 1,400 KRW',finalized:false}}];
 await db().batch(entries.map(e=>db().prepare('INSERT OR IGNORE INTO records (id,kind,data,author,created) VALUES (?,?,?,?,?)').bind(e.value.id,e.kind,JSON.stringify(e.value),'system','2026-09-15T00:00:00Z')));
}
export async function state(user:Awaited<ReturnType<typeof identity>>){await seed();const [r,v,p]=await Promise.all([db().prepare('SELECT * FROM records WHERE deleted = 0 ORDER BY created DESC').all<RecordRow>(),db().prepare('SELECT decision,user_id AS userId,choice,name FROM votes').all(),db().prepare('SELECT name FROM profiles').all()]);const rows=r.results.map(x=>({...JSON.parse(x.data),id:x.id,author:x.author,created:x.created,kind:x.kind}));return{user:{id:user.userId,name:user.name,email:user.email,admin:user.admin,needsProfile:user.needsProfile},items:rows.filter(x=>x.kind==='item'),decisions:rows.filter(x=>x.kind==='decision'),comments:rows.filter(x=>x.kind==='comment'),expenses:rows.filter(x=>x.kind==='expense'),memories:rows.filter(x=>x.kind==='memory'),settings:rows.find(x=>x.kind==='settings'),votes:v.results,usedNames:['제우',...p.results.map((x:any)=>x.name)]};}
export async function insert(kind:string,value:any,author:string){await db().prepare('INSERT INTO records (id,kind,data,author,created) VALUES (?,?,?,?,?)').bind(value.id,kind,JSON.stringify(value),author,new Date().toISOString()).run();}
export function result(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}
export function failure(error:unknown){if(error instanceof AppError)return result({error:error.message},error.status);if(error instanceof Error&&error.name==='ZodError')return result({error:'입력한 날짜·금액·필수 항목을 확인해주세요.'},400);console.error('Trip operation failed',error);return result({error:'저장하지 못했습니다. 입력 내용을 유지했으니 다시 시도해주세요.'},500);}
