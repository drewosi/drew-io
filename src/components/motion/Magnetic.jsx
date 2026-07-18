import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';
import { useSpring } from '../../motion/spring.js';

/**
 * DREW.OS Magnetic — the field response. The wrapped element is drawn toward
 * the pointer on critically damped springs, never more than 4px, and glides
 * back to rest on leave. Decelerates; never overshoots. Pointer-fine devices
 * only — touch, keyboard focus, and reduced motion leave it perfectly still.
 * The child keeps its own hover, focus, and click behavior untouched.
 */
export function Magnetic({ maxShift = 4, as: Tag = 'span', style, children, ...rest }) {
  const reduced = useReducedMotion();
  const inner = React.useRef(null);
  const pos = React.useRef({ x: 0, y: 0 });
  const apply = () => {
    const el = inner.current;
    if (el) el.style.transform = 'translate3d(' + pos.current.x.toFixed(2) + 'px, ' + pos.current.y.toFixed(2) + 'px, 0)';
  };
  const sx = useSpring((v) => { pos.current.x = v; apply(); });
  const sy = useSpring((v) => { pos.current.y = v; apply(); });
  const [fine] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const active = fine && !reduced;
  const cap = Math.min(Math.abs(maxShift), 4); // the law: ≤ --field-shift

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1);
    sx.set(Math.max(-cap, Math.min(cap, dx * cap)));
    sy.set(Math.max(-cap, Math.min(cap, dy * cap)));
  };
  const onLeave = () => { sx.set(0); sy.set(0); };

  return (
    <Tag
      style={{ display: 'inline-block', ...style }}
      onPointerMove={active ? onMove : undefined}
      onPointerLeave={active ? onLeave : undefined}
      {...rest}
    >
      <span ref={inner} style={{ display: 'inline-block' }}>{children}</span>
    </Tag>
  );
}
