import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';

const MASKS = {
  up: 'inset(100% 0 0 0)',
  down: 'inset(0 0 100% 0)',
  left: 'inset(0 0 0 100%)',
  right: 'inset(0 100% 0 0)',
};

/**
 * DREW.OS MaskReveal — a clip wipe for images and headlines. The content is
 * already in place; a straight edge uncovers it in the given direction on the
 * deceleration curve. One-shot; the clip-path is dropped after settling.
 */
export function MaskReveal({ direction = 'up', delay = 0, duration = 900, as: Tag = 'div', style, children, ...rest }) {
  const [ref, visible] = useReveal();
  const [settled, setSettled] = React.useState(false);
  React.useEffect(() => {
    if (!visible || settled) return;
    const t = setTimeout(() => setSettled(true), delay + duration + 150);
    return () => clearTimeout(t);
  }, [visible, settled, delay, duration]);

  const anim = settled ? null : {
    clipPath: visible ? 'inset(0 0 0 0)' : (MASKS[direction] || MASKS.up),
    transition: 'clip-path ' + duration + 'ms var(--snap-fn) ' + delay + 'ms',
  };
  return <Tag ref={ref} style={{ ...anim, ...style }} {...rest}>{children}</Tag>;
}
