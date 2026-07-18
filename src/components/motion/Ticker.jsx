import React from 'react';

/**
 * DREW.OS Ticker — hairline-bound mono marquee strip. Constant velocity, pauses on hover.
 * The one sanctioned infinite loop in the system.
 */
let tickerKeyframes = false;
export function Ticker({ items = [], speed = 70, separator = '·', style }) {
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (tickerKeyframes) return;
    tickerKeyframes = true;
    const el = document.createElement('style');
    el.textContent = '@keyframes drewos-ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}';
    document.head.appendChild(el);
  }, []);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = items.flatMap((it, i) => [
    <span key={'i' + i} style={{ padding: '0 var(--space-5)' }}>{it}</span>,
    <span key={'s' + i} style={{ color: 'var(--accent-3)' }}>{separator}</span>,
  ]);
  const dur = Math.max(items.join('').length * 0.35, 900 / speed * 10);
  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow: 'hidden', whiteSpace: 'nowrap',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        background: 'var(--surface)', padding: 'var(--space-3) 0',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)',
        ...style,
      }}
    >
      <div style={{
        display: 'inline-flex', alignItems: 'center', width: 'max-content',
        animation: reduced ? 'none' : 'drewos-ticker ' + dur + 's linear infinite',
        animationPlayState: paused ? 'paused' : 'running',
      }}>
        {run}{run}
      </div>
    </div>
  );
}
