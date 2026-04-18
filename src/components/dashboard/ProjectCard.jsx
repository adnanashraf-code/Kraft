import React from 'react';
import { Copy, Trash2, MoreHorizontal, ExternalLink, Archive, Star } from 'lucide-react';

const ProjectCard = ({ project, onClick, isFavorite, onToggleFavorite, viewMode = 'grid' }) => {
  const getPreviewIcon = () => {
    switch (project.previewType) {
      case 'typography': return 'Aa';
      case 'app': return '📱';
      case 'abstract': return '✨';
      case 'social': return '📸';
      default: return '📐';
    }
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        className="group flex items-center gap-6 p-4 bg-white border-[3px] border-black neo-border-sm hover:translate-x-1 hover:-translate-y-1 hover:neo-shadow transition-all cursor-pointer"
      >
        {/* Horizontal Preview */}
        <div className="w-24 h-24 bg-ivory border-2 border-black flex items-center justify-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-8 h-8 blur-xl opacity-20" style={{ backgroundColor: project.thumbnailColor }}></div>
          <span className="text-3xl font-black opacity-20 group-hover:opacity-40 transition-opacity">
            {getPreviewIcon()}
          </span>
        </div>

        {/* Metadata Columns */}
        <div className="flex-1 grid grid-cols-4 gap-4 items-center">
          <div className="col-span-1">
            <h3 className="font-black text-[13px] uppercase tracking-tighter mb-1 truncate">{project.title}</h3>
            <div className="flex gap-1.5 flex-wrap">
              {project.tags?.slice(0, 2).map(tag => (
                <span key={tag} className="text-[7px] font-black uppercase tracking-widest text-black/40 border border-black/10 px-1 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
            {project.date}
          </div>

          <div className="text-[10px] font-black text-black uppercase tracking-tighter text-center">
            {project.author}
          </div>

          <div className="flex justify-center">
            <span className={`text-[8px] px-2 py-1 font-black uppercase border-2 border-black tracking-widest ${project.status === 'draft' ? 'bg-yellow-400' : 'bg-black text-white'}`}>
              {project.status}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all px-2" onClick={(e) => e.stopPropagation()}>
           <button 
            onClick={onToggleFavorite}
            className={`p-2 border-2 border-black transition-all ${isFavorite ? 'bg-yellow-400' : 'bg-white hover:bg-yellow-200'}`}
          >
            <Star size={12} strokeWidth={3} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button className="p-2 bg-black text-white border-2 border-black hover:bg-cyan-400 hover:text-black transition-all">
            <ExternalLink size={12} strokeWidth={3}/>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div 
        className="aspect-[4/3] bg-white border-[3px] border-black rounded-none overflow-hidden relative mb-6 transition-all duration-300 hover:-translate-y-2 hover:-translate-x-1 neo-shadow hover:neo-shadow-lg"
      >
        {/* The "Thumbnail" - Pro Design Look */}
        <div 
          onClick={onClick}
          className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 rotate-12" style={{ backgroundColor: project.thumbnailColor }}></div>
          
          <div className="flex justify-between items-start relative z-10">
            <div className="flex gap-2 font-black uppercase text-[10px] tracking-[0.15em] bg-black text-white px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.3)]">
              {project.status === 'draft' && <span className="text-yellow-400">⚡</span>}
              {project.status}
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-all flex gap-3 -translate-y-2 group-hover:translate-y-0" onClick={(e) => e.stopPropagation()}>
              <button 
                onClick={onToggleFavorite}
                className={`p-2.5 border-2 border-black shadow-[2px_2px_0px_0px_black] transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px] ${isFavorite ? 'bg-yellow-400' : 'bg-white hover:bg-yellow-200'}`}
              >
                <Star size={14} strokeWidth={3} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_black] hover:bg-cyan-400 transition-all active:shadow-none active:translate-x-[1px] active:translate-y-[1px]">
                <Copy size={14} strokeWidth={3}/>
              </button>
            </div>
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center flex-1">
             <div className="text-8xl font-black opacity-10 select-none group-hover:scale-125 group-hover:opacity-30 transition-all duration-500 transform -rotate-6 group-hover:rotate-0">
                {getPreviewIcon()}
             </div>
          </div>

          <div className="flex gap-2 relative z-10 flex-wrap">
             {project.tags?.map(tag => (
                <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-black bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_black]">
                  {tag}
                </span>
             ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <div onClick={onClick} className="absolute inset-0 bg-black/0 group-hover:bg-yellow-400/10 transition-colors duration-300 flex items-center justify-center p-4">
            <div className="bg-white px-6 py-3 border-[3px] border-black neo-shadow scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 font-black uppercase text-[12px] tracking-[0.2em] flex items-center gap-3">
               Open Project <ExternalLink size={16} strokeWidth={3} />
            </div>
        </div>
      </div>

      <div className="flex justify-between items-start px-1">
        <div onClick={onClick}>
          <h3 className="font-black text-[15px] text-black leading-none group-hover:text-cyan-600 transition-colors uppercase tracking-tighter mb-1.5">
            {project.title}
          </h3>
          <div className="flex items-center gap-2.5 font-bold text-gray-500 text-[10px] uppercase tracking-wide">
            <span>{project.date}</span>
            <div className="w-1 h-1 bg-black rotate-45" />
            <span className="text-black">{project.author}</span>
          </div>
        </div>
        <button className="text-black hover:bg-black hover:text-white p-0.5 transition-all border-2 border-transparent hover:border-black">
          <MoreHorizontal size={18} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
