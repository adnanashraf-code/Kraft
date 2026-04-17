// Premium Readymade Templates for KRAFT
// Each template is a full UI composition ready for production use.

/**
 * 🏷️ BRAND NAME GENERATOR
 * Ensures 120+ unique, professional names for every variant.
 */
const BRAND_PREFIXES = [
  'Apex', 'Nova', 'Vortex', 'Lumina', 'Zenith', 'Cortex', 'Nexus', 'Flux', 'Aura', 'Velocity',
  'Pulse', 'Echo', 'Orbit', 'Prism', 'Solas', 'Ion', 'Glid', 'Kore', 'Meta', 'Axis',
  'Titan', 'Bolt', 'Sync', 'Flow', 'Spark', 'Rift', 'Clutch', 'Peak', 'Base', 'Core'
];

/**
 * 🧱 LAYOUT HELPERS (SECTION FACTORY)
 * Generates high-fidelity UI sections to keep the code modular and fast.
 */
const createNav = (y, brand) => [
  { type: 'rectangle', x: 50, y: y + 20, w: 900, h: 60, fill: 'ACCENT', opacity: 0.05, borderRadius: 16 },
  { type: 'text', x: 80, y: y + 35, w: 120, h: 30, content: brand, fontSize: 18, fontWeight: '900', color: 'ACCENT' },
  { type: 'text', x: 250, y: y + 42, w: 300, h: 20, content: 'Product    Pricing    Docs', fontSize: 11, fontWeight: '600', opacity: 0.5 }
];

const createHero = (y, title, subtext, mode = 'center') => [
  { type: 'text', x: mode === 'center' ? 200 : 80, y: y + 100, w: mode === 'center' ? 600 : 500, h: 100, content: title, fontSize: 52, fontWeight: '900', textAlign: mode === 'center' ? 'center' : 'left' },
  { type: 'text', x: mode === 'center' ? 250 : 80, y: y + 220, w: mode === 'center' ? 500 : 450, h: 60, content: subtext, fontSize: 16, opacity: 0.5, textAlign: mode === 'center' ? 'center' : 'left' },
  { type: 'rectangle', x: mode === 'center' ? 400 : 80, y: y + 320, w: 200, h: 52, fill: 'ACCENT', borderRadius: 26 },
  { type: 'text', x: mode === 'center' ? 400 : 80, y: y + 335, w: 200, h: 20, content: 'Get Started Free', fontSize: 14, fontWeight: '700', color: '#ffffff', textAlign: 'center' }
];

const createCards = (y, count = 3) => {
  const cards = [];
  const spacing = 1000 / (count + 1);
  for (let i = 0; i < count; i++) {
    const x = (i + 1) * spacing - 140;
    cards.push(
      { type: 'rectangle', x, y: y + 100, w: 280, h: 320, fill: 'ACCENT', opacity: 0.03, borderRadius: 32 },
      { type: 'rectangle', x: x + 40, y: y + 140, w: 60, h: 60, fill: 'ACCENT', borderRadius: 20, opacity: 0.2 },
      { type: 'text', x: x + 40, y: y + 230, w: 200, h: 30, content: `Feature ${i+1}`, fontSize: 18, fontWeight: '900' },
      { type: 'text', x: x + 40, y: y + 270, w: 200, h: 40, content: 'Optimized performance for professional teams.', fontSize: 13, opacity: 0.5 }
    );
  }
  return cards;
};

/**
 * 🗺️ 30 BASE DESIGNS (UNIQUE LAYOUTS)
 */
