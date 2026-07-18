import React from 'react';
import { useReducedMotion } from '../../hooks/useReveal.js';
import { useScrollField } from '../../motion/scrollField.js';
import { SceneContext } from '../../motion/sceneContext.js';

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/**
 * DREW.OS ScrollScene — a pinned chapter. The wrapper spans `length` extra
 * viewport-heights of scroll; the inner viewport pins via CSS sticky (native
 * scroll is never hijacked) while smoothed progress 0→1 is published to
 * descendants (useSceneProgress) and to `onProgress(p, velocity)`. All
 * ref-write: a scene full of moving layers re-renders nothing.
 *
 * Pass a number to `progress` for a controlled scene (previews, benches):
 * no pinning, no scroll — the scene renders as a bounded box (size it via
 * `style`) scrubbed from the prop. Reduced motion: unpinned, progress rests
 * at 1, content reads as a plain document.
 */
export function ScrollScene({ length = 1.5, progress, onProgress, style, innerStyle, children, ...rest }) {
  const reduced = useReducedMotion();
  const controlled = typeof progress === 'number';
  const wrapRef = React.useRef(null);
  const subs = React.useRef(new Set());
  const state = React.useRef({ p: controlled ? clamp01(progress) : reduced ? 1 : 0, top: 0, range: 1, active: true });
  const onProgressRef = React.useRef(onProgress);
  onProgressRef.current = onProgress;

  const publish = React.useCallback((p, v) => {
    state.current.p = p;
    if (onProgressRef.current) onProgressRef.current(p, v);
    for (const fn of Array.from(subs.current)) fn(p, v);
  }, []);

  const subscribe = React.useCallback((fn) => {
    subs.current.add(fn);
    fn(state.current.p, 0);
    return () => subs.current.delete(fn);
  }, []);

  // Geometry — read once on mount/resize, never inside the frame loop.
  React.useEffect(() => {
    if (reduced || controlled) return;
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      state.current.top = r.top + window.scrollY;
      state.current.range = Math.max(el.offsetHeight - window.innerHeight, 1);
    };
    measure();
    window.addEventListener('resize', measure, { passive: true });
    // Cull: no scrub work while the scene is far offscreen.
    const io = new IntersectionObserver(
      (entries) => { state.current.active = entries.some((e) => e.isIntersecting); },
      { rootMargin: '100% 0px' }
    );
    io.observe(el);
    return () => { window.removeEventListener('resize', measure); io.disconnect(); };
  }, [reduced, controlled]);

  useScrollField((f) => {
    const s = state.current;
    if (!s.active) return;
    publish(clamp01((f.smoothY - s.top) / s.range), f.velocity);
  }, { enabled: !reduced && !controlled });

  React.useEffect(() => {
    if (controlled) publish(clamp01(progress), 0);
    else if (reduced) publish(1, 0);
  }, [controlled, controlled ? progress : null, reduced, publish]);

  if (controlled) {
    return (
      <SceneContext.Provider value={subscribe}>
        <div style={{ position: 'relative', overflow: 'hidden', ...style }} {...rest}>{children}</div>
      </SceneContext.Provider>
    );
  }
  if (reduced) {
    return (
      <SceneContext.Provider value={subscribe}>
        <div style={style} {...rest}>{children}</div>
      </SceneContext.Provider>
    );
  }
  return (
    <SceneContext.Provider value={subscribe}>
      <div ref={wrapRef} style={{ height: 'calc(' + (length * 100 + 100) + 'vh)', ...style }} {...rest}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', ...innerStyle }}>
          {children}
        </div>
      </div>
    </SceneContext.Provider>
  );
}
