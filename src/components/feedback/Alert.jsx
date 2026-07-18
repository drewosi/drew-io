import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS Alert — mono status code + headline + quiet explanation.
 * 2px status rule on the left edge; 6% tinted fill. No emoji.
 * `animate` draws the status rule down and fades the record in on mount.
 */
export function Alert({ variant = 'success', icon, title, animate = false, children, style }) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = React.useState(!animate || reduced);
  React.useEffect(() => {
    if (!animate || reduced) { setEntered(true); return; }
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setEntered(true)); });
    const settle = setTimeout(() => setEntered(true), 400);
    return () => { cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2); clearTimeout(settle); };
  }, [animate, reduced]);

  const map = {
    success: { color: 'var(--success)', code: 'OK' },
    warning: { color: 'var(--warning)', code: 'WARN' },
    danger: { color: 'var(--danger)', code: 'ERR' },
  };
  const v = map[variant] || map.success;
  return (
    <div style={{
      position: 'relative',
      display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start',
      borderRadius: 'var(--radius-sm)', padding: 'var(--space-4) var(--space-5)',
      border: '1px solid var(--border)',
      background: 'color-mix(in srgb, ' + v.color + ' 6%, transparent)',
      opacity: entered ? 1 : 0,
      transition: 'opacity 500ms var(--snap-fn)',
      ...style,
    }}>
      <span aria-hidden="true" style={{
        position: 'absolute', left: -1, top: -1, bottom: -1, width: 2, background: v.color,
        borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)',
        transform: entered ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'top',
        transition: 'transform 600ms var(--snap-fn)',
      }}></span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', color: v.color, lineHeight: 1.7, minWidth: 38,
      }}>{icon ?? v.code}</span>
      <div>
        <strong style={{ display: 'block', marginBottom: 2, fontWeight: 500 }}>{title}</strong>
        <p style={{ margin: 0, fontSize: 'var(--text-small)', color: 'var(--text-muted)' }}>{children}</p>
      </div>
    </div>
  );
}
