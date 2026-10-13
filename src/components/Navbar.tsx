import { useState, useEffect } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import { Menu, X } from 'lucide-react';
import GithubIcon from './icons/GithubIcon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'liquid-glass-nav py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-[0_0_12px_rgba(225,29,72,0.4)]">
            <img
              src={PROFILE_INFO.avatar}
              alt={PROFILE_INFO.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-mono font-bold text-base text-white tracking-wide group-hover:text-[#f43f5e] transition-colors">
            {PROFILE_INFO.name}
          </span>
        </a>

        {/* Desktop Links - Liquid Glass capsule */}
        <div className="hidden md:flex items-center gap-6 px-5 py-1.5 rounded-full liquid-glass-pill">
          <a
            href="#projects"
            className="text-xs font-mono text-[#d4afb8] hover:text-white transition-colors"
          >
            Proyek
          </a>
          <a
            href="#tech"
            className="text-xs font-mono text-[#d4afb8] hover:text-white transition-colors"
          >
            Stack
          </a>
          <a
            href="#contact"
            className="text-xs font-mono text-[#d4afb8] hover:text-white transition-colors"
          >
            Kontak
          </a>
        </div>

        {/* Action Button - Liquid Glass Button */}
        <div className="hidden md:flex items-center">
          <a
            href={PROFILE_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-btn-secondary px-4 py-2 rounded-xl text-white text-xs font-mono flex items-center gap-2"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#d4afb8]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden liquid-glass-nav px-6 py-4 flex flex-col gap-3">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-mono text-[#fce7ec] py-1"
          >
            Proyek
          </a>
          <a
            href="#tech"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-mono text-[#fce7ec] py-1"
          >
            Stack
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-mono text-[#fce7ec] py-1"
          >
            Kontak
          </a>
          <a
            href={PROFILE_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-mono text-[#f43f5e] pt-2 border-t border-white/10"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </a>
        </div>
      )}
    </nav>
  );
}
