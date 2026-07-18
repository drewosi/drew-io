import React from 'react';

export function useReducedMotion() {
  const [reduced, setReduced] = React.useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

/**
 * IntersectionObserver reveal — fires once when the element scrolls into view.
 * Returns [ref, visible]. Reduced motion → visible immediately.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = React.useRef(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = React.useState(reduced);
  React.useEffect(() => {
    if (reduced) { setVisible(true); return; }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold, rootMargin });
    obs.observe(el);
    // IntersectionObserver never fires in hidden/throttled tabs — fall back to
    // a geometry check on scroll + a slow interval so gated content still lands.
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.95 && r.bottom > 0) setVisible(true);
    };
    const iv = setInterval(check, 1200);
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => {
      obs.disconnect();
      clearInterval(iv);
      window.removeEventListener('scroll', check);
    };
  }, [reduced, threshold, rootMargin]);
  return [ref, visible];
}
