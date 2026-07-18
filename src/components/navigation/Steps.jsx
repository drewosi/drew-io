import React from 'react';

const monoIdx = { fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--accent-2)' };

function Node({ state }) {
  const st = {
    width: 14, height: 14, boxSizing: 'border-box', borderRadius: 'var(--radius-sm)',
    border: '1px solid', flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'border-color var(--ease), background var(--ease)',
    background: state === 'done' ? 'var(--accent)' : 'transparent',
    borderColor: state === 'done' || state === 'active' ? 'var(--accent)' : 'var(--border)',
  };
  return <span aria-hidden="true" style={st}>{state === 'active' ? <span style={{ width: 6, height: 6, background: 'var(--accent)', borderRadius: 1 }}></span> : null}</span>;
}

const stateOf = (i, current) => (i < current ? 'done' : i === current ? 'active' : 'todo');
const idx = (i) => String(i + 1).padStart(2, '0');

/**
 * DREW.OS Steps — a numbered process rail. Sharp square nodes: done = ice fill,
 * active = ice ring holding an ice dot, upcoming = bare hairline. Connectors are
 * hairlines that fill to --accent-2 through the completed run. A mono index
 * numbers each step. Horizontal for a wizard header, vertical for staged status.
 */
export function Steps({ steps = [], current = 0, orientation = 'horizontal', style }) {
  const last = steps.length - 1;
  const vertical = orientation === 'vertical';

  if (vertical) {
    return (
      <div style={{ display: 'grid', gap: 0, ...style }}>
        {steps.map((s, i) => {
          const reached = i <= current;
          return (
            <div key={i} style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 3 }}>
                <Node state={stateOf(i, current)} />
                {i < last && <div style={{ flex: 1, width: 1, minHeight: 30, background: i < current ? 'var(--accent-2)' : 'var(--border)', margin: '6px 0' }}></div>}
              </div>
              <div style={{ paddingBottom: i < last ? 'var(--space-5)' : 0 }}>
                <div style={monoIdx}>{idx(i)}</div>
                <div style={{ marginTop: 4, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', color: reached ? 'var(--text)' : 'var(--text-muted)' }}>{s.label}</div>
                {s.sub && <div style={{ marginTop: 2, fontSize: 'var(--text-small)', color: 'var(--text-muted)' }}>{s.sub}</div>}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', ...style }}>
      {steps.map((s, i) => {
        const reached = i <= current;
        return (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <div style={{ flex: 1, height: 1, background: i > 0 ? (i <= current ? 'var(--accent-2)' : 'var(--border)') : 'transparent' }}></div>
              <Node state={stateOf(i, current)} />
              <div style={{ flex: 1, height: 1, background: i < last ? (i < current ? 'var(--accent-2)' : 'var(--border)') : 'transparent' }}></div>
            </div>
            <div style={{ marginTop: 'var(--space-3)', padding: '0 var(--space-2)' }}>
              <div style={monoIdx}>{idx(i)}</div>
              <div style={{ marginTop: 4, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)', color: reached ? 'var(--text)' : 'var(--text-muted)' }}>{s.label}</div>
              {s.sub && <div style={{ marginTop: 2, fontSize: 'var(--text-label)', color: 'var(--text-muted)' }}>{s.sub}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
