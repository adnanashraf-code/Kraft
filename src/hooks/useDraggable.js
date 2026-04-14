import { useRef, useEffect } from 'react';
import useEditorStore from '../store/useEditorStore';

/**
 * Hook to make an element draggable on the canvas
 * @param {string} id - The ID of the element
 * @returns {object} { isDragging, handleMouseDown }
 */
export const useDraggable = (id) => {
  const { updateElement, elements, selectElement, deleteElements, setDraggingGlobal } = useEditorStore();
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const originalPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    // Only left click
    if (e.button !== 0) return;
    
    e.stopPropagation();
    
    // Auto-select on drag start
    selectElement(id);

    const el = elements.find(e => e.id === id);
    if (!el || el.locked) return;

    isDragging.current = true;
    setDraggingGlobal(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    originalPos.current = { x: el.x, y: el.y };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    // We get the zoom level to scale the drag distance correctly
    const zoom = useEditorStore.getState().canvas.zoom / 100;

    const dx = (e.clientX - startPos.current.x) / zoom;
    const dy = (e.clientY - startPos.current.y) / zoom;

    // Optional: Snap to grid if shift key is held (simple implementation)
    let newX = originalPos.current.x + dx;
    let newY = originalPos.current.y + dy;
    
    if (e.shiftKey) {
      const snap = useEditorStore.getState().canvas.gridSnap;
      newX = Math.round(newX / snap) * snap;
      newY = Math.round(newY / snap) * snap;
    }

    // High performance update directly to store without causing whole app re-renders
    // --- SMART GUIDES LOGIC ---
    let finalX = newX;
    let finalY = newY;
    const guides = [];
    const SNAP_THRESHOLD = 5;
    
    // Only snap if shift is NOT held (shift forces grid snap)
    if (!e.shiftKey) {
      const state = useEditorStore.getState();
      const otherElements = state.elements.filter(e => !state.selectedElementIds.includes(e.id) && e.visible);
      const el = state.elements.find(e => e.id === id);
      
      const targetW = el.w;
      const targetH = el.h;
      
      const tLeft = newX;
      const tCenter = newX + targetW / 2;
      const tRight = newX + targetW;
      
      const tTop = newY;
      const tMiddle = newY + targetH / 2;
      const tBottom = newY + targetH;

      for (const other of otherElements) {
        const oLeft = other.x;
        const oCenter = other.x + other.w / 2;
        const oRight = other.x + other.w;
        
        const oTop = other.y;
        const oMiddle = other.y + other.h / 2;
        const oBottom = other.y + other.h;

        // X Axis Snapping
        if (Math.abs(tLeft - oLeft) < SNAP_THRESHOLD) { finalX = oLeft; guides.push({ axis: 'x', pos: oLeft }); }
        else if (Math.abs(tLeft - oRight) < SNAP_THRESHOLD) { finalX = oRight; guides.push({ axis: 'x', pos: oRight }); }
        else if (Math.abs(tCenter - oCenter) < SNAP_THRESHOLD) { finalX = oCenter - targetW / 2; guides.push({ axis: 'x', pos: oCenter }); }
        else if (Math.abs(tRight - oLeft) < SNAP_THRESHOLD) { finalX = oLeft - targetW; guides.push({ axis: 'x', pos: oLeft }); }
        else if (Math.abs(tRight - oRight) < SNAP_THRESHOLD) { finalX = oRight - targetW; guides.push({ axis: 'x', pos: oRight }); }

        // Y Axis Snapping
        if (Math.abs(tTop - oTop) < SNAP_THRESHOLD) { finalY = oTop; guides.push({ axis: 'y', pos: oTop }); }
        else if (Math.abs(tTop - oBottom) < SNAP_THRESHOLD) { finalY = oBottom; guides.push({ axis: 'y', pos: oBottom }); }
        else if (Math.abs(tMiddle - oMiddle) < SNAP_THRESHOLD) { finalY = oMiddle - targetH / 2; guides.push({ axis: 'y', pos: oMiddle }); }
        else if (Math.abs(tBottom - oTop) < SNAP_THRESHOLD) { finalY = oTop - targetH; guides.push({ axis: 'y', pos: oTop }); }
        else if (Math.abs(tBottom - oBottom) < SNAP_THRESHOLD) { finalY = oBottom - targetH; guides.push({ axis: 'y', pos: oBottom }); }
      }
    }
    
    useEditorStore.getState().setSmartGuides(guides);
    updateElement(id, { x: finalX, y: finalY });
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDraggingGlobal(false);
    
    // DELETE ZONE DETECTION
    // If released in bottom-center area (Trash Bin zone)
    const thresholdY = window.innerHeight - 100;
    const centerX = window.innerWidth / 2;
    const rangeX = 150; // 300px total width zone

    if (e.clientY > thresholdY && Math.abs(e.clientX - centerX) < rangeX) {
      deleteElements([id]);
    }

    useEditorStore.getState().setSmartGuides([]);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Cleanup just in case component unmounts while dragging
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return {
    handleMouseDown,
    isDragging: isDragging.current
  };
};
