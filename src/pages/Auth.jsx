import React from 'react';
import { Card, MonoLabel, Input, Checkbox, Button, Alert, toast, DecodeText, Reveal, BlinkDot, HairlineDraw } from '../lib.js';
import { KitFrame } from './KitFrame.jsx';

export function Auth() {
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [error, setError] = React.useState(null);
  const [verified, setVerified] = React.useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@') || pass.length < 4) {
      setError('Credentials not recognized. Check the address, or request access below.');
      setVerified(false);
      return;
    }
    setError(null);
    setVerified(true);
    toast('Signal verified. Opening the console.', { code: 'OK' });
    setTimeout(() => { window.location.hash = '/console'; }, 1400);
  };

  return (
    <KitFrame index="03" title="auth" builtFrom={['Card', 'Input', 'Checkbox', 'Button', 'Alert', 'toast', 'DecodeText']}>
      <section style={{ minHeight: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px 24px' }}>
        <div style={{ width: 400, maxWidth: '100%' }}>
          <Reveal mounted>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <MonoLabel>03 / access</MonoLabel>
              <MonoLabel muted><BlinkDot color={verified ? 'var(--success)' : 'var(--accent-soft)'} /> {verified ? 'verified' : 'listening'}</MonoLabel>
            </div>
          </Reveal>
          <Reveal mounted delay={120}>
            <Card variant="feature" hoverable={false}>
              <h1 style={{ fontSize: 'var(--text-h2)', fontWeight: 300, letterSpacing: '-0.02em', margin: '4px 0 8px' }}>
                <DecodeText text="Enter the station." duration={900} delay={350} />
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: '0 0 24px' }}>
                Identify yourself. The door is a formality; the record is not.
              </p>

              {error && (
                <Alert variant="danger" title="Access denied." animate style={{ marginBottom: 20 }}>{error}</Alert>
              )}
              {verified && (
                <Alert variant="success" title="Access granted." animate style={{ marginBottom: 20 }}>Routing to the console.</Alert>
              )}

              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <MonoLabel muted>address</MonoLabel>
                  <Input type="email" placeholder="you@station.io" value={email} onChange={e => setEmail(e.target.value)} style={{ minWidth: 0, width: '100%' }} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <MonoLabel muted>passphrase</MonoLabel>
                  <Input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} style={{ minWidth: 0, width: '100%' }} />
                </label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4, flexWrap: 'wrap', gap: 12 }}>
                  <Checkbox defaultChecked label="Remember this device" />
                  <MonoLabel muted style={{ fontSize: '0.6rem' }}>[ two-day reply ]</MonoLabel>
                </div>
                <HairlineDraw delay={200} style={{ margin: '8px 0' }} />
                <div style={{ display: 'flex', gap: 12 }}>
                  <Button type="submit" style={{ flex: 1 }}>Authenticate</Button>
                  <Button type="button" variant="ghost" onClick={() => toast('Request logged. Reply within two days.', { code: 'OK' })}>Request access</Button>
                </div>
              </form>
            </Card>
          </Reveal>
          <Reveal mounted delay={280} style={{ textAlign: 'center', marginTop: 20 }}>
            <MonoLabel muted style={{ fontSize: '0.6rem' }}>64.7331° N · 18.1059° W · uplink secured</MonoLabel>
          </Reveal>
        </div>
      </section>
    </KitFrame>
  );
}
