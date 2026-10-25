/* v12 — motion craft + feralui gradients — approval shots */
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

  // 1) AR hero — island + iridescent em + mesh glows
  let { ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'ar' });
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v13-ar-hero.png' });
  console.log('1 ar-hero errors:', errs.length);
  await ctx.close();

  // 2) EN hero — iridescent "shipped"
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en' }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v13-en-hero.png' });
  console.log('2 en-hero errors:', errs.length);
  await ctx.close();

  // 3) EN scrolled to #work — island over dark content
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en' }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.evaluate(() => document.querySelector('#work').scrollIntoView({ behavior: 'instant', block: 'start' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: OUT + '/v13-en-work.png' });
  console.log('3 en-work errors:', errs.length);
  await ctx.close();

  // 4) AR projects — violet flip tags + image outlines
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'ar' }));
  await page.goto(BASE + '/projects.html', { waitUntil: 'load' });
  await settle(page);
  await page.evaluate(() => document.querySelector('.feature-card.flip').scrollIntoView({ behavior: 'instant', block: 'center' }));
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + '/v13-ar-projects.png' });
  console.log('4 ar-projects errors:', errs.length);
  await ctx.close();

  // 5) EN certificates — peach years + white-image outlines
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en' }));
  await page.goto(BASE + '/certificates.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v13-en-certificates.png' });
  console.log('5 en-certs errors:', errs.length);
  await ctx.close();

  // 6) AR mobile — menu open (end state) + mid-transition frame
  ({ ctx, page, errs } = await newPage({ width: 390, height: 844 }, { lang: 'ar', mobile: true }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  await page.click('.nav-burger');
  await page.waitForTimeout(110); // mid-flight of the 250ms open
  await page.screenshot({ path: OUT + '/v13-ar-mobile-menu-mid.png' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + '/v13-ar-mobile-menu.png' });
  console.log('6 mobile-menu errors:', errs.length);
  await ctx.close();

  // 7) LIGHT theme — island + palette on light
  ({ ctx, page, errs } = await newPage({ width: 1440, height: 900 }, { lang: 'en', theme: 'light' }));
  await page.goto(BASE + '/index.html', { waitUntil: 'load' });
  await settle(page);
  await page.waitForTimeout(900);
  await page.screenshot({ path: OUT + '/v13-light-hero.png' });
  console.log('7 light-hero errors:', errs.length);
  await ctx.close();

  await browser.close();
  console.log('DONE v12 shots');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
