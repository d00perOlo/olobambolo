import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-graphite pt-16 pb-28 md:py-20 px-6 md:px-8 border-t border-white/5 relative overflow-hidden">
      {/* Footer background texture */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange/20 via-transparent to-transparent"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 relative z-10">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-5">
            {/* New Logo Icon */}
            <div className="w-8 h-8 bg-orange skew-x-[-12deg] flex items-center justify-center">
              <span className="font-black italic text-black skew-x-[12deg]">O</span>
            </div>
            <span className="text-xl font-black italic tracking-tighter text-white">OloSiTiRENT</span>
          </div>
          <p className="text-gray-500 text-sm italic leading-relaxed font-medium">
            Przyszłość wynajmu jest cyfrowa. Projektujemy doświadczenie mobilności: szybko, czytelnie, bez tarcia.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 w-full md:w-auto">
          <div>
            <h3 className="font-black mb-5 text-xs uppercase tracking-widest text-cyan">System</h3>
            <ul className="space-y-4 text-sm text-gray-400 italic font-bold">
              <li><a href="#flota" className="hover:text-orange transition-colors">Flota</a></li>
              <li><a href="#rezerwacja" className="hover:text-orange transition-colors">Rezerwacja</a></li>
              <li><a href="#proces" className="hover:text-orange transition-colors">Proces</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-black mb-5 text-xs uppercase tracking-widest text-cyan">Firma</h3>
            <ul className="space-y-4 text-sm text-gray-400 italic font-bold">
              <li><a href="#" className="hover:text-orange transition-colors">O nas</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Kariera</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Kontakt</a></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-black mb-5 text-xs uppercase tracking-widest text-cyan">Prawne</h3>
            <ul className="space-y-4 text-sm text-gray-400 italic font-bold">
              <li><a href="#" className="hover:text-orange transition-colors">Regulamin</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Prywatność</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-14 pt-8 border-t border-white/5 flex flex-col md:flex-row gap-4 md:gap-0 md:justify-between text-[10px] text-gray-600 uppercase tracking-widest font-bold">
        <span>© 2026 OloSiTiRENT MOBILITY SYSTEMS.</span>
        <span className="flex gap-4 justify-start md:justify-end text-orange flex-wrap">
          <span>Warszawa</span><span>Berlin</span><span>Londyn</span><span>Zielona Góra</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;