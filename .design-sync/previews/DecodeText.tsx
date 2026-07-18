import React from 'react';
import { DecodeText, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 32, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const Hero = () => (
  <Frame>
    <MonoLabel>01 / transmission</MonoLabel>
    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '14px 0 0', color: 'var(--text)', maxWidth: '16ch' }}>
      <DecodeText text="Ideas surface. The signature holds." duration={1200} />
    </h1>
  </Frame>
);
