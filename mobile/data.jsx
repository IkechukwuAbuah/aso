// data.jsx — Aṣọ seed data for Lagos & beyond
// Real Naija textile markets, with hand-curated vendors per market.

const STATES = [
  { id: 'lagos', name: 'Lagos', cities: ['Lagos Island', 'Ikeja', 'Lekki', 'Yaba', 'Surulere', 'Ajah'] },
  { id: 'ogun',  name: 'Ogun',  cities: ['Abeokuta', 'Sango Ota', 'Ijebu Ode'] },
  { id: 'oyo',   name: 'Oyo',   cities: ['Ibadan', 'Iseyin', 'Ogbomosho'] },
  { id: 'kano',  name: 'Kano',  cities: ['Kano', 'Wudil'] },
  { id: 'kaduna',name: 'Kaduna',cities: ['Kaduna', 'Zaria'] },
  { id: 'anambra',name:'Anambra',cities:['Onitsha', 'Awka']},
];

const MARKETS = [
  { id: 'balogun',  name: 'Balogun Market',   city: 'Lagos Island', state: 'lagos', vibe: 'Lace, ankara, brocade — wholesale heart of Lagos', tag: 'Wholesale hub' },
  { id: 'idumota',  name: 'Idumota Market',   city: 'Lagos Island', state: 'lagos', vibe: 'Imported textiles, swiss lace, satin', tag: 'Imports' },
  { id: 'aswani',   name: 'Aswani Market',    city: 'Isolo',        state: 'lagos', vibe: 'Tuesday market — bargain ankara & adire', tag: 'Tuesday market' },
  { id: 'oke-arin', name: 'Oke Arin',         city: 'Lagos Island', state: 'lagos', vibe: 'Wholesale fabrics, accessories, beads', tag: 'Wholesale' },
  { id: 'tejuosho', name: 'Tejuosho Market',  city: 'Yaba',         state: 'lagos', vibe: 'Mixed fabrics, retail-friendly, easy access', tag: 'Retail-friendly' },
  { id: 'mushin',   name: 'Mushin Market',    city: 'Mushin',       state: 'lagos', vibe: 'Affordable plain & printed cottons', tag: 'Budget' },
  { id: 'lekki-art',name: 'Lekki Arts & Crafts', city: 'Lekki',     state: 'lagos', vibe: 'Curated adire, aso-oke, artisan goods', tag: 'Artisan' },
  { id: 'itoku',    name: 'Itoku Adire Market', city: 'Abeokuta',   state: 'ogun',  vibe: 'The home of Adire — indigo-dyed cotton', tag: 'Heritage' },
  { id: 'iseyin',   name: 'Iseyin Aso-Oke',   city: 'Iseyin',       state: 'oyo',   vibe: 'Hand-loomed Aso-Oke from master weavers', tag: 'Heritage' },
  { id: 'kantin',   name: 'Kantin Kwari',     city: 'Kano',         state: 'kano',  vibe: 'West Africa\u2019s largest textile market', tag: 'Wholesale' },
  { id: 'kofar',    name: 'Kofar Mata',       city: 'Kano',         state: 'kano',  vibe: 'Ancient indigo dye pits — 500+ years old', tag: 'Heritage' },
  { id: 'onitsha-main', name: 'Onitsha Main Market', city: 'Onitsha', state: 'anambra', vibe: 'Largest market in West Africa, full textile alley', tag: 'Wholesale' },
];

