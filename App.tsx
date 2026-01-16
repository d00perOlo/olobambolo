import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProjectChart from './components/ProjectChart';
import StatsPanel from './components/StatsPanel';
import ProjectMatrix from './components/ProjectMatrix';
import { ViewMode } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.TASKS);

  // Helper to render content based on view
  const renderContent = () => {
    // For Dashboard and Tasks, we show the main complex view created earlier
    if (view === ViewMode.TASKS || view === ViewMode.DASHBOARD) {
      return (
        <>
          {/* Split View: Chart + Projects List */}
          <div className="flex flex-1 min-h-0 border-t border-[#1f1f1f] relative bg-transparent">
              {/* Center Chart Area */}
              <div className="flex-1 relative flex flex-col min-h-[300px] p-4">
                   <ProjectChart />
              </div>

              {/* Right Projects Panel */}
              <StatsPanel />
          </div>

          {/* Bottom Matrix Section */}
          <ProjectMatrix />
        </>
      );
    }

    // Placeholder for other views
    return (
      <div className="flex-1 flex flex-col items-center justify-center border-t border-[#1f1f1f] bg-transparent relative overflow-hidden">
        <div className="z-10 text-center p-10 border border-[#333] bg-[#050505] shadow-2xl max-w-md">
          <div className="w-12 h-12 border border-cyber-teal flex items-center justify-center mx-auto mb-6 text-cyber-teal animate-pulse">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
             </svg>
          </div>
          <h2 className="text-xl font-bold text-cyber-text mb-2 uppercase tracking-[3px]">{view}</h2>
          <p className="text-[#666] text-xs font-mono mb-6">MODULE_UNDER_CONSTRUCTION // ACCESS_DENIED</p>
          <button 
            onClick={() => setView(ViewMode.TASKS)}
            className="px-6 py-2 border border-cyber-teal text-cyber-teal text-xs hover:bg-cyber-teal hover:text-black transition-colors uppercase"
          >
            [ Return_Root ]
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-full bg-transparent text-cyber-text overflow-hidden font-mono selection:bg-cyber-teal selection:text-black">
      {/* Left Sidebar */}
      <Sidebar currentView={view} setView={setView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent">
        
        {/* Header Section */}
        <Header />

        {/* Content Body with Transition */}
        <div key={view} className="flex-1 flex flex-col min-h-0 relative view-enter">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;