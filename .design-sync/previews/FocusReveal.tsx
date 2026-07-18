import React from 'react';
import { FocusReveal, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

export const OutOfTheHaze = () => (
  <Frame>
    <FocusReveal duration={900}>
      <div style={{ fontSize: '1.6rem', fontWeight: 300 }}>Depth of field.</div>
    </FocusReveal>
    <MonoLabel muted style={{ display: 'block', marginTop: 14, fontSize: '0.58rem' }}>BLUR RESOLVES TO SHARP · FILTER DROPPED AFTER SETTLE</MonoLabel>
  </Frame>
);

export const Staggered = () => (
  <Frame>
    <div style={{ display: 'grid', gap: 14 }}>
      <FocusReveal delay={0}><MonoLabel>REC-2047 · SURFACED</MonoLabel></FocusReveal>
      <FocusReveal delay={140}><MonoLabel>REC-2046 · SURFACED</MonoLabel></FocusReveal>
      <FocusReveal delay={280}><MonoLabel>REC-2045 · SURFACED</MonoLabel></FocusReveal>
    </div>
  </Frame>
);
