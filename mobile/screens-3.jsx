// screens-3.jsx — Cart, custom print designer, orders, profile.

const { useState: u3S, useMemo: u3M, useEffect: u3E } = React;

// ─── CART ──────────────────────────────────────────────────────────────
function CartScreen({ cart, setCart, goto }) {
  const items = cart.map(c => ({ ...c, fabric: fabricById(c.fabricId), vendor: vendorById(fabricById(c.fabricId).vendor) }));
  const byVendor = u3M(() => {
    const map = {};
    items.forEach(i => { (map[i.vendor.id] ||= { vendor: i.vendor, items: [] }).items.push(i); });
    return Object.values(map);
  }, [items]);
  const subtotal = items.reduce((s, i) => s + i.fabric.price * i.qty, 0);
  const delivery = byVendor.reduce((s, g) => s + g.vendor.deliveryFee, 0);
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
        <StatusBar />
        <AppBar title="Your cart" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
          <div style={{ width: 80, height: 80, borderRadius: 999, background: 'var(--cream-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M4 5h2l2.5 11h10L21 8H7" stroke="var(--indigo-700)" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/></svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink-900)' }}>Your cart is empty</div>
          <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 6, maxWidth: 260 }}>Browse vendors and add fabrics to start your order.</div>
          <div style={{ marginTop: 20 }}><Btn variant="primary" onClick={() => goto('home')}>Find fabrics</Btn></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar title="Your cart" subtitle={`${items.length} ${items.length === 1 ? 'item' : 'items'} from ${byVendor.length} ${byVendor.length === 1 ? 'vendor' : 'vendors'}`} />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }} className="no-scroll">
        {byVendor.map(g => (
          <div key={g.vendor.id} style={{ marginBottom: 14, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: '1px solid var(--line-soft)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: g.vendor.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>{g.vendor.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)' }}>{g.vendor.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>⏱ {g.vendor.eta} · Delivery {fmt(g.vendor.deliveryFee)}</div>
              </div>
            </div>
            {g.items.map((it, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: 12, borderBottom: i < g.items.length - 1 ? '1px solid var(--line-soft)' : 'none' }}>
                <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                  {it.custom ? <FabricSwatch kind="custom" color={it.fabric.color} accent={pickAccent(it.fabric.color)} size={64} prompt={it.custom.prompt} /> : <FabricSwatch kind={fabricKind(it.fabric)} color={it.fabric.color} accent={pickAccent(it.fabric.color)} size={64} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-900)', lineHeight: 1.2 }}>{it.fabric.name}</div>
                  {it.custom && <div style={{ fontSize: 11, color: 'var(--clay-500)', marginTop: 2, fontWeight: 600 }}>✦ Custom: "{it.custom.prompt}"</div>}
                  <div style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{it.qty} × {it.fabric.unit}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                    <span className="t-naira" style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{fmt(it.fabric.price * it.qty)}</span>
                    <button onClick={() => setCart(cart.filter((_, k) => !(cart[k].fabricId === it.fabricId && cart[k].qty === it.qty)))} style={{ border: 'none', background: 'transparent', color: 'var(--ink-300)', fontSize: 11, cursor: 'pointer', fontFamily: 'var(--font-brand)' }}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Order summary */}
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: 14 }}>
          <div className="t-h3" style={{ marginBottom: 10 }}>Order summary</div>
          <SumRow label="Subtotal" value={fmt(subtotal)} />
          <SumRow label="Delivery" value={fmt(delivery)} />
          <SumRow label="Service fee" value={fmt(200)} />
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line-soft)', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Total</span>
            <span className="t-naira" style={{ fontSize: 18, fontWeight: 800 }}>{fmt(total + 200)}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px 22px', background: '#fff', borderTop: '1px solid var(--line-soft)' }}>
        <Btn full variant="primary" size="lg" onClick={() => goto('checkout')}>
          Checkout · <span className="t-naira">{fmt(total + 200)}</span>
        </Btn>
      </div>
    </div>
  );
}

