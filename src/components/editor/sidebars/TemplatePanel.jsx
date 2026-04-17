import React from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, FileDown, LayoutGrid } from 'lucide-react';
import { TEMPLATES } from '../../../data/templatesData';
import TemplateThumbnail from '../overlays/TemplateThumbnail';

const TemplatePanel = () => {
  const { setFlyout, uiTheme, addElement, pages, activePageId, clearSelection } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  const handleImport = (template) => {
    clearSelection();
    const offsetX = elements.length > 0 ? 50 : 0;
    const offsetY = elements.length > 0 ? 50 : 0;

    template.elements.forEach((el, index) => {
      addElement({
        ...el,
        id: `imported_${Date.now()}_${index}`,
        x: el.x + offsetX,
        y: el.y + offsetY
      });
    });
  };

  return (
    <div className={`w-80 h-full flex flex-col border-r ${theme.border} ${theme.sidebar} animate-in slide-in-from-left duration-300`}>
      <div className={`p-6 border-b ${theme.border} flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <LayoutGrid size={16} className="text-blue-600" />
          <h2 className={`font-black uppercase tracking-widest text-xs ${isLight ? 'text-gray-900' : 'text-white'}`}>Templates</h2>
        </div>
        <button onClick={() => setFlyout('none')} className={`p-1.5 rounded-lg hover:${isLight ? 'bg-gray-100' : 'bg-white/5'} ${theme.title}`}>
          <X size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {TEMPLATES.map(template => (
          <div 
            key={template.id}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all cursor-pointer ${isLight ? 'bg-white border-gray-200 hover:border-blue-500/50' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
            onClick={() => handleImport(template)}
          >
            <div className="h-32 w-full relative overflow-hidden bg-white">
              <TemplateThumbnail template={template} scale={0.1} />
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/80 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <FileDown size={20} className="text-white" />
              </div>
            </div>
            <div className="p-3">
              <div className={`text-[10px] font-bold uppercase tracking-widest leading-none mb-1 ${isLight ? 'text-gray-400' : 'text-gray-500'}`}>{template.category}</div>
              <div className={`text-[11px] font-black truncate ${isLight ? 'text-gray-900' : 'text-white/90'}`}>{template.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplatePanel;
