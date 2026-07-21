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

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    setInternal(next);
    if (onChange) onChange(next);
  };

  return (
    <button
      onClick={toggle}
      className="theme-toggle"
      aria-label="Toggle theme"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        // background / color / border-color come from the .theme-toggle class,
        // so :hover and :focus-visible share one look
        borderWidth: 1, borderStyle: 'solid',
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
