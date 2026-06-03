# longlostforgotten.com

Personal blog. No fixed subject. Built with Astro and TinaCMS, deployed on Cloudflare Pages.

---

## Stack

- **Framework**: Astro (hybrid output via `@astrojs/cloudflare`)
- **CMS**: TinaCMS (Git-backed, Tina Cloud for production auth)
- **CSS**: Scoped component CSS + CSS custom properties, no Tailwind
- **Fonts**: [fonts.bunny.net](https://fonts.bunny.net) — Barlow Condensed, Josefin Sans, Share Tech Mono
- **Deploy**: Cloudflare Pages + Wrangler

---

## Requirements

Node.js `>=24.0.0` (LTS). Run `nvm use` in the project root to switch automatically via `.nvmrc`.

---

## Getting Started

```bash
npm install
npm run dev        # Astro dev server → http://localhost:4321
npm run cms        # TinaCMS + Astro dev together → CMS at http://localhost:4321/admin
npm run build      # tinacms build && astro build → /dist
npm run preview    # build + wrangler local preview
npm run deploy     # build + wrangler deploy to Cloudflare
```

---

## Project Structure

```
longlost-v3/
├── public/
│   ├── favicon.svg
│   └── images/              # hero image, author photo, post images
├── src/
│   ├── components/
│   │   ├── AtmosphericChrome.astro  # noise, deco SVG, signal bar, corner marks, grunge filter
│   │   ├── Nav.astro                # sticky nav + hamburger menu (mobile)
│   │   ├── Footer.astro
│   │   └── DiamondDivider.astro
│   ├── layouts/
│   │   └── BaseLayout.astro         # html shell, fonts, AtmosphericChrome, Nav, Footer
│   ├── pages/
│   │   ├── index.astro              # hero + feed
│   │   ├── archive.astro            # all posts grouped by year
│   │   ├── about.astro              # populated from src/data/author.json
│   │   └── posts/
│   │       └── [slug].astro         # single post with prev/next nav
│   ├── content/
│   │   ├── config.ts                # Zod schema for posts collection
│   │   └── posts/                   # Markdown post files (TinaCMS managed)
│   ├── data/
│   │   └── author.json              # author profile (TinaCMS managed)
│   └── styles/
│       └── global.css               # CSS tokens, reset, body, keyframe animations
├── tina/
│   └── config.ts                    # TinaCMS schema (Author + Post collections)
├── .env.example
├── .nvmrc
├── astro.config.mjs
└── package.json
```

---

## Content

### Posts

Posts live in `src/content/posts/` as Markdown files managed via TinaCMS.

#### Frontmatter schema

```yaml
---
title: "Post Title Here"
date: 2026-06-01
tag: essay           # essay | take | note | review | fragment
readTime: 8 min read
excerpt: "Shown in the feed, archive, and post header."
image: /images/post-image.jpg   # optional — displayed inside the post only, not on the hero
featured: true                   # optional — pins to homepage hero
draft: true                      # optional — hides from all public pages and URLs
---
```

- The homepage hero uses the post marked `featured: true`, falling back to the most recent published post.
- Posts with `draft: true` are excluded from the feed, archive, and have no generated URL.
- Post images only appear inside the post itself — the homepage hero always uses its own fixed background image.

### Author

Author data lives in `src/data/author.json`, editable via the **Author** global in TinaCMS:

```json
{
  "name": "Your Name",
  "handle": "yourhandle",
  "photo": { "src": "/images/photo.jpg", "alt": "Alt text for the photo" },
  "bio": ["Paragraph one.", "Paragraph two."],
  "links": [
    { "label": "yourhandle on bandcamp", "url": "https://..." }
  ]
}
```

---

## Design System

See `mockup/BRIEF.md` for the full design reference — color tokens, typography, layout specs, and animation definitions.

### CSS tokens

```css
--ink: #251b1e;
--ink-dark: #1a1115;
--pink: #fb66a4;
--teal: #4a8fa0;
--sand: #c8c88d;
--headline: #e8f4f7;
--text-body: rgba(200, 200, 141, 0.75);
--text-muted: rgba(200, 200, 141, 0.30);
--line: rgba(200, 200, 141, 0.14);
```

Fonts: `"Barlow Condensed"` (headlines) · `"Josefin Sans"` (UI + body) · `"Share Tech Mono"` (metadata)

Minimum font size: `0.625rem`.

---

## Deployment

Deploys to Cloudflare Pages via GitHub Actions. Cloudflare's built-in CI has a memory cap that the TinaCMS build exceeds, so the full build runs on GitHub's runners (7GB RAM) and the output is pushed to Cloudflare Pages with Wrangler.

The workflow lives at `.github/workflows/deploy.yml` and triggers on every push to `main`.

### GitHub repository secrets

Add these in GitHub → Settings → Secrets and variables → Actions:

| Secret | Description |
|---|---|
| `TINA_CLIENT_ID` | Tina Cloud project client ID |
| `TINA_TOKEN` | Tina Cloud read/write token |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API token with Pages write access |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID |

### Local environment variables

Set in `.env` (see `.env.example`):

| Variable | Description |
|---|---|
| `TINA_CLIENT_ID` | Tina Cloud project client ID |
| `TINA_TOKEN` | Tina Cloud read/write token |
| `GITHUB_BRANCH` | Branch TinaCMS reads/writes (e.g. `main`) |
| `TZ` | Build timezone — `America/New_York` so dates render correctly |

### Disabling Cloudflare's auto-build

Since GitHub Actions now handles the deploy, turn off Cloudflare's built-in CI to avoid double-builds: Cloudflare Pages → your project → Settings → Builds & deployments → set **Branch deployments** to off (or disconnect the GitHub integration).

---

## TinaCMS

- **Local**: `npm run cms` starts Tina + Astro together. Admin UI at `http://localhost:4321/admin`.
- **Production**: requires a [Tina Cloud](https://app.tina.io) project connected to this repo. Once env vars are set in Cloudflare and a fresh deploy runs, the admin is live at `/admin`.
- **Schema**: `tina/config.ts` defines two collections:
  - **Author** — global singleton, writes to `src/data/author.json`
  - **Post** — writes to `src/content/posts/*.md`
- TinaCMS commits changes directly to the configured GitHub branch, which triggers a Cloudflare Pages redeploy automatically.

---

## Notes

- No Tailwind — all styles are scoped per-component or in `global.css`
- The `AtmosphericChrome` component (deco SVG, scanlines, noise, vignette, corner marks) is purely decorative — `pointer-events: none` throughout
- Corner SVGs sit at `z-index: 2`, below the nav (`z-index: 150`), to avoid blocking nav interaction
- The mobile hero drops the text overlay entirely and renders a featured post card below the image instead, avoiding conflicts with any text baked into the hero image
