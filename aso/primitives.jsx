// primitives.jsx — Aṣọ shared UI primitives.
// Status bar (custom, lightweight), bottom tab bar, top app bar, buttons,
// chips, search field, badges, cart pill, sheet/modal.

const { useState } = React;

// ─── Status bar (warm light, looks Naija-mobile, not iOS-corp) ─────────
function StatusBar({ dark = false, time = '14:32' }) {
  const c = dark ? '#fff' : '#14110B';
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 22px 4px', height: 32, fontSize: 13, fontWeight: 700,
      color: c, fontFamily: 'var(--font-brand)',
    }}>
      <span>{time}</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
        {/* Signal */}
        <svg width="16" height="10" viewBox="0 0 16 10"><rect x="0" y="7" width="3" height="3" rx="0.5" fill={c}/><rect x="4" y="5" width="3" height="5" rx="0.5" fill={c}/><rect x="8" y="3" width="3" height="7" rx="0.5" fill={c}/><rect x="12" y="0" width="3" height="10" rx="0.5" fill={c}/></svg>
        <span style={{ fontSize: 10, fontWeight: 600 }}>4G</span>
        {/* Battery */}
        <svg width="22" height="11" viewBox="0 0 22 11"><rect x="0.5" y="0.5" width="18" height="10" rx="2" fill="none" stroke={c} strokeWidth="1"/><rect x="2" y="2" width="13" height="7" rx="1" fill={c}/><rect x="19" y="3.5" width="2" height="4" rx="0.8" fill={c}/></svg>
      </div>
    </div>
  );
}

// ─── Top app bar ───────────────────────────────────────────────────────
function AppBar({ left, title, right, subtitle, transparent = false, dark = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 16px 12px',
      background: transparent ? 'transparent' : (dark ? 'var(--indigo-900)' : '#fff'),
      borderBottom: transparent ? 'none' : '1px solid var(--line-soft)',
      color: dark ? '#fff' : 'var(--ink-900)',
      minHeight: 48,
    }}>
      {left}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.2 }}>{title}</div>}
        {subtitle && <div style={{ fontSize: 12, opacity: 0.65, marginTop: 1 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

function IconBtn({ children, onClick, dark = false }) {
  return (
    <button onClick={onClick} style={{
      width: 38, height: 38, borderRadius: 999, border: 'none',
      background: dark ? 'rgba(255,255,255,0.1)' : 'var(--cream-100)',
      color: dark ? '#fff' : 'var(--ink-900)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', flexShrink: 0,
    }}>{children}</button>
  );
}

function BackBtn({ onClick, dark = false }) {
  return <IconBtn onClick={onClick} dark={dark}>
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11.5 3L5 9l6.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  </IconBtn>;
}

// ─── Buttons ───────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', onClick, full = false, icon, disabled }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'var(--font-brand)', fontWeight: 600,
    borderRadius: 'var(--r-pill)',
    transition: 'transform 120ms ease, background 180ms ease',
    width: full ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
  };
  const sizes = {
    sm: { padding: '8px 14px', fontSize: 13 },
    md: { padding: '12px 20px', fontSize: 14 },
    lg: { padding: '16px 24px', fontSize: 15 },
  };
  const variants = {
    primary:   { background: 'var(--indigo-900)', color: '#fff' },
    secondary: { background: 'var(--cream-100)', color: 'var(--ink-900)' },
    clay:      { background: 'var(--clay-500)', color: '#fff' },
    leaf:      { background: 'var(--leaf-700)', color: '#fff' },
    outline:   { background: 'transparent', color: 'var(--indigo-900)', boxShadow: 'inset 0 0 0 1.5px var(--indigo-900)' },
    ghost:     { background: 'transparent', color: 'var(--ink-700)' },
    cream:     { background: '#fff', color: 'var(--ink-900)', boxShadow: 'inset 0 0 0 1px var(--line)' },
  };
  return (
    <button onClick={disabled ? undefined : onClick} style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseDown={(e) => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}>
      {icon}
      {children}
    </button>
  );
}

// ─── Chip ──────────────────────────────────────────────────────────────
function Chip({ children, active = false, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '7px 12px', fontSize: 13, fontWeight: 500,
      border: 'none', cursor: 'pointer', borderRadius: 999,
      background: active ? 'var(--indigo-900)' : '#fff',
      color: active ? '#fff' : 'var(--ink-700)',
      boxShadow: active ? 'none' : 'inset 0 0 0 1px var(--line)',
      whiteSpace: 'nowrap', flexShrink: 0,
      fontFamily: 'var(--font-brand)',
    }}>
      {icon}
      {children}
    </button>
  );
}

// ─── Badge ─────────────────────────────────────────────────────────────
function Badge({ children, tone = 'neutral' }) {
  const tones = {
    neutral: { bg: 'var(--cream-100)', fg: 'var(--ink-700)' },
    indigo:  { bg: 'var(--indigo-100)', fg: 'var(--indigo-800)' },
    leaf:    { bg: '#E0F0E5', fg: 'var(--leaf-700)' },
    clay:    { bg: 'var(--clay-100)', fg: 'var(--clay-700)' },
    gold:    { bg: 'var(--gold-100)', fg: '#7A5300' },
    dark:    { bg: 'var(--ink-900)', fg: '#fff' },
  };
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: '3px 8px', fontSize: 11, fontWeight: 600,
      background: t.bg, color: t.fg, borderRadius: 999,
      letterSpacing: '0.01em',
    }}>{children}</span>
  );
}

