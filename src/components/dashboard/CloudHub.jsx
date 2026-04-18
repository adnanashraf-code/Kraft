import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';
import * as RemixIcons from '@remixicon/react';
import * as SimpleIcons from 'simple-icons';
import { Cloud, Zap, ShieldCheck, Users, Search, Type, Image as ImageIcon, Box, LayoutGrid } from 'lucide-react';
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

const BRAND_CATEGORIES = {
  tech: {
    label: 'Tech & AI',
    logos: [
      { name: 'Google', icon: SimpleIcons.siGoogle }, { name: 'Apple', icon: SimpleIcons.siApple },
      { name: 'Meta', icon: SimpleIcons.siMeta }, { name: 'NVIDIA', icon: SimpleIcons.siNvidia },
      { name: 'Intel', icon: SimpleIcons.siIntel }, { name: 'AMD', icon: SimpleIcons.siAmd },
      { name: 'Samsung', icon: SimpleIcons.siSamsung }, { name: 'Sony', icon: SimpleIcons.siSony },
      { name: 'Xiaomi', icon: SimpleIcons.siXiaomi }, { name: 'Huawei', icon: SimpleIcons.siHuawei },
      { name: 'Alibaba', icon: SimpleIcons.siAlibabacloud }, { name: 'Acer', icon: SimpleIcons.siAcer },
      { name: 'HP', icon: SimpleIcons.siHp }, { name: 'Dell', icon: SimpleIcons.siDell },
      { name: 'Asus', icon: SimpleIcons.siAsus }, { name: 'Lenovo', icon: SimpleIcons.siLenovo }
    ]
  },
  social: {
    label: 'Social & Comms',
    logos: [
      { name: 'Facebook', icon: SimpleIcons.siFacebook }, { name: 'Instagram', icon: SimpleIcons.siInstagram },
      { name: 'X / Twitter', icon: SimpleIcons.siX }, { name: 'YouTube', icon: SimpleIcons.siYoutube },
      { name: 'TikTok', icon: SimpleIcons.siTiktok }, { name: 'Snapchat', icon: SimpleIcons.siSnapchat },
      { name: 'Pinterest', icon: SimpleIcons.siPinterest }, { name: 'Reddit', icon: SimpleIcons.siReddit },
      { name: 'Discord', icon: SimpleIcons.siDiscord }, { name: 'WhatsApp', icon: SimpleIcons.siWhatsapp },
      { name: 'Telegram', icon: SimpleIcons.siTelegram }, { name: 'Messenger', icon: SimpleIcons.siMessenger },
      { name: 'Twitch', icon: SimpleIcons.siTwitch }, { name: 'Quora', icon: SimpleIcons.siQuora },
      { name: 'Medium', icon: SimpleIcons.siMedium }, { name: 'Tumblr', icon: SimpleIcons.siTumblr }
    ]
  },
  dev: {
    label: 'Dev & Cloud',
    logos: [
      { name: 'GitHub', icon: SimpleIcons.siGithub }, { name: 'GitLab', icon: SimpleIcons.siGitlab },
      { name: 'Bitbucket', icon: SimpleIcons.siBitbucket }, { name: 'Docker', icon: SimpleIcons.siDocker },
      { name: 'Kubernetes', icon: SimpleIcons.siKubernetes }, { name: 'Vercel', icon: SimpleIcons.siVercel },
      { name: 'Netlify', icon: SimpleIcons.siNetlify }, { name: 'Supabase', icon: SimpleIcons.siSupabase },
      { name: 'Firebase', icon: SimpleIcons.siFirebase }, { name: 'Railway', icon: SimpleIcons.siRailway },
      { name: 'Cloudflare', icon: SimpleIcons.siCloudflare }, { name: 'DigitalOcean', icon: SimpleIcons.siDigitalocean },
      { name: 'Hasura', icon: SimpleIcons.siHasura }, { name: 'Vite', icon: SimpleIcons.siVite },
      { name: 'Postman', icon: SimpleIcons.siPostman }, { name: 'Insomnia', icon: SimpleIcons.siInsomnia }
    ]
  },
  automotive: {
    label: 'Automotive',
    logos: [
      { name: 'Tesla', icon: SimpleIcons.siTesla }, { name: 'BMW', icon: SimpleIcons.siBmw },
      { name: 'Ford', icon: SimpleIcons.siFord }, { name: 'Toyota', icon: SimpleIcons.siToyota },
      { name: 'Chevrolet', icon: SimpleIcons.siChevrolet }, { name: 'Ferrari', icon: SimpleIcons.siFerrari },
      { name: 'Lamborghini', icon: SimpleIcons.siLamborghini }, { name: 'Porsche', icon: SimpleIcons.siPorsche },
      { name: 'Audi', icon: SimpleIcons.siAudi }, { name: 'Honda', icon: SimpleIcons.siHonda },
      { name: 'Volkswagen', icon: SimpleIcons.siVolkswagen }, { name: 'Nissan', icon: SimpleIcons.siNissan },
      { name: 'Mitsubishi', icon: SimpleIcons.siMitsubishi }, { name: 'Mazda', icon: SimpleIcons.siMazda },
      { name: 'Maserati', icon: SimpleIcons.siMaserati }, { name: 'Bentley', icon: SimpleIcons.siBentley }
    ]
  },
  entertainment: {
    label: 'Entertainment',
    logos: [
      { name: 'Netflix', icon: SimpleIcons.siNetflix }, { name: 'Spotify', icon: SimpleIcons.siSpotify },
      { name: 'HBO', icon: SimpleIcons.siHbo }, { name: 'SoundCloud', icon: SimpleIcons.siSoundcloud },
      { name: 'Tidal', icon: SimpleIcons.siTidal }, { name: 'Steam', icon: SimpleIcons.siSteam }, 
      { name: 'Epic Games', icon: SimpleIcons.siEpicgames }, { name: 'Roblox', icon: SimpleIcons.siRoblox }, 
      { name: 'Unity', icon: SimpleIcons.siUnity }, { name: 'Unreal Engine', icon: SimpleIcons.siUnrealengine }, 
      { name: 'Blender', icon: SimpleIcons.siBlender }, { name: 'PlayStation', icon: SimpleIcons.siPlaystation }, 
      { name: 'Ubisoft', icon: SimpleIcons.siUbisoft }, { name: 'Atari', icon: SimpleIcons.siAtari }, 
      { name: 'Sega', icon: SimpleIcons.siSega }
    ]
  }
};

