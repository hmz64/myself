import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { PropagateLoader } from 'react-spinners';

interface PageLoaderProps {
  onFinish?: () => void;
  color?: string;
}

const ASSET_URLS = [
  '/asuka.jpg',
  '/anix-unsplash.jpg',
  '/calmquran-unsplash.jpg',
  '/creative-unsplash.jpg'
];

// 5 vertical curtain panels (tirai vertikal)
const TOTAL_PANELS = 5;

export default function PageLoader({ onFinish, color = '#e11d48' }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const spinnerCardRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let currentProgress = 0;
    let loadedAssets = 0;
    const totalAssets = ASSET_URLS.length + 1; // +1 for window load

    // Track real assets download
    const onAssetLoaded = () => {
      loadedAssets++;
    };

    ASSET_URLS.forEach((url) => {
      const img = new Image();
      img.src = url;
      img.onload = onAssetLoaded;
      img.onerror = onAssetLoaded;
    });

    if (document.readyState === 'complete') {
      onAssetLoaded();
    } else {
      window.addEventListener('load', onAssetLoaded, { once: true });
    }

    // Smooth counter progression
    const interval = setInterval(() => {
      const targetPercent = Math.min(
        100,
        Math.floor((loadedAssets / totalAssets) * 85) + 15
      );

      if (currentProgress < targetPercent) {
        currentProgress += Math.max(1, Math.floor((targetPercent - currentProgress) * 0.25));
      } else if (loadedAssets >= totalAssets && currentProgress < 100) {
        currentProgress += 3;
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setProgress(100);
        setIsReady(true);
      } else {
        setProgress(currentProgress);
      }
    }, 35);

    return () => {
      clearInterval(interval);
      window.removeEventListener('load', onAssetLoaded);
    };
  }, []);

  // Trigger vertical curtain opening animation when ready
  useEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsRemoved(true);
          onFinish?.();
        }
      });

      // 1. Fade out the loader card smoothly
      if (spinnerCardRef.current) {
        tl.to(spinnerCardRef.current, {
          opacity: 0,
          y: -24,
          scale: 0.95,
          duration: 0.35,
          ease: 'power2.inOut'
        });
      }

      // 2. Animate vertical curtain panels sliding UP one by one (tirai membuka geser ke atas)
      const validPanels = panelsRef.current.filter(Boolean);
      if (validPanels.length > 0) {
        tl.to(
          validPanels,
          {
            yPercent: -101,
            duration: 0.85,
            ease: 'power4.inOut',
            stagger: 0.08
          },
          '-=0.1'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, onFinish]);

  if (isRemoved) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none"
      aria-label="Loading screen"
    >
      {/* Tirai Vertikal Warna Merah (Red Vertical Curtain Panels) */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        {Array.from({ length: TOTAL_PANELS }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              panelsRef.current[index] = el;
            }}
            className="relative h-full flex-1 bg-gradient-to-b from-[#881337] via-[#be123c] to-[#9f1239] border-r border-[#f43f5e]/25 last:border-r-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.4)] will-change-transform"
          >
            {/* Garis aksen terang di bagian bawah tirai merah saat terangkat */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#f43f5e] via-[#ffffff] to-[#f43f5e] shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
          </div>
        ))}
      </div>

      {/* Loading (PropagateLoader) & Status */}
      <div
        ref={spinnerCardRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none p-4"
      >
        <div className="p-8 sm:p-10 rounded-3xl liquid-glass-card max-w-sm w-full flex flex-col items-center text-center shadow-[0_10px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(225,29,72,0.25)] border border-[#e11d48]/20">
          {/* PropagateLoader from react-spinners */}
          <div className="py-7 my-2 flex items-center justify-center">
            <PropagateLoader color={color} size={14} />
          </div>

          <div className="mb-4">
            <span className="font-mono text-2xl font-black text-white tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Title & Status */}
          <div className="font-mono space-y-2 w-full">
            <h3 className="text-white text-base font-bold tracking-tight">
              hmz64
            </h3>
            <p className="text-[11px] text-[#fca5a5] uppercase tracking-widest flex items-center justify-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e11d48] animate-ping" />
              <span>{progress < 100 ? 'Memuat Aset Web...' : 'Membuka Portofolio...'}</span>
            </p>

            {/* Horizontal progress meter */}
            <div className="w-full h-1.5 bg-[#1b050c] rounded-full overflow-hidden mt-4 border border-[#3b0b18]">
              <div
                className="h-full bg-gradient-to-r from-[#9f1239] via-[#e11d48] to-[#fda4af] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(225,29,72,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
