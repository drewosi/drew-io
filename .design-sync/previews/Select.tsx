import React from 'react';
import { Select, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <MonoLabel muted>timezone</MonoLabel>
    <Select items={[
      { value: 'utc', label: 'UTC (station time)' },
      { value: 'e', label: 'UTC −5 · Eastern' },
      { value: 'p', label: 'UTC −8 · Pacific' },
    ]} />
  </Frame>
);
