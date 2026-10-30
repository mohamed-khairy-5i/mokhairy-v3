"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import type { Project } from "@/lib/types";

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { t } = useLang();
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
              "Web products, Arabic apps, CLI tools, brand identities and design work — open any card for the full story: problem, solution, receipts.",
              "منتجات ويب وتطبيقات عربية وأدوات CLI وهوية بصرية وشغل تصميم — افتح أي كارت تقرأ القصة كاملة: المشكلة، الحل، والإيصالات."
            )}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid-3">
            {projects.map((p) => (
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
