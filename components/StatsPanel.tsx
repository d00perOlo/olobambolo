import React from 'react';
import { PROJECT_STATS } from '../constants';

const StatsPanel: React.FC = () => {
  return (
    <div className="w-80 bg-[#000] border-l border-[#1f1f1f] flex flex-col shrink-0">
      <div className="p-4 border-b border-[#1f1f1f]">
        <h2 className="text-xs text-cyber-teal tracking-[2px] mb-2 uppercase">Projects Index</h2>
        <div className="relative">
            <input 
                type="text" 
                placeholder="FILTER_QUERY..." 
                className="w-full bg-[#050505] text-xs text-cyber-text border border-[#333] px-2 py-2 focus:outline-none focus:border-cyber-teal font-mono uppercase placeholder-[#444]"
            />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-3">
        {PROJECT_STATS.map((proj) => (
            <div key={proj.id} className="relative border border-dashed border-[#333] hover:border-cyber-teal bg-[#050505] p-3 cursor-pointer group transition-all">
                {/* [OPEN] link simulation */}
                <div className="absolute top-2 right-2 text-[10px] text-[#444] group-hover:text-cyber-teal font-mono">
                    [OPEN]
                </div>
                
                <h3 className="text-xs font-bold text-cyber-text mb-1">{proj.name}</h3>
                <div className="text-[10px] text-cyber-muted uppercase tracking-wide mb-3">
                    STATUS: {proj.status}
                </div>

                {/* Progress Bar styled as terminal loader */}
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#555] mb-1">
                    <span>PROGRESS</span>
                    <span className="text-cyber-text">{proj.percentage}%</span>
                </div>
                <div className="w-full h-1 bg-[#1a1a1a]">
                    <div 
                        className={`h-full ${proj.status === 'active' ? 'bg-cyber-teal' : 'bg-[#555]'}`}
                        style={{ width: `${proj.percentage}%` }}
                    ></div>
                </div>
            </div>
        ))}
        
        <div className="mt-2 text-center">
             <button className="text-[10px] text-[#444] hover:text-cyber-teal uppercase tracking-widest border border-dashed border-[#333] hover:border-cyber-teal w-full py-2 transition-colors">
                [ LOAD ARCHIVES ]
             </button>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;