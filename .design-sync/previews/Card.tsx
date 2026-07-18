import React from 'react';
import { Card, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);
const grid: React.CSSProperties = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 18 };
const h: React.CSSProperties = { fontSize: 'var(--text-h3)', fontWeight: 500, margin: '14px 0 10px', color: 'var(--text)' };
const p: React.CSSProperties = { color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: 0 };

export const Elevations = () => (
  <Frame><div style={grid}>
    <Card>
      <MonoLabel muted>base</MonoLabel>
      <h3 style={h}>Surface</h3>
      <p style={p}>Hairline border on the canvas. The default resting elevation.</p>
    </Card>
    <Card variant="raised">
      <MonoLabel muted>raised</MonoLabel>
      <h3 style={h}>Raised</h3>
      <p style={p}>Lifted on one deep, neutral shadow. For panels that float.</p>
    </Card>
    <Card variant="feature">
      <MonoLabel muted>feature</MonoLabel>
      <h3 style={h}>Feature</h3>
      <p style={p}>Corner ticks — the signature frame. Max one per screen.</p>
    </Card>
  </div></Frame>
);

export const Feature = () => (
  <Frame><Card variant="feature" style={{ maxWidth: 320 }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--text-muted)' }}>02.1</div>
    <h3 style={h}>Interfaces</h3>
    <p style={p}>Consoles, dashboards, and tools that read like instruments.</p>
  </Card></Frame>
);
