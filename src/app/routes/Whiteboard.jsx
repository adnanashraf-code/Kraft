import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useEditorStore from "../../store/useEditorStore";
import WhiteboardToolbar from "../../components/editor/WhiteboardToolbar";
import Canvas from "../../components/canvas/Canvas";
import { THEMES } from "../../utils/themes";

// Lazy load panels for the whiteboard
const LayersPanel = React.lazy(() => import("../../components/editor/LayersPanel"));
const PagesPanel = React.lazy(() => import("../../components/editor/PagesPanel"));
const PropertiesPanel = React.lazy(() => import("../../components/editor/PropertiesPanel"));
const ContextMenu = React.lazy(() => import("../../components/common/ContextMenu"));

// Modals
const SettingsModal = React.lazy(() => import("../../components/editor/overlays/SettingsModal"));
const TemplatesModal = React.lazy(() => import("../../components/editor/overlays/TemplatesModal"));
const AssetsModal = React.lazy(() => import("../../components/editor/overlays/AssetsModal"));
const ShapePicker = React.lazy(() => import("../../components/editor/overlays/ShapePicker"));

import TrashBin from "../../components/canvas/TrashBin";
import FontLoader from "../../components/common/FontLoader";
import ToastContainer from "../../components/common/ToastContainer";
import Delayed from "../../components/common/Delayed";

const Whiteboard = () => {
  const { uiTheme } = useEditorStore();
  const theme = THEMES[uiTheme];
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = React.useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = React.useState(false);

  if (!theme) return <div className="p-10 text-red-500 font-bold">Error: Theme '{uiTheme}' not found.</div>;

  return (
    <div className={`h-screen w-screen ${theme.canvas} overflow-hidden font-sans relative select-none`}>
      {/* Infinite Canvas Layer */}
      <div id="canvas-container" className="absolute inset-0 overflow-hidden">
        <Canvas sketchy={true} />
      </div>

      {/* Whiteboard Floating UI */}
      <WhiteboardToolbar 
        onToggleLeft={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)} 
        onToggleRight={() => setIsRightSidebarOpen(!isRightSidebarOpen)} 
      />

      {/* Floating Left Panel (Layers/Pages) */}
      {isLeftSidebarOpen && (
        <div className={`
          absolute top-24 bottom-24 left-24 w-[300px] z-40 rounded-3xl border shadow-2xl overflow-hidden flex flex-col
          ${theme.sidebar} ${theme.border} backdrop-blur-2xl bg-opacity-80 animate-in slide-in-from-left duration-300
        `}>
          <React.Suspense fallback={<Delayed delay={500}><div className="flex-1 bg-black/5 animate-pulse" /></Delayed>}>
            <PagesPanel />
            <LayersPanel />
          </React.Suspense>
        </div>
      )}

      {/* Floating Right Panel (Properties) */}
      {isRightSidebarOpen && (
        <div className={`
          absolute top-24 bottom-24 right-24 w-[320px] z-40 rounded-3xl border shadow-2xl overflow-hidden
          ${theme.sidebar} ${theme.border} backdrop-blur-2xl bg-opacity-80 animate-in slide-in-from-right duration-300
        `}>
          <React.Suspense fallback={<Delayed delay={500}><div className="w-full h-full bg-black/5 animate-pulse" /></Delayed>}>
            <PropertiesPanel />
          </React.Suspense>
        </div>
      )}

      {/* Global Systems */}
      <React.Suspense fallback={null}>
        <ContextMenu />
        <SettingsModal />
        <TemplatesModal />
        <AssetsModal />
        <ShapePicker />
      </React.Suspense>
      
      <TrashBin />
      <FontLoader />
      <ToastContainer />
    </div>
  );
};

export default Whiteboard;
