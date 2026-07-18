import React from 'react';
import { ScanSweep, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const Calibration = () => (
  <Frame>
    <ScanSweep>
      <div style={{ padding: '22px 20px', border: '1px solid var(--border)', borderRadius: 2, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
        SECTOR 7 · BAND C · 64.7331° N · 18.1059° W · SIGNAL OK
      </div>
    </ScanSweep>
    <MonoLabel muted style={{ display: 'block', marginTop: 12 }}>one 1px accent pass on view</MonoLabel>
  </Frame>
);
