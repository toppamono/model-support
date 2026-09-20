const STORAGE_KEY="model-support-prototype-v3";

const DOMAINS=[
 ["A","自己理解・自己決定"],["B","感情認識・心理的安定"],["C","行動・自己調整"],["D","注意・学習参加"],
 ["E","実行機能・生活管理"],["F","言語理解・自己表現"],["G","他者理解・社会認知"],["H","対人関係・集団参加"],
 ["I","援助要請・セルフアドボカシー"],["J","読み書き・学習アクセス"],["K","数・推論・学習方略"],["L","感覚・身体・健康生活"]
];

const TOPIC_ROWS=`
T-A01|A|得意・苦手と成功条件の理解|自己特性把握困難型
T-A02|A|自分の特性と困難の理解|自己特性把握困難型
T-A03|A|現実的な自己評価と振り返り|自己評価ずれ型
T-A04|A|自己効力感と目標選択|自己効力感低下型
T-B01|B|感情語彙・強度・身体サイン|感情認識困難型
T-B02|B|怒り・いらだちへの対処|怒り即時反応型
T-B03|B|不安・緊張・見通しへの対処|不安・回避型
T-B04|B|失敗・負け・誤りの受容|失敗・負け受容困難型
T-B05|B|変化・切替・回復|切り替え困難型
T-C01|C|反応抑制と一度止まる行動|衝動反応型
T-C02|C|待機・順番・行動ペース|衝動反応型
T-C03|C|声量・活動量・場面適合|興奮調整困難型
T-D01|D|重要な情報への注意選択|注意持続困難型
T-D02|D|注意・集中の持続|注意持続困難型
T-D03|D|注意の切替・課題への復帰|注意持続困難型
T-D04|D|課題開始・学習態勢|課題開始困難型
T-E01|E|指示保持・ワーキングメモリ|指示保持・外部手掛かり支援
T-E02|E|手順化・計画・見通し|見通し・手順形成困難型
T-E03|E|時間・期限・ペース管理|管理・忘却型
T-E04|E|持ち物・整理・提出・確認|管理・忘却型
T-F01|F|口頭指示・説明の理解|口頭指示・理解確認支援
T-F02|F|語彙・概念・曖昧表現の理解|語彙・概念理解支援
T-F03|F|出来事の整理・説明|出来事整理・説明支援
T-F04|F|気持ち・考え・希望の表現|自己表現支援
T-G01|G|表情・視線・声などの手掛かり|表情・手掛かり把握型
T-G02|G|他者感情の推測|他者感情推測困難型
T-G03|G|他者意図・複数解釈|他者意図単一解釈型
T-G04|G|視点取得・場面文脈・暗黙ルール|視点取得困難型
T-H01|H|関わりの開始・応答・会話往復|会話一方向型
T-H02|H|距離感・境界・拒否サイン|距離感調整困難型
T-H03|H|自己主張・断り・交渉・折り合い|自己主張困難型
T-H04|H|トラブル整理・相談・関係修復|トラブル対応困難型
T-H05|H|ルール・役割・協力・集団参加|ルール・勝敗調整困難型
T-I01|I|困り・限界・援助時点への気づき|困りへの気づき不足型
T-I02|I|援助者・方法・内容の選択|援助方法選択困難型
T-I03|I|援助要請の実行と支援の調整|援助実行困難型
T-J01|J|音韻・文字対応・読みの基礎|音韻・文字対応支援
T-J02|J|読みの正確さ・流暢性|読みの正確さ・流暢性支援
T-J03|J|読解・要点・情報検索|読解・情報整理支援
T-J04|J|書字・綴り・漢字|書字・文字構成支援
T-J05|J|作文・メモ・代替入力・読み上げ|文章構成・代替手段支援
T-K01|K|数概念・計算手続|数概念・計算手順支援
T-K02|K|文章題・空間・因果・推論|関係図・推論支援
T-K03|K|学習方略選択・自己モニタリング|学習方略未形成型
T-L01|L|感覚特性の理解・環境調整|感覚調整型
T-L02|L|覚醒・姿勢・休憩・疲労調整|身体・覚醒調整型
T-L03|L|粗大・微細運動・協調・道具操作|動作・道具操作支援
T-L04|L|生活リズム・身辺・健康自己管理|健康生活・自己管理支援
`;

const TOPICS=TOPIC_ROWS.trim().split("\n").map(row=>{
  const [id,domainId,name,model]=row.split("|");
  return {id,domainId,name,model};
});

