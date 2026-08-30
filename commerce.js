
const FROID_PRODUCTS = {
  "prism-shell": {
    name:"PRISM SHELL",
    subtitle:"REFLECTIVE INSULATED SET",
    price:980,
    code:"FR-PS01",
    color:"IRIDESCENT",
    description:"Reflective insulated shell system engineered for movement, thermal protection and a futuristic cold-weather finish.",
    model:"./public/models/model-2.webp",
    gallery:[
      "./public/product/prism-front.png",
      "./public/product/prism-back.png",
      "./public/product/prism-detail.png",
      "./public/product/prism-alt.png"
    ],
    specs:["10,000mm","10,000g/m²/24hr","-30°C / -22°F","1.2 KG"],
    swatch:"prism"
  },

  "violet-vector": {
    name:"VIOLET VECTOR",
    subtitle:"TECHNICAL SHELL SYSTEM",
    price:1120,
    code:"FR-VV02",
    color:"VIOLET / BLACK",
    description:"Layered technical shell system combining reflective violet surfaces, articulated utility construction and cold-weather protection.",
    model:"./public/models/model-3.webp",
    gallery:[
      "./public/product/violet-front.png",
      "./public/product/violet-back.png",
      "./public/product/violet-detail.png",
      "./public/product/violet-alt.png"
    ],
    specs:["10,000mm","12,000g/m²/24hr","-25°C / -13°F","1.4 KG"],
    swatch:"violet"
  },

  "glacier-cloud": {
    name:"GLACIER CLOUD",
    subtitle:"FAUX-FUR ALPINE JACKET",
    price:840,
    code:"FR-GC03",
    color:"ICE BLUE",
    description:"Cloud-volume faux-fur alpine jacket designed for exceptional warmth with a sculpted monochromatic winter silhouette.",
    model:"./public/models/model-4.webp",
    gallery:[
      "./public/product/glacier-front.png",
      "./public/product/glacier-back.png",
      "./public/product/glacier-detail.png",
      "./public/models/model-4.webp"
    ],
    specs:["8,000mm","9,000g/m²/24hr","-20°C / -4°F","1.1 KG"],
    swatch:"blue"
  },

  "dune-zero": {
    name:"DUNE ZERO",
    subtitle:"LONG THERMAL PUFFER",
    price:1040,
    code:"FR-DZ04",
    color:"STONE",
    description:"Extended thermal puffer built around full-body insulation, a protective fur-lined hood and quiet stone-toned winter styling.",
    model:"./public/models/model-5.webp",
    gallery:[
      "./public/product/dune-front.png",
      "./public/product/dune-back.png",
      "./public/product/dune-detail.png",
      "./public/models/model-5.webp"
    ],
    specs:["10,000mm","8,000g/m²/24hr","-35°C / -31°F","1.8 KG"],
    swatch:"stone"
  },

  "redline": {
    name:"REDLINE",
    subtitle:"UTILITY ALPINE SYSTEM",
    price:1180,
    code:"FR-RL05",
    color:"RED / BLACK",
    description:"High-contrast alpine utility system with segmented insulation, harness-inspired detailing and aggressive mountain protection.",
    model:"./public/models/model-6.webp",
    gallery:[
      "./public/product/redline-front.png",
      "./public/product/redline-back.png",
      "./public/product/redline-detail.png",
      "./public/models/model-6.webp"
    ],
    specs:["12,000mm","12,000g/m²/24hr","-30°C / -22°F","1.6 KG"],
    swatch:"red"
  },

  "solar-ice": {
    name:"SOLAR ICE",
    subtitle:"GLOSS TECHNICAL PUFFER",
    price:920,
    code:"FR-SI06",
    color:"YELLOW",
    description:"Gloss technical puffer system designed as a high-visibility winter statement with sculpted insulation and cold-weather mobility.",
    model:"./public/models/model-7.webp",
    gallery:[
      "./public/product/solar-front.png",
      "./public/product/solar-back.png",
      "./public/product/solar-detail.png",
      "./public/models/model-7.webp"
    ],
    specs:["9,000mm","10,000g/m²/24hr","-25°C / -13°F","1.3 KG"],
    swatch:"yellow"
  },

  "polar-mono": {
    name:"POLAR MONO",
    subtitle:"EXTENDED COLD COAT",
    price:1090,
    code:"FR-PM07",
    color:"BLACK / WHITE",
    description:"Monochrome long-form puffer balancing a glossy insulated upper shell with a clean white lower silhouette.",
    model:"./public/models/model-8.webp",
    gallery:[
      "./public/product/polar-front.png",
      "./public/product/polar-back.png",
      "./public/product/polar-detail.png",
      "./public/models/model-8.webp"
    ],
    specs:["11,000mm","9,000g/m²/24hr","-35°C / -31°F","1.7 KG"],
    swatch:"black"
  },

  "ember-blue": {
    name:"EMBER BLUE",
    subtitle:"LONG PUFFER SYSTEM",
    price:1160,
    code:"FR-EB08",
    color:"ORANGE / BLUE",
    description:"Extended orange puffer over an icy blue foundation, combining severe-weather volume with Froid's strongest contrast palette.",
    model:"./public/models/model-9.webp",
    gallery:[
      "./public/models/model-9.webp",
      "./public/models/model-9.webp",
      "./public/campaign/category-men.webp",
      "./public/models/model-9.webp"
    ],
    specs:["10,000mm","10,000g/m²/24hr","-30°C / -22°F","1.9 KG"],
    swatch:"orange"
  },

  "aurora-fur": {
    name:"AURORA FUR",
    subtitle:"CROPPED ARCTIC FUR",
    price:1320,
    code:"FR-AF09",
    color:"GRAPHITE",
    description:"Cropped graphite fur statement piece combining exaggerated volume, protective warmth and the signature Froid goggle silhouette.",
    model:"./public/models/model-1.webp",
    gallery:[
      "./public/models/model-1.webp",
      "./public/models/model-fur.webp",
      "./public/brand/aurora-fur-jacket.png",
      "./public/campaign/category-fur.webp"
    ],
    specs:["Weather Shield","High Loft","-20°C / -4°F","1.5 KG"],
    swatch:"graphite"
  }
};

