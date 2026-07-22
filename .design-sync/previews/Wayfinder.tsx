import React from 'react';
import { Wayfinder, MonoLabel, SectionHead } from 'drew-io';

/* Wide pointer-fine viewports only (min-width: 1000px) — the card viewport is
   pinned wide via cfg.overrides. Sections render in-frame so the scroll-spy
   has real targets; the fixed right-edge dots land on the card's right edge.
   The hover label chip is interaction-only and can't capture statically. */
export const SectionDots = () => (
  <div style={{ position: 'relative', minHeight: 360, background: 'var(--bg)', color: 'var(--text)', overflow: 'hidden', padding: '28px 72px 28px 32px' }}>
    <Wayfinder sections={[
      { id: 'top', label: '01 / transmission' },
      { id: 'work', label: '02 / capabilities' },
      { id: 'system', label: '02.9 / readings' },
      { id: 'contact', label: '03 / contact' },
    ]} />
    <section id="top" style={{ paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
      <SectionHead numeral="01" title="Transmission" />
      <p style={{ color: 'var(--text-muted)', maxWidth: '52ch', margin: '12px 0 0' }}>
        Ideas surface. The signature holds. The dots on the right edge track which
        section the reader is in; the active one carries the accent.
      </p>
    </section>
    <section id="work" style={{ padding: '24px 0' }}>
      <MonoLabel muted>02 / CAPABILITIES — SCROLLS INTO VIEW NEXT</MonoLabel>
    </section>
    <section id="system" style={{ padding: '4px 0' }}>
      <MonoLabel muted>02.9 / READINGS</MonoLabel>
    </section>
    <section id="contact" style={{ padding: '4px 0' }}>
      <MonoLabel muted>03 / CONTACT</MonoLabel>
    </section>
  </div>
);
