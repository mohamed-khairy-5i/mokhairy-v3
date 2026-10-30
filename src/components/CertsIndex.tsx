"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/lib/lang";
import type { CertsData } from "@/lib/types";

export default function CertsIndex({ data }: { data: CertsData }) {
  const { t, lang } = useLang();
  const [group, setGroup] = useState("all");

  const groups = data.groups.some((g) => g.id === "all")
    ? data.groups
    : [{ id: "all", label: { en: "All", ar: "الكل" } }, ...data.groups];
  const list = group === "all" ? data.certs : data.certs.filter((c) => c.group === group);

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
          <div className="cert-toolbar" data-reveal role="group" aria-label="Filter certificates">
            <div className="cert-filters">
              {groups.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  className={`cert-chip ${group === g.id ? "is-active" : ""}`}
                  aria-pressed={group === g.id}
                  onClick={() => setGroup(g.id)}
                >
                  <span>{t(g.label.en, g.label.ar)}</span>
                </button>
              ))}
            </div>
            <output className="work-count" aria-live="polite">
              {list.length} {t("certificates", "شهادة")}
            </output>
          </div>

          <div className="cert-grid">
            {list.map((c) => (
              <Link key={c.slug} className="cert-card" href={`/certificates/${c.slug}/`} data-reveal>
                <div className="cert-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(lang === "ar" && c.img_ar) || c.img_en}
                    alt={c.title.en}
                    loading="lazy"
                    width={640}
                    height={480}
                  />
                </div>
                <div className="cert-meta">
                  <span className="cert-issuer">{c.issuer}</span>
                  <h3>{t(c.title.en, c.title.ar)}</h3>
                  <div className="cert-foot">
                    <b>{t(c.category.en, c.category.ar)}</b>
                    <small>{c.date}</small>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
