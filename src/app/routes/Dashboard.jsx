import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, Plus, LayoutGrid, List, Clock, 
  FileEdit, Archive, Star, Hash, Settings, Bell, ChevronDown
} from 'lucide-react';
import Button from '../../components/common/Button';
import ProjectCard from '../../components/dashboard/ProjectCard';
import CloudHub from '../../components/dashboard/CloudHub';
import DesignTemplates from '../../components/dashboard/DesignTemplates';
import SettingsModal from '../../components/editor/overlays/SettingsModal';
import useEditorStore from '../../store/useEditorStore';
import { PREMIUM_TEMPLATES } from '../../utils/workspaceData';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || 'recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const { setSettingsOpen, uiTheme, userProfile } = useEditorStore();
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  
  const [notifications, setNotifications] = useState([
    { id: 1, msg: "Server refresh: Workspace synced.", time: "2m ago", color: "bg-green-400" },
    { id: 2, msg: "New component 'Navbar' added to vault.", time: "1h ago", color: "bg-blue-400" },
    { id: 3, msg: "Low storage: 85% used in cloud.", time: "3h ago", color: "bg-yellow-400" }
  ]);

  const [favoritedIds, setFavoritedIds] = useState(() => {
    const saved = localStorage.getItem('kraft_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id) => {
    const newFavs = favoritedIds.includes(id) 
      ? favoritedIds.filter(fid => fid !== id)
      : [...favoritedIds, id];
    setFavoritedIds(newFavs);
    localStorage.setItem('kraft_favorites', JSON.stringify(newFavs));
  };

  const filteredProjects = PREMIUM_TEMPLATES.filter(p => {
    let matchesTab = false;
    if (activeTab === 'starred') {
      matchesTab = favoritedIds.includes(p.id);
    } else if (activeTab === 'recent') {
      matchesTab = p.isRecent;
    } else {
      matchesTab = p.category === activeTab;
    }
    
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const SidebarItem = ({ id, icon: Icon, label, count }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-none text-[13px] transition-all border-2 border-transparent ${
        activeTab === id 
          ? 'bg-yellow-400 text-black font-black neo-shadow-sm border-black' 
          : `${isLight ? 'text-gray-500 hover:bg-gray-100' : 'text-white/40 hover:bg-white/5'} font-bold`
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icon size={16} strokeWidth={activeTab === id ? 3 : 2} />
        <span className="truncate">{label}</span>
      </div>
      {count !== undefined && (
        <span className={`text-[9px] px-1.5 py-0.5 font-black ${activeTab === id ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
          {count}
        </span>
      )}
    </button>
  );

  return (
    <div className={`h-screen flex font-sans transition-colors duration-500 overflow-hidden selection:bg-yellow-400 ${isLight ? 'bg-ivory text-black' : 'bg-[#0a0a0a] text-white'}`}>
      {/* LEFT SIDEBAR */}
      <aside className={`w-[240px] border-r-[3px] border-black flex flex-col shrink-0 transition-colors ${isLight ? 'bg-white' : 'bg-[#121212]'}`}>
        <div className="p-5">
           <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => navigate('/')}>
              <div className={`w-8 h-8 flex items-center justify-center neo-shadow transition-transform group-hover:-translate-y-1 ${isLight ? 'bg-black' : 'bg-yellow-400'}`}>
                <div className={`w-3 h-3 rounded-full ${isLight ? 'bg-yellow-400' : 'bg-black'}`} />
              </div>
              <span className="font-editorial font-bold text-xl tracking-tighter uppercase">KRAFT</span>
           </div>

           <div className="space-y-4">
              <div className={`px-3 text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-40 ${isLight ? 'text-black' : 'text-white'}`}>Main Menu</div>
              <div className="space-y-1">
                <SidebarItem id="recent" icon={Clock} label="Recent Projects" />
                <SidebarItem id="drafts" icon={FileEdit} label="Drafts" />
                <SidebarItem id="archived" icon={Archive} label="Archive" />
              </div>

              <div className={`mt-8 px-3 text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-40 ${isLight ? 'text-black' : 'text-white'}`}>Library</div>
              <div className="space-y-1">
                <SidebarItem id="templates" icon={LayoutGrid} label="Design Templates" />
                <SidebarItem id="starred" icon={Star} label="Favorites" />
                <SidebarItem id="shared" icon={Hash} label="Cloud Hub" />
              </div>
           </div>
        </div>

         <div className="mt-auto p-5 border-t-[3px] border-black">
            <div className={`flex items-center gap-3 p-3 border-2 border-black neo-shadow-sm ${isLight ? 'bg-orange/10' : 'bg-orange/20'}`}>
              <div className="w-10 h-10 bg-orange border-2 border-black flex items-center justify-center shrink-0">
                <span className="font-black text-lg">{userProfile.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black truncate">{userProfile.name || 'User'}</p>
                <p className="text-[10px] font-bold opacity-40 truncate">ID: {userProfile.id || 'guest'}</p>
              </div>
            </div>
         </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className={`flex-1 flex flex-col overflow-hidden transition-colors ${isLight ? 'bg-white/50' : 'bg-black/20'}`}>
        {/* Header Bar */}
        <header className={`h-20 border-b-[3px] border-black flex items-center justify-between px-8 shrink-0 shadow-sm transition-colors ${isLight ? 'bg-white' : 'bg-[#121212]'}`}>
           <div className="relative w-[380px] max-w-full">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-black' : 'text-white'}`} size={18} />
              <input 
                type="text" 
                placeholder="Find Your Genius..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full neo-border-sm py-2 pl-12 pr-4 text-xs font-bold transition-all outline-none ${isLight ? 'bg-ivory text-black focus:bg-yellow-100' : 'bg-black text-white focus:bg-gray-900'}`}
              />
           </div>

           <div className="flex items-center gap-3 relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2.5 border-2 border-black neo-shadow transition-all relative group ${isLight ? 'bg-white hover:bg-cyan-300' : 'bg-black hover:bg-cyan-900 text-white'}`}
              >
                <Bell size={18} strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-black rounded-full text-[7px] flex items-center justify-center font-black text-white">3</span>
              </button>
              
              {isNotifOpen && (
                <div className={`absolute top-16 right-0 w-80 border-[3px] border-black neo-shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isLight ? 'bg-white' : 'bg-[#1a1a1a] text-white'}`}>
                  <div className="p-4 border-b-2 border-black bg-cyan-300 flex justify-between items-center text-black">
                    <span className="font-black text-[10px] uppercase tracking-widest">Notification Engine ({notifications.length})</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setNotifications([])}
                        className="text-[9px] font-black uppercase hover:underline"
                      >
                        Clear All
                      </button>
                      <button onClick={() => setIsNotifOpen(false)} className="font-black text-xs hover:scale-125 transition-transform">×</button>
                    </div>
                  </div>
                  <div className="p-2 space-y-1 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {notifications.length > 0 ? notifications.map((n, i) => (
                      <div key={n.id} className={`p-3 border-2 border-transparent hover:border-black transition-all group flex gap-3 items-start relative ${isLight ? 'hover:bg-ivory' : 'hover:bg-black/40'}`}>
                        <div className={`w-2 h-2 mt-1 rounded-none border border-black ${n.color} neo-shadow-xs`} />
                        <div className="flex-1">
                          <p className="text-[11px] font-bold leading-tight mb-1 pr-4">{n.msg}</p>
                          <span className="text-[9px] font-black opacity-30 uppercase">{n.time}</span>
                        </div>
                        <button 
                          onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
                          className="opacity-0 group-hover:opacity-100 text-[10px] absolute top-2 right-2 hover:text-red-500"
                        >
                          ×
                        </button>
                      </div>
                    )) : (
                      <div className="py-10 text-center text-[10px] font-bold opacity-30 uppercase tracking-widest">
                        Inbox Empty
                      </div>
                    )}
                  </div>
                </div>
              )}

              <button 
                className={`p-2.5 border-2 border-black neo-shadow transition-all group ${isLight ? 'bg-white hover:bg-magenta-300' : 'bg-black hover:bg-magenta-900 text-white'}`} 
                onClick={() => setSettingsOpen(true)}
              >
                <Settings size={18} strokeWidth={2.5} />
              </button>
              
              <div className="w-[2px] h-8 bg-black mx-1"></div>
              
              <Button 
                variant="editorial" 
                icon={Plus} 
                onClick={() => navigate('/editor')}
                className="bg-black text-white px-6 py-2.5 neo-shadow hover:bg-cyan-500 hover:text-black transition-all group text-xs"
              >
                New Design
              </Button>
           </div>
        </header>

        {/* Scrollable Grid */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            {activeTab !== 'templates' && (
              <div className="flex justify-between items-end mb-12">
                 <div className="flex flex-col">
                    <h1 className={`text-4xl font-editorial font-bold capitalize mb-2 tracking-tighter underline decoration-yellow-400 decoration-4 underline-offset-4 ${isLight ? 'text-black' : 'text-white'}`}>{activeTab} Projects</h1>
                    <p className={`text-base font-bold ${isLight ? 'text-gray-500' : 'text-white/40'}`}>Manage and organize your creative workspace.</p>
                 </div>
                 <div className={`flex neo-border p-0.5 neo-shadow shrink-0 ${isLight ? 'bg-white' : 'bg-black'}`}>
                    <button 
                      onClick={() => setViewMode('grid')}
                      className={`p-2 transition-all ${viewMode === 'grid' ? (isLight ? 'bg-black text-white' : 'bg-yellow-400 text-black') : (isLight ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10')}`}
                    >
                      <LayoutGrid size={20}/>
                    </button>
                    <button 
                      onClick={() => setViewMode('list')}
                      className={`p-2 transition-all ${viewMode === 'list' ? (isLight ? 'bg-black text-white' : 'bg-yellow-400 text-black') : (isLight ? 'text-black hover:bg-gray-100' : 'text-white hover:bg-white/10')}`}
                    >
                      <List size={20}/>
                    </button>
                 </div>
              </div>
            )}

              {activeTab === 'shared' ? (
                 <CloudHub globalSearch={searchQuery} onBack={() => setActiveTab('recent')} />
               ) : activeTab === 'templates' ? (
                 <DesignTemplates globalSearch={searchQuery} onBack={() => setActiveTab('recent')} />
               ) : filteredProjects.length > 0 ? (
                <div className={`grid gap-x-12 gap-y-12 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {filteredProjects.map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
                      viewMode={viewMode}
                      isFavorite={favoritedIds.includes(project.id)}
                      onToggleFavorite={() => toggleFavorite(project.id)}
                      onClick={() => navigate('/editor/' + project.id)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-40 text-center">
                   <div className="w-24 h-24 bg-white border-[3px] border-black neo-shadow flex items-center justify-center text-black mb-8">
                      <Search size={48} strokeWidth={3} />
                   </div>
                   <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                     {activeTab === 'drafts' ? 'No Work in Progress' : activeTab === 'archived' ? 'History is Empty' : 'Ghost Town...'}
                   </h3>
                   <p className={`max-w-sm text-lg font-bold ${isLight ? 'text-gray-500' : 'text-white/40'}`}>
                     {activeTab === 'starred' ? "Bookmark your favorite templates to see them here." : "Nothing found in " + activeTab + ". Maybe try a different search?"}
                   </p>
                </div>
              )}
           </div>
        </div>
      </main>
      
      {/* Modals & Overlays */}
      <SettingsModal />
    </div>
  );
};

export default Dashboard;
