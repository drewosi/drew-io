import React from 'react';
import { Wordmark } from '../components/surfaces/Wordmark.jsx';
import { MonoLabel } from '../components/surfaces/MonoLabel.jsx';
import { Card } from '../components/surfaces/Card.jsx';
import { Button } from '../components/actions/Button.jsx';
import { ThemeToggle } from '../components/actions/ThemeToggle.jsx';
import { Stat } from '../components/data/Stat.jsx';
import { Input } from '../components/forms/Input.jsx';
import { Ticker } from '../components/motion/Ticker.jsx';
import { DecodeText } from '../components/motion/DecodeText.jsx';
import { Reveal } from '../components/motion/Reveal.jsx';
import { SectionNumeral } from '../components/motion/SectionNumeral.jsx';
import { Magnetic } from '../components/motion/Magnetic.jsx';
import { Parallax } from '../components/motion/Parallax.jsx';
import { ParticleField } from '../components/motion/ParticleField.jsx';
import { Wayfinder } from '../components/motion/Wayfinder.jsx';
import { useReveal } from '../hooks/useReveal.js';
import { useCountUp } from '../hooks/useCountUp.js';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import { SPECIMEN_COUNT } from '../data/specimens.js';

/* 1px accent hairline at the very top, tracking scroll depth. */
function ScrollProgress() {
  const ref = useScrollProgress();
  return <div ref={ref} className="scroll-progress" aria-hidden="true"></div>;
}

function NavLink({ href, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color var(--ease)',
      }}>{children}</a>
  );
}

const capabilities = [
  { index: '02.1', title: 'Interfaces', body: 'Consoles, dashboards, and tools that read like instruments.', feature: true },
  { index: '02.2', title: 'Prototypes', body: 'Ideas made clickable before they are made real.' },
  { index: '02.3', title: 'Systems', body: 'Tokens, components, and rules that keep every artifact on-voice.' },
];

/* One field, one verb — Transmit opens the visitor's mail client
   addressed to the station, carrying their reply-to address. */
function ContactForm() {
  const [email, setEmail] = React.useState('');
  const transmit = () => {
    const subject = encodeURIComponent('Signal from drew.io');
    const body = encodeURIComponent(email ? 'Reply-to: ' + email + '\n\n' : '');
    window.location.href = 'mailto:drewosipenko@gmail.com?subject=' + subject + '&body=' + body;
  };
  return (
    <form
      data-testid="contact-form"
      onSubmit={(e) => { e.preventDefault(); transmit(); }}
      style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
    >
      <Input
        placeholder="you@station.io"
        type="email"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit">Transmit</Button>
    </form>
  );
}

function StatStrip() {
  const [ref, visible] = useReveal();
  const shipped = useCountUp(SPECIMEN_COUNT, { visible });
  const components = useCountUp(54, { visible, delay: 120 });
  const tokens = useCountUp(48, { visible, delay: 240 });
  return (
    <div ref={ref} className="container" style={{ padding: '64px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 32 }}>
      <Stat label="projects shipped" value={shipped} />
      <Stat label="components" value={components} />
      <Stat label="tokens" value={tokens} />
      <Stat label="emoji used" value="0" delta="permanent" direction="flat" />
    </div>
  );
}

export function Landing() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <ScrollProgress />
      <Wayfinder sections={[
        { id: 'top', label: '01 / transmission' },
        { id: 'work', label: '02 / capabilities' },
        { id: 'system', label: '02.9 / readings' },
        { id: 'contact', label: '03 / contact' },
      ]} />

      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(12px)',
      }}>
        <div className="container" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', flexWrap: 'wrap', rowGap: 8 }}>
          <Reveal mounted as="span" style={{ display: 'inline-flex' }}><Wordmark size="0.8rem" /></Reveal>
          <Reveal mounted delay={100} as="nav" className="header-nav" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#/portfolio">Portfolio</NavLink>
            <NavLink href="#system">System</NavLink>
            <NavLink href="#/kits">Kits</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <ThemeToggle />
          </Reveal>
        </div>
        <div style={{ position: 'relative' }}><span className="hairline-draw"></span></div>
      </header>

      <section id="top" style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <ParticleField points={1000} speed={0.05} centerX={0.66} dim={0.55} style={{ zIndex: 0 }} />
        <div className="container hero-pad" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal mounted delay={200} style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 48 }}>
            <MonoLabel>01 / transmission</MonoLabel>
            <MonoLabel muted>est. 2026 · drew.io</MonoLabel>
          </Reveal>
          <h1 style={{ fontSize: 'var(--text-display)', fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 1.02, margin: 0, maxWidth: '15ch' }}>
            <DecodeText text="Ideas surface. The signature holds." duration={1300} delay={450} />
          </h1>
          <Reveal mounted delay={600} as="p" style={{ fontSize: 'var(--text-h3)', fontWeight: 400, color: 'var(--text-muted)', margin: '24px 0 0', maxWidth: '46ch' }}>
            Design work, shipped in one cold, precise voice — and the system it all runs on.
          </Reveal>
          <Reveal mounted delay={800} style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <Magnetic><Button size="lg" onClick={() => { window.location.hash = '/portfolio'; }}>Enter</Button></Magnetic>
            <Button variant="ghost" size="lg" onClick={() => { window.location.hash = '/kits'; }}>Browse the kits ↗</Button>
          </Reveal>
        </div>
      </section>

      <Ticker items={['64.7331° N · 18.1059° W', 'SIGNAL OK', 'DARK-FIRST, SILENT-ALWAYS', 'ONE HUE, FOUR DEPTHS', 'EST. 2026']} />

      <section id="work" style={{ borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
        <Parallax depth={0.12} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
          <SectionNumeral>02</SectionNumeral>
        </Parallax>
        <div className="container section-pad" style={{ position: 'relative' }}>
          <Reveal>
            <MonoLabel>02 / capabilities</MonoLabel>
            <h2 style={{ fontSize: 'var(--text-h2)', fontWeight: 400, letterSpacing: '-0.02em', margin: '12px 0 48px' }}>Anything, in one voice.</h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.index} delay={i * 130}>
                <Card variant={c.feature ? 'feature' : 'base'} style={{ height: '100%' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', letterSpacing: '0.18em', color: 'var(--text-muted)' }}>{c.index}</div>
                  <h3 style={{ fontSize: 'var(--text-h3)', fontWeight: 500, margin: '16px 0 12px' }}>{c.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-small)', margin: 0 }}>{c.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="system" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
        <StatStrip />
      </section>

      <section id="contact">
        <div className="container section-pad" style={{ textAlign: 'center' }}>
          <Reveal>
            <MonoLabel>03 / contact</MonoLabel>
            <h2 style={{ fontSize: 'var(--text-h1)', fontWeight: 300, letterSpacing: '-0.02em', margin: '16px auto 12px', maxWidth: '18ch' }}>Send a signal.</h2>
            <p style={{ color: 'var(--text-muted)', margin: '0 auto 32px', maxWidth: '40ch' }}>One field. A reply within two days.</p>
          </Reveal>
          <Reveal delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '32px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Wordmark size="0.7rem" />
          <MonoLabel muted>[ end of record ] · dark-first, silent-always</MonoLabel>
        </div>
      </footer>
    </div>
  );
}
