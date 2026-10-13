import { PROFILE_INFO } from '../data/portfolioData';

export default function Footer() {
  return (
    <footer className="border-t border-[#230911] bg-[#060103] py-8 text-center text-xs font-mono text-[#9f8a91]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>© {PROFILE_INFO.name}</span>
        <span>Anix &amp; CalmQuran</span>
      </div>
    </footer>
  );
}
