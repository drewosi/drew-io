import React from 'react';
import { Wordmark } from '../components/surfaces/Wordmark.jsx';
import { MonoLabel } from '../components/surfaces/MonoLabel.jsx';
import { Button } from '../components/actions/Button.jsx';
import { ThemeToggle } from '../components/actions/ThemeToggle.jsx';
import { Badge } from '../components/feedback/Badge.jsx';
import { Stat } from '../components/data/Stat.jsx';
import { ChartFrame } from '../components/data/ChartFrame.jsx';
import { Progress } from '../components/data/Progress.jsx';
import { Table } from '../components/data/Table.jsx';
import { Sidebar } from '../components/navigation/Sidebar.jsx';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { useReveal, useReducedMotion } from '../hooks/useReveal.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { useClock } from '../hooks/useClock.js';

const SECTIONS = [
  { label: 'station', items: [
    { id: 'overview', index: '01', label: 'Overview' },
    { id: 'signals', index: '02', label: 'Signals', meta: '128' },
    { id: 'records', index: '03', label: 'Records', meta: '2k' },
  ]},
  { label: 'system', items: [
    { id: 'tokens', index: '04', label: 'Tokens' },
    { id: 'settings', index: '05', label: 'Settings' },
    { id: 'kits', index: '06', label: 'Kits', meta: '↗' },
  ]},
];

const CHART_DATA = [12, 18, 14, 22, 30, 26, 34, 41, 38, 45, 40, 52, 48, 60, 55, 62, 58, 70, 66, 74, 68, 80, 76, 84];

const TABLE = {
  columns: [
    { key: 'id', label: 'ID', mono: true },
    { key: 'name', label: 'Record' },
    { key: 'status', label: 'Status', mono: true },
    { key: 'time', label: 'Logged', mono: true, muted: true, align: 'right' },
  ],
  rows: [
    { id: 'REC-2047', name: 'Deep survey, sector 7', status: 'OK', time: '11:42:08' },
    { id: 'REC-2046', name: 'Thermal calibration', status: 'OK', time: '10:15:33' },
    { id: 'REC-2045', name: 'Uplink handshake', status: 'WARN', time: '09:58:01' },
    { id: 'REC-2044', name: 'Core sample archive', status: 'OK', time: '08:12:47' },
    { id: 'REC-2043', name: 'Signal sweep, band C', status: 'OK', time: '06:44:19' },
  ],
};

function ExitLink() {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={() => { window.location.hash = '/'; }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color var(--ease)',
      }}>[ exit to surface ]</button>
  );
}

function StatPanel() {
  const [ref, visible] = useReveal();
  const signals = useCountUp(128, { visible });
  const uptime = useCountUp(99.98, { visible, delay: 120, decimals: 2 });
  const latency = useCountUp(41, { visible, delay: 240 });
  const records = useCountUp(2047, { visible, delay: 360 });
  return (
    <div ref={ref} style={{
      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24,
      padding: 24, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--surface)',
    }}>
      <Stat label="active signals" value={signals} delta="12 this week" direction="up" />
      <Stat label="uptime" value={uptime} unit="%" />
      <Stat label="latency" value={latency} unit="ms" delta="6 ms" direction="down" />
      <Stat label="records" value={records} />
    </div>
  );
}

function SignalChart() {
  const [ref, visible] = useReveal();
  const reduced = useReducedMotion();
  const data = visible || reduced ? CHART_DATA : CHART_DATA.map(() => 0);
  return (
    <div ref={ref}>
      <ChartFrame title="Signal volume" meta="last 24 intervals" height={170} data={data} max={Math.max(...CHART_DATA)} stagger={25} />
    </div>
  );
}

function CapacityPanel() {
  const [ref, visible] = useReveal();
  const v = (n) => (visible ? n : 0);
  return (
    <div ref={ref} style={{
      border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)',
      padding: 24, display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text)',
      }}>Capacity</span>
      <Progress label="storage" value={v(72)} />
      <Progress label="bandwidth" value={v(38)} />
      <Progress label="compute" value={v(55)} />
    </div>
  );
}

function RecordsPanel() {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--border)' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
          letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text)',
        }}>Recent records</span>
        <Button variant="secondary" size="sm">Export</Button>
      </div>
      <Table columns={TABLE.columns} rows={TABLE.rows} visible={visible} />
    </div>
  );
}

function UtcClock() {
  const { h, m, s } = useClock();
  return (
    <span style={{ fontVariantNumeric: 'tabular-nums' }}>
      utc {h}<span className="clock-tick">:</span>{m}<span className="clock-tick">:</span>{s}
    </span>
  );
}

export function Console() {
  const [active, setActive] = React.useState('overview');
  const select = (id) => {
    if (id === 'kits') { window.location.hash = '/kits'; return; }
    setActive(id);
  };
  const activeLabel = SECTIONS.flatMap(s => s.items).find(i => i.id === active)?.label ?? 'Overview';

  const nav = (
    <>
      {SECTIONS.flatMap(s => s.items).map(item => {
        const isActive = item.id === active;
        return (
          <button key={item.id} onClick={() => select(item.id)} style={{
            background: 'none', cursor: 'pointer', outline: 'none',
            border: 'none', borderBottom: '1px solid ' + (isActive ? 'var(--accent)' : 'transparent'),
            padding: '10px 2px', fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: isActive ? 'var(--text)' : 'var(--text-muted)',
            transition: 'color var(--ease), border-color var(--ease)',
          }}>{item.label}</button>
        );
      })}
    </>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar
        className="console-sidebar"
        sections={SECTIONS}
        active={active}
        onSelect={select}
        header={<Wordmark size="0.62rem" />}
        footer={<ExitLink />}
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
          padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)',
        }}>
          <Reveal mounted as="span" style={{ display: 'inline-flex' }}>
            <Breadcrumbs items={[{ label: 'Station' }, { label: activeLabel }]} />
          </Reveal>
          <Reveal mounted delay={100} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Badge variant="success"><span className="signal-dot" aria-hidden="true">●</span> signal ok</Badge>
            <ThemeToggle />
          </Reveal>
        </header>

        <nav className="console-topnav" aria-label="Console sections" style={{
          gap: 20, padding: '0 24px', borderBottom: '1px solid var(--border)', background: 'var(--surface)',
          overflowX: 'auto',
        }}>{nav}</nav>

        <main style={{ flex: 1, padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Reveal mounted delay={150}>
            <MonoLabel>01 / overview</MonoLabel>
            <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 400, letterSpacing: '-0.02em', margin: '12px 0 0' }}>Station overview</h1>
          </Reveal>

          <Reveal mounted delay={250}><StatPanel /></Reveal>

          <div className="console-main-grid">
            <SignalChart />
            <CapacityPanel />
          </div>

          <RecordsPanel />
        </main>

        <footer style={{
          display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap',
          padding: '12px 24px', borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.16em',
          textTransform: 'uppercase', color: 'var(--text-muted)',
        }}>
          <span>[ end of record ]</span>
          <UtcClock />
          <span>64.7331° N · 18.1059° W</span>
        </footer>
      </div>
    </div>
  );
}
