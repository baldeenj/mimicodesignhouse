# Mimico Design House — Website

Marketing site for Mimico Design House, a research-led, human-centered UX
consultancy. Implements the **"Signal"** direction (Direction C) from the
Claude Design redesign exploration: a bold, modern, near-black canvas with a
vermilion (`#FF4D26`) accent, oversized Archivo Expanded grotesk type, a
full-bleed accent CTA, and an office-collaboration hero photo.

## Structure

```
index.html              # the homepage
assets/css/styles.css   # all styles (design tokens in :root)
assets/js/main.js        # scroll-reveal (IntersectionObserver)
```

It's a static site — no build step. Open `index.html` directly, or serve the
folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Notes

- **Fonts** load from Google Fonts (Archivo / Archivo Expanded).
- **Hero image** is currently hot-linked from Unsplash
  (`photo-1522071820081-009f0129c71c` — a team seated around a table). For
  production reliability you'll likely want to download it into `assets/img/`
  and point the `--hero-img` token (in `:root`, `assets/css/styles.css`) at it;
  check the Unsplash license/attribution first.
- Client names (Air Canada, RBC, TD, CIBC, Gov. of Ontario, …) are rendered as
  plain text wordmarks, not trademarked logos.
- Respects `prefers-reduced-motion` (disables the marquee and reveal motion).

These are desktop-first comps with responsive breakpoints at 980px and 620px;
mobile can be refined further as the site grows (Services / Case Studies pages).
