import React from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, MousePointer2, ZoomIn, Box, Layers, Command, HelpCircle } from 'lucide-react';

const HelpModal = () => {
  const { isHelpOpen, setHelpOpen, uiTheme } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  if (!isHelpOpen) return null;

  const Section = ({ icon: Icon, title, children }) => (
    <div className={`mb-8 last:mb-0`}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${isLight ? 'bg-blue-50 text-blue-600' : 'bg-blue-500/10 text-blue-400'} mr-3`}>
          <Icon size={18} />
        </div>
        <h3 className={`text-sm font-black uppercase tracking-widest ${theme.text}`}>{title}</h3>
      </div>
      <div className={`space-y-3 pl-11`}>
        {children}
      </div>
    </div>
  );

  const FAQItem = ({ q, a }) => (
    <div>
      <p className={`text-[13px] font-bold mb-1 ${isLight ? 'text-gray-900' : 'text-white'}`}>{q}</p>
      <p className={`text-[13px] leading-relaxed opacity-60 ${theme.text}`}>{a}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setHelpOpen(false)} />
      
      <div className={`
        relative w-full max-w-3xl h-[80vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border 
        ${isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/10'}
        animate-in fade-in zoom-in-95 duration-300
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between px-8 py-6 border-b ${theme.border}`}>
          <div className="flex items-center">
            <HelpCircle size={24} className="text-blue-500 mr-3" />
            <div>
              <h2 className={`font-black uppercase tracking-widest text-xl ${isLight ? 'text-gray-900' : 'text-white'}`}>Expert Guide</h2>
              <p className={`text-xs mt-0.5 opacity-50 ${theme.text}`}>Master the KRAFT design environment</p>
            </div>
          </div>
          <button onClick={() => setHelpOpen(false)} className={`p-2 rounded-xl hover:${isLight ? 'bg-gray-100' : 'bg-white/10'} transition-colors`}>
            <X size={20} className={theme.text} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          
          <Section icon={MousePointer2} title="Canvas Navigation">
            <FAQItem q="How do I move around?" a="Hold Spacebar + Drag to pan across the infinite canvas, or use your middle mouse button." />
            <FAQItem q="Zooming in/out?" a="Use the scroll wheel to zoom. You can also use the + / - buttons at the bottom right." />
          </Section>

          <Section icon={Box} title="Shapes & Elements">
            <FAQItem q="Where are the complex shapes?" a="Click the Hexagon icon in the toolbar. We have 20+ geometric shapes like Stars, Kites, and Arrows." />
            <FAQItem q="How to use Asset Vault?" a="Click the Layers/Assets icon to browse premium UI components and gradients. Drag them directly onto the canvas." />
          </Section>

          <Section icon={Layers} title="The Inspector (Properties)">
            <FAQItem q="Styling elements?" a="Select any element to see the Properties Panel on the right. You can change colors, opacity, border-radius, and shadows." />
            <FAQItem q="Gradients & Blends?" a="Use the fill section to apply linear or radial gradients. You can even paste CSS gradient strings." />
          </Section>

          <Section icon={Command} title="Keyboard Shortcuts">
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center`}>
                <span className={`text-xs ${theme.text}`}>Duplicate</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px]`}>CTRL + D</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center`}>
                <span className={`text-xs ${theme.text}`}>Delete</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px]`}>DEL / BKSP</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center`}>
                <span className={`text-xs ${theme.text}`}>Search Overlay</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px]`}>CTRL + K</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center`}>
                <span className={`text-xs ${theme.text}`}>Toggle Theme</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px]`}>T</kbd>
              </div>
            </div>
          </Section>

        </div>

        {/* Footer */}
        <div className={`px-8 py-5 border-t ${theme.border} flex justify-center`}>
          <button 
            onClick={() => { setHelpOpen(false); useEditorStore.getState().setOnboardingOpen(true); }}
            className="text-xs font-bold text-blue-500 hover:text-blue-600 underline underline-offset-4"
          >
            Restart Interactive Onboarding Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
