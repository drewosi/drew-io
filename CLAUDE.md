# drew-io (DREW.OS 2.0 portfolio + design system)

Live: https://drewosi.github.io/drew-io/ (gh-pages branch). Synced to the claude.ai/design project "DREW.OS 2.0 — drew-io".

## Run / build / deploy
- `npm install`, `npm run dev` (http://localhost:5180), `npm run build` (dist/, base /drew-io/)
- Deploy: build, copy dist/ into a gh-pages worktree (remove stale hashed assets), commit, push. See README.

## Structure
- src/data/specimens.js: the single source of truth for portfolio entries. Append there; counts and headline derive.
- src/styles/tokens/: design tokens (verbatim from the system). src/styles/app.css: layout and motion rules.
- src/components/*, src/motion/ (shared rAF ticker, springs), src/hooks/, src/pages/ (kits; KitFrame.jsx chrome).
- src/lib.js: the one import surface. New pages register in src/App.jsx ROUTES.
- .design-sync/: design-system sync tooling and previews. Follow .design-sync/conventions.md.

## Rules
- Voice: single-verb buttons, OK/WARN/ERR codes, neutral empty states, NO emoji anywhere.
- Motion: --snap or --ease only, respect prefers-reduced-motion, nothing bounces, at most one DecodeText per screen.
- Never link a specimen to an undeployed URL.
- When lucid-engine changes, specimen 04 may need a sync. Check docs/LUCID-ENGINE-SUGGESTIONS.md.
- `npm run build` must pass before any deploy. Screenshots only at visual milestones.
- One task per session; branch + PR.
