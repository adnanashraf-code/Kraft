import React, { useState, useEffect, useMemo } from 'react';
import useEditorStore from '../../store/useEditorStore';

const RULER_SIZE = 24;

const Ruler = ({ type, zoom, pan, isLight, theme }) => {
  const [mousePos, setMousePos] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.getElementById(`ruler-${type}`).getBoundingClientRect();
      const pos = type === 'horizontal' ? e.clientX - rect.left : e.clientY - rect.top;
      setMousePos(pos);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [type]);

  const ticks = useMemo(() => {
    const tickItems = [];
    const scale = zoom / 100;
    const interval = 100 * scale;
    const smallInterval = 10 * scale;
    
    // Start/End points to cover visible area
    const startOffset = -pan % interval;
    const count = 300; // Enough to cover large screens

    for (let i = -count; i < count; i++) {
        const pos = (i * smallInterval) + (pan % interval);
        const isMajor = i % 10 === 0;
        const isMidi = i % 5 === 0;
        
        let height = 4;
        if (isMajor) height = 12;
        else if (isMidi) height = 8;

        // Label only for major ticks
        let label = null;
        if (isMajor) {
            const val = Math.round((i * 10 - pan) / (zoom/100));
            label = <text x={pos + 4} y={10} fontSize="8" fill={isLight ? "#999" : "#666"} pointerEvents="none">{val}</text>;
        }

        tickItems.push(
            <React.Fragment key={i}>
                <line 
                    x1={type === 'horizontal' ? pos : 0} 
                    y1={type === 'horizontal' ? (RULER_SIZE - height) : pos} 
                    x2={type === 'horizontal' ? pos : height} 
                    y2={type === 'horizontal' ? RULER_SIZE : pos} 
                    stroke={isLight ? "#ddd" : "#333"} 
                    strokeWidth="1"
                />
                {type === 'horizontal' && label}
            </React.Fragment>
        );
    }
    return tickItems;
  }, [zoom, pan, type, isLight]);

  return (
    <div 
        id={`ruler-${type}`}
        className={`absolute z-[40] ${type === 'horizontal' ? 'w-full h-6 left-6 top-0 border-b' : 'h-full w-6 left-0 top-6 border-r'} ${isLight ? 'bg-white border-gray-100' : 'bg-[#0f0f0f] border-white/5'}`}
    >
      <svg className="w-full h-full">
        {ticks}
        {/* Cursor Indicator */}
        <line 
            x1={type === 'horizontal' ? mousePos : 0}
            y1={type === 'horizontal' ? 0 : mousePos}
            x2={type === 'horizontal' ? mousePos : RULER_SIZE}
            y2={type === 'horizontal' ? RULER_SIZE : mousePos}
            stroke="#3b82f6"
            strokeWidth="1"
        />
      </svg>
    </div>
  );
};

export const HorizontalRuler = () => {
  const { canvas, uiTheme } = useEditorStore();
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (!canvas.isRulersVisible || isMobile) return null;
  return <Ruler type="horizontal" zoom={canvas.zoom} pan={canvas.panX} isLight={isLight} />;
};

export const VerticalRuler = () => {
  const { canvas, uiTheme } = useEditorStore();
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (!canvas.isRulersVisible || isMobile) return null;
  return <Ruler type="vertical" zoom={canvas.zoom} pan={canvas.panY} isLight={isLight} />;
};

export const RulerCorner = () => {
    const { canvas, uiTheme } = useEditorStore();
    const isLight = uiTheme === 'light' || uiTheme === 'gray';
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (!canvas.isRulersVisible || isMobile) return null;
    return (
        <div className={`absolute left-0 top-0 w-6 h-6 z-[50] border-r border-b ${isLight ? 'bg-white border-gray-100' : 'bg-[#0f0f0f] border-white/5'}`} />
    );
};
