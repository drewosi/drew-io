import React from 'react';
import {
  MonoLabel, Breadcrumbs, Tooltip, Badge, Alert, Reveal, StaggerChildren,
  HairlineDraw, TypeText, ScanSweep,
} from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

const TOC = [
  { id: 'voice', index: '06.1', label: 'Voice' },
  { id: 'color', index: '06.2', label: 'Color' },
  { id: 'motion', index: '06.3', label: 'Motion' },
  { id: 'usage', index: '06.4', label: 'Usage' },
];

function TocLink({ item, active, onSelect }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', gap: 12, alignItems: 'baseline', width: '100%', textAlign: 'left',
        background: 'none', border: 'none', cursor: 'pointer', outline: 'none',
        borderLeft: '1px solid ' + (active ? 'var(--accent)' : 'transparent'),
        padding: '7px 0 7px 15px',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-small)',
        color: active || hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color var(--ease), border-color var(--ease)',
      }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: active ? 'var(--accent-soft)' : 'var(--border)' }}>{item.index}</span>
      {item.label}
    </button>
  );
}

function CodeRecord({ lines }) {
  return (
    <ScanSweep axis="y" duration={1000}>
      <pre style={{
        margin: '20px 0', padding: '18px 20px', overflowX: 'auto',
        background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 1.8, color: 'var(--accent-soft)',
      }}>{lines.join('\n')}</pre>
    </ScanSweep>
  );
}

function H2({ id, index, children }) {
  return (
    <h2 id={id} style={{ fontSize: 'var(--text-h2)', fontWeight: 400, letterSpacing: '-0.02em', margin: '56px 0 16px', scrollMarginTop: 90 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500, letterSpacing: '0.18em', color: 'var(--accent-soft)', display: 'block', marginBottom: 10 }}>{index}</span>
      {children}
    </h2>
  );
}

const P = ({ children }) => <p style={{ color: 'var(--text-muted)', margin: '0 0 16px', maxWidth: '62ch' }}>{children}</p>;

export function Docs() {
  const [active, setActive] = React.useState('voice');
  const go = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <KitFrame index="06" title="docs" builtFrom={['Breadcrumbs', 'Tooltip', 'Badge', 'Alert', 'HairlineDraw', 'TypeText', 'ScanSweep']}>
      <div className="container" style={{ padding: '48px 24px 96px' }}>
        <Reveal mounted>
          <Breadcrumbs items={[{ label: 'Manual' }, { label: 'Field guide' }]} style={{ marginBottom: 40 }} />
        </Reveal>

        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          <aside className="console-sidebar" style={{ width: 200, flexShrink: 0, position: 'sticky', top: 90 }}>
            <MonoLabel muted style={{ display: 'block', padding: '0 0 12px 16px', fontSize: '0.6rem' }}>on this record</MonoLabel>
            <StaggerChildren step={70}>
              {TOC.map(t => <TocLink key={t.id} item={t} active={active === t.id} onSelect={go} />)}
            </StaggerChildren>
          </aside>

          <article style={{ minWidth: 0, flex: 1, maxWidth: 720 }}>
            <Reveal mounted>
              <MonoLabel>06 / field guide</MonoLabel>
              <h1 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px 0 8px' }}>Working the system.</h1>
              <div style={{ display: 'flex', gap: 10, margin: '16px 0 8px' }}>
                <Badge>v2.0</Badge>
                <Badge variant="success">stable</Badge>
              </div>
            </Reveal>

            <H2 id="voice" index="06.1">Voice</H2>
            <P>The system states; it does not exclaim. Buttons are single verbs. Bad news is factual, with a next step. Empty states are <Tooltip label="e.g. “No records yet.”"><span style={{ borderBottom: '1px dotted var(--accent-2)', cursor: 'help' }}>neutral observations</span></Tooltip>.</P>
            <Alert variant="warning" title="One rule outranks the rest." animate>No emoji, anywhere. The glyph set covers every ornamental need: <span style={{ fontFamily: 'var(--font-mono)' }}>01 / · [ ] · ● ○ · — · ↗ · +</span></Alert>
            <HairlineDraw style={{ margin: '40px 0 0' }} />

            <H2 id="color" index="06.2">Color</H2>
            <P>One cold hue at four depths. Ice leads; mist, glacier, and depth recede behind it. Canvas is near-black blue. The frost theme inverts the accents — never the rules.</P>
            <CodeRecord lines={[
              '--accent:      #C7E2F2   /* ice — leads */',
              '--accent-soft: #8FB4C9   /* mist */',
              '--accent-2:    #4A7085   /* glacier */',
              '--accent-3:    #223844   /* depth — outlines, separators */',
            ]} />
            <HairlineDraw />

            <H2 id="motion" index="06.3">Motion</H2>
            <P>Two curves govern everything: <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>--snap</span> (400ms long deceleration) for transforms and reveals, <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>--ease</span> (250ms) for color and opacity. Nothing bounces. Nothing lifts.</P>
            <P>Boot message, as the instrument would print it:</P>
            <div style={{ padding: '14px 18px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', margin: '0 0 16px' }}>
              <TypeText text="> calibration complete. signal ok." speed={40} delay={400} style={{ fontSize: '0.8rem', color: 'var(--success)' }} />
            </div>
            <HairlineDraw />

            <H2 id="usage" index="06.4">Usage</H2>
            <P>Import from one surface and compose. Every kit page in this app is proof: header, record, footer — nothing that is not the system.</P>
            <CodeRecord lines={[
              "import { Card, Button, DecodeText, toast } from './lib.js';",
              '',
              '<Card variant="feature">',
              '  <DecodeText text="Ideas surface." />',
              '  <Button onClick={() => toast(\'Saved.\')}>Save</Button>',
              '</Card>',
            ]} />
          </article>
        </div>
      </div>
    </KitFrame>
  );
}
