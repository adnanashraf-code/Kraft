import React, { useState } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Grid, Monitor, Settings, Keyboard, Database, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

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
  const { 
    isSettingsOpen, setSettingsOpen, uiTheme, setUiTheme,
    preferences, updatePreferences, clearProjectData,
    userProfile, setUserProfile
  } = useEditorStore();
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  
  const [activeTab, setActiveTab] = useState('preferences');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);

  if (!isSettingsOpen) return null;

  const handleShuffleAvatar = () => {
    const randomSeeds = ['Neon', 'Gravity', 'Cyber', 'Kraft', 'Studio', 'Pulse', 'Adnan', 'Vision', 'Spark', 'Flow'];
    const newSeed = randomSeeds[Math.floor(Math.random() * randomSeeds.length)];
    // Using Date.now() guarantees a unique seed every click, forcing the browser to refresh the image
    setUserProfile({ avatarSeed: `${newSeed}-${Date.now()}` });
  };

  const handleSaveProfile = () => {
    setUserProfile({ name: tempName });
    setIsEditingProfile(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity"
        onClick={() => {
            setSettingsOpen(false);
            setIsEditingProfile(false);
        }}
      />

      {/* Modal */}
      <div className={`relative w-full max-w-4xl rounded-none md:rounded-3xl overflow-hidden shadow-2xl border flex flex-col h-full md:h-[650px] max-h-screen animate-in fade-in zoom-in-95 duration-300 ${isLight ? 'bg-white border-gray-200' : 'bg-[#121212] border-white/10'}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 md:px-8 py-4 md:py-6 border-b shrink-0 ${theme.border}`}>
          <div className="flex items-center gap-3 md:gap-4">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center neo-shadow-sm shrink-0 ${isLight ? 'bg-black text-white' : 'bg-yellow-400 text-black'}`}>
               <Settings size={20} className="md:w-6 md:h-6" strokeWidth={2.5} />
            </div>
            <div className="min-w-0">
              <h2 className={`font-black uppercase tracking-widest text-lg md:text-xl truncate ${isLight ? 'text-gray-900' : 'text-white'}`}>Control Center</h2>
              <p className={`text-[8px] md:text-[10px] uppercase font-black mt-0.5 md:mt-1 tracking-[0.2em] opacity-50 truncate ${theme.title}`}>Workspace Configuration_0.1</p>
            </div>
          </div>
          <button onClick={() => { setSettingsOpen(false); setIsEditingProfile(false); }} className={`p-2 rounded-xl md:rounded-2xl transition-all hover:rotate-90 ${isLight ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-white/10 text-white'}`}>
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Sidebar / Top Nav on Mobile */}
          <div className={`w-full md:w-64 shrink-0 p-4 md:p-6 border-b md:border-b-0 md:border-r flex flex-row md:flex-col gap-2 md:gap-3 overflow-x-auto md:overflow-y-auto scrollbar-hide no-scrollbar ${theme.border} ${isLight ? 'bg-gray-50/50' : 'bg-black/40'}`}>
            <button 
              onClick={() => setActiveTab('preferences')}
              className={`flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'preferences' ? (isLight ? 'bg-white shadow-xl border-2 border-black text-black' : 'bg-yellow-400 text-black shadow-lg') : (isLight ? 'text-gray-400 hover:bg-gray-100' : 'text-white/30 hover:bg-white/5')}`}
            >
              <Settings size={16} />
              <span>Workspace</span>
            </button>
            <button 
              onClick={() => setActiveTab('shortcuts')}
              className={`flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'shortcuts' ? (isLight ? 'bg-white shadow-xl border-2 border-black text-black' : 'bg-yellow-400 text-black shadow-lg') : (isLight ? 'text-gray-400 hover:bg-gray-100' : 'text-white/30 hover:bg-white/5')}`}
            >
              <Keyboard size={16} />
              <span>Shortcuts</span>
            </button>
            <button 
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'data' ? (isLight ? 'bg-white shadow-xl border-2 border-black text-black' : 'bg-yellow-400 text-black shadow-lg') : (isLight ? 'text-gray-400 hover:bg-gray-100' : 'text-white/30 hover:bg-white/5')}`}
            >
              <Database size={16} />
              <span>Data</span>
            </button>

            <div className="hidden md:block mt-auto">
               <div className={`p-4 rounded-2xl border-2 border-dashed ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                  <p className={`text-[9px] font-black uppercase tracking-widest mb-3 ${theme.title}`}>Vault Storage</p>
                  <div className="h-2 bg-black/10 rounded-full overflow-hidden mb-2">
                     <div className="h-full bg-cyan-400 w-[24%] rounded-full shadow-[0_0_10px_#22d3ee]"></div>
                  </div>
                  <p className={`text-[8px] font-bold ${theme.title}`}>1.2 GB / 5.0 GB used</p>
               </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar relative">
            
            {/* TAB: PREFERENCES */}
            {activeTab === 'preferences' && (
              <div className="space-y-8 md:space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                
                {/* PROFILE SECTION */}
                <div className={`p-5 md:p-6 rounded-2xl md:rounded-3xl border-2 border-black neo-shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6 ${isLight ? 'bg-ivory' : 'bg-white/5'}`}>
                   <div className="flex items-center gap-4 md:gap-6 flex-1 w-full sm:w-auto">
                      <div className="relative group/avatar shrink-0">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border-4 border-black neo-shadow-xs overflow-hidden">
                           <img 
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.avatarSeed}`} 
                              alt="Profile" 
                              className="w-full h-full bg-yellow-400" 
                           />
                        </div>
                        {isEditingProfile && (
                          <button 
                            onClick={handleShuffleAvatar}
                            className="absolute -bottom-1 -right-1 p-1 bg-black text-white rounded-full border-2 border-white hover:bg-cyan-500 hover:text-black transition-all"
                          >
                             <Zap className="w-2.5 h-2.5" fill="currentColor" />
                          </button>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                          {isEditingProfile ? (
                             <input 
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className={`border-2 border-black px-3 py-1.5 md:px-4 md:py-2 text-lg md:text-xl font-black uppercase tracking-tighter w-full outline-none ${isLight ? 'bg-white focus:bg-yellow-50 text-black' : 'bg-black/40 border-white/10 focus:border-yellow-400 text-white'}`}
                                autoFocus
                             />
                          ) : (
                            <h3 className={`text-lg md:text-xl font-black uppercase tracking-tighter truncate ${isLight ? 'text-black' : 'text-white'}`}>{userProfile.name}</h3>
                         )}
                         <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-cyan-500 flex items-center gap-2 mt-0.5 md:mt-1">
                           <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5" /> {userProfile.role}
                         </p>
                      </div>
                   </div>
                   
                   <div className="w-full sm:w-auto">
                      {isEditingProfile ? (
                        <button 
                          onClick={handleSaveProfile}
                          className="w-full sm:w-auto px-6 py-2.5 bg-green-500 text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest border-2 border-black neo-shadow-xs hover:bg-green-400 transition-all flex items-center justify-center gap-2"
                        >
                           <ShieldCheck size={14} /> Save Profile
                        </button>
                      ) : (
                        <button 
                           onClick={() => { setIsEditingProfile(true); setTempName(userProfile.name); }}
                           className="w-full sm:w-auto px-5 py-2.5 bg-black text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest neo-shadow-xs hover:bg-gray-900 transition-all"
                        >
                           Edit Identity
                        </button>
                      )}
                   </div>
                </div>

                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 ${theme.title}`}>Appearance Vault</h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                     {[
                       { id: 'light', label: 'NEO LIGHT', color: 'bg-white', text: 'text-black' },
                       { id: 'gray', label: 'STUDIO GRAY', color: 'bg-gray-100', text: 'text-gray-600' },
                       { id: 'dark', label: 'DARK ONYX', color: 'bg-[#151515]', text: 'text-white' }
                     ].map(t => (
                        <button 
                         key={t.id}
                         onClick={() => setUiTheme(t.id)}
                         className={`p-3 md:p-4 rounded-xl md:rounded-2xl border-2 transition-all flex flex-col items-center gap-2 md:gap-3 ${uiTheme === t.id ? 'border-black bg-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : `border-transparent ${isLight ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 opacity-50 hover:opacity-100'}`}`}
                        >
                           <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl border ${isLight ? 'border-black/10' : 'border-white/10'} ${t.color}`}></div>
                           <span className={`text-[8px] md:text-[9px] font-black tracking-widest ${uiTheme === t.id ? 'text-black' : (isLight ? 'text-gray-400' : 'text-white/40')}`}>{t.label}</span>
                        </button>
                     ))}
                  </div>
                </div>

                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 md:mb-6 ${theme.title}`}>Engine Preferences</h3>
                  <div className={`p-6 md:p-8 rounded-2xl md:rounded-3xl border-2 border-black neo-shadow-sm ${isLight ? 'bg-white' : 'bg-black/20'} space-y-6 md:space-y-8`}>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className={`p-2.5 md:p-3.5 rounded-xl md:rounded-2xl neo-shadow-xs shrink-0 ${isLight ? 'bg-black text-white' : 'bg-blue-500 text-black'}`}><Grid className="w-5 h-5 md:w-6 md:h-6" /></div>
                        <div>
                          <div className={`font-black uppercase text-xs md:text-sm tracking-tight mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Automatic Snapping</div>
                          <div className={`text-[10px] md:text-[11px] font-bold ${theme.title}`}>Align elements to the 20px grid.</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreferences({ snapEnabled: !preferences.snapEnabled })}
                        className={`w-12 h-7 md:w-14 md:h-8 rounded-full border-2 border-black relative transition-colors shrink-0 ${preferences.snapEnabled ? 'bg-green-400' : (isLight ? 'bg-gray-200' : 'bg-white/10')}`}
                      >
                        <div className={`absolute top-0.5 md:top-1 w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-black rounded-full transition-all ${preferences.snapEnabled ? 'right-0.5 md:right-1' : 'left-0.5 md:left-1'}`} />
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className={`p-2.5 md:p-3.5 rounded-xl md:rounded-2xl neo-shadow-xs shrink-0 ${isLight ? 'bg-black text-white' : 'bg-purple-500 text-black'}`}><Monitor className="w-5 h-5 md:w-6 md:h-6" /></div>
                        <div>
                          <div className={`font-black uppercase text-xs md:text-sm tracking-tight mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>High-Fidelity Mode</div>
                          <div className={`text-[10px] md:text-[11px] font-bold ${theme.title}`}>Process complex shadows & glows.</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreferences({ highFidelity: !preferences.highFidelity })}
                        className={`w-12 h-7 md:w-14 md:h-8 rounded-full border-2 border-black relative transition-colors shrink-0 ${preferences.highFidelity ? 'bg-purple-400' : (isLight ? 'bg-gray-200' : 'bg-white/10')}`}
                      >
                        <div className={`absolute top-0.5 md:top-1 w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-black rounded-full transition-all ${preferences.highFidelity ? 'right-0.5 md:right-1' : 'left-0.5 md:left-1'}`} />
                      </button>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center space-x-4 md:space-x-6">
                        <div className={`p-2.5 md:p-3.5 rounded-xl md:rounded-2xl neo-shadow-xs shrink-0 ${isLight ? 'bg-black text-white' : 'bg-orange-500 text-black'}`}><Database className="w-5 h-5 md:w-6 md:h-6" /></div>
                        <div>
                          <div className={`font-black uppercase text-xs md:text-sm tracking-tight mb-1 ${isLight ? 'text-gray-900' : 'text-white/90'}`}>Auto-Purge Assets</div>
                          <div className={`text-[10px] md:text-[11px] font-bold ${theme.title}`}>Delete unused uploads after 12h.</div>
                        </div>
                      </div>
                      <button 
                        onClick={() => updatePreferences({ autoCleanUploads: !preferences.autoCleanUploads })}
                        className={`w-12 h-7 md:w-14 md:h-8 rounded-full border-2 border-black relative transition-colors shrink-0 ${preferences.autoCleanUploads ? 'bg-orange-400' : (isLight ? 'bg-gray-200' : 'bg-white/10')}`}
                      >
                        <div className={`absolute top-0.5 md:top-1 w-4 h-4 md:w-5 md:h-5 bg-white border-2 border-black rounded-full transition-all ${preferences.autoCleanUploads ? 'right-0.5 md:right-1' : 'left-0.5 md:left-1'}`} />
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShortcutRow description="Selection Tool" keys={['V']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Rectangle Tool" keys={['R']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Text Tool" keys={['T']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Ellipse Tool" keys={['E']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Line Tool" keys={['L']} isLight={isLight} theme={theme} />
                  </div>
                </div>

                <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-3 ${theme.title}`}>Actions & View</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ShortcutRow description="Duplicate" keys={['Ctrl', 'D']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Delete" keys={['Del']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Bring Forward" keys={[']']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Send Backward" keys={['[']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Zoom Fit" keys={['Ctrl', '0']} isLight={isLight} theme={theme} />
                    <ShortcutRow description="Zoom 100%" keys={['Ctrl', '1']} isLight={isLight} theme={theme} />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: DATA */}
            {activeTab === 'data' && (
              <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
                 <div>
                  <h3 className={`text-[10px] font-black uppercase tracking-widest mb-4 ${theme.title}`}>Local Storage Engine</h3>
                  
                  <div className={`p-5 md:p-6 rounded-2xl border border-red-500/20 bg-red-500/5 space-y-4`}>
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="p-2.5 md:p-3 rounded-xl bg-red-500/10 text-red-500 shrink-0"><AlertCircle className="w-5 h-5 md:w-6 md:h-6" /></div>
                      <div>
                        <h4 className="font-bold text-red-500 mb-1">Clear Factory Defaults</h4>
                        <p className={`text-[11px] md:text-xs mb-4 leading-relaxed ${isLight ? 'text-gray-700' : 'text-white/70'}`}>
                          Purge the auto-save database. This action is irreversible.
                        </p>
                        
                        <button 
                          onClick={() => {
                            if (window.confirm("WARNING: This will delete your current project permanently. Are you absolutely certain?")) {
                              clearProjectData();
                            }
                          }}
                          className="w-full sm:w-auto px-5 py-2.5 bg-red-500 text-white font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-xl hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
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