function SumRow({ label, value }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: 13 }}>
      <span style={{ color: 'var(--ink-500)' }}>{label}</span>
      <span className="t-naira" style={{ color: 'var(--ink-900)', fontWeight: 600 }}>{value}</span>
    </div>
  );
}

// ─── CHECKOUT ───────────────────────────────────────────────────────────
function CheckoutScreen({ cart, location, goto, onPlace }) {
  const [pay, setPay] = u3S('paystack');
  const items = cart.map(c => ({ ...c, fabric: fabricById(c.fabricId), vendor: vendorById(fabricById(c.fabricId).vendor) }));
  const subtotal = items.reduce((s, i) => s + i.fabric.price * i.qty, 0);
  const total = subtotal + items.reduce((s, i) => s + i.vendor.deliveryFee, 0) / Math.max(1, new Set(items.map(i => i.vendor.id)).size) + 200;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar left={<BackBtn onClick={() => goto('cart')}/>} title="Checkout" />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }} className="no-scroll">
        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: 14, marginBottom: 12 }}>
          <div className="t-micro" style={{ marginBottom: 6 }}>Delivery address</div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{location.city}, {STATES.find(s => s.id === location.state)?.name}</div>
          <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>17B Admiralty Way · Apt 4 · 0803 412 8893</div>
          <button style={{ marginTop: 10, padding: 0, border: 'none', background: 'transparent', color: 'var(--indigo-700)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-brand)' }}>Change address</button>
        </div>

        <div className="t-micro" style={{ margin: '12px 4px 8px' }}>Payment method</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { id: 'paystack', name: 'Paystack', sub: 'Card · Bank transfer · USSD', icon: '💳' },
            { id: 'transfer', name: 'Bank transfer', sub: 'Pay before delivery', icon: '🏦' },
            { id: 'cod', name: 'Pay on delivery', sub: 'Lagos only · cash or POS', icon: '💵' },
          ].map(p => (
            <button key={p.id} onClick={() => setPay(p.id)} style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: 12,
              background: '#fff', border: pay === p.id ? '2px solid var(--indigo-900)' : '1px solid var(--line)',
              borderRadius: 12, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-brand)',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--cream-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{p.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)' }}>{p.sub}</div>
              </div>
              <div style={{ width: 18, height: 18, borderRadius: 999, border: '2px solid', borderColor: pay === p.id ? 'var(--indigo-900)' : 'var(--line-soft)', background: pay === p.id ? 'var(--indigo-900)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pay === p.id && <div style={{ width: 6, height: 6, borderRadius: 999, background: '#fff' }}/>}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 16, padding: 12, background: 'var(--leaf-700)', borderRadius: 12, color: '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 16 }}>🚚</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Delivery in 25 min</div>
            <div style={{ fontSize: 11, opacity: 0.85 }}>Aṣọ rider · ₦200 service fee</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '12px 16px 22px', background: '#fff', borderTop: '1px solid var(--line-soft)' }}>
        <Btn full variant="primary" size="lg" onClick={onPlace}>
          Place order · <span className="t-naira">{fmt(Math.round(total))}</span>
        </Btn>
      </div>
    </div>
  );
}

// ─── ORDER SUCCESS / TRACKING ──────────────────────────────────────────
function OrderSuccessScreen({ goto }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)', position: 'relative' }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 100, height: 100, marginBottom: 20 }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 999, background: 'var(--leaf-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="44" height="44" viewBox="0 0 44 44"><path d="M12 22l7 7 14-14" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div style={{ position: 'absolute', inset: -8, borderRadius: 999, border: '2px solid var(--leaf-500)', animation: 'ping 1.4s ease infinite', opacity: 0.5 }}/>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink-900)', letterSpacing: '-0.01em' }}>Order placed</div>
        <div style={{ fontSize: 13, color: 'var(--ink-500)', marginTop: 8, maxWidth: 280 }}>Mama Bisi has accepted your order. Rider en route — ETA 25 minutes.</div>

        <div style={{ marginTop: 24, padding: '12px 16px', background: '#fff', border: '1px solid var(--line)', borderRadius: 999, fontSize: 12, color: 'var(--ink-700)' }}>
          Order <span style={{ fontWeight: 700, color: 'var(--ink-900)' }}>#ASO-4128</span> · Confirmation sent
        </div>

        <div style={{ marginTop: 28, display: 'flex', gap: 10 }}>
          <Btn variant="secondary" onClick={() => goto('home')}>Keep shopping</Btn>
          <Btn variant="primary" onClick={() => goto('orders')}>Track order →</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── ORDERS LIST ───────────────────────────────────────────────────────
