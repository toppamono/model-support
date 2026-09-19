const STORAGE_KEY="model-support-v1";
let currentStep=1;
let models=[];

const form=document.getElementById("supportForm");
const stepLabel=document.getElementById("stepLabel");
const modelResults=document.getElementById("modelResults");

const manifestationMap={
  "忘れる":["M14"],"始められない":["M12","M28"],"続けられない":["M10","M28"],"止められない":["M11","M09"],
  "切り替えられない":["M08"],"待てない":["M11"],"言えない":["M22","M27"],"拒否":["M06","M28"],
  "固まる":["M06"],"怒る":["M05","M07","M23"],"泣く":["M06","M07"],"逃げる":["M06","M28"],
  "誤解する":["M17","M19"],"決められない":["M26","M23"],"気づかない":["M02","M15","M25"],"分からない":["M13","M16","M19","M30"]
};

async function init(){
  try{
    const res=await fetch("data/models.json");
    models=await res.json();
    const domains=[...new Set(models.map(m=>m.domain))];
    const select=document.getElementById("domainSelect");
    domains.forEach(d=>{const o=document.createElement("option");o.value=d;o.textContent=d;select.appendChild(o);});
  }catch(e){
    modelResults.innerHTML="<p>支援モデルデータを読み込めませんでした。</p>";
  }
  showStep(1);
}

function showStep(n){
  currentStep=Math.max(1,Math.min(5,n));
  document.querySelectorAll(".step").forEach(s=>s.hidden=Number(s.dataset.step)!==currentStep);
  document.querySelectorAll(".steps button").forEach(b=>b.classList.toggle("active",Number(b.dataset.go)===currentStep));
  stepLabel.textContent=`手順 ${currentStep} / 5`;
  document.getElementById("prevStep").disabled=currentStep===1;
  document.getElementById("nextStep").disabled=currentStep===5;
  window.scrollTo({top:document.querySelector("main").offsetTop-10,behavior:"smooth"});
}

function formObject(){
  return Object.fromEntries(new FormData(form).entries());
}

function modelScore(model,data){
  let score=0;
  if(data.domain && model.domain===data.domain) score+=10;
  const mapped=manifestationMap[data.manifestation]||[];
  if(mapped.includes(model.id)) score+=5;
  const text=[data.sceneNote,data.studentVoice,data.schoolVoice,data.homeVoice].filter(Boolean).join(" ");
  for(const token of ["怒り","不安","失敗","負け","切り替","興奮","注意","待","手順","忘","表情","感情","意図","視点","暗黙","会話","距離","断","トラブル","ルール","困","助け","学習","間違","感覚","姿勢"]){
    if(text.includes(token) && (model.name+model.difficulty+model.approach).includes(token)) score+=1;
  }
  return score;
}

function generateModels(){
  const data=formObject();
  if(!data.domain){
    modelResults.innerHTML="<p class='hint'>まず「3 場面差・強み」で中心課題を選択してください。</p>";
    return;
  }
  const ranked=models
    .map(m=>({...m,score:modelScore(m,data)}))
    .filter(m=>m.domain===data.domain)
    .sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
  if(!ranked.length){modelResults.innerHTML="<p>候補がありません。</p>";return;}
  modelResults.innerHTML="<p class='hint'>以下は診断ではなく、検討を始めるための候補です。1位を自動採用せず、観察事実と本人の希望に照らして比較してください。</p>"+
  ranked.map((m,i)=>`<article class="model-card ${i===0?"primary-candidate":""}">
    <div class="model-head"><div><span class="model-id">${m.id}・${m.domain}</span><h3>${m.name}</h3></div><strong>${i===0?"主候補":"関連候補"}</strong></div>
    <dl>
      <dt>中心的な困難</dt><dd>${m.difficulty}</dd>
      <dt>指導の大枠</dt><dd>${m.approach}</dd>
      <dt>評価の方向</dt><dd>${m.evaluation}</dd>
    </dl>
  </article>`).join("");
}

function saveLocal(){
  const payload={savedAt:new Date().toISOString(),data:formObject()};
  localStorage.setItem(STORAGE_KEY,JSON.stringify(payload));
  document.getElementById("saveMessage").textContent="このブラウザ内に保存しました。";
}

function loadLocal(){
  const raw=localStorage.getItem(STORAGE_KEY);
  if(!raw){document.getElementById("saveMessage").textContent="保存記録はありません。";return;}
  const payload=JSON.parse(raw);
  Object.entries(payload.data||{}).forEach(([name,value])=>{
    const el=form.elements.namedItem(name);
    if(el) el.value=value;
  });
  document.getElementById("saveMessage").textContent="保存記録を読み込みました。";
  generateModels();
}

function clearAll(){
  if(!confirm("入力内容とこの画面の表示を初期化しますか？")) return;
  form.reset();
  modelResults.innerHTML="";
  document.getElementById("saveMessage").textContent="";
  showStep(1);
}

document.getElementById("prevStep").addEventListener("click",()=>showStep(currentStep-1));
document.getElementById("nextStep").addEventListener("click",()=>showStep(currentStep+1));
document.querySelectorAll("[data-go]").forEach(b=>b.addEventListener("click",()=>showStep(Number(b.dataset.go))));
document.getElementById("generateModels").addEventListener("click",generateModels);
document.getElementById("saveLocal").addEventListener("click",saveLocal);
document.getElementById("loadLocal").addEventListener("click",loadLocal);
document.getElementById("clearAll").addEventListener("click",clearAll);

init();
