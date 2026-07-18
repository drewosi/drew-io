/**
 * DREW.OS motion engine — per-frame math constants.
 *
 * Anything a CSS transition consumes (durations, distances, blur, easing)
 * lives in tokens/motion.css. Anything consumed per rAF frame lives here:
 * reading custom properties inside the frame loop would force layout reads.
 */

/** Exponential smoothing rate for scroll (1/s). ≈ 0.07 lerp per frame @60fps. */
export const SCROLL_LAMBDA = 4.4;

/** Frame delta clamp (s) — after a tab stall the first frame can't jump-cut. */
export const MAX_DT = 0.064;

/** Field-response spring. damping ≥ 2√(stiffness·mass) is enforced in spring.js. */
export const SPRING = { stiffness: 170, damping: 26, mass: 1 };

/** Parallax depth ratios — how far each plane lags the scroll. */
export const PARALLAX = { far: 0.12, mid: 0.3, near: 0.55, fore: -0.18 };

/** Field-response hard caps — mirror --field-shift / --field-tilt. */
export const FIELD = { maxShift: 4, maxTilt: 2 };

/** Scroll-velocity → chromatic aberration mapping: ≤ maxPx split at vMax px/s. */
export const ABERRATION = { vMax: 2400, maxPx: 2 };
