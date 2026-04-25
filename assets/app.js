/* eslint-disable no-use-before-define */

// ====================================================
// Aṣọ demo app (no backend)
// ====================================================

const $ = (id) => document.getElementById(id);

// ====================================================
// DATA: Real Nigerian markets, fabrics, and vendors
// ====================================================

const STATE_CITIES = {
  Lagos: ["Lekki Phase 1", "Lagos Island", "Yaba", "Surulere", "Mushin", "Ikeja", "Isolo", "Victoria Island"],
  Ogun: ["Abeokuta", "Sango Ota"],
  Oyo: ["Ibadan", "Iseyin"],
  Anambra: ["Onitsha", "Awka"],
  Abia: ["Aba", "Akwete", "Umuahia"],
  Rivers: ["Port Harcourt"],
  Kano: ["Kano"],
  Kaduna: ["Kaduna"],
};

const MARKETS = [
  { id: "balogun", name: "Balogun Market", city: "Lagos Island", state: "Lagos" },
  { id: "idumota", name: "Idumota Market", city: "Lagos Island", state: "Lagos" },
  { id: "tejuosho", name: "Tejuosho Market", city: "Yaba", state: "Lagos" },
  { id: "aswani", name: "Aswani Market", city: "Isolo", state: "Lagos" },
  { id: "mushin", name: "Mushin Olosha", city: "Mushin", state: "Lagos" },
  { id: "itoku", name: "Itoku Market (Adire)", city: "Abeokuta", state: "Ogun" },
  { id: "iseyin", name: "Iseyin Weavers", city: "Iseyin", state: "Oyo" },
  { id: "bodija", name: "Bodija Market", city: "Ibadan", state: "Oyo" },
  { id: "onitsha", name: "Onitsha Main Market", city: "Onitsha", state: "Anambra" },
  { id: "ariaria", name: "Ariaria International", city: "Aba", state: "Abia" },
  { id: "akwete", name: "Akwete Weavers", city: "Akwete", state: "Abia" },
  { id: "kantin", name: "Kantin Kwari Market", city: "Kano", state: "Kano" },
  { id: "ph", name: "PH Wax Hub", city: "Port Harcourt", state: "Rivers" },
  { id: "kadunamill", name: "Kaduna Textile Mills", city: "Kaduna", state: "Kaduna" },
];

const VENDORS = [
  { id: 1, name: "Iya Risi Textiles", market: "balogun", stall: "B-47", cats: ["ankara"], materials: ["Ankara", "Hollandais wax", "Hitarget"], moq: 12, lead: 2, rating: 4.8, priceFrom: 3500 },
  { id: 2, name: "Adire Oodua House", market: "itoku", stall: "A-12", cats: ["adire"], materials: ["Adire Eleko", "Indigo cotton", "Kampala tie-dye"], moq: 8, lead: 5, rating: 4.9, priceFrom: 5500 },
  { id: 3, name: "Mama Iseyin Aso Oke", market: "iseyin", stall: "—", cats: ["asooke"], materials: ["Aso Oke", "Sanyan silk", "Etu"], moq: 5, lead: 14, rating: 5.0, priceFrom: 12000 },
  { id: 4, name: "Chief Okeke Linens", market: "onitsha", stall: "Line 8, Shop 24", cats: ["linen"], materials: ["Linen", "Cotton", "Bamboo blend"], moq: 50, lead: 1, rating: 4.6, priceFrom: 2800 },
  { id: 5, name: "Lekki Premium Lace", market: "balogun", stall: "C-90", cats: ["lace"], materials: ["French lace", "Cord lace", "Tulle"], moq: 5, lead: 3, rating: 4.7, priceFrom: 18000 },
  { id: 6, name: "Asoebi Ladies Fabric", market: "idumota", stall: "D-15", cats: ["lace", "asooke"], materials: ["Asoebi sets", "George wrapper", "Silk"], moq: 6, lead: 3, rating: 4.8, priceFrom: 9500 },
  { id: 7, name: "Mushin Wax Hub", market: "mushin", stall: "MH-3", cats: ["ankara"], materials: ["Ankara", "Vlisco", "Hitarget", "Java print"], moq: 18, lead: 2, rating: 4.5, priceFrom: 3200 },
  { id: 8, name: "Aswani Wednesday Stalls", market: "aswani", stall: "Open mkt", cats: ["ankara"], materials: ["Ankara wax", "Bulk wax print"], moq: 30, lead: 4, rating: 4.4, priceFrom: 2900 },
  { id: 9, name: "Tunde Print Studio", market: "tejuosho", stall: "T-220", cats: ["custom"], materials: ["Custom screen print", "Digital print", "Sublimation"], moq: 5, lead: 7, rating: 4.9, priceFrom: 6500 },
  { id: 10, name: "Ariaria Garment Mills", market: "ariaria", stall: "Sec 4 / S-12", cats: ["ankara", "lace"], materials: ["Ankara", "Brocade", "Damask"], moq: 24, lead: 4, rating: 4.6, priceFrom: 3400 },
  { id: 11, name: "Kantin Kwari Atiku", market: "kantin", stall: "K-301", cats: ["atiku"], materials: ["Atiku", "Senator material", "Cashmere"], moq: 10, lead: 5, rating: 4.7, priceFrom: 8500 },
  { id: 12, name: "Akwete Weavers Coop", market: "akwete", stall: "Coop hall", cats: ["akwete"], materials: ["Akwete cloth", "Hand-woven cotton"], moq: 4, lead: 14, rating: 4.9, priceFrom: 14000 },
  { id: 13, name: "George Fabric Hub", market: "ph", stall: "PH-22", cats: ["george"], materials: ["George wrapper", "Indian George", "Hollandais"], moq: 4, lead: 4, rating: 4.7, priceFrom: 22000 },
  { id: 14, name: "Bodija Damask Co.", market: "bodija", stall: "BD-9", cats: ["lace"], materials: ["Damask", "Brocade", "Cord lace"], moq: 8, lead: 3, rating: 4.5, priceFrom: 7500 },
  { id: 15, name: "Kaduna Textile Mills", market: "kadunamill", stall: "Mill HQ", cats: ["linen"], materials: ["Cotton", "Polyester blend", "Plain weaves"], moq: 100, lead: 6, rating: 4.4, priceFrom: 1900 },
  { id: 16, name: "Iya Basira Senator Wear", market: "mushin", stall: "MH-77", cats: ["atiku"], materials: ["Atiku", "Senator", "Cashmere blend"], moq: 8, lead: 4, rating: 4.6, priceFrom: 7800 },
  { id: 17, name: "Ojuelegba Denim Co.", market: "tejuosho", stall: "Block J-3", cats: ["linen"], materials: ["Denim", "Twill", "Canvas"], moq: 25, lead: 4, rating: 4.5, priceFrom: 4200 },
  { id: 18, name: "Ikeja Print Studios", market: "tejuosho", stall: "Ikeja branch", cats: ["custom"], materials: ["Digital print", "Screen print", "Custom Ankara"], moq: 6, lead: 7, rating: 4.8, priceFrom: 6800 },
];

