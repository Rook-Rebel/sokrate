'use strict';
/*
 * Kapanadze AI Socrates — application logic (vanilla JS, no build step).
 * Requires js/questions.js (BANK, META, STAGE, COMP) to be loaded first.
 *
 * Compatibility contract with EN-DEMO-4.2 (do not change without a migration plan):
 *  - localStorage keys KEY and ARCH, and the session object shape stored under them;
 *  - grading: classify() and its helpers clean(), numbers(), approx(), and the
 *    scoring rule in submit();
 *  - question selection (selectQuestions) and CSV columns (rowsForSession, csv).
 * Those functions are kept byte-for-byte identical to the original file.
 */

const VERSION = 'EN-DEMO-4.3';
const KEY = 'kapanadze-en-demo-session-v42', ARCH = 'kapanadze-en-demo-archive-v42';

/* ------------------------------------------------------------------ helpers */

const $ = s => document.querySelector(s);
const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));

let view = 'home', subject = 'half', session = null, graphA = 1;
// What to focus after the next render: 'question' | 'hint' | 'heading' | a CSS selector.
let focusNext = null;
// Unsent answer text / confidence, kept in memory so hint requests and tab switches
// do not wipe what the student has typed. Never written to storage.
const EMPTY_DRAFT = {key: '', text: '', conf: ''};
let draft = EMPTY_DRAFT;

/* ------------------------------------------------------- storage (unchanged keys) */

function getArchive() { try { return JSON.parse(localStorage.getItem(ARCH) || '[]'); } catch (e) { return []; } }
function putArchive(o) { try { localStorage.setItem(ARCH, JSON.stringify(o)); return true; } catch (e) { return false; } }
function save() { try { session && localStorage.setItem(KEY, JSON.stringify(session)); } catch (e) { /* storage unavailable */ } }
function load() { try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; } }
function forget(k) { try { localStorage.removeItem(k); return true; } catch (e) { return false; } }

function download(name, data, type = 'text/plain;charset=utf-8') {
  const b = new Blob(['﻿', data], {type}), u = URL.createObjectURL(b), a = document.createElement('a');
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}

