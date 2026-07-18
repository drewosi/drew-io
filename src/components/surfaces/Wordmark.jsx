import React from 'react';

/**
 * DREW.OS Wordmark — "DREW.OS" in wide-tracked Geist Mono, ice white. The only brand mark.
 */
export function Wordmark({ version = '2.0', size = '1rem', style }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: size,
      letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--text)',
      ...style,
    }}>
      DREW.OS{version ? <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{' / ' + version}</span> : null}
    </span>
  );
}