const CATEGORIES = [
  { id: "adire", label: "Adire", desc: "Indigo & resist-dye", bg: "#1d3a72", pat: "adire" },
  { id: "ankara", label: "Ankara · Wax", desc: "Bold prints, Hollandais", bg: "#c1551c", pat: "ankara" },
  { id: "asooke", label: "Aso Oke", desc: "Hand-loomed ceremonial", bg: "#8b1a1a", pat: "asooke" },
  { id: "lace", label: "Lace · Brocade", desc: "Owambe & wedding", bg: "#5e2e8f", pat: "lace" },
  { id: "atiku", label: "Atiku · Senator", desc: "Men's traditional", bg: "#2d5a4a", pat: "atiku" },
  { id: "akwete", label: "Akwete", desc: "Igbo hand-woven", bg: "#8b4513", pat: "akwete" },
  { id: "george", label: "George Wrapper", desc: "Niger Delta classic", bg: "#7a1d3d", pat: "george" },
  { id: "linen", label: "Linen · Cotton", desc: "Everyday basics", bg: "#6b6358", pat: "linen" },
  { id: "custom", label: "Custom Print", desc: "Design with AI →", bg: "#142a52", pat: "custom" },
];

// ===== STATE =====
const appState = {
  view: "browse", // browse | detail | designer
  loc: { state: "Lagos", city: "Lekki Phase 1" },
  category: "all",
  search: "",
  detailVendor: null,
  designStyle: "geometric",
  designColor: "#1d3a72",
  designFabric: "cotton",
  designPrompt: "",
  cart: [],
};

// ====================================================
// REAL PRODUCT PHOTOS (fabriq marketplace)
// ====================================================

const FABRIQ_PHOTOS = [
  "assets/images/marketplace/fabriq/f3c20c94-7226-45e9-85c5-83d3ddd482de.JPG",
  "assets/images/marketplace/fabriq/4212b977-a169-4797-b026-c3d9e3fb908c.JPG",
  "assets/images/marketplace/fabriq/815a52cd-10a1-4089-8d05-fa540e1389e0.JPG",
  "assets/images/marketplace/fabriq/ef33dc64-8d12-4be9-9b96-54369fc353a1.JPG",
  "assets/images/marketplace/fabriq/fd39a5cd-5e42-4258-9d9c-ec9e5a7dbdfc.JPG",
  "assets/images/marketplace/fabriq/fd5834d4-0f30-44bc-929e-9d1f16eba15d.JPG",
  "assets/images/marketplace/fabriq/6e9a8ff5-a890-4e3b-bd31-ff87d2e80a1f.JPG",
  "assets/images/marketplace/fabriq/12903bf0-55a9-4e5a-b51f-10c241030d66.JPG",
  "assets/images/marketplace/fabriq/70562037-fdbc-4a7b-8c71-bd3d5893375b.JPG",
  "assets/images/marketplace/fabriq/c548b6ec-245f-4258-a3ad-2caae3675ca6.JPG",
];

function vendorPhoto(vendorId) {
  return FABRIQ_PHOTOS[vendorId % FABRIQ_PHOTOS.length];
}

function inventoryPhoto(vendorId, idx) {
  return FABRIQ_PHOTOS[(vendorId * 3 + idx) % FABRIQ_PHOTOS.length];
}

