const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem('mk3-lang', 'ar'));
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(900);
  const data = await page.evaluate(() => {
    const doc = document.scrollingElement;
    const bad = [];
    document.querySelectorAll('body *').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.left < -1 || r.right > 391) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed') return;
        bad.push({ sel: el.tagName + '.' + String(el.className).split(' ')[0], left: +r.left.toFixed(0), right: +r.right.toFixed(0), w: +r.width.toFixed(0), pos: cs.position });
      }
    });
    return { scrollLeft: doc.scrollLeft, scrollWidth: doc.scrollWidth, innerWidth: window.innerWidth, overflows: bad.slice(0, 8) };
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