const PRODUCT_ORDER = [
  "prism-shell","violet-vector","glacier-cloud",
  "dune-zero","redline","solar-ice",
  "polar-mono","ember-blue","aurora-fur"
];

const money = n => `$${Number(n).toFixed(2)}`;

function getBag(){
  try { return JSON.parse(localStorage.getItem("froidBag") || "[]"); }
  catch { return []; }
}
function saveBag(bag){
  localStorage.setItem("froidBag", JSON.stringify(bag));
  syncBagCount();
}
function syncBagCount(){
  const count=getBag().reduce((sum,item)=>sum+(item.qty||1),0);
  document.querySelectorAll("[data-bag-count]").forEach(el=>{
    el.textContent=String(count).padStart(2,"0");
  });
}
function activeProductId(){
  const id=new URLSearchParams(location.search).get("id");
  return FROID_PRODUCTS[id] ? id : "prism-shell";
}
function activeProduct(){
  return FROID_PRODUCTS[activeProductId()];
}
function selectedText(selector,fallback){
  const el=document.querySelector(selector+".is-active");
  return el ? el.dataset.value : fallback;
}

function populateProductPage(){
  const root=document.querySelector("[data-product-page]");
  if(!root) return;

  const id=activeProductId();
  const p=FROID_PRODUCTS[id];

  document.title=`Froid — ${p.name}`;

  const set=(selector,text)=>{
    document.querySelectorAll(selector).forEach(el=>el.textContent=text);
  };

  set("[data-product-name]",p.name);
  set("[data-product-subtitle]",p.subtitle);
  set("[data-product-price]",money(p.price));
  set("[data-product-description]",p.description);
  set("[data-product-color-label]",p.color);
  set("[data-product-code]",p.code);

  const main=document.querySelector("#main-product-image");
  if(main){
    main.src=p.gallery[0];
    main.alt=`${p.name} ${p.subtitle}`;
  }

  const gallery=document.querySelector("#product-gallery");
  if(gallery){
    gallery.innerHTML=p.gallery.map((src,i)=>`
      <button
        class="thumb ${i===0?"is-active":""}"
        data-gallery-src="${src}"
        aria-label="${p.name} view ${i+1}"
      >
        <img src="${src}" alt="${p.name} view ${i+1}">
      </button>
    `).join("") + `<button class="thumb thumb-play" type="button" aria-label="Campaign video">▶</button>`;
  }

  const specs=document.querySelectorAll("[data-tech-value]");
  p.specs.forEach((v,i)=>{
    if(specs[i]) specs[i].textContent=v;
  });

  const tech=document.querySelector("#tech-image");
  if(tech) tech.src=p.gallery[Math.min(2,p.gallery.length-1)];

  const related=document.querySelector("#related-products");
  if(related){
    const ids=PRODUCT_ORDER.filter(x=>x!==id).slice(0,5);
    related.innerHTML=ids.map(relId=>{
      const r=FROID_PRODUCTS[relId];
      return `
        <a class="rec-card" href="./product.html?id=${relId}">
          <img src="${r.gallery[0] || r.model}" alt="${r.name}">
          <div class="rec-copy">
            <b>${r.name}</b>
            <span>${money(r.price)}</span>
          </div>
        </a>`;
    }).join("");
  }

  const selectedSwatch=document.querySelector(".swatch-btn.is-active");
  if(selectedSwatch){
    selectedSwatch.dataset.value=p.color;
    const visual=selectedSwatch.querySelector("span");
    if(visual){
      const swatches={
        prism:"linear-gradient(135deg,#bbf4ff,#875fff,#e9fffb,#ff90db)",
        violet:"linear-gradient(135deg,#311f53,#7459be,#b289ff)",
        blue:"#72c9ed",
        stone:"#c4b19a",
        red:"linear-gradient(135deg,#b41f2d,#11181e)",
        yellow:"#e5c92f",
        black:"linear-gradient(135deg,#10161b,#f3f4f5)",
        orange:"linear-gradient(135deg,#ec6f26,#3c9cca)",
        graphite:"#4d5157"
      };
      visual.style.background=swatches[p.swatch] || "#b7d5e5";
    }
  }
}

