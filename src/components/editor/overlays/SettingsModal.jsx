import React from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Grid, Download, Image, Monitor, Settings } from 'lucide-react';

const SettingsModal = () => {
  const { isSettingsOpen, setSettingsOpen, uiTheme, canvas, setZoom } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border ${isLight ? 'bg-white border-gray-200' : 'bg-[#151515] border-white/10'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${theme.border}`}>
          <div className="flex items-center space-x-2">
            <Settings size={18} className={isLight ? 'text-blue-600' : 'text-blue-500'} />
            <h2 className={`font-black uppercase tracking-widest text-sm ${isLight ? 'text-gray-900' : 'text-white'}`}>Editor Settings</h2>
          </div>
          <button onClick={() => setSettingsOpen(false)} className={`p-1.5 rounded-lg transition-colors hover:${isLight ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'} ${theme.title}`}>
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          
          {/* Canvas Section */}
          <div>
            <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.title}`}>Canvas Rendering</h3>
            
            <div className={`flex items-center justify-between p-4 rounded-xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/5'}`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isLight ? 'bg-white shadow-sm' : 'bg-black/20'}`}><Grid size={16} className={isLight ? 'text-gray-600' : 'text-gray-400'} /></div>
                <div>
                  <div className={`text-xs font-bold leading-none mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Grid Snapping</div>
                  <div className={`text-[10px] ${theme.title}`}>Enable snap-to-grid for alignments</div>
                </div>
              </div>
              {/* Fake Toggle Switcher */}
              <div className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${isLight ? 'bg-blue-600' : 'bg-blue-500'}`}>
                 <div className="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm" />
              </div>
            </div>
          </div>

          {/* Performance */}
          <div>
            <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.title}`}>Engine Performance</h3>
            
             <div className={`flex items-center justify-between p-4 rounded-xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/5'}`}>
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${isLight ? 'bg-white shadow-sm' : 'bg-black/20'}`}><Monitor size={16} className={isLight ? 'text-gray-600' : 'text-gray-400'} /></div>
                <div>
                  <div className={`text-xs font-bold leading-none mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Hardware Acceleration</div>
                  <div className={`text-[10px] ${theme.title}`}>Force GPU rendering for 3D elements</div>
                </div>
              </div>
              <div className={`w-10 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${isLight ? 'bg-blue-600' : 'bg-blue-500'}`}>
                 <div className="w-4 h-4 bg-white rounded-full translate-x-4 shadow-sm" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