const STAGES=[
 {name:"方法をまだ知らない",method:"必要な言葉・方法・選択肢を明示し、短い見本を示す。",evaluation:"方法を知り、選べたか。"},
 {name:"意味・手順の理解を確かめたい",method:"具体例・対比例・見える因果関係で意味や手順を確認する。",evaluation:"理由やつながりを自分なりに説明できたか。"},
 {name:"場面に合う方法を選びにくい",method:"選択肢を2～3個に絞り、場面の手掛かりと根拠を比べる。",evaluation:"手掛かりを使って方法を選べたか。"},
 {name:"分かっていても行動に移しにくい",method:"短い合図、環境調整、反復で実行までの橋渡しをする。",evaluation:"練習または実場面で行動に移せたか。"},
 {name:"結果を振り返り、方法を見直しにくい",method:"予想・行動・結果を記録で比較し、次の作戦を選ぶ。",evaluation:"結果を根拠に方法を修正できたか。"},
 {name:"別の場面では使いにくい",method:"人・場所・課題を一つずつ変え、共通する合図を残す。",evaluation:"異なる場面で同じ方法を使えたか。"},
 {name:"まだ判断できない",method:"技能訓練を急がず、追加観察と本人への確認を優先する。",evaluation:"次に確認すべき条件が具体化したか。"}
];
const SUPPORTS=[
 {name:"自力で安定してできる",method:"支援を減らし、自己選択と別場面への般化を中心にする。"},
 {name:"軽い手掛かりがあればできる",method:"共通の短い合図を使い、徐々に自己合図へ移す。"},
 {name:"選択肢があればできる",method:"選択肢を2～3個に絞り、選んだ理由を確認する。"},
 {name:"教師と一緒ならできる",method:"共同実行から役割を少しずつ本人へ移す。"},
 {name:"モデル提示・反復でできる",method:"見本→模倣→即時フィードバックを短く繰り返す。"},
 {name:"現時点では難しい",method:"技能訓練より安全・環境調整・代替手段を優先する。"}
];
const WISHES=[
 {name:"困っており、変えたいことが明確",method:"本人の目標を入口にし、方法を共同選択する。"},
 {name:"困っているが、どうしたいか曖昧",method:"困り場面を整理し、選べる小目標を示す。"},
 {name:"少し困り感がある",method:"本人にとっての利点が見える短い試行から始める。"},
 {name:"困り感は少ないが提案には応じる",method:"実験・比較として提案し、継続は本人の反応で判断する。"},
 {name:"周囲の困り感が中心",method:"本人への指導前に、環境調整と周囲の期待の妥当性を検討する。"},
 {name:"判断できない／未確認",method:"観察だけで推測せず、理解可能な方法で本人に確認する。"}
];

const DOMAIN_GOALS={
 A:"自分の得意・苦手と役立つ条件を理解し、自分に合う方法や目標を選べるようになる。",
 B:"自分の気持ちや体の変化に気づき、安心して活動するための対処方法を使えるようになる。",
 C:"場面に応じて一度立ち止まり、自分の言動や行動のペースを調整できるようになる。",
 D:"自分に合う手掛かりや環境を使い、必要な学習活動に取り組み、注意を向け直せるようになる。",
 E:"見通しや記録などの手掛かりを使い、学習や生活の手順・時間・持ち物を管理できるようになる。",
 F:"伝えられた内容を理解し、自分の気持ち・考え・希望を相手に伝えられるようになる。",
 G:"相手の表情・言動や場面を手掛かりに、自分とは異なる気持ちや考えを捉えられるようになる。",
 H:"相手とやり取りしながら、自分の希望と相手の立場を調整して活動に参加できるようになる。",
 I:"自分の困りに気づき、必要な相手に合う方法で支援を求め、支援の内容を調整できるようになる。",
 J:"自分に合う読み書きの方法や代替手段を使い、学習内容を理解し表現できるようになる。",
 K:"数量や情報の関係を整理し、自分に合う方法を選んで課題に取り組めるようになる。",
 L:"感覚や体の状態に合った環境・道具・調整方法を使い、無理なく生活や学習に参加できるようになる。 "
};

