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

const themeLibrary={
  "不登校／登校しぶり":[
    {title:"不安・見通し",goal:"不安の強さやきっかけを整理し、参加しやすい条件を探す",materials:["ヒーローワーク"]},
    {title:"援助要請",goal:"困ったときに、誰に・いつ・どう助けを求めるかを整理する",materials:["援助要請ワーク","ヘルプカード"]}
  ],
  "学習":[
    {title:"学習への取り組み",goal:"始め方・続け方・分からない時の対応を具体化する",materials:["援助要請ワーク","ヘルプカード"]},
    {title:"注意・実行機能",goal:"注意を戻す、手順を見通す、開始するための手掛かりを探す",materials:["忍者ワーク"]}
  ],
  "対人関係":[
    {title:"他者理解・社会認知",goal:"相手の気持ちや意図を一つに決めつけず、複数の見方を持つ",materials:["SST心情理解","トラブルをのりこえよう"]},
    {title:"対人トラブル対応",goal:"事実・気持ち・選択肢を分け、対応方法を比較する",materials:["トラブルをのりこえよう"]}
  ],
  "生活習慣":[
    {title:"見通し・手順",goal:"やることを分け、順番・開始・終了を見える形にする",materials:["教材候補は詳細確認後に選択"]},
    {title:"自己管理・援助要請",goal:"自分だけで抱えず、確認や助けを使う方法を作る",materials:["援助要請ワーク","ヘルプカード"]}
  ],
  "情緒":[
    {title:"感情・自己調整",goal:"感情の強さや身体のサインに気づき、落ち着く方法を選ぶ",materials:["ヒーローワーク","怒りのヨロイ攻略作戦"]},
    {title:"ことばと気持ちの調整",goal:"強い気持ちのときの言葉や伝え方を整理する",materials:["チクチク言葉攻略作戦"]}
  ],
  "行動":[
    {title:"停止・行動調整",goal:"すぐ動く前に、止まる・確認する・選ぶ流れを作る",materials:["忍者ワーク"]},
    {title:"感情・自己調整",goal:"行動の前後にある感情や高まりに気づき、対処を選ぶ",materials:["ヒーローワーク","怒りのヨロイ攻略作戦"]}
  ],
  "その他":[
    {title:"自己理解",goal:"得意・苦手、困る条件、うまくいく条件を整理する",materials:["教材候補は詳細確認後に選択"]},
    {title:"援助要請",goal:"困りに気づき、必要な支援を選んで伝える",materials:["援助要請ワーク","ヘルプカード"]}
  ]
};

function collectConcerns(data){
  return [data.studentConcern,data.schoolConcern,data.homeConcern].filter(Boolean);
}

function chooseThemes(data){
  const concerns=collectConcerns(data);
  const first=concerns[0]||"その他";
  const second=concerns.find(c=>c!==first)||first;
  const a=(themeLibrary[first]||themeLibrary["その他"])[0];
  const bSource=themeLibrary[second]||themeLibrary["その他"];
  let b=bSource.find(x=>x.title!==a.title)||bSource[1]||themeLibrary["その他"][1];
  return [a,b];
}

function renderThemeCards(){
  const box=document.getElementById("themeCards");
  if(!box) return;
  const data=formObject();
  const themes=chooseThemes(data);
  const labels=["テーマA","テーマB"];
  box.innerHTML=themes.map((t,i)=>`
    <article class="theme-card">
      <div class="theme-kicker">${labels[i]}</div>
      <h3>${t.title}</h3>
      <p class="theme-goal">${t.goal}</p>
      <div class="material-block">
        <div class="material-label">使用教材</div>
        <ul>${t.materials.map(m=>`<li>${m}</li>`).join("")}</ul>
      </div>
    </article>
  `).join("");
}

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
  if(currentStep===2) renderThemeCards();
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
    modelResults.innerHTML="<p class='hint'>まず「3 詳細確認」で中心課題を選択してください。</p>";
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
document.getElementById("refreshThemes")?.addEventListener("click",renderThemeCards);
document.getElementById("saveLocal").addEventListener("click",saveLocal);
document.getElementById("loadLocal").addEventListener("click",loadLocal);
document.getElementById("clearAll").addEventListener("click",clearAll);

init();
