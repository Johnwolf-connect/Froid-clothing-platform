# Froid Clothing Platform

A standalone Froid collection page built from the original Froid assets, transparent clothing models, and the revised standalone mountain platforms.

## Run locally

```bash
cd Froid-clothing-platform
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Structure

- `index.html` — page structure
- `styles.css` — responsive platform/model layout
- `script.js` — product data, search and filters
- `public/models/` — transparent clothing model PNGs
- `public/platforms/` — supplied Froid platform and mountain assets
- `public/brand/` — Froid logos and campaign art
- `public/textures/` — supplied ice/mountain textures

## Current platform direction

The product platforms are now intentionally **separate**. Each model uses one complete supplied platform, with visible negative space before the next platform. The separate mountain-range PNG is only a faint environmental background, so it can visually connect the frozen world without causing the product platforms to overlap.

## Current hero

The supplied wide **FROID WEAR** mountain campaign is the full-width opening hero above the collection.
