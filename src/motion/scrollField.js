import React from 'react';
import { addFrame } from './ticker.js';
import { SCROLL_LAMBDA } from './constants.js';

/**
 * The scroll field — DREW.OS's inertia. Native scrolling is never hijacked;
 * instead the field trails the real scroll position with time-corrected
 * exponential smoothing, and animated layers read the smoothed value. The
 * page stops instantly when the user stops; the world glides to rest behind it.
 *
 * One passive scroll/resize listener for the whole document, ref-counted by
 * consumers. The frame subscription exists only while the field is moving —
 * at rest the entire system is detached and costs nothing.
 */
const KEY = Symbol.for('drewos.scrollField');

function getField() {
  const g = globalThis;
  if (!g[KEY]) {
    g[KEY] = {
      y: 0, smoothY: 0, velocity: 0, direction: 0,
      consumers: new Set(), unsubFrame: null, listening: false,
    };
  }
  return g[KEY];
}

function notify(f) {
  for (const fn of Array.from(f.consumers)) fn(f);
}

function arm(f) {
  if (f.unsubFrame) return;
  f.unsubFrame = addFrame((dt) => {
    const gap = f.y - f.smoothY;
    if (Math.abs(gap) < 0.1 && Math.abs(f.velocity) < 1) {
      // Settled: snap, report once, detach. Scrolling re-arms.
      f.smoothY = f.y;
      f.velocity = 0;
      f.direction = 0;
      notify(f);
      f.unsubFrame();
      f.unsubFrame = null;
      return;
    }
    const step = gap * (1 - Math.exp(-SCROLL_LAMBDA * dt));
    f.smoothY += step;
    f.velocity = dt > 0 ? step / dt : 0;
    f.direction = f.velocity > 1 ? 1 : f.velocity < -1 ? -1 : 0;
    notify(f);
  });
}

function onScroll() {
  const f = getField();
  f.y = window.scrollY;
  arm(f);
}

/** Current field state: { y, smoothY, velocity px/s (signed), direction -1|0|1 }. */
export function getScrollField() {
  return getField();
}

/**
 * Subscribe onFrame(field) to the smoothed scroll. Called every frame while
 * the field is in motion, plus once on settle. Write styles through refs —
 * never set state here.
 */
export function useScrollField(onFrame, { enabled = true } = {}) {
  const cb = React.useRef(onFrame);
  cb.current = onFrame;
  React.useEffect(() => {
    if (!enabled) return;
    const f = getField();
    const consumer = (field) => cb.current(field);
    if (f.consumers.size === 0) {
      // First consumer: adopt the real position outright — no catch-up lerp
      // after a route change has already scrolled the page to the top.
      f.y = window.scrollY;
      f.smoothY = f.y;
      f.velocity = 0;
      f.direction = 0;
    }
    f.consumers.add(consumer);
    if (!f.listening) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
      f.listening = true;
    }
    consumer(f);
    return () => {
      f.consumers.delete(consumer);
      if (f.consumers.size === 0) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        f.listening = false;
        if (f.unsubFrame) { f.unsubFrame(); f.unsubFrame = null; }
      }
    };
  }, [enabled]);
}
