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

function GlobeIcon() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function SiteNav() {
  const { lang, setLang, t } = useLang();
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-inner">
        <Link className="brand" href="/" aria-label="Mohamed Khairy — home">
          <span className="brand-mark" aria-hidden="true">
            MK
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
          <button
            type="button"
            className="chip-btn lang-chip"
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label="Switch language"
          >
            <GlobeIcon />
            <span>{lang === "en" ? "عربي" : "EN"}</span>
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
