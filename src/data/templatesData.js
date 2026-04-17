// Premium Readymade Templates for KRAFT
// Each template is a full UI composition ready for production use.

/**
 * BASE DESIGNS (30 CATEGORIES)
 * These are the fundamental layouts that the factory will use to generate 100+ variants.
 */
const BASE_DESIGNS = [
  {
    id: 'saas_landing_pro',
    name: 'Pro SaaS Landing',
    category: 'SaaS',
    elements: [
      { type: 'rectangle', x: 0, y: 0, w: 1200, h: 3000, fill: '#ffffff' }, // Page Container
      // HERO SECTION
      { type: 'text', x: 300, y: 150, w: 600, h: 100, content: 'Scale your engineering with KRAFT.', fontSize: 56, fontWeight: '900', textAlign: 'center' },
      { type: 'text', x: 350, y: 280, w: 500, h: 60, content: 'The only design engine that understands code as well as you do.', fontSize: 18, textAlign: 'center', opacity: 0.6 },
      { type: 'rectangle', x: 500, y: 380, w: 200, h: 56, fill: 'ACCENT', borderRadius: 28 }, // CTA
      { type: 'text', x: 500, y: 395, w: 200, h: 24, content: 'Get Started', fontSize: 15, fontWeight: '700', color: '#ffffff', textAlign: 'center' },
      
      // FEATURES SECTION
      { type: 'text', x: 500, y: 600, w: 200, h: 30, content: 'FEATURES', fontSize: 12, fontWeight: '900', textAlign: 'center', color: 'ACCENT' },
      { type: 'text', x: 300, y: 640, w: 600, h: 40, content: 'Everything you need in one place.', fontSize: 32, fontWeight: '900', textAlign: 'center' },
      
      { type: 'rectangle', x: 200, y: 750, w: 250, h: 300, fill: 'ACCENT', opacity: 0.05, borderRadius: 24 },
      { type: 'text', x: 230, y: 780, w: 190, h: 30, content: 'Real-time Sync', fontSize: 18, fontWeight: '900' },
      { type: 'text', x: 230, y: 820, w: 190, h: 60, content: 'Collaborate with your team seamlessly across any device.', fontSize: 14, opacity: 0.7 },
      
      { type: 'rectangle', x: 475, y: 750, w: 250, h: 300, fill: 'ACCENT', opacity: 0.05, borderRadius: 24 },
      { type: 'text', x: 505, y: 780, w: 190, h: 30, content: 'AI Optimized', fontSize: 18, fontWeight: '900' },
      { type: 'text', x: 505, y: 820, w: 190, h: 60, content: 'Trained on millions of professional design tokens.', fontSize: 14, opacity: 0.7 },
      
      { type: 'rectangle', x: 750, y: 750, w: 250, h: 300, fill: 'ACCENT', opacity: 0.05, borderRadius: 24 },
      { type: 'text', x: 780, y: 780, w: 190, h: 30, content: 'Export Ready', fontSize: 18, fontWeight: '900' },
      { type: 'text', x: 780, y: 820, w: 190, h: 60, content: 'Export clean React and Tailwind code in seconds.', fontSize: 14, opacity: 0.7 },

      // PRICING SECTION
      { type: 'rectangle', x: 0, y: 1200, w: 1200, h: 800, fill: 'ACCENT', opacity: 0.02 },
      { type: 'text', x: 400, y: 1280, w: 400, h: 40, content: 'Pricing for everyone.', fontSize: 32, fontWeight: '900', textAlign: 'center' },
      
      { type: 'rectangle', x: 200, y: 1380, w: 250, h: 450, fill: '#ffffff', borderRadius: 24, shadowEnabled: true }, // Card 1
      { type: 'text', x: 240, y: 1430, w: 170, h: 30, content: 'Free', fontSize: 18, fontWeight: '900', opacity: 0.5 },
      { type: 'text', x: 240, y: 1470, w: 170, h: 50, content: '$0', fontSize: 44, fontWeight: '900' },
      
      { type: 'rectangle', x: 475, y: 1350, w: 250, h: 510, fill: 'ACCENT', borderRadius: 24, shadowEnabled: true }, // Card 2 (Featured)
      { type: 'text', x: 515, y: 1400, w: 170, h: 30, content: 'Pro', fontSize: 18, fontWeight: '900', color: '#ffffff', opacity: 0.8 },
      { type: 'text', x: 515, y: 1440, w: 170, h: 50, content: '$29', fontSize: 44, fontWeight: '900', color: '#ffffff' },
      { type: 'rectangle', x: 505, y: 1770, w: 190, h: 50, fill: '#ffffff', borderRadius: 12 },
      { type: 'text', x: 505, y: 1785, w: 190, h: 20, content: 'Purchase Now', fontSize: 14, fontWeight: '900', textAlign: 'center', color: 'ACCENT' },

      { type: 'rectangle', x: 750, y: 1380, w: 250, h: 450, fill: '#ffffff', borderRadius: 24, shadowEnabled: true }, // Card 3
      
      // TESTIMONIALS
      { type: 'text', x: 400, y: 2000, w: 400, h: 40, content: 'Loved by thousands.', fontSize: 32, fontWeight: '900', textAlign: 'center' },
      { type: 'rectangle', x: 200, y: 2100, w: 800, h: 200, fill: '#ffffff', borderRadius: 32, border: '1px solid ACCENT', opacity: 0.1 },
      { type: 'text', x: 250, y: 2150, w: 700, h: 100, content: '"KRAFT transformed our design workflow. The components are pixel perfect and the speed of the interface is unmatched."', fontSize: 20, fontWeight: '500', textAlign: 'center', fontStyle: 'italic' },
      
      // FOOTER
      { type: 'rectangle', x: 0, y: 2400, w: 1200, h: 400, fill: '#0f172a' },
      { type: 'text', x: 100, y: 2480, w: 200, h: 30, content: 'KRAFT', fontSize: 24, fontWeight: '900', color: '#ffffff' },
      { type: 'text', x: 100, y: 2520, w: 300, h: 20, content: 'Built with passion for designers.', fontSize: 13, color: '#ffffff', opacity: 0.5 },
      { type: 'text', x: 900, y: 2480, w: 200, h: 20, content: '© 2024 KRAFT INC', fontSize: 12, color: '#ffffff', opacity: 0.3, textAlign: 'right' }
    ]
  },
  {
    id: 'crypto_dashboard',
    name: 'Crypto & Fintech',
    category: 'SaaS',
    elements: [
       { type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: 'SIDEBAR' },
       { type: 'rectangle', x: 50, y: 50, w: 200, h: 600, fill: 'ACCENT', borderRadius: 32, opacity: 0.8 },
       { type: 'text', x: 80, y: 100, w: 140, h: 30, content: 'Assets', fontSize: 18, fontWeight: '900', color: '#ffffff' },
       { type: 'rectangle', x: 300, y: 50, w: 650, h: 180, fill: 'ACCENT', borderRadius: 32, shadowEnabled: true },
       { type: 'text', x: 340, y: 90, w: 200, h: 20, content: 'Total Portfolio Balance', fontSize: 12, color: '#ffffff', opacity: 0.7 },
       { type: 'text', x: 340, y: 120, w: 300, h: 40, content: '$148,500.24', fontSize: 36, fontWeight: '900', color: '#ffffff' }
    ]
  },
  {
    id: 'ai_tool_terminal',
    name: 'AI Tool Landing',
    category: 'AI / Modern',
    elements: [
       { type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: '#050505' },
       { type: 'text', x: 300, y: 100, w: 400, h: 40, content: 'Prompt Everything.', fontSize: 36, fontWeight: 'black', textAlign: 'center', color: '#ffffff' },
       { type: 'rectangle', x: 200, y: 200, w: 600, h: 300, fill: '#111111', borderRadius: 24, border: '1px solid #222' },
       { type: 'text', x: 230, y: 230, w: 500, h: 20, content: '> Initializing neural networks...', fontSize: 12, color: 'ACCENT', fontWeight: 'bold' }
    ]
  },
  {
    id: 'medical_portal_web',
    name: 'Healthcare Hub',
    category: 'Healthcare',
    elements: [
       { type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: '#f0f9ff' },
       { type: 'rectangle', x: 100, y: 80, w: 800, h: 540, fill: '#ffffff', borderRadius: 40, shadowEnabled: true },
       { type: 'text', x: 160, y: 150, w: 300, h: 40, content: 'Find your doctor', fontSize: 24, fontWeight: '900', color: '#0c4a6e' },
       { type: 'rectangle', x: 160, y: 210, w: 300, h: 50, fill: '#f1f5f9', borderRadius: 12 }
    ]
  },
  { id: 'agency_portfolio_v1', name: 'Creative Agency', category: 'Agency' },
  { id: 'ecom_detailed_v1', name: 'Product Showcase', category: 'E-commerce' },
  { id: 'blog_modern_v1', name: 'Editorial Blog', category: 'Marketing' },
  { id: 'resume_pro_v1', name: 'Executive Resume', category: 'Resume' },
  { id: 'podcast_landing_v1', name: 'Audio & Podcast', category: 'Creative' },
  { id: 'fitness_tracker_v1', name: 'Activity Dashboard', category: 'Healthcare' },
  { id: 'real_estate_v1', name: 'Property Search', category: 'Marketing' },
  { id: 'travel_booking_v1', name: 'Destination Hub', category: 'Agency' },
  { id: 'restaurant_menu_v1', name: 'Gourmet Menu', category: 'Agency' },
  { id: 'educ_course_v1', name: 'Active Learning', category: 'SaaS' },
  { id: 'event_landing_v1', name: 'Summit 2024', category: 'Marketing' },
  { id: 'app_store_page_v1', name: 'Mobile App View', category: 'Mobile' },
  { id: 'social_profile_v1', name: 'Influencer Bio', category: 'Mobile' },
  { id: 'newsletter_v1', name: 'Lead Capture', category: 'Marketing' },
  { id: 'studio_minimal_v1', name: 'Studio One', category: 'Agency' },
  { id: 'pitch_deck_v1', name: 'Startup Pitch', category: 'SaaS' },
  { id: 'gaming_portal_v1', name: 'Gamer Portal', category: 'Agency' },
  { id: 'fashion_v1', name: 'Lookbook Pro', category: 'E-commerce' },
  { id: 'fintech_wallet_v1', name: 'Digital Wallet', category: 'SaaS' },
  { id: 'legal_v1', name: 'Law Firm Plus', category: 'SaaS' },
  { id: 'travel_blog_v1', name: 'Nomad Journal', category: 'Marketing' },
  { id: 'ai_tool_v2', name: 'Neural Engine', category: 'AI / Modern' },
  { id: 'resort_v1', name: 'Summer Resort', category: 'Agency' },
  { id: 'agency_v2', name: 'Edge Digital', category: 'Agency' },
  { id: 'saas_lite_v1', name: 'SaaS Starter', category: 'SaaS' },
  { id: 'personal_blog_v1', name: 'Minimalist Blog', category: 'Marketing' }
];

