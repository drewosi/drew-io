import React from 'react';

/**
 * DREW.OS ChartFrame — instrument-panel chart container: mono title bar,
 * hairline grid, optional built-in bar rendering from `data`.
 * Bars rise on --snap with a per-bar stagger, so passing zeros → data
 * produces the draw-on sweep.
 */
export function ChartFrame({ title, meta, height = 180, data, max, stagger = 0, children, style }) {
  const peak = max ?? (data ? Math.max(...data, 1) : 1);
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', ...style }}>
      {(title || meta) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text)',
          }}>{title}</span>
          {meta && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>{meta}</span>}
        </div>
      )}
      <div style={{
        position: 'relative', height, margin: 16,
        backgroundImage: 'repeating-linear-gradient(to top, var(--border) 0, var(--border) 1px, transparent 1px, transparent 25%)',
        backgroundSize: '100% 100%',
      }}>
        {data ? (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', gap: 3 }}>
            {data.map((d, i) => (
              <div key={i} title={String(d)} style={{
                flex: 1, height: Math.max(2, (d / peak) * 100) + '%',
                background: 'var(--accent-3)', borderTop: '1px solid var(--accent-soft)',
                transition: 'height 600ms var(--snap-fn) ' + (i * stagger) + 'ms',
              }}></div>
            ))}
          </div>
        ) : children}
      </div>
    </div>
  );
}
