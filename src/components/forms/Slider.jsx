import React from 'react';

/**
 * DREW.OS Slider — 1px track, ice fill, square thumb, mono readout. Pointer-driven.
 */
export function Slider({ value, defaultValue = 50, min = 0, max = 100, step = 1, onChange, label, showValue = true, unit = '', width = 260, style }) {
  const [internal, setInternal] = React.useState(defaultValue);
  const v = value ?? internal;
  const trackRef = React.useRef(null);
  const [drag, setDrag] = React.useState(false);
  const pct = ((v - min) / (max - min)) * 100;

  const setFromEvent = React.useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const raw = min + ((clientX - r.left) / r.width) * (max - min);
    const stepped = Math.round(raw / step) * step;
    const clamped = Math.max(min, Math.min(max, stepped));
    setInternal(clamped);
    if (onChange) onChange(clamped);
  }, [min, max, step, onChange]);

  React.useEffect(() => {
    if (!drag) return;
    const move = (e) => setFromEvent(e.clientX);
    const up = () => setDrag(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [drag, setFromEvent]);

  return (
    <div style={{ width, ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 'var(--space-3)' }}>
          {label ? <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{label}</span> : <span></span>}
          {showValue && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-soft)', fontVariantNumeric: 'tabular-nums' }}>{v}{unit}</span>}
        </div>
      )}
      <div
        ref={trackRef}
        onPointerDown={(e) => { setDrag(true); setFromEvent(e.clientX); }}
        role="slider" aria-valuenow={v} aria-valuemin={min} aria-valuemax={max} tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); const n = Math.max(min, v - step); setInternal(n); if (onChange) onChange(n); }
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); const n = Math.min(max, v + step); setInternal(n); if (onChange) onChange(n); }
        }}
        style={{ position: 'relative', height: 20, cursor: 'pointer', touchAction: 'none', outline: 'none' }}>
        <div style={{ position: 'absolute', top: 9, left: 0, right: 0, height: 1, background: 'var(--border)' }}></div>
        <div style={{ position: 'absolute', top: 9, left: 0, width: pct + '%', height: 1, background: 'var(--accent)' }}></div>
        <div style={{
          position: 'absolute', top: 4, left: 'calc(' + pct + '% - 6px)', width: 12, height: 12,
          background: drag ? '#FFFFFF' : 'var(--accent)', borderRadius: '1px',
          transition: drag ? 'none' : 'background var(--ease)',
        }}></div>
      </div>
    </div>
  );
}
