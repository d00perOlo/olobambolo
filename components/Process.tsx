import React from 'react';
import { useOnScreen } from '../hooks/useOnScreen';

const Step: React.FC<{ num: string; title: string; desc: string; index: number }> = ({ num, title, desc, index }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={`
        relative border-l border-white/5 pl-8 py-2 md:py-6
        transition-all duration-[1200ms] ease-custom
      `}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {/* Animated Accent Border */}
      <div 
        className="absolute left-0 top-0 w-[2px] bg-accent shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-[1500ms] ease-custom origin-top"
        style={{ 
            height: isVisible ? '100%' : '0%',
            transitionDelay: `${index * 200 + 400}ms`
        }}
      />

      <div 
        className="font-mono text-[10px] tracking-[0.4em] text-accent/60 mb-4 transition-all duration-700"
        style={{ transitionDelay: `${index * 150 + 200}ms`, opacity: isVisible ? 1 : 0 }}
      >
        KROK {num}
      </div>
      
      <h3 
        className="font-display text-xl md:text-2xl mb-4 uppercase tracking-tight transition-all duration-700"
        style={{ transitionDelay: `${index * 150 + 300}ms`, opacity: isVisible ? 1 : 0 }}
      >
        {title}
      </h3>
      
      <p 
        className="text-sm md:text-base text-white/50 leading-relaxed font-sans transition-all duration-700"
        style={{ transitionDelay: `${index * 150 + 400}ms`, opacity: isVisible ? 1 : 0 }}
      >
        {desc}
      </p>
    </div>
  );
};

const Process: React.FC = () => {
  const [headerRef, headerVisible] = useOnScreen({ threshold: 0.1 });

  const STEPS = [
    { num: "01", title: "Konsultacja", desc: "Zrozumienie Twoich potrzeb i wstępna weryfikacja potencjału optymalizacji kapitałowej." },
    { num: "02", title: "Audyt Zero", desc: "Bezpośrednia analiza twardych danych finansowych, struktur kosztów i przepływów pieniężnych." },
    { num: "03", title: "Strategia", desc: "Przygotowanie dedykowanego planu wzrostu rentowności i zabezpieczenia majątku." },
    { num: "04", title: "Partnerstwo", desc: "Bieżące wsparcie w implementacji rozwiązań i stały monitoring kluczowych wskaźników KPI." }
  ];

  return (
    <section className="relative py-[120px] md:py-[180px] bg-bg-dark text-text-light overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/[0.02] to-transparent pointer-events-none" />
      
      <div className="w-[min(1200px,90%)] mx-auto relative z-10">
        <div 
            ref={headerRef}
            className={`transition-all duration-1000 ease-custom mb-[80px] md:mb-[120px] ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="font-mono text-[10px] md:text-xs tracking-[0.5em] uppercase text-accent/40 mb-6">Współpraca</div>
          <h2 className="font-display text-[clamp(32px,7vw,56px)] uppercase leading-none tracking-tight">
            Proces <span className="text-accent">Współpracy</span>
          </h2>
          <div className="mt-8 h-px w-24 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {STEPS.map((step, idx) => (
            <Step 
                key={idx} 
                index={idx}
                num={step.num} 
                title={step.title} 
                desc={step.desc} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;