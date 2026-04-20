import React from "react";
import { useNavigate } from "react-router-dom";
import useEditorStore from "../../store/useEditorStore";
import {
  Square,
  Type,
  MousePointer2,
  Search,
  Settings,
  HelpCircle,
  FileText,
  LayoutList,
  PenTool,
  Copy,
  Layers,
  Sun,
  Moon,
  Monitor,
  Hexagon,
  Download,
  Upload,
} from "lucide-react";
import { THEMES } from "../../utils/themes";
import logo from "../../assets/logo.png";
import ExportModal from "../../components/editor/overlays/ExportModal";

const Toolbar = () => {
  const navigate = useNavigate();
  const {
    addElement,
    clearSelection,
    uiTheme,
    setUiTheme,
    selectedElementIds,
    setSearchOpen,
    isTemplatesOpen,
    setTemplatesOpen,
    isAssetsOpen,
    setAssetsOpen,
    setSettingsOpen,
    isShapePickerOpen,
    setShapePickerOpen,
    isHelpOpen,
    setHelpOpen,
    isExportOpen,
    setExportOpen,
    projectName,
    setProjectName,
    isSaving,
    uploadImage,
  } = useEditorStore();

  const fileInputRef = React.useRef(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const dataUrl = event.target.result;
        uploadImage(dataUrl, file.name, img.width, img.height);
        // Also add it directly to canvas for better UX
        addElement({
          type: 'image',
          name: file.name,
          src: dataUrl,
          w: img.width > 800 ? 800 : img.width, // Cap initial size
          h: img.height > 800 ? 800 : img.height,
          x: 100,
          y: 100
        });
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };
  const isSaving = false; // Mocking or pulling from store
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === "light" || uiTheme === "gray";

  const handleAddText = () => {
    addElement({
      type: "text",
      x: 300,
      y: 150,
      w: 200,
      h: 40,
      content: "Heading Text",
      fill: "transparent",
    });
  };

  const ToolButton = ({ id, icon: Icon, title, onClick, active = false }) => (
    <button
      id={id}
      onClick={onClick}
      title={title}
      className={`
        p-2.5 rounded-2xl transition-all duration-200 group relative neo-border-sm
        ${
          active
            ? "bg-yellow-400 text-black neo-shadow-sm -translate-y-0.5"
            : `bg-white text-black hover:bg-gray-50 hover:-translate-y-0.5 hover:neo-shadow-xs`
        }
      `}
    >
      <Icon
        size={18}
        strokeWidth={active ? 3 : 2}
        className={active ? "" : "group-hover:scale-110 transition-transform"}
      />
    </button>
  );

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4">
      <ExportModal />
      
      {/* BRAND & PROJECT DOCK */}
      <div className="neo-dock flex items-center px-4 py-2 gap-4">
        <div 
          className="w-10 h-10 neo-border-sm rounded-xl overflow-hidden cursor-pointer hover:rotate-3 transition-transform"
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="KRAFT" className="w-full h-full object-cover" />
        </div>
        
        <div className="flex flex-col">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none text-black w-24"
            placeholder="KRAFT"
          />
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]" />
             <span className="text-[8px] font-black uppercase tracking-tighter opacity-40">Live-Sync</span>
          </div>
        </div>
      </div>

      {/* TOOLS DOCK */}
      <div className="neo-dock flex items-center px-2 py-2 gap-2">
        <ToolButton
          id="tool-select"
          icon={MousePointer2}
          onClick={clearSelection}
          active={selectedElementIds.length === 0 && !isShapePickerOpen}
        />
        <ToolButton
          id="tool-shapes"
          icon={Hexagon}
          onClick={() => setShapePickerOpen(!isShapePickerOpen)}
          active={isShapePickerOpen}
        />
        <ToolButton
          id="tool-text"
          icon={Type}
          onClick={handleAddText}
        />
        <ToolButton
          id="tool-upload"
          icon={Upload}
          onClick={handleUploadClick}
        />
        
        <div className="w-[2px] h-8 bg-black/10 mx-1" />

        <ToolButton
          id="tool-templates"
          icon={LayoutList}
          onClick={() => setTemplatesOpen(true)}
          active={isTemplatesOpen}
        />
        <ToolButton
          id="tool-assets"
          icon={Layers}
          onClick={() => setAssetsOpen(true)}
          active={isAssetsOpen}
        />
        <ToolButton
          id="tool-export"
          icon={Download}
          onClick={() => setExportOpen(true)}
          active={isExportOpen}
        />
      </div>

      {/* QUICK ACTIONS DOCK */}
      <div className="neo-dock flex items-center px-2 py-2 gap-2">
        <ToolButton
          id="tool-settings"
          icon={Settings}
          onClick={() => setSettingsOpen(true)}
        />
        <button 
          onClick={() => setUiTheme(uiTheme === 'dark' ? 'light' : 'dark')}
          className="w-10 h-10 neo-border-sm rounded-xl flex items-center justify-center bg-white hover:bg-gray-50 transition-all hover:-translate-y-0.5 hover:neo-shadow-xs"
        >
          {uiTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Toolbar;
