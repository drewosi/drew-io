import React from 'react';
import {
  MonoLabel, SectionHead, Button, Card, Slider,
  DecodeText, TypeText, Ticker, Reveal, StaggerChildren, HairlineDraw,
  ScanSweep, BlinkDot, CursorCoords, NumberTicker, Progress,
  ScrollScene, FocusReveal, MaskReveal, Magnetic, Tilt, HUDCallout, FilmGrain,
  useReveal, useCountUp, useClock, useSpring, useSceneProgress,
} from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

/* One bench cell: mono label, the demo, a [ replay ] control. */
function Bench({ label, note, onReplay, children, wide }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ gridColumn: wide ? '1 / -1' : 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
        <MonoLabel muted style={{ fontSize: '0.6rem' }}>{label}</MonoLabel>
        {onReplay && (
          <button
            onClick={onReplay}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: hover ? 'var(--text)' : 'var(--text-muted)',
              transition: 'color var(--ease)',
            }}>[ replay ]</button>
        )}
      </div>
      <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12 }}>
        {children}
        {note && <MonoLabel muted style={{ fontSize: '0.58rem', letterSpacing: '0.12em' }}>{note}</MonoLabel>}
      </div>
    </div>
  );
}

function CountUpDemo({ k }) {
  const value = useCountUp(2047, { visible: true, duration: 1400 });
  return <div key={k} style={{ fontSize: '2.2rem', fontWeight: 300, fontVariantNumeric: 'tabular-nums' }}>{value}</div>;
}

function ProgressDemo({ k }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setV(72), 150);
    return () => clearTimeout(t);
  }, [k]);
  return <Progress label="storage" value={v} />;
}

function ClockDemo() {
  const { h, m, s } = useClock();
  return (
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.4rem', fontVariantNumeric: 'tabular-nums', color: 'var(--text)' }}>
      utc {h}<span className="clock-tick">:</span>{m}<span className="clock-tick">:</span>{s}
    </div>
  );
}

/* A critically damped spring crossing the bench — it arrives, it never overshoots. */
function SpringDemo() {
  const ref = React.useRef(null);
  const at = React.useRef(0);
  const spring = useSpring((v) => {
    if (ref.current) ref.current.style.transform = 'translate3d(' + v.toFixed(2) + 'px, 0, 0)';
  });
  const fire = () => { at.current = at.current === 0 ? 220 : 0; spring.set(at.current); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative', height: 12, width: 232 }}>
        <span aria-hidden="true" style={{ position: 'absolute', top: 5, left: 0, right: 0, height: 1, background: 'var(--border)' }}></span>
        <span aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, width: 1, height: 12, background: 'var(--accent-3)' }}></span>
        <span aria-hidden="true" style={{ position: 'absolute', top: 0, right: 0, width: 1, height: 12, background: 'var(--accent-3)' }}></span>
        <span ref={ref} style={{ position: 'absolute', top: 0, left: 0, width: 12, height: 12, background: 'var(--accent)', borderRadius: 'var(--radius-sm)' }}></span>
      </div>
      <div><Button size="sm" variant="secondary" onClick={fire}>Send</Button></div>
    </div>
  );
}

/* ScrollScene under manual scrub — the controlled `progress` prop. */
function ScrubTiles() {
  const refs = React.useRef([]);
  const SC = [{ x: -44, y: -26 }, { x: 26, y: -44 }, { x: 46, y: 20 }, { x: -30, y: 38 }];
  useSceneProgress((p) => {
    for (let i = 0; i < 4; i++) {
      const el = refs.current[i];
      if (!el) continue;
      const t = Math.max(0, Math.min(1, (p - i * 0.08) / 0.7));
      const e = 1 - Math.pow(1 - t, 3);
      el.style.transform = 'translate3d(' + (SC[i].x * e).toFixed(1) + 'px, ' + (SC[i].y * e).toFixed(1) + 'px, 0)';
      el.style.opacity = String(1 - 0.8 * e);
    }
  });
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} ref={(el) => { refs.current[i] = el; }} style={{
          width: 52, height: 52, border: '1px solid var(--border)', background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MonoLabel muted style={{ fontSize: '0.55rem' }}>{'0' + (i + 1)}</MonoLabel>
        </div>
      ))}
    </div>
  );
}

