import React from 'react';

/**
 * DREW.OS BlinkDot — the status LED. A slow instrument blink (2.4s), the
 * recording-light idiom. color: any token; steady=true stops the blink.
 */
export function BlinkDot({ color = 'var(--success)', steady = false, style }) {
  return (
    <span aria-hidden="true" className={steady ? undefined : 'signal-dot'} style={{ color, ...style }}>●</span>
  );
}
