import React, { useRef, useEffect } from 'react';
import useEditorStore from '../../store/useEditorStore';
import { useDraggable } from '../../hooks/useDraggable';
import { useResizable } from '../../hooks/useResizable';
import { THEMES } from '../../utils/themes';
import ZoomControls from './ZoomControls';
import HistoryControls from './HistoryControls';
import ArtboardGrid from './ArtboardGrid';

import { resolveIcon, UtilityIcons } from '../../utils/iconUtils';

const DynamicIcon = ({ el, isLight }) => {
  try {
    const defaultColor = isLight ? '#000000' : '#ffffff';
    // If color is too light on a light theme, force it to visible
    let iconColor = el.fill || defaultColor;
    
    const IconObj = resolveIcon(el.iconName || el.name);
    
    if (!IconObj) {
      const AlertIcon = UtilityIcons.AlertCircle;
      return (
        <div className="flex flex-col items-center justify-center w-full h-full opacity-40 select-none border border-dashed border-red-500/20 rounded-lg bg-red-500/5">
          <AlertIcon size="30%" color="#ff4444" />
          <span className="text-[6px] font-black uppercase text-center w-full px-1 truncate" style={{ color: iconColor }}>
            {el.iconName || el.name || 'MISSING'}
          </span>
        </div>
      );
    }

    // Handle Brand Logos (objects with path)
    if (IconObj.type === 'brand') {
      return (
        <div className="w-full h-full p-[15%]" style={{ color: el.fill || (IconObj.hex ? `#${IconObj.hex}` : defaultColor) }}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d={IconObj.path} />
          </svg>
        </div>
      );
    }

    // Standard Component Icons
    const IconComp = IconObj;
    return (
      <div className="w-full h-full p-[10%]" style={{ color: iconColor }}>
        <IconComp size="100%" color="currentColor" strokeWidth={el.strokeWidth || 2.2} />
      </div>
    );
  } catch (err) {
    console.error('Icon Render Error:', err);
    return <div className="w-2 h-2 bg-red-500 rounded-full" />;
  }
};

