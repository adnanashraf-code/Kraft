import React from "react";
import { useNavigate } from "react-router-dom";
import { Zap, Command, Shield, ArrowRight } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="border-t-4 border-black bg-white py-10 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Block */}
          <div className="lg:col-span-4">
            <div 
              className="flex items-center gap-3 mb-8 cursor-pointer group" 
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
            >
              <div className="w-10 h-10 bg-black flex items-center justify-center neo-shadow-sm group-hover:rotate-12 transition-transform">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <span className="font-editorial font-black text-3xl tracking-tighter">KRAFT.</span>
            </div>
            <p className="text-gray-500 font-bold max-w-xs leading-relaxed uppercase text-xs tracking-widest">
              A premium, state-driven interaction engine built for creators who demand absolute structural control.
            </p>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12 lg:pl-12">
            <div className="flex flex-col gap-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-orange mb-2">Navigation</h4>
              {['Features', 'Cloud Hub', 'Manifesto'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '')}`} 
                  className="text-black font-black uppercase text-sm hover:text-orange transition-colors w-fit border-b-2 border-transparent hover:border-orange"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-teal mb-2">Ecosystem</h4>
              <button 
                onClick={() => navigate('/docs')} 
                className="text-black font-black uppercase text-sm hover:text-teal transition-colors text-left w-fit border-b-2 border-transparent hover:border-teal"
              >
                Documentation
              </button>
              <button 
                onClick={() => navigate('/privacy')} 
                className="text-black font-black uppercase text-sm hover:text-teal transition-colors text-left w-fit border-b-2 border-transparent hover:border-teal"
              >
                Privacy Policy
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-mustard mb-2">Protocol</h4>
              <div className="flex items-center gap-3 text-xs font-black text-black">
                 <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                 CORE_ONLINE_V2.0
              </div>
              <div className="text-[10px] font-bold text-gray-500 mt-2 leading-relaxed">
                LATENCY: 0.02ms <br />
                ENCRYPTION: 256-BIT AES <br />
                NODES: 24_ACTIVE
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t-2 border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex flex-wrap gap-4">
            <span>© 2026 KRAFT DESIGN PLATFORM // ALL RIGHTS RESERVED.</span>
            <div className="flex gap-4 border-l border-black/10 pl-4">
              <button onClick={() => navigate('/docs')} className="text-black hover:text-orange transition-colors">Documentation</button>
              <button onClick={() => navigate('/privacy')} className="text-black hover:text-orange transition-colors">Privacy Policy</button>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-20">No generic templates allowed.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
