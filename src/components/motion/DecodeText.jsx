import React from 'react';

/**
 * DREW.OS DecodeText — text resolves left-to-right from instrument noise.
 * The signature reveal. Respects prefers-reduced-motion.
 */
export function DecodeText({ text = '', duration = 900, delay = 0, style }) {
  const [out, setOut] = React.useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text : '');
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setOut(text); return; }
    const glyphs = '/\\|_—·:01×+';
    let start = null, raf;
    const step = (t) => {
      if (start === null) start = t;
      const p = Math.min((t - start - delay) / duration, 1);
      if (p < 0) { raf = requestAnimationFrame(step); return; }
      const n = Math.floor(p * text.length);
      setOut(text.slice(0, n) + text.slice(n).split('').map(c =>
        c === ' ' ? ' ' : glyphs[Math.floor(Math.random() * glyphs.length)]).join(''));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    // rAF is throttled in background tabs — guarantee the text settles regardless
    const settle = setTimeout(() => setOut(text), delay + duration + 150);
    return () => { cancelAnimationFrame(raf); clearTimeout(settle); };
  }, [text, duration, delay]);
  return <span style={style}>{out || ' '}</span>;
}
