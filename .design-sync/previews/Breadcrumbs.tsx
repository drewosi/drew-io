import React from 'react';
import { Breadcrumbs } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
);

export const Trails = () => (
  <Frame>
    <Breadcrumbs items={[{ label: 'Station' }, { label: 'Signals' }, { label: 'Band C' }]} />
    <Breadcrumbs items={[{ label: 'Station' }, { label: 'Overview' }]} />
  </Frame>
);