// Vendor seed — real-feeling Naija fabric sellers
const VENDORS = [
  {
    id: 'mama-bisi', name: 'Mama Bisi Textiles', market: 'balogun',
    proprietor: 'Mrs. Bisi Adekunle', years: 22,
    rating: 4.8, reviews: 312, eta: '15–25 min', distance: '2.3 km',
    minOrder: 2, deliveryFee: 1500,
    badges: ['Verified', 'Top seller'],
    specialties: ['Swiss Lace', 'Ankara', 'Brocade'],
    color: '#5260BB', accent: '#C9931E',
    bio: 'Three generations on Balogun Street. Stocks Swiss lace, premium ankara, and brocade by the bale.',
    open: true, hours: '7:00 – 18:30',
  },
  {
    id: 'adire-heritage', name: 'Adire Heritage Mills', market: 'itoku',
    proprietor: 'Iya Sade Ogundipe', years: 35,
    rating: 4.9, reviews: 198, eta: '2–3 days', distance: '92 km',
    minOrder: 1, deliveryFee: 3500,
    badges: ['Verified', 'Heritage', 'Custom prints'],
    specialties: ['Adire Eleko', 'Adire Oniko', 'Indigo Cotton'],
    color: '#1B2150', accent: '#FBF7EE',
    bio: 'Hand-dyed Adire from Itoku. Indigo pits maintained by Iya Sade since 1991.',
    open: true, hours: '8:00 – 17:00',
  },
  {
    id: 'aso-oke-iseyin', name: 'Iseyin Master Weavers', market: 'iseyin',
    proprietor: 'Alhaji Tunde Olayinka', years: 41,
    rating: 4.9, reviews: 87, eta: '3–5 days', distance: '210 km',
    minOrder: 1, deliveryFee: 5000,
    badges: ['Verified', 'Heritage', 'Hand-loomed'],
    specialties: ['Aso-Oke', 'Sanyan', 'Etu', 'Alaari'],
    color: '#8A3A1F', accent: '#C9931E',
    bio: 'Cooperative of 14 Iseyin master weavers. 100% hand-loomed on traditional pit looms.',
    open: true, hours: 'By appointment',
  },
  {
    id: 'chuks-lace', name: 'Chuks Lace Empire', market: 'idumota',
    proprietor: 'Chukwuemeka Nwosu', years: 14,
    rating: 4.6, reviews: 421, eta: '20–35 min', distance: '3.1 km',
    minOrder: 2, deliveryFee: 2000,
    badges: ['Verified', 'Imports'],
    specialties: ['Swiss Lace', 'French Lace', 'Sequin'],
    color: '#3D4AA0', accent: '#E4B85B',
    bio: 'Direct importer of Swiss & French lace. Bridal specialist. Container arrives Wednesdays.',
    open: true, hours: '8:00 – 19:00',
  },
  {
    id: 'mama-ngozi', name: 'Mama Ngozi Ankara', market: 'aswani',
    proprietor: 'Ngozi Eze', years: 18,
    rating: 4.7, reviews: 256, eta: '25–40 min', distance: '5.4 km',
    minOrder: 3, deliveryFee: 1800,
    badges: ['Verified', 'Tuesday market'],
    specialties: ['Ankara', 'Hollandais', 'Vlisco'],
    color: '#2E8B4F', accent: '#C45A2C',
    bio: 'Best ankara prices in Lagos every Tuesday. Hollandais & Vlisco wax prints, full bales.',
    open: true, hours: 'Tue 6:00 – 18:00',
  },
  {
    id: 'kano-kwari', name: 'Kantin Kwari Wholesale', market: 'kantin',
    proprietor: 'Alhaji Musa Yusuf', years: 27,
    rating: 4.5, reviews: 142, eta: '4–7 days', distance: '980 km',
    minOrder: 5, deliveryFee: 8000,
    badges: ['Verified', 'Wholesale'],
    specialties: ['Atampa', 'Guinea Brocade', 'Shadda'],
    color: '#0E1330', accent: '#C9931E',
    bio: 'Wholesale only. Atampa, shadda, and guinea brocade direct from Kano.',
    open: true, hours: '6:00 – 19:00',
  },
  {
    id: 'lekki-curated', name: 'Aṣọ Lagos Studio', market: 'lekki-art',
    proprietor: 'Folake Akande', years: 6,
    rating: 4.9, reviews: 89, eta: '30–60 min', distance: '8.2 km',
    minOrder: 1, deliveryFee: 2500,
    badges: ['Verified', 'Custom prints', 'Designer-friendly'],
    specialties: ['Curated Adire', 'Linen', 'Custom prints'],
    color: '#C45A2C', accent: '#1B2150',
    bio: 'Curated heritage textiles for designers. Sample-friendly, custom print collaborations.',
    open: true, hours: '10:00 – 19:00',
  },
  {
    id: 'kofar-indigo', name: 'Kofar Mata Indigo', market: 'kofar',
    proprietor: 'Mallam Ibrahim Aliyu', years: 50,
    rating: 5.0, reviews: 34, eta: '5–7 days', distance: '975 km',
    minOrder: 1, deliveryFee: 6000,
    badges: ['Heritage', 'Hand-dyed'],
    specialties: ['Indigo Cotton', 'Tie-dye', 'Resist-dye'],
    color: '#0E1330', accent: '#FBF7EE',
    bio: 'Working dye pits since 1498. Each bolt cured 3 weeks in fermented indigo.',
    open: true, hours: '7:00 – 16:00',
  },
];

