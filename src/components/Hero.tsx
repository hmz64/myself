import { useEffect, useRef } from 'react';
import PatternWaves from './reactbits/PatternWaves/PatternWaves';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro Stagger Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(avatarRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.1
      })
        .from(
          titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 1
          },
          '-=0.7'
        )
        .from(
          descRef.current,
          {
            y: 25,
            opacity: 0,
            duration: 0.85
          },
          '-=0.6'
        )
        .from(
          buttonsRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.8
          },
          '-=0.6'
        );

      // ScrollTrigger Parallax
      if (contentRef.current && heroRef.current) {
        gsap.to(contentRef.current, {
          y: 80,
          opacity: 0.4,
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-4"
    >
      {/* PatternWaves dynamic canvas background */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto overflow-hidden -z-0">
        <PatternWaves
          preset="silk"
          color="#ffffff"
          backgroundColor="#080204"
          fade="edges"
          interactive={true}
          cursorSize={50}
          cursorStrength={0.6}
        />
      </div>

      {/* Main clean hero typography */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-2xl mx-auto text-center pointer-events-none flex flex-col items-center justify-center"
      >
        {/* Profile Avatar */}
        <div
          ref={avatarRef}
          className="mx-auto mb-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 liquid-glass-pill shadow-[0_0_30px_rgba(225,29,72,0.45)] pointer-events-auto will-change-transform"
        >
          <img
            src="/asuka.jpg"
            alt="hmz64"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-4 font-mono will-change-transform drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]"
        >
          hmz64
        </h1>

        <p
          ref={descRef}
          className="text-base sm:text-xl text-[#ebd0d7] max-w-xl mx-auto leading-relaxed mb-8 will-change-transform drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]"
        >
          Pengembang web dengan fokus pada aplikasi media dan pengalaman visual bertema gelap.
        </p>

        <div
          ref={buttonsRef}
          className="flex items-center justify-center gap-4 will-change-transform pointer-events-auto"
        >
          <a
            href="#projects"
            className="liquid-glass-btn px-8 py-3.5 rounded-2xl text-white text-xs sm:text-sm font-mono font-bold tracking-wide"
          >
            Lihat Proyek
          </a>
          <a
            href="#contact"
            className="liquid-glass-btn-secondary px-8 py-3.5 rounded-2xl text-[#fcd2da] text-xs sm:text-sm font-mono tracking-wide"
          >
            Kontak
          </a>
        </div>
      </div>
    </section>
  );
}
