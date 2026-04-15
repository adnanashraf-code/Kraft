import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Square, Type, MousePointer2, Search, Settings, HelpCircle, FileText, LayoutList, PenTool, Copy, Layers, Sun, Moon, Monitor, Hexagon } from 'lucide-react';
import { THEMES } from '../../utils/themes';
import logo from '../../assets/logo.png';

const Toolbar = () => {
  const { 
    addElement, clearSelection, uiTheme, setUiTheme, selectedElementIds, 
    setSearchOpen, isTemplatesOpen, setTemplatesOpen, isAssetsOpen, setAssetsOpen, setSettingsOpen,
    isShapePickerOpen, setShapePickerOpen, isHelpOpen, setHelpOpen
  } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';



  const handleAddText = () => {
    addElement({
      type: 'text',
      x: 300, y: 150, w: 200, h: 40,
      content: 'Heading Text',
      fill: 'transparent'
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
        ${active 
          ? 'bg-blue-600 text-white shadow-lg' 
          : `${theme.text} hover:${isLight ? 'bg-blue-50 text-blue-600' : 'bg-white/10 text-white'}`}
      `}
    >
      <Icon size={18} className={active ? '' : 'group-hover:scale-110 transition-transform'} />
    </button>
  );

  return (
    <div className={`w-16 ${theme.rail} ${theme.border} border-r flex flex-col items-center py-4 shrink-0 transition-all z-20`}>
      {/* Brand Logo Section */}
      <div className="flex flex-col items-center mb-8 group cursor-pointer" onClick={() => window.location.href = '/'}>
        <div className={`w-10 h-10 rounded-xl overflow-hidden border ${theme.border} shadow-sm mb-1.5 transition-transform group-hover:scale-110 duration-300`}>
          <img src={logo} alt="KRAFT" className="w-full h-full object-cover" />
        </div>
        <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${theme.text} opacity-40 group-hover:opacity-100 transition-opacity`}>Kraft</span>
      </div>

      {/* Main Tools Container */}
      <div className="flex flex-col items-center space-y-2 w-full px-2">
        <ToolButton id="tool-select" icon={MousePointer2} title="Selection" onClick={clearSelection} active={selectedElementIds.length === 0 && !isShapePickerOpen} />
        <ToolButton id="tool-shapes" icon={Hexagon} title="Shapes" onClick={() => setShapePickerOpen(!isShapePickerOpen)} active={isShapePickerOpen} />
        <ToolButton id="tool-text" icon={Type} title="Text" onClick={handleAddText} />
        
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
        <ToolButton id="tool-search" icon={Search} title="Search" onClick={() => setSearchOpen(true)} />
      </div>

      {/* Theme Toggler at bottom */}
      <div className="mt-auto flex flex-col items-center space-y-3 w-full px-2">
        <div className={`flex flex-col items-center p-1 rounded-2xl ${theme.sidebar} border ${theme.border} space-y-1 shadow-sm`}>
          <button 
            onClick={() => setUiTheme('light')} 
            aria-label="Light Theme"
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === 'light' ? 'bg-blue-600 text-white shadow-sm' : `text-gray-500 hover:${isLight ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/5'}`}`}
          >
            <Sun size={14} />
          </button>
          <button 
            onClick={() => setUiTheme('gray')} 
            aria-label="Gray Theme"
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === 'gray' ? (isLight ? 'bg-gray-800 text-white' : 'bg-white/20 text-white') : `text-gray-500 hover:${isLight ? 'text-gray-800 bg-gray-100' : 'text-white'}`}`}
          >
            <Monitor size={14} />
          </button>
          <button 
            onClick={() => setUiTheme('dark')} 
            aria-label="Dark Theme"
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === 'dark' ? 'bg-blue-600 text-white shadow-sm' : `text-gray-500 hover:${isLight ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/5'}`}`}
          >
            <Moon size={14} />
          </button>
        </div>

        <ToolButton id="tool-help" icon={HelpCircle} title="Help" onClick={() => setHelpOpen(true)} active={isHelpOpen} />
        <ToolButton id="tool-settings" icon={Settings} title="Settings" onClick={() => setSettingsOpen(true)} />
      </div>
    </div>
  );
};

export default Toolbar;
