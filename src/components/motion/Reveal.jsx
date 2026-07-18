import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';

/**
 * DREW.OS Reveal — scroll-triggered fade + 12px rise on the long deceleration
 * curve. `delay` staggers siblings. `mounted` mode reveals on mount instead
 * (boot sequence). Never more than opacity + small translate — nothing bounces.
 */
export function Reveal({ delay = 0, mounted = false, as: Tag = 'div', style, children, ...rest }) {
  const [ref, seen] = useReveal();
  const [booted, setBooted] = React.useState(false);
  React.useEffect(() => {
    if (!mounted) return;
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setBooted(true)); });
    // rAF stalls in throttled/background tabs — make sure the boot still completes
    const settle = setTimeout(() => setBooted(true), 400);
    return () => { cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2); clearTimeout(settle); };
  }, [mounted]);
  const visible = mounted ? booted : seen;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(12px)',
        transition: 'opacity 700ms var(--snap-fn) ' + delay + 'ms, transform 700ms var(--snap-fn) ' + delay + 'ms',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
