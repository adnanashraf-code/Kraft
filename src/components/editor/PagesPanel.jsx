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
    <div id="pages-panel" className={`border-b ${theme.border} mb-2`}>
      <div className="flex items-center justify-between px-4 py-3">
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.title} flex items-center`}>
          <FileText size={10} className="mr-1.5" /> Pages
        </span>
        <button 
          onClick={() => addPage()}
          className={`p-1 rounded-lg transition-colors ${isLight ? 'hover:bg-gray-100 text-gray-400 hover:text-blue-600' : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
          title="Add Page"
        >
          <Plus size={14} />
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
                  flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition-all group/item
                  ${isActive 
                    ? (isLight ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-blue-600/10 text-blue-400 border border-blue-500/20') 
                    : `border border-transparent ${isLight ? 'hover:bg-gray-50 text-gray-600' : 'hover:bg-white/5 text-gray-400'}`}
                `}
              >
                <div className="flex items-center flex-1 min-w-0">
                  <ChevronRight size={10} className={`mr-1.5 transition-transform ${isActive ? 'rotate-90 opacity-100' : 'opacity-20 translate-x-[-4px] group-hover/item:translate-x-0 group-hover/item:opacity-50'}`} />
                  
                  {isEditing ? (
                    <input 
                      autoFocus
                      className="bg-transparent outline-none w-full text-xs font-bold"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => handleRename(page.id)}
                      onKeyDown={(e) => e.key === 'Enter' && handleRename(page.id)}
                    />
                  ) : (
                    <span className="text-xs font-bold truncate">{page.name}</span>
                  )}
                </div>

                {!isEditing && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === page.id ? null : page.id);
                    }}
                    className={`p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all ${isLight ? 'hover:bg-blue-100' : 'hover:bg-white/10'}`}
                  >
                    <MoreHorizontal size={12} />
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
