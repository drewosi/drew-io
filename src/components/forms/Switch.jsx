import React from 'react';

/**
 * DREW.OS Switch — rectangular toggle, square thumb. On = ice, off = dormant.
 * The thumb glides on --snap.
 */
export function Switch({ checked, defaultChecked = false, onChange, style }) {
  const [internal, setInternal] = React.useState(defaultChecked);
  const isOn = checked ?? internal;

  const toggle = () => {
    const next = !isOn;
    setInternal(next);
    if (onChange) onChange(next);
  };

  return (
    <button
      role="switch"
      aria-checked={isOn}
      onClick={toggle}
      style={{
        position: 'relative', width: 44, height: 22, padding: 0,
        background: isOn ? 'var(--accent)' : 'var(--surface-raised)',
        border: '1px solid ' + (isOn ? 'var(--accent)' : 'var(--border)'),
        borderRadius: 'var(--radius-sm)', cursor: 'pointer',
        transition: 'background var(--ease), border-color var(--ease)',
        ...style,
      }}
    >
      <span style={{
        position: 'absolute', height: 14, width: 14, left: 3, top: 3,
        background: isOn ? 'var(--on-accent)' : 'var(--text-muted)',
        borderRadius: '1px',
        transform: isOn ? 'translateX(22px)' : 'none',
        transition: 'transform var(--snap), background var(--ease)',
      }}></span>
    </button>
  );
}
