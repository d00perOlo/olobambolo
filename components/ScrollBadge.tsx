import React, { useEffect, useRef, useState } from 'react';

const ScrollBadge: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const items = ['CAPITAL', 'WARSZAWA', 'LONDYN', 'DUBAJ'];

  // Handle rotating ring animation
  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      const y = window.scrollY;
      const rotate = y * 0.12;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotate}deg)`;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Handle cross-fade cycle for city names
  useEffect(() => {
    const cycle = setInterval(() => {
      // Step 1: Start gradual fade out
      setOpacity(0);
      setIsTransitioning(true);
      
      // Step 2: Swap the text mid-fade (when opacity hits zero)
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        
        // Step 3: Start fading back in with new text
        setOpacity(1);
        setIsTransitioning(false);
      }, 800); // Sync with CSS transition duration
      
    }, 5000); // 5s total cycle for a calm, premium feel

    return () => clearInterval(cycle);
  }, [items.length]);

  return (
    <div 
      className="fixed z-[900] bottom-24 right-6 md:bottom-12 md:right-12 w-[80px] h-[80px] md:w-[130px] md:h-[130px] pointer-events-none mix-difference text-white/50 flex items-center justify-center scale-90 md:scale-100"
    >
      {/* Outer Rotating Ring */}
      <div ref={ringRef} className="absolute inset-0 w-full h-full will-change-transform">
        <svg viewBox="0 0 200 200" className="w-full h-full fill-current">
          <defs>
            <path id="badgeCirclePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
          </defs>
          <text fontFamily="IBM Plex Mono" fontSize="10" fontWeight="600" letterSpacing="4px">
            <textPath href="#badgeCirclePath">
              STRATEGIA • ZYSK • BEZPIECZEŃSTWO • ROZWÓJ •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Central Identity Block - Rock-Steady and Centered */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        {/* MTG Logo stays completely stationary */}
        <div className="font-mono font-bold text-[10px] md:text-[12px] text-white tracking-[0.2em] leading-none mb-1.5 z-10 transition-opacity duration-300">
          MTG
        </div>
        
        {/* Dynamic Label Container with Fixed Dimensions for Stability */}
        <div className="relative h-3 w-32 flex items-center justify-center overflow-hidden">
          <div 
            className={`
              font-mono text-accent/70 text-[8px] md:text-[10px] uppercase tracking-[0.2em] 
              transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)]
              will-change-[opacity,transform,filter]
            `}
            style={{ 
              opacity: opacity,
              transform: `translateY(${isTransitioning ? '3px' : '0px'})`,
              filter: `blur(${isTransitioning ? '4px' : '0px'})`
            }}
          >
            {items[index]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollBadge;