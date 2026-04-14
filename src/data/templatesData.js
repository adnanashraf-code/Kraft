// Premium Readymade Templates for KRAFT
// Each template is a full UI composition ready for production use.

export const TEMPLATES = [
  {
    id: 'hero_modern_saas',
    name: 'Modern SaaS Hero',
    category: 'Marketing',
    elements: [
      { type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: '#ffffff' },
      // Nav Bar
      { type: 'rectangle', x: 50, y: 30, w: 900, h: 60, fill: '#f8fafc', borderRadius: 16 },
      { type: 'text', x: 80, y: 45, w: 100, h: 30, content: 'KRAFT', fontSize: 20, fontWeight: '900', color: '#2563eb' },
      { type: 'text', x: 250, y: 50, w: 300, h: 20, content: 'Features    Product    Pricing', fontSize: 13, fontWeight: '600', color: '#64748b' },
      { type: 'rectangle', x: 830, y: 40, w: 100, h: 40, fill: '#2563eb', borderRadius: 10 },
      { type: 'text', x: 830, y: 50, w: 100, h: 20, content: 'Sign Up', fontSize: 12, fontWeight: '700', color: '#ffffff', textAlign: 'center' },
      // Hero Content
      { type: 'text', x: 200, y: 180, w: 600, h: 100, content: 'Build better layouts, locally.', fontSize: 56, fontWeight: '900', textAlign: 'center', color: '#0f172a', lineHeight: 1.1 },
      { type: 'text', x: 250, y: 300, w: 500, h: 40, content: 'A professional grade editorial engine designed for the next generation of designers and developers.', fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#64748b' },
      { type: 'rectangle', x: 400, y: 380, w: 200, h: 56, fill: '#0f172a', borderRadius: 28, shadowEnabled: true },
      { type: 'text', x: 400, y: 395, w: 200, h: 24, content: 'Get Started Free', fontSize: 15, fontWeight: '700', color: '#ffffff', textAlign: 'center' },
    ]
  },
  {
    id: 'pricing_cards_3',
    name: 'Pro Pricing Grid',
    category: 'Marketing',
    elements: [
      { type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: '#f8fafc' },
      // Header
      { type: 'text', x: 200, y: 80, w: 600, h: 40, content: 'Simple, transparent pricing', fontSize: 32, fontWeight: '900', textAlign: 'center', color: '#0f172a' },
      // Card 1
      { type: 'rectangle', x: 100, y: 180, w: 250, h: 400, fill: '#ffffff', borderRadius: 24, shadowEnabled: true },
      { type: 'text', x: 140, y: 220, w: 170, h: 30, content: 'Free', fontSize: 18, fontWeight: '900', color: '#64748b' },
      { type: 'text', x: 140, y: 260, w: 170, h: 30, content: '$0', fontSize: 36, fontWeight: '900', color: '#0f172a' },
      { type: 'rectangle', x: 130, y: 510, w: 190, h: 40, fill: '#f1f5f9', borderRadius: 10 },
      // Card 2 (Featured)
      { type: 'rectangle', x: 375, y: 160, w: 270, h: 440, fill: '#2563eb', borderRadius: 24, shadowEnabled: true },
      { type: 'text', x: 425, y: 210, w: 170, h: 30, content: 'Pro', fontSize: 18, fontWeight: '900', color: '#bfdbfe' },
      { type: 'text', x: 425, y: 250, w: 170, h: 30, content: '$29', fontSize: 36, fontWeight: '900', color: '#ffffff' },
      { type: 'rectangle', x: 415, y: 530, w: 190, h: 46, fill: '#ffffff', borderRadius: 10 },
      { type: 'text', x: 415, y: 542, w: 190, h: 20, content: 'Get Started', fontSize: 14, fontWeight: '900', color: '#2563eb', textAlign: 'center' },
      // Card 3
      { type: 'rectangle', x: 670, y: 180, w: 250, h: 400, fill: '#ffffff', borderRadius: 24, shadowEnabled: true },
      { type: 'text', x: 710, y: 220, w: 170, h: 30, content: 'Startup', fontSize: 18, fontWeight: '900', color: '#64748b' },
      { type: 'text', x: 710, y: 260, w: 170, h: 30, content: '$99', fontSize: 36, fontWeight: '900', color: '#0f172a' },
      { type: 'rectangle', x: 700, y: 510, w: 190, h: 40, fill: '#f1f5f9', borderRadius: 10 },
    ]
  },
  {
    id: 'dashboard_pro_ux',
    name: 'Admin Dashboard',
    category: 'SaaS',
    elements: [
      { type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: '#ffffff' },
      // Sidebar
      { type: 'rectangle', x: 0, y: 0, w: 240, h: 700, fill: '#0f172a' },
      { type: 'rectangle', x: 30, y: 40, w: 40, h: 40, fill: '#2563eb', borderRadius: 10 },
      { type: 'text', x: 85, y: 50, w: 120, h: 20, content: 'KRAFT PRO', fontSize: 14, fontWeight: '900', color: '#ffffff' },
      { type: 'rectangle', x: 20, y: 120, w: 200, h: 44, fill: '#2563eb', borderRadius: 12, opacity: 0.15 },
      { type: 'text', x: 70, y: 133, w: 120, h: 20, content: 'Dashboard', fontSize: 13, fontWeight: '600', color: '#ffffff' },
      // Header
      { type: 'rectangle', x: 240, y: 0, w: 760, h: 80, fill: '#ffffff', border: '0 0 1px 0 solid #f1f5f9' },
      { type: 'text', x: 280, y: 30, w: 300, h: 24, content: 'Project Statistics', fontSize: 18, fontWeight: '900', color: '#0f172a' },
      // Content Cards
      { type: 'rectangle', x: 280, y: 120, w: 220, h: 140, fill: '#ffffff', border: '1px solid #f1f5f9', borderRadius: 20, shadowEnabled: true },
      { type: 'text', x: 310, y: 150, w: 150, h: 20, content: 'TOTAL USERS', fontSize: 10, fontWeight: '900', color: '#64748b' },
      { type: 'text', x: 310, y: 180, w: 150, h: 40, content: '24.5k', fontSize: 32, fontWeight: '900', color: '#0f172a' },
      { type: 'rectangle', x: 310, y: 230, w: 50, h: 5, fill: '#2563eb', borderRadius: 2 },
      
      { type: 'rectangle', x: 530, y: 120, w: 420, h: 140, fill: '#ffffff', border: '1px solid #f1f5f9', borderRadius: 20, shadowEnabled: true },
       { type: 'text', x: 560, y: 150, w: 150, h: 20, content: 'REVENUE', fontSize: 10, fontWeight: '900', color: '#64748b' },
      { type: 'text', x: 560, y: 180, w: 150, h: 40, content: '$89,400', fontSize: 32, fontWeight: '900', color: '#10b981' },
      
      { type: 'rectangle', x: 280, y: 290, w: 670, h: 360, fill: '#f8fafc', borderRadius: 24 },
      { type: 'text', x: 320, y: 330, w: 300, h: 30, content: 'Traffic Overview', fontSize: 16, fontWeight: '900', color: '#0f172a' },
    ]
  },
  {
    id: 'mobile_app_wire',
    name: 'Mobile Core UI',
    category: 'Mobile',
    elements: [
       { type: 'rectangle', x: 350, y: 50, w: 300, h: 600, fill: '#000000', borderRadius: 44, shadowEnabled: true },
       { type: 'rectangle', x: 360, y: 60, w: 280, h: 580, fill: '#ffffff', borderRadius: 36 },
       { type: 'rectangle', x: 450, y: 75, w: 100, h: 25, fill: '#000000', borderRadius: 12 }, // Dynamic Island
       // App Content
       { type: 'text', x: 380, y: 130, w: 240, h: 40, content: 'Welcome Back', fontSize: 24, fontWeight: '900', color: '#000000' },
       { type: 'rectangle', x: 380, y: 190, w: 240, h: 160, fill: '#2563eb', borderRadius: 24 },
       { type: 'text', x: 405, y: 215, w: 150, h: 20, content: 'Your Balance', fontSize: 12, fontWeight: '600', color: '#ffffff', opacity: 0.8 },
       { type: 'text', x: 405, y: 240, w: 200, h: 40, content: '$4,520.00', fontSize: 28, fontWeight: '900', color: '#ffffff' },
       // Bottom Nav
       { type: 'rectangle', x: 360, y: 580, w: 280, h: 60, fill: '#ffffff', border: '1px 0 0 0 solid #f1f5f9' },
       { type: 'rectangle', x: 490, y: 630, w: 20, h: 20, fill: '#000000', borderRadius: 10 },
    ]
  }
];
