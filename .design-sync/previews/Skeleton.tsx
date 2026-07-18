import React from 'react';
import { Skeleton } from 'drew-io';

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--text-muted)' };
const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

export const Card = () => (
  <Frame>
    <div style={{ ...mono, marginBottom: 'var(--space-4)' }}>LOADING</div>
    <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 'var(--space-4)', alignItems: 'start' }}>
      <Skeleton variant="square" />
      <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
        <Skeleton variant="line" height={12} width="50%" />
        <Skeleton variant="text" lines={2} />
        <Skeleton variant="block" height={64} />
      </div>
    </div>
  </Frame>
);

export const Text = () => (
  <Frame>
    <Skeleton variant="text" lines={4} />
  </Frame>
);
