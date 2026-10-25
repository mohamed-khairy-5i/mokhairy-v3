/* probe: why did burger cx shift after the color pass? */
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem('mk3-lang', 'ar'));
  await page.goto('http://localhost:3000/index.html', { waitUntil: 'load' });
  await page.waitForTimeout(1200);

  const data = await page.evaluate(() => {
    const box = (el) => {
      const r = el.getBoundingClientRect();
      return { cls: el.className.split(' ')[0], left: +r.left.toFixed(1), width: +r.width.toFixed(1), cx: +(r.left + r.width / 2).toFixed(1) };
    };
    const nav = document.querySelector('.nav');
    const inner = document.querySelector('.nav-inner');
    const cs = getComputedStyle(inner);
    return {
      dir: document.documentElement.getAttribute('dir'),
      nav: box(nav),
      children: [...inner.children].map(box),
      gap: cs.gap,
      padding: cs.padding,
      fontBrand: getComputedStyle(document.querySelector('.brand-name')).fontFamily.split(',')[0],
      fontChip: (() => {
        const c = document.querySelector('.nav-actions button, .nav-actions .chip-btn');
        return c ? getComputedStyle(c).fontFamily.split(',')[0] + ' ' + getComputedStyle(c).fontSize : 'n/a';
      })(),
    };
  });
  console.log(JSON.stringify(data, null, 1));
  await browser.close();
})().catch(e => { console.error('FAIL', e); process.exit(1); });
