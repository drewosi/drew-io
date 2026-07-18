import React from 'react';
import { Textarea, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <MonoLabel muted>field notes</MonoLabel>
    <Textarea defaultValue={"Deep survey, sector 7. Signal held for 4h12m.\nThermal calibration nominal."} />
  </Frame>
);
