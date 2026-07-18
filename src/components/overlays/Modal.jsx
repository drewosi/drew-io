import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS Modal — dimmed frosted overlay, corner-ticked panel, mono [ esc ] close.
 * Backdrop fades on --ease; the panel rises 16px on --snap. Nothing bounces.
 */
export function Modal({ open = false, onClose, title, kicker, footer, width = 480, children, style }) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = React.useState(false);

  React.useEffect(() => {
    if (!open) { setEntered(false); return; }
    const onKey = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', onKey);
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setEntered(true)); });
    const settle = setTimeout(() => setEntered(true), 300);
    return () => {
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2); clearTimeout(settle);
    };
  }, [open, onClose]);
  if (!open) return null;

  const on = reduced || entered;

  const tick = (pos) => ({
    position: 'absolute', width: 10, height: 10, pointerEvents: 'none',
    borderColor: 'var(--accent-soft)', borderStyle: 'solid', borderWidth: 0, ...pos,
  });

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'color-mix(in srgb, var(--bg) 72%, transparent)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-5)',
        opacity: on ? 1 : 0,
        transition: 'opacity var(--ease)',
      }}>
      <div role="dialog" aria-modal="true" style={{
        position: 'relative', width, maxWidth: '100%', maxHeight: '85vh', overflowY: 'auto',
        background: 'var(--surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)',
        transform: on ? 'none' : 'translateY(16px)',
        transition: 'transform var(--snap)',
        ...style,
      }}>
        <span style={tick({ top: -1, left: -1, borderTopWidth: 1, borderLeftWidth: 1 })}></span>
        <span style={tick({ top: -1, right: -1, borderTopWidth: 1, borderRightWidth: 1 })}></span>
        <span style={tick({ bottom: -1, left: -1, borderBottomWidth: 1, borderLeftWidth: 1 })}></span>
        <span style={tick({ bottom: -1, right: -1, borderBottomWidth: 1, borderRightWidth: 1 })}></span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: 'var(--space-5) var(--space-5) 0' }}>
          <div>
            {kicker && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--accent-soft)', marginBottom: 'var(--space-2)' }}>{kicker}</div>}
            {title && <h3 style={{ margin: 0, fontSize: 'var(--text-h3)', fontWeight: 500 }}>{title}</h3>}
          </div>
          {onClose && (
            <button onClick={onClose} style={{
              background: 'none', border: 'none', cursor: 'pointer', outline: 'none', padding: 0,
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.14em',
              color: 'var(--text-muted)', textTransform: 'uppercase',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >[ esc ]</button>
          )}
        </div>
        <div style={{ padding: 'var(--space-4) var(--space-5) var(--space-5)', color: 'var(--text-muted)', fontSize: 'var(--text-small)' }}>{children}</div>
        {footer && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)', padding: 'var(--space-4) var(--space-5)', borderTop: '1px solid var(--border)' }}>{footer}</div>}
      </div>
    </div>
  );
}