const PLAN_OVERRIDES={
 "T-B02":{
  short:"怒りの初期サインに気付き、止まる、離れる、伝えるなどの対処を一つ実行できる。",
  method:"怒り温度計、停止合図、対処選択表を使い、落ち着いた短い場面から反復する。",
  check:"初期サインに気づくか、合図や環境調整で停止時間を作れるか。",
  evals:["教師の合図で一度止まり、対処カードから方法を選んだ。","身体サインに気付き、言葉の促しなしで決めた対処を行った。","実際のトラブルで反応前に距離を取り、必要な支援を求めた。"]
 },
 "T-B03":{
  short:"不安の原因と必要な情報・支援を選び、合意した小さな範囲で活動に参加できる。",
  method:"不安の分解、見通し表、参加レベル、戻れる場所を本人と事前に決める。",
  check:"何が分かれば試せるか、予告・見通し・退避手段で参加が変わるか。",
  evals:["見通しを確認し、参加方法を教師と選んだ。","不安の理由と必要な支援を伝え、自分で選んだ範囲に参加した。","予定外の場面でも確認事項を自分から尋ね、参加方法を調整した。"]
 },
 "T-B05":{
  short:"予定変更や活動終了時に、予告と移行手順を使って次の活動へ移り、落ち着きを取り戻せる。",
  method:"残り時間・量、変更カード、終了ルーティン、次の一歩を一貫した形で示す。",
  check:"予告の時点、残り量の可視化、選択可能な範囲で切替が変わるか。",
  evals:["予告後、終了手順を確認して次の活動へ移った。","残量表示を見て自分から片付けを始めた。","急な変更時も変更点を確認し、自分で回復方法を使った。"]
 },
 "T-C01":{
  short:"刺激に反応する前に一度停止し、状況を確認して代わりの行動を選べる。",
  method:"GO・STOP課題、短い自己合図、代替行動カードを低負荷場面から練習する。",
  check:"短い合図、待ち時間の可視化、代替行動で成功率が変わるか。",
  evals:["教師の停止合図で動きを止め、二つの行動から一つを選んだ。","自分で合図を使って停止し、場面に合う行動へ切り替えた。","学級の刺激場面で一度止まり、確認してから行動した。"]
 },
 "T-C02":{
  short:"待つ時間や順番を見える手掛かりで確認し、合意した範囲で待機・交代できる。",
  method:"順番表示、待ち時間タイマー、発言チップ、待つ間の代替行動を用意する。",
  check:"短い合図、待ち時間の可視化、代替行動で成功率が変わるか。",
  evals:["順番カードと教師の合図を使い、一回分の順番を待った。","タイマーを自分で確認し、促しなしで交代まで待機した。","集団活動で順番を確認し、必要時は待てる時間を相談した。"]
 },
 "T-D01":{
  short:"複数の刺激の中から、教師の話、教材、開始合図など必要な情報へ注意を向けられる。",
  method:"見る・聞く対象を短く明示し、要点マーク、指差し、座席・刺激調整を比較する。",
  check:"課題時間・量、環境刺激、戻る合図のどれで遂行が変わるか。",
  evals:["教師の指差しで見る場所を確認し、開始合図を捉えた。","自分で要点マークを使い、必要な情報を見つけた。","通常の授業で話者や板書へ注意を向け、要点を自分から確認した。"]
 },
 "T-D02":{
  short:"自分に合う調整方法を使い、合意した時間または課題量まで取り組める。",
  method:"短い区切り、タイマー、残量表示、休憩、刺激調整を比較し、本人が作戦を選ぶ。",
  check:"課題時間・量、環境刺激、戻る合図のどれで遂行が変わるか。",
  evals:["教師と選んだタイマーを使い、三分間課題を続けた。","注意がそれても戻る合図を自分で使い、決めた量を終えた。","在籍学級で必要な作戦を準備し、課題時間を自分で調整した。"]
 },
 "T-D03":{
  short:"注意がそれたことに気付き、共通の合図や復帰手順を使って課題へ戻れる。",
  method:"復帰カード、作業位置マーカー、短い自己チェックを使い、戻る行動を固定する。",
  check:"課題時間・量、環境刺激、戻る合図のどれで遂行が変わるか。",
  evals:["教師の合図で作業位置を確認し、課題へ戻った。","注意がそれた後、自分で復帰カードを見て作業を再開した。","学級の長い課題でも、自発的に位置を確認して復帰した。"]
 },
 "T-D04":{
  short:"開始合図後、必要な準備と最初の一歩を確認し、合意した時間内に課題へ着手できる。",
  method:"開始チェック、まず一問、選択式の開始方法、姿勢・机上環境の調整を使う。",
  check:"課題分解、選択、開始合図、不安調整のどれで着手が変わるか。",
  evals:["教師と開始チェックを行い、一分以内に最初の問題へ取り組んだ。","自分で準備を確認し、声掛けなしで課題を始めた。","授業開始時に必要物を整え、自分から最初の活動へ移った。"]
 },
 "T-H04":{
  short:"安全を確保し、事実・解釈・感情を分けて相談し、必要な説明・修復・再調整を選べる。",
  method:"トラブル整理シート、相談先一覧、修復方法カードを使い、謝罪の強制はしない。",
  check:"高ぶり、出来事整理、相手視点、謝罪・相談のどこで止まるか。",
  evals:["教師と場面を振り返り、起きた事実を一つ選んだ。","事実と自分の解釈を分けて相談し、修復方法を一つ実行した。","学級のトラブルで早い段階に相談し、再参加を調整した。"]
 },
 "T-I01":{
  short:"止まっている、分からない、負荷が高いなど、自分に援助が必要な時点を捉えられる。",
  method:"身体・課題進行の自己チェック、援助の目安、早めに求めた結果の比較を行う。",
  check:"止まっている、分からない、負荷が高いなどのサインを選べるか。",
  evals:["教師の質問で、自分が困っている状態を選んだ。","自己チェックを使い、援助が必要な時点を判断した。","学級で負荷が高まる前に気付き、自分から相談へ移った。"]
 },
 "T-I02":{
  short:"困りの種類に応じて、誰に、どの方法で、何を求めるかを選べる。",
  method:"援助者マップ、方法カード、依頼内容の話型を用い、場面別に組み合わせる。",
  check:"相手選び、手段選び、依頼内容の具体化のどこが難しいか。",
  evals:["選択肢から援助者と方法を選んだ。","場面に合う援助内容を組み立て、理由とともに説明した。","校内で適切な相手を自分で選び、必要な情報を添えて依頼した。"]
 },
 "T-I03":{
  short:"口頭・カード・文字・ICT等で援助を求め、提案された支援への意思や修正希望を伝えられる。",
  method:"ヘルプカード、短い依頼文、非音声手段を常備し、受けた支援の有効性も確認する。",
  check:"カード・合図・事前予約など、言葉以外の入口で実行が変わるか。",
  evals:["ヘルプカードを教師に渡し、必要な援助内容を選んだ。","自分から援助を求め、提案された方法への可否を伝えた。","学級で援助要請を実行し、合わない支援には別の方法を提案した。"]
 }
};