// Fabric catalog — each tied to a vendor
const FABRICS = [
  { id: 'f1',  vendor: 'mama-bisi', name: 'Royal Swiss Lace — Cobalt', material: 'Swiss Lace', color: '#1B3A8A', price: 18500, unit: '5 yards', stock: 14, customizable: false, tag: 'Bestseller' },
  { id: 'f2',  vendor: 'mama-bisi', name: 'Hollandais Wax — Ife Spiral', material: 'Wax Print', color: '#C9931E', price: 8500, unit: '6 yards', stock: 32, customizable: false },
  { id: 'f3',  vendor: 'mama-bisi', name: 'Brocade — Champagne', material: 'Brocade', color: '#E4B85B', price: 12000, unit: '5 yards', stock: 8, customizable: false },
  { id: 'f4',  vendor: 'adire-heritage', name: 'Adire Eleko — Olokun', material: 'Adire / Cotton', color: '#1B2150', price: 14500, unit: '5 yards', stock: 6, customizable: true, tag: 'Custom available' },
  { id: 'f5',  vendor: 'adire-heritage', name: 'Adire Oniko — Moonbloom', material: 'Adire / Cotton', color: '#2A3478', price: 13800, unit: '5 yards', stock: 11, customizable: true },
  { id: 'f6',  vendor: 'adire-heritage', name: 'Indigo Plain — Deep Well', material: 'Cotton', color: '#0E1330', price: 9500, unit: '5 yards', stock: 24, customizable: true },
  { id: 'f7',  vendor: 'aso-oke-iseyin', name: 'Sanyan — Honey Stripe', material: 'Aso-Oke', color: '#C9931E', price: 38000, unit: '4 yards', stock: 3, customizable: false, tag: 'Heritage' },
  { id: 'f8',  vendor: 'aso-oke-iseyin', name: 'Alaari — Crimson Royal', material: 'Aso-Oke', color: '#8A1F1F', price: 42000, unit: '4 yards', stock: 2, customizable: false },
  { id: 'f9',  vendor: 'chuks-lace', name: 'French Lace — Ivory Bridal', material: 'French Lace', color: '#F5EFE0', price: 28000, unit: '5 yards', stock: 7, customizable: false, tag: 'Bridal' },
  { id: 'f10', vendor: 'chuks-lace', name: 'Sequin Net — Champagne', material: 'Sequin', color: '#E4B85B', price: 22000, unit: '5 yards', stock: 5, customizable: false },
  { id: 'f11', vendor: 'mama-ngozi', name: 'Vlisco — Sunrise Diamond', material: 'Wax Print', color: '#C45A2C', price: 11500, unit: '6 yards', stock: 18, customizable: false },
  { id: 'f12', vendor: 'mama-ngozi', name: 'Ankara — Garden Bloom', material: 'Ankara', color: '#2E8B4F', price: 6500, unit: '6 yards', stock: 41, customizable: false, tag: 'Tuesday deal' },
  { id: 'f13', vendor: 'lekki-curated', name: 'Linen — Cassava Cream', material: 'Linen', color: '#F5EFE0', price: 16000, unit: '5 yards', stock: 12, customizable: true, tag: 'Custom available' },
  { id: 'f14', vendor: 'lekki-curated', name: 'Linen — Palm Leaf', material: 'Linen', color: '#1F5E3A', price: 16000, unit: '5 yards', stock: 9, customizable: true },
  { id: 'f15', vendor: 'kofar-indigo', name: 'Kofar Indigo — Fermented 21d', material: 'Cotton / Indigo', color: '#0E1330', price: 19500, unit: '5 yards', stock: 4, customizable: true, tag: 'Heritage' },
  { id: 'f16', vendor: 'kano-kwari', name: 'Atampa — Sahara Gold', material: 'Atampa', color: '#C9931E', price: 5500, unit: '6 yards', stock: 60, customizable: false, tag: 'Wholesale' },
];

const CATEGORIES = [
  { id: 'adire',   name: 'Adire',     icon: '◐' },
  { id: 'aso-oke', name: 'Aṣọ-Oke',   icon: '▤' },
  { id: 'ankara',  name: 'Ankara',    icon: '✦' },
  { id: 'lace',    name: 'Lace',      icon: '❀' },
  { id: 'linen',   name: 'Linen',     icon: '◇' },
  { id: 'brocade', name: 'Brocade',   icon: '◈' },
  { id: 'wax',     name: 'Wax Print', icon: '◉' },
  { id: 'custom',  name: 'Custom Print', icon: '✦' },
];

// helpers
const fmt = (n) => '₦' + n.toLocaleString('en-NG');
const vendorById = (id) => VENDORS.find(v => v.id === id);
const fabricById = (id) => FABRICS.find(f => f.id === id);
const marketById = (id) => MARKETS.find(m => m.id === id);
const fabricsByVendor = (vid) => FABRICS.filter(f => f.vendor === vid);
const vendorsByMarket = (mid) => VENDORS.filter(v => v.market === mid);

Object.assign(window, {
  STATES, MARKETS, VENDORS, FABRICS, CATEGORIES,
  fmt, vendorById, fabricById, marketById, fabricsByVendor, vendorsByMarket,
});
