import React from 'react';
import { BlinkDot } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 14, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{children}</div>
);

export const Statuses = () => (
  <Frame>
    <span><BlinkDot /> &nbsp;recording</span>
    <span><BlinkDot color="var(--warning)" /> &nbsp;drifting</span>
    <span><BlinkDot color="var(--danger)" /> &nbsp;lost</span>
    <span><BlinkDot color="var(--accent-soft)" steady /> &nbsp;steady</span>
  </Frame>
);
