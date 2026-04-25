// patterns.jsx — Aṣọ procedural fabric pattern generator
// Renders SVG fabric swatches: adire, aso-oke, ankara, lace, plain, custom prints.
// Used everywhere: cards, vendor headers, fabric detail, custom designer.

function FabricSwatch({ kind = 'plain', color = '#1B2150', accent = '#FBF7EE', size = 240, seed = 1, prompt = '' }) {
  const id = React.useId();
  const w = size, h = size;

  // Custom print = generated pattern from prompt; deterministic from prompt hash
  if (kind === 'custom') {
    const hash = [...(prompt || 'naija')].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, seed);
    const r = (n) => ((hash * (n + 1) * 9301 + 49297) % 233280) / 233280;
    const motifs = Math.floor(4 + r(1) * 4);
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: 'block', borderRadius: 'inherit' }}>
        <defs>
          <pattern id={`p-${id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill={color} />
            {Array.from({ length: motifs }).map((_, i) => {
              const x = r(i + 2) * 60, y = r(i + 12) * 60, s = 4 + r(i + 22) * 8;
              const shape = Math.floor(r(i + 30) * 4);
              if (shape === 0) return <circle key={i} cx={x} cy={y} r={s} fill={accent} opacity={0.85} />;
              if (shape === 1) return <rect key={i} x={x - s/2} y={y - s/2} width={s} height={s} fill={accent} opacity={0.7} transform={`rotate(45 ${x} ${y})`} />;
              if (shape === 2) return <path key={i} d={`M${x} ${y - s} L${x + s} ${y} L${x} ${y + s} L${x - s} ${y} Z`} fill={accent} opacity={0.8} />;
              return <circle key={i} cx={x} cy={y} r={s/2} fill="none" stroke={accent} strokeWidth="1.5" opacity={0.7} />;
            })}
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#p-${id})`} />
      </svg>
    );
  }

  if (kind === 'adire') {
    return (
      <svg width={w} height={h} viewBox="0 0 240 240" style={{ display: 'block', borderRadius: 'inherit' }}>
        <defs>
          <pattern id={`a-${id}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill={color} />
            {/* concentric circles — Olokun motif */}
            <circle cx="40" cy="40" r="28" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.55" />
            <circle cx="40" cy="40" r="20" fill="none" stroke={accent} strokeWidth="1" opacity="0.45" />
            <circle cx="40" cy="40" r="12" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
            <circle cx="40" cy="40" r="4" fill={accent} opacity="0.5" />
            {/* dot field */}
            <circle cx="8" cy="8" r="1.5" fill={accent} opacity="0.4" />
            <circle cx="72" cy="8" r="1.5" fill={accent} opacity="0.4" />
            <circle cx="8" cy="72" r="1.5" fill={accent} opacity="0.4" />
            <circle cx="72" cy="72" r="1.5" fill={accent} opacity="0.4" />
            {/* tiny resist marks */}
            <path d="M70 38 L78 38 M70 42 L78 42" stroke={accent} strokeWidth="0.8" opacity="0.4" />
            <path d="M2 38 L10 38 M2 42 L10 42" stroke={accent} strokeWidth="0.8" opacity="0.4" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#a-${id})`} />
      </svg>
    );
  }

  if (kind === 'aso-oke') {
    return (
      <svg width={w} height={h} viewBox="0 0 240 240" preserveAspectRatio="none" style={{ display: 'block', borderRadius: 'inherit' }}>
        <defs>
          <pattern id={`ao-${id}`} x="0" y="0" width="240" height="20" patternUnits="userSpaceOnUse">
            <rect width="240" height="20" fill={color} />
            <rect x="0" y="0" width="240" height="2" fill={accent} opacity="0.8" />
            <rect x="0" y="6" width="240" height="0.8" fill={accent} opacity="0.5" />
            <rect x="0" y="14" width="240" height="0.8" fill={accent} opacity="0.5" />
            {Array.from({length:24}).map((_,i)=> <rect key={i} x={i*10+1} y="9" width="2" height="6" fill={accent} opacity="0.35" />)}
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#ao-${id})`} />
      </svg>
    );
  }

  if (kind === 'ankara' || kind === 'wax') {
    return (
      <svg width={w} height={h} viewBox="0 0 240 240" style={{ display: 'block', borderRadius: 'inherit' }}>
        <defs>
          <pattern id={`an-${id}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <rect width="60" height="60" fill={color} />
            <path d="M30 10 Q40 30 30 50 Q20 30 30 10 Z" fill={accent} opacity="0.85" />
            <circle cx="30" cy="30" r="3" fill={color} />
            <path d="M0 30 L10 30 M50 30 L60 30" stroke={accent} strokeWidth="2" opacity="0.6" />
            <circle cx="0" cy="0" r="6" fill={accent} opacity="0.5" />
            <circle cx="60" cy="60" r="6" fill={accent} opacity="0.5" />
            <circle cx="60" cy="0" r="6" fill={accent} opacity="0.5" />
            <circle cx="0" cy="60" r="6" fill={accent} opacity="0.5" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#an-${id})`} />
      </svg>
    );
  }

  if (kind === 'lace') {
    return (
      <svg width={w} height={h} viewBox="0 0 240 240" style={{ display: 'block', borderRadius: 'inherit' }}>
        <defs>
          <pattern id={`l-${id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill={color} />
            <circle cx="20" cy="20" r="14" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.55" />
            <circle cx="20" cy="20" r="6" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
            <circle cx="0" cy="20" r="3" fill={accent} opacity="0.4" />
            <circle cx="40" cy="20" r="3" fill={accent} opacity="0.4" />
            <circle cx="20" cy="0" r="3" fill={accent} opacity="0.4" />
            <circle cx="20" cy="40" r="3" fill={accent} opacity="0.4" />
            <circle cx="20" cy="20" r="1.2" fill={accent} opacity="0.7" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#l-${id})`} />
      </svg>
    );
  }

  if (kind === 'brocade') {
    return (
      <svg width={w} height={h} viewBox="0 0 240 240" style={{ display: 'block', borderRadius: 'inherit' }}>
        <defs>
          <pattern id={`b-${id}`} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" fill={color} />
            <path d="M25 5 L45 25 L25 45 L5 25 Z" fill="none" stroke={accent} strokeWidth="0.8" opacity="0.5" />
            <path d="M25 15 L35 25 L25 35 L15 25 Z" fill={accent} opacity="0.25" />
            <circle cx="25" cy="25" r="1.5" fill={accent} opacity="0.7" />
            <circle cx="0" cy="0" r="2" fill={accent} opacity="0.45" />
            <circle cx="50" cy="50" r="2" fill={accent} opacity="0.45" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#b-${id})`} />
      </svg>
    );
  }

  // plain — slight texture
  return (
    <svg width={w} height={h} viewBox="0 0 240 240" style={{ display: 'block', borderRadius: 'inherit' }}>
      <defs>
        <pattern id={`pl-${id}`} x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
          <rect width="3" height="3" fill={color} />
          <line x1="0" y1="0" x2="3" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width={w} height={h} fill={`url(#pl-${id})`} />
    </svg>
  );
}

// Map a fabric record to a pattern kind
function fabricKind(f) {
  const m = (f.material || '').toLowerCase();
  if (m.includes('adire')) return 'adire';
  if (m.includes('aso')) return 'aso-oke';
  if (m.includes('ankara')) return 'ankara';
  if (m.includes('wax')) return 'wax';
  if (m.includes('lace')) return 'lace';
  if (m.includes('brocade') || m.includes('atampa')) return 'brocade';
  return 'plain';
}

// Color an accent based on fabric color (lighten or darken)
function pickAccent(hex) {
  // simple: if dark, return cream; if light, return indigo
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  const lum = (0.299*r + 0.587*g + 0.114*b);
  return lum < 140 ? '#F6E5B5' : '#1B2150';
}

Object.assign(window, { FabricSwatch, fabricKind, pickAccent });
