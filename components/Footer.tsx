import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white grid grid-cols-1 md:grid-cols-[70px_1fr] min-h-[400px] text-text-dark">
      
      {/* Sidebar (Socials) */}
      <div className="border-b md:border-b-0 md:border-r border-black/10 flex md:flex-col items-center justify-center md:justify-start pt-5 md:pt-10 gap-10 md:gap-[30px] p-5">
        <a href="#" aria-label="WhatsApp" className="block w-6 h-6 hover:scale-110 hover:-translate-y-1 hover:text-accent transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        </a>
        <a href="#" aria-label="Instagram" className="block w-6 h-6 hover:scale-110 hover:-translate-y-1 hover:text-accent transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="#" aria-label="Email" className="block w-6 h-6 hover:scale-110 hover:-translate-y-1 hover:text-accent transition-all duration-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        </a>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black/10">
          <div className="p-[40px_20px] md:p-[60px_20px] border-b md:border-b-0 md:border-r border-black/10 flex flex-col items-center text-center justify-center gap-5 hover:bg-black/[0.03] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
             <svg className="w-10 h-10 stroke-[1.5px] opacity-50 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
             <p className="font-sans text-base leading-relaxed m-0 text-text-dark/80 group-hover:text-text-dark transition-colors duration-300">Rozmawiaj bezpośrednio<br/>przez telefon.</p>
          </div>
          <div className="p-[40px_20px] md:p-[60px_20px] border-b md:border-b-0 md:border-r border-black/10 flex flex-col items-center text-center justify-center gap-5 hover:bg-black/[0.03] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
             <svg className="w-10 h-10 stroke-[1.5px] opacity-50 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
             <p className="font-sans text-base leading-relaxed m-0 text-text-dark/80 group-hover:text-text-dark transition-colors duration-300">Wyślij mi e-mail.<br/>Odpowiadam szybko.</p>
          </div>
          <div className="p-[40px_20px] md:p-[60px_20px] flex flex-col items-center text-center justify-center gap-5 hover:bg-black/[0.03] hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
             <svg className="w-10 h-10 stroke-[1.5px] opacity-50 group-hover:opacity-100 group-hover:stroke-accent transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
             <p className="font-sans text-base leading-relaxed m-0 text-text-dark/80 group-hover:text-text-dark transition-colors duration-300">Wyślij wiadomość<br/>przez WhatsApp.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="p-10 flex flex-col md:flex-row justify-between items-center md:items-end flex-1 gap-10 md:gap-0 text-center md:text-left">
          <div className="max-w-[300px] text-xs text-muted-dark leading-relaxed">
            "Pieniądze nie dają szczęścia, ale pozwalają zarządzać nieszczęściem w znacznie większym komforcie." — Cytat Finansowy
            <br /><br />
            © 2025 MTG GROUP. Wszelkie prawa zastrzeżone.
          </div>
          
          <div className="font-display font-bold text-2xl tracking-[-0.02em] uppercase opacity-30">
            MTG GROUP
          </div>

          <div className="flex flex-col md:flex-row gap-[30px] md:gap-10 items-center md:items-end">
            <div className="flex flex-col gap-2.5 font-mono text-xs uppercase">
              <span className="opacity-40">FAQ</span>
              <a href="#" className="relative group overflow-hidden py-1">
                <span className="group-hover:text-accent transition-colors duration-300">Pytania</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <div className="flex flex-col gap-2.5 font-mono text-xs uppercase">
              <span className="opacity-40">Design</span>
              <a href="#" className="relative group overflow-hidden py-1">
                <span className="group-hover:text-accent transition-colors duration-300">MTG</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            <button 
              onClick={() => window.scrollTo({top:0, behavior:'smooth'})}
              className="flex flex-col items-center gap-2.5 bg-none border-none font-mono text-[11px] uppercase cursor-pointer group"
            >
              <span className="group-hover:text-accent transition-colors duration-300">Topo</span>
              <svg className="w-5 h-5 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;