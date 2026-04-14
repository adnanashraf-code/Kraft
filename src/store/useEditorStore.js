import { create } from 'zustand';

const useEditorStore = create((set, get) => ({
  // --- STATE ---
  elements: [], // Array of element objects
  selectedElementIds: [], // IDs of currently selected elements
  
  canvas: {
    zoom: 100, // Percentage
    panX: 0,
    panY: 0,
    gridSnap: 20, // 20px snapping
  },
  smartGuides: [], // Array of { axis: 'x'|'y', pos: number }
  
  contextMenu: {
    isOpen: false,
    x: 0,
    y: 0,
    targetId: null
  },

  uiTheme: 'light', // 'dark', 'medium', 'gray', 'light'
  isSearchOpen: false,
  isSettingsOpen: false,
  activeFlyout: 'none', // 'none', 'templates', 'assets'
  isTemplatesOpen: false,
  isAssetsOpen: false,
  isDraggingGlobal: false,
  searchQuery: '',

  // --- ACTIONS: UI & Theme ---
  setUiTheme: (theme) => set({ uiTheme: theme }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setTemplatesOpen: (open) => set({ isTemplatesOpen: open }),
  setAssetsOpen: (open) => set({ isAssetsOpen: open }),
  setDraggingGlobal: (dragging) => set({ isDraggingGlobal: dragging }),
  setFlyout: (type) => set((state) => ({ 
    activeFlyout: state.activeFlyout === type ? 'none' : type 
  })),
  
  // Add a new element to the canvas
  addElement: (element) => set((state) => {
    // Determine default sizing based on type
    let defaultW = element.type === 'text' ? 200 : 100;
    let defaultH = element.type === 'text' ? 40 : 100;
    
    return {
      elements: [...state.elements, {
        id: (typeof window !== 'undefined' && window.crypto?.randomUUID) 
          ? window.crypto.randomUUID() 
          : Math.random().toString(36).substring(2, 11),
        name: element.name || (element.type === 'text' ? 'Text' : 'Rectangle'),
        // Core defaults
        type: 'rectangle', 
        x: 0, y: 0, 
        w: defaultW, h: defaultH,
        rotation: 0,
        fill: element.type === 'text' ? 'transparent' : '#D1E8E2',
        opacity: 1,
        visible: true,
        locked: false,
        
        // Advanced Design Defaults
        strokeColor: '#000000',
        strokeWidth: 0, // 0 means no stroke
        strokeStyle: 'solid',
        borderRadius: 0,
        shadowEnabled: false,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.15)',
        aspectRatioLocked: false,

        // Text specific defaults
        ...(element.type === 'text' && {
          fontFamily: 'Inter',
          fontWeight: '400',
          fontSize: 24,
          textAlign: 'left',
          color: '#000000', // Separate text color
          lineHeight: 1.5,
          letterSpacing: 0,
          textTransform: 'none', // none, uppercase, lowercase, capitalize
          textDecoration: 'none', // none, underline, line-through
          fontStyle: 'normal' // normal, italic
        }),
        ...element
      }],
      // Auto-select the newly created element
      selectedElementIds: [element.id || state.elements.length.toString()] 
    };
  }),

  // Update properties of a specific element
  updateElement: (id, updates) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    )
  })),

  // Delete elements by their IDs
  deleteElements: (ids) => set((state) => ({
    elements: state.elements.filter(el => !ids.includes(el.id)),
    // Remove from selection if they were selected
    selectedElementIds: state.selectedElementIds.filter(id => !ids.includes(id))
  })),

  // Duplicate elements by their IDs
  duplicateElements: (ids) => set((state) => {
    const elementsToDuplicate = state.elements.filter(el => ids.includes(el.id));
    const newElements = elementsToDuplicate.map(el => ({
      ...el,
      id: (typeof window !== 'undefined' && window.crypto?.randomUUID) 
        ? window.crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 11),
      name: `${el.name} (Copy)`,
      x: el.x + 20, // Offset so they don't exactly overlap
      y: el.y + 20
    }));
    
    return {
      elements: [...state.elements, ...newElements],
      selectedElementIds: newElements.map(el => el.id)
    };
  }),

  // Reorder an element in the layers stack (drag and drop)
  reorderElement: (dragId, hoverId) => set((state) => {
    const dragIndex = state.elements.findIndex(el => el.id === dragId);
    const hoverIndex = state.elements.findIndex(el => el.id === hoverId);
    
    if (dragIndex === -1 || hoverIndex === -1) return state;

    const newElements = [...state.elements];
    const draggedEl = newElements[dragIndex];
    
    newElements.splice(dragIndex, 1);
    newElements.splice(hoverIndex, 0, draggedEl);
    
    return { elements: newElements };
  }),

  // --- ACTIONS: Power Tools ---
  
  styleClipboard: null,
  
  copyStyle: (id) => set((state) => {
    const el = state.elements.find(e => e.id === id);
    if (!el) return state;
    
    // Extract purely stylistic properties (ignore position, size, id, content, and locked states)
    const { 
      id: _id, name, type, x, y, w, h, content, locked, visible, 
      ...styles 
    } = el;
    
    return { styleClipboard: styles };
  }),

  pasteStyle: (ids) => set((state) => {
    if (!state.styleClipboard) return state;
    
    return {
      elements: state.elements.map(el => 
        ids.includes(el.id) 
          ? { ...el, ...state.styleClipboard, type: el.type } // Keep original type
          : el
      )
    };
  }),

  // --- ACTIONS: Selection ---
  
  // Select a single element (clears previous selection)
  selectElement: (id) => set({
    selectedElementIds: id ? [id] : []
  }),

  // Add to selection (for Shift+Click)
  toggleSelection: (id) => set((state) => ({
    selectedElementIds: state.selectedElementIds.includes(id)
      ? state.selectedElementIds.filter(selectedId => selectedId !== id)
      : [...state.selectedElementIds, id]
  })),

  // Clear all selections
  clearSelection: () => set({ selectedElementIds: [] }),

  // --- ACTIONS: Canvas ---
  
  setZoom: (zoom) => set((state) => ({
    canvas: { ...state.canvas, zoom: Math.max(10, Math.min(zoom, 500)) } // Limit zoom 10% to 500%
  })),

  setPan: (x, y) => set((state) => ({
    canvas: { ...state.canvas, panX: x, panY: y }
  })),

  // Sets the smart guides array
  setSmartGuides: (guides) => set({ smartGuides: guides }),

  // --- ACTIONS: Context Menu ---
  openContextMenu: (x, y, targetId) => set({ 
    contextMenu: { isOpen: true, x, y, targetId } 
  }),
  
  closeContextMenu: () => set((state) => ({ 
    contextMenu: { ...state.contextMenu, isOpen: false } 
  })),
}));

export default useEditorStore;
