import React from 'react';
import { Modal } from './Modal.jsx';
import { Kbd } from '../surfaces/Kbd.jsx';

/**
 * DREW.OS Keymap — the "?" overlay. A hairline table of every control the
 * system answers to: keycap clusters on the left, mono descriptions right.
 * Purely presentational; rows arrive as data like the palette's items.
 */
export function Keymap({ open = false, onClose, rows = [] }) {
  return (
    <Modal open={open} onClose={onClose} kicker="////// keymap" title="Controls" width={420}>
      <div>
        {rows.map((r, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'var(--space-4)', padding: '10px 0',
            borderBottom: i < rows.length - 1 ? '1px solid var(--border)' : 'none',
          }}>
            <span style={{ display: 'inline-flex', gap: 4, flexShrink: 0 }}>
              {r.keys.map((k, ki) => <Kbd key={ki} size="sm">{k}</Kbd>)}
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)',
              textAlign: 'right',
            }}>{r.label}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}
