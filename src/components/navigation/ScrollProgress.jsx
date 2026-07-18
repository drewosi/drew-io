import React from 'react';

/**
 * DREW.OS ScrollProgress — a 2px hairline track with an ice fill and a mono
 * percent readout. The readout is an instrument, so it reads three digits —
 * 042%, 100%. Controlled: pass value in 0..1 (typically scrollTop / (scrollHeight
 * - clientHeight)). The fill eases on --ease; it does not spring. For a whole-page
 * top rail, drive it from the useScrollProgress hook instead.
 */
export function ScrollProgress({ value = 0, showLabel = true, style }) {
  const v = Math.max(0, Math.min(1, value));
  const pct = Math.round(v * 100);
  const readout = (pct >= 100 ? '100' : String(pct).padStart(3, '0')) + '%';
  return (
    <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
      style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', ...style }}>
      <div style={{ position: 'relative', flex: 1, height: 2, background: 'var(--border)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: (v * 100) + '%', background: 'var(--accent)', transition: 'width var(--ease)' }}></div>
      </div>
      {showLabel && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.12em', color: 'var(--text-muted)', flex: '0 0 auto', fontVariantNumeric: 'tabular-nums' }}>{readout}</span>
      )}
    </div>
  );
}
