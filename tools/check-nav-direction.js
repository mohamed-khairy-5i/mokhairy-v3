/* check-nav-direction.js — RTL/LTR island + sub-menu direction & anchors
   Run: node scripts/check-nav-direction.js   (daemon-serve on :3000 required)
   Rebuilt v2 (post-rollback) — keep in sync with portfolio-v3/tools/ */
const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
let pass = 0, fail = 0;
function ok(name, cond, extra = '') {
  if (cond) { pass++; console.log('  ✓ ' + name + (extra ? ' (' + extra + ')' : '')); }
  else { fail++; console.log('  ✗ ' + name + (extra ? ' — ' + extra : '')); }
}
async function center(page, sel) {
  const b = await page.locator(sel).boundingBox();
  return b ? { x: b.x + b.width / 2, y: b.y + b.height / 2, box: b } : null;
}
async function zeroBorders(page, sel) {
  return page.$eval(sel, (el) => {
    const s = getComputedStyle(el);
    return ['Top', 'Right', 'Bottom', 'Left'].every(
      (side) => parseFloat(s['border' + side + 'Width']) === 0
    );
  });
}

(async () => {
  const browser = await chromium.launch();

  async function mobile(lang) {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true, hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.addInitScript((l) => localStorage.setItem('mk3-lang', l), lang);
    await page.goto(BASE + '/index.html', { waitUntil: 'load' });
    await page.waitForTimeout(500);
    return { ctx, page };
  }

  /* ---------- AR mobile (RTL) ---------- */
  {
    const { ctx, page } = await mobile('ar');
    const dir = await page.evaluate(() => document.documentElement.getAttribute('dir'));
    ok('AR dir=rtl', dir === 'rtl', dir);

    const burger = await center(page, '.nav-burger');
    const brand = await center(page, '.brand');
    ok('burger on LEFT in RTL', burger && burger.x < 120, burger && ('cx=' + burger.x.toFixed(0)));
    ok('brand on RIGHT in RTL', brand && brand.x > 270, brand && ('cx=' + brand.x.toFixed(0)));

    await page.click('.nav-burger');
    await page.waitForTimeout(420); // open transition (250ms) + settle

    const menuBox = await page.locator('.mobile-menu').boundingBox();
    const navBox = await page.locator('.nav').boundingBox();
    ok('compact glass card (w≈260)', menuBox && Math.abs(menuBox.width - 260) <= 6,
      menuBox && ('w=' + menuBox.width.toFixed(0)));
    ok('hangs under the BURGER side — LEFT in RTL',
      menuBox && navBox && Math.abs(menuBox.x - navBox.x) <= 3,
      menuBox && ('card.left=' + menuBox.x.toFixed(1) + ' island.left=' + navBox.x.toFixed(1)));

    const flow = await page.$eval('.mobile-menu', (el) => getComputedStyle(el).direction);
    ok('menu items flow RTL', flow === 'rtl', flow);

    ok('zero borders — .nav', await zeroBorders(page, '.nav'));
    ok('zero borders — .chip-btn', await zeroBorders(page, '.chip-btn'));
    ok('zero borders — .nav-burger', await zeroBorders(page, '.nav-burger'));
    ok('zero borders — .mobile-menu', await zeroBorders(page, '.mobile-menu'));

    // pick Contact → menu closes, anchor lands under the island
    await page.click('.mobile-menu a[href="#contact"]');
    await page.waitForTimeout(300);
    const menuGone = await page.$eval('.mobile-menu', (el) => !el.classList.contains('open'));
    ok('menu closes after picking a link (contact)', menuGone);

    let top = -1;
    for (let i = 0; i < 30; i++) {
      await page.waitForTimeout(120);
      const t = await page.$eval('#contact', (el) => el.getBoundingClientRect().top);
      if (Math.abs(t - top) < 1.5) { top = t; break; }
      top = t;
    }
    ok('#contact lands under the island', top >= 40 && top <= 260, 'top=' + top.toFixed(0) + 'px');
    await ctx.close();
  }

  /* ---------- EN mobile (LTR) ---------- */
  {
    const { ctx, page } = await mobile('en');
    const dir = await page.evaluate(() => document.documentElement.getAttribute('dir'));
    ok('EN dir=ltr', dir === 'ltr', dir);

    const burger = await center(page, '.nav-burger');
    const brand = await center(page, '.brand');
    ok('burger on RIGHT in LTR', burger && burger.x > 270, burger && ('cx=' + burger.x.toFixed(0)));
    ok('brand on LEFT in LTR', brand && brand.x < 120, brand && ('cx=' + brand.x.toFixed(0)));

    await page.click('.nav-burger');
    await page.waitForTimeout(420);

    const menuBox = await page.locator('.mobile-menu').boundingBox();
    const navBox = await page.locator('.nav').boundingBox();
    ok('compact glass card (w≈260) LTR', menuBox && Math.abs(menuBox.width - 260) <= 6,
      menuBox && ('w=' + menuBox.width.toFixed(0)));
    ok('hangs under the BURGER side — RIGHT in LTR',
      menuBox && navBox && Math.abs((menuBox.x + menuBox.width) - (navBox.x + navBox.width)) <= 3,
      menuBox && ('card.right=' + (menuBox.x + menuBox.width).toFixed(1)));

    const flow = await page.$eval('.mobile-menu', (el) => getComputedStyle(el).direction);
    ok('menu items flow LTR', flow === 'ltr', flow);
    await ctx.close();
  }

  /* ---------- AR tablet 768: links stay in the bar ---------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem('mk3-lang', 'ar'));
    await page.goto(BASE + '/index.html', { waitUntil: 'load' });
    await page.waitForTimeout(400);

    const burgerHidden = await page.$eval('.nav-burger', (el) => getComputedStyle(el).display === 'none');
    ok('burger hidden on tablet', burgerHidden);
    const linksVisible = await page.$eval('.nav-links', (el) => getComputedStyle(el).display !== 'none');
    ok('links visible in the bar', linksVisible);
    const lb = await page.locator('.nav-links').boundingBox();
    ok('links sit toward inline-start area (RTL: right-ish)',
      lb && lb.x > 140 && (lb.x + lb.width) > 420,
      lb && ('left=' + lb.x.toFixed(0) + ' right=' + (lb.x + lb.width).toFixed(0)));
    await ctx.close();
  }

  await browser.close();
  console.log('\n' + (fail === 0
    ? '✓ direction checks passed — RTL/LTR both correct (' + pass + ' assertions)'
    : '✗ FAILED: ' + fail + '/' + (pass + fail)));
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