// ─── Search field ──────────────────────────────────────────────────────
function SearchField({ value, onChange, placeholder = 'Search…', onFocus, onClick, autoFocus, trailing }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 14px', background: '#fff',
      borderRadius: 999, border: '1px solid var(--line)',
      cursor: onClick ? 'pointer' : 'text',
    }}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
        <circle cx="7" cy="7" r="5" stroke="var(--ink-500)" strokeWidth="1.5"/>
        <path d="M11 11l3.5 3.5" stroke="var(--ink-500)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <input
        autoFocus={autoFocus} readOnly={!!onClick}
        value={value || ''} onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        onFocus={onFocus}
        placeholder={placeholder}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontSize: 14, fontFamily: 'var(--font-brand)', color: 'var(--ink-900)',
          minWidth: 0,
        }} />
      {trailing}
    </div>
  );
}

// ─── Bottom tab bar ────────────────────────────────────────────────────
const TAB_ICONS = {
  home: <path d="M3 10l9-7 9 7v10a2 2 0 01-2 2h-4v-7h-6v7H5a2 2 0 01-2-2V10z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>,
  search: <><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M14.5 14.5L19 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
  orders: <><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M8 9h8M8 13h8M8 17h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></>,
  cart: <><path d="M4 5h2l2.5 11h10L21 8H7" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinejoin="round" strokeLinecap="round"/><circle cx="9" cy="20" r="1.5" fill="currentColor"/><circle cx="18" cy="20" r="1.5" fill="currentColor"/></>,
  profile: <><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" fill="none"/><path d="M4 21c1-4 4-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/></>,
};

function TabBar({ active, onChange, cartCount = 0 }) {
  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'search', label: 'Search' },
    { id: 'orders', label: 'Orders' },
    { id: 'cart', label: 'Cart', badge: cartCount },
    { id: 'profile', label: 'Profile' },
  ];
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-around', alignItems: 'stretch',
      background: '#fff', borderTop: '1px solid var(--line-soft)',
      padding: '8px 6px 22px',
    }}>
      {tabs.map((t) => {
        const a = active === t.id;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            flex: 1, border: 'none', background: 'transparent', cursor: 'pointer',
            padding: '6px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: a ? 'var(--indigo-900)' : 'var(--ink-300)',
            fontFamily: 'var(--font-brand)',
            position: 'relative',
          }}>
            <div style={{ position: 'relative' }}>
              <svg width="22" height="22" viewBox="0 0 24 24">{TAB_ICONS[t.id]}</svg>
              {t.badge ? (
                <div style={{
                  position: 'absolute', top: -4, right: -8,
                  minWidth: 16, height: 16, padding: '0 4px',
                  borderRadius: 999, background: 'var(--clay-500)', color: '#fff',
                  fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{t.badge}</div>
              ) : null}
            </div>
            <span style={{ fontSize: 10.5, fontWeight: a ? 700 : 500 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Logo / wordmark ───────────────────────────────────────────────────
function Logo({ size = 28, light = false }) {
  const c1 = light ? '#fff' : 'var(--indigo-900)';
  const c2 = light ? 'var(--gold-300)' : 'var(--clay-500)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <svg width={size} height={size} viewBox="0 0 32 32">
        <rect x="2" y="2" width="28" height="28" rx="9" fill={c1}/>
        {/* Adire-inspired mark: concentric + dot */}
        <circle cx="16" cy="16" r="8" fill="none" stroke={c2} strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="4" fill="none" stroke={c2} strokeWidth="1"/>
        <circle cx="16" cy="16" r="1.5" fill={c2}/>
      </svg>
      <span style={{ fontSize: size * 0.7, fontWeight: 900, color: c1, letterSpacing: '-0.02em' }}>
        Aṣọ
      </span>
    </div>
  );
}

// Section title row
function SectionHead({ title, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 16px', marginBottom: 10 }}>
      <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--ink-900)' }}>{title}</h3>
      {action && <button onClick={onAction} style={{
        border: 'none', background: 'transparent', color: 'var(--indigo-700)',
        fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-brand)',
      }}>{action}</button>}
    </div>
  );
}

// Sheet / bottom drawer
function Sheet({ open, onClose, children, title, height = '80%' }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, background: 'rgba(20,17,11,0.45)',
      zIndex: 50, display: 'flex', alignItems: 'flex-end',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxHeight: height, background: '#fff',
        borderTopLeftRadius: 24, borderTopRightRadius: 24,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animation: 'sheetUp 220ms cubic-bezier(0.2,0.7,0.2,1)',
      }}>
        <div style={{ padding: '10px 0 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 36, height: 4, background: 'var(--line)', borderRadius: 999 }} />
        </div>
        {title && (
          <div style={{ padding: '12px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h3>
            <button onClick={onClose} style={{ border: 'none', background: 'var(--cream-100)', borderRadius: 999, width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: 'var(--ink-900)' }}>×</button>
          </div>
        )}
        <div style={{ overflow: 'auto', flex: 1 }} className="no-scroll">{children}</div>
      </div>
    </div>
  );
}

// Inject sheet animation once
if (typeof document !== 'undefined' && !document.getElementById('aso-anims')) {
  const s = document.createElement('style');
  s.id = 'aso-anims';
  s.textContent = `
    @keyframes sheetUp { from { transform: translateY(100%);} to { transform: translateY(0);} }
    @keyframes fadeIn { from { opacity: 0;} to { opacity: 1;} }
    @keyframes ping { 0% { transform: scale(1); opacity: 0.6;} 100% { transform: scale(2); opacity: 0;} }
  `;
  document.head.appendChild(s);
}

Object.assign(window, {
  StatusBar, AppBar, IconBtn, BackBtn, Btn, Chip, Badge, SearchField,
  TabBar, Logo, SectionHead, Sheet,
});
