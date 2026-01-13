import React from 'react';

interface CarModel {
  id: string;
  category: string;
  name: string;
  accel: string;
  eco: boolean;
  type: 'hyper' | 'gt' | 'suv' | 'urban' | 'sport';
}

const cars: CarModel[] = [
  { id: '1', category: 'Hiper', name: 'Rosso Corsa', accel: '2.8s', eco: false, type: 'hyper' },
  { id: '2', category: 'Grand Tour', name: 'Neo GT', accel: '3.2s', eco: true, type: 'gt' },
  { id: '3', category: 'Power SUV', name: 'Apex X', accel: '3.9s', eco: false, type: 'suv' },
  { id: '4', category: 'Miejski', name: 'Urban EV', accel: '4.5s', eco: true, type: 'urban' },
  { id: '5', category: 'SUV', name: 'SUV/JEEP', accel: '4.2s', eco: true, type: 'suv' },
  { id: '6', category: 'Sportowe', name: 'SPORT', accel: '3.6s', eco: true, type: 'sport' }
];

const Fleet: React.FC = () => {
  return (
    <section id="flota" className="py-16 md:py-20 px-6 overflow-hidden bg-gradient-to-b from-void to-graphite-900">
      <style>{`
        @keyframes cardHoverPulse {
          0% { box-shadow: -8px 8px 0px rgba(255, 59, 0, 0.15); }
          50% { box-shadow: -12px 12px 20px rgba(255, 59, 0, 0.3); border-color: #FF5500; }
          100% { box-shadow: -8px 8px 0px rgba(255, 59, 0, 0.15); }
        }
        .speed-card:hover {
          animation: cardHoverPulse 2s infinite ease-in-out;
          transform: skewX(-10deg) translate(-6px, -6px);
        }
      `}</style>
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-end gap-6 mb-12">
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">WYBIERZ</span> <span className="text-orange">FURĘ</span>
          </h2>
          <div className="hidden md:block h-[4px] flex-1 bg-gradient-to-r from-orange to-transparent skew-x-[-45deg] mb-3"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {cars.map((car) => (
            <FleetCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FleetCard: React.FC<{ car: CarModel }> = ({ car }) => {
  const renderSilhouette = () => {
    switch(car.type) {
      case 'hyper':
      case 'sport':
        return (
          <path d="M10,75 L190,75 L180,45 L120,35 L60,40 L20,50 Z" />
        );
      case 'suv':
        return (
          <path d="M10,75 L190,75 L185,55 L160,35 L60,35 L20,50 Z" />
        );
      case 'urban':
        return (
          <path d="M30,75 L170,75 L160,50 L130,30 L70,30 L40,50 Z" />
        );
      case 'gt':
      default:
        return (
          <path d="M10,75 L190,75 L180,50 L140,40 L60,40 L20,55 Z" />
        );
    }
  };

  return (
    <div className="speed-card group h-[400px] flex flex-col justify-end p-8 relative overflow-hidden transition-all duration-300 cursor-pointer">
      <div className="tech-line absolute top-0 left-0 h-[2px] w-0 bg-cyan transition-all duration-300 group-hover:shadow-[0_0_20px_#FF3B00] group-hover:bg-orange"></div>
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-orange/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-orange/20 transition-colors"></div>

      {/* Hover Action Text Overlay */}
      <div className="absolute top-1/4 left-0 w-full flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20">
        <div className="bg-orange text-black px-4 py-1.5 skew-x-[-12deg] font-black italic uppercase text-[10px] tracking-[0.2em] shadow-[0_0_20px_rgba(255,59,0,0.4)]">
          <span className="skew-x-[12deg] block">WYBIERZ TĘ MASZYNĘ</span>
        </div>
      </div>

      {/* Dynamic Car Silhouette Background - Reduced size by 20% (85% -> 68%) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68%] opacity-40 group-hover:opacity-100 transition-all group-hover:scale-110 duration-500">
        <svg viewBox="0 0 200 100" className="w-full stroke-gray-600 group-hover:stroke-orange transition-colors" fill="none" strokeWidth="1.5">
           {renderSilhouette()}
           {/* Wheels */}
           <circle cx="45" cy="75" r="14" strokeWidth="2" />
           <circle cx="155" cy="75" r="14" strokeWidth="2" />
           {/* Detail line */}
           <line x1="60" y1="45" x2="140" y2="45" strokeOpacity="0.3" strokeDasharray="4 4" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <div className="text-cyan font-black uppercase text-xs tracking-[0.2em]">{car.category}</div>
          {car.eco && (
            <div className="text-techGreen border border-techGreen/50 px-2 py-0.5 text-[9px] uppercase tracking-widest font-bold backdrop-blur-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-techGreen rounded-full animate-pulse"></span>
              NAPĘD: EV
            </div>
          )}
        </div>

        <h3 className="text-3xl font-black italic text-white uppercase mb-4 flex items-center gap-3">
          {car.name}
          {car.eco && (
             <div className="relative flex items-center justify-center">
               <div className="absolute inset-0 bg-techGreen/30 blur-[4px] animate-pulse-fast"></div>
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-techGreen relative z-10" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
               </svg>
             </div>
          )}
        </h3>
        
        <div className="flex justify-between items-end border-t border-white/10 pt-4 group-hover:border-orange/50 transition-colors">
          <div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">0-100 KM/H</div>
            <div className="text-2xl font-black italic text-white">{car.accel}</div>
          </div>
          <div className="bg-white/5 group-hover:bg-orange text-white w-10 h-10 flex items-center justify-center skew-x-[-12deg] transition-all group-hover:translate-x-1 group-hover:shadow-[0_0_15px_rgba(255,59,0,0.5)]">
            <span className="skew-x-[12deg] text-xl font-bold">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fleet;