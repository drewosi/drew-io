import React from 'react';

/**
 * DREW.OS Tabs — mono uppercase labels on a hairline baseline; a single ice
 * underline glides between active tabs on --snap.
 */
export function Tabs({ items = [], active, defaultActive, onChange, style }) {
  const [internal, setInternal] = React.useState(defaultActive ?? (items[0] && items[0].id));
  const current = active ?? internal;
  const [hover, setHover] = React.useState(null);
  const rowRef = React.useRef(null);
  const btnRefs = React.useRef(new Map());
  const [marker, setMarker] = React.useState(null);

  React.useLayoutEffect(() => {
    const el = btnRefs.current.get(current);
    const row = rowRef.current;
    if (el && row) {
      setMarker({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [current, items]);

  return (
    <div ref={rowRef} style={{ position: 'relative', display: 'flex', gap: 'var(--space-5)', borderBottom: '1px solid var(--border)', ...style }}>
      {items.map(it => {
        const isActive = it.id === current;
        return (
          <button key={it.id}
            ref={el => { if (el) btnRefs.current.set(it.id, el); else btnRefs.current.delete(it.id); }}
            onClick={() => { setInternal(it.id); if (onChange) onChange(it.id); }}
            onMouseEnter={() => setHover(it.id)}
            onMouseLeave={() => setHover(null)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: '0.16em', textTransform: 'uppercase',
              background: 'none', border: 'none', cursor: 'pointer', outline: 'none',
              padding: '10px 2px',
              color: isActive ? 'var(--text)' : hover === it.id ? 'var(--accent-soft)' : 'var(--text-muted)',
              transition: 'color var(--ease)',
            }}>
            {it.label}
          </button>
        );
      })}
      {marker && (
        <span aria-hidden="true" style={{
          position: 'absolute', bottom: -1, height: 1, background: 'var(--accent)',
          left: marker.left, width: marker.width,
          transition: 'left var(--snap), width var(--snap)',
        }}></span>
      )}
    </div>
  );
}
