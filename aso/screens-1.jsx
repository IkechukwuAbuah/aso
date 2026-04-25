// screens.jsx — All Aṣọ app screens.

const { useState: uS, useMemo: uM, useEffect: uE } = React;

// ─── ONBOARDING / LOCATION PICKER ──────────────────────────────────────
function OnboardingScreen({ onContinue }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--indigo-900)', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <StatusBar dark />
      {/* Adire-pattern hero background */}
      <div className="bg-adire" style={{ position: 'absolute', inset: 0, opacity: 0.9 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(14,19,48,0) 30%, rgba(14,19,48,0.95) 80%)' }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '40px 24px 0' }}>
        <Logo light size={36} />
      </div>

      {/* fabric stack illustration mid-screen */}
      <div style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ width: 220, height: 280, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: '20px 40px 40px 0', borderRadius: 14, overflow: 'hidden', transform: 'rotate(-8deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <FabricSwatch kind="aso-oke" color="#8A3A1F" accent="#C9931E" size={220} />
          </div>
          <div style={{ position: 'absolute', inset: '0 20px 60px 20px', borderRadius: 14, overflow: 'hidden', transform: 'rotate(4deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <FabricSwatch kind="adire" color="#1B2150" accent="#FBF7EE" size={220} />
          </div>
          <div style={{ position: 'absolute', inset: '40px 0 20px 40px', borderRadius: 14, overflow: 'hidden', transform: 'rotate(-3deg)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <FabricSwatch kind="ankara" color="#2E8B4F" accent="#C45A2C" size={220} />
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '0 24px 36px' }}>
        <h1 style={{ fontSize: 34, fontWeight: 900, lineHeight: 1.05, margin: '0 0 12px', letterSpacing: '-0.02em' }}>
          Naija fabric,<br/>delivered.
        </h1>
        <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,0.75)', margin: '0 0 28px' }}>
          From Balogun to Iseyin. Browse 400+ vendors across 12 markets. Sample today, design tomorrow.
        </p>
        <Btn full size="lg" variant="clay" onClick={onContinue}>Set my location →</Btn>
        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
          Already have an account? <span style={{ color: 'var(--gold-300)', fontWeight: 600 }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

// ─── LOCATION PICKER ───────────────────────────────────────────────────
function LocationScreen({ onPick, onBack }) {
  const [state, setState] = uS('lagos');
  const stateData = STATES.find(s => s.id === state);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar left={<BackBtn onClick={onBack} />} title="Where are you?" subtitle="We use this to show nearby markets and vendors" />
      <div style={{ padding: 16, flex: 1, overflow: 'auto' }} className="no-scroll">
        <div className="t-micro" style={{ marginBottom: 8 }}>State</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
          {STATES.map(s => <Chip key={s.id} active={state === s.id} onClick={() => setState(s.id)}>{s.name}</Chip>)}
        </div>

        <div className="t-micro" style={{ marginBottom: 8 }}>City / area</div>
        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid var(--line)', overflow: 'hidden' }}>
          {stateData.cities.map((c, i) => (
            <button key={c} onClick={() => onPick({ state, city: c })} style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%',
              padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer',
              borderBottom: i < stateData.cities.length - 1 ? '1px solid var(--line-soft)' : 'none',
              fontFamily: 'var(--font-brand)', textAlign: 'left',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--cream-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5 1.5 3 3.8 3 6.5c0 4 5 8 5 8s5-4 5-8C13 3.8 11 1.5 8 1.5z" stroke="var(--indigo-900)" strokeWidth="1.5"/><circle cx="8" cy="6.5" r="1.7" fill="var(--indigo-900)"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink-900)' }}>{c}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{stateData.name}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="var(--ink-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>

        <button onClick={() => onPick({ state: 'lagos', city: 'Lekki', useGPS: true })} style={{
          marginTop: 20, width: '100%', padding: '14px 16px',
          background: '#fff', border: '1px dashed var(--indigo-500)', borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontFamily: 'var(--font-brand)',
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="3" stroke="var(--indigo-700)" strokeWidth="1.5"/><circle cx="9" cy="9" r="7" stroke="var(--indigo-700)" strokeWidth="1.5"/><path d="M9 1v3M9 14v3M1 9h3M14 9h3" stroke="var(--indigo-700)" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--indigo-700)' }}>Use my current location</span>
        </button>
      </div>
    </div>
  );
}

// ─── HOME ──────────────────────────────────────────────────────────────
function HomeScreen({ location, cart, goto, onAddCart }) {
  const featured = VENDORS.slice(0, 6);
  const local = VENDORS.filter(v => marketById(v.market)?.state === location.state).slice(0, 4);
  const trending = FABRICS.slice(0, 6);
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      {/* Custom header */}
      <div style={{ padding: '8px 16px 12px', background: 'transparent' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button onClick={() => goto('location')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'var(--font-brand)', textAlign: 'left' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--ink-500)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>Delivering to</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-900)' }}>{location.city}</span>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 4.5l3 3 3-3" stroke="var(--ink-900)" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>
              </div>
            </div>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <IconBtn>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 015 5v3l1.5 2H2.5L4 10V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 14a2 2 0 004 0" stroke="currentColor" strokeWidth="1.5"/></svg>
            </IconBtn>
          </div>
        </div>
        <SearchField placeholder="Search Adire, Aso-Oke, Lace…" onClick={() => goto('search')} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 16 }} className="no-scroll">
        {/* Hero strip — custom prints CTA */}
        <div style={{ padding: '4px 16px 18px' }}>
          <button onClick={() => goto('designer')} style={{
            width: '100%', padding: 0, border: 'none', cursor: 'pointer',
            borderRadius: 18, overflow: 'hidden', position: 'relative',
            background: 'var(--indigo-900)', textAlign: 'left',
            boxShadow: 'var(--sh-md)',
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.6 }}>
              <FabricSwatch kind="custom" color="#1B2150" accent="#C9931E" size={400} prompt="hero" />
            </div>
            <div style={{ position: 'relative', padding: 18, color: '#fff', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <Badge tone="gold">NEW</Badge>
                <div style={{ fontSize: 19, fontWeight: 800, lineHeight: 1.1, marginTop: 6, letterSpacing: '-0.01em' }}>Custom prints,<br/>any fabric.</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>Describe it. We render it. Ships from Itoku in 5 days.</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--clay-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </button>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 20 }}>
          <SectionHead title="Browse by material" />
          <div style={{ display: 'flex', gap: 10, overflow: 'auto', padding: '0 16px' }} className="no-scroll">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => goto('search', { category: c.id })} style={{
                flexShrink: 0, width: 76, padding: 12,
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 14, cursor: 'pointer', textAlign: 'center',
                fontFamily: 'var(--font-brand)',
              }}>
                <div style={{ width: 44, height: 44, margin: '0 auto 6px', borderRadius: 12, background: 'var(--cream-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: 'var(--indigo-700)' }}>{c.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--ink-900)' }}>{c.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Vendors near you */}
        <div style={{ marginBottom: 20 }}>
          <SectionHead title="Vendors near you" action="See all" onAction={() => goto('search')} />
          <div style={{ display: 'flex', gap: 12, overflow: 'auto', padding: '0 16px' }} className="no-scroll">
            {local.map(v => <VendorCard key={v.id} vendor={v} onClick={() => goto('vendor', { id: v.id })} />)}
          </div>
        </div>

        {/* Trending fabrics */}
        <div style={{ marginBottom: 20 }}>
          <SectionHead title="Trending in Lagos" action="See all" onAction={() => goto('search')} />
          <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {trending.slice(0, 4).map(f => <FabricCard key={f.id} fabric={f} onClick={() => goto('fabric', { id: f.id })} />)}
          </div>
        </div>

        {/* Markets */}
        <div style={{ marginBottom: 8 }}>
          <SectionHead title="Heritage markets" />
          <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MARKETS.filter(m => m.tag === 'Heritage').slice(0, 3).map(m => (
              <button key={m.id} onClick={() => goto('search', { market: m.id })} style={{
                display: 'flex', gap: 12, padding: 12,
                background: '#fff', border: '1px solid var(--line)',
                borderRadius: 14, cursor: 'pointer', textAlign: 'left', width: '100%',
                fontFamily: 'var(--font-brand)',
              }}>
                <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                  <FabricSwatch kind={m.id === 'iseyin' ? 'aso-oke' : 'adire'} color="#1B2150" accent="#C9931E" size={56} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{m.name}</span>
                    <Badge tone="gold">{m.tag}</Badge>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{m.city} · {vendorsByMarket(m.id).length} vendors</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-700)', marginTop: 4, lineHeight: 1.35 }}>{m.vibe}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── VENDOR CARD ──────────────────────────────────────────────────────
function VendorCard({ vendor, onClick }) {
  return (
    <button onClick={onClick} style={{
      flexShrink: 0, width: 200, padding: 0,
      background: '#fff', border: '1px solid var(--line)',
      borderRadius: 14, overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
      fontFamily: 'var(--font-brand)',
    }}>
      <div style={{ height: 90, position: 'relative', overflow: 'hidden' }}>
        <FabricSwatch kind={vendor.specialties[0]?.toLowerCase().includes('adire') ? 'adire' : vendor.specialties[0]?.toLowerCase().includes('aso') ? 'aso-oke' : vendor.specialties[0]?.toLowerCase().includes('lace') ? 'lace' : 'ankara'} color={vendor.color} accent={vendor.accent} size={200} />
        {vendor.badges.includes('Heritage') && (
          <div style={{ position: 'absolute', top: 8, left: 8 }}><Badge tone="gold">Heritage</Badge></div>
        )}
        <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(255,255,255,0.95)', padding: '3px 7px', borderRadius: 999, fontSize: 11, fontWeight: 700, color: 'var(--ink-900)', display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{ color: 'var(--gold-500)' }}>★</span> {vendor.rating}
        </div>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.2 }}>{vendor.name}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 3 }}>{marketById(vendor.market)?.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 11, color: 'var(--ink-700)' }}>
          <span>⏱ {vendor.eta}</span>
          <span style={{ color: 'var(--line)' }}>·</span>
          <span>{vendor.distance}</span>
        </div>
      </div>
    </button>
  );
}

// ─── FABRIC CARD ──────────────────────────────────────────────────────
function FabricCard({ fabric, onClick, compact }) {
  const v = vendorById(fabric.vendor);
  return (
    <button onClick={onClick} style={{
      padding: 0, background: '#fff', border: '1px solid var(--line)',
      borderRadius: 12, overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
      fontFamily: 'var(--font-brand)', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ aspectRatio: '1 / 1', position: 'relative', overflow: 'hidden' }}>
        <FabricSwatch kind={fabricKind(fabric)} color={fabric.color} accent={pickAccent(fabric.color)} size={200} />
        {fabric.tag && <div style={{ position: 'absolute', top: 8, left: 8 }}><Badge tone={fabric.tag === 'Heritage' ? 'gold' : fabric.tag.includes('Custom') ? 'clay' : 'indigo'}>{fabric.tag}</Badge></div>}
      </div>
      <div style={{ padding: 10 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{fabric.name}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{v?.name}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
          <span className="t-naira" style={{ fontSize: 14, color: 'var(--ink-900)' }}>{fmt(fabric.price)}</span>
          <span style={{ fontSize: 11, color: 'var(--ink-500)' }}>/ {fabric.unit}</span>
        </div>
      </div>
    </button>
  );
}

Object.assign(window, { OnboardingScreen, LocationScreen, HomeScreen, VendorCard, FabricCard });
