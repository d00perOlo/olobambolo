import React from 'react';

const MobileNav: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="md:hidden fixed bottom-4 left-4 right-4 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border border-white/10 shadow-[0_15px_50px_-10px_rgba(0,0,0,1)] skew-x-[-6deg]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <style>{`
        @keyframes startPulse {
          0% { box-shadow: 0 0 0px rgba(255, 59, 0, 0.4); transform: skewX(10deg) scale(1); }
          50% { box-shadow: 0 0 25px rgba(255, 59, 0, 0.7); transform: skewX(10deg) scale(1.03); }
          100% { box-shadow: 0 0 0px rgba(255, 59, 0, 0.4); transform: skewX(10deg) scale(1); }
        }
        .animate-start-btn {
          animation: startPulse 2s infinite ease-in-out;
        }
      `}</style>
      <div className="skew-x-[6deg] flex items-center justify-between px-2 py-2">
         
         {/* Left: Secondary Link */}
         <a href="#flota" onClick={(e) => handleScroll(e, 'flota')} className="flex-1 text-gray-400 font-black uppercase text-[11px] tracking-[0.2em] hover:text-white transition-colors pl-4">
           FLOTA
         </a>

         {/* Center: Home/Logo - Subtle branding */}
         <a href="#top" onClick={(e) => handleScroll(e, 'top')} className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center font-black italic text-white hover:bg-white/10 transition-colors skew-x-[-10deg] mx-2">
           <span className="skew-x-[10deg] text-xl">O</span>
         </a>

         {/* Right: Primary Action - Larger, more vibrant START button */}
         <div className="flex-1 flex justify-end">
           <a 
             href="#rezerwacja" 
             onClick={(e) => handleScroll(e, 'rezerwacja')} 
             className="bg-orange text-black px-8 py-4 font-black italic uppercase text-base tracking-widest skew-x-[-10deg] transition-all active:scale-90 relative overflow-hidden animate-start-btn group"
           >
             {/* Glossy overlay effect on button */}
             <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-full transition-all duration-700"></div>
             
             <span className="block flex items-center gap-2">
               START
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                 <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
               </svg>
             </span>
           </a>
         </div>
      </div>
    </nav>
  );
};

export default MobileNav;