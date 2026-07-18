import React from 'react';

/**
 * DREW.OS Select — styled native select matching Input, mono ▾ affordance.
 */
export function Select({ items, style, children, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <select
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: '0.9375rem', appearance: 'none', WebkitAppearance: 'none',
          background: 'var(--surface)', color: 'var(--text)',
          border: '1px solid ' + (focus ? 'var(--accent-soft)' : 'var(--border)'),
          borderRadius: 'var(--radius-sm)',
          padding: '12px 40px 12px 16px', minWidth: 200,
          outline: 'none', cursor: 'pointer',
          boxShadow: focus ? '0 0 0 1px var(--accent-soft)' : 'none',
          transition: 'border-color var(--ease), box-shadow var(--ease)',
          ...style,
        }}
        {...rest}
      >
        {items ? items.map(it => <option key={it.value ?? it} value={it.value ?? it}>{it.label ?? it}</option>) : children}
      </select>
      <span style={{
        position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
        pointerEvents: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.55rem', color: 'var(--text-muted)',
      }}>▾</span>
    </span>
  );
}
