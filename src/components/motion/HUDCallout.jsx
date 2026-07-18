import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';

/* Corner geometry: top = extends above the parent's top edge; right = anchored
   to (and aligned against) the parent's right edge. */
const CORNERS = {
  tl: { top: true, right: false },
  tr: { top: true, right: true },
  bl: { top: false, right: false },
  br: { top: false, right: true },
};

/**
 * DREW.OS HUDCallout — instrument annotation for a specimen. Anchored to a
 * corner of a position:relative parent: a 1px stem draws out of the corner,
 * a run underlines the readout, and the mono label lines resolve in sequence
 * — index first ("//// 01"), then each measurement, 80ms apart. Leader lines
 * are decoration (aria-hidden); the text is real. Reduced motion: fully drawn.
 */
export function HUDCallout({ index, lines = [], corner = 'tl', stem = 40, run = 28, delay = 0, style }) {
  const [ref, visible] = useReveal();
  const c = CORNERS[corner] || CORNERS.tl;
  const draw = (d) => 'transform 400ms var(--snap-fn) ' + (delay + d) + 'ms';
  const fade = (d) => 'opacity 400ms var(--snap-fn) ' + (delay + d) + 'ms, transform 400ms var(--snap-fn) ' + (delay + d) + 'ms';

  const stemEl = (
    <span aria-hidden="true" style={{
      display: 'block', width: 1, height: stem, background: 'var(--accent-3)',
      alignSelf: c.right ? 'flex-end' : 'flex-start',
      transform: visible ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: c.top ? 'center bottom' : 'center top',
      transition: draw(0),
    }}></span>
  );
  const runEl = (
    <span aria-hidden="true" style={{
      display: 'block', height: 1, width: '100%', background: 'var(--accent-3)',
      transform: visible ? 'scaleX(1)' : 'scaleX(0)',
      transformOrigin: c.right ? 'right center' : 'left center',
      transition: draw(260),
    }}></span>
  );
  const label = (text, i, key) => (
    <span key={key} style={{
      fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase', whiteSpace: 'nowrap',
      color: i === 0 && index != null ? 'var(--accent-soft)' : 'var(--text-muted)',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(' + (c.top ? 6 : -6) + 'px)',
      transition: fade(420 + i * 80),
    }}>{text}</span>
  );
  const labels = [
    ...(index != null ? [label('//// ' + index, 0, 'ix')] : []),
    ...lines.map((l, i) => label(l, i + (index != null ? 1 : 0), i)),
  ];
  const block = (
    <span style={{
      display: 'flex', flexDirection: 'column', gap: 5, padding: '7px 0',
      alignItems: c.right ? 'flex-end' : 'flex-start',
      textAlign: c.right ? 'right' : 'left',
    }}>{labels}</span>
  );

  return (
    <span ref={ref} style={{
      position: 'absolute', display: 'flex', flexDirection: 'column',
      minWidth: run, zIndex: 2, pointerEvents: 'none',
      left: c.right ? undefined : 0, right: c.right ? 0 : undefined,
      top: c.top ? undefined : '100%', bottom: c.top ? '100%' : undefined,
      alignItems: 'stretch',
      ...style,
    }}>
      {c.top ? <>{block}{runEl}{stemEl}</> : <>{stemEl}{runEl}{block}</>}
    </span>
  );
}