// ====================================================
// SVG FABRIC PATTERN GENERATORS (fallback for categories / cart)
// ====================================================

function svgDataUri(svg) {
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

function fabricPattern(type) {
  const w = 200;
  const h = 200;
  let body = "";

  switch (type) {
    case "adire":
      body = `<rect width="${w}" height="${h}" fill="#1d3a72"/>
        <g stroke="#faf6ee" fill="none" stroke-width="2.5">
          <circle cx="50" cy="50" r="22"/><circle cx="50" cy="50" r="14"/><circle cx="50" cy="50" r="7"/>
          <circle cx="150" cy="150" r="22"/><circle cx="150" cy="150" r="14"/><circle cx="150" cy="150" r="7"/>
          <circle cx="150" cy="50" r="18"/><circle cx="50" cy="150" r="18"/>
        </g>
        <g fill="#faf6ee">
          <circle cx="50" cy="50" r="3"/><circle cx="150" cy="150" r="3"/>
          <circle cx="100" cy="100" r="4"/>
          <circle cx="20" cy="100" r="2"/><circle cx="180" cy="100" r="2"/>
          <circle cx="100" cy="20" r="2"/><circle cx="100" cy="180" r="2"/>
        </g>`;
      break;
    case "ankara":
      body = `<rect width="${w}" height="${h}" fill="#c1551c"/>
        <g fill="#c8941a">
          <polygon points="50,20 80,50 50,80 20,50"/>
          <polygon points="150,120 180,150 150,180 120,150"/>
        </g>
        <g fill="#1d3a72">
          <circle cx="150" cy="50" r="22"/>
          <circle cx="50" cy="150" r="22"/>
        </g>
        <g fill="#faf6ee">
          <circle cx="150" cy="50" r="8"/><circle cx="50" cy="150" r="8"/>
          <polygon points="50,40 60,50 50,60 40,50"/>
          <polygon points="150,140 160,150 150,160 140,150"/>
        </g>`;
      break;
    case "asooke":
      body = `<rect width="${w}" height="${h}" fill="#8b1a1a"/>
        <rect x="0" y="0" width="22" height="${h}" fill="#1d3a72"/>
        <rect x="60" y="0" width="14" height="${h}" fill="#c8941a"/>
        <rect x="100" y="0" width="22" height="${h}" fill="#1d3a72"/>
        <rect x="160" y="0" width="14" height="${h}" fill="#c8941a"/>
        <g stroke="#000" stroke-width="0.4" opacity="0.3">
          ${Array.from({ length: 20 }, (_, i) => `<line x1="0" y1="${i * 10}" x2="${w}" y2="${i * 10}"/>`).join("")}
        </g>`;
      break;
    case "lace":
      body = `<rect width="${w}" height="${h}" fill="#f3e6f3"/>
        <g stroke="#5e2e8f" fill="none" stroke-width="1.2" opacity="0.7">
          ${[
            [50, 50],
            [150, 50],
            [50, 150],
            [150, 150],
            [100, 100],
          ]
            .map(
              ([x, y]) => `
            <circle cx="${x}" cy="${y}" r="14"/>
            <circle cx="${x}" cy="${y}" r="6"/>
            <path d="M${x - 14},${y} Q${x},${y - 22} ${x + 14},${y} Q${x},${y + 22} ${x - 14},${y}"/>
          `,
            )
            .join("")}
        </g>
        <g fill="#5e2e8f" opacity="0.5">
          ${[
            [50, 50],
            [150, 50],
            [50, 150],
            [150, 150],
            [100, 100],
          ]
            .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2"/>`)
            .join("")}
        </g>`;
      break;
    case "atiku":
      body = `<rect width="${w}" height="${h}" fill="#2d5a4a"/>
        <g stroke="#1f4036" stroke-width="0.6">
          ${Array.from({ length: 40 }, (_, i) => `<line x1="${i * 5}" y1="0" x2="${i * 5}" y2="${h}"/>`).join("")}
        </g>
        <g stroke="#3b6e5c" stroke-width="0.4" opacity="0.6">
          ${Array.from({ length: 20 }, (_, i) => `<line x1="0" y1="${i * 10}" x2="${w}" y2="${i * 10}"/>`).join("")}
        </g>`;
      break;
    case "akwete":
      body = `<rect width="${w}" height="${h}" fill="#8B4513"/>
        <rect x="20" y="0" width="14" height="${h}" fill="#c8941a"/>
        <rect x="80" y="0" width="14" height="${h}" fill="#f4e8d0"/>
        <rect x="140" y="0" width="14" height="${h}" fill="#c8941a"/>
        <g fill="#f4e8d0">
          <polygon points="50,40 60,50 50,60 40,50"/>
          <polygon points="50,140 60,150 50,160 40,150"/>
          <polygon points="120,90 130,100 120,110 110,100"/>
          <polygon points="180,40 190,50 180,60 170,50"/>
          <polygon points="180,140 190,150 180,160 170,150"/>
        </g>`;
      break;
    case "george":
      body = `<rect width="${w}" height="${h}" fill="#7a1d3d"/>
        <rect x="0" y="0" width="${w}" height="20" fill="#c8941a"/>
        <rect x="0" y="${h - 20}" width="${w}" height="20" fill="#c8941a"/>
        <g fill="#c8941a">
          ${Array.from({ length: 8 }, (_, i) => `<circle cx="${20 + i * 25}" cy="${h / 2}" r="6"/>`).join("")}
        </g>
        <g stroke="#c8941a" fill="none" stroke-width="1">
          <path d="M0,${h / 2 - 20} L${w},${h / 2 - 20}"/>
          <path d="M0,${h / 2 + 20} L${w},${h / 2 + 20}"/>
        </g>`;
      break;
    case "linen":
      body = `<rect width="${w}" height="${h}" fill="#ecdfc4"/>
        <g stroke="#c2b280" stroke-width="0.5" opacity="0.6">
          ${Array.from({ length: 50 }, (_, i) => `<line x1="0" y1="${i * 4}" x2="${w}" y2="${i * 4}"/>`).join("")}
          ${Array.from({ length: 50 }, (_, i) => `<line x1="${i * 4}" y1="0" x2="${i * 4}" y2="${h}"/>`).join("")}
        </g>`;
      break;
    case "custom":
      body = `<rect width="${w}" height="${h}" fill="#142a52"/>
        <g fill="#c8941a" opacity="0.85">
          <circle cx="100" cy="100" r="30"/>
        </g>
        <g stroke="#faf6ee" fill="none" stroke-width="1.5" opacity="0.9">
          <circle cx="100" cy="100" r="50"/>
          <circle cx="100" cy="100" r="70"/>
        </g>
        <text x="100" y="108" text-anchor="middle" fill="#faf6ee" font-size="20" font-family="sans-serif" font-weight="700">AI</text>`;
      break;
    default:
      body = `<rect width="${w}" height="${h}" fill="#f5ede0"/>
        <g stroke="#dccdb0" stroke-width="0.4" opacity="0.5">
          ${Array.from({ length: 40 }, (_, i) => `<line x1="0" y1="${i * 5}" x2="${w}" y2="${i * 5}"/>`).join("")}
        </g>`;
  }

  return svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`);
}