// Unchanged from EN-DEMO-4.2.
function csv(rows){if(!rows.length)return '';const cols=Object.keys(rows[0]);const quote=v=>'"'+String(v??'').replace(/"/g,'""')+'"';return [cols.join(','),...rows.map(o=>cols.map(c=>quote(o[c])).join(','))].join('\r\n')}
// Unchanged from EN-DEMO-4.2: defines the "short demonstration" question set.
function selectQuestions(topic,subset){const all=BANK[topic];if(subset==='full')return all;let picks=[];for(const st of ['P','I','II','III','F']){const a=all.filter(q=>q.stage===st);if(!a.length)continue;let sel=a.filter(x=>x.comp==='proc').slice(0,2);if(st==='P')sel=a.slice(0,2);else if(st==='F')sel=a.slice(0,Math.min(2,a.length));else{const d=a.find(x=>x.comp==='decl');const r=a.find(x=>x.comp==='pers');sel=[d,...sel.slice(0,1),r].filter(Boolean)};picks.push(...new Set(sel));}return picks}

/* ------------------------------------------- messages, dialog and focus management */

// Sets an inline status/error message. `later` delays the update so screen readers
// announce live regions that were only just inserted into the page.
function say(sel, text, tone = '', later = false) {
  const apply = () => { const el = $(sel); if (el) { el.textContent = text; el.className = 'message' + (tone ? ' ' + tone : ''); } };
  later ? setTimeout(apply, 120) : apply();
}

// Accessible modal dialog used instead of the browser's alert/confirm boxes. Resolves true on OK.
function openDialog({title, message, okLabel = 'OK', cancelLabel = '', danger = false}) {
  const d = $('#dialog'), ok = $('#dialogOk'), cancel = $('#dialogCancel');
  if (!d || typeof d.showModal !== 'function') return Promise.resolve(!cancelLabel);
  $('#dialogTitle').textContent = title;
  $('#dialogMsg').textContent = message;
  ok.textContent = okLabel;
  ok.classList.toggle('danger', danger);
  ok.classList.toggle('primary', !danger);
  cancel.textContent = cancelLabel || 'Cancel';
  cancel.hidden = !cancelLabel;
  d.returnValue = '';
  return new Promise(resolve => {
    ok.onclick = () => d.close('ok');
    cancel.onclick = () => d.close('cancel');
    d.addEventListener('close', () => { ok.onclick = cancel.onclick = null; resolve(d.returnValue === 'ok'); }, {once: true});
    d.showModal();
    (cancelLabel ? cancel : ok).focus(); // destructive confirmations start on Cancel
  });
}

function applyFocus() {
  const f = focusNext; focusNext = null;
  if (!f) return;
  const el = f === 'question' ? $('#qText')
    : f === 'hint' ? ($('#hintBox') || $('#qText'))
    : f === 'heading' ? $('#app h2')
    : $(f);
  if (!el) return;
  if (!el.matches('a[href],button,input,select,textarea,[tabindex]')) el.tabIndex = -1;
  el.focus();
}

/* ------------------------------------------------------------------ navigation */

const tabs = [...document.querySelectorAll('[role="tab"]')];

function goto(v, focusTab = false) {
  captureDraft();
  view = v;
  for (const b of tabs) {
    const on = b.dataset.view === v;
    b.classList.toggle('active', on);
    b.setAttribute('aria-selected', String(on));
    b.tabIndex = on ? 0 : -1;
    if (on && focusTab) b.focus();
  }
  $('#app').setAttribute('aria-labelledby', 'tab-' + v);
  render();
}

tabs.forEach((b, i) => {
  b.addEventListener('click', () => goto(b.dataset.view));
  b.addEventListener('keydown', e => {
    const n = {ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1}[e.key];
    if (n === undefined) return;
    e.preventDefault();
    goto(tabs[(n + tabs.length) % tabs.length].dataset.view, true);
  });
});

function render() {
  const app = $('#app');
  if (view === 'teacher') teacherView(app);
  else if (view === 'research') researchView(app);
  else if (session && !session.finished) questionView(app);
  else if (session && session.finished) reportView(app);
  else homeView(app);
  applyFocus();
}

/* ------------------------------------------------------------------ student: home */

function homeView(app) {
  const resumed = load();
  const canResume = resumed && !resumed.finished && META[resumed.topic] && Array.isArray(resumed.questions);
  app.innerHTML = `<section class="card">
    <h2>Choose a topic</h2>
    <p class="lead">Four complete English-language question banks adapted from the original Kapanadze AI Socrates program.</p>
    ${canResume ? `<div class="note resume-note"><div><b>Unfinished session:</b> ${escapeHTML(META[resumed.topic].title)} · question ${Math.min(resumed.qi + 1, resumed.questions.length)} of ${resumed.questions.length}</div><button type="button" class="btn primary sm" id="resume">Resume a saved session</button></div>` : ''}
    <div class="grid topics">${Object.entries(META).map(([k, v]) => `<button type="button" class="topic" data-topic="${k}">
        <strong class="topic-title">${escapeHTML(v.title)}</strong>
        <span class="topic-level">${escapeHTML(v.level)}</span>
        <span class="topic-desc">${escapeHTML(v.short)}</span>
        <span class="topic-count">${BANK[k].length} questions</span>
      </button>`).join('')}</div>
    <div class="note caution"><b>Research prototype:</b> Socratic hints work without internet. There is no connected generative AI service in this standalone file. Free-text mathematical and historical answers may require lecturer review, rather than being declared correct automatically.</div>
  </section>`;
  app.querySelectorAll('[data-topic]').forEach(b => b.onclick = () => { subject = b.dataset.topic; focusNext = 'heading'; setupView(app); applyFocus(); });
  if ($('#resume')) $('#resume').onclick = () => { session = resumed; subject = session.topic; focusNext = 'question'; render(); };
}

/* ------------------------------------------------------------------ student: setup */

function setupView(app) {
  const m = META[subject];
  app.innerHTML = `<section class="card">
    <button type="button" id="back" class="btn soft sm">← Topics</button>
    <h2 class="setup-title">${escapeHTML(m.title)}</h2>
    <p class="small">${escapeHTML(m.level)} · ${BANK[subject].length} questions</p>
    <div class="form-grid">
      <div><label for="mode">Learning / assessment mode</label><select id="mode"><option value="guided">Guided Socratic learning</option><option value="independent">Independent diagnostic (no hints)</option></select></div>
      <div><label for="scope">Question set</label><select id="scope"><option value="sample">Short demonstration (about 10 questions)</option><option value="full">Complete bank (${BANK[subject].length} questions)</option></select></div>
      <div><label for="code">Anonymous student code (optional)</label><input id="code" maxlength="48" placeholder="e.g. IR-001" autocomplete="off"></div>
      <div><label for="group">Group / class (optional)</label><input id="group" maxlength="48" placeholder="e.g. Pilot A" autocomplete="off"></div>
      <div><label for="method">Teaching approach / prior instruction</label><select id="method"><option value="not recorded">Not recorded</option><option value="limit-first">Limit-first derivative instruction</option><option value="algebraic-geometric">Algebraic–geometric construction</option><option value="mixed/other">Mixed or other instruction</option></select></div>
      <div><label for="timepoint">Study stage</label><select id="timepoint"><option value="pilot">Pilot / demonstration</option><option value="pretest">Pretest</option><option value="posttest">Posttest</option><option value="follow-up">Delayed follow-up</option></select></div>
    </div>
    <div class="consent">
      <label class="check" for="consent"><input type="checkbox" id="consent" aria-describedby="consentMsg"><span>I understand that my answers are saved only in this browser for review/export. Do not enter names or personal information.</span></label>
      <p id="consentMsg" class="message" role="alert"></p>
    </div>
    <div class="buttons"><button type="button" class="btn primary" id="start">Start session</button><button type="button" class="btn soft" id="openTheory">View lecturer notes</button></div>
    <p class="small">The 'Lecturer' and 'Researcher' tabs are open demonstration panels, not secure access controls.</p>
  </section>`;
  const consent = $('#consent');
  consent.onchange = () => { if (consent.checked) { consent.removeAttribute('aria-invalid'); say('#consentMsg', ''); } };
  $('#back').onclick = () => { focusNext = `[data-topic="${subject}"]`; render(); };
  $('#openTheory').onclick = () => goto('teacher');
  $('#start').onclick = () => {
    if (!consent.checked) {
      consent.setAttribute('aria-invalid', 'true');
      say('#consentMsg', 'Please confirm the local storage notice.', 'warn');
      consent.focus();
      return;
    }
    const mode = $('#mode').value, scope = $('#scope').value;
    const study = {code: $('#code').value.trim(), group: $('#group').value.trim(), method: $('#method').value, timepoint: $('#timepoint').value};
    session = {version: VERSION, topic: subject, mode, scope, study, started: new Date().toISOString(), qi: 0, questions: selectQuestions(subject, scope).map(q => q.id), results: [], hints: 0, attempts: 0, firstCount: 0, finished: false, progress: {attempts: 0, hints: 0}};
    draft = EMPTY_DRAFT;
    focusNext = 'question';
    save(); render();
  };
}

/* --------------------------------------------------------------- student: question */

function current() { return BANK[session.topic].find(q => q.id === session.questions[session.qi]); }
function draftKey() { return session ? session.started + '#' + session.qi : ''; }
function captureDraft() {
  const t = $('#studentAnswer');
  if (!t || !session) return;
  const c = $('input[name="conf"]:checked');
  draft = {key: draftKey(), text: t.value, conf: c ? c.value : ''};
}

function questionView(app) {
  const q = current(); if (!q) { finish(); return; }
  const result = session.results[session.qi] || {attempts: [], hints: 0, confidence: 0, firstVerdict: null, status: 'pending', score: null, revealed: false};
  session.results[session.qi] = result;
  const idx = session.qi + 1, total = session.questions.length, guided = session.mode === 'guided';
  const d = draft.key === draftKey() ? draft : EMPTY_DRAFT;
  const confScale = v => v === 1 ? ' (very uncertain)' : v === 5 ? ' (very certain)' : '';
  app.innerHTML = `<section class="card q-card">
    <div class="row spread q-head">
      <span class="pill accent">${escapeHTML(META[session.topic].title)}</span>
      <span class="small" id="qMeta">Question ${idx} of ${total} · ${STAGE[q.stage]}</span>
    </div>
    <div class="meter" role="progressbar" aria-label="Session progress" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${idx - 1}" aria-valuetext="${idx - 1} of ${total} answered"><i></i></div>
    <div class="row"><span class="pill">${COMP[q.comp]}</span><span class="pill">${guided ? 'Guided learning' : 'Independent diagnosis'}</span></div>
    <p class="question" id="qText" tabindex="-1">${escapeHTML(q.text)}</p>
    ${session.topic === 'derivative' && q.stage === 'II' ? derivativeGraph() : ''}
    ${result.hints > 0 && guided ? `<div class="hints" id="hintBox" tabindex="-1"><b>Socratic prompt ${result.hints}/3:</b> ${escapeHTML(hint(session.topic, q, result.hints))}</div>` : ''}
    <label for="studentAnswer">Your answer and reasoning</label>
    <textarea id="studentAnswer" placeholder="Write your reasoning, not just a final result." aria-describedby="answerTip" aria-keyshortcuts="Control+Enter Meta+Enter"></textarea>
    <p class="small tip" id="answerTip">Tip: Ctrl + Enter (⌘ + Enter on Mac) submits.</p>
    ${!result.attempts.length
      ? `<fieldset class="conf-group" aria-describedby="confHelp"><legend>How confident are you? <span class="small">(before feedback)</span></legend>
          <div class="conf">${[1, 2, 3, 4, 5].map(v => `<label><input type="radio" name="conf" value="${v}"${d.conf === String(v) ? ' checked' : ''}><span>${v}</span><span class="sr-only">${confScale(v)}</span></label>`).join('')}</div>
          <p class="small" id="confHelp">1 = very uncertain; 5 = very certain.</p></fieldset>`
      : `<p class="small">First-response confidence: ${result.confidence}/5 · Attempts: ${result.attempts.length} · Hints: ${result.hints}</p>`}
    <div id="feedback" class="message" role="status" aria-live="polite"></div>
    <div class="buttons">
      <button type="button" class="btn primary" id="submit">Submit response</button>
      ${guided ? '<button type="button" class="btn soft" id="hint">I need a hint</button>' : ''}
      <button type="button" class="btn soft" id="skip">${session.mode === 'independent' ? 'Record as unknown' : 'Skip / cannot solve'}</button>
    </div>
    <p class="small">Open-ended responses may be flagged for human review. They are not automatically counted as incorrect.</p>
  </section>`;
  app.querySelector('.meter > i').style.width = (100 * (idx - 1) / total) + '%';
  const ta = $('#studentAnswer');
  ta.value = d.text;
  ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); submit(); } });
  const syncConf = () => app.querySelectorAll('.conf label').forEach(l => l.classList.toggle('is-checked', l.querySelector('input').checked));
  app.querySelectorAll('input[name="conf"]').forEach(r => r.addEventListener('change', syncConf));
  syncConf();
  if ($('#slope')) $('#slope').oninput = e => {
    graphA = +e.target.value;
    $('#graph').innerHTML = graphSVG(graphA);
    $('#slab').textContent = slopeText();
    e.target.setAttribute('aria-valuetext', slopeText());
  };
  $('#submit').onclick = () => submit();
  if ($('#hint')) $('#hint').onclick = () => requestHint();
  $('#skip').onclick = () => skip();
  applyFocus();
}

