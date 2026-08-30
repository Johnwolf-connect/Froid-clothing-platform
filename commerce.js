
const FROID_PRODUCTS = {
  aurora: {
    id: "aurora",
    name: "AURORA™",
    subtitle: "INSULATED PUFFER JACKET",
    color: "PRISM SHELL",
    price: 549,
    image: "./public/product/aurora-front.png"
  }
};

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
  const count = getBag().reduce((sum,item)=>sum+(item.qty||1),0);
  document.querySelectorAll("[data-bag-count]").forEach(el=>el.textContent=String(count).padStart(2,"0"));
}
function selectedText(selector, fallback){
  const el = document.querySelector(selector+".is-active");
  return el ? el.dataset.value : fallback;
}

document.addEventListener("click", e => {
  const thumb = e.target.closest("[data-gallery-src]");
  if(thumb){
    document.querySelectorAll("[data-gallery-src]").forEach(x=>x.classList.remove("is-active"));
    thumb.classList.add("is-active");
    const main = document.querySelector("#main-product-image");
    if(main){
      main.style.opacity=".2";
      setTimeout(()=>{
        main.src=thumb.dataset.gallerySrc;
        main.style.opacity="1";
      },120);
    }
  }

  const size = e.target.closest(".size-btn");
  if(size){
    document.querySelectorAll(".size-btn").forEach(x=>x.classList.remove("is-active"));
    size.classList.add("is-active");
    const label=document.querySelector("[data-size-label]");
    if(label) label.textContent=size.dataset.value;
  }

  const swatch = e.target.closest(".swatch-btn");
  if(swatch){
    document.querySelectorAll(".swatch-btn").forEach(x=>x.classList.remove("is-active"));
    swatch.classList.add("is-active");
    const label=document.querySelector("[data-color-label]");
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
    const p=FROID_PRODUCTS.aurora;
    const size=selectedText(".size-btn","M");
    const color=selectedText(".swatch-btn","PRISM SHELL");
    const bag=getBag();
    const existing=bag.find(x=>x.id===p.id && x.size===size && x.color===color);
    if(existing) existing.qty+=1;
    else bag.push({...p,size,color,qty:1});
    saveBag(bag);
    const btn=e.target.closest("[data-add-bag]");
    const old=btn.textContent;
    btn.textContent="ADDED TO BAG";
    setTimeout(()=>btn.textContent=old,1100);
  }

  const shipping=e.target.closest(".shipping-option");
  if(shipping){
    document.querySelectorAll(".shipping-option").forEach(x=>x.classList.remove("is-active"));
    shipping.classList.add("is-active");
    document.querySelectorAll(".shipping-option input").forEach(x=>x.checked=false);
    shipping.querySelector("input").checked=true;
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
  return [
    {id:"aurora",name:"Aurora™ Puffer Jacket",color:"Ice Gray",size:"M",price:189.99,qty:1,image:"./public/product/aurora-front.png"},
    {id:"glacier",name:"Glacier Cloud Pants",color:"Frost Blue",size:"M",price:129.99,qty:1,image:"./public/product/glacier-detail.png"},
    {id:"polar",name:"Polar Mono Jumpsuit",color:"Onyx Black",size:"M",price:249.99,qty:1,image:"./public/product/dune-detail.png"},
    {id:"beanie",name:"Froid Beanie",color:"Arctic White",size:"",price:34.99,qty:1,image:"./public/product/aurora-detail.png"}
  ];
}

function renderCheckout(){
  const list=document.querySelector("#checkout-items");
  if(!list) return;
  const items=checkoutItems();
  list.innerHTML=items.map(item=>`
    <div class="summary-item">
      <img src="${item.image}" alt="">
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
    shipping:shipping ? money(shipping) : "FREE",
    taxes:money(taxes),
    total:money(total)
  };
  Object.entries(vals).forEach(([k,v])=>{
    document.querySelectorAll(`[data-total-${k}]`).forEach(el=>el.textContent=v);
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  syncBagCount();
  renderCheckout();

  const form=document.querySelector("#checkout-form");
  if(form){
    form.addEventListener("submit",e=>{
      e.preventDefault();
      const required=[...form.querySelectorAll("[required]")];
      const missing=required.find(x=>!x.value.trim());
      if(missing){
        missing.focus();
        return;
      }
      document.querySelector("#checkout-stage-label").textContent="03. SHIPPING";
      document.querySelector("#checkout-message").hidden=false;
      window.scrollTo({top:0,behavior:"smooth"});
    });
  }
});
