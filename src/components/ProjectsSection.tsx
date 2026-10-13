import { useState, useRef, useEffect } from 'react';
import MorphSlider, { type MorphSliderItem } from './reactbits/MorphSlider/MorphSlider';
import GithubIcon from './icons/GithubIcon';
import { ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PortfolioProject extends MorphSliderItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  githubUrl: string;
}

const PORTFOLIO_ITEMS: PortfolioProject[] = [
  {
    id: 'anix',
    image: '/anix-unsplash.jpg',
    caption: 'Anix — Anime Streaming App',
    title: 'Anix',
    subtitle: 'Anime Streaming App',
    description:
      'Platform streaming anime modern dengan pemutar video HLS adaptif, dukungan multi-server otomatis, dan navigasi episode yang cepat tanpa distraksi.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'HLS.js'],
    githubUrl: 'https://github.com/hmz64/anix'
  },
  {
    id: 'calmquran',
    image: '/calmquran-unsplash.jpg',
    caption: 'CalmQuran — Quran Reciter',
    title: 'CalmQuran',
    subtitle: 'Quran Reciter',
    description:
      'Aplikasi Al-Qur\'an digital dengan lantunan murottal berkualitas tinggi, sinkronisasi teks mushaf, dan latar suara ambien yang tenang.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API'],
    githubUrl: 'https://github.com/hmz64/calmquran'
  },
  {
    id: 'creative',
    image: '/creative-unsplash.jpg',
    caption: 'Creative Systems — Web Engineering',
    title: 'Creative Systems',
    subtitle: 'Dark Aesthetic & Engineering',
    description:
      'Eksplorasi antarmuka web performa tinggi dengan akselerasi GPU WebGL, mikro-interaksi, dan arsitektur kode modern.',
    techStack: ['React', 'TypeScript', 'WebGL', 'GSAP', 'OGL'],
    githubUrl: 'https://github.com/hmz64'
  }
];

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  const currentProject = PORTFOLIO_ITEMS[activeIndex] || PORTFOLIO_ITEMS[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }

      if (sliderWrapperRef.current) {
        gsap.from(sliderWrapperRef.current, {
          y: 50,
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sliderWrapperRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-24 relative overflow-hidden bg-[#080204]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 will-change-transform">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-3">
            Portofolio
          </h2>
          <p className="text-sm sm:text-base text-[#d4afb8] max-w-md mx-auto">
            Geser atau klik panah untuk eksplorasi proyek dengan transisi GPU Morph.
          </p>
        </div>

        {/* MorphSlider Container */}
        <div
          ref={sliderWrapperRef}
          className="relative w-full h-[360px] sm:h-[480px] md:h-[540px] rounded-[24px] overflow-hidden border border-[#3d121d] shadow-[0_10px_40px_rgba(225,29,72,0.15)] will-change-transform"
        >
          <MorphSlider
            items={PORTFOLIO_ITEMS}
            transition="melt"
            intensity={0.55}
            aberration={0.35}
            drift={0.4}
            autoplay={true}
            autoplayDelay={4.5}
            radius={24}
            overlayColor="#080204"
            showCaptions={true}
            showControls={true}
            showIndicators={true}
            onIndexChange={setActiveIndex}
          />
        </div>

        {/* Project Meta Information Panel */}
        <div
          ref={detailsRef}
          className="mt-8 p-6 sm:p-8 rounded-3xl liquid-glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all duration-300"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-black text-white font-mono">
                {currentProject.title}
              </h3>
              <span className="text-xs font-mono px-3 py-1 rounded-full liquid-glass-pill text-[#fca5a5]">
                {currentProject.subtitle}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#eed1d8] leading-relaxed mb-4">
              {currentProject.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl liquid-glass-pill text-[11px] font-mono text-[#fda4af]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <a
              href={currentProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3 rounded-xl liquid-glass-btn text-white text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
