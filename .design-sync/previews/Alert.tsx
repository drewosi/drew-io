import React from 'react';
import { Alert } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);
const stack: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12, minWidth: 360, maxWidth: 520 };

export const Statuses = () => (
  <Frame><div style={stack}>
    <Alert variant="success" title="Saved.">The record is in the ledger.</Alert>
    <Alert variant="warning" title="Signal drifting.">Gain is below threshold. Raise it, or accept the noise.</Alert>
    <Alert variant="danger" title="Connection lost.">Retry, or check the console for the trace.</Alert>
  </div></Frame>
);

export const Success = () => (
  <Frame><div style={stack}>
    <Alert variant="success" title="Uplink verified.">Handshake complete at 64.7331° N.</Alert>
  </div></Frame>
);
