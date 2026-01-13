import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  // Detailed states for the startup sequence
  const [engineStarted, setEngineStarted] = useState(false);
  const [lightsOn, setLightsOn] = useState(false);
  const [wheelsSpinning, setWheelsSpinning] = useState(false);
  const [isDrivingOff, setIsDrivingOff] = useState(false);
  const [isReturning, setIsReturning] = useState(false);

  const handleIgnite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (engineStarted || isDrivingOff || isReturning) return;

    // STEP 1: Exhaust starts
    setEngineStarted(true);

    // STEP 2: Lights turn on
    setTimeout(() => {
      setLightsOn(true);
    }, 400);

    // STEP 3: Wheels start spinning
    setTimeout(() => {
      setWheelsSpinning(true);
    }, 800);

    // STEP 4: Drive off fast (Acceleration effect)
    setTimeout(() => {
      setIsDrivingOff(true);
    }, 1200);

    // STEP 5: Scroll down after car disappears
    setTimeout(() => {
      const bookingSection = document.getElementById('rezerwacja');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1900);

    // STEP 6: Reset and return slowly from left
    setTimeout(() => {
      // Snap car to left side instantly (invisible)
      setIsDrivingOff(false);
      setIsReturning(true);
      
      // Stop engine/lights/spinning for the "parked" look when it stops
      setEngineStarted(false);
      setLightsOn(false);
      setWheelsSpinning(false);

      // Give it a tiny moment to "snap" before starting the slow glide back
      setTimeout(() => {
        setIsReturning(false);
      }, 50);
    }, 3800);
  };

  return (
    <section className="min-h-0 flex items-end relative overflow-hidden bg-void pt-16 pb-0 border-b border-white/10">
      
      {/* 1. Motion Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute top-[-20%] right-[-15%] w-[80%] h-[150%] bg-[#101010] skew-x-[-25deg] border-l border-white/5 origin-top"></div>
        <div className="absolute top-[40%] left-[-10%] w-[120%] h-[2px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent skew-y-[5deg] blur-[2px] animate-pulse-fast"></div>
        <div className="absolute top-[65%] right-[-20%] w-[100%] h-[6px] bg-gradient-to-l from-transparent via-orange/10 to-transparent skew-y-[-3deg] blur-[4px] animate-pulse"></div>
      </div>

      <div className="max-w-[1600px] mx-auto w-full px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-end">
          
          {/* TEXT ENGINE */}
          <div className="lg:col-span-5 flex flex-col items-start relative pb-8 lg:pb-12">
            <div className="inline-flex items-center gap-2 mb-2 border border-techGreen/30 bg-techGreen/dim px-2 py-0.5 skew-x-[-12deg] backdrop-blur-md">
               <div className="w-1 h-1 bg-techGreen rounded-full animate-ping-slow"></div>
               <span className="skew-x-[12deg] text-techGreen text-[7px] font-mono font-bold tracking-widest uppercase">
                 SYSTEM STATUS: FULL AUTONOMY
               </span>
            </div>
            
            <h1 className="flex flex-col font-black italic uppercase tracking-tighter leading-[0.8] select-none relative z-20">
              <span className="text-[8vw] lg:text-[5rem] text-transparent bg-clip-text bg-gradient-to-r from-white/20 to-transparent skew-x-[-12deg] translate-x-2 lg:translate-x-4 mix-blend-overlay">
                CYFROWA
              </span>
              <span className="text-xl lg:text-3xl text-white ml-2 lg:ml-8 -my-1 skew-x-[-12deg] relative z-10">
                ERA
              </span>
              <span className="text-[10vw] lg:text-[6rem] text-orange drop-shadow-[0_0_40px_rgba(255,59,0,0.3)] skew-x-[-12deg] -translate-x-1 lg:-translate-x-2 relative z-30">
                PRESTIŻU
              </span>
            </h1>

            <div className="mt-3 max-w-sm skew-x-[-12deg] ml-2 lg:ml-4">
              <p className="text-xs lg:text-sm text-gray-400 font-medium italic border-l border-cyan pl-3 skew-x-[12deg] leading-relaxed">
                Klucz jest w kodzie. Bez biur, bez kolejek, pełna kontrola w Twoim smartfonie. Czysty flow premium.
              </p>
            </div>

            <div className="mt-4 ml-2 lg:ml-4 flex flex-col sm:flex-row gap-4 skew-x-[-12deg] relative z-40">
               <button 
                  onClick={handleIgnite}
                  disabled={engineStarted || isDrivingOff || isReturning}
                  className={`btn-ignite px-3 py-1.5 text-[9px] tracking-[0.15em] hover:scale-105 transition-all flex items-center gap-2 group shadow-[2px_2px_0px_rgba(0,0,0,0.5)] ${engineStarted ? 'opacity-50 grayscale' : ''}`}
               >
                  <span className="skew-x-[12deg] font-black italic">ODPAL SILNIK</span>
                  <div className="w-0 h-0 border-t-[3px] border-t-transparent border-l-[6px] border-l-black border-b-[3px] border-b-transparent skew-x-[12deg] group-hover:translate-x-1 transition-transform duration-300"></div>
               </button>
            </div>
          </div>

          {/* VISUAL ENGINE - Aligned to bottom */}
          <div className="lg:col-span-7 relative h-[180px] lg:h-[400px] flex items-end justify-center lg:justify-end pointer-events-none overflow-visible">
            
            <div className="absolute right-[-20%] bottom-0 w-[120vw] h-[250px] bg-gradient-to-t from-orange/5 to-transparent blur-3xl mix-blend-screen"></div>

            {/* Container for the car with dynamic transition timings */}
            <div className={`w-full lg:w-[110%] h-full flex items-end transition-all
              ${isDrivingOff 
                ? 'translate-x-[150%] opacity-0 scale-105 duration-[800ms] ease-in' 
                : isReturning 
                  ? '-translate-x-[150%] opacity-0 duration-0' 
                  : 'translate-x-0 opacity-100 scale-100 duration-[2000ms] ease-out'}
            `}>
              <svg viewBox="0 0 800 350" className="w-full h-full drop-shadow-[10px_10px_30px_rgba(0,0,0,0.5)] z-10 overflow-visible">
                <defs>
                  <linearGradient id="heroCarBody" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ff2a00" />
                    <stop offset="100%" stopColor="#cc2200" />
                  </linearGradient>
                  <linearGradient id="heroGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="exhaustFlame" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#FF3B00" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#FF9000" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="transparent" />
                    <stop offset="50%" stopColor="#222" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                  <filter id="motionBlurX">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10,0" />
                  </filter>
                </defs>
                
                <style>{`
                  @keyframes rush {
                    0% { stroke-dashoffset: 400; opacity: 0; }
                    20% { opacity: 0.8; }
                    100% { stroke-dashoffset: -400; opacity: 0; }
                  }
                  @keyframes flicker {
                     0%, 100% { opacity: 0.8; transform: scaleX(1); }
                     50% { opacity: 0.4; transform: scaleX(0.9); }
                  }
                  .animate-rush { animation: rush 0.6s linear infinite; }
                  .animate-exhaust {
                    animation: flicker 0.1s steps(4) infinite;
                    transform-origin: right center;
                    transform-box: fill-box;
                  }
                `}</style>

                {/* Road Line - Perfectly aligned under the wheels (cy=255 + y_offset=45 = 300) */}
                <path d="M-500,300 L1300,300" stroke="url(#roadGrad)" strokeWidth="2" strokeDasharray="20 10" opacity="0.6" />

                {/* Speed Trails - only visible when moving off */}
                {isDrivingOff && (
                  <g opacity="0.6">
                    <path d="M-400,280 L50,280" stroke="#FF3B00" strokeWidth="3" filter="url(#motionBlurX)" className="animate-rush" strokeDasharray="50 350" />
                    <path d="M-300,310 L100,310" stroke="#00F0FF" strokeWidth="2" filter="url(#motionBlurX)" className="animate-rush" style={{animationDelay: '0.1s'}} strokeDasharray="100 200" />
                  </g>
                )}

                <g transform="translate(50, 45)">
                   {/* Afterburner */}
                   {engineStarted && (
                     <g>
                       <path d="M50,240 L-15,245 L50,250 Z" fill="url(#exhaustFlame)" className="animate-exhaust" />
                       <path d="M50,240 L-30,235 L50,255 Z" fill="url(#exhaustFlame)" opacity="0.2" className="animate-exhaust" style={{animationDelay: '0.05s'}} />
                     </g>
                   )}
                   
                   {/* Headlights */}
                   {lightsOn && (
                     <g>
                       <path d="M680,230 L950,180 L950,320 Z" fill="url(#headlightBeam)" opacity="0.4" />
                       <circle cx="670" cy="245" r="4" fill="#fff" className="animate-pulse" style={{filter: 'blur(1.5px)'}} />
                     </g>
                   )}

                   {/* Wheels - cy=255 + translate(y=45) = 300. Matches road line exactly. */}
                   <g>
                     <circle cx="150" cy="255" r="44" fill="#111" stroke="#222" strokeWidth="1.5" />
                     <circle 
                        cx="150" cy="255" r="38" 
                        fill="none" stroke="#FF3B00" strokeWidth="2" 
                        strokeDasharray="40 20" opacity="0.5" 
                        className={wheelsSpinning ? "animate-spin" : ""} 
                        style={{ animationDuration: '0.2s', transformBox: 'fill-box', transformOrigin: 'center' }} 
                      />

                     <circle cx="550" cy="255" r="44" fill="#111" stroke="#222" strokeWidth="1.5" />
                     <circle 
                        cx="550" cy="255" r="38" 
                        fill="none" stroke="#FF3B00" strokeWidth="2" 
                        strokeDasharray="40 20" opacity="0.5" 
                        className={wheelsSpinning ? "animate-spin" : ""} 
                        style={{ animationDuration: '0.2s', transformBox: 'fill-box', transformOrigin: 'center' }} 
                      />
                   </g>

                   {/* Chassis */}
                   <path d="M50,250 Q40,205 130,185 L280,155 L500,160 L650,205 L680,245 L650,265 L140,265 Z" fill="url(#heroCarBody)" />
                   
                   {/* Cockpit */}
                   <path d="M290,160 L480,163 L520,205 L250,205 Z" fill="url(#heroGlass)" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;