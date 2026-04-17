import React from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, FileDown } from 'lucide-react';
import { TEMPLATES } from '../../../data/templatesData';
import TemplateThumbnail from './TemplateThumbnail';

const TemplatesModal = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const { isTemplatesOpen, setTemplatesOpen, uiTheme, addElement, elements, clearSelection } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  // Filter templates based on search
  const filteredTemplates = TEMPLATES.filter(template => 
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Import a template to the canvas
  const handleImport = (template) => {
    // Basic implementation: Clear selection and add template elements
    clearSelection();
    
    // We can either clear the canvas or just add them. 
    // For now, let's just add them at a slight offset if there are already elements
    const offsetX = elements.length > 0 ? 50 : 0;
    const offsetY = elements.length > 0 ? 50 : 0;

    template.elements.forEach((el, index) => {
      // We generate a new ID for each imported element to avoid collisions
      const newId = `imported_${Date.now()}_${index}`;
      addElement({
        ...el,
        id: newId,
        x: (el.x || 0) + offsetX,
        y: (el.y || 0) + offsetY
      });
    });

    setTemplatesOpen(false);
  };

  if (!isTemplatesOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={() => setTemplatesOpen(false)}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-6xl h-full max-h-[90vh] flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl border transition-all duration-500 ${isLight ? 'bg-white border-gray-200' : 'bg-[#111111] border-white/10'}`}>
        
        {/* Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between px-10 py-7 border-b ${theme.border} space-y-4 md:space-y-0`}>
          <div>
            <div className="flex items-center space-x-3 mb-1">
               <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
               <h2 className={`font-black uppercase tracking-[0.2em] text-xl ${isLight ? 'text-gray-900' : 'text-white'}`}>Design Templates</h2>
            </div>
            <p className={`text-[13px] font-medium tracking-wide ${theme.title}`}>Explore 120+ professional layouts.</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`relative group w-full md:w-64 transition-all ${isLight ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'} rounded-2xl border ${theme.border} focus-within:border-blue-500`}>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
              <input 
                type="text" 
                placeholder="Search templates..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-3 pl-11 pr-4 text-xs font-bold outline-none border-none placeholder-gray-500 transition-all"
              />
            </div>

            <button 
              onClick={() => setTemplatesOpen(false)} 
              className={`p-3 rounded-2xl transition-all hover:rotate-90 hover:scale-110 ${isLight ? 'bg-gray-100 text-gray-900' : 'bg-white/5 text-white'} ${theme.title}`}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-transparent">
          {filteredTemplates.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                <FileDown size={24} className="text-gray-500 opacity-50" />
              </div>
              <h3 className={`font-bold mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>No templates found</h3>
              <p className={`text-xs ${theme.title}`}>Try searching for something else</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map(template => (
              <div 
                key={template.id}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] border transition-all duration-300 cursor-pointer hover:-translate-y-2 ${isLight ? 'bg-gray-50 border-gray-200 hover:shadow-2xl hover:shadow-blue-500/10' : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-black'}`}
                onClick={() => handleImport(template)}
              >
                {/* LIVE PREVIEW CANVAS */}
                <div className="h-56 w-full relative overflow-hidden bg-white">
                  <TemplateThumbnail template={template} />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Details Footer */}
                <div className={`p-6 border-t ${theme.border} flex items-center justify-between bg-inherit`}>
                  <div className="min-w-0">
                    <div className={`text-[11px] font-black uppercase tracking-widest mb-1 ${isLight ? 'text-blue-600' : 'text-blue-500'}`}>{template.category}</div>
                    <div className={`text-[15px] font-bold truncate ${isLight ? 'text-gray-900' : 'text-white/90'}`}>{template.name}</div>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isLight ? 'bg-gray-200 text-gray-400 group-hover:bg-blue-600 group-hover:text-white' : 'bg-white/5 text-white/20 group-hover:bg-blue-600 group-hover:text-white'}`}>
                    <FileDown size={18} />
                  </div>
                </div>

                {/* Main Import Hover Action */}
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-colors pointer-events-none" />
              </div>
            ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TemplatesModal;
