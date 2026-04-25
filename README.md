# Aṣọ — Glovo for Naija fabric (Hackathon Demo)

**Problem:** Fashion designers can’t reliably find *local* fabric suppliers (discovery + trust).  
**Solution:** A marketplace that matches designers to verified textile vendors across Nigerian markets — with **location-based browsing**, **search/filters**, **vendor detail + inventory**, **cart + sample request**, and a **custom print (AI-style) flow**.

## What’s in this repo

- `index.html`: **Entry point** (deploy this).  
- `assets/`: CSS + JS for the demo.  
- `aso-demo.html`: Original single-file version (kept for reference).  
- `aso-pitch-plan.md`: Pitch + 90s demo script.  
- `fabriq-demo.html`: Earlier prototype (kept for reference).
- `aso/Aṣọ.html`: **Mobile design prototype** — 13-screen React build from Claude Design (full demo flow in a phone frame). Requires a local HTTP server.

## Run locally

No install needed.

1. Open `index.html` in a browser (Chrome recommended).
2. Demo flow:
   - Set **location** (state/city)
   - **Search** / filter vendors
   - Open a vendor → add items to **cart**
   - Confirm **sample requests**
   - Go to **Custom Print** → generate → “Send to mill”

For the mobile design prototype (`aso/Aṣọ.html`):

1. From the repo root, start a static server: `python3 -m http.server 8765`
2. Open <http://localhost:8765/aso/A%E1%B9%A3%E1%BB%8D.html>
3. Click the “Full prototype” artboard, then walk: location → home → vendor → fabric → cart → checkout → success.

## Demo talking points (quick)

- Uses **real Naija markets** (Balogun, Itoku, Tejuosho, Aswani, Kantin Kwari, Ariaria, Onitsha, Akwete…)
- Filters by **state / market / MOQ / lead time**
- “Wow” moment: **custom prints** rendered onto fabric texture and routed to local print studios

## License

MIT (add one if you want to open-source properly).

