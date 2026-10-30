"use client";

import Link from "next/link";
import { useLang } from "@/lib/lang";
import { SITE } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/Icons";

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span>
            Mohamed Khairy — <b>{t("shipped, not just designed", "بتوصل للنور، مش تصميم بس")}</b>
          </span>
        </p>
        <div className="footer-links">
          <Link href="/projects/">{t("Projects", "المشاريع")}</Link>
          <Link href="/certificates/">{t("Certificates", "الشهادات")}</Link>
          <a href={SITE.github} target="_blank" rel="noopener" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </div>
        <p className="footer-note">© {new Date().getFullYear()} {t("Built by hand — and shipped.", "مبني بإيد — ووصل للنور.")}</p>
      </div>
    </footer>
  );
}
