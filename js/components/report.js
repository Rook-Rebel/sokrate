'use strict';
/* Kapanadze AI–Socrates · final diagnostic report, research panel, CSV exports, AI note.
   The analysis (scores, levels, components, help dose, calibration, zone of proximal development)
   is computed exactly as in the original KA-5.0 program; only the wording is localised. */

const LOCALE=()=>isEN()?'en-GB':'ka-GE';
const COMPNAMES={decl:'დეკლარაციული ცოდნა',proc:'პროცედურული ცოდნა',pers:'პირისეული / მეტაკოგნიტური ცოდნა'};
function errLabel(label){
  if(!isEN()) return label;
  const key=Object.keys(ERR).find(k=>ERR[k]===label);
  return key&&EN.err[key]?EN.err[key]:TX(label);
}

function analysis(){
  const sc=id=>S.results[id]?S.results[id].score:0;
  const pct=list=>list.length?Math.round(list.reduce((a,q)=>a+sc(q.id),0)/(list.length*2)*100):0;
  const byStage=st=>Q.filter(q=>q.stage===st);
  const learn=Q.filter(q=>['I','II','III'].includes(q.stage));
  const comp={};['decl','proc','pers'].forEach(c=>comp[c]=pct(learn.filter(q=>q.comp===c)));
  const pre=pct(byStage('P'));
  const lev={I:pct(byStage('I')),II:pct(byStage('II')),III:pct(byStage('III'))};
  const finQs=byStage('F'), fin=finQs.length?pct(finQs):null;
  const topic=topicLabel(S.topic);
  let place;
  if(lev.I<67) place={lvl:'I',title:T('I დონე — მაღალი მხარდაჭერა'),text:T('თემაზე „{topic}“ მოსწავლეს ჯერ საბაზო ცნებებისა და წინარე ცოდნის გამყარება სჭირდება. მუშაობა უნდა გაგრძელდეს მცირე ნაბიჯებით, კონკრეტული მაგალითებით და ვიზუალური/ცხრილური საყრდენებით.',{topic})};
  else if(lev.II<67) place={lvl:'II',title:T('II დონე — საშუალო მხარდაჭერა'),text:T('თემის საბაზო ნაწილი ძირითადად დაძლეულია. უახლოესი სამუშაო ზონაა წესის გააზრებული გამოყენება, ნაბიჯების ახსნა და შედეგის შემოწმება.')};
  else if(lev.III<67) place={lvl:'III',title:T('III დონე — დამოუკიდებელი მუშაობის განვითარება'),text:T('მოსწავლეს შეუძლია საბაზო და საშუალო დონის მუშაობა. შემდეგი ნაბიჯია ახალ კონტექსტში გადატანა, არგუმენტაცია, რამდენიმე წარმოდგენის დაკავშირება და დამოუკიდებელი თვითშემოწმება.')};
  else place={lvl:'III+',title:T('III დონე დაძლეულია — მზადაა გაფართოებისთვის'),text:T('თემა „{topic}“ მაღალ დონეზეა დაძლეული. შეიძლება გადავიდეს კვლევით, დამტკიცებით, ღია ან ინტეგრირებულ ამოცანებზე და სხვა თემებთან კავშირებზე.',{topic})};
  const preSkills=byStage('P').map(q=>({skill:q.skill,ok:sc(q.id)===2,score:sc(q.id)}));
  const errs={}; S.errors.forEach(e=>{const k=e.err||('ai:'+e.label);errs[k]=(errs[k]||0)+1});
  const lr=learn.map(q=>S.results[q.id]).filter(Boolean);
  const avgHelp=lr.length?(lr.reduce((a,r)=>a+r.help,0)/lr.length):0;
  const independent=lr.length?Math.round(lr.filter(r=>r.verdict==='correct'&&r.help===0).length/lr.length*100):0;
  // confidence calibration (first attempt vs. stated confidence)
  const cal={ok:0,over:0,under:0,mid:0,n:0,sumOk:0,nOk:0,sumBad:0,nBad:0,mean:0};
  Object.values(S.results).forEach(r=>{ if(!r.conf) return; cal.n++; const good=r.first==='correct'; cal.mean+=r.conf;
    if(good){cal.sumOk+=r.conf;cal.nOk++}else{cal.sumBad+=r.conf;cal.nBad++}
    if(r.conf>=4){good?cal.ok++:cal.over++} else if(r.conf<=2){good?cal.under++:cal.ok++} else cal.mid++; });
  cal.mean=cal.n?cal.mean/cal.n:0; cal.meanOk=cal.nOk?cal.sumOk/cal.nOk:null; cal.meanBad=cal.nBad?cal.sumBad/cal.nBad:null;
  const calDen=cal.ok+cal.over+cal.under; cal.pct=calDen?Math.round(cal.ok/calDen*100):null;
  const revealed=Object.values(S.results).filter(r=>r.revealed).length, selfExpl=Object.values(S.results).filter(r=>r.selfExpl).length;
  const compNames=c=>T(COMPNAMES[c]);
  const entries=Object.entries(comp);
  const strongest=entries.slice().sort((a,b)=>b[1]-a[1])[0];
  const weakest=entries.slice().sort((a,b)=>a[1]-b[1])[0];
  const know=strongest[1]===weakest[1]?T('სამივე კომპონენტი ერთ დონეზეა ({p}%).',{p:strongest[1]}):weakest[1]>=67?T('სამივე კომპონენტი დაძლეულია: დეკლარაციული {d}%, პროცედურული {p}%, პირისეული / მეტაკოგნიტური {m}%. შედარებით მეტი ყურადღება — {w}.',{d:comp.decl,p:comp.proc,m:comp.pers,w:compNames(weakest[0])}):T('{s} შედარებით ძლიერი კომპონენტია ({sp}%). {w} ამ ეტაპზე მეტ გაძლიერებას საჭიროებს ({wp}%).',{s:compNames(strongest[0]),sp:strongest[1],w:compNames(weakest[0]),wp:weakest[1]});
  const canDo=lev.II>=67?T('მოსწავლეს შეუძლია არჩეული თემის წესებისა და მეთოდების გამოყენება საშუალო სირთულის ამოცანებში.'):(lev.I>=67?T('მოსწავლეს შეუძლია თემის საბაზო ცნებების ამოცნობა და ძირითადი მოქმედებების შესრულება.'):T('მოსწავლე ჯერ თემის საწყის ცნებებსა და წინარე ცოდნას ამყარებს.'));
  let selfCheck=comp.pers>=67?T('მოსწავლე ავლენს თვითშემოწმებისა და საკუთარი მსჯელობის ახსნის უნარს; სასურველია ეს ჩვევა ახალ კონტექსტებშიც შენარჩუნდეს.'):T('საჭიროა თვითშემოწმების მიზანმიმართული განვითარება: პატარა შემთხვევის გამოცდა, ალტერნატიული გზით გადამოწმება, შეფასება ან საკუთარი ნაბიჯის სიტყვიერად ახსნა.');
  if(cal.pct!==null){
    selfCheck+=' '+T('თავდაჯერებულობის კალიბრაცია: {p}%.',{p:cal.pct});
    if(cal.over>=2) selfCheck+=' '+T('ხშირია ზედმეტი თავდაჯერება — მოსწავლე დარწმუნებულია, თუმცა პირველი პასუხი მცდარია.');
    if(cal.under>=2) selfCheck+=' '+T('ხშირია ნაკლები თავდაჯერება — სწორ პასუხებშიც არ არის დარწმუნებული.');
  }
  let finText='';
  if(fin!==null){
    const helped=lev.III>=67||lev.II>=67;
    if(fin>=75) finText=T('დიალოგში აგებული ცოდნა მოსწავლემ დამოუკიდებლად, დახმარების გარეშე გამოიყენა ახალ ფუნქციაზე — ცოდნა მისი გახდა.');
    else if(fin>=40) finText=T('ახალ ფუნქციაზე ცოდნა ნაწილობრივ გადაიტანა. სასურველია ერთი-ორი მსგავსი ამოცანა მინიშნებების თანდათანობითი შემცირებით.');
    else finText=helped?T('დიალოგში, დახმარებით, მოსწავლემ შედეგს მიაღწია, მაგრამ დამოუკიდებელი გადატანა ჯერ ვერ ხერხდება — ცოდნა ჯერ კიდევ დახმარებაზეა დამოკიდებული.'):T('დამოუკიდებელი გადატანა ჯერ ვერ ხერხდება; საჭიროა ძირითადი ნაბიჯების განმეორება.');
  }
  const perQ=Q.map(q=>{const r=S.results[q.id]||{};const lg=S.log.filter(x=>x.q===q.id);
    const errs=S.errors.filter(e=>e.q===q.id).map(e=>ERR[e.err]||e.label||e.err);
    return {q,r,help:r.help||0,revealed:!!r.revealed,score:r.score??0,tries:r.tries||0,
      controls:lg.filter(x=>x.kind==='control').length,stuck:lg.filter(x=>String(x.kind).startsWith('stuck')).length,
      simpler:lg.filter(x=>x.kind==='simpler').length,errs:[...new Set(errs)]};});
  const doseOf=list=>{const xs=perQ.filter(p=>list.includes(p.q));const n=xs.length;
    return {n,steps:xs.reduce((a,p)=>a+p.help,0),controls:xs.reduce((a,p)=>a+p.controls,0),withHelp:xs.filter(p=>p.help>0).length,
      revealed:xs.filter(p=>p.revealed).length,indep:xs.filter(p=>p.r.verdict==='correct'&&p.help===0).length,
      avg:n?xs.reduce((a,p)=>a+p.help,0)/n:0,max:n?Math.max(...xs.map(p=>p.revealed?4:p.help)):0};};
  const doseStage={}; ['P','I','II','III','F'].forEach(st=>{const l=byStage(st); if(l.length) doseStage[st]=doseOf(l)});
  const doseComp={}; ['decl','proc','pers'].forEach(c=>doseComp[c]=doseOf(learn.filter(q=>q.comp===c)));
  const totalSteps=perQ.reduce((a,p)=>a+p.help,0), totalControls=perQ.reduce((a,p)=>a+p.controls,0);
  const hotspots=perQ.filter(p=>p.q.stage!=='P'&&(p.revealed||p.help>=2||p.score<1)).sort((a,b)=>(b.revealed-a.revealed)||(b.help-a.help)||(a.score-b.score));
  const total=Q.length?Math.round(Q.reduce((a,q)=>a+sc(q.id),0)/(Q.length*2)*100):0;
  return {comp,pre,lev,fin,finQs,finText,place,preSkills,errs,avgHelp,independent,cal,revealed,selfExpl,know,canDo,selfCheck,zpd:place.text,sc,perQ,doseStage,doseComp,totalSteps,totalControls,hotspots,total};
}
function needs(A){
  const out=[];
  A.preSkills.filter(s=>!s.ok).forEach(s=>out.push(T('<b>წინარე ცოდნა:</b> {skill} — საჭიროა მოკლე განმეორება და შემდეგ ხელახალი შემოწმება.',{skill:esc(TX(s.skill))})));
  if(A.comp.decl<67) out.push(T('<b>დეკლარაციული ცოდნა:</b> თემის ძირითადი ცნებების საკუთარი სიტყვებით ახსნა, მაგალითისა და კონტრმაგალითის მოყვანა, სხვადასხვა წარმოდგენის დაკავშირება.'));
  if(A.comp.proc<67) out.push(T('<b>პროცედურული ცოდნა:</b> ამოცანის ამოხსნის ნაბიჯების გამჭვირვალედ აგება — ჯერ მარტივი მაგალითი, შემდეგ საშუალო და ბოლოს დამოუკიდებელი გამოყენება.'));
  if(A.comp.pers<67) out.push(T('<b>პირისეული / მეტაკოგნიტური ცოდნა:</b> თვითშემოწმების ჩვევა — „რატომ მუშაობს ეს ნაბიჯი?“, „როგორ შევამოწმებ?“, „სხვა გზითაც შეიძლება?“ ტიპის კითხვები.'));
  if(A.cal.over>=2) out.push(T('<b>ზედმეტი თავდაჯერება:</b> სთხოვეთ, პასუხის ჩაწერამდე ერთი სწრაფი შემოწმება გააკეთოს (ჩასმა, კონკრეტული მნიშვნელობა, ფრჩხილების გახსნა).'));
  if(A.cal.under>=2) out.push(T('<b>ნაკლები თავდაჯერება:</b> აჩვენეთ, რომ სწორი პასუხები მისი საკუთარი მსჯელობის შედეგია; სთხოვეთ, თვითონ დაასაბუთოს, რატომ არის პასუხი სწორი.'));
  const k=offlineTopicKey(S.topic), sk=SCEN[k];
  if(A.fin!==null&&A.fin<67) out.push(sk?supfmt(scenField(k,'transfer')):T('<b>დამოუკიდებელი გადატანა:</b> 2–3 მსგავსი ამოცანა მინიშნებების თანდათანობითი შემცირებით.'));
  if(A.hotspots&&A.hotspots.length) out.push(T('<b>მიზნობრივი დახმარება:</b> განსაკუთრებით — {list}. აქ დაიწყეთ იმ დონის მინიშნებით, რომელიც დიალოგში ეფექტური აღმოჩნდა, და თანდათან შეამცირეთ.',{list:A.hotspots.slice(0,4).map(p=>esc(p.q.id)+' ('+esc(T(COMPSHORT[p.q.comp]||'წინარე'))+')').join(', ')}));
  if(A.independent<60) out.push(T('<b>დამოუკიდებლობა:</b> შეამცირეთ მინიშნებები თანდათანობით; მომდევნო ამოცანაზე პირველი ნაბიჯი მოსწავლემ თვითონ უნდა აირჩიოს.'));
  if(!out.length) out.push(T('მნიშვნელოვანი ხარვეზი არ გამოვლინდა. მიზანშეწონილია გაფართოებული, ღია და ტრანსფერული ამოცანები')+(sk?': '+supfmt(scenField(k,'ext')):'.'));
  return out;
}
function lecturerConclusion(A){
  const who=S.name||S.study.code||T('მოსწავლე');
  const P=[];
  P.push(T('{who} თემაზე „{topic}“ მუშაობდა რეჟიმში „{mode}“ ({scope}, {n} კითხვა). საერთო შედეგი — {total}%. სავარაუდო ადგილი: <b>{place}</b>.',{who:esc(who),topic:esc(topicLabel(S.topic)),mode:T(MODES[S.smode]),scope:T(SCOPES[S.scope]),n:Q.length,total:A.total,place:A.place.title}));
  const gaps=A.preSkills.filter(s=>!s.ok).map(s=>esc(TX(s.skill)));
  P.push(T('<b>წინარე ცოდნა ({p}%).</b> ',{p:A.pre})+(gaps.length?T('ხარვეზი გამოვლინდა: {gaps}. ამ საფუძვლების გამყარების გარეშე მომდევნო დონეებზე დახმარების საჭიროება იზრდება.',{gaps:gaps.join('; ')}):T('საჭირო საფუძველი არსებობს.')));
  P.push(T('<b>ცოდნის სამი კომპონენტი (I–III დონე):</b> დეკლარაციული {d}%, პროცედურული {p}%, პირისეული / მეტაკოგნიტური {m}%. {know} დონეების მიხედვით: I — {l1}%, II — {l2}%, III — {l3}%.',{d:A.comp.decl,p:A.comp.proc,m:A.comp.pers,know:A.know,l1:A.lev.I,l2:A.lev.II,l3:A.lev.III}));
  if(indep()) P.push(T('<b>დახმარება:</b> სესია დამოუკიდებელი დიაგნოსტიკის რეჟიმში ჩატარდა — მინიშნებები არ გამოყენებულა, ამიტომ შედეგი აჩვენებს მოსწავლის საწყის, დაუხმარებელ მდგომარეობას.'));
  else{
    const ds=['I','II','III'].filter(st=>A.doseStage[st]).map(st=>T('{st} დონე — {s} ნაბიჯი ({w}/{n} კითხვაზე)',{st,s:A.doseStage[st].steps,w:A.doseStage[st].withHelp,n:A.doseStage[st].n})).join('; ');
    const dc=Object.entries(A.doseComp).filter(([c,d])=>d.n).sort((a,b)=>b[1].avg-a[1].avg)[0];
    P.push(T('<b>დახმარების დოზა:</b> სულ {steps} დახმარების ნაბიჯი და {controls} საკონტროლო კითხვა; საშუალო დონე {avg} / 3; დამოუკიდებლად სწორი პასუხები — {ind}%. {ds}.',{steps:A.totalSteps,controls:A.totalControls,avg:A.avgHelp.toFixed(1),ind:A.independent,ds})+(dc&&dc[1].avg>0?' '+T('ყველაზე მეტი მხარდაჭერა დასჭირდა კომპონენტს: <b>{c}</b> (საშუალოდ {a}).',{c:T(COMPSHORT[dc[0]]),a:dc[1].avg.toFixed(1)}):'')+(A.revealed?' '+T('{r} კითხვაზე სამივე დონემ არ იკმარა და სწორი პასუხი იქნა ნაჩვენები (თვითახსნა: {s}/{r}).',{r:A.revealed,s:A.selfExpl}):''));
  }
  if(A.hotspots.length) P.push(T('<b>სად სჭირდება დახმარება:</b> {list}.',{list:A.hotspots.slice(0,5).map(p=>`${esc(p.q.id)} — ${esc(p.q.skill&&p.q.stage==='P'?TX(p.q.skill):T(COMPSHORT[p.q.comp]||''))}${p.errs.length?' („'+esc(errLabel(p.errs[0]))+'“)':''}`).join('; ')}));
  if(A.cal.n) P.push(T('<b>თავდაჯერება:</b> საშუალოდ {m} / 5',{m:A.cal.mean.toFixed(1)})+(A.cal.meanOk!=null?T('; სწორ პირველ პასუხებზე — {v}',{v:A.cal.meanOk.toFixed(1)}):'')+(A.cal.meanBad!=null?T(', მცდარზე — {v}',{v:A.cal.meanBad.toFixed(1)}):'')+T('. კალიბრაცია {p}%',{p:A.cal.pct??'—'})+(A.cal.over>=2?T('; შეინიშნება ზედმეტი თავდაჯერება'):'')+(A.cal.under>=2?T('; შეინიშნება ნაკლები თავდაჯერება'):'')+'.');
  if(A.fin!==null) P.push(T('<b>დამოუკიდებელი გადატანა ({p}%):</b> {t}',{p:A.fin,t:A.finText}));
  P.push(T('<b>უახლოესი განვითარების ზონა:</b> {z}',{z:A.zpd}));
  const nx=needs(A).slice(0,3).map(x=>x.replace(/<[^>]+>/g,''));
  P.push(T('<b>ლექტორის შემდეგი ნაბიჯები:</b> ')+nx.map((x,i)=>(i+1)+') '+x).join(' '));
  return P.map(x=>'<p>'+x+'</p>').join('');
}
function verdictKa(v){return {correct:T('სწორი'),partial:T('ნაწილობრივ'),wrong:T('მცდარი'),stuck:T('გაიჭედა')}[v]||'—'}
function renderReport(app){
  const A=analysis();
  const cell=(st,c)=>{
    const qs=Q.filter(q=>q.stage===st&&q.comp===c); if(!qs.length) return '<td class="cn">—</td>';
    const s=qs.reduce((a,q)=>a+A.sc(q.id),0)/(qs.length*2);
    const cls=s>=.99?'c2':s>=.5?'c1':'c0';
    const word=s>=.99?T('დაძლეულია'):s>=.5?T('ნაწილობრივ'):T('სჭირდება მხარდაჭერა');
    const help=Math.max(...qs.map(q=>S.results[q.id]?S.results[q.id].help:0));
    return `<td class="${cls}"><b>${word}</b>${st==='F'?T('დამოუკიდებლად'):(help?T('დახმარება: {n} დონე',{n:help}):T('დახმარების გარეშე'))}</td>`;
  };
  const rows=['I','II','III'].concat(A.fin!==null?['F']:[]);
  const rowName=st=>st==='F'?T('საბოლოო · {p}%',{p:A.fin}):T('{st} დონე · {p}%',{st,p:A.lev[st]});
  const errLines=Object.entries(A.errs).map(([k,v])=>`<span class="chip no">${esc(ERR[k]?errLabel(ERR[k]):k.replace(/^ai:/,''))}${v>1?' ×'+v:''}</span>`).join('')||`<span class="chip ok">${T('ტიპური შეცდომა არ დაფიქსირებულა')}</span>`;
  const finChips=A.finQs.map(q=>{const s=A.sc(q.id);return `<span class="chip ${s===2?'ok':'no'}">${q.id}: ${s===2?T('სწორი'):s===1?T('ნაწილობრივ'):T('ვერ შესრულდა')}</span>`}).join('');
  const studyLine=T('<b>რეჟიმი:</b> {mode} · <b>კითხვები:</b> {scope} ({n}) · <b>კოდი:</b> {code} · <b>ჯგუფი:</b> {group} · <b>მიდგომა:</b> {method} · <b>ეტაპი:</b> {time}',
    {mode:T(MODES[S.smode]),scope:T(SCOPES[S.scope]),n:Q.length,code:esc(S.study.code||'—'),group:esc(S.study.group||'—'),method:esc(T(S.study.method)),time:esc(T(S.study.timepoint))});
  app.innerHTML=`
  <section class="card rep">
    <h2>${T('საბოლოო დიაგნოსტიკური დასკვნა')}${S.name?': '+esc(S.name):''}</h2>
    <div class="rep-meta">
      <div class="hint">${T('<b>თემა:</b> {topic} · <b>დონე:</b> {grade}',{topic:esc(topicLabel(S.topic)||'—'),grade:esc(gradeLabel(S.grade)||'—')})}</div>
      <div class="hint">${T('{date} · {n} სვლა · საშუალო დახმარების დონე {h} · დამოუკიდებლობა {i}% · საერთო {t}%',{date:new Date().toLocaleDateString(LOCALE()),n:S.log.length,h:A.avgHelp.toFixed(1),i:A.independent,t:A.total})}</div>
      <div class="hint">${studyLine}</div>
    </div>
    <div class="authorline">${T('მეთოდური მოდელი: დავით კაპანაძე')}</div>
    <div class="kpis" role="list">
      <div class="kpi" role="listitem"><span>${T('საერთო')}</span><b>${A.total}%</b></div>
      <div class="kpi" role="listitem"><span>${T('წინარე ცოდნა')}</span><b>${A.pre}%</b></div>
      <div class="kpi" role="listitem"><span>${T('დამოუკიდებლობა')}</span><b>${A.independent}%</b></div>
      <div class="kpi" role="listitem"><span>${T('კალიბრაცია')}</span><b>${A.cal.pct!==null?A.cal.pct+'%':'—'}</b></div>
    </div>
    <div class="scale-note">${T('<b>შეფასების სკალა:</b> 2 ქულა — დამოუკიდებლად სწორი პასუხი; 1.5 — პირველი, მსუბუქი სოკრატული მინიშნების შემდეგ; 1 — მეორე/მესამე დონის დახმარებით ან ნაწილობრივ სწორი პასუხი; 0 — ამ ეტაპზე ვერ შესრულდა.')}</div>
    <div class="place"><div class="hint">${T('სად იმყოფება მოსწავლე')}</div><div class="big">${A.place.title}</div><div>${A.place.text}</div></div>
    ${A.fin!==null?`<div class="place finbox"><div class="hint">${T('საბოლოო დამოუკიდებელი შემოწმება (დახმარების გარეშე)')}</div><div class="big">${A.fin}%</div><div>${A.finText}</div><div class="chips">${finChips}</div></div>`:''}

    <div class="lectnote"><div class="big">${T('ლექტორის დასკვნა')}</div>${lecturerConclusion(A)}</div>

    <h3>${T('ინდივიდუალური პედაგოგიური სურათი')}</h3>
    <div class="finalgrid">
      <div class="finalbox"><b>${T('რა იცის მოსწავლემ')}</b><span>${A.know}</span></div>
      <div class="finalbox"><b>${T('რის გაკეთება შეუძლია')}</b><span>${A.canDo}</span></div>
      <div class="finalbox"><b>${T('როგორ ამოწმებს საკუთარ აზროვნებას')}</b><span>${A.selfCheck}</span></div>
      <div class="finalbox"><b>${T('უახლოესი განვითარების ზონა')}</b><span>${A.zpd}</span></div>
    </div>

    <h3>${T('დონეები × ცოდნის კომპონენტები')}</h3>
    <div class="matrix"><table>
      <caption class="sr-only">${T('დონეები × ცოდნის კომპონენტები')}</caption>
      <tr><th></th><th scope="col">${T('დეკლარაციული')}</th><th scope="col">${T('პროცედურული')}</th><th scope="col">${T('პირისეული / მეტაკოგნიტური')}</th></tr>
      ${rows.map(st=>`<tr><th scope="row">${rowName(st)}</th>${cell(st,'decl')}${cell(st,'proc')}${cell(st,'pers')}</tr>`).join('')}
    </table></div>

    <h3>${T('ცოდნის კომპონენტები (I–III დონე)')}</h3>
    <div class="comp">
      ${['decl','proc','pers'].map(c=>`<div><div class="hint">${T(COMPSHORT[c])}</div><div class="pct">${A.comp[c]}%</div><div class="meter" role="progressbar" aria-label="${esc(T(COMPSHORT[c]))}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${A.comp[c]}"><i data-w="${A.comp[c]}"></i></div><div class="hint">${T(COMP[c]).split('·')[1]||''}</div></div>`).join('')}
    </div>

    <h3>${T('დახმარების დოზა — ეტაპებისა და კომპონენტების მიხედვით')}</h3>
    ${indep()?`<p class="hint">${T('დამოუკიდებელი დიაგნოსტიკის რეჟიმი — მინიშნებები არ გამოიყენებოდა.')}</p>`:`<div class="qtab"><table>
      <tr><th>${T('ეტაპი / კომპონენტი')}</th><th>${T('კითხვა')}</th><th>${T('დახმარებით')}</th><th>${T('დახმარების ნაბიჯი')}</th><th>${T('საკონტროლო კითხვა')}</th><th>${T('საშ. დონე (0–3)')}</th><th>${T('პასუხი ნაჩვენებია')}</th><th>${T('დამოუკიდებლად სწორი')}</th></tr>
      ${[...Object.entries(A.doseStage).map(([k,d])=>[T(STAGES.find(s=>s.id===k).name),d]),...Object.entries(A.doseComp).filter(([c,d])=>d.n).map(([c,d])=>[T(COMPSHORT[c])+' (I–III)',d])].map(([nm,d])=>`<tr><td>${nm}</td><td class="n">${d.n}</td><td class="n">${d.withHelp}</td><td class="n">${d.steps}</td><td class="n">${d.controls}</td><td class="n"><span class="dose d${Math.min(3,Math.round(d.avg))}">${d.avg.toFixed(1)}</span></td><td class="n">${d.revealed}</td><td class="n">${d.indep}</td></tr>`).join('')}
    </table></div>`}

    <h3>${T('კითხვების მიხედვით: სად, რა დახმარება და რა დოზით დასჭირდა')}</h3>
    <div class="legend"><span><span class="dose d0">0</span> ${T('დამოუკიდებლად')}</span><span><span class="dose d1">1</span> ${T('მიმართული კითხვა')}</span><span><span class="dose d2">2</span> ${T('ნაწილობრივი მინიშნება')}</span><span><span class="dose d3">3</span> ${T('ანალოგიური ნაბიჯი')}</span><span><span class="dose dR">R</span> ${T('პასუხი ნაჩვენებია')}</span></div>
    <div class="qtab"><table>
      <tr><th>${T('ეტაპი · კითხვა')}</th><th>${T('კომპონენტი')}</th><th>${T('თავდაჯ. (1–5)')}</th><th>${T('პირველი ცდა')}</th><th>${T('საკონტ. კითხვა')}</th><th>${T('დახმარება')}</th><th>${T('საბოლოო')}</th><th>${T('ქულა')}</th><th>${T('ტიპური შეცდომა')}</th></tr>
      ${A.perQ.map(p=>{const lbl=plain(p.q.stage==='P'&&p.q.skill?TX(p.q.skill):TX(p.q.text));return `<tr><td><b>${esc(p.q.stage)} · ${esc(p.q.id)}</b><br><span class="hint">${esc(lbl.slice(0,90))}${lbl.length>90?'…':''}</span></td><td>${p.q.comp==='pre'?T('წინარე ცოდნა'):T(COMPSHORT[p.q.comp])}</td><td class="n">${p.r.conf||'—'}</td><td>${verdictKa(p.r.first)}</td><td class="n">${p.controls}</td><td class="n">${p.r.noHelp&&!p.revealed&&p.help===0&&(p.q.stage==='F'||indep())?`<span class="hint">${T('გარეშე')}</span>`:`<span class="dose ${p.revealed?'dR':'d'+p.help}">${p.revealed?'R':p.help}</span>`}${!p.revealed&&p.help?'<br><span class="hint">'+T(HELPNAME[p.help])+'</span>':''}</td><td>${p.revealed?T('ნაჩვენები')+(p.r.selfExpl?' · '+T('თვითახსნა'):''):verdictKa(p.r.verdict)}</td><td class="n">${S.results[p.q.id]?p.score:'—'}</td><td>${p.errs.map(x=>esc(errLabel(x))).join('; ')||'—'}</td></tr>`}).join('')}
    </table></div>

    <h3>${T('თავდაჯერებულობის კალიბრაცია')}${A.cal.pct!==null?' · '+A.cal.pct+'%':''}</h3>
    ${A.cal.n?`<p class="hint">${T('5-ბალიანი სკალა: 4–5 = დარწმუნებული, 1–2 = დაურწმუნებელი, 3 = ნაწილობრივ. საშუალო თავდაჯერება {m} / 5',{m:A.cal.mean.toFixed(1)})}${A.cal.meanOk!=null?T(' · სწორ პირველ პასუხებზე {v}',{v:A.cal.meanOk.toFixed(1)}):''}${A.cal.meanBad!=null?T(' · მცდარზე {v}',{v:A.cal.meanBad.toFixed(1)}):''}.</p>`:''}
    ${A.cal.n?`<div class="comp cal">
      <div><div class="hint">${T('თანხვედრა')}</div><div class="pct">${A.cal.ok}</div><div class="hint">${T('4–5 და სწორი, ან 1–2 და მცდარი')}</div></div>
      <div><div class="hint">${T('ზედმეტი თავდაჯერება')}</div><div class="pct">${A.cal.over}</div><div class="hint">${T('4–5, მაგრამ პირველი პასუხი მცდარია')}</div></div>
      <div><div class="hint">${T('ნაკლები თავდაჯერება')}</div><div class="pct">${A.cal.under}</div><div class="hint">${T('1–2, მაგრამ პასუხი სწორია')}</div></div>
      <div><div class="hint">${T('„ნაწილობრივ“ (3)')}</div><div class="pct">${A.cal.mid}</div><div class="hint">${T('კალიბრაციაში არ ითვლება')}</div></div>
    </div>`:`<p class="hint">${T('თავდაჯერებულობის მონაცემები არ არის.')}</p>`}
    ${A.revealed?`<p class="hint">${T('თვითახსნა სწორი პასუხის ჩვენების შემდეგ: {s} / {r}',{s:A.selfExpl,r:A.revealed})}</p>`:''}

    <h3>${T('წინარე ცოდნა')} · ${A.pre}%</h3>
    <div class="chips">${A.preSkills.map(s=>`<span class="chip ${s.ok?'ok':'no'}">${esc(TX(s.skill))}</span>`).join('')}</div>

    <h3>${T('გამოვლენილი ტიპური შეცდომები')}</h3>
    <div class="chips">${errLines}</div>

    <h3>${T('რა ესაჭიროება მოსწავლეს')}</h3>
    <ul class="needs">${needs(A).map(x=>`<li>${x}</li>`).join('')}</ul>
    ${S.flags.length?`<p class="flag">${T('ლექტორის ყურადღება საჭიროა: {ids} — დახმარების მესამე დონეც არ იკმარა.',{ids:S.flags.map(esc).join(', ')})}</p>`:''}
    ${notesPanel(false)}

    <h3>${T('AI-ის დასკვნა ლექტორისთვის')}</h3>
    <div class="ainote" id="aiNote">${S.aiNote?esc(S.aiNote):(sample?T('დააჭირე ღილაკს — AI წაიკითხავს დიალოგის ჟურნალს და დაწერს მოკლე დასკვნას.'):T('AI ამ ხედში მიუწვდომელია. ზემოთ მოცემული დასკვნა წესების მიხედვით არის შედგენილი.'))}</div>
    <div class="actions">
      ${sample?`<button class="btn ghost" id="aiBtn" type="button">${S.aiNote?T('ხელახლა დაწერა'):T('დასკვნის დაწერა')}</button>`:''}
      <button class="btn ghost" id="theoryRep" type="button">${T('თეორიული საფუძვლები (ლექტორისთვის)')}</button>
      <button class="btn ghost" id="expQ" type="button">${T('შედეგები კითხვების მიხედვით (CSV)')}</button>
      <button class="btn ghost" id="copy" type="button">${T('ჟურნალის კოპირება (CSV)')}</button>
      <button class="btn ghost" id="dl" type="button">${T('ჟურნალის ჩამოტვირთვა')}</button>
      <button class="btn ghost" id="print" type="button">${T('დასკვნის ბეჭდვა / PDF')}</button>
      <button class="btn ghost" id="toResearch" type="button">${T('მკვლევრის პანელი')}</button>
      <button class="btn stuck" id="again" type="button">${T('თავიდან დაწყება')}</button>
    </div>
    <div class="status" id="status" role="status" aria-live="polite"></div>
    <div class="authorline">${T('© დავით კაპანაძე · სოკრატე AI — თემაზე დაფუძნებული დიაგნოსტიკური მოდელი')}</div>
  </section>`;
  app.querySelectorAll('.meter i[data-w]').forEach(i=>{i.style.width=i.dataset.w+'%'});
  const ab=app.querySelector('#aiBtn'); if(ab) ab.onclick=()=>aiReport(A);
  app.querySelector('#theoryRep').onclick=()=>openTheory();
  app.querySelector('#copy').onclick=async()=>{
    try{await navigator.clipboard.writeText(csv());status(T('ჟურნალი დაკოპირდა.'))}
    catch(e){status(T('კოპირება ვერ მოხერხდა ამ ხედში.'),'warn')}
  };
  const fname=x=>'sokrate-ai-'+x+'-'+(S.study.code||S.name||'mosts').replace(/\s+/g,'_')+'.csv';
  app.querySelector('#dl').onclick=async()=>{status(await downloadFile(fname('journal'),csv())?T('ფაილი გადაეცა შენახვისთვის.'):T('ჩამოტვირთვა ვერ შესრულდა.'))};
  app.querySelector('#expQ').onclick=async()=>{status(await downloadFile(fname('results'),csvRows(localizeRows(rowsForSession(S,Q))))?T('ფაილი გადაეცა შენახვისთვის.'):T('ჩამოტვირთვა ვერ შესრულდა.'))};
  app.querySelector('#print').onclick=()=>window.print();
  app.querySelector('#toResearch').onclick=()=>{view='research';render();window.scrollTo(0,0)};
  app.querySelector('#again').onclick=()=>{S=freshState();try{localStorage.removeItem(KEY)}catch(e){}render();window.scrollTo(0,0)};
}
// Stored rows keep Georgian source values; in English mode the text columns are translated on export.
function rowsForSession(s,qs){
  return qs.map(q=>{const r=s.results[q.id]||{};const lg=s.log.filter(x=>x.q===q.id);
    return {version:VERSION,date:(s.startedAt||'').slice(0,10),topic:s.topic,grade:s.grade,name:s.name,student_code:s.study.code,group:s.study.group,teaching_method:s.study.method,timepoint:s.study.timepoint,
      mode:s.smode,scope:s.scope,question_id:q.id,stage:q.stage,component:q.comp,skill:q.stage==='P'?(q.skill||''):'',question:plain(q.text),
      confidence_1_5:r.conf||'',first_attempt:r.first||'',final_verdict:r.revealed?'revealed':(r.verdict||''),help_level_0_3:r.help??'',tries:r.tries??'',
      control_questions:lg.filter(x=>x.kind==='control').length,stuck_presses:lg.filter(x=>String(x.kind).startsWith('stuck')).length,
      self_explanation:r.selfExpl?'yes':'',score_0_2:r.score??'',errors:[...new Set(s.errors.filter(e=>e.q===q.id).map(e=>ERR[e.err]||e.label||e.err))].join('; '),
      ui_lang:(s.langs&&s.langs.length?s.langs:['ka']).join('+')};});
}
function localizeRows(rows){
  if(!isEN()) return rows;
  return rows.map(r=>Object.assign({},r,{
    topic:topicLabel(r.topic), grade:gradeLabel(r.grade), teaching_method:T(r.teaching_method), timepoint:T(r.timepoint),
    skill:r.skill?TXP(r.skill):'', question:TXP(r.question),
    errors:String(r.errors||'').split('; ').filter(Boolean).map(errLabel).join('; ')
  }));
}
function archiveSession(){
  if(S.archived) return;
  try{
    const A=analysis();
    const rec={id:Date.now(),version:VERSION,ended:new Date().toISOString(),topic:S.topic,grade:S.grade,name:S.name,study:S.study,smode:S.smode,scope:S.scope,n:Q.length,
      total:A.total,pre:A.pre,lev:A.lev,comp:A.comp,fin:A.fin,independent:A.independent,avgHelp:A.avgHelp,steps:A.totalSteps,revealed:A.revealed,cal:A.cal.pct,confMean:A.cal.mean,
      rows:rowsForSession(S,Q)};
    const a=getArchive(); a.push(rec); putArchive(a); S.archived=true;
  }catch(e){}
}
function renderResearch(app){
  const all=getArchive();
  const g={}; all.forEach(x=>{const k=[topicLabel(x.topic),x.study.group||T('ჯგუფის გარეშე'),T(x.study.method),T(x.study.timepoint),T(MODES[x.smode]||x.smode)].join(' / ');(g[k]=g[k]||[]).push(x)});
  const avg=(l,f)=>{const v=l.map(f).filter(x=>x!=null&&!isNaN(x));return v.length?(v.reduce((a,b)=>a+b,0)/v.length):null};
  const f1=v=>v==null?'—':Math.round(v)+'%';
  app.innerHTML=`<section class="card rep">
    <div class="row spread"><h2>${T('მკვლევრის პანელი')}</h2><button class="btn ghost" id="rback" type="button">← ${T('დაბრუნება')}</button></div>
    <p class="hint">${T('ამ ბრაუზერში დაარქივებული დასრულებული სესიები: <b>{n}</b>. მონაცემები ინახება მხოლოდ ლოკალურად — სერვერი, ავტორიზაცია და სინქრონიზაცია არ არის. ყოველი პილოტის შემდეგ ჩამოტვირთეთ CSV.',{n:all.length})}</p>
    <div class="scale-note">${T('შედარება აღწერითია და თავისთავად სწავლების მეთოდის ეფექტურობას არ ამტკიცებს. საველე კვლევამდე საჭიროა კითხვების ვალიდაცია და კვლევის პროტოკოლი.')}</div>
    <h3>${T('აღწერითი დაჯგუფება')}</h3>
    <div class="qtab"><table>
      <tr><th>${T('თემა / ჯგუფი / მიდგომა / ეტაპი / რეჟიმი')}</th><th>N</th><th>${T('საერთო')}</th><th>${T('წინარე')}</th><th>${T('დეკლ.')}</th><th>${T('პროც.')}</th><th>${T('მეტაკ.')}</th><th>${T('საბოლოო')}</th><th>${T('დამოუკ.')}</th><th>${T('საშ. დახმარება')}</th><th>${T('თავდაჯ. (1–5)')}</th></tr>
      ${Object.entries(g).map(([k,l])=>`<tr><td>${esc(k)}</td><td class="n">${l.length}</td><td class="n">${f1(avg(l,x=>x.total))}</td><td class="n">${f1(avg(l,x=>x.pre))}</td><td class="n">${f1(avg(l,x=>x.comp.decl))}</td><td class="n">${f1(avg(l,x=>x.comp.proc))}</td><td class="n">${f1(avg(l,x=>x.comp.pers))}</td><td class="n">${f1(avg(l,x=>x.fin))}</td><td class="n">${f1(avg(l,x=>x.independent))}</td><td class="n">${(avg(l,x=>x.avgHelp)??0).toFixed(1)}</td><td class="n">${(avg(l,x=>x.confMean)??0).toFixed(1)}</td></tr>`).join('')||`<tr><td colspan="11">${T('დასრულებული სესია ჯერ არ არის.')}</td></tr>`}
    </table></div>
    <h3>${T('სესიები')}</h3>
    <div class="qtab"><table><tr><th>${T('თარიღი')}</th><th>${T('სახელი / კოდი')}</th><th>${T('თემა')}</th><th>${T('რეჟიმი')}</th><th>${T('კითხვა')}</th><th>${T('საერთო')}</th><th>${T('დახმ. ნაბიჯი')}</th><th>${T('ნაჩვენები')}</th></tr>
      ${all.slice().reverse().map(x=>`<tr><td>${esc(new Date(x.ended).toLocaleString(LOCALE()))}</td><td>${esc(x.name||x.study.code||T('ანონიმური'))}</td><td>${esc(topicLabel(x.topic))}</td><td>${esc(x.smode==='independent'?T('დიაგნოსტიკა'):T('სოკრატული'))} · ${esc(SCOPES[x.scope]?T(SCOPES[x.scope]):'')}</td><td class="n">${x.n}</td><td class="n">${x.total}%</td><td class="n">${x.steps}</td><td class="n">${x.revealed}</td></tr>`).join('')}
    </table></div>
    <div class="actions">
      <button class="btn go" id="rexp" type="button">${T('კვლევის მონაცემების ჩამოტვირთვა (CSV)')}</button>
      <button class="btn ghost" id="rexpS" type="button">${T('სესიების შეჯამება (CSV)')}</button>
      <button class="btn stuck" id="rdel" type="button">${T('არქივის გასუფთავება')}</button>
    </div>
    <div class="status" id="status" role="status" aria-live="polite"></div>
  </section>`;
  app.querySelector('#rback').onclick=()=>{view='main';render();window.scrollTo(0,0)};
  app.querySelector('#rexp').onclick=async()=>{const rows=all.flatMap(x=>x.rows||[]); if(!rows.length){status(T('მონაცემები ჯერ არ არის.'),'warn');return} status(await downloadFile('Kapanadze_AI_Socrates_research.csv',csvRows(localizeRows(rows)))?T('ფაილი გადაეცა შენახვისთვის.'):T('ჩამოტვირთვა ვერ შესრულდა.'))};
  app.querySelector('#rexpS').onclick=async()=>{if(!all.length){status(T('მონაცემები ჯერ არ არის.'),'warn');return}
    const rows=all.map(x=>({date:x.ended,name:x.name,student_code:x.study.code,group:x.study.group,teaching_method:isEN()?T(x.study.method):x.study.method,timepoint:isEN()?T(x.study.timepoint):x.study.timepoint,topic:isEN()?topicLabel(x.topic):x.topic,mode:x.smode,scope:x.scope,questions:x.n,total_pct:x.total,prior_pct:x.pre,level_I:x.lev.I,level_II:x.lev.II,level_III:x.lev.III,declarative:x.comp.decl,procedural:x.comp.proc,metacognitive:x.comp.pers,final_pct:x.fin??'',independent_pct:x.independent,avg_help:x.avgHelp.toFixed(2),help_steps:x.steps,revealed:x.revealed,calibration_pct:x.cal??'',confidence_mean:x.confMean.toFixed(2)}));
    status(await downloadFile('Kapanadze_AI_Socrates_sessions.csv',csvRows(rows))?T('ფაილი გადაეცა შენახვისთვის.'):T('ჩამოტვირთვა ვერ შესრულდა.'))};
  app.querySelector('#rdel').onclick=()=>{if(confirm(T('სამუდამოდ წაიშალოს ამ ბრაუზერის არქივი?'))){try{localStorage.removeItem(ARCH)}catch(e){} render(); status(T('არქივი გასუფთავდა.'))}};
}
function csv(){
  const cols=['t','q','stage','comp','kind','help','conf','prompt','answer','verdict','err'];
  const q=v=>'"'+String(v==null?'':v).replace(/"/g,'""')+'"';
  return [cols.join(',')].concat(S.log.map(r=>cols.map(c=>q(c==='prompt'?TXP(r[c]):r[c])).join(','))).join('\n');
}
async function aiReport(A){
  const btn=document.getElementById('aiBtn'), out=document.getElementById('aiNote');
  btn.disabled=true; out.textContent=T('ვფიქრობ…');
  const summary=Q.map(q=>{const r=S.results[q.id]||{};return `${q.id} [${q.stage}/${q.comp}] score ${r.score??'-'}/2, help level ${r.help??'-'}, tries ${r.tries??'-'}, confidence ${r.conf||'-'}/5, first attempt ${r.first||'-'}${r.selfExpl?', self-explained':''}`}).join('\n');
  const log=S.log.slice(-70).map(r=>`${r.q} ${r.kind} (help ${r.help}): Q: ${TXP(r.prompt).slice(0,160)} | A: ${String(r.answer).slice(0,200)} | ${r.verdict||''} ${r.err||''}`).join('\n');
  const structure=isEN()
    ?'1) What the student knows; 2) what the student can do; 3) how the student checks their own thinking (incl. calibration); 4) where and how much help was needed (name the questions); 5) independent transfer (final check vs. dialogue); 6) zone of proximal development; 7) three concrete next steps for the lecturer.'
    :'1) რა იცის მოსწავლემ; 2) რის გაკეთება შეუძლია; 3) როგორ ამოწმებს საკუთარ აზროვნებას (incl. calibration); 4) სად და რა დოზით დასჭირდა დახმარება (name the questions); 5) დამოუკიდებელი გადატანა (final check vs. dialogue); 6) უახლოესი განვითარების ზონა; 7) სამი კონკრეტული შემდეგი ნაბიჯი ლექტორისთვის.';
  const prompt=`${tutorRules()}

Write a short diagnostic note in ${aiLang()} for the LECTURER about one student. Topic: ${S.topic}. Student level: ${S.grade}. The diagnostic dialogue covers prior knowledge, then levels I–III, each testing declarative, procedural and personal (reflective/metacognitive) knowledge, then a final independent check without help (stage F). Scores: 2 = correct independently (help 0); 1.5 = correct after first light Socratic hint (help 1); 1 = correct after help 2–3 or partial; 0 = not solved.
Component scores: declarative ${A.comp.decl}%, procedural ${A.comp.proc}%, personal ${A.comp.pers}%; prior knowledge ${A.pre}%; level I ${A.lev.I}%, level II ${A.lev.II}%, level III ${A.lev.III}%; final independent check ${A.fin??'-'}%. Rule-based placement: ${A.place.title}.
Session mode: ${S.smode==="independent"?"independent diagnostic, no hints":"guided Socratic with hints"}; question set: ${S.scope}. Help dose: ${A.totalSteps} help steps, ${A.totalControls} control questions, ${A.revealed} answers revealed. Confidence (1–5 scale; 4–5 = sure, 1–2 = unsure) mean ${A.cal.mean.toFixed(1)}; calibration: matched ${A.cal.ok}, overconfident ${A.cal.over}, underconfident ${A.cal.under}, "3 = partly" ${A.cal.mid}.
Per question:
${summary}
Dialogue log (latest turns):
${log}

Structure (plain text, no Markdown symbols): ${structure} Use concrete evidence from the dialogue. Under 260 words.`;
  try{
    const {text}=await sample(prompt,{cache:false,onText:({text})=>{out.textContent=text}});
    S.aiNote=text; save(); btn.textContent=T('ხელახლა დაწერა');
  }catch(e){ aiFail(e); out.textContent=e&&e.text?e.text:T('AI-მა დასკვნა ვერ დაწერა. სცადე მოგვიანებით.'); }
  btn.disabled=false;
}
