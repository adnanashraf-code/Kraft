import React, { useRef, useEffect } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import { THEMES } from '../../utils/themes';
import ZoomControls from './ZoomControls';
import HistoryControls from './HistoryControls';

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
                color: el.color || (isLight ? '#000000' : '#ffffff'),
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

  const [marquee, setMarquee] = React.useState({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });

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

  useEffect(() => {
    if (!marquee.active) return;

    const handleMouseMove = (e) => {
      setMarquee(prev => ({ ...prev, currentX: e.clientX, currentY: e.clientY }));
    };

    const handleMouseUp = (e) => {
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const zoomScale = canvas.zoom / 100;

      // Helper to convert client coords to canvas coords
      const toCanvas = (clientX, clientY) => ({
        x: (clientX - canvasRect.left - canvas.panX) / zoomScale,
        y: (clientY - canvasRect.top - canvas.panY) / zoomScale
      });

      const start = toCanvas(marquee.startX, marquee.startY);
      const end = toCanvas(e.clientX, e.clientY);

      const selRect = {
        left: Math.min(start.x, end.x),
        top: Math.min(start.y, end.y),
        right: Math.max(start.x, end.x),
        bottom: Math.max(start.y, end.y),
      };

      // Intersection logic: bounding box check
      const newlySelected = elements
        .filter(el => {
          if (el.locked) return false;
          const elRect = { left: el.x, top: el.y, right: el.x + el.w, bottom: el.y + el.h };
          return !(
            elRect.left > selRect.right ||
            elRect.right < selRect.left ||
            elRect.top > selRect.bottom ||
            elRect.bottom < selRect.top
          );
        })
        .map(el => el.id);

      if (e.shiftKey) {
        // Toggle/Add to selection
        const currentSelected = new Set(selectedElementIds);
        newlySelected.forEach(id => {
          if (currentSelected.has(id)) currentSelected.delete(id);
          else currentSelected.add(id);
        });
        useEditorStore.setState({ selectedElementIds: Array.from(currentSelected) });
      } else {
        useEditorStore.setState({ selectedElementIds: newlySelected });
      }

      setMarquee({ active: false, startX: 0, startY: 0, currentX: 0, currentY: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [marquee.active, elements, canvas, selectedElementIds]);

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

  const handleCanvasMouseDown = (e) => {
    // Only start if clicking the actual canvas background, not an element
    if (e.target === e.currentTarget) {
      if (!e.shiftKey) clearSelection();
      setMarquee({
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        currentX: e.clientX,
        currentY: e.clientY
      });
    }
  };

  return (
    <div 
      ref={canvasRef}
      className={`relative flex-grow overflow-hidden cursor-crosshair h-full w-full transition-colors duration-500`}
      style={backgroundStyle}
      onMouseDown={handleCanvasMouseDown}
    >
      {/* Visual Marquee Overlay */}
      {marquee.active && (
        <div 
          className="absolute z-50 border border-blue-500 bg-blue-500/10 pointer-events-none"
          style={{
            left: Math.min(marquee.startX, marquee.currentX) - (canvasRef.current?.getBoundingClientRect().left || 0),
            top: Math.min(marquee.startY, marquee.currentY) - (canvasRef.current?.getBoundingClientRect().top || 0),
            width: Math.abs(marquee.startX - marquee.currentX),
            height: Math.abs(marquee.startY - marquee.currentY),
          }}
        />
      )}
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
      <HistoryControls />
    </div>
  );
};

export default Canvas;
