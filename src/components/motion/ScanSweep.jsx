import React from 'react';
import { useReveal, useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS ScanSweep — a 1px accent line sweeps once across a bounded surface
 * when it enters view, like an instrument calibration pass. Wrap any block;
 * the sweep overlays it. axis="x" sweeps left→right, "y" top→bottom.
 */
export function ScanSweep({ axis = 'x', duration = 1400, delay = 0, replayKey = 0, style, children }) {
  const [ref, visible] = useReveal();
  const reduced = useReducedMotion();
  const horizontal = axis === 'x';
  const run = visible && !reduced;
  return (
    <div ref={ref} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <span key={replayKey} aria-hidden="true" style={{
        position: 'absolute', pointerEvents: 'none',
        ...(horizontal
          ? { top: 0, bottom: 0, width: 1, left: run ? '100%' : '-1px' }
          : { left: 0, right: 0, height: 1, top: run ? '100%' : '-1px' }),
        background: 'var(--accent-soft)',
        opacity: run ? 0 : 0.9,
        transition: run
          ? (horizontal ? 'left ' : 'top ') + duration + 'ms linear ' + delay + 'ms, opacity 200ms linear ' + (delay + duration - 150) + 'ms'
          : 'none',
      }}></span>
    </div>
  );
}
