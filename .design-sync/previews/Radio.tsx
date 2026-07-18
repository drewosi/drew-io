import React from 'react';
import { Radio } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
);

export const States = () => (
  <Frame>
    <Radio checked label="Wide sweep" />
    <Radio label="Deep sweep" />
    <Radio disabled label="Still (locked)" />
  </Frame>
);
