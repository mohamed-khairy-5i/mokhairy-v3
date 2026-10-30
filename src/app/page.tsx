"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SITE } from "@/lib/site";
import MiniTerminal from "@/components/MiniTerminal";
import { CopyEmailButton } from "@/components/Toast";
import { GitHubIcon, MailIcon, WhatsAppIcon, LinkedInIcon, ArrowDownIcon } from "@/components/Icons";

const tossTerminal = [
  { cls: "title" as const, text: "tossinbox — MCP server" },
  { cls: "cmd" as const, text: "$ tossinbox spawn" },
  { cls: "out" as const, text: "inbox: xk42f@tossinbox.dev" },
  { cls: "cmd" as const, text: "$ tossinbox wait --otp" },
  { cls: "out" as const, text: "✓ code 881421 received (12s)" },
  { cls: "cmd" as const, text: "$ tossinbox toss" },
  { cls: "out" as const, text: "✓ inbox destroyed" },
];

const doctorTerminal = [
  { cls: "title" as const, text: "trigger-doctor — audit" },
  { cls: "cmd" as const, text: "$ trigger-doctor audit ./SKILL.md" },
  { cls: "out" as const, text: "✓ 24/24 prompts triggered" },
  { cls: "warn" as const, text: "! 2 near-miss phrasings" },
  { cls: "out" as const, text: "prescription: description fix applied" },
  { cls: "out" as const, text: "regression suite saved ✓" },
];

type Build = {
  href: string;
  img: string;
  title: string;
  p: { en: string; ar: string };
  tag: string | { en: string; ar: string };
};

const builds: Build[] = [
  {
    href: "https://marketplace.visualstudio.com/items?itemName=mohamed-khairy-5i.codepixel",
    img: "/assets/work/codepixel.webp",
    title: "CodePixel",
    p: {
      en: "VS Code extension that turns code into high-res, share-ready images.",
      ar: "إضافة VS Code بتحوّل الكود لصور عالية الدقة جاهزة للمشاركة.",
    },
    tag: "VS Code",
  },
  {
    href: "https://hesasy.netlify.app",
    img: "/assets/work/hesasy.webp",
    title: "حسابي — Hesasy",
    p: {
      en: "Arabic RTL digital lesson notebook: attendance, points and parent-ready reports.",
      ar: "دفتر حصة رقمي بالعربي: حضور ونقاط وتقارير جاهزة لولي الأمر.",
    },
    tag: { en: "EdTech · RTL", ar: "تعليم · RTL" },
  },
  {
    href: "https://dhikra.netlify.app",
    img: "/assets/work/dhikra.webp",
    title: "Dhikra",
    p: { en: "Offline-first adhkar companion with a digital tasbih.", ar: "رفيق أذكار شغال من غير نت مع مسبحة رقمية." },
    tag: "PWA",
  },
  {
    href: "https://calcuzakat.netlify.app",
    img: "/assets/work/calcuzakat.webp",
    title: "CalcuZakat",
    p: {
      en: "Zakat calculator: 10 types, 10 currencies, live gold prices.",
      ar: "حاسبة زكاة: ١٠ أنواع و١٠ عملات وأسعار ذهب لايف.",
    },
    tag: "FinTech PWA",
  },
  {
    href: "https://nexluna.netlify.app",
    img: "/assets/work/nexluna.webp",
    title: "Nexluna",
    p: {
      en: "Unit converter built around the Arabic reading experience.",
      ar: "محوّل وحدات مصمم أولًا لتجربة القارئ العربي.",
    },
    tag: { en: "Arabic-first", ar: "عربي أولًا" },
  },
  {
    href: "https://milano2.netlify.app",
    img: "/assets/work/milano.webp",
    title: "Milano",
    p: {
      en: "Full sportswear store for the Yemeni market on its own .com.",
      ar: "متجر رياضي كامل للسوق اليمني على دومين .com خاص.",
    },
    tag: { en: "E-commerce", ar: "متجر إلكتروني" },
  },
  {
    href: "https://yasmona.netlify.app",
    img: "/assets/work/yasmona.webp",
    title: "Yasmona",
    p: {
      en: "Branded link hub for a fashion label with one-tap WhatsApp ordering.",
      ar: "صفحة روابط بهوية علامة أزياء مع طلب بضغطة واحدة على واتساب.",
    },
    tag: "Link-in-bio",
  },
  {
    href: "https://water-jeddah.netlify.app",
    img: "/assets/work/water-jeddah.webp",
    title: "Water Jeddah",
    p: {
      en: "Arabic-first service site that turns searches into calls and WhatsApp orders.",
      ar: "موقع خدمة عربي بيحوّل البحث لمكالمات وطلبات واتساب فورًا.",
    },
    tag: { en: "Arabic RTL", ar: "عربي RTL" },
  },
];

