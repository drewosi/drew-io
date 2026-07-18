import React from 'react';

/**
 * DREW.OS SectionNumeral — the oversized outline index numeral, rendered as
 * a 1px stroke in depth blue. Background scale-marker, never content. Place
 * inside a `position:relative; overflow:hidden` section.
 */
export function SectionNumeral({ children, side = 'right', style }) {
  return (
    <span aria-hidden="true" style={{
      position: 'absolute', top: '-0.18em',
      [side === 'left' ? 'left' : 'right']: '-0.06em',
      fontWeight: 300, lineHeight: 1,
      fontSize: 'clamp(10rem, 24vw, 20rem)', letterSpacing: '-0.04em',
      color: 'transparent', WebkitTextStroke: '1px var(--accent-3)',
      pointerEvents: 'none', userSelect: 'none',
      ...style,
    }}>{children}</span>
  );
}
