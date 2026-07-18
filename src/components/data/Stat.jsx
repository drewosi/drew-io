import React from 'react';

/**
 * DREW.OS Stat — mono label, weight-300 value, optional mono delta.
 */
export function Stat({ label, value, unit, delta, direction, style }) {
  const deltaColor = direction === 'down' ? 'var(--danger)' : direction === 'up' ? 'var(--success)' : 'var(--text-muted)';
  return (
    <div style={{ ...style }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)',
        marginBottom: 'var(--space-2)',
      }}>{label}</div>
      <div style={{ fontSize: '2.4rem', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1.05, color: 'var(--text)', fontVariantNumeric: 'tabular-nums' }}>
        {value}{unit && <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: deltaColor, marginTop: 'var(--space-2)' }}>
          {direction === 'down' ? '↓' : direction === 'up' ? '↑' : '—'} {delta}
        </div>
      )}
    </div>
  );
}
