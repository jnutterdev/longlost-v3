# longlostforgotten.com — Site Brief

## Overview

A personal blog with no fixed subject. Essays, takes, notes, and whatever else. The site is authored by a single person and publishes on no particular schedule. Tone is informal, unhurried, a little atmospheric. The handle `longlostforgotten` predates the site and carries a loose theme of memory, retrieval, and things that stick with you.

---

## Aesthetic Direction

**Retro-futurist terminal / signal intercept.** The visual language borrows from late-80s / early-90s CRT interfaces, analog broadcast, and Art Deco geometry — but pushed through a contemporary lens. It should feel like something discovered rather than designed: a transmission from somewhere nearby but slightly out of sync.

### Key Qualities
- Dark, layered atmosphere — not flat black, but deep and slightly warm
- Feels like looking through glass or a screen: scanlines, noise, vignette
- Typography is confident and condensed for headlines, quiet and spacious for body
- Decorative geometry (fine rules, diamonds, corner brackets) at low opacity — structural, not ornamental
- Interactivity is subtle: hover states use colored drop-shadows rather than fills

### Mood References
- Late-night broadcast signal drift
- A mixtape sleeve from 1994
- Rain on sodium-vapor streetlights

---

## Color Palette

| Token | Value | Use |
|---|---|---|
| `--ink` | `#251b1e` | Background base |
| `--ink-dark` | `#1a1115` | Deeper layer |
| `--pink` | `#fb66a4` | Hero titles, primary accent |
| `--teal` | `#4a8fa0` | Nav, metadata, links, labels |
| `--sand` | `#c8c88d` | Body text, decorative elements |
| `--headline` | `#e8f4f7` | Post titles in feed |
| `--text-body` | `rgba(200,200,141,0.75)` | Body copy |
| `--text-muted` | `rgba(200,200,141,0.30)` | Secondary metadata |
| `--line` | `rgba(200,200,141,0.14)` | Dividers, borders |
| `--pink-dim` | `rgba(251,102,164,0.35)` | Tinted accents |
| `--teal-dim` | `rgba(74,143,160,0.40)` | Tinted teal elements |
| `--sand-ghost` | `rgba(200,200,141,0.12)` | Ghost fills |

Background: fixed radial gradient from `--ink` (center) through `#136380` to `#c8c88d` (edge).

---

## Typography

| Role | Font | Weights | Notes |
|---|---|---|---|
| Headlines / hero title | Barlow Condensed | 700, 900 | All-caps, tight tracking |
| Nav / labels / UI | Josefin Sans | 100, 300, 400 | Widely tracked, uppercase |
| Metadata / mono UI | Share Tech Mono | 400 | All-caps, letter-spaced |
| Body copy | Josefin Sans | 300 | Not a separate serif — kept in system |

Font source: `fonts.bunny.net`

Minimum font size: `0.625rem` (~10px). Body copy floor: `0.9rem`.

---

## Layout Structure

### Global Chrome
- **Signal bar**: 2px teal gradient strip at top edge, animates `signalPulse`
- **Nav**: sticky, `52px` tall, blur backdrop, `LLF` monogram + `longlostforgotten` wordmark left, three links right (Home · Archive · About)
- **Corner ornaments**: fixed SVG L-brackets at all four corners, `teal` stroke
- **Deco geometry**: fixed full-bleed SVG, low-opacity radial lines + nested diamonds + corner polylines, `--sand` strokes, `decoBreath` animation
- **Noise overlay**: fixed, `3.5%` opacity, `noiseShift` keyframe animation
- **Scanlines**: fixed `body::before`, `14%` opacity, `scanDrift` animation
- **Vignette**: fixed `body::after`, radial gradient to black at edges

### Shared Elements
- **Divider**: three sand diamonds between lines (`::before` / `::after`)
- **Section label**: `Share Tech Mono`, `0.625rem`, `letter-spacing: 0.3em`, teal-dim
- **Footer**: copyright left, signal tagline right; `Share Tech Mono`, `0.625rem`

---

## Pages

### index.html (home)
- Hero: `65vh` / min `400px`, featured post title in pink Barlow 900, subtitle in Share Tech Mono, meta row centered below
- Feed: max-width `640px`, centered; 4–6 posts; alternates standard (with excerpt) and `post--short` (punchier, smaller)
- No sidebar

### archive.html
- No hero image
- Page title block: section label + large Barlow display heading
- Posts grouped by year: year marker (large, near-invisible Barlow, right-aligned), then list of entries
- Each entry: date · tag · title · "continue reading →"
- "see more" CTA per year if group exceeds threshold
- No excerpts in archive view

### about.html
- No hero image
- Photo slot: aspect-ratio 3:4 placeholder (gradient fill), floated or blocked left
- Bio text alongside photo
- Minimal — no sidebar, no post list

### post.html (single post)
- No full-bleed hero; optional narrow post image or no image
- Post header: tag · date · read time, then large Barlow title, then Josefin sans-serif subtitle/deck
- Body copy: Josefin Sans 300, comfortable line-height, max ~65ch
- End-of-post: short `<hr>`-style divider, "filed under" tags, prev/next navigation

---

## Animations

| Name | Target | Effect |
|---|---|---|
| `scanDrift` | `body::before` | Scanlines drift downward slowly |
| `noiseShift` | `#noise` | Noise texture jitters in steps |
| `signalPulse` | `.signal-bar` | Opacity oscillates 0.25–1 |
| `decoBreath` | `#deco` | Geometry fades subtly in/out |
| Hover: titles | `.post-title`, `.nav-links a` | `drop-shadow(0 -1rem 0.5rem #a000d2)` |
| Hover: links | `.post-read` | Color shift to `--sand` + purple glow |

---

## Content Model (TinaCMS)

```
Post {
  title: string
  slug: string
  date: datetime
  tag: enum [essay, take, note, review, fragment]
  readTime: number (minutes)
  excerpt: string (richtext or markdown)
  body: richtext
  image?: image (optional, post-level only)
  featured?: boolean
}
```

Featured post is pulled for the homepage hero. Falls back to most recent if none flagged.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Astro (latest stable) |
| CMS | TinaCMS |
| CSS | Scoped component CSS + CSS custom properties (no Tailwind) |
| Fonts | fonts.bunny.net (privacy-friendly Google Fonts proxy) |
| Deployment | Self-hosted VPS via GitHub Actions + SSH/rsync |
| Normalize | normalize.css |
