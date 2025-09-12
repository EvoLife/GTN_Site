const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function ensureDir(p) { await fs.promises.mkdir(p, { recursive: true }).catch(() => {}); }

async function run() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:5180';
  const outDir = path.join(process.cwd(), 'screenshots');
  await ensureDir(outDir);

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.setDefaultTimeout(30000);

  page.on('console', msg => console.log('[browser console]', msg.type(), msg.text()));
  page.on('pageerror', err => console.error('[pageerror]', err));

  console.log('[E2E] goto', baseUrl);
  const res = await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  if (!res || !res.ok()) throw new Error(`Failed to load ${baseUrl}: ${res && res.status()}`);

  try { await page.waitForSelector('body', { timeout: 10000 }); } catch {}
  const htmlDump = path.join(outDir, 'home.html');
  await fs.promises.writeFile(htmlDump, await page.content(), 'utf8');
  console.log('[E2E] saved', htmlDump);

  const homePng = path.join(outDir, 'home.png');
  await page.screenshot({ path: homePng, fullPage: true });
  console.log('[E2E] saved', homePng);

  await delay(300);
  await browser.close();
  console.log('[E2E] done');
}

run().catch(err => { console.error('[E2E] error', err); process.exit(1); });
