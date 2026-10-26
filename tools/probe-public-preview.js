/* probe — open the PUBLIC preview URL exactly like the user does, verify + screenshot */
const { chromium } = require('playwright');
const URL = 'https://preview-chat-55873334-13fe-42e4-a3e1-9e05bf94b62d.space-z.ai/';
const OUT = '/home/z/my-project/download/portfolio-preview/public-preview-check.png';

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push(e.message));

  const resp = await page.goto(URL, { waitUntil: 'networkidle', timeout: 45000 });
  console.log('HTTP status:', resp && resp.status());
  await page.waitForTimeout(2500);

  const title = await page.title();
  console.log('Page title:', title);

  const body = await page.evaluate(() => document.body.innerText.slice(0, 300));
  console.log('Body text (first 300):', JSON.stringify(body));

  const wasly = await page.evaluate(() => /wasly|وصلي/i.test(document.documentElement.outerHTML));
  console.log('Contains Wasly content?', wasly);

  await page.screenshot({ path: OUT, fullPage: false });
  console.log('Screenshot saved:', OUT);
  console.log('Console errors:', errs.length ? errs : 'NONE');

  await browser.close();
})().catch(e => { console.error('PROBE FAILED:', e.message); process.exit(1); });
