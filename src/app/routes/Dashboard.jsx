import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Grid3X3, Menu, Copy, Trash2, MoreHorizontal } from 'lucide-react';
import Button from '../../components/common/Button';

const mockProjects = [
  { id: 'p1', title: 'Q3 Marketing Campaign', date: 'Oct 24, 2025', color: '#0E606B' },
  { id: 'p2', title: 'Brand Guidelines V2', date: 'Oct 22, 2025', color: '#F05D23' },
  { id: 'p3', title: 'Social Media Assets', date: 'Oct 18, 2025', color: '#F2B705' },
  { id: 'p4', title: 'Web App Pitch Deck', date: 'Oct 15, 2025', color: '#E23E57' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-black">
      {/* Top Navbar */}
      <nav className="h-16 border-b border-border bg-white flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="font-editorial font-bold text-xl">KRAFT</span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-gray-100 p-1 rounded-md">
            <button className="px-4 py-1.5 text-sm font-medium bg-white shadow-sm rounded border border-border">Recent</button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-200 rounded">Drafts</button>
            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-black hover:bg-gray-200 rounded">Archived</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="pl-9 pr-4 py-1.5 text-sm border border-border rounded-md bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-black w-64"
            />
          </div>
          <Button variant="editorPrimary" icon={Plus} onClick={() => navigate('/editor/new')}>New File</Button>
          <div className="w-8 h-8 bg-gray-200 rounded-full border border-gray-300 overflow-hidden flex items-center justify-center text-xs font-bold shadow-sm">
            US
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-editorial text-3xl font-bold">Recent Projects</h1>
          <div className="flex gap-2">
            <Button variant="icon" icon={Grid3X3} className="bg-gray-100 text-black border border-border" />
            <Button variant="icon" icon={Menu} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div 
            onClick={() => navigate('/editor/new')}
            className="aspect-[4/3] bg-white border border-border border-dashed rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 hover:border-black transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-black">Create new design</span>
          </div>

          {/* Project Cards */}
          {mockProjects.map(project => (
            <div key={project.id} className="group cursor-pointer">
              <div className="aspect-[4/3] bg-white border border-border rounded-lg overflow-hidden relative mb-3 group-hover:border-black transition-colors group-hover:shadow-md">
                <div className="absolute inset-0 opacity-20" style={{ backgroundColor: project.color }} />
                <div className="absolute bottom-4 right-4 w-24 h-24 rounded-full opacity-50 translate-x-4 translate-y-4" style={{ backgroundColor: project.color }} />
                <div className="absolute top-4 left-4 w-16 h-4 opacity-50 bg-black" />
                
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <button className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-600 hover:text-black hover:border-black transition-colors"><Copy size={14}/></button>
                  <button className="p-1.5 bg-white border border-gray-200 rounded shadow-sm text-gray-600 hover:text-red-600 hover:border-red-600 transition-colors"><Trash2 size={14}/></button>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-[15px] text-black group-hover:text-orange transition-colors">{project.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">Edited {project.date}</p>
                </div>
                <button className="text-gray-400 hover:text-black p-1 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
