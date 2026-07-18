import React from 'react';

/**
 * DREW.OS Tooltip — mono strip above the child on hover/focus. Fades with a 2px settle.
 */
export function Tooltip({ label, side = 'top', style, children }) {
  const [show, setShow] = React.useState(false);
  const pos = side === 'bottom'
    ? { top: 'calc(100% + 6px)' }
    : { bottom: 'calc(100% + 6px)' };
  const hiddenShift = side === 'bottom' ? 'translate(-50%, -2px)' : 'translate(-50%, 2px)';
  return (
    <span
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-block', ...style }}>
      {children}
      <span style={{
        position: 'absolute', left: '50%', transform: show ? 'translate(-50%, 0)' : hiddenShift, ...pos, zIndex: 150,
        whiteSpace: 'nowrap', pointerEvents: 'none',
        background: 'var(--surface-raised)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', padding: '5px 10px',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem', fontWeight: 500,
        letterSpacing: '0.1em', color: 'var(--text)',
        opacity: show ? 1 : 0, transition: 'opacity var(--ease), transform var(--snap)',
      }}>{label}</span>
    </span>
  );
}
