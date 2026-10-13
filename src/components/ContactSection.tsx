import { useState, useEffect, useRef } from 'react';
import { PROFILE_INFO } from '../data/portfolioData';
import GithubIcon from './icons/GithubIcon';
import { Mail, MessageSquare, Copy, Check, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

      if (leftColRef.current && formRef.current) {
        gsap.from(leftColRef.current.children, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: leftColRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });

        gsap.from(formRef.current, {
          x: 30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 relative overflow-hidden bg-[#060103]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div ref={headerRef} className="text-center mb-14 will-change-transform">
          <h2 className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight mb-3">
            Kontak
          </h2>
          <p className="text-sm sm:text-base text-[#d4afb8]">
            Hubungi hmz64 untuk kolaborasi atau pertanyaan proyek.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Direct channels */}
          <div ref={leftColRef} className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl liquid-glass-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#e11d48]" />
                <div>
                  <div className="text-[10px] text-[#9f8a91]">EMAIL</div>
                  <div className="text-white font-semibold">{PROFILE_INFO.socials.email}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PROFILE_INFO.socials.email, 'email')}
                className="p-2 rounded-xl liquid-glass-pill hover:border-[#e11d48]/40 text-[#fda4af] transition-all cursor-pointer"
                title="Copy Email"
              >
                {copied === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-2xl liquid-glass-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#e11d48]" />
                <div>
                  <div className="text-[10px] text-[#9f8a91]">TELEGRAM</div>
                  <div className="text-white font-semibold">@hmz64</div>
                </div>
              </div>
              <a
                href={PROFILE_INFO.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl liquid-glass-pill hover:border-[#e11d48]/40 text-[#fda4af] font-semibold transition-all"
              >
                Buka
              </a>
            </div>

            <div className="p-4 rounded-2xl liquid-glass-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#e11d48]" />
                <div>
                  <div className="text-[10px] text-[#9f8a91]">DISCORD</div>
                  <div className="text-white font-semibold">{PROFILE_INFO.socials.discord}</div>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PROFILE_INFO.socials.discord, 'discord')}
                className="p-2 rounded-xl liquid-glass-pill hover:border-[#e11d48]/40 text-[#fda4af] transition-all cursor-pointer"
                title="Copy Discord"
              >
                {copied === 'discord' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-4 rounded-2xl liquid-glass-card flex items-center justify-between">
              <div className="flex items-center gap-3">
                <GithubIcon className="w-4 h-4 text-[#e11d48]" />
                <div>
                  <div className="text-[10px] text-[#9f8a91]">GITHUB</div>
                  <div className="text-white font-semibold">github.com/hmz64</div>
                </div>
              </div>
              <a
                href={PROFILE_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl liquid-glass-pill hover:border-[#e11d48]/40 text-[#fda4af] font-semibold transition-all"
              >
                Buka
              </a>
            </div>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl liquid-glass-card space-y-4 font-mono text-xs will-change-transform"
          >
            {formSent && (
              <div className="p-3 rounded-xl bg-[#230812] border border-[#e11d48] text-[#fca5a5]">
                Pesan terkirim. Terima kasih.
              </div>
            )}

            <div>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Nama"
                className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white text-xs placeholder:text-[#9f8a91]"
              />
            </div>

            <div>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white text-xs placeholder:text-[#9f8a91]"
              />
            </div>

            <div>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Pesan..."
                className="w-full px-4 py-3 rounded-xl liquid-glass-input text-white text-xs placeholder:text-[#9f8a91] resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl liquid-glass-btn text-white font-bold transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pesan</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
