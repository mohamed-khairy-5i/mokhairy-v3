"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";

export type Lang = "en" | "ar";

type LangCtx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (en: string, ar: string) => string;
  setPageTitle: (t: { en: string; ar: string }) => void;
};

const Ctx = createContext<LangCtx>({
  lang: "en",
  dir: "ltr",
  setLang: () => {},
  t: (en) => en,
  setPageTitle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (localStorage.getItem("mk-lang") as Lang) || null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    const dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("mk-lang", lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const t = useCallback((en: string, ar: string) => (lang === "ar" ? ar : en), [lang]);
  const setPageTitle = useCallback(
    (tt: { en: string; ar: string }) => {
      document.title = lang === "ar" ? tt.ar : tt.en;
    },
    [lang]
  );

  return <Ctx.Provider value={{ lang, dir: lang === "ar" ? "rtl" : "ltr", setLang, t, setPageTitle }}>{children}</Ctx.Provider>;
}

export function useLang() {
  return useContext(Ctx);
}

/* Theme — separate tiny hook, same localStorage pattern */
export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("mk-theme");
    if (saved === "light" || saved === "dark") setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("mk-theme", theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme((p) => (p === "dark" ? "light" : "dark")), []);
  return { theme, toggle };
}
