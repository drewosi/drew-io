import React from 'react';

/**
 * DREW.OS MonoLabel — uppercase mono index label, e.g. "01 / SYSTEM" or "[ SCROLL ]".
 */
export function MonoLabel({ muted = false, style, children }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase',
      color: muted ? 'var(--text-muted)' : 'var(--accent-soft)',
      ...style,
    }}>
      {children}
    </span>
  );
}
