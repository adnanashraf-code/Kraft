import React, { useState, useRef, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  resolveIcon, 
  BRAND_CATEGORIES, 
  RAW_LUCIDE_NAMES, 
  RAW_REMIX_NAMES, 
  RAW_BRAND_DATA 
} from '../../utils/iconUtils';
import { Cloud, Zap, ShieldCheck, Users, Search, Type, Image as ImageIcon, Box, LayoutGrid, X, Grid, Cpu, Globe, ArrowLeft, Upload, Check } from 'lucide-react';
import useEditorStore from '../../store/useEditorStore';

// --- STATIC DATA (OUTSIDE COMPONENT FOR PERFORMANCE) ---
const allUniqueFonts = [
  'Inter', 'Epilogue', 'Fraunces', 'Outfit', 'Space Grotesk', 'Syne', 'Clash Display', 
  'Montserrat', 'Playfair Display', 'Oswald', 'Manrope', 'Lexend', 'Bebas Neue',
  'Chivo', 'Eb Garamond', 'IBM Plex Sans', 'Inclusive Sans', 'Instrument Serif',
  'JetBrains Mono', 'Karla', 'Lora', 'Open Sans', 'Poppins', 'Quicksand', 'Raleway',
  'Roboto', 'Sora', 'Source Code Pro', 'Urbanist', 'Work Sans', 'Young Serif',
  'Lato', 'Ubuntu', 'Roboto Condensed', 'Merriweather', 'PT Sans', 'Noto Sans', 'Playfair', 'Kanit', 
  'Prompt', 'Titillium Web', 'Heebo', 'Josefin Sans', 'Arvo', 'Anton', 'Muli', 'Nunito', 
  'Rubik', 'Varela Round', 'Hind', 'Fjalla One', 'Caveat', 'Spectral', 'Cormorant', 'Cinzel', 
  'Archivo', 'Overpass', 'Catamaran', 'Questrial', 'Barlow', 'Inconsolata', 'Libre Baskerville', 'Bitter', 
  'Cabin', 'DM Sans', 'Dancing Script', 'Domine', 'Fira Sans', 'Gelasio', 'Hepta Slab', 'Indie Flower', 
  'Jost', 'Kumbh Sans', 'Libre Franklin', 'Marcellus', 'Nanum Gothic', 'Old Standard TT', 'Pacifico', 'Quattrocento', 
  'Red Hat Display', 'Signika', 'Taviraj', 'Unna', 'Volkhov', 'Vesper Libre', 'Yantramanav', 'Zilla Slab', 
  'Abel', 'Adamina', 'Alice', 'Almarai', 'Amiri', 'Antic', 'Asap', 'Assistant', 'BioRhyme', 'Cardo', 'Changa', 'Crimson Text'
];

const SMART_TAGS = {
  ai: ['brain', 'robot', 'sparkles', 'zap', 'openai', 'anthropic', 'gemini', 'deep', 'intelligence'],
  social: ['github', 'instagram', 'twitter', 'facebook', 'linkedin', 'whatsapp', 'youtube', 'snapchat', 'tiktok', 'meta'],
  brand: ['google', 'microsoft', 'apple', 'amazon', 'meta', 'adobe', 'figma', 'slack'],
  code: ['github', 'git', 'terminal', 'code', 'file', 'script', 'json', 'css', 'html'],
};

// Moved to iconUtils.js to prevent redundant massive imports

// --- MEMOIZED COMPONENTS FOR PERFORMANCE ---

const IconItem = memo(({ icon, isSelected, toggleStageAsset, isLight }) => {
  const IconComp = resolveIcon(icon.name);
  return (
    <div 
      title={`${icon.name} (${icon.source})`} 
      className={`aspect-square border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-crosshair group neo-shadow-xs overflow-hidden relative ${isSelected(icon, 'icon') ? '!bg-black !text-white' : (isLight ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white')}`} 
      onClick={() => toggleStageAsset({ ...icon, type: 'icon' })}
    >
       {icon.source === 'brand' || (IconComp && IconComp.type === 'brand') ? (
         <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-125 transition-transform" fill="currentColor">
           <path d={icon.path || (IconComp && IconComp.path)} />
         </svg>
       ) : (
         IconComp ? (
           <IconComp size={20} strokeWidth={icon.source === 'lucide' ? 2.5 : 2} className="group-hover:scale-125 transition-transform" />
         ) : <Box size={16} className="opacity-20" />
       )}
       <div className={`absolute top-0 right-0 w-2 h-2 border-l border-b border-black ${isSelected(icon, 'icon') ? 'bg-yellow-400' : (icon.source === 'remix' ? 'bg-cyan-400' : icon.source === 'brand' ? 'bg-orange-500' : 'bg-gray-200 opacity-0')}`} />
       {isSelected(icon, 'icon') && <div className="absolute inset-0 bg-yellow-400/20 pointer-events-none" />}
    </div>
  );
});

