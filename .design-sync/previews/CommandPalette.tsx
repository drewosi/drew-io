import React from 'react';
import { CommandPalette } from 'drew-io';

const items = [
  { group: 'Navigate', label: 'Go to overview', hint: 'G O' },
  { group: 'Navigate', label: 'Go to signals', hint: 'G S' },
  { group: 'Navigate', label: 'Go to records' },
  { group: 'Create', label: 'New export', hint: '⌘ E' },
  { group: 'Create', label: 'New annotation' },
  { group: 'Account', label: 'Switch theme', hint: '⌘ ⇧ L' },
  { group: 'Account', label: 'Sign out' },
];

const mono = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--text-muted)' };

export const Launcher = () => (
  <div style={{ position: 'relative', minHeight: 440, background: 'var(--bg)', overflow: 'hidden' }}>
    <div style={{ padding: 32, opacity: 0.45 }}>
      <div style={mono}>01 / STATION</div>
      <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 400, letterSpacing: '-0.02em', margin: '12px 0 20px' }}>Station overview</h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '52ch', margin: 0 }}>Every signal the array has ever kept, in one cold record. Press the launcher to jump anywhere.</p>
    </div>
    <CommandPalette open items={items} onClose={() => {}} />
  </div>
);
