import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { Square, Type, MousePointer2, Search, Settings, HelpCircle, FileText, LayoutList, PenTool, Copy, Layers, Sun, Moon, Monitor } from 'lucide-react';
import { THEMES } from '../../utils/themes';

const Toolbar = () => {
  const { 
    addElement, clearSelection, uiTheme, setUiTheme, selectedElementIds, 
    setSearchOpen, isTemplatesOpen, setTemplatesOpen, isAssetsOpen, setAssetsOpen, setSettingsOpen 
  } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  const handleAddRectangle = () => {
    addElement({
      type: 'rectangle',
      x: 350, y: 150, w: 150, h: 100,
      fill: isLight ? '#60a5fa' : '#334155' 
    });
  };

  const handleAddText = () => {
    addElement({
      type: 'text',
      x: 300, y: 150, w: 200, h: 40,
      content: 'Heading Text',
      fill: 'transparent'
    });
  };

  const ToolButton = ({ icon: Icon, title, onClick, active = false }) => (
    <button 
      onClick={onClick}
      title={title}
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
      {/* macOS Traffic Lights Style */}
      <div className="flex space-x-1.5 mb-8">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
      </div>

      {/* Main Tools Container */}
      <div className="flex flex-col items-center space-y-2 w-full px-2">
        <ToolButton icon={MousePointer2} title="Selection" onClick={clearSelection} active={selectedElementIds.length === 0} />
        <ToolButton icon={Square} title="Rectangle" onClick={handleAddRectangle} />
        <ToolButton icon={Type} title="Text" onClick={handleAddText} />
        
        <div className={`w-8 h-px ${theme.border} border-b my-2`} />
        
        <ToolButton 
          icon={LayoutList} 
          title="Templates" 
          onClick={() => setTemplatesOpen(true)} 
          active={isTemplatesOpen} 
        />
        <ToolButton 
          icon={Layers} 
          title="Assets" 
          onClick={() => setAssetsOpen(true)} 
          active={isAssetsOpen} 
        />
        <ToolButton icon={Search} title="Search" onClick={() => setSearchOpen(true)} />
      </div>

      {/* Theme Toggler at bottom */}
      <div className="mt-auto flex flex-col items-center space-y-3 w-full px-2">
        <div className={`flex flex-col items-center p-1 rounded-2xl ${theme.sidebar} border ${theme.border} space-y-1 shadow-sm`}>
          <button 
            onClick={() => setUiTheme('light')} 
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === 'light' ? 'bg-blue-600 text-white shadow-sm' : `text-gray-500 hover:${isLight ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/5'}`}`}
          >
            <Sun size={14} />
          </button>
          <button 
            onClick={() => setUiTheme('gray')} 
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === 'gray' ? (isLight ? 'bg-gray-800 text-white' : 'bg-white/20 text-white') : `text-gray-500 hover:${isLight ? 'text-gray-800 bg-gray-100' : 'text-white'}`}`}
          >
            <Monitor size={14} />
          </button>
          <button 
            onClick={() => setUiTheme('dark')} 
            className={`p-1.5 rounded-lg transition-colors ${uiTheme === 'dark' ? 'bg-blue-600 text-white shadow-sm' : `text-gray-500 hover:${isLight ? 'text-blue-600 bg-blue-50' : 'text-white bg-white/5'}`}`}
          >
            <Moon size={14} />
          </button>
        </div>

        <ToolButton icon={Settings} title="Settings" onClick={() => setSettingsOpen(true)} />
      </div>
    </div>
  );
};

export default Toolbar;
