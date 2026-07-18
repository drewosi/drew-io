import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';
import { Kbd } from '../surfaces/Kbd.jsx';

/**
 * DREW.OS CommandPalette — the ⌘K launcher. A frosted backdrop fades in on
 * --ease; the corner-ticked panel rises 16px on --snap. A mono / prompt leads
 * the query field; results group under mono section labels. The active row
 * carries a 2px ice tick and a faint --glow fill — hover moves the selection,
 * never the row. ↑↓ move, ↵ runs, ⎋ closes; the footer states the same.
 */
export function CommandPalette({ items = [], open = false, onClose, placeholder = 'Search commands.', width = 460, style }) {
  const reduced = useReducedMotion();
  const [entered, setEntered] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef(null);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      String(it.label).toLowerCase().includes(q) ||
      (it.group && String(it.group).toLowerCase().includes(q)));
  }, [query, items]);

  React.useEffect(() => { setActive(0); }, [query]);

  React.useEffect(() => {
    if (!open) { setEntered(false); return; }
    const onKey = (e) => { if (e.key === 'Escape' && onClose) onClose(); };
    window.addEventListener('keydown', onKey);
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setEntered(true)); });
    const settle = setTimeout(() => setEntered(true), 300);
    const focus = setTimeout(() => { if (inputRef.current) inputRef.current.focus(); }, 20);
    return () => {
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2);
      clearTimeout(settle); clearTimeout(focus);
    };
  }, [open, onClose]);

  if (!open) return null;
  const on = reduced || entered;

  const select = (i) => { const it = filtered[i]; if (it && it.onSelect) it.onSelect(it); };
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(filtered.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(0, a - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); select(active); }
  };

  const tick = (pos) => ({
    position: 'absolute', width: 9, height: 9, pointerEvents: 'none',
    borderColor: 'var(--accent-soft)', borderStyle: 'solid', borderWidth: 0, ...pos,
  });

  const rows = [];
  let lastGroup = null;
  filtered.forEach((it, i) => {
    if (it.group && it.group !== lastGroup) {
      lastGroup = it.group;
      rows.push(
        <div key={'g' + i} style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)', padding: 'var(--space-4) var(--space-4) var(--space-2)' }}>{it.group}</div>
      );
    }
    const isActive = i === active;
    rows.push(
      <button
        key={'r' + i} type="button" role="option" aria-selected={isActive}
        onMouseEnter={() => setActive(i)} onClick={() => select(i)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', textAlign: 'left',
          cursor: 'pointer', font: 'inherit', padding: 'var(--space-3) var(--space-4)', border: 'none',
          borderLeft: '2px solid ' + (isActive ? 'var(--accent)' : 'transparent'),
          background: isActive ? 'var(--glow)' : 'transparent',
          color: isActive ? 'var(--text)' : 'var(--text-muted)', transition: 'color var(--ease), background var(--ease)',
        }}>
        <span style={{ flex: 1, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)' }}>{it.label}</span>
        {it.hint
          ? <span style={{ display: 'inline-flex', gap: 3 }}>{String(it.hint).split(' ').map((k, ki) => <Kbd key={ki} size="sm">{k}</Kbd>)}</span>
          : (isActive ? <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-2)' }}>↗</span> : null)}
      </button>
    );
  });
  if (filtered.length === 0) {
    rows.push(
      <div key="empty" style={{ padding: 'var(--space-5) var(--space-4)', color: 'var(--text-muted)' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--danger)' }}>ERR</span>
        <span style={{ marginLeft: 'var(--space-3)' }}>No command matches that.</span>
      </div>
    );
  }

  return (
    <div
      onMouseDown={(e) => { if (e.target === e.currentTarget && onClose) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'color-mix(in srgb, var(--bg) 72%, transparent)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '9vh',
        opacity: on ? 1 : 0, transition: 'opacity var(--ease)',
      }}>
      <div role="dialog" aria-modal="true" style={{
        position: 'relative', width, maxWidth: '92%', background: 'var(--surface)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)',
        transform: on ? 'none' : 'translateY(16px)', transition: 'transform var(--snap)', ...style,
      }}>
        <span style={tick({ top: -1, left: -1, borderTopWidth: 1, borderLeftWidth: 1 })}></span>
        <span style={tick({ top: -1, right: -1, borderTopWidth: 1, borderRightWidth: 1 })}></span>
        <span style={tick({ bottom: -1, left: -1, borderBottomWidth: 1, borderLeftWidth: 1 })}></span>
        <span style={tick({ bottom: -1, right: -1, borderBottomWidth: 1, borderRightWidth: 1 })}></span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', borderBottom: '1px solid var(--border)' }}>
          <span aria-hidden="true" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-body)', color: 'var(--accent-2)' }}>/</span>
          <input
            ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={onKeyDown}
            placeholder={placeholder} aria-label="Command" autoComplete="off" spellCheck={false}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-body)', padding: 0 }}
          />
          <Kbd size="sm">⎋</Kbd>
        </div>
        <div role="listbox" style={{ maxHeight: 264, overflowY: 'auto', padding: 'var(--space-2) 0' }}>{rows}</div>
        <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-3) var(--space-4)', borderTop: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.12em', color: 'var(--text-muted)' }}>
          <span>↑↓ move</span><span>·</span><span>↵ open</span><span>·</span><span>⎋ close</span>
        </div>
      </div>
    </div>
  );
}
