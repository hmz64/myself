import { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import TechStackLoop from './components/TechStackLoop';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#080204] text-[#fce7ec] selection:bg-[#e11d48] selection:text-white">
      {/* Intro / HTTP Download Loader with Grid Curtain Transition */}
      <PageLoader />

      {/* GSAP Scroll Progress Bar */}
      <div
        ref={progressBarRef}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#f43f5e] z-50 origin-left scale-x-0 shadow-[0_0_12px_rgba(225,29,72,0.8)] pointer-events-none"
      />

      {/* Global Navigation */}
      <Navbar />

      {/* Hero with PatternWaves */}
      <Hero />

      {/* Projects with FlipCard & MorphSlider (Anix & CalmQuran) */}
      <ProjectsSection />

      {/* Tech Stack LogoLoop */}
      <TechStackLoop />

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
