import React from 'react';
import { Dropdown } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', minHeight: 90 }}>{children}</div>
);

export const Actions = () => (
  <Frame>
    <Dropdown
      label="Actions"
      items={[
        { id: 'export', label: 'Export record' },
        { id: 'archive', label: 'Archive' },
        { divider: true },
        { id: 'delete', label: 'Delete', danger: true },
      ]}
    />
  </Frame>
);
