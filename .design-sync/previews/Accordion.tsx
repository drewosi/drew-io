import React from 'react';
import { Accordion } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

export const Overview = () => (
  <Frame>
    <Accordion
      defaultOpen={0}
      items={[
        { title: 'Signal intake', content: 'Every reading enters cold storage within one tick. No transform on the way in.' },
        { title: 'Retention', content: 'Records survive 90 days at full resolution, then downsample to the hour.' },
        { title: 'Export', content: 'Pull any window as CSV. The export states its own row count before it starts.' },
      ]}
    />
  </Frame>
);

export const Multiple = () => (
  <Frame>
    <Accordion
      allowMultiple
      defaultOpen={1}
      items={[
        { title: 'North array', content: 'Nominal. 128 active channels.' },
        { title: 'South array', content: 'WARN — two channels drifting. Recalibration queued.' },
      ]}
    />
  </Frame>
);
