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
  const isFirstLoad = useRef(true);

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
        addElement({ type: 'text', content: 'New Text', x: 100, y: 100 });
      } else if (e.key.toLowerCase() === 'r' && !isCtrl) {
        addElement({ type: 'rectangle', x: 100, y: 100 });
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

  // Redundant manual save logic removed. Zustand 'persist' handles this now.

  // Safety check for theme
  if (!theme) return <div className="p-10 text-red-500 font-bold">Error: Theme '{uiTheme}' not found.</div>;

  return (
    <div className={`flex h-screen w-screen ${theme.canvas} overflow-hidden font-sans relative transition-colors duration-500 select-none`}>
      {/* Sidebar Navigation & Tools */}
      <Toolbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Sidebar: Pages + Layers */}
        <div className={`w-[300px] flex flex-col h-full border-r ${theme.sidebar} ${theme.border}`}>
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

        {/* Property Controls */}
        <PropertiesPanel />
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