const CloudHub = ({ globalSearch = '' }) => {
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

  // Multi-selection state from store
  const { stagedAssets, toggleStageAsset, clearStagedAssets } = useEditorStore();

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
    const lucide = Object.keys(Icons).filter(key => 
      /^[A-Z]/.test(key) && (typeof Icons[key] === 'function' || typeof Icons[key] === 'object') &&
      !['createLucideIcon', 'Icon', 'LucideIcon'].includes(key)
    ).map(key => ({ name: key, comp: Icons[key], source: 'lucide', keywords: [key.toLowerCase()] }));

    const remix = Object.keys(RemixIcons).filter(key => 
      /^[A-Z]/.test(key) && (typeof RemixIcons[key] === 'function' || typeof RemixIcons[key] === 'object') &&
      key !== 'RiContext'
    ).map(key => ({ name: key, comp: RemixIcons[key], source: 'remix', keywords: [key.toLowerCase().replace(/^ri/, '')] }));

    const simple = Object.keys(SimpleIcons).filter(key => 
      key.startsWith('si') && typeof SimpleIcons[key] === 'object'
    ).map(key => {
      const icon = SimpleIcons[key];
      return { 
        name: icon.title, 
        comp: null, 
        path: icon.path, 
        hex: icon.hex, 
        source: 'brand', 
        keywords: [icon.title.toLowerCase(), icon.slug.toLowerCase()] 
      };
    });

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
      } else if (asset.comp) {
        elementData.type = 'rectangle';
        elementData.name = `Icon: ${asset.name}`;
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
          el.library = asset.library || 'lucide';
          el.w = 120;
          el.h = 120;
          el.fill = '#000000';
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
    <div className="flex flex-col gap-8 pb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-black text-white p-8 border-[4px] border-black neo-shadow-lg flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-yellow-400 flex items-center justify-center neo-shadow-sm rotate-3">
             <Cloud className="text-black" size={32} strokeWidth={3} />
          </div>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mb-1">Vault_Cloud_01</h2>
            <div className="flex items-center gap-3">
               <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_green]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-green-400">⚡ Securely Connected</span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
           {categories.map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveCategory(cat.id)}
               className={`px-8 py-4 border-2 border-black neo-shadow-sm transition-all flex items-center gap-3 uppercase font-black text-[11px] tracking-widest ${activeCategory === cat.id ? 'bg-yellow-400 text-black translate-x-1 translate-y-1 neo-shadow-none' : 'bg-white text-black hover:bg-gray-100'}`}
             >
               <cat.icon size={16} strokeWidth={3} />
               {cat.label}
             </button>
           ))}
        </div>
      </div>

      <div className="bg-white/50 border-[3px] border-black p-10 neo-shadow min-h-[600px]">
        {activeCategory === 'images' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[0].color}`}>AI Asset Gallery</h3>
               <span className="text-xs font-black uppercase text-orange-600 animate-pulse">⚡ Powered by Gemini</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="aspect-square bg-white border-[4px] border-black border-dashed flex flex-col items-center justify-center gap-3 hover:bg-ivory cursor-pointer transition-colors group"
               >
                  <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileUpload} accept="image/*" />
                  <div className="w-12 h-12 bg-black flex items-center justify-center neo-shadow-xs group-hover:-translate-y-1 transition-transform">
                     <Icons.Upload className="text-white" size={24} strokeWidth={3} />
                  </div>
                  <p className="text-[12px] font-black uppercase tracking-widest text-center">Upload<br/>New Asset</p>
               </div>

               {images.map((img) => (
                 <div key={img.id} className="group relative">
                    <div className="aspect-square bg-white border-[4px] border-black neo-shadow overflow-hidden group-hover:rotate-1 transition-transform">
                       <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className={`absolute inset-0 bg-black/60 transition-opacity flex flex-col items-center justify-center gap-3 p-4 ${isSelected(img, 'image') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const assetMetadata = {
                                name: img.name,
                                type: 'image',
                                src: img.src
                              };
                              toggleStageAsset(assetMetadata);
                            }}
                            className={`border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest neo-shadow-xs active:translate-y-1 transition-colors w-full ${isSelected(img, 'image') ? 'bg-yellow-400 text-black' : 'bg-white text-black hover:bg-yellow-400'}`}
                          >
                            {isSelected(img, 'image') ? '✓ Selected' : 'Select Asset'}
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleImport(img, 'image');
                            }}
                            className="bg-black text-white border-2 border-white/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-gray-900 transition-colors w-full"
                          >
                            Quick Import
                          </button>
                       </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center px-1">
                       <p className="text-[12px] font-black uppercase tracking-tighter">{img.name}</p>
                       <p className="text-[9px] font-black opacity-30 uppercase">Local_Asset</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}

        {activeCategory === 'fonts' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[1].color}`}>Type Foundry</h3>
               <div className="flex items-center gap-3 bg-white border-[3px] border-black px-4 py-2 neo-shadow-xs">
                  <Search size={18} strokeWidth={3} />
                  <input 
                    type="text" 
                    placeholder="Search Families..." 
                    value={fontSearch}
                    onChange={(e) => setFontSearch(e.target.value)}
                    className="text-xs font-black uppercase outline-none w-48" 
                  />
               </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {filteredFonts.map((font, i) => (
                 <div 
                   key={i} 
                   onClick={() => toggleStageAsset({ id: font, name: font, type: 'font' })}
                   className={`bg-white border-2 border-black p-6 hover:bg-yellow-400 transition-all cursor-pointer neo-shadow-xs group relative ${isSelected({name: font}, 'font') ? 'bg-yellow-400 ring-4 ring-black ring-inset' : ''}`}
                 >
                    <p className="text-xs font-black opacity-20 mb-3 tracking-widest">TYPE_{String(i+1).padStart(3,'0')}</p>
                    <p className="text-xl font-bold truncate leading-none" style={{ fontFamily: font }}>{font}</p>
                    <p className="text-[9px] font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase mt-4">
                       {isSelected({name: font}, 'font') ? 'Deselect Family' : 'Activate Typeface'}
                    </p>
                    {isSelected({name: font}, 'font') && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-black text-yellow-400 flex items-center justify-center neo-shadow-xs">
                        <Icons.Check size={14} strokeWidth={4} />
                      </div>
                    )}
                 </div>
               ))}
            </div>
          </section>
        )}

        {activeCategory === 'icons' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[2].color}`}>Icon Vault</h3>
               <div className="flex items-center gap-3 bg-white border-[3px] border-black px-4 py-2 neo-shadow-xs">
                  <Search size={18} strokeWidth={3} />
                  <input 
                    type="text" 
                    placeholder="Search 10,000+ Icons (Try 'AI' or 'Social')..." 
                    value={iconSearch}
                    onChange={(e) => {
                      setIconSearch(e.target.value);
                      setIconLimit(400);
                    }}
                    className="text-xs font-black uppercase outline-none w-64" 
                  />
               </div>
            </div>
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-20 gap-3 p-1">
                {filteredIcons.slice(0, iconLimit).map((icon, i) => {
                  const IconComp = icon.comp;
                  return (
                    <div 
                      key={i} 
                      title={`${icon.name} (${icon.source})`} 
                      className={`aspect-square bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-crosshair group neo-shadow-xs overflow-hidden relative ${isSelected(icon, 'icon') ? '!bg-black !text-white' : ''}`} 
                      onClick={() => toggleStageAsset({ ...icon, type: 'icon' })}
                    >
                       {icon.source === 'brand' ? (
                         <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:scale-125 transition-transform" fill="currentColor">
                           <path d={icon.path} />
                         </svg>
                       ) : (
                         <IconComp size={20} strokeWidth={icon.source === 'lucide' ? 2.5 : 2} className="group-hover:scale-125 transition-transform" />
                       )}
                       <div className={`absolute top-0 right-0 w-2 h-2 border-l border-b border-black ${isSelected(icon, 'icon') ? 'bg-yellow-400' : (icon.source === 'remix' ? 'bg-cyan-400' : icon.source === 'brand' ? 'bg-orange-500' : 'bg-gray-200 opacity-0')}`} />
                       {isSelected(icon, 'icon') && <div className="absolute inset-0 bg-yellow-400/20 pointer-events-none" />}
                    </div>
                  );
                })}
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
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[3].color}`}>Brand Central</h3>
               <div className="flex items-center gap-3 bg-white border-[3px] border-black px-4 py-2 neo-shadow-xs">
                  <Search size={18} strokeWidth={3} />
                  <input 
                    type="text" 
                    placeholder="Search 3,000+ Brands..." 
                    value={logoSearch}
                    onChange={(e) => setLogoSearch(e.target.value)}
                    className="text-xs font-black uppercase outline-none w-48" 
                  />
               </div>
            </div>

            {!logoSearch ? (
              <div className="flex flex-col gap-8">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {Object.entries(BRAND_CATEGORIES).map(([id, cat]) => (
                    <button
                      key={id}
                      onClick={() => setActiveLogoCategory(id)}
                      className={`px-4 py-2 border-2 border-black text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${activeLogoCategory === id ? 'bg-black text-white neo-shadow-xs -translate-y-0.5' : 'bg-white hover:bg-gray-100'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {BRAND_CATEGORIES[activeLogoCategory].logos.map((logo, i) => {
                    if (!logo.icon) return null;
                    const iconHex = logo.icon.hex ? `#${logo.icon.hex}` : 'black';
                    return (
                      <div 
                        key={i} 
                        onClick={() => toggleStageAsset({ name: logo.name, path: logo.icon.path, hex: logo.icon.hex, type: 'logo' })}
                        className={`bg-white border-[3px] border-black p-6 flex flex-col items-center justify-center gap-4 hover:-translate-y-1 transition-transform neo-shadow-xs group relative ${isSelected({name: logo.name}, 'logo') ? 'ring-4 ring-black ring-inset' : ''}`}
                      >
                        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <svg viewBox="0 0 24 24" className="w-full h-full" fill={iconHex}>
                              <path d={logo.icon.path} />
                            </svg>
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-tight text-center truncate w-full">{logo.name}</p>
                        
                        <div className={`absolute inset-0 bg-black/95 transition-opacity flex flex-col items-center justify-center gap-2 p-2 ${isSelected({name: logo.name}, 'logo') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                           <p className="text-white text-[10px] font-black uppercase tracking-tighter">
                              {isSelected({name: logo.name}, 'logo') ? 'Selected ✓' : 'Add to Staging'}
                           </p>
                           {!isSelected({name: logo.name}, 'logo') && (
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
                  })}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-3 p-1">
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
                      className={`aspect-square bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-crosshair group neo-shadow-xs relative ${isSelected(icon, 'logo') ? 'bg-black text-white' : ''}`} 
                      onClick={() => toggleStageAsset({ ...icon, type: 'logo' })}
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 group-hover:scale-125 transition-transform" fill={icon.hex ? `#${icon.hex}` : 'currentColor'}>
                        <path d={icon.path} />
                      </svg>
                      {isSelected(icon, 'logo') && (
                        <div className="absolute inset-0 bg-yellow-400/90 flex items-center justify-center text-[10px] font-black text-black">SELECTED</div>
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-500 px-4">
          <div className="bg-black text-white border-2 border-white/20 neo-shadow-lg p-4 flex items-center justify-between gap-6 rounded-none backdrop-blur-md">
            
            {/* Status & Count */}
            <div className="flex items-center gap-4 shrink-0 pl-2">
              <div className="relative">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-yellow-400 opacity-20 scale-150 blur-sm animate-ping rounded-full" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[11px] font-black uppercase tracking-widest leading-none">Docked_Assets</h4>
                <p className="text-[9px] font-bold text-white/40 uppercase mt-1 tabular-nums">{stagedAssets.length} Units Ready</p>
              </div>
            </div>

            {/* Scrollable Asset List */}
            <div className="flex-1 flex gap-2 overflow-x-auto py-1 scrollbar-hide border-x border-white/10 px-6">
               {stagedAssets.map((asset, i) => (
                 <div key={i} className="h-10 w-10 shrink-0 bg-white/5 border border-white/20 flex items-center justify-center group relative overflow-hidden transition-all hover:border-yellow-400">
                    {asset.type === 'image' && <img src={asset.src} className="w-full h-full object-cover" />}
                    {asset.type === 'font' && <Type size={14} className="text-white/60" />}
                    {asset.type === 'icon' && <Box size={14} className="text-cyan-400" />}
                    {asset.type === 'logo' && <LayoutGrid size={14} className="text-magenta-400" />}
                    
                    <button 
                      onClick={() => toggleStageAsset(asset)}
                      className="absolute inset-0 bg-red-500/90 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <Icons.X size={14} strokeWidth={3} />
                    </button>
                 </div>
               ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
               <button 
                 onClick={clearStagedAssets}
                 className="px-4 py-2 text-[9px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
               >
                 Abort
               </button>
               <button 
                 onClick={handleBatchImport}
                 className="px-6 py-2.5 bg-yellow-400 text-black neo-shadow-sm hover:-translate-y-0.5 transition-all font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
               >
                 <Zap size={14} strokeWidth={3} />
                 Construct Layout
               </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MISSION CONTROL FOOTER --- */}
      <div className="mt-10 bg-[#0a0a0a] text-white p-5 border-[4px] border-black neo-shadow-lg relative overflow-hidden group">
        {/* Abstract Background Detail */}
        <div className="absolute top-0 right-0 w-64 h-full bg-yellow-400/5 -skew-x-12 translate-x-32" />
        
        <div className="flex flex-col xl:flex-row justify-between items-stretch gap-6 relative z-10">
          
          {/* Identity & Uptime */}
          <div className="flex items-center gap-6 border-r border-white/10 pr-8">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-yellow-400">System_ID</span>
              <div className="flex items-end gap-2">
                <div className="w-1.5 h-8 bg-white opacity-20" />
                <div className="w-0.5 h-8 bg-white opacity-20" />
                <div className="w-3 h-8 bg-white opacity-40" />
                <div className="w-1 h-8 bg-white opacity-20" />
                <h4 className="text-2xl font-black tracking-tighter ml-2">KFT-99X</h4>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30 mb-1">Session_Uptime</span>
              <span className="text-xs font-mono font-bold text-green-400 tabular-nums">04:12:33:09</span>
            </div>
          </div>

          {/* Operational Nodes */}
          <div className="flex-1 flex flex-wrap items-center gap-8">
            {[
              { label: 'Kraft Grid', sub: 'DSX-Node', color: 'bg-yellow-400', pulse: 'animate-pulse', icon: Icons.Grid },
              { label: 'Kraft Engine', sub: 'Compute_01', color: 'bg-cyan-400', pulse: 'animate-bounce', icon: Icons.Cpu },
              { label: 'Kraft Nexus', sub: 'Global_Relay', color: 'bg-magenta-500', pulse: 'animate-pulse', icon: Icons.Globe }
            ].map((node, i) => (
              <div key={i} className="flex items-center gap-4 group/node cursor-help">
                <div className="relative">
                  <div className={`w-3 h-3 ${node.color} rotate-45 relative z-10 flex items-center justify-center`}>
                     <node.icon size={8} className="text-black" strokeWidth={4} />
                  </div>
                  <div className={`absolute inset-0 ${node.color} opacity-40 rotate-45 scale-150 blur-sm ${node.pulse}`} />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest leading-none group-hover/node:text-white transition-colors text-white/70">{node.label}</span>
                    {node.label === 'Kraft Nexus' && (
                      <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-magenta-500/50 animate-pulse" />
                        <div className="w-1 h-3 bg-magenta-500/80 animate-pulse delay-75" />
                        <div className="w-1 h-3 bg-magenta-500 animate-pulse delay-150" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">{node.sub}</span>
                    <div className="w-8 h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className={`h-full ${node.color} w-[85%]`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Transmission Transmission Detail (Center-Right) */}
          <div className="hidden lg:flex flex-col justify-center border-l border-white/10 pl-8">
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

          {/* Vault Capacity Engine */}
          <div className="flex items-center gap-6 bg-white/5 px-6 py-3 border border-white/10 neo-shadow-sm hover:bg-white/10 transition-colors cursor-pointer">
             <div className="flex flex-col items-end">
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Vault_Capacity</span>
               <div className="flex items-baseline gap-1">
                 <span className="text-xl font-black tabular-nums">1.2</span>
                 <span className="text-[10px] font-black text-white/30 uppercase">/ 5.0 TB</span>
               </div>
             </div>
             <div className="w-24 h-12 bg-black border-2 border-white/20 p-1.5 flex flex-col justify-between">
                <div className="flex gap-0.5 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-1 h-full ${i < 4 ? 'bg-yellow-400' : 'bg-white/5'} transition-colors duration-500`} 
                    />
                  ))}
                </div>
                <div className="h-1 w-full bg-white/5 mt-1 overflow-hidden">
                   <div className="h-full bg-cyan-400 w-1/3 animate-shimmer" />
                </div>
             </div>
          </div>
        </div>
        
        {/* Bottom Banner Detail */}
        <div className="mt-4 pt-3 border-t border-white/5 flex justify-between items-center">
           <p className="text-[8px] font-black text-white uppercase tracking-[0.4em] opacity-80">Hardware Encryption Active • AES-256 Engine Engaging</p>
           <div className="flex gap-4">
              <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-75" />
              <div className="w-1.5 h-1.5 bg-magenta-500 rounded-full animate-pulse delay-150" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default CloudHub;
