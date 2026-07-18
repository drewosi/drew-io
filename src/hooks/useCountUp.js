import React from 'react';
import { useReducedMotion } from './useReveal.js';

/**
 * Count-up on the system's deceleration curve. Returns a formatted string
 * (thousands separators, fixed decimals matched to the target).
 */
export function useCountUp(target, { visible = true, duration = 1400, delay = 0, decimals = 0 } = {}) {
  const reduced = useReducedMotion();
  const [n, setN] = React.useState(reduced ? target : 0);
  React.useEffect(() => {
    if (reduced) { setN(target); return; }
    if (!visible) return;
    let start = null, raf;
    const step = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start - delay) / duration, 1);
      if (p < 0) { raf = requestAnimationFrame(step); return; }
      const eased = 1 - Math.pow(1 - p, 3); // decelerate — nothing bounces
      setN(target * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // rAF stalls in throttled/background tabs — guarantee the value settles
    const settle = setTimeout(() => setN(target), delay + duration + 150);
    return () => { cancelAnimationFrame(raf); clearTimeout(settle); };
  }, [visible, target, duration, delay, reduced]);
  return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
