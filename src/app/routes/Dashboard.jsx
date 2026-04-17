import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plus, LayoutGrid, List, Clock, 
  FileEdit, Archive, Star, Hash, Settings, Bell, ChevronDown
} from 'lucide-react';
import Button from '../../components/common/Button';
import ProjectCard from '../../components/dashboard/ProjectCard';
import CloudHub from '../../components/dashboard/CloudHub';
import { PREMIUM_TEMPLATES } from '../../utils/workspaceData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotifOpen, setIsNotifOpen] = useState(false);
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
          ? 'bg-yellow-400 text-black font-black neo-shadow-sm border-black py-2.5' 
          : 'text-gray-500 hover:bg-gray-100 font-bold'
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
    <div className="h-screen bg-ivory flex font-sans text-black overflow-hidden selection:bg-yellow-400">
      {/* LEFT SIDEBAR */}
      <aside className="w-[240px] bg-white border-r-[3px] border-black flex flex-col shrink-0">
        <div className="p-5">
           <div className="flex items-center gap-2 mb-8 cursor-pointer group" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-black flex items-center justify-center neo-shadow transition-transform group-hover:-translate-y-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
              </div>
              <span className="font-editorial font-bold text-xl tracking-tighter uppercase">KRAFT</span>
           </div>

           <div className="space-y-4">
              <div className="px-3 text-[10px] font-black uppercase text-black tracking-[0.2em] mb-1 opacity-40">Main Menu</div>
              <div className="space-y-1">
                <SidebarItem id="recent" icon={Clock} label="Recent Projects" />
                <SidebarItem id="drafts" icon={FileEdit} label="Drafts" />
                <SidebarItem id="archived" icon={Archive} label="Archive" />
              </div>

              <div className="mt-8 px-3 text-[10px] font-black uppercase text-black tracking-[0.2em] mb-1 opacity-40">Library</div>
              <div className="space-y-1">
                <SidebarItem id="templates" icon={LayoutGrid} label="Design Templates" />
                <SidebarItem id="starred" icon={Star} label="Favorites" />
                <SidebarItem id="shared" icon={Hash} label="Cloud Hub" />
              </div>
           </div>
        </div>

        {/* User section removed as requested */}
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white/50">
        {/* Header Bar */}
        <header className="h-20 border-b-[3px] border-black flex items-center justify-between px-8 shrink-0 bg-white shadow-sm">
           <div className="relative w-[380px] max-w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black" size={18} />
              <input 
                type="text" 
                placeholder="Find Your Genius..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-ivory neo-border-sm py-2 pl-12 pr-4 text-xs font-bold focus:bg-yellow-100 transition-all outline-none"
              />
           </div>

           <div className="flex items-center gap-3 relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2.5 border-2 border-black bg-white hover:bg-cyan-300 neo-shadow transition-all relative group"
              >
                <Bell size={18} strokeWidth={2.5} />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-black rounded-full text-[7px] flex items-center justify-center font-black text-white">3</span>
              </button>
              
              {isNotifOpen && (
                <div className="absolute top-16 right-0 w-80 bg-white border-[3px] border-black neo-shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b-2 border-black bg-cyan-300 flex justify-between items-center text-black">
                    <span className="font-black text-[10px] uppercase tracking-widest">Notifications</span>
                    <button onClick={() => setIsNotifOpen(false)} className="font-black text-xs hover:scale-125 transition-transform">×</button>
                  </div>
                  <div className="p-2 space-y-1">
                    {[
                      { msg: "Server refresh: Workspace synced.", time: "2m ago", color: "bg-green-400" },
                      { msg: "New component 'Navbar' added to vault.", time: "1h ago", color: "bg-blue-400" },
                      { msg: "Low storage: 85% used in cloud.", time: "3h ago", color: "bg-yellow-400" }
                    ].map((n, i) => (
                      <div key={i} className="p-3 hover:bg-ivory border-2 border-transparent hover:border-black transition-all group flex gap-3 items-start">
                        <div className={`w-2 h-2 mt-1 rounded-none border border-black ${n.color} neo-shadow-xs`} />
                        <div>
                          <p className="text-[11px] font-bold leading-tight mb-1">{n.msg}</p>
                          <span className="text-[9px] font-black opacity-30 uppercase">{n.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button className="p-2.5 border-2 border-black bg-white hover:bg-magenta-300 neo-shadow transition-all group" onClick={() => navigate('/settings')}>
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
              <div className="flex justify-between items-end mb-12">
                 <div>
                    <h1 className="text-4xl font-editorial font-bold capitalize mb-2 tracking-tighter underline decoration-yellow-400 decoration-4 underline-offset-4">{activeTab} Projects</h1>
                    <p className="text-gray-500 text-base font-bold">Manage and organize your creative workspace.</p>
                 </div>
                 <div className="flex bg-white neo-border p-0.5 neo-shadow">
                    <button className="p-2.5 bg-black text-white"><LayoutGrid size={20}/></button>
                    <button className="p-2.5 text-black hover:bg-yellow-400 transition-colors"><List size={20}/></button>
                 </div>
              </div>

              {activeTab === 'shared' ? (
                 <CloudHub />
               ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {filteredProjects.map(project => (
                    <ProjectCard 
                      key={project.id} 
                      project={project} 
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
                   <p className="text-gray-500 max-w-sm text-lg font-bold">
                     {activeTab === 'starred' ? "Bookmark your favorite templates to see them here." : "Nothing found in " + activeTab + ". Maybe try a different search?"}
                   </p>
                </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
