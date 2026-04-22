import React from "react";
import {
  Database,
  ShieldCheck,
  Zap,
  Type,
  Layout,
  Hexagon,
  Circle,
  Square,
  Star,
  Smile,
  ArrowRight,
  Cloud,
  Sparkles,
  Bot,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const GoogleCloudLogo = ({ size = 120, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z" 
      fill={color} 
    />
  </svg>
);

const AssetBadge = ({ icon: Icon, label }) => (
  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-3 hover:bg-orange hover:text-black hover:border-black transition-all group cursor-default">
    <Icon size={18} className="group-hover:scale-125 transition-transform" />
    <span className="text-[10px] font-black uppercase tracking-widest">
      {label}
    </span>
  </div>
);

const CloudHubSection = () => {
  const navigate = useNavigate();
  return (
    <section
      id="cloudhub"
      className="min-h-screen flex items-center py-20 px-6 bg-[#080808] text-white overflow-hidden relative border-b-4 border-black"
    >
      {/* Background Tech Grids & Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:40px_40px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Left */}
          <div className="reveal-text">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1 mb-8">
              <div className="w-2 h-2 bg-orange animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">
                Resource Engine v2.0
              </span>
            </div>

            <h2 className="font-editorial text-6xl md:text-[7rem] font-black leading-[0.8] tracking-tighter mb-8">
              THE <br />
              <span className="text-orange italic">CLOUD VAULT.</span>
            </h2>

            <p className="text-lg font-bold text-gray-400 max-w-md leading-tight mb-12 uppercase tracking-wide">
              A high-performance repository of design fuel. Every asset is
              synced, verified, and ready for deployment.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-12 max-w-sm">
              {[
                { label: "Icons", count: "10000+", color: "text-orange" },
                { label: "Fonts", count: "120+", color: "text-teal" },
                { label: "Logos", count: "3000+", color: "text-mustard" },
                { label: "Sync", count: "0.2ms", color: "text-white" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 border border-white/10 p-4 hover:border-white/30 transition-colors"
                >
                  <div className={`text-3xl font-black ${stat.color}`}>
                    {stat.count}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-widest opacity-40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="editorial"
              onClick={() =>
                navigate("/dashboard", { state: { activeTab: "shared" } })
              }
              className="group relative overflow-hidden bg-black text-white py-5 px-10 text-lg"
            >
              <span className="relative z-10 flex items-center gap-3 font-black">
                ACCESS REPOSITORY{" "}
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </div>

          {/* Visual Right (The "Cyber Cluster") */}
          <div className="relative h-[600px] flex items-center justify-center">
            {/* Main Core */}
            <div className="w-48 h-48 bg-black border-4 border-orange relative z-20 flex items-center justify-center solid-shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500 group">
              <Database
                size={64}
                className="text-orange group-hover:scale-110 transition-transform"
              />
              <div className="absolute -top-4 -right-4 bg-teal text-black px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                Active Sync
              </div>
            </div>

            {/* Floating Assets */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-24 right-32 bg-[#0c0c0c]/80 backdrop-blur-sm text-white p-3 border-2 border-white/10 rotate-12 animate-float flex flex-col items-center">
                <Bot size={24} className="text-orange" />
                <div className="mt-1 text-[7px] font-black uppercase text-center opacity-60">AI Core</div>
              </div>
              <div className="absolute bottom-20 left-10 bg-[#1a1a1a] border-2 border-white/20 p-6 -rotate-6 animate-bounce-slow">
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-3 h-3 bg-orange" />
                  <div className="w-3 h-3 bg-teal" />
                  <div className="w-3 h-3 bg-mustard" />
                  <div className="w-3 h-3 bg-white" />
                </div>
              </div>
              <div className="absolute top-1/4 left-0 text-orange/20 font-black text-8xl -rotate-90 select-none tracking-tighter">
                VAULT
              </div>
              <ShieldCheck
                className="absolute top-1/3 right-12 text-teal/40 animate-pulse"
                size={80}
              />
              <Zap
                className="absolute bottom-1/4 right-1/4 text-mustard/40"
                size={120}
              />
              
              {/* Added Cloud Icon (Google Cloud Shape in Solid White) */}
              <div className="absolute top-16 left-32 animate-float">
                <GoogleCloudLogo size={70} color="white" />
              </div>

              {/* Added AI Logos */}
              <div className="absolute bottom-20 right-20 bg-orange/10 border border-orange/20 p-3 rounded-full animate-bounce-slow">
                <Sparkles size={24} className="text-orange" />
                <div className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange"></span>
                </div>
              </div>

              <div className="absolute top-1/2 left-10 text-teal/20 animate-reverse-spin-slow">
                <Sparkles size={60} strokeWidth={1} />
              </div>


            </div>

            {/* Orbital Rings */}
            <div className="absolute w-[500px] h-[500px] border border-white/5 rounded-full animate-spin-slow" />
            <div className="absolute w-[400px] h-[400px] border border-white/10 rounded-full animate-reverse-spin" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CloudHubSection;
