import React from 'react';
import { Switch } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', gap: 20, alignItems: 'center' }}>{children}</div>
);
const row = (label: string, node: React.ReactNode) => (
  <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 8, alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{node}{label}</span>
);

export const States = () => (
  <Frame>
    {row('on', <Switch defaultChecked />)}
    {row('off', <Switch />)}
  </Frame>
);
