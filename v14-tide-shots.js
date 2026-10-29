/* v14 — "Electric tide" (DENCHOU) blended hero mesh — approval shots */
const { chromium } = require('playwright');
const OUT = '/home/z/my-project/download/portfolio-preview';
const BASE = 'http://localhost:3000';

(async () => {
  const browser = await chromium.launch();

  async function newPage(viewport, opts = {}) {
    const ctx = await browser.newContext({
      viewport, isMobile: !!opts.mobile, hasTouch: !!opts.mobile,
      deviceScaleFactor: opts.mobile ? 2 : 1,
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => errs.push(e.message));
    if (opts.lang || opts.theme) {
      await page.addInitScript(([l, t]) => {
        if (l) localStorage.setItem('mk3-lang', l);
        if (t) localStorage.setItem('mk3-theme', t);
      }, [opts.lang || null, opts.theme || null]);
    }
    return { ctx, page, errs };
  }
  const settle = (p) => p.evaluate(() =>
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('in')));

  // 1) EN hero — indigo core + cyan sheen + ice glint + peach afterglow
  let { ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en' });
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v14-en-hero.png' });
  console.log('1 en-hero errors:', errs.length);
  await ctx.close();

  // 2) AR hero
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'ar' }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v14-ar-hero.png' });
  console.log('2 ar-hero errors:', errs.length);
  await ctx.close();

  // 3) EN scrolled to #work — violet glow-b + peach rim interplay (unchanged zone)
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en' }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.evaluate(() => document.querySelector('#work').scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + '/v14-en-work.png' });
  console.log('3 en-work errors:', errs.length);
  await ctx.close();

  // 4) AR mobile 390 — hero + overflow sanity
  ({ ctx, page, errs } = await newPage({ width: 390, height: 844 }, { lang: 'ar', mobile: true }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + '/v14-ar-mobile-hero.png' });
  const overflow = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth, iw: window.innerWidth,
    sl: document.documentElement.scrollLeft,
  }));
  console.log('4 mobile-hero errors:', errs.length, 'overflow:', JSON.stringify(overflow));
  await ctx.close();

  // 5) LIGHT hero — must be identical to v13 (pinned pastel field)
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en', theme: 'light' }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v14-light-hero.png' });
  console.log('5 light-hero errors:', errs.length);
  await ctx.close();

  await browser.close();
  console.log('DONE v14 shots');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
