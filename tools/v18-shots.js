#!/usr/bin/env node
/* v18-shots.js — لقطات توثيق خلفية "الخريطة البحرية" (v18)
   1) EN ديسكتوب t0  2) EN بعد 8 ثواني (إثبات التيار)
   3) Light theme (mk3-theme=light)  4) AR موبايل 390 + فحص overflow
   كمان بيتأكد إن الحركة شغالة (animation-name = mk3-current) */
const { chromium } = require("playwright");
const fs = require("fs");

const BASE = "http://localhost:3000";
const OUT = "/home/z/my-project/download/portfolio-preview";
fs.mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const report = {};

  // 1+2 — EN desktop, two frames 8s apart
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  const anim = await page.evaluate(() =>
    getComputedStyle(document.querySelector(".hero"), "::before").animationName
  );
  report.animationName = anim;
  await page.screenshot({ path: `${OUT}/v18-en-t0.png` });
  await page.waitForTimeout(8000);
  await page.screenshot({ path: `${OUT}/v18-en-t8.png` });

  // 3 — light theme (frozen ink chart)
  const light = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await light.addInitScript(() =>
    localStorage.setItem("mk3-theme", "light")
  );
  await light.goto(BASE, { waitUntil: "networkidle" });
  report.lightAnim = await light.evaluate(() =>
    getComputedStyle(document.querySelector(".hero"), "::before").animationName
  );
  await light.screenshot({ path: `${OUT}/v18-light.png` });
  await light.close();

  // 4 — AR mobile 390 + overflow check
  const ar = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await ar.goto(BASE, { waitUntil: "networkidle" });
  await ar.evaluate(() => {
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  });
  await ar.waitForTimeout(600);
  report.mobileOverflow = await ar.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  await ar.screenshot({ path: `${OUT}/v18-ar-mobile.png` });
  await ar.close();
  await page.close();

  await browser.close();
  console.log(JSON.stringify(report, null, 2));
})().catch((e) => { console.error(e); process.exit(1); });
