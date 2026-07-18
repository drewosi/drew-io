import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS TypeText — mono typewriter with a block caret. For labels, code
 * lines, and boot messages; constant cadence, no easing tricks.
 */
export function TypeText({ text = '', speed = 34, delay = 0, caret = true, style }) {
  const reduced = useReducedMotion();
  const [n, setN] = React.useState(reduced ? text.length : 0);
  const [done, setDone] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) { setN(text.length); setDone(true); return; }
    setN(0); setDone(false);
    let i = 0, interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= text.length) { clearInterval(interval); setDone(true); }
      }, speed);
    }, delay);
    // guarantee settle even if timers are throttled unevenly
    const settle = setTimeout(() => { setN(text.length); setDone(true); }, delay + text.length * speed + 800);
    return () => { clearTimeout(start); clearTimeout(settle); if (interval) clearInterval(interval); };
  }, [text, speed, delay, reduced]);

  return (
    <span style={{ fontFamily: 'var(--font-mono)', ...style }}>
      {text.slice(0, n)}
      {caret && <span aria-hidden="true" className={done ? 'clock-tick' : undefined} style={{
        display: 'inline-block', width: '0.55em', height: '1em', verticalAlign: 'text-bottom',
        background: 'var(--accent-soft)', marginLeft: 2,
      }}></span>}
    </span>
  );
}
