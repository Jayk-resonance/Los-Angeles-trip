import TripApp from './trip-app';
import {requireChatGPTUser} from './chatgpt-auth';
import {identity,state} from '@/lib/server';
export const dynamic='force-dynamic';
export default async function Home(){await requireChatGPTUser('/');try{const initial=await state(await identity());return <TripApp initial={initial as any}/>;}catch(error){console.error('Trip page unavailable',error);return <main className="opening"><p className="eyebrow">OUR LA STORY</p><h1>잠시 연결을 확인하고 있어요</h1><p>잠시 후 다시 불러와주세요.</p><a className="button" href="/">다시 불러오기</a></main>;}}
