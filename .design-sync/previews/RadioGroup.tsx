import React from 'react';
import { RadioGroup } from 'drew-io';

const Frame = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 24 }}>{children}</div>
);

export const Column = () => (
  <RadioGroupDemo direction="column" />
);
export const Row = () => (
  <RadioGroupDemo direction="row" />
);

function RadioGroupDemo({ direction }: { direction: 'row' | 'column' }) {
  const [v, setV] = React.useState('wide');
  return (
    <Frame>
      <RadioGroup
        direction={direction}
        value={v}
        onChange={setV}
        items={[{ id: 'wide', label: 'Wide' }, { id: 'deep', label: 'Deep' }, { id: 'still', label: 'Still' }]}
      />
    </Frame>
  );
}
