import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';

/**
 * DREW.OS FocusReveal — depth-of-field entrance. Content arrives out of the
 * haze: blur resolves to sharp while it fades in and rises, all on the long
 * deceleration curve. The filter (and its transition) are removed from the
 * element once settled — blur is allowed only in transit, never at rest.
 */
export function FocusReveal({ delay = 0, duration = 900, rise = 16, startBlur = 14, as: Tag = 'div', style, children, ...rest }) {
  const [ref, visible] = useReveal();
  const [settled, setSettled] = React.useState(false);
  React.useEffect(() => {
    if (!visible || settled) return;
    const t = setTimeout(() => setSettled(true), delay + duration + 150);
    return () => clearTimeout(t);
  }, [visible, settled, delay, duration]);

  const anim = settled ? null : {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(' + rise + 'px)',
    filter: visible ? 'blur(0px)' : 'blur(' + startBlur + 'px)',
    transition:
      'opacity ' + duration + 'ms var(--snap-fn) ' + delay + 'ms, ' +
      'transform ' + duration + 'ms var(--snap-fn) ' + delay + 'ms, ' +
      'filter ' + duration + 'ms var(--snap-fn) ' + delay + 'ms',
  };
  return <Tag ref={ref} style={{ ...anim, ...style }} {...rest}>{children}</Tag>;
}
