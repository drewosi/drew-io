# Lucid Engine — suggestions from across the ice

Notes from the DREW.OS side after the round-4 sync (QoL, engine hardening,
one-pager + demo recording). Written as a ledger, in the house manner:
what's strong stays named, what's owed stays visible.

## Credit where due

Patterns DREW.OS just adopted *from* Lucid Engine, because they were right:

- The accessibility floor — a global `:focus-visible` ring, focus return on
  every overlay, keyboard feedback equal to hover.
- The `?` keymap overlay and number-key section jumps.
- The mode rule's spirit — theme choice that persists and respects the OS.
- The honest-demo instinct (SIM chips, live-vs-roadmap ledger) shaping how
  the portfolio labels its own claims.

## Owed

### 1. Ship the recording where people look
`media/meridian-demo.mp4` (1.45 MB) and the GIF (5.85 MB) exist only in the
README. The landing still demonstrates a *simulation* while a real capture
sits unembedded. The simulation was a promise; the recording is a receipt —
put the receipt on the counter.

- Embed on `index.html` (and consider the one-pager): `<video muted loop
  playsinline preload="none" poster=…>` — mp4 primary; keep the GIF for the
  README only. Lazy-mount it so the landing stays light.
- The `meta` CSP added in the hardening pass must allow `media-src 'self'`
  (or the equivalent under `default-src`) before the embed will play.

### 2. Reconcile the mode rule
DESIGN-DNA.md rules that *products and tools open light; darkness is never
the lazy default* — and `app.html`, the tool, opens dark. Either honor the
rule (open light, remember an explicit override) or amend the DNA to name
the exception. A design constitution keeps its authority by being obeyed,
especially by its reference implementation.

### 3. Ship the typographic voice
The DNA names a precise grotesque + a monospace system voice; the pages fall
back to system stacks ("Helvetica Neue", "Cascadia Code"). Self-host two
families as woff2 + `@font-face` (still zero-build, zero third-party
requests at runtime) so the intended voice is shipped, not approximated.

### 4. One token block, not six copies
The `LUCID ENGINE TOKENS · v1.2` block is hand-copied across the HTML files
with a "keep in sync" comment. Either extract a single `tokens.css` `<link>`
(still no build step), or add a checked-in sync script that stamps the
canonical block into each file — and a self-test asserting the blocks match.
The 25-check harness is the natural home for that assertion.

### 5. Small ledger
- Link the one-pager from `app.html`'s footer, not just the landing's.
- Surface the `?` keymap on the landing the way the workbench now does
  (`? KEYS` in the nav) — the shortcuts exist; say so.
- If the GIF stays in the README, note its weight next to the link; 5.85 MB
  is a real cost on mobile.
