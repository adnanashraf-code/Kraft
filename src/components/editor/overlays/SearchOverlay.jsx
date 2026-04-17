import React, { useState, useEffect, useRef } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { Search, Library, FileText, Square } from 'lucide-react';
import { TEMPLATES } from '../../../data/templatesData';

const SearchOverlay = () => {
  const { isSearchOpen, setSearchOpen, uiTheme, pages, activePageId, selectElement } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;

  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setSearchOpen(false);
      }
      // Ctrl/Cmd + K to toggle
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  if (!isSearchOpen) return null;

  // Simple mock search logic
  const layerResults = elements.filter(el => (el.name || el.type).toLowerCase().includes(query.toLowerCase()));
  const templateResults = TEMPLATES.filter(t => t.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />

      {/* Palette Container */}
      <div className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border ${isLight ? 'bg-white border-gray-200' : 'bg-[#151515] border-white/10'}`}>
        
        {/* Input Area */}
        <div className={`flex items-center px-4 py-4 border-b ${theme.border}`}>
          <Search size={22} className={theme.title} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search layers, templates, or commands..."
            className={`w-full bg-transparent px-4 py-1 text-lg outline-none font-medium placeholder-opacity-50 ${isLight ? 'text-gray-900 placeholder-gray-400' : 'text-white placeholder-gray-500'}`}
          />
          <div className={`text-[10px] uppercase font-bold px-2 py-1 rounded bg-black/10 ${theme.title}`}>ESC to close</div>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-2">
          {query.length > 0 && (
            <>
              {/* Layer Results */}
              {layerResults.length > 0 && (
                <div className="mb-4">
                  <div className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest ${theme.title}`}>Layers On Canvas</div>
                  {layerResults.map(el => (
                    <button
                      key={el.id}
                      onClick={() => { selectElement(el.id); setSearchOpen(false); }}
                      className={`w-full flex items-center px-3 py-3 rounded-xl transition-all hover:${isLight ? 'bg-gray-100' : 'bg-white/5'}`}
                    >
                      <Square size={16} className={`mr-3 ${theme.title}`} />
                      <span className={`text-[13px] font-bold ${isLight ? 'text-gray-800' : 'text-white/80'}`}>{el.name || el.type}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Template Results */}
              {templateResults.length > 0 && (
                <div>
                  <div className={`px-3 py-2 text-[10px] font-black uppercase tracking-widest ${theme.title}`}>Template Library</div>
                  {templateResults.slice(0,5).map(t => (
                    <button
                      key={t.id}
                      onClick={() => { /* Wait for Templates integration */ setSearchOpen(false); }}
                      className={`w-full flex items-center px-3 py-3 rounded-xl transition-all hover:${isLight ? 'bg-gray-100' : 'bg-white/5'}`}
                    >
                      <Library size={16} className={`mr-3 ${theme.title}`} />
                      <div className="flex flex-col items-start">
                        <span className={`text-[13px] font-bold ${isLight ? 'text-gray-800' : 'text-white/80'}`}>{t.name}</span>
                        <span className={`text-[10px] uppercase tracking-wider ${theme.title}`}>{t.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              {layerResults.length === 0 && templateResults.length === 0 && (
                <div className={`py-12 text-center text-sm font-medium ${theme.title}`}>
                  No results found for "{query}"
                </div>
              )}
            </>
          )}

          {query.length === 0 && (
             <div className={`py-12 flex flex-col items-center justify-center space-y-4 text-sm font-medium ${theme.title}`}>
               <div className={`p-4 rounded-3xl ${isLight ? 'bg-gray-100' : 'bg-white/5'}`}>
                 <Search size={32} className="opacity-50" />
               </div>
               <span>Start typing to search across KRAFT</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
