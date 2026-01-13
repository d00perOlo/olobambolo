import React from 'react';

const Stats: React.FC = () => {
  return (
    <section id="korzysci" className="relative z-20 py-8 md:py-10 bg-graphite-900 border-y border-graphite-600">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          
          {[
            { val: '15 MIN', label: 'CZAS STARTU', color: 'text-white' },
            // ECO SIGNAL: CO2 Offset Indicator (Green)
            { val: '-100%', label: 'EMISJI CO₂', color: 'text-techGreen' },
            { val: '0', label: 'FORMALNOŚCI', color: 'text-white' },
            { val: '24/7', label: 'WSPARCIE', color: 'text-white' }
          ].map((stat, i) => (
            <div key={i} className="group relative p-4 md:p-6 border border-white/5 bg-graphite-800 hover:bg-graphite-700 transition-colors overflow-hidden">
              <div className="md:skew-x-[-12deg] text-center">
                <div className="md:skew-x-[12deg]">
                  <div className={`text-2xl md:text-5xl font-black italic ${stat.color} group-hover:text-white transition-colors tracking-tighter`}>
                    {stat.val}
                  </div>
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-cyan mt-1 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>
              
              {/* Corner accent - Cyan for Tech Frame */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan/50"></div>
              {/* Corner accent - Orange for underlying action potential */}
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange/30"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Stats;