/* ------------------------------------------------------------------ Socratic hints */

const CUSTOM_HINTS = {
  'ap:II-P2': ['Write the first three terms using a₁ and d.', 'How many additions of d occur between the first and n-th term?', 'Test your proposed formula with n = 1 and n = 2.'],
  'ap:III-P': ['How many gaps separate positions 4 and 10?', 'Find the change in value across those six gaps.', 'Use a₄ = a₁ + 3d to recover the first term.'],
  'derivative:II-P1': ['Subtract the line equation from x².', 'Factor out (x − 3).', 'What value of k would make the remaining factor vanish at x = 3?'],
  'derivative:III-P1': ['Use x³ − 8 = (x − 2)(x² + 2x + 4).', 'Subtract k(x − 2) and factor out (x − 2).', 'Evaluate the second factor at x = 2.'],
  'half:II-P2': ['Write H(Hx^β) using c(β) and c(β−1/2).', 'Compare its exponent with D(x^β).', 'Equate the numerical coefficients of x^(β−1).'],
  'half:II-P3': ['Replace β with 1/2 in the recurrence.', 'Then write c(0) as c₀.', 'Isolate c(1/2) by dividing through by c₀.'],
  'pyramids:I-R': ['Is a film a primary archaeological document?', 'What evidence did the excavations at Giza uncover?', 'Which type of source would let you verify a specific historical claim?']
};
const TOPIC_HINTS = {
  ap: ['What remains constant between successive terms?', 'Test the rule on a smaller position, such as n = 1 or n = 2.', 'How could you check your result by substitution or a short table?'],
  derivative: ['What equation connects the curve with the line?', 'Try factoring the polynomial difference at the chosen point.', 'What would ensure that the contact point is a repeated root?'],
  half: ['What does H∘H = D require in this example?', 'Write the coefficient recurrence before inserting numbers.', 'Check both the power of x and the coefficient, including the chosen normalisation.'],
  pyramids: ['What evidence, rather than a story, is relevant to this question?', 'Can you locate a historical source, date or archaeological find?', 'What alternative explanation should you compare, and how could you check it?']
};

