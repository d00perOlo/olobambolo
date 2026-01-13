import React from 'react';

const Navbar: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full z-50 pt-4 px-4 md:px-8 pointer-events-none">
      <nav className="flex justify-between items-stretch pointer-events-auto">
        
        {/* Logo Container - Graphite Backdrop */}
        <a href="#top" onClick={(e) => handleScroll(e, 'top')} className="bg-graphite/90 backdrop-blur-sm border-l-4 border-orange px-6 py-4 skew-x-[-12deg] hover:bg-graphite transition-colors group">
          <div className="skew-x-[12deg] flex items-center gap-1">
            {/* Orange highlights the brand core */}
            <span className="text-2xl font-black italic tracking-tighter text-white">Olo<span className="text-orange">SiTiRENT</span></span>
            {/* System Status: Cyan (Tech) - Green is reserved for Eco */}
            <div className="w-1.5 h-1.5 bg-cyan rounded-full animate-pulse-fast ml-2 shadow-[0_0_8px_#00F0FF]"></div>
          </div>
        </a>

        {/* Desktop Links - Tech Bar (Cyan logic) */}
        <div className="hidden md:flex items-center gap-8 bg-graphite/90 backdrop-blur-md px-10 border-b border-white/5 skew-x-[-12deg] translate-x-8">
          {['Flota', 'Proces', 'Zalety', 'Rezerwacja'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              onClick={(e) => handleScroll(e, item.toLowerCase())} 
              className="text-sm font-black italic uppercase tracking-widest text-gray-400 hover:text-cyan transition-colors skew-x-[12deg] relative group"
            >
              {item}
              <span className="absolute -bottom-6 left-0 w-0 h-[2px] bg-cyan transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* CTA Button - Orange (Action) */}
        <a href="#rezerwacja" onClick={(e) => handleScroll(e, 'rezerwacja')} className="hidden md:flex items-center btn-ignite px-8 py-3 skew-x-[-12deg]">
          <span className="skew-x-[12deg] text-sm tracking-widest">ODPAL</span>
        </a>
      </nav>
    </header>
  );
};

export default Navbar;