function SceneScrubDemo() {
  const [p, setP] = React.useState(35);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <ScrollScene progress={p / 100} style={{ height: 170, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
        <ScrubTiles />
      </ScrollScene>
      <Slider label="scene progress" value={p} onChange={setP} unit="%" />
    </div>
  );
}

function GrainDemo() {
  const [on, setOn] = React.useState(true);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ position: 'relative', height: 110, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MonoLabel muted>atmosphere · {on ? 'live' : 'still'}</MonoLabel>
        {on && <FilmGrain fixed={false} alpha={0.09} />}
      </div>
      <div><Button size="sm" variant="secondary" onClick={() => setOn(o => !o)}>Toggle</Button></div>
    </div>
  );
}

const RULES = [
  ['01', 'Two curves only. --snap (400ms, long deceleration) moves things; --ease (250ms) colors them.'],
  ['02', 'Nothing bounces, nothing lifts. Hover changes color, never position — except the field response: ≤4px magnetic pull, ≤2° tilt, press to 0.985, all on critically damped springs. Decelerate; never overshoot.'],
  ['03', 'The decode reveal runs once per screen, on the line that matters.'],
  ['04', 'Two sanctioned infinite loops: the ticker and the grain. One of each per page.'],
  ['05', 'Every move respects prefers-reduced-motion and settles on a timer if frames stall.'],
  ['06', 'Scroll is never hijacked. The page scrolls natively; the animated layers decelerate behind it.'],
];

