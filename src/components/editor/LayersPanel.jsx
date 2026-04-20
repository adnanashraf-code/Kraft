import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Eye, EyeOff, Lock, Unlock, Layers, ChevronUp, ChevronDown, Trash2, Search, X } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const LayersPanel = () => {
  const { 
    pages, activePageId, selectElement, selectedElementIds, toggleSelection, updateElement, 
    deleteElements, reorderElement, uiTheme, isSearchOpen, setSearchOpen,
    searchQuery, setSearchQuery
  } = useEditorStore();

  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  // Filter elements based on search query
  const filteredElements = elements.filter(el => 
    (el.name || el.type).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`w-[300px] ${theme.sidebar} flex flex-col h-full shrink-0 border-r ${theme.border} relative z-10 p-4 transition-colors duration-500`}>
      
      {/* Dynamic Search Area */}
      {isSearchOpen && (
        <div className="mb-4 animate-in slide-in-from-top-2 duration-300">
          <div className="relative flex items-center group">
            <Search size={14} className={`absolute left-3 ${isLight ? 'text-gray-400' : 'text-gray-500'} group-focus-within:text-blue-500 transition-colors pointer-events-none`} />
            <input 
              autoFocus
              type="text" 
              placeholder="Search layers..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`
                w-full text-xs border rounded-xl py-2 pl-9 pr-8 outline-none transition-all
                ${isLight 
                  ? 'bg-white border-gray-200 text-gray-800 focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500' 
                  : 'bg-black/40 border-white/10 text-white focus:bg-black/60 focus:ring-4 focus:ring-blue-500/10'}
              `}
            />
            <button 
              onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
              className="absolute right-2 p-1 rounded-lg hover:bg-black/5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Group Label */}
      <div className="flex items-center justify-between mb-6 px-1 mt-6">
        <div className="flex flex-col">
          <span className="text-[12px] font-black uppercase tracking-[0.3em] font-editorial leading-none flex items-center text-black">
            <Layers size={12} className="mr-2" /> Arena Layers
          </span>
          <span className="text-[10px] text-gray-500 font-bold mt-1 uppercase tracking-widest">{filteredElements.length} elements detected</span>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto space-y-1.5 custom-scrollbar pr-1">
        {[...filteredElements].reverse().map((el, index) => {
          const isSelected = selectedElementIds.includes(el.id);
          
          return (
            <div 
              key={el.id}
              onClick={(e) => {
                if (e.shiftKey) toggleSelection(el.id);
                else selectElement(el.id);
              }}
              className={`
                group flex items-center justify-between p-3 cursor-pointer transition-all border-2 border-black
                ${isSelected 
                  ? 'bg-yellow-400 text-black neo-shadow-sm -translate-y-0.5' 
                  : 'bg-white text-black hover:bg-gray-50 hover:-translate-y-0.5 hover:neo-shadow-xs'}
              `}
            >
              <div className="flex items-center min-w-0 flex-1">
                <span className="text-[11px] font-black uppercase truncate tracking-tight">
                  {el.name || el.type}
                </span>
                {el.locked && <Lock size={12} strokeWidth={3} className="ml-2 text-black/40" />}
              </div>

              {/* Power Tools Row on Hover or Selection */}
              <div className={`flex items-center space-x-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    useEditorStore.getState().saveHistory();
                    updateElement(el.id, { visible: !el.visible }); 
                  }}
                  className={`p-1 box-content transition-colors ${isSelected ? 'hover:bg-black/10' : 'hover:bg-black/5'}`}
                >
                  {el.visible ? <Eye size={14} strokeWidth={3} /> : <EyeOff size={14} strokeWidth={3} />}
                </button>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    useEditorStore.getState().saveHistory();
                    updateElement(el.id, { locked: !el.locked }); 
                  }}
                  className={`p-1 box-content transition-colors ${isSelected ? 'hover:bg-black/10' : 'hover:bg-black/5'}`}
                >
                  {el.locked ? <Lock size={14} strokeWidth={3} /> : <Unlock size={14} strokeWidth={3} />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteElements([el.id]); }}
                  className="p-1 box-content text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} strokeWidth={3} />
                </button>
              </div>
            </div>
          );
        })}

        {filteredElements.length === 0 && (
          <div className="py-12 text-center">
             <div className="inline-flex p-4 rounded-full bg-gray-100 text-gray-400 mb-4 animate-pulse">
                <Search size={24} />
             </div>
             <p className="text-xs font-bold text-gray-400 tracking-wide">No layers found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayersPanel;
