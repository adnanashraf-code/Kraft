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
  
  const binRef = React.useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useEffect(() => {
    if (!isDraggingGlobal) {
      setIsHovered(false);
      return;
    }

    const handleMove = (clientX, clientY) => {
      if (!binRef.current) return;
      const rect = binRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(clientX - centerX, clientY - centerY);
      setIsHovered(distance < 90);
    };

    const handleGlobalMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleGlobalTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, [isDraggingGlobal]);

  if (!isDraggingGlobal && !isHovered) return null;

  return (
    <div 
      ref={binRef}
      id="trash-bin-zone"
      className={`
        fixed bottom-10 z-[100]
        ${isMobile ? 'left-1/2 -translate-x-1/2' : 'right-[340px]'}
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
