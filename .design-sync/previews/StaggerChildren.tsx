import React from 'react';
import { StaggerChildren, MonoLabel } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);
const record: React.CSSProperties = { padding: '10px 0', borderBottom: '1px solid var(--border)' };

export const Cascade = () => (
  <Frame>
    <StaggerChildren step={110}>
      <div style={record}><MonoLabel muted>REC-2047 · deep survey · logged</MonoLabel></div>
      <div style={record}><MonoLabel muted>REC-2046 · thermal calibration · logged</MonoLabel></div>
      <div style={record}><MonoLabel muted>REC-2045 · uplink handshake · logged</MonoLabel></div>
      <div style={record}><MonoLabel muted>REC-2044 · core sample · logged</MonoLabel></div>
    </StaggerChildren>
  </Frame>
);
