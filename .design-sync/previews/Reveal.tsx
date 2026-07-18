import React from 'react';
import { Reveal, Card, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const OnMount = () => (
  <Frame>
    <Reveal mounted>
      <Card variant="feature" style={{ maxWidth: 340 }}>
        <MonoLabel muted>02.1</MonoLabel>
        <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 500, margin: '12px 0 8px', color: 'var(--text)' }}>Interfaces</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: 0 }}>Fades and rises 12px on the long deceleration curve. Nothing bounces.</p>
      </Card>
    </Reveal>
  </Frame>
);
