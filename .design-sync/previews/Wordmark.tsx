import React from 'react';
import { Wordmark } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
);

export const Sizes = () => (
  <Frame>
    <Wordmark size="1.4rem" />
    <Wordmark size="1rem" />
    <Wordmark size="0.75rem" />
    <Wordmark size="1rem" version={null as unknown as string} />
  </Frame>
);
