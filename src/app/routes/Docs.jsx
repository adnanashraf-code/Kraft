import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Zap, Target, MousePointer2, Code } from "lucide-react";
import Button from "../../components/common/Button";

const Docs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: "What is KRAFT?",
      icon: BookOpen,
      color: "text-orange",
      content: "KRAFT is a high-performance, browser-based visual editor designed for creators who refuse to compromise on structural integrity. Unlike traditional drag-and-drop tools that produce bloated code, KRAFT is built on a clean state-driven architecture that treats design as live logic."
    },
    {
      title: "The Architecture",
      icon: Code,
      color: "text-teal",
      content: "Built on a custom React/Zustand core, KRAFT utilizes a Virtual Layering System. This allows for zero-lag interactions even with thousands of nodes. Every change you make is mapped to a state tree, ensuring that what you see is mathematically identical to the exported production code."
    },
    {
      title: "The Asset Vault",
      icon: Zap,
      color: "text-mustard",
      content: "Our Cloud Hub isn't just storage—it's a synchronized fuel cell. It houses 10k+ vector icons, 120+ variable font families, and 3k+ brand logos. All assets are served via a global edge network with <0.2ms retrieval latency."
    },
    {
      title: "Pro Shortcuts",
      icon: Target,
      color: "text-coral",
      content: "Speed is a core value. Use [CTRL + G] for snapping toggle, [SHIFT + R] for instant responsive preview, and [CMD + E] for direct code export. KRAFT is designed for keyboard-first efficiency to keep you in the creative flow."
    },
    {
      title: "Design To Code",
      icon: MousePointer2,
      color: "text-orange",
      content: "We've eliminated the handoff. KRAFT's compiler translates your visual layers into optimized HTML/CSS or React components. The export is clean, semantic, and production-ready. No manual translation required."
    }
  ];

  return (
    <div className="min-h-screen bg-ivory text-black font-sans selection:bg-orange selection:text-black">
      {/* Header */}
      <nav className="w-full border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-black uppercase text-xs tracking-widest hover:text-orange transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest">Documentation_v1.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 py-24">
        <div className="reveal-text mb-20">
          <h1 className="font-editorial text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            The <span className="text-orange italic">Handbook.</span>
          </h1>
          <p className="text-xl font-bold text-gray-500 max-w-2xl leading-relaxed uppercase tracking-wide">
            Master the KRAFT engine. Learn how to build without boundaries using absolute structural control.
          </p>
        </div>

        <div className="grid gap-12">
          {sections.map((section, idx) => (
            <div 
              key={section.title} 
              className="group border-4 border-black p-10 bg-white solid-shadow-sm hover:solid-shadow transition-all animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-8">
                <div className={`p-4 bg-black ${section.color} neo-shadow-xs shrink-0 group-hover:rotate-6 transition-transform`}>
                  <section.icon size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{section.title}</h2>
                  <p className="text-lg font-bold leading-relaxed text-gray-700 italic">
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-black text-white border-4 border-black text-center relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-4xl font-black uppercase tracking-tighter mb-6">Ready to break the grid?</h3>
            <Button variant="editorial" onClick={() => navigate('/editor')} className="bg-orange text-black">Launch Studio Now</Button>
          </div>
          <Code className="absolute top-[-20%] right-[-10%] text-white/5 rotate-12" size={300} />
        </div>
      </main>
    </div>
  );
};

export default Docs;