function addActiveProductToBag(){
  const id=activeProductId();
  const p=FROID_PRODUCTS[id];
  const size=selectedText(".size-btn","M");
  const color=selectedText(".swatch-btn",p.color);
  const bag=getBag();
  const existing=bag.find(x=>x.id===id && x.size===size && x.color===color);

  if(existing) existing.qty+=1;
  else bag.push({
    id,name:p.name,subtitle:p.subtitle,
    price:p.price,color,size,qty:1,image:p.gallery[0]
  });

  saveBag(bag);
}

document.addEventListener("click",e=>{
  const thumb=e.target.closest("[data-gallery-src]");
  if(thumb){
    document.querySelectorAll("[data-gallery-src]").forEach(x=>x.classList.remove("is-active"));
    thumb.classList.add("is-active");
    const main=document.querySelector("#main-product-image");
    if(main){
      main.style.opacity=".2";
      setTimeout(()=>{
        main.src=thumb.dataset.gallerySrc;
        main.style.opacity="1";
      },100);
    }
  }

  const size=e.target.closest(".size-btn");
  if(size){
    document.querySelectorAll(".size-btn").forEach(x=>x.classList.remove("is-active"));
    size.classList.add("is-active");
    const label=document.querySelector("[data-size-label]");
    if(label) label.textContent=size.dataset.value;
  }

  const swatch=e.target.closest(".swatch-btn");
  if(swatch){
    document.querySelectorAll(".swatch-btn").forEach(x=>x.classList.remove("is-active"));
    swatch.classList.add("is-active");
    const label=document.querySelector("[data-product-color-label]");
    if(label) label.textContent=swatch.dataset.value;
  }

  const tab=e.target.closest(".tab");
  if(tab){
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("is-active"));
    document.querySelectorAll(".tab-pane").forEach(x=>x.classList.remove("is-active"));
    tab.classList.add("is-active");
    document.querySelector(`#${tab.dataset.tab}`)?.classList.add("is-active");
  }

  if(e.target.closest("[data-add-bag]")){
    addActiveProductToBag();
    const btn=e.target.closest("[data-add-bag]");
    const old=btn.innerHTML;
    btn.textContent="ADDED TO BAG";
    setTimeout(()=>btn.innerHTML=old,1000);
  }

  const shipping=e.target.closest(".shipping-option");
  if(shipping){
    document.querySelectorAll(".shipping-option").forEach(x=>x.classList.remove("is-active"));
    shipping.classList.add("is-active");
    renderCheckout();
  }

  if(e.target.closest("[data-apply-discount]")){
    const input=document.querySelector("#discount-code");
    if(input && input.value.trim().toUpperCase()==="FROID10"){
      localStorage.setItem("froidDiscount","10");
      renderCheckout();
      input.value="FROID10 — APPLIED";
    }
  }
});

function checkoutItems(){
  const bag=getBag();
  if(bag.length) return bag;

  const p=FROID_PRODUCTS["prism-shell"];
  return [{
    id:"prism-shell",
    name:p.name,
    subtitle:p.subtitle,
    price:p.price,
    color:p.color,
    size:"M",
    qty:1,
    image:p.gallery[0]
  }];
}

function renderCheckout(){
  const list=document.querySelector("#checkout-items");
  if(!list) return;

  const items=checkoutItems();
  list.innerHTML=items.map(item=>`
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <b>${item.name}</b>
        <span>${item.color}${item.size ? " / "+item.size : ""}</span>
      </div>
      <span class="summary-price">${money(item.price*(item.qty||1))}</span>
    </div>
  `).join("");

  const subtotal=items.reduce((s,i)=>s+i.price*(i.qty||1),0);
  const selected=document.querySelector(".shipping-option.is-active");
  const shipping=selected ? Number(selected.dataset.price||0) : 0;
  const discount=Number(localStorage.getItem("froidDiscount")||0);
  const discounted=subtotal*(1-discount/100);
  const taxes=discounted*.08;
  const total=discounted+shipping+taxes;

  const vals={
    subtotal:money(subtotal),
    shipping:shipping?money(shipping):"FREE",
    taxes:money(taxes),
    total:money(total)
  };
  Object.entries(vals).forEach(([key,val])=>{
    document.querySelectorAll(`[data-total-${key}]`).forEach(el=>el.textContent=val);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  populateProductPage();
  syncBagCount();
  renderCheckout();

  const form=document.querySelector("#checkout-form");
  if(form){
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const required=[...form.querySelectorAll("[required]")];
      const missing=required.find(x=>!x.value.trim());
      if(missing){missing.focus();return;}
      document.querySelector("#checkout-stage-label").textContent="03. SHIPPING";
      document.querySelector("#checkout-message").hidden=false;
      window.scrollTo({top:0,behavior:"smooth"});
    });
  }
});
