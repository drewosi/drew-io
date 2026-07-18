import React from 'react';
import { MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14 }}>{children}</div>
);

export const Labels = () => (
  <Frame>
    <MonoLabel>01 / transmission</MonoLabel>
    <MonoLabel>[ scroll ]</MonoLabel>
    <MonoLabel muted>est. 2026 · drew.io</MonoLabel>
    <MonoLabel muted>64.7331° N · 18.1059° W</MonoLabel>
  </Frame>
);
