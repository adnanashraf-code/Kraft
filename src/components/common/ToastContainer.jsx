import React from 'react';
import useEditorStore from '../../store/useEditorStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const notifications = useEditorStore(state => state.notifications);

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-10 right-10 z-[1000] flex flex-col gap-4 pointer-events-none">
      {notifications.map((n) => (
        <div 
          key={n.id}
          className={`
            pointer-events-auto flex items-center gap-4 px-6 py-4 rounded-2xl border-[3px] border-black neo-shadow-sm animate-in slide-in-from-right-10 duration-500
            ${n.type === 'success' ? 'bg-[#c1ff72]' : n.type === 'error' ? 'bg-[#ff7272]' : 'bg-[#72d7ff]'}
          `}
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/10">
            {n.type === 'success' && <CheckCircle size={18} className="text-black" strokeWidth={3} />}
            {n.type === 'error' && <AlertCircle size={18} className="text-black" strokeWidth={3} />}
            {n.type === 'info' && <Info size={18} className="text-black" strokeWidth={3} />}
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-0.5">Notification</span>
            <span className="text-[13px] font-black uppercase tracking-tight text-black">{n.message}</span>
          </div>

          <div className="ml-4 w-px h-8 bg-black/10" />
          <button className="text-black/30 hover:text-black transition-colors">
            <X size={14} strokeWidth={3} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
