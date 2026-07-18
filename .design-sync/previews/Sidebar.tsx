import React from 'react';
import { Sidebar, Wordmark } from 'drew-io';

export const Console = () => {
  const [active, setActive] = React.useState('signals');
  return (
    <div style={{ display: 'flex', height: 420, background: 'var(--bg)', borderRadius: 4, border: '1px solid var(--border)', overflow: 'hidden' }}>
      <Sidebar
        header={<Wordmark size="0.62rem" />}
        active={active}
        onSelect={setActive}
        sections={[
          { label: 'station', items: [
            { id: 'overview', index: '01', label: 'Overview' },
            { id: 'signals', index: '02', label: 'Signals', meta: '128' },
            { id: 'records', index: '03', label: 'Records', meta: '2k' },
          ] },
          { label: 'system', items: [
            { id: 'tokens', index: '04', label: 'Tokens' },
            { id: 'settings', index: '05', label: 'Settings' },
          ] },
        ]}
      />
      <div style={{ flex: 1 }} />
    </div>
  );
};
