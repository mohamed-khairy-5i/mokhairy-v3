# MoKhairy 3.1 — Portfolio (multi-page)

Personal portfolio of **Mohamed Khairy** — freelance frontend developer from Cairo, building Arabic-first products and developer tools.

**5 real pages, every section in its place:**

| Page | What's inside |
|---|---|
| `index.html` | Hero, featured builds (Waslfy · TossInbox · trigger-doctor), stats, stack, certificates preview, about brief, contact CTA |
| `work.html` | All **20 projects** with filters — Web products (11) / Design & identity (9) — live links on every card |
| `certificates.html` | Full filterable archive of **28 verified certificates** (AI · Data · Programming · Marketing) + "completed recently" section |
| `about.html` | Portrait, story, stats, capabilities, **how I work** (4 steps), stack, client voices |
| `contact.html` | WhatsApp / email / phone, copy-email, and a **project brief composer** (mailto + WhatsApp prefill, nothing stored) |

## Featured projects

| Project | What it does | Links |
|---|---|---|
| **وصلّي — Waslfy** | Turns messy Egyptian WhatsApp COD orders into printable A6 receipts with Code128 barcode. 100% offline. | [Live](https://waslfy.pages.dev) · [npm](https://www.npmjs.com/package/waslfy-parser) |
| **TossInbox** | Disposable email inboxes for humans and AI agents — spawn, wait for the OTP, toss. No sign-up. | [Docs](https://tossinbox.pages.dev) · [npm](https://www.npmjs.com/package/tossinbox) |
| **trigger-doctor** | Behavioral testing for AI agent skill triggers — diagnose, prescribe, regression-test. 79 agents supported. | [skills.sh](https://www.skills.sh/mohamed-khairy-5i/trigger-doctor/trigger-doctor) |

Plus **client & product builds** (Dhikra, Milano, Yasmona, Water Jeddah, Hesasy, CodePixel, Nexluna, CalcuZakat), a **design & identity** gallery (Burger Taste, Behind the Screen, TrimBG, Dealario, Abu Al-Qasim, Borcelle Printing…), **capabilities & client quotes**, and a filterable archive of **28 verified certifications** (Cisco, Microsoft Egypt, LinkedIn Learning, Dubai AI Centre, Edraak, HP LIFE…).

## Stack

Vanilla **HTML / CSS / JavaScript** — zero build step, zero dependencies, five static pages.

- Bilingual **EN / AR** with full RTL layout (no framework, `data-en`/`data-ar` swap + `dir` toggle), language persists across pages
- Dark emerald design system with light theme fallback
- Client-side filters on work & certificates, IntersectionObserver reveal, copy-to-clipboard with toast
- Accessible: skip-link, focus-visible, aria states, `prefers-reduced-motion` respected
- SEO: per-page canonical + Open Graph + Twitter card, JSON-LD Person schema, robots.txt, sitemap.xml

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
