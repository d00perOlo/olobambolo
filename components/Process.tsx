import React from 'react';

const Process: React.FC = () => {
  return (
    <section id="proces" className="py-16 md:py-20 bg-carbon border-y border-white/5 relative overflow-hidden">
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-cyan/20"></div>
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="mb-10 md:hidden">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">PROCEDURA</span> <span className="text-cyan">STARTU</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan/50 to-transparent"></div>
          {[
            { step: '01', title: 'LOKALIZUJ', desc: 'Skanuj strefę.' },
            { step: '02', title: 'ODBLOKUJ', desc: 'Dostęp biometryczny.' },
            { step: '03', title: 'ODPAL', desc: 'Wciśnij start.' }
          ].map((item, i) => (
            <div key={i} className="relative group pl-12 md:pl-0">
              <div className="md:hidden absolute left-[11px] top-6 w-3 h-3 bg-graphite-800 border-2 border-cyan rounded-full z-10"></div>
              <div className="text-5xl md:text-[6rem] font-black italic text-white/5 absolute -top-4 left-8 md:-top-10 md:-left-4 select-none group-hover:text-orange/10 transition-colors">
                {item.step}
              </div>
              <div className="skew-x-0 md:skew-x-[-12deg] bg-graphite-700 border border-white/10 p-6 md:p-8 hover:border-orange transition-colors duration-300 shadow-xl">
                <div className="skew-x-0 md:skew-x-[12deg]">
                  <h3 className="text-xl md:text-2xl font-black italic uppercase text-white mb-2 group-hover:text-orange transition-colors">{item.title}</h3>
                  <p className="text-gray-400 font-medium italic text-xs md:text-sm">{item.desc}</p>
                </div>
              </div>
              <div className="hidden md:block absolute top-[50%] -right-4 w-2 h-2 bg-graphite-600 border border-cyan rounded-full shadow-[0_0_8px_cyan]"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;