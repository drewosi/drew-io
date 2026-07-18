import React from 'react';

/**
 * DREW.OS Progress — 2px hairline track, ice fill, mono readout.
 */
export function Progress({ value = 0, label, showValue = true, style }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div style={{ ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
          {label ? <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{label}</span> : <span></span>}
          {showValue && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-soft)', fontVariantNumeric: 'tabular-nums' }}>{v}%</span>}
        </div>
      )}
      <div style={{ height: 2, background: 'var(--border)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: '0 auto 0 0', width: v + '%', background: 'var(--accent)', transition: 'width 900ms var(--snap-fn)' }}></div>
      </div>
    </div>
  );
}
