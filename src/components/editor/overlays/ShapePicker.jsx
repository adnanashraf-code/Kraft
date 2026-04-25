import React from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { ASSETS } from '../../../data/assetsData';
import { X } from 'lucide-react';
import { THEMES } from '../../../utils/themes';

const ShapePicker = () => {
  const { isShapePickerOpen, setShapePickerOpen, addElement, uiTheme } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  if (!isShapePickerOpen) return null;

  const basicShapes = ASSETS.find(cat => cat.category === 'Basic Shapes')?.items || [];

  const handleSelectShape = (shape) => {
    const { canvas } = useEditorStore.getState();
    const zoomScale = (canvas.zoom || 100) / 100;
    
    // Use the actual canvas container size if possible, otherwise viewport
    const container = document.getElementById('canvas-container');
    const width = container ? container.clientWidth : window.innerWidth;
    const height = container ? container.clientHeight : window.innerHeight;
    
    const centerX = (-canvas.panX + (width / 2)) / zoomScale;
    const centerY = (-canvas.panY + (height / 2)) / zoomScale;

    console.log('Adding shape at:', { centerX, centerY, panX: canvas.panX, zoom: canvas.zoom });

    addElement({
      ...shape,
      x: centerX - (shape.w || 100) / 2,
      y: centerY - (shape.h || 100) / 2,
      fill: isLight ? '#3b82f6' : '#60a5fa'
    });
    setShapePickerOpen(false);
  };

  return (
    <div className={`
      fixed md:absolute 
      inset-x-4 top-1/2 -translate-y-1/2 md:translate-y-0
      md:left-20 md:top-32 md:inset-x-auto
      w-auto md:w-64 ${theme.sidebar} border ${theme.border} 
      rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col 
      animate-in fade-in zoom-in-95 duration-200
    `}>
      <div className={`p-4 border-b ${theme.border} flex items-center justify-between`}>
        <span className={`text-sm font-bold uppercase tracking-widest ${theme.text}`}>Shapes</span>
        <button 
          onClick={() => setShapePickerOpen(false)}
          className={`p-1 rounded-lg hover:${isLight ? 'bg-gray-100' : 'bg-white/10'} transition-colors`}
        >
          <X size={16} className={theme.text} />
        </button>
      </div>

      <div className="p-3 grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        {basicShapes.map((shape, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectShape(shape)}
            title={shape.name}
            className={`
              aspect-square rounded-xl border-2 border-transparent 
              hover:border-blue-500 hover:bg-blue-50/10 transition-all 
              flex items-center justify-center group relative
            `}
          >
            <div 
              className="w-8 h-8 bg-gray-400 group-hover:bg-blue-500 transition-colors shadow-sm"
              style={{ 
                clipPath: shape.clipPath, 
                borderRadius: shape.borderRadius ? `${shape.borderRadius}px` : '0px'
              }}
            />
          </button>
        ))}
      </div>
      
      <div className={`p-3 bg-opacity-50 ${theme.sidebar} border-t ${theme.border}`}>
        <p className="text-[10px] text-gray-400 uppercase tracking-tight text-center">Click to add to canvas</p>
      </div>
    </div>
  );
};

export default ShapePicker;