const MATERIAL_ROWS=`
発達障害の子の気持ちの聞き方・伝え方|完成|T-F04,T-H01,T-H02,T-H03,T-I02,T-I03
9人9色なこどもたち|制作中|T-A01,T-A02,T-B01,T-G04
ぼくのニセモノをつくるには（ヨシタケシンスケ）|制作中|T-A01,T-A04
星と虹色なこどもたち（星山麻木）|完成|T-A01,T-A02,T-G04
アンガーマネージメントカード|制作中|T-B01,T-B02
ヒーローワーク|制作中|T-B02,T-B03,T-B04
みんなの怒りスイッチをさがせ！|完成|T-B01,T-B02
感情を乗り越えよう|完成|T-B02,T-B03,T-B04
攻略! きみのストレスを発見せよ!|完成|T-B01,T-B03,T-A02
となりのきもち|制作中|T-B01,T-G01,T-G02
5分で学ぶ心理学|完成|T-A02,T-B03,T-G03
かえるカード|完成|T-A04,T-B03,T-B04
こころの授業|完成|T-A04,T-B01,T-B03
こころの傷つきを経験したあなたのためのワークブック|完成|
学校ゲーム化計画|制作中|T-D04,T-A04
今日のひと言|制作中|T-A04,T-F04
人生から学ぼう|制作中|T-A04,T-G04
SSTワークシート（自己認知・コミュニケーションスキル編）|制作中|T-A01,T-F04,T-G01,T-G02,T-H01,T-H02
さいころインタビュー|完成|T-F04,T-H01
なかよしスキルアップ|制作中|T-H01,T-H03,T-H05
会話を楽しもう|制作中|T-H01,T-F04
算数と国語を同時に伸ばすパズル|完成|T-K02,T-J03
10分間プレゼンチャレンジ|完成|T-F03,T-F04,T-H03
SST絵カード|制作中|T-G01,T-G02,T-G03,T-H02,T-H03,T-H04
こんなときどうする？|制作中|T-G02,T-G03,T-H03,T-H04,T-H05,T-I02
トラブルを乗り越えよう|制作中|T-H04,T-G03,T-B02
りんごかもしれない（ヨシタケシンスケ）|完成|T-G03,T-G04
考え、議論したくなる！道徳授業教材プリント 小学校編|完成|T-G02,T-G03,T-G04,T-H03
本音で考えよう|制作中|T-G03,T-G04,T-H03
SSTワークシート（社会的行動編）|制作中|T-C02,T-C03,T-H03,T-H05
聞き取りワークシート|制作中|T-E01,T-F01,T-D01
きくきくドリル|制作中|T-D01,T-D02,T-E01,T-F01
忍者ワーク|制作中|T-D01,T-D02,T-D03,T-C01,T-C02
聞き取り正誤問題|制作中|T-D01,T-E01,T-F01
○○めいろ（図工）|完成|T-L03,T-E02,T-D02
不思議な部屋（図工）|完成|T-L03,T-E02
平面構成シート（図工）|完成|T-L03,T-D02,T-E02
思考の順番ワーク|制作中|T-E02,T-D04
リズムトレーニング|制作中|T-L02,T-L03
体幹トレーニング|制作中|T-L02,T-L03
1分間スピーチ|制作中|T-F03,T-F04
がにでを練習ワーク［ことばのテーブル］|完成|T-F02,T-J03
コロロ発達療育センター|完成|T-F02,T-J01,T-J04
ちびむすドリル|完成|T-J01,T-J02,T-J04,T-K01
ひらがなカード|制作中|T-J01,T-F02
舌のトレーニング|制作中|
連語練習ワーク［ことばのテーブル］|完成|T-F02,T-F03,T-J03
４コマ作文|制作中|T-F03,T-J05
あいうえお表|完成|T-J01,T-J04
おはなし読解ワーク［ことばのテーブル］|完成|T-J03,T-F02
お話づくり|完成|T-F03,T-J05
グレーゾーンの児童のための作文プリント|完成|T-J05,T-F03
しりとりワーク|完成|T-F02,T-J01
漢字コグトレ|完成|T-J04,T-D01
公文式新漢字おけいこ|完成|T-J04
小学校6年生までに作文力が身につく本|完成|T-J05,T-F03
読解力をつけることばパズル|完成|T-F02,T-J03,T-K02
アインシュタイン式論理脳ドリル|完成|T-K02,T-E02
はじめての論理国語（1～3年）|完成|T-J03,T-K02
算数 総まとめ|完成|T-K01,T-K03
算数つまずき位置チェック|制作中|T-K01,T-K03
早とちりクイズ|制作中|T-C01,T-D01,T-E01,T-F01
実行機能力ステップアップワークシート|完成|T-D04,T-E02,T-E03,T-E04,T-B05,T-I03
SSTワークシート 社会的行動編|完成|T-C02,T-C03,T-H03,T-H05,T-B04
SSTワークシート2 自己認知・コミュニケーションスキル編|完成|T-A01,T-F04,T-G01,T-G02,T-G03,T-H01,T-H02
レンゾクゾクゾクパターンアート（図工）|制作中|T-L03,T-D02,T-E02
あなたの願いを教えてね|完成|T-A01,T-A03,T-A04,T-F04
カードゲーム各種|完成|
気持ちのワーク（1～3年）|完成|T-B01,T-F04,T-G01,T-G02
からだ遊び|制作中|T-L03,T-L02
振り返り：できた条件と次の一歩|活動案・未実践|T-A03,T-A04,T-K03
助けを求める練習：困り・相手・伝え方|活動案・未実践|T-I01,T-I02,T-I03,T-F04
できる環境を探す：道具・場所・休み方|活動案・未実践|T-L01,T-L02,T-L04,T-D02,T-D03,T-A02,T-J05
教室で使ってみる：学んだ方法の橋渡し|活動案・未実践|
`;

const MATERIALS=MATERIAL_ROWS.trim().split("\n").map((row,i)=>{
  const [name,status,topicText]=row.split("|");
  return {id:"m"+i,name,status,topics:(topicText||"").split(",").filter(Boolean)};
});

