import React from 'react';
import { FilmGrain, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

/* Bounded here with fixed={false}; on a page it overlays the whole viewport. */
export const Atmosphere = () => (
  <Frame>
    <div style={{ position: 'relative', height: 130, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <MonoLabel muted>the atmosphere · stepped at 9fps</MonoLabel>
      <FilmGrain fixed={false} alpha={0.09} />
    </div>
    <MonoLabel muted style={{ display: 'block', marginTop: 12, fontSize: '0.58rem' }}>SANCTIONED LOOP NO. 2 — ONE PER PAGE · STILL UNDER REDUCED MOTION</MonoLabel>
  </Frame>
);
