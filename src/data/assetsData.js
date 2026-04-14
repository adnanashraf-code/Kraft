export const ASSETS = [
  {
    category: 'Basic Shapes',
    items: [
      { name: 'Circle', type: 'rectangle', w: 100, h: 100, borderRadius: 50, fill: '#000000' },
      { name: 'Pill', type: 'rectangle', w: 150, h: 50, borderRadius: 25, fill: '#000000' },
      { name: 'Square', type: 'rectangle', w: 100, h: 100, borderRadius: 0, fill: '#000000' },
    ]
  },
  {
    category: 'Gradients',
    items: [
      { name: 'Ocean', type: 'rectangle', w: 200, h: 200, fill: 'linear-gradient(135deg, #2dd4bf, #2563eb)' },
      { name: 'Sunset', type: 'rectangle', w: 200, h: 200, fill: 'linear-gradient(135deg, #f9a8d4, #f43f5e)' },
      { name: 'Midnight', type: 'rectangle', w: 200, h: 200, fill: 'linear-gradient(135deg, #0f172a, #334155)' },
    ]
  },
  {
    category: 'UI Elements',
    items: [
      { name: 'Button', type: 'rectangle', w: 140, h: 48, borderRadius: 24, fill: '#2563eb' },
      { name: 'Card', type: 'rectangle', w: 300, h: 400, borderRadius: 16, shadowEnabled: true, shadowBlur: 20, fill: '#ffffff' },
    ]
  }
];
