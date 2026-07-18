import React from 'react';
import { Tilt, Card, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

/* Interaction-only: at rest it is perfectly flat. Move the pointer over it live. */
export const SurfaceLean = () => (
  <Frame>
    <Tilt>
      <Card variant="feature" style={{ minHeight: 110, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <MonoLabel>SPECIMEN_01</MonoLabel>
        <MonoLabel muted>lean into it — ≤2°, springs back to rest</MonoLabel>
      </Card>
    </Tilt>
  </Frame>
);
