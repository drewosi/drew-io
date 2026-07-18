import React from 'react';

/**
 * DREW.OS CursorCoords — mono HUD readout of the cursor's position inside a
 * bounded surface. Wrap a feature card or chart; a small `x · y` record
 * follows in the corner while the pointer is inside.
 */
export function CursorCoords({ corner = 'top-right', style, children }) {
  const ref = React.useRef(null);
  const readout = React.useRef(null);
  const [inside, setInside] = React.useState(false);

  const onMove = (e) => {
    const el = ref.current, out = readout.current;
    if (!el || !out) return;
    const r = el.getBoundingClientRect();
    const x = Math.round(e.clientX - r.left);
    const y = Math.round(e.clientY - r.top);
    out.textContent = String(x).padStart(3, '0') + ' · ' + String(y).padStart(3, '0');
  };

  const pos = {
    'top-right': { top: 8, right: 10 },
    'top-left': { top: 8, left: 10 },
    'bottom-right': { bottom: 8, right: 10 },
    'bottom-left': { bottom: 8, left: 10 },
  }[corner] || { top: 8, right: 10 };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
      style={{ position: 'relative', ...style }}>
      {children}
      <span ref={readout} aria-hidden="true" style={{
        position: 'absolute', ...pos, pointerEvents: 'none',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.12em',
        color: 'var(--accent-soft)', fontVariantNumeric: 'tabular-nums',
        opacity: inside ? 1 : 0, transition: 'opacity var(--ease)',
      }}>000 · 000</span>
    </div>
  );
}
