import React from 'react';

/**
 * DREW.OS Badge — mono uppercase tag, sharp corners, faint tinted fill.
 */
export function Badge({ variant = 'accent', style, children }) {
  const colors = {
    accent: { c: 'var(--accent-soft)', b: 'var(--accent-3)', fill: 'color-mix(in srgb, var(--accent-soft) 8%, transparent)' },
    success: { c: 'var(--success)', b: 'var(--success)', fill: 'color-mix(in srgb, var(--success) 8%, transparent)' },
    warning: { c: 'var(--warning)', b: 'var(--warning)', fill: 'color-mix(in srgb, var(--warning) 8%, transparent)' },
    danger: { c: 'var(--danger)', b: 'var(--danger)', fill: 'color-mix(in srgb, var(--danger) 8%, transparent)' },
  };
  const v = colors[variant] || colors.accent;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      borderRadius: 'var(--radius-sm)', padding: '4px 10px',
      background: v.fill, color: v.c, border: '1px solid color-mix(in srgb, ' + v.b + ' 55%, transparent)',
      ...style,
    }}>
      {children}
    </span>
  );
}
