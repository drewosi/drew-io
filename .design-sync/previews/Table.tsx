import React from 'react';
import { Table } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 20, borderRadius: 4, border: '1px solid var(--border)' }}>{children}</div>
);

export const Records = () => (
  <Frame>
    <Table
      columns={[
        { key: 'id', label: 'ID', mono: true },
        { key: 'name', label: 'Record' },
        { key: 'status', label: 'Status', mono: true },
        { key: 'time', label: 'Logged', mono: true, muted: true, align: 'right' },
      ]}
      rows={[
        { id: 'REC-2047', name: 'Deep survey, sector 7', status: 'OK', time: '11:42:08' },
        { id: 'REC-2046', name: 'Thermal calibration', status: 'OK', time: '10:15:33' },
        { id: 'REC-2045', name: 'Uplink handshake', status: 'WARN', time: '09:58:01' },
        { id: 'REC-2044', name: 'Core sample archive', status: 'OK', time: '08:12:47' },
      ]}
    />
  </Frame>
);
