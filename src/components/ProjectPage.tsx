"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import type { Project } from "@/lib/types";

export default function ProjectPage({ project, prev, next }: { project: Project; prev: Project | null; next: Project | null }) {
  const { t } = useLang();

  return (
    <>
      {project.layout === "story" ? (
        /* ---------- flagship story layout ---------- */
        <>
          <section className="page-hero">
            <div className="container">
              <Link className="crumb" href="/projects/">
                <span className="arrow" aria-hidden="true">
                  ←
                </span>{" "}
                <span>{t("All projects", "كل المشاريع")}</span>
              </Link>
              <div className="proj-tags" data-reveal>
                {(project.tags || []).map((tag) => (
                  <span key={tag.en} className="tag">
                    {t(tag.en, tag.ar)}
                  </span>
                ))}
              </div>
              <h1 className="page-title" data-reveal>
                {project.title}
              </h1>
              <p className="lede" data-reveal>
                {t(project.sub.en, project.sub.ar)}
              </p>
              <div className="proj-cta" data-reveal>
                {project.ctas.map((c) =>
                  c.href.startsWith("/") ? (
                    <Link key={c.href} className="btn btn-primary" href={c.href}>
                      <span>{t(c.label.en, c.label.ar)}</span>
                    </Link>
                  ) : (
                    <a key={c.href} className={c.label.en.includes("GitHub") ? "btn btn-ghost" : "btn btn-primary"} href={c.href} target="_blank" rel="noopener">
                      <span>{t(c.label.en, c.label.ar)}</span>
                    </a>
                  )
                )}
              </div>
              {project.metrics && (
                <ul className="metric-row" style={{ maxWidth: 640 }} data-reveal>
                  {project.metrics.map((m) => (
                    <li key={m.v + m.label.en}>
                      <strong>{m.v}</strong>
                      <span>{t(m.label.en, m.label.ar)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="section" style={{ paddingTop: 0 }}>
            <div className="container">
              {project.sections?.map((sec) => (
                <div key={sec.h.en} className="proj-section" data-reveal>
                  <h3>{t(sec.h.en, sec.h.ar)}</h3>
                  {sec.blocks.map((b, i) => {
                    if (b.type === "p") return <p key={i}>{t(b.en, b.ar)}</p>;
                    if (b.type === "cols")
                      return (
                        <div key={i} className="proj-cols">
                          {b.cols.map((c, j) => (
                            <p key={j}>{t(c.en, c.ar)}</p>
                          ))}
                        </div>
                      );
                    if (b.type === "list")
                      return (
                        <ul key={i} className="feature-list">
                          {b.items.map((it, j) => (
                            <li key={j}>
                              <span className="ok">✓</span>
                              <span>{t(it.en, it.ar)}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    if (b.type === "pills")
                      return (
                        <div key={i} className="pill-row">
                          {b.items.map((it) => (
                            <span key={it}>{it}</span>
                          ))}
                        </div>
                      );
                    if (b.type === "term")
                      return (
                        <div key={i} className="mini-terminal standalone" dir="ltr">
                          {b.lines.map((l, j) => (
                            <p key={j} className={j === 0 ? "mt-title" : l.startsWith("$") ? "mt-cmd" : "mt-out"}>
                              {l}
                            </p>
                          ))}
                        </div>
                      );
                    return null;
                  })}
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* ---------- standard layout ---------- */
        <>
          <section className="page-hero">
            <div className="container">
              <nav className="crumbs" aria-label="Breadcrumb">
                <Link href="/work/">{t("Work", "الأعمال")}</Link>
                <span className="sep" aria-hidden="true">
                  /
                </span>
                <span className="here">{project.title}</span>
              </nav>
              <p className="overline" data-reveal>
                {t(project.overline?.en || "", project.overline?.ar || "")}
              </p>
              <h1 className="page-title" data-reveal>
                {project.title}
              </h1>
              <p className="page-sub" data-reveal>
                {t(project.sub.en, project.sub.ar)}
              </p>
            </div>
          </section>

          <section className="section" style={{ paddingTop: "clamp(16px,2.5vh,26px)" }}>
            <div className="container">
              {project.img && (
                <div className="proj-media" data-reveal>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.img} alt={project.img_alt || project.title} width={800} height={500} loading="lazy" />
                </div>
              )}
              {project.ctas.length > 0 && (
                <div className="link-row" data-reveal>
                  {project.ctas.map((c) =>
                    c.href.startsWith("/") ? (
                      <Link key={c.href} className="btn btn-primary btn-sm" href={c.href}>
                        <span>{t(c.label.en, c.label.ar)}</span>
                      </Link>
                    ) : (
                      <a key={c.href} className="btn btn-ghost btn-sm" href={c.href} target="_blank" rel="noopener">
                        <span>{t(c.label.en, c.label.ar)}</span>
                      </a>
                    )
                  )}
                </div>
              )}
              {project.stack && project.stack.length > 0 && (
                <div className="proj-stack" data-reveal>
                  <span className="label">{t("Stack", "الأدوات")}</span>
                  {project.stack.map((s) => (
                    <span key={s} className="pill">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section section-alt">
            <div className="container">
              <div className="section-head" data-reveal>
                <h2>{t("The story", "القصة")}</h2>
                <p>{t("The problem, how I built it, and what came out of it.", "المشكلة، وبنيتها إزاي، واللي طلع منها.")}</p>
              </div>
              <div className="story-grid">
                {project.story?.map((sb) => (
                  <article key={sb.n} className="story-block" data-reveal>
                    <h3>
                      <b>{sb.n}</b>
                      <span>{t(sb.h.en, sb.h.ar)}</span>
                    </h3>
                    <p>{t(sb.p.en, sb.p.ar)}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ---------- prev / next ---------- */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container proj-nav-row">
          {prev ? (
            <Link className="pn prev" href={`/projects/${prev.slug}/`}>
              <small>{t("← Previous", "→ السابق")}</small>
              <b>{prev.title}</b>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pn next" href={`/projects/${next.slug}/`}>
              <small>{t("Next →", "التالي ←")}</small>
              <b>{next.title}</b>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  );
}
