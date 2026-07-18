import React from 'react';
import { PageTransition, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const Route = () => (
  <Frame>
    <PageTransition routeKey="console">
      <MonoLabel>04 / console</MonoLabel>
      <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 300, letterSpacing: '-0.02em', margin: '12px 0 0', color: 'var(--text)' }}>Station overview</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: '10px 0 0', maxWidth: '46ch' }}>Each navigation fades and rises the incoming page 10px on the snap curve.</p>
    </PageTransition>
  </Frame>
);
