import React from 'react';

// The looping shimmer needs a keyframe. The DS ships only token CSS (no per-
// component stylesheet and no app.css), so Skeleton carries its own keyframe,
// injected once, with its own reduced-motion guard.
const KF_ID = 'drewos-skeleton-kf';
function ensureKeyframes() {
  if (typeof document === 'undefined' || document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent =
    '@keyframes drewos-skeleton-sweep{0%{background-position:180% 0}100%{background-position:-80% 0}}' +
    '@media (prefers-reduced-motion: reduce){.drewos-skeleton{animation:none !important}}';
  document.head.appendChild(s);
}

function Bar({ w, h, r = 'var(--radius-sm)' }) {
  return (
    <div className="drewos-skeleton" aria-hidden="true" style={{
      width: w, height: h, borderRadius: r,
      background: 'linear-gradient(90deg, var(--surface-raised) 0%, var(--surface-raised) 40%, var(--glow-strong) 50%, var(--surface-raised) 60%, var(--surface-raised) 100%)',
      backgroundSize: '220% 100%', animation: 'drewos-skeleton-sweep 2.4s linear infinite',
    }}></div>
  );
}

/**
 * DREW.OS Skeleton — a loading placeholder. A raised block carries a slow frost
 * band that sweeps across it every 2.4s, linear — it does not pulse or bounce,
 * and never glow-blurs. Under prefers-reduced-motion the band holds still. Hold
 * a component's shape while its data loads. Variants: text (a stack of lines, the
 * last short), block, line, square.
 */
export function Skeleton({ variant = 'text', lines = 3, width, height, style }) {
  React.useEffect(() => { ensureKeyframes(); }, []);

  if (variant === 'text') {
    return (
      <div role="status" aria-busy="true" style={{ display: 'grid', gap: 'var(--space-3)', ...style }}>
        {Array.from({ length: lines }).map((_, i) => (
          <Bar key={i} w={i === lines - 1 ? '60%' : '100%'} h="0.8em" />
        ))}
      </div>
    );
  }
  if (variant === 'square') {
    return <div role="status" aria-busy="true" style={style}><Bar w={width || 44} h={height || 44} r="var(--radius-md)" /></div>;
  }
  // block | line
  return <div role="status" aria-busy="true" style={style}><Bar w={width || '100%'} h={height || (variant === 'line' ? 2 : 96)} r="var(--radius-md)" /></div>;
}
