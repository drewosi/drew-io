import React from 'react';
import { Steps } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

export const Horizontal = () => (
  <Frame>
    <Steps
      current={1}
      steps={[
        { label: 'Connect', sub: 'array' },
        { label: 'Calibrate', sub: 'channels' },
        { label: 'Record', sub: 'cold store' },
        { label: 'Export' },
      ]}
    />
  </Frame>
);

export const Vertical = () => (
  <Frame>
    <Steps
      orientation="vertical"
      current={2}
      steps={[
        { label: 'Request received', sub: 'OK — logged at 04:12' },
        { label: 'Verified', sub: 'OK — checksum matched' },
        { label: 'Building export', sub: 'in progress' },
        { label: 'Ready to download' },
      ]}
    />
  </Frame>
);
