import React from 'react';

/**
 * DREW.OS Card — three elevations: base, raised, feature (corner-tick frame).
 */
export function Card({ variant = 'base', hoverable = true, style, children, ...rest }) {
  const [hover, setHover] = React.useState(false);

  const base = {
    borderRadius: 'var(--radius-lg)', padding: 'var(--space-5)',
    transition: 'border-color var(--ease), background var(--ease), box-shadow var(--ease)',
  };

  if (variant === 'feature') {
    const tick = (pos) => ({
      position: 'absolute', width: 10, height: 10, pointerEvents: 'none',
      borderColor: hoverable && hover ? 'var(--accent)' : 'var(--accent-soft)',
      borderStyle: 'solid', borderWidth: 0,
      transition: 'border-color var(--ease)',
      ...pos,
    });
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          ...base,
          position: 'relative', background: 'var(--surface)',
          border: '1px solid ' + (hoverable && hover ? 'var(--accent-2)' : 'var(--border)'),
          boxShadow: hoverable && hover ? 'var(--shadow-card)' : 'none',
          ...style,
        }}
        {...rest}
      >
        <span style={tick({ top: -1, left: -1, borderTopWidth: 1, borderLeftWidth: 1 })}></span>
        <span style={tick({ top: -1, right: -1, borderTopWidth: 1, borderRightWidth: 1 })}></span>
        <span style={tick({ bottom: -1, left: -1, borderBottomWidth: 1, borderLeftWidth: 1 })}></span>
        <span style={tick({ bottom: -1, right: -1, borderBottomWidth: 1, borderRightWidth: 1 })}></span>
        {children}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        background: variant === 'raised' ? 'var(--surface-raised)' : 'var(--surface)',
        border: '1px solid ' + (hoverable && hover ? 'var(--accent-2)' : 'var(--border)'),
        boxShadow: variant === 'raised' ? 'var(--shadow-card)' : 'none',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
