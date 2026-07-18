# design-sync notes — drew-io → DREW.OS 2.0

Target project: **DREW.OS 2.0 — drew-io** (`80a6a3ca-0628-4bf8-bc60-d1cc0e117303`).
Shape: **package**, synth-from-source (this repo is a Vite app, not a published component library).

## This repo is not a conventional package DS

- No `dist/`, no build that emits a component library. The bundle is built by esbuild directly from the barrel **`src/lib.js`** (`--entry ./src/lib.js`).
- No TypeScript in source. A `.d.ts` tree is **generated** into `types/` by `tsc -p tsconfig.dts.json` (allowJs + emitDeclarationOnly). `package.json` `"types": "types/lib.d.ts"` points the converter at it, which drives both component discovery and prop contracts. Contracts are therefore loose (`variant?: string`, not unions) — acceptable; the `.prompt.md` + previews carry usage.
- `globalName` is `DrewIoDesignSystem` (clean; NOT the original project's app-derived `DrewIoDesignSystem_3913e9` — this synced to a fresh project so no template compatibility to preserve).

## Re-sync recipe (run in order before `resync.mjs`)

1. `node .design-sync/build-styles.mjs` — regenerate `.design-sync/compiled-styles.css` (the `cfg.cssEntry`) from `src/styles/tokens/*.css`. **The converter does NOT resolve nested @imports**, so tokens must be inlined into this one file.
2. `node .ds-sync/node_modules/typescript/bin/tsc -p tsconfig.dts.json` — regenerate `types/` so discovery + contracts match current source.
3. Ensure the converter's dts loader can resolve React types: `cp -r .ds-sync/node_modules/@types/react node_modules/@types/ && cp -r .ds-sync/node_modules/csstype node_modules/` (repo has no `@types/react` of its own; the `[DTS_REACT]` warn is otherwise harmless here since the generated `.d.ts` carry concrete inline types).
4. Fonts: self-hosted Geist via `@fontsource/geist-sans` + `@fontsource/geist-mono`, mapped to the DS family names in `.design-sync/fonts/fonts.css` (**family `Geist`** → geist-sans woff2; `Geist Mono` matches directly). Wired through `cfg.extraFonts`. If the DS adds weights, add the woff2 to `.design-sync/fonts/` and a matching `@font-face`.
5. Then the standard driver: `node .ds-sync/resync.mjs --config .design-sync/config.json --node-modules ./node_modules --entry ./src/lib.js --out ./ds-bundle --remote .design-sync/.cache/remote-sync.json`.

## Preview conventions

- Every `.design-sync/previews/<Name>.tsx` wraps content in a local dark `Frame` (`background: var(--bg)`) — DREW.OS is **dark-first**; the product card chrome is white, so bare components on it misrepresent the brand. See `.design-sync/previews/_frame.md`.
- Overlay/wide components use `cfg.overrides` cardMode: Modal/Toast/ToastHost/Sidebar = `single` (+viewport); Table/ChartFrame/Ticker/Alert/Tabs = `column`.
- `RadioGroup` and `ToastHost` share files with Radio/Toast, so their group is pinned via `cfg.componentSrcMap` (else they land in `general/`).

## Known render warnings (triaged — not new on re-sync)

- DecodeText / TypeText capture **mid-animation** (glyph noise / partial text). This is authentic to the effect — do not "fix". Both settle to final text via a timeout fallback (background-tab-safe).
- Dropdown / Tooltip previews render the **resting** state (menu/tip open on interaction only) — expected; not blank.
- SectionNumeral's outline numeral is intentionally faint (1px depth-blue stroke on near-black) — a background scale-marker by design.

## 2026-07 — six components added (40 → 46)

Added, award-site-inspired, all in the existing token/voice system:
- **Accordion** (surfaces), **Kbd** (surfaces), **CommandPalette** (overlays),
  **ScrollProgress** (navigation), **Steps** (navigation), **Skeleton** (feedback).
- Each is its own `src/components/<group>/<Name>.jsx` (so the group derives from the
  path — no `componentSrcMap` pin needed) + a barrel export in `src/lib.js` + an
  authored `.design-sync/previews/<Name>.tsx`.
- **CommandPalette** follows the Modal overlay idiom (fixed backdrop, `--ease` fade +
  `--snap` rise, corner ticks) and composes **Kbd**; it needs the overlay override
  `cfg.overrides.CommandPalette = {cardMode:"single", viewport:"560x440"}` (already in
  config) so the open state renders inside the card.
- **Skeleton** injects its own `@keyframes` (id `drewos-skeleton-kf`) with a
  reduced-motion guard. Reason: the DS ships only `tokens/*.css` — `src/styles/app.css`
  (where BlinkDot's `.signal-dot`/`drewos-blink` live) is NOT in `cfg.cssEntry`, so a
  looping animation can't rely on an app-css keyframe. Self-injection is the pattern for
  any future shipped component that needs a keyframe (transitions, à la ScanSweep, need
  no keyframe and remain preferred for one-shots).
- All six graded `good` on the absolute rubric; render check clean (0 bad/thin). No new
  warn lines.

## 2026-07 — the field motion system, eight components added (46 → 54)

Igloo-inc-inspired cinematic-scroll system, hand-rolled, zero new dependencies:
- **ScrollScene, Parallax, FocusReveal, MaskReveal, Magnetic, Tilt, HUDCallout,
  FilmGrain** (all `motion` group) + hooks `useScrollField`, `useSpring`,
  `useSceneProgress` from the new **`src/motion/`** engine (constants, shared rAF
  ticker, critically damped spring, smoothed scroll field, scene context).
- New tokens appended to `tokens/motion.css` (duration scale `--dur-*`, field caps
  `--field-shift/--field-tilt/--press-scale`, atmosphere `--blur-veil/--fog/
  --grain-alpha`) — **step 1 (build-styles) is mandatory on every re-sync now.**
- **The ticker is a module-level singleton** registered on
  `globalThis[Symbol.for('drewos.ticker')]` (same for the scroll field under
  `drewos.scrollField`): if a host document ever evaluates the IIFE bundle twice,
  both copies share one loop. The loop starts lazily and **stops at zero
  subscribers**, so captured previews carry no perpetual rAF. No `window`/`document`
  access happens at module evaluation time.
- **FilmGrain** self-injects `@keyframes` (id `drewos-grain-kf`) with a
  reduced-motion guard — second entry in the self-injection registry after
  `drewos-skeleton-kf`. It is the second sanctioned infinite loop (with Ticker);
  one per page.
- Overrides added: `ScrollScene` = single 560x440 (its preview uses the controlled
  `progress={0.4}` prop — preview cards don't scroll, so an uncontrolled scene would
  capture a dead top-of-scene frame), `FilmGrain` = single 460x300, `HUDCallout` =
  column (its callouts extend ~120px above/below the annotated box).
- Design law amended in MotionLab RULES: hover may now move within the **field
  response** tier — ≤4px magnetic pull, ≤2° tilt, press to `--press-scale` — always
  on critically damped springs (damping is clamped to ≥ 2√(k·m) in `spring.js`, so
  overshoot is mathematically impossible). Button gained press compression.
- Expected render-warn triage (authentic, not bugs): **Magnetic / Tilt** capture the
  resting state (pointer-interaction-only, like Dropdown/Tooltip); **FocusReveal**
  may capture mid-blur (settles via timeout like DecodeText); **ScrollScene** shows
  the 40% scrub by design.
- The `#/portfolio` page (specimen archive) is the reference composition; its
  ChapterVeil / AberrationTitle / RingDraw are **page-local choreography, not DS
  primitives** — deliberately not exported or synced.

## Re-sync risks (what can silently go stale)

- **`compiled-styles.css` and `types/` are generated snapshots.** If `src/styles/tokens/*` or any component's props change and you skip steps 1–2, the sync ships stale tokens/contracts. When in doubt, run both.
- **This repo is NOT git-initialized** (there's a `.gitignore` but no `.git`). Durable
  sync inputs (`src/` components, `src/lib.js`, `.design-sync/previews/*.tsx`,
  `config.json`, this file) are saved on disk only — there's no history/PR. If the repo
  is later `git init`'d, the `.gitignore` already excludes the sync scratch dirs.
- **Skeleton's injected keyframe** is tied to the DS shipping no app-level CSS. If a
  future sync starts shipping `app.css` (or a keyframes token file) via `cfg.cssEntry`,
  reconcile Skeleton to use it instead of self-injecting.
- Fonts are pinned to specific `@fontsource` weights copied into `.design-sync/fonts/`. A fontsource major bump could rename files — re-copy from `node_modules/@fontsource/*/files/` if `[FONT_DANGLING]` appears.
- The `types` field + `@types/react` copy into `node_modules` are tooling scaffolding; on a fresh clone they must be recreated (steps 2–3).
