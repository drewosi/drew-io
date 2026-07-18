import React from 'react';
import {
  MonoLabel, SectionHead, Tabs, Input, Textarea, Select, Switch, Slider, RadioGroup,
  Button, Modal, toast, Reveal, HairlineDraw,
} from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

function Row({ label, hint, children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, padding: '18px 0', borderBottom: '1px solid var(--border)', flexWrap: 'wrap' }}>
      <div style={{ maxWidth: '48ch' }}>
        <div style={{ fontWeight: 500, fontSize: 'var(--text-small)' }}>{label}</div>
        {hint && <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>{hint}</div>}
      </div>
      {children}
    </div>
  );
}

/* Tab panels re-enter on the reveal curve each switch. */
function Panel({ tabKey, children }) {
  return <Reveal mounted key={tabKey} style={{ paddingTop: 8 }}>{children}</Reveal>;
}

export function Settings() {
  const [tab, setTab] = React.useState('profile');
  const [confirm, setConfirm] = React.useState(false);
  const [gain, setGain] = React.useState(64);

  return (
    <KitFrame index="04" title="settings" builtFrom={['Tabs', 'Switch', 'Slider', 'Select', 'RadioGroup', 'Textarea', 'Modal', 'toast']}>
      <div className="container" style={{ padding: '64px 24px 96px', maxWidth: 860 }}>
        <Reveal mounted>
          <SectionHead kicker="04 / preferences" title="Station settings.">
            Changes save when you say so. Nothing here is louder than it needs to be.
          </SectionHead>
        </Reveal>

        <Reveal mounted delay={150}>
          <Tabs
            active={tab}
            onChange={setTab}
            items={[
              { id: 'profile', label: 'Profile' },
              { id: 'station', label: 'Station' },
              { id: 'signals', label: 'Signals' },
              { id: 'danger', label: 'Danger' },
            ]}
          />
        </Reveal>

        {tab === 'profile' && (
          <Panel tabKey="profile">
            <Row label="Operator name" hint="Appears in the record ledger.">
              <Input defaultValue="Drew" style={{ minWidth: 220 }} />
            </Row>
            <Row label="Timezone" hint="All logs are kept in UTC regardless.">
              <Select items={[{ value: 'utc', label: 'UTC (station time)' }, { value: 'gmt-5', label: 'UTC −5 · Eastern' }, { value: 'gmt-8', label: 'UTC −8 · Pacific' }]} />
            </Row>
            <Row label="Field notes" hint="One paragraph. Shown on your tear sheet.">
              <Textarea rows={3} placeholder="Precise, calm, declarative." style={{ minWidth: 0, width: 320, maxWidth: '100%' }} />
            </Row>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              <Button variant="ghost" onClick={() => toast('Changes discarded.', { code: 'WARN' })}>Discard</Button>
              <Button onClick={() => toast('Profile saved.', { code: 'OK' })}>Save</Button>
            </div>
          </Panel>
        )}

        {tab === 'station' && (
          <Panel tabKey="station">
            <Row label="Dark-first rendering" hint="Frost theme remains one toggle away.">
              <Switch defaultChecked />
            </Row>
            <Row label="Ambient ticker" hint="The one sanctioned infinite loop.">
              <Switch defaultChecked />
            </Row>
            <Row label="Decode reveals" hint="Once per screen, on the line that matters.">
              <Switch defaultChecked />
            </Row>
            <Row label="Emoji" hint="Permanently zero. This switch is decorative.">
              <Switch checked={false} onChange={() => toast('No.', { code: 'ERR' })} />
            </Row>
          </Panel>
        )}

        {tab === 'signals' && (
          <Panel tabKey="signals">
            <Row label="Receiver gain" hint="Higher gain surfaces weaker ideas.">
              <Slider value={gain} onChange={setGain} unit="%" label="gain" width={240} />
            </Row>
            <Row label="Sweep mode" hint="How the antenna spends its nights.">
              <RadioGroup direction="row" value="wide" onChange={(id) => toast('Sweep mode: ' + id + '.', { code: 'OK' })}
                items={[{ id: 'wide', label: 'Wide' }, { id: 'deep', label: 'Deep' }, { id: 'still', label: 'Still' }]} />
            </Row>
            <div style={{ marginTop: 24 }}>
              <HairlineDraw />
              <MonoLabel muted style={{ display: 'block', marginTop: 12, fontSize: '0.6rem' }}>
                current gain {gain}% · band C · logged continuously
              </MonoLabel>
            </div>
          </Panel>
        )}

        {tab === 'danger' && (
          <Panel tabKey="danger">
            <div style={{ border: '1px solid var(--danger)', borderRadius: 'var(--radius-sm)', padding: 24, marginTop: 16 }}>
              <MonoLabel style={{ color: 'var(--danger)' }}>ERR / irreversible</MonoLabel>
              <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 500, margin: '12px 0 8px' }}>Erase the record</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: '0 0 20px', maxWidth: '52ch' }}>
                Deletes 2,047 records and the station log. There is no archive beneath the archive.
              </p>
              <Button variant="danger" onClick={() => setConfirm(true)}>Erase</Button>
            </div>
          </Panel>
        )}
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        kicker="ERR / confirm"
        title="Erase the record."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Dismiss</Button>
            <Button variant="danger" onClick={() => { setConfirm(false); toast('Nothing was erased. This is a kit.', { code: 'WARN' }); }}>Erase</Button>
          </>
        }
      >
        This deletes every record this station has ever kept. Type nothing; just be sure. Bad news is factual: there is no undo.
      </Modal>
    </KitFrame>
  );
}
