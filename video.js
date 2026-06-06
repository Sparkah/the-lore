// the lore - demo video producer. Records the live flow with an in-page subtitle
// overlay (ffmpeg here has no libass), narrates with macOS `say`, muxes to demo.mp4.
const puppeteer = require('puppeteer');
const { execSync, execFileSync } = require('child_process');
const fs = require('fs');
const D = '/Users/timmarkin/Agents/hackathons/12-vibehack-london';
const T = '/tmp/lorevid'; fs.mkdirSync(T, { recursive: true });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const VOICE = process.env.VOICE || 'Daniel';
const CHAT = 'file://' + D + '/chat.html';

const SEG = [
  { t: "Meet the lore. A bot you drop into any group chat.", a: async () => {} },
  { t: "It reads the whole conversation and turns everyone into a character: an aura score, three stats, and a roast.",
    a: async (p) => { await p.click('#addbot'); } },
  { t: "Aura is earned. It climbs for wit and crashes for cringe, and a live leaderboard turns the group chat into a status game.",
    a: async (p) => { await p.evaluate(() => { const e=[...document.querySelectorAll('.cn')].find(x=>/leaderboard/i.test(x.textContent)); if(e) e.scrollIntoView({block:'center'}); }); } },
  { t: "And it is an ultra bot. It drops playable mini games straight into the chat.",
    a: async (p) => { await p.click('.inputbar .plus'); } },
  { t: "Tap one, and it opens full screen, just like a native mini app.",
    a: async (p) => { const t=await p.$$('.gtile'); if(t[0]) await t[0].click(); } },
  { t: "All powered by an autonomous studio that ships real games to live marketplaces every day.",
    a: async (p) => { await p.evaluate(()=>openGame('https://game-factory.tech/')); } },
  { t: "the lore. Your group chat is the game now.",
    a: async (p) => { await p.evaluate(()=>openGame('https://the-lore.timofeymarkin98.workers.dev/present')); } },
];

async function setSub(p, text){
  await p.evaluate((t)=>{
    let s=document.getElementById('__sub');
    if(!s){ s=document.createElement('div'); s.id='__sub';
      s.style.cssText='position:fixed;left:0;right:0;bottom:30px;z-index:2147483647;text-align:center;pointer-events:none;padding:0 20px;font-family:Helvetica,Arial,sans-serif';
      (document.body||document.documentElement).appendChild(s); }
    s.innerHTML = t ? `<span style="background:rgba(8,12,10,.78);color:#fff;font-weight:800;font-size:16px;line-height:1.4;padding:7px 13px;border-radius:11px;-webkit-box-decoration-break:clone;box-decoration-break:clone">${String(t).replace(/</g,'&lt;')}</span>` : '';
  }, text).catch(()=>{});
}

(async () => {
  // 1) narration + durations
  const durs = [];
  for (let i=0;i<SEG.length;i++){
    const f = `${T}/s${i}.aiff`;
    execFileSync('say', ['-v', VOICE, '-r', '178', '-o', f, SEG[i].t]);
    durs.push(parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`).toString().trim()) + 0.12);
  }
  fs.writeFileSync(`${T}/list.txt`, SEG.map((_,i)=>`file '${T}/s${i}.aiff'`).join('\n'));
  execSync(`ffmpeg -y -f concat -safe 0 -i "${T}/list.txt" -c copy "${T}/voice.aiff" 2>/dev/null`);
  console.log('narration', durs.reduce((a,b)=>a+b,0).toFixed(1), 's');

  // 2) record footage with in-page subtitles
  const b = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--autoplay-policy=no-user-gesture-required'] });
  const p = await b.newPage();
  await p.setViewport({ width: 430, height: 880, deviceScaleFactor: 2 });
  await p.goto(CHAT, { waitUntil: 'networkidle0', timeout: 20000 });
  await sleep(500);
  const rec = await p.screencast({ path: `${T}/footage.webm` });
  for (let i=0;i<SEG.length;i++){
    try { await SEG[i].a(p); } catch(e){ console.log('beat',i,'err',e.message); }
    await setSub(p, SEG[i].t);
    await sleep(durs[i]*1000);
  }
  await setSub(p, '');
  await rec.stop();
  await b.close();
  console.log('footage recorded');

  // 3) mux (subs already in the footage)
  execFileSync('ffmpeg', ['-y','-i',`${T}/footage.webm`,'-i',`${T}/voice.aiff`,
    '-map','0:v:0','-map','1:a:0','-c:v','libx264','-pix_fmt','yuv420p','-preset','veryfast','-c:a','aac','-b:a','160k','-shortest',`${D}/demo.mp4`],
    { stdio:'ignore' });
  console.log('DONE -> demo.mp4');
})().catch(e => { console.error('VIDEO ERR', e.message); process.exit(1); });
