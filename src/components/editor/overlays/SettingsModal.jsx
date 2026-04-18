import React, { useState } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Grid, Monitor, Settings, Keyboard, Database, AlertCircle } from 'lucide-react';

const ShortcutRow = ({ keys, description, isLight, theme }) => (
  <div className={`flex items-center justify-between p-3 rounded-lg border ${isLight ? 'bg-white border-gray-100 hover:border-gray-300' : 'bg-black/20 border-white/5 hover:border-white/20'} transition-colors`}>
    <div className={`text-xs font-medium ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{description}</div>
    <div className="flex space-x-1">
      {keys.map((k, i) => (
        <kbd key={i} className={`px-2 py-1 text-[10px] font-mono font-bold uppercase rounded-md shadow-sm border ${isLight ? 'bg-gray-50 border-gray-200 text-gray-800' : 'bg-[#1a1a1a] border-white/10 text-white'}`}>
          {k}
        </kbd>
      ))}
    </div>
  </div>
);

const SettingsModal = () => {
  const { isSettingsOpen, setSettingsOpen, uiTheme, preferences, updatePreferences, clearProjectData } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  
  const [activeTab, setActiveTab] = useState('preferences'); // 'preferences', 'shortcuts', 'data'

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setSettingsOpen(false)}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border flex flex-col h-[500px] ${isLight ? 'bg-white border-gray-200' : 'bg-[#151515] border-white/10'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b shrink-0 ${theme.border}`}>
          <div>
            <h2 className={`font-black uppercase tracking-widest text-lg ${isLight ? 'text-gray-900' : 'text-white'}`}>Editor Preferences</h2>
            <p className={`text-[10px] uppercase font-bold mt-1 tracking-widest ${theme.title}`}>Professional Control Center</p>
          </div>
          <button onClick={() => setSettingsOpen(false)} className={`p-2 rounded-xl transition-all hover:rotate-90 ${isLight ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-white/5 text-white/50'}`}>
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className={`w-48 shrink-0 p-4 border-r flex flex-col gap-2 ${theme.border} ${isLight ? 'bg-gray-50' : 'bg-black/20'}`}>
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center space-x-3 w-full p-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'preferences' ? (isLight ? 'bg-white shadow-sm text-blue-600' : 'bg-white/10 text-white') : (isLight ? 'text-gray-500 hover:bg-gray-100' : 'text-white/40 hover:bg-white/5')}`}
            >
              <Settings size={16} />
              <span>Workspace</span>
            </button>
            <button 
              onClick={() => setActiveTab('shortcuts')}
              className={`flex items-center space-x-3 w-full p-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'shortcuts' ? (isLight ? 'bg-white shadow-sm text-blue-600' : 'bg-white/10 text-white') : (isLight ? 'text-gray-500 hover:bg-gray-100' : 'text-white/40 hover:bg-white/5')}`}
            >
              <Keyboard size={16} />
              <span>Shortcuts</span>
            </button>
            <button 
              onClick={() => setActiveTab('data')}
              className={`flex items-center space-x-3 w-full p-3 rounded-xl text-xs font-bold transition-all ${activeTab === 'data' ? (isLight ? 'bg-white shadow-sm text-blue-600' : 'bg-white/10 text-white') : (isLight ? 'text-gray-500 hover:bg-gray-100' : 'text-white/40 hover:bg-white/5')}`}
            >
              <Database size={16} />
              <span>Memory & Data</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            
            {/* TAB: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.title}`}>Canvas Rendering</h3>
                  <div className={`p-5 rounded-2xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/5'} space-y-5`}>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-xl ${isLight ? 'bg-white shadow-sm text-blue-600' : 'bg-blue-500/20 text-blue-500'}`}><Grid size={20} /></div>
                        <div>
                          <div className={`font-bold mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Grid Snapping</div>
                          <div className={`text-xs ${theme.title}`}>Align elements automatically to the 20px grid</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreferences({ snapEnabled: !preferences.snapEnabled })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${preferences.snapEnabled ? 'bg-blue-600' : (isLight ? 'bg-gray-300' : 'bg-white/10')}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${preferences.snapEnabled ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>

                  </div>
                </div>

                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.title}`}>Engine Performance</h3>
                  <div className={`p-5 rounded-2xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/5'}`}>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2.5 rounded-xl ${isLight ? 'bg-white shadow-sm text-purple-600' : 'bg-purple-500/20 text-purple-500'}`}><Monitor size={20} /></div>
                        <div>
                          <div className={`font-bold mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>High-Fidelity Rendering</div>
                          <div className={`text-xs ${theme.title}`}>Enable complex shadows and effects. Turn off for better frame rates on huge boards.</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreferences({ highFidelity: !preferences.highFidelity })}
                        className={`w-12 h-6 rounded-full relative transition-colors ${preferences.highFidelity ? 'bg-purple-600' : (isLight ? 'bg-gray-300' : 'bg-white/10')}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm ${preferences.highFidelity ? 'right-1' : 'left-1'}`} />
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {/* TAB: SHORTCUTS */}
            {activeTab === 'shortcuts' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 ${theme.title}`}>Tools</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ShortcutRow description="Selection Tool" keys={['V']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Rectangle Tool" keys={['R']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Text Tool" keys={['T']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Ellipse Tool" keys={['E']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Line Tool" keys={['L']} isLight={isLight} theme={theme} />
                  </div>
                </div>

                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 ${theme.title}`}>Actions & View</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <ShortcutRow description="Duplicate Element" keys={['Ctrl', 'D']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Delete Selected" keys={['Del']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Bring Forward" keys={[']']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Send Backward" keys={['[']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Zoom to Fit" keys={['Ctrl', '0']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Zoom to 100%" keys={['Ctrl', '1']} isLight={isLight} theme={theme} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DATA */}
            {activeTab === 'data' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                 <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.title}`}>Local Storage Engine</h3>
                  
                  <div className={`p-6 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4`}>
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-red-500/10 text-red-500 shrink-0"><AlertCircle size={24} /></div>
                      <div>
                        <h4 className="font-bold text-red-500 mb-1">Clear Factory Defaults</h4>
                        <p className={`text-xs mb-4 leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                          If the application experiences rendering bugs or fails to load, clearing the local project cache will purge the auto-save database. This action is irreversible and will return the editor to a blank state.
                        </p>
                        
                        <button 
                          onClick={() => {
                            if (window.confirm("WARNING: This will delete your current project permanently. Are you absolutely certain?")) {
                              clearProjectData();
                            }
                          }}
                          className="px-5 py-2.5 bg-red-500 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                        >
                          Clear Project Data
                        </button>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsModal;
