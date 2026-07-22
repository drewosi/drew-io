import React from 'react';
import { Keymap } from 'drew-io';

/* The app's real "?" overlay rows — every control the system answers to. */
export const Controls = () => (
  <div style={{ position: 'relative', minHeight: 420, background: 'var(--bg)' }}>
    <Keymap
      open
      onClose={() => {}}
      rows={[
        { keys: ['⌘', 'K'], label: 'Command palette' },
        { keys: ['?'], label: 'This keymap' },
        { keys: ['T'], label: 'Theme — dark / frost' },
        { keys: ['1', '–', '5'], label: 'Jump to specimen (portfolio)' },
        { keys: ['↑', '↓', '↵', '⎋'], label: 'Palette — move, run, close' },
      ]}
    />
  </div>
);
