import React from 'react';
import { Magnetic, Button, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

/* Interaction-only: at rest it is perfectly still. Move the pointer over it live. */
export const FieldResponse = () => (
  <Frame>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Magnetic><Button>Enter</Button></Magnetic>
      <Magnetic><Button variant="secondary">Hold</Button></Magnetic>
    </div>
    <MonoLabel muted style={{ display: 'block', marginTop: 14, fontSize: '0.58rem' }}>≤4PX PULL TOWARD THE POINTER · CRITICALLY DAMPED · POINTER-FINE ONLY</MonoLabel>
  </Frame>
);
