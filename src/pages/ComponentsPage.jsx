import React from 'react';
import {
  Button, ThemeToggle, Card, MonoLabel, SectionHead, Wordmark,
  Input, Textarea, Select, Checkbox, RadioGroup, Switch, Slider,
  Badge, Alert, toast,
  Stat, Progress, Table, ChartFrame,
  Tabs, Breadcrumbs, Modal, Dropdown, Tooltip,
  Reveal, StaggerChildren, HairlineDraw,
} from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

/* Specimen — one labeled cell of the living spec. */
function Spec({ label, children, wide }) {
  return (
    <div style={{ gridColumn: wide ? '1 / -1' : 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
        <MonoLabel muted style={{ fontSize: '0.6rem' }}>{label}</MonoLabel>
      </div>
      <div style={{ padding: 20, display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

function Family({ index, title, children, intro }) {
  return (
    <section style={{ marginBottom: 72 }}>
      <Reveal>
        <SectionHead kicker={index} title={title}>{intro}</SectionHead>
      </Reveal>
      <StaggerChildren step={80} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {children}
      </StaggerChildren>
    </section>
  );
}

export function ComponentsPage() {
  const [modal, setModal] = React.useState(false);
  const [radio, setRadio] = React.useState('a');

  return (
    <KitFrame index="07" title="components" builtFrom={['the entire library — this page is the spec']}>
      <div className="container" style={{ padding: '64px 24px 96px' }}>
        <Reveal mounted>
          <MonoLabel>07 / living spec</MonoLabel>
          <h1 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px 0 12px' }}>Every part, on the bench.</h1>
          <p style={{ color: 'var(--text-muted)', margin: '0 0 64px', maxWidth: '56ch' }}>
            Thirty-one components in seven families. Each cell is copy-ready; imports come from <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85em' }}>src/lib.js</span>.
          </p>
        </Reveal>

        <Family index="07.1" title="Actions" intro="Single verbs. Color-only hovers; presses dim to 0.75.">
          <Spec label="Button / variants">
            <Button>Enter</Button>
            <Button variant="secondary">Export</Button>
            <Button variant="ghost">Dismiss</Button>
            <Button variant="danger">Delete</Button>
          </Spec>
          <Spec label="Button / sizes + disabled">
            <Button size="sm">Save</Button>
            <Button size="md">Save</Button>
            <Button size="lg">Save</Button>
            <Button disabled>Held</Button>
          </Spec>
          <Spec label="ThemeToggle"><ThemeToggle /></Spec>
        </Family>

        <Family index="07.2" title="Forms" intro="Hairline fields; focus doubles the line. No glow.">
          <Spec label="Input + Textarea">
            <Input placeholder="you@station.io" style={{ minWidth: 200 }} />
            <Textarea placeholder="Field notes." rows={2} style={{ minWidth: 200 }} />
          </Spec>
          <Spec label="Select">
            <Select items={[{ value: 'utc', label: 'UTC (station time)' }, { value: 'e', label: 'UTC −5 · Eastern' }]} />
          </Spec>
          <Spec label="Checkbox + Radio">
            <Checkbox defaultChecked label="Keep the record" />
            <RadioGroup direction="row" value={radio} onChange={setRadio} items={[{ id: 'a', label: 'Wide' }, { id: 'b', label: 'Deep' }]} />
          </Spec>
          <Spec label="Switch + Slider">
            <Switch defaultChecked />
            <Slider defaultValue={64} label="gain" unit="%" width={200} />
          </Spec>
        </Family>

        <Family index="07.3" title="Feedback" intro="Status speaks in codes, then a quiet human sentence.">
          <Spec label="Badge">
            <Badge>v2.0</Badge>
            <Badge variant="success">signal ok</Badge>
            <Badge variant="warning">drift</Badge>
            <Badge variant="danger">lost</Badge>
          </Spec>
          <Spec label="Alert / OK · WARN · ERR" wide>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              <Alert variant="success" title="Saved.">The record is in the ledger.</Alert>
              <Alert variant="warning" title="Signal drifting.">Gain is below threshold. Raise it, or accept the noise.</Alert>
              <Alert variant="danger" title="Connection lost.">Retry, or check the console for the trace.</Alert>
            </div>
          </Spec>
          <Spec label="toast()">
            <Button variant="secondary" onClick={() => toast('Saved.', { code: 'OK' })}>OK toast</Button>
            <Button variant="secondary" onClick={() => toast('Gain low.', { code: 'WARN' })}>WARN toast</Button>
            <Button variant="secondary" onClick={() => toast('Uplink refused.', { code: 'ERR' })}>ERR toast</Button>
          </Spec>
        </Family>

        <Family index="07.4" title="Data" intro="Instrument panels: mono labels, weight-300 values, hairline grids.">
          <Spec label="Stat">
            <Stat label="active signals" value="128" delta="12 this week" direction="up" />
            <Stat label="latency" value="41" unit="ms" delta="6 ms" direction="down" />
          </Spec>
          <Spec label="Progress">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: '100%' }}>
              <Progress label="storage" value={72} />
              <Progress label="bandwidth" value={38} />
            </div>
          </Spec>
          <Spec label="ChartFrame" wide>
            <div style={{ width: '100%' }}>
              <ChartFrame title="Signal volume" meta="last 12 intervals" height={120} data={[12, 22, 18, 30, 26, 41, 38, 45, 52, 48, 60, 66]} stagger={30} />
            </div>
          </Spec>
          <Spec label="Table" wide>
            <div style={{ width: '100%' }}>
              <Table
                columns={[{ key: 'id', label: 'ID', mono: true }, { key: 'name', label: 'Record' }, { key: 'status', label: 'Status', mono: true, align: 'right' }]}
                rows={[{ id: 'REC-2047', name: 'Deep survey, sector 7', status: 'OK' }, { id: 'REC-2045', name: 'Uplink handshake', status: 'WARN' }]}
              />
            </div>
          </Spec>
        </Family>

        <Family index="07.5" title="Navigation" intro="Indexes and hairlines; the active mark glides, never jumps.">
          <Spec label="Tabs" wide>
            <div style={{ width: '100%' }}>
              <Tabs items={[{ id: 'o', label: 'Overview' }, { id: 's', label: 'Signals' }, { id: 'r', label: 'Records' }]} />
            </div>
          </Spec>
          <Spec label="Breadcrumbs">
            <Breadcrumbs items={[{ label: 'Station' }, { label: 'Signals' }, { label: 'Band C' }]} />
          </Spec>
        </Family>

        <Family index="07.6" title="Overlays" intro="Frosted, corner-ticked, dismissed with [ esc ].">
          <Spec label="Modal">
            <Button variant="secondary" onClick={() => setModal(true)}>Open modal</Button>
          </Spec>
          <Spec label="Dropdown">
            <Dropdown label="Actions" items={[{ id: 'x', label: 'Export record' }, { id: 'a', label: 'Archive' }, { divider: true }, { id: 'd', label: 'Delete', danger: true }]} onSelect={(id) => toast('Selected: ' + id, { code: 'OK' })} />
          </Spec>
          <Spec label="Tooltip">
            <Tooltip label="64.7331° N"><Button variant="ghost">Hover the mark</Button></Tooltip>
          </Spec>
        </Family>

        <Family index="07.7" title="Surfaces" intro="Three elevations; the feature card wears the corner ticks.">
          <Spec label="Card / base + raised + feature" wide>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, width: '100%' }}>
              <Card><MonoLabel muted>base</MonoLabel></Card>
              <Card variant="raised"><MonoLabel muted>raised</MonoLabel></Card>
              <Card variant="feature"><MonoLabel muted>feature</MonoLabel></Card>
            </div>
          </Spec>
          <Spec label="Wordmark + MonoLabel">
            <Wordmark size="0.8rem" />
            <MonoLabel>01 / system</MonoLabel>
            <MonoLabel muted>[ scroll ]</MonoLabel>
          </Spec>
        </Family>

        <HairlineDraw />
        <MonoLabel muted style={{ display: 'block', marginTop: 16, fontSize: '0.6rem' }}>
          spec complete · 31 parts · zero emoji
        </MonoLabel>
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        kicker="07.6 / overlay"
        title="A quiet interruption."
        footer={<><Button variant="ghost" onClick={() => setModal(false)}>Dismiss</Button><Button onClick={() => { setModal(false); toast('Acknowledged.', { code: 'OK' }); }}>Acknowledge</Button></>}
      >
        The backdrop dims 72% and blurs 6px. The panel rises 16px on the long deceleration. Esc closes it — the hint is printed on the panel itself.
      </Modal>
    </KitFrame>
  );
}
