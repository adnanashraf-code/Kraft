import React, { useState } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Search, FileDown, Layers } from 'lucide-react';
import { ASSETS } from '../../../data/assetsData';

const AssetsModal = () => {
  const { isAssetsOpen, setAssetsOpen, uiTheme, addElement, pages, activePageId } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  const [activeCategory, setActiveCategory] = useState(ASSETS[0].category);

  // Add an asset to the canvas
  const handleAddAsset = (asset) => {
    addElement({
      ...asset,
      x: 400,
      y: 200,
    });
    setAssetsOpen(false);
  };

  if (!isAssetsOpen) return null;

  const currentAssets = ASSETS.find(c => c.category === activeCategory)?.items || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={() => setAssetsOpen(false)}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-5xl h-full max-h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border ${isLight ? 'bg-white border-gray-200' : 'bg-[#151515] border-white/10'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-8 py-5 border-b ${theme.border}`}>
          <div>
            <h2 className={`font-black uppercase tracking-widest text-lg ${isLight ? 'text-gray-900' : 'text-white'}`}>Asset Vault</h2>
            <p className={`text-xs mt-1 ${theme.title}`}>Insert premium shapes, elements, and gradients.</p>
          </div>
          <button onClick={() => setAssetsOpen(false)} className={`p-2 rounded-xl transition-colors hover:${isLight ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'} ${theme.title}`}>
            <X size={20} />
          </button>
        </div>

        {/* Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Categories Sidebar */}
          <div className={`w-64 border-r ${theme.border} p-4 space-y-2 overflow-y-auto custom-scrollbar`}>
            {ASSETS.map(cat => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeCategory === cat.category ? 'bg-blue-600 text-white shadow-md' : `hover:${isLight ? 'bg-gray-100' : 'bg-white/5'} ${theme.text}`}`}
              >
                <Layers size={16} className={`mr-3 ${activeCategory === cat.category ? 'opacity-100' : 'opacity-50'}`} />
                <span className="text-xs font-bold tracking-wide">{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={`flex-1 p-8 overflow-y-auto custom-scrollbar ${theme.canvas}`}>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentAssets.map((asset, idx) => (
                  <div 
                    key={idx}
                    className={`group flex flex-col items-center p-6 rounded-2xl border cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                    onClick={() => handleAddAsset(asset)}
                  >
                    {/* Visual Preview */}
                    <div 
                      className={`mb-6 rounded-lg ${isLight ? 'shadow-sm border border-gray-100' : 'border border-white/10 shadow-black/50'}`}
                      style={{
                        width: Math.min(asset.w, 80),
                        height: Math.min(asset.h, 80),
                        background: asset.fill,
                        borderRadius: asset.borderRadius ? Math.min(asset.borderRadius, 40) : 0,
                        clipPath: asset.clipPath || 'none'
                      }}
                    />
                    <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>{asset.name}</span>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssetsModal;
