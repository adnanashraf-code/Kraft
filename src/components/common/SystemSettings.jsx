import React, { useState } from 'react';
import { X, Shield, Cpu, Zap, Activity, Monitor } from 'lucide-react';

const SystemSettings = ({ isOpen, onClose }) => {
  const [hwAccel, setHwAccel] = useState(true);
  const [highFid, setHighFid] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-ivory border-4 border-black w-full max-w-lg relative overflow-hidden solid-shadow-lg animate-slide-up">
        {/* Header */}
        <div className="bg-teal border-b-4 border-black p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Cpu size={24} />
            <h2 className="font-editorial text-3xl font-bold text-black uppercase tracking-tighter">System_BIOS v2.0</h2>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform p-1">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Performance Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
               <Activity size={14} /> Core Performance
            </h3>
            <div className="grid grid-cols-1 gap-4">
               <div className="flex items-center justify-between p-4 bg-white border-2 border-black neo-shadow-xs">
                  <div>
                    <p className="font-black text-sm uppercase">Hardware Acceleration</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase italic">GPU-Driven Canvas Rendering</p>
                  </div>
                  <button 
                    onClick={() => setHwAccel(!hwAccel)}
                    className={`w-12 h-6 border-2 border-black rounded-full relative p-1 transition-colors ${hwAccel ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                     <div className={`w-3 h-3 bg-white rounded-full absolute transition-all ${hwAccel ? 'right-1' : 'left-1'}`} />
                  </button>
               </div>
               <div className="flex items-center justify-between p-4 bg-white border-2 border-black neo-shadow-xs">
                  <div>
                    <p className="font-black text-sm uppercase">High-Fidelity Animations</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase italic">60FPS Transition Pipeline</p>
                  </div>
                  <button 
                    onClick={() => setHighFid(!highFid)}
                    className={`w-12 h-6 border-2 border-black rounded-full relative p-1 transition-colors ${highFid ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                     <div className={`w-3 h-3 bg-white rounded-full absolute transition-all ${highFid ? 'right-1' : 'left-1'}`} />
                  </button>
               </div>
            </div>
          </div>

          {/* Security Section */}
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 flex items-center gap-2">
               <Shield size={14} /> Security Protocol
            </h3>
            <div className="p-4 bg-black text-white border-2 border-black space-y-2">
               <div className="flex justify-between items-center text-[10px] font-black uppercase italic opacity-60">
                  <span>Encryption State</span>
                  <span>AES-256_ACTIVE</span>
               </div>
               <div className="w-full h-1 bg-gray-800">
                  <div className="w-full h-full bg-teal animate-pulse" />
               </div>
               <p className="text-[11px] font-bold">Local storage vault is encrypted. All session data is purged after 12 hours of inactivity.</p>
            </div>
          </div>

          {/* System Footer */}
          <div className="pt-4 flex justify-between items-center border-t-2 border-black/10">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Nodes_Connected: 24</span>
             </div>
             <button 
                onClick={onClose}
                className="bg-orange border-2 border-black px-6 py-2 font-black uppercase text-xs neo-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-lg transition-all"
             >
                Close BIOS
             </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-2 right-12 text-[8px] font-black opacity-10 rotate-90">KRAFT_SYSTEM_v2.0</div>
      </div>
    </div>
  );
};

export default SystemSettings;
