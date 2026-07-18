import React from 'react';

/**
 * useScrollProgress — writes scroll depth (0–100%) into a ref'd element's
 * width via rAF, no re-renders. Pair with the `.scroll-progress` hairline.
 */
export function useScrollProgress() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? doc.scrollTop / max : 0;
      if (ref.current) ref.current.style.width = (p * 100) + '%';
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}
