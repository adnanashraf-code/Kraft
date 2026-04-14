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
import TrashBin from '../../components/canvas/TrashBin';
import { THEMES } from '../../utils/themes';

const Editor = () => {
  const { uiTheme } = useEditorStore();
  const theme = THEMES[uiTheme];

  // Safety check for theme
  if (!theme) return <div className="p-10 text-red-500 font-bold">Error: Theme '{uiTheme}' not found.</div>;

  return (
    <div className={`flex h-screen w-screen ${theme.canvas} overflow-hidden font-sans relative transition-colors duration-500`}>
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
      <TrashBin />
    </div>
  );
};

export default Editor;
