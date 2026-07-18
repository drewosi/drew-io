import React from 'react';

/**
 * DREW.OS Breadcrumbs — mono trail with "/" separators; the last crumb is current.
 */
export function Breadcrumbs({ items = [], onNavigate, style }) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      ...style,
    }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        const label = typeof it === 'string' ? it : it.label;
        const id = typeof it === 'string' ? it : (it.id ?? it.label);
        return (
          <React.Fragment key={i}>
            {i > 0 && <span style={{ color: 'var(--border)' }}>/</span>}
            {last ? (
              <span style={{ color: 'var(--text)' }}>{label}</span>
            ) : (
              <button
                onClick={() => onNavigate && onNavigate(id)}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none',
                  font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit',
                  color: 'var(--text-muted)', transition: 'color var(--ease)',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-soft)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >{label}</button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