function OrdersScreen({ orders, goto }) {
  const all = [
    { id: 'ASO-4128', vendor: 'Mama Bisi Textiles', items: 2, total: 28500, status: 'In transit', eta: '15 min', step: 2 },
    { id: 'ASO-4112', vendor: 'Adire Heritage Mills', items: 1, total: 14500, status: 'Dyeing', eta: '3 days', step: 1, custom: true },
    { id: 'ASO-4087', vendor: 'Mama Ngozi Ankara', items: 4, total: 26000, status: 'Delivered', eta: '5 Apr', step: 4, done: true },
    { id: 'ASO-4061', vendor: 'Iseyin Master Weavers', items: 1, total: 38000, status: 'Delivered', eta: '28 Mar', step: 4, done: true },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar title="Your orders" />
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px' }}>
        <Chip active>Active (2)</Chip>
        <Chip>Past</Chip>
        <Chip>Custom prints</Chip>
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0 16px 16px' }} className="no-scroll">
        {all.map(o => (
          <div key={o.id} style={{ marginBottom: 12, background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)', fontWeight: 600 }}>#{o.id}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)', marginTop: 2 }}>{o.vendor}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-500)', marginTop: 2 }}>{o.items} item{o.items > 1 ? 's' : ''} · <span className="t-naira">{fmt(o.total)}</span></div>
              </div>
              <Badge tone={o.done ? 'leaf' : o.custom ? 'clay' : 'indigo'}>{o.status}</Badge>
            </div>
            {/* progress */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {['Confirmed', 'Preparing', 'In transit', 'Delivered'].map((label, i) => (
                <React.Fragment key={i}>
                  <div style={{ flex: 1, height: 4, borderRadius: 999, background: i < o.step ? (o.done ? 'var(--leaf-500)' : 'var(--indigo-900)') : 'var(--line)' }}/>
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--ink-500)' }}>
              <span>{['Confirmed', 'Preparing', 'In transit', 'Delivered'][Math.min(3, o.step)]}</span>
              <span style={{ fontWeight: 600, color: 'var(--ink-900)' }}>{o.eta}</span>
            </div>
            {!o.done && (
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <Btn size="sm" variant="secondary">Message vendor</Btn>
                <Btn size="sm" variant="outline">Track on map</Btn>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE ───────────────────────────────────────────────────────────
function ProfileScreen({ location }) {
  const items = [
    { i: '◐', t: 'Saved fabrics', s: '12 items' },
    { i: '✦', t: 'My custom prints', s: '3 designs' },
    { i: '⌖', t: 'Saved addresses', s: '2 addresses' },
    { i: '◇', t: 'Payment methods', s: 'Paystack, transfer' },
    { i: '⊙', t: 'Become a vendor', s: 'Sell on Aṣọ' },
    { i: '?',  t: 'Help & support', s: 'WhatsApp · 0813 444 ASO' },
  ];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar title="Profile" />
      <div style={{ flex: 1, overflow: 'auto', padding: 16 }} className="no-scroll">
        <div style={{ background: 'var(--indigo-900)', color: '#fff', borderRadius: 16, padding: 16, position: 'relative', overflow: 'hidden', marginBottom: 16 }}>
          <div className="bg-aso-oke" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--gold-500)', color: 'var(--indigo-900)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900 }}>M</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 800 }}>Maya Adeniran</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Designer · {location.city}</div>
              <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85 }}>★ 4.9 buyer rating · 12 orders</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
          {items.map((it, i) => (
            <button key={it.t} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '14px 14px',
              background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
              borderBottom: i < items.length - 1 ? '1px solid var(--line-soft)' : 'none',
              fontFamily: 'var(--font-brand)',
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--cream-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, color: 'var(--indigo-900)' }}>{it.i}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink-900)' }}>{it.t}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{it.s}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="var(--ink-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CUSTOM PRINT DESIGNER ────────────────────────────────────────────
function DesignerScreen({ initialFabricId, goto, onAddCart }) {
  const [prompt, setPrompt] = u3S('Indigo lotus + hand-drawn dots');
  const [fabricBase, setFabricBase] = u3S(initialFabricId || 'f6'); // Indigo plain
  const [color, setColor] = u3S('#1B2150');
  const [accent, setAccent] = u3S('#C9931E');
  const [generated, setGenerated] = u3S(true);
  const [generating, setGenerating] = u3S(false);
  const [seed, setSeed] = u3S(7);

  const baseFabric = fabricById(fabricBase);
  const baseVendor = vendorById(baseFabric.vendor);

  const PRESETS = [
    { name: 'Olokun deep', c: '#0E1330', a: '#C9931E' },
    { name: 'Cassava cream', c: '#F5EFE0', a: '#8A3A1F' },
    { name: 'Palm leaf', c: '#1F5E3A', a: '#F6E5B5' },
    { name: 'Hibiscus', c: '#8A1F1F', a: '#F5EFE0' },
    { name: 'Sahara dusk', c: '#C45A2C', a: '#1B2150' },
  ];

  const STYLE_CHIPS = [
    'Adire-inspired', 'Geometric', 'Floral', 'Aso-Oke stripe', 'Hand-drawn', 'Wax-print',
  ];

  const regenerate = () => {
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => { setSeed(s => s + 1); setGenerating(false); setGenerated(true); }, 900);
  };

  const customPrice = baseFabric.price + 6500; // print premium

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--cream-50)' }}>
      <StatusBar />
      <AppBar
        left={<BackBtn onClick={() => goto('home')}/>}
        title="Custom print"
        subtitle="Render on real Naija fabric"
        right={<Badge tone="clay">BETA</Badge>}
      />

      <div style={{ flex: 1, overflow: 'auto' }} className="no-scroll">
        {/* Preview */}
        <div style={{ padding: 16 }}>
          <div style={{
            position: 'relative', borderRadius: 18, overflow: 'hidden',
            aspectRatio: '4 / 3', boxShadow: 'var(--sh-md)',
            background: color,
          }}>
            <FabricSwatch kind="custom" color={color} accent={accent} size={500} prompt={prompt} seed={seed} />
            {generating && (
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,19,48,0.55)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', gap: 12, backdropFilter: 'blur(2px)' }}>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--gold-300)', animation: `ping 1s ease infinite ${i * 0.2}s` }}/>)}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Rendering on {baseFabric.material}…</div>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: 6 }}>
              <Badge tone="dark">✦ AI generated</Badge>
              <Badge tone="dark">{baseFabric.material}</Badge>
            </div>
          </div>
        </div>

        {/* Prompt */}
        <div style={{ padding: '0 16px 16px' }}>
          <div className="t-micro" style={{ marginBottom: 8 }}>Describe your print</div>
          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, padding: 12 }}>
            <textarea
              value={prompt} onChange={e => setPrompt(e.target.value)}
              rows={2}
              style={{
                width: '100%', border: 'none', outline: 'none', resize: 'none',
                fontFamily: 'var(--font-brand)', fontSize: 14, color: 'var(--ink-900)',
                background: 'transparent', minHeight: 44,
              }}
              placeholder="e.g. Indigo waves with gold dots, palm-leaf motif…"
            />
            <div style={{ display: 'flex', gap: 6, overflow: 'auto', marginTop: 8 }} className="no-scroll">
              {STYLE_CHIPS.map(s => (
                <Chip key={s} onClick={() => setPrompt(p => p + (p ? ', ' : '') + s.toLowerCase())}>+ {s}</Chip>
              ))}
            </div>
          </div>
          <Btn full size="md" variant="primary" onClick={regenerate}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M14 8a6 6 0 11-2-4.5M14 2v3.5h-3.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {generating ? 'Generating…' : 'Generate again'}
          </Btn>
        </div>

        {/* Color */}
        <div style={{ padding: '0 16px 16px' }}>
          <div className="t-micro" style={{ marginBottom: 8 }}>Color palette</div>
          <div style={{ display: 'flex', gap: 8, overflow: 'auto' }} className="no-scroll">
            {PRESETS.map(p => (
              <button key={p.name} onClick={() => { setColor(p.c); setAccent(p.a); regenerate(); }} style={{
                flexShrink: 0, padding: 6, border: color === p.c ? '2px solid var(--ink-900)' : '1px solid var(--line)',
                borderRadius: 12, background: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-brand)',
              }}>
                <div style={{ display: 'flex' }}>
                  <div style={{ width: 22, height: 22, borderRadius: '6px 0 0 6px', background: p.c }}/>
                  <div style={{ width: 22, height: 22, borderRadius: '0 6px 6px 0', background: p.a }}/>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-900)', paddingRight: 6 }}>{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Fabric base */}
        <div style={{ padding: '0 16px 16px' }}>
          <div className="t-micro" style={{ marginBottom: 8 }}>Print on which fabric</div>
          <div style={{ display: 'flex', gap: 10, overflow: 'auto' }} className="no-scroll">
            {FABRICS.filter(f => f.customizable).map(f => (
              <button key={f.id} onClick={() => setFabricBase(f.id)} style={{
                flexShrink: 0, width: 130, padding: 0, background: '#fff',
                border: fabricBase === f.id ? '2px solid var(--indigo-900)' : '1px solid var(--line)',
                borderRadius: 12, overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'var(--font-brand)',
              }}>
                <div style={{ height: 60 }}><FabricSwatch kind={fabricKind(f)} color={f.color} accent={pickAccent(f.color)} size={130} /></div>
                <div style={{ padding: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.material}</div>
                  <div className="t-naira" style={{ fontSize: 11, color: 'var(--ink-500)', marginTop: 2 }}>{fmt(f.price)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Vendor / lead time */}
        <div style={{ padding: '0 16px 100px' }}>
          <div style={{ background: 'var(--cream-100)', border: '1px solid var(--line)', borderRadius: 14, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: baseVendor.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800 }}>{baseVendor.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Printed by {baseVendor.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>{marketById(baseVendor.market)?.name} · Lead time 5–7 days</div>
              </div>
              <Badge tone="leaf">Verified</Badge>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-700)', lineHeight: 1.45 }}>
              Hand-printed using reactive dyes on {baseFabric.material.toLowerCase()}. Sample (1 yard) ships first for approval.
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div style={{ padding: '12px 16px 22px', background: '#fff', borderTop: '1px solid var(--line-soft)', display: 'flex', gap: 10, alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, color: 'var(--ink-500)' }}>Custom price</div>
          <div className="t-naira" style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink-900)' }}>{fmt(customPrice)}</div>
          <div style={{ fontSize: 10, color: 'var(--ink-500)' }}>per {baseFabric.unit}</div>
        </div>
        <Btn full variant="primary" size="lg" onClick={() => onAddCart({ fabricId: fabricBase, qty: 1, custom: { prompt, color, accent } })}>
          Order sample →
        </Btn>
      </div>
    </div>
  );
}

Object.assign(window, { CartScreen, CheckoutScreen, OrderSuccessScreen, OrdersScreen, ProfileScreen, DesignerScreen });
