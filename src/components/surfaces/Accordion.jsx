import React from 'react';

/**
 * DREW.OS Accordion — hairline disclosure list. A mono index numbers each row;
 * the affordance is a single mono glyph, + closed / – open. Panels open on the
 * long --snap deceleration (grid-rows 0fr → 1fr); nothing bounces. Single-open
 * by default — opening one closes the last. Hover brightens the header, never
 * moves it.
 */
export function Accordion({ items = [], defaultOpen = null, allowMultiple = false, style }) {
  const [open, setOpen] = React.useState(() => (defaultOpen == null ? {} : { [defaultOpen]: true }));

  const toggle = (i) => setOpen((prev) => {
    if (allowMultiple) return { ...prev, [i]: !prev[i] };
    return prev[i] ? {} : { [i]: true };
  });

  return (
    <div style={{ borderTop: '1px solid var(--border)', ...style }}>
      {items.map((it, i) => {
        const isOpen = !!open[i];
        const idx = String(i + 1).padStart(2, '0');
        return (
          <div key={i} style={{ borderBottom: '1px solid var(--border)' }}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.color = 'var(--text-muted)'; }}
              style={{
                width: '100%', display: 'flex', alignItems: 'baseline', gap: 'var(--space-4)',
                background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                padding: 'var(--space-4) var(--space-2)', font: 'inherit',
                color: isOpen ? 'var(--text)' : 'var(--text-muted)', transition: 'color var(--ease)',
              }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--accent-2)', flex: '0 0 auto' }}>{idx}</span>
              <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-h3)', fontWeight: 400, letterSpacing: '-0.01em', color: isOpen ? 'var(--text)' : 'inherit' }}>{it.title}</span>
              <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body)', lineHeight: 1, color: isOpen ? 'var(--accent)' : 'var(--text-muted)', transition: 'color var(--ease)' }}>{isOpen ? '–' : '+'}</span>
            </button>
            <div style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0, transition: 'grid-template-rows var(--snap), opacity var(--snap)' }}>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ padding: '0 var(--space-2) var(--space-5)', color: 'var(--text-muted)', fontSize: 'var(--text-body)', lineHeight: 1.7, maxWidth: '62ch' }}>{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
