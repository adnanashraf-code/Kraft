import React, { useState } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Plus, MoreHorizontal, Edit2, Copy, Trash2, FileText, ChevronRight } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const PagesPanel = () => {
  const { pages, activePageId, addPage, switchPage, renamePage, removePage, duplicatePage, uiTheme } = useEditorStore();
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  const startEditing = (page) => {
    setEditingId(page.id);
    setEditValue(page.name);
    setActiveMenu(null);
  };

  const handleRename = (id) => {
    if (editValue.trim()) {
      renamePage(id, editValue.trim());
    }
    setEditingId(null);
  };

  return (
    <div id="pages-panel" className={`border-b-2 border-black mb-4 pb-4`}>
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-[12px] font-black uppercase tracking-[0.3em] font-editorial flex items-center text-black">
          <FileText size={12} className="mr-2" /> Design Pages
        </span>
        <button 
          onClick={() => addPage()}
          className="p-1.5 rounded-none border-2 border-black bg-white hover:bg-yellow-400 transition-colors neo-shadow-xs"
          title="Add Page"
        >
          <Plus size={14} strokeWidth={3} />
        </button>
      </div>

      <div className="px-2 pb-4 space-y-1">
        {pages.map((page) => {
          const isActive = page.id === activePageId;
          const isEditing = editingId === page.id;

          return (
            <div key={page.id} className="relative group">
              <div 
                onClick={() => !isEditing && switchPage(page.id)}
                className={`
                  flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all border-2 border-black
                  ${isActive 
                    ? 'bg-yellow-400 text-black neo-shadow-sm -translate-y-0.5' 
                    : 'bg-white text-black hover:bg-gray-50 hover:-translate-y-0.5 hover:neo-shadow-xs'}
                `}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <ChevronRight size={12} strokeWidth={3} className={`mr-2 transition-transform ${isActive ? 'rotate-90 opacity-100' : 'opacity-20'}`} />
                  
                  {isEditing ? (
                    <input 
                      autoFocus
                      className="bg-transparent outline-none w-full text-[11px] font-black uppercase"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleRename(page.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRename(page.id)}
                    />
                  ) : (
                    <span className="text-[11px] font-black uppercase truncate tracking-tight">{page.name}</span>
                  )}
                </div>

                {!isEditing && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === page.id ? null : page.id);
                    }}
                    className="p-1 hover:bg-black/10 transition-colors"
                  >
                    <MoreHorizontal size={14} strokeWidth={3} />
                  </button>
                )}
              </div>

              {/* Context Menu Dropdown */}
              {activeMenu === page.id && (
                <div className={`absolute right-4 top-full mt-1 z-50 w-32 rounded-2xl shadow-2xl border ${theme.border} ${isLight ? 'bg-white' : 'bg-[#1a1a1a]'} py-1 animate-in zoom-in-95 duration-100 overflow-hidden`}>
                  <button 
                    onClick={() => startEditing(page)}
                    className={`w-full flex items-center px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/5 text-gray-300'}`}
                  >
                    <Edit2 size={10} className="mr-2" /> Rename
                  </button>
                  <button 
                    onClick={() => { duplicatePage(page.id); setActiveMenu(null); }}
                    className={`w-full flex items-center px-3 py-2 text-[10px] font-bold uppercase tracking-wider transition-colors ${isLight ? 'hover:bg-gray-100 text-gray-600' : 'hover:bg-white/5 text-gray-300'}`}
                  >
                    <Copy size={10} className="mr-2" /> Duplicate
                  </button>
                  {pages.length > 1 && (
                    <button 
                      onClick={() => { removePage(page.id); setActiveMenu(null); }}
                      className="w-full flex items-center px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-red-500 hover:bg-red-500/10 transition-colors"
                    >
                      <Trash2 size={10} className="mr-2" /> Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PagesPanel;
