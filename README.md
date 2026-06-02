# longlostforgotten.com

Personal blog. No fixed subject. Built in Astro with TinaCMS.

---

## Stack

- **Framework**: Astro (static output)
- **CMS**: TinaCMS (Git-backed)
- **CSS**: Scoped component CSS + CSS custom properties
- **Fonts**: [fonts.bunny.net](https://fonts.bunny.net) (Barlow Condensed, Josefin Sans, Share Tech Mono)
- **Deploy**: Self-hosted VPS · GitHub Actions · SSH/rsync
- **Reset**: normalize.css

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output to /dist
npx tinacms dev   # run TinaCMS local editor alongside Astro dev
```

---

## Project Structure

```
longlostforgotten/
├── public/
│   └── fonts/           # local font fallbacks (optional)
├── src/
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Footer.astro
│   │   ├── PostCard.astro
│   │   ├── PostShort.astro
│   │   ├── Divider.astro
│   │   ├── DecoLayer.astro    # fixed SVG geometry + noise + scanlines
│   │   └── CornerMarks.astro
│   ├── layouts/
│   │   ├── Base.astro         # global chrome (deco, nav, footer, signal bar)
│   │   └── Post.astro         # single post layout
│   ├── pages/
│   │   ├── index.astro
│   │   ├── archive.astro
│   │   ├── about.astro
│   │   └── [slug].astro       # dynamic post pages
│   ├── content/
│   │   └── posts/             # .md / .mdx post files (TinaCMS managed)
│   └── styles/
│       └── global.css         # CSS custom properties + normalize import
├── tina/
│   └── config.ts              # TinaCMS schema
├── astro.config.mjs
└── package.json
```

---

## Content

Posts live in `src/content/posts/` as Markdown files, managed via TinaCMS.

### Frontmatter schema

```yaml
---
title: "Post Title Here"
slug: post-slug
date: 2026-06-01
tag: essay          # essay | take | note | review | fragment
readTime: 8
excerpt: "A short description shown in feed and archive."
image: /images/post-image.jpg   # optional
featured: true                   # optional — flags for homepage hero
---
```

The homepage hero pulls the post with `featured: true`. If none is set, falls back to the most recent post.

---

## Design System

See `BRIEF.md` for the full design reference including color tokens, typography, layout specs, and animation definitions.

### Quick reference — CSS tokens

```css
--ink: #251b1e;
--ink-dark: #1a1115;
--pink: #fb66a4;
--teal: #4a8fa0;
--sand: #c8c88d;
--headline: #e8f4f7;
--text-body: rgba(200,200,141,0.75);
--text-muted: rgba(200,200,141,0.30);
--line: rgba(200,200,141,0.14);
```

Fonts: `"Barlow Condensed"` (headlines) · `"Josefin Sans"` (UI + body) · `"Share Tech Mono"` (metadata)

---

## Deployment

Deployments trigger on push to `main` via GitHub Actions. The workflow runs `npm run build` then rsyncs `/dist` to the VPS over SSH.

```yaml
# .github/workflows/deploy.yml (abbreviated)
- run: npm ci && npm run build
- uses: easingthemes/ssh-deploy@main
  with:
    source: dist/
    target: /var/www/longlostforgotten.com/
```

Store `SSH_PRIVATE_KEY`, `SSH_HOST`, and `SSH_USER` as GitHub repository secrets.

---

## TinaCMS Notes

- Run `npx tinacms dev` alongside `npm run dev` for the local CMS editor at `http://localhost:4321/admin`
- TinaCMS config is in `tina/config.ts` — update the `branch` field and repo details before deploying
- On the VPS, the CMS editorial interface is disabled in production (static output only); all editing happens locally or via the Tina Cloud dashboard if configured

---

## Notes

- Minimum font size: `0.625rem` (no smaller)
- No Tailwind — all styles are scoped per-component or in `global.css`
- Image slots are currently gradient placeholders; replace with `<Image />` from `astro:assets` pointing to post frontmatter `image` field
- The `DecoLayer` component (fixed SVG geometry, scanlines, noise, vignette) is inserted once in `Base.astro` and is purely decorative — fully `pointer-events: none`
