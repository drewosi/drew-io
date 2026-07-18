import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';
import { useScrollField } from '../../motion/scrollField.js';

/**
 * DREW.OS Parallax — a plane that lags the scroll. Positive `depth` recedes
 * (backgrounds, ghost numerals: 0.12 far · 0.3 mid · 0.55 near); negative
 * depth advances (foreground shards). Displacement is clamped, driven by the
 * smoothed scroll field, and written straight to the element's transform —
 * no re-renders, `will-change` only while on screen. Reduced motion: static.
 */
export function Parallax({ depth = 0.3, axis = 'y', clamp = 120, as: Tag = 'div', style, children, ...rest }) {
  const reduced = useReducedMotion();
  const ref = React.useRef(null);
  const geom = React.useRef({ center: 0, vh: 1, active: false });

  React.useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      // Undo any current parallax offset so re-measures stay stable.
      geom.current.center = r.top + window.scrollY + r.height / 2 - (geom.current.offset || 0);
      geom.current.vh = window.innerHeight;
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    const io = new IntersectionObserver((entries) => {
      const on = entries.some((e) => e.isIntersecting);
      geom.current.active = on;
      el.style.willChange = on ? 'transform' : '';
    }, { rootMargin: '50% 0px' });
    io.observe(el);
    return () => { window.removeEventListener('resize', measure); io.disconnect(); };
  }, [reduced]);

  useScrollField((f) => {
    const g = geom.current;
    const el = ref.current;
    if (!g.active || !el) return;
    const viewCenter = f.smoothY + g.vh / 2;
    let d = -depth * (g.center - viewCenter);
    d = Math.max(-clamp, Math.min(clamp, d));
    g.offset = d;
    el.style.transform = axis === 'y'
      ? 'translate3d(0, ' + d.toFixed(2) + 'px, 0)'
      : 'translate3d(' + d.toFixed(2) + 'px, 0, 0)';
  }, { enabled: !reduced });

  return <Tag ref={ref} style={style} {...rest}>{children}</Tag>;
}
