const products = [
  { name: 'PRISM SHELL', subtitle: 'Reflective insulated set', price: '$980', code: 'FR-PS01', color: 'Iridescent', swatch: '#c7d5ef', group: 'color', model: 'model-2.webp', platform: 'a' },
  { name: 'VIOLET VECTOR', subtitle: 'Technical shell system', price: '$1,120', code: 'FR-VV02', color: 'Violet / Black', swatch: '#7359b8', group: 'dark', model: 'model-3.webp', platform: 'b' },
  { name: 'GLACIER CLOUD', subtitle: 'Faux-fur alpine jacket', price: '$840', code: 'FR-GC03', color: 'Ice Blue', swatch: '#5cbce9', group: 'color', model: 'model-4.webp', platform: 'a' },
  { name: 'DUNE ZERO', subtitle: 'Long thermal puffer', price: '$1,040', code: 'FR-DZ04', color: 'Stone', swatch: '#c9bba8', group: 'light', model: 'model-5.webp', platform: 'b' },
  { name: 'REDLINE', subtitle: 'Utility alpine system', price: '$1,180', code: 'FR-RL05', color: 'Red / Black', swatch: '#b5282b', group: 'dark', model: 'model-6.webp', platform: 'a' },
  { name: 'SOLAR ICE', subtitle: 'Gloss technical puffer', price: '$920', code: 'FR-SI06', color: 'Yellow', swatch: '#e4c336', group: 'color', model: 'model-7.webp', platform: 'b' },
  { name: 'POLAR MONO', subtitle: 'Extended cold coat', price: '$1,090', code: 'FR-PM07', color: 'Black / White', swatch: '#e9e9e9', group: 'light', model: 'model-8.webp', platform: 'a' },
  { name: 'EMBER BLUE', subtitle: 'Long puffer system', price: '$1,160', code: 'FR-EB08', color: 'Orange / Blue', swatch: '#ec6f26', group: 'color', model: 'model-9.webp', platform: 'b' },
  { name: 'AURORA FUR', subtitle: 'Cropped arctic fur', price: '$1,320', code: 'FR-AF09', color: 'Graphite', swatch: '#53575c', group: 'dark', model: 'model-1.webp', platform: 'a' },
];

const search = document.querySelector('#product-search');
const empty = document.querySelector('#empty-state');
const template = document.querySelector('#product-template');
const rowA = document.querySelector('#row-a');
const rowB = document.querySelector('#row-b');
const rowC = document.querySelector('#row-c');
let activeFilter = 'all';

function buildCard(product, index) {
  const fragment = template.content.cloneNode(true);
  const card = fragment.querySelector('.product-card');
  const platform = fragment.querySelector('.mountain-stage');
  const fill = fragment.querySelector('.platform-fill');
  const model = fragment.querySelector('.product-model');

  card.dataset.group = product.group;
  card.dataset.search = `${product.name} ${product.subtitle} ${product.code} ${product.color}`.toLowerCase();
  card.classList.add(`platform-${product.platform}`);

  platform.src = `./public/platforms/platform-spaced-${product.platform}.webp`;
  model.src = `./public/models/${product.model}`;
  model.alt = `Model wearing ${product.name}`;
  model.loading = index > 3 ? 'lazy' : 'eager';

  // The old filler layer is intentionally disabled. These supplied platforms
  // are complete standalone objects and need negative space around them.
  fill.hidden = true;

  fragment.querySelector('h3').textContent = product.name;
  fragment.querySelector('.product-subtitle').textContent = product.subtitle;
  fragment.querySelector('.product-price').textContent = product.price;
  fragment.querySelector('.product-code').textContent = product.code;
  fragment.querySelector('.product-color').textContent = product.color;
  fragment.querySelector('.swatch').style.setProperty('--swatch', product.swatch);

  return fragment;
}

products.slice(0, 3).forEach((product, index) => rowA.append(buildCard(product, index)));
products.slice(3, 6).forEach((product, index) => rowB.append(buildCard(product, index + 3)));
products.slice(6, 9).forEach((product, index) => rowC.append(buildCard(product, index + 6)));

function applyFilters() {
  const q = search.value.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.product-card').forEach(card => {
    const filterMatch = activeFilter === 'all' || card.dataset.group === activeFilter;
    const searchMatch = !q || card.dataset.search.includes(q);
    card.hidden = !(filterMatch && searchMatch);
    if (!card.hidden) visible += 1;
  });
  empty.hidden = visible > 0;
}

search.addEventListener('input', applyFilters);
document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('is-active'));
    button.classList.add('is-active');
    activeFilter = button.dataset.filter;
    applyFilters();
  });
});

document.querySelector('[data-focus-search]').addEventListener('click', () => search.focus());


/* ===== FROID PIXEL-PRECISION MODEL GROUNDING START ===== */

/*
  PIXEL-PRECISION LAYOUT

  Instead of assuming every transparent model file has the same
  invisible padding, this measures the actual visible pixels.

  Each model:
  - gets the same apparent visible body height
  - is horizontally centered by its visible silhouette
  - has its visible feet placed directly on the platform snow shelf
*/

const froidAlphaCache = new Map();
let froidLayoutFrame = null;

