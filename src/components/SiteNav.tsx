"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang, useTheme } from "@/lib/lang";
import { SunIcon, MoonIcon, MenuIcon, CloseIcon } from "@/components/Icons";

const links = [
  { href: "/", en: "Home", ar: "الرئيسية" },
  { href: "/work/", en: "Work", ar: "الأعمال" },
  { href: "/projects/", en: "Projects", ar: "المشاريع" },
  { href: "/certificates/", en: "Certificates", ar: "الشهادات" },
  { href: "/about/", en: "About", ar: "عني" },
  { href: "/contact/", en: "Contact", ar: "تواصل" },
];

export default function SiteNav() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="Mohamed Khairy — home">
          <span className="brand-mark" aria-hidden="true">
            M
          </span>
          <span className="brand-name">Mo Khairy</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "here" : undefined}>
              {t(l.en, l.ar)}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button type="button" className="chip-btn" onClick={() => setLang(lang === "en" ? "ar" : "en")} aria-label="Switch language">
            <span>{lang === "en" ? "عربية" : "English"}</span>
          </button>
          <button type="button" className="chip-btn icon-btn" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            type="button"
            className="chip-btn icon-btn nav-burger"
            onClick={() => setOpen((p) => !p)}
            aria-expanded={open}
            aria-controls="mobileMenu"
            aria-label="Menu"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mobile-menu" id="mobileMenu" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? "here" : undefined}>
              {t(l.en, l.ar)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
