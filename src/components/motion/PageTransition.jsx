import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS PageTransition — route-level entrance: the incoming page fades and
 * rises 10px on --snap. Keyed by route so every navigation replays it.
 */
export function PageTransition({ routeKey, children }) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = React.useState(reduced);
  React.useEffect(() => {
    if (reduced) { setEntered(true); return; }
    setEntered(false);
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setEntered(true)); });
    const settle = setTimeout(() => setEntered(true), 350);
    return () => { cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2); clearTimeout(settle); };
  }, [routeKey, reduced]);
  return (
    <div key={routeKey} style={{
      opacity: entered ? 1 : 0,
      transform: entered ? 'none' : 'translateY(10px)',
      transition: 'opacity 500ms var(--snap-fn), transform 500ms var(--snap-fn)',
    }}>
      {children}
    </div>
  );
}
