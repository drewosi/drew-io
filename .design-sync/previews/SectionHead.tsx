import React from 'react';
import { SectionHead } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', maxWidth: 560 }}>{children}</div>
);

export const Default = () => (
  <Frame>
    <SectionHead kicker="02 / capabilities" title="Anything, in one voice.">
      One cold, precise system any future idea can be built on without losing its voice.
    </SectionHead>
  </Frame>
);
