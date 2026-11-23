'use strict';
/* Kapanadze AI–Socrates · math-text helpers and answer parsing */

/* ============ math-text helpers ============ */
const SUBS={'₀':'0','₁':'1','₂':'2','₃':'3','₄':'4','₅':'5','₆':'6','₇':'7','₈':'8','₉':'9','ₙ':'n','₊':'+','₋':'-','ₐ':'a'};
const SUPS={'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','ⁿ':'n','⁺':'+','⁻':'-','⁽':'(','⁾':')'};
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
// `a_n`, `b_n`, `q^{n-1}` inside backticks -> styled math with <sub>/<sup>
function M(s){
  return supfmt(esc(s).replace(/`([^`]+)`/g,(_,x)=>'<span class="m">'+x.replace(/_\{([^}]+)\}|_([0-9n+\-]+)|\^\{([^}]+)\}|\^([0-9n]+)/g,(__,a,b,c,d)=>(a||b)?'<sub>'+(a||b)+'</sub>':'<sup>'+(c||d).replace(/-/g,'−')+'</sup>')+'</span>'));
}
function plain(s){
  const sb={'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉','n':'ₙ','+':'₊','-':'₋'};
  const sp={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','n':'ⁿ','+':'⁺','-':'⁻','−':'⁻',' ':''};
  return String(s).replace(/`([^`]+)`/g,(_,x)=>x.replace(/_\{([^}]+)\}|_([0-9n+\-]+)|\^\{([^}]+)\}|\^([0-9n]+)/g,(__,a,b,c,d)=>(a||b)?[...(a||b)].map(ch=>sb[ch]||ch).join(''):[...(c||d)].map(ch=>sp[ch]??ch).join('')));
}
function norm(s){
  let t=String(s).replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹ⁿ⁺⁻⁽⁾]+/g,m=>'^('+[...m].map(c=>SUPS[c]).join('')+')');
  t=t.toLowerCase();
  t=t.replace(/[₀-₉ₙ₊₋ₐ]/g,c=>SUBS[c]);
  t=t.replace(/[−–—]/g,'-').replace(/[·×∙]/g,'*').replace(/\s+/g,' ').trim();
  return t;
}
function numbers(s){
  const t=norm(s).replace(/[ab]_?\d+/g,' ').replace(/\^\s?\(?[0-9n+\-]*\)?/g,' ');
  const out=new Set();
  (t.match(/-?\d+(?:[.,]\d+)?/g)||[]).forEach(x=>{
    out.add(parseFloat(x.replace(',','.')));
    x.split(/[.,]/).forEach(y=>{ if(y!=='' && y!=='-') out.add(parseFloat(y)); });
  });
  (t.match(/-?\d+(?:[.,]\d+)?\s*\/\s*\d+(?:[.,]\d+)?/g)||[]).forEach(x=>{
    const [a,b]=x.split('/').map(v=>parseFloat(v.replace(',','.')));
    if(b) out.add(Math.round(a/b*1000)/1000);
  });
  return [...out];
}
function has(nums,v){return nums.some(x=>Math.abs(x-v)<1e-6)}
function hasApprox(nums,v){return nums.some(x=>Math.abs(x-v)<0.02)}
// parse an n-th-term formula in A (=a1 or b1), x (=d or q), n
function formulaFn(s){
  let t=norm(s).replace(/\s/g,'');
  if(t.includes('=')) t=t.split('=').pop();
  t=t.replace(/[\u10A0-\u10FF.,;:!?]+$/g,'').replace(/[\u10A0-\u10FF]+/g,'');
  t=t.replace(/[ab]_?\(?1\)?(?![0-9])/g,'A');
  if(/[ab]/.test(t)) return null;
  t=t.replace(/\^/g,'**').replace(/d/g,'x').replace(/q/g,'x');
  if(!/^[0-9Axn+\-*/().]+$/i.test(t)) return null;
  t=t.replace(/([0-9Ax)])(?=[Axn(])/g,'$1*');
  try{ const f=SafeExpr.compile(t,['A','x','n']); f(1,1,1); return f; }catch(e){ return null; }
}
function sameFn(f,g){
  const pts=[[2,3,1],[5,-2,4],[7,4,10],[1.5,2.5,7],[-3,4,3]];
  return pts.every(([A,x,n])=>{const a=f(A,x,n),b=g(A,x,n);return Number.isFinite(a)&&Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b))});
}

// Georgian number words (used only by strict numeric checks, e.g. "how many common points?")
const KA_WORDS=[
  [/არც\s?ერთ[ა-ჰ]*|არ\s+(?:აქვ|ექნ|არსებ|კვეთ|ჰქონ)[ა-ჰ]*|ვერ\s+კვეთ[ა-ჰ]*/g,0],
  [/(?<![ა-ჰ])ნულ[ა-ჰ]*/g,0],
  [/(?<![ა-ჰ])ერთ(?:ი|ს|ადერთი|ადერთ)?(?![ა-ჰ])/g,1],
  [/(?<![ა-ჰ])ორ(?:ი|ს)?(?![ა-ჰ])/g,2],
  [/(?<![ა-ჰ])სამ(?:ი|ს)?(?![ა-ჰ])/g,3],
  [/(?<![ა-ჰ])ოთხ(?:ი|ს)?(?![ა-ჰ])/g,4],
  [/(?<![ა-ჰ])ხუთ(?:ი|ს)?(?![ა-ჰ])/g,5],
  [/(?<![ა-ჰ])ექვს(?:ი)?(?![ა-ჰ])/g,6],
  [/(?<![ა-ჰ])თორმეტ(?:ი)?(?![ა-ჰ])/g,12]
];
// Strict reading of a numeric answer: words count; numbers inside equations or root assignments (x = …) do not.
function numbersStrict(s){
  let t=norm(s); const out=new Set();
  KA_WORDS.forEach(([re,v])=>{t=t.replace(re,()=>{out.add(v);return ' ';});});
  t.split(/[Ⴀ-ჿ;:]+|,\s/).forEach(ch=>{
    ch=ch.trim(); if(!ch) return;
    if(/[a-z]/.test(ch)){
      const m=ch.match(/=\s*(-?\d+(?:\.\d+)?)\s*\.?$/);
      if(m&&!/^\(?\s*x/.test(ch)) out.add(parseFloat(m[1]));
      return;
    }
    numbers(ch).forEach(v=>out.add(v));
  });
  return [...out];
}
// Algebraic expression in the given one-letter variables; returns {f, factored}
function exprCandidate(c,vars){
  let t=c.replace(/β/g,'b').replace(/c_?0|c\(0\)/g,'c').replace(/[{]/g,'(').replace(/[}]/g,')').replace(/½/g,'(1/2)')
         .replace(/π/g,'P').replace(/√\(/g,'S(').replace(/√(P|[0-9.]+|[a-z])/g,'S($1)').replace(/\^/g,'**');
  const V=vars.join('');
  if(!t||!new RegExp('^[0-9'+V+'SP+\\-*/().]+$').test(t)) return null;
  const raw=t;
  t=t.replace(new RegExp('([0-9'+V+')P])(?=['+V+'(SP])','g'),'$1*');
  try{const g=SafeExpr.compile(t,[...vars,'S','P']); const f=(...a)=>g(...a,Math.sqrt,Math.PI); const y=f(...vars.map((_,i)=>1.3+i)); if(!Number.isFinite(y)) return null;
    return {f,factored:isProduct(raw)};}catch(e){return null}
}
// true if the expression is a product at top level (no + or − outside brackets) and contains a bracket
function isProduct(raw){
  if(!raw.includes('(')) return false;
  let d=0;
  for(let i=0;i<raw.length;i++){const c=raw[i];
    if(c==='(') d++; else if(c===')') d--;
    else if(d===0&&(c==='+'||c==='-')&&i>0&&!'*/('.includes(raw[i-1])) return false;}
  return true;
}
function exprParse(s,vars){
  const t=norm(s).replace(/\s/g,'');
  const chunks=t.split(/[Ⴀ-ჿ,;]+/).filter(Boolean);
  let withEq=null,last=null;
  for(const ch of chunks){
    if(ch.includes('=')){ const parts=ch.split('='); for(let i=parts.length-1;i>=1;i--){ const p=exprCandidate(parts[i],vars); if(p){ if(!withEq) withEq=p; break; } } }
    else { const p=exprCandidate(ch,vars); if(p) last=p; }
  }
  return withEq||last;
}
function sameExpr(f,g,n,pos){
  let pts=[[2,3,-1],[-1.5,0.5,4],[0.7,-2,2.5],[3,1,0.3],[-2.2,-0.7,1.9]];
  if(pos) pts=pts.map(p=>p.map(v=>Math.abs(v)+0.2));
  return pts.every(p=>{const a=f(...p.slice(0,n)),b=g(...p.slice(0,n));return Number.isFinite(a)&&Math.abs(a-b)<1e-9*Math.max(1,Math.abs(b))});
}
function supfmt(s){return String(s).replace(/\^\{([^}]+)\}/g,(_,x)=>'<sup>'+x.replace(/-/g,'−')+'</sup>')}
