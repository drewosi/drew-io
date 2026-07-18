import React from 'react';

/**
 * DREW.OS Checkbox — 16px square, hairline; checked = inner ice square.
 */
export function Checkbox({ checked, defaultChecked = false, onChange, label, disabled = false, style }) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked ?? internal;
  const [hover, setHover] = React.useState(false);
  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    setInternal(next);
    if (onChange) onChange(next);
  };
  return (
    <button
      role="checkbox" aria-checked={isOn} disabled={disabled}
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
        background: 'none', border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none',
        opacity: disabled ? 0.4 : 1,
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)',
        color: isOn || hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color var(--ease)',
        ...style,
      }}>
      <span style={{
        width: 16, height: 16, flexShrink: 0, position: 'relative',
        border: '1px solid ' + (isOn ? 'var(--accent)' : hover ? 'var(--accent-soft)' : 'var(--border)'),
        borderRadius: '1px', background: 'var(--surface)',
        transition: 'border-color var(--ease)',
      }}>
        <span style={{
          position: 'absolute', inset: 3, background: 'var(--accent)', borderRadius: '1px',
          opacity: isOn ? 1 : 0, transition: 'opacity var(--ease)',
        }}></span>
      </span>
      {label && <span>{label}</span>}
    </button>
  );
}
