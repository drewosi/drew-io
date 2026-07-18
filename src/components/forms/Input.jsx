import React from 'react';

/**
 * DREW.OS Input — sharp hairline field; focus brightens the border. No glow.
 */
export function Input({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        fontFamily: 'var(--font-sans)', fontSize: '0.9375rem',
        background: 'var(--surface)', color: 'var(--text)',
        border: '1px solid ' + (focus ? 'var(--accent-soft)' : 'var(--border)'),
        borderRadius: 'var(--radius-sm)',
        padding: '12px 16px', minWidth: 260,
        outline: 'none',
        boxShadow: focus ? '0 0 0 1px var(--accent-soft)' : 'none',
        transition: 'border-color var(--ease), box-shadow var(--ease)',
        ...style,
      }}
      {...rest}
    />
  );
}
