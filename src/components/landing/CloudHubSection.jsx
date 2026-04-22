import React from 'react';
import { Database, ShieldCheck, Zap, Type, Layout, Hexagon, Circle, Square, Star, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';

const AssetBadge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 hover:bg-orange hover:text-black hover:border-black transition-all group cursor-default">
    <Icon size={18} className="group-hover:scale-125 transition-transform" />
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

const CloudHubSection = () => {
  const navigate = useNavigate();
  return (
    <section id="cloudhub" className="py-40 px-6 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/10 rounded-full blur-[120px] -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal/10 rounded-full blur-[120px] translate-y-1/2" />

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          
          {/* Content Left */}
          <div>
            <div className="inline-block bg-orange text-black px-5 py-2 font-black text-xs uppercase tracking-[0.3em] mb-10 border-2 border-orange">
              Pro Resource Engine
            </div>
            <h2 className="font-editorial text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-10">
              The Kraft <br />
              <span className="text-teal">Cloud Hub.</span>
            </h2>
            <p className="text-2xl font-bold text-gray-500 leading-relaxed mb-12 max-w-xl">
              Access a massive, state-synced repository of professional assets. 
              Built for high-fidelity design at scale.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="space-y-2">
                <div className="text-5xl font-black text-orange">500+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Vector Icons</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-teal">100+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Premium Fonts</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-mustard">50+</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Brand Logos</div>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-white">12H</div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Auto-Purge Security</div>
              </div>
            </div>

            <Button 
              variant="editorial" 
              onClick={() => navigate('/dashboard', { state: { activeTab: 'shared' } })}
              className="bg-orange text-black py-6 px-12 text-xl hover:bg-white hover:text-black transition-all"
            >
              EXPLORE THE VAULT
            </Button>
          </div>

          {/* Visual Right (The Vault) */}
          <div className="relative">
            <div className="bg-white/5 border-4 border-white/10 p-12 aspect-square relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange/20 via-transparent to-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="grid grid-cols-3 gap-6">
                {/* Simulated Asset Grid */}
                <AssetBadge icon={Hexagon} label="Hex Grid" />
                <AssetBadge icon={Type} label="Clash Display" />
                <AssetBadge icon={Layout} label="Wireframes" />
                <AssetBadge icon={Star} label="Premium UI" />
                <AssetBadge icon={Zap} label="SVG Engine" />
                <AssetBadge icon={ShieldCheck} label="Secured" />
                <AssetBadge icon={Database} label="Sync" />
                <AssetBadge icon={Circle} label="Shapes" />
                <AssetBadge icon={Smile} label="Icons" />
              </div>

              {/* Floating Centerpiece */}
              <div className="mt-12 p-8 border-4 border-black bg-white text-black solid-shadow-lg rotate-[-3deg] group-hover:rotate-0 transition-transform duration-700">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-2xl">K</div>
                  <div>
                    <h4 className="font-black uppercase text-sm tracking-tight">Cloud Sync Active</h4>
                    <p className="text-[10px] font-bold opacity-40 uppercase">Session: Kraft_Studio_01</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-black/10 rounded-full overflow-hidden">
                   <div className="h-full bg-teal w-3/4 animate-pulse" />
                </div>
              </div>

              {/* Floating Icons */}
              <Square className="absolute top-10 right-10 text-orange opacity-20 animate-bounce" size={40} />
              <Hexagon className="absolute bottom-10 left-10 text-teal opacity-20 animate-spin-slow" size={60} />
            </div>
            
            {/* Background shadow element */}
            <div className="absolute inset-0 border-4 border-teal/20 translate-x-6 translate-y-6 -z-10" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CloudHubSection;
