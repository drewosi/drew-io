import React from 'react';

/**
 * DREW.OS Textarea — Input's taller sibling. Focus doubles the hairline.
 */
export function Textarea({ style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <textarea
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      rows={4}
      style={{
        fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', lineHeight: 1.6,
        background: 'var(--surface)', color: 'var(--text)',
        border: '1px solid ' + (focus ? 'var(--accent-soft)' : 'var(--border)'),
        borderRadius: 'var(--radius-sm)',
        padding: '12px 16px', minWidth: 260, resize: 'vertical',
        outline: 'none',
        boxShadow: focus ? '0 0 0 1px var(--accent-soft)' : 'none',
        transition: 'border-color var(--ease), box-shadow var(--ease)',
        ...style,
      }}
      {...rest}
    />
  );
}
