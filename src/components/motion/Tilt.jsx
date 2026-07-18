import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';
import { useSpring } from '../../motion/spring.js';

/**
 * DREW.OS Tilt — a surface that leans toward the pointer, never more than 2°,
 * on critically damped springs. Compose it around a Card or media frame:
 * <Tilt><Card variant="feature">…</Card></Tilt>. Pointer-fine devices only;
 * keyboard focus, touch, and reduced motion see a perfectly still surface.
 */
export function Tilt({ maxTilt = 2, perspective = 800, as: Tag = 'div', style, children, ...rest }) {
  const reduced = useReducedMotion();
  const inner = React.useRef(null);
  const rot = React.useRef({ x: 0, y: 0 });
  const apply = () => {
    const el = inner.current;
    if (el) {
      el.style.transform =
        'perspective(' + perspective + 'px) rotateX(' + rot.current.x.toFixed(3) + 'deg) rotateY(' + rot.current.y.toFixed(3) + 'deg)';
    }
  };
  const rx = useSpring((v) => { rot.current.x = v; apply(); });
  const ry = useSpring((v) => { rot.current.y = v; apply(); });
  const [fine] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const active = fine && !reduced;
  const cap = Math.min(Math.abs(maxTilt), 2); // the law: ≤ --field-tilt

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1);
    ry.set(Math.max(-cap, Math.min(cap, dx * cap)));
    rx.set(Math.max(-cap, Math.min(cap, -dy * cap)));
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <Tag
      style={style}
      onPointerMove={active ? onMove : undefined}
      onPointerLeave={active ? onLeave : undefined}
      {...rest}
    >
      <div ref={inner}>{children}</div>
    </Tag>
  );
}
