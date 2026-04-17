import React from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { X, Download, Code, FileJson, Image as ImageIcon, Check, Copy, Globe, Terminal } from 'lucide-react';
import { exportToJSON, exportToImage, convertToReact, exportToHTML } from '../../../utils/exportUtils';

const ExportModal = () => {
  const { isExportOpen, setExportOpen, uiTheme, pages, activePageId, selectedElementIds } = useEditorStore();
  
  const activePage = pages.find(p => p.id === activePageId) || pages[0];
  const elements = activePage.elements;

  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';
  
  const [activeTab, setActiveTab] = React.useState('image'); // 'image', 'data', 'web', 'code'
  const [copied, setCopied] = React.useState(false);
  
  if (!isExportOpen) return null;

  const handleCopyCode = () => {
    const targetElements = selectedElementIds.length > 0 
      ? elements.filter(el => selectedElementIds.includes(el.id))
      : elements;
    
    const code = convertToReact(targetElements);
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const TabButton = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`
        flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all
        ${activeTab === id 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
          : `${isLight ? 'hover:bg-gray-100 text-gray-500' : 'hover:bg-white/5 text-gray-400'}`}
      `}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setExportOpen(false)} />
      
      <div className={`
        relative w-full max-w-2xl overflow-hidden rounded-[2.5rem] border shadow-2xl transition-all duration-500
        ${isLight ? 'bg-white border-gray-200' : 'bg-[#111111] border-white/10'}
      `}>
        {/* Header */}
        <div className={`flex items-center justify-between px-8 py-6 border-b ${theme.border}`}>
          <div>
            <h2 className={`font-black uppercase tracking-widest text-lg ${isLight ? 'text-gray-900' : 'text-white'}`}>Export Design</h2>
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold mt-1">Universal Handoff Engine</p>
          </div>
          <button onClick={() => setExportOpen(false)} className={`p-2 rounded-xl transition-all hover:rotate-90 ${isLight ? 'hover:bg-gray-100' : 'hover:bg-white/5'}`}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex space-x-2 mb-8 bg-black/5 p-1.5 rounded-3xl w-fit">
            <TabButton id="image" icon={ImageIcon} label="Visual" />
            <TabButton id="data" icon={FileJson} label="Data" />
            <TabButton id="web" icon={Globe} label="Website" />
            <TabButton id="code" icon={Code} label="React Code" />
          </div>

          <div className="min-h-[220px]">
            {activeTab === 'image' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className={`text-sm opacity-60 ${theme.text}`}>Export your design as a high-fidelity image for presentations or documentation.</p>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => exportToImage(elements, 'png')}
                    className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-blue-500/20 hover:border-blue-500 hover:bg-blue-500/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Download size={24} />
                    </div>
                    <span className="font-bold">Download PNG</span>
                    <span className="text-[10px] opacity-40 font-bold mt-1 uppercase">Recommended for web</span>
                  </button>
                  <button 
                    onClick={() => exportToImage(elements, 'svg')}
                    className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-emerald-500/20 hover:border-emerald-500 hover:bg-emerald-500/5 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} />
                    </div>
                    <span className="font-bold">Download SVG</span>
                    <span className="text-[10px] opacity-40 font-bold mt-1 uppercase">Scalable Vector</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className={`text-sm opacity-60 ${theme.text}`}>Save your project as a raw data file to back up or share your editable design.</p>
                <button 
                  onClick={() => exportToJSON(elements)}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border ${theme.border} hover:border-blue-500 transition-all group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <FileJson size={24} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Project JSON (.kraft)</div>
                      <div className="text-[11px] opacity-40 font-bold uppercase">Portability Standard</div>
                    </div>
                  </div>
                  <Download className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </button>
              </div>
            )}
            {activeTab === 'web' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className={`text-sm opacity-60 ${theme.text}`}>Convert your design into a standalone, production-ready website file.</p>
                <button 
                  onClick={() => exportToHTML(pages, projectName)}
                  className={`w-full flex items-center justify-between p-6 rounded-3xl border ${theme.border} border-blue-500/30 bg-blue-500/5 hover:border-blue-500 transition-all group`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Globe size={24} />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">Standalone Website (.html)</div>
                      <div className="text-[11px] opacity-40 font-bold uppercase tracking-widest">Self-contained file</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs uppercase tracking-widest">
                    <span>Export</span>
                    <Download size={14} />
                  </div>
                </button>
                <div className={`p-4 rounded-2xl border ${isLight ? 'bg-amber-50 border-amber-200' : 'bg-amber-500/5 border-amber-500/20'}`}>
                  <p className={`text-[10px] leading-tight font-medium ${isLight ? 'text-amber-800' : 'text-amber-200'}`}>
                    <strong>Note:</strong> Standalone export includes all layouts, colors and Google Fonts integration. Local images will require manual relinking in the code if applicable.
                  </p>
                </div>
              </div>
            )}
            
            {activeTab === 'code' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center justify-between">
                  <p className={`text-sm opacity-60 ${theme.text}`}>
                    {selectedElementIds.length > 0 
                      ? `Exporting ${selectedElementIds.length} selected elements to JSX.` 
                      : 'Exporting entire canvas to production-ready React code.'}
                  </p>
                  <button 
                    onClick={handleCopyCode}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-bold text-xs transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>
                <div className={`p-6 rounded-3xl border overflow-hidden font-mono text-[11px] max-h-48 overflow-y-auto ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-black/40 border-white/5'}`}>
                  <pre className="opacity-70">{convertToReact(selectedElementIds.length > 0 ? elements.filter(el => selectedElementIds.includes(el.id)) : elements)}</pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`px-8 py-6 bg-black/5 text-center`}>
           <p className="text-[11px] font-bold opacity-30 uppercase tracking-[0.2em]">KRAFT Design Handoff Protocol v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
