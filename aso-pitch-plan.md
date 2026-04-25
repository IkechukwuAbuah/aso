# Aṣọ — Hackathon Pitch & Plan

**One-liner:** Glovo for Naija fabric. From Balogun to Itoku in 48 hours.

---

## The 60-second pitch (memorize this)

> "Maya is a fashion designer in Lekki. Last month she spent **three weeks** on WhatsApp trying to source 30 metres of authentic Adire from Abeokuta. She got ghosted by two vendors, overcharged by one, and almost gave up on the collection.
>
> The problem isn't supply — Nigeria has the biggest textile markets in West Africa. Balogun, Itoku, Aswani, Kantin Kwari. The problem is **discovery and trust**. Designers can't find verified vendors. Vendors can't reach designers beyond who walks past their stall.
>
> Aṣọ fixes that. Browse 18 verified vendors across 9 markets and 8 states. Search any fabric — Adire, Aso Oke, Akwete, Atiku, lace. Filter by state, market, lead time, MOQ. Order samples to your door in 48 hours. And when you can't find what you want — design it. Our AI generates custom prints rendered on real Naija fabric, then routes the order to a print mill in Ikeja or Tejuosho.
>
> One marketplace. Real markets. Verified vendors. From the loom to your studio."

---

## Demo script (live, 90 seconds)

**Setup line:** "Let me show you how Maya finds Adire today."

1. **Land on the homepage.** Point at the location pin. *"She's in Lekki Phase 1. The app already knows."*

2. **Click the Adire chip.** *"Filters to 1 vendor — Adire Oodua House at Itoku Market in Abeokuta. The Adire capital. Rated 4.9, 5-day delivery, MOQ 8m."*

3. **Open the vendor.** *"Real stall ID. Real market. Real inventory — Eleko, indigo cotton, Kampala tie-dye. Each item is priced in Naira, MOQ shown."* Add Adire Eleko to cart.

4. **Search "Aso Oke."** *"Mama Iseyin Aso Oke from Iseyin — the only place in Nigeria that hand-looms it. 14-day delivery, but it's the real deal."* Add Sanyan silk.

5. **Click Custom Print.** *"This is what we're proudest of. Maya types her vision."* Type something like: `floral Asoebi, deep emerald and rust`. Hit Generate.

6. **Pause on the render.** *"AI-generated pattern, rendered on actual linen using blend modes — what it'll look like off the press. Send to Tunde Print Studio in Tejuosho. 7 days, sample at her door."*

7. **Open the cart.** *"Three vendors, three markets, one checkout. Sample requests fire to all three at once."* Click Confirm.

**Closing line:** "Three weeks of WhatsApp → 90 seconds in Aṣọ."

---

## What we built today (the slide)

- **18 verified vendors** across **9 textile markets** in **8 states**
- **10 fabric categories** including Adire, Aso Oke, Akwete, Atiku, George, lace, Ankara/wax
- **Live search** by fabric, market, vendor, city
- **Filters** by state, market, MOQ, lead time
- **Cart + sample request flow** with Naira pricing
- **AI custom print designer** — prompt → pattern → rendered on real fabric → routed to a print mill
- **Mobile-friendly** single-page experience

Built in **40 minutes**. Zero backend. Demo-ready.

---

## What ships next — 4-week roadmap

**Week 1 — Vendor onboarding**
- Field team visits 5 markets (Balogun, Itoku, Tejuosho, Onitsha, Aswani)
- Onboard 50 verified vendors with photos, real inventory, WhatsApp contact
- KYC: business registration check, market stall confirmation

**Week 2 — Real backend**
- Postgres + simple admin panel for vendors to update inventory
- WhatsApp Business API integration — sample requests fire as WhatsApp messages
- Payment: Paystack integration for sample fees + escrow on bulk orders

**Week 3 — Logistics**
- Partner with GIG Logistics or Kwik for inter-state delivery
- 48-hour SLA within Lagos, 5-day for inter-state
- In-app tracking

**Week 4 — Designer tools**
- Real generative AI for prints (replace SVG patterns with Stable Diffusion / DALL-E)
- Mood board feature — designers save inspiration, vendors get matched
- Asoebi bulk-order coordination (one designer, 50 bridesmaids, one fabric)

---

## How we make money

| Revenue stream | Detail | Take rate |
|---|---|---|
| **Transaction fee** | On every order through the platform | 8–12% |
| **Vendor verification** | Annual fee for "Verified" badge | ₦25k/year |
| **Custom print premium** | AI-generated print orders | 15% |
| **Logistics margin** | Markup on partner delivery | 5–10% |
| **Boost listings** | Vendors pay to appear at top | ₦5k/month |

**Unit economics (target):** Avg order ₦35,000. Take rate 10% = ₦3,500. CAC for designers via Instagram ~ ₦2,000. **LTV/CAC > 5x within 6 months** if designers re-order monthly.

---

## Market size (the why-now slide)

- Nigerian fashion industry: **$5B+ annually**, growing 15% YoY
- Lagos alone: 50,000+ registered fashion designers and tailors
- Balogun Market: estimated **₦200B in annual textile trade** — virtually all offline
- Adire (Abeokuta) export market: $40M, growing as Afrobeats culture exports globally
- Closest analogues: **Glovo** (food/local commerce, $1B+ valuation in Africa), **Jiji** (classifieds, $200M+ raised)

We're not creating demand. We're digitizing a market that already exists.

---

## Why this wins (judging angle)

1. **Authentically Nigerian.** Not a generic marketplace clone. We named real markets, real fabrics, real stalls.
2. **Both sides win immediately.** Vendors get reach beyond their stall. Designers get verified discovery.
3. **AI custom print is a moat.** No one else lets you describe a print and route it to a Naija mill.
4. **Massive offline market.** Glovo did it for restaurants. We do it for fabric.
5. **Built in 40 min, demoable today.** Imagine in 4 weeks.

---

## The ask (closing slide)

> "₦5M pre-seed for 4 weeks of vendor onboarding, backend build, and a Lagos pilot.
> Goal: 200 verified vendors, 1,000 designers, ₦20M GMV by month 3.
> We've already built the product. We're here to build the market."

---

## Cheat sheet — names & places to drop in the pitch

**Markets to mention:** Balogun (Lagos Island), Itoku (Abeokuta — Adire), Iseyin (Aso Oke), Tejuosho (Yaba), Aswani (Wednesday market), Kantin Kwari (Kano), Ariaria (Aba), Onitsha Main, Akwete.

**Fabric vocabulary that signals authenticity:** Adire Eleko, Aso Oke, Sanyan, Akwete, Atiku, Senator material, George wrapper, Hollandais wax, Vlisco, Hitarget, French lace, cord lace, Asoebi, Owambe.

**Pain words for the problem slide:** "Three weeks on WhatsApp." "Ghosted by vendors." "No way to verify quality." "Can't reach designers in Abuja from a stall in Aba." "Custom prints? Travel to China."

---

## Final 25-minute checklist

- [ ] Open `aso-demo.html`, click through the full flow once
- [ ] Decide who delivers the pitch (one voice, 60 sec)
- [ ] Decide who runs the demo (one hand on keyboard)
- [ ] Rehearse twice end-to-end with a timer
- [ ] Have a backup screen recording in case wifi dies
- [ ] Pick your closing line — make it memorable

**You've got this.**
