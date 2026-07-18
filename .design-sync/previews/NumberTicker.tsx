import React from 'react';
import { NumberTicker, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', gap: 40 }}>{children}</div>
);
const cell = (label: string, node: React.ReactNode) => (
  <div>
    <MonoLabel muted style={{ display: 'block', marginBottom: 8 }}>{label}</MonoLabel>
    <div style={{ fontSize: '2.2rem', fontWeight: 300, letterSpacing: '-0.02em', color: 'var(--text)' }}>{node}</div>
  </div>
);

export const Live = () => (
  <Frame>
    {cell('latency', <NumberTicker value={41} suffix=" ms" style={{ fontFamily: 'var(--font-sans)' }} />)}
    {cell('signals', <NumberTicker value={128} style={{ fontFamily: 'var(--font-sans)' }} />)}
    {cell('uptime', <NumberTicker value={99.98} decimals={2} suffix="%" style={{ fontFamily: 'var(--font-sans)' }} />)}
  </Frame>
);
