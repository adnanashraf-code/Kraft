import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, Zap, Monitor, Smartphone, Rocket, Gamepad2, Building2, ShoppingBag, Cpu, Star } from 'lucide-react';
import useEditorStore from '../../store/useEditorStore';

// ─── TEMPLATE DATA ───────────────────────────────────────────────────────────
// IMPORTANT: Every text element MUST have explicit `h` = Math.ceil(fontSize * 1.6)
// to prevent text from wrapping inside an undersized container on the canvas.
const TEMPLATES_DATA = [
  {
    id: 'tpl-001', title: 'SAAS REVOLUTION HERO', team: 'KRAFT TEAM',
    time: '2 HOURS AGO', tags: ['WEB', 'SAAS'], type: 'saas',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 500, fill: '#ffffff' },
      { type: 'text', name: 'Headline', content: 'REVOLUTIONIZE', x: 80, y: 90, w: 880, h: 130, fontSize: 80, fontFamily: 'Clash Display', fontWeight: '900', color: '#000000' },
      { type: 'text', name: 'Sub', content: 'The next generation of SaaS is here.', x: 80, y: 250, w: 600, h: 36, fontSize: 20, fontFamily: 'Inter', color: '#555555' },
      { type: 'rectangle', name: 'CTA Btn', x: 80, y: 320, w: 200, h: 52, fill: '#000000', borderRadius: 6 },
      { type: 'text', name: 'CTA Label', content: 'Get Started →', x: 80, y: 334, w: 200, h: 24, fontSize: 14, fontFamily: 'Inter', fontWeight: '700', color: '#ffffff', textAlign: 'center' }
    ]
  },
  {
    id: 'tpl-002', title: 'EDITORIAL JOURNAL V2', team: 'EDITORIAL STUDIO',
    time: '1 DAY AGO', tags: ['PRINT', 'SWISS'], type: 'editorial',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 700, fill: '#f5f5f0' },
      { type: 'text', name: 'Masthead', content: 'SWISS', x: 50, y: 50, w: 900, h: 215, fontSize: 160, fontFamily: 'Syne', fontWeight: '900', color: '#000000' },
      { type: 'rectangle', name: 'Divider', x: 50, y: 285, w: 900, h: 3, fill: '#000000' },
      { type: 'text', name: 'Deck', content: 'MODERNISM IN DESIGN', x: 50, y: 310, w: 600, h: 26, fontSize: 14, fontFamily: 'Inter', fontWeight: '900', color: '#000000' },
      { type: 'text', name: 'Vol', content: 'Vol. 02 — 2024', x: 820, y: 310, w: 150, h: 22, fontSize: 12, fontFamily: 'Inter', color: '#666666' }
    ]
  },
  {
    id: 'tpl-003', title: 'FINTECH DASHBOARD UX', team: 'UX LAB',
    time: '3 DAYS AGO', tags: ['APP', 'FINANCE'], type: 'finance',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 700, fill: '#050510' },
      { type: 'text', name: 'App Name', content: 'FINTECH CORE', x: 40, y: 40, w: 500, h: 60, fontSize: 36, fontFamily: 'Outfit', fontWeight: '900', color: '#ffffff' },
      { type: 'rectangle', name: 'Card L', x: 40, y: 120, w: 440, h: 200, fill: '#0f0f1e', borderRadius: 16, strokeColor: '#2a2a5e', strokeWidth: 1 },
      { type: 'rectangle', name: 'Card R', x: 510, y: 120, w: 450, h: 200, fill: '#0f0f1e', borderRadius: 16, strokeColor: '#2a2a5e', strokeWidth: 1 },
      { type: 'text', name: 'Label', content: 'Total Revenue', x: 65, y: 140, w: 200, h: 24, fontSize: 13, fontFamily: 'Inter', color: '#6b7280' },
      { type: 'text', name: 'Amount', content: '$124,500', x: 65, y: 175, w: 360, h: 80, fontSize: 48, fontFamily: 'Outfit', fontWeight: '900', color: '#4ade80' }
    ]
  },
  {
    id: 'tpl-004', title: 'PORTFOLIO NEXUS MAX', team: 'FREELANCE PRO',
    time: '4 DAYS AGO', tags: ['PORTFOLIO', 'ART'], type: 'portfolio',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 900, fill: '#fafafa' },
      { type: 'text', name: 'Hero', content: 'WORK', x: 60, y: 50, w: 880, h: 230, fontSize: 140, fontFamily: 'Fraunces', fontWeight: '900', color: '#000000' },
      { type: 'rectangle', name: 'Img 1', x: 60, y: 310, w: 430, h: 280, fill: '#e0e0e0', borderRadius: 4 },
      { type: 'rectangle', name: 'Img 2', x: 510, y: 310, w: 430, h: 280, fill: '#c8c8c8', borderRadius: 4 },
      { type: 'rectangle', name: 'Img 3', x: 60, y: 610, w: 880, h: 220, fill: '#b0b0b0', borderRadius: 4 }
    ]
  },
  {
    id: 'tpl-005', title: 'CYBER FLUX PRO', team: 'KRAFT TEAM',
    time: '5 DAYS AGO', tags: ['NEON', 'SOCIAL'], type: 'social',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 600, fill: '#000000' },
      { type: 'text', name: 'Word 1', content: 'CYBER', x: 60, y: 70, w: 880, h: 265, fontSize: 155, fontFamily: 'Bebas Neue', fontWeight: '400', color: '#00ffcc' },
      { type: 'text', name: 'Word 2', content: 'FLUX', x: 60, y: 315, w: 880, h: 175, fontSize: 155, fontFamily: 'Bebas Neue', fontWeight: '400', color: '#ffffff' },
      { type: 'text', name: 'Tagline', content: '— ENTER THE FUTURE', x: 60, y: 510, w: 600, h: 28, fontSize: 16, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#00ffcc' }
    ]
  },
  {
    id: 'tpl-006', title: 'RETRO FUTURE VIBE', team: 'KRAFT TEAM',
    time: '1 WEEK AGO', tags: ['RETRO', 'GLITCH'], type: 'retro',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 700, fill: '#1a0033' },
      { type: 'text', name: 'Line 1', content: 'R E T R O', x: 60, y: 150, w: 880, h: 165, fontSize: 100, fontFamily: 'Outfit', fontWeight: '900', color: '#ff00ff', textAlign: 'center' },
      { type: 'text', name: 'Line 2', content: 'FUTURE', x: 60, y: 325, w: 880, h: 165, fontSize: 100, fontFamily: 'Outfit', fontWeight: '900', color: '#00ffff', textAlign: 'center' },
      { type: 'rectangle', name: 'Glitch Line', x: 200, y: 505, w: 600, h: 2, fill: '#ff00ff' },
      { type: 'text', name: 'Byline', content: '// EST. 1984 — BEYOND 2099 //', x: 60, y: 530, w: 880, h: 24, fontSize: 13, fontFamily: 'JetBrains Mono', color: '#ffffff', textAlign: 'center', opacity: 0.5 }
    ]
  },
  {
    id: 'tpl-007', title: 'GAMING EVENT BANNER', team: 'NEXUS ESPORTS',
    time: '2 WEEKS AGO', tags: ['GAMING', 'ESPORTS'], type: 'gaming',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 500, fill: '#0a0a0a' },
      { type: 'text', name: 'Event', content: 'TOURNAMENT', x: 60, y: 90, w: 880, h: 150, fontSize: 90, fontFamily: 'Bebas Neue', color: '#ff3300', textAlign: 'center' },
      { type: 'text', name: 'Sub', content: 'SEASON IV — GRAND FINALS', x: 60, y: 255, w: 880, h: 32, fontSize: 18, fontFamily: 'Space Grotesk', fontWeight: '700', color: '#ffffff', textAlign: 'center' },
      { type: 'rectangle', name: 'CTA', x: 350, y: 315, w: 300, h: 56, fill: '#ff3300', borderRadius: 4 },
      { type: 'text', name: 'CTA Label', content: 'REGISTER NOW', x: 350, y: 330, w: 300, h: 26, fontSize: 15, fontFamily: 'Outfit', fontWeight: '900', color: '#ffffff', textAlign: 'center' }
    ]
  },
  {
    id: 'tpl-008', title: 'AGENCY LANDING BLOCK', team: 'DESIGN BUREAU',
    time: '2 WEEKS AGO', tags: ['AGENCY', 'BRAND'], type: 'agency',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 600, fill: '#000000' },
      { type: 'text', name: 'Large 1', content: 'WE', x: 60, y: 60, w: 880, h: 265, fontSize: 155, fontFamily: 'Syne', fontWeight: '900', color: '#ffffff' },
      { type: 'text', name: 'Large 2', content: 'CREATE IMPACT', x: 60, y: 310, w: 880, h: 135, fontSize: 80, fontFamily: 'Syne', fontWeight: '900', color: '#facc15' },
      { type: 'rectangle', name: 'CTA', x: 60, y: 475, w: 200, h: 56, fill: '#facc15', borderRadius: 4 },
      { type: 'text', name: 'CTA Label', content: "LET'S TALK", x: 60, y: 490, w: 200, h: 26, fontSize: 15, fontFamily: 'Outfit', fontWeight: '900', color: '#000000', textAlign: 'center' }
    ]
  },
  {
    id: 'tpl-009', title: 'E-COMMERCE SPOTLIGHT', team: 'RETAIL STUDIO',
    time: '3 WEEKS AGO', tags: ['ECOM', 'PRODUCT'], type: 'ecom',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 800, fill: '#fafafa' },
      { type: 'rectangle', name: 'Product Area', x: 60, y: 80, w: 480, h: 440, fill: '#efefef', borderRadius: 8 },
      { type: 'text', name: 'Collection', content: 'Premium Collection', x: 610, y: 100, w: 340, h: 22, fontSize: 12, fontFamily: 'Inter', fontWeight: '700', color: '#999999' },
      { type: 'text', name: 'Product Name', content: 'OBSIDIAN GLASS', x: 610, y: 138, w: 340, h: 72, fontSize: 40, fontFamily: 'Fraunces', fontWeight: '900', color: '#000000' },
      { type: 'text', name: 'Price', content: '$249', x: 610, y: 242, w: 200, h: 72, fontSize: 42, fontFamily: 'Inter', fontWeight: '900', color: '#000000' },
      { type: 'text', name: 'Desc', content: 'Handcrafted with premium materials.', x: 610, y: 340, w: 340, h: 26, fontSize: 14, fontFamily: 'Inter', color: '#666666' },
      { type: 'rectangle', name: 'Buy CTA', x: 610, y: 395, w: 340, h: 56, fill: '#000000', borderRadius: 6 },
      { type: 'text', name: 'Buy Label', content: 'Add to Cart', x: 610, y: 411, w: 340, h: 24, fontSize: 14, fontFamily: 'Inter', fontWeight: '700', color: '#ffffff', textAlign: 'center' }
    ]
  },
  {
    id: 'tpl-010', title: 'MINIMAL TECH HERO', team: 'KRAFTLAB',
    time: '1 MONTH AGO', tags: ['MINIMAL', 'STARTUP'], type: 'minimal',
    elements: [
      { type: 'rectangle', name: 'BG', x: 0, y: 0, w: 1000, h: 500, fill: '#ffffff' },
      { type: 'text', name: 'Headline', content: 'Modern Solutions', x: 80, y: 100, w: 840, h: 120, fontSize: 72, fontFamily: 'Inter', fontWeight: '900', color: '#000000' },
      { type: 'text', name: 'Sub', content: 'Built for efficiency and scale. Start free today.', x: 80, y: 248, w: 600, h: 36, fontSize: 20, fontFamily: 'Inter', color: '#888888' },
      { type: 'rectangle', name: 'Primary CTA', x: 80, y: 318, w: 180, h: 52, fill: '#000000', borderRadius: 6 },
      { type: 'text', name: 'Primary Label', content: 'Get Started', x: 80, y: 332, w: 180, h: 24, fontSize: 14, fontFamily: 'Inter', fontWeight: '700', color: '#ffffff', textAlign: 'center' },
      { type: 'rectangle', name: 'Secondary CTA', x: 278, y: 318, w: 160, h: 52, fill: '#ffffff', borderRadius: 6, strokeColor: '#000000', strokeWidth: 2 },
      { type: 'text', name: 'Secondary Label', content: 'Learn More', x: 278, y: 332, w: 160, h: 24, fontSize: 14, fontFamily: 'Inter', fontWeight: '600', color: '#000000', textAlign: 'center' }
    ]
  }
];

