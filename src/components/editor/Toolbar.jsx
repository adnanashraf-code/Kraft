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
      aria-label={title}
      className={`
        p-2.5 rounded-xl transition-all duration-200 group relative
        ${
          active
            ? "bg-blue-600 text-white shadow-lg"
            : `${theme.text} ${isLight ? "hover:bg-blue-50 hover:text-blue-600" : "hover:bg-white/10 hover:text-white"}`
        }
      `}
    >
      <Icon
        size={18}
        className={active ? "" : "group-hover:scale-110 transition-transform"}
      />
    </button>
  );

  return (
    <div
      className={`w-16 ${theme.rail} ${theme.border} border-r flex flex-col items-center py-4 shrink-0 transition-all z-20`}
    >
      <ExportModal />
      {/* Brand Logo & Project Title */}
      <div className="flex flex-col items-center mb-8 px-2 w-full">
        <div
          className="group cursor-pointer mb-2"
          onClick={() => navigate('/')}
        >
          <div
            className={`w-10 h-10 rounded-xl overflow-hidden border ${theme.border} shadow-sm transition-transform group-hover:scale-110 duration-300`}
          >
            <img
              src={logo}
              alt="KRAFT"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center w-full mt-1">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className={`w-full bg-transparent text-[11px] font-black uppercase tracking-widest text-center outline-none ${isSaving ? "text-blue-500" : theme.text} opacity-60 focus:opacity-100 transition-all`}
            placeholder="KRAFT"
          />
          <div
            className={`text-[8px] font-bold uppercase tracking-tighter transition-all duration-300 ${isSaving ? "text-blue-500 opacity-100" : "opacity-0"}`}
          >
            Saving...
          </div>
        </div>
      </div>

      {/* Main Tools Container */}
      <div className="flex flex-col items-center space-y-2 w-full px-2">
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
        />

        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className={`w-8 h-px ${theme.border} border-b my-2`} />

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
        />
      </div>

      {/* Theme Toggler at bottom */}
      <div className="mt-auto flex flex-col items-center space-y-3 w-full px-2">
        <div
          className={`flex flex-col items-center p-1 rounded-2xl ${theme.sidebar} border ${theme.border} space-y-1 shadow-sm`}
        >
          <button
            onClick={() => setUiTheme("light")}
            aria-label="Light Theme"
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === "light" ? "bg-blue-600 text-white shadow-sm" : `text-gray-500 ${isLight ? "hover:text-blue-600 hover:bg-blue-50" : "hover:text-white hover:bg-white/5"}`}`}
          >
            <Sun size={14} />
          </button>
          <button
            onClick={() => setUiTheme("gray")}
            aria-label="Gray Theme"
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === "gray" ? (isLight ? "bg-gray-800 text-white" : "bg-white/20 text-white") : `text-gray-500 ${isLight ? "hover:text-gray-800 hover:bg-gray-200" : "hover:text-white hover:bg-white/10"}`}`}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setUiTheme("dark")}
            aria-label="Dark Theme"
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === "dark" ? "bg-blue-600 text-white shadow-sm" : `text-gray-500 ${isLight ? "hover:text-blue-600 hover:bg-blue-50" : "hover:text-white hover:bg-white/5"}`}`}
          >
            <Moon size={14} />
          </button>
        </div>

        <ToolButton
          id="tool-shortcuts"
          icon={Monitor}
          title="Shortcuts"
          onClick={() => setHelpOpen(true)}
          active={isHelpOpen}
        />
        <ToolButton
          id="tool-help"
          icon={HelpCircle}
          title="Expert Guide"
          onClick={() => setHelpOpen(true)}
        />
        <ToolButton
          id="tool-settings"
          icon={Settings}
          title="Settings"
          onClick={() => setSettingsOpen(true)}
        />
      </div>
    </div>
  );
};

export default Toolbar;
