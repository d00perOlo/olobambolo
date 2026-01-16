import React, { useState } from 'react';
import { PROJECT_MATRIX } from '../constants';
import { MatrixItem, MatrixColumn } from '../types';

const ProjectMatrix: React.FC = () => {
  // Local state to handle data updates
  const [matrixData, setMatrixData] = useState<MatrixColumn[]>(PROJECT_MATRIX);
  const [editingItem, setEditingItem] = useState<MatrixItem | null>(null);
  
  // Form state
  const [formState, setFormState] = useState<{
    title: string;
    priority: MatrixItem['priority'];
    progress: number;
  }>({
    title: '',
    priority: 'low',
    progress: 0
  });

  const handleItemClick = (item: MatrixItem) => {
    setEditingItem(item);
    setFormState({
      title: item.title,
      priority: item.priority,
      progress: item.progress
    });
  };

  const handleClose = () => {
    setEditingItem(null);
  };

  const handleSave = () => {
    if (!editingItem) return;

    const newData = matrixData.map(col => ({
      ...col,
      items: col.items.map(item => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            title: formState.title,
            priority: formState.priority,
            progress: formState.progress
          };
        }
        return item;
      })
    }));

    setMatrixData(newData);
    handleClose();
  };

  const getPriorityColor = (priority: MatrixItem['priority']) => {
      // Just text color changes in this theme usually, but we'll use left border
      switch(priority) {
          case 'high': return 'border-l-2 border-l-cyber-red';
          case 'medium': return 'border-l-2 border-l-yellow-600';
          default: return 'border-l-2 border-l-[#333]';
      }
  };

  return (
    <div className="flex flex-col h-[380px] bg-[#000] border-t border-[#1f1f1f] w-full relative">
      
      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1f1f1f] bg-[#050505]">
        <div className="flex items-center gap-4">
            <span className="text-xs text-cyber-teal uppercase tracking-[2px]">Matrix / Kanban</span>
            <div className="h-4 w-[1px] bg-[#333]"></div>
            <button className="text-[10px] text-cyber-muted hover:text-cyber-text uppercase">[SPRINT_42]</button>
            <button className="text-[10px] text-cyber-muted hover:text-cyber-text uppercase">[MY_TASKS]</button>
        </div>
      </div>

      {/* The Matrix Grid */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex min-w-max h-full">
            {matrixData.map((col) => (
                <div key={col.id} className="w-56 flex flex-col border-r border-[#1f1f1f] h-full bg-[#000]">
                    <div className="p-3 border-b border-[#1f1f1f] bg-[#050505] flex items-center justify-between">
                        <span className="text-[10px] font-bold text-cyber-teal uppercase tracking-widest">{col.title}</span>
                        <span className="text-[9px] text-[#555] font-mono">[{col.items.length}]</span>
                    </div>
                    <div className="flex flex-col gap-3 p-3 overflow-y-auto custom-scrollbar h-full">
                        {col.items.map((item) => (
                            <div 
                                key={item.id} 
                                onClick={() => handleItemClick(item)}
                                className={`
                                    p-3 cursor-pointer flex flex-col gap-2 transition-all 
                                    bg-[#000] border border-dashed border-[#333] hover:border-cyber-teal
                                    ${getPriorityColor(item.priority)}
                                `}
                            >
                                <span className="text-[11px] font-bold text-cyber-text leading-tight">{item.title}</span>
                                
                                <div className="flex items-center justify-between mt-1">
                                    <div className="w-16 h-1 bg-[#1a1a1a]">
                                        <div 
                                            className="h-full bg-cyber-teal" 
                                            style={{ width: `${item.progress}%`, opacity: item.progress > 0 ? 1 : 0 }}
                                        ></div>
                                    </div>
                                    <span className="text-[9px] text-[#444] font-mono">{item.count}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* EDIT MODAL - TERMINAL STYLE */}
      {editingItem && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-[2px]">
            <div className="bg-[#000] border border-cyber-teal shadow-[0_0_20px_rgba(194,253,18,0.1)] w-full max-w-sm p-0 animate-in fade-in zoom-in duration-100">
                <div className="bg-cyber-teal text-black px-3 py-1 flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest">EDIT_TASK_PROPERTIES</span>
                    <button onClick={handleClose} className="font-bold hover:bg-black hover:text-cyber-teal px-1">X</button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Title Input */}
                    <div>
                        <label className="block text-[10px] text-cyber-teal mb-2 uppercase tracking-wider">>> Task Identifier</label>
                        <input 
                            type="text" 
                            value={formState.title}
                            onChange={(e) => setFormState({...formState, title: e.target.value})}
                            className="w-full bg-[#050505] text-xs text-cyber-text border border-[#333] p-2 focus:outline-none focus:border-cyber-teal font-mono"
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-[10px] text-cyber-teal mb-2 uppercase tracking-wider">>> Priority Level</label>
                        <div className="grid grid-cols-3 gap-0 border border-[#333]">
                            {['low', 'medium', 'high'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => setFormState({...formState, priority: p as any})}
                                    className={`
                                        text-[10px] py-2 uppercase font-mono
                                        ${formState.priority === p 
                                            ? 'bg-cyber-teal text-black font-bold' 
                                            : 'bg-[#000] text-[#555] hover:text-cyber-text border-r border-[#333] last:border-r-0'
                                        }
                                    `}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex justify-between text-[10px] text-cyber-teal mb-2 uppercase tracking-wider">
                            <label>>> Completion Status</label>
                            <span>[{formState.progress}%]</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            step="5"
                            value={formState.progress}
                            onChange={(e) => setFormState({...formState, progress: Number(e.target.value)})}
                            className="w-full h-1 bg-[#333] rounded-none appearance-none cursor-pointer accent-cyber-teal"
                        />
                    </div>
                </div>

                <div className="flex border-t border-[#333]">
                    <button 
                        onClick={handleClose}
                        className="flex-1 py-3 text-xs text-[#666] hover:text-cyber-text hover:bg-[#111] uppercase tracking-wider border-r border-[#333]"
                    >
                        [ Cancel ]
                    </button>
                    <button 
                        onClick={handleSave}
                        className="flex-1 py-3 text-xs text-cyber-teal hover:bg-cyber-teal hover:text-black font-bold uppercase tracking-wider"
                    >
                        [ Confirm ]
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProjectMatrix;