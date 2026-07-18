import React from 'react';

/**
 * DREW.OS Table — mono record grid. Hairline row dividers, frost-tint row hover.
 * `visible={false → true}` cascades the rows in, top to bottom.
 */
export function Table({ columns = [], rows = [], visible = true, style }) {
  const [hoverRow, setHoverRow] = React.useState(-1);
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-small)', ...style }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} style={{
                fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
                letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)',
                textAlign: c.align || 'left', padding: '10px 14px',
                borderBottom: '1px solid var(--border)',
              }}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}
              onMouseEnter={() => setHoverRow(i)}
              onMouseLeave={() => setHoverRow(-1)}
              style={{
                background: hoverRow === i ? 'var(--glow)' : 'transparent',
                opacity: visible ? 1 : 0,
                transform: visible ? 'none' : 'translateY(8px)',
                transition: 'background var(--ease), opacity 500ms var(--snap-fn) ' + (i * 80) + 'ms, transform 500ms var(--snap-fn) ' + (i * 80) + 'ms',
              }}>
              {columns.map(c => (
                <td key={c.key} style={{
                  padding: '11px 14px', borderBottom: '1px solid var(--border)',
                  textAlign: c.align || 'left',
                  fontFamily: c.mono ? 'var(--font-mono)' : 'var(--font-sans)',
                  fontSize: c.mono ? '0.8rem' : 'var(--text-small)',
                  color: c.muted ? 'var(--text-muted)' : 'var(--text)',
                }}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
