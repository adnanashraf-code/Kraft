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
  SlidersHorizontal,
} from "lucide-react";
import { THEMES } from "../../utils/themes";
import logo from "../../assets/logo.png";
import ExportModal from "../../components/editor/overlays/ExportModal";

const Toolbar = ({ onToggleLeft, onToggleRight }) => {
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

  const ToolButton = ({ id, icon: Icon, title, onClick, active = false, className = "" }) => (
    <button
      id={id}
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`
        p-2 md:p-2.5 rounded-lg md:rounded-xl transition-all duration-200 group relative shrink-0
        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : `${theme.text} ${isLight ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/10 hover:text-white"}`
        }
        ${className}
      `}
    >
      <Icon
        size={18}
        className={active ? "" : "group-hover:scale-110 transition-transform"}
      />
    </button>
  );

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const NavContent = () => (
    <>
      {/* Mobile Toggle Left */}
      <ToolButton 
        icon={LayoutList} 
        onClick={onToggleLeft} 
        title="Toggle Layers" 
        className="md:hidden mr-2" 
      />

      {/* Brand Logo & Project Title */}
      <div className="flex md:flex-col items-center md:mb-8 px-1 md:px-2 md:w-full overflow-hidden">
        <div
          className="group cursor-pointer mr-2 md:mr-0 md:mb-2 shrink-0"
          onClick={() => navigate('/')}
        >
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl overflow-hidden border ${theme.border} shadow-sm transition-transform group-hover:scale-110 duration-300`}
          >
            <img
              src={logo}
              alt="KRAFT"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-start md:items-center w-24 md:w-full min-w-0">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className={`w-full bg-transparent text-[10px] md:text-[11px] font-black uppercase tracking-widest text-left md:text-center outline-none ${isSaving ? "text-blue-500" : theme.text} opacity-60 focus:opacity-100 transition-all truncate`}
            placeholder="KRAFT"
          />
          <div
            className={`text-[7px] md:text-[8px] font-bold uppercase tracking-tighter transition-all duration-300 ${isSaving ? "text-blue-500 opacity-100" : "opacity-0"}`}
          >
            Saving...
          </div>
        </div>
      </div>

      <div className="flex-1 md:hidden" />

      {/* Top Right Controls (Mobile) */}
      <div className="flex items-center space-x-1 md:hidden">
        <ToolButton
          id="tool-upload-mobile"
          icon={Upload}
          title="Upload Image"
          onClick={handleUploadClick}
        />
        <ToolButton
          icon={SlidersHorizontal}
          title="Properties"
          onClick={onToggleRight}
        />
      </div>
    </>
  );

  const ToolsContent = () => (
    <>
      <ToolButton
        id="tool-select"
        icon={MousePointer2}
        title="Selection (V)"
        onClick={clearSelection}
        active={selectedElementIds.length === 0 && !isShapePickerOpen}
      />
      <ToolButton
        id="tool-shapes"
        icon={Hexagon}
        title="Shapes (R)"
        onClick={() => setShapePickerOpen(!isShapePickerOpen)}
        active={isShapePickerOpen}
      />
      <ToolButton
        id="tool-text"
        icon={Type}
        title="Text (T)"
        onClick={handleAddText}
      />
      <ToolButton
        id="tool-upload"
        icon={Upload}
        title="Upload Image"
        onClick={handleUploadClick}
        className="hidden md:flex"
      />

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className={`hidden md:block w-8 h-px ${theme.border} border-b my-2`} />

      <ToolButton
        id="tool-templates"
        icon={LayoutList}
        title="Templates"
        onClick={() => setTemplatesOpen(true)}
        active={isTemplatesOpen}
      />
      <ToolButton
        id="tool-assets"
        icon={Layers}
        title="Assets"
        onClick={() => setAssetsOpen(true)}
        active={isAssetsOpen}
      />
      <ToolButton
        id="tool-export"
        icon={Download}
        title="Export (E)"
        onClick={() => setExportOpen(true)}
        active={isExportOpen}
      />
      <ToolButton
        id="tool-search"
        icon={Search}
        title="Search"
        onClick={() => setSearchOpen(true)}
        className="hidden sm:flex"
      />
    </>
  );

  const BottomControls = () => (
    <div className="md:mt-auto flex md:flex-col items-center space-x-2 md:space-x-0 md:space-y-3 px-2">
      <div
        className={`hidden sm:flex md:flex-col items-center p-1 rounded-xl md:rounded-2xl ${theme.sidebar} border ${theme.border} space-x-1 md:space-x-0 md:space-y-1 shadow-sm`}
      >
        <button
          onClick={() => setUiTheme("light")}
          className={`p-1 md:p-1.5 rounded-lg transition-colors ${uiTheme === "light" ? "bg-blue-600 text-white shadow-sm" : `text-gray-500 ${isLight ? "hover:text-blue-600 hover:bg-blue-50" : "hover:text-white hover:bg-white/5"}`}`}
        >
          <Sun size={12} className="md:w-3.5 md:h-3.5" />
        </button>
        <button
          onClick={() => setUiTheme("gray")}
          className={`p-1 md:p-1.5 rounded-lg transition-colors ${uiTheme === "gray" ? (isLight ? "bg-gray-800 text-white" : "bg-white/20 text-white") : `text-gray-500 ${isLight ? "hover:text-gray-800 hover:bg-gray-200" : "hover:text-white hover:bg-white/10"}`}`}
        >
          <Monitor size={12} className="md:w-3.5 md:h-3.5" />
        </button>
        <button
          onClick={() => setUiTheme("dark")}
          className={`p-1 md:p-1.5 rounded-lg transition-colors ${uiTheme === "dark" ? "bg-blue-600 text-white shadow-sm" : `text-gray-500 ${isLight ? "hover:text-blue-600 hover:bg-blue-50" : "hover:text-white hover:bg-white/5"}`}`}
        >
          <Moon size={12} className="md:w-3.5 md:h-3.5" />
        </button>
      </div>

      <ToolButton
        id="tool-settings"
        icon={Settings}
        title="Settings"
        onClick={() => setSettingsOpen(true)}
        className="hidden md:flex"
      />
    </div>
  );

  return (
    <>
      {/* Top Navbar (Mobile & Desktop) */}
      <div className={`w-full md:w-16 h-14 md:h-full ${theme.rail} ${theme.border} border-b md:border-b-0 md:border-r flex md:flex-col items-center px-4 md:px-0 py-0 md:py-4 shrink-0 transition-all z-50`}>
        <ExportModal />
        <NavContent />
        
        {/* Main Tools Container (Desktop Only) */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-start space-y-2 w-full px-2 mt-4">
          <ToolsContent />
        </div>

        {/* Bottom Controls (Desktop Only) */}
        <div className="hidden md:flex mt-auto">
          <BottomControls />
        </div>
      </div>

      {/* Bottom Toolbar (Mobile Only) */}
      <div className={`md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center p-2 rounded-2xl border shadow-2xl ${theme.sidebar} ${theme.border} backdrop-blur-xl bg-opacity-80`}>
        <div className="flex items-center space-x-2">
          <ToolsContent />
          <div className={`w-px h-6 ${theme.border} border-l mx-1`} />
          <ToolButton
            icon={Settings}
            title="Settings"
            onClick={() => setSettingsOpen(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Toolbar;
