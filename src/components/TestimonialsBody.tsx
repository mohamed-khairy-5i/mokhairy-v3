"use client";

import { useLang } from "@/lib/lang";
import type { TestimonialsData } from "@/lib/types";

export default function TestimonialsBody({ data }: { data: TestimonialsData }) {
  const { t } = useLang();
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
          <div className="quotes">
            {data.quotes.map((q, i) => (
              <figure key={i} className="quote" data-reveal>
                <blockquote>{t(q.text.en, q.text.ar)}</blockquote>
                <figcaption>
                  <b>{t(q.who.en, q.who.ar)}</b>
                  {q.ctx.en && <span>{t(q.ctx.en, q.ctx.ar)}</span>}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="story-grid" style={{ marginTop: 26 }}>
            {data.blocks.map((b) => (
              <article key={b.h.en} className="story-block" data-reveal>
                <h3>
                  <span>{t(b.h.en, b.h.ar)}</span>
                </h3>
                <p>{t(b.p.en, b.p.ar)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
