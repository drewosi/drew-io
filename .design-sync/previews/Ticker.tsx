import React from 'react';
import { Ticker } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', borderRadius: 4, border: '1px solid var(--border)', overflow: 'hidden' }}>{children}</div>
);

export const Marquee = () => (
  <Frame>
    <Ticker items={['64.7331° N · 18.1059° W', 'SIGNAL OK', 'DARK-FIRST, SILENT-ALWAYS', 'ONE HUE, FOUR DEPTHS', 'EST. 2026']} />
  </Frame>
);
