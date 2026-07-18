import React from 'react';

/**
 * DREW.OS Sidebar — vertical console nav. Mono section labels, indexed items,
 * a single 1px ice rule that glides between active items on --snap.
 */
function SideItem({ item, isActive, onSelect, registerRef }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      ref={el => registerRef(item.id, el)}
      onClick={() => onSelect && onSelect(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%',
        background: isActive ? 'var(--glow)' : hover ? 'color-mix(in srgb, var(--glow) 50%, transparent)' : 'none',
        border: 'none',
        padding: '9px 14px 9px 16px', cursor: 'pointer', outline: 'none', textAlign: 'left',
        color: isActive ? 'var(--text)' : hover ? 'var(--text)' : 'var(--text-muted)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)',
        transition: 'background var(--ease), color var(--ease)',
      }}>
      {item.index && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: isActive ? 'var(--accent-soft)' : 'var(--border)', letterSpacing: '0.1em', transition: 'color var(--ease)' }}>{item.index}</span>}
      <span>{item.label}</span>
      {item.meta && <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)' }}>{item.meta}</span>}
    </button>
  );
}

export function Sidebar({ sections = [], active, onSelect, header, footer, width = 224, className, style }) {
  const itemRefs = React.useRef(new Map());
  const listRef = React.useRef(null);
  const [marker, setMarker] = React.useState(null);

  const registerRef = (id, el) => {
    if (el) itemRefs.current.set(id, el); else itemRefs.current.delete(id);
  };

  React.useLayoutEffect(() => {
    const el = itemRefs.current.get(active);
    const list = listRef.current;
    if (el && list) {
      const top = el.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop;
      setMarker({ top, height: el.offsetHeight });
    }
  }, [active, sections]);

  return (
    <aside className={className} style={{
      width, flexShrink: 0, display: 'flex', flexDirection: 'column',
      background: 'var(--surface)', borderRight: '1px solid var(--border)',
      ...style,
    }}>
      {header && <div style={{ padding: 'var(--space-4) var(--space-4)', borderBottom: '1px solid var(--border)' }}>{header}</div>}
      <div ref={listRef} style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-4) 0', position: 'relative' }}>
        {marker && (
          <span aria-hidden="true" style={{
            position: 'absolute', left: 0, width: 1, background: 'var(--accent)',
            top: marker.top, height: marker.height,
            transition: 'top var(--snap), height var(--snap)',
          }}></span>
        )}
        {sections.map((sec, si) => (
          <div key={si} style={{ marginBottom: 'var(--space-5)' }}>
            {sec.label && <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 500,
              letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
              padding: '0 16px', marginBottom: 'var(--space-2)',
            }}>{sec.label}</div>}
            {sec.items.map(item => (
              <SideItem key={item.id} item={item} isActive={item.id === active} onSelect={onSelect} registerRef={registerRef} />
            ))}
          </div>
        ))}
      </div>
      {footer && <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--border)' }}>{footer}</div>}
    </aside>
  );
}
