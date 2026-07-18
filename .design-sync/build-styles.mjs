// Regenerate .design-sync/compiled-styles.css — a single inlined stylesheet of
// the DREW.OS token + base rules, used as cfg.cssEntry. The converter appends
// cssEntry verbatim into _ds_bundle.css (it does NOT resolve nested @imports),
// so the tokens must be inlined here rather than left as @import lines.
// Run this whenever src/styles/tokens/*.css changes, before a re-sync.
//   node .design-sync/build-styles.mjs
import { readFileSync, writeFileSync } from 'node:fs';

const order = ['colors', 'effects', 'typography', 'spacing', 'motion', 'base']; // fonts.css excluded — brand fonts ship via cfg.extraFonts
let out = '/* DREW.OS compiled token + base stylesheet — generated for design-sync from src/styles/tokens/*.css. Do not hand-edit; regenerate with .design-sync/build-styles.mjs. */\n\n';
for (const n of order) {
  out += `/* ── ${n}.css ── */\n` + readFileSync(`src/styles/tokens/${n}.css`, 'utf8').trim() + '\n\n';
}
writeFileSync('.design-sync/compiled-styles.css', out);
console.log('wrote .design-sync/compiled-styles.css', out.length, 'bytes');