// Returns Socratic prompt n (1–3) for question q of the given topic.
function hint(topic, q, n) {
  const custom = CUSTOM_HINTS[topic + ':' + q.id];
  return custom ? custom[n - 1] : TOPIC_HINTS[topic][n - 1];
}

/* ------------------------------------------- grading — unchanged from EN-DEMO-4.2 */

function clean(s){return String(s).toLowerCase().replace(/[−–—]/g,'-').replace(/\s/g,'').replace(/×|·/g,'*').replace(/²/g,'^2').replace(/³/g,'^3').replace(/⁴/g,'^4').replace(/⁵/g,'^5').replace(/₀/g,'0').replace(/₁/g,'1').replace(/₆/g,'6').replace(/√/g,'sqrt').replace(/[(){}]/g,'').replace(/[.,:;]+$/g,'')}
function numbers(s){let t=String(s).replace(/a[₀-₉]+|a_\d+|\ba\d+\b|x[₀-₉]+/gi,'VAR').replace(/\^\s*[−-]?\d+(?:\/\d+)?/g,' ');return [...t.matchAll(/(?<![A-Za-z])[-−]?\d+(?:[.,]\d+)?/g)].map(x=>Number(x[0].replace('−','-').replace(',','.'))).filter(Number.isFinite)}
function approx(a,b){return Math.abs(a-b)<0.025*Math.max(1,Math.abs(b))}
function classify(q,a){const typ=q.kind;let ans=a.trim();if(!ans)return {verdict:'empty'};
 if(typ==='num') {const nums=numbers(ans),ex=q.expect||[]; if(ex.length){if(ex.length===1){if(nums.length===1&&approx(nums[0],ex[0]))return {verdict:'correct'};if(nums.length===1)return{verdict:'wrong'};return{verdict:'review'}}if(nums.length===ex.length&&ex.every((v,i)=>approx(nums[i],v)))return{verdict:'correct'};if(nums.length===ex.length)return{verdict:'wrong'};return{verdict:'review'}}return{verdict:'review'}}
 if(typ==='range'){const nums=numbers(ans);if(nums.length===1&&nums[0]>=q.min&&nums[0]<=q.max)return{verdict:'correct'};if(nums.length===1)return{verdict:'wrong'};return{verdict:'review'}}
 if(typ==='formula'){const z=clean(ans).replace(/^a[nₙ]=?/,'').replace(/^an=/,'');if((q.aliases||[]).some(t=>clean(t).replace(/^an=/,'')===z))return {verdict:'correct'};return{verdict:'review'}}
 if(['expr','text'].includes(typ)){const z=clean(ans),sol=clean(q.solution);if(z===sol&&z.length>1)return{verdict:'correct'};if(typ==='text'&&q.solution==='Africa.'&&/africa/i.test(ans))return{verdict:'correct'};return{verdict:'review'}}
 return {verdict:'review'};}

