import React, { useRef, useEffect } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import { THEMES } from '../../utils/themes';
import ZoomControls from './ZoomControls';

const DraggableElement = React.memo(({ el }) => {
  const isSelected = useEditorStore(state => state.selectedElementIds.includes(el.id));
  const uiTheme = useEditorStore(state => state.uiTheme);
  const { handleMouseDown } = useDraggable(el.id);
  const { onResizeStart } = useResizable(el.id);
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  const handles = [
    { dir: 'nw', cursor: 'nwse-resize', style: { top: -4, left: -4 } },
    { dir: 'n', cursor: 'ns-resize', style: { top: -4, left: '50%', marginLeft: -4 } },
    { dir: 'ne', cursor: 'nesw-resize', style: { top: -4, right: -4 } },
    { dir: 'e', cursor: 'ew-resize', style: { top: '50%', right: -4, marginTop: -4 } },
    { dir: 'se', cursor: 'nwse-resize', style: { bottom: -4, right: -4 } },
    { dir: 's', cursor: 'ns-resize', style: { bottom: -4, left: '50%', marginLeft: -4 } },
    { dir: 'sw', cursor: 'nesw-resize', style: { bottom: -4, left: -4 } },
    { dir: 'w', cursor: 'ew-resize', style: { top: '50%', left: -4, marginTop: -4 } },
  ];

  return (
    <div
      className={`absolute border-2 ${isSelected ? 'border-blue-500 z-10' : 'border-transparent'}`}
      style={{
        left: `${el.x}px`,
        top: `${el.y}px`,
        width: `${el.w}px`,
        height: `${el.h}px`,
        transform: `rotate(${el.rotation || 0}deg)`,
        opacity: el.opacity,
        display: el.visible ? 'block' : 'none',
        cursor: el.locked ? 'not-allowed' : (isSelected ? 'default' : 'move')
      }}
      onMouseDown={el.locked ? undefined : handleMouseDown}
    >
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: `${el.borderRadius || 0}px`,
            border: el.strokeWidth ? `${el.strokeWidth}px ${el.strokeStyle || 'solid'} ${el.strokeColor || '#000'}` : 'none',
            boxShadow: el.shadowEnabled ? `${el.shadowOffsetX || 0}px ${el.shadowOffsetY || 4}px ${el.shadowBlur || 10}px ${el.shadowColor || 'rgba(0,0,0,0.15)'}` : 'none',
            background: el.type === 'rectangle' ? el.fill : 'transparent',
            clipPath: el.clipPath || 'none'
          }}
        >
          {el.type === 'text' && (
            <span 
              className="p-1 block w-full h-full" 
              style={{ 
                fontFamily: el.fontFamily || 'Inter', 
                fontSize: `${el.fontSize || 24}px`,
                fontWeight: el.fontWeight || '400',
                textAlign: el.textAlign || 'left',
                color: el.color || (el.fill === 'transparent' ? (isLight ? '#000' : '#fff') : el.fill),
                lineHeight: el.lineHeight || 1.5,
                letterSpacing: `${el.letterSpacing || 0}px`,
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap'
              }}
            >
              {el.content || 'Text'}
            </span>
          )}
        </div>

        {isSelected && !el.locked && handles.map((h) => (
          <div
            key={h.dir}
            className="absolute rounded bg-white border border-blue-500 pointer-events-auto shadow-sm"
            style={{ width: 8, height: 8, cursor: h.cursor, ...h.style }}
            onMouseDown={(e) => onResizeStart(e, h.dir)}
          />
        ))}
    </div>
  );
});

const Canvas = () => {
  const { 
    elements, selectedElementIds, canvas, setZoom, setPan, 
    smartGuides, selectElement, clearSelection, deleteElements, uiTheme 
  } = useEditorStore();
  const canvasRef = useRef(null);
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElementIds.length > 0) {
        deleteElements(selectedElementIds);
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        if (selectedElementIds.length > 0) {
          useEditorStore.getState().duplicateElements(selectedElementIds);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementIds, deleteElements]);

  const backgroundStyle = {
    backgroundColor: isLight ? '#ffffff' : (theme.canvas.includes('[') ? theme.canvas.split('[')[1].split(']')[0] : '#000'),
    backgroundImage: `radial-gradient(${theme.grid} 1px, transparent 1px)`,
    backgroundSize: `${canvas.gridSnap}px ${canvas.gridSnap}px`,
    backgroundPosition: `${canvas.panX}px ${canvas.panY}px`,
  };

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const handleWheelRaw = (e) => {
      // Prevent browser zoom and page scroll
      e.preventDefault();
      
      // Calculate zoom increment
      const delta = e.deltaY > 0 ? -10 : 10;
      setZoom(canvas.zoom + delta);
    };

    // Use non-passive listener to allow preventDefault()
    canvasEl.addEventListener('wheel', handleWheelRaw, { passive: false });
    return () => canvasEl.removeEventListener('wheel', handleWheelRaw);
  }, [canvas.zoom, setZoom]);

  const handleCanvasClick = (e) => {
    // Only clear if clicking the actual canvas background, not an element
    if (e.target === e.currentTarget) {
      clearSelection();
    }
  };

  return (
    <div 
      ref={canvasRef}
      className={`relative flex-grow overflow-hidden cursor-crosshair h-full w-full transition-colors duration-500`}
      style={backgroundStyle}
      onMouseDown={handleCanvasClick}
    >
      <div
        className="absolute origin-top-left touch-none"
        style={{
          transform: `translate(${canvas.panX}px, ${canvas.panY}px) scale(${canvas.zoom / 100})`,
          width: '100%',
          height: '100%'
        }}
      >
        {elements.map((el) => (
          <div 
            key={el.id}
            onContextMenu={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (!selectedElementIds.includes(el.id)) {
                selectElement(el.id);
              }
              useEditorStore.getState().openContextMenu(e.clientX, e.clientY, el.id);
            }}
          >
            <DraggableElement el={el} />
          </div>
        ))}

        {smartGuides.map((guide, i) => (
          <div
            key={i}
            className="absolute bg-blue-500 pointer-events-none z-20 opacity-50"
            style={{
              ...(guide.axis === 'x' 
                ? { left: guide.pos, top: -10000, bottom: -10000, width: 1.5 } 
                : { top: guide.pos, left: -10000, right: -10000, height: 1.5 }
              )
            }}
          />
        ))}
      </div>
      
      <ZoomControls />
    </div>
  );
};

export default Canvas;
