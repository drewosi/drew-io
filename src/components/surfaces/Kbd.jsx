import React from 'react';

/**
 * DREW.OS Kbd — one keycap. A mono glyph on --surface-raised, hairline border,
 * a single inset line at the base so it reads as a physical key. Sharp corners,
 * static — no press animation, no glow. Set several side by side for a shortcut.
 * Glyphs are the standard modifier symbols (⌘ ⇧ ⌥ ⌃ ↵ ⎋), never emoji.
 */
export function Kbd({ size = 'md', style, children }) {
  const sm = size === 'sm';
  return (
    <kbd style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      minWidth: sm ? '1.4em' : '1.7em', height: sm ? '1.5em' : '1.8em',
      padding: sm ? '0 4px' : '0 6px', boxSizing: 'border-box',
      fontFamily: 'var(--font-mono)', fontSize: sm ? '0.625rem' : 'var(--text-label)',
      fontWeight: 500, lineHeight: 1, letterSpacing: '0.04em',
      color: 'var(--text-muted)', background: 'var(--surface-raised)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
      boxShadow: 'inset 0 -1px 0 var(--border)',
      ...style,
    }}>{children}</kbd>
  );
}
