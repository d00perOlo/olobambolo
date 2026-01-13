import React, { useState, useRef, useEffect } from 'react';

interface ChargingInfrastructureProps {
  onConnectChange?: (connected: boolean) => void;
}

const ChargingInfrastructure: React.FC<ChargingInfrastructureProps> = ({ onConnectChange }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Game State
  const [isDragging, setIsDragging] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [chargingActive, setChargingActive] = useState(false);
  const [plugPos, setPlugPos] = useState({ x: 50, y: 120 });
  const [showSpark, setShowSpark] = useState(false);
  
  const TARGET_POS = { x: 330, y: 125 };
  const SNAP_DISTANCE = 60;
  const START_POS = { x: 50, y: 120 };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isConnected) {
      setIsConnected(false);
      setChargingActive(false);
      setPlugPos(START_POS);
      if (onConnectChange) onConnectChange(false);
      return;
    }
    setIsDragging(true);
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging || !svgRef.current) return;
    const CTM = svgRef.current.getScreenCTM();
    if (!CTM) return;
    const x = (clientX - CTM.e) / CTM.a;
    const y = (clientY - CTM.f) / CTM.d;
    setPlugPos({ x: x - 80, y: y - 25 });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const dist = Math.sqrt(Math.pow(plugPos.x - TARGET_POS.x, 2) + Math.pow(plugPos.y - TARGET_POS.y, 2));
    if (dist < SNAP_DISTANCE) {
      setPlugPos(TARGET_POS);
      setIsConnected(true);
      setShowSpark(true);
      if (onConnectChange) onConnectChange(true);
      setTimeout(() => setShowSpark(false), 600);
      setTimeout(() => setChargingActive(true), 500);
    } else {
      setPlugPos(START_POS);
    }
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);
    const onUp = () => handleEnd();
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isDragging, plugPos]);

  const cableStartX = -50;
  const cableStartY = 150;
  const cableControlX = (cableStartX + plugPos.x) / 2;
  const cableControlY = Math.max(plugPos.y, cableStartY) + 100;
  const cablePath = `M${cableStartX},${cableStartY} Q${cableControlX},${cableControlY} ${plugPos.x},${plugPos.y + 25}`;

  return (
    <section className="py-16 md:py-20 bg-graphite-900 border-t border-graphite-600 relative overflow-hidden select-none">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-5 pointer-events-none" style={{backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col items-start pointer-events-none">
             <div className="inline-flex items-center gap-2 mb-4 border border-cyan/30 px-3 py-1 skew-x-[-12deg] bg-cyan/5">
                <span className={`w-2 h-2 rounded-full ${isConnected ? (chargingActive ? 'bg-techGreen animate-pulse shadow-[0_0_10px_#00FF94]' : 'bg-yellow-400 animate-bounce') : 'bg-orange'}`}></span>
                <span className="text-cyan text-[10px] font-black uppercase tracking-[0.2em] skew-x-[12deg]">
                  {isConnected ? (chargingActive ? 'PEŁNA MOC: 350KW' : 'NEGOCJACJA PROTOKOŁU...') : 'OCZEKIWANIE NA PODŁĄCZENIE'}
                </span>
             </div>
             <h2 className="text-4xl md:text-5xl font-black italic uppercase text-white tracking-tighter mb-6 leading-[0.9]">
               WŁASNA SIEĆ.<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">CZYSTA ENERGIA.</span>
             </h2>
             <div className="space-y-6 max-w-lg pointer-events-auto">
                <p className="text-gray-400 text-lg font-medium italic border-l-2 border-orange pl-6">
                  Nie szukaj ładowarek na mapie. Chwyć wtyczkę i poczuj przepływ energii bezpośrednio ze słońca.
                </p>
                {!isConnected && <div className="text-orange text-sm font-black italic animate-pulse">>>> PRZECIĄGNIJ WTYCZKĘ DO PORTU STACJI &lt;&lt;&lt;</div>}
             </div>
          </div>
          <div className="relative h-[280px] md:h-[380px] bg-graphite-800 border border-white/5 skew-x-[-12deg] overflow-hidden flex items-center justify-center shadow-2xl touch-none">
             <div className="skew-x-[12deg] w-full h-full relative">
                {/* Visual UI Elements */}
                <div className="absolute top-4 right-6 text-right z-20 pointer-events-none">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">SYSTEM STATUS</div>
                  <div className="flex items-center justify-end gap-2">
                    <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${chargingActive ? 'bg-techGreen shadow-[0_0_10px_#00FF94]' : (isConnected ? 'bg-yellow-400' : 'bg-gray-600')}`}></div>
                    <div className={`${chargingActive ? 'text-techGreen' : (isConnected ? 'text-yellow-400' : 'text-gray-500')} font-mono font-bold text-xs transition-colors duration-300`}>
                      {chargingActive ? 'HYPER CHARGE' : (isConnected ? 'SYNCING...' : 'DISCONNECTED')}
                    </div>
                  </div>
                </div>

                <svg ref={svgRef} viewBox="0 0 600 300" className="w-full h-full overflow-visible">
                  <defs>
                    <filter id="glowGreen" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="glowIntense" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="blur"/><feFlood floodColor="#00FF94" result="color"/><feComposite in="color" in2="blur" operator="in" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <linearGradient id="stationGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1a1a1a" />
                      <stop offset="50%" stopColor="#0a0a0a" />
                      <stop offset="100%" stopColor="#050505" />
                    </linearGradient>
                    <linearGradient id="plugBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#333"/><stop offset="100%" stopColor="#111"/>
                    </linearGradient>
                  </defs>
                  
                  <style>{`
                    @keyframes energyFlow { to { stroke-dashoffset: -200; } }
                    @keyframes rapidFlow { to { stroke-dashoffset: -400; } }
                    @keyframes ledPulse { 0%, 100% { fill: #00FF94; opacity: 0.6; filter: url(#glowGreen); transform: scale(1); } 50% { fill: #ccffeb; opacity: 1; filter: url(#glowIntense); transform: scale(1.2); } }
                    @keyframes ledBlink { 0%, 100% { fill: #FFD700; opacity: 0.3; } 50% { fill: #FFD700; opacity: 1; filter: url(#glowGreen); } }
                    @keyframes sparkExplosion { 0% { opacity: 1; stroke-width: 2; transform: scale(1); } 100% { opacity: 0; stroke-width: 0; transform: scale(2.5); } }
                    @keyframes ringPulse { 0% { stroke-width: 2; opacity: 0.3; } 50% { stroke-width: 6; opacity: 0.8; } 100% { stroke-width: 2; opacity: 0.3; } }
                  `}</style>

                  {/* Pictorial Charging Station */}
                  <g transform="translate(420, 50)">
                     {/* Station Body */}
                     <path d="M0,0 L100,-10 L100,220 L0,230 Z" fill="url(#stationGrad)" stroke="#333" strokeWidth="1" />
                     <path d="M100,-10 L120,10 L120,200 L100,220 Z" fill="#080808" stroke="#333" strokeWidth="1" />
                     
                     {/* Tech Details on Station */}
                     <rect x="20" y="20" width="60" height="2" fill="#222" />
                     <rect x="20" y="30" width="40" height="1" fill="#222" />
                     
                     {/* Connection Port Area */}
                     <g transform="translate(10, 75)">
                        <circle cx="50" cy="50" r="45" fill="#050505" stroke={isConnected ? (chargingActive ? "#00FF94" : "#FFD700") : "#222"} strokeWidth="2" className="transition-colors duration-500" />
                        <circle cx="50" cy="50" r="38" fill="none" stroke="#111" strokeWidth="8" />
                        
                        {/* Status Ring */}
                        {isConnected && (
                          <circle cx="50" cy="50" r="45" fill="none" stroke={chargingActive ? "#00FF94" : "#FFD700"} className="animate-[ringPulse_1.5s_infinite]" style={{filter: 'url(#glowGreen)'}} />
                        )}
                        
                        {/* Port Pins */}
                        <circle cx="35" cy="40" r="6" fill="#111" stroke="#222" />
                        <circle cx="65" cy="40" r="6" fill="#111" stroke="#222" />
                        <circle cx="50" cy="65" r="8" fill="#111" stroke="#222" />
                        
                        {/* Interactive Hint */}
                        {isDragging && !isConnected && (
                          <circle cx="50" cy="50" r="55" fill="none" stroke="#FF3B00" strokeWidth="2" strokeDasharray="6 6" className="animate-ping opacity-40" />
                        )}
                        
                        {/* Sparks on contact */}
                        {showSpark && (
                          <g>
                            <circle cx="50" cy="50" r="30" fill="none" stroke="#fff" className="animate-[sparkExplosion_0.4s_ease-out_forwards]" />
                            <circle cx="50" cy="50" r="15" fill="#fff" className="animate-[sparkExplosion_0.2s_ease-out_forwards]" />
                          </g>
                        )}
                     </g>
                  </g>

                  {/* Power Cable */}
                  <path d={cablePath} fill="none" stroke="#1a1a1a" strokeWidth="24" strokeLinecap="round" />
                  
                  {/* Cable Flow Animations */}
                  {isConnected && (
                    <g opacity="0.8">
                      {/* Base Flow (Syncing/Steady) */}
                      <path d={cablePath} fill="none" stroke={chargingActive ? "#00FF94" : "#FFD700"} strokeWidth="4" strokeDasharray="10 30" strokeLinecap="round" className="animate-[energyFlow_1s_linear_infinite]" style={{filter: 'url(#glowGreen)', opacity: 0.6}} />
                      
                      {/* Active Hyper Charge (Rapid Particles) */}
                      {chargingActive && (
                        <>
                          <path d={cablePath} fill="none" stroke="#fff" strokeWidth="6" strokeDasharray="2 60" strokeLinecap="round" className="animate-[rapidFlow_0.2s_linear_infinite]" style={{filter: 'url(#glowIntense)', opacity: 0.9}} />
                          <path d={cablePath} fill="none" stroke="#00FF94" strokeWidth="12" strokeDasharray="40 100" strokeLinecap="round" className="animate-[rapidFlow_0.4s_linear_infinite]" style={{filter: 'url(#glowGreen)', opacity: 0.4, mixBlendMode: 'screen'}} />
                        </>
                      )}
                    </g>
                  )}

                  {/* Charging Plug (The Draggable Item) */}
                  <g transform={`translate(${plugPos.x}, ${plugPos.y})`} onMouseDown={handleStart} onTouchStart={handleStart} className={`${isConnected ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'} transition-transform duration-75`}>
                     {/* Plug Body - Same Size as before but more detailed */}
                     <path d="M0,0 L120,0 L130,10 L130,40 L120,50 L0,50 Z" fill="url(#plugBodyGrad)" stroke={isDragging ? "#FF3B00" : "#444"} strokeWidth="2" />
                     
                     {/* Grip Lines */}
                     <rect x="20" y="10" width="30" height="2" fill="#444" opacity="0.5" />
                     <rect x="20" y="20" width="30" height="2" fill="#444" opacity="0.5" />
                     <rect x="20" y="30" width="30" height="2" fill="#444" opacity="0.5" />
                     <rect x="20" y="40" width="30" height="2" fill="#444" opacity="0.5" />
                     
                     {/* Contact Pins (Visual only when not connected) */}
                     {!isConnected && (
                       <g opacity="0.8">
                          <rect x="130" y="15" width="20" height="6" fill="#666" rx="1" />
                          <rect x="130" y="29" width="20" height="6" fill="#666" rx="1" />
                       </g>
                     )}

                     {/* The Improved LED Indicator */}
                     <g transform="translate(95, 25)">
                        <circle r="8" fill="#000" stroke="#222" strokeWidth="1" />
                        <circle r="5" 
                          fill={isConnected ? (chargingActive ? "#00FF94" : "#FFD700") : "#1a1a1a"} 
                          className={isConnected ? (chargingActive ? "animate-[ledPulse_1s_infinite]" : "animate-[ledBlink_0.4s_infinite]") : ""} 
                          style={{ transition: 'fill 0.3s' }}
                        />
                        {/* Bloom Layer */}
                        {isConnected && (
                          <circle r="12" fill={chargingActive ? "#00FF94" : "#FFD700"} opacity="0.1" className="animate-pulse" />
                        )}
                     </g>

                     <text x="72" y="44" fill={isConnected ? (chargingActive ? "#00FF94" : "#FFD700") : "#666"} fontSize="7" fontFamily="monospace" fontWeight="black" className="transition-colors">
                        {isConnected ? (chargingActive ? 'ACTIVE' : 'READY') : 'LIFT'}
                     </text>
                  </g>
                </svg>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChargingInfrastructure;