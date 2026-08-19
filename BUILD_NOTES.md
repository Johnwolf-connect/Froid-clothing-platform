# Froid build notes — spaced platform revision

This version uses the new platform pack supplied on 2026-08-19.

## Platform rules

- `platform-spaced-a.png` and `platform-spaced-b.png` are treated as complete standalone mountain platforms.
- Each model gets one full platform. Platform images are `width: 100%` of the product stage and never overhang into the next card.
- Desktop product rows have a deliberate visible gap between stages instead of negative overlap.
- `mountain-range.png` is used only as a low-opacity ambient background layer; it does not function as a product platform.
- The previous platform filler layer is disabled because the new platform PNGs already contain their own top surface and mountain composition.
- Model feet use per-platform bottom anchors so boots sit on the visible top surface.
- Mobile keeps the platforms separated with a 20–24px horizontal gap while scrolling.

## Catalog

- 9 products render from `script.js`.
- Search and ALL / LIGHT / DARK / COLOR filters remain functional.
