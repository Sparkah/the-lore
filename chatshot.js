const puppeteer=require('puppeteer');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:412,height:880,deviceScaleFactor:2});
  await p.goto('file:///Users/timmarkin/Agents/hackathon/chat.html',{waitUntil:'networkidle0',timeout:20000});
  await sleep(900);
  await p.screenshot({path:__dirname+'/chat_initial.png'});
  await p.click('#addbot');
  await sleep(9000);                 // file:// has no /api, so falls to baked fast; this covers typing + card stagger
  await p.screenshot({path:__dirname+'/chat_result.png',fullPage:true});
  await b.close(); console.log('chat shots done');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
