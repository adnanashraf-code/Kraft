import React, { useState } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Search, FileDown, Layers, Upload, Image as ImageIcon, Box } from 'lucide-react';
import { ASSETS } from '../../../data/assetsData';
import { 
  resolveIcon, 
  FEATURED_ICON_NAMES, 
  UtilityIcons,
  RAW_LUCIDE_NAMES,
  RAW_REMIX_NAMES,
  RAW_BRAND_DATA
} from '../../../utils/iconUtils';

const DynamicAssetPreview = ({ asset, isLight }) => {
  const IconObj = resolveIcon(asset.name);
  const defaultColor = isLight ? '#000000' : '#ffffff';
  const iconColor = asset.fill || defaultColor;

  if (asset.type === 'icon') {
    if (!IconObj) {
      const Fallback = UtilityIcons.Box;
      return <Fallback size={24} className="opacity-20" />;
    }

    // Handle Brand Logos in preview if they are typed as icons
    if (IconObj.type === 'brand') {
       return (
        <div className="w-16 h-16 flex items-center justify-center p-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10" style={{ color: asset.hex ? `#${asset.hex}` : iconColor }}>
            <path d={IconObj.path} />
          </svg>
        </div>
      );
    }

    const IconComp = IconObj;
    return (
      <div className="w-16 h-16 flex items-center justify-center">
         <IconComp size={40} color={iconColor} strokeWidth={1.5} />
      </div>
    );
  }

  if (asset.type === 'logo') {
    return (
      <div className="w-16 h-16 flex items-center justify-center">
        <svg viewBox="0 0 24 24" className="w-10 h-10" fill={asset.hex ? `#${asset.hex}` : (isLight ? 'black' : 'white')}>
          <path d={asset.path} />
        </svg>
      </div>
    );
  }

  return (
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
  );
};

