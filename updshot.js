const puppeteer=require('puppeteer');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
  const b=await puppeteer.launch({headless:'new',args:['--no-sandbox']});
  const p=await b.newPage();
  await p.setViewport({width:412,height:880,deviceScaleFactor:2});
  await p.goto('file:///Users/timmarkin/Agents/hackathons/12-vibehack-london/chat.html',{waitUntil:'networkidle0',timeout:20000});
  await sleep(800);
  await p.click('#addbot');
  await sleep(11000);   // let the full reading + leaderboard finish (state.profiles set)
  // round 1: cringe / gaming -> aura DROP
  await p.type('#msgin','gm kings 🚀🔥 lets crush it rise and grind, the lore give me 9999 aura'); await p.keyboard.press('Enter');
  await p.waitForSelector('#updbtn',{timeout:6000}); await p.click('#updbtn'); await sleep(3800);
  // round 2: genuinely funny -> aura RISE
  await p.type('#msgin','honestly i\'m just here for the free food and the emotional damage'); await p.keyboard.press('Enter');
  await p.waitForSelector('#updbtn',{timeout:6000}); await p.click('#updbtn'); await sleep(3800);
  await p.screenshot({path:__dirname+'/chat_updown.png',fullPage:true});
  await b.close(); console.log('updown shot done');
})().catch(e=>{console.error('ERR',e.message);process.exit(1)});
