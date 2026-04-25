import { useState, useCallback } from 'react';
import useEditorStore from '../store/useEditorStore';

export const useResizable = (id) => {
  const { pages, activePageId, updateElement } = useEditorStore();
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  const element = elements.find(el => el.id === id);

  const handleResizeStart = useCallback((e, direction) => {
    e.preventDefault();
    e.stopPropagation();

    const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;
    const startW = element.w;
    const startH = element.h;
    const startXPos = element.x;
    const startYPos = element.y;
    const aspectRatio = startW / startH;
    const isLocked = element.aspectRatioLocked || e.shiftKey;

    const onMove = (moveEvent) => {
      const moveX = moveEvent.type.startsWith('touch') ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const moveY = moveEvent.type.startsWith('touch') ? moveEvent.touches[0].clientY : moveEvent.clientY;
      
      const deltaX = moveX - startX;
      const deltaY = moveY - startY;
      
      const zoom = useEditorStore.getState().canvas.zoom / 100;
      const zDeltaX = deltaX / zoom;
      const zDeltaY = deltaY / zoom;

      let newW = startW;
      let newH = startH;
      let newX = startXPos;
      let newY = startYPos;

      if (direction.includes('e')) newW = Math.max(10, startW + zDeltaX);
      if (direction.includes('w')) {
        newW = Math.max(10, startW - zDeltaX);
        newX = startXPos + (startW - newW);
      }
      if (direction.includes('s')) newH = Math.max(10, startH + zDeltaY);
      if (direction.includes('n')) {
        newH = Math.max(10, startH - zDeltaY);
        newY = startYPos + (startH - newH);
      }

      if (isLocked) {
        if (direction === 'e' || direction === 'w' || Math.abs(zDeltaX) > Math.abs(zDeltaY)) {
          newH = newW / aspectRatio;
          if (direction.includes('n')) newY = startYPos + (startH - newH);
        } else {
          newW = newH * aspectRatio;
          if (direction.includes('w')) newX = startXPos + (startW - newW);
        }
      }

      updateElement(id, { w: newW, h: newH, x: newX, y: newY });
    };

    const onEnd = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  }, [element, id, updateElement]);

  return { handleResizeStart };
};
