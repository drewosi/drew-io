import React from 'react';
import { Badge } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>{children}</div>
);

export const Variants = () => (
  <Frame>
    <Badge>v2.0</Badge>
    <Badge variant="success">signal ok</Badge>
    <Badge variant="warning">drift</Badge>
    <Badge variant="danger">lost</Badge>
  </Frame>
);
