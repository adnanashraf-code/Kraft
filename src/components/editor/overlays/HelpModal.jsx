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
          
          <Section icon={MousePointer2} title="Selection & Navigation">
            <FAQItem q="How do I move around? [SPACE]" a="Hold Spacebar + Drag to pan across the infinite canvas, or use your middle mouse button." />
            <FAQItem q="Zooming in/out? [WHEEL]" a="Use the scroll wheel to zoom. You can also use the + / - buttons at the bottom right." />
            <FAQItem q="Bulk Selection? [DRAG]" a="Drag your mouse on the empty canvas to create a Marquee Selection, or hold Shift while clicking individual elements." />
          </Section>

          <Section icon={Box} title="Shapes & Asset Vault">
            <FAQItem q="Where are the complex shapes? [H]" a="Click the Hexagon icon in the toolbar. We have 20+ geometric shapes including Stars, Kites, Arrows, and Polygons." />
            <FAQItem q="How to use the Vault?" a="Browse the Assets flyout for premium UI components, icons, and curated gradients. Drag-and-drop them directly onto your field." />
          </Section>

          <Section icon={Layers} title="The Inspector & Groups">
            <FAQItem q="What is Grouping? [CTRL + G]" a="Select multiple items and press CTRL + G to lock them into a group. They will now move and behave as a single entity till ungrouped." />
            <FAQItem q="Bulk Styling?" a="If you have multiple items selected, any change in the Properties Panel—color, stroke, or rotation—applies to all of them instantly." />
            <FAQItem q="Responsive Colors?" a="Our engine features 'Theme-Aware' logic. Default text elements automatically flip between Black and White when you switch UI themes [T]." />
          </Section>

          <Section icon={Command} title="Keyboard Master List">
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Undo Action</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>CTRL Z</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Redo Action</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>CTRL SHIFT Z</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Layer Forward</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>CTRL ]</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Layer Backward</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>CTRL [</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Group Selection</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>CTRL G</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Hide Layer</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>SHIFT H</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Lock Layer</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>L</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Add Rectangle</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>R</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Add Text</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>T</kbd>
              </div>
              <div className={`p-3 rounded-xl ${isLight ? 'bg-gray-50' : 'bg-white/5'} flex justify-between items-center border ${theme.border}`}>
                <span className={`text-[11px] font-bold uppercase tracking-wider ${theme.text}`}>Zoom to Fit</span>
                <kbd className={`px-2 py-0.5 rounded border ${isLight ? 'bg-white border-gray-300' : 'bg-black border-white/20'} text-[10px] font-mono`}>CTRL 0</kbd>
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
