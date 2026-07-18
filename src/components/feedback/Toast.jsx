import React from 'react';

/**
 * DREW.OS Toast — fixed bottom-center mono strip. Rises smoothly, no spring.
 * Single controlled toast; for stacking + auto-dismiss use <ToastHost> + toast().
 */
export function Toast({ show = false, children, style }) {
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%',
      transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 60px)',
      opacity: show ? 1 : 0,
      background: 'var(--surface-raised)', color: 'var(--text)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
      padding: '10px 22px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-small)',
      boxShadow: 'var(--shadow-card)', zIndex: 100,
      transition: 'transform var(--snap), opacity var(--ease)',
      pointerEvents: 'none',
      ...style,
    }}>
      {children}
    </div>
  );
}

/* ---- Imperative toast stack ------------------------------------------- */

let listeners = [];
let seq = 0;

/**
 * toast('Saved.') — push a record onto the ToastHost stack from anywhere.
 * Optional second arg: { code: 'OK' | 'WARN' | 'ERR', duration: ms }.
 */
export function toast(message, { code = 'OK', duration = 3500 } = {}) {
  const t = { id: ++seq, message, code, duration };
  listeners.forEach(fn => fn(t));
  return t.id;
}

const CODE_COLOR = { OK: 'var(--success)', WARN: 'var(--warning)', ERR: 'var(--danger)' };

function ToastRecord({ t, onDone }) {
  const [entered, setEntered] = React.useState(false);
  const [leaving, setLeaving] = React.useState(false);
  React.useEffect(() => {
    let id2;
    const id = requestAnimationFrame(() => { id2 = requestAnimationFrame(() => setEntered(true)); });
    const settleIn = setTimeout(() => setEntered(true), 300);
    const out = setTimeout(() => setLeaving(true), t.duration);
    const gone = setTimeout(onDone, t.duration + 450);
    return () => { cancelAnimationFrame(id); if (id2) cancelAnimationFrame(id2); clearTimeout(settleIn); clearTimeout(out); clearTimeout(gone); };
  }, [t, onDone]);
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
      background: 'var(--surface-raised)', color: 'var(--text)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
      padding: '10px 22px 12px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-small)',
      boxShadow: 'var(--shadow-card)',
      opacity: entered && !leaving ? 1 : 0,
      transform: entered && !leaving ? 'translateY(0)' : 'translateY(16px)',
      transition: 'transform var(--snap), opacity var(--ease)',
    }}>
      <span style={{ fontSize: 'var(--text-label)', fontWeight: 500, letterSpacing: '0.16em', color: CODE_COLOR[t.code] || 'var(--success)' }}>{t.code}</span>
      <span>{t.message}</span>
      <span aria-hidden="true" style={{
        position: 'absolute', left: 0, bottom: 0, height: 1, background: 'var(--accent-3)',
        width: entered ? 0 : '100%',
        transition: entered ? 'width ' + t.duration + 'ms linear' : 'none',
      }}></span>
    </div>
  );
}

/**
 * DREW.OS ToastHost — mount once (e.g. in App). Renders the toast() stack
 * bottom-center; each record rises in, holds behind a linear countdown
 * hairline, then sinks away.
 */
export function ToastHost() {
  const [stack, setStack] = React.useState([]);
  React.useEffect(() => {
    const on = (t) => setStack(s => [...s.slice(-3), t]);
    listeners.push(on);
    return () => { listeners = listeners.filter(fn => fn !== on); };
  }, []);
  const remove = (id) => setStack(s => s.filter(t => t.id !== id));
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      zIndex: 100, pointerEvents: 'none',
    }}>
      {stack.map(t => <ToastRecord key={t.id} t={t} onDone={() => remove(t.id)} />)}
    </div>
  );
}