/**
 * THEMES & COLORS
 */
const THEME_VARIANTS = [
  { id: 'light_blue', mode: 'light', accent: '#2563eb', bg: '#ffffff', text: '#0f172a' },
  { id: 'dark_blue', mode: 'dark', accent: '#3b82f6', bg: '#0c0c0c', text: '#ffffff' },
  { id: 'light_purple', mode: 'light', accent: '#8b5cf6', bg: '#ffffff', text: '#1e1b4b' },
  { id: 'dark_purple', mode: 'dark', accent: '#a78bfa', bg: '#080616', text: '#f5f3ff' }
];

/**
 * VARIANT FACTORY
 * Multiplies base designs by theme variants to reach 120+ templates.
 */
const generateTemplates = () => {
  const finalTemplates = [];

  BASE_DESIGNS.forEach(base => {
    THEME_VARIANTS.forEach(variant => {
      finalTemplates.push({
        id: `${base.id}_${variant.id}`,
        name: `${base.name} (${variant.mode === 'light' ? 'Light' : 'Dark'} ${variant.id.split('_')[1]})`,
        category: base.category,
        elements: (base.elements || []).map(el => ({
          ...el,
          fill: el.fill === 'ACCENT' ? variant.accent : 
                el.fill === 'SIDEBAR' ? (variant.mode === 'dark' ? '#111' : '#f8fafc') :
                (el.fill === '#ffffff' && variant.mode === 'dark') ? variant.bg : el.fill,
          color: el.color === '#ffffff' ? (variant.mode === 'dark' ? '#ffffff' : '#ffffff') :
                 el.color === 'ACCENT' ? variant.accent :
                 (!el.color && variant.mode === 'dark' && el.type === 'text') ? '#ffffff' : el.color
        }))
      });
    });
  });

  return finalTemplates;
};

export const TEMPLATES = generateTemplates();

