import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import Toolbar from '../../components/editor/Toolbar';
import LayersPanel from '../../components/editor/LayersPanel';
import PropertiesPanel from '../../components/editor/PropertiesPanel';
import Canvas from '../../components/canvas/Canvas';
import ContextMenu from '../../components/common/ContextMenu';
import SettingsModal from '../../components/editor/overlays/SettingsModal';
import TemplatesModal from '../../components/editor/overlays/TemplatesModal';
import AssetsModal from '../../components/editor/overlays/AssetsModal';
import ShapePicker from '../../components/editor/overlays/ShapePicker';
import HelpModal from '../../components/editor/overlays/HelpModal';
import OnboardingTour from '../../components/editor/overlays/OnboardingTour';
import TrashBin from '../../components/canvas/TrashBin';
import { THEMES } from '../../utils/themes';
import { useEffect } from 'react';

const Editor = () => {
  const { 
    uiTheme, setOnboardingOpen, selectedElementIds, 
    groupElements, ungroupElements, deleteElements, duplicateElements,
    undo, redo
  } = useEditorStore();
  const theme = THEMES[uiTheme];

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
      } else if (e.key === 'Delete' || e.key === 'Backspace') {
        deleteElements(selectedElementIds);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementIds, groupElements, ungroupElements, deleteElements, duplicateElements]);

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('kraft_onboarded');
    if (!hasOnboarded) {
      setTimeout(() => setOnboardingOpen(true), 1000);
    }
  }, [setOnboardingOpen]);

  // Safety check for theme
  if (!theme) return <div className="p-10 text-red-500 font-bold">Error: Theme '{uiTheme}' not found.</div>;

  return (
    <div className={`flex h-screen w-screen ${theme.canvas} overflow-hidden font-sans relative transition-colors duration-500 select-none`}>
      {/* Sidebar Navigation & Tools */}
      <Toolbar />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Layer Stack */}
        <LayersPanel />
        
        {/* Main Canvas Area */}
        <div className={`flex-1 relative overflow-hidden ${theme.canvas}`}>
          <Canvas />
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
    </div>
  );
};

export default Editor;
