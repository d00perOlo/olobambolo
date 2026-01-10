import React, { useState, useEffect, useRef } from 'react';

interface ServiceStep {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const TIMELINE_STEPS: ServiceStep[] = [
  {
    title: "Audyt Strategiczny",
    desc: "Głęboka analiza struktury kosztów i przepływów pieniężnych wewnątrz organizacji. Identyfikujemy ukryte rezerwy finansowe.",
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  },
  {
    title: "Płynność Finansowa",
    desc: "Optymalizacja cyklu konwersji gotówki i zabezpieczenie kapitału obrotowego. Gwarantujemy stabilność operacyjną.",
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
  },
  {
    title: "Inżynieria Marży",
    desc: "Strategiczne podejście do wyceny produktów i redukcji kosztów zmiennych. Podnosimy rentowność każdej transakcji.",
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  },
  {
    title: "Wyniki i KPI",
    desc: "Wdrożenie twardych wskaźników efektywności i dashboardów zarządczych. Zarządzanie oparte na faktach, nie intuicji.",
    icon: <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
  }
];

const TimelineStep: React.FC<{ step: ServiceStep; index: number; activeIndex: number; progress: number }> = ({ step, index, activeIndex, progress }) => {
  const isActive = activeIndex === index;
  const isPast = activeIndex > index;
  
  return (
    <div className={`relative flex items-center justify-center min-h-[20vh] md:min-h-[25vh] w-full transition-all duration-700 ease-custom`}>
      <div className="flex w-full max-w-[1200px] items-center">
        
        {/* Left Side (Desktop: Text for even steps) */}
        <div className={`hidden md:flex flex-1 justify-end pr-16 lg:pr-24 transition-all duration-700 ${index % 2 !== 0 ? 'opacity-0 pointer-events-none' : (isActive ? 'opacity-100 translate-x-0' : 'opacity-20 translate-x-4')}`}>
          <div className="text-right max-w-[400px]">
            <h3 className={`font-display text-2xl lg:text-3xl uppercase tracking-tight mb-4 transition-all duration-500 ${isActive ? 'text-text-dark font-bold scale-105 origin-right' : 'text-text-dark/40'}`}>
              {step.title}
            </h3>
            <p className={`font-sans text-sm lg:text-base leading-relaxed text-text-dark/60 overflow-hidden transition-all duration-700 ${isActive ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {step.desc}
            </p>
          </div>
        </div>

        {/* Central Marker */}
        <div className="relative z-10 flex flex-col items-center">
          <div 
            className={`
              w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center 
              transition-all duration-500 ease-custom border-2
              ${isActive ? 'bg-accent text-white border-accent scale-125 shadow-[0_0_30px_rgba(212,175,55,0.4)]' : 'bg-bg-light text-text-dark/20 border-black/10 scale-100'}
              ${isPast ? 'border-accent text-accent shadow-[0_0_15px_rgba(212,175,55,0.2)]' : ''}
            `}
          >
            <div 
              className={`transition-transform duration-500 ${isActive ? 'scale-110' : 'scale-90'} animate-icon-float`}
              style={{ animationDelay: `${index * 0.4}s` }}
            >
              {step.icon}
            </div>
          </div>
          
          <div className={`md:hidden absolute top-0 left-20 w-[60vw] transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
             <h3 className="font-display text-lg uppercase mb-2 text-text-dark font-bold">{step.title}</h3>
             <p className="font-sans text-xs text-text-dark/60 leading-relaxed">{step.desc}</p>
          </div>
        </div>

        {/* Right Side (Desktop: Text for odd steps) */}
        <div className={`hidden md:flex flex-1 justify-start pl-16 lg:pl-24 transition-all duration-700 ${index % 2 === 0 ? 'opacity-0 pointer-events-none' : (isActive ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4')}`}>
          <div className="text-left max-w-[400px]">
            <h3 className={`font-display text-2xl lg:text-3xl uppercase tracking-tight mb-4 transition-all duration-500 ${isActive ? 'text-text-dark font-bold scale-105 origin-left' : 'text-text-dark/40'}`}>
              {step.title}
            </h3>
            <p className={`font-sans text-sm lg:text-base leading-relaxed text-text-dark/60 overflow-hidden transition-all duration-700 ${isActive ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {step.desc}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = rect.top;
      const height = rect.height;
      
      // Calculate progress across the entire section height
      const scrollProgress = Math.max(0, Math.min(1, -start / (height - windowHeight * 0.5)));
      setProgress(scrollProgress);
      
      const segment = 1 / TIMELINE_STEPS.length;
      const index = Math.floor(scrollProgress / segment);
      setActiveIndex(Math.min(index, TIMELINE_STEPS.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative bg-bg-light z-20 overflow-hidden">
      
      {/* Background Parallax Layer */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03] grayscale select-none"
        style={{ transform: `translate3d(0, ${progress * 150}px, 0)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
          className="w-full h-[120%] object-cover"
          alt=""
        />
      </div>

      {/* Decorative Text Parallax */}
      <div 
        className="absolute -right-20 top-40 font-display text-[20vw] font-bold text-black/[0.02] pointer-events-none select-none leading-none whitespace-nowrap"
        style={{ transform: `translate3d(${-progress * 100}px, ${progress * 50}px, 0)` }}
      >
        MTG CAPITAL
      </div>

      <div className="w-full pt-[100px] md:pt-[150px] relative z-10">
        {/* Header Content */}
        <div className="w-[min(1200px,90%)] mx-auto text-center mb-[80px] md:mb-[120px]">
          <div className="font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase text-accent mb-6">Metodologia MTG</div>
          <h2 className="font-display text-[clamp(32px,7vw,64px)] mb-8 uppercase leading-[1.0] tracking-tight">Kluczowe Kompetencje</h2>
          <div className="h-1 w-24 bg-accent/20 mx-auto mb-8 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-full bg-accent" />
          </div>
          <p className="text-text-dark/60 max-w-[700px] mx-auto text-sm md:text-lg leading-relaxed font-sans">
            Budujemy trwałą wartość przedsiębiorstw poprzez precyzyjną inżynierię finansową oraz 4-stopniowy proces optymalizacji kapitałowej.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full pb-[150px]">
          
          {/* Vertical Central Line (Desktop) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[150px] w-0.5 bg-black/[0.06] hidden md:block">
            {/* Animated Progress Line */}
            <div 
              className="absolute top-0 left-0 w-full bg-accent shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-200 ease-out origin-top"
              style={{ height: `${progress * 100}%` }}
            >
               {/* Glowing Head Indicator */}
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full border-2 border-accent shadow-[0_0_15px_#d4af37]" />
            </div>
          </div>

          {/* Mobile Line */}
          <div className="absolute left-[calc(8vw+24px)] md:hidden top-0 bottom-[150px] w-0.5 bg-black/[0.06]">
             <div 
              className="absolute top-0 left-0 w-full bg-accent shadow-[0_0_15px_rgba(212,175,55,0.5)] transition-all duration-200 ease-out origin-top"
              style={{ height: `${progress * 100}%` }}
            >
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full border border-accent shadow-[0_0_10px_#d4af37]" />
            </div>
          </div>

          {/* Steps */}
          <div className="relative flex flex-col gap-8 md:gap-12">
            {TIMELINE_STEPS.map((step, idx) => (
              <TimelineStep 
                key={idx} 
                step={step} 
                index={idx} 
                activeIndex={activeIndex} 
                progress={progress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;