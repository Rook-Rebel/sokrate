'use strict';
/* Kapanadze AI–Socrates · interactive plots */

/* ============ interactive plots ============ */
const PLOTS={
  kb:{title:'ექსპერიმენტი: წრფე y = kx + b და პარაბოლა y = x²',view:{x0:-3.4,x1:3.4,y0:-3,y1:9.5},sl:[['k',-4,4,0.5,1],['b',-3,4,0.25,2]]},
  p2:{title:'ექსპერიმენტი: A(a; a²) წერტილზე გამავალი წრფე და პარაბოლა y = x²',view:{x0:-3.4,x1:3.4,y0:-3,y1:9.5},sl:[['a',-2.5,2.5,0.5,1],['k',-6,6,0.5,0]]},
  p3:{title:'ექსპერიმენტი: A(a; a³) წერტილზე გამავალი წრფე და y = x³',view:{x0:-2.8,x1:2.8,y0:-8,y1:8},sl:[['a',-1.5,1.5,0.5,1],['k',-2,8,0.25,1]]},
  half:{title:'ექსპერიმენტი: f = xⁿ, D^{1/2}f და D f — c₀-ის როლი',view:{x0:0,x1:3,y0:-0.6,y1:6.5},sl:[['n',0,3,1,1],['c0',0.2,1.2,0.01,0.5]]}
};
function plotPanel(key){
  const P=PLOTS[key]; if(!P) return '';
  const cur=PLOTV[key]||{};
  return `<details class="tangent-panel" open><summary>${supfmt(T(P.title))}</summary>
  <p class="hint">${key==='half'?T('შეცვალე n და c₀. დააკვირდი, რომელი მრუდი იცვლება c₀-ის ცვლილებისას და რომელი — არა. ექსპერიმენტი ვარაუდისთვისაა; დასაბუთება ალგებრით ხდება.'):T('გადაადგილე სლაიდერები და დააკვირდი, როდის „ერწყმის“ ორი საერთო წერტილი ერთ წერტილად. ექსპერიმენტი ვარაუდის გამოსათქმელადაა — დასაბუთება ალგებრით უნდა მოხდეს.')}</p>
  <svg id="plot" viewBox="0 0 520 300" role="img" aria-label="${esc(plain(T(P.title)))}"></svg>
  <div class="readout" id="readout" aria-live="polite"></div>
  <div class="sliders">${P.sl.map(([n,mn,mx,stp,v])=>{const val=cur[n]??v;return `<label class="f" for="s_${n}">${n==='c0'?'c₀':n} = <output id="o_${n}">${val}</output></label><input id="s_${n}" data-sl="${n}" type="range" min="${mn}" max="${mx}" step="${stp}" value="${val}">`}).join('')}${key==='half'?'<div><button type="button" class="btn ghost sm" id="c0std">'+T('c₀ = 1/√π (შეთანხმება)')+'</button></div>':''}</div></details>`;
}
function mountPlot(app,key){
  const P=PLOTS[key], svg=app.querySelector('#plot'); if(!P||!svg) return;
  const sl=[...app.querySelectorAll('[data-sl]')], out=app.querySelector('#readout');
  const W=520,H=300,{x0,x1,y0,y1}=P.view;
  const X=x=>(x-x0)/(x1-x0)*W, Y=y=>H-(y-y0)/(y1-y0)*H;
  const f=key==='p3'?(x=>x*x*x):(x=>x*x);
  const fmt=v=>String(Math.round(v*100)/100).replace('-','−');
  const E=1e-9;
  function draw(){
    const v={}; PLOTV[key]=PLOTV[key]||{};
    sl.forEach(s=>{const n=s.dataset.sl; v[n]=Number(s.value); PLOTV[key][n]=v[n]; const o=app.querySelector('#o_'+n); if(o) o.textContent=fmt(v[n]);});
    if(key==='half'){ drawHalf(v); return; }
    let L, xs=[], txt='', A=null;
    if(key==='kb'){
      L=x=>v.k*x+v.b; const D=v.k*v.k+4*v.b;
      if(D>E) xs=[(v.k-Math.sqrt(D))/2,(v.k+Math.sqrt(D))/2]; else if(Math.abs(D)<=E) xs=[v.k/2];
      const lab=xs.length===2?T('წრფე კვეთს პარაბოლას'):xs.length===1?T('წრფე ეხება — ორჯერადი ფესვი'):T('საერთო წერტილი არ არის');
      txt=`<span>x² − kx − b = 0 · D = k² + 4b = <b>${fmt(D)}</b></span><span>${T('საერთო წერტილები:')} <b>${xs.length}</b></span><span class="lab${xs.length===1?' tan':''}">${lab}</span>`;
    } else {
      const a=v.a,k=v.k; A=a; L=x=>f(a)+k*(x-a);
      let rs=[];
      if(key==='p2') rs=[k-a];
      else { const d=4*k-3*a*a; if(d>E) rs=[(-a-Math.sqrt(d))/2,(-a+Math.sqrt(d))/2]; else if(Math.abs(d)<=E) rs=[-a/2,-a/2]; }
      const mult=1+rs.filter(r=>Math.abs(r-a)<1e-7).length;
      xs=[a]; rs.forEach(r=>{if(!xs.some(x=>Math.abs(x-r)<1e-7)) xs.push(r)});
      const lab=mult>=3?T('ეხება — x = a სამჯერადი ფესვია'):mult===2?T('ეხება — x = a ორჯერადი ფესვია'):T('კვეთს — x = a მარტივი ფესვია');
      txt=`<span>${T('საერთო წერტილები:')} <b>${xs.length}</b></span><span>${T('x = a ფესვის ჯერადობა:')} <b>${mult}</b></span><span class="lab${mult>=2?' tan':''}">${lab}</span>`;
    }
    const g=[];
    for(let i=Math.ceil(x0);i<=Math.floor(x1);i++) g.push(`<line x1="${X(i).toFixed(1)}" y1="0" x2="${X(i).toFixed(1)}" y2="${H}" class="gl"/>`);
    for(let j=Math.ceil(y0);j<=Math.floor(y1);j++) g.push(`<line x1="0" y1="${Y(j).toFixed(1)}" x2="${W}" y2="${Y(j).toFixed(1)}" class="gl"/>`);
    g.push(`<path d="M0 ${Y(0).toFixed(1)} H${W} M${X(0).toFixed(1)} 0 V${H}" class="ax"/>`);
    const N=260, cl=y=>Math.max(-60,Math.min(60,y));
    g.push(`<path d="${Array.from({length:N+1},(_,i)=>{const x=x0+(x1-x0)*i/N;return (i?'L':'M')+X(x).toFixed(1)+','+Y(cl(f(x))).toFixed(1)}).join(' ')}" class="cv"/>`);
    g.push(`<line x1="0" y1="${Y(cl(L(x0))).toFixed(1)}" x2="${W}" y2="${Y(cl(L(x1))).toFixed(1)}" class="ln"/>`);
    xs.forEach(x=>{const isA=A!==null&&Math.abs(x-A)<1e-7; g.push(`<circle cx="${X(x).toFixed(1)}" cy="${Y(f(x)).toFixed(1)}" r="${isA?6:4.5}" class="${isA?'pa':'pt'}"/>`)});
    g.push(`<text x="10" y="20" class="tc">${key==='p3'?'y = x³':'y = x²'}</text><text x="10" y="38" class="tl">${key==='kb'?'y = kx + b':'y = P(a) + k(x − a)'}</text>`);
    svg.innerHTML=g.join('');
    out.innerHTML=txt;
  }
  function drawHalf(v){
    const n=Math.round(v.n), c0=v.c0, f3=x=>(Math.round(x*1000)/1000).toString().replace('-','−');
    let cn=c0; for(let k=1;k<=n;k++) cn*=2*k/(2*k-1);
    const ch=n>=1?n/cn:0;
    const F=x=>Math.pow(x,n), Hf=x=>cn*Math.pow(x,n-0.5), Df=x=>n?n*Math.pow(x,n-1):0;
    const cl=y=>Math.max(y0-5,Math.min(y1+5,y)), N=240;
    const path=(fn,cls)=>`<path d="${Array.from({length:N+1},(_,i)=>{const x=0.01+(x1-0.01)*i/N;return (i?'L':'M')+X(x).toFixed(1)+','+Y(cl(fn(x))).toFixed(1)}).join(' ')}" class="${cls}"/>`;
    const g=[];
    for(let i=1;i<=Math.floor(x1);i++) g.push(`<line x1="${X(i).toFixed(1)}" y1="0" x2="${X(i).toFixed(1)}" y2="${H}" class="gl"/>`);
    for(let j=Math.ceil(y0);j<=Math.floor(y1);j++) g.push(`<line x1="0" y1="${Y(j).toFixed(1)}" x2="${W}" y2="${Y(j).toFixed(1)}" class="gl"/>`);
    g.push(`<path d="M0 ${Y(0).toFixed(1)} H${W} M${X(0).toFixed(1)} 0 V${H}" class="ax"/>`);
    g.push(path(F,'cv'),path(Hf,'hf'),path(Df,'df'));
    g.push(`<text x="${W-150}" y="20" class="tc">f = x${['⁰','¹','²','³'][n]}</text><text x="${W-150}" y="38" class="th">D¹ᐟ² f</text><text x="${W-150}" y="56" class="td">D f</text>`);
    svg.innerHTML=g.join('');
    out.innerHTML=`<span>c(${n}) = <b>${f3(cn)}</b></span><span>c(${n} − ½) = <b>${n?f3(ch):'0'}</b>${n?'':' (c(−½) = 0)'}</span><span>${T('ნამრავლი')} = <b>${n?f3(cn*ch):0}</b> = ${n}</span><span class="lab tan">${T('D f c₀-ზე არ არის დამოკიდებული; იცვლება მხოლოდ D<sup>1/2</sup>f')}</span>`;
  }
  sl.forEach(s=>s.addEventListener('input',draw));
  const std=app.querySelector('#c0std'); if(std) std.onclick=()=>{const s=app.querySelector('#s_c0'); s.value=(1/Math.sqrt(Math.PI)).toFixed(2); draw();};
  draw();
}
