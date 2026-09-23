import { chromium } from '/Users/marcgray/odyssey/node_modules/playwright/index.mjs';
const B='http://localhost:8000/';
const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1280,height:1000}});
for (const pg of ['index.html','research.html','blog.html']){
  await p.goto(B+pg+'?a=1',{waitUntil:'networkidle',timeout:120000});
  await p.waitForTimeout(1200);
  await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  await p.waitForTimeout(1800);
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(600);
  const rows=await p.evaluate(()=>{
    const vis=el=>{const r=el.getBoundingClientRect();return r.width>0&&r.height>0;};
    const out=[];
    document.querySelectorAll('main h1,main h2,main h3,main h4').forEach(h=>{
      if(!vis(h)) return;
      const hr=h.getBoundingClientRect();
      // nearest visible sibling-ish neighbours in document order
      let prev=null,next=null;
      const all=[...document.querySelectorAll('main *')].filter(e=>vis(e)&&!e.contains(h)&&e!==h&&!h.contains(e)&&e.children.length===0||e===h);
      const idx=all.indexOf(h);
      for(let i=idx-1;i>=0;i--){const r=all[i].getBoundingClientRect(); if(r.bottom<=hr.top+1){prev=r;break;}}
      for(let i=idx+1;i<all.length;i++){const r=all[i].getBoundingClientRect(); if(r.top>=hr.bottom-1){next=r;break;}}
      const ps=h.previousElementSibling;
      const paired = ps && /\b(eyebrow|role|paper-n)\b/.test(ps.className||'');
      if(!prev||!next||paired) return;
      out.push({t:h.textContent.trim().slice(0,34),tag:h.tagName,
                above:Math.round(hr.top-prev.bottom), below:Math.round(next.top-hr.bottom)});
    });
    return out;
  });
  console.log('\n===== '+pg);
  rows.forEach(r=>{
    const bad = r.above <= r.below;
    console.log(`${bad?'  ** ':'     '}${r.tag} above:${String(r.above).padStart(4)} below:${String(r.below).padStart(4)}  ${r.t}`);
  });
}
await b.close();
