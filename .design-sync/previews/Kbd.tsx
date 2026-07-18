import React from 'react';
import { Kbd } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)', display: 'grid', gap: 22 }}>{children}</div>
);
const Line = ({ children }) => (
  <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center', flexWrap: 'wrap', color: 'var(--text-muted)', fontSize: 'var(--text-small)' }}>{children}</div>
);

export const Keys = () => (
  <Frame>
    <Line>
      <Kbd>⌘</Kbd><Kbd>⇧</Kbd><Kbd>⌥</Kbd><Kbd>⌃</Kbd><Kbd>↵</Kbd><Kbd>⎋</Kbd><Kbd>↑</Kbd><Kbd>↓</Kbd>
    </Line>
    <Line>
      Open the palette
      <span style={{ display: 'inline-flex', gap: 4 }}><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
    </Line>
    <Line>
      Command menu
      <span style={{ display: 'inline-flex', gap: 4 }}><Kbd size="sm">⌘</Kbd><Kbd size="sm">⇧</Kbd><Kbd size="sm">P</Kbd></span>
      <span style={{ opacity: 0.6 }}>·  small</span>
    </Line>
  </Frame>
);
