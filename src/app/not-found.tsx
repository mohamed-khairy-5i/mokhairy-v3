"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="page-hero" style={{ minHeight: "52vh", display: "grid", placeItems: "center" }}>
      <div className="container" style={{ textAlign: "center" }}>
        <p className="overline">404</p>
        <h1 className="page-title">{t("This page never shipped.", "الصفحة دي عمرها ما وصلت للنور.")}</h1>
        <p className="page-sub" style={{ marginInline: "auto" }}>
          {t("The link is broken — everything else works. Promise.", "اللينك بايظ — لكن كل حاجة تانية شغالة. وعد.")}
        </p>
        <p style={{ marginTop: 18 }}>
          <Link className="btn btn-primary" href="/">
            {t("Back home", "ارجع للبيت")}
          </Link>
        </p>
      </div>
    </section>
  );
}
