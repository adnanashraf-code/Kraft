import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Eye, EyeOff, Lock, Unlock, Layers, ChevronUp, ChevronDown, Trash2, Search, X } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const LayersPanel = () => {
  const { 
    elements, selectElement, selectedElementIds, toggleSelection, updateElement, 
    deleteElements, reorderElement, uiTheme, isSearchOpen, setSearchOpen,
    searchQuery, setSearchQuery
  } = useEditorStore();

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
                  : 'bg-white/5 border-white/5 text-white focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10'}
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
      <div className="flex items-center justify-between mb-6 px-1 mt-2">
        <div className="flex flex-col">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 leading-none flex items-center ${theme.title}`}>
            <Layers size={10} className="mr-1.5" /> Layers
          </span>
          <span className="text-[10px] text-gray-500 font-bold">{filteredElements.length} elements {searchQuery && '(Filtered)'}</span>
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
                group flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all border
                ${isSelected 
                  ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/20 translate-x-1' 
                  : `border-transparent hover:${isLight ? 'bg-gray-100' : 'bg-white/5'}`}
              `}
            >
              <div className="flex items-center min-w-0 flex-1">
                <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : (isLight ? 'text-gray-800' : 'text-white/80')}`}>
                  {el.name || el.type}
                </span>
                {el.locked && <Lock size={10} className="ml-2 text-white/50" />}
              </div>

              {/* Power Tools Row on Hover or Selection */}
              <div className={`flex items-center space-x-1 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <button 
                  onClick={(e) => { e.stopPropagation(); updateElement(el.id, { visible: !el.visible }); }}
                  className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'hover:bg-white/20 text-white' : (isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-white/10 text-gray-400')}`}
                >
                  {el.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); updateElement(el.id, { locked: !el.locked }); }}
                  className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'hover:bg-white/20 text-white' : (isLight ? 'hover:bg-gray-200 text-gray-500' : 'hover:bg-white/10 text-gray-400')}`}
                >
                  {el.locked ? <Lock size={12} /> : <Unlock size={12} />}
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteElements([el.id]); }}
                  className={`p-1.5 rounded-lg transition-colors ${isSelected ? 'hover:bg-red-500/30 text-white' : 'hover:bg-red-500/10 text-red-500'}`}
                >
                  <Trash2 size={12} />
                </button>
                
                <div className="flex flex-col ml-1">
                   <button onClick={(e) => { e.stopPropagation(); reorderElement(el.id, elements[elements.length - 1 - index + 1]?.id); }}>
                     <ChevronUp size={10} className={isSelected ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600'} />
                   </button>
                   <button onClick={(e) => { e.stopPropagation(); reorderElement(el.id, elements[elements.length - 1 - index - 1]?.id); }}>
                     <ChevronDown size={10} className={isSelected ? 'text-white/60 hover:text-white' : 'text-gray-400 hover:text-gray-600'} />
                   </button>
                </div>
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
