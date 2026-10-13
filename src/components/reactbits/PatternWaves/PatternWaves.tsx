import React, { useEffect, useRef } from 'react';
import './PatternWaves.css';

export interface PatternWavesProps {
  preset?: 'silk' | 'ocean' | 'pond' | 'lines' | 'terminal' | 'mesh';
  pattern?: 'dot' | 'square' | 'plus' | 'line' | 'glyph';
  wave?: 'silk' | 'swell' | 'ripple';
  spacing?: number;
  markSize?: number;
  depth?: number;
  light?: number;
  shine?: number;
  contrast?: number;
  speed?: number;
  scale?: number;
  direction?: number;
  color?: string;
  backgroundColor?: string;
  opacity?: number;
  fade?: 'edges' | 'center' | 'bottom' | 'top' | 'none';
  fadeSize?: number;
  characters?: string;
  interactive?: boolean;
  cursorSize?: number;
  cursorStrength?: number;
  intro?: boolean;
  paused?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function PatternWaves({
  preset = 'silk',
  pattern = 'dot',
  wave = 'silk',
  spacing = 16,
  markSize = 0.9,
  depth = 0.95,
  shine = 0.8,
  speed = 0.35,
  color = '#ffffff',
  backgroundColor = '#080204',
  opacity = 1,
  fade = 'edges',
  fadeSize = 0.5,
  interactive = true,
  cursorSize = 50,
  cursorStrength = 0.6,
  className = '',
  style
}: PatternWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let width = 0;
    let height = 0;

    // Pointer ripple tracking
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
      age: number;
    }> = [];
    let pointerX = -1000;
    let pointerY = -1000;
    let lastMoveTime = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(300, Math.round(rect.width || window.innerWidth || 1200));
      height = Math.max(300, Math.round(rect.height || window.innerHeight || 700));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointerX = x;
      pointerY = y;

      const now = performance.now();
      if (now - lastMoveTime > 55) {
        lastMoveTime = now;
        ripples.push({
          x,
          y,
          radius: 8,
          maxRadius: cursorSize * 2.8,
          strength: cursorStrength,
          age: 0
        });
        if (ripples.length > 10) ripples.shift();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 10,
        maxRadius: cursorSize * 3.8,
        strength: cursorStrength * 1.6,
        age: 0
      });
      if (ripples.length > 10) ripples.shift();
    };

    const onPointerLeave = () => {
      pointerX = -1000;
      pointerY = -1000;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave, { passive: true });

    // Multi-stage timers to calibrate size post-mount and post-loading
    const t1 = setTimeout(resize, 100);
    const t2 = setTimeout(resize, 600);
    const t3 = setTimeout(resize, 1500);

    // Render loop
    const render = () => {
      t += 0.02 * speed;

      ctx.clearRect(0, 0, width, height);

      // Draw background
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.radius += 2.8;
        rip.age += 0.022;
        if (rip.radius > rip.maxRadius || rip.age > 1) {
          ripples.splice(i, 1);
        }
      }

      const gridSpacing = Math.max(12, spacing);
      const cols = Math.ceil(width / gridSpacing) + 2;
      const rows = Math.ceil(height / gridSpacing) + 2;
      const startX = (width - cols * gridSpacing) / 2;
      const startY = (height - rows * gridSpacing) / 2;

      const halfW = width / 2;
      const halfH = height / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x0 = startX + c * gridSpacing;
          const y0 = startY + r * gridSpacing;

          // Silk drape fold calculation
          const waveU = x0 * 0.007 + y0 * 0.002;
          const waveV = y0 * 0.008 - x0 * 0.001;

          const fold =
            Math.sin(waveU * 5.5 + t * 1.4) * 12 +
            Math.cos(waveV * 4.2 - t * 0.9) * 8 +
            Math.sin((x0 + y0) * 0.004 + t * 0.6) * 6;

          // Ripple disturbance
          let rippleOffset = 0;
          let rippleGlow = 0;
          for (let i = 0; i < ripples.length; i++) {
            const rip = ripples[i];
            const dist = Math.hypot(x0 - rip.x, y0 - rip.y);
            const delta = Math.abs(dist - rip.radius);
            if (delta < 28) {
              const ripFactor = (1 - delta / 28) * (1 - rip.age) * rip.strength;
              rippleOffset += Math.sin(delta * 0.28) * ripFactor * 14;
              rippleGlow += ripFactor;
            }
          }

          // Cursor proximity breathing
          const distCursor = Math.hypot(x0 - pointerX, y0 - pointerY);
          let cursorPush = 0;
          if (distCursor < cursorSize * 2.2) {
            cursorPush = (1 - distCursor / (cursorSize * 2.2)) * 14 * cursorStrength;
          }

          const y = y0 + fold + rippleOffset - cursorPush;

          // Edge fade calculation
          let alpha = opacity;
          if (fade === 'edges') {
            const normX = Math.abs(x0 - halfW) / halfW;
            const normY = Math.abs(y0 - halfH) / halfH;
            const distCenter = Math.sqrt(normX * normX + normY * normY);
            if (distCenter > 1 - fadeSize) {
              alpha *= Math.max(0, 1 - (distCenter - (1 - fadeSize)) / fadeSize);
            }
          }

          // Specular shine & lighting on wave crests
          const normalizedFold = (fold + 26) / 52; // 0 to 1
          const brightness = Math.min(
            1,
            Math.max(0.18, normalizedFold * 0.85 + 0.15 + rippleGlow * 0.5)
          );
          const finalAlpha = Math.min(1, Math.max(0, alpha * brightness));

          if (finalAlpha < 0.02) continue;

          // Size of mark
          const radius = Math.max(
            0.8,
            gridSpacing *
              0.16 *
              markSize *
              (0.65 + normalizedFold * 0.65 + rippleGlow * 0.5)
          );

          ctx.fillStyle = color;
          ctx.globalAlpha = finalAlpha;

          ctx.beginPath();
          ctx.arc(x0, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [
    preset,
    pattern,
    wave,
    spacing,
    markSize,
    depth,
    shine,
    speed,
    color,
    backgroundColor,
    opacity,
    fade,
    fadeSize,
    interactive,
    cursorSize,
    cursorStrength
  ]);

  return (
    <div
      ref={containerRef}
      className={`pattern-waves ${className}`.trim()}
      style={style}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
