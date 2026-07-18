import { MAX_DT } from './constants.js';

/**
 * The one rAF loop. Every kinetic system in DREW.OS subscribes here — springs,
 * the scroll field, scene scrubs — so the page never runs more than a single
 * animation frame callback. The loop starts on the first subscriber and stops
 * at zero: previews, tests, and idle pages carry no perpetual rAF.
 *
 * The registry lives on globalThis under a Symbol.for key so that if the DS
 * bundle is ever evaluated twice in one document, both copies share one loop.
 */
const KEY = Symbol.for('drewos.ticker');

function getRegistry() {
  const g = globalThis;
  if (!g[KEY]) {
    g[KEY] = { subs: new Set(), raf: 0, last: 0 };
  }
  return g[KEY];
}

function pump(now) {
  const t = getRegistry();
  const dt = Math.min((now - (t.last || now)) / 1000, MAX_DT);
  t.last = now;
  for (const fn of Array.from(t.subs)) fn(dt, now);
  t.raf = t.subs.size > 0 ? requestAnimationFrame(pump) : 0;
  if (!t.raf) t.last = 0;
}

/**
 * Subscribe fn(dt /*seconds, clamped*\/, now) to the shared frame loop.
 * Returns an unsubscribe. Safe to call subscribe/unsubscribe repeatedly
 * (StrictMode double-effects included).
 */
export function addFrame(fn) {
  const t = getRegistry();
  t.subs.add(fn);
  if (!t.raf) {
    t.last = 0;
    t.raf = requestAnimationFrame(pump);
  }
  return () => {
    t.subs.delete(fn);
    if (t.subs.size === 0 && t.raf) {
      cancelAnimationFrame(t.raf);
      t.raf = 0;
      t.last = 0;
    }
  };
}
