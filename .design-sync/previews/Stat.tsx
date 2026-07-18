import React from 'react';
import { Stat } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 28 }}>{children}</div>
);

export const Row = () => (
  <Frame>
    <Stat label="active signals" value="128" delta="12 this week" direction="up" />
    <Stat label="uptime" value="99.98" unit="%" />
    <Stat label="latency" value="41" unit="ms" delta="6 ms" direction="down" />
    <Stat label="records" value="2,047" />
  </Frame>
);