/* ------------------------------------------------------------- answering workflow */

// The verdict handling and the scoring rule below are unchanged from EN-DEMO-4.2;
// only the messages and focus handling differ.
function submit() {
  const ans = $('#studentAnswer').value.trim();
  const r = session.results[session.qi], q = current();
  if (!ans) { say('#feedback', 'Please write an answer or choose Skip.', 'warn'); $('#studentAnswer').focus(); return; }
  if (!r.attempts.length) {
    const c = $('input[name="conf"]:checked');
    if (!c) { say('#feedback', 'Select your confidence level before submitting the first response.', 'warn'); $('input[name="conf"]').focus(); return; }
    r.confidence = +c.value;
  }
  const j = classify(q, ans), first = r.attempts.length === 0;
  r.attempts.push({answer: ans, time: new Date().toISOString(), verdict: j.verdict, helpBefore: r.hints});
  r.status = j.verdict; if (first) r.firstVerdict = j.verdict;
  if (j.verdict === 'correct') { r.score = r.hints === 0 && r.attempts.length === 1 ? 2 : (r.hints <= 1 ? 1.5 : 1); r.finalAnswer = ans; advance(); return; }
  if (j.verdict === 'review') { r.score = null; r.finalAnswer = ans; r.status = 'lecturer review'; advance(); return; }
  if (session.mode === 'independent') { r.score = 0; r.finalAnswer = ans; advance(); return; }
  if (r.hints < 3) {
    r.hints++; session.hints++; save();
    captureDraft(); focusNext = 'hint';
    questionView($('#app'));
    say('#feedback', 'Not yet confirmed. Try the Socratic prompt and revise your answer.', 'warn', true);
    return;
  }
  r.score = 0; r.status = 'not solved'; r.revealed = true; r.finalAnswer = ans; save(); revealView();
}

function requestHint() {
  const r = session.results[session.qi];
  if (r.hints >= 3) { revealView(); return; }
  captureDraft();
  r.hints++; session.hints++; save();
  focusNext = 'hint'; render();
}

function skip() { const r = session.results[session.qi]; r.firstVerdict ||= 'unknown'; r.score = 0; r.status = 'unknown'; r.finalAnswer = ''; advance(); }

function revealView() {
  const q = current(), r = session.results[session.qi];
  $('#app').innerHTML = `<section class="card">
    <h2>Guided explanation</h2>
    <p class="small">${escapeHTML(META[session.topic].title)} · Question ${session.qi + 1} of ${session.questions.length}</p>
    <p class="question">${escapeHTML(q.text)}</p>
    <p>The answer has not been independently established.</p>
    <div class="note">${escapeHTML(q.solution)}</div>
    <p class="small">For the research log, this remains an assisted/unsolved response, not an independent success.</p>
    <div class="buttons"><button type="button" class="btn primary" id="continue">Continue</button></div>
  </section>`;
  $('#continue').onclick = () => { r.status = 'revealed'; r.revealed = true; r.score = 0; advance(); };
  focusNext = 'heading'; applyFocus();
}

function advance() {
  session.qi++; draft = EMPTY_DRAFT; save();
  if (session.qi >= session.questions.length) { finish(); return; }
  focusNext = 'question'; render();
}

function finish() {
  session.finished = true; session.ended = new Date().toISOString(); save();
  const arc = getArchive(); arc.push(session);
  const stored = putArchive(arc);
  focusNext = 'heading'; render();
  if (!stored) openDialog({title: 'Storage is full', message: 'Local storage is full. Export your session now.'});
}

