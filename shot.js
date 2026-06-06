const puppeteer = require('puppeteer');
const D = __dirname;
const sleep = ms => new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b = await puppeteer.launch({headless:'new', args:['--no-sandbox']});
  const p = await b.newPage();
  await p.setViewport({width:393,height:852,deviceScaleFactor:2});
  let ok=false;
  for(let i=0;i<10 && !ok;i++){
    try{ await p.goto('http://localhost:8787',{waitUntil:'networkidle0',timeout:8000}); ok=true; }
    catch(e){ await sleep(700); }
  }
  if(!ok){ console.error('server not up'); process.exit(1); }
  await sleep(400);
  await p.screenshot({path:D+'/preview_landing.png'});
  await p.click('#sample');
  await sleep(2200);
  await p.screenshot({path:D+'/preview_result.png', fullPage:true});
  await b.close();
  console.log('shots done');
})().catch(e=>{console.error('ERR',e.message);process.exit(1);});
