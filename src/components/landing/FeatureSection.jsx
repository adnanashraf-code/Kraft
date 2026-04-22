import React from 'react';
import { Layers, Type, Code, Zap, Shield, Cpu, MousePointer2, Smartphone } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className={`p-8 border-4 border-black neo-shadow-sm hover:neo-shadow group transition-all ${color}`}>
    <div className="w-14 h-14 bg-black text-white flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
      <Icon size={32} />
    </div>
    <h3 className="font-editorial text-2xl font-bold mb-4 uppercase tracking-tight">{title}</h3>
    <p className="font-medium text-gray-800 leading-relaxed">{description}</p>
  </div>
);

const FeatureSection = () => {
  return (
    <section id="features" className="py-40 px-6 max-w-[1440px] mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-6 auto-rows-[240px]">
        
        {/* Header Block */}
        <div className="lg:col-span-8 lg:row-span-2 bg-black text-white p-12 md:p-20 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-teal/20 via-transparent to-orange/20 opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
          <div className="relative z-10">
            <div className="inline-block bg-orange text-black px-4 py-1 font-black text-xs uppercase tracking-[0.3em] mb-8 border-2 border-black rotate-[-1deg]">
              The Core Engine
            </div>
            <h2 className="font-editorial text-6xl md:text-9xl font-black leading-[0.8] mb-10 tracking-tighter">
              Performance <br />
              <span className="text-teal italic">is Feature.</span>
            </h2>
            <p className="text-2xl font-bold max-w-xl text-gray-400 leading-relaxed">
              KRAFT isn't just a UI tool; it's a state-driven interaction engine built purely on React, 
              optimized for absolute speed and mathematical precision.
            </p>
          </div>
          {/* Abstract geometric decoration */}
          <div className="absolute bottom-[-10%] right-[-5%] w-64 h-64 border-[20px] border-white/5 rounded-full rotate-45 group-hover:scale-125 transition-transform duration-1000" />
        </div>

        {/* 60FPS Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-teal border-4 border-black p-8 flex flex-col justify-between group hover:bg-black hover:text-white transition-colors duration-500">
          <div className="flex justify-between items-start">
            <Cpu size={40} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-black text-4xl opacity-20">60</span>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase mb-2">State-Driven Canvas</h3>
            <p className="text-sm font-bold leading-tight opacity-70">Zero-lag drag & resize engine powered by Zustand.</p>
          </div>
        </div>

        {/* Typography Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-white border-4 border-black p-8 flex flex-col justify-between hover:bg-orange transition-colors">
          <div className="flex justify-between items-start">
            <Type size={40} />
            <span className="text-xs font-black border-2 border-black px-2 py-1 rotate-12">TYPE v1.2</span>
          </div>
          <div>
            <h3 className="text-xl font-black uppercase mb-2">Editorial Type</h3>
            <p className="text-sm font-bold leading-tight text-gray-500">100+ Variable fonts with CSS-level granularity.</p>
          </div>
        </div>

        {/* Export Card */}
        <div className="lg:col-span-4 lg:row-span-2 bg-mustard border-4 border-black p-10 flex flex-col relative group overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
            <Code size={48} className="mb-8" />
            <h3 className="text-4xl font-black uppercase leading-none mb-6">Design <br/>To Code <br/>Pipeline.</h3>
            <p className="text-lg font-bold mb-10 opacity-70">One-click absolute HTML/CSS export. Zero manual translation needed.</p>
            <div className="mt-auto pt-6 border-t-2 border-black/20 flex gap-4">
               <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">JS</div>
               <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">CSS</div>
               <div className="w-12 h-12 bg-black flex items-center justify-center text-white font-bold">HTML</div>
            </div>
          </div>
          <div className="absolute top-10 right-[-20px] w-40 h-40 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
        </div>

        {/* Snapping Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-ivory border-4 border-black p-8 flex items-center gap-6 group hover:bg-teal transition-colors">
          <Zap size={40} className="shrink-0 group-hover:scale-125 transition-transform" />
          <div>
            <h3 className="text-lg font-black uppercase">Smart Snapping</h3>
            <p className="text-xs font-bold opacity-60">20px predictive grid architecture.</p>
          </div>
        </div>

        {/* Privacy Card */}
        <div className="lg:col-span-4 lg:row-span-1 bg-black text-white p-8 flex flex-col justify-center border-4 border-black group hover:bg-white hover:text-black transition-colors">
          <div className="flex items-center gap-4">
            <Shield size={32} className="text-orange" />
            <h3 className="text-lg font-black uppercase">Privacy Vault</h3>
          </div>
          <p className="text-xs font-bold mt-4 opacity-50">12-hour auto-purge policy for all session assets.</p>
        </div>

      </div>

      {/* Advanced Tools Section */}
      <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
         <div className="p-12 border-4 border-black bg-white solid-shadow-sm flex flex-col gap-10">
            <div className="flex gap-8 items-start">
               <div className="p-4 bg-orange border-2 border-black neo-shadow-xs shrink-0"><MousePointer2 /></div>
               <div>
                  <h4 className="text-2xl font-black uppercase mb-2">Sub-Pixel Precision</h4>
                  <p className="font-bold text-gray-500 italic">Every pixel is mathematically verified for high-DPI rendering perfection.</p>
               </div>
            </div>
            <div className="flex gap-8 items-start">
               <div className="p-4 bg-teal border-2 border-black neo-shadow-xs shrink-0"><Smartphone /></div>
               <div>
                  <h4 className="text-2xl font-black uppercase mb-2">Artboard Engine</h4>
                  <p className="font-bold text-gray-500 italic">Multi-view live scaling for responsive testing across infinite layouts.</p>
               </div>
            </div>
         </div>
         <div className="relative group">
            <div className="absolute inset-0 bg-orange border-4 border-black translate-x-4 translate-y-4 -z-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform" />
            <div className="bg-black p-1 rounded-none border-4 border-black overflow-hidden aspect-video flex items-center justify-center">
                <span className="font-editorial text-[180px] font-black text-white/5 tracking-tighter select-none group-hover:scale-110 transition-transform duration-1000">KRAFT</span>
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 border-4 border-orange animate-spin rounded-none border-t-transparent" />
                </div>
            </div>
         </div>
      </div>
    </section>
  );
};

export default FeatureSection;
