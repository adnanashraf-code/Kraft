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
  isShapePickerOpen: false,
  isHelpOpen: false,
  isOnboardingOpen: false,
  currentOnboardingStep: 0,
  activeFlyout: 'none', // 'none', 'templates', 'assets'
  isTemplatesOpen: false,
  isAssetsOpen: false,
  isDraggingGlobal: false,
  searchQuery: '',

  // --- HISTORY STATE ---
  past: [],
  future: [],

  saveHistory: () => {
    const { elements, past } = get();
    // Max history depth of 50
    const newPast = [...past, JSON.stringify(elements)];
    if (newPast.length > 50) newPast.shift();
    set({ past: newPast, future: [] });
  },

  undo: () => {
    const { past, future, elements } = get();
    if (past.length === 0) return;

    const previous = JSON.parse(past[past.length - 1]);
    const remainingPast = past.slice(0, past.length - 1);

    set({
      elements: previous,
      past: remainingPast,
      future: [JSON.stringify(elements), ...future],
      selectedElementIds: [] // Clear selection for safety
    });
  },

  redo: () => {
    const { past, future, elements } = get();
    if (future.length === 0) return;

    const next = JSON.parse(future[0]);
    const remainingFuture = future.slice(1);

    set({
      elements: next,
      past: [...past, JSON.stringify(elements)],
      future: remainingFuture,
      selectedElementIds: []
    });
  },

  // --- ACTIONS: UI & Theme ---
  setUiTheme: (theme) => set((state) => {
    // If switching between Light and Dark, automatically flip default black/white text colors
    const isNowLight = theme === 'light' || theme === 'gray';
    const isWasLight = state.uiTheme === 'light' || state.uiTheme === 'gray';

    let updatedElements = state.elements;
    if (isNowLight !== isWasLight) {
      updatedElements = state.elements.map(el => {
        if (el.type === 'text') {
           // If it was white on dark, make it black on light
           if (!isNowLight && (el.color === '#000000' || !el.color)) return { ...el, color: '#ffffff' };
           if (isNowLight && (el.color === '#ffffff' || !el.color)) return { ...el, color: '#000000' };
        }
        return el;
      });
    }

    return { 
      uiTheme: theme,
      elements: updatedElements
    };
  }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSettingsOpen: (open) => set({ isSettingsOpen: open }),
  setShapePickerOpen: (open) => set({ isShapePickerOpen: open }),
  setHelpOpen: (open) => set({ isHelpOpen: open }),
  setOnboardingOpen: (open) => set({ isOnboardingOpen: open }),
  setOnboardingStep: (step) => set({ currentOnboardingStep: step }),
  setTemplatesOpen: (open) => set({ isTemplatesOpen: open }),
  setAssetsOpen: (open) => set({ isAssetsOpen: open }),
  setDraggingGlobal: (dragging) => set({ isDraggingGlobal: dragging }),
  setFlyout: (type) => set((state) => ({ 
    activeFlyout: state.activeFlyout === type ? 'none' : type 
  })),
  
  // Add a new element to the canvas
  addElement: (element) => {
    get().saveHistory();
    set((state) => {
      // Generate ID once to use for both creation and selection
      const newId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
        ? window.crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 11);

      // Determine default sizing based on type
      let defaultW = element.type === 'text' ? 200 : 100;
      let defaultH = element.type === 'text' ? 40 : 100;
      
      return {
        elements: [...state.elements, {
          id: newId,
          name: element.name || (element.type === 'text' ? 'Text' : 'Rectangle'),
          // Core defaults
          type: element.type || 'rectangle', 
          x: 0, y: 0, 
          w: defaultW, h: defaultH,
          rotation: 0,
          fill: element.type === 'text' ? 'transparent' : '#D1E8E2',
          opacity: 1,
          visible: true,
          locked: false,
          clipPath: 'none',
          
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
            color: undefined, // Theme-aware by default
            lineHeight: 1.5,
            letterSpacing: 0,
            textTransform: 'none',
            textDecoration: 'none',
            fontStyle: 'normal',
            content: 'New Text'
          }),
          ...element,
          id: newId // Ensure generated ID wins
        }],
        // Auto-select the newly created element
        selectedElementIds: [newId] 
      };
    });
  },

  // Update properties of a specific element
  updateElement: (id, updates) => {
    // Note: We don't save history on EVERY micro-drag update to avoid flooding the stack.
    // History should be saved on DRAG START or STYLE CHANGE.
    set((state) => ({
      elements: state.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  },

  // Update properties for multiple elements at once (Bulk Action 6.2)
  updateElements: (ids, updates) => set((state) => ({
    elements: state.elements.map(el => 
      ids.includes(el.id) ? { ...el, ...updates } : el
    )
  })),

  commitChange: () => get().saveHistory(),

  // Group multiple elements (Phase 6.3)
  groupElements: (ids) => {
    get().saveHistory();
    set((state) => {
      const groupId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
        ? window.crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 11);
      
      return {
        elements: state.elements.map(el => 
          ids.includes(el.id) ? { ...el, groupId } : el
        )
      };
    });
  },

  // Ungroup elements
  ungroupElements: (ids) => {
    get().saveHistory();
    set((state) => ({
      elements: state.elements.map(el => 
        ids.includes(el.id) ? { ...el, groupId: undefined } : el
      )
    }));
  },

  // Delete elements by their IDs
  deleteElements: (ids) => {
    if (ids.length === 0) return;
    get().saveHistory();
    set((state) => ({
      elements: state.elements.filter(el => !ids.includes(el.id)),
      // Remove from selection if they were selected
      selectedElementIds: state.selectedElementIds.filter(id => !ids.includes(id))
    }));
  },

  // Duplicate elements by their IDs
  duplicateElements: (ids) => {
    if (ids.length === 0) return;
    get().saveHistory();
    set((state) => {
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
    });
  },

  // Reorder an element in the layers stack (drag and drop)
  reorderElement: (dragId, hoverId) => {
    get().saveHistory();
    set((state) => {
      const dragIndex = state.elements.findIndex(el => el.id === dragId);
      const hoverIndex = state.elements.findIndex(el => el.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return state;

      const newElements = [...state.elements];
      const draggedEl = newElements[dragIndex];
      
      newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, draggedEl);
      
      return { elements: newElements };
    });
  },

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
  // Auto-selects entire group if element belongs to one (Phase 6.3)
  selectElement: (id) => set((state) => {
    if (!id) return { selectedElementIds: [] };
    
    const element = state.elements.find(el => el.id === id);
    if (element?.groupId) {
      const groupIds = state.elements
        .filter(el => el.groupId === element.groupId)
        .map(el => el.id);
      return { selectedElementIds: groupIds };
    }
    
    return { selectedElementIds: [id] };
  }),

  // Add to selection (for Shift+Click)
  toggleSelection: (id) => set((state) => {
    const element = state.elements.find(el => el.id === id);
    const idsToToggle = element?.groupId 
      ? state.elements.filter(el => el.groupId === element.groupId).map(el => el.id)
      : [id];

    const isAlreadySelected = idsToToggle.every(tid => state.selectedElementIds.includes(tid));
    
    if (isAlreadySelected) {
      return { selectedElementIds: state.selectedElementIds.filter(sid => !idsToToggle.includes(sid)) };
    } else {
      return { selectedElementIds: [...new Set([...state.selectedElementIds, ...idsToToggle])] };
    }
  }),

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
