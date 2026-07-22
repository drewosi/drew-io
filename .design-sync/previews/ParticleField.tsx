import React from 'react';
import { ParticleField, MonoLabel, DecodeText } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

/* Bounded here in a relative box; on a page it backs a whole hero section. */
export const Lattice = () => (
  <Frame>
    <div style={{ position: 'relative', height: 190, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
      <ParticleField points={900} speed={0.05} centerX={0.66} dim={0.85} style={{ zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, padding: '28px 24px' }}>
        <MonoLabel>01 / transmission</MonoLabel>
        <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.05, margin: '10px 0 0', maxWidth: '16ch' }}>
          <DecodeText text="The lattice holds." duration={900} delay={200} />
        </h2>
      </div>
    </div>
    <MonoLabel muted style={{ display: 'block', marginTop: 12, fontSize: '0.58rem' }}>FIBONACCI SPHERE · ONE MERIDIAN AT LONGITUDE ZERO · ATMOSPHERE LOOP — ONE PER PAGE</MonoLabel>
  </Frame>
);
