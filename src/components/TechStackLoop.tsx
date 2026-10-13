import React from 'react';
import LogoLoop, { type LogoItem } from './reactbits/LogoLoop/LogoLoop';

const TECH_LOGOS: LogoItem[] = [
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#e11d48">
          <path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          <circle cx="12" cy="12" r="3" fill="#ffffff" />
        </svg>
        <span>React</span>
      </div>
    ),
    title: 'React',
    href: 'https://react.dev'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#3178c6">
          <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.74 13.91h-2.92V8.08H7.13V5.88h7.45v2.2h-2.34v5.83zm5.02-3.15c.67.24 1.25.64 1.68 1.16.44.52.66 1.17.66 1.93 0 .82-.24 1.52-.71 2.06-.47.54-1.12.92-1.93 1.12-.5.12-1.15.18-1.95.18h-4.3V5.88h4.2c.86 0 1.54.06 2.04.18.78.18 1.4.53 1.84 1.03.44.5.67 1.16.67 1.94 0 .6-.15 1.12-.44 1.54a3.17 3.17 0 0 1-1.76 1.19z" />
        </svg>
        <span>TypeScript</span>
      </div>
    ),
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#38bdf8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.975 12 6.001 12z" />
        </svg>
        <span>Tailwind CSS</span>
      </div>
    ),
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#ffffff">
          <path d="M18.665 21.978l-12.29-15.7h-3.375v17.444h2.956V8.922l11.453 14.778h3.256v-1.722h-2zM21 4.278h-2.956v15.111H21V4.278z" />
        </svg>
        <span>Next.js</span>
      </div>
    ),
    title: 'Next.js',
    href: 'https://nextjs.org'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#e11d48">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#e11d48" strokeWidth="2" fill="none" />
        </svg>
        <span>OGL / WebGL</span>
      </div>
    ),
    title: 'OGL WebGL',
    href: 'https://github.com/oframe/ogl'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#88ce02">
          <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 5h-2v6h6v-2h-4V7z" />
        </svg>
        <span>GSAP Animation</span>
      </div>
    ),
    title: 'GSAP',
    href: 'https://gsap.com'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#68a063">
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5h-2v-5h2zm0-7h-2V7h2z" />
        </svg>
        <span>Node.js</span>
      </div>
    ),
    title: 'Node.js',
    href: 'https://nodejs.org'
  },
  {
    node: (
      <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl liquid-glass-pill text-white font-mono text-xs font-semibold">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="#f43f5e">
          <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
        <span>HLS Video Engine</span>
      </div>
    ),
    title: 'HLS Video',
    href: 'https://hls-js.netlify.app'
  }
];

export default function TechStackLoop() {
  return (
    <section id="tech" className="py-12 relative overflow-hidden bg-[#080204]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 rounded-3xl liquid-glass-card relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#fca5a5]">
              Core Tech Stack &amp; Libraries
            </span>
          </div>

          <div className="relative w-full h-[60px] overflow-hidden">
            <LogoLoop
              logos={TECH_LOGOS}
              speed={75}
              direction="left"
              logoHeight={36}
              gap={24}
              hoverSpeed={0}
              scaleOnHover={true}
              fadeOut={true}
              fadeOutColor="#0e0408"
              ariaLabel="Tech stack logos"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
