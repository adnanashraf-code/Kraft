import React, { useState, useEffect } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Trash2 } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const TrashBin = () => {
  const { isDraggingGlobal, uiTheme } = useEditorStore();
  const [isHovered, setIsHovered] = useState(false);
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  // We detect hover manually because the dragging element might block mouse events on the bin itself
  // depending on how the browser handles drag-over. 
  // However, since we're using custom global mouse events in useDraggable, 
  // we can just use a simple mouse move listener here or trust the coordinates.
  
  useEffect(() => {
    if (!isDraggingGlobal) {
      setIsHovered(false);
      return;
    }

    const handleGlobalMove = (e) => {
      const centerX = window.innerWidth - 372; // Adjusted for right-[340px] and w-16
      const centerY = window.innerHeight - 72; // Adjusted for bottom-10 and h-16
      
      const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (distance < 90) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleGlobalMove);
    return () => window.removeEventListener('mousemove', handleGlobalMove);
  }, [isDraggingGlobal]);

  if (!isDraggingGlobal && !isHovered) return null;

  return (
    <div 
      className={`
        fixed bottom-10 right-[340px] z-[100]
        flex flex-col items-center justify-center
        transition-all duration-500 ease-out
        ${isDraggingGlobal ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-90'}
      `}
    >
      <div 
        className={`
          relative flex items-center justify-center w-16 h-16 rounded-full border-[3px]
          transition-all duration-300
          ${isHovered 
            ? 'bg-red-500 border-red-600 scale-110 shadow-[0_0_40px_rgba(239,68,68,0.4)]' 
            : `${isLight ? 'bg-white border-gray-200 shadow-xl' : 'bg-[#1a1a1a] border-white/10 shadow-2xl'} scale-100`
          }
        `}
      >
        {/* Dynamic Glowing Rings when hovered */}
        {isHovered && (
          <>
            <div className="absolute inset-0 rounded-full animate-ping bg-red-500/20" />
            <div className="absolute -inset-4 rounded-full border-2 border-red-500/10 animate-pulse" />
          </>
        )}

        <Trash2 
          size={24} 
          className={`transition-all duration-300 ${isHovered ? 'text-white scale-125 rotate-12' : 'text-red-500'}`} 
        />
      </div>
      
      <div className={`
        mt-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]
        transition-all duration-300
        ${isHovered ? 'bg-red-600 text-white translate-y-1' : `${isLight ? 'bg-gray-100 text-gray-400' : 'bg-white/5 text-white/20'}`}
      `}>
        {isHovered ? 'Release to Delete' : 'Drop here to remove'}
      </div>
    </div>
  );
};

export default TrashBin;
