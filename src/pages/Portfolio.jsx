import React from 'react';
import { Wordmark } from '../components/surfaces/Wordmark.jsx';
import { MonoLabel } from '../components/surfaces/MonoLabel.jsx';
import { Card } from '../components/surfaces/Card.jsx';
import { Button } from '../components/actions/Button.jsx';
import { ThemeToggle } from '../components/actions/ThemeToggle.jsx';
import { Stat } from '../components/data/Stat.jsx';
import { DecodeText } from '../components/motion/DecodeText.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { BlinkDot } from '../components/motion/BlinkDot.jsx';
import { HairlineDraw } from '../components/motion/HairlineDraw.jsx';
import { SectionNumeral } from '../components/motion/SectionNumeral.jsx';
import { ScrollScene } from '../components/motion/ScrollScene.jsx';
import { Parallax } from '../components/motion/Parallax.jsx';
import { FocusReveal } from '../components/motion/FocusReveal.jsx';
import { MaskReveal } from '../components/motion/MaskReveal.jsx';
import { Magnetic } from '../components/motion/Magnetic.jsx';
import { Tilt } from '../components/motion/Tilt.jsx';
import { HUDCallout } from '../components/motion/HUDCallout.jsx';
import { FilmGrain } from '../components/motion/FilmGrain.jsx';
import { useReveal, useReducedMotion } from '../hooks/useReveal.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { useClock } from '../hooks/useClock.js';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import { useScrollField } from '../motion/scrollField.js';
import { useSceneProgress } from '../motion/sceneContext.js';
import { ABERRATION } from '../motion/constants.js';
import { SPECIMENS, SPECIMEN_COUNT_PAD, SPECIMEN_COUNT_WORD } from '../data/specimens.js';

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/* ── Page-local instruments (choreography, not primitives — not synced) ── */

/* 1px accent hairline at the very top, tracking scroll depth. */
function ScrollRail() {
  const ref = useScrollProgress();
  return <div ref={ref} className="scroll-progress" aria-hidden="true"></div>;
}

/* Number keys 1–N descend straight to a specimen chapter. The jump lands at
   mid-scene progress so the card is fully out of the fog; reduced motion gets
   an instant jump to the unpinned section. */
function useSpecimenJumps(reduced) {
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target && e.target.closest && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (document.querySelector('[role="dialog"]')) return; // palette or keymap has the keys
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1 || n > SPECIMENS.length) return;
      const el = document.getElementById('specimen-' + SPECIMENS[n - 1].id);
      if (!el) return;
      e.preventDefault();
      const y = reduced
        ? el.offsetTop
        : el.offsetTop + Math.max(0, (el.offsetHeight - window.innerHeight) * 0.5);
      window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reduced]);
}

function NavLink({ href, children }) {
  return <a href={href} className="nav-link">{children}</a>;
}

/* Fog between chapters — opacity scrubbed by scene progress, never a hard cut.
   The gradient keeps fog dense at the seam between scenes and sheer elsewhere,
   so a handoff reads as a band of mist traveling through, not a wall. */
const VEIL_MAX = 0.92;
function ChapterVeil({ from = 0.88, to = 1, invert = false }) {
  const ref = React.useRef(null);
  useSceneProgress((p) => {
    const el = ref.current;
    if (!el) return;
    const t = clamp01((p - from) / (to - from));
    el.style.opacity = String(VEIL_MAX * (invert ? 1 - t : t));
  });
  return (
    <div ref={ref} aria-hidden="true" style={{
      position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none',
      background: invert
        ? 'linear-gradient(to bottom, var(--fog) 0%, var(--fog) 45%, transparent 100%)'
        : 'linear-gradient(to bottom, transparent 0%, var(--fog) 55%, var(--fog) 100%)',
      opacity: invert ? VEIL_MAX : 0,
    }}></div>
  );
}

/* Velocity-aware chromatic split: two tinted clones shadow the headline while
   the scroll field is moving fast, and decay to nothing at rest. */
