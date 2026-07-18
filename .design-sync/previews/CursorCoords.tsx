import React from 'react';
import { CursorCoords, Card, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const Instrumented = () => (
  <Frame>
    <CursorCoords corner="top-right">
      <Card variant="feature" style={{ minHeight: 110, display: 'flex', alignItems: 'center' }}>
        <MonoLabel muted>move the pointer inside — a mono x · y readout tracks the corner</MonoLabel>
      </Card>
    </CursorCoords>
  </Frame>
);
