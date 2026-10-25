/* check-v3-multipage.js — full site sweep: 6 pages × EN/AR
   zero console errors, zero broken local links, mobile burger flow,
   cross-page nav flow, certificate filters.
   Run: node scripts/check-v3-multipage.js   (daemon-serve on :3000 required) */
const { chromium } = require('playwright');

const BASE = 'http://localhost:3000';
const PAGES = [
  'index.html',
  'projects.html',
  'certificates.html',
  'projects/waslfy.html',
  'projects/tossinbox.html',
  'projects/trigger-doctor.html',
];
let fails = 0;
function fail(msg) { fails++; console.log('  ✗ ' + msg); }

(async () => {
  const browser = await chromium.launch();

  /* ---------- 12 page checks (6 × EN/AR) ---------- */
  for (const lang of ['en', 'ar']) {
    for (const p of PAGES) {
      const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await ctx.newPage();
      await page.addInitScript((l) => localStorage.setItem('mk3-lang', l), lang);
      const errs = [];
      page.on('console', (m) => { if (m.type() === 'error') errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push(e.message));
      await page.goto(BASE + '/' + p, { waitUntil: 'load' });
      await page.waitForTimeout(450);

      if (errs.length) fail(p + ' [' + lang + '] console errors: ' + errs.slice(0, 3).join(' | '));

      const dir = await page.evaluate(() => document.documentElement.getAttribute('dir'));
      if (dir !== (lang === 'ar' ? 'rtl' : 'ltr')) fail(p + ' [' + lang + '] dir=' + dir);

      // every local link + image resolves (skip non-fetch schemes)
      const broken = await page.evaluate(async (base) => {
        const urls = new Set();
        document.querySelectorAll('a[href], img[src], link[href], script[src]').forEach((el) => {
          const raw = el.getAttribute('href') || el.getAttribute('src') || '';
          if (!raw || /^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(raw)) return;
          try { urls.add(new URL(raw, base).href); } catch (e) {}
        });
        const bad = [];
        for (const u of urls) {
          try {
            const r = await fetch(u, { method: 'GET' });
            if (!r.ok) bad.push(u + ' → ' + r.status);
          } catch (e) { bad.push(u + ' → ' + e.message); }
        }
        return bad;
      }, BASE + '/' + p);
      if (broken.length) fail(p + ' [' + lang + '] broken: ' + broken.join(', '));

      console.log('checked: ' + p + ' (' + lang + ')');
      await ctx.close();
    }
  }

  /* ---------- mobile burger flow (AR): open menu, go to projects ---------- */
  {
    const ctx = await browser.newContext({
      viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
    });
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem('mk3-lang', 'ar'));
    await page.goto(BASE + '/index.html', { waitUntil: 'load' });
    await page.waitForTimeout(400);
    await page.click('.nav-burger');
    await page.waitForTimeout(420);
    await page.click('.mobile-menu a[href="projects.html"]');
    await page.waitForLoadState('load');
    await page.waitForTimeout(500);
    if (!page.url().includes('projects.html')) fail('mobile flow: expected projects.html, got ' + page.url());
    else console.log('mobile burger flow OK (index → projects via sub-menu)');
    await ctx.close();
  }

  /* ---------- desktop nav flow: home → projects → waslfy → tossinbox → trigger-doctor → certificates ---------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.addInitScript(() => localStorage.setItem('mk3-lang', 'en'));
    await page.goto(BASE + '/index.html', { waitUntil: 'load' });
    await page.waitForTimeout(400);

    await page.click('a[href="projects.html"]');
    await page.waitForLoadState('load');
    await page.waitForTimeout(400);
    if (!page.url().includes('projects.html')) fail('flow: projects.html');

    await page.click('a[href="projects/waslfy.html"]');
    await page.waitForLoadState('load');
    await page.waitForTimeout(400);
    if (!page.url().includes('waslfy.html')) fail('flow: waslfy');

    await page.click('.next-proj a[href="tossinbox.html"]');
    await page.waitForLoadState('load');
    await page.waitForTimeout(400);
    if (!page.url().includes('tossinbox.html')) fail('flow: tossinbox');

    await page.click('.next-proj a[href="trigger-doctor.html"]');
    await page.waitForLoadState('load');
    await page.waitForTimeout(400);
    if (!page.url().includes('trigger-doctor.html')) fail('flow: trigger-doctor');

    await page.click('a[href="../certificates.html"]');
    await page.waitForLoadState('load');
    await page.waitForTimeout(400);
    if (!page.url().includes('certificates.html')) fail('flow: certificates');
    else console.log('nav flow OK: home→projects→waslfy→tossinbox→trigger-doctor→certificates');
    await ctx.close();
  }

  /* ---------- certificate filters ---------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await ctx.newPage();
    await page.goto(BASE + '/certificates.html', { waitUntil: 'load' });
    await page.waitForTimeout(400);

    await page.click('.cert-filters button[data-filter="programming"]');
    await page.waitForTimeout(200);
    const prog = await page.$$eval('[data-cert-group]', (els) =>
      els.filter((e) => e.style.display !== 'none').length);
    await page.click('.cert-filters button[data-filter="all"]');
    await page.waitForTimeout(200);
    const all = await page.$$eval('[data-cert-group]', (els) =>
      els.filter((e) => e.style.display !== 'none').length);
    if (prog !== 9 || all !== 28) fail('cert filters: programming=' + prog + ' all=' + all);
    else console.log('cert filter OK: programming=' + prog + ', all=' + all);
    await ctx.close();
  }

  await browser.close();
  console.log('\n' + (fails === 0
    ? '✓ ALL CLEAN: 6 pages × EN/AR + mobile + nav flow + filters — zero console errors, zero broken links'
    : '✗ ' + fails + ' problem(s) found'));
  process.exit(fails === 0 ? 0 : 1);
})().catch((e) => { console.error('FATAL', e); process.exit(1); });
