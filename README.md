# MoKhairy 3.0 — Portfolio

Personal portfolio of **Mohamed Khairy** — freelance frontend developer from Cairo, building Arabic-first products and developer tools.

## Featured projects

| Project | What it does | Links |
|---|---|---|
| **وصلّي — Waslfy** | Turns messy Egyptian WhatsApp COD orders into printable A6 receipts with Code128 barcode. 100% offline. | [Live](https://waslfy.pages.dev) · [npm](https://www.npmjs.com/package/waslfy-parser) |
| **TossInbox** | Disposable email inboxes for humans and AI agents — spawn, wait for the OTP, toss. No sign-up. | [Docs](https://tossinbox.pages.dev) · [npm](https://www.npmjs.com/package/tossinbox) |
| **trigger-doctor** | Behavioral testing for AI agent skill triggers — diagnose, prescribe, regression-test. 79 agents supported. | [skills.sh](https://www.skills.sh/mohamed-khairy-5i/trigger-doctor/trigger-doctor) |

Plus **client & product builds** (Dhikra, Milano, Yasmona, Water Jeddah, Hesasy), a **design & identity** gallery, and a filterable archive of **28 verified certifications** (Cisco, Microsoft Egypt, LinkedIn Learning, Dubai AI Centre, Edraak, HP LIFE…).

## Stack

Vanilla **HTML / CSS / JavaScript** — zero build step, zero dependencies, one page.

- Bilingual **EN / AR** with full RTL layout (no framework, `data-en`/`data-ar` swap + `dir` toggle)
- Dark emerald design system with light theme fallback
- IntersectionObserver reveal motion, scrollspy nav, copy-to-clipboard with toast
- Accessible: skip-link, focus-visible, aria states, `prefers-reduced-motion` respected
- SEO: canonical, Open Graph image, Twitter card, JSON-LD Person schema

## Run locally

No install, no build:

```bash
python3 -m http.server 3000
# open http://localhost:3000
```

## Deploy

Any static host works. On Cloudflare Pages: connect the repo, framework preset = **None**, build command = *(empty)*, output dir = `/`.

---

© 2026 Mohamed Khairy — built by hand, no template.
