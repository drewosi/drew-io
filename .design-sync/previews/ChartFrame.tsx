import React from 'react';
import { ChartFrame } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const SignalVolume = () => (
  <Frame>
    <ChartFrame
      title="Signal volume"
      meta="last 24 intervals"
      height={170}
      data={[12, 18, 14, 22, 30, 26, 34, 41, 38, 45, 40, 52, 48, 60, 55, 62, 58, 70, 66, 74, 68, 80, 76, 84]}
    />
  </Frame>
);
