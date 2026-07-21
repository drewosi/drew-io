import React from 'react';

/**
 * DREW.OS Button — sharp-cornered, mono uppercase, restrained.
 * variants: primary (ice fill), secondary (hairline), ghost, danger
 */
export function Button({ variant = 'primary', size = 'md', disabled = false, style, children, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const pad = size === 'sm' ? '8px 18px' : size === 'lg' ? '15px 34px' : '11px 26px';
  const fs = size === 'sm' ? '0.625rem' : size === 'lg' ? '0.75rem' : '0.6875rem';

  const variants = {
    primary: {
      background: hover ? '#FFFFFF' : 'var(--accent)',
      color: 'var(--on-accent)',
      borderColor: 'transparent',
    },
    secondary: {
      background: hover ? 'var(--glow)' : 'transparent',
      color: 'var(--text)',
      borderColor: hover ? 'var(--accent-soft)' : 'var(--border)',
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--text)' : 'var(--text-muted)',
      borderColor: 'transparent',
    },
    danger: {
      background: hover ? 'color-mix(in srgb, var(--danger) 12%, transparent)' : 'transparent',
      color: 'var(--danger)',
      borderColor: 'var(--danger)',
    },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: fs,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        borderRadius: 'var(--radius-sm)', padding: pad,
        border: '1px solid ' + v.borderColor,
        background: v.background, color: v.color,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : active ? 0.75 : 1,
        // Press compression — the sanctioned field response. Settles, never springs back past rest.
        transform: active && !disabled ? 'scale(var(--press-scale))' : 'none',
        transition: 'background var(--ease), border-color var(--ease), color var(--ease), opacity var(--ease), transform var(--dur-tap) var(--snap-fn)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
