import React from 'react';

// The DS ships only token CSS — like Skeleton, the grain carries its own
// keyframe, injected once, with its own reduced-motion guard baked in.
const KF_ID = 'drewos-grain-kf';
function ensureKeyframes() {
  if (typeof document === 'undefined' || document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent =
    '@keyframes drewos-grain-shift{' +
    '0%{background-position:0 0}12.5%{background-position:-17px 9px}25%{background-position:11px -13px}' +
    '37.5%{background-position:-9px -19px}50%{background-position:19px 7px}62.5%{background-position:-15px 15px}' +
    '75%{background-position:13px 19px}87.5%{background-position:-7px -9px}100%{background-position:0 0}}' +
    '@media (prefers-reduced-motion: reduce){.drewos-grain{animation:none !important;opacity:calc(var(--grain-alpha) * 0.6) !important}}';
  document.head.appendChild(s);
}

// 128px monochrome noise tile — inline SVG feTurbulence, no asset, no request.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='128' height='128' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * DREW.OS FilmGrain — the atmosphere. A faint monochrome noise field over the
 * whole surface, stepped at ~9fps so it reads as film, not video. Decoration
 * only: aria-hidden, pointer-events none, and — with the Ticker — one of the
 * two sanctioned infinite loops. One per page. Reduced motion: the grain
 * holds still at reduced opacity.
 */
export function FilmGrain({ alpha = 'var(--grain-alpha)', blend = 'overlay', fixed = true, style }) {
  React.useEffect(() => { ensureKeyframes(); }, []);
  return (
    <div className="drewos-grain" aria-hidden="true" style={{
      position: fixed ? 'fixed' : 'absolute',
      inset: 0, zIndex: 70, pointerEvents: 'none',
      backgroundImage: NOISE, backgroundRepeat: 'repeat',
      opacity: alpha, mixBlendMode: blend,
      animation: 'drewos-grain-shift 0.9s steps(1) infinite',
      ...style,
    }}></div>
  );
}
