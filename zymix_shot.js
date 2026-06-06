const puppeteer = require('puppeteer');
const sleep = ms => new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b = await puppeteer.launch({headless:'new', args:['--no-sandbox']});
  const p = await b.newPage();
  await p.setViewport({width:1280,height:900,deviceScaleFactor:1});
  let ok=false;
  for(const url of ['https://zymix.ai/en/index.html','https://zymix.ai/en/feature.html','https://zymix.ai']){
    try{ await p.goto(url,{waitUntil:'networkidle2',timeout:20000}); ok=true; break; }catch(e){}
  }
  if(!ok){ console.log('could not load zymix.ai'); process.exit(1); }
  await sleep(2500);
  await p.screenshot({path:__dirname+'/zymix_home.png'});
  const pal = await p.evaluate(()=>{
    const tally={};
    document.querySelectorAll('*').forEach(el=>{
      const s=getComputedStyle(el);
      [s.backgroundColor,s.color].forEach(c=>{ if(c && c!=='rgba(0, 0, 0, 0)' && c!=='rgb(0, 0, 0)' && c!=='rgb(255, 255, 255)') tally[c]=(tally[c]||0)+1; });
    });
    const top=Object.entries(tally).sort((a,b)=>b[1]-a[1]).slice(0,14).map(([c,n])=>c+' x'+n);
    const fonts=[...new Set([...document.querySelectorAll('h1,h2,button,body')].map(e=>getComputedStyle(e).fontFamily))].slice(0,6);
    return {bodyBg:getComputedStyle(document.body).backgroundColor, top, fonts};
  });
  console.log(JSON.stringify(pal,null,2));
  // also a mobile-width capture (app-like)
  await p.setViewport({width:430,height:900,deviceScaleFactor:2});
  await sleep(800);
  await p.screenshot({path:__dirname+'/zymix_mobile.png'});
  await b.close();
  console.log('shots: zymix_home.png, zymix_mobile.png');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
