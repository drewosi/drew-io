import React from 'react';
import { ThemeToggle } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', gap: 16, alignItems: 'center' }}>{children}</div>
);

export const Default = () => (
  <Frame><ThemeToggle /></Frame>
);
