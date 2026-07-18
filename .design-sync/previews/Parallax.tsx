import React from 'react';
import { Parallax, MonoLabel, SectionNumeral } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

/* Depth planes — on a page each lags the scroll by its ratio. */
export const Depths = () => (
  <Frame>
    <div style={{ position: 'relative', overflow: 'hidden', height: 180, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
      <Parallax depth={0.12} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <SectionNumeral style={{ fontSize: '9rem' }}>04</SectionNumeral>
      </Parallax>
      <Parallax depth={0.3} as="span" style={{ position: 'absolute', top: 24, left: 20 }}>
        <MonoLabel muted>DEPTH 0.30 — MID</MonoLabel>
      </Parallax>
      <Parallax depth={0.55} as="span" style={{ position: 'absolute', top: 64, left: 20 }}>
        <MonoLabel>DEPTH 0.55 — NEAR</MonoLabel>
      </Parallax>
      <span style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <MonoLabel muted style={{ fontSize: '0.58rem' }}>FAR 0.12 · MID 0.30 · NEAR 0.55 · FORE −0.18</MonoLabel>
      </span>
    </div>
  </Frame>
);