/* ------------------------------------------------------------------ student: report */

// Unchanged from EN-DEMO-4.2.
function summarize(s){const r=s.results,graded=r.filter(x=>x&&x.score!=null);const possible=graded.length*2;return{total:r.length,graded:graded.length,review:r.filter(x=>x&&x.score==null).length,score:possible?Math.round(100*graded.reduce((a,x)=>a+x.score,0)/possible):null,first:r.filter(x=>x&&x.firstVerdict==='correct').length,hints:r.reduce((a,x)=>a+(x?.hints||0),0),highConfidenceWrong:r.filter(x=>x&&x.confidence>=4&&x.firstVerdict==='wrong').length}}

function verdictBadge(v) { return v ? `<span class="verdict v-${escapeHTML(v)}">${escapeHTML(v)}</span>` : '—'; }

function reportView(app) {
  const A = summarize(session);
  app.innerHTML = `<section class="card">
    <h2>Session report</h2>
    <p class="small">${escapeHTML(META[session.topic].title)} · ${escapeHTML(session.mode)} · ${escapeHTML(session.study.code || 'anonymous')}</p>
    <div class="stats">
      <div class="stat"><b>${A.score === null ? '—' : A.score + '%'}</b>Automatic score*</div>
      <div class="stat"><b>${A.first}</b>Correct first responses</div>
      <div class="stat"><b>${A.hints}</b>Socratic prompts</div>
      <div class="stat"><b>${A.review}</b>Answers needing review</div>
    </div>
    <div class="note caution"><b>Interpretation:</b> *Automatic score covers only automatically graded items (${A.graded}/${A.total}). Open-ended responses need human review and are excluded from this percentage. These figures alone do not validate a teaching method.</div>
    <h3>Question-level evidence</h3>
    <div class="scroll" role="region" aria-label="Question-level evidence" tabindex="0"><table>
      <thead><tr><th scope="col">Stage / Question</th><th scope="col">First attempt</th><th scope="col">Help</th><th scope="col">Confidence</th><th scope="col">Score</th></tr></thead>
      <tbody>${session.results.map((r, i) => {
        const q = BANK[session.topic].find(x => x.id === session.questions[i]);
        return `<tr><td>${escapeHTML(q.stage + ' / ' + q.id)}</td><td>${verdictBadge(r.firstVerdict)}</td><td>${r.hints}</td><td>${r.confidence || '—'}</td><td>${r.score == null ? 'Review' : r.score + '/2'}</td></tr>`;
      }).join('')}</tbody>
    </table></div>
    <div class="buttons"><button type="button" class="btn primary" id="export">Export this session (CSV)</button><button type="button" class="btn soft" id="home">Choose another topic</button><button type="button" class="btn soft" id="review">Lecturer notes</button></div>
    <p id="reportMsg" class="message" role="status" aria-live="polite"></p>
    <p class="small">Saved only in this browser. Export after every pilot to avoid data loss.</p>
  </section>`;
  $('#export').onclick = () => {
    const name = 'Socrates_' + session.topic + '_responses.csv';
    download(name, csv(rowsForSession(session)), 'text/csv;charset=utf-8');
    say('#reportMsg', 'Exported ' + name + '.', 'success');
  };
  $('#home').onclick = () => { session = null; forget(KEY); focusNext = 'heading'; render(); };
  $('#review').onclick = () => goto('teacher');
}

// Unchanged from EN-DEMO-4.2: these keys are the CSV columns.
function rowsForSession(s){return s.results.map((r,i)=>{const q=BANK[s.topic].find(q=>q.id===s.questions[i]);return{version:s.version,topic:s.topic,student_code:s.study.code,group:s.study.group,teaching_method:s.study.method,timepoint:s.study.timepoint,mode:s.mode,session_start:s.started,question_id:q.id,stage:q.stage,component:q.comp,question:q.text,first_attempt:r.attempts[0]?.answer||'',first_verdict:r.firstVerdict||'',final_answer:r.finalAnswer||r.attempts.at(-1)?.answer||'',verdict:r.status||'',confidence_1_to_5:r.confidence||'',hints:r.hints,attempt_count:r.attempts.length,score_0_to_2:r.score==null?'NEEDS_REVIEW':r.score,teacher_expected:q.solution}})}

/* ------------------------------------------------------------------ researcher */

