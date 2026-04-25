// screens-2.jsx — Search, vendor detail, fabric detail screens.

const { useState: u2S, useMemo: u2M } = React;

// ─── SEARCH / DISCOVERY ───────────────────────────────────────────────
function SearchScreen({ initialFilters, location, goto, onAddCart }) {
  const [q, setQ] = u2S('');
  const [filters, setFilters] = u2S(initialFilters || {});
  const [filterOpen, setFilterOpen] = u2S(false);

  const results = u2M(() => {
    return FABRICS.filter(f => {
      if (q && !(`${f.name} ${f.material}`).toLowerCase().includes(q.toLowerCase())) return false;
      const v = vendorById(f.vendor);
      const m = marketById(v.market);
      if (filters.market && v.market !== filters.market) return false;
      if (filters.state && m.state !== filters.state) return false;
      if (filters.city && m.city !== filters.city) return false;
      if (filters.category) {
        const cat = filters.category;
        const mat = f.material.toLowerCase();
        if (cat === 'adire' && !mat.includes('adire')) return false;
        else if (cat === 'aso-oke' && !mat.includes('aso')) return false;
        else if (cat === 'ankara' && !mat.includes('ankara')) return false;
        else if (cat === 'lace' && !mat.includes('lace')) return false;
        else if (cat === 'linen' && !mat.includes('linen')) return false;
        else if (cat === 'brocade' && !(mat.includes('brocade') || mat.includes('atampa'))) return false;
        else if (cat === 'wax' && !mat.includes('wax')) return false;
        else if (cat === 'custom' && !f.customizable) return false;
      }
      if (filters.maxPrice && f.price > filters.maxPrice) return false;
      return true;
    });
  }, [q, filters]);

  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar
        left={<BackBtn onClick={() => goto('home')} />}
        title="Search fabrics"
        subtitle={`${results.length} results in ${location.city}`}
      />
      <div style={{ padding: '8px 16px 12px', background: '#fff', borderBottom: '1px solid var(--line-soft)' }}>
        <SearchField value={q} onChange={setQ} placeholder="Adire, lace, indigo cotton…" autoFocus />
        <div style={{ display: 'flex', gap: 8, overflow: 'auto', marginTop: 12 }} className="no-scroll">
          <Chip active={!!activeCount} onClick={() => setFilterOpen(true)} icon={
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 3h9M3 6.5h7M5 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          }>Filters {activeCount ? `(${activeCount})` : ''}</Chip>
          {CATEGORIES.slice(0, 6).map(c => (
            <Chip key={c.id} active={filters.category === c.id} onClick={() => setFilters(f => ({ ...f, category: f.category === c.id ? null : c.id }))}>{c.name}</Chip>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 16 }} className="no-scroll">
        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--ink-500)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>◌</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-900)' }}>No fabrics match these filters</div>
            <div style={{ fontSize: 12, marginTop: 6 }}>Try removing the city or material filter.</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {results.map(f => <FabricCard key={f.id} fabric={f} onClick={() => goto('fabric', { id: f.id })} />)}
          </div>
        )}
      </div>

      <Sheet open={filterOpen} onClose={() => setFilterOpen(false)} title="Filters" height="85%">
        <FiltersPanel filters={filters} setFilters={setFilters} onClose={() => setFilterOpen(false)} />
      </Sheet>
    </div>
  );
}

