import React from 'react';

/**
 * DREW.OS ThemeToggle — mono switch between dark and frost (light) themes.
 * Sets data-theme on <html> and reports via onChange.
 */
export function ThemeToggle({ theme: themeProp, onChange, style }) {
  const [internal, setInternal] = React.useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  );
  const theme = themeProp ?? internal;
  const [hover, setHover] = React.useState(false);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setInternal(next);
    if (onChange) onChange(next);
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Toggle theme"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        background: hover ? 'var(--glow)' : 'transparent',
        color: hover ? 'var(--text)' : 'var(--text-muted)',
        border: '1px solid ' + (hover ? 'var(--accent-soft)' : 'var(--border)'),
        borderRadius: 'var(--radius-sm)', padding: '9px 16px', cursor: 'pointer',
        transition: 'background var(--ease), color var(--ease), border-color var(--ease)',
        ...style,
      }}
    >
      <span aria-hidden="true">{theme === 'dark' ? '●' : '○'}</span>
      <span>{theme === 'dark' ? 'dark' : 'frost'}</span>
    </button>
  );
}
