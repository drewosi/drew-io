import React from 'react';
import { addFrame } from './ticker.js';
import { SPRING } from './constants.js';

/**
 * Critically damped spring — the only physics DREW.OS sanctions. Damping is
 * clamped to at least 2√(stiffness·mass), so overshoot is mathematically
 * impossible: the value decelerates into its target and stops. Never bounces.
 */
export function createSpring(value = 0, { stiffness = SPRING.stiffness, damping = SPRING.damping, mass = SPRING.mass } = {}) {
  const k = stiffness;
  const m = mass;
  const c = Math.max(damping, 2 * Math.sqrt(k * m));
  const s = {
    value,
    velocity: 0,
    target: value,
    set(t) { s.target = t; },
    snap(v) { s.value = v; s.target = v; s.velocity = 0; },
    /** Semi-implicit Euler. Returns true once settled (value snapped to target). */
    step(dt) {
      const f = (s.target - s.value) * k - s.velocity * c;
      s.velocity += (f / m) * dt;
      s.value += s.velocity * dt;
      if (Math.abs(s.velocity) < 0.01 && Math.abs(s.target - s.value) < 0.01) {
        s.snap(s.target);
        return true;
      }
      return false;
    },
  };
  return s;
}

/**
 * Ticker-driven spring for components. onFrame(value) is called with a ref-write
 * in mind — never set state from it. The ticker subscription exists only while
 * the spring is moving; at rest this costs nothing.
 *
 * Returns { set(target), snap(value) }.
 */
export function useSpring(onFrame, opts) {
  const cb = React.useRef(onFrame);
  cb.current = onFrame;
  const api = React.useMemo(() => {
    const spring = createSpring(0, opts);
    let unsub = null;
    const tick = (dt) => {
      const settled = spring.step(dt);
      cb.current(spring.value);
      if (settled && unsub) { unsub(); unsub = null; }
    };
    const arm = () => { if (!unsub) unsub = addFrame(tick); };
    return {
      set(t) { if (t !== spring.target) { spring.set(t); arm(); } },
      snap(v) { spring.snap(v); cb.current(v); if (unsub) { unsub(); unsub = null; } },
      _dispose() { if (unsub) { unsub(); unsub = null; } },
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => () => api._dispose(), [api]);
  return api;
}
