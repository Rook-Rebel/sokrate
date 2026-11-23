'use strict';
/* Kapanadze AI–Socrates · start screen (lecturer panel, session setup) and theory page.
   Behaviour as in the original KA-5.0 program; text goes through T()/TX(), Georgian values
   (topic strings, study method, time point) stay the stored values. */

const STUDY_METHODS=['არ არის მითითებული','ზღვარზე დაფუძნებული სწავლება','ალგებრულ-გეომეტრიული აგება','შერეული / სხვა'];
const STUDY_TIMEPOINTS=['პილოტი','წინასწარი ტესტი (pretest)','შემდგომი ტესტი (posttest)','დაგვიანებული შემოწმება'];
// The grade field is pre-filled per topic; a pre-filled (not user-typed) value follows the language.
function isDefaultGrade(v){return v==='9'||Object.keys(SCEN).some(k=>v===SCEN[k].grade||(EN.topics[k]&&v===EN.topics[k].grade));}
function gradeLabel(v){if(!isEN())return v;const k=Object.keys(SCEN).find(k=>v===SCEN[k].grade);return k&&EN.topics[k]?EN.topics[k].grade:v;}

function renderStart(app){
  const resume=load();
  const sc=SCEN[selTopic];
  const scopeCount=sc2=>{const t=sc?sc.topic:(()=>{const k=draftOtherKey();return OTHER_TOPICS[k]?OTHER_TOPICS[k].topic:''})();const qs=offlineQuestions(t);return qs?selectQuestions(qs,sc2).length:(sc2==='short'?'≈11':'17');};
  const other=!sc;
  const nQ=k=>(offlineQuestions(topicOfKey(k))||[]).length;
  const steps=sc?scenField(selTopic,'steps'):[['წინარე ცოდნა','რა საფუძველი სჭირდება არჩეულ თემას'],['I დონე · საბაზო','ცნების გაგება და მარტივი მოქმედება'],['II დონე · საშუალო','წესის გამოყენება და ახსნა'],['III დონე · მაღალი','ტრანსფერი, არგუმენტაცია და თვითშემოწმება']].map(([a,b])=>[T(a),T(b)]);
  const autoGrade=sc?scenField(selTopic,'grade'):'9';
  const dName=startDraft.name??'', dGrade=(startDraft.grade==null||isDefaultGrade(startDraft.grade))?autoGrade:startDraft.grade;
  const cur=startDraft.otherKey||'ap';
  const groups={}; Object.keys(OTHER_TOPICS).forEach(k=>{const g=otherField(k,'group');(groups[g]=groups[g]||[]).push(k)});
  const canResume=resume&&resume.started&&!resume.done&&resume.questions;
  app.innerHTML=`
  <section class="card hero">
    <div class="lect">
      <div class="lect-h"><b>${T('ლექტორის პანელი')}</b><span class="hint">${T('აირჩიეთ თემა — სცენარი, თეორიული საფუძვლები და დასკვნა ავტომატურად შეიცვლება.')}</span></div>
      <div class="topics" role="radiogroup" aria-label="${esc(T('თემა'))}">
        ${Object.keys(SCEN).map(k=>`<button type="button" class="tp${selTopic===k?' on':''}" role="radio" aria-checked="${selTopic===k}" data-tp="${k}"><b>${scenField(k,'label')}</b><span>${scenField(k,'tag')} · ${T('{n} კითხვა',{n:nQ(k)})} · ${T('{m} წთ',{m:SCEN[k].minutes})}</span></button>`).join('')}
        <button type="button" class="tp${other?' on':''}" role="radio" aria-checked="${other}" data-tp="other"><b>${T('სხვა თემა')}</b><span>${T('პროგრესიები, განტოლებები, ფუნქცია; არამათემატიკური — პირამიდები; AI-ით — ნებისმიერი')}</span></button>
      </div>
      ${other?`<div class="othbox"><label class="f" for="otherTopic">${T('აირჩიეთ თემა')}</label>
        <select id="otherTopic" class="sel">
          ${Object.entries(groups).map(([g,list])=>`<optgroup label="${esc(g)}">${list.map(k=>`<option value="${k}"${cur===k?' selected':''}>${otherField(k,'label')} — ${T('{n} კითხვა',{n:nQ(k)})}</option>`).join('')}</optgroup>`).join('')}
          <optgroup label="${esc(T('AI-ით'))}"><option value="free"${cur==='free'?' selected':''}>${T('სხვა თემა — ჩავწერ თვითონ (AI საჭიროა)')}</option></optgroup>
        </select>
        <div id="freeBox" class="freebox"${cur==='free'?'':' hidden'}>
          <label class="f" for="topic">${T('ჩაწერეთ თემა')}</label>
          <input type="text" id="topic" value="${esc(startDraft.free||'')}" placeholder="${esc(T('მაგ. ტრიგონომეტრიული ფუნქციები'))}">
        </div>
        <p class="hint">${T('ჩამონათვალში ყველა ჩაშენებული თემაა. AI-ის ჩართულ რეჟიმში შეგიძლიათ ნებისმიერი თემა ჩაწეროთ — კითხვებს AI შეადგენს იმავე მეთოდიკით.')}</p></div>`:''}
      <div class="row"><button class="btn ghost" id="theoryBtn" type="button">${T('თეორიული საფუძვლები (ლექტორისთვის)')}: <span id="tbLabel">${sc?scenField(selTopic,'label'):''}</span></button></div>
    </div>
    <h1>${sc?supfmt(scenField(selTopic,'h1')):T('თემაზე დაფუძნებული სოკრატული დიალოგი')}</h1>
    <p class="lead">${sc?supfmt(scenField(selTopic,'lead')):T('მეთოდიკა უცვლელია, იცვლება თემა: ჯერ მოწმდება წინარე ცოდნა, შემდეგ I–III დონეებზე — დეკლარაციული, პროცედურული და პირისეული ცოდნა. შეცდომისას მოსწავლე იღებს საკონტროლო კითხვას ან უფრო მარტივ ნაბიჯს.')}</p>
    <ol class="steps">${steps.map(([a,b])=>`<li><b>${a}</b><span>${supfmt(b)}</span></li>`).join('')}</ol>
    <p class="method">${T('ყოველ ეტაპზე მოწმდება <b>დეკლარაციული</b> („რა ვიცი?“), <b>პროცედურული</b> („როგორ ვაკეთებ?“) და <b>პირისეული / მეტაკოგნიტური</b> („როგორ ვაზროვნებ და ვამოწმებ?“) ცოდნა. მოსწავლე ყოველ პასუხზე აღნიშნავს, რამდენად არის დარწმუნებული. დასკვნა აჩვენებს: რა იცის, რის გაკეთება შეუძლია, როგორ ამოწმებს საკუთარ აზროვნებას, თავდაჯერებულობის კალიბრაციას, დამოუკიდებლობას და უახლოესი განვითარების ზონას.')}</p>
    <div class="authorline">${T('მეთოდური მოდელი: დავით კაპანაძე')}</div>
    ${other?'':`<p class="hint topicline"><b>${T('თემა:')}</b> ${T('{label} — {n} კითხვა (დაახლ. {m} წუთი): წინარე ცოდნა, სამი დონე და საბოლოო დამოუკიდებელი შემოწმება.',{label:scenField(selTopic,'label'),n:nQ(selTopic),m:sc.minutes})}</p>`}
    <div class="setup">
      <h2 class="setup-h">${T('სესიის პარამეტრები')}</h2>
      <div class="sgrid">
        <div><label class="f" for="smode">${T('სწავლების / შეფასების რეჟიმი')}</label>
          <select id="smode" class="sel">${Object.entries(MODES).map(([k,v])=>`<option value="${k}"${(startDraft.smode||'guided')===k?' selected':''}>${T(v)}</option>`).join('')}</select></div>
        <div><label class="f" for="scope">${T('კითხვების რაოდენობა')}</label>
          <select id="scope" class="sel"><option value="short"${startDraft.scope==='short'?' selected':''}>${T('მოკლე ვარიანტი ({n} კითხვა)',{n:scopeCount('short')})}</option><option value="full"${startDraft.scope!=='short'?' selected':''}>${T('სრული ბანკი ({n} კითხვა)',{n:scopeCount('full')})}</option></select></div>
        <div><label class="f" for="scode">${T('სტუდენტის ანონიმური კოდი (არასავალდებულო)')}</label>
          <input type="text" id="scode" maxlength="48" value="${esc(startDraft.code||'')}" placeholder="${esc(T('მაგ. SEU-001'))}" autocomplete="off"></div>
        <div><label class="f" for="sgroup">${T('ჯგუფი / კლასი (არასავალდებულო)')}</label>
          <input type="text" id="sgroup" maxlength="48" value="${esc(startDraft.group||'')}" placeholder="${esc(T('მაგ. პილოტი A'))}" autocomplete="off"></div>
        <div><label class="f" for="smethod">${T('სწავლების მიდგომა / წინა სწავლება')}</label>
          <select id="smethod" class="sel">${STUDY_METHODS.map(v=>`<option value="${esc(v)}"${(startDraft.method||STUDY_METHODS[0])===v?' selected':''}>${T(v)}</option>`).join('')}</select></div>
        <div><label class="f" for="stime">${T('კვლევის ეტაპი')}</label>
          <select id="stime" class="sel">${STUDY_TIMEPOINTS.map(v=>`<option value="${esc(v)}"${(startDraft.timepoint||STUDY_TIMEPOINTS[0])===v?' selected':''}>${T(v)}</option>`).join('')}</select></div>
      </div>
      <p class="hint">${T('<b>სოკრატული სწავლება:</b> შეცდომისას — საკონტროლო კითხვა, „გავიჭედე“-ზე — სამსაფეხურიანი დახმარება, აღმოჩენის შემდეგ — თეორიული დასკვნა. <b>დამოუკიდებელი დიაგნოსტიკა:</b> მინიშნებები არ არის, ყოველი პასუხი პირველივე ცდით ფასდება. ორივე რეჟიმში მოსწავლე აღნიშნავს თავდაჯერებას 5-ბალიან სკალაზე.')}</p>
    </div>
    <div class="sgrid who">
      <div><label class="f" for="grade">${T('კლასი / დონე')}</label>
        <input type="text" id="grade" value="${esc(dGrade)}" placeholder="${esc(T('მაგ. 11 კლასი'))}"></div>
      <div><label class="f" for="name">${T('სახელი და გვარი (არასავალდებულო)')}</label>
        <input type="text" id="name" autocomplete="name" value="${esc(dName)}"></div>
    </div>
    <div class="actions start-actions">
      <button class="btn go" id="begin" type="button">${T('დიალოგის დაწყება')}</button>
      ${canResume?`<button class="btn ghost" id="resume" type="button">${T('გაგრძელება: {topic} ({done}/{total})',{topic:esc(topicLabel(resume.topic)||T('თემა')),done:Object.keys(resume.results||{}).length,total:applyScope(questionsFor(resume.topic,resume.questions),resume.qids).length})}</button>`:''}
      <button class="btn ghost" id="researchBtn" type="button">${T('მკვლევრის პანელი · არქივი ({n})',{n:getArchive().length})}</button>
    </div>
    <div class="status" id="status" role="status" aria-live="polite"></div>
  </section>`;
  const keepDraft=()=>{startDraft.name=app.querySelector('#name').value;startDraft.grade=app.querySelector('#grade').value;
    startDraft.smode=app.querySelector('#smode').value;startDraft.scope=app.querySelector('#scope').value;startDraft.code=app.querySelector('#scode').value;startDraft.group=app.querySelector('#sgroup').value;startDraft.method=app.querySelector('#smethod').value;startDraft.timepoint=app.querySelector('#stime').value;const ot=app.querySelector('#otherTopic');if(ot)startDraft.otherKey=ot.value;const t=app.querySelector('#topic');if(t)startDraft.free=t.value;};
  app.querySelectorAll('[data-tp]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.tp; if(k===selTopic) return;
    keepDraft(); if(SCEN[k]) startDraft.grade=scenField(k,'grade');
    setSel(k); if(SCEN[k]) Q=questionsFor(SCEN[k].topic); render(); app.querySelector(`[data-tp="${k}"]`).focus();
  });
  // Arrow keys move between the topic cards (radio-group pattern).
  const tps=[...app.querySelectorAll('[data-tp]')];
  tps.forEach((b,i)=>b.addEventListener('keydown',e=>{
    const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key]; if(!d) return;
    e.preventDefault(); tps[(i+d+tps.length)%tps.length].click();
  }));
  const tb=app.querySelector('#theoryBtn');
  const otherKey=()=>{keepDraft();return draftOtherKey();};
  const syncTb=()=>{ if(sc) return; const k=otherKey(); app.querySelector('#tbLabel').textContent=OTHER_TOPICS[k]?otherField(k,'label'):T('(ჩაშენებული თემა არ არის არჩეული)'); tb.disabled=!OTHER_TOPICS[k]; };
  tb.onclick=()=>{ if(sc){keepDraft();openTheory(selTopic);return} const k=otherKey(); if(OTHER_TOPICS[k]) openTheory(k); };
  const topicInput=app.querySelector('#topic');
  const otherSel=app.querySelector('#otherTopic');
  if(otherSel){
    otherSel.addEventListener('change',()=>{ keepDraft(); if(otherSel.value!=='free'){ render(); app.querySelector('#otherTopic').focus(); return; } app.querySelector('#freeBox').hidden=false; syncTb(); topicInput.focus(); });
    topicInput.addEventListener('input',syncTb);
  }
  syncTb();
  app.querySelector('#researchBtn').onclick=()=>{keepDraft();view='research';render();window.scrollTo(0,0)};
  const startWith=(topic,grade,name,qs)=>{keepDraft(); S=freshState(); S.name=name; S.topic=topic; S.grade=grade; S.questions=qs;
    S.smode=startDraft.smode||'guided'; S.scope=startDraft.scope||'full'; S.langs=[I18N.lang];
    S.study={code:(startDraft.code||'').trim(),group:(startDraft.group||'').trim(),method:startDraft.method||'არ არის მითითებული',timepoint:startDraft.timepoint||'პილოტი'};
    const sel=selectQuestions(qs,S.scope); S.qids=S.scope==='short'?sel.map(q=>q.id):null; Q=sel;
    S.started=true; S.startedAt=new Date().toISOString(); save(); render(true); window.scrollTo(0,0);};
  app.querySelector('#begin').onclick=async()=>{
    let topic=sc?sc.topic:(otherSel.value==='free'?topicInput.value.trim():OTHER_TOPICS[otherSel.value].topic);
    const grade=app.querySelector('#grade').value.trim()||'9–10', name=app.querySelector('#name').value.trim();
    if(!topic){status(T('მიუთითე თემა.'),'warn');topicInput.focus();return}
    const b=app.querySelector('#begin'); b.disabled=true;
    const offline=offlineQuestions(topic);
    if(offline){ return startWith(topic,grade,name,offline); }
    if(!sample){ status(T('ამ თემაზე კითხვების შესადგენად AI-კავშირია საჭირო. AI-ის გარეშე აირჩიე ჩაშენებული თემა.'),'warn'); b.disabled=false; return; }
    status(T('ვაწყობ კითხვებს არჩეული თემის მიხედვით…'));
    try{ const qs=await generateTopicQuestions(topic,grade); if(qs.length<12) throw new Error('few'); startWith(topic,grade,name,qs); }
    catch(e){ status(T('კითხვების შექმნა ვერ მოხერხდა. სცადე კიდევ ერთხელ ან აირჩიე ჩაშენებული თემა.'),'warn'); b.disabled=false; }
  };
  const r=app.querySelector('#resume');
  if(r) r.onclick=()=>{S=Object.assign(freshState(),resume);Q=applyScope(questionsFor(S.topic,resume.questions),S.qids);if(S.qi>=Q.length){S.done=true}render(true)};
}