const MATERIAL_PRIORITY={
 "T-D02":{"忍者ワーク":40,"きくきくドリル":28,"できる環境を探す：道具・場所・休み方":22,"○○めいろ（図工）":8,"平面構成シート（図工）":6,"レンゾクゾクゾクパターンアート（図工）":5},
 "T-C01":{"忍者ワーク":40,"早とちりクイズ":30},
 "T-B02":{"ヒーローワーク":40,"みんなの怒りスイッチをさがせ！":30,"アンガーマネージメントカード":24,"感情を乗り越えよう":18},
 "T-I01":{"助けを求める練習：困り・相手・伝え方":35},
 "T-I02":{"発達障害の子の気持ちの聞き方・伝え方":35,"助けを求める練習：困り・相手・伝え方":30},
 "T-I03":{"発達障害の子の気持ちの聞き方・伝え方":35,"助けを求める練習：困り・相手・伝え方":30}
};

const CATEGORY_SUGGESTIONS={
 "不登校／登校しぶり":["T-B03","T-B05","T-I03","T-A02"],
 "学習":["T-D02","T-D04","T-E01","T-E02","T-K03"],
 "対人関係":["T-G02","T-G03","T-G04","T-H03","T-H04"],
 "生活習慣":["T-E03","T-E04","T-L04"],
 "情緒":["T-B01","T-B02","T-B03","T-B04","T-B05"],
 "行動":["T-C01","T-C02","T-C03","T-D03"],
 "読み書き":["T-J01","T-J02","T-J03","T-J04","T-J05"],
 "その他":["T-A02","T-F04","T-I01"]
};

const state={
 screen:"consult",
 activeTask:0,
 consultation:{
  grade:"",sex:"",diagnosis:"",teacherRelation:"未確認",
  studentConcern:"",studentVoice:"",schoolConcern:"",schoolVoice:"",homeConcern:"",homeVoice:""
 },
 tasks:[emptyTask(),emptyTask()],
 drafts:[{},{}],
 selectedMaterials:[[],[]]
};

function emptyTask(){return {domain:"",topic:"",stage:"",support:"",wish:"",context:""};}
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]));
function domainName(id){return DOMAINS.find(d=>d[0]===id)?.[1]||"";}
function topic(id){return TOPICS.find(t=>t.id===id);}
function gradeBand(){const g=Number(state.consultation.grade);return g<=2?"低":g<=4?"中":"高";}

function syncConsultationFromInputs(){
 ["grade","sex","diagnosis","teacherRelation","studentConcern","studentVoice","schoolConcern","schoolVoice","homeConcern","homeVoice"].forEach(k=>{
  state.consultation[k]=$(k).value;
 });
}
function syncInputsFromConsultation(){
 Object.entries(state.consultation).forEach(([k,v])=>{if($(k))$(k).value=v||"";});
}

function showScreen(name){
 state.screen=name;
 $("consultScreen").hidden=name!=="consult";
 $("planScreen").hidden=name!=="plan";
 document.querySelectorAll("[data-screen]").forEach(b=>b.classList.toggle("active",b.dataset.screen===name));
 if(name==="plan"){renderPlanner();renderResults();renderSuggestions();}
 window.scrollTo({top:0,behavior:"smooth"});
}

function suggestions(){
 const c=state.consultation;
 const ids=[];
 [c.studentConcern,c.schoolConcern,c.homeConcern].filter(Boolean).forEach(x=>(CATEGORY_SUGGESTIONS[x]||[]).forEach(id=>ids.push(id)));
 const text=[c.studentVoice,c.schoolVoice,c.homeVoice].join(" ");
 const kw=[
  [/集中|注意|ぼーっと|それる/,["T-D02","T-D03","T-D01"]],
  [/衝動|すぐ言|飛び出|待て|割り込/,["T-C01","T-C02"]],
  [/怒|イライラ|かっと/,["T-B02"]],
  [/不安|怖|心配|登校/,["T-B03"]],
  [/切り替|終われ|変更/,["T-B05"]],
  [/始め|取り掛|着手/,["T-D04"]],
  [/手順|見通し|順番/,["T-E02"]],
  [/忘れ|持ち物|提出/,["T-E04"]],
  [/友達|トラブル|けんか/,["T-H04","T-G03"]],
  [/助け|聞け|質問|相談/,["T-I01","T-I02","T-I03"]],
  [/読む|読解/,["T-J02","T-J03"]],
  [/書く|漢字|作文/,["T-J04","T-J05"]]
 ];
 kw.forEach(([re,list])=>{if(re.test(text))list.forEach(id=>ids.push(id));});
 return [...new Set(ids)].slice(0,8).map(topic).filter(Boolean);
}

function renderSuggestions(){
 const s=suggestions();
 $("suggestedTopics").innerHTML=s.length?s.map(t=>`<button type="button" data-suggest-topic="${t.id}">${esc(t.name)}</button>`).join(""):'<span class="empty">相談記述から候補を絞れませんでした。48分類から選択してください。</span>';
}

