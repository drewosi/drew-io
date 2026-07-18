import React from 'react';
import { Tabs } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const Default = () => (
  <Frame><Tabs
    items={[
      { id: 'overview', label: 'Overview' },
      { id: 'signals', label: 'Signals' },
      { id: 'records', label: 'Records' },
      { id: 'system', label: 'System' },
    ]}
    defaultActive="signals"
  /></Frame>
);

export const TwoTabs = () => (
  <Frame><Tabs items={[{ id: 'dark', label: 'Dark' }, { id: 'frost', label: 'Frost' }]} /></Frame>
);
