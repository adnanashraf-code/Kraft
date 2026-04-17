import { useState, useCallback } from 'react';
import useEditorStore from '../store/useEditorStore';

export const useResizable = (id) => {
  const { pages, activePageId, updateElement } = useEditorStore();
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  const element = elements.find(el => el.id === id);

  const onResizeStart = useCallback((e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = element.w;
    const startH = element.h;
    const startXPos = element.x;
    const startYPos = element.y;
    const aspectRatio = startW / startH;
    const isLocked = element.aspectRatioLocked || e.shiftKey;

    const onMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newW = startW;
      let newH = startH;
      let newX = startXPos;
      let newY = startYPos;

      // Handle individual directions
      if (direction.includes('e')) newW = Math.max(10, startW + deltaX);
      if (direction.includes('w')) {
        newW = Math.max(10, startW - deltaX);
        newX = startXPos + (startW - newW);
      }
      if (direction.includes('s')) newH = Math.max(10, startH + deltaY);
      if (direction.includes('n')) {
        newH = Math.max(10, startH - deltaY);
        newY = startYPos + (startH - newH);
      }

      // Enforce Aspect Ratio
      if (isLocked) {
        if (direction === 'e' || direction === 'w' || Math.abs(deltaX) > Math.abs(deltaY)) {
          newH = newW / aspectRatio;
          if (direction.includes('n')) newY = startYPos + (startH - newH);
        } else {
          newW = newH * aspectRatio;
          if (direction.includes('w')) newX = startXPos + (startW - newW);
        }
      }

      updateElement(id, { w: newW, h: newH, x: newX, y: newY });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [element, id, updateElement]);

  return { onResizeStart };
};
