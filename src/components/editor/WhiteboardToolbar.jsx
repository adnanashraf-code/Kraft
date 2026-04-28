import React from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../../store/useEditorStore";
import {
  Square,
  Type,
  MousePointer2,
  Settings,
  HelpCircle,
  FileText,
  LayoutGrid,
  LayoutList,
  PenTool,
  Copy,
  Layers,
  Monitor,
  Hexagon,
  Download,
  Plus,
  ArrowUpRight,
  Minus,
} from "lucide-react";
import { THEMES } from "../../utils/themes";
import ExportModal from "../../components/editor/overlays/ExportModal";

const ToolButton = React.memo(({ id, icon: Icon, title, onClick, active = false, theme, isLight }) => {
  if (!Icon) return null;
  return (
    <button
      id={id}
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`
        p-2.5 rounded-xl transition-all duration-200 group relative shrink-0
        ${
          active
            ? "bg-blue-600 text-white shadow-lg scale-110"
            : `${theme.text} ${isLight ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/10 hover:text-white"}`
        }
      `}
    >
      <Icon
        size={20}
        className={active ? "" : "group-hover:scale-110 transition-transform"}
      />
      
      {/* Tooltip on hover */}
      <div className="absolute left-14 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
        {title}
      </div>
    </button>
  );
});

const WhiteboardToolbar = ({ onToggleLeft, onToggleRight }) => {
  const navigate = useNavigate();
  const {
    addElement, clearSelection, uiTheme, selectedElementIds,
    setTemplatesOpen, setAssetsOpen, setSettingsOpen, isShapePickerOpen, setShapePickerOpen,
    isExportOpen, setExportOpen, projectName, setProjectName, isSaving
  } = useEditorStore();

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === "light" || uiTheme === "gray";

  const handleAddText = React.useCallback(() => {
    const { canvas } = useEditorStore.getState();
    const zoomScale = (canvas.zoom || 100) / 100;
    const centerX = (-canvas.panX + window.innerWidth / 2) / zoomScale;
    const centerY = (-canvas.panY + window.innerHeight / 2) / zoomScale;
    addElement({ type: "text", x: centerX - 100, y: centerY - 20, w: 200, h: 40, content: "New Text", fill: "transparent" });
  }, [addElement]);

  const handleResetView = React.useCallback(() => {
    const { setZoom, setPanX, setPanY, addNotification } = useEditorStore.getState();
    setZoom(100); setPanX(0); setPanY(0);
    addNotification('View reset to default', 'info');
  }, []);

  return (
    <>
      {/* Top Center Pill */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 pointer-events-auto z-50">
        <div className={`flex items-center px-4 py-2 rounded-2xl border shadow-2xl backdrop-blur-xl bg-opacity-80 ${theme.sidebar} ${theme.border} space-x-3`}>
          <div 
            className="p-1.5 rounded-lg hover:bg-black/5 cursor-pointer transition-colors"
            onClick={() => navigate('/')}
          >
             <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-black text-[10px]">K</div>
          </div>
          
          <div className="flex flex-col min-w-[120px]">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className={`bg-transparent text-sm font-bold outline-none ${isSaving ? "text-blue-500" : theme.text} transition-all truncate`}
              placeholder="Untitled Workspace"
            />
            <span className={`text-[9px] uppercase tracking-widest transition-all ${isSaving ? "opacity-100 text-blue-500" : "opacity-40"}`}>
              {isSaving ? "Syncing..." : "Saved to Cloud"}
            </span>
          </div>

          <div className={`h-8 w-px ${theme.border} border-l mx-1`} />
          
          <ToolButton icon={Monitor} title="Reset View" onClick={handleResetView} theme={theme} isLight={isLight} />
          <ToolButton icon={Settings} title="Settings" onClick={() => setSettingsOpen(true)} theme={theme} isLight={isLight} />
          <ToolButton icon={LayoutGrid} title="Design Mode" onClick={() => navigate('/editor')} theme={theme} isLight={isLight} />
          <ToolButton icon={LayoutList} title="Layers" onClick={onToggleLeft} theme={theme} isLight={isLight} />
          <ToolButton icon={Download} title="Export" onClick={() => setExportOpen(true)} theme={theme} isLight={isLight} />
        </div>
      </div>

      {/* Vertical Floating Toolbar (Eraser Style) */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 pointer-events-auto z-50">
        <div className={`p-2 rounded-2xl border shadow-2xl backdrop-blur-xl bg-opacity-80 ${theme.sidebar} ${theme.border} flex flex-col space-y-2`}>
          <ToolButton
            icon={MousePointer2}
            title="Select (V)"
            onClick={clearSelection}
            active={selectedElementIds.length === 0}
            theme={theme}
            isLight={isLight}
          />
          <ToolButton
            icon={Square}
            title="Rectangle (R)"
            onClick={() => addElement({ type: 'rectangle', x: 100, y: 100 })}
            theme={theme}
            isLight={isLight}
          />
          <ToolButton
            icon={Hexagon}
            title="Circle (O)"
            onClick={() => addElement({ type: 'circle', x: 100, y: 100, w: 100, h: 100 })}
            theme={theme}
            isLight={isLight}
          />
          
          <ToolButton
            icon={FileText}
            title="Sticky Note (S)"
            onClick={() => addElement({ type: 'rectangle', x: 100, y: 100, w: 150, h: 150, fill: '#fef08a', strokeWidth: 1, strokeColor: '#eab308', name: 'Sticky Note' })}
            theme={theme}
            isLight={isLight}
          />
          
          <div className={`w-8 h-px ${theme.border} border-b my-1 self-center opacity-50`} />
          
          <ToolButton
            icon={ArrowUpRight}
            title="Arrow (A)"
            onClick={() => addElement({ type: 'arrow', x: 200, y: 200, w: 100, h: 100, startX: 0, startY: 0, endX: 100, endY: 100, strokeWidth: 3, name: 'Arrow' })}
            theme={theme}
            isLight={isLight}
          />
          <ToolButton
            icon={Minus}
            title="Line (L)"
            onClick={() => addElement({ type: 'line', x: 200, y: 250, w: 100, h: 100, startX: 0, startY: 0, endX: 100, endY: 0, strokeWidth: 3, name: 'Line' })}
            theme={theme}
            isLight={isLight}
          />
          <ToolButton
            icon={PenTool}
            title="Draw (D)"
            onClick={() => addElement({ 
              type: 'pencil', 
              x: 300, y: 300, w: 150, h: 100, 
              points: [
                {x: 0, y: 50}, {x: 20, y: 30}, {x: 50, y: 70}, {x: 80, y: 20}, {x: 120, y: 50}, {x: 150, y: 40}
              ], 
              strokeWidth: 3, 
              name: 'Scribble' 
            })}
            theme={theme}
            isLight={isLight}
          />
          
          <div className={`w-8 h-px ${theme.border} border-b my-1 self-center opacity-50`} />

          <ToolButton
            icon={Type}
            title="Text (T)"
            onClick={handleAddText}
            theme={theme}
            isLight={isLight}
          />
          
          <ToolButton
            icon={Plus}
            title="More Assets"
            onClick={() => setAssetsOpen(true)}
            theme={theme}
            isLight={isLight}
          />
        </div>
      </div>
      
      <ExportModal />
    </>
  );
};

export default WhiteboardToolbar;
