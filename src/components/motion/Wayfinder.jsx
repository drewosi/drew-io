import React from 'react';
import { MonoLabel } from '../surfaces/MonoLabel.jsx';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS Wayfinder — fixed right-edge section dots with a scroll-spy. Wide
 * pointer-fine viewports only; the page's scroll-progress hairline covers the
 * rest. The active dot carries the accent and a hairline ring; a mono label
 * chip surfaces on hover. Color and opacity move on --ease — the dots never
 * change position. Click scrolls natively (instant under reduced motion).
 */
export function Wayfinder({ sections = [], style }) {
  const reduced = useReducedMotion();
  const [wide, setWide] = React.useState(false);
  const [active, setActive] = React.useState(sections[0] && sections[0].id);
  const [hovered, setHovered] = React.useState(null);

  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1000px) and (hover: hover) and (pointer: fine)');
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  React.useEffect(() => {
    const els = sections.map((sec) => document.getElementById(sec.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: '-30% 0px -60% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  if (!wide || !sections.length) return null;

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <nav aria-label="Sections" style={{
      position: 'fixed', right: 18, top: '50%', transform: 'translateY(-50%)',
      display: 'flex', flexDirection: 'column', gap: 14, zIndex: 60, ...style,
    }}>
      {sections.map((sec) => {
        const isActive = sec.id === active;
        const isHover = sec.id === hovered;
        return (
          <button
            key={sec.id} type="button" aria-label={sec.label} aria-current={isActive || undefined}
            onClick={() => go(sec.id)}
            onMouseEnter={() => setHovered(sec.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 16, height: 16, padding: 0, background: 'transparent', border: 'none', cursor: 'pointer',
            }}>
            <span aria-hidden="true" style={{
              width: 6, height: 6, borderRadius: '50%',
              background: isActive ? 'var(--accent)' : (isHover ? 'var(--text-muted)' : 'var(--border)'),
              boxShadow: isActive ? '0 0 0 1px var(--accent-soft)' : '0 0 0 1px transparent',
              transition: 'background var(--ease), box-shadow var(--ease)',
            }}></span>
            <MonoLabel muted style={{
              position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
              whiteSpace: 'nowrap', pointerEvents: 'none',
              opacity: isHover ? 1 : 0, transition: 'opacity var(--ease)',
            }}>{sec.label}</MonoLabel>
          </button>
        );
      })}
    </nav>
  );
}
