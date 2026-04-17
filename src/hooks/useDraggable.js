import { useRef, useEffect } from 'react';
import useEditorStore from '../store/useEditorStore';

/**
 * Hook to make an element draggable on the canvas
 * @param {string} id - The ID of the element
 * @returns {object} { isDragging, handleMouseDown }
 */
export const useDraggable = (id) => {
  const { updateElement, pages, activePageId, selectElement, deleteElements, setDraggingGlobal } = useEditorStore();
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;
  
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const originalPos = useRef({ x: 0, y: 0 });

  const groupOriginalPos = useRef({});

  const handleMouseDown = (e) => {
    // Only left click
    if (e.button !== 0) return;
    
    e.stopPropagation();
    
    // Auto-select on drag start if NOT already selected
    const state = useEditorStore.getState();
    const curActivePage = state.pages.find(p => p.id === state.activePageId) || state.pages[0];
    const curElements = curActivePage.elements;

    if (!state.selectedElementIds.includes(id)) {
      selectElement(id);
    }

    const { selectedElementIds } = useEditorStore.getState();
    const el = curElements.find(e => e.id === id);
    if (!el || el.locked) return;

    isDragging.current = true;
    setDraggingGlobal(true);
    startPos.current = { x: e.clientX, y: e.clientY };
    originalPos.current = { x: el.x, y: el.y };
    
    // Store original positions for the entire selection group
    const initialPositions = {};
    selectedElementIds.forEach(selId => {
      const selectedEl = curElements.find(e => e.id === selId);
      if (selectedEl) {
        initialPositions[selId] = { x: selectedEl.x, y: selectedEl.y };
      }
    });
    groupOriginalPos.current = initialPositions;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    
    const state = useEditorStore.getState();
    const zoom = state.canvas.zoom / 100;

    const dx = (e.clientX - startPos.current.x) / zoom;
    const dy = (e.clientY - startPos.current.y) / zoom;

    // --- SNAPPING LOGIC (Primary element only) ---
    let newX = originalPos.current.x + dx;
    let newY = originalPos.current.y + dy;
    
    if (e.shiftKey) {
      const snap = state.canvas.gridSnap;
      newX = Math.round(newX / snap) * snap;
      newY = Math.round(newY / snap) * snap;
    }

    let finalX = newX;
    let finalY = newY;
    const guides = [];
    const SNAP_THRESHOLD = 5;
    
    if (!e.shiftKey) {
      const curActivePage = state.pages.find(p => p.id === state.activePageId) || state.pages[0];
      const curElements = curActivePage.elements;
      const otherElements = curElements.filter(e => !state.selectedElementIds.includes(e.id) && e.visible);
      const el = curElements.find(e => e.id === id);
      
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

        if (Math.abs(tLeft - oLeft) < SNAP_THRESHOLD) { finalX = oLeft; guides.push({ axis: 'x', pos: oLeft }); }
        else if (Math.abs(tLeft - oRight) < SNAP_THRESHOLD) { finalX = oRight; guides.push({ axis: 'x', pos: oRight }); }
        else if (Math.abs(tCenter - oCenter) < SNAP_THRESHOLD) { finalX = oCenter - targetW / 2; guides.push({ axis: 'x', pos: oCenter }); }
        else if (Math.abs(tRight - oLeft) < SNAP_THRESHOLD) { finalX = oLeft - targetW; guides.push({ axis: 'x', pos: oLeft }); }
        else if (Math.abs(tRight - oRight) < SNAP_THRESHOLD) { finalX = oRight - targetW; guides.push({ axis: 'x', pos: oRight }); }

        if (Math.abs(tTop - oTop) < SNAP_THRESHOLD) { finalY = oTop; guides.push({ axis: 'y', pos: oTop }); }
        else if (Math.abs(tTop - oBottom) < SNAP_THRESHOLD) { finalY = oBottom; guides.push({ axis: 'y', pos: oBottom }); }
        else if (Math.abs(tMiddle - oMiddle) < SNAP_THRESHOLD) { finalY = oMiddle - targetH / 2; guides.push({ axis: 'y', pos: oMiddle }); }
        else if (Math.abs(tBottom - oTop) < SNAP_THRESHOLD) { finalY = oTop - targetH; guides.push({ axis: 'y', pos: oTop }); }
        else if (Math.abs(tBottom - oBottom) < SNAP_THRESHOLD) { finalY = oBottom - targetH; guides.push({ axis: 'y', pos: oBottom }); }
      }
    }
    
    state.setSmartGuides(guides);

    // Apply the exact final movements to ALL selected elements
    const actualDx = finalX - originalPos.current.x;
    const actualDy = finalY - originalPos.current.y;

    Object.keys(groupOriginalPos.current).forEach(selId => {
      const startPos = groupOriginalPos.current[selId];
      updateElement(selId, { 
        x: startPos.x + actualDx, 
        y: startPos.y + actualDy 
      });
    });
  };

  const handleMouseUp = (e) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setDraggingGlobal(false);
    
    // DELETE ZONE DETECTION
    const trashCenterX = window.innerWidth - 372;
    const trashCenterY = window.innerHeight - 72;
    const distToTrash = Math.hypot(e.clientX - trashCenterX, e.clientY - trashCenterY);

    if (distToTrash < 90) {
      const { selectedElementIds } = useEditorStore.getState();
      deleteElements(selectedElementIds.includes(id) ? selectedElementIds : [id]);
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
