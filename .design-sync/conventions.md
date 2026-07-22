# DREW.OS 2.0 — how to build with this system

Glacial monochrome, hairline precision, **dark-first, silent-always**. One cold hue at four depths on a near-black canvas. Geist + Geist Mono. Sharp corners, slow deliberate motion, nothing bounces.

## Setup — no provider, just tokens + theme

Components are plain React with inline styles that read CSS custom properties. **There is no context provider to wrap** — a component renders styled as soon as `styles.css` is loaded. Two setup steps:

1. Load `styles.css` (its `@import` closure carries the tokens in `_ds_bundle.css` and the Geist `@font-face` rules in `fonts/fonts.css`).
2. Set the theme on `<html>`: `data-theme="dark"` (default) or `data-theme="light"` (the pale "frost" theme). Every token flips automatically.

**Dark-first canvas:** the components expect a near-black page. Set your app/page background to `var(--bg)` — bare components on a white background misrepresent the brand.

## Styling idiom — CSS custom properties (no classes, no style props)

This is a **token system**, not a utility-class or prop-styled system. Components style themselves; for your own layout glue (flex, grid, spacing) write inline styles that reference the token `var(--*)` names below. Never invent class names — there is no class vocabulary.

- **Canvas:** `--bg` `--surface` `--surface-raised` `--border`
- **Text:** `--text` `--text-muted`
- **Accents (ice → depth):** `--accent` (ice, leads) `--accent-soft` (mist) `--accent-2` (glacier) `--accent-3` (depth)
- **Feedback (cold, desaturated):** `--success` `--warning` `--danger`; `--on-accent` for text on an ice fill
- **Type:** `--font-sans` (Geist) `--font-mono` (Geist Mono); sizes `--text-display` `--text-h1` `--text-h2` `--text-h3` `--text-body` `--text-small` `--text-label`
- **Space (4px scale):** `--space-1` … `--space-9`
- **Radii (sharp):** `--radius-sm` (2px) `--radius-md` (3px) `--radius-lg` (4px)
- **Motion:** `--snap` (400ms decelerate — transforms/reveals) `--ease` (250ms — color/opacity); depth `--glow` `--shadow-card`

## Where the truth lives

Read these bound files before styling: `_ds_bundle.css` (all token definitions), `styles.css` (the load order + `@import` closure), `fonts/fonts.css` (Geist faces). Per component, read `components/<group>/<Name>/<Name>.prompt.md` (usage) and `<Name>.d.ts` (props). Groups: actions, forms, surfaces, feedback, data, navigation, overlays, motion.

## Composition idiom

```jsx
import { Card, MonoLabel, Button, Stat } from '<global>';

// layout glue = inline styles reading the tokens; components carry their own look
<div style={{ background: 'var(--bg)', padding: 'var(--space-6)' }}>
  <Card variant="feature">
    <MonoLabel>02 / overview</MonoLabel>
    <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 400, letterSpacing: '-0.02em', margin: 'var(--space-3) 0 var(--space-5)' }}>
      Station overview
    </h2>
    <Stat label="active signals" value="128" delta="12 this week" direction="up" />
    <Button style={{ marginTop: 'var(--space-5)' }}>Enter</Button>
  </Card>
</div>
```

## Voice

The system states, it does not exclaim. **Buttons are single verbs** ("Enter", "Export", "Delete"). Sentence case; full stops even on fragments ("Saved."). **Mono labels** are index notation — `01 / SYSTEM`, `[ SCROLL ]`, coordinates. **Status speaks in codes** — `OK` / `WARN` / `ERR`, then a quiet sentence. Bad news is factual with a next step. **No emoji, ever** — the glyph set is `01 /`, `[ ]`, `● ○`, `·`, `—`, `↗`, `+`. One decode-reveal and one ticker per screen, at most. Hover changes color, never position — except the field response: ≤4px magnetic pull (`Magnetic`), ≤2° tilt (`Tilt`), press to `var(--press-scale)`, all on critically damped springs. Decelerate; never overshoot.