function FiltersPanel({ filters, setFilters, onClose }) {
  const [draft, setDraft] = u2S(filters);
  const stateData = STATES.find(s => s.id === draft.state);
  const marketsForLoc = MARKETS.filter(m => (!draft.state || m.state === draft.state) && (!draft.city || m.city === draft.city));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflow: 'auto', padding: '8px 20px 20px' }} className="no-scroll">
        <div className="t-micro" style={{ marginBottom: 8, marginTop: 8 }}>State</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Chip active={!draft.state} onClick={() => setDraft(d => ({ ...d, state: null, city: null }))}>All</Chip>
          {STATES.map(s => <Chip key={s.id} active={draft.state === s.id} onClick={() => setDraft(d => ({ ...d, state: s.id, city: null }))}>{s.name}</Chip>)}
        </div>

        {draft.state && (
          <>
            <div className="t-micro" style={{ marginBottom: 8 }}>City</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              <Chip active={!draft.city} onClick={() => setDraft(d => ({ ...d, city: null }))}>All</Chip>
              {stateData?.cities.map(c => <Chip key={c} active={draft.city === c} onClick={() => setDraft(d => ({ ...d, city: c }))}>{c}</Chip>)}
            </div>
          </>
        )}

        <div className="t-micro" style={{ marginBottom: 8 }}>Market</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Chip active={!draft.market} onClick={() => setDraft(d => ({ ...d, market: null }))}>All</Chip>
          {marketsForLoc.map(m => <Chip key={m.id} active={draft.market === m.id} onClick={() => setDraft(d => ({ ...d, market: m.id }))}>{m.name}</Chip>)}
        </div>

        <div className="t-micro" style={{ marginBottom: 8 }}>Material</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          <Chip active={!draft.category} onClick={() => setDraft(d => ({ ...d, category: null }))}>All</Chip>
          {CATEGORIES.map(c => <Chip key={c.id} active={draft.category === c.id} onClick={() => setDraft(d => ({ ...d, category: c.id }))}>{c.name}</Chip>)}
        </div>

        <div className="t-micro" style={{ marginBottom: 8 }}>Max price per unit</div>
        <div style={{ background: 'var(--cream-100)', borderRadius: 12, padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-500)' }}>Up to</span>
            <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }} className="t-naira">{fmt(draft.maxPrice || 50000)}</span>
          </div>
          <input type="range" min="3000" max="50000" step="500" value={draft.maxPrice || 50000} onChange={e => setDraft(d => ({ ...d, maxPrice: +e.target.value }))} style={{ width: '100%', accentColor: 'var(--indigo-900)' }} />
        </div>
      </div>
      <div style={{ padding: '12px 20px 24px', display: 'flex', gap: 10, borderTop: '1px solid var(--line-soft)' }}>
        <Btn variant="secondary" onClick={() => setDraft({})}>Clear</Btn>
        <Btn full variant="primary" onClick={() => { setFilters(draft); onClose(); }}>Apply</Btn>
      </div>
    </div>
  );
}

// ─── VENDOR DETAIL ─────────────────────────────────────────────────────
function VendorScreen({ vendorId, goto, onAddCart, cart }) {
  const v = vendorById(vendorId);
  const m = marketById(v.market);
  const fabrics = fabricsByVendor(v.id);
  const [tab, setTab] = u2S('fabrics');

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar dark />
      {/* Hero */}
      <div style={{ position: 'relative', height: 200, background: v.color, overflow: 'hidden' }}>
        <FabricSwatch kind={v.specialties[0]?.toLowerCase().includes('adire') ? 'adire' : v.specialties[0]?.toLowerCase().includes('aso') ? 'aso-oke' : v.specialties[0]?.toLowerCase().includes('lace') ? 'lace' : 'ankara'} color={v.color} accent={v.accent} size={400} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%)' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}>
          <BackBtn dark onClick={() => goto('home')} />
          <div style={{ display: 'flex', gap: 8 }}>
            <IconBtn dark><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14s-5-3.5-5-7.5C3 4 4.5 3 6 3c1 0 1.7.5 2 1 .3-.5 1-1 2-1 1.5 0 3 1 3 3.5 0 4-5 7.5-5 7.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></IconBtn>
            <IconBtn dark><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="3.5" cy="8" r="1.5" fill="currentColor"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/><circle cx="12.5" cy="8" r="1.5" fill="currentColor"/></svg></IconBtn>
          </div>
        </div>
      </div>

      {/* Vendor card overlay */}
      <div style={{ background: '#fff', margin: '-32px 16px 0', padding: 16, borderRadius: 16, boxShadow: 'var(--sh-md)', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
              {v.badges.map(b => <Badge key={b} tone={b === 'Heritage' ? 'gold' : b === 'Verified' ? 'leaf' : b === 'Custom prints' ? 'clay' : 'indigo'}>{b}</Badge>)}
            </div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>{v.name}</h2>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{m.name} · {m.city}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--ink-900)' }}>★ {v.rating}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{v.reviews} reviews</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 12, padding: '10px 0', borderTop: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
          <Stat label="Delivery" value={v.eta} />
          <Stat label="Distance" value={v.distance} divider />
          <Stat label="Min order" value={`${v.minOrder} ${v.minOrder === 1 ? 'unit' : 'units'}`} divider />
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-700)', lineHeight: 1.45 }}>
          {v.bio}
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--ink-500)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: v.open ? 'var(--leaf-500)' : 'var(--clay-500)' }}/>
          {v.open ? 'Open now' : 'Closed'} · {v.hours}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, padding: '16px 16px 8px' }}>
        {['fabrics', 'reviews', 'about'].map(t => (
          <Chip key={t} active={tab === t} onClick={() => setTab(t)}>
            {t === 'fabrics' ? `Fabrics (${fabrics.length})` : t === 'reviews' ? 'Reviews' : 'About'}
          </Chip>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 90px' }} className="no-scroll">
        {tab === 'fabrics' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {fabrics.map(f => <FabricCard key={f.id} fabric={f} onClick={() => goto('fabric', { id: f.id })} />)}
          </div>
        )}
        {tab === 'reviews' && <ReviewsTab vendor={v} />}
        {tab === 'about' && <AboutTab vendor={v} market={m} />}
      </div>
    </div>
  );
}