function researchView(app) {
  const all = getArchive();
  const rows = all.flatMap(rowsForSession), grouped = {};
  for (const s of all) { const key = [s.topic, s.study.group || 'Unassigned', s.study.method, s.study.timepoint, s.mode].join(' / '); (grouped[key] = grouped[key] || []).push(s); }
  app.innerHTML = `<section class="card">
    <h2>Researcher workspace</h2>
    <p>Locally archived sessions: <b>${all.length}</b></p>
    <div class="note caution">No server storage, consent system, participant authentication or multi-device synchronisation is included. The aggregated comparison below is descriptive only. Before field research, validate items and agree on a research protocol.</div>
    <h3>Descriptive grouping</h3>
    <div class="scroll" role="region" aria-label="Descriptive grouping" tabindex="0"><table>
      <thead><tr><th scope="col">Topic / Group / Method / Stage / Mode</th><th scope="col">N</th><th scope="col">First responses correct</th><th scope="col">Mean automatically graded score</th></tr></thead>
      <tbody>${Object.entries(grouped).map(([k, ss]) => {
        const sm = ss.map(summarize), scores = sm.map(s => s.score).filter(v => v != null);
        return `<tr><td>${escapeHTML(k)}</td><td>${ss.length}</td><td>${sm.reduce((a, x) => a + x.first, 0)}</td><td>${scores.length ? (scores.reduce((a, x) => a + x, 0) / scores.length).toFixed(1) + '%' : '—'}</td></tr>`;
      }).join('') || '<tr><td colspan="4">No completed sessions yet.</td></tr>'}</tbody>
    </table></div>
    <div class="buttons"><button type="button" class="btn primary" id="exportAll">Export research data (CSV)</button><button type="button" class="btn danger-soft" id="deleteAll">Clear archived sessions</button></div>
    <p id="researchMsg" class="message" role="status" aria-live="polite"></p>
  </section>`;
  $('#exportAll').onclick = () => {
    if (!rows.length) { say('#researchMsg', 'No data yet. Complete at least one session first.', 'warn'); return; }
    download('Kapanadze_AI_Socrates_EN_Research.csv', csv(rows), 'text/csv;charset=utf-8');
    say('#researchMsg', `Exported ${rows.length} rows from ${all.length} session${all.length === 1 ? '' : 's'}.`, 'success');
  };
  $('#deleteAll').onclick = async () => {
    if (!all.length) { say('#researchMsg', 'There are no archived sessions to clear.', 'warn'); return; }
    const yes = await openDialog({
      title: 'Clear archived sessions?',
      message: `Permanently remove ${all.length} locally archived session${all.length === 1 ? '' : 's'} from this browser? This cannot be undone — export the research data first if you need it.`,
      okLabel: 'Remove sessions', cancelLabel: 'Cancel', danger: true
    });
    if (!yes) return;
    forget(ARCH);
    focusNext = 'heading'; render();
    say('#researchMsg', 'Archived sessions cleared.', 'success', true);
  };
}

/* ------------------------------------------------------------------ lecturer */

const THEORY = {
  half: `<p><strong>Construction.</strong> On a suitable monomial domain (x &gt; 0), introduce H = D^(1/2) with H∘H = D where composition is well-defined. Assume H(x^β) = c(β)x^(β−1/2).</p><div class="eq">c(β)c(β−1/2) = β</div><p>For nonnegative integer n, c(n) = c₀(2n)!!/(2n−1)!!. On the half-integer chain, c(n−1/2) = (2n−1)!!/[2c₀(2n−2)!!]. Choosing c₀ = 1/√π matches Riemann–Liouville normalisation; the recurrence alone does not uniquely choose it.</p><div class="eq">D^(1/2)x = 2√x/√π ··· D^(1/2)x³ = 16x^(5/2)/(5√π)</div><p><b>Important qualification:</b> Composition and boundary terms depend on the function class. Do not assert that arbitrary fractional operators satisfy a semigroup law on every function.</p>`,
  derivative: `<p><strong>Algebraic–geometric polynomial construction.</strong> For a polynomial P and point A=(a,P(a)), seek a nonvertical line y=P(a)+k(x−a) for which x=a is a double root of the difference.</p><div class="eq">P(x) − [P(a)+k(x−a)] = (x−a)²Q(x)</div><p>From the factor theorem, P(x)−P(a)=(x−a)R(x); therefore k=R(a) is unique. The map a ↦ k(a) constructs the derivative function.</p><div class="eq">x² → k(a)=2a ··· x³ → k(a)=3a²</div><p><b>Teaching principle:</b> move from intersections, to repeated roots, to tangency, and then to the derivative function. For cubic functions, a tangent can intersect the curve again elsewhere; “exactly one intersection” is not a general definition.</p>`,
  ap: `<p>Start with patterns of equal differences. Represent the first, second and n-th terms using the first term a₁ and common difference d.</p><div class="eq">aₙ = a₁ + (n−1)d</div><p>The key conceptual obstacle is confusing the <em>number of terms</em> with the <em>number of transitions</em>. Use n=1 and n=2 as simple checks. Connect the sequence points (n,aₙ) with a straight line of slope d.</p><p>Assess concept recognition, algorithmic use, explanation, counterexamples, and independent verification separately.</p>`,
  pyramids: `<p>Historical reasoning is based on claims and evidence, not on treating films or myths as proof. Egyptian royal pyramids served funerary roles; similar forms in other cultures can serve different purposes.</p><p>Relevant sources include archaeological evidence from the Giza workers' settlements, workers' tombs, inscriptions, the Diary of Merer (Wadi al-Jarf), and depictions of transport by sledges. Exact construction logistics and ramp arrangements remain areas of debate.</p><p>Teach chronological estimation, careful inference, source evaluation, and awareness of uncertainty. Historical dates and block counts are approximations.</p>`
};

