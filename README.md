# drew-io — DREW.OS 2.0 · build anything

Implementation of the **Drew.io Design System** (claude.ai/design project "Drew.io Design System"): glacial monochrome, hairline precision, dark-first, silent-always. This repo is a complete starter framework — 54 components, 20 kinetic moves, and 9 finished surfaces you can copy to build a fully designed *anything* in the DREW.OS voice.

## Run

```
npm install
npm run dev    # http://localhost:5180
npm run build  # production bundle → dist/
```

## The surfaces (hash routes — each is a copyable kit)

| Route | Kit | Shows how to build |
|---|---|---|
| `/` | Landing | marketing pages — decode hero, ticker, capability grid, CTA |
| `#/console` | Console | dashboards — sidebar, stats, chart, records table, live footer |
| `#/kits` | Gallery | index/hub pages — card grids, stagger reveals |
| `#/auth` | Auth | sign-in gates — form card, quiet errors, verified handoff |
| `#/settings` | Settings | preference panels — tabs, switches, sliders, guarded danger zone |
| `#/pricing` | Pricing | pricing pages — tier cards, proof strip, terms ticker |
| `#/docs` | Docs | manuals — TOC rail, article typography, mono code records |
| `#/components` | Living spec | every component, every variant, labeled |
| `#/motion` | Motion lab | every kinetic move, replayable, doctrine printed |
| `#/portfolio` | Specimen archive | the cinematic-scroll portfolio — pinned chapters, parallax, HUD callouts, the field response |

## How to build anything

Everything imports from one surface:

```jsx
import { Card, Button, DecodeText, Reveal, toast } from './src/lib.js';
```

### 1 · Start from the tokens

`src/styles/tokens/` defines the whole voice: one cold hue at four depths (`--accent` ice → `--accent-3` depth), 4px spacing, sharp 2–4px radii, two motion curves. Set `data-theme="dark"` or `"light"` on `<html>`; every token flips.

### 2 · Compose components

```jsx
// A feature card with the corner ticks and a stat inside
<Card variant="feature">
  <MonoLabel>02.1</MonoLabel>
  <Stat label="active signals" value="128" delta="12 this week" direction="up" />
  <Button onClick={() => toast('Exported.', { code: 'OK' })}>Export</Button>
</Card>
```

```jsx
// A guarded destructive action (Settings kit pattern)
<Button variant="danger" onClick={() => setConfirm(true)}>Erase</Button>
<Modal open={confirm} onClose={() => setConfirm(false)} kicker="ERR / confirm" title="Erase the record."
  footer={<><Button variant="ghost" onClick={close}>Dismiss</Button>
          <Button variant="danger" onClick={erase}>Erase</Button></>}>
  Bad news is factual: there is no undo.
</Modal>
```

### 3 · Add motion (sparingly — it's an instrument, not a show)

```jsx
<DecodeText text="Ideas surface." />          // signature reveal — once per screen
<Reveal delay={150}>…</Reveal>                 // scroll-triggered fade + 12px rise
<StaggerChildren step={110}>…</StaggerChildren>// cascade siblings
<TypeText text="> signal ok." />               // mono typewriter + caret
<ScanSweep>…</ScanSweep>                       // one calibration pass over a surface
<HairlineDraw />                               // a rule that draws itself in
<Ticker items={[…]} />                         // the one sanctioned infinite loop
<NumberTicker value={41} jitter={3} />         // live instrument drift
<BlinkDot /> <CursorCoords>…</CursorCoords>    // HUD details
useCountUp(2047, { visible })                  // numbers settle on the curve
useScrollProgress() + .scroll-progress         // 1px depth line at the top
<PageTransition routeKey={route}>…</PageTransition> // route entrances
```

Cinematic scroll + the field response (see `#/portfolio` for the full choreography):

```jsx
<ScrollScene length={1.5} onProgress={…}>…</ScrollScene> // pinned chapter; scroll scrubs 0→1 (CSS sticky — never hijacked)
<Parallax depth={0.12}>…</Parallax>            // a plane that lags the scroll (0.12 far · 0.3 mid · 0.55 near)
<FocusReveal>…</FocusReveal>                   // blur-to-sharp arrival out of the haze
<MaskReveal direction="up">…</MaskReveal>      // a straight edge uncovers what was already there
<Magnetic><Button>Enter</Button></Magnetic>    // ≤4px pull toward the pointer, critically damped
<Tilt><Card>…</Card></Tilt>                    // ≤2° lean, springs back to rest
<HUDCallout index="01" lines={['DATE — 2026.07']} /> // specimen annotation: stem, run, readout
<FilmGrain />                                  // the atmosphere — sanctioned loop no. 2, one per page
useScrollField(f => …)                         // smoothed scroll: { y, smoothY, velocity, direction }
useSpring(v => …)                              // critically damped spring — overshoot is impossible
useSceneProgress((p, v) => …)                  // subscribe to the nearest ScrollScene
```

The engine lives in `src/motion/`: one shared rAF ticker (idles to zero at rest), a smoothed scroll field, and springs clamped to critical damping. **The field response** is the one sanctioned exception to "hover never moves": ≤4px magnetic pull, ≤2° tilt, press to `--press-scale` — always decelerating, never overshooting, inert on touch/keyboard/reduced-motion.

Every move: `--snap` (400ms long deceleration) or `--ease` (250ms), `prefers-reduced-motion` respected, and a timeout settle so throttled tabs still land on the final state. Nothing bounces.

### 4 · Anatomy of a kit page (the copyable recipe)

Every kit follows the same skeleton — see any file in `src/pages/`:

```jsx
export function MyPage() {
  return (
    <KitFrame index="09" title="my-page" builtFrom={['Card', 'Tabs', 'toast']}>
      {/* 1. kicker + decode headline */}
      <MonoLabel>09 / my-thing</MonoLabel>
      <h1><DecodeText text="One line that matters." /></h1>
      {/* 2. hairline-divided sections, revealed on scroll */}
      <Reveal>…</Reveal>
      {/* 3. mono record-keeping in the corners */}
    </KitFrame>
  );
}
```

Then register it in `src/App.jsx`'s `ROUTES` map. `KitFrame` gives you the sticky wordmark header, theme toggle, and the `[ end of record ]` footer with a built-from inventory.

### 5 · Speak the voice

Buttons are single verbs ("Enter", "Erase"). Status speaks in codes (`OK / WARN / ERR`), then a quiet sentence. Empty states are neutral observations ("No records yet."). **No emoji, anywhere** — the glyph set is `01 /`, `[ ]`, `● ○`, `·`, `—`, `↗`, `+`.

## Structure

- `src/styles/tokens/` — the design system's token CSS, verbatim
- `src/styles/app.css` — layout classes, keyframes, responsive + reduced-motion rules
- `src/components/{actions,surfaces,forms,feedback,data,navigation,overlays,motion}/` — the library
- `src/motion/` — the engine: shared rAF ticker, smoothed scroll field, critically damped springs, scene context
- `src/hooks/` — `useReveal`, `useCountUp`, `useClock`, `useScrollProgress`
- `src/pages/` — the kits; `KitFrame.jsx` is the shared chrome
- `src/lib.js` — single import surface for all of the above
