import React from 'react';
import {
  Card, MonoLabel, Badge, Button, Stat, Ticker, DecodeText, StaggerChildren,
  SectionNumeral, CursorCoords, toast, Reveal, useReveal, useCountUp,
} from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

const TIERS = [
  {
    id: 'drift', index: '05.1', name: 'Drift', price: 0, unit: '/ mo',
    line: 'For listening.',
    features: [['●', 'One station'], ['●', '2k records'], ['○', 'Signal archive'], ['○', 'Deep sweeps']],
    cta: 'Begin', variant: 'secondary',
  },
  {
    id: 'station', index: '05.2', name: 'Station', price: 24, unit: '/ mo',
    line: 'For transmitting.', badge: 'most kept',
    features: [['●', 'Five stations'], ['●', 'Unlimited records'], ['●', 'Signal archive'], ['○', 'Deep sweeps']],
    cta: 'Enter', variant: 'primary', feature: true,
  },
  {
    id: 'expedition', index: '05.3', name: 'Expedition', price: 96, unit: '/ mo',
    line: 'For the ice itself.',
    features: [['●', 'Unlimited stations'], ['●', 'Unlimited records'], ['●', 'Signal archive'], ['●', 'Deep sweeps']],
    cta: 'Contact', variant: 'secondary',
  },
];

function Tier({ t }) {
  const card = (
    <Card variant={t.feature ? 'feature' : 'base'} style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: 'var(--space-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 24 }}>
        <MonoLabel muted>{t.index}</MonoLabel>
        {t.badge && <Badge>{t.badge}</Badge>}
      </div>
      <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 500, margin: '18px 0 4px' }}>{t.name}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: '0 0 20px' }}>{t.line}</p>
      <div style={{ fontSize: '2.6rem', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>
        ${t.price}<span style={{ fontSize: '0.9rem', fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>{t.unit}</span>
      </div>
      <ul style={{ listStyle: 'none', margin: '24px 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {t.features.map(([mark, label]) => (
          <li key={label} style={{ display: 'flex', gap: 12, alignItems: 'baseline', fontSize: 'var(--text-small)', color: mark === '●' ? 'var(--text)' : 'var(--text-muted)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: mark === '●' ? 'var(--accent-soft)' : 'var(--border)' }}>{mark}</span>
            {label}
          </li>
        ))}
      </ul>
      <Button variant={t.variant} onClick={() => toast(t.name + ' — request logged.', { code: 'OK' })}>{t.cta}</Button>
    </Card>
  );
  return t.feature ? <CursorCoords corner="top-right" style={{ height: '100%' }}>{card}</CursorCoords> : card;
}

function ProofStrip() {
  const [ref, visible] = useReveal();
  const stations = useCountUp(312, { visible });
  const records = useCountUp(1204880, { visible, delay: 120 });
  const uptime = useCountUp(99.98, { visible, delay: 240, decimals: 2 });
  return (
    <div ref={ref} className="container" style={{ padding: '56px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
      <Stat label="stations kept" value={stations} />
      <Stat label="records held" value={records} />
      <Stat label="uptime" value={uptime} unit="%" />
      <Stat label="price changes" value="0" delta="since est." direction="flat" />
    </div>
  );
}

export function Pricing() {
  return (
    <KitFrame index="05" title="pricing" builtFrom={['Card', 'Badge', 'Button', 'Stat', 'Ticker', 'CursorCoords', 'StaggerChildren']}>
      <section style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <SectionNumeral>05</SectionNumeral>
        <div className="container" style={{ padding: '80px 24px 64px', position: 'relative', textAlign: 'center' }}>
          <MonoLabel>05 / terms</MonoLabel>
          <h1 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px auto 12px', maxWidth: '22ch' }}>
            <DecodeText text="Three depths. One record." duration={1000} delay={300} />
          </h1>
          <p style={{ color: 'var(--text-muted)', margin: '0 auto', maxWidth: '44ch' }}>
            Pay for depth, not noise. Every tier keeps the same voice.
          </p>
          <MonoLabel muted style={{ display: 'block', marginTop: 20, fontSize: '0.6rem' }}>[ specimen — nothing is for sale ]</MonoLabel>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '72px 24px' }}>
          <StaggerChildren step={120} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, alignItems: 'stretch' }}>
            {TIERS.map(t => <div key={t.id} style={{ height: '100%' }}><Tier t={t} /></div>)}
          </StaggerChildren>
          <Reveal delay={300} style={{ textAlign: 'center', marginTop: 28 }}>
            <MonoLabel muted style={{ fontSize: '0.6rem' }}>[ annual keeps two months · no exclamation marks at any tier ]</MonoLabel>
          </Reveal>
        </div>
      </section>

      <section style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <ProofStrip />
        <div className="container" style={{ padding: '0 24px 24px', textAlign: 'center' }}>
          <MonoLabel muted style={{ fontSize: '0.6rem' }}>[ sample data — a pricing surface, not a product ]</MonoLabel>
        </div>
      </section>

      <Ticker items={['NO SEAT MATH', 'CANCEL BY TRANSMISSION', 'RECORDS ARE YOURS', 'DARK-FIRST, SILENT-ALWAYS']} />

      <section>
        <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 300, margin: '0 0 12px' }}>Still drifting?</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 auto 28px', maxWidth: '40ch' }}>Start at zero. The ice does not rush.</p>
            <Button size="lg" onClick={() => { window.location.hash = '/auth'; }}>Begin</Button>
          </Reveal>
        </div>
      </section>
    </KitFrame>
  );
}
