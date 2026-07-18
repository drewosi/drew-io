import React from 'react';

/**
 * DREW.OS Radio — 16px hairline circle; selected = inner ice dot.
 */
export function Radio({ checked = false, onChange, label, disabled = false, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      role="radio" aria-checked={checked} disabled={disabled}
      onClick={() => { if (!disabled && onChange) onChange(true); }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
        background: 'none', border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none',
        opacity: disabled ? 0.4 : 1,
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)',
        color: checked || hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color var(--ease)',
        ...style,
      }}>
      <span style={{
        width: 16, height: 16, flexShrink: 0, position: 'relative', borderRadius: '50%',
        border: '1px solid ' + (checked ? 'var(--accent)' : hover ? 'var(--accent-soft)' : 'var(--border)'),
        background: 'var(--surface)',
        transition: 'border-color var(--ease)',
      }}>
        <span style={{
          position: 'absolute', inset: 4, background: 'var(--accent)', borderRadius: '50%',
          opacity: checked ? 1 : 0, transition: 'opacity var(--ease)',
        }}></span>
      </span>
      {label && <span>{label}</span>}
    </button>
  );
}

/**
 * DREW.OS RadioGroup — vertical or horizontal set of Radios bound to one value.
 */
export function RadioGroup({ items = [], value, onChange, direction = 'column', style }) {
  return (
    <div role="radiogroup" style={{ display: 'flex', flexDirection: direction, gap: direction === 'column' ? 'var(--space-3)' : 'var(--space-5)', ...style }}>
      {items.map(it => {
        const id = it.id ?? it;
        const label = it.label ?? it;
        return <Radio key={id} label={label} checked={value === id} onChange={() => onChange && onChange(id)} />;
      })}
    </div>
  );
}
