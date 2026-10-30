# Mohamed Khairy — Portfolio v4

Personal portfolio of **Mohamed Khairy** — freelance frontend developer from Egypt.
Arabic-first products & developer tools — shipped, not just designed.

- **Next.js 16** (App Router, static export) + TypeScript + GSAP
- **59 pages**: home, /work/, 21 project pages, 28 certificate pages, about, testimonials, contact
- **EN / AR** bilingual with full RTL, dark & light themes
- Every project and every certificate has its own landing page

## Develop locally

```bash
npm install        # or: bun install
npm run dev        # dev server on http://localhost:3100
```

## Build

```bash
npm run build      # static export → ./out
```

## Deploy — Cloudflare Pages (auto-updates on every push)

1. Push this repo to GitHub.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick this repo.
3. Build settings:
   - **Framework preset:** `None`
   - **Build command:** `npx next build`
   - **Build output directory:** `out`
4. Environment variable:
   - **`NODE_VERSION`** = `22`
5. **Save and Deploy**.

From now on: every `git push` to `main` → Cloudflare rebuilds and the live site updates automatically in ~1 minute. No manual zip uploads.

---

## النشر على Cloudflare Pages (تحديث تلقائي)

1. ارفع الريبو على GitHub.
2. من Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** واختار الريبو.
3. إعدادات البناء:
   - Framework preset: `None`
   - Build command: `npx next build`
   - Build output directory: `out`
4. متغير بيئة: `NODE_VERSION` = `22`
5. اضغط **Save and Deploy** — وبعدها أي تعديل يتعمل push على `main` بينزل على الموقع تلقائيًا.
