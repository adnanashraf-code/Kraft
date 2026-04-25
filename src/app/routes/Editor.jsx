import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import useEditorStore from '../../store/useEditorStore';
import Toolbar from '../../components/editor/Toolbar';
import LayersPanel from '../../components/editor/LayersPanel';
import PagesPanel from '../../components/editor/PagesPanel';
import PropertiesPanel from '../../components/editor/PropertiesPanel';
import Canvas from '../../components/canvas/Canvas';
import { HorizontalRuler, VerticalRuler, RulerCorner } from '../../components/canvas/Rulers';
import ContextMenu from '../../components/common/ContextMenu';
import SettingsModal from '../../components/editor/overlays/SettingsModal';
import TemplatesModal from '../../components/editor/overlays/TemplatesModal';
import AssetsModal from '../../components/editor/overlays/AssetsModal';
import ShapePicker from '../../components/editor/overlays/ShapePicker';
import HelpModal from '../../components/editor/overlays/HelpModal';
import OnboardingTour from '../../components/editor/overlays/OnboardingTour';
import TrashBin from '../../components/canvas/TrashBin';
import FontLoader from '../../components/common/FontLoader';
import ToastContainer from '../../components/common/ToastContainer';
import { THEMES } from '../../utils/themes';
import { TEMPLATE_SEEDS } from '../../utils/templateSeeds';

const Editor = () => {
  const { id } = useParams();
  const { 
    uiTheme, setOnboardingOpen, selectedElementIds, 
    groupElements, ungroupElements, deleteElements, duplicateElements, addElement,
    undo, redo, pages, activePageId, canvas, projectName, loadProject, setSaving, toggleRulers,
    zoomToFit, zoomTo100, updateElement, saveHistory, library, setProjectName,
    bringToFront, sendToBack, moveForward, moveBackward
  } = useEditorStore();
  const theme = THEMES[uiTheme];
  
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = React.useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      const isCtrl = e.ctrlKey || e.metaKey;
      const isShift = e.shiftKey;

      if (isCtrl && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (isShift) redo();
        else undo();
      } else if (isCtrl && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redo();
      } else if (isCtrl && e.key.toLowerCase() === 'g') {
        e.preventDefault();
        if (isShift) ungroupElements(selectedElementIds);
        else groupElements(selectedElementIds);
      } else if (isCtrl && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        duplicateElements(selectedElementIds);
      } else if (isCtrl && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        toggleRulers();
      } else if (isCtrl && e.key === '0') {
        e.preventDefault();
        const container = document.getElementById('canvas-container');
        if (container) zoomToFit(container.clientWidth, container.clientHeight);
      } else if (isCtrl && e.key === '1') {
        e.preventDefault();
        zoomTo100();
      } else if (isCtrl && e.key === '[') {
        e.preventDefault();
        if (isShift) sendToBack(selectedElementIds);
        else moveBackward(selectedElementIds);
      } else if (isCtrl && e.key === ']') {
        e.preventDefault();
        if (isShift) bringToFront(selectedElementIds);
        else moveForward(selectedElementIds);
      } else if (e.key.toLowerCase() === 'l' && !isCtrl) {
        if (selectedElementIds.length > 0) {
          saveHistory();
          const activePage = pages.find(p => p.id === activePageId);
          selectedElementIds.forEach(id => {
            const el = activePage.elements.find(e => e.id === id);
            if (el) updateElement(id, { locked: !el.locked });
          });
        }
      } else if (e.key.toLowerCase() === 'h' && isShift) {
        if (selectedElementIds.length > 0) {
          saveHistory();
          const activePage = pages.find(p => p.id === activePageId);
          selectedElementIds.forEach(id => {
            const el = activePage.elements.find(e => e.id === id);
            if (el) updateElement(id, { visible: !el.visible });
          });
        }
      } else if (e.key.toLowerCase() === 't' && !isCtrl) {
        const { canvas } = useEditorStore.getState();
        const zoomScale = canvas.zoom / 100;
        const centerX = (-canvas.panX + (window.innerWidth / 2)) / zoomScale;
        const centerY = (-canvas.panY + (window.innerHeight / 2)) / zoomScale;
        addElement({ type: 'text', content: 'New Text', x: centerX - 100, y: centerY - 20 });
      } else if (e.key.toLowerCase() === 'r' && !isCtrl) {
        const { canvas } = useEditorStore.getState();
        const zoomScale = canvas.zoom / 100;
        const centerX = (-canvas.panX + (window.innerWidth / 2)) / zoomScale;
        const centerY = (-canvas.panY + (window.innerHeight / 2)) / zoomScale;
        addElement({ type: 'rectangle', x: centerX - 50, y: centerY - 50 });
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteElements(selectedElementIds);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementIds, groupElements, ungroupElements, deleteElements, duplicateElements, redo, undo, toggleRulers, zoomToFit, zoomTo100, bringToFront, sendToBack, moveForward, moveBackward, saveHistory, pages, activePageId, updateElement, addElement]);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('kraft_onboarded');
    if (!hasOnboarded) {
      setTimeout(() => setOnboardingOpen(true), 1000);
    }
  }, [setOnboardingOpen]);

  // Restore Template Loading from URL
  useEffect(() => {
    if (id && TEMPLATE_SEEDS[id]) {
      loadProject(TEMPLATE_SEEDS[id]);
    }
  }, [id, loadProject]);

  // Safety check for theme
  if (!theme) return <div className="p-10 text-red-500 font-bold">Error: Theme '{uiTheme}' not found.</div>;

  return (
    <div className={`flex flex-col md:flex-row h-screen w-screen ${theme.canvas} overflow-hidden font-sans relative transition-colors duration-500 select-none`}>
      {/* Sidebar Navigation & Tools */}
      <Toolbar onToggleLeft={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} onToggleRight={() => setIsRightSidebarOpen(!isRightSidebarOpen)} />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar Overlay (Mobile) */}
        {isLeftSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsLeftSidebarOpen(false)} />
        )}

        {/* Left Sidebar: Pages + Layers */}
        <div className={`
          fixed md:relative inset-y-0 left-0 z-40 w-[280px] md:w-[300px] flex flex-col h-full border-r transition-transform duration-300 ease-in-out
          ${theme.sidebar} ${theme.border}
          ${isLeftSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
            <PagesPanel />
            <LayersPanel />
        </div>
        
        {/* Main Canvas Area */}
        <div className={`flex-1 relative overflow-hidden flex flex-col ${theme.canvas}`}>
          <RulerCorner />
          <HorizontalRuler />
          <div className="flex-1 flex overflow-hidden">
             <VerticalRuler />
             <div id="canvas-container" className="flex-1 relative overflow-hidden">
                <Canvas />
             </div>
          </div>
        </div>

        {/* Right Sidebar Overlay (Mobile) */}
        {isRightSidebarOpen && (
          <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setIsRightSidebarOpen(false)} />
        )}

        {/* Property Controls */}
        <div className={`
          fixed md:relative inset-y-0 right-0 z-40 w-[280px] md:w-[320px] transition-transform duration-300 ease-in-out
          ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        `}>
          <PropertiesPanel />
        </div>
      </div>

      <ContextMenu />

      {/* Overlays / Modals */}
      <SettingsModal />
      <TemplatesModal />
      <AssetsModal />
      <ShapePicker />
      <HelpModal />
      <OnboardingTour />
      <TrashBin />
      <FontLoader />
      <ToastContainer />
    </div>
  );
};

export default Editor;