function renderPlanner(){
 const c=state.consultation,t=state.tasks[state.activeTask];
 $("profileSummary").textContent=c.grade?["小学"+c.grade+"年",c.sex,c.diagnosis].filter(Boolean).join(" · "):"学年未入力";
 [0,1].forEach(i=>{
  const tab=$("taskTab"+i),tt=state.tasks[i],tp=topic(tt.topic);
  tab.classList.toggle("active",i===state.activeTask);
  tab.querySelector("span").textContent=tp?tp.name:"未設定";
 });
 $("domainSelect").innerHTML='<option value="">領域を選択</option>'+DOMAINS.map(d=>`<option value="${d[0]}">${esc(d[1])}</option>`).join("");
 $("domainSelect").value=t.domain;
 const list=TOPICS.filter(x=>x.domainId===t.domain);
 $("topicSelect").innerHTML='<option value="">具体的な課題を選択</option>'+list.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join("");
 $("topicSelect").value=t.topic;
 $("topicSelect").disabled=!t.domain;
 $("stageSelect").innerHTML='<option value="">観点を選択</option>'+STAGES.map((x,i)=>`<option value="${i}">${esc(x.name)}</option>`).join("");
 $("supportSelect").innerHTML='<option value="">支援量を選択</option>'+SUPPORTS.map((x,i)=>`<option value="${i}">${esc(x.name)}</option>`).join("");
 $("wishSelect").innerHTML='<option value="">本人の認識を選択</option>'+WISHES.map((x,i)=>`<option value="${i}">${esc(x.name)}</option>`).join("");
 $("stageSelect").value=t.stage;$("supportSelect").value=t.support;$("wishSelect").value=t.wish;$("contextNote").value=t.context;
}

function defaultPlan(tp,task,index){
 const override=PLAN_OVERRIDES[tp.id]||{};
 const stage=STAGES[task.stage]||STAGES[6],support=SUPPORTS[task.support]||SUPPORTS[3],wish=WISHES[task.wish]||WISHES[5];
 const longGoal=DOMAIN_GOALS[tp.domainId]||"本人の実態に合う方法を選び、学校生活で使えるようになる。";
 const short=override.short||`「${tp.name}」について、本人に合う手掛かりを使い、目標とする行動を一つ実行できる。`;
 const baseMethod=override.method||`「${tp.name}」を、具体的な場面・見本・選択肢を使って小さく練習する。`;
 const method=[baseMethod,"【つまずきの観点】"+stage.method,"【人的支援】"+support.method,"【本人との確認】"+wish.method].join("\n");
 const context=task.context||consultationReality();
 const genericEvals=[
  "教師と一緒に、対象となる行動や方法を一つ選んだ。",
  "手掛かりを使いながら、自分で対象となる行動を実行した。",
  "通常の学級や別場面で、必要な方法を自分から使った。"
 ];
 return {longGoal,short,method,context,check:override.check||"どの条件・手掛かりがあると行動が変わるかを比較して確認する。",evals:override.evals||genericEvals};
}

function consultationReality(){
 const c=state.consultation;
 const parts=[];
 if(c.studentVoice)parts.push("【本人】"+c.studentVoice);
 if(c.schoolVoice)parts.push("【学校】"+c.schoolVoice);
 if(c.homeVoice)parts.push("【家庭】"+c.homeVoice);
 return parts.join("\n");
}

function materialScore(m,tp){
 let s=0;
 const direct=m.topics.includes(tp.id);
 if(direct)s+=1000;
 const priority=MATERIAL_PRIORITY[tp.id]?.[m.name]||0;
 s+=priority;
 if(direct&&m.status==="完成")s+=15;
 if(direct&&m.status==="制作中")s+=6;
 if(direct&&m.status==="活動案・未実践")s+=2;
 if(direct&&m.name.includes("1～3年")&&Number(state.consultation.grade)<=3)s+=10;
 if(direct&&m.name.includes("小学校6年")&&Number(state.consultation.grade)<=3)s-=10;
 return s;
}
function materialReason(m,tp){
 const reasons=[];
 if(m.topics.includes(tp.id))reasons.push("この課題にNotion上で直接対応");
 const priority=MATERIAL_PRIORITY[tp.id]?.[m.name]||0;
 if(priority>=30)reasons.push("優先候補として仮設定");
 else if(priority>0)reasons.push("仮順位を調整中");
 if(m.status==="完成")reasons.push("完成教材");
 else if(m.status==="制作中")reasons.push("制作中");
 else if(m.status==="活動案・未実践")reasons.push("未実践");
 if(m.name.includes("1～3年")&&Number(state.consultation.grade)<=3)reasons.push("低学年向け");
 return reasons.join("・")||"関連の確認が必要";
}
function candidateMaterials(tp,query="",directOnly=false){
 const q=query.normalize("NFKC").toLowerCase();
 return MATERIALS.map(m=>({...m,score:materialScore(m,tp),direct:m.topics.includes(tp.id)}))
  .filter(m=>(!directOnly||m.direct)&&(!q||(m.name+" "+m.status+" "+m.topics.join(" ")).normalize("NFKC").toLowerCase().includes(q)))
  .sort((a,b)=>b.score-a.score||a.name.localeCompare(b.name,"ja"));
}

