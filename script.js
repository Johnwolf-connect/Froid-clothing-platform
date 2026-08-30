const products = [
  { id: 'prism-shell', name: 'PRISM SHELL', subtitle: 'Reflective insulated set', price: '$980', code: 'FR-PS01', color: 'Iridescent', swatch: '#c7d5ef', group: 'color', model: 'model-2.webp', platform: 'a' },
  { id: 'violet-vector', name: 'VIOLET VECTOR', subtitle: 'Technical shell system', price: '$1,120', code: 'FR-VV02', color: 'Violet / Black', swatch: '#7359b8', group: 'dark', model: 'model-3.webp', platform: 'b' },
  { id: 'glacier-cloud', name: 'GLACIER CLOUD', subtitle: 'Faux-fur alpine jacket', price: '$840', code: 'FR-GC03', color: 'Ice Blue', swatch: '#5cbce9', group: 'color', model: 'model-4.webp', platform: 'a' },
  { id: 'dune-zero', name: 'DUNE ZERO', subtitle: 'Long thermal puffer', price: '$1,040', code: 'FR-DZ04', color: 'Stone', swatch: '#c9bba8', group: 'light', model: 'model-5.webp', platform: 'b' },
  { id: 'redline', name: 'REDLINE', subtitle: 'Utility alpine system', price: '$1,180', code: 'FR-RL05', color: 'Red / Black', swatch: '#b5282b', group: 'dark', model: 'model-6.webp', platform: 'a' },
  { id: 'solar-ice', name: 'SOLAR ICE', subtitle: 'Gloss technical puffer', price: '$920', code: 'FR-SI06', color: 'Yellow', swatch: '#e4c336', group: 'color', model: 'model-7.webp', platform: 'b' },
  { id: 'polar-mono', name: 'POLAR MONO', subtitle: 'Extended cold coat', price: '$1,090', code: 'FR-PM07', color: 'Black / White', swatch: '#e9e9e9', group: 'light', model: 'model-8.webp', platform: 'a' },
  { id: 'ember-blue', name: 'EMBER BLUE', subtitle: 'Long puffer system', price: '$1,160', code: 'FR-EB08', color: 'Orange / Blue', swatch: '#ec6f26', group: 'color', model: 'model-9.webp', platform: 'b' },
  { id: 'aurora-fur', name: 'AURORA FUR', subtitle: 'Cropped arctic fur', price: '$1,320', code: 'FR-AF09', color: 'Graphite', swatch: '#53575c', group: 'dark', model: 'model-1.webp', platform: 'a' },
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
  card.dataset.model = product.model.replace(/\.[^.]+$/, '');
  card.dataset.productId = product.id;

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

  const productLink = document.createElement('a');
  productLink.className = 'product-hit-link';
  productLink.href = `./product.html?id=${product.id}`;
  productLink.setAttribute('aria-label', `View ${product.name} product details`);
  card.appendChild(productLink);

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



