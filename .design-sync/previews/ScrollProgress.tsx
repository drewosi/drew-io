import React from 'react';
import { ScrollProgress } from 'drew-io';

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--text-muted)' };

const paras = [
  'The array keeps a cold record of every reading it has ever taken. Scroll to move the rail.',
  'Retention holds each signal at full resolution for ninety days, then downsamples to the hour.',
  'Export states its own row count before it begins. Nothing leaves the station unannounced.',
  'The readout is an instrument. It reports three digits, so a glance reads the same width every time.',
  'At the foot of the record the rail reaches one hundred. There is nothing below this line.',
];

export const Reading = () => {
  const [v, setV] = React.useState(0);
  const onScroll = (e) => {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setV(max > 0 ? el.scrollTop / max : 0);
  };
  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 4, background: 'var(--bg)', color: 'var(--text)' }}>
      <div onScroll={onScroll} style={{ maxHeight: 300, overflowY: 'auto', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, zIndex: 1, background: 'var(--bg)', padding: 'var(--space-3) var(--space-4)', borderBottom: '1px solid var(--border)' }}>
          <ScrollProgress value={v} />
        </div>
        <div style={{ padding: 'var(--space-5) var(--space-4)' }}>
          <div style={{ ...mono, marginBottom: 'var(--space-4)' }}>01 / RECORD</div>
          {paras.map((p, i) => <p key={i} style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: '0 0 var(--space-5)' }}>{p}</p>)}
        </div>
      </div>
    </div>
  );
};

export const Rails = () => {
  const row = (label, val) => (
    <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
      <div style={mono}>{label}</div>
      <ScrollProgress value={val} />
    </div>
  );
  return (
    <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 4, padding: 28, display: 'grid', gap: 'var(--space-5)', color: 'var(--text)' }}>
      {row('START', 0)}
      {row('MIDWAY', 0.42)}
      {row('COMPLETE', 1)}
    </div>
  );
};
