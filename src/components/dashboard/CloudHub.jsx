import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Cloud, Zap, ShieldCheck, Users, Search, Type, Image as ImageIcon, Box, LayoutGrid } from 'lucide-react';

const CloudHub = () => {
  const [activeCategory, setActiveCategory] = useState('images');

  // --- Data Seeding ---
  const fonts = [
    'Inter', 'Epilogue', 'Fraunces', 'Outfit', 'Space Grotesk', 'Syne', 'Clash Display', 
    'Montserrat', 'Playfair Display', 'Oswald', 'Manrope', 'Lexend', 'Bebas Neue',
    'Chivo', 'Eb Garamond', 'IBM Plex Sans', 'Inclusive Sans', 'Instrument Serif',
    'JetBrains Mono', 'Karla', 'Lora', 'Open Sans', 'Poppins', 'Quicksand', 'Raleway',
    'Roboto', 'Sora', 'Source Code Pro', 'Urbanist', 'Work Sans', 'Young Serif'
  ];
  const allFonts = [...Array(4)].flatMap(() => fonts).slice(0, 100);

  const iconNames = Object.keys(Icons).slice(0, 500);

  const logos = [
    { name: 'Nexus', color: '#FF3366', shape: 'circle' },
    { name: 'Kraft', color: '#000000', shape: 'square' },
    { name: 'Volt', color: '#FFD600', shape: 'triangle' },
    { name: 'Zen', color: '#00BFA5', shape: 'hexagon' },
    { name: 'Flow', color: '#2962FF', shape: 'pill' },
  ];
  const allLogos = [...Array(10)].flatMap(() => logos).map((l, i) => ({ ...l, id: i }));

  const images = [
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
  ];

  const categories = [
    { id: 'images', label: 'Images', icon: ImageIcon, color: 'decoration-orange-400' },
    { id: 'fonts', label: 'Fonts', icon: Type, color: 'decoration-yellow-400' },
    { id: 'icons', label: 'Icons', icon: Box, color: 'decoration-cyan-400' },
    { id: 'logos', label: 'Logos', icon: LayoutGrid, color: 'decoration-magenta-400' },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* --- CLOUD STATUS HEADER --- */}
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

      {/* --- CONTENT AREA --- */}
      <div className="bg-white/50 border-[3px] border-black p-10 neo-shadow min-h-[600px]">
        
        {/* IMAGES TAB */}
        {activeCategory === 'images' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[0].color}`}>AI Asset Gallery</h3>
               <span className="text-xs font-black uppercase text-orange-600 animate-pulse">⚡ Powered by Gemini</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
               {/* UPLOAD CARD */}
               <div className="aspect-square bg-white border-[4px] border-black border-dashed flex flex-col items-center justify-center gap-3 hover:bg-ivory cursor-pointer transition-colors group">
                  <div className="w-12 h-12 bg-black flex items-center justify-center neo-shadow-xs group-hover:-translate-y-1 transition-transform">
                     <Icons.Upload className="text-white" size={24} strokeWidth={3} />
                  </div>
                  <p className="text-[12px] font-black uppercase tracking-widest text-center">Upload<br/>New Asset</p>
               </div>

               {images.map((img) => (
                 <div key={img.id} className="group relative">
                    <div className="aspect-square bg-white border-[4px] border-black neo-shadow overflow-hidden group-hover:rotate-1 transition-transform">
                       <img src={img.src} alt={img.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                          <button className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase tracking-widest neo-shadow-xs active:translate-y-1">Import to Canvas</button>
                       </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center px-1">
                       <p className="text-[12px] font-black uppercase tracking-tighter">{img.name}</p>
                       <p className="text-[9px] font-black opacity-30">4K_PNG</p>
                    </div>
                 </div>
               ))}
               {[1,2,3].map(i => (
                 <div key={i} className="aspect-square bg-gray-100 border-[3px] border-dashed border-gray-400 flex items-center justify-center text-gray-400 font-black uppercase text-[10px]">Syncing_Asset_0{i+17}...</div>
               ))}
            </div>
          </section>
        )}

        {/* FONTS TAB */}
        {activeCategory === 'fonts' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[1].color}`}>Type Foundry</h3>
               <span className="text-xs font-black text-gray-400 uppercase">100 Premium Families</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {allFonts.map((font, i) => (
                 <div key={i} className="bg-white border-2 border-black p-6 hover:bg-yellow-400 transition-all cursor-pointer neo-shadow-xs group">
                    <p className="text-xs font-black opacity-20 mb-3 tracking-widest">TYPE_{String(i+1).padStart(3,'0')}</p>
                    <p className="text-xl font-bold truncate leading-none" style={{ fontFamily: font }}>{font}</p>
                    <p className="text-[9px] font-black opacity-0 group-hover:opacity-100 transition-opacity uppercase mt-4">Activate Typeface</p>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* ICONS TAB */}
        {activeCategory === 'icons' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[2].color}`}>Icon Vault</h3>
               <div className="flex items-center gap-3 bg-white border-[3px] border-black px-4 py-2 neo-shadow-xs">
                  <Search size={18} strokeWidth={3} />
                  <input type="text" placeholder="Search Master Icons..." className="text-xs font-black uppercase outline-none w-48" />
               </div>
            </div>
            <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-20 gap-3 p-1">
               {iconNames.map((name, i) => {
                 const IconComp = Icons[name];
                 return (
                   <div key={i} title={name} className="aspect-square bg-white border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-crosshair group neo-shadow-xs">
                      <IconComp size={20} strokeWidth={2.5} className="group-hover:scale-125 transition-transform" />
                   </div>
                 );
               })}
            </div>
          </section>
        )}

        {/* LOGOS TAB */}
        {activeCategory === 'logos' && (
          <section className="animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="flex items-center justify-between mb-10">
               <h3 className={`text-3xl font-black uppercase tracking-tight underline decoration-8 ${categories[3].color}`}>Brand Central</h3>
               <button className="bg-black text-white px-6 py-2.5 font-black uppercase text-xs neo-shadow hover:bg-cyan-500 hover:text-black transition-all">Upload Vector</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
               {allLogos.map((logo, i) => (
                 <div key={i} className="bg-white border-[4px] border-black p-10 flex flex-col items-center justify-center gap-6 hover:-translate-y-2 transition-transform neo-shadow group">
                    <div className={`w-20 h-20 border-[3px] border-black shadow-[5px_5px_0px_0px_black] group-hover:scale-110 transition-transform`} style={{ backgroundColor: logo.color, borderRadius: logo.shape === 'circle' ? '50%' : logo.shape === 'pill' ? '24px' : '0' }}></div>
                    <p className="text-sm font-black uppercase tracking-widest">{logo.name}_{String(i+1).padStart(2,'0')}</p>
                    <div className="flex gap-2.5">
                       <div className="w-3 h-3 bg-gray-100 border border-black" />
                       <div className="w-3 h-3 bg-gray-400 border border-black" />
                       <div className="w-3 h-3 bg-black" />
                    </div>
                 </div>
               ))}
            </div>
          </section>
        )}

      </div>

      {/* --- COLLABORATORS FOOTER --- */}
      <div className="mt-10 border-t-4 border-black pt-10 flex justify-between items-center">
         <div className="flex -space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className={`w-14 h-14 border-[3px] border-black flex items-center justify-center font-black neo-shadow-sm ${i === 0 ? 'bg-yellow-400' : 'bg-white'}`}>
                 {i === 0 ? 'AA' : i === 1 ? 'AI' : 'JS'}
              </div>
            ))}
            <div className="w-14 h-14 border-[3px] border-black bg-black text-white flex items-center justify-center font-black text-xs neo-shadow-sm">
               +12
            </div>
         </div>
         <div className="text-right">
            <p className="text-sm font-black uppercase mb-1">KRAFT Collaborative Cloud</p>
            <p className="text-xs font-bold text-gray-500">Adnan's Team • Global Node_01</p>
         </div>
      </div>
    </div>
  );
};

export default CloudHub;