function renderMaterials(index,tp){
 const selected=state.selectedMaterials[index];
 const ranked=candidateMaterials(tp,"",true);
 const top=ranked.slice(0,6);
 const selectedNames=MATERIALS.filter(m=>selected.includes(m.id)).map(m=>m.name);
 return `
   <div class="materials-head"><div class="block-title">教材候補 <span class="validation-tag">仮順位・要検証</span></div><span>Notion「使用教材」スナップショット</span></div>
   <div class="material-list">
    ${top.length?top.map((m,r)=>`<div class="material-row">
      <div class="material-rank">${r+1}</div>
      <div><strong>${esc(m.name)}</strong><span class="material-meta">${esc(m.status)}</span><div class="material-reason">${esc(materialReason(m,tp))}</div></div>
      <button type="button" class="material-select ${selected.includes(m.id)?"selected":""}" data-material="${m.id}" data-task="${index}">${selected.includes(m.id)?"選択中":"使う"}</button>
    </div>`).join(""):`<div class="check-point">この課題に直接ひもづく教材が、現在のNotionスナップショットには登録されていません。教材DB側の追加候補です。</div>`}
   </div>
   ${selectedNames.length?`<div class="selected-materials"><strong>今回使う教材：</strong> ${selectedNames.map(esc).join("／")}</div>`:""}
   <details class="material-catalogue">
    <summary>74件の教材一覧から探す</summary>
    <div class="catalogue-toolbar"><input type="search" data-material-search="${index}" placeholder="教材名で検索"></div>
    <div class="catalogue-results" id="catalogue${index}">${catalogueRows(index,tp,"")}</div>
   </details>`;
}
function catalogueRows(index,tp,q){
 const selected=state.selectedMaterials[index];
 return candidateMaterials(tp,q).map(m=>`<div class="catalogue-row"><span>${esc(m.name)} <small>${esc(m.status)}</small></span><button type="button" class="material-select ${selected.includes(m.id)?"selected":""}" data-material="${m.id}" data-task="${index}">${selected.includes(m.id)?"解除":"選ぶ"}</button></div>`).join("");
}

function cardHtml(index){
 const task=state.tasks[index],tp=topic(task.topic);
 if(!tp)return `<div class="empty-card"><strong>課題${index+1}</strong><span>左の「課題${index+1}」で、48分類から具体的な課題を選択してください。</span></div>`;
 const ready=task.stage!==""&&task.support!==""&&task.wish!=="";
 const base=defaultPlan(tp,task,index),draft=state.drafts[index];
 if(draft.topic!==tp.id){state.drafts[index]={topic:tp.id,reality:base.context,short:base.short,method:base.method,evaluation:""};}
 const d=state.drafts[index];
 return `
  <div class="card-head">
   <div class="card-topline"><span class="task-label">課題${index+1}</span><span class="model-pill">${esc(tp.model)}</span></div>
   <p class="domain-label">${esc(domainName(tp.domainId))} · ${esc(tp.id)}</p>
   <h3>${esc(tp.name)}</h3>
  </div>
  <div class="card-body">
   <div class="plan-block">
    <div class="block-title">長期目標の案 <span class="validation-tag">分類との対応を検証</span></div>
    <p class="long-goal">${esc(base.longGoal)}</p>
    <div class="check-point"><strong>見立てを確認する観点：</strong> ${esc(base.check)}</div>
   </div>
   <div class="plan-block">
    <div class="block-title">個別指導プラン</div>
    <div class="plan-field">本人の実態・課題</div>
    <textarea class="plan-textarea" data-draft="reality" data-task="${index}">${esc(d.reality)}</textarea>
    <div class="plan-field">短期指導目標</div>
    <textarea class="plan-textarea" data-draft="short" data-task="${index}">${esc(d.short)}</textarea>
    <div class="plan-field">具体的な手立て</div>
    <textarea class="plan-textarea" data-draft="method" data-task="${index}" rows="6">${esc(d.method)}</textarea>
    ${ready?`<div class="support-note">つまずき：${esc(STAGES[task.stage].name)} ／ 支援：${esc(SUPPORTS[task.support].name)} ／ 本人：${esc(WISHES[task.wish].name)}</div>`:'<div class="support-note">左側で「つまずき・支援量・本人の認識」まで選ぶと、手立てを調整します。</div>'}
   </div>
   <div class="plan-block">${renderMaterials(index,tp)}</div>
   <div class="plan-block">
    <div class="block-title">評価の参考例 <span class="validation-tag">そのまま転記しない</span></div>
    <ol class="eval-list">
     <li><span class="eval-level">直接支援あり</span><br>${esc(base.evals[0])}</li>
     <li><span class="eval-level">支援を減らす</span><br>${esc(base.evals[1])}</li>
     <li><span class="eval-level">般化・自発</span><br>${esc(base.evals[2])}</li>
    </ol>
    <div class="plan-field">実施後の評価メモ</div>
    <textarea class="plan-textarea" data-draft="evaluation" data-task="${index}" placeholder="場面・支援量・本人の行動・変化を記入">${esc(d.evaluation)}</textarea>
   </div>
  </div>`;
}

function renderResults(){
 $("result0").innerHTML=cardHtml(0);$("result1").innerHTML=cardHtml(1);
 const a=topic(state.tasks[0].topic),b=topic(state.tasks[1].topic);
 const p=$("pairStatus");p.className="pair-status";
 if(!a||!b){p.textContent="課題①・②を選ぶと、重なりも確認します。";return;}
 if(a.id===b.id){p.textContent="同じ課題が選ばれています。2つの計画で評価する行動が分かれているか確認してください。";p.classList.add("warning");}
 else if(a.domainId===b.domainId||a.model===b.model){p.textContent="2つの課題が近い領域です。目標・手立て・評価が重複していないか確認してください。";p.classList.add("warning");}
 else p.textContent="異なる課題を設定しています。2つを同時に扱う必要性と優先順位を確認してください。";
}

