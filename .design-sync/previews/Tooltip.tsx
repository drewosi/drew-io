import React from 'react';
import { Tooltip, Button, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 40, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', gap: 24, alignItems: 'center' }}>{children}</div>
);

export const OnHover = () => (
  <Frame>
    <Tooltip label="64.7331° N"><Button variant="ghost">Coordinates</Button></Tooltip>
    <Tooltip side="bottom" label="[ signal ok ]"><MonoLabel>status ↗</MonoLabel></Tooltip>
  </Frame>
);