const LogoItem = memo(({ logo, isSelected, toggleStageAsset, handleImport, isLight }) => {
  // Visibility fix for white logos in light mode
  const isWhiteLogo = logo.icon && (logo.icon.hex === 'FFFFFF' || logo.icon.hex === '#FFFFFF');
  const iconHex = logo.icon.hex ? `#${logo.icon.hex}` : 'black';
  const finalFill = (isWhiteLogo && isLight) ? '#000000' : (iconHex === 'black' && !isLight ? 'white' : iconHex);
  const selected = isSelected({name: logo.name}, 'logo');

  return (
    <div 
      onClick={() => toggleStageAsset({ name: logo.name, path: logo.icon.path, hex: logo.icon.hex, type: 'logo' })}
      className={`border-[3px] border-black p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-transform neo-shadow-xs group relative ${selected ? 'ring-4 ring-black ring-inset' : (isLight ? 'bg-white' : 'bg-[#1a1a1a]')}`}
    >
      <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
          <svg viewBox="0 0 24 24" className="w-full h-full" fill={finalFill}>
            <path d={logo.icon.path} />
          </svg>
      </div>
      <p className={`text-[10px] font-black uppercase text-center truncate w-full ${isLight ? 'text-black' : 'text-white'}`}>{logo.name}</p>
      
      <div className={`absolute inset-0 bg-black/95 transition-opacity flex flex-col items-center justify-center gap-2 p-2 ${selected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
         <p className="text-white text-[10px] font-black uppercase tracking-tighter">
            {selected ? 'Selected ✓' : 'Add to Staging'}
         </p>
         {!selected && (
           <button 
             onClick={(e) => { e.stopPropagation(); handleImport({ name: logo.name, path: logo.icon.path, hex: logo.icon.hex }, 'logo') }}
             className="text-[8px] text-yellow-400 font-bold border border-yellow-400/30 px-2 py-1 hover:bg-yellow-400 hover:text-black transition-colors"
           >
              Quick Import
           </button>
         )}
      </div>
    </div>
  );
});

const CloudHub = ({ globalSearch = '', onBack }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Store actions
  const addElement = useEditorStore(state => state.addElement);
  const addElements = useEditorStore(state => state.addElements);
  const uploadImage = useEditorStore(state => state.uploadImage);

  const [activeCategory, setActiveCategory] = useState('images');
  const [fontSearch, setFontSearch] = useState('');
  const [iconSearch, setIconSearch] = useState('');
  const [iconLimit, setIconLimit] = useState(400);
  const [logoSearch, setLogoSearch] = useState('');
  const [activeLogoCategory, setActiveLogoCategory] = useState('tech');
  const [importStatus, setImportStatus] = useState(null); // { id, type }

  const { stagedAssets, toggleStageAsset, clearStagedAssets, uiTheme, library, removeLibraryImage, preferences, updatePreferences, runLibraryMaintenance } = useEditorStore();
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  // Run maintenance on mount
  React.useEffect(() => {
    runLibraryMaintenance();
  }, [runLibraryMaintenance]);

  const isSelected = (asset, type) => {
    return stagedAssets.some(a => 
      (asset.id && a.id === asset.id) || (!asset.id && !a.id && a.name === asset.name && a.type === type)
    );
  };

  const [images, setImages] = useState([
    { id: 1, name: 'Fluid Gold', src: '/cloud/asset_1.png' },
    { id: 2, name: 'Bauhaus Geo', src: '/cloud/asset_2.png' },
    { id: 3, name: 'Cyber Neon', src: '/cloud/asset_3.png' },
    { id: 4, name: 'Clay Morph', src: '/cloud/asset_4.png' },
    { id: 5, name: 'Chrome Flow', src: '/cloud/asset_5.png' },
    { id: 6, name: 'Holo Glass', src: '/cloud/asset_6.png' },
    { id: 7, name: 'Light Trail', src: '/cloud/asset_7.png' },
    { id: 8, name: 'Zen Minimal', src: '/cloud/asset_8.png' },
    { id: 9, name: 'Tech Topo', src: '/cloud/asset_9.png' },
    { id: 10, name: 'Vibrant Glass', src: '/cloud/asset_10.png' },
    { id: 11, name: 'Mono Struct', src: '/cloud/asset_11.png' },
    { id: 12, name: 'Silk Wave', src: '/cloud/asset_12.png' },
    { id: 13, name: 'Crystal Refraction', src: '/cloud/asset_13.png' },
    { id: 14, name: 'Office Clay', src: '/cloud/asset_14.png' },
    { id: 15, name: 'Network Deep', src: '/cloud/asset_15.png' },
    { id: 16, name: 'Splash Paint', src: '/cloud/asset_16.png' },
    { id: 17, name: 'Agent Frame', src: '/cloud/asset_17.png' },
    { id: 18, name: 'Ethereal Mist', src: '/cloud/asset_18.png' },
    { id: 19, name: 'Data Prism', src: '/cloud/asset_19.png' },
    { id: 20, name: 'Liquid Quartz', src: '/cloud/asset_20.png' },
  ]);

  const iconNames = useMemo(() => {
    const lucide = RAW_LUCIDE_NAMES.map(key => ({ name: key, source: 'lucide' }));
    const remix = RAW_REMIX_NAMES.map(key => ({ name: key, source: 'remix' }));
    const simple = RAW_BRAND_DATA.map(item => ({ ...item, source: 'brand' }));

    return [...lucide, ...remix, ...simple];
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const name = file.name.split('.')[0];
      
      // Update local gallery
      const newImg = { id: Date.now(), name, src: dataUrl };
      setImages(prev => [newImg, ...prev]);

      // Sync to Editor library
      uploadImage(dataUrl, name, 800, 600); // Default dims for new upload
    };
    reader.readAsDataURL(file);
  };

  const handleImport = (asset, type = 'image') => {
    let elementData = { type: 'image', name: asset.name };
    
    if (type === 'image') {
      elementData.src = asset.src;
    } else if (type === 'icon' || type === 'logo') {
      const svg = asset.path 
        ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${asset.hex ? '#' + asset.hex : 'black'}"><path d="${asset.path}"/></svg>`
        : null;
      
      if (svg) {
        // Robust encoding for non-ASCII SVG paths
        const encoded = btoa(unescape(encodeURIComponent(svg)));
        elementData.src = `data:image/svg+xml;base64,${encoded}`;
      } else if (asset.comp || asset.type === 'icon') {
        elementData.type = 'icon';
        elementData.iconName = asset.name;
        elementData.w = 120;
        elementData.h = 120;
      }
    }

    addElement(elementData);
    setImportStatus({ id: asset.id || asset.name, type });
    setTimeout(() => setImportStatus(null), 2000);
  };

  const handleBatchImport = () => {
    try {
      const elements = stagedAssets.map((asset, index) => {
        let el = { 
          type: 'rectangle', 
          name: asset.name, 
          x: 100 + (index * 60), 
          y: 100 + (index * 60),
          w: 200,
          h: 200
        };

        if (asset.type === 'image') {
          el.type = 'image';
          el.src = asset.src;
        } else if (asset.type === 'font') {
          // Fonts are now added as project-wide resources, not canvas elements
          useEditorStore.getState().addProjectFont(asset.name);
          useEditorStore.getState().addNotification(`Font "${asset.name}" updated to the editor`, 'success');
          return null; // Don't create an element for fonts
        } else if (asset.type === 'icon') {
          el.type = 'icon';
          el.iconName = asset.name;
          el.library = asset.source || 'lucide';
          el.w = 120;
          el.h = 120;
          // Removed hardcoded el.fill to allow Canvas.jsx theme-aware defaults
        } else if (asset.type === 'logo') {
          if (asset.path) {
            try {
              el.type = 'image';
              const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${asset.hex ? '#' + asset.hex : 'black'}"><path d="${asset.path}"/></svg>`;
              // Robust encoding for UTF-8 SVGs
              const encoded = btoa(encodeURIComponent(svg).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
              el.src = `data:image/svg+xml;base64,${encoded}`;
            } catch (e) {
              console.error('Logo encoding failed', e);
              el.type = 'rectangle';
            }
          }
        }
        return el;
      }).filter(el => el !== null); // Filter out skipped elements (like fonts)

      addElements(elements);
      
      const importedFonts = stagedAssets.filter(a => a.type === 'font').map(a => a.name);
      if (importedFonts.length > 0) {
        useEditorStore.getState().updatePreferences({ lastUsedFont: importedFonts[0] });
      }

      clearStagedAssets();
      navigate('/editor');

    } catch (criticalErr) {
      console.error('Critical Build Error:', criticalErr);
      alert('Project Build Error: Some assets might be incompatible. Try selecting fewer items.');
    }
  };

  const filteredFonts = allUniqueFonts.filter(f => f.toLowerCase().includes(fontSearch.toLowerCase()));
  
  const filteredIcons = useMemo(() => {
    const query = (globalSearch || iconSearch).toLowerCase();
    if (!query) return iconNames;
    const relevantKeywords = SMART_TAGS[query] || [query];
    return iconNames.filter(icon => 
      icon.keywords.some(k => relevantKeywords.some(rk => k.includes(rk))) ||
      icon.name.toLowerCase().includes(query)
    );
  }, [iconSearch, iconNames, globalSearch]);

  const categories = [
    { id: 'images', label: 'Images', icon: ImageIcon, color: 'decoration-orange-400' },
    { id: 'fonts', label: 'Fonts', icon: Type, color: 'decoration-yellow-400' },
    { id: 'icons', label: 'Icons', icon: Box, color: 'decoration-cyan-400' },
    { id: 'logos', label: 'Logos', icon: LayoutGrid, color: 'decoration-magenta-400' },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-black text-white p-4 md:p-8 border-[4px] border-black neo-shadow-lg flex flex-col xl:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 md:gap-6 w-full xl:w-auto">
          <button 
            onClick={onBack}
            className="w-10 h-10 md:w-12 md:h-12 bg-white text-black flex items-center justify-center neo-shadow-sm hover:-translate-x-1 transition-transform group shrink-0"
            title="Go Back"
          >
            <ArrowLeft strokeWidth={3} className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
          </button>
          <div className="w-12 h-12 md:w-16 md:h-16 bg-yellow-400 flex items-center justify-center neo-shadow-sm rotate-3 shrink-0">
             <Cloud className="text-black w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
          </div>
          <div className="min-w-0">
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none mb-1 truncate">Vault_Cloud_01</h2>
            <div className="flex items-center gap-2 md:gap-3">
               <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_green]" />
               <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-green-400">⚡ Securely Connected</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 md:gap-4 overflow-x-auto w-full xl:w-auto pb-2 xl:pb-0 scrollbar-hide no-scrollbar">
           {categories.map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveCategory(cat.id)}
               className={`px-4 md:px-8 py-3 md:py-4 border-2 border-black neo-shadow-sm transition-all flex items-center gap-2 md:gap-3 uppercase font-black text-[9px] md:text-[11px] tracking-widest whitespace-nowrap ${activeCategory === cat.id ? 'bg-yellow-400 text-black translate-x-1 translate-y-1 neo-shadow-none' : (isLight ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#1a1a1a] text-white hover:bg-black')}`}
             >
               <cat.icon className="w-3.5 h-3.5 md:w-4 md:h-4" strokeWidth={3} />
               <span className="md:inline">{cat.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className={`border-[3px] border-black p-4 md:p-10 neo-shadow min-h-[500px] md:min-h-[600px] transition-colors ${isLight ? 'bg-white/50' : 'bg-black/40'}`}>
        {activeCategory === 'images' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-4">
               <div>
                  <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight underline decoration-4 md:decoration-8 ${categories[0].color}`}>AI Asset Gallery</h3>
                  <span className="text-[10px] font-black uppercase text-orange-600 animate-pulse">⚡ KFT-CORE: NEURAL ENGINE</span>
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-40">Auto-Maintenance</span>
                    <span className="text-[7px] md:text-[8px] font-bold uppercase opacity-30">Purge unused after 12h</span>
                  </div>
                  <button 
                    onClick={() => updatePreferences({ autoCleanUploads: !preferences.autoCleanUploads })}
                    className={`w-10 h-5 md:w-12 md:h-6 border-2 border-black relative transition-all duration-300 ${preferences.autoCleanUploads ? 'bg-green-400' : 'bg-gray-200'}`}
                  >
                    <div className={`absolute top-0.5 w-3 h-3 md:w-4 md:h-4 bg-black transition-all duration-300 ${preferences.autoCleanUploads ? 'left-[22px] md:left-[26px]' : 'left-0.5'}`} />
                  </button>
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-12">
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className={`aspect-square border-[4px] border-black border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors group ${isLight ? 'bg-white hover:bg-ivory' : 'bg-black/40 hover:bg-black'}`}
               >
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-black flex items-center justify-center neo-shadow-xs group-hover:-translate-y-1 transition-transform">
                     <Upload className="text-white w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                  </div>
                  <p className="text-[10px] md:text-[12px] font-black uppercase tracking-widest text-center">Upload<br/>New Asset</p>
               </div>

               {[...images, ...library.images].map((img) => (
                 <div key={img.id} className="group relative">
                    <div className="aspect-square bg-white border-[4px] border-black neo-shadow overflow-hidden group-hover:rotate-1 transition-transform relative">
                       <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       
                       <div className={`absolute inset-0 bg-black/60 transition-opacity flex flex-col items-center justify-center gap-2 p-4 ${isSelected(img, 'image') ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleStageAsset({ id: img.id, name: img.name, type: 'image', src: img.src });
                            }}
                            className={`w-full py-2 text-[8px] font-black uppercase tracking-widest transition-all neo-shadow-xs ${isSelected(img, 'image') ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-yellow-400'}`}
                          >
                            {isSelected(img, 'image') ? '✓ Staged' : 'Select'}
                          </button>
                          
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleImport(img, 'image'); }}
                            className="w-full py-2 bg-black text-white text-[8px] font-black uppercase tracking-widest border border-white/20 hover:bg-zinc-900 transition-colors"
                          >
                            Import
                          </button>
                       </div>

                       <button 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          if (img.id.toString().startsWith('img-')) {
                            removeLibraryImage(img.id); 
                          } else {
                            setImages(prev => prev.filter(i => i.id !== img.id));
                          }
                        }}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white border-2 border-black flex items-center justify-center neo-shadow-xs md:opacity-0 md:group-hover:opacity-100 transition-all hover:scale-110 z-20"
                       >
                         <X size={14} strokeWidth={4} />
                       </button>
                    </div>
                    
                    <div className="mt-3 flex justify-between items-start">
                       <p className={`text-[10px] font-black uppercase leading-tight max-w-[70%] truncate ${isLight ? 'text-black' : 'text-white'}`}>{img.name}</p>
                       <span className="text-[7px] font-bold opacity-30 uppercase tracking-tighter shrink-0">
                          {img.id.toString().startsWith('img-') ? 'Uploaded' : 'System'}
                       </span>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}

        {activeCategory === 'fonts' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-4">
               <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight underline decoration-4 md:decoration-8 ${categories[1].color}`}>Type Foundry</h3>
               <div className={`flex items-center gap-3 border-[3px] border-black px-4 py-2 neo-shadow-xs w-full md:w-auto ${isLight ? 'bg-white' : 'bg-[#1a1a1a] text-white'}`}>
                  <Search size={18} strokeWidth={3} className="shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search Families..." 
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    className={`text-[10px] md:text-xs font-black uppercase outline-none flex-1 md:w-48 bg-transparent ${isLight ? 'text-black' : 'text-white'}`} 
                  />
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
               {filteredFonts.map((font, i) => (
                 <div 
                    key={i} 
                    onClick={() => toggleStageAsset({ id: font, name: font, type: 'font' })}
                    className={`border-2 border-black p-4 md:p-6 hover:bg-yellow-400 hover:text-black transition-all cursor-pointer neo-shadow-xs group relative ${isSelected({name: font}, 'font') ? 'bg-yellow-400 text-black ring-4 ring-black ring-inset' : (isLight ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white')}`}
                 >
                    <p className={`text-[8px] md:text-xs font-black mb-3 tracking-widest ${isLight ? 'opacity-20' : 'opacity-40'}`}>TYPE_{String(i+1).padStart(3,'0')}</p>
                    <p className="text-lg md:text-xl font-bold truncate leading-none" style={{ fontFamily: font }}>{font}</p>
                    <p className="text-[9px] font-black md:opacity-0 md:group-hover:opacity-100 transition-opacity uppercase mt-4">
                       {isSelected({name: font}, 'font') ? 'Deselect Family' : 'Activate Typeface'}
                    </p>
                    {isSelected({name: font}, 'font') && (
                      <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 bg-black text-yellow-400 flex items-center justify-center neo-shadow-xs">
                        <Check className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={4} />
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </section>
        )}

        {activeCategory === 'icons' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-4">
               <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight underline decoration-4 md:decoration-8 ${categories[2].color}`}>Icon Vault</h3>
               <div className={`flex items-center gap-3 border-[3px] border-black px-4 py-2 neo-shadow-xs w-full md:w-auto ${isLight ? 'bg-white' : 'bg-[#1a1a1a] text-white'}`}>
                  <Search size={18} strokeWidth={3} className="shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search 10,000+ Icons..." 
                    value={iconSearch}
                    onChange={(e) => {
                      setIconSearch(e.target.value);
                      setIconLimit(400);
                    }}
                    className={`text-[10px] md:text-xs font-black uppercase outline-none flex-1 md:w-64 bg-transparent ${isLight ? 'text-black' : 'text-white'}`} 
                  />
               </div>
            </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-15 gap-2 md:gap-3 p-1">
                {filteredIcons.slice(0, iconLimit).map((icon, i) => (
                  <IconItem 
                    key={`${icon.name}-${i}`} 
                    icon={icon} 
                    isSelected={isSelected} 
                    toggleStageAsset={toggleStageAsset} 
                    isLight={isLight} 
                  />
                ))}
               {filteredIcons.length > iconLimit && (
                 <div className="col-span-full py-8 flex flex-col items-center gap-4 mt-6">
                    <button onClick={() => setIconLimit(prev => prev + 400)} className="px-10 py-3 bg-black text-white text-[10px] font-black uppercase neo-shadow-sm">Load More</button>
                 </div>
               )}
            </div>
          </section>
        )}

        {activeCategory === 'logos' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-10 gap-4">
               <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight underline decoration-4 md:decoration-8 ${categories[3].color}`}>Brand Central</h3>
               <div className={`flex items-center gap-3 border-[3px] border-black px-4 py-2 neo-shadow-xs w-full md:w-auto ${isLight ? 'bg-white' : 'bg-[#1a1a1a] text-white'}`}>
                  <Search size={18} strokeWidth={3} className="shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Search 3,000+ Brands..." 
                    value={logoSearch}
                    onChange={(e) => setLogoSearch(e.target.value)}
                    className={`text-[10px] md:text-xs font-black uppercase outline-none flex-1 md:w-48 bg-transparent ${isLight ? 'text-black' : 'text-white'}`} 
                  />
               </div>
            </div>

            {!logoSearch ? (
              <div className="flex flex-col gap-6 md:gap-8">
                <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
                  {Object.entries(BRAND_CATEGORIES).map(([id, cat]) => (
                    <button
                      key={id}
                      onClick={() => setActiveLogoCategory(id)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 border-2 border-black text-[8px] md:text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeLogoCategory === id ? 'bg-black text-white neo-shadow-xs -translate-y-0.5' : (isLight ? 'bg-white text-black hover:bg-gray-100' : 'bg-[#1a1a1a] text-white hover:bg-black')}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                  {BRAND_CATEGORIES[activeLogoCategory].logos.map((logo, i) => (
                    <LogoItem 
                      key={`${logo.name}-${i}`} 
                      logo={logo} 
                      isSelected={isSelected} 
                      toggleStageAsset={toggleStageAsset} 
                      handleImport={handleImport}
                      isLight={isLight} 
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 md:gap-3 p-1">
                {iconNames
                  .filter(icon => icon.source === 'brand' && (
                    icon.name.toLowerCase().includes(logoSearch.toLowerCase()) || 
                    icon.keywords.some(k => k.includes(logoSearch.toLowerCase()))
                  ))
                  .slice(0, 100)
                  .map((icon, i) => (
                    <div 
                      key={i} 
                      title={icon.name} 
                      className={`aspect-square border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-crosshair group neo-shadow-xs relative ${isSelected(icon, 'logo') ? 'bg-black text-white' : (isLight ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white')}`} 
                      onClick={() => toggleStageAsset({ ...icon, type: 'logo' })}
                    >
                      <svg viewBox="0 0 24 24" className="w-5 h-5 md:w-6 md:h-6 md:group-hover:scale-125 transition-transform" fill={icon.hex && icon.hex !== '000000' ? `#${icon.hex}` : (isLight ? 'black' : 'white')}>
                        <path d={icon.path} />
                      </svg>
                      {isSelected(icon, 'logo') && (
                        <div className="absolute inset-0 bg-yellow-400/90 flex items-center justify-center text-[8px] md:text-[10px] font-black text-black">SELECTED</div>
                      )}
                    </div>
                  ))
                }
              </div>
            )}
          </section>
        )}
      </div>

      {/* --- ASSET STAGING DOCK (REDESIGNED) --- */}
      {stagedAssets.length > 0 && (
        <div className="fixed bottom-4 md:bottom-8 left-0 right-0 md:left-1/2 md:-translate-x-1/2 z-[100] w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500 px-4">
          <div className="bg-black text-white border-2 border-white/20 neo-shadow-lg p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 rounded-none backdrop-blur-md">
            
            <div className="flex items-center justify-between w-full md:w-auto gap-4 shrink-0 px-2 md:pl-2">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 bg-yellow-400 opacity-20 scale-150 blur-sm animate-ping rounded-full" />
                </div>
                <div className="flex flex-col">
                  <h4 className="text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-none">Docked_Assets</h4>
                  <p className="text-[8px] md:text-[9px] font-bold text-white/40 uppercase mt-1 tabular-nums">{stagedAssets.length} Units Ready</p>
                </div>
              </div>
              <button 
                 onClick={clearStagedAssets}
                 className="md:hidden text-[9px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
               >
                 Abort
               </button>
            </div>

            <div className="flex-1 flex gap-2 overflow-x-auto py-1 scrollbar-hide no-scrollbar md:border-x border-white/10 px-2 md:px-6 w-full">
               {stagedAssets.map((asset, i) => (
                 <div key={i} className="h-8 w-8 md:h-10 md:w-10 shrink-0 bg-white/5 border border-white/20 flex items-center justify-center group relative overflow-hidden transition-all hover:border-yellow-400">
                    {asset.type === 'image' && <img src={asset.src} className="w-full h-full object-cover" />}
                    {asset.type === 'font' && <Type className="text-white/60 w-3 h-3 md:w-3.5 md:h-3.5" />}
                    {asset.type === 'icon' && <Box className="text-cyan-400 w-3 h-3 md:w-3.5 md:h-3.5" />}
                    {asset.type === 'logo' && <LayoutGrid className="text-magenta-400 w-3 h-3 md:w-3.5 md:h-3.5" />}
                    
                    <button 
                      onClick={() => toggleStageAsset(asset)}
                      className="absolute inset-0 bg-red-500/90 text-white md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                    </button>
                 </div>
               ))}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
               <button 
                 onClick={clearStagedAssets}
                 className="hidden md:block px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
               >
                 Abort
               </button>
               <button 
                 onClick={handleBatchImport}
                 className="flex-1 md:flex-none px-4 md:px-6 py-2.5 bg-yellow-400 text-black neo-shadow-sm hover:-translate-y-0.5 transition-all font-black uppercase text-[9px] md:text-[10px] tracking-widest flex items-center justify-center gap-2"
               >
                 <Zap className="w-3 h-3 md:w-3.5 md:h-3.5" strokeWidth={3} />
                 <span>Construct Layout</span>
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MISSION CONTROL FOOTER --- */}
      <div className="mt-6 md:mt-10 bg-[#0a0a0a] text-white p-4 md:p-5 border-[4px] border-black neo-shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-full bg-yellow-400/5 -skew-x-12 translate-x-32" />
        
        <div className="flex flex-col xl:flex-row justify-between items-stretch gap-6 relative z-10">
          <div className="flex items-center gap-4 md:gap-6 border-b xl:border-b-0 xl:border-r border-white/10 pb-4 xl:pb-0 xl:pr-8">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-yellow-400">System_ID</span>
              <div className="flex items-end gap-2">
                <div className="w-1 md:w-1.5 h-6 md:h-8 bg-white opacity-20" />
                <div className="w-0.5 h-6 md:h-8 bg-white opacity-20" />
                <div className="w-2 md:w-3 h-6 md:h-8 bg-white opacity-40" />
                <div className="w-0.5 md:w-1 h-6 md:h-8 bg-white opacity-20" />
                <h4 className="text-xl md:text-2xl font-black tracking-tighter ml-2">KFT-99X</h4>
              </div>
            </div>
            <div className="flex flex-col ml-auto md:ml-0">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-1 text-right md:text-left">Session_Uptime</span>
              <span className="text-[10px] md:text-xs font-mono font-bold text-green-400 tabular-nums">04:12:33:09</span>
            </div>
          </div>

          <div className="flex-1 flex flex-wrap items-center gap-4 md:gap-8">
            {[
              { label: 'Kraft Grid', sub: 'DSX-Node', color: 'bg-yellow-400', pulse: 'animate-pulse', icon: Grid },
              { label: 'Kraft Engine', sub: 'Compute_01', color: 'bg-cyan-400', pulse: 'animate-bounce', icon: Cpu },
              { label: 'Kraft Nexus', sub: 'Global_Relay', color: 'bg-magenta-500', pulse: 'animate-pulse', icon: Globe }
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-3 md:gap-4 group/node cursor-help min-w-[120px]">
                <div className="relative">
                  <div className={`w-2.5 h-2.5 md:w-3 md:h-3 ${node.color} rotate-45 relative z-10 flex items-center justify-center`}>
                     <node.icon className="text-black w-1.5 h-1.5 md:w-2 md:h-2" strokeWidth={4} />
                  </div>
                  <div className={`absolute inset-0 ${node.color} opacity-40 rotate-45 scale-150 blur-sm ${node.pulse}`} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-none group-hover/node:text-white transition-colors text-white/70">{node.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[7px] md:text-[8px] font-bold text-white/30 uppercase tracking-tighter">{node.sub}</span>
                    <div className="w-6 md:w-8 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${node.color} w-[85%]`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden xl:flex flex-col justify-center border-l border-white/10 pl-8">
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-[8px] font-black text-white/30 uppercase">Link Strength</span>
                  <span className="text-xs font-black">99.2%</span>
               </div>
               <div className="flex flex-col items-end border-l border-white/10 pl-4">
                  <span className="text-[8px] font-black text-white/30 uppercase">Latency</span>
                  <span className="text-xs font-black text-cyan-400">12ms</span>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 bg-white/5 px-4 md:px-6 py-3 border border-white/10 neo-shadow-sm hover:bg-white/10 transition-colors cursor-pointer">
             <div className="flex flex-col items-end">
               <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Vault_Capacity</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-lg md:text-xl font-black tabular-nums">1.2</span>
                 <span className="text-[8px] md:text-[10px] font-black text-white/30 uppercase">/ 5.0 TB</span>
               </div>
             </div>
             <div className="w-20 md:w-24 h-10 md:h-12 bg-black border-2 border-white/20 p-1 md:p-1.5 flex flex-col justify-between">
                <div className="flex gap-0.5 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-full ${i < 4 ? 'bg-yellow-400' : 'bg-white/5'} transition-colors duration-500`} 
                    />
                  ))}
                </div>
                <div className="h-0.5 md:h-1 w-full bg-white/5 mt-1 overflow-hidden">
                   <div className="h-full bg-cyan-400 w-1/3 animate-shimmer" />
                </div>
             </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
           <p className="text-[7px] md:text-[8px] font-black text-white uppercase tracking-[0.4em] opacity-80 truncate mr-4">Hardware Encryption Active • AES-256 Engine Engaging</p>
           <div className="flex gap-2 md:gap-4 shrink-0">
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-cyan-400 rounded-full animate-pulse delay-75" />
              <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-magenta-500 rounded-full animate-pulse delay-150" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default CloudHub;