const AssetsModal = () => {
  const { 
    isAssetsOpen, setAssetsOpen, uiTheme, addElement, 
    pages, activePageId, library, uploadImage, removeLibraryImage, preferences 
  } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  const [activeCategory, setActiveCategory] = useState(ASSETS[0].category);
  const [searchQuery, setSearchQuery] = useState('');

  const allIcons = React.useMemo(() => {
    const lucide = RAW_LUCIDE_NAMES.map(key => ({ 
      name: key, 
      source: 'lucide', 
      type: 'icon' 
    }));

    const remix = RAW_REMIX_NAMES.map(key => ({ 
      name: key, 
      source: 'remix', 
      type: 'icon' 
    }));

    const simple = RAW_BRAND_DATA;

    return [...lucide, ...remix, ...simple];
  }, []);

  const filteredIcons = React.useMemo(() => {
    if (!searchQuery) {
      // Use the pre-curated FEATURED_ICON_NAMES list
      const featuredIcons = allIcons.filter(i => FEATURED_ICON_NAMES.includes(i.name));
      const others = allIcons.filter(i => !FEATURED_ICON_NAMES.includes(i.name));
      
      return [...featuredIcons, ...others].slice(0, 150);
    }
    return allIcons.filter(i => 
      i.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 200);
  }, [searchQuery, allIcons]);

  const fileInputRef = React.useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image is too large. Please use images under 2MB for best performance.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        uploadImage(event.target.result, file.name, img.width, img.height);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // Add an asset to the canvas
  const handleAddAsset = (asset) => {
    addElement({
      ...asset,
      x: 100,
      y: 100,
    });
    setAssetsOpen(false);
  };

  const handleAddInstance = (component) => {
    addElement({
      type: 'instance',
      name: component.name,
      componentId: component.id,
      w: component.w,
      h: component.h,
      x: 100,
      y: 100,
    });
    setAssetsOpen(false);
  };

  const handleAddUpload = (img) => {
    addElement({
      type: 'image',
      name: img.name,
      src: img.src,
      w: img.w,
      h: img.h,
      x: 100,
      y: 100,
    });
    setAssetsOpen(false);
  };

  if (!isAssetsOpen) return null;

  const ALL_CATEGORIES = [
    ...ASSETS,
    { category: 'UPLOADS', items: [] },
    { category: 'COMPONENTS', items: [] }
  ];

  const currentCategory = ALL_CATEGORIES.find(c => c.category === activeCategory);
  const currentAssets = currentCategory?.items || [];

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
            <p className={`text-xs mt-1 ${theme.title}`}>Insert premium shapes, elements, and icons.</p>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border transition-all ${isLight ? 'bg-gray-100 border-gray-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20' : 'bg-white/5 border-white/10 focus-within:bg-white/10'}`}>
               <Search size={16} className="opacity-50" />
               <input 
                type="text" 
                placeholder="Search assets & icons..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value) setActiveCategory('Icons');
                }}
                className={`bg-transparent outline-none border-none text-xs w-full font-bold ${isLight ? 'text-black' : 'text-white'}`}
               />
            </div>
          </div>

          <button onClick={() => setAssetsOpen(false)} className={`p-2 rounded-xl transition-colors hover:${isLight ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'} ${theme.title}`}>
            <X size={20} />
          </button>
        </div>

        {/* Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Categories Sidebar */}
          <div className={`w-64 border-r ${theme.border} p-4 space-y-2 overflow-y-auto custom-scrollbar`}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
            
            <button
              onClick={() => fileInputRef.current.click()}
              className={`w-full flex items-center px-4 py-3 rounded-xl mb-4 border-2 border-dashed transition-all hover:bg-blue-500/5 ${isLight ? 'border-blue-200 text-blue-600' : 'border-blue-500/30 text-blue-400'}`}
            >
              <Upload size={16} className="mr-3" />
              <span className="text-xs font-black uppercase tracking-wider">Device Upload</span>
            </button>

            {ALL_CATEGORIES.map(cat => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`w-full flex items-center px-4 py-3 rounded-xl transition-all ${activeCategory === cat.category ? 'bg-blue-600 text-white shadow-md' : `hover:${isLight ? 'bg-gray-100' : 'bg-white/5'} ${theme.text}`}`}
              >
                {cat.category === 'UPLOADS' && <ImageIcon size={16} className="mr-3 opacity-70" />}
                {cat.category === 'COMPONENTS' && <Box size={16} className="mr-3 opacity-70" />}
                {cat.category !== 'UPLOADS' && cat.category !== 'COMPONENTS' && <Layers size={16} className="mr-3 opacity-70" />}
                <span className="text-xs font-bold tracking-wide">{cat.category}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={`flex-1 p-8 overflow-y-auto custom-scrollbar ${theme.canvas}`}>
             {activeCategory === 'UPLOADS' && (
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                 {library.images.length === 0 && (
                   <div className="col-span-full py-20 text-center opacity-30 font-bold uppercase tracking-widest text-sm">No images uploaded yet</div>
                 )}
                 {library.images.map(img => (
                   <div 
                    key={img.id}
                    className={`group relative flex flex-col items-center p-4 rounded-2xl border cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                   >
                     <div onClick={() => handleAddUpload(img)} className="w-full flex flex-col items-center">
                        <img src={img.src} alt={img.name} className="w-full aspect-square object-contain mb-4 rounded-lg bg-black/10" />
                        <span className={`text-[10px] font-bold uppercase tracking-wider truncate w-full text-center ${theme.text}`}>{img.name}</span>
                     </div>
                     
                     <button 
                      onClick={(e) => { e.stopPropagation(); removeLibraryImage(img.id); }}
                      className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full border-2 border-black flex items-center justify-center neo-shadow-xs opacity-0 group-hover:opacity-100 transition-all hover:scale-110 z-10"
                      title="Delete permanently"
                     >
                       <X size={14} strokeWidth={4} />
                     </button>
                   </div>
                 ))}
               </div>
             )}

             {activeCategory === 'COMPONENTS' && (
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                 {library.components.length === 0 && (
                   <div className="col-span-full py-20 text-center opacity-30 font-bold uppercase tracking-widest text-sm">No components created yet</div>
                 )}
                 {library.components.map(comp => (
                    <div 
                      key={comp.id}
                      className={`group flex flex-col items-center p-6 rounded-2xl border cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                      onClick={() => handleAddInstance(comp)}
                    >
                      <div className="w-16 h-16 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4">
                        <Box size={32} className="text-indigo-500" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider truncate w-full text-center ${theme.text}`}>{comp.name}</span>
                    </div>
                 ))}
               </div>
             )}

          {activeCategory === 'Icons' && (
             <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-4">
                {filteredIcons.map((asset, idx) => (
                  <div 
                    key={idx}
                    className={`group flex flex-col items-center p-4 rounded-2xl border cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                    onClick={() => handleAddAsset({ 
                      ...asset, 
                      iconName: asset.name,
                      path: asset.path,
                      hex: asset.hex,
                      fill: undefined // Force dynamic theme color for new icons
                    })}
                  >
                    <DynamicAssetPreview asset={asset} isLight={isLight} />
                    <span className={`text-[8px] font-black uppercase tracking-wider mt-2 truncate w-full text-center ${theme.text}`}>{asset.name}</span>
                  </div>
                ))}
                {filteredIcons.length === 0 && (
                   <div className="col-span-full py-20 text-center opacity-30 font-bold uppercase tracking-widest text-sm">No icons found matching "{searchQuery}"</div>
                )}
             </div>
          )}

          {activeCategory !== 'UPLOADS' && activeCategory !== 'COMPONENTS' && activeCategory !== 'Icons' && (
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {currentAssets.map((asset, idx) => (
                    <div 
                      key={idx}
                      className={`group flex flex-col items-center p-6 rounded-2xl border cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1 ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/5 hover:border-white/20'}`}
                      onClick={() => handleAddAsset(asset)}
                    >
                      <DynamicAssetPreview asset={asset} isLight={isLight} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>{asset.name}</span>
                    </div>
                  ))}
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AssetsModal;
