import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';

/**
 * DREW.OS StaggerChildren — reveals its children one after another on the
 * long deceleration curve when the wrapper scrolls into view. Children keep
 * their own layout; each gets opacity + 12px rise, `step` ms apart.
 */
export function StaggerChildren({ step = 110, initialDelay = 0, as: Tag = 'div', style, children, ...rest }) {
  const [ref, visible] = useReveal();
  return (
    <Tag ref={ref} style={style} {...rest}>
      {React.Children.map(children, (child, i) => (
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(12px)',
          transition: 'opacity 600ms var(--snap-fn) ' + (initialDelay + i * step) + 'ms, transform 600ms var(--snap-fn) ' + (initialDelay + i * step) + 'ms',
        }}>{child}</div>
      ))}
    </Tag>
  );
}