export function MotionLab() {
  const [k, setK] = React.useState({});
  const replay = (id) => setK(s => ({ ...s, [id]: (s[id] || 0) + 1 }));
  const key = (id) => id + ':' + (k[id] || 0);

  return (
    <KitFrame index="08" title="motion" builtFrom={['every kinetic primitive in the system']}>
      <div className="container" style={{ padding: '64px 24px 96px' }}>
        <Reveal mounted>
          <MonoLabel>08 / laboratory</MonoLabel>
          <h1 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px 0 12px' }}>
            <DecodeText text="Slow. Smooth. Deliberate." duration={1100} delay={300} />
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 56px', maxWidth: '54ch' }}>
            Twenty sanctioned moves. Replay any of them; none will bounce.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 72 }}>
          <Bench label="DecodeText — the signature reveal" note="text resolves from instrument noise" onReplay={() => replay('decode')}>
            <div style={{ fontSize: '1.5rem', fontWeight: 300 }}>
              <DecodeText key={key('decode')} text="Ideas surface." duration={1000} delay={100} />
            </div>
          </Bench>

          <Bench label="TypeText — boot cadence" note="constant speed, block caret" onReplay={() => replay('type')}>
            <TypeText key={key('type')} text="> calibration complete." speed={40} delay={200} style={{ fontSize: '0.85rem', color: 'var(--success)' }} />
          </Bench>

          <Bench label="useCountUp — settle on the curve" note="decelerates into the value" onReplay={() => replay('count')}>
            <CountUpDemo k={key('count')} />
          </Bench>

          <Bench label="NumberTicker — live drift" note="a reading that never quite rests">
            <div style={{ fontSize: '2.2rem', fontWeight: 300 }}>
              <NumberTicker value={41} jitter={3} interval={1600} suffix=" ms" style={{ fontFamily: 'var(--font-sans)' }} />
            </div>
          </Bench>

          <Bench label="StaggerChildren — cascade" note="siblings, 110ms apart" onReplay={() => replay('stag')}>
            <StaggerChildren key={key('stag')} step={110} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <MonoLabel muted>REC-2047 · logged</MonoLabel>
              <MonoLabel muted>REC-2046 · logged</MonoLabel>
              <MonoLabel muted>REC-2045 · logged</MonoLabel>
            </StaggerChildren>
          </Bench>

          <Bench label="HairlineDraw — the rule arrives" note="scaleX from the left, 900ms" onReplay={() => replay('line')}>
            <div key={key('line')} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <HairlineDraw delay={100} />
              <HairlineDraw delay={300} color="var(--accent-3)" />
              <HairlineDraw delay={500} color="var(--accent-soft)" />
            </div>
          </Bench>

          <Bench label="ScanSweep — calibration pass" note="one 1px pass, then gone" onReplay={() => replay('scan')} wide>
            <ScanSweep key={key('scan')} duration={1600}>
              <div style={{ padding: '22px 20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                SECTOR 7 · BAND C · 64.7331° N · 18.1059° W · SIGNAL OK
              </div>
            </ScanSweep>
          </Bench>

          <Bench label="Progress — fill on --snap" note="width transition, 900ms" onReplay={() => replay('prog')}>
            <ProgressDemo k={key('prog')} />
          </Bench>

          <Bench label="BlinkDot — the recording light" note="2.4s, ease-in-out, forever">
            <div style={{ display: 'flex', gap: 24, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span><BlinkDot /> recording</span>
              <span><BlinkDot color="var(--warning)" /> drifting</span>
              <span><BlinkDot color="var(--accent-soft)" steady /> steady</span>
            </div>
          </Bench>

          <Bench label="useClock — station time" note="the colons keep the beat">
            <ClockDemo />
          </Bench>

          <Bench label="CursorCoords — HUD readout" note="move the pointer inside" wide>
            <CursorCoords corner="top-right">
              <Card hoverable={false} style={{ minHeight: 90, display: 'flex', alignItems: 'center' }}>
                <MonoLabel muted>this surface is instrumented</MonoLabel>
              </Card>
            </CursorCoords>
          </Bench>

          <Bench label="Spring — critically damped" note="it arrives; it never overshoots">
            <SpringDemo />
          </Bench>

          <Bench label="Magnetic — the field response" note="≤4px pull toward the pointer, springs back">
            <div><Magnetic><Button variant="secondary">Hold</Button></Magnetic></div>
          </Bench>

          <Bench label="Tilt — the surface leans" note="≤2°, pointer-fine devices only">
            <Tilt>
              <Card hoverable={false} style={{ minHeight: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MonoLabel muted>lean into it</MonoLabel>
              </Card>
            </Tilt>
          </Bench>

          <Bench label="FocusReveal — out of the haze" note="blur resolves to sharp, then the filter is dropped" onReplay={() => replay('focus')}>
            <FocusReveal key={key('focus')} duration={900}>
              <div style={{ fontSize: '1.5rem', fontWeight: 300 }}>Depth of field.</div>
            </FocusReveal>
          </Bench>

          <Bench label="MaskReveal — the wipe" note="a straight edge uncovers what was already there" onReplay={() => replay('mask')}>
            <MaskReveal key={key('mask')} direction="up" duration={900}>
              <div style={{ fontSize: '1.5rem', fontWeight: 300 }}>Uncovered, not moved.</div>
            </MaskReveal>
          </Bench>

          <Bench label="HUDCallout — specimen annotation" note="stem, run, then the readout resolves" onReplay={() => replay('hud')}>
            <div key={key('hud')} style={{ position: 'relative', margin: '116px 4px 8px', maxWidth: 300 }}>
              <HUDCallout corner="tl" index="07" stem={30} lines={['DATE — 2026.07', 'BAND — C']} />
              <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '20px 18px' }}>
                <MonoLabel muted>specimen surface</MonoLabel>
              </div>
            </div>
          </Bench>

          <Bench label="ScrollScene — the pinned chapter" note="scrub the timeline by hand; on a page, scroll does this" wide>
            <SceneScrubDemo />
          </Bench>

          <Bench label="FilmGrain — the atmosphere" note="stepped at 9fps · sanctioned loop no. 2">
            <GrainDemo />
          </Bench>
        </div>

        <Reveal>
          <SectionHead kicker="08.9 / doctrine" title="The rules, printed.">
            Break one and the whole instrument reads wrong.
          </SectionHead>
        </Reveal>
        <StaggerChildren step={90} style={{ display: 'flex', flexDirection: 'column' }}>
          {RULES.map(([n, rule]) => (
            <div key={n} style={{ display: 'flex', gap: 20, alignItems: 'baseline', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
              <MonoLabel>{n}</MonoLabel>
              <span style={{ fontSize: 'var(--text-small)', color: 'var(--text-muted)' }}>{rule}</span>
            </div>
          ))}
        </StaggerChildren>
      </div>

      <Ticker items={['400MS DECELERATION', 'NOTHING BOUNCES', 'FIELD RESPONSE ≤ 4PX', 'SCROLL NEVER HIJACKED', 'ONCE PER SCREEN', 'TWO LOOPS PER PAGE', 'REDUCED MOTION RESPECTED']} />
    </KitFrame>
  );
}
