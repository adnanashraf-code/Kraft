import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Zap, Target, MousePointer2, Code } from "lucide-react";
import Button from "../../components/common/Button";
import Footer from "../../components/layout/Footer";

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
      title: "The Philosophy",
      icon: Target,
      color: "text-teal",
      content: "We believe that structure is power. KRAFT is different because it gives you absolute control over every node and path without the overhead of templates. Our philosophy is rooted in Digital Brutalism—prioritizing raw performance, bold aesthetics, and pixel-perfect precision over decorative fluff."
    },
    {
      title: "Why KRAFT?",
      icon: Zap,
      color: "text-mustard",
      content: "Most design tools are 'drawing' tools. KRAFT is an 'engineering' tool for designers. It offers sub-pixel rendering, a predictive grid architecture, and a direct design-to-code pipeline that eliminates the translation gap between mockup and production."
    },
    {
      title: "How to Use",
      icon: MousePointer2,
      color: "text-coral",
      content: "1. Initialize: Launch the studio and set your canvas dimensions. 2. Compose: Use the vector-first toolbar to build your layout. 3. Sync: Connect to the Cloud Hub for instant asset deployment. 4. Export: One-click absolute CSS/HTML export for any framework."
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

      <Footer />
    </div>
  );
};

export default Docs;
