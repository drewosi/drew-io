import React from 'react';
import { Button } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);
const row: React.CSSProperties = { display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' };

export const Variants = () => (
  <Frame><div style={row}>
    <Button>Enter</Button>
    <Button variant="secondary">Export</Button>
    <Button variant="ghost">Dismiss</Button>
    <Button variant="danger">Delete</Button>
  </div></Frame>
);

export const Sizes = () => (
  <Frame><div style={row}>
    <Button size="sm">Save</Button>
    <Button size="md">Save</Button>
    <Button size="lg">Save</Button>
  </div></Frame>
);

export const Disabled = () => (
  <Frame><div style={row}>
    <Button>Transmit</Button>
    <Button disabled>Held</Button>
  </div></Frame>
);
