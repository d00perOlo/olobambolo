import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="flex flex-col w-full bg-[#000000] border-b border-[#1f1f1f]">
      
      {/* Top Bar with Title */}
      <div className="h-[60px] flex items-center justify-between px-6">
        <div className="flex items-center gap-6">
             {/* Boxed Logo Style */}
             <div className="border border-cyber-teal px-3 py-1.5 text-cyber-teal font-bold tracking-[2px] text-sm">
                 025Z3VV5KY
             </div>
             <div className="flex flex-col">
                <h1 className="text-sm text-cyber-muted tracking-[2px] uppercase">Mode: Project Ops</h1>
             </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-cyber-muted font-mono">
             <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyber-teal animate-pulse"></span>
                <span>SYSTEM ONLINE</span>
             </div>
             <button className="border border-[#333] hover:border-cyber-teal hover:text-cyber-teal text-cyber-text px-4 py-1 transition-colors uppercase">
                [ Zapisz ]
             </button>
        </div>
      </div>

      {/* Notification Banner / Context Line */}
      <div className="px-6 py-2 border-t border-[#1f1f1f] bg-[#050505]">
         <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-cyber-teal">>></span>
            <span className="text-cyber-muted uppercase tracking-wider">Active Context:</span>
            <span className="text-cyber-text">Dashboard Overview</span>
            <span className="mx-2 text-[#333]">|</span>
            <span className="text-cyber-red animate-pulse">! ALERT:</span>
            <span className="text-cyber-muted">Deadline "Panel Admina v2" in 72h</span>
         </div>
      </div>

    </div>
  );
};

export default Header;