function AberrationTitle({ children, style }) {
  const reduced = useReducedMotion();
  const a = React.useRef(null);
  const b = React.useRef(null);
  useScrollField((f) => {
    const px = Math.min(ABERRATION.maxPx, (Math.abs(f.velocity) / ABERRATION.vMax) * ABERRATION.maxPx)
      * (f.velocity < 0 ? -1 : 1);
    const o = String(Math.min(0.45, Math.abs(px) * 0.3));
    if (a.current) {
      a.current.style.transform = 'translate3d(0, ' + px.toFixed(2) + 'px, 0)';
      a.current.style.opacity = o;
    }
    if (b.current) {
      b.current.style.transform = 'translate3d(0, ' + (-px).toFixed(2) + 'px, 0)';
      b.current.style.opacity = o;
    }
  }, { enabled: !reduced });
  return (
    <span style={{ position: 'relative', display: 'inline-block', ...style }}>
      <span ref={a} aria-hidden="true" style={{ position: 'absolute', inset: 0, color: 'var(--accent)', opacity: 0, pointerEvents: 'none', userSelect: 'none' }}>{children}</span>
      <span ref={b} aria-hidden="true" style={{ position: 'absolute', inset: 0, color: 'var(--accent-2)', opacity: 0, pointerEvents: 'none', userSelect: 'none' }}>{children}</span>
      <span style={{ position: 'relative' }}>{children}</span>
    </span>
  );
}

/* The luminous ring — stroke drawn by scene progress. */
function RingDraw({ size = 440 }) {
  const ref = React.useRef(null);
  const r = (size - 2) / 2;
  const C = 2 * Math.PI * r;
  useSceneProgress((p) => {
    const el = ref.current;
    if (!el) return;
    el.style.strokeDashoffset = String(C * (1 - clamp01(p * 1.12)));
  });
  return (
    <svg width={size} height={size} viewBox={'0 0 ' + size + ' ' + size} aria-hidden="true"
      style={{ position: 'absolute', maxWidth: '82vw', maxHeight: '82vw' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent-3)" strokeWidth="1" opacity="0.5" />
      <circle ref={ref} cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth="1"
        strokeDasharray={C} strokeDashoffset={C} transform={'rotate(-90 ' + size / 2 + ' ' + size / 2 + ')'} />
    </svg>
  );
}

/* CH 01 — the disassembly. Eight hairline tiles, one per component group,
   scatter apart with per-tile stagger as the scene scrubs. */
const GROUPS = ['ACTIONS', 'SURFACES', 'FORMS', 'FEEDBACK', 'DATA', 'NAVIGATION', 'OVERLAYS', 'MOTION'];
const SCATTER = [
  { x: -190, y: -130 }, { x: 90, y: -210 }, { x: 230, y: -90 }, { x: -270, y: 40 },
  { x: 170, y: 150 }, { x: -90, y: 230 }, { x: 270, y: 100 }, { x: -170, y: -50 },
];

function DisassemblyGrid() {
  const refs = React.useRef([]);
  useSceneProgress((p) => {
    for (let i = 0; i < refs.current.length; i++) {
      const el = refs.current[i];
      if (!el) continue;
      const t = clamp01((p - i * 0.045) / 0.6);
      const e = 1 - Math.pow(1 - t, 3); // decelerate — nothing bounces
      const s = SCATTER[i % SCATTER.length];
      el.style.transform = 'translate3d(' + (s.x * e).toFixed(1) + 'px, ' + (s.y * e).toFixed(1) + 'px, 0)';
      el.style.opacity = String(1 - 0.85 * e);
    }
  });
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, minmax(120px, 160px))', gap: 1, maxWidth: '90vw',
    }}>
      {GROUPS.map((g, i) => (
        <div key={g} ref={(el) => { refs.current[i] = el; }} style={{
          background: 'var(--surface)', border: '1px solid var(--border)',
          padding: '26px 16px', textAlign: 'center', willChange: 'transform',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--text-muted)' }}>
            {'0' + (i + 1)}
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--accent-soft)', marginTop: 8 }}>
            {g}
          </div>
        </div>
      ))}
    </div>
  );
}

/* One animated stat — count-up on view. */
function SpecimenStat({ label, value, unit, decimals }) {
  const [ref, visible] = useReveal();
  const n = useCountUp(value, { visible, decimals });
  return <div ref={ref}><Stat label={label} value={n} unit={unit} /></div>;
}

/* CH 02–05 — a specimen chapter: pinned viewport, ghost numeral drifting
   behind, the artifact card arriving out of the haze, HUD callouts drawing
   their annotations, fog on both ends. */
function SpecimenScene({ s, i }) {
  const side = i % 2 === 0 ? 'right' : 'left';
  const index = String(i + 1).padStart(2, '0');
  return (
    <ScrollScene length={1.2} id={'specimen-' + s.id}>
      <section aria-label={'Specimen ' + index + ' — ' + s.title} style={{
        position: 'relative', height: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', padding: '96px 24px',
      }}>
        <Parallax depth={0.12} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
          <SectionNumeral side={side}>{index}</SectionNumeral>
        </Parallax>
        <Parallax depth={0.3} as="span" aria-hidden="true" style={{
          position: 'absolute', [side === 'right' ? 'left' : 'right']: 24, top: '18%',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em',
          color: 'var(--accent-3)', pointerEvents: 'none', whiteSpace: 'nowrap',
        }}>
          {'////// SPECIMEN_' + index + ' · ' + s.readout}
        </Parallax>

        <MaskReveal direction="up" style={{ marginBottom: 116, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: 0 }}>
            <AberrationTitle>{s.title}</AberrationTitle>
          </h2>
        </MaskReveal>

        <div style={{ position: 'relative', width: '100%', maxWidth: 620 }}>
          <HUDCallout corner={side === 'right' ? 'tl' : 'tr'} index={index} stem={34} delay={200}
            lines={['DATE — ' + s.date, 'STACK — ' + s.stack]} />
          <HUDCallout corner={side === 'right' ? 'br' : 'bl'} stem={34} delay={420}
            lines={[s.readout, 'STATUS — ' + (s.status || 'LIVE')]} />
          <FocusReveal>
            <Tilt>
              <Card variant="feature" style={{ padding: 'var(--space-6, 40px) var(--space-5)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <MonoLabel>{s.kind}</MonoLabel>
                  <MonoLabel muted>{s.date}</MonoLabel>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-body)', lineHeight: 1.6, margin: '18px 0 26px', maxWidth: '52ch' }}>
                  {s.summary}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 20, marginBottom: 30 }}>
                  {s.stats.map((st) => <SpecimenStat key={st.label} {...st} />)}
                </div>
                {s.link && (
                  <Magnetic>
                    {s.link.href.startsWith('#')
                      ? <Button onClick={() => { window.location.hash = s.link.href.slice(1); }}>{s.link.label}</Button>
                      : <Button onClick={() => { window.open(s.link.href, '_blank', 'noopener'); }}>{s.link.label}</Button>}
                  </Magnetic>
                )}
              </Card>
            </Tilt>
          </FocusReveal>
        </div>

        <ChapterVeil invert from={0} to={0.12} />
        <ChapterVeil from={0.88} to={1} />
      </section>
    </ScrollScene>
  );
}

/* ── The page ─────────────────────────────────────────────────────────── */

