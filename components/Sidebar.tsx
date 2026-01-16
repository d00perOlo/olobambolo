import React from 'react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const menuItems = [
    { id: ViewMode.DASHBOARD, icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', label: 'DASHBOARD' },
    { id: ViewMode.TASKS, icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', label: 'ZADANIA', active: true },
    { id: ViewMode.IDEAS, icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', label: 'POMYSŁY' },
    { id: 'WIKI', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'BAZA' },
    { id: 'CALENDAR', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'HARMONOGRAM' },
    { id: ViewMode.ARCHIVE, icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', label: 'ARCHIWUM' },
  ];

  return (
    <div className="w-20 bg-[#000] flex flex-col items-center py-4 border-r border-[#1f1f1f] shrink-0 z-20">
      
      <div className="flex flex-col gap-8 w-full mt-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewMode)}
            className={`flex flex-col items-center justify-center w-full py-1 group relative transition-colors ${
              item.active || currentView === item.id ? 'text-cyber-teal' : 'text-[#555] hover:text-cyber-text'
            }`}
          >
            {/* Active Indicator Line */}
            {(item.active || currentView === item.id) && (
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyber-teal box-shadow-[0_0_8px_#c2fd12]"></div>
            )}
            
            <svg className="w-5 h-5 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
            </svg>
            <span className="text-[9px] tracking-wider text-center leading-tight max-w-[60px]">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-6 w-full text-[#555]">
         <button className="flex flex-col items-center hover:text-cyber-text transition-colors">
            <span className="text-[14px]">⚙</span>
         </button>
         <button className="flex flex-col items-center hover:text-cyber-text transition-colors pb-4">
            <div className="w-6 h-6 border border-[#333] flex items-center justify-center text-[10px] font-bold text-cyber-teal hover:border-cyber-teal hover:bg-cyber-teal/10">
                JD
            </div>
         </button>
      </div>
    </div>
  );
};

export default Sidebar;