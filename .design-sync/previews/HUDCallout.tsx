import React from 'react';
import { HUDCallout, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

export const Annotation = () => (
  <Frame>
    <div style={{ position: 'relative', margin: '118px 4px 10px', maxWidth: 320 }}>
      <HUDCallout corner="tl" index="01" stem={30} lines={['DATE — 2026.07', 'STACK — REACT 18 / VITE']} />
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '22px 18px' }}>
        <MonoLabel muted>specimen surface</MonoLabel>
      </div>
    </div>
  </Frame>
);

export const Corners = () => (
  <Frame>
    <div style={{ position: 'relative', margin: '96px 4px', maxWidth: 320 }}>
      <HUDCallout corner="tr" index="02" stem={24} lines={['TEMP −41.3°']} />
      <HUDCallout corner="bl" stem={24} delay={300} lines={['45.2408° N · 93.2378° W', 'STATUS — LIVE']} />
      <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '22px 18px' }}>
        <MonoLabel muted>annotated on both ends</MonoLabel>
      </div>
    </div>
  </Frame>
);
