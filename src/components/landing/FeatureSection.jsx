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
} from "lucide-react";
import brandLogo from "../../assets/brand_logo.png";
import brandBg from "../../assets/brand_bg.png";

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div
    className={`p-8 border-4 border-black neo-shadow-sm hover:neo-shadow group transition-all ${color}`}
  >
    <div className="w-14 h-14 bg-black text-white flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
      <Icon size={32} />
    </div>
    <h3 className="font-editorial text-2xl font-bold mb-4 uppercase tracking-tight">
      {title}
    </h3>
    <p className="font-medium text-gray-800 leading-relaxed">{description}</p>
  </div>
);

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="py-20 px-6 max-w-[1440px] mx-auto"
    >
      {/* Section Header */}
      <div className="mb-10 text-center">
        <div className="inline-block bg-orange text-black px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] mb-4 border-2 border-black rotate-[-1deg]">
          System Architecture
        </div>
        <h2 className="font-editorial text-4xl md:text-7xl font-black uppercase tracking-tighter">
          Engineered for <span className="text-teal">Precision.</span>
        </h2>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 auto-rows-[280px]">
        {/* Header Block */}
        <div className="lg:col-span-8 lg:row-span-2 bg-black text-white p-12 md:p-20 flex flex-col justify-center relative overflow-hidden group border-4 border-black">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal/20 via-transparent to-orange/20 opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
          <div className="relative z-10">
            <div className="inline-block bg-orange text-black px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border-2 border-black">
              The Core Engine
            </div>
            <h2 className="font-editorial text-6xl md:text-8xl font-black leading-[0.9] mb-10 tracking-tight">
              Performance <br />
              <span className="text-teal italic">is Feature.</span>
            </h2>
            <p className="text-xl font-bold max-w-xl text-gray-400 leading-relaxed">
              KRAFT isn't just a UI tool; it's a state-driven interaction engine
              built purely on React, optimized for absolute speed.
            </p>
          </div>
          <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 border-[20px] border-white/5 rounded-full rotate-45 group-hover:scale-125 transition-transform duration-1000" />
        </div>

        {/* 60FPS Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-teal border-4 border-black p-10 flex flex-col justify-between group hover:bg-black hover:text-white transition-colors duration-500">
          <div className="flex justify-between items-start">
            <Cpu
              size={40}
              className="group-hover:rotate-90 transition-transform duration-500"
            />
            <span className="font-black text-4xl opacity-20">60</span>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase mb-2">
              State-Driven Canvas
            </h3>
            <p className="text-sm font-bold leading-tight opacity-70">
              Zero-lag drag & resize engine powered by Zustand.
            </p>
          </div>
        </div>

        {/* Typography Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-white border-4 border-black p-10 flex flex-col justify-between hover:bg-orange transition-colors">
          <div className="flex justify-between items-start">
            <Type size={40} />
            <span className="text-xs font-black border-2 border-black px-2 py-1 rotate-12 uppercase">
              v1.2
            </span>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase mb-2">
              Editorial Type
            </h3>
            <p className="text-sm font-bold leading-tight text-gray-500">
              100+ Variable fonts with CSS-level granularity.
            </p>
          </div>
        </div>

        {/* Export Card */}
        <div className="lg:col-span-4 lg:row-span-2 bg-mustard border-4 border-black p-12 flex flex-col relative group overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
            <Code size={48} className="mb-8" />
            <h3 className="text-4xl font-black uppercase leading-none mb-6">
              Design <br />
              To Code <br />
              Pipeline.
            </h3>
            <p className="text-lg font-bold mb-10 opacity-70">
              One-click absolute HTML/CSS export. Zero manual translation.
            </p>
            <div className="mt-auto pt-8 border-t-2 border-black/20 flex gap-4">
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-xs">
                JS
              </div>
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-xs">
                CSS
              </div>
              <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-black text-xs">
                HTML
              </div>
            </div>
          </div>
          <div className="absolute top-10 right-[-20px] w-40 h-40 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        {/* Snapping Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-white border-4 border-black p-10 flex items-center gap-8 group hover:bg-teal transition-colors">
          <Zap
            size={40}
            className="shrink-0 group-hover:scale-125 transition-transform"
          />
          <div>
            <h3 className="text-lg font-black uppercase">Smart Snapping</h3>
            <p className="text-xs font-bold opacity-60">
              20px predictive grid architecture.
            </p>
          </div>
        </div>

        {/* Privacy Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-black text-white p-10 flex flex-col justify-center border-4 border-black group hover:bg-white hover:text-black transition-colors">
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-orange" />
            <h3 className="text-lg font-black uppercase">Privacy Vault</h3>
          </div>
          <p className="text-xs font-bold mt-4 opacity-50 uppercase tracking-widest">
            12-Hour Auto-Purge Policy
          </p>
        </div>

        {/* Live Engine Status - Moved inside the grid to fill the blue gap */}
        <div className="lg:col-span-8 lg:row-span-1 bg-mustard border-4 border-black p-8 flex flex-wrap items-center justify-between gap-6 group hover:bg-black hover:text-white transition-all duration-500">
          <div className="flex items-center gap-4">
             <div className="w-3 h-3 bg-black rounded-full animate-ping group-hover:bg-orange" />
             <span className="font-editorial text-xl font-black uppercase italic tracking-tighter">Live Engine Status</span>
          </div>
          <div className="flex flex-wrap gap-8">
             <div className="flex flex-col">
                <span className="text-[9px] font-black opacity-40 uppercase">Global Uptime</span>
                <span className="font-black text-lg">99.9%</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black opacity-40 uppercase">Latency</span>
                <span className="font-black text-lg">0.02ms</span>
             </div>
             <div className="flex flex-col">
                <span className="text-[9px] font-black opacity-40 uppercase">Nodes</span>
                <span className="font-black text-lg">24 Active</span>
             </div>
          </div>
        </div>
      </div>

      {/* Advanced Tools Section */}
      <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
        <div className="p-20 border-4 border-black bg-white solid-shadow-sm flex flex-col gap-10">
          <div className="flex gap-8 items-start">
            <div className="p-4 bg-orange border-2 border-black neo-shadow-xs shrink-0">
              <MousePointer2 />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase mb-2">
                Sub-Pixel Precision
              </h4>
              <p className="font-bold text-gray-500 italic leading-relaxed text-sm">
                Every pixel is mathematically verified for high-DPI rendering
                perfection.
              </p>
            </div>
          </div>
          <div className="flex gap-8 items-start">
            <div className="p-4 bg-teal border-2 border-black neo-shadow-xs shrink-0">
              <Smartphone />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase mb-2">
                Artboard Engine
              </h4>
              <p className="font-bold text-gray-500 italic leading-relaxed text-sm">
                Multi-view live scaling for responsive testing across infinite
                layouts.
              </p>
            </div>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute inset-0 bg-orange border-4 border-black translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
          <div className="bg-black p-2 rounded-none border-4 border-black overflow-hidden aspect-video flex flex-col items-center justify-center relative">
            {/* Background Image instead of KRAFT text */}
            <img 
              src={brandBg} 
              alt="Brand Visual" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[2000ms]"
            />
            
            {/* Filling the white space with a new tagline */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-black/80 via-transparent to-transparent">
              <div className="flex flex-col items-center gap-6 mb-8 text-center">
                 <h4 className="font-editorial text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    Design Without <br/>
                    <span className="text-orange">Boundaries.</span>
                 </h4>
                 <div className="bg-teal text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-black">
                    Engineered for Creators
                 </div>
              </div>

              {/* Rotating Logo from Gemini */}
              <img 
                src={brandLogo} 
                className="w-20 h-20 border-4 border-black animate-spin-slow hover:animate-spin shadow-2xl"
                alt="Kraft Logo"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
