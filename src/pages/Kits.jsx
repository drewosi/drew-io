import React from 'react';
import { Card, MonoLabel, DecodeText, StaggerChildren, SectionNumeral, CursorCoords, Ticker } from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

const KITS = [
  { hash: '/', index: '01', title: 'Landing', body: 'Marketing surface — decode hero, ticker, capability grid, CTA.', from: 'DecodeText · Ticker · Card · Stat' },
  { hash: '/console', index: '02', title: 'Console', body: 'Station dashboard — sidebar, stats, chart, records, live footer.', from: 'Sidebar · ChartFrame · Table · Progress' },
  { hash: '/auth', index: '03', title: 'Auth', body: 'Sign-in gate — one card, quiet errors, verified transmission.', from: 'Input · Checkbox · Alert · toast' },
  { hash: '/settings', index: '04', title: 'Settings', body: 'Preference panel — tabs, switches, sliders, one guarded danger zone.', from: 'Tabs · Switch · Slider · Modal' },
  { hash: '/pricing', index: '05', title: 'Pricing', body: 'Three tiers on hairlines — the middle one wears the corner ticks.', from: 'Card · Badge · Button · Stat' },
  { hash: '/docs', index: '06', title: 'Docs', body: 'Field manual — TOC rail, typographic article, mono code records.', from: 'Breadcrumbs · Tooltip · HairlineDraw' },
  { hash: '/components', index: '07', title: 'Components', body: 'The living spec — every part, every variant, labeled in mono.', from: 'everything' },
  { hash: '/motion', index: '08', title: 'Motion lab', body: 'Every sanctioned move, replayable, with the doctrine printed.', from: 'DecodeText · TypeText · ScanSweep · …' },
];

function KitCard({ kit, feature }) {
  const inner = (
    <Card
      variant={feature ? 'feature' : 'base'}
      onClick={() => { window.location.hash = kit.hash; }}
      style={{ cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <MonoLabel muted>{kit.index}</MonoLabel>
        <MonoLabel muted style={{ color: 'var(--accent-soft)' }}>↗</MonoLabel>
      </div>
      <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 500, margin: '14px 0 10px' }}>{kit.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: '0 0 16px', flex: 1 }}>{kit.body}</p>
      <MonoLabel muted style={{ fontSize: '0.6rem', letterSpacing: '0.12em' }}>{kit.from}</MonoLabel>
    </Card>
  );
  return feature ? <CursorCoords corner="bottom-right" style={{ height: '100%' }}>{inner}</CursorCoords> : inner;
}

export function Kits() {
  return (
    <KitFrame index="00" title="kits" builtFrom={['Card', 'StaggerChildren', 'DecodeText', 'Ticker', 'CursorCoords']}>
      <section style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <SectionNumeral>00</SectionNumeral>
        <div className="container" style={{ padding: '80px 24px 64px', position: 'relative' }}>
          <MonoLabel>00 / index</MonoLabel>
          <h1 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px 0 12px', maxWidth: '20ch' }}>
            <DecodeText text="Build anything. Keep the voice." duration={1100} delay={300} />
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: 0, maxWidth: '52ch' }}>
            Eight complete surfaces built from one library. Copy a kit, swap the record, ship. Every part is in <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/lib.js</span>.
          </p>
        </div>
      </section>

      <Ticker items={['08 KITS', '54 COMPONENTS', '20 KINETIC MOVES', 'ONE HUE, FOUR DEPTHS', 'NOTHING BOUNCES']} />

      <section>
        <div className="container" style={{ padding: '64px 24px 96px' }}>
          <StaggerChildren step={90} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {KITS.map((k, i) => <KitCard key={k.hash} kit={k} feature={i === 6} />)}
          </StaggerChildren>
        </div>
      </section>
    </KitFrame>
  );
}
