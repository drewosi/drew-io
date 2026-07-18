import React from 'react';
import { HairlineDraw, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 18, minWidth: 340 }}>{children}</div>
);

export const Rules = () => (
  <Frame>
    <MonoLabel muted>hairlines draw in on view</MonoLabel>
    <HairlineDraw />
    <HairlineDraw color="var(--accent-3)" delay={150} />
    <HairlineDraw color="var(--accent-soft)" delay={300} />
  </Frame>
);
