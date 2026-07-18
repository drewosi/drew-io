import React from 'react';
import { Wordmark, MonoLabel, ThemeToggle, Reveal } from '../lib.js';

function HeaderLink({ hash, children }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      onClick={() => { window.location.hash = hash; }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'none', border: 'none', padding: 0, cursor: 'pointer', outline: 'none',
        fontFamily: 'var(--font-mono)', fontSize: 'var(--text-label)', fontWeight: 500,
        letterSpacing: '0.16em', textTransform: 'uppercase',
        color: hover ? 'var(--text)' : 'var(--text-muted)',
        transition: 'color var(--ease)',
      }}>{children}</button>
  );
}

/**
 * KitFrame — shared chrome for every kit page: sticky wordmark header with
 * an index trail, and a footer that records which parts the page is built
 * from. Copy a kit page + this frame and you have a complete screen.
 */
export function KitFrame({ index, title, builtFrom = [], children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
        backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)',
      }}>
        <div className="container" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', rowGap: 8 }}>
          <Reveal mounted as="span" style={{ display: 'inline-flex', alignItems: 'baseline', gap: 16 }}>
            <Wordmark size="0.75rem" />
            <MonoLabel muted>{index} / {title}</MonoLabel>
          </Reveal>
          <Reveal mounted delay={100} style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <HeaderLink hash="/">Surface</HeaderLink>
            <HeaderLink hash="/kits">Kits</HeaderLink>
            <ThemeToggle />
          </Reveal>
        </div>
      </header>

      <div style={{ flex: 1 }}>{children}</div>

      <footer style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container" style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <MonoLabel muted>[ end of record ]</MonoLabel>
          {builtFrom.length > 0 && (
            <MonoLabel muted style={{ letterSpacing: '0.12em' }}>built from: {builtFrom.join(' · ')}</MonoLabel>
          )}
        </div>
      </footer>
    </div>
  );
}
