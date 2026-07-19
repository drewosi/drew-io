/**
 * The record — every shipped project on the portfolio, one object each.
 * This file is the single source of truth: display order, specimen
 * numbering, the "0X specimens" counts, and the hero headline all
 * derive from this array automatically.
 *
 * To add a project, append an object with this shape:
 *
 *   {
 *     id:      'unique-slug',
 *     title:   'Project Name',
 *     kind:    'WHAT IT IS',                // uppercase card label, e.g. 'FUNDRAISING PLATFORM'
 *     date:    'YYYY.MM',
 *     readout: 'MONO HUD LINE',             // flavor: coordinates, a status, a stat
 *     stack:   'TECH / USED · NOTES',
 *     stats: [                              // exactly three reads best
 *       { label: 'metric', value: 123 },
 *       { label: 'with unit', value: 100, unit: '%' },
 *       { label: 'decimal', value: 1.2, decimals: 1 },
 *     ],
 *     summary: 'One or two sentences in the DREW.OS voice. Cold, precise, no hype.',
 *     link:    { href: 'https://…', label: 'Visit' },   // use '#/route' for internal pages
 *   }
 *
 * `link` is OPTIONAL — omit it until the project is deployed somewhere
 * real. Never link to an undeployed workspace (e.g. a Replit editor page);
 * the card renders cleanly with no button until there's a live URL.
 */
export const SPECIMENS = [
  {
    id: 'drewos',
    title: 'DREW.OS 2.0', kind: 'DESIGN SYSTEM', date: '2026.07',
    readout: 'TEMP −41.3° · SIGNAL OK',
    stack: 'REACT 18 / VITE / 0 DEPS',
    stats: [
      { label: 'components', value: 54 },
      { label: 'kinetic moves', value: 20 },
      { label: 'dependencies', value: 0 },
    ],
    summary: 'One cold, precise system every artifact on this page is built from. Dark-first, hairline-drawn, silent-always.',
    link: { href: '#/components', label: 'Explore' },
  },
  {
    id: 'mickman',
    title: 'Mickman Fundraising', kind: 'FUNDRAISING PLATFORM', date: '2026.07',
    readout: '45.2408° N · 93.2378° W',
    stack: 'STATIC HTML / CSS / VANILLA JS · NO BUILD',
    stats: [
      { label: 'trees planted', value: 1000000 },
      { label: 'leader templates', value: 20 },
      { label: 'build steps', value: 0 },
    ],
    summary: 'The complete platform for a Minnesota nursery’s holiday wreath fundraisers — marketing site, invite-only leader portal, and a tally tracker that replicates the official workbook to the cent. One system in balsam green and antique gold, shipped as pure static files.',
    link: { href: 'https://drewosi.github.io/mickman-fundraising/', label: 'Visit' },
  },
  {
    id: 'motion-lab',
    title: 'Motion Lab', kind: 'KINETIC INSTRUMENT', date: '2026.07',
    readout: 'LOOPS — 2 SANCTIONED',
    stack: 'SINGLE RAF · CRITICALLY DAMPED',
    stats: [
      { label: 'kinetic moves', value: 20 },
      { label: 'printed rules', value: 6 },
      { label: 'overshoots', value: 0 },
    ],
    summary: 'Every sanctioned move in the system, replayable on a bench. Deceleration only — the proof that nothing here ever bounces.',
    link: { href: '#/motion', label: 'Enter' },
  },
  {
    id: 'lucid-engine',
    title: 'Lucid Engine', kind: 'DESIGN LANGUAGE', date: '2026.07',
    readout: 'MERIDIAN · 0.0000° — PRIME',
    stack: 'SINGLE-FILE HTML / CANVAS · 0 DEPS · BYO KEY',
    stats: [
      { label: 'html files', value: 5 },
      { label: 'model providers', value: 3 },
      { label: 'backend servers', value: 0 },
    ],
    summary: 'A design language of hospitable clarity, visible engineering, and cinematic depth — now proven on a real product. MERIDIAN grew from launch film into a browser-only AI workbench in free beta: bring your own key, load a folder, and every answer streams back with a trace pinned to the exact lines it stands on. No backend, no third-party scripts. The front door is a museum, the basement is a laboratory.',
    link: { href: 'https://drewosi.github.io/lucid-engine/', label: 'Visit' },
  },
  {
    id: 'golden-hour',
    title: 'EKK Golden Hour', kind: 'EXPRESSIVE DESIGN SYSTEM', date: '2026.07',
    readout: 'DUSK 18:42 · LIGHT — WARM',
    stack: 'DESIGN TOKENS / REACT · CLAUDE DESIGN',
    stats: [
      { label: 'components', value: 15 },
      { label: 'motion moves', value: 6 },
      { label: 'exclamation points', value: 0 },
    ],
    summary: 'The opposite pole of this station — a warm editorial system built for letters and keepsakes: golden-hour light on linen, marigold and rose, script sign-offs. Its motion language arrived this season: dust drifting in the light, lines that write themselves in ink, numbers that settle like dusk.',
    link: { href: 'https://claude.ai/design/p/341e6d12-d63a-4940-b30a-675486335540?via=share', label: 'Visit' },
  },
];

/* Derived — never hand-edit counts anywhere else. */
const NUM_WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
export const SPECIMEN_COUNT = SPECIMENS.length;
export const SPECIMEN_COUNT_PAD = String(SPECIMEN_COUNT).padStart(2, '0');
export const SPECIMEN_COUNT_WORD = NUM_WORDS[SPECIMEN_COUNT] || String(SPECIMEN_COUNT);
