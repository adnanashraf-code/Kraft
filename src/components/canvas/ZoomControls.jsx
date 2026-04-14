import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { THEMES } from '../../utils/themes';
import { Plus, Minus, Maximize, RotateCcw } from 'lucide-react';

const ZoomControls = () => {
  const { canvas, setZoom, setPan, uiTheme } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  const zoomIn = () => setZoom(canvas.zoom + 10);
  const zoomOut = () => setZoom(canvas.zoom - 10);
  const resetView = () => {
    setZoom(100);
    setPan(0, 0);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2">
      <div className={`
        flex items-center px-2 py-1.5 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all
        ${isLight ? 'bg-white/80 border-gray-200 shadow-gray-200/50' : 'bg-black/60 border-white/10 shadow-black'}
      `}>
        <button 
          onClick={zoomOut}
          className={`p-2 rounded-xl transition-all hover:${isLight ? 'bg-gray-100 text-blue-600' : 'bg-white/10 text-white'} ${theme.title}`}
        >
          <Minus size={14} />
        </button>
        
        <div 
          onClick={resetView}
          className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest cursor-pointer select-none min-w-[60px] text-center hover:scale-105 transition-transform ${isLight ? 'text-gray-900' : 'text-white'}`}
        >
          {canvas.zoom}%
        </div>

        <button 
          onClick={zoomIn}
          className={`p-2 rounded-xl transition-all hover:${isLight ? 'bg-gray-100 text-blue-600' : 'bg-white/10 text-white'} ${theme.title}`}
        >
          <Plus size={14} />
        </button>

        <div className={`w-px h-6 mx-2 ${theme.border} opacity-50`} />

        <button 
          onClick={resetView}
          title="Reset View"
          className={`p-2 rounded-xl transition-all hover:${isLight ? 'bg-gray-100 text-blue-600' : 'bg-white/10 text-white'} ${theme.title}`}
        >
          <RotateCcw size={14} />
        </button>
      </div>
    </div>
  );
};

export default ZoomControls;
