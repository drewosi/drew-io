import React from 'react';
import { TypeText } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
);

export const Boot = () => (
  <Frame>
    <TypeText text="> calibration complete. signal ok." speed={38} style={{ fontSize: '0.9rem', color: 'var(--success)' }} />
    <TypeText text="> deep survey, sector 7 — logged." speed={38} delay={400} style={{ fontSize: '0.9rem', color: 'var(--accent-soft)' }} />
  </Frame>
);