function Stat({ label, value, divider }) {
  return (
    <div style={{ textAlign: 'center', padding: '0 4px', borderLeft: divider ? '1px solid var(--line-soft)' : 'none' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{value}</div>
      <div style={{ fontSize: 10, color: 'var(--ink-500)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function ReviewsTab({ vendor }) {
  const reviews = [
    { name: 'Tolani A.', rating: 5, body: 'Sample arrived in 2 days. Quality is exactly as described — exactly what I needed for my SS26 collection.', date: '12 Apr 2026', verified: true },
    { name: 'Designer Studio Lagos', rating: 5, body: 'Working with them on a 200-yard custom print. Communication is sharp, prices fair.', date: '4 Apr 2026', verified: true },
    { name: 'Adaeze N.', rating: 4, body: 'Fabric is beautiful but delivery was a day late. Still recommend.', date: '28 Mar 2026', verified: true },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {reviews.map((r, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--line)', padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--cream-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: 'var(--indigo-900)' }}>{r.name[0]}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{r.date} {r.verified && '· Verified buyer'}</div>
              </div>
            </div>
            <div style={{ color: 'var(--gold-500)', fontSize: 13 }}>{'★'.repeat(r.rating)}</div>
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-700)', marginTop: 8, lineHeight: 1.45 }}>{r.body}</div>
        </div>
      ))}
    </div>
  );
}

function AboutTab({ vendor, market }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <InfoRow label="Proprietor" value={vendor.proprietor} />
      <InfoRow label="Years in business" value={`${vendor.years} years`} />
      <InfoRow label="Specialties" value={vendor.specialties.join(' · ')} />
      <InfoRow label="Hours" value={vendor.hours} />
      <InfoRow label="Delivery fee" value={fmt(vendor.deliveryFee)} />
      <InfoRow label="Minimum order" value={`${vendor.minOrder} units`} />
      <div style={{ background: '#fff', borderRadius: 12, border: '1px solid var(--line)', padding: 14 }}>
        <div className="t-micro" style={{ marginBottom: 6 }}>Location</div>
        <div style={{ fontSize: 14, fontWeight: 700 }}>{market.name}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{market.city} · {market.vibe}</div>
        {/* fake map */}
        <div style={{ marginTop: 10, height: 100, borderRadius: 10, background: 'linear-gradient(135deg, #E8DFC9 0%, #DDD0AE 100%)', position: 'relative', overflow: 'hidden' }}>
          {/* roads */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path d="M0 30 Q50 28 100 35 T200 40" stroke="#FBF7EE" strokeWidth="6" fill="none"/>
              <path d="M30 0 L40 50 L35 100" stroke="#FBF7EE" strokeWidth="4" fill="none"/>
              <path d="M120 0 L140 100" stroke="#FBF7EE" strokeWidth="3" fill="none"/>
            </svg>
            <div style={{ position: 'absolute', left: '40%', top: '40%' }}>
              <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--clay-500)', boxShadow: '0 0 0 4px rgba(196,90,44,0.25)' }}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: '#fff', border: '1px solid var(--line)', borderRadius: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--ink-500)' }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-900)' }}>{value}</span>
    </div>
  );
}

// ─── FABRIC DETAIL ─────────────────────────────────────────────────────
function FabricScreen({ fabricId, goto, onAddCart }) {
  const f = fabricById(fabricId);
  const v = vendorById(f.vendor);
  const [qty, setQty] = u2S(1);
  const [showSwatchToast, setShowSwatchToast] = u2S(false);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar dark />
      {/* Image area */}
      <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
        <FabricSwatch kind={fabricKind(f)} color={f.color} accent={pickAccent(f.color)} size={500} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '8px 16px', display: 'flex', justifyContent: 'space-between' }}>
          <BackBtn dark onClick={() => goto('vendor', { id: f.vendor })} />
          <IconBtn dark><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 14s-5-3.5-5-7.5C3 4 4.5 3 6 3c1 0 1.7.5 2 1 .3-.5 1-1 2-1 1.5 0 3 1 3 3.5 0 4-5 7.5-5 7.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/></svg></IconBtn>
        </div>
        {/* Thumbnails */}
        <div style={{ position: 'absolute', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 6 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: 28, height: 4, borderRadius: 999,
              background: i === 0 ? '#fff' : 'rgba(255,255,255,0.4)',
            }}/>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 16 }} className="no-scroll">
        {f.tag && <div style={{ marginBottom: 8 }}><Badge tone={f.tag === 'Heritage' ? 'gold' : f.tag.includes('Custom') ? 'clay' : 'indigo'}>{f.tag}</Badge></div>}
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-0.01em', lineHeight: 1.15 }}>{f.name}</h2>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6 }}>{f.material}</div>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 14 }}>
          <span className="t-naira" style={{ fontSize: 28, color: 'var(--ink-900)' }}>{fmt(f.price)}</span>
          <span style={{ fontSize: 14, color: 'var(--ink-500)' }}>per {f.unit}</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--leaf-700)', fontWeight: 600, marginTop: 4 }}>● {f.stock} units in stock at {marketById(v.market)?.name}</div>

        {/* Vendor card */}
        <button onClick={() => goto('vendor', { id: v.id })} style={{
          marginTop: 16, width: '100%', display: 'flex', gap: 12, padding: 12,
          background: '#fff', border: '1px solid var(--line)', borderRadius: 12,
          cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-brand)',
        }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 800 }}>{v.name[0]}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{v.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>★ {v.rating} · {v.eta} · {v.distance}</div>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ alignSelf: 'center' }}><path d="M5 3l4 4-4 4" stroke="var(--ink-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>

        {/* Details */}
        <div style={{ marginTop: 16 }}>
          <h3 className="t-h3">Details</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
            <DetailTile label="Composition" value="100% cotton" />
            <DetailTile label="Width" value={`${44 + (f.id.charCodeAt(1) % 20)}\"`} />
            <DetailTile label="Weight" value="180 GSM" />
            <DetailTile label="Origin" value={marketById(v.market)?.city} />
          </div>
        </div>

        {/* Custom print upsell */}
        {f.customizable && (
          <button onClick={() => goto('designer', { fabricId: f.id })} style={{
            marginTop: 16, width: '100%', padding: 14,
            background: 'var(--indigo-900)', color: '#fff',
            border: 'none', borderRadius: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            fontFamily: 'var(--font-brand)',
          }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden' }}>
              <FabricSwatch kind="custom" color="#1B2150" accent="#C9931E" size={44} prompt="custom" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Customise this fabric</div>
              <div style={{ fontSize: 12, opacity: 0.75 }}>Add your own print pattern → ships in 5 days</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        )}

        {/* Quantity */}
        <div style={{ marginTop: 20, padding: 14, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--ink-500)' }}>Quantity</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink-900)' }}>{qty} × {f.unit}</div>
          </div>
          <div style={{ display: 'flex', gap: 0, border: '1px solid var(--line)', borderRadius: 999, overflow: 'hidden' }}>
            <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: 36, height: 36, border: 'none', background: '#fff', fontSize: 16, cursor: 'pointer', color: 'var(--ink-700)' }}>−</button>
            <div style={{ minWidth: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{qty}</div>
            <button onClick={() => setQty(Math.min(f.stock, qty + 1))} style={{ width: 36, height: 36, border: 'none', background: '#fff', fontSize: 16, cursor: 'pointer', color: 'var(--ink-700)' }}>+</button>
          </div>
        </div>
      </div>

      {/* Sticky footer CTAs */}
      <div style={{ padding: '12px 16px 22px', background: '#fff', borderTop: '1px solid var(--line-soft)', display: 'flex', gap: 10 }}>
        <Btn variant="secondary" onClick={() => { setShowSwatchToast(true); setTimeout(() => setShowSwatchToast(false), 1800); }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>
          Sample
        </Btn>
        <Btn full variant="primary" onClick={() => onAddCart({ fabricId: f.id, qty })}>
          Add · <span className="t-naira">{fmt(f.price * qty)}</span>
        </Btn>
      </div>

      {showSwatchToast && (
        <div style={{ position: 'absolute', left: '50%', bottom: 90, transform: 'translateX(-50%)', background: 'var(--ink-900)', color: '#fff', padding: '10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600, boxShadow: 'var(--sh-lg)', animation: 'fadeIn 200ms ease', zIndex: 30 }}>
          ✓ Sample requested · ₦500 fee
        </div>
      )}
    </div>
  );
}

function DetailTile({ label, value }) {
  return (
    <div style={{ padding: 12, background: '#fff', border: '1px solid var(--line)', borderRadius: 10 }}>
      <div style={{ fontSize: 11, color: 'var(--ink-500)', marginBottom: 2, fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{value}</div>
    </div>
  );
}

Object.assign(window, { SearchScreen, FiltersPanel, VendorScreen, FabricScreen });