function HeroHUD() {
  const t = useClock();
  const corner = (pos, delay, children) => (
    <Reveal mounted delay={delay} as="span" style={{ position: 'absolute', display: 'flex', gap: 10, alignItems: 'center', ...pos }}>
      {children}
    </Reveal>
  );
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Parallax depth={0.12} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <SectionNumeral>00</SectionNumeral>
      </Parallax>

      {corner({ top: 28, left: 24 }, 200, <MonoLabel>{'////// specimen archive'}</MonoLabel>)}
      {corner({ top: 28, right: 24 }, 300, <MonoLabel muted>{t.h + ' : ' + t.m + ' : ' + t.s + ' UTC'}</MonoLabel>)}
      {corner({ bottom: 28, left: 24 }, 400, <><BlinkDot /><MonoLabel muted>scroll to descend · ? controls</MonoLabel></>)}
      {corner({ bottom: 28, right: 24 }, 500, <MonoLabel muted>{SPECIMEN_COUNT_PAD + ' specimens · est. 2026'}</MonoLabel>)}

      <div style={{ textAlign: 'center', padding: '0 24px', position: 'relative' }}>
        <Reveal mounted delay={150}><MonoLabel>09 / portfolio</MonoLabel></Reveal>
        <h1 style={{ fontSize: 'var(--text-display)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.02, margin: '18px 0 0', maxWidth: '16ch' }}>
          <DecodeText text={SPECIMEN_COUNT_WORD + ' artifacts. One voice.'} duration={1300} delay={450} />
        </h1>
        <Reveal mounted delay={700} as="p" style={{ fontSize: 'var(--text-h3)', fontWeight: 400, color: 'var(--text-muted)', margin: '20px auto 0', maxWidth: '44ch' }}>
          A record of shipped work, preserved in the ice it was built from.
        </Reveal>
      </div>

      <Reveal mounted delay={900} style={{ position: 'absolute', bottom: 76, left: '50%' }}>
        <HairlineDraw axis="y" length={48} color="var(--accent-2)" delay={1100} />
      </Reveal>
    </section>
  );
}

export function Portfolio() {
  const reduced = useReducedMotion();
  useSpecimenJumps(reduced);
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollRail />
      <FilmGrain />

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(12px)',
      }}>
        <div className="container" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', rowGap: 8 }}>
          <Reveal mounted as="span" style={{ display: 'inline-flex' }}><Wordmark size="0.8rem" /></Reveal>
          <Reveal mounted delay={100} as="nav" className="header-nav" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <NavLink href="#/">Surface</NavLink>
            <NavLink href="#/components">Components</NavLink>
            <NavLink href="#/motion">Motion</NavLink>
            <ThemeToggle />
          </Reveal>
        </div>
        <div style={{ position: 'relative' }}><span className="hairline-draw"></span></div>
      </header>

      {/* CH 00 — surface */}
      <HeroHUD />

      {/* CH 01 — disassembly */}
      <ScrollScene length={1.5}>
        <section aria-label="The system disassembles" style={{
          position: 'relative', height: '100%', minHeight: '100vh', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Parallax depth={0.12} as="span" aria-hidden="true" style={{
            position: 'absolute', top: '14%', left: 0, right: 0, textAlign: 'center',
            fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.4em',
            color: 'var(--accent-3)', whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>ONE HUE · FOUR DEPTHS · EIGHT GROUPS</Parallax>
          <div style={{ textAlign: 'center' }}>
            <Reveal><MonoLabel>{'////// disassembly'}</MonoLabel></Reveal>
            <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
              <DisassemblyGrid />
            </div>
          </div>
          <ChapterVeil from={0.86} to={1} />
        </section>
      </ScrollScene>

      {/* CH 02–05 — specimens */}
      {SPECIMENS.map((s, i) => <SpecimenScene key={s.id} s={s} i={i} />)}

      {/* CH 06 — the ring */}
      <ScrollScene length={1}>
        <section aria-label="End of record" style={{
          position: 'relative', height: '100%', minHeight: '100vh', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <RingDraw />
          <div style={{ textAlign: 'center', position: 'relative', padding: '0 24px' }}>
            <MonoLabel>{'////// close'}</MonoLabel>
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px 0 0', maxWidth: '18ch' }}>
              <DecodeText text="The record continues." duration={1100} />
            </h2>
          </div>
          <ChapterVeil invert from={0} to={0.12} />
        </section>
      </ScrollScene>

      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '48px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <Magnetic><Button onClick={() => { window.location.href = 'mailto:drewosipenko@gmail.com'; }}>Signal</Button></Magnetic>
            <Button variant="ghost" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Return</Button>
          </div>
          <MonoLabel muted>{'[ end of record ] · ' + SPECIMEN_COUNT_PAD + ' specimens · dark-first, silent-always'}</MonoLabel>
        </div>
      </footer>
    </div>
  );
}