function alphaMetrics(img, type = 'model') {
  const cacheKey = img.currentSrc + '|' + type;

  if (froidAlphaCache.has(cacheKey)) {
    return froidAlphaCache.get(cacheKey);
  }

  const w = img.naturalWidth;
  const h = img.naturalHeight;

  if (!w || !h) return null;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0);

  const pixels = ctx.getImageData(0, 0, w, h).data;

  let minX = w;
  let minY = h;
  let maxX = -1;
  let maxY = -1;

  const alphaThreshold = 20;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const a = pixels[(y * w + x) * 4 + 3];

      if (a > alphaThreshold) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0 || maxY < 0) return null;

  let groundY = null;

  if (type === 'platform') {
    /*
      Find the broad CENTER snow shelf rather than the mountain peaks.

      Only inspect the middle section of the platform and require
      several consecutive rows with a broad opaque surface.
    */
    const bandStart = Math.floor(w * 0.38);
    const bandEnd   = Math.floor(w * 0.62);
    const bandWidth = bandEnd - bandStart;

    const requiredOpaque = bandWidth * 0.52;
    let consecutive = 0;

    for (let y = minY; y <= maxY; y++) {
      let opaque = 0;

      for (let x = bandStart; x < bandEnd; x++) {
        const a = pixels[(y * w + x) * 4 + 3];

        if (a > 35) opaque++;
      }

      if (opaque >= requiredOpaque) {
        consecutive++;

        if (consecutive >= 4) {
          groundY = y - 3;
          break;
        }
      } else {
        consecutive = 0;
      }
    }

    if (groundY === null) {
      groundY = minY + ((maxY - minY) * 0.42);
    }
  }

  const metrics = {
    minX,
    minY,
    maxX,
    maxY,
    visibleWidth: maxX - minX + 1,
    visibleHeight: maxY - minY + 1,
    visibleCenterX: (minX + maxX) / 2,
    groundY
  };

  froidAlphaCache.set(cacheKey, metrics);

  return metrics;
}


function precisionLayoutCard(card) {
  if (card.hidden) return;

  const stage = card.querySelector('.stage');
  const platform = card.querySelector('.mountain-stage');
  const model = card.querySelector('.product-model');

  if (!stage || !platform || !model) return;

  if (
    !platform.complete ||
    !platform.naturalWidth ||
    !model.complete ||
    !model.naturalWidth
  ) {
    return;
  }

  const platformMetrics = alphaMetrics(platform, 'platform');
  const modelMetrics = alphaMetrics(model, 'model');

  if (!platformMetrics || !modelMetrics) return;

  const stageRect = stage.getBoundingClientRect();

  /*
    PLATFORM
    --------
    122% of the card width: visibly more substantial while
    preserving the 3-column spacing.
  */
  const platformDisplayWidth = stageRect.width * 1.22;
  const platformScale =
    platformDisplayWidth / platform.naturalWidth;

  const platformDisplayHeight =
    platform.naturalHeight * platformScale;

  const platformLeft =
    (stageRect.width - platformDisplayWidth) / 2;

  const platformTop =
    stageRect.height - platformDisplayHeight;

  platform.style.width = platformDisplayWidth + 'px';
  platform.style.height = 'auto';
  platform.style.left = platformLeft + 'px';
  platform.style.top = platformTop + 'px';
  platform.style.bottom = 'auto';
  platform.style.transform = 'none';

  /*
    Exact Y position of the broad center snow shelf inside the
    rendered platform.
  */
  const snowSurfaceY =
    platformTop +
    (platformMetrics.groundY * platformScale);


  /*
    MODEL VISIBLE HEIGHT
    --------------------
    Equalize the PERSON, not the transparent canvas.

    The reference scale is intentionally large.
  */
  const desiredVisibleHeight = Math.min(
    385,
    Math.max(
      305,
      stageRect.width * 1.38
    )
  );

  const modelScale =
    desiredVisibleHeight /
    modelMetrics.visibleHeight;

  const renderedModelHeight =
    model.naturalHeight * modelScale;

  /*
    Center the visible clothing model, not the center of its
    transparent source canvas.
  */
  const modelLeft =
    (stageRect.width / 2) -
    (modelMetrics.visibleCenterX * modelScale);

  /*
    Put the visible lowest pixel / soles slightly INTO the snow
    surface. 3px overlap eliminates any visible air gap.
  */
  const contactOverlap = 3;

  const modelTop =
    snowSurfaceY +
    contactOverlap -
    (modelMetrics.maxY * modelScale);

  model.style.width = 'auto';
  model.style.height = renderedModelHeight + 'px';
  model.style.maxWidth = 'none';
  model.style.left = modelLeft + 'px';
  model.style.top = modelTop + 'px';
  model.style.bottom = 'auto';
  model.style.transform = 'none';
}


function precisionLayoutAll() {
  document
    .querySelectorAll('.product-card')
    .forEach(precisionLayoutCard);
}


function schedulePrecisionLayout() {
  cancelAnimationFrame(froidLayoutFrame);

  froidLayoutFrame =
    requestAnimationFrame(precisionLayoutAll);
}


/* Run after existing cards/images are available */
document
  .querySelectorAll('.product-model, .mountain-stage')
  .forEach(img => {
    if (!img.complete) {
      img.addEventListener(
        'load',
        schedulePrecisionLayout,
        { once: true }
      );
    }
  });


/* Recalculate when the browser/card width changes */
window.addEventListener(
  'resize',
  schedulePrecisionLayout
);


/* Recalculate after filtering reveals different cards */
const froidLandscape =
  document.querySelector('.product-landscape');

if (froidLandscape) {
  new MutationObserver(schedulePrecisionLayout)
    .observe(froidLandscape, {
      subtree: true,
      attributes: true,
      attributeFilter: ['hidden']
    });
}


window.addEventListener('load', () => {
  schedulePrecisionLayout();

  setTimeout(schedulePrecisionLayout, 150);
  setTimeout(schedulePrecisionLayout, 500);
});

schedulePrecisionLayout();

/* ===== FROID PIXEL-PRECISION MODEL GROUNDING END ===== */