const stack: { h4: { en: string; ar: string }; pills: string[]; mt?: boolean }[][] = [
  [{ h4: { en: "Frontend", ar: "واجهات" }, pills: ["React 19", "Next.js 16", "TypeScript", "Tailwind", "Astro"] }],
  [
    { h4: { en: "Mobile", ar: "موبايل" }, pills: ["Flutter", "Dart"] },
    { h4: { en: "Backend & data", ar: "باك إند وبيانات" }, pills: ["Node.js", "Python", "Supabase", "Firebase", "Dexie"], mt: true },
  ],
  [
    { h4: { en: "AI & edge", ar: "AI والطرف" }, pills: ["ONNX", "MediaPipe", "WASM", "Cloudflare Workers"] },
    { h4: { en: "Shipping", ar: "النشر" }, pills: ["GitHub Actions", "Netlify", "Cloudflare Pages", "Docker"], mt: true },
  ],
];

export default function HomePage() {
  const { t, setPageTitle } = useLang();

  useEffect(() => {
    setPageTitle({
      en: "Mohamed Khairy — Frontend Developer · Arabic-first products & dev tools",
      ar: "محمد خيري — مطور واجهات · منتجات عربية أولًا وأدوات للمطورين",
    });
  }, [setPageTitle]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Mohamed Khairy",
            jobTitle: "Frontend Developer",
            url: SITE.url,
            email: `mailto:${SITE.email}`,
            telephone: SITE.phoneRaw,
            address: { "@type": "PostalAddress", addressCountry: "EG" },
            sameAs: [SITE.github, SITE.linkedin, "https://waslfy.pages.dev", "https://tossinbox.pages.dev"],
          }),
        }}
      />

      {/* ===== HERO ===== */}
      <section id="home" className="hero">
        <div className="container hero-grid">
          <div className="hero-media" data-reveal>
            <figure className="hero-portrait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/portrait.webp"
                alt={t("Mohamed Khairy — freelance frontend developer from Egypt", "محمد خيري — مطور واجهات فريلانسر من مصر")}
                width={896}
                height={1195}
                fetchPriority="high"
              />
              <span className="hp-badge">
                <span className="pulse" aria-hidden="true" />
                <span>{t("Available for projects", "متاح لمشاريع جديدة")}</span>
              </span>
              <figcaption className="hp-name">
                <b>{t("Mohamed Khairy", "محمد خيري")}</b>
                <span>{t("Frontend Developer", "مطور واجهات")}</span>
              </figcaption>
            </figure>
          </div>

          <div className="hero-copy">
            <p className="overline" data-reveal>
              {t("MOHAMED KHAIRY · FRONTEND DEVELOPER · EGYPT", "محمد خيري · مطور واجهات · مصر")}
            </p>
            <h1 className="hero-title" data-reveal>
              {t("Arabic-first products & developer tools — ", "منتجات عربية أولًا وأدوات للمطورين — ")}
              <em>{t("shipped", "بتوصل للنور")}</em>
              {t(", not just designed.", "، مش تصميم بس.")}
            </h1>
            <p className="hero-sub" data-reveal>
              {t(
                "Freelance frontend developer from Egypt. I build SaaS and CLI tools for the Arabic ecosystem — real users, real receipts, zero vaporware.",
                "مطور واجهات فريلانسر من مصر. ببني منتجات SaaS وأدوات CLI للمنظومة العربية — مستخدمين حقيقيين، وإيصالات حقيقية، وصفر كلام في الهوا."
              )}
            </p>
            <div className="hero-cta" data-reveal>
              <Link className="btn btn-primary" href="/work/">
                <span>{t("See the work", "شوف الشغل")}</span>
                <ArrowDownIcon />
              </Link>
              <a className="btn btn-ghost" href={SITE.github} target="_blank" rel="noopener">
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </div>
            <ul className="chips-row" data-reveal>
              <li className="chip-dot">
                <span className="pulse" aria-hidden="true" />
                <span>{t("3 live products", "٣ منتجات لايف")}</span>
              </li>
              <li>
                <span>{t("2 npm packages", "حزمتي npm")}</span>
              </li>
              <li>
                <span>{t("100% open source", "مفتوح المصدر ١٠٠٪")}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== SHIPPED RECEIPTS ===== */}
      <section className="ship-strip" aria-label={t("Shipped tools", "أدوات منشورة")}>
        <div className="container ship-grid">
          <div className="ship-copy" data-reveal>
            <p className="overline">{t("RECEIPTS · NOT PROMISES", "إيصالات · مش وعود")}</p>
            <h2>{t("Don't take my word for it — install them.", "متصدقنيش — ثبّتهم بنفسك.")}</h2>
            <p>
              {t(
                "Every tool here is live on npm right now. Two commands and you're holding the proof.",
                "كل أداة هنا شغالة على npm دلوقتي. أمرين بس وهتبقى ماسك الإثبات في إيدك."
              )}
            </p>
            <Link className="btn btn-ghost btn-sm" href="/projects/">
              <span>{t("Browse all projects", "اتفرج على كل المشاريع")}</span>
            </Link>
          </div>
          <div className="terminal" data-reveal role="img" aria-label="Terminal showing installed packages">
            <div className="terminal-bar">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="terminal-title">{t("~/shipped", "~/شغالي")}</span>
            </div>
            <div className="terminal-body" dir="ltr">
              <p>
                <span className="t-prompt">$</span> npm i <span className="t-pkg">waslfy-parser</span>
              </p>
              <p className="t-out">✓ zero deps · 13 kB · ESM + CJS</p>
              <p>
                <span className="t-prompt">$</span> npx <span className="t-pkg">tossinbox</span>
              </p>
              <p className="t-out">✓ inbox spawned — waiting for OTP</p>
              <p>
                <span className="t-prompt">$</span> npx skills add <span className="t-pkg">trigger-doctor</span>
              </p>
              <p className="t-out">✓ 79 agents supported</p>
              <p>
                <span className="t-prompt">$</span> <span className="t-cursor" aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED WORK ===== */}
      <section id="work" className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>{t("Featured work", "شغل مختار")}</h2>
            <p>
              {t(
                "Real products with real users. Click “Details” for the full story of each one — problem, solution and the numbers.",
                "منتجات حقيقية لاستخدام حقيقي. دوس «تفاصيل المشروع» عشان تقرأ قصة كل واحد كاملة — المشكلة، الحل، والأرقام."
              )}
            </p>
          </div>

          {/* Waslfy */}
          <article className="feature-card" data-reveal>
            <div className="feature-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/waslfy-demo.gif"
                alt="Waslfy demo — pasting a WhatsApp order and saving the extracted shipment"
                loading="lazy"
                width={880}
                height={550}
              />
            </div>
            <div className="feature-body">
              <div className="feature-tags">
                <span className="tag">Web App · PWA</span>
                <span className="tag">npm package</span>
              </div>
              <h3>وصلّي — Waslfy</h3>
              <p>
                {t(
                  "Paste a messy Egyptian WhatsApp order, get clean shipment data and a printable A6 receipt — runs 100% offline on the merchant's device.",
                  "الصق رسالة واتساب مصرية فوضوية، اطلع بيانات شحنة نضيفة وإيصال A6 جاهز للطباعة — شغال أوفلاين ١٠٠٪ على جهاز التاجر."
                )}
              </p>
              <ul className="metric-row">
                <li>
                  <strong>100%</strong>
                  <span>{t("corpus accuracy", "دقة الاستخراج")}</span>
                </li>
                <li>
                  <strong>0</strong>
                  <span>{t("network calls", "نداءات شبكة")}</span>
                </li>
                <li>
                  <strong>13 kB</strong>
                  <span>{t("parser core", "محرك الاستخراج")}</span>
                </li>
              </ul>
              <div className="link-row">
                <Link className="btn btn-primary btn-sm" href="/projects/waslfy/">
                  <span>{t("Project details", "تفاصيل المشروع")}</span>
                </Link>
                <a className="btn btn-ghost btn-sm" href="https://waslfy.pages.dev" target="_blank" rel="noopener">
                  <span>{t("Live app", "التطبيق")}</span>
                </a>
                <a className="btn btn-ghost btn-sm" href={`${SITE.github}/waslfy`} target="_blank" rel="noopener">
                  <span>{t("Source", "الكود")}</span>
                </a>
              </div>
            </div>
          </article>

          {/* TossInbox */}
          <article className="feature-card flip" data-reveal>
            <div className="feature-media media-panel">
              <MiniTerminal lines={tossTerminal} />
            </div>
            <div className="feature-body">
              <div className="feature-tags">
                <span className="tag">CLI</span>
                <span className="tag">MCP Server</span>
              </div>
              <h3>TossInbox</h3>
              <p>
                {t(
                  "Disposable email inboxes for humans and AI agents — spawn an inbox, catch the verification code, toss it. No sign-up, JSON on every command.",
                  "إيميلات مؤقتة للبشر والـ AI agents — اعمل صندوق، استنى كود التفعيل، ارميه. من غير تسجيل، وكل الأوامر بترجع JSON."
                )}
              </p>
              <ul className="metric-row">
                <li>
                  <strong>npm</strong>
                  <span>+ brew install</span>
                </li>
                <li>
                  <strong>MCP</strong>
                  <span>{t("AI agents ready", "جاهز للـ agents")}</span>
                </li>
                <li>
                  <strong>--json</strong>
                  <span>{t("scriptable I/O", "مدخل/مخرج برمجي")}</span>
                </li>
              </ul>
              <div className="link-row">
                <Link className="btn btn-primary btn-sm" href="/projects/tossinbox/">
                  <span>{t("Project details", "تفاصيل المشروع")}</span>
                </Link>
                <a className="btn btn-ghost btn-sm" href="https://tossinbox.pages.dev" target="_blank" rel="noopener">
                  <span>{t("Docs", "التوثيق")}</span>
                </a>
                <a className="btn btn-ghost btn-sm" href={`${SITE.github}/tossinbox`} target="_blank" rel="noopener">
                  <span>{t("Source", "الكود")}</span>
                </a>
              </div>
            </div>
          </article>

          {/* trigger-doctor */}
          <article className="feature-card" data-reveal>
            <div className="feature-media media-panel">
              <MiniTerminal lines={doctorTerminal} />
            </div>
            <div className="feature-body">
              <div className="feature-tags">
                <span className="tag">AI Tooling</span>
                <span className="tag">Testing</span>
              </div>
              <h3>trigger-doctor</h3>
              <p>
                {t(
                  "Behavioral testing for AI agent skill triggers — it tells you why your skill never fires (or fires too much), fixes the description, and keeps a regression suite.",
                  "اختبار سلوكي لـ triggers بتاعة مهارات الـ AI agents — بيقولك ليه مهارتك مش بتشتغل (أو بتشتغل زيادة)، ويصلّح الوصف، ويحفظ اختبارات انحدار."
                )}
              </p>
              <ul className="metric-row">
                <li>
                  <strong>79</strong>
                  <span>agents</span>
                </li>
                <li>
                  <strong>3/3</strong>
                  <span>{t("skills.sh audits", "تدقيقات skills.sh")}</span>
                </li>
                <li>
                  <strong>npx</strong>
                  <span>{t("zero install", "من غير تثبيت")}</span>
                </li>
              </ul>
              <div className="link-row">
                <Link className="btn btn-primary btn-sm" href="/projects/trigger-doctor/">
                  <span>{t("Project details", "تفاصيل المشروع")}</span>
                </Link>
                <a
                  className="btn btn-ghost btn-sm"
                  href="https://www.skills.sh/mohamed-khairy-5i/trigger-doctor/trigger-doctor"
                  target="_blank"
                  rel="noopener"
                >
                  skills.sh
                </a>
                <a className="btn btn-ghost btn-sm" href={`${SITE.github}/trigger-doctor`} target="_blank" rel="noopener">
                  <span>{t("Source", "الكود")}</span>
                </a>
              </div>
            </div>
          </article>

          {/* More builds */}
          <h3 className="more-title" data-reveal>
            {t("More builds", "مشاريع تانية")}
          </h3>
          <div className="grid-3">
            {builds.map((b) => (
              <a key={b.title} className="build-card" href={b.href} target="_blank" rel="noopener" data-reveal>
                <div className="bc-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.img} alt={b.title} loading="lazy" width={800} height={500} />
                </div>
                <div className="bc-body">
                  <h4>
                    {b.title} <span className="arrow">↗</span>
                  </h4>
                  <p>{t(b.p.en, b.p.ar)}</p>
                  <span className="mini-tag">{typeof b.tag === "string" ? b.tag : t(b.tag.en, b.tag.ar)}</span>
                </div>
              </a>
            ))}
            <div className="build-card soon" data-reveal>
              <div className="bc-img">{t("in the pipeline", "تحت التنفيذ")}</div>
              <div className="bc-body">
                <h4>قسطلي</h4>
                <p>
                  {t(
                    "Installments manager for small businesses — coming next.",
                    "نظام إدارة أقساط للشركات الصغيرة — الجاي بعد كده."
                  )}
                </p>
                <span className="mini-tag">{t("Coming soon", "قريبًا")}</span>
              </div>
            </div>
          </div>
          <p style={{ marginTop: 14, color: "var(--muted)", fontSize: ".92rem" }} data-reveal>
            {t(
              "I also have a design background — logos, posters and packaging. It lives on the ",
              "وعندي خلفية تصميم برضه — شعارات وبوسترات وتغليف. هتلاقيها في "
            )}
            <Link href="/projects/" style={{ color: "var(--accent)" }}>
              {t("projects page", "صفحة المشاريع")}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ===== STACK ===== */}
      <section id="stack" className="section section-alt">
        <div className="container">
          <div className="section-head" data-reveal>
            <h2>{t("Stack", "الأدوات")}</h2>
            <p>
              {t(
                "What I use day to day — boring, proven choices on purpose.",
                "اللي بستخدمه يوم بيوم — خيارات مملة ومجرّبة بالقصد."
              )}
            </p>
          </div>
          <div className="stack-grid">
            {stack.map((col, i) => (
              <div className="stack-col" key={i} data-reveal>
                {col.map((entry) => (
                  <div key={entry.h4.en}>
                    <h4 className={entry.mt ? "mt" : undefined}>{t(entry.h4.en, entry.h4.ar)}</h4>
                    <div className="pill-row">
                      {entry.pills.map((p) => (
                        <span key={p}>{p}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="section">
        <div className="container about-wrap">
          <div className="section-head" data-reveal>
            <h2>{t("About", "عني")}</h2>
          </div>
          <div className="about-grid solo">
            <div className="about-body">
              <p data-reveal>
                {t(
                  "I'm Mohamed — a frontend developer from Egypt. I care about one thing: the thing should actually work and actually ship. React and TypeScript by day; Arabic-first products after hours — Waslfy for COD merchants, TossInbox for developers and their agents, trigger-doctor for agent skills.",
                  "أنا محمد — مطور واجهات من مصر. مهتم بحاجة واحدة: إن الحاجة تشتغل بجد وتوصل للنور. في الشغل React و TypeScript، وفي الوقت الفاضي ببني منتجات عربية — وصلّي لتجار التحصيل عند الاستلام، و TossInbox للمطورين والـ agents بتوعهم، و trigger-doctor لمهارات الـ agents."
                )}
              </p>
              <p data-reveal>
                {t(
                  "Everything I build is open source, and most of it runs fully offline or on the edge. I use AI in my workflow and I'm upfront about it: the taste, the decisions and the shipping are mine.",
                  "كل اللي ببنيه مفتوح المصدر، وأغلابه شغال أوفلاين بالكامل أو على الطرف. باستخدم AI في شغلي وقايل ده بصراحة: الذوق والقرارات والنشر — دي كلها مني."
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="section section-alt">
        <div className="container contact-wrap">
          <div className="section-head" data-reveal>
            <h2>{t("Got something to build?", "عندك حاجة تتبني؟")}</h2>
            <p>
              {t(
                "Open for freelance projects and full-time roles. Send me a message — I reply fast.",
                "متاح لمشاريع فريلانس ووظايف بدوام كامل. ابعتلي — وبررد بسرعة."
              )}
            </p>
          </div>
          <div className="contact-row" data-reveal>
            <a className="btn btn-primary" href={`mailto:${SITE.email}`}>
              <MailIcon />
              <span>{SITE.email}</span>
            </a>
            <a className="btn btn-ghost" href={SITE.whatsapp} target="_blank" rel="noopener">
              <WhatsAppIcon />
              <span>WhatsApp</span>
            </a>
            <a className="btn btn-ghost" href={SITE.linkedin} target="_blank" rel="noopener">
              <LinkedInIcon />
              <span>LinkedIn</span>
            </a>
            <a className="btn btn-ghost" href={SITE.github} target="_blank" rel="noopener">
              <GitHubIcon />
              <span>GitHub</span>
            </a>
            <CopyEmailButton />
          </div>
          <p className="contact-note" dir="ltr" data-reveal>
            +20 106 048 7315 · Egypt
          </p>
        </div>
      </section>
    </>
  );
}