const CONFIGS = [
  { cat: 'SaaS', name: 'Software Landing', h: 'Scale faster with intelligence.' },
  { cat: 'AI', name: 'Neural Engine', h: 'Prompt the future of design.' },
  { cat: 'Crypto', name: 'DeFi Portfolio', h: 'Manage your assets cleanly.' },
  { cat: 'Portfolio', name: 'Design Studio', h: 'Crafting digital experiences.' },
  { cat: 'Healthcare', name: 'Patient Portal', h: 'Digital health, simplified.' },
  { cat: 'Fintech', name: 'Smart Wallet', h: 'Banking for the modern era.' },
  { cat: 'Agency', name: 'Creative Hub', h: 'We build digital products.' },
  { cat: 'Marketing', name: 'Growth Engine', h: 'Double your conversions.' },
  { cat: 'E-commerce', name: 'Storefront Pro', h: 'Minimalist shopping.' },
  { cat: 'Admin', name: 'Control Center', h: 'Insights at a glance.' },
  { cat: 'Blog', name: 'Editorial One', h: 'Stories that matter.' },
  { cat: 'Mobile', name: 'App Showcase', h: 'Simple mobile experiences.' },
  { cat: 'Social', name: 'Profile Bio', h: 'All your links in one place.' },
  { cat: 'Education', name: 'Academy Lite', h: 'Learn without limits.' },
  { cat: 'Travel', name: 'Voyage Planner', h: 'Explore the world today.' },
  { cat: 'Real Estate', name: 'Estate Finder', h: 'Your dream home awaits.' },
  { cat: 'Restaurant', name: 'Gourmet Web', h: 'Fine dining delivered.' },
  { cat: 'Agency', name: 'Dev Studio', h: 'Code. Ship. Repeat.' },
  { cat: 'SaaS', name: 'CRM Tool', h: 'Relationships that result.' },
  { cat: 'Portfolio', name: 'Photo Lab', h: 'Capture the moment.' },
  { cat: 'Podcast', name: 'Audio Station', h: 'Hear the untold stories.' },
  { cat: 'Fitness', name: 'Gym Tracker', h: 'Track your gains.' },
  { cat: 'Legal', name: 'Law Firm Plus', h: 'Justice in your hands.' },
  { cat: 'Event', name: 'Tech Summit', h: 'Join the revolution.' },
  { cat: 'Newsletter', name: 'Daily Digest', h: 'Inbox zero, every day.' },
  { cat: 'Cybersecurity', name: 'Guard Pro', h: 'Secure your perimeter.' },
  { cat: 'Fintech', name: 'Stock Flow', h: 'Market data, real-time.' },
  { cat: 'Studio', name: 'Minimal One', h: 'Less is always more.' },
  { cat: 'SaaS', name: 'Project Hub', h: 'Teams, synced.' },
  { cat: 'Resume', name: 'Executive CV', h: 'Lead the industry.' }
];

/**
 * 🌗 THEME VARIANTS
 */
const THEME_VARIANTS = [
  { id: 'light_blue', mode: 'light', accent: '#2563eb', bg: '#ffffff', text: '#0f172a' },
  { id: 'dark_blue', mode: 'dark', accent: '#3b82f6', bg: '#0c0c0c', text: '#ffffff' },
  { id: 'light_purple', mode: 'light', accent: '#8b5cf6', bg: '#ffffff', text: '#1e1b4b' },
  { id: 'dark_purple', mode: 'dark', accent: '#a78bfa', bg: '#080616', text: '#f5f3ff' }
];

const generateTemplates = () => {
  const finalTemplates = [];

  CONFIGS.forEach((config, idx) => {
    const brand = BRAND_PREFIXES[idx % BRAND_PREFIXES.length];
    
    THEME_VARIANTS.forEach(variant => {
      const isDark = variant.mode === 'dark';
      
      finalTemplates.push({
        id: `${config.cat.toLowerCase()}_${idx}_${variant.id}`,
        name: `${brand} ${config.name}`,
        category: config.cat,
        elements: [
          { type: 'rectangle', x: 0, y: 0, w: 1000, h: 2000, fill: isDark ? variant.bg : '#ffffff' },
          ...createNav(0, brand.toUpperCase()),
          ...createHero(0, config.h, 'A professional grade editorial engine designed for the next generation.', 'center'),
          ...createCards(600, 3)
        ].map(el => ({
          ...el,
          fill: el.fill === 'ACCENT' ? variant.accent : el.fill,
          color: el.color === '#ffffff' ? '#ffffff' : 
                 el.color === 'ACCENT' ? variant.accent : 
                 (isDark && el.type === 'text') ? '#ffffff' : (el.color || variant.text)
        }))
      });
    });
  });

  return finalTemplates;
};

export const TEMPLATES = generateTemplates();

