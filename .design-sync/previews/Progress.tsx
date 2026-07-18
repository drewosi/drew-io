import React from 'react';
import { Progress } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 20, minWidth: 320 }}>{children}</div>
);

export const Capacity = () => (
  <Frame>
    <Progress label="storage" value={72} />
    <Progress label="bandwidth" value={38} />
    <Progress label="compute" value={55} />
  </Frame>
);
