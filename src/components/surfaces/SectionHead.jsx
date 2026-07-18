import React from 'react';
import { MonoLabel } from './MonoLabel.jsx';

/**
 * DREW.OS SectionHead — mono index kicker + light-weight h2 + muted intro.
 */
export function SectionHead({ kicker, title, children, style }) {
  return (
    <div style={{ marginBottom: 'var(--space-6)', ...style }}>
      {kicker && <MonoLabel>{kicker}</MonoLabel>}
      <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', marginTop: 'var(--space-3)', marginBottom: 0 }}>{title}</h2>
      {children && <p style={{ color: 'var(--text-muted)', marginTop: 'var(--space-3)', marginBottom: 0, maxWidth: '56ch' }}>{children}</p>}
    </div>
  );
}