// ─── COMPONENT ───────────────────────────────────────────────────────────────
const DesignTemplates = () => {
  const navigate = useNavigate();
  const addElements = useEditorStore(state => state.addElements);
  const [importingId, setImportingId] = useState(null);

  const handleImport = (template) => {
    setImportingId(template.id);
    setTimeout(() => {
      addElements(template.elements);
      navigate('/editor');
      setImportingId(null);
    }, 800);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-editorial font-bold capitalize mb-2 tracking-tighter underline decoration-yellow-400 decoration-4 underline-offset-4">
            Design Templates
          </h1>
          <p className="text-gray-500 text-base font-bold italic">
            Official KRAFT curated layouts — click to open in editor.
          </p>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30">
          {TEMPLATES_DATA.length} TEMPLATES
        </span>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
        {TEMPLATES_DATA.map((tpl) => (
          <div key={tpl.id} className="group flex flex-col">

            {/* ── Card ─────────────────────────────── */}
            <div
              onClick={() => handleImport(tpl)}
              className="relative aspect-square bg-white border-[3px] border-black neo-shadow-sm group-hover:neo-shadow group-hover:-translate-y-1 transition-all cursor-pointer overflow-hidden flex items-center justify-center mb-5 select-none"
            >
              {/* PUBLISHED badge */}
              <div className="absolute top-0 left-0 bg-black text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] z-10">
                Published
              </div>

              {/* Preview illustration */}
              <div className="w-full h-full flex items-center justify-center p-10 pointer-events-none">
                {tpl.type === 'saas'      && <Monitor      size={80} className="text-gray-150 group-hover:text-cyan-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'editorial' && <span className="text-[100px] font-black text-gray-150 group-hover:text-gray-200 transition-colors duration-500 font-editorial leading-none select-none">Aa</span>}
                {tpl.type === 'finance'   && <Smartphone   size={80} className="text-gray-150 group-hover:text-blue-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'portfolio' && <Zap          size={80} className="text-gray-150 group-hover:text-yellow-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'social'    && <Rocket       size={80} className="text-gray-150 group-hover:text-green-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'retro'     && <Star         size={80} className="text-gray-150 group-hover:text-purple-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'gaming'    && <Gamepad2     size={80} className="text-gray-150 group-hover:text-red-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'agency'    && <Building2    size={80} className="text-gray-150 group-hover:text-yellow-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'ecom'      && <ShoppingBag  size={80} className="text-gray-150 group-hover:text-pink-200 transition-colors duration-500" strokeWidth={0.8} />}
                {tpl.type === 'minimal'   && <Cpu          size={80} className="text-gray-150 group-hover:text-gray-300 transition-colors duration-500" strokeWidth={0.8} />}
              </div>

              {/* Category tags – bottom left */}
              <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                {tpl.tags.map(tag => (
                  <span key={tag} className="bg-white border-[2px] border-black px-2.5 py-0.5 text-[9px] font-black uppercase tracking-tight">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Loading overlay */}
              {importingId === tpl.id && (
                <div className="absolute inset-0 bg-yellow-400/95 z-20 flex flex-col items-center justify-center gap-3 animate-in fade-in duration-150">
                  <div className="w-7 h-7 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Opening Editor...</span>
                </div>
              )}
            </div>

            {/* ── Metadata footer ──────────────────── */}
            <div className="flex justify-between items-center">
              <div className="flex-1 min-w-0 pr-3">
                <h4 className="text-[12px] font-black uppercase tracking-tight mb-0.5 truncate group-hover:underline transition-all">
                  {tpl.title}
                </h4>
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider truncate">
                  {tpl.time} &nbsp;•&nbsp; {tpl.team}
                </p>
              </div>
              <button
                className="p-1 rounded hover:bg-gray-100 transition-colors shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontal size={16} className="text-gray-400" />
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignTemplates;