function renderTheory(app){
  if(!SCEN[theoryKey]&&!OTHER_TOPICS[theoryKey]) theoryKey='derivative';
  const inDialog=S.started&&!S.done;
  const groups={}; Object.keys(OTHER_TOPICS).forEach(k=>{const g=otherField(k,'group');(groups[g]=groups[g]||[]).push(k)});
  app.innerHTML=`<section class="card theory">
    <div class="tbar">
      <button class="btn ghost" id="tback1" type="button">← ${T('დაბრუნება')}</button>
      <div class="ttabs" role="tablist" aria-label="${esc(T('თემა'))}">${Object.keys(SCEN).map(k=>`<button type="button" role="tab" aria-selected="${theoryKey===k}" tabindex="${theoryKey===k?0:-1}" class="tt${theoryKey===k?' on':''}" data-tk="${k}">${scenField(k,'label')}</button>`).join('')}
        <select id="otherSel" class="tt tsel${OTHER_TOPICS[theoryKey]?' on':''}" aria-label="${esc(T('სხვა თემები'))}"><option value="">${T('სხვა თემები…')}</option>${Object.entries(groups).map(([g,list])=>`<optgroup label="${esc(g)}">${list.map(k=>`<option value="${k}"${theoryKey===k?' selected':''}>${otherField(k,'label')}</option>`).join('')}</optgroup>`).join('')}</select></div>
    </div>
    <p class="hint">${T('თემის არჩევა აქ პროგრამის თემასაც ცვლის')}${inDialog?T(' — მიმდინარე დიალოგი შენახული დარჩება და მისი გაგრძელება საწყის ეკრანზე შეიძლება'):''}.</p>
    <article class="theory-body">${theoryFor(theoryKey)}</article>
    <div class="actions"><button class="btn go" id="tback2" type="button">${T('დაბრუნება')}</button></div>
    <div class="authorline">${T('© დავით კაპანაძე · სოკრატე AI — თეორიული საფუძვლები')}</div>
  </section>`;
  const back=()=>{
    view='main';
    if(theoryChanged&&S.started&&offlineTopicKey(S.topic)!==theoryKey){ save(); S.started=false; S.done=false; }
    if(theoryChanged&&!S.started) Q=questionsFor(topicOfKey(theoryKey));
    theoryChanged=false;
    render();window.scrollTo(0,0)
  };
  app.querySelector('#tback1').onclick=back; app.querySelector('#tback2').onclick=back;
  const tabs=[...app.querySelectorAll('[data-tk]')];
  tabs.forEach((b,i)=>{
    b.onclick=()=>{theoryKey=b.dataset.tk; theoryChanged=true; setSel(theoryKey); startDraft.grade=scenField(theoryKey,'grade'); render(); window.scrollTo(0,0); const f=app.querySelector(`[data-tk="${theoryKey}"]`); if(f) f.focus({preventScroll:true});};
    b.addEventListener('keydown',e=>{const d={ArrowRight:1,ArrowLeft:-1}[e.key]; if(!d) return; e.preventDefault(); tabs[(i+d+tabs.length)%tabs.length].click();});
  });
  app.querySelector('#otherSel').onchange=e=>{const k=e.target.value; if(!k) return; theoryKey=k; theoryChanged=true; setSel('other');
    startDraft.otherKey=k;
    render(); window.scrollTo(0,0); const f=app.querySelector('#otherSel'); if(f) f.focus({preventScroll:true});};
  app.querySelectorAll('.toc a').forEach(a=>a.onclick=e=>{e.preventDefault();const el=app.querySelector(a.getAttribute('href'));if(el)el.scrollIntoView({behavior:'smooth',block:'start'})});
}
