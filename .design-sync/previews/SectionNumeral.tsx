import React from 'react';
import { SectionNumeral, MonoLabel } from 'drew-io';

export const Backdrop = () => (
  <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--bg)', borderRadius: 4, border: '1px solid var(--border)', minHeight: 240, padding: 28 }}>
    <SectionNumeral>02</SectionNumeral>
    <div style={{ position: 'relative' }}>
      <MonoLabel>02 / capabilities</MonoLabel>
      <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 400, letterSpacing: '-0.02em', margin: '12px 0 0', color: 'var(--text)' }}>Anything, in one voice.</h2>
    </div>
  </div>
);
