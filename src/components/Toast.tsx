"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/lang";
import { CopyIcon, CheckIcon } from "@/components/Icons";

export function CopyEmailButton() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = SITE.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" className="btn btn-ghost copy-email" onClick={copy}>
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? t("Copied!", "اتنسخ!") : SITE.email}</span>
    </button>
  );
}
