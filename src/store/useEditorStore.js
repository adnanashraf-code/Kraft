import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useEditorStore = create(
  persist(
    (set, get) => ({
  // --- STATE ---
  pages: [{ id: 'page-1', name: 'Page 1', elements: [], layoutGrids: [] }],
  activePageId: 'page-1',
  selectedElementIds: [], // IDs of currently selected elements
  
  canvas: {
    zoom: 100, // Percentage
    panX: 0,
    panY: 0,
    gridSnap: 20, // 20px snapping
    isRulersVisible: false,
  },
    preferences: {
      snapEnabled: true,
      highFidelity: true,
      autoCleanUploads: false, // 12h auto-purge policy
    },
  smartGuides: [], // Array of { axis: 'x'|'y', pos: number }
  
  library: {
    images: [], // { id, name, src, w, h }
    components: [] // { id, name, elements, w, h }
  },
  
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
  isExportOpen: false,
  isDraggingGlobal: false,
  searchQuery: '',
  projectName: 'KRAFT',
  isSaving: false,
  stagedAssets: [], // Array of { id, name, type, src, etc. }
  userProfile: {
    name: 'Adnan Ashraf',
    avatarSeed: 'Adnan',
    role: 'PRO DESIGNER_KW'
  },
  notifications: [], // Array of { id, message, type: 'success' | 'error' | 'info' }
  projectFonts: [], // Array of string font names

  // --- HISTORY STATE ---
  past: [],
  future: [],

  saveHistory: () => {
    const { pages, past } = get();
    // Max history depth of 50
    const newPast = [...past, JSON.stringify(pages)];
    if (newPast.length > 50) newPast.shift();
    set({ past: newPast, future: [] });
  },

  undo: () => {
    const { past, future, pages } = get();
    if (past.length === 0) return;

    const previous = JSON.parse(past[past.length - 1]);
    const remainingPast = past.slice(0, past.length - 1);

    set({
      pages: previous,
      past: remainingPast,
      future: [JSON.stringify(pages), ...future],
      selectedElementIds: [] // Clear selection for safety
    });
  },

  redo: () => {
    const { past, future, pages } = get();
    if (future.length === 0) return;

    const next = JSON.parse(future[0]);
    const remainingFuture = future.slice(1);

    set({
      pages: next,
      past: [...past, JSON.stringify(pages)],
      future: remainingFuture,
      selectedElementIds: []
    });
  },

  // --- ACTIONS: UI & Theme ---
  setUiTheme: (theme) => set((state) => {
    // If switching between Light and Dark, automatically flip default black/white text colors
    const isNowLight = theme === 'light' || theme === 'gray';
    const isWasLight = state.uiTheme === 'light' || state.uiTheme === 'gray';

    let updatedPages = state.pages;
    if (isNowLight !== isWasLight) {
      updatedPages = state.pages.map(page => ({
        ...page,
        elements: page.elements.map(el => {
          if (el.type === 'text') {
             if (!isNowLight && (el.color === '#000000' || !el.color)) return { ...el, color: '#ffffff' };
             if (isNowLight && (el.color === '#ffffff' || !el.color)) return { ...el, color: '#000000' };
          }
          return el;
        })
      }));
    }

    return { 
      uiTheme: theme,
      pages: updatedPages
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
  setExportOpen: (open) => set({ isExportOpen: open }),
  setDraggingGlobal: (dragging) => set({ isDraggingGlobal: dragging }),
  setFlyout: (type) => set((state) => ({ 
    activeFlyout: state.activeFlyout === type ? 'none' : type 
  })),

  setUserProfile: (profile) => set((state) => ({
    userProfile: { ...state.userProfile, ...profile }
  })),

  addNotification: (message, type = 'success') => {
    const id = Date.now().toString();
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }]
    }));
    // Auto-remove after 4 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    }, 4000);
  },

  addProjectFont: (fontName) => set((state) => {
    if (state.projectFonts.includes(fontName)) return state;
    return { projectFonts: [...state.projectFonts, fontName] };
  }),
  
  setProjectName: (name) => set({ projectName: name }),
  setSaving: (saving) => set({ isSaving: saving }),
  
  updatePreferences: (updates) => set((state) => ({
    preferences: { ...state.preferences, ...updates }
  })),

  clearProjectData: () => {
    localStorage.removeItem('kraft-save');
    window.location.reload();
  },

  toggleStageAsset: (asset) => set((state) => {
    const isSameType = (a, b) => a.type === b.type;
    const isSameId = (a, b) => a.id && b.id && a.id === b.id;
    const isSameName = (a, b) => a.name === b.name;

    const exists = state.stagedAssets.find(a => 
      isSameId(a, asset) || (!a.id && !asset.id && isSameName(a, asset) && isSameType(a, asset))
    );

    if (exists) {
      return { stagedAssets: state.stagedAssets.filter(a => 
        !(isSameId(a, asset) || (!a.id && !asset.id && isSameName(a, asset) && isSameType(a, asset)))
      )};
    }
    return { stagedAssets: [...state.stagedAssets, asset] };
  }),

  clearStagedAssets: () => set({ stagedAssets: [] }),

  // --- LIBRARY ACTIONS ---
  uploadImage: (dataUrl, name, w, h) => {
    set((state) => ({
      library: {
        ...state.library,
        images: [
          ...state.library.images, 
          { id: 'img-' + Date.now(), name, src: dataUrl, w, h, timestamp: Date.now() }
        ]
      }
    }));
  },

  removeLibraryImage: (id) => {
    set((state) => ({
      library: {
        ...state.library,
        images: state.library.images.filter(img => img.id !== id)
      }
    }));
  },

  runLibraryMaintenance: () => {
    const { preferences, library, pages } = get();
    if (!preferences.autoCleanUploads) return;

    const twelveHoursAgo = Date.now() - (12 * 60 * 60 * 1000);
    
    // Safety check: Don't delete images that are actually on the canvas
    const usedSrcs = new Set();
    pages.forEach(p => p.elements.forEach(el => {
      if (el.type === 'image' && el.src) usedSrcs.add(el.src);
    }));

    const cleanedImages = library.images.filter(img => {
       const isOld = (img.timestamp || 0) < twelveHoursAgo;
       const isUsed = usedSrcs.has(img.src);
       return !isOld || isUsed;
    });

    if (cleanedImages.length !== library.images.length) {
      set({
        library: { ...library, images: cleanedImages }
      });
      console.log('KRAFT_MAINTENANCE: Purged expired assets from library.');
    }
  },

  createComponent: (name) => {
    const { pages, activePageId, selectedElementIds, saveHistory } = get();
    if (selectedElementIds.length === 0) return;
    
    saveHistory();
    const activePage = pages.find(p => p.id === activePageId);
    const selectedElements = activePage.elements.filter(el => selectedElementIds.includes(el.id));
    
    // Calculate bounding box
    const minX = Math.min(...selectedElements.map(el => el.x));
    const minY = Math.min(...selectedElements.map(el => el.y));
    const maxX = Math.max(...selectedElements.map(el => el.x + el.w));
    const maxY = Math.max(...selectedElements.map(el => el.y + el.h));
    
    const w = maxX - minX;
    const h = maxY - minY;

    // Create normalized elements relative to (0,0)
    const normalizedElements = selectedElements.map(el => ({
      ...el,
      x: el.x - minX,
      y: el.y - minY,
      id: 'comp-el-' + Math.random().toString(36).substr(2, 9)
    }));

    const newComponent = {
      id: 'comp-' + Date.now(),
      name: name || 'Component ' + (get().library.components.length + 1),
      elements: normalizedElements,
      w,
      h
    };

    set((state) => ({
      library: {
        ...state.library,
        components: [...state.library.components, newComponent]
      }
    }));

    return newComponent;
  },

  updateComponent: (id, elements) => {
    set((state) => ({
      library: {
        ...state.library,
        components: state.library.components.map(c => c.id === id ? { ...c, elements } : c)
      }
    }));
  },

  loadProject: (data) => {
    try {
      if (!data) return;
      
      // Migration: Migrate legacy 'elements' projects to 'pages' structure
      let pages = Array.isArray(data.pages) ? data.pages : [];
      let activePageId = data.activePageId;
      
      if (pages.length === 0 && data.elements) {
        const defaultId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
          ? window.crypto.randomUUID() : 'page-' + Math.random().toString(36).substr(2, 9);
        pages = [{ id: defaultId, name: 'Page 1', elements: data.elements || [], layoutGrids: [] }];
        activePageId = defaultId;
      } else if (pages.length === 0) {
        activePageId = 'page-1';
        pages = [{ id: activePageId, name: 'Page 1', elements: [], layoutGrids: [] }];
      }

      set({
        pages,
        activePageId: activePageId || (pages.length > 0 ? pages[0].id : null),
        uiTheme: data.uiTheme || 'light',
        projectName: data.projectName || 'KRAFT',
        canvas: {
          ...get().canvas,
          ...(data.canvas || {})
        },
        preferences: {
          ...get().preferences,
          ...(data.preferences || {})
        },
        library: {
          images: Array.isArray(data.library?.images) ? data.library.images : [],
          components: Array.isArray(data.library?.components) ? data.library.components : []
        },
        selectedElementIds: [],
        past: [],
        future: []
      });
    } catch (err) {
      console.error("CRITICAL_LOAD_ERROR:", err);
      // Fallback to fresh state if everything fails
    }
  },
  
  // Add a new element to the active page
  addElement: (element) => {
    get().saveHistory();
    set((state) => {
      const newId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
        ? window.crypto.randomUUID() 
        : Math.random().toString(36).substring(2, 11);

      let defaultW = element.type === 'text' ? 200 : 100;
      let defaultH = element.type === 'text' ? 40 : 100;
      
      const newElement = {
        id: newId,
        name: element.name || (element.type === 'text' ? 'Text' : 'Rectangle'),
        type: element.type || 'rectangle', 
        x: 0, y: 0, 
        w: defaultW, h: defaultH,
        rotation: 0,
        fill: (element.type === 'text' || element.type === 'icon') ? undefined : '#D1E8E2',
        opacity: 1,
        visible: true,
        locked: false,
        clipPath: 'none',
        strokeColor: '#000000',
        strokeWidth: 0,
        strokeStyle: 'solid',
        borderRadius: 0,
        shadowEnabled: false,
        shadowOffsetX: 0,
        shadowOffsetY: 4,
        shadowBlur: 10,
        shadowColor: 'rgba(0,0,0,0.15)',
        aspectRatioLocked: false,
        flipX: false,
        flipY: false,
        borderRadiusTL: 0,
        borderRadiusTR: 0,
        borderRadiusBR: 0,
        borderRadiusBL: 0,
        independentRadius: false,
        ...(element.type === 'text' && {
          fontFamily: 'Inter',
          fontWeight: '400',
          fontSize: 24,
          textAlign: 'left',
          color: undefined,
          lineHeight: 1.5,
          letterSpacing: 0,
          textTransform: 'none',
          textDecoration: 'none',
          fontStyle: 'normal',
          content: 'New Text'
        }),
        ...element,
        id: newId,
        // Image support
        ...(element.type === 'image' && {
          src: element.src,
          w: element.w || 200,
          h: element.h || 200
        }),
        // Component Instance support
        ...(element.type === 'instance' && {
          componentId: element.componentId,
          w: element.w || 100,
          h: element.h || 100
        })
      };

      return {
        pages: state.pages.map(page => 
          page.id === state.activePageId 
            ? { ...page, elements: [...page.elements, newElement] }
            : page
        ),
        selectedElementIds: [newId] 
      };
    });
  },

  addElements: (elementsArray) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      if (!activePage) return state;

      const newElements = elementsArray.map(element => {
        const newId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
          ? window.crypto.randomUUID() 
          : Math.random().toString(36).substring(2, 11);

        const isText = element.type === 'text';
        const isImage = element.type === 'image';
        
        // Smart defaults: text height based on fontSize to prevent wrapping in tiny boxes
        const fontSize = element.fontSize || 24;
        const defaultW = isText ? Math.max(400, (element.w || 0)) : (isImage ? 300 : 150);
        const defaultH = isText ? Math.ceil(fontSize * 1.6) : (isImage ? 300 : 150);

        // Build the element: spread element FIRST, then apply computed/safe overrides
        // This ensures explicit values win, but undefined fields get good defaults
        const built = {
          // Safe defaults (will be overridden by ...element if element has them)
          rotation: 0,
          fill: isText || element.type === 'icon' ? undefined : '#E0E0E0',
          strokeColor: '#000000',
          strokeWidth: 0,
          opacity: 1,
          visible: true,
          locked: false,

          // Spread ALL element properties (explicit values take precedence)
          ...element,

          // These ALWAYS get set correctly (never left as undefined)
          id: newId,
          name: element.name || (isText ? 'Text' : isImage ? 'Image' : 'Rectangle'),
          type: element.type || 'rectangle',
          x: element.x ?? 0,
          y: element.y ?? 0,
          w: element.w ?? defaultW,
          h: element.h ?? defaultH,
          opacity: element.opacity ?? 1,

          // Text-specific safe defaults (only applied if type is text)
          ...(isText && {
            fontFamily: element.fontFamily || 'Inter',
            fontWeight: element.fontWeight || '400',
            fontSize: fontSize,
            textAlign: element.textAlign || 'left',
            color: element.color || '#000000',
            content: element.content || 'New Text',
            lineHeight: element.lineHeight || 1.4,
          }),
        };

        return built;
      });

      return {
        pages: state.pages.map(page => 
          page.id === state.activePageId 
            ? { ...page, elements: [...page.elements, ...newElements] }
            : page
        ),
        selectedElementIds: newElements.map(el => el.id)
      };
    });
  },

  // Page Management
  addPage: (name) => {
    get().saveHistory();
    const newId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
        ? window.crypto.randomUUID() : 'page-' + Math.random().toString(36).substr(2, 9);
    set((state) => ({
      pages: [...state.pages, { id: newId, name: name || `Page ${state.pages.length + 1}`, elements: [], layoutGrids: [] }],
      activePageId: newId,
      selectedElementIds: []
    }));
  },

  switchPage: (id) => {
    set({ activePageId: id, selectedElementIds: [] });
  },

  renamePage: (id, name) => {
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(p => p.id === id ? { ...p, name } : p)
    }));
  },

  removePage: (id) => {
    const { pages } = get();
    if (pages.length <= 1) return; // Prevent deleting last page
    
    get().saveHistory();
    set((state) => {
      const newPages = state.pages.filter(p => p.id !== id);
      const newActiveId = state.activePageId === id ? newPages[0].id : state.activePageId;
      return {
        pages: newPages,
        activePageId: newActiveId,
        selectedElementIds: []
      };
    });
  },

  duplicatePage: (id) => {
    get().saveHistory();
    set((state) => {
      const targetPage = state.pages.find(p => p.id === id);
      if (!targetPage) return state;
      
      const newId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
        ? window.crypto.randomUUID() : 'page-' + Math.random().toString(36).substr(2, 9);
      
      const newElements = targetPage.elements.map(el => ({
        ...el,
        id: (typeof window !== 'undefined' && window.crypto?.randomUUID) 
          ? window.crypto.randomUUID() : Math.random().toString(36).substr(2, 9)
      }));

      return {
        pages: [...state.pages, { id: newId, name: `${targetPage.name} (Copy)`, elements: newElements, layoutGrids: targetPage.layoutGrids ? [...targetPage.layoutGrids] : [] }],
        activePageId: newId,
        selectedElementIds: []
      };
    });
  },

  updatePage: (id, updates) => {
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(p => p.id === id ? { ...p, ...updates } : p)
    }));
  },

  // Element actions refactored for page-safety
  updateElement: (id, updates) => {
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => el.id === id ? { ...el, ...updates } : el) }
          : page
      )
    }));
  },

  updateElements: (ids, updates) => {
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => ids.includes(el.id) ? { ...el, ...updates } : el) }
          : page
      )
    }));
  },

  groupElements: (ids) => {
    get().saveHistory();
    const groupId = (typeof window !== 'undefined' && window.crypto?.randomUUID) 
      ? window.crypto.randomUUID() : Math.random().toString(36).substring(2, 11);
      
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => ids.includes(el.id) ? { ...el, ...groupId } : el) }
          : page
      )
    }));
  },

  rotate90: (ids) => {
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => ids.includes(el.id) ? { ...el, rotation: ((el.rotation || 0) + 90) % 360 } : el) }
          : page
      )
    }));
  },

  flipElement: (ids, axis) => {
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => ids.includes(el.id) ? (axis === 'x' ? { ...el, flipX: !el.flipX } : { ...el, flipY: !el.flipY }) : el) }
          : page
      )
    }));
  },

  ungroupElements: (ids) => {
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => ids.includes(el.id) ? { ...el, groupId: undefined } : el) }
          : page
      )
    }));
  },

  deleteElements: (ids) => {
    if (ids.length === 0) return;
    get().saveHistory();
    set((state) => ({
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.filter(el => !ids.includes(el.id)) }
          : page
      ),
      selectedElementIds: state.selectedElementIds.filter(id => !ids.includes(id))
    }));
  },

  duplicateElements: (ids) => {
    if (ids.length === 0) return;
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      const elementsToDuplicate = activePage?.elements.filter(el => ids.includes(el.id)) || [];
      const newElements = elementsToDuplicate.map(el => ({
        ...el,
        id: (typeof window !== 'undefined' && window.crypto?.randomUUID) 
          ? window.crypto.randomUUID() 
          : Math.random().toString(36).substring(2, 11),
        name: `${el.name} (Copy)`,
        x: el.x + 20,
        y: el.y + 20
      }));
      
      return {
        pages: state.pages.map(page => 
          page.id === state.activePageId 
            ? { ...page, elements: [...page.elements, ...newElements] }
            : page
        ),
        selectedElementIds: newElements.map(el => el.id)
      };
    });
  },

  reorderElement: (dragId, hoverId) => {
    get().saveHistory();
    set((state) => {
      const activePageIndex = state.pages.findIndex(p => p.id === state.activePageId);
      if (activePageIndex === -1) return state;
      
      const pageElements = [...state.pages[activePageIndex].elements];
      const dragIndex = pageElements.findIndex(el => el.id === dragId);
      const hoverIndex = pageElements.findIndex(el => el.id === hoverId);
      
      if (dragIndex === -1 || hoverIndex === -1) return state;

      const [draggedEl] = pageElements.splice(dragIndex, 1);
      pageElements.splice(hoverIndex, 0, draggedEl);
      
      const newPages = [...state.pages];
      newPages[activePageIndex] = { ...newPages[activePageIndex], elements: pageElements };
      
      return { pages: newPages };
    });
  },

  copyStyle: (id) => set((state) => {
    const activePage = state.pages.find(p => p.id === state.activePageId);
    const el = activePage?.elements.find(e => e.id === id);
    if (!el) return state;
    
    const { id: _id, name, type, x, y, w, h, content, locked, visible, ...styles } = el;
    return { styleClipboard: styles };
  }),

  pasteStyle: (ids) => set((state) => {
    if (!state.styleClipboard) return state;
    return {
      pages: state.pages.map(page => 
        page.id === state.activePageId 
          ? { ...page, elements: page.elements.map(el => ids.includes(el.id) ? { ...el, ...state.styleClipboard, type: el.type } : el) }
          : page
      )
    };
  }),

  // Layer Ordering Actions
  bringToFront: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePageIndex = state.pages.findIndex(p => p.id === state.activePageId);
      if (activePageIndex === -1) return state;
      const pageElements = [...state.pages[activePageIndex].elements];
      
      const selected = pageElements.filter(el => ids.includes(el.id));
      const others = pageElements.filter(el => !ids.includes(el.id));
      
      const newPages = [...state.pages];
      newPages[activePageIndex] = { ...newPages[activePageIndex], elements: [...others, ...selected] };
      return { pages: newPages };
    });
  },

  sendToBack: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePageIndex = state.pages.findIndex(p => p.id === state.activePageId);
      if (activePageIndex === -1) return state;
      const pageElements = [...state.pages[activePageIndex].elements];
      
      const selected = pageElements.filter(el => ids.includes(el.id));
      const others = pageElements.filter(el => !ids.includes(el.id));
      
      const newPages = [...state.pages];
      newPages[activePageIndex] = { ...newPages[activePageIndex], elements: [...selected, ...others] };
      return { pages: newPages };
    });
  },

  moveForward: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePageIndex = state.pages.findIndex(p => p.id === state.activePageId);
      if (activePageIndex === -1) return state;
      const pageElements = [...state.pages[activePageIndex].elements];
      
      // Moving forward means moving to a higher index (bottom of array in our .reverse() rendering)
      // Actually, we render [...elements].reverse(), so "Front" is higher index.
      // Let's settle: higher index = appearing on top.
      const newElements = [...pageElements];
      for (let i = newElements.length - 2; i >= 0; i--) {
        if (ids.includes(newElements[i].id) && !ids.includes(newElements[i+1].id)) {
          const temp = newElements[i];
          newElements[i] = newElements[i+1];
          newElements[i+1] = temp;
        }
      }

      const newPages = [...state.pages];
      newPages[activePageIndex] = { ...newPages[activePageIndex], elements: newElements };
      return { pages: newPages };
    });
  },

  moveBackward: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePageIndex = state.pages.findIndex(p => p.id === state.activePageId);
      if (activePageIndex === -1) return state;
      const pageElements = [...state.pages[activePageIndex].elements];
      
      const newElements = [...pageElements];
      for (let i = 1; i < newElements.length; i++) {
        if (ids.includes(newElements[i].id) && !ids.includes(newElements[i-1].id)) {
          const temp = newElements[i];
          newElements[i] = newElements[i-1];
          newElements[i-1] = temp;
        }
      }

      const newPages = [...state.pages];
      newPages[activePageIndex] = { ...newPages[activePageIndex], elements: newElements };
      return { pages: newPages };
    });
  },

  selectElement: (id) => set((state) => {
    if (!id) return { selectedElementIds: [] };
    const activePage = state.pages.find(p => p.id === state.activePageId);
    const element = activePage?.elements.find(el => el.id === id);
    if (element?.groupId) {
      const groupIds = activePage.elements.filter(el => el.groupId === element.groupId).map(el => el.id);
      return { selectedElementIds: groupIds };
    }
    return { selectedElementIds: [id] };
  }),

  toggleSelection: (id) => set((state) => {
    const activePage = state.pages.find(p => p.id === state.activePageId);
    const element = activePage?.elements.find(el => el.id === id);
    const idsToToggle = element?.groupId 
      ? activePage.elements.filter(el => el.groupId === element.groupId).map(el => el.id)
      : [id];

    const isAlreadySelected = idsToToggle.every(tid => state.selectedElementIds.includes(tid));
    return {
      selectedElementIds: isAlreadySelected 
        ? state.selectedElementIds.filter(sid => !idsToToggle.includes(sid))
        : [...new Set([...state.selectedElementIds, ...idsToToggle])]
    };
  }),

  // Clear all selections
  clearSelection: () => set({ selectedElementIds: [] }),

  // --- ACTIONS: Canvas ---
  
  setZoom: (zoom) => set((state) => ({
    canvas: { ...state.canvas, zoom: Math.max(10, Math.min(zoom, 500)) } // Limit zoom 10% to 500%
  })),

  zoomTo100: () => set((state) => ({
    canvas: { ...state.canvas, zoom: 100, panX: 0, panY: 0 }
  })),

  zoomToFit: (viewportWidth, viewportHeight) => set((state) => {
    // Designer artboard is 1000x700. Add 100px padding.
    const padding = 100;
    const targetW = 1000 + padding;
    const targetH = 700 + padding;
    
    const zoomX = (viewportWidth / targetW) * 100;
    const zoomY = (viewportHeight / targetH) * 100;
    const zoom = Math.min(zoomX, zoomY, 150); // Cap at 150% for safety
    
    return {
      canvas: {
        ...state.canvas,
        zoom,
        panX: 0,
        panY: 0
      }
    };
  }),

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

  toggleRulers: () => set((state) => ({
    canvas: { ...state.canvas, isRulersVisible: !state.canvas.isRulersVisible }
  })),

  alignElements: (direction) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      const elements = activePage?.elements || [];
      const selectedIds = state.selectedElementIds;
      if (selectedIds.length === 0) return state;

      const selectedElements = elements.filter(el => selectedIds.includes(el.id));
      
      let targetX, targetY, targetW, targetH;

      if (selectedIds.length === 1) {
        // Align to Canvas (1000x700)
        targetX = 0; targetY = 0; targetW = 1000; targetH = 700;
      } else {
        // Align to Selection Bounds
        const minX = Math.min(...selectedElements.map(el => el.x));
        const minY = Math.min(...selectedElements.map(el => el.y));
        const maxX = Math.max(...selectedElements.map(el => el.x + el.w));
        const maxY = Math.max(...selectedElements.map(el => el.y + el.h));
        targetX = minX; targetY = minY; targetW = maxX - minX; targetH = maxY - minY;
      }

      return {
        pages: state.pages.map(page => 
          page.id === state.activePageId 
            ? { 
                ...page, 
                elements: page.elements.map(el => {
                  if (!selectedIds.includes(el.id)) return el;
                  const updates = {};
                  if (direction === 'left') updates.x = targetX;
                  if (direction === 'right') updates.x = targetX + targetW - el.w;
                  if (direction === 'top') updates.y = targetY;
                  if (direction === 'bottom') updates.y = targetY + targetH - el.h;
                  if (direction === 'centerX') updates.x = targetX + (targetW / 2) - (el.w / 2);
                  if (direction === 'centerY') updates.y = targetY + (targetH / 2) - (el.h / 2);
                  return { ...el, ...updates };
                }) 
              }
            : page
        )
      };
    });
  },

  distributeElements: (axis) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      const elements = activePage?.elements || [];
      const selectedIds = state.selectedElementIds;
      if (selectedIds.length < 3) return state;

      const selectedElements = [...elements.filter(el => selectedIds.includes(el.id))];
      
      if (axis === 'horizontal') {
        selectedElements.sort((a, b) => a.x - b.x);
        const minX = selectedElements[0].x;
        const maxX = selectedElements[selectedElements.length - 1].x + selectedElements[selectedElements.length - 1].w;
        const totalW = maxX - minX;
        const sumW = selectedElements.reduce((s, el) => s + el.w, 0);
        const gutter = (totalW - sumW) / (selectedElements.length - 1);
        
        let currentX = minX;
        const updates = {};
        selectedElements.forEach(el => {
          updates[el.id] = { x: currentX };
          currentX += el.w + gutter;
        });

        return {
          pages: state.pages.map(page => 
            page.id === state.activePageId 
              ? { ...page, elements: page.elements.map(el => updates[el.id] ? { ...el, ...updates[el.id] } : el) }
              : page
          )
        };
      } else {
        selectedElements.sort((a, b) => a.y - b.y);
        const minY = selectedElements[0].y;
        const maxY = selectedElements[selectedElements.length - 1].y + selectedElements[selectedElements.length - 1].h;
        const totalH = maxY - minY;
        const sumH = selectedElements.reduce((s, el) => s + el.h, 0);
        const gutter = (totalH - sumH) / (selectedElements.length - 1);
        
        let currentY = minY;
        const updates = {};
        selectedElements.forEach(el => {
          updates[el.id] = { y: currentY };
          currentY += el.h + gutter;
        });

        return {
          pages: state.pages.map(page => 
            page.id === state.activePageId 
              ? { ...page, elements: page.elements.map(el => updates[el.id] ? { ...el, ...updates[el.id] } : el) }
              : page
          )
        };
      }
    });
  },

  // --- LAYER ARRANGEMENT ---
  bringToFront: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      if (!activePage) return state;
      
      const elements = [...activePage.elements];
      const selectedEls = elements.filter(el => ids.includes(el.id));
      const remainingEls = elements.filter(el => !ids.includes(el.id));
      
      return {
        pages: state.pages.map(p => 
          p.id === state.activePageId 
            ? { ...p, elements: [...remainingEls, ...selectedEls] } 
            : p
        )
      };
    });
  },

  sendToBack: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      if (!activePage) return state;
      
      const elements = [...activePage.elements];
      const selectedEls = elements.filter(el => ids.includes(el.id));
      const remainingEls = elements.filter(el => !ids.includes(el.id));
      
      return {
        pages: state.pages.map(p => 
          p.id === state.activePageId 
            ? { ...p, elements: [...selectedEls, ...remainingEls] } 
            : p
        )
      };
    });
  },

  moveForward: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      if (!activePage) return state;
      
      const elements = [...activePage.elements];
      ids.forEach(id => {
        const index = elements.findIndex(el => el.id === id);
        if (index < elements.length - 1) {
          const temp = elements[index];
          elements[index] = elements[index + 1];
          elements[index + 1] = temp;
        }
      });
      
      return {
        pages: state.pages.map(p => p.id === state.activePageId ? { ...p, elements } : p)
      };
    });
  },

  moveBackward: (ids) => {
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      if (!activePage) return state;
      
      const elements = [...activePage.elements];
      ids.forEach(id => {
        const index = elements.findIndex(el => el.id === id);
        if (index > 0) {
          const temp = elements[index];
          elements[index] = elements[index - 1];
          elements[index - 1] = temp;
        }
      });
      
      return {
        pages: state.pages.map(p => p.id === state.activePageId ? { ...p, elements } : p)
      };
    });
  },

  // --- GROUPING ---
  groupElements: (ids) => {
    if (ids.length < 2) return;
    const { createComponent } = get();
    // In our system, Grouping reuse the Component engine but we can add specialized logic if needed.
    // For now, let's treat Group as creating a reusable component named "Grouped"
    const name = "Group " + Math.floor(Math.random() * 1000);
    createComponent(name);
  },

  ungroupElements: (ids) => {
    // Ungrouping in an Atomic system means replacing the instance with its children
    get().saveHistory();
    set((state) => {
      const activePage = state.pages.find(p => p.id === state.activePageId);
      if (!activePage) return state;
      
      let newElements = [...activePage.elements];
      let selectedIds = [...state.selectedElementIds];
      
      ids.forEach(id => {
        const instance = activePage.elements.find(el => el.id === id);
        if (instance?.type === 'instance') {
          const master = state.library.components.find(c => c.id === instance.componentId);
          if (master) {
            // Explode children back into the canvas
            const scaleX = instance.w / master.w;
            const scaleY = instance.h / master.h;
            
            const children = master.elements.map(child => ({
              ...child,
              id: Math.random().toString(36).substr(2, 9),
              x: instance.x + (child.x * scaleX),
              y: instance.y + (child.y * scaleY),
              w: child.w * scaleX,
              h: child.h * scaleY
            }));
            
            newElements = newElements.filter(el => el.id !== id);
            newElements = [...newElements, ...children];
            selectedIds = selectedIds.filter(sid => sid !== id);
          }
        }
      });
      
      return {
        pages: state.pages.map(p => p.id === state.activePageId ? { ...p, elements: newElements } : p),
        selectedElementIds: selectedIds
      };
    });
  },
}), {
  name: 'kraft-saved-project', // unique name
  partialize: (state) => ({ 
    pages: state.pages,
    activePageId: state.activePageId,
    canvas: state.canvas,
    preferences: state.preferences,
    library: state.library,
    uiTheme: state.uiTheme,
    projectName: state.projectName
  }),
})
);

export default useEditorStore;
