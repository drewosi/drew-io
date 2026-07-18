import React from 'react';
import { Input, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
);

export const Fields = () => (
  <Frame>
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MonoLabel muted>address</MonoLabel>
      <Input placeholder="you@station.io" />
    </label>
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <MonoLabel muted>callsign</MonoLabel>
      <Input defaultValue="STATION-07" />
    </label>
  </Frame>
);
