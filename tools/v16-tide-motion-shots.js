/* v16 — "Electric tide" animated drift — approval shots
   1) EN hero at t≈0   2) EN hero at t≈9s (alternate midpoint = max drift)
   3) AR hero dark     4) Light hero (must stay frozen)
   5) AR mobile 390 with overflow check                                  */
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

  // 1) EN hero — frame A at animation start
  let { ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en' });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await settle(page); await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/v16-en-hero-t0.png` });

  // 2) EN hero — frame B at ~9s (max drift of the 18s alternate loop)
  await page.waitForTimeout(9000);
  await page.screenshot({ path: `${OUT}/v16-en-hero-t9.png` });
  console.log('EN hero t0/t9 done, errors:', errs.length);
  await ctx.close();

  // 3) AR hero dark
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'ar' }));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await settle(page); await page.waitForTimeout(2000);
  await page.screenshot({ path: `${OUT}/v16-ar-hero.png` });
  console.log('AR hero done, errors:', errs.length);
  await ctx.close();

  // 4) Light hero — must be the frozen v13 pastel field
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en', theme: 'light' }));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await settle(page); await page.waitForTimeout(1500);
  const lightAnim = await page.evaluate(() =>
    getComputedStyle(document.querySelector('.hero'), '::before').animationName);
  await page.screenshot({ path: `${OUT}/v16-light-hero.png` });
  console.log('Light hero done, ::before animation-name:', lightAnim, '(expected none)');
  await ctx.close();

  // 5) AR mobile 390 — overflow probe
  ({ ctx, page, errs } = await newPage({ width: 390, height: 844 }, { lang: 'ar', mobile: true }));
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await settle(page); await page.waitForTimeout(2000);
  const { sw, iw } = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  await page.screenshot({ path: `${OUT}/v16-ar-mobile-390.png` });
  console.log('AR mobile done, scrollWidth vs innerWidth:', sw, 'vs', iw, sw <= iw ? 'OK' : 'OVERFLOW!');
  console.log('Mobile errors:', errs.length);
  await ctx.close();

  await browser.close();
  console.log('ALL v16 SHOTS DONE');
})().catch(e => { console.error('SHOT FAILED:', e.message); process.exit(1); });
