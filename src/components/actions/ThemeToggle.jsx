import React from 'react';
import { getTheme, toggleTheme } from '../../theme.js';

/**
 * DREW.OS ThemeToggle — mono switch between dark and frost (light) themes.
 * Delegates to theme.js (persistence + broadcast) and reports via onChange.
 */
export function ThemeToggle({ theme: themeProp, onChange, style }) {
  const [internal, setInternal] = React.useState(getTheme);
  const theme = themeProp ?? internal;

  // Stay in sync when the theme changes elsewhere (command palette, T hotkey).
  React.useEffect(() => {
    const onTheme = (e) => setInternal(e.detail);
    window.addEventListener('drewos:theme', onTheme);
    return () => window.removeEventListener('drewos:theme', onTheme);
  }, []);

  const toggle = () => {
    const next = toggleTheme();
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
