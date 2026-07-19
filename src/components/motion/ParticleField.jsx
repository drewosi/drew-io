import React from 'react';
import { addFrame } from '../../motion/ticker.js';
import { useReducedMotion } from '../../hooks/useReveal.js';

/**
 * DREW.OS ParticleField — the lattice. A Fibonacci-sphere point field with one
 * accent meridian ring at longitude zero, projected by hand onto a 2D canvas.
 * Rotation rides the shared ticker; pointer proximity repels points on a
 * smoothed approach that decays — nothing bounces. Atmosphere-class loop:
 * one per page, in place of the grain. Reduced motion renders a single
 * static frame. Colors resolve from theme tokens and follow data-theme live.
 */
export function ParticleField({
  points = 1200,
  speed = 0.06,          // yaw, half-turns per second
  force = 35,            // pointer repulsion 0–100
  interactive = true,
  paused = false,
  centerX = 0.5,         // sphere center as a fraction of width
  radius = 0.42,         // sphere radius as a fraction of min(w, h)
  baseColor = '--text',
  accentColor = '--accent',
  dim = 1,               // global alpha multiplier
  className, style,
}) {
  const reduced = useReducedMotion();
  const wrapRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  const st = React.useRef(null);
  if (!st.current) {
    st.current = {
      pts: [], rotY: 0.8, tilt: 0.35, tiltTarget: 0.35,
      ptr: { x: -1e4, y: -1e4 }, pal: { pt: '#888', acc: '#888' },
      W: 0, H: 0, CX: 0, CY: 0, R: 0,
    };
  }
  const cfg = React.useRef({});
  cfg.current = { speed, force, paused, dim };
  const drawStaticRef = React.useRef(null);

  /* Build the lattice + the meridian ring. */
  React.useEffect(() => {
    const s = st.current;
    const n = Math.max(2, Math.floor(points));
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts = [];
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const th = golden * i;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, a: false, ox: 0, oy: 0 });
    }
    const m = Math.max(24, Math.round(n * 0.055));
    for (let i = 0; i < m; i++) {
      const phi = (i / m) * Math.PI * 2;
      pts.push({ x: Math.sin(phi), y: Math.cos(phi), z: 0, a: true, ox: 0, oy: 0 });
    }
    s.pts = pts;
    if (drawStaticRef.current) drawStaticRef.current();
  }, [points]);

  React.useEffect(() => {
    const wrap = wrapRef.current, canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    const s = st.current;

    const resolvePal = () => {
      const cs = getComputedStyle(canvas);
      const pt = cs.getPropertyValue(baseColor).trim();
      const acc = cs.getPropertyValue(accentColor).trim();
      if (pt) s.pal.pt = pt;
      if (acc) s.pal.acc = acc;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      s.W = wrap.clientWidth; s.H = wrap.clientHeight;
      canvas.width = s.W * dpr; canvas.height = s.H * dpr;
      canvas.style.width = s.W + 'px'; canvas.style.height = s.H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      s.CX = s.W * centerX; s.CY = s.H * 0.5; s.R = Math.min(s.W, s.H) * radius;
    };

    const render = (dt) => {
      const c = cfg.current;
      if (!c.paused && dt > 0) {
        s.rotY += c.speed * dt * Math.PI;
        s.tilt += (s.tiltTarget - s.tilt) * (1 - Math.exp(-4 * dt));
      }
      ctx.clearRect(0, 0, s.W, s.H);
      const sy = Math.sin(s.rotY), cy = Math.cos(s.rotY);
      const stl = Math.sin(s.tilt), ctl = Math.cos(s.tilt);
      const fov = 3.2, rad = 90;
      const kOff = dt > 0 ? 1 - Math.exp(-9 * dt) : 1;
      for (let pass = 0; pass < 2; pass++) {
        const accPass = pass === 1;
        ctx.fillStyle = accPass ? s.pal.acc : s.pal.pt;
        for (const p of s.pts) {
          if (p.a !== accPass) continue;
          const x1 = p.x * cy + p.z * sy;
          const z1 = -p.x * sy + p.z * cy;
          const y1 = p.y * ctl - z1 * stl;
          const z2 = p.y * stl + z1 * ctl;
          const sc = fov / (fov - z2);
          const px = s.CX + x1 * s.R * sc, py = s.CY + y1 * s.R * sc;
          let txo = 0, tyo = 0;
          const ddx = px - s.ptr.x, ddy = py - s.ptr.y, d2 = ddx * ddx + ddy * ddy;
          if (d2 < rad * rad && d2 > 0.01) {
            const d = Math.sqrt(d2), f = ((rad - d) / rad) * c.force * 0.028;
            txo = (ddx / d) * f * rad * 0.35; tyo = (ddy / d) * f * rad * 0.35;
          }
          p.ox += (txo - p.ox) * kOff; p.oy += (tyo - p.oy) * kOff;
          const t = (z2 + 1) / 2;
          const size = (accPass ? 1.4 : 0.9) + 1.7 * t;
          ctx.globalAlpha = Math.min(1, ((accPass ? 0.45 : 0.14) + 0.6 * t) * c.dim);
          ctx.fillRect(px + p.ox - size / 2, py + p.oy - size / 2, size, size);
        }
      }
      ctx.globalAlpha = 1;
    };

    const drawStatic = () => { resolvePal(); render(0); };
    drawStaticRef.current = drawStatic;

    resolvePal();
    resize();

    const ro = new ResizeObserver(() => { resize(); if (reduced) drawStatic(); });
    ro.observe(wrap);
    const mo = new MutationObserver(() => { resolvePal(); if (reduced) drawStatic(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let offPointer = null;
    if (interactive && !reduced) {
      const onMove = (e) => {
        const r = canvas.getBoundingClientRect();
        s.ptr.x = e.clientX - r.left; s.ptr.y = e.clientY - r.top;
        s.tiltTarget = 0.35 + ((e.clientY / window.innerHeight) - 0.5) * 0.5;
      };
      const park = () => { s.ptr.x = -1e4; s.ptr.y = -1e4; };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('blur', park);
      document.addEventListener('pointerleave', park);
      offPointer = () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('blur', park);
        document.removeEventListener('pointerleave', park);
      };
    }

    let offFrame = null;
    if (reduced) {
      s.rotY = 0.8; s.tilt = 0.35;
      drawStatic();
    } else {
      offFrame = addFrame(render);
    }

    return () => {
      if (offFrame) offFrame();
      if (offPointer) offPointer();
      ro.disconnect();
      mo.disconnect();
      drawStaticRef.current = null;
    };
  }, [reduced, interactive, centerX, radius, baseColor, accentColor]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', ...style }}>
      <canvas ref={canvasRef} style={{ display: 'block' }}></canvas>
    </div>
  );
}
