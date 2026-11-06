/**
 * Prompt Bridge secure API bridge for Cloudflare Workers.
 * Required Secrets: OPENAI_API_KEY, APP_TOKEN.
 * Required Variable: ALLOWED_ORIGIN=https://toppamono.github.io
 * Optional Variable: OPENAI_MODEL=gpt-4.1-mini
 * Never paste any real credential into this file or GitHub.
 */
const SYSTEM=[
'You convert Japanese instructions into a clear, faithful English prompt for generative AI. Return ONLY the English prompt.',
'Preserve all requested people, actions, posture, spatial relationships, framing, aspect ratio, and negative constraints.',
'Rewrite hard-to-understand Japanese pose terms using explicit neutral spatial descriptions when reliable.',
'Do not invent ages, clothing, ethnicities, scenery, lighting, art style, lens, emotion or details not provided.',
'Never disguise disallowed content to evade filters. Do not promise error-free image generation.'
].join(' ');
const MODES={
 image:'Format as a compact text-to-image prompt.',
 edit:'Format as direct image-edit instructions. Preserve unmentioned details.',
 general:'Format as actionable, unambiguous general AI instructions.'
};
function j(obj,status,origin){
 return new Response(JSON.stringify(obj),{status,headers:{
  'Content-Type':'application/json; charset=utf-8',
  'Access-Control-Allow-Origin':origin,
  'Cache-Control':'no-store',
  'Vary':'Origin'
 }});
}
export default {
 async fetch(request,env){
  const origin=env.ALLOWED_ORIGIN||'https://toppamono.github.io';
  const supplied=request.headers.get('Origin');
  if(supplied&&supplied!==origin)return j({error:'Origin not allowed'},403,origin);
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:{
    'Access-Control-Allow-Origin':origin,
    'Access-Control-Allow-Headers':'Content-Type, Authorization',
    'Access-Control-Allow-Methods':'POST, OPTIONS',
    'Access-Control-Max-Age':'3600',
    'Vary':'Origin'
  }});
  if(new URL(request.url).pathname!=='/api/convert'||request.method!=='POST')return j({error:'Not found'},404,origin);
  if(!env.OPENAI_API_KEY||!env.APP_TOKEN)return j({error:'Server is not configured'},503,origin);
  if(request.headers.get('Authorization')!=='Bearer '+env.APP_TOKEN)return j({error:'Not authorized'},401,origin);
  if(Number(request.headers.get('Content-Length')||0)>20000)return j({error:'Input too long'},413,origin);
  try{
   const data=await request.json(), japanese=data&&data.japanese,mode=data&&data.mode;
   if(typeof japanese!=='string'||!japanese.trim()||japanese.length>6000||!Object.prototype.hasOwnProperty.call(MODES,mode))
    return j({error:'Invalid prompt or mode'},400,origin);
   const api=await fetch('https://api.openai.com/v1/chat/completions',{
    method:'POST',
    headers:{'Authorization':'Bearer '+env.OPENAI_API_KEY,'Content-Type':'application/json'},
    body:JSON.stringify({model:env.OPENAI_MODEL||'gpt-4.1-mini',messages:[
     {role:'system',content:SYSTEM+'\n'+MODES[mode]},
     {role:'user',content:japanese.trim()}
    ]})
   });
   if(!api.ok)return j({error:'AI API error ('+api.status+')'},502,origin);
   const data2=await api.json();
   const english=data2?.choices?.[0]?.message?.content;
   if(typeof english!=='string'||!english.trim())return j({error:'Empty AI response'},502,origin);
   return j({english:english.trim()},200,origin);
  }catch(err){return j({error:'Conversion failed'},500,origin);}
 }
};
