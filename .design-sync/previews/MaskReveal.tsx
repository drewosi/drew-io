import React from 'react';
import { MaskReveal, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

export const Up = () => (
  <Frame>
    <MaskReveal direction="up" duration={900}>
      <div style={{ fontSize: '1.6rem', fontWeight: 300 }}>Uncovered, not moved.</div>
    </MaskReveal>
    <MonoLabel muted style={{ display: 'block', marginTop: 14, fontSize: '0.58rem' }}>CLIP WIPE ON THE DECELERATION CURVE</MonoLabel>
  </Frame>
);

export const Directions = () => (
  <Frame>
    <div style={{ display: 'grid', gap: 14 }}>
      <MaskReveal direction="right" delay={0}><MonoLabel>RIGHT — THE RULE ARRIVES</MonoLabel></MaskReveal>
      <MaskReveal direction="up" delay={180}><MonoLabel>UP — THE SPECIMEN SURFACES</MonoLabel></MaskReveal>
      <MaskReveal direction="down" delay={360}><MonoLabel>DOWN — THE RECORD DESCENDS</MonoLabel></MaskReveal>
    </div>
  </Frame>
);
