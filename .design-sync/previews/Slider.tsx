import React from 'react';
import { Slider } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 24 }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <Slider defaultValue={64} label="receiver gain" unit="%" width={300} />
    <Slider defaultValue={22} label="bandwidth" unit="%" width={300} />
  </Frame>
);
