import React from "react";
import {
  Layers,
  Type,
  Code,
  Zap,
  Shield,
  Cpu,
  MousePointer2,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import brandLogo from "../../assets/brand_logo.png";
import brandBg from "../../assets/brand_bg.png";
import { useNavigate } from "react-router-dom";

const FeatureSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="features"
      className="min-h-screen flex items-center py-24 px-6 bg-ivory overflow-hidden relative border-b-4 border-black"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:30px_30px]" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        {/* Section Header */}
        <div className="mb-12 flex justify-between items-end border-b-4 border-black pb-8">
          <div className="reveal-text">
            <div className="inline-block bg-orange text-black px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border-2 border-black rotate-[-1deg]">
              System Architecture
            </div>
            <h2 className="font-editorial text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Engineered for <span className="text-teal italic">Precision.</span>
            </h2>
          </div>
          <div className="hidden lg:block text-right opacity-40 font-black text-xs uppercase tracking-widest">
            Module_04 // Feature_Set_v2.0 <br />
            Absolute_Structural_Control
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid lg:grid-cols-12 lg:grid-rows-6 gap-4 h-full min-h-[800px] lg:h-[900px]">
          
          {/* 1. Main Core Engine (Large) */}
          <div className="lg:col-span-6 lg:row-span-4 bg-black text-white p-12 flex flex-col justify-center relative overflow-hidden group border-4 border-black solid-shadow-lg animate-slide-up">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal/20 via-transparent to-orange/20 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="inline-block bg-orange text-black px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border-2 border-black">
                The Core Engine
              </div>
              <h2 className="font-editorial text-5xl md:text-7xl font-black leading-[0.9] mb-8 tracking-tight">
                Performance <br />
                <span className="text-teal italic text-6xl md:text-8xl">is Feature.</span>
              </h2>
              <p className="text-lg font-bold max-w-md text-gray-400 leading-tight mb-10">
                KRAFT isn't just a UI tool; it's a state-driven interaction engine
                built purely on React, optimized for absolute speed.
              </p>
              <div 
                className="flex items-center gap-4 text-orange text-xs font-black uppercase tracking-widest cursor-pointer group/link hover:text-white transition-colors"
                onClick={() => navigate('/docs')}
              >
                <span>View Documentation</span>
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 border-[20px] border-white/5 rounded-full rotate-45 group-hover:scale-125 transition-transform duration-300" />
          </div>

          {/* 2. Design To Code (Vertical) */}
          <div className="lg:col-span-3 lg:row-span-4 bg-mustard border-4 border-black p-10 flex flex-col relative group overflow-hidden solid-shadow-lg animate-slide-up delay-100">
            <div className="relative z-10 flex flex-col h-full">
              <Code size={40} className="mb-8 group-hover:scale-125 transition-transform" />
              <h3 className="text-3xl font-black uppercase leading-none mb-6">
                Design <br />
                To Code <br />
                Pipeline.
              </h3>
              <p className="text-sm font-bold opacity-70 mb-8 leading-tight">
                One-click absolute HTML/CSS export. Zero manual translation.
              </p>
              <div className="mt-auto grid grid-cols-2 gap-2">
                {['JS', 'CSS', 'HTML', 'TS'].map(lang => (
                  <div key={lang} className="h-12 bg-black flex items-center justify-center text-white font-black text-xs hover:bg-white hover:text-black transition-colors cursor-default border-2 border-black">
                    {lang}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-10 right-[-20px] w-40 h-40 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          </div>

          {/* 3. Editorial Type (Small) */}
          <div className="lg:col-span-3 lg:row-span-2 bg-white border-4 border-black p-8 flex flex-col justify-between hover:bg-orange transition-colors duration-300 solid-shadow-sm animate-slide-up delay-75 group">
            <div className="flex justify-between items-start">
              <Type size={32} className="group-hover:rotate-12 transition-transform" />
              <span className="text-[9px] font-black border-2 border-black px-2 py-1 rotate-12 uppercase">v1.2</span>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase mb-1">Editorial Type</h3>
              <p className="text-[11px] font-bold leading-tight text-gray-500">100+ Variable fonts with CSS-level granularity.</p>
            </div>
          </div>

          {/* 4. State Canvas (Small) */}
          <div className="lg:col-span-3 lg:row-span-2 bg-teal border-4 border-black p-8 flex flex-col justify-between group hover:bg-black hover:text-white transition-colors duration-300 solid-shadow-sm animate-slide-up delay-100">
            <div className="flex justify-between items-start">
              <Cpu size={32} className="group-hover:rotate-90 transition-transform duration-500" />
              <span className="font-black text-3xl opacity-20">60</span>
            </div>
            <div>
              <h3 className="text-lg font-black uppercase mb-1">State Canvas</h3>
              <p className="text-[11px] font-bold leading-tight opacity-70">Zero-lag drag & resize powered by Zustand.</p>
            </div>
          </div>

          {/* 5. Live Engine Status (Long Bottom) */}
          <div className="lg:col-span-6 lg:row-span-2 bg-mustard border-4 border-black p-8 flex flex-col justify-between group hover:bg-black hover:text-white transition-all duration-300 solid-shadow-lg animate-slide-up delay-150">
            <div className="flex items-center gap-4">
               <div className="w-3 h-3 bg-black rounded-full animate-ping group-hover:bg-orange" />
               <span className="font-editorial text-xl font-black uppercase italic tracking-tighter">Live Engine Status</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-t-2 border-black/10 pt-6 mt-4">
               <div className="flex flex-col">
                  <span className="text-[8px] font-black opacity-40 uppercase">Global Uptime</span>
                  <span className="font-black text-lg">99.9%</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[8px] font-black opacity-40 uppercase">Latency</span>
                  <span className="font-black text-lg">0.02ms</span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[8px] font-black opacity-40 uppercase">Active Nodes</span>
                  <span className="font-black text-lg">24 Unit</span>
               </div>
            </div>
          </div>

          {/* 6. Advanced Controls (Integrated) */}
          <div className="lg:col-span-3 lg:row-span-2 bg-white border-4 border-black p-8 flex flex-col justify-center gap-6 solid-shadow-sm animate-slide-up delay-500">
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-orange border-2 border-black neo-shadow-xs">
                <MousePointer2 size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase">Sub-Pixel</h4>
                <p className="text-[9px] font-bold text-gray-500 italic leading-none">High-DPI Rendering</p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <div className="p-2 bg-teal border-2 border-black neo-shadow-xs">
                <Smartphone size={18} />
              </div>
              <div>
                <h4 className="text-xs font-black uppercase">Artboard</h4>
                <p className="text-[9px] font-bold text-gray-500 italic leading-none">Live Responsive scaling</p>
              </div>
            </div>
          </div>

          {/* 7. Brand Visual Block (Integrated) */}
          <div className="lg:col-span-3 lg:row-span-2 bg-black border-4 border-black relative overflow-hidden group solid-shadow-lg animate-slide-up delay-600">
            <img 
              src={brandBg} 
              alt="Brand Visual" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2000ms]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <img 
                src={brandLogo} 
                className="w-16 h-16 border-2 border-white/20 animate-spin-slow group-hover:animate-spin"
                alt="Kraft Logo"
              />
            </div>
            <div className="absolute bottom-4 left-4 bg-teal text-black px-2 py-0.5 text-[8px] font-black uppercase border-2 border-black">
              System_v2
            </div>
          </div>

          {/* 8. Snapping & Privacy (Small Tiles) */}
          <div className="lg:col-span-3 lg:row-span-1 bg-white border-4 border-black p-4 flex items-center gap-4 group hover:bg-orange transition-colors animate-slide-up delay-700">
            <Zap size={24} className="group-hover:scale-125 transition-transform" />
            <h3 className="text-xs font-black uppercase">Smart Snapping</h3>
          </div>
          
          <div 
            className="lg:col-span-3 lg:row-span-1 bg-black text-white border-4 border-black p-4 flex items-center gap-4 group hover:bg-white hover:text-black transition-colors animate-slide-up delay-200 cursor-pointer"
            onClick={() => navigate('/privacy')}
          >
            <Shield size={24} className="text-orange" />
            <h3 className="text-xs font-black uppercase">Privacy Vault</h3>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
