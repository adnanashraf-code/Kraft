import React from 'react';
import useEditorStore from '../../../store/useEditorStore';

const TemplateThumbnail = ({ template, scale = 0.16 }) => {
  if (!template || !template.elements) return null;

  // We find the bounds to center it if needed, but for now we assume a standard 1000x700 canvas
  const canvasWidth = 1000;
  const canvasHeight = 700;

  return (
    <div 
      className="relative overflow-hidden bg-gray-50 bg-dot-pattern"
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: template.elements[0]?.fill?.startsWith('#') ? template.elements[0].fill : '#ffffff'
      }}
    >
      <div 
        className="absolute origin-top-left pointer-events-none"
        style={{
          transform: `scale(${scale})`,
          width: canvasWidth,
          height: canvasHeight,
          // Center the scaled content
          left: '50%',
          top: '50%',
          marginLeft: -(canvasWidth * scale) / 2,
          marginTop: -(canvasHeight * scale) / 2,
        }}
      >
        {template.elements.map((el, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: el.x,
              top: el.y,
              width: el.w,
              height: el.h,
              background: el.fill || '#ddd',
              borderRadius: el.borderRadius || 0,
              opacity: el.opacity || 1,
              border: el.border || 'none',
              boxShadow: el.shadowEnabled ? '0 10px 20px rgba(0,0,0,0.1)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: el.textAlign || 'center',
              overflow: 'hidden',
              padding: '0 4px'
            }}
          >
            {el.type === 'text' && (
              <span 
                style={{
                  fontSize: el.fontSize,
                  fontWeight: el.fontWeight,
                  color: el.color || '#000',
                  fontFamily: el.fontFamily || 'Inter',
                  lineHeight: el.lineHeight || 1.1,
                  display: 'block',
                  width: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {el.content}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateThumbnail;
