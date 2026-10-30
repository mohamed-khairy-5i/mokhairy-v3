"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/lib/lang";
import { SITE } from "@/lib/site";
import type { ContactData } from "@/lib/types";
import { MailIcon, WhatsAppIcon, LinkedInIcon, GitHubIcon } from "@/components/Icons";
import { CopyEmailButton } from "@/components/Toast";

function iconFor(href: string) {
  if (href.startsWith("mailto:")) return <MailIcon />;
  if (href.includes("wa.me")) return <WhatsAppIcon />;
  if (href.includes("linkedin")) return <LinkedInIcon />;
  if (href.includes("github")) return <GitHubIcon />;
  return null;
}

export default function ContactBody({ data }: { data: ContactData }) {
  const { t, lang } = useLang();
  const [need, setNeed] = useState("");
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");

  const brief = useMemo(
    () =>
      `${t("Hi Mohamed — I need", "أهلاً محمد — محتاج")}: ${need || t("(not picked)", "(لسه مختارتش)")}\n${t(
        "Timeline",
        "الجدول"
      )}: ${timeline || t("(not picked)", "(لسه مختارتش)")}\n${t("Details", "التفاصيل")}: ${notes || "—"}`,
    [need, timeline, notes, t]
  );

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(t("Project brief — from your portfolio", "بريف مشروع — من البورتفوليو"))}&body=${encodeURIComponent(brief)}`;
  const wa = `${SITE.whatsapp}?text=${encodeURIComponent(brief)}`;

  const selects = data.fields.filter((f) => f.type === "select");
  const textarea = data.fields.find((f) => f.type === "textarea");

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
          <form className="brief-form" data-reveal noValidate onSubmit={(e) => e.preventDefault()}>
            {selects.map((f) => (
              <label key={f.name} className="brief-field">
                <span>{t(f.label.en, f.label.ar)}</span>
                <select
                  value={f.name === (selects[0]?.name ?? "") ? need : timeline}
                  onChange={(e) => (f.name === (selects[0]?.name ?? "") ? setNeed(e.target.value) : setTimeline(e.target.value))}
                >
                  <option value="">{t("Choose…", "اختار…")}</option>
                  {f.options.map((o) => (
                    <option key={o.en} value={o.en}>
                      {t(o.en, o.ar)}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {textarea && (
              <label className="brief-field brief-wide">
                <span>{t(textarea.label.en, textarea.label.ar)}</span>
                <textarea
                  rows={5}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={lang === "ar" ? textarea.placeholder_ar : textarea.placeholder_en}
                />
              </label>
            )}
            <div className="brief-actions">
              <a className="btn btn-primary" href={mailto}>
                <MailIcon />
                <span>{t(data.buttons[0]?.label.en || "Open email draft", data.buttons[0]?.label.ar || "افتح إيميل")}</span>
              </a>
              <a className="btn btn-ghost" href={wa} target="_blank" rel="noopener">
                <WhatsAppIcon />
                <span>{t(data.buttons[1]?.label.en || "Continue on WhatsApp", data.buttons[1]?.label.ar || "كمّل على واتساب")}</span>
              </a>
            </div>
            <p className="brief-hint">
              {t(
                "Your brief is pre-filled into the message — nothing is stored or sent from this site.",
                "البريف بيتكتب جوه الرسالة تلقائيًا — الموقع ده ما بيخزن ولا يبعت أي حاجة من عنده."
              )}
            </p>
          </form>

          <div className="contact-row" data-reveal>
            {data.links.map((l) => (
              <a key={l.href} className="btn btn-ghost" href={l.href} target="_blank" rel="noopener">
                {iconFor(l.href)}
                <span>{t(l.label.en, l.label.ar)}</span>
              </a>
            ))}
            <CopyEmailButton />
          </div>
          {data.note && (
            <p className="contact-note" dir="ltr" data-reveal>
              {data.note}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
