"use client";

import { useLang } from "@/lib/lang";
import type { AboutData } from "@/lib/types";

export default function AboutPageBody({ data }: { data: AboutData }) {
  const { t } = useLang();
  const intro = data.paras.filter((p) => p.sec !== "");
  const aiNote = data.paras.find((p) => p.en.toLowerCase().includes("ai"));

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="overline" data-reveal>
            {t(data.page.overline.en, data.page.overline.ar)}
          </p>
          <h1 className="page-title" data-reveal>
            {t(data.page.title.en, data.page.title.ar)}
          </h1>
          <p className="page-sub" data-reveal>
            {t(data.page.sub.en, data.page.sub.ar)}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="about-grid">
            <div className="portrait-band" data-reveal>
              <div className="portrait-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/portrait.webp" alt="Mohamed Khairy" width={896} height={1195} loading="lazy" />
                <span className="portrait-tag" dir="ltr">
                  {t("Mohamed — probably debugging something right now", "محمد — غالبًا بيصلّح باج في اللحظة دي")}
                </span>
              </div>
              <div className="portrait-copy">
                {intro.slice(0, 3).map((p, i) => (
                  <p key={i}>{t(p.en, p.ar)}</p>
                ))}
              </div>
            </div>

            <div className="about-stats">
              {data.stats.map((s) => (
                <div key={s.v} className="stat" data-reveal>
                  <b>{s.v}</b>
                  <span>{t(s.label.en, s.label.ar)}</span>
                </div>
              ))}
            </div>

            <div className="cap-grid">
              {data.caps.map((c) => (
                <div key={c.h.en} className="cap" data-reveal>
                  <h3>{t(c.h.en, c.h.ar)}</h3>
                  <p>{t(c.p.en, c.p.ar)}</p>
                </div>
              ))}
            </div>

            {aiNote && (
              <div className="quote" data-reveal>
                <blockquote>{t(aiNote.en, aiNote.ar)}</blockquote>
              </div>
            )}

            <div className="stack-grid" style={{ marginTop: 8 }}>
              {data.stack.map((col) => (
                <div className="stack-col" key={col.h.en} data-reveal>
                  <h4>{t(col.h.en, col.h.ar)}</h4>
                  <div className="pill-row">
                    {col.pills.map((p) => (
                      <span key={p}>{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
