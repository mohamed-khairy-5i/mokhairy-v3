"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import type { Project, WorkCat } from "@/lib/types";

/* Topic split — university ("uni") stays hidden until it has items. */
const CAT_ORDER: WorkCat[] = ["personal", "open-source", "clients", "graphic", "uni"];

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { t } = useLang();
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      all: projects.length,
      personal: 0,
      "open-source": 0,
      clients: 0,
      graphic: 0,
      uni: 0,
    };
    for (const p of projects) if (p.cat) c[p.cat] += 1;
    return c;
  }, [projects]);

  const chips = [
    { id: "all", label: t("All", "الكل"), n: counts.all },
    ...CAT_ORDER.filter((id) => counts[id] > 0).map((id) => ({
      id,
      label: t(CAT_LABELS[id].en, CAT_LABELS[id].ar),
      n: counts[id],
    })),
  ];

  const shown = filter === "all" ? projects : projects.filter((p) => p.cat === filter);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="overline" data-reveal>
            {t(`PROJECTS · ${projects.length}`, `المشاريع · ${projects.length}`)}
          </p>
          <h1 className="page-title" data-reveal>
            {t("Every project has a story page.", "كل مشروع ليه صفحة قصة.")}
          </h1>
          <p className="page-sub" data-reveal>
            {t(
              "Split by topic: my own products, open-source tools, client work, graphic design and university work — open any card for the full story: problem, solution, receipts.",
              "مقسمين حسب الموضوع: منتجاتي، أدوات مفتوحة المصدر، شغل عملاء، تصميم جرافيك، ومشاريع الكلية — افتح أي كارت تقرأ القصة كاملة: المشكلة، الحل، والإيصالات."
            )}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cert-toolbar" data-reveal role="group" aria-label="Filter projects by topic">
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
              {shown.length} {t("projects", "مشروع")}
            </output>
          </div>

          <div className="grid-3">
            {shown.map((p) => (
              <Link key={p.slug} className="build-card" href={`/projects/${p.slug}/`} data-reveal>
                {p.img ? (
                  <div className="bc-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.img_alt || p.title} loading="lazy" width={800} height={500} />
                  </div>
                ) : (
                  <div className="bc-img bc-img-txt">{p.slug}</div>
                )}
                <div className="bc-body">
                  <h4>
                    {p.title} <span className="arrow">→</span>
                  </h4>
                  <p>{t(p.sub.en, p.sub.ar)}</p>
                  <span className="mini-tag">
                    {p.layout === "story"
                      ? t("full story", "قصة كاملة")
                      : p.overline
                        ? t(p.overline.en, p.overline.ar).split("·")[0].trim()
                        : "project"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const CAT_LABELS: Record<WorkCat, { en: string; ar: string }> = {
  personal: { en: "Personal products", ar: "منتجاتي" },
  "open-source": { en: "Open source", ar: "مفتوح المصدر" },
  clients: { en: "Client work", ar: "شغل عملاء" },
  graphic: { en: "Graphic design", ar: "تصميم جرافيك" },
  uni: { en: "University", ar: "مشاريع الكلية" },
};