const DraggableElement = React.memo(({ el, sketchy = false }) => {
  const isSelected = useEditorStore(state => state.selectedElementIds.includes(el.id));
  const uiTheme = useEditorStore(state => state.uiTheme);
  const preferences = useEditorStore(state => state.preferences) || { highFidelity: true };
  const { handleMouseDown, handleTouchStart } = useDraggable(el.id);
  const { handleResizeStart } = useResizable(el.id);
  const library = useEditorStore(state => state.library) || { components: [] };
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
        transform: `rotate(${el.rotation || 0}deg) scale(${el.flipX ? -1 : 1}, ${el.flipY ? -1 : 1})`,
        opacity: el.opacity ?? 1,
        display: el.visible !== false ? 'block' : 'none',
        cursor: el.locked ? 'not-allowed' : (isSelected ? 'default' : 'move'),
        filter: sketchy ? 'url(#sketchy-filter)' : 'none'
      }}
      onMouseDown={el.locked ? undefined : handleMouseDown}
      onTouchStart={el.locked ? undefined : handleTouchStart}
    >
        <div 
          className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden"
          style={{
            borderRadius: el.type === 'circle' ? '50%' : (el.independentRadius 
              ? `${el.borderRadiusTL || 0}px ${el.borderRadiusTR || 0}px ${el.borderRadiusBR || 0}px ${el.borderRadiusBL || 0}px`
              : `${el.borderRadius || 0}px`),
            border: el.strokeWidth ? `${el.strokeWidth}px ${el.strokeStyle || 'solid'} ${el.strokeColor || '#000'}` : 'none',
            boxShadow: (el.shadowEnabled && preferences.highFidelity) ? `${el.shadowOffsetX || 0}px ${el.shadowOffsetY || 4}px ${el.shadowBlur || 10}px ${el.shadowColor || 'rgba(0,0,0,0.15)'}` : 'none',
            background: (el.type === 'rectangle' || el.type === 'circle') ? el.fill : 'transparent',
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

          {el.type === 'image' && (
            <img src={el.src} alt={el.name} className="w-full h-full object-contain pointer-events-none" />
          )}

          {el.type === 'icon' && <DynamicIcon el={el} isLight={isLight} />}
          
          {(el.type === 'logo') && (
            <div className="w-full h-full flex items-center justify-center p-[10%]">
              <svg viewBox="0 0 24 24" className="w-full h-full" fill={el.fill || (isLight ? '#000' : '#fff')}>
                <path d={el.path} />
              </svg>
            </div>
          )}

          {el.type === 'pencil' && (
            <svg className="w-full h-full overflow-visible pointer-events-none">
              <path
                d={`M ${el.points?.map(p => `${p.x},${p.y}`).join(' L ')}`}
                fill="none"
                stroke={el.strokeColor || '#000'}
                strokeWidth={el.strokeWidth || 2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          {(el.type === 'line' || el.type === 'arrow') && (
            <svg className="w-full h-full overflow-visible pointer-events-none">
              <defs>
                <marker
                  id={`arrowhead-${el.id}`}
                  markerWidth="10"
                  markerHeight="7"
                  refX="10"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 10 3.5, 0 7" fill={el.strokeColor || '#000'} />
                </marker>
              </defs>
              <line
                x1={el.startX || 0}
                y1={el.startY || 0}
                x2={el.endX || el.w}
                y2={el.endY || el.h}
                stroke={el.strokeColor || '#000'}
                strokeWidth={el.strokeWidth || 2}
                markerEnd={el.type === 'arrow' ? `url(#arrowhead-${el.id})` : 'none'}
              />
            </svg>
          )}

          {el.type === 'instance' && (() => {
            const comp = library.components.find(c => c.id === el.componentId);
            if (!comp) return <div className="w-full h-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-[8px] text-red-500 font-bold uppercase">Missing Component</div>;
            
            const scaleX = el.w / comp.w;
            const scaleY = el.h / comp.h;

            return (
              <div 
                className="absolute inset-0 origin-top-left"
                style={{ transform: `scale(${scaleX}, ${scaleY})` }}
              >
                {(comp.elements || []).map(compEl => (
                   <div 
                    key={compEl.id}
                    className="absolute"
                    style={{
                      left: compEl.x,
                      top: compEl.y,
                      width: compEl.w,
                      height: compEl.h,
                      background: compEl.fill,
                      borderRadius: compEl.borderRadius,
                      border: compEl.strokeWidth ? `${compEl.strokeWidth}px ${compEl.strokeStyle} ${compEl.strokeColor}` : 'none',
                      opacity: compEl.opacity,
                      overflow: 'hidden'
                    }}
                   >
                     {compEl.type === 'text' && (
                        <span style={{ 
                          fontFamily: compEl.fontFamily, fontSize: compEl.fontSize, fontWeight: compEl.fontWeight, 
                          color: compEl.color, textAlign: compEl.textAlign, width: '100%', height: '100%', display: 'flex'
                        }}>
                          {compEl.content}
                        </span>
                     )}
                   </div>
                ))}
              </div>
            );
          })()}
        </div>

        {isSelected && !el.locked && handles.map((h) => (
          <div
            key={h.dir}
            className="absolute rounded bg-white border border-blue-500 pointer-events-auto shadow-sm z-50"
            style={{ width: 8, height: 8, cursor: h.cursor, ...h.style }}
            onMouseDown={(e) => handleResizeStart(e, h.dir)}
            onTouchStart={(e) => handleResizeStart(e, h.dir)}
          />
        ))}

        {/* Connection Handles (Eraser Style) */}
        {isSelected && !el.locked && (el.type === 'rectangle' || el.type === 'circle') && (
          <>
            {[
              { id: 'top', style: { top: 0, left: '50%', transform: 'translate(-50%, -50%)' } },
              { id: 'bottom', style: { bottom: 0, left: '50%', transform: 'translate(-50%, 50%)' } },
              { id: 'left', style: { left: 0, top: '50%', transform: 'translate(-50%, -50%)' } },
              { id: 'right', style: { right: 0, top: '50%', transform: 'translate(50%, -50%)' } }
            ].map(handle => (
              <div
                key={handle.id}
                className="absolute w-6 h-6 bg-white rounded-full border border-gray-300 shadow-md flex items-center justify-center cursor-pointer hover:scale-110 hover:bg-blue-50 transition-all z-[60] group/conn"
                style={handle.style}
                onClick={(e) => {
                  e.stopPropagation();
                  // In a real implementation, this would trigger a connection logic
                  console.log(`Connect from ${handle.id} of ${el.id}`);
                }}
              >
                <div className="text-black text-lg font-bold leading-none select-none">+</div>
                
                {/* Connection Line Preview on hover could go here */}
              </div>
            ))}
          </>
        )}
    </div>
  );
});

const Canvas = ({ sketchy = false }) => {
  const { 
    pages, activePageId, selectedElementIds, canvas, setZoom, setPan, 
    smartGuides, selectElement, clearSelection, deleteElements, uiTheme 
  } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  const canvasRef = useRef(null);
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
    backgroundColor: isLight ? '#ffffff' : (theme.canvas.includes('[') ? theme.canvas.split('[')[1].split(']')[0] : '#0C0C0C'),
    // Removed grid background for "smooth" feel as requested
    backgroundImage: 'none',
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

    // --- TOUCH ENGINE: Pinch-to-Zoom & Panning ---
    let initialPinchDist = 0;
    let initialPinchZoom = canvas.zoom;
    let lastTouchX = 0;
    let lastTouchY = 0;
    let isPinching = false;

    const handleTouchStart = (e) => {
      if (e.touches.length === 2) {
        isPinching = true;
        initialPinchDist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        initialPinchZoom = canvas.zoom;
      } else if (e.touches.length === 1) {
        isPinching = false;
        lastTouchX = e.touches[0].pageX;
        lastTouchY = e.touches[0].pageY;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2 && isPinching) {
        e.preventDefault();
        const dist = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        if (initialPinchDist > 0) {
          const scale = dist / initialPinchDist;
          // Faster zoom: use a power or multiplier if needed, but scale should be fine
          const newZoom = Math.max(10, Math.min(500, initialPinchZoom * scale));
          setZoom(newZoom);
        }
      } else if (e.touches.length === 1 && !isPinching) {
        // One-finger Panning
        if (e.target === canvasEl || canvasEl.contains(e.target)) {
           // Only pan if we're not dragging an element
           // The element dragging is handled separately by useDraggable's onTouchMove
           // But here we can handle background panning
           if (e.target === canvasEl) {
             const dx = e.touches[0].pageX - lastTouchX;
             const dy = e.touches[0].pageY - lastTouchY;
             setPan(canvas.panX + dx, canvas.panY + dy);
             lastTouchX = e.touches[0].pageX;
             lastTouchY = e.touches[0].pageY;
           }
        }
      }
    };

    const handleTouchEnd = () => {
      isPinching = false;
      initialPinchDist = 0;
    };

    // Use non-passive listener to allow preventDefault()
    canvasEl.addEventListener('wheel', handleWheelRaw, { passive: false });
    canvasEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvasEl.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvasEl.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      canvasEl.removeEventListener('wheel', handleWheelRaw);
      canvasEl.removeEventListener('touchstart', handleTouchStart);
      canvasEl.removeEventListener('touchmove', handleTouchMove);
      canvasEl.removeEventListener('touchend', handleTouchEnd);
    };
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
            <DraggableElement el={el} sketchy={sketchy} />
          </div>
        ))}

        <ArtboardGrid grids={activePage.layoutGrids} />

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
      
      {isMobile ? null : <ZoomControls />}
      <HistoryControls />

      {/* Eraser.io Sketchy Filter */}
      <svg className="absolute w-0 h-0 pointer-events-none overflow-hidden">
        <filter id="sketchy-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
        </filter>
      </svg>
    </div>
  );
};

export default Canvas;
