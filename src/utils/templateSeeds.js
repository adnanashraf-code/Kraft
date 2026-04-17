export const TEMPLATE_SEEDS = {
  t1: {
    projectName: 'SaaS Revolution Hero',
    pages: [
      {
        id: 'p1',
        name: 'Main Hero',
        elements: [
          { id: 'e1', type: 'rectangle', x: 200, y: 100, w: 600, h: 400, fill: '#FF3366', opacity: 0.1, borderRadius: 300 },
          { 
            id: 'e2', type: 'text', x: 150, y: 200, w: 700, h: 120, 
            content: 'The Next Era of Designing', 
            fontSize: 72, fontWeight: '800', textAlign: 'center', lineHeight: 1.1, fontFamily: 'Epilogue' 
          },
          { 
            id: 'e3', type: 'text', x: 250, y: 340, w: 500, h: 60, 
            content: 'Build faster, collaborate better, and ship high-fidelity interfaces in minutes.', 
            fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#666666' 
          },
          { id: 'e4', type: 'rectangle', x: 400, y: 440, w: 200, h: 56, fill: '#000000', borderRadius: 12 },
          { 
            id: 'e5', type: 'text', x: 400, y: 456, w: 200, h: 24, 
            content: 'Get Started Free', 
            fontSize: 14, fontWeight: '700', textAlign: 'center', color: '#ffffff' 
          }
        ]
      }
    ]
  },
  t2: {
    projectName: 'Editorial Journal v2',
    pages: [
      {
        id: 'p1',
        name: 'Cover',
        elements: [
          { 
            id: 'e1', type: 'text', x: 50, y: 50, w: 200, h: 30, 
            content: 'ISSUE NO. 18 / 2025', 
            fontSize: 12, fontWeight: '800' 
          },
          { 
            id: 'e2', type: 'text', x: 50, y: 150, w: 900, h: 300, 
            content: 'MINIMALISM\nIS NOT\nLACKING', 
            fontSize: 120, fontWeight: '900', lineHeight: 0.9, fontFamily: 'Fraunces' 
          },
          { 
            id: 'e3', type: 'text', x: 750, y: 150, w: 200, h: 100, 
            content: 'A deep dive into the essence of subtraction.', 
            fontSize: 14, fontWeight: '400' 
          }
        ]
      }
    ]
  },
  t3: {
    projectName: 'Fintech Dashboard UX',
    pages: [
      {
        id: 'p1',
        name: 'Dashboard',
        elements: [
           { id: 'e1', type: 'rectangle', x: 0, y: 0, w: 240, h: 700, fill: '#f4f4f4' },
           { id: 'e2', type: 'rectangle', x: 280, y: 50, w: 320, h: 200, fill: '#00C853', borderRadius: 24 },
           { 
             id: 'e3', type: 'text', x: 310, y: 80, w: 200, h: 30, 
             content: 'Total Balance', 
             fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)' 
           },
           { 
             id: 'e4', type: 'text', x: 310, y: 110, w: 200, h: 50, 
             content: '$42,394.00', 
             fontSize: 32, fontWeight: '800', color: '#ffffff' 
           }
        ]
      }
    ]
  },
  t4: {
    projectName: 'Portfolio Nexus Max',
    pages: [
      {
        id: 'p1',
        name: 'Hero',
        elements: [
           { id: 'bg', type: 'rectangle', x: 0, y: 0, w: 1000, h: 700, fill: '#0a0a0a' },
           { 
             id: 'name', type: 'text', x: 100, y: 200, w: 800, h: 100, 
             content: 'Adnan Ashraf', 
             fontSize: 84, fontWeight: '900', color: '#ffffff', fontFamily: 'Outfit' 
           },
           { 
             id: 'role', type: 'text', x: 105, y: 300, w: 800, h: 40, 
             content: 'INTERFACE DESIGNER & DEVELOPER', 
             fontSize: 16, fontWeight: '700', color: '#2962FF' 
           },
           { id: 'bar', type: 'rectangle', x: 100, y: 350, w: 60, h: 4, fill: '#2962FF' }
        ]
      }
    ]
  },
  t5: {
    projectName: 'Social Pulse Story',
    pages: [
      {
        id: 'p1',
        name: 'Story 1',
        elements: [
           { id: 'grad', type: 'rectangle', x: 300, y: 50, w: 400, h: 600, fill: '#F50057', borderRadius: 40 },
           { 
             id: 'txt', type: 'text', x: 340, y: 100, w: 320, h: 200, 
             content: 'NEW\nDROP\n2025', 
             fontSize: 56, fontWeight: '900', color: '#ffffff', textAlign: 'center' 
           },
           { id: 'btn', type: 'rectangle', x: 400, y: 550, w: 200, h: 50, fill: '#ffffff', borderRadius: 25 },
           { id: 'btntxt', type: 'text', x: 400, y: 565, w: 200, h: 20, content: 'SHOP NOW', fontSize: 12, fontWeight: '800', textAlign: 'center', color: '#F50057' }
        ]
      }
    ]
  },
  t6: {
    projectName: 'Zen Mobile App',
    pages: [
      {
        id: 'p1',
        name: 'Welcome',
        elements: [
           { id: 'phone', type: 'rectangle', x: 350, y: 80, w: 300, h: 540, fill: '#ffffff', borderRadius: 40, strokeWidth: 8, strokeColor: '#000' },
           { id: 'circle', type: 'rectangle', x: 425, y: 200, w: 150, h: 150, fill: '#00BFA5', opacity: 0.2, borderRadius: 75 },
           { 
             id: 'title', type: 'text', x: 380, y: 400, w: 240, h: 40, 
             content: 'Breathing Space', 
             fontSize: 24, fontWeight: '700', textAlign: 'center' 
           },
           { 
             id: 'sub', type: 'text', x: 380, y: 440, w: 240, h: 60, 
             content: 'Take a moment to center yourself.', 
             fontSize: 14, fontWeight: '400', textAlign: 'center', color: '#666' 
           }
        ]
      }
    ]
  },
  t7: {
    projectName: 'Cyber Punk Poster',
    pages: [
      {
        id: 'p1',
        name: 'Canvas',
        elements: [
           { id: 'bg', type: 'rectangle', x: 100, y: 50, w: 800, h: 600, fill: '#000000' },
           { id: 'glitch1', type: 'rectangle', x: 150, y: 100, w: 700, h: 10, fill: '#AA00FF', opacity: 0.8 },
           { id: 'glitch2', type: 'rectangle', x: 150, y: 580, w: 700, h: 10, fill: '#00E5FF', opacity: 0.8 },
           { 
             id: 'title', type: 'text', x: 150, y: 250, w: 700, h: 200, 
             content: 'NEO\nTOKYO', 
             fontSize: 100, fontWeight: '900', color: '#AA00FF', italic: true 
           }
        ]
      }
    ]
  },
  t8: {
    projectName: 'Corporate Minimal Card',
    pages: [
      {
        id: 'p1',
        name: 'Front',
        elements: [
           { id: 'card', type: 'rectangle', x: 250, y: 200, w: 500, h: 300, fill: '#ffffff', strokeWidth: 1, strokeColor: '#eee' },
           { id: 'logo', type: 'rectangle', x: 290, y: 240, w: 40, h: 40, fill: '#000' },
           { 
             id: 'name', type: 'text', x: 290, y: 350, w: 300, h: 30, 
             content: 'JONATHAN DOE', 
             fontSize: 18, fontWeight: '800' 
           },
           { 
             id: 'role', type: 'text', x: 290, y: 380, w: 300, h: 20, 
             content: 'Creative Director', 
             fontSize: 12, fontWeight: '400', color: '#999' 
           }
        ]
      }
    ]
  },
  t9: {
    projectName: 'Pitch Deck Slide v1',
    pages: [
      {
        id: 'p1',
        name: 'Intro',
        elements: [
           { id: 'side', type: 'rectangle', x: 0, y: 0, w: 400, h: 700, fill: '#FFD600' },
           { 
             id: 'num', type: 'text', x: 50, y: 50, w: 100, h: 100, 
             content: '01', 
             fontSize: 80, fontWeight: '900', color: '#000' 
           },
           { 
             id: 'title', type: 'text', x: 450, y: 250, w: 500, h: 100, 
             content: 'The Problem', 
             fontSize: 48, fontWeight: '800' 
           },
           { 
             id: 'body', type: 'text', x: 450, y: 320, w: 450, h: 200, 
             content: 'Current design tools are too complex for rapid iteration. KRAFT solves this by providing a high-fidelity, agentic experience.', 
             fontSize: 18, fontWeight: '400', color: '#444' 
           }
        ]
      }
    ]
  },
  t10: {
    projectName: 'E-commerce Hero',
    pages: [
      {
        id: 'p1',
        name: 'Landing',
        elements: [
           { id: 'prod', type: 'rectangle', x: 100, y: 150, w: 400, h: 400, fill: '#eee', borderRadius: 20 },
           { 
             id: 'tag', type: 'text', x: 550, y: 180, w: 200, h: 30, 
             content: 'NEW ARRIVAL', 
             fontSize: 12, fontWeight: '800', color: '#FF6D00' 
           },
           { 
             id: 'title', type: 'text', x: 550, y: 220, w: 400, h: 100, 
             content: 'The Sonic\nHeadphones', 
             fontSize: 40, fontWeight: '900' 
           },
           { id: 'btn', type: 'rectangle', x: 550, y: 350, w: 180, h: 50, fill: '#FF6D00', borderRadius: 8 },
           { id: 'btntxt', type: 'text', x: 550, y: 365, w: 180, h: 20, content: 'BUY $249', fontSize: 14, fontWeight: '800', textAlign: 'center', color: '#ffffff' }
        ]
      }
    ]
  }
};
