import React from 'react';
import { Checkbox } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
);

export const States = () => (
  <Frame>
    <Checkbox defaultChecked label="Keep the record" />
    <Checkbox label="Remember this device" />
    <Checkbox defaultChecked disabled label="Dark-first (locked)" />
  </Frame>
);
