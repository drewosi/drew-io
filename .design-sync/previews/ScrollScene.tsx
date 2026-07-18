import React from 'react';
import { ScrollScene, useSceneProgress, MonoLabel } from 'drew-io';

const Frame = ({ children }) => (
  <div style={{ background: 'var(--bg)', padding: 28, borderRadius: 4, border: '1px solid var(--border)', color: 'var(--text)' }}>{children}</div>
);

/* A scene consumer: four tiles scatter as progress scrubs. */
const Tiles = () => {
  const refs = React.useRef<(HTMLDivElement | null)[]>([]);
  const SC = [{ x: -44, y: -26 }, { x: 26, y: -44 }, { x: 46, y: 20 }, { x: -30, y: 38 }];
  useSceneProgress((p) => {
    for (let i = 0; i < 4; i++) {
      const el = refs.current[i];
      if (!el) continue;
      const t = Math.max(0, Math.min(1, (p - i * 0.08) / 0.7));
      const e = 1 - Math.pow(1 - t, 3);
      el.style.transform = 'translate3d(' + (SC[i].x * e).toFixed(1) + 'px, ' + (SC[i].y * e).toFixed(1) + 'px, 0)';
      el.style.opacity = String(1 - 0.8 * e);
    }
  });
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} ref={(el) => { refs.current[i] = el; }} style={{
          width: 52, height: 52, border: '1px solid var(--border)', background: 'var(--surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <MonoLabel muted style={{ fontSize: '0.55rem' }}>{'0' + (i + 1)}</MonoLabel>
        </div>
      ))}
    </div>
  );
};

/* Controlled scrub — on a real page, omit `progress` and scroll drives the scene. */
export const MidScrub = () => (
  <Frame>
    <ScrollScene progress={0.4} style={{ height: 200, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)' }}>
      <Tiles />
    </ScrollScene>
    <MonoLabel muted style={{ display: 'block', marginTop: 12, fontSize: '0.58rem' }}>SCENE PROGRESS — 40% · PINNED VIA CSS STICKY ON A PAGE</MonoLabel>
  </Frame>
);
