import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';

/**
 * DREW.OS HairlineDraw — a 1px rule that draws itself in when it scrolls
 * into view. axis="x" (default) draws left→right; axis="y" top→bottom.
 */
export function HairlineDraw({ axis = 'x', color = 'var(--border)', delay = 0, duration = 900, length = '100%', style }) {
  const [ref, visible] = useReveal();
  const horizontal = axis === 'x';
  return (
    <span ref={ref} aria-hidden="true" style={{
      display: 'block',
      width: horizontal ? length : 1,
      height: horizontal ? 1 : length,
      background: color,
      transform: visible ? 'scale(1)' : (horizontal ? 'scaleX(0)' : 'scaleY(0)'),
      transformOrigin: horizontal ? 'left center' : 'center top',
      transition: 'transform ' + duration + 'ms var(--snap-fn) ' + delay + 'ms',
      ...style,
    }}></span>
  );
}
