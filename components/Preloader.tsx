import React, { useEffect, useState } from 'react';

const Preloader: React.FC = () => {
  const [phase, setPhase] = useState<'visible' | 'opening' | 'hidden'>('visible');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('opening'), 1400);
    const t2 = setTimeout(() => setPhase('hidden'), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center transition-all duration-1000 ease-in-out ${phase === 'opening' ? 'pointer-events-none' : ''}`}>
      {/* Background Panes */}
      <div className={`absolute top-0 left-0 w-full h-1/2 bg-[#0c0e11] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${phase === 'opening' ? '-translate-y-full' : 'translate-y-0'}`} />
      <div className={`absolute bottom-0 left-0 w-full h-1/2 bg-[#0c0e11] transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${phase === 'opening' ? 'translate-y-full' : 'translate-y-0'}`} />

      {/* Brand Reveal */}
      <div className={`relative z-10 text-center transition-all duration-700 ${phase === 'opening' ? 'opacity-0 scale-95 blur-md' : 'opacity-100 scale-100'}`}>
        <div className="font-display font-bold text-4xl md:text-5xl text-white tracking-[-0.04em] uppercase">
          MTG <span className="text-accent">GROUP</span>
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
           <div className="h-px w-8 bg-white/20" />
           <div className="font-mono text-[9px] tracking-[0.6em] text-white/50 uppercase">
             Wizja • Kapitał • Strategia
           </div>
           <div className="h-px w-8 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;