"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import MiniTerminal from "@/components/MiniTerminal";
import { ArrowDownIcon } from "@/components/Icons";
import type { WorkData } from "@/lib/types";

export default function WorkGrid({ data }: { data: WorkData }) {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const product = data.products.length;
    const design = data.design.length;
    return { all: product + design, product, design };
  }, [data]);

  const chips = [
    { id: "all", label: t("All", "الكل"), n: counts.all },
    { id: "product", label: t("Web products", "منتجات ويب"), n: counts.product },
    { id: "design", label: t("Design & identity", "تصميم وهوية"), n: counts.design },
  ];

  const showProducts = filter === "all" || filter === "product";
  const showDesign = filter === "all" || filter === "design";

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
          <div className="cert-toolbar" data-reveal role="group" aria-label="Filter work">
            <div className="cert-filters">
              {chips.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`cert-chip ${filter === c.id ? "is-active" : ""}`}
                  aria-pressed={filter === c.id}
                  onClick={() => setFilter(c.id)}
                >
                  <span>
                    {c.label} · {c.n}
                  </span>
                </button>
              ))}
            </div>
            <output className="work-count" aria-live="polite">
              {filter === "design" ? counts.design : filter === "product" ? counts.product : counts.all}{" "}
              {t("projects", "مشروع")}
            </output>
          </div>

          {showProducts && (
            <div className="work-list">
              {data.products.map((p, i) => (
                <article key={p.title} className="feature-card" data-reveal>
                  <div className={`feature-media ${p.terminal ? "media-panel" : ""}`}>
                    {p.terminal ? (
                      <MiniTerminal
                        lines={p.terminal.map((text, j) => ({
                          cls: (j === 0 ? "title" : text.startsWith("$") ? "cmd" : text.startsWith("!") ? "warn" : "out") as
                            | "title"
                            | "cmd"
                            | "out"
                            | "warn",
                          text,
                        }))}
                      />
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={p.img} alt={p.alt || p.title} loading="lazy" width={880} height={550} />
                    )}
                  </div>
                  <div className="feature-body">
                    {p.type.en && <div className="feature-tags"><span className="tag">{t(p.type.en, p.type.ar)}</span></div>}
                    <h3>{p.title}</h3>
                    {p.p.en && <p>{t(p.p.en, p.p.ar)}</p>}
                    {(p.links.length > 0 || p.href) && (
                      <div className="link-row">
                        {p.links.map((l) =>
                          l.href.startsWith("/") ? (
                            <Link key={l.href} className="btn btn-primary btn-sm" href={l.href}>
                              <span>{t(l.label.en, l.label.ar)}</span>
                            </Link>
                          ) : (
                            <a key={l.href} className="btn btn-ghost btn-sm" href={l.href} target="_blank" rel="noopener">
                              <span>{t(l.label.en, l.label.ar)}</span>
                            </a>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {showDesign && (
            <>
              <h3 className="more-title" data-reveal>
                {t("Design & identity", "تصميم وهوية")}
              </h3>
              <div className="design-grid">
                {data.design.map((d) => (
                  <figure key={d.img} className="design-card" data-reveal>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.img} alt={d.alt} loading="lazy" width={600} height={450} />
                    <figcaption className="design-meta">{d.meta.join(" · ")}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}

          <p style={{ marginTop: 22 }} data-reveal>
            <Link className="btn btn-ghost" href="/certificates/">
              <span>{t("28 verified certificates", "٢٨ شهادة موثقة")}</span>
              <ArrowDownIcon />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
