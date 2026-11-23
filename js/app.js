'use strict';
/* Kapanadze AI–Socrates · state, AI layer, evaluation, dialogue flow, question view, boot.
 *
 * The dialogue logic, scoring and help ladder are unchanged from the original KA-5.0 program.
 * Interface text goes through T(), learning content through TX() (js/i18n/i18n.js); state, logs
 * and archive keep Georgian source strings, so switching the language never alters a session.
 * In English mode, English answers are additionally recognised (see enMathPrep and enChecks);
 * Georgian-mode evaluation is byte-for-byte the original.
 */

let Q=DEFAULT_Q;
let selTopic=(()=>{try{const k=localStorage.getItem('kapanadze-sokrate-sel');return k&&(SCEN[k]||k==='other')?k:'half'}catch(e){return 'half'}})();
function setSel(k){selTopic=k;try{localStorage.setItem('kapanadze-sokrate-sel',k)}catch(e){}}
let theoryKey='derivative';
const startDraft={};

/* ============ state ============ */
const KEY='kapanadze-ai-socrates-topic-v3';
let S=freshState();
function freshState(){return {smode:'guided',scope:'full',qids:null,study:{code:'',group:'',method:'არ არის მითითებული',timepoint:'პილოტი'},archived:false,name:'',topic:'',grade:'9–10',questions:null,started:false,done:false,qi:0,level:0,tries:0,mode:'main',curPrompt:null,parentShown:false,results:{},errors:[],log:[],flags:[],turns:[],aiNote:'',notes:[],theoryId:null,hadPartial:false,curConf:0,firstVerdict:'',langs:[]};}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function load(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.log)return s}catch(e){}return null}
// Built-in banks are rebuilt from code (their check functions cannot be stored); AI-generated banks are restored from storage.
function questionsFor(topic,saved){return offlineQuestions(topic)||(Array.isArray(saved)&&saved.length?saved:null)||DEFAULT_Q.map(q=>({...q}));}
let sample=null, downloads=null, aiState='checking';
const VERSION='KA-5.1';
const ARCH='kapanadze-ai-socrates-archive-v5';
const indep=()=>S.smode==='independent';
const MODES={guided:'სოკრატული სწავლება (მინიშნებებით)',independent:'დამოუკიდებელი დიაგნოსტიკა (მინიშნებების გარეშე)'};
const SCOPES={short:'მოკლე ვარიანტი',full:'სრული ბანკი'};
const CONF5=[[1,'საერთოდ არ ვარ დარწმუნებული'],[2,'ნაკლებად'],[3,'ნაწილობრივ'],[4,'საკმაოდ'],[5,'სრულიად დარწმუნებული ვარ']];
const HELPNAME={0:'დამოუკიდებლად',1:'მიმართული კითხვა',2:'ნაწილობრივი მინიშნება (სტრუქტურა)',3:'ანალოგიური ნაბიჯი',R:'სწორი პასუხი ნაჩვენებია'};
// short variant: per stage — prerequisites: 3; levels: one declarative + one procedural + one metacognitive; final: 2
function selectQuestions(all,scope){
  if(scope!=='short') return all;
  const out=[];
  ['P','I','II','III','F'].forEach(st=>{
    const a=all.filter(q=>q.stage===st); if(!a.length) return;
    let sel;
    if(st==='P') sel=a.slice(0,3);
    else if(st==='F') sel=a.slice(0,2);
    else sel=[a.find(x=>x.comp==='decl'),a.find(x=>x.comp==='proc'),a.find(x=>x.comp==='pers')].filter(Boolean);
    sel.forEach(q=>{if(!out.includes(q)) out.push(q)});
  });
  return out;
}
function applyScope(qs,qids){return Array.isArray(qids)&&qids.length?qs.filter(q=>qids.includes(q.id)):qs}
function getArchive(){try{return JSON.parse(localStorage.getItem(ARCH)||'[]')}catch(e){return []}}
function putArchive(a){try{localStorage.setItem(ARCH,JSON.stringify(a))}catch(e){status(T('ბრაუზერის მეხსიერება სავსეა — გთხოვთ, ჩამოტვირთოთ მონაცემები.'),'warn')}}
async function downloadFile(name,data,type){
  if(downloads){ try{ await downloads.save({filename:name,data:'﻿'+data}); return true; }catch(e){ if(e&&e.code==='cancelled') return false; } }
  try{ const b=new Blob(['﻿',data],{type:type||'text/csv;charset=utf-8'}),u=URL.createObjectURL(b),a=document.createElement('a'); a.href=u;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1500); return true; }catch(e){ return false; }
}
function csvRows(rows){if(!rows.length)return '';const cols=Object.keys(rows[0]);const qv=v=>'"'+String(v??'').replace(/"/g,'""')+'"';return [cols.join(','),...rows.map(o=>cols.map(c=>qv(o[c])).join(','))].join('\r\n')}
let busy=false, view='main';
const PLOTV={};

/* ============ AI layer (optional; active only inside the claude.ai runtime) ============ */
const aiLang=()=>isEN()?'English':'Georgian';
function chip(){
  const c=document.getElementById('aiChip');
  if(!c) return;
  if(aiState==='on'){c.textContent=T('AI: ჩართულია');c.className='ai-chip on'}
  else if(aiState==='checking'){c.textContent=T('AI: მოწმდება…');c.className='ai-chip'}
  else {c.textContent=T('სკრიპტული რეჟიმი (AI-ის გარეშე)');c.className='ai-chip'}
}
function aiFail(e){
  if(e&&['not_granted','sampling_disabled','not_declared','capability_disabled','capability_removed'].includes(e.code)){sample=null;aiState='off';chip();}
}
function tutorRules(){
  const deriv=offlineTopicKey(S.topic)==='derivative';
  return `You are part of "Kapanadze AI–Socrates", a Socratic mathematics tutor. The lecturer Davit Kapanadze designed the pedagogy. The current topic is: ${S.topic||'mathematics'}. Student level: ${S.grade||'9–10'}. Principles: never give ready-made results; one short question at a time about the nearest step only; never say "wrong" — make the student check their own reasoning using a small case, substitution, counterexample, diagram, table, estimate or another topic-appropriate verification; reply in natural ${aiLang()}; use plain text and readable mathematical notation, no Markdown and no LaTeX.`+
  (deriv?` Method: Kapanadze's limit-free algebraic–geometric construction of the derivative. A tangent to the graph of a polynomial P at A(a; P(a)) is the line y = P(a) + k(x − a) for which x = a is at least a double root of P(x) − [P(a) + k(x − a)]; by Bezout P(x) − P(a) = (x − a)R(x) and k = R(a); the derivative is the function a ↦ k(a). Never use limits, infinitesimals or "the secant approaching the tangent"; rely on factoring, double roots, the discriminant and Bezout's theorem.`:'')+
  (offlineTopicKey(S.topic)==='half'?` Method: Kapanadze's algebraic-operator construction of the half-derivative on monomials (x > 0): H = D^(1/2) with H∘H = D; assumption H x^β = c(β)·x^(β−1/2), H linear; recurrence c(β)·c(β − 1/2) = β; c(0) = c₀ ≠ 0 is free; c(n) = c₀(2n)!!/(2n−1)!!, c(n − 1/2) = (2n−1)!!/(2c₀(2n−2)!!); c(−1/2) = 0; c₀ cancels in H∘H; c₀ = 1/√π is a CONVENTION chosen to agree with the Riemann–Liouville formula, not a consequence. Do not use integrals, limits or the Gamma function unless the student raises them; keep c₀ an agreement.`:'')+
  (offlineTopicKey(S.topic)==='pyramids'?` IMPORTANT: this topic is HISTORY, not mathematics (ancient Egyptian pyramids; school level about grades 6–9). Ignore the remark about mathematical notation. Guide the student to reason from evidence: archaeological finds (workers' village and tombs at Giza), inscriptions, papyri (Diary of Merer from Wadi al-Jarf), tomb paintings (Djehutihotep sledge); distinguish primary sources from films, myths and the internet; keep dates approximate (Djoser c. 2670 BC, Khufu c. 2560 BC); treat the exact construction method (ramps) as still debated.`:'');
}
const PROG_SECRETS=['aₙ = a₁ + (n − 1)d','a1+(n-1)d','bₙ = b₁qⁿ⁻¹','b1*q^(n-1)','q^(n-1)','(n-1)d','(n − 1)d'];
function secretsOf(q){const k=offlineTopicKey(S.topic);return (q.secret||[]).concat(['ap','gp','apsum','gpsum'].includes(k)?PROG_SECRETS:[]);}
function leaks(text,q){
  if(q.noLeak) return false;
  if(offlineTopicKey(S.topic)==='ap'&&(q.id==='III-D'||q.id==='III-D2')) return false;
  const t=norm(text).replace(/\s/g,'');
  return secretsOf(q).some(s=>{const k=norm(s).replace(/\s/g,'');return k.length>1&&t.includes(k)});
}
async function aiJudge(q,answer){
  const prompt=`${tutorRules()}

Task: judge a student's answer. Be lenient about wording, notation and spelling; judge the mathematical idea.
Topic: ${S.topic}\nQuestion: ${plain(TX(q.text))}\nWhat a correct answer contains (for you only, never reveal): ${q.rubric||plain(q.reveal||'')}
Student's answer: ${answer}

Reply with only JSON: {"verdict":"correct"|"partial"|"wrong","misconception":"short ${aiLang()} label, or empty","followup":"if not correct: ONE short Socratic control question in ${aiLang()} that makes the student test their own answer; it must not state the correct answer. Empty if correct."}`;
  const r=await sample.json(prompt,{modelTier:'quick'});
  if(!r||!['correct','partial','wrong'].includes(r.verdict)) throw {code:'invalid_json'};
  return r;
}
async function aiSimpler(q,level,history){
  const LV={1:'level 1 — a directed question that focuses attention on the needed property',2:'level 2 — a partial hint: offer a structure (a small table, a list to complete), without the result',3:'level 3 — an analogous step in a different, everyday or smaller situation; the student then does the target step'};
  const prompt=`${tutorRules()}

The student pressed "I'm stuck" on this question: ${plain(TX(q.text))}
Write ONE new, simpler question at help ${LV[level]}.
The lecturer's own example for this level: ${plain(TX(q.ladder[level-1]))}
Dialogue so far on this question:
${history||'(nothing yet)'}
Hard rules: at most two short sentences; do not repeat an earlier question word for word; never state any of these results: ${secretsOf(q).join(' ; ')||'(the final answer)'}.
Reply with only JSON: {"question":"..."}`;
  const r=await sample.json(prompt,{modelTier:'quick',cache:false});
  const txt=r&&typeof r.question==='string'?r.question.trim():'';
  if(!txt||txt.length>400||leaks(txt,q)) return null;
  return txt;
}

/* ============ English answers (English mode only) ============ */
// Number words are mapped to the Georgian words the original strict reader understands, and the
// remaining English words to a Georgian placeholder letter, so the original math parsers treat
// English prose exactly as they treat Georgian prose. Mathematical criteria are not changed.
const EN_NUMBER_WORDS=[
  [/\b(?:none|zero)\b|\bno\s+(?:common\s+|real\s+|shared\s+|intersection\s+)?(?:points?|intersections?|solutions?|roots?)\b|\b(?:do|does|did)\s*(?:n['’]t|not)\s+(?:intersect|meet|cross|touch)\w*|\bnever\s+(?:intersect|meet|cross)\w*/gi,' არც ერთი '],
  [/\b(?:one|single|unique)\b/gi,' ერთი '],[/\btwo\b/gi,' ორი '],[/\bthree\b/gi,' სამი '],[/\bfour\b/gi,' ოთხი '],
  [/\bfive\b/gi,' ხუთი '],[/\bsix\b/gi,' ექვსი '],[/\btwelve\b/gi,' თორმეტი ']
];
const EN_SHORT_WORDS=new Set(['is','it','so','of','to','in','by','be','we','as','at','or','if','on','my','me','do','no','up','us','he','am','go','im']);
const EN_KEEP=new Set(['sqrt','pi']);
function enMathPrep(s){
  let t=String(s).replace(/(\d{1,3})(?:,(\d{3}))+(?!\d)/g,m=>m.replace(/,/g,''));   // 2,300,000 → 2300000
  for(const [re,ka] of EN_NUMBER_WORDS) t=t.replace(re,ka);
  t=t.replace(/[A-Za-z]+(?:['’][A-Za-z]+)*/g,w=>{
    const lw=w.toLowerCase();
    if(EN_KEEP.has(lw)) return w;
    if(lw.length>=3||EN_SHORT_WORDS.has(lw)||/['’]/.test(lw)) return ' ა ';
    return w;
  });
  return t.replace(/(^|[^A-Za-z0-9_])[ai]\s+(?=ა)/g,'$1ა ');                        // article “a” / pronoun “I”
}
function reflectFeaturesBoth(t){
  const step=/(კითხვ|ნაბიჯ|ეტაპ|გამიჭირდ|გამიძნელდ|როცა|ადგილ|ამოცან)/.test(t)||/(question|step|stage|hard|difficult|struggl|stuck|when|part|problem|task|tricky)/.test(t);
  const tool=/(გრაფიკ|ცხრილ|მაგალით|ფორმულ|ჩავსვ|ჩასმ|დავშალ|დაშლ|მამრავლ|ფესვ|სლაიდერ|ნახაზ|ბეზუ|შევადარ|დისკრიმინ|წყვილ|წყარო|რუკ|თარიღ|გამოთვ|შედარ|მტკიცებ|არქეოლოგ)/.test(t)||/(graph|table|example|formula|substitut|factor|root|slider|diagram|drawing|bezout|bézout|compar|discriminant|pair|source|map|date|calculat|comput|proof|evidence|archaeolog|archeolog)/.test(t);
  const check=/(შევამოწმ|შემოწმ|გადავამოწმ|დავრწმუნდ|გადამოწმ|ჩავსვი|შევადარე|დავითვალე|გავხსენი)/.test(t)||/(check|verif|made sure|make sure|substituted|plugged|compared|counted|expanded|tested|confirm)/.test(t);
  return step+tool+check;
}

/* ============ evaluation ============ */
function reflectFeatures(t){
  const step=/(კითხვ|ნაბიჯ|ეტაპ|გამიჭირდ|გამიძნელდ|როცა|ადგილ|ამოცან)/.test(t);
  const tool=/(გრაფიკ|ცხრილ|მაგალით|ფორმულ|ჩავსვ|ჩასმ|დავშალ|დაშლ|მამრავლ|ფესვ|სლაიდერ|ნახაზ|ბეზუ|შევადარ|დისკრიმინ|წყვილ|წყარო|რუკ|თარიღ|გამოთვ|შედარ|მტკიცებ|არქეოლოგ)/.test(t);
  const check=/(შევამოწმ|შემოწმ|გადავამოწმ|დავრწმუნდ|გადამოწმ|ჩავსვი|შევადარე|დავითვალე|გავხსენი)/.test(t);
  return step+tool+check;
}
function ruleJudge(q,answer){
  const c=q.check, t=norm(answer);
  const en=enChecks(q);                                   // null in Georgian mode
  const ma=en?enMathPrep(answer):answer;                   // text given to the math parsers
  const reHit=(e,i)=>e.re.test(t)||!!(en&&en.$re&&en.$re[i]&&en.$re[i].test(t));
  if(c.type==='num'){
    if((c.alt&&c.alt(t))||(en&&en.$alt&&en.$alt(t))) return {verdict:'correct'};
    for(const [i,e] of (c.errors||[]).entries()){ if(e.re&&e.first&&reHit(e,i)) return {verdict:'wrong',err:e.err,follow:e.follow}; }
    const nums=c.strict?numbersStrict(ma):numbers(ma);
    if(c.expect.every(v=>has(nums,v))) return {verdict:'correct'};
    for(const [i,e] of (c.errors||[]).entries()){
      if(e.re){ if(reHit(e,i)) return {verdict:'wrong',err:e.err,follow:e.follow}; continue; }
      if(e.approx?hasApprox(nums,e.v):has(nums,e.v)) return {verdict:'wrong',err:e.err,follow:e.follow};
    }
    if(c.expect.length>1&&c.expect.some(v=>has(nums,v))) return {verdict:'partial'};
    return {verdict:'wrong'};
  }
  if(c.type==='range'){
    const nums=numbers(ma);
    if(nums.some(v=>v>=c.min&&v<=c.max)) return {verdict:'correct'};
    for(const e of (c.errors||[])){ if(nums.some(v=>v>=e.min&&v<=e.max)) return {verdict:'wrong',err:e.err,follow:e.follow}; }
    return {verdict:'wrong'};
  }
  if(c.type==='formula'){
    const f=formulaFn(ma);
    if(f){
      if(sameFn(f,c.expect)) return {verdict:'correct'};
      for(const e of c.errors){ if(sameFn(f,e.f)) return {verdict:'wrong',err:e.err,follow:e.follow}; }
      return {verdict:'wrong'};
    }
    return {verdict:'unknown'};
  }
  if(c.type==='expr'){
    const p=exprParse(ma,c.vars);
    if(!p) return {verdict:'unknown'};
    if(sameExpr(p.f,c.expect,c.vars.length,c.pos)){
      if(c.factored&&!p.factored) return {verdict:'partial',follow:c.factoredFollow};
      return {verdict:'correct'};
    }
    for(const e of (c.errors||[])){ if(sameExpr(p.f,e.f,c.vars.length,c.pos)) return {verdict:'wrong',err:e.err,follow:e.follow}; }
    return {verdict:'wrong'};
  }
  if(c.type==='text'){
    for(const [i,e] of (c.errors||[]).entries()){ if(reHit(e,i)) return {verdict:'wrong',err:e.err,follow:e.follow}; }
    if(c.kw(t)||(en&&en.$kw&&en.$kw(t))) return {verdict:'correct'};
    if((c.kwPart&&c.kwPart(t))||(en&&en.$kwPart&&en.$kwPart(t))) return {verdict:'partial',soft:true};
    return {verdict:'wrong',soft:true};
  }
  if(c.type==='ai') return {verdict:'unknown'};
  if(c.type==='reflect'){
    const k=en?reflectFeaturesBoth(t):reflectFeatures(t);
    if(k>=3||(k===2&&t.length>=120)) return {verdict:'correct',soft:true};
    if(k>=1&&t.length>=20) return {verdict:'partial',soft:true};
    return {verdict:'wrong',soft:true};
  }
  return {verdict:'unknown'};
}
const GENERIC_FOLLOW={
  num:'შეამოწმე შენი პასუხი: ჩასვი ის პირობაში ან სცადე იგივე წესი პატარა შემთხვევაზე. ემთხვევა?',
  formula:'შეამოწმე შენი ფორმულა პატარა შემთხვევებზე: ჩასვი `n` = 1 და `n` = 2. ემთხვევა პირველი და მეორე წევრის აგების წესს?',
  range:'შეამოწმე გამოთვლა: რომელი მოქმედება გჭირდება — შეკრება, გამოკლება, გაყოფა? დაამრგვალე და შეაფასე, დამაჯერებელია თუ არა შედეგი.',
  expr:'შეამოწმე შენი გამოსახულება კონკრეტულ რიცხვზე: ჩასვი, მაგალითად, a = 1 ან a = 2 და შეადარე პირდაპირ გამოთვლას.',
  text:'შეგიძლია უფრო ზუსტად ახსნა? მოიყვანე კონკრეტული მაგალითი და შეამოწმე მასზე შენი ნათქვამი.',
  reflect:'დაასახელე ერთი კონკრეტული ნაბიჯი, რომელიც გაგიჭირდა, რა გააკეთე, რომ გადალახე, და როგორ შეამოწმე შედეგი.',
  ai:'შეამოწმე შენი პასუხი კონკრეტული მაგალითით ან სხვა გზით და ახსენი, რას ამოწმებ.'
};
async function judge(q,ans){
  let r=ruleJudge(q,ans);
  if(sample&&(r.verdict==='unknown'||r.soft||(r.verdict==='wrong'&&!r.err))){
    try{
      const a=await aiJudge(q,ans);
      r={verdict:a.verdict,err:r.err,errLabel:a.misconception||'',follow:a.followup&&!leaks(a.followup,q)?a.followup:(r.follow||null),ai:true};
    }catch(e){aiFail(e)}
  }
  if(r.verdict==='unknown') r={verdict:'wrong'};
  return r;
}

async function generateTopicQuestions(topic,grade){
  if(!sample) throw new Error('AI_REQUIRED');
  const L=aiLang();
  const prompt=`You design a Socratic diagnostic sequence for a ${isEN()?'':'Georgian '}mathematics student.
Topic: ${topic}
Grade/level: ${grade}

Keep this FIXED methodology:
1) prerequisite knowledge;
2) Level I basic; Level II intermediate; Level III advanced/transfer;
3) within each level assess declarative (what I know), procedural (how I do it), and reflective/metacognitive (how I reason/check);
4) never require memorized wording when mathematical understanding can be shown another way;
5) questions must support Socratic help without revealing the answer;
6) finish with an independent final check without help.

Create exactly 17 questions: 5 prerequisite P1–P5; then 3 for level I (I-D, I-P, I-R); 3 for level II (II-D, II-P, II-R); 3 for level III (III-D, III-P, III-R); then 3 final independent questions F1–F3 (stage F) on a new example. The R question at level III must explicitly ask for reflection and self-checking.

For every question return: id, stage (P/I/II/III/F), comp (pre/decl/proc/pers), skill (short ${L} phrase; required for P only, optional otherwise), text (${L}), rubric (English or ${L} private grading criterion), reveal (a short ${L} explanation of the correct answer, shown only after all help is exhausted), ladder (exactly 3 progressively simpler Socratic prompts in ${L}). Optional intro may define a term only AFTER a discovery question and must never contain the answer to the current question.

Difficulty must be age-appropriate and mathematically correct. Include representations or transfer where natural for the topic. Do not include multiple-choice. Do not reveal final answers in ladder prompts.

Reply only JSON: {"questions":[...]} . Each question should also contain "check":{"type":"ai"}.`;
  const r=await sample.json(prompt,{modelTier:'quick',cache:false});
  if(!r||!Array.isArray(r.questions)||r.questions.length<12) throw new Error('BAD_QUESTIONS');
  const validStages=new Set(['P','I','II','III','F']), validComp=new Set(['pre','decl','proc','pers']);
  return r.questions.map((q,i)=>({
    id:String(q.id||('Q'+(i+1))), stage:validStages.has(q.stage)?q.stage:'I', comp:validComp.has(q.comp)?q.comp:'proc',
    skill:String(q.skill||q.text||('უნარი '+(i+1))).slice(0,90), text:String(q.text||''), rubric:String(q.rubric||''), reveal:q.reveal?String(q.reveal):'',
    ladder:Array.isArray(q.ladder)&&q.ladder.length>=3?q.ladder.slice(0,3).map(String):['რა არის ამ ამოცანის პირველი მცირე ნაბიჯი?','შეგიძლია პატარა მაგალითზე სცადო?','როგორ გადაამოწმებ მიღებულ პასუხს?'],
    intro:q.intro?esc(String(q.intro)):'', check:{type:'ai'}
  })).filter(q=>q.text);
}

/* ============ flow ============ */
function curQ(){return Q[S.qi]}
function logTurn(kind,prompt,answer,extra){
  const q=curQ();
  S.log.push(Object.assign({t:new Date().toISOString(),q:q.id,stage:q.stage,comp:q.comp,kind,help:S.level,prompt:plain(prompt),answer:answer||''},extra||{}));
}
function historyText(){
  return S.turns.map(x=>(x.who==='ai'?'Tutor: ':'Student: ')+plain(TX(x.text))).join('\n');
}
function correctAnswerText(q){
  if(q.answer) return 'სწორი პასუხი და ახსნა: '+q.answer;
  if(q.reveal) return q.reveal;
  const topic=(S.topic||'').toLowerCase();
  if(q.check&&q.check.type==='formula'){
    if(topic.includes('არითმეტიკული პროგრესიის n-ური წევრის')) return 'სწორი ფორმულაა: `a_n = a_1 + (n − 1)d`. `a_1`-დან `a_n`-მდე არის `n − 1` თანაბარი ნაბიჯი, ამიტომ `d` ემატება `n − 1`-ჯერ.';
    if(topic.includes('გეომეტრიული პროგრესიის n-ური წევრის')) return 'სწორი ფორმულაა: `b_n = b_1 · q^{n−1}`. `b_1`-დან `b_n`-მდე `q`-ზე გამრავლება ხდება `n − 1`-ჯერ.';
    if(topic.includes('არითმეტიკული პროგრესიის პირველი n წევრის ჯამის')) return 'სწორი ფორმულაა: `S_n = n(a_1 + a_n)/2`, ხოლო `a_n = a_1 + (n − 1)d`-ის ჩასმით: `S_n = n[2a_1 + (n − 1)d]/2`.';
    if(topic.includes('გეომეტრიული პროგრესიის პირველი n წევრის ჯამის')) return 'თუ `q ≠ 1`, სწორი ფორმულაა: `S_n = b_1(q^n − 1)/(q − 1)`. თუ `q = 1`, მაშინ `S_n = nb_1`.';
  }
  if(q.check&&q.check.type==='num'&&Array.isArray(q.check.expect)){
    return 'სწორი პასუხი: '+q.check.expect.join(' და ')+'. გადახედე წინა მინიშნებებს და შეადარე, რომელ ნაბიჯზე შეიცვალა შენი მსჯელობა.';
  }
  if(q.check&&q.check.type==='reflect') return 'რეფლექსიაში მთავარია სამი რამ: დაასახელო კონკრეტული რთული ნაბიჯი, რა დაგეხმარა მის გადალახვაში და როგორ შეამოწმე შედეგი.';
  return 'სწორი პასუხის იდეა ნაჩვენებია წინა მინიშნებებში. გადახედე ბოლო ნაბიჯს და დააკვირდი, სად შეიცვალა შენი მსჯელობა.';
}
function revealAndHold(note){
  const q=curQ();
  S.results[q.id]={score:0,help:S.level,tries:S.tries,verdict:'wrong',revealed:true,conf:S.curConf||0,first:S.firstVerdict||'wrong'};
  if(note==='flag'&&!S.flags.includes(q.id)) S.flags.push(q.id);
  S.mode='reveal';
  S.curPrompt=correctAnswerText(q);
  S.turns.push({who:'ai',text:'სწორი პასუხის ახსნა: '+S.curPrompt});
  save(); render(false);
}
function nextAfterReveal(){
  const box=document.getElementById('selfx'); const txt=(box&&box.value||'').trim();
  if(txt.length<10){status(T('დაწერე მოკლე ახსნა საკუთარი სიტყვებით (ერთი-ორი წინადადება) — ასე ცოდნა შენი ხდება.'),'warn'); if(box) box.focus(); return;}
  const q=curQ();
  logTurn('selfexpl','თვითახსნა სწორი პასუხის ჩვენების შემდეგ',txt);
  if(S.results[q.id]) S.results[q.id].selfExpl=true;
  afterQuestion(q);
}
function finishQ(verdict,note,final){
  const q=curQ();
  let score=0;
  if(final) score=verdict==='correct'?2:(verdict==='partial'?1:0);
  else if(verdict==='correct') score=S.level===0?2:(S.level===1?1.5:1);
  else if(verdict==='partial') score=1;
  S.results[q.id]={score,help:S.level,tries:S.tries,verdict,conf:S.curConf||0,first:S.firstVerdict||verdict,noHelp:!!final};
  if(note==='flag'&&!S.flags.includes(q.id)) S.flags.push(q.id);
  afterQuestion(q);
}
function afterQuestion(q){
  if(!indep()&&q.after&&THEORY_CARDS[q.after]){
    if(!S.notes.includes(q.after)) S.notes.push(q.after);
    S.mode='theory'; S.theoryId=q.after; S.turns=[]; save(); render(false); return;
  }
  advance();
}
function advance(){
  S.qi++; S.level=0; S.tries=0; S.mode='main'; S.curPrompt=null; S.turns=[]; S.hadPartial=false; S.curConf=0; S.firstVerdict=''; S.theoryId=null;
  if(S.qi>=Q.length){ S.done=true; archiveSession(); }
  save(); render(true);
}
async function onGo(){
  if(busy) return;
  const box=document.getElementById('answer'); const ans=(box.value||'').trim();
  if(!ans){status(T('ჯერ დაწერე პასუხი. თუ ვერ ხვდები, დააჭირე „{b}“.',{b:curQ().stage==='F'||indep()?T('არ ვიცი'):T('გავიჭედე')}),'warn');box.focus();return}
  const q=curQ();
  const first=S.mode==='main'&&S.tries===0&&S.level===0&&!S.hadPartial;
  if(first){
    const c=document.querySelector('input[name=conf]:checked');
    if(!c){status(T('მონიშნე, რამდენად ხარ დარწმუნებული შენს პასუხში — ესეც შენი ცოდნის ნაწილია.'),'warn');const f=document.querySelector('input[name=conf]');if(f)f.focus();return}
    S.curConf=Number(c.value);
  }
  S.turns.push({who:'stu',text:ans});
  if(S.mode!=='main'){ // answered a simpler / control question -> back to the main question
    logTurn(S.mode==='simpler'?'simpler':'control',S.curPrompt,ans);
    S.mode='main'; S.curPrompt=null; save(); render(true);
    status(T('კარგი. ახლა კვლავ სცადე მთავარი კითხვა.'));
    return;
  }
  setBusy(true); status(q.stage==='F'||indep()?T('ვიწერ პასუხს…'):T('ვამოწმებ პასუხს…'));
  const r=await judge(q,ans);
  setBusy(false);
  logTurn('main',q.text,ans,{verdict:r.verdict,err:r.err||r.errLabel||'',conf:first?S.curConf:''});
  if(r.err) S.errors.push({q:q.id,err:r.err});
  else if(r.errLabel&&r.verdict!=='correct') S.errors.push({q:q.id,label:r.errLabel});
  if(first) S.firstVerdict=r.verdict;
  if(q.stage==='F'||indep()){ status(''); return finishQ(r.verdict,null,true); }
  if(r.verdict==='correct'){ status(''); return finishQ('correct'); }
  if(r.verdict==='partial'&&S.hadPartial){ status(''); return finishQ('partial'); }
  S.tries++;
  if(r.verdict==='partial'){
    S.hadPartial=true; S.mode='control';
    S.curPrompt=r.follow||'შენი პასუხი ნაწილობრივ სწორია. რა აკლია? დააზუსტე ან შეამოწმე კონკრეტულ მაგალითზე.';
    S.turns.push({who:'ai',text:S.curPrompt});
    save(); render(true); status(T('ნაწილობრივ სწორია — დააზუსტე.'));
    return;
  }
  if(S.tries>=2){ // two unsuccessful attempts: raise help; after the final help, show the answer before moving on
    if(S.level>=3||q.check.type==='reflect'){ return revealAndHold(S.level>=3?'flag':null); }
    return raiseHelp('auto');
  }
  S.mode='control';
  S.curPrompt=r.follow||q.check.follow||GENERIC_FOLLOW[q.check.type]||GENERIC_FOLLOW.ai;
  S.turns.push({who:'ai',text:S.curPrompt});
  save(); render(true); status('');
}
async function onStuck(){
  if(busy) return;
  const q=curQ();
  const ans=(document.getElementById('answer').value||'').trim();
  if(q.stage==='F'||indep()){
    logTurn('dontknow',q.text,ans,{verdict:'wrong'});
    if(!S.firstVerdict) S.firstVerdict='stuck';
    status(''); return finishQ('wrong',null,true);
  }
  logTurn(S.mode==='main'?'stuck':'stuck-'+S.mode,S.mode==='main'?q.text:S.curPrompt,ans,{verdict:'stuck'});
  if(!S.firstVerdict) S.firstVerdict='stuck';
  S.turns.push({who:'stu',text:'გავიჭედე'+(ans?' ('+ans+')':'')});
  if(S.level>=3){ status(''); return revealAndHold('flag'); }
  await raiseHelp('stuck');
}
async function raiseHelp(why){
  const q=curQ();
  S.level++;
  let txt=null;
  if(sample){
    setBusy(true); status(T('ვამზადებ უფრო მარტივ კითხვას…'));
    try{ txt=await aiSimpler(q,S.level,historyText()); }catch(e){aiFail(e)}
    setBusy(false);
  }
  S.curPrompt=txt||q.ladder[S.level-1];
  S.mode='simpler';
  S.turns.push({who:'ai',text:S.curPrompt});
  save(); render(true);
  status(why==='auto'?T('ვცადოთ უფრო პატარა ნაბიჯი.'):'');
}
function status(msg,cls){const el=document.getElementById('status');if(el){el.textContent=msg;el.className='status'+(cls?' '+cls:'')}}
function setBusy(b){busy=b;document.querySelectorAll('#go,#stuck').forEach(x=>{x.disabled=b;x.setAttribute('aria-busy',String(b))})}
function leaveForAnotherTopic(){
  save();
  S.started=false;
  render();
  status(T('მიმდინარე დიალოგი შენახულია. შეგიძლია აირჩიო სხვა თემა ან მოგვიანებით გააგრძელო წინა თემა.'));
}
function draftOtherKey(){
  const k=startDraft.otherKey||'ap';
  return k==='free'?offlineTopicKey(startDraft.free||''):k;
}
let theoryChanged=false;
function openTheory(key){
  const cur=offlineTopicKey(S.topic);
  const ok=k=>k&&(SCEN[k]||OTHER_TOPICS[k]);
  theoryKey=(typeof key==='string'&&ok(key))?key:(S.started&&ok(cur)?cur:(SCEN[selTopic]?selTopic:(ok(draftOtherKey())?draftOtherKey():'derivative')));
  theoryChanged=false; view='theory';render();window.scrollTo(0,0)
}

/* ============ rendering: progress rail and the question card ============ */
function visibleStages(){return STAGES.filter(s=>s.id==='R'||Q.some(q=>q.stage===s.id));}
function rail(){
  const vs=visibleStages(), el=document.getElementById('rail');
  el.style.setProperty('--n',vs.length);
  el.setAttribute('aria-label',T('პროგრესი'));
  const idx=S.done?vs.length-1:(S.started&&curQ()?vs.findIndex(s=>s.id===curQ().stage):-1);
  el.innerHTML=vs.map((s,i)=>{
    let pct=0;
    if(s.id==='R') pct=S.done?100:0;
    else{const qs=Q.filter(q=>q.stage===s.id);pct=Math.round(qs.filter(q=>S.results[q.id]).length/qs.length*100)}
    return `<div class="${i===idx?'cur':''}${pct===100?' full':''}" ${i===idx?'aria-current="step"':''}><div class="bar" role="progressbar" aria-label="${esc(T(s.short))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><i data-w="${pct}"></i></div><div class="lbl">${T(s.short)}</div></div>`;
  }).join('');
  el.querySelectorAll('i[data-w]').forEach(i=>{i.style.width=i.dataset.w+'%'});
}
function cardHTML(id){return TX(THEORY_CARDS[id].html)}
function notesPanel(open){
  if(!S.notes||!S.notes.length) return '';
  return `<details class="notes"${open?' open':''}><summary>${T('ჩემი კონსპექტი · {n} თეორიული დასკვნა',{n:S.notes.length})}</summary>${S.notes.map(id=>`<div class="tcard">${cardHTML(id)}</div>`).join('')}</details>`;
}
function threadHTML(){
  return S.turns.length?`<details class="thread"><summary>${T('ამ კითხვის დიალოგი ({n})',{n:S.turns.length})}</summary><ol>${S.turns.map(x=>`<li class="${x.who==='stu'?'stu':''}"><span class="who">${x.who==='stu'?T('მოსწავლე'):T('სოკრატე')}</span>${M(TX(x.text))}</li>`).join('')}</ol></details>`:'';
}
function render(focus){
  rail();
  const app=document.getElementById('app');
  if(view==='theory') return renderTheory(app);
  if(view==='research') return renderResearch(app);
  if(!S.started) return renderStart(app);
  if(S.done) return renderReport(app);
  const q=curQ(); const st=STAGES.find(s=>s.id===q.stage);
  const same=Q.filter(x=>x.stage===q.stage); const n=same.indexOf(q)+1, of=same.length;
  if(S.mode==='theory'&&THEORY_CARDS[S.theoryId]){
    app.innerHTML=`
    <section class="card" aria-live="polite">
      <div class="meta"><span class="tag">${T(st.name)}</span><span class="tag k">${T('ცოდნის ფიქსაცია · თეორიული დასკვნა')}</span></div>
      <div class="tcard">${cardHTML(S.theoryId)}</div>
      <p class="hint">${T('ეს დასკვნა აჯამებს იმას, რაც ახლა ააგე. ის შეინახება „ჩემს კონსპექტში“ — ნებისმიერ დროს შეგიძლია გადახედო.')}</p>
      <div class="actions"><button class="btn go" id="tnext" type="button">${T('გავიგე — გაგრძელება')}</button></div>
    </section>`;
    const b=app.querySelector('#tnext'); b.onclick=advance; b.focus({preventScroll:true});
    return;
  }
  if(S.mode==='reveal'){
    app.innerHTML=`
    <section class="card" aria-live="polite">
      <div class="meta"><span class="tag">${T(st.name)} · ${n}/${of}</span><span class="tag k">${T(COMP[q.comp])}</span><span class="tag help">${T('სასწავლო უკუკავშირი · 0 ქულა')}</span></div>
      <div class="parent"><span>${T('კითხვა, რომელიც ვერ შესრულდა')}</span>${M(TX(q.text))}</div>
      <div class="intro"><b>${T('სწორი პასუხი და მოკლე ახსნა')}</b><br>${M(TX(S.curPrompt||correctAnswerText(q)))}</div>
      <div class="selfx"><label for="selfx" class="f">${T('ახლა შენი ჯერია: ახსენი საკუთარი სიტყვებით, რომელი ნაბიჯი გამოგრჩა ან რატომ არის ეს პასუხი სწორი.')}</label>
      <textarea id="selfx" placeholder="${esc(T('მაგ.: ვერ შევამჩნიე, რომ …'))}"></textarea></div>
      <p class="hint">${T('ამ კითხვაზე ქულა არ გემატება, მაგრამ შენი თვითახსნა დასკვნაში აღინიშნება.')}</p>
      <div class="actions">
        <button class="btn go" id="nextReveal" type="button">${T('შემდეგი კითხვა')}</button>
        <button class="btn ghost" id="changeTopicReveal" type="button">${T('შეწყვეტა / სხვა თემა')}</button>
      </div>
      <div class="status" id="status" role="status" aria-live="polite"></div>
      ${threadHTML()}
    </section>`;
    app.querySelector('#nextReveal').onclick=nextAfterReveal;
    app.querySelector('#changeTopicReveal').onclick=leaveForAnotherTopic;
    app.querySelector('#selfx').focus({preventScroll:true});
    return;
  }
  const sub=S.mode!=='main', fin=q.stage==='F'||indep();
  const firstTry=!sub&&S.tries===0&&S.level===0&&!S.hadPartial;
  const sk=SCEN[offlineTopicKey(S.topic)];
  const ot=OTHER_TOPICS[offlineTopicKey(S.topic)];
  const syms=sk?sk.syms:(ot&&ot.syms?ot.syms:['aₙ','a₁','aₙ₊₁','d','n','−','·','(',')','=']);
  app.innerHTML=`
  <section class="card qcard" aria-live="polite">
    <div class="meta">
      <span class="tag">${T(st.name)} · ${n}/${of}</span>
      <span class="tag k">${T(COMP[q.comp])}</span>
      ${S.level>0?`<span class="tag help">${T('დახმარების დონე {n} · {name}',{n:S.level,name:T(HELPNAME[S.level])})}</span>`:''}
      ${fin?`<span class="tag help">${q.stage==='F'?T('დახმარების გარეშე'):T('დიაგნოსტიკა · მინიშნებების გარეშე')}</span>`:''}
      <span class="tag k count">${Q.indexOf(q)+1} / ${Q.length}</span>
    </div>
    ${q.intro&&firstTry?`<div class="intro">${supfmt(TX(q.intro))}</div>`:''}
    ${sub?`<div class="parent"><span>${T('მთავარი კითხვა')}</span>${M(TX(q.text))}</div>
      <span class="follow-label">${S.mode==='simpler'?T('უფრო მარტივი კითხვა'):T('შეამოწმე საკუთარი მსჯელობა')}</span>
      <h2 class="q sub" id="qtext" tabindex="-1">${M(TX(S.curPrompt))}</h2>`
     :`<h2 class="q" id="qtext" tabindex="-1">${M(TX(q.text))}</h2>`}
    ${q.plot&&q.stage!=='F'?plotPanel(q.plot):''}
    ${syms.length?`<div class="sym" role="toolbar" aria-label="${esc(T('სიმბოლოები'))}">
      ${syms.map(s=>`<button type="button" data-ins="${s}" aria-label="${esc(T('ჩასვი: {s}',{s}))}">${s}</button>`).join('')}
    </div>`:''}
    <label for="answer" class="f">${T('შენი პასუხი')}</label>
    <textarea id="answer" placeholder="${esc(T('დაწერე პასუხი ან შენი მსჯელობა…'))}" aria-describedby="kbdhint"></textarea>
    ${firstTry?`<fieldset class="conf"><legend>${T('რამდენად ხარ დარწმუნებული შენს პასუხში? (პასუხის გაგზავნამდე)')}</legend>
      <div class="conf5">${CONF5.map(([v,t])=>`<label><input type="radio" name="conf" value="${v}"><b>${v}</b><span>${T(t)}</span></label>`).join('')}</div></fieldset>`:(S.curConf?`<p class="hint">${T('პირველი პასუხის თავდაჯერება: {n}/5',{n:S.curConf})}</p>`:'')}
    <div class="actions">
      <button class="btn go" id="go" type="button">${fin?T('პასუხის ჩაწერა'):T('გადადი')}</button>
      <button class="btn stuck" id="stuck" type="button">${fin?T('არ ვიცი'):T('გავიჭედე')}</button>
      <button class="btn ghost" id="changeTopic" type="button">${T('შეწყვეტა / სხვა თემა')}</button>
      <span class="hint kbd" id="kbdhint">${T('Ctrl + Enter — გადასვლა')}</span>
    </div>
    <div class="status" id="status" role="status" aria-live="polite"></div>
    ${threadHTML()}
    ${notesPanel(false)}
  </section>`;
  if(q.plot&&q.stage!=='F') mountPlot(app,q.plot);
  const box=app.querySelector('#answer');
  app.querySelector('#go').onclick=onGo;
  app.querySelector('#stuck').onclick=onStuck;
  app.querySelector('#changeTopic').onclick=leaveForAnotherTopic;
  box.addEventListener('keydown',e=>{if(e.key==='Enter'&&(e.ctrlKey||e.metaKey)){e.preventDefault();onGo()}});
  app.querySelectorAll('[data-ins]').forEach(b=>b.onclick=()=>{
    const s=b.dataset.ins, a=box.selectionStart, z=box.selectionEnd;
    box.value=box.value.slice(0,a)+s+box.value.slice(z); box.focus(); box.selectionStart=box.selectionEnd=a+s.length;
  });
  if(focus) box.focus({preventScroll:true});
}

/* ============ header: language, theme, static text ============ */
const THEME_KEY='kapanadze-sokrate-theme';
function applyTheme(mode){
  const root=document.documentElement;
  if(mode==='light'||mode==='dark') root.setAttribute('data-theme',mode); else root.removeAttribute('data-theme');
  const b=document.getElementById('themeBtn');
  if(b){
    const label={auto:T('თემა: ავტომატური'),light:T('თემა: ნათელი'),dark:T('თემა: მუქი')}[mode]||T('თემა: ავტომატური');
    b.setAttribute('aria-label',label); b.title=label; b.dataset.mode=mode;
  }
}
function headerText(){
  const set=(id,txt)=>{const el=document.getElementById(id); if(el) el.textContent=txt;};
  set('brandName',T('კაპანაძე AI–სოკრატე'));
  set('brandSub',T('დავით კაპანაძის მეთოდოლოგია · დიაგნოსტიკური სოკრატული დიალოგი'));
  set('skipLink',T('მთავარ შინაარსზე გადასვლა'));
  set('footerText',T('© დავით კაპანაძე · კაპანაძე AI–სოკრატე · თემაზე დაფუძნებული დიაგნოსტიკური მოდელი'));
  document.title=T('კაპანაძე AI–სოკრატე · დიაგნოსტიკური სოკრატული დიალოგი');
  const meta=document.querySelector('meta[name="description"]'); if(meta) meta.content=T('კაპანაძე AI–სოკრატე: სოკრატული დიაგნოსტიკური დიალოგი მათემატიკასა და ისტორიაში — წინარე ცოდნა, სამი დონე, ცოდნის სამი კომპონენტი და დასკვნა ლექტორისთვის.');
  const g=document.getElementById('langSwitch'); if(g) g.setAttribute('aria-label',T('ენა'));
  document.querySelectorAll('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===I18N.lang)));
  chip();
}
// Keeps what the user has typed when the screen is redrawn in another language.
function captureInputs(){
  const app=document.getElementById('app'), snap={};
  app.querySelectorAll('textarea[id],input[type=text][id],select[id]').forEach(el=>{snap[el.id]=el.value});
  const c=app.querySelector('input[name=conf]:checked'); if(c) snap.__conf=c.value;
  if(app.querySelector('#begin')){
    const v=id=>app.querySelector('#'+id);
    if(v('name')) startDraft.name=v('name').value; if(v('grade')) startDraft.grade=v('grade').value;
    if(v('smode')) startDraft.smode=v('smode').value; if(v('scope')) startDraft.scope=v('scope').value;
    if(v('scode')) startDraft.code=v('scode').value; if(v('sgroup')) startDraft.group=v('sgroup').value;
    if(v('smethod')) startDraft.method=v('smethod').value; if(v('stime')) startDraft.timepoint=v('stime').value;
    if(v('otherTopic')) startDraft.otherKey=v('otherTopic').value; if(v('topic')) startDraft.free=v('topic').value;
  }
  return snap;
}
function restoreInputs(snap){
  const app=document.getElementById('app');
  Object.entries(snap).forEach(([id,val])=>{ if(id==='__conf') return; const el=app.querySelector('#'+CSS.escape(id)); if(el&&el.tagName!=='SELECT') el.value=val; });
  if(snap.__conf){ const r=app.querySelector(`input[name=conf][value="${snap.__conf}"]`); if(r) r.checked=true; }
}
function onLanguageChanged(){
  const snap=captureInputs();
  const y=window.scrollY;
  if(S.started&&!S.done){ S.langs=S.langs||[]; if(!S.langs.includes(I18N.lang)) S.langs.push(I18N.lang); save(); }
  headerText();
  applyTheme(document.getElementById('themeBtn')?.dataset.mode||'auto');
  render(false);
  restoreInputs(snap);
  window.scrollTo(0,y);
}
function initHeader(){
  document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>I18N.setLang(b.dataset.lang)));
  I18N.onChange(onLanguageChanged);
  let mode='auto'; try{mode=localStorage.getItem(THEME_KEY)||'auto'}catch(e){}
  applyTheme(mode);
  const tb=document.getElementById('themeBtn');
  if(tb) tb.addEventListener('click',()=>{const next={auto:'light',light:'dark',dark:'auto'}[tb.dataset.mode||'auto']; try{localStorage.setItem(THEME_KEY,next)}catch(e){} applyTheme(next);});
}

/* ============ boot ============ */
registerContent();
registerUIContent();
I18N.apply();
initHeader();
headerText();
const saved=load();
if(saved&&saved.started){ S=Object.assign(freshState(),{name:saved.name,topic:saved.topic||'',grade:saved.grade||'9–10',qids:saved.qids||null,smode:saved.smode||'guided',scope:saved.scope||'full'}); Q=applyScope(questionsFor(saved.topic,saved.questions),saved.qids); }
else Q=questionsFor(SCEN[selTopic]?SCEN[selTopic].topic:'წარმოებული ზღვრის გარეშე');
chip(); render();
(async()=>{
  try{
    if(window.claude&&claude.use){
      sample=await claude.use('sample');
      downloads=await claude.use('downloads');
    }
  }catch(e){sample=null}
  aiState=sample?'on':'off'; chip(); render();
})();
setTimeout(()=>{if(aiState==='checking'){aiState='off';chip();}},11000);