function setActiveTask(i){state.activeTask=i;renderPlanner();}
function assignTopic(id){
 const tp=topic(id);if(!tp)return;
 const t=state.tasks[state.activeTask];
 t.domain=tp.domainId;t.topic=tp.id;
 if(t.stage==="")t.stage="3";
 if(t.support==="")t.support="2";
 if(t.wish==="")t.wish="5";
 renderPlanner();renderResults();
}

function saveLocal(){
 localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
 $("saveMessage").textContent="このブラウザ内に保存しました。";
}
function loadLocal(){
 const raw=localStorage.getItem(STORAGE_KEY);
 if(!raw){$("saveMessage").textContent="保存記録はありません。";return;}
 try{
  const saved=JSON.parse(raw);
  Object.assign(state,saved);
  syncInputsFromConsultation();
  showScreen(state.screen||"consult");
  $("saveMessage").textContent="保存記録を読み込みました。";
 }catch(e){$("saveMessage").textContent="保存記録を読み込めませんでした。";}
}
function clearAll(){
 if(!confirm("入力と選択内容を初期化しますか？"))return;
 localStorage.removeItem(STORAGE_KEY);
 state.screen="consult";state.activeTask=0;
 state.consultation={grade:"",sex:"",diagnosis:"",teacherRelation:"未確認",studentConcern:"",studentVoice:"",schoolConcern:"",schoolVoice:"",homeConcern:"",homeVoice:""};
 state.tasks=[emptyTask(),emptyTask()];state.drafts=[{},{}];state.selectedMaterials=[[],[]];
 syncInputsFromConsultation();showScreen("consult");
}

function demo(){
 state.consultation={grade:"2",sex:"男子",diagnosis:"ADHD",teacherRelation:"良好",studentConcern:"学習",studentVoice:"やることは分かるけど、途中で別のことが気になる。",schoolConcern:"行動",schoolVoice:"課題中に注意がそれやすく、思いつくとすぐ発言する。順番を待つのも難しいことがある。",homeConcern:"",homeVoice:""};
 state.tasks=[{domain:"D",topic:"T-D02",stage:"3",support:"2",wish:"2",context:"課題中に注意がそれやすい。短く区切ると取り組みやすい。"},{domain:"C",topic:"T-C01",stage:"3",support:"2",wish:"2",context:"思いつくとすぐ発言・行動する。短い合図があると止まれることがある。"}];
 state.drafts=[{},{}];state.selectedMaterials=[[],[]];
 syncInputsFromConsultation();showScreen("plan");
}

document.querySelectorAll("[data-screen]").forEach(b=>b.addEventListener("click",()=>{if(b.dataset.screen==="plan"){syncConsultationFromInputs();}showScreen(b.dataset.screen);}));
$("toPlan").addEventListener("click",()=>{syncConsultationFromInputs();if(!state.consultation.grade){alert("学年を選択してください。");return;}showScreen("plan");});
$("backConsult").addEventListener("click",()=>showScreen("consult"));
$("demoCase").addEventListener("click",demo);
$("taskTab0").addEventListener("click",()=>setActiveTask(0));$("taskTab1").addEventListener("click",()=>setActiveTask(1));
$("domainSelect").addEventListener("change",e=>{const t=state.tasks[state.activeTask];t.domain=e.target.value;t.topic="";state.drafts[state.activeTask]={};state.selectedMaterials[state.activeTask]=[];renderPlanner();renderResults();});
$("topicSelect").addEventListener("change",e=>{const t=state.tasks[state.activeTask];t.topic=e.target.value;state.drafts[state.activeTask]={};state.selectedMaterials[state.activeTask]=[];renderPlanner();renderResults();});
$("stageSelect").addEventListener("change",e=>{state.tasks[state.activeTask].stage=e.target.value;state.drafts[state.activeTask]={};renderResults();});
$("supportSelect").addEventListener("change",e=>{state.tasks[state.activeTask].support=e.target.value;state.drafts[state.activeTask]={};renderResults();});
$("wishSelect").addEventListener("change",e=>{state.tasks[state.activeTask].wish=e.target.value;state.drafts[state.activeTask]={};renderResults();});
$("contextNote").addEventListener("input",e=>{state.tasks[state.activeTask].context=e.target.value;});
$("contextNote").addEventListener("blur",()=>{state.drafts[state.activeTask]={};renderResults();});
$("saveLocal").addEventListener("click",saveLocal);$("loadLocal").addEventListener("click",loadLocal);$("clearAll").addEventListener("click",clearAll);

document.addEventListener("click",e=>{
 const s=e.target.closest("[data-suggest-topic]");if(s){assignTopic(s.dataset.suggestTopic);return;}
 const m=e.target.closest("[data-material]");
 if(m){
  const i=Number(m.dataset.task),id=m.dataset.material,arr=state.selectedMaterials[i];
  state.selectedMaterials[i]=arr.includes(id)?arr.filter(x=>x!==id):[...arr,id];
  renderResults();return;
 }
});
document.addEventListener("input",e=>{
 if(e.target.dataset.draft){
  const i=Number(e.target.dataset.task);
  state.drafts[i][e.target.dataset.draft]=e.target.value;
 }
 if(e.target.dataset.materialSearch!==undefined){
  const i=Number(e.target.dataset.materialSearch),tp=topic(state.tasks[i].topic);
  if(tp)$("catalogue"+i).innerHTML=catalogueRows(i,tp,e.target.value);
 }
});

syncInputsFromConsultation();
showScreen("consult");