function fabricBaseStyle(type) {
  const map = {
    cotton: fabricPattern("cotton"),
    linen: fabricPattern("linen"),
    silk: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
      <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#f7e8d0"/><stop offset="0.5" stop-color="#ead4a8"/><stop offset="1" stop-color="#d4b88a"/></linearGradient></defs>
      <rect width="200" height="200" fill="url(#g)"/></svg>`),
    denim: svgDataUri(`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
      <rect width="20" height="20" fill="#1f3a55"/>
      <g stroke="#2a4d6e" stroke-width="0.6">
        <line x1="0" y1="0" x2="20" y2="20"/><line x1="0" y1="5" x2="20" y2="25"/>
        <line x1="0" y1="10" x2="20" y2="30"/><line x1="0" y1="15" x2="20" y2="35"/>
      </g></svg>`),
  };
  return map[type] || map.cotton;
}

// ====================================================
// BROWSE VIEW
// ====================================================

function getMarket(id) {
  return MARKETS.find((m) => m.id === id) || null;
}

function distanceScore(v) {
  const m = getMarket(v.market);
  if (!m) return 99;
  if (m.city === appState.loc.city) return 0;
  if (m.state === appState.loc.state) return 1;
  return 2;
}

function vendorMatchesFilters(v) {
  // Category
  if (appState.category !== "all") {
    if (appState.category === "custom" && !v.cats.includes("custom")) return false;
    if (appState.category !== "custom" && !v.cats.includes(appState.category)) return false;
  }

  // Search
  if (appState.search) {
    const q = appState.search.toLowerCase();
    const m = getMarket(v.market);
    const blob = `${v.name} ${v.materials.join(" ")} ${m ? `${m.name} ${m.city}` : ""}`.toLowerCase();
    if (!blob.includes(q)) return false;
  }

  // State filter
  const stateFilter = $("filter-state").value;
  if (stateFilter) {
    const m = getMarket(v.market);
    if (!m || m.state !== stateFilter) return false;
  }

  // Market filter
  const marketFilter = $("filter-market").value;
  if (marketFilter && v.market !== marketFilter) return false;

  // Lead time
  const leadFilters = Array.from(document.querySelectorAll(".filter-lead:checked")).map((c) => c.value);
  if (leadFilters.length) {
    const inLead = leadFilters.some((f) => {
      if (f === "1-2") return v.lead <= 2;
      if (f === "3-7") return v.lead >= 3 && v.lead <= 7;
      if (f === "7+") return v.lead > 7;
      return false;
    });
    if (!inLead) return false;
  }

  // MOQ
  const moqFilters = Array.from(document.querySelectorAll(".filter-moq:checked")).map((c) => c.value);
  if (moqFilters.length) {
    const inMoq = moqFilters.some((f) => {
      if (f === "low") return v.moq < 10;
      if (f === "mid") return v.moq >= 10 && v.moq <= 30;
      if (f === "high") return v.moq > 30;
      return false;
    });
    if (!inMoq) return false;
  }

  return true;
}

function renderCategoryTiles() {
  $("cat-tiles").innerHTML = CATEGORIES.map(
    (c) => `
    <div class="cat-tile" style="background:${c.bg}" data-cat="${c.id}">
      <div class="pat" style="background-image:${fabricPattern(c.pat)}; background-size: 100% 100%;"></div>
      <div class="label-wrap">
        <h3>${c.label}</h3>
        <div class="ct-meta">${c.desc}</div>
      </div>
    </div>
  `,
  ).join("");
}

function populateMarketFilter() {
  $("filter-market").innerHTML =
    '<option value="">All markets</option>' +
    MARKETS.map((m) => `<option value="${m.id}">${m.name} (${m.city})</option>`).join("");
}

function renderSupplierGrid() {
  const filtered = VENDORS.filter(vendorMatchesFilters).sort(
    (a, b) => distanceScore(a) - distanceScore(b) || b.rating - a.rating,
  );

  $("grid-count").textContent = `${filtered.length} vendor${filtered.length === 1 ? "" : "s"}`;
  $("grid-title").textContent =
    appState.category === "all"
      ? `Vendors near ${appState.loc.city}`
      : `${CATEGORIES.find((c) => c.id === appState.category)?.label || ""} vendors`;

  if (!filtered.length) {
    $("supplier-grid").innerHTML = `<div class="empty">No vendors match. Try clearing filters or search.</div>`;
    return;
  }

  $("supplier-grid").innerHTML = filtered
    .map((v) => {
      const market = getMarket(v.market);
      const primaryCat = v.cats[0];
      const pat = CATEGORIES.find((c) => c.id === primaryCat);
      return `
      <div class="supplier-card" data-vendor="${v.id}">
        <div class="sc-img" style="background:${pat?.bg || "#888"};">
          <div style="position:absolute;inset:0;background-image:url('${vendorPhoto(v.id)}');background-size:cover;background-position:center"></div>
          <div class="verified">✓ Verified</div>
          <div class="lead-badge">${v.lead}d delivery</div>
        </div>
        <div class="sc-body">
          <h3>${v.name}</h3>
          <div class="sc-market">${market?.name || "—"} · ${market?.city || ""}</div>
          <div class="sc-meta">
            <span>★ ${v.rating}</span>
            <span>·</span>
            <span>MOQ ${v.moq}m</span>
            <span>·</span>
            <span>from ₦${v.priceFrom.toLocaleString()}/m</span>
          </div>
          <div class="sc-tags">${v.materials
            .slice(0, 3)
            .map((m) => `<span class="tag">${m}</span>`)
            .join("")}</div>
        </div>
      </div>
    `;
    })
    .join("");
}

function applyFilters() {
  renderSupplierGrid();
}

function clearFilters() {
  $("filter-state").value = "";
  $("filter-market").value = "";
  document.querySelectorAll(".filter-lead, .filter-moq").forEach((c) => {
    c.checked = false;
  });
  appState.search = "";
  $("search-input").value = "";
  appState.category = "all";
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.cat === "all"));
  renderSupplierGrid();
}

function onSearchInput() {
  appState.search = $("search-input").value.trim();
  if (appState.view !== "browse") goHome();
  renderSupplierGrid();
}

function selectCategory(catId) {
  appState.category = catId;
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c.dataset.cat === catId));
  if (catId === "custom") {
    goDesigner();
    return;
  }
  if (appState.view !== "browse") goHome();
  renderSupplierGrid();
}

// ====================================================
// VIEWS
// ====================================================

function goHome() {
  appState.view = "browse";
  $("browse-view").classList.remove("hidden");
  $("detail-view").classList.remove("show");
  $("designer-view").classList.remove("show");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openDetail(id) {
  appState.detailVendor = VENDORS.find((v) => v.id === id) || null;
  appState.view = "detail";
  $("browse-view").classList.add("hidden");
  $("designer-view").classList.remove("show");
  $("detail-view").classList.add("show");
  renderDetail();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderDetail() {
  const v = appState.detailVendor;
  if (!v) return;
  const m = getMarket(v.market);
  const primaryCat = v.cats[0];
  const pat = CATEGORIES.find((c) => c.id === primaryCat);

  const inventory = v.materials.map((mat, i) => ({
    name: mat,
    price: v.priceFrom + i * 800,
    moq: v.moq,
    pat: pat?.pat || "cotton",
    bg: pat?.bg || "#888",
  }));

  $("detail-content").innerHTML = `
    <div class="detail-hero">
      <div class="dh-cover" style="background:${pat?.bg || "#888"}">
        <div style="position:absolute;inset:0;background-image:url('${vendorPhoto(v.id)}');background-size:cover;background-position:center"></div>
      </div>
      <div class="dh-body">
        <div class="dh-info">
          <h1>${v.name}</h1>
          <div class="market-line">📍 ${m?.name || "—"} · ${m?.city || ""}, ${m?.state || ""} · Stall ${v.stall}</div>
          <div style="font-size:13px;color:var(--muted);max-width:600px">
            Verified ${v.cats.includes("custom") ? "custom print studio" : "fabric vendor"} sourcing direct from ${m?.name || "the market"}.
            Specializes in ${v.materials.join(", ")}. Sample requests confirmed within 24 hours.
          </div>
          <div class="dh-stats">
            <div class="dh-stat"><strong>★ ${v.rating}</strong><span>Vendor rating</span></div>
            <div class="dh-stat"><strong>${v.lead} day${v.lead === 1 ? "" : "s"}</strong><span>Avg delivery</span></div>
            <div class="dh-stat"><strong>${v.moq}m</strong><span>Min order</span></div>
            <div class="dh-stat"><strong>₦${v.priceFrom.toLocaleString()}</strong><span>From / metre</span></div>
          </div>
        </div>
        <div class="dh-cta">
          <button class="btn-primary" type="button" data-action="sample-pack" data-vendor="${v.id}">Request sample pack</button>
          <button class="btn-secondary" type="button" data-action="message" data-vendor="${v.id}">Message vendor</button>
        </div>
      </div>
    </div>

    <div class="inv-section">
      <h2>Inventory · ${inventory.length} items</h2>
      <div class="inv-grid">
        ${inventory
          .map(
            (item, i) => `
          <div class="inv-card">
            <div class="inv-img" style="background:${item.bg};background-image:url('${inventoryPhoto(v.id, i)}');background-size:cover;background-position:center"></div>
            <div class="inv-body">
              <h4>${item.name}</h4>
              <div class="price">₦${item.price.toLocaleString()}/metre</div>
              <div class="moq-line">MOQ ${item.moq}m · ${v.lead}d delivery</div>
              <button class="add-cart" type="button"
                data-action="add-to-cart"
                data-vendor="${v.id}"
                data-item-idx="${i}"
                data-name="${encodeURIComponent(item.name)}"
                data-price="${item.price}"
                data-moq="${item.moq}"
              >+ Add ${item.moq}m to cart</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `;
}

// ====================================================
// LOCATION
// ====================================================

function openLocationPicker() {
  $("loc-modal").classList.add("show");
  $("loc-modal").setAttribute("aria-hidden", "false");
  populateLocationSelects();
}

function closeLocationPicker() {
  $("loc-modal").classList.remove("show");
  $("loc-modal").setAttribute("aria-hidden", "true");
}

function populateLocationSelects() {
  const stateSel = $("loc-state-select");
  stateSel.innerHTML = Object.keys(STATE_CITIES).map((s) => `<option ${s === appState.loc.state ? "selected" : ""}>${s}</option>`).join("");
  const citySel = $("loc-city-select");

  const renderCities = () => {
    const cities = STATE_CITIES[stateSel.value] || [];
    citySel.innerHTML = cities.map((c) => `<option ${c === appState.loc.city ? "selected" : ""}>${c}</option>`).join("");
  };

  stateSel.onchange = () => renderCities();
  stateSel.value = appState.loc.state;
  renderCities();
}

function setLocation() {
  appState.loc.state = $("loc-state-select").value;
  appState.loc.city = $("loc-city-select").value;
  $("loc-display").textContent = `${appState.loc.city}, ${appState.loc.state}`;
  closeLocationPicker();
  showToast(`📍 Location set to ${appState.loc.city}. Re-sorting vendors by distance...`);
  renderSupplierGrid();
}

// ====================================================
// CART
// ====================================================

function updateCartUI() {
  $("cart-count").textContent = appState.cart.length;
  const total = appState.cart.reduce((s, i) => s + i.price * i.qty, 0);
  $("cart-total").textContent = `₦${total.toLocaleString()}`;
}

function addToCart({ vendorId, name, price, qty }) {
  const v = VENDORS.find((x) => x.id === vendorId);
  if (!v) return;
  appState.cart.push({ vendorId, vendorName: v.name, name, price, qty });
  updateCartUI();
  showToast(`✓ Added ${qty}m of ${name} from ${v.name}`);
}

function removeFromCart(idx) {
  appState.cart.splice(idx, 1);
  updateCartUI();
  renderCart();
}

function openCart() {
  $("drawer-mask").classList.add("show");
  $("drawer").classList.add("show");
  renderCart();
}

function closeCart() {
  $("drawer-mask").classList.remove("show");
  $("drawer").classList.remove("show");
}

function renderCart() {
  const body = $("drawer-body");
  if (!appState.cart.length) {
    body.innerHTML = `<div class="drawer-empty">Your cart is empty.<br/>Browse vendors to request samples.</div>`;
    return;
  }

  const grouped = {};
  appState.cart.forEach((item, idx) => {
    if (!grouped[item.vendorName]) grouped[item.vendorName] = [];
    grouped[item.vendorName].push({ ...item, idx });
  });

  body.innerHTML = Object.entries(grouped)
    .map(
      ([vendor, items]) => `
    <div style="margin-bottom:16px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.5px;color:var(--muted);margin-bottom:6px">${vendor}</div>
      ${items
        .map(
          (item) => `
        <div class="cart-item">
          <div class="ci-img" style="background:var(--cream-2);background-image:url('${vendorPhoto(item.vendorId)}');background-size:cover;background-position:center"></div>
          <div class="ci-info">
            <h4>${item.name}</h4>
            <div class="ci-meta">${item.qty}m · ₦${item.price.toLocaleString()}/m</div>
            <div class="ci-qty">
              <strong>₦${(item.price * item.qty).toLocaleString()}</strong>
              <button class="ci-remove" type="button" data-action="remove-cart" data-idx="${item.idx}">Remove</button>
            </div>
          </div>
        </div>
      `,
        )
        .join("")}
    </div>
  `,
    )
    .join("");
}

function checkout() {
  if (!appState.cart.length) {
    showToast("Cart is empty");
    return;
  }
  const vendors = [...new Set(appState.cart.map((i) => i.vendorName))];
  appState.cart = [];
  updateCartUI();
  closeCart();
  showToast(`✓ Sample requests sent to ${vendors.length} vendor${vendors.length === 1 ? "" : "s"}. ETA in app.`);
}

function requestSampleAll(vendorId) {
  const v = VENDORS.find((x) => x.id === vendorId);
  if (!v) return;
  appState.cart.push({ vendorId, vendorName: v.name, name: "Sample pack (3 swatches)", price: 1500, qty: 1 });
  updateCartUI();
  showToast(`✓ Sample pack from ${v.name} added. Open cart to confirm.`);
}

function messageVendor(vendorId) {
  const v = VENDORS.find((x) => x.id === vendorId);
  if (!v) return;
  showToast(`💬 Chat with ${v.name} opening...`);
}

// ====================================================
// CUSTOM PRINT DESIGNER
// ====================================================

function goDesigner() {
  appState.view = "designer";
  $("browse-view").classList.add("hidden");
  $("detail-view").classList.remove("show");
  $("designer-view").classList.add("show");

  const customVendors = VENDORS.filter((v) => v.cats.includes("custom"));
  $("supplier-select").innerHTML = customVendors
    .map((v) => {
      const m = getMarket(v.market);
      return `<option value="${v.id}">${v.name} · ${m?.city || ""} · ${v.lead}d</option>`;
    })
    .join("");

  $("fabric-base").style.backgroundImage = fabricBaseStyle("cotton");
  generate();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindOptionGroup(containerId, dataKey, onChange) {
  const container = $(containerId);
  if (!container) return;
  container.querySelectorAll("[data-" + dataKey + "]").forEach((el) => {
    el.addEventListener("click", () => {
      container.querySelectorAll("[data-" + dataKey + "]").forEach((e) => e.classList.remove("active"));
      el.classList.add("active");
      const value = el.dataset[dataKey];
      const stateKey = `design${dataKey.charAt(0).toUpperCase()}${dataKey.slice(1)}`;
      appState[stateKey] = value;
      if (onChange) onChange(value);
    });
  });
}

function hashStr(s) {
  let h = 0;
  for (const c of s) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

function makePrintPattern(style, color, seed) {
  const tile = 80;
  let inner = "";

  if (style === "geometric") {
    const variant = seed % 3;
    if (variant === 0)
      inner = `<polygon points="40,5 75,25 75,55 40,75 5,55 5,25" fill="${color}" opacity="0.85"/>
      <polygon points="40,20 60,30 60,50 40,60 20,50 20,30" fill="none" stroke="${color}" stroke-width="2"/>`;
    else if (variant === 1)
      inner = `<rect x="10" y="10" width="60" height="60" fill="none" stroke="${color}" stroke-width="3"/>
      <rect x="25" y="25" width="30" height="30" fill="${color}"/><circle cx="40" cy="40" r="6" fill="white"/>`;
    else
      inner = `<path d="M0,40 L40,0 L80,40 L40,80 Z" fill="${color}" opacity="0.7"/>
      <path d="M20,40 L40,20 L60,40 L40,60 Z" fill="white" opacity="0.6"/>`;
  } else if (style === "floral") {
    inner = `<g transform="translate(40,40)">
      ${[0, 60, 120, 180, 240, 300]
        .map((a) => `<ellipse cx="0" cy="-18" rx="8" ry="16" fill="${color}" opacity="0.85" transform="rotate(${a})"/>`)
        .join("")}
      <circle r="6" fill="${color}"/></g>
      <circle cx="10" cy="10" r="3" fill="${color}" opacity="0.5"/>
      <circle cx="70" cy="70" r="3" fill="${color}" opacity="0.5"/>`;
  } else if (style === "adire") {
    inner = `<circle cx="40" cy="40" r="22" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="40" cy="40" r="14" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="40" cy="40" r="6" fill="${color}"/>
      ${[
        [10, 10],
        [70, 10],
        [10, 70],
        [70, 70],
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="${color}"/>`)
        .join("")}`;
  } else {
    inner = `<path d="M10,40 Q30,10 50,40 T80,40" stroke="${color}" stroke-width="4" fill="none"/>
      <path d="M10,55 Q30,25 50,55 T80,55" stroke="${color}" stroke-width="3" fill="none" opacity="0.6"/>
      <circle cx="${20 + (seed % 30)}" cy="${20 + (seed % 30)}" r="8" fill="${color}" opacity="0.5"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${tile * 2}" height="${tile * 2}" viewBox="0 0 ${tile * 2} ${tile * 2}">
    <defs><pattern id="p" patternUnits="userSpaceOnUse" width="${tile}" height="${tile}">${inner}</pattern></defs>
    <rect width="100%" height="100%" fill="url(#p)"/></svg>`;
  return svgDataUri(svg);
}

function generate() {
  appState.designPrompt = $("prompt").value;
  const seed = hashStr(appState.designPrompt + appState.designStyle);

  const colorMap = {
    indigo: "#1d3a72",
    blue: "#1d3a72",
    red: "#c0392b",
    crimson: "#c0392b",
    green: "#27632a",
    emerald: "#27632a",
    gold: "#c8941a",
    yellow: "#c8941a",
    purple: "#5e2e8f",
    violet: "#5e2e8f",
    black: "#1a1a1a",
    rust: "#a0522d",
    orange: "#c1551c",
  };

  let color = appState.designColor;
  const lower = appState.designPrompt.toLowerCase();
  for (const [w, hex] of Object.entries(colorMap)) {
    if (lower.includes(w)) {
      color = hex;
      break;
    }
  }

  const render = $("render");
  const loading = document.createElement("div");
  loading.className = "loading";
  loading.innerHTML = '<div class="spinner"></div>Generating print...';
  render.appendChild(loading);

  window.setTimeout(() => {
    $("print-layer").style.backgroundImage = makePrintPattern(appState.designStyle, color, seed);
    $("print-layer").style.backgroundSize = "160px 160px";
    loading.remove();
  }, 900);
}

function sendCustomToSupplier() {
  const v = VENDORS.find((x) => String(x.id) === String($("supplier-select").value));
  if (!v) return;
  appState.cart.push({
    vendorId: v.id,
    vendorName: v.name,
    name: `Custom print: "${appState.designPrompt}"`,
    price: v.priceFrom + 2000,
    qty: v.moq,
  });
  updateCartUI();
  showToast(`✓ Custom print sent to ${v.name}. Sample in ${v.lead} days.`);
}

// ====================================================
// TOAST
// ====================================================

function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(window.__toastTO);
  window.__toastTO = window.setTimeout(() => t.classList.remove("show"), 3200);
}

// ====================================================
// EVENTS + INIT
// ====================================================

function wireEvents() {
  $("logo").addEventListener("click", goHome);
  $("loc-button").addEventListener("click", openLocationPicker);
  $("save-location").addEventListener("click", setLocation);

  $("search-input").addEventListener("input", onSearchInput);

  $("filter-state").addEventListener("change", applyFilters);
  $("filter-market").addEventListener("change", applyFilters);
  document.querySelectorAll(".filter-lead, .filter-moq").forEach((el) => el.addEventListener("change", applyFilters));
  $("clear-filters").addEventListener("click", clearFilters);

  document.querySelectorAll(".chip").forEach((c) => c.addEventListener("click", () => selectCategory(c.dataset.cat)));

  $("detail-back").addEventListener("click", goHome);
  $("designer-back").addEventListener("click", goHome);

  $("cart-button").addEventListener("click", openCart);
  $("drawer-close").addEventListener("click", closeCart);
  $("drawer-mask").addEventListener("click", closeCart);
  $("checkout").addEventListener("click", checkout);

  $("generate-btn").addEventListener("click", generate);
  $("send-custom").addEventListener("click", sendCustomToSupplier);

  bindOptionGroup("style-row", "style");
  bindOptionGroup("color-row", "color");
  bindOptionGroup("fabric-row", "fabric", () => {
    $("fabric-base").style.backgroundImage = fabricBaseStyle(appState.designFabric);
  });

  // Delegated clicks (vendor grid, category tiles, detail actions, cart remove)
  document.body.addEventListener("click", (e) => {
    const vendorCard = e.target.closest?.(".supplier-card");
    if (vendorCard) {
      const id = Number(vendorCard.dataset.vendor);
      openDetail(id);
      return;
    }

    const tile = e.target.closest?.(".cat-tile");
    if (tile) {
      selectCategory(tile.dataset.cat);
      return;
    }

    const actionBtn = e.target.closest?.("[data-action]");
    if (!actionBtn) return;

    const action = actionBtn.dataset.action;
    if (action === "add-to-cart") {
      const vendorId = Number(actionBtn.dataset.vendor);
      const name = decodeURIComponent(actionBtn.dataset.name || "");
      const price = Number(actionBtn.dataset.price);
      const qty = Number(actionBtn.dataset.moq);
      addToCart({ vendorId, name, price, qty });
      return;
    }

    if (action === "remove-cart") {
      removeFromCart(Number(actionBtn.dataset.idx));
      return;
    }

    if (action === "sample-pack") {
      requestSampleAll(Number(actionBtn.dataset.vendor));
      return;
    }

    if (action === "message") {
      messageVendor(Number(actionBtn.dataset.vendor));
    }
  });

  // Close modal when clicking outside the card
  $("loc-modal").addEventListener("click", (e) => {
    if (e.target === $("loc-modal")) closeLocationPicker();
  });
}

function init() {
  $("loc-display").textContent = `${appState.loc.city}, ${appState.loc.state}`;
  renderCategoryTiles();
  populateMarketFilter();
  renderSupplierGrid();
  updateCartUI();

  // Location modal defaults
  $("loc-state-select").innerHTML = Object.keys(STATE_CITIES).map((s) => `<option>${s}</option>`).join("");
  $("loc-state-select").value = appState.loc.state;
  populateLocationSelects();
}

document.addEventListener("DOMContentLoaded", () => {
  wireEvents();
  init();
});

