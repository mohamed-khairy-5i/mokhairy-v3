"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import type { Cert } from "@/lib/types";

export default function CertPage({ cert, prev, next }: { cert: Cert; prev: Cert | null; next: Cert | null }) {
  const { t, lang } = useLang();
  const img = (lang === "ar" && cert.img_ar) || cert.img_en;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: cert.title.en,
    alternativeHeadline: cert.title.ar,
    credentialCategory: cert.category.en,
    recognizedBy: { "@type": "Organization", name: cert.issuer },
    datePublished: cert.date,
    inLanguage: ["en", "ar"],
    image: `https://mokhairy-v3.pages.dev${cert.img_en}`,
    url: `https://mokhairy-v3.pages.dev/certificates/${cert.slug}/`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="page-hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/certificates/">{t("Certificates", "الشهادات")}</Link>
            <span className="sep" aria-hidden="true">
              /
            </span>
            <span className="here">{t(cert.title.en, cert.title.ar)}</span>
          </nav>
          <p className="overline" data-reveal>
            {cert.issuer} · {cert.date}
          </p>
          <h1 className="page-title" data-reveal>
            {t(cert.title.en, cert.title.ar)}
          </h1>
          <p className="page-sub" data-reveal>
            {t(
              "Verified certificate — click the image to open the full-size original.",
              "شهادة موثقة — دوس على الصورة لفتح النسخة الأصلية بالحجم الكامل."
            )}
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container cert-body">
          <a className="cert-view" href={cert.href} target="_blank" rel="noopener" data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img} alt={`${cert.title.en} — ${cert.issuer}`} width={900} height={675} loading="lazy" />
            <span className="cert-view-hint">{t("Open original ↗", "افتح الأصلية ↗")}</span>
          </a>

          <aside className="cert-facts" data-reveal>
            <div>
              <small>{t("Issuer", "الجهة")}</small>
              <b>{cert.issuer}</b>
            </div>
            <div>
              <small>{t("Category", "التصنيف")}</small>
              <b>{t(cert.category.en, cert.category.ar)}</b>
            </div>
            <div>
              <small>{t("Date", "التاريخ")}</small>
              <b dir="ltr">{cert.date}</b>
            </div>
            <div>
              <small>{t("Group", "المجموعة")}</small>
              <b>{cert.group === "ai" ? "AI" : cert.group === "data" ? t("Data", "بيانات") : cert.group === "marketing" ? t("Marketing", "تسويق") : cert.group === "programming" ? t("Programming", "برمجة") : cert.group}</b>
            </div>
          </aside>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container proj-nav-row">
          {prev ? (
            <Link className="pn prev" href={`/certificates/${prev.slug}/`}>
              <small>{t("← Previous", "→ السابق")}</small>
              <b>{t(prev.title.en, prev.title.ar)}</b>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link className="pn next" href={`/certificates/${next.slug}/`}>
              <small>{t("Next →", "التالي ←")}</small>
              <b>{t(next.title.en, next.title.ar)}</b>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </section>
    </>
  );
}
