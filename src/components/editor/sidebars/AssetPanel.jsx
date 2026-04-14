import React, { useState } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Box, Layers } from 'lucide-react';
import { ASSETS } from '../../../data/assetsData';

const AssetPanel = () => {
  const { setFlyout, uiTheme, addElement } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  const [activeCategory, setActiveCategory] = useState(ASSETS[0].category);

  const handleAddAsset = (asset) => {
    addElement({
      ...asset,
      x: 400,
      y: 200,
    });
  };

  return (
    <div className={`w-80 h-full flex flex-col border-r ${theme.border} ${theme.sidebar} animate-in slide-in-from-left duration-300`}>
      <div className={`p-6 border-b ${theme.border} flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <Box size={16} className="text-blue-600" />
          <h2 className={`font-black uppercase tracking-widest text-xs ${isLight ? 'text-gray-900' : 'text-white'}`}>Asset Vault</h2>
        </div>
        <button onClick={() => setFlyout('none')} className={`p-1.5 rounded-lg hover:${isLight ? 'bg-gray-100' : 'bg-white/5'} ${theme.title}`}>
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className={`flex p-2 border-b ${theme.border} space-x-1`}>
        {ASSETS.map(cat => (
          <button
            key={cat.category}
            onClick={() => setActiveCategory(cat.category)}
            className={`flex-1 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${activeCategory === cat.category ? 'bg-blue-600 text-white shadow-md' : `${theme.title} hover:${isLight ? 'bg-gray-100' : 'bg-white/5'}`}`}
          >
            {cat.category.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
         <div className="grid grid-cols-2 gap-3">
            {ASSETS.find(c => c.category === activeCategory)?.items.map((asset, idx) => (
              <div 
                key={idx}
                className={`group flex flex-col items-center p-4 rounded-2xl border cursor-pointer hover:shadow-lg transition-all ${isLight ? 'bg-white border-gray-100 hover:border-blue-500/30' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
                onClick={() => handleAddAsset(asset)}
              >
                <div 
                  className={`mb-4 rounded-lg shadow-sm`}
                  style={{
                    width: 40,
                    height: 40,
                    background: asset.fill,
                    borderRadius: asset.borderRadius ? 12 : 2,
                  }}
                />
                <span className={`text-[10px] font-black uppercase tracking-wider text-center ${isLight ? 'text-gray-900' : 'text-white/70'}`}>{asset.name}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AssetPanel;
