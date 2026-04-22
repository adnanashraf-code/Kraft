import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Lock, Trash2, EyeOff } from "lucide-react";

const Privacy = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policies = [
    {
      title: "Data Sovereignty",
      icon: ShieldCheck,
      content: "Your designs are yours. KRAFT does not claim ownership, sell user data, or use your creative work to train proprietary AI models. Every node you place belongs exclusively to your local session or secure vault."
    },
    {
      title: "12-Hour Purge Protocol",
      icon: Trash2,
      content: "Our system is built on a radical privacy engine. All ephemeral session data is automatically purged from our edge nodes every 12 hours. We don't believe in digital hoarding."
    },
    {
      title: "Zero Tracker Policy",
      icon: EyeOff,
      content: "KRAFT uses zero third-party tracking cookies or invasive analytics. We only monitor system health and core engine performance—never your personal behavior or design intent."
    },
    {
      title: "End-to-End Encryption",
      icon: Lock,
      content: "Assets stored in the Cloud Vault are encrypted using 256-bit AES standards. Only your verified session ID can decrypt and access your repository fuel."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-teal selection:text-black">
      {/* Header */}
      <nav className="w-full border-b-4 border-white/10 bg-black sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-black uppercase text-xs tracking-widest hover:text-teal transition-colors group text-white"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Exit Protocol
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-teal rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60 text-white">Privacy_Policy_v2.0</span>
          </div>
        </div>
      </nav>

      <main className="max-w-[1000px] mx-auto px-6 py-24">
        <div className="reveal-text mb-20">
          <div className="inline-block bg-teal text-black px-4 py-1 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border-2 border-white/20">
            Security Clearance
          </div>
          <h1 className="font-editorial text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            Privacy <br />
            <span className="text-teal italic">Protocol.</span>
          </h1>
          <p className="text-xl font-bold text-gray-500 max-w-2xl leading-tight uppercase tracking-widest">
            Rules of interaction within the KRAFT ecosystem. We protect your creativity with absolute digital silence.
          </p>
        </div>

        <div className="grid gap-8">
          {policies.map((policy, idx) => (
            <div 
              key={policy.title} 
              className="group border-2 border-white/20 p-10 bg-[#111] backdrop-blur-sm hover:border-teal/60 hover:solid-shadow-teal transition-all animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-8">
                <div className="p-4 bg-teal text-black neo-shadow-sm shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-[0_0_15px_rgba(45,212,191,0.3)]">
                  <policy.icon size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white group-hover:text-teal transition-colors">{policy.title}</h2>
                  <p className="text-lg font-bold leading-relaxed text-gray-400">
                    {policy.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 border-4 border-teal/20 bg-teal/5 text-center">
          <p className="text-xs font-black uppercase tracking-[0.5em] text-teal animate-pulse">
            // END_OF_TRANSMISSION //
          </p>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
