import React, { useEffect, useState, useRef } from 'react';
import MagneticButton from './MagneticButton';

const Hero: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [corpTriggered, setCorpTriggered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const height = containerRef.current.offsetHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (height - window.innerHeight)));
      setScrollProgress(progress);

      if (progress > 0.4 && !corpTriggered) {
        setCorpTriggered(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [corpTriggered]);

  const jumpTo = (type: 'ind' | 'corp') => {
    if (!containerRef.current) return;
    const vh = window.innerHeight;
    const totalScrollHeight = containerRef.current.offsetHeight - vh;
    
    window.scrollTo({
      top: type === 'ind' ? 0 : totalScrollHeight,
      behavior: 'smooth'
    });
  };

  const baseSkew = 8;
  const skewAmplitude = 24; 
  const dynamicSkew = baseSkew + (Math.sin(scrollProgress * Math.PI) * skewAmplitude);
  const revealX = 100 - (scrollProgress * 100);

  const FOCUS_BLUR_INTENSITY = 4;
  const focusFactor = Math.max(0, 1 - Math.abs(scrollProgress - 0.5) / 0.2);
  const focusBlur = focusFactor * FOCUS_BLUR_INTENSITY;

  const MAX_BLUR = 16;
  const indBlur = (Math.pow(scrollProgress, 2) * MAX_BLUR) + focusBlur; 
  const corpBlur = (Math.pow(1 - scrollProgress, 2) * MAX_BLUR) + focusBlur;
  
  const hFactor = 1.5;
  const vFactor = 60;
  const scaleBase = 1.05;
  const scaleExpansion = 0.25;

  const isCorporateActive = scrollProgress > 0.5;

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[300vh] bg-bg-dark"
    >
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        
        {/* --- LAYER 2: CORPORATE (Dark Side / Spółki) --- */}
        <div className="absolute inset-0 bg-[#0c0e11] z-10">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-30 grayscale"
              style={{ 
                transform: `scale(${scaleBase + (1 - scrollProgress) * scaleExpansion}) translate3d(${(1 - scrollProgress) * hFactor}%, ${(scrollProgress - 0.5) * vFactor}px, 0)`, 
                filter: `brightness(${0.35 + (1 - scrollProgress) * 0.1}) contrast(1.1) blur(${corpBlur}px)`,
                willChange: 'transform, filter'
              }}
              alt="Business Center"
            />
          </div>
          
          <div className="relative w-full h-full flex items-center justify-end px-[8vw] md:px-[12vw]">
            <div 
              className="max-w-[800px] text-right"
              style={{ 
                opacity: Math.max(0, (scrollProgress - 0.2) * 2),
                transform: `translate3d(0, ${(1 - scrollProgress) * 40}px, 0)`
              }}
            >
              <div className={`transition-all duration-1000 ${corpTriggered ? 'animate-reveal-bounce' : 'opacity-0 translate-y-8'}`}>
                <div className="font-mono text-accent text-[10px] md:text-xs tracking-[0.6em] uppercase mb-4 md:mb-6 opacity-60">Sektor Biznesowy</div>
                <h2 className="font-display text-[clamp(32px,8vw,46px)] md:text-[clamp(40px,6vw,90px)] leading-[0.9] md:leading-[0.85] text-white uppercase mb-8 md:mb-12">
                  Skaluj <br/>Swoją <span className="text-accent/80">Spółkę</span>
                </h2>

                {/* TABS (Corporate Context) */}
                <div className="flex justify-end mb-10 md:mb-16">
                  <div className="relative inline-flex p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 shadow-2xl">
                    <div 
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-accent rounded-full transition-all duration-700 ease-custom shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                      style={{ left: isCorporateActive ? 'calc(50% + 2px)' : '4px' }}
                    />
                    <button onClick={() => jumpTo('ind')} className="relative z-10 px-6 py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">Indywidualni</button>
                    <button className="relative z-10 px-6 py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white font-bold">Spółki</button>
                  </div>
                </div>

                {/* FIXED DETALS - IMPROVED AESTHETICS */}
                <div className="text-white/40 font-mono text-[9px] md:text-[13px] tracking-[0.2em] md:tracking-[0.4em] uppercase">
                  <span className="inline-block py-2 border-b border-white/5">
                    SPÓŁKI Z O.O. <span className="mx-2 md:mx-4 opacity-30 text-accent">•</span> S.A. <span className="mx-2 md:mx-4 opacity-30 text-accent">•</span> HOLDINGI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- LAYER 1: INDIVIDUAL (Light Side / Indywidualni) --- */}
        <div 
          className="absolute inset-0 z-20 bg-bg-light transition-all duration-75 ease-out"
          style={{ 
            clipPath: `polygon(0 0, ${revealX + dynamicSkew}% 0, ${revealX - dynamicSkew}% 100%, 0 100%)`,
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-20"
              style={{ 
                transform: `scale(${scaleBase + scrollProgress * scaleExpansion}) translate3d(${scrollProgress * hFactor}%, ${(scrollProgress - 0.5) * -vFactor}px, 0)`,
                filter: `brightness(${0.85 - scrollProgress * 0.2}) contrast(1.05) blur(${indBlur}px)`,
                willChange: 'transform, filter'
              }}
              alt="Modern Living"
            />
          </div>
          
          <div className="relative w-full h-full flex items-center px-[8vw] md:px-[12vw]">
            <div 
              className="max-w-[800px]"
              style={{ 
                opacity: 1 - scrollProgress * 1.5,
                transform: `translate3d(${-scrollProgress * 60}px, 0, 0)`
              }}
            >
              <div className="opacity-0 animate-reveal-bounce" style={{ animationDelay: '2.1s' }}>
                <div className="font-mono text-text-dark/40 text-[10px] md:text-xs tracking-[0.6em] uppercase mb-4 md:mb-6">Sektor Prywatny</div>
                <h1 className="font-display text-[clamp(32px,8vw,46px)] md:text-[clamp(40px,6vw,90px)] leading-[0.9] md:leading-[0.85] text-text-dark uppercase mb-8 md:mb-12">
                  Zabezpiecz <br/>Swój <span className="text-text-dark/30">Kapitał</span>
                </h1>

                {/* TABS (Individual Context) */}
                <div className="flex justify-start mb-10 md:mb-16">
                  <div className="relative inline-flex p-1 bg-black/5 backdrop-blur-md rounded-full border border-black/10 shadow-lg">
                    <div 
                      className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-text-dark rounded-full transition-all duration-700 ease-custom"
                      style={{ left: isCorporateActive ? 'calc(50% + 2px)' : '4px' }}
                    />
                    <button className="relative z-10 px-6 py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-white font-bold">Indywidualni</button>
                    <button onClick={() => jumpTo('corp')} className="relative z-10 px-6 py-2.5 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.2em] text-text-dark/40 hover:text-text-dark transition-colors">Spółki</button>
                  </div>
                </div>

                {/* FIXED DETALS - IMPROVED AESTHETICS */}
                <div className="text-text-dark/50 font-mono text-[9px] md:text-[13px] tracking-[0.2em] md:tracking-[0.4em] uppercase">
                  <span className="inline-block py-2 border-b border-black/5">
                    JDG <span className="mx-2 md:mx-4 opacity-20">|</span> B2B <span className="mx-2 md:mx-4 opacity-20">|</span> ETAT <span className="mx-2 md:mx-4 opacity-20">|</span> KONTRAKT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- LOGO --- */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 mix-difference pointer-events-none w-full text-center">
          <div className="flex flex-col items-center">
            <div className="font-display font-bold text-white tracking-[-0.04em] uppercase text-[32px] md:text-[56px] leading-none mb-2">
              MTG <span className="text-accent/90">GROUP</span>
            </div>
            <div className="font-mono text-[9px] md:text-[13px] tracking-[0.7em] text-white/50 uppercase">
              Financial Capital Strategy
            </div>
          </div>
        </div>

        {/* --- CENTRAL DIVIDER --- */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-accent/40 z-30 pointer-events-none shadow-[0_0_25px_rgba(212,175,55,0.2)]"
          style={{ 
            left: `${revealX}%`, 
            transform: `translateX(-50%) skewX(${-dynamicSkew}deg)`,
            opacity: scrollProgress > 0.02 && scrollProgress < 0.98 ? 1 : 0
          }}
        />

        {/* --- INTERFACE --- */}
        <div className="absolute bottom-10 left-[8vw] right-[8vw] z-40 flex justify-between items-center mix-difference text-white/40 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.3em]">
           <button 
             onClick={() => jumpTo('ind')}
             className={`flex items-center gap-4 transition-all duration-500 hover:text-white ${!isCorporateActive ? 'text-white translate-x-0' : 'opacity-30 -translate-x-4'}`}
           >
              <span className="w-8 h-px bg-current" />
              01 / INDYWIDUALNI
           </button>
           
           <div className="hidden md:block">
              <div className="w-40 h-[1px] bg-white/10 relative overflow-hidden">
                 <div className="absolute inset-0 bg-accent transition-transform duration-100" style={{ transform: `translateX(${(scrollProgress - 0.5) * 200}%)` }} />
              </div>
           </div>

           <button 
             onClick={() => jumpTo('corp')}
             className={`flex items-center gap-4 transition-all duration-500 hover:text-white ${isCorporateActive ? 'text-white translate-x-0' : 'opacity-30 translate-x-4'}`}
           >
              02 / SPÓŁKI
              <span className="w-8 h-px bg-current" />
           </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;