function teacherView(app) {
  app.innerHTML = `<section class="card">
    <h2>Lecturer workspace</h2>
    <p class="small">Transparent access for demonstration only — this is not protected by authentication.</p>
    <div class="field-inline"><label for="teacherTopic">Topic</label><select id="teacherTopic">${Object.entries(META).map(([k, v]) => `<option value="${k}" ${k === subject ? 'selected' : ''}>${escapeHTML(v.title)}</option>`).join('')}</select></div>
    <div id="theory" class="theory">${THEORY[subject]}</div>
    <div class="row spread section-head"><h3>Question bank and rubric</h3><button type="button" class="btn soft sm no-print" id="toggleAll">Expand all</button></div>
    <div id="items">${BANK[subject].map((q, i) => `<details>
      <summary><span class="q-num">${i + 1}.</span> <span class="tag">${q.stage}/${q.comp}</span> ${escapeHTML(q.text)}</summary>
      <div class="details-body">
        <p><b>Expected answer / explanation:</b> ${escapeHTML(q.solution)}</p>
        <p><b>Scoring:</b> ${q.kind === 'num' || q.kind === 'range' ? 'Numeric response can be checked automatically; check the reasoning independently.' : 'Open-ended answer may require lecturer review; do not interpret it as an automatically verified result.'}</p>
        <p><b>Socratic prompts:</b></p>
        <ol class="prompts">${[1, 2, 3].map(n => `<li>${escapeHTML(hint(subject, q, n))}</li>`).join('')}</ol>
      </div>
    </details>`).join('')}</div>
    <div class="buttons"><button type="button" id="print" class="btn soft">Print lecturer notes</button></div>
  </section>`;
  $('#teacherTopic').onchange = e => { subject = e.target.value; focusNext = '#teacherTopic'; render(); };
  $('#toggleAll').onclick = e => {
    const items = [...app.querySelectorAll('#items details')], open = !items.every(d => d.open);
    items.forEach(d => { d.open = open; });
    e.currentTarget.textContent = open ? 'Collapse all' : 'Expand all';
  };
  $('#print').onclick = () => window.print();
}

// Print every rubric item, not just the expanded ones (also covers Ctrl/⌘ + P).
window.addEventListener('beforeprint', () => document.querySelectorAll('details:not([open])').forEach(d => { d.open = true; d.dataset.printOpened = '1'; }));
window.addEventListener('afterprint', () => document.querySelectorAll('details[data-print-opened]').forEach(d => { d.open = false; delete d.dataset.printOpened; }));

/* ------------------------------------------------------------------ tangent explorer */

function slopeText() { return 'a = ' + graphA.toFixed(1) + '; k = ' + (2 * graphA).toFixed(1); }

function derivativeGraph() {
  return `<div class="chart">
    <div class="row spread"><b>Explore the parabola and its tangent</b><span id="slab" class="mono">${slopeText()}</span></div>
    <div id="graph">${graphSVG(graphA)}</div>
    <label for="slope">Choose the contact point a</label>
    <input type="range" id="slope" min="-2" max="2" step="0.1" value="${graphA}" aria-valuetext="${slopeText()}">
    <p class="small">The slope k=2a follows from the double-root criterion for P(x)=x².</p>
  </div>`;
}

function graphSVG(a) {
  const W = 530, H = 280, cx = x => 265 + x * 70, cy = y => 245 - y * 26;
  let d = '';
  for (let i = 0; i <= 150; i++) { const x = -3.3 + i * 6.6 / 150, y = x * x; d += (i ? 'L' : 'M') + cx(x).toFixed(1) + ',' + cy(y).toFixed(1); }
  const x1 = -3.5, x2 = 3.5, s = 2 * a, b = -a * a;
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Parabola y = x² with its tangent line at x = ${a.toFixed(1)}, slope ${(2 * a).toFixed(1)}">
    <line class="g-axis" x1="20" y1="245" x2="510" y2="245"/><line class="g-axis" x1="265" y1="20" x2="265" y2="265"/>
    <path class="g-curve" fill="none" d="${d}"/>
    <line class="g-tangent" x1="${cx(x1)}" y1="${cy(s * x1 + b)}" x2="${cx(x2)}" y2="${cy(s * x2 + b)}"/>
    <circle class="g-point" cx="${cx(a)}" cy="${cy(a * a)}" r="5"/>
    <text class="g-label" x="277" y="21">y</text><text class="g-label" x="510" y="238">x</text>
  </svg>`;
}

render();
