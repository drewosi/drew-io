import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS Dropdown — mono trigger with ▾, raised hairline menu.
 * The menu drops 4px on --snap; items cascade in with a short stagger.
 */
export function Dropdown({ label, items = [], onSelect, align = 'left', style }) {
  const [open, setOpen] = React.useState(false);
  const [entered, setEntered] = React.useState(false);
  const reduced = useReducedMotion();
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) { setEntered(false); return; }
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setEntered(true)); });
    const settle = setTimeout(() => setEntered(true), 300);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2); clearTimeout(settle);
    };
  }, [open]);

  const on = reduced || entered;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', ...style }}>
      <button onClick={() => setOpen(o => !o)} style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        background: open ? 'var(--glow)' : 'transparent',
        color: open ? 'var(--text)' : 'var(--text-muted)',
        border: '1px solid ' + (open ? 'var(--accent-soft)' : 'var(--border)'),
        borderRadius: 'var(--radius-sm)', padding: '9px 14px', cursor: 'pointer', outline: 'none',
        transition: 'background var(--ease), color var(--ease), border-color var(--ease)',
      }}>
        <span>{label}</span>
        <span style={{ fontSize: '0.55rem', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--snap)' }}>▾</span>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 4px)', [align === 'right' ? 'right' : 'left']: 0, zIndex: 150,
          minWidth: '100%', width: 'max-content',
          background: 'var(--surface-raised)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-card)', padding: '4px 0',
          opacity: on ? 1 : 0,
          transform: on ? 'none' : 'translateY(-4px)',
          transition: 'opacity var(--ease), transform var(--snap)',
        }}>
          {items.map((it, i) => it.divider ? (
            <div key={i} style={{ height: 1, background: 'var(--border)', margin: '4px 0' }}></div>
          ) : (
            <button key={it.id ?? i}
              onClick={() => { setOpen(false); if (onSelect) onSelect(it.id); }}
              className={'dropdown-item' + (it.danger ? ' dropdown-item--danger' : '')}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                border: 'none', cursor: 'pointer',
                padding: '8px 14px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)',
                opacity: on ? 1 : 0,
                transition: 'background var(--ease), color var(--ease), opacity 300ms var(--snap-fn) ' + (i * 40) + 'ms',
              }}>{it.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
