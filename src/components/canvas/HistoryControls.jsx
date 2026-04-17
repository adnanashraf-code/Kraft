import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { THEMES } from '../../utils/themes';
import { Undo2, Redo2 } from 'lucide-react';

const HistoryControls = () => {
  const { pages, activePageId, past, future, undo, redo, uiTheme } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  // Only show if there are elements on the canvas
  if (elements.length === 0) return null;

  return (
    <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 flex items-center animate-in fade-in slide-in-from-top-4 duration-500">
      <div className={`
        flex items-center p-1.5 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all
        ${isLight ? 'bg-white/80 border-gray-200 shadow-gray-200/40' : 'bg-black/60 border-white/10 shadow-black/40'}
      `}>
        <button 
          onClick={undo}
          disabled={past.length === 0}
          title="Undo (Ctrl+Z)"
          className={`
            p-2 rounded-xl transition-all flex items-center justify-center
            ${past.length === 0 
              ? 'opacity-20 cursor-not-allowed' 
              : `hover:${isLight ? 'bg-gray-100 text-blue-600' : 'bg-white/10 text-white'}`}
            ${theme.text}
          `}
        >
          <Undo2 size={16} />
        </button>

        <div className={`w-px h-6 mx-1 ${theme.border} opacity-50`} />

        <button 
          onClick={redo}
          disabled={future.length === 0}
          title="Redo (Ctrl+Shift+Z)"
          className={`
            p-2 rounded-xl transition-all flex items-center justify-center
            ${future.length === 0 
              ? 'opacity-20 cursor-not-allowed' 
              : `hover:${isLight ? 'bg-gray-100 text-blue-600' : 'bg-white/10 text-white'}`}
            ${theme.text}
          `}
        >
          <Redo2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default HistoryControls;
