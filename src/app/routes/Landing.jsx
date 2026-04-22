import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Settings2, Menu, X as CloseIcon, Zap, Command, MousePointer2 } from 'lucide-react';
import Button from '../../components/common/Button';
import IdentityModal from '../../components/common/IdentityModal';
import SystemSettings from '../../components/common/SystemSettings';
import FeatureSection from '../../components/landing/FeatureSection';
import CloudHubSection from '../../components/landing/CloudHubSection';
import Footer from '../../components/layout/Footer';

const InteractiveDots = () => {
  const canvasRef = React.useRef(null);
  const mouse = React.useRef({ x: -1000, y: -1000 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener('resize', handleResize);
    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const isMobile = window.innerWidth < 768;
    const dotCount = isMobile ? 40 : 100;

    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 3 + 2,
    }));

    // Lifecycle Logic: Spawn every 1s, Delete every 2s
    const spawnInterval = setInterval(() => {
      if (dots.length < 250) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 3 + 2,
        });
      }
    }, 1000);

    const deleteInterval = setInterval(() => {
      if (dots.length > 50) {
        dots.shift(); // Remove the oldest dot
      }
    }, 2000);

    const drawLine = (p1, p2, dist, maxDist) => {
      const opacity = 1 - dist / maxDist;
      ctx.strokeStyle = `rgba(255, 69, 58, ${opacity * 0.25})`; 
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dots.forEach((dot, i) => {
        // Mouse Repulsion (Magnet effect)
        const mdx = mouse.current.x - dot.x;
        const mdy = mouse.current.y - dot.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        
        if (mdist < 220) {
          const force = (220 - mdist) / 220;
          dot.x -= mdx * force * 0.12; 
          dot.y -= mdy * force * 0.12;
          drawLine(dot, mouse.current, mdist, 220);
        }

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce
        if (dot.x <= dot.size) { dot.x = dot.size; dot.vx = Math.abs(dot.vx); }
        else if (dot.x >= canvas.width - dot.size) { dot.x = canvas.width - dot.size; dot.vx = -Math.abs(dot.vx); }

        if (dot.y <= dot.size) { dot.y = dot.size; dot.vy = Math.abs(dot.vy); }
        else if (dot.y >= canvas.height - dot.size) { dot.y = canvas.height - dot.size; dot.vy = -Math.abs(dot.vy); }

        // Inter-dot links
        for (let j = i + 1; j < dots.length; j++) {
          const other = dots[j];
          const dx = dot.x - other.x;
          const dy = dot.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            drawLine(dot, other, dist, 140);
          }
        }

        ctx.fillStyle = '#ff453a'; 
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      clearInterval(spawnInterval);
      clearInterval(deleteInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const AbstractArtwork = ({ className }) => (
  <svg viewBox="0 0 400 400" className={`w-full h-full ${className} overflow-hidden`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Floating Circle */}
    <circle cx="280" cy="120" r="80" className="fill-orange stroke-black animate-float" strokeWidth="4" />
    
    {/* Sliding Path (Triangle) */}
    <path d="M160 160 L240 80 L320 160 Z" className="fill-mustard stroke-black animate-tilt origin-center" strokeWidth="4" strokeLinejoin="round" />
    
    {/* Pulsing Rect */}
    <rect x="40" y="40" width="280" height="320" className="fill-ivory/50 stroke-black" strokeWidth="4" />
    
    {/* Moving Teal Block */}
    <path d="M40 240 L160 240 L160 360 L40 360 Z" className="fill-teal stroke-black animate-pulse" strokeWidth="4" />
    
    {/* Floating Bar */}
    <rect x="80" y="80" width="120" height="20" className="fill-coral stroke-black animate-bounce-slow" strokeWidth="4" />
    
    {/* Static details */}
    <rect x="80" y="120" width="80" height="20" className="fill-black" />
    <circle cx="280" cy="280" r="40" className="fill-ivory stroke-black" strokeWidth="4" />
    <circle cx="280" cy="280" r="10" className="fill-black animate-ping-slow" />
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['Without', 'Beyond', 'Above', 'Absolute'];

  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2700);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const handleOpenEditor = () => {
    // If ID already exists, go straight to editor, else show modal
    const existingId = localStorage.getItem('kraft_user_id');
    if (existingId) {
      navigate('/editor');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalComplete = () => {
    setIsModalOpen(false);
    navigate('/editor');
  };

  return (
    <div className="flex flex-col relative bg-ivory text-black overflow-hidden">
      {/* Decorative Background Elements Removed to fix scroll issue */}

      {/* Navbar - Command Center Style */}
      <nav 
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 flex justify-center px-6 ${
          scrolled ? 'pt-4' : 'pt-0'
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 border-black ${
            scrolled 
            ? 'w-full max-w-[1100px] bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border-4 solid-shadow-sm' 
            : 'w-full max-w-full bg-white px-8 py-5 rounded-none border-b-4'
          }`}
        >
          {/* Left: Logo & Status */}
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
          >
            <div className="w-10 h-10 bg-orange border-2 border-black flex items-center justify-center neo-shadow-sm group-hover:rotate-12 transition-transform">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
              <div className="flex flex-col -gap-1">
              <span className="font-editorial font-black text-2xl tracking-tighter leading-none">KRAFT.</span>
              <div className="flex items-center gap-1.5 mt-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]" />
                <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Engine_v2.0</span>
              </div>
            </div>
          </div>

          {/* Center: Navigation (Desktop) */}
          <div className="hidden lg:flex items-center gap-10">
            {['Features', 'Cloud Hub', 'Manifesto'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`} 
                className="font-black uppercase text-[11px] tracking-[0.2em] hover:text-orange transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-orange transition-all group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 mr-2">
              <button 
                className="p-2.5 border-2 border-black hover:bg-orange transition-all neo-shadow-xs active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-white"
                title="Open Settings"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings2 size={18} />
              </button>
            </div>
            
            <div className="hidden md:block">
              <Button 
                variant="editorial" 
                className={`py-3 px-6 text-xs transition-all duration-500 ${scrolled ? 'scale-95' : 'scale-100'}`} 
                onClick={handleOpenEditor}
              >
                Open Studio
              </Button>
            </div>

            <button 
              className="lg:hidden p-2.5 border-2 border-black bg-white neo-shadow-xs"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <CloseIcon size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className={`lg:hidden fixed inset-0 z-40 bg-white transition-all duration-500 ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
           <div className="flex flex-col items-center justify-center h-full gap-10 px-6">
              {['Features', 'Cloud Hub', 'Manifesto'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '')}`} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-black uppercase text-3xl tracking-tighter hover:text-orange transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col w-full gap-4 mt-8">
                 <Button variant="editorial" className="w-full py-5 text-lg" onClick={() => { setIsMobileMenuOpen(false); handleOpenEditor(); }}>Open Studio</Button>
                 <button 
                   onClick={() => { setIsMobileMenuOpen(false); setIsSettingsOpen(true); }}
                   className="w-full py-5 border-4 border-black font-black uppercase text-lg neo-shadow"
                 >
                   System Settings
                 </button>
              </div>
           </div>
        </div>
      </nav>

      <main className="max-w-[1440px] mx-auto px-6 pt-32 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="max-w-2xl relative z-10">
            <h1 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.9] text-black mb-8">
              Design <br/>
              <span className="relative h-[1.1em] overflow-hidden block">
                <span 
                  key={words[wordIndex]} 
                  className="text-teal block animate-slide-up"
                >
                  {words[wordIndex]}
                </span>
              </span>
              Compromise.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md leading-relaxed">
              A premium, browser-based visual editor built for creative teams who demand bold aesthetics and absolute structural control.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="editorial" onClick={handleOpenEditor} icon={ArrowRight}>Start Creating</Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/dashboard')}
              >
                View Workspace
              </Button>
            </div>
          </div>

          <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center p-10 -mt-6 scale-75 md:scale-100 transition-transform">
            <div className="relative w-full max-w-md h-full transition-transform duration-700 hover:scale-105">
              <div className="absolute inset-0 bg-mustard border-4 border-black translate-x-4 translate-y-4" />
              <div className="absolute inset-0 bg-white border-4 border-black p-4 overflow-hidden flex flex-col">
                <div className="flex items-center gap-2 border-b-4 border-black pb-4 mb-4">
                  <div className="w-4 h-4 rounded-full bg-coral border-2 border-black" />
                  <div className="w-4 h-4 rounded-full bg-mustard border-2 border-black" />
                  <div className="w-4 h-4 rounded-full bg-teal border-2 border-black" />
                </div>
                <div className="flex-1 relative">
                  <AbstractArtwork />
                  <div className="absolute bottom-4 right-4 bg-white border-2 border-black p-3 solid-shadow-sm flex items-center gap-3">
                    <div className="w-6 h-6 bg-orange" />
                    <div className="text-xs font-bold uppercase tracking-wide">Selected</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeatureSection />
        <CloudHubSection />

        <div id="manifesto" className="relative py-24 border-b-4 border-black bg-ivory overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-[0.03] pointer-events-none select-none">
            <div className="flex whitespace-nowrap animate-marquee">
              <span className="text-[20rem] font-black uppercase tracking-tighter mx-4">KRAFT KRAFT KRAFT KRAFT KRAFT KRAFT</span>
              <span className="text-[20rem] font-black uppercase tracking-tighter mx-4">KRAFT KRAFT KRAFT KRAFT KRAFT KRAFT</span>
            </div>
          </div>

          <div className="max-w-[1440px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <span className="inline-block bg-orange text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-4 neo-shadow-sm">The Manifesto</span>
                <h2 className="font-editorial text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] reveal-text">
                  KILL THE <br />
                  <span className="text-orange italic">BORING.</span>
                </h2>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold uppercase tracking-widest text-black/40">Established 2026</p>
                <p className="text-sm font-medium">Vol. 01 / First Edition</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-4 border-black neo-shadow-lg">
              {[
                { 
                  id: '01', 
                  title: 'Beyond Templates', 
                  desc: 'We don\'t do generic. Every canvas is a rebellion against the ordinary. Break the grid, or build a better one.',
                  color: 'hover:bg-coral'
                },
                { 
                  id: '02', 
                  title: 'Absolute Control', 
                  desc: 'Structure is power. Every node, every path, every pixel belongs to you. No safety nets, just pure precision.',
                  color: 'hover:bg-mustard'
                },
                { 
                  id: '03', 
                  title: 'Raw Aesthetics', 
                  desc: 'Boldness over beauty. Brutalism over blandness. KRAFT is for those who demand absolute visual authority.',
                  color: 'hover:bg-teal'
                }
              ].map((law, idx) => (
                <div 
                  key={law.id} 
                  className={`p-10 border-black ${idx !== 2 ? 'md:border-r-4 border-b-4 md:border-b-0' : ''} transition-all duration-300 group ${law.color} hover:text-white cursor-crosshair glitch-hover`}
                >
                  <div className="flex justify-between items-start mb-12">
                    <span className="text-4xl font-black font-editorial">.{law.id}</span>
                    <Zap className="opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">{law.title}</h3>
                  <p className="font-bold leading-tight text-black/70 group-hover:text-white/90">
                    {law.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
               <div className="flex items-center gap-6 text-sm font-black uppercase tracking-widest animate-pulse">
                 <span>No compromise</span>
                 <div className="w-2 h-2 bg-orange rounded-full" />
                 <span>Absolute freedom</span>
                 <div className="w-2 h-2 bg-orange rounded-full" />
                 <span>Raw power</span>
               </div>
            </div>
          </div>
        </div>

        {/* Big CTA */}
        <div className="relative py-16 border-b-4 border-black overflow-hidden bg-ivory min-h-[60vh] flex items-center">
            <InteractiveDots />
            <div className="relative z-10 px-6 w-full flex flex-col items-center">
                <div className="w-full flex justify-start mb-8">
                  <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.4em]">
                    <Command size={12} /> Final_Protocol
                  </div>
                </div>
                
                <div className="relative inline-block mb-12 text-center">
                  <h2 className="font-editorial text-5xl md:text-[7rem] font-black tracking-tighter leading-none relative z-10">
                    Ready to <span className="text-orange italic">Kraft?</span>
                  </h2>
                  <div className="absolute -inset-1 text-black opacity-10 font-editorial text-5xl md:text-[7rem] font-black tracking-tighter leading-none select-none translate-x-2 translate-y-2 pointer-events-none">
                    Ready to <span className="italic">Kraft?</span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-6">
                  <p className="text-lg font-bold max-w-lg text-black/60 uppercase tracking-widest leading-tight">
                    Join the elite circle of designers who build without boundaries.
                  </p>
                  <Button variant="editorial" className="py-5 px-10 text-xl group relative overflow-hidden" onClick={handleOpenEditor}>
                    <span className="relative z-10 flex items-center gap-3">
                      Launch Studio <ArrowRight size={24} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </div>
            </div>
            
            {/* Corner Accents */}
            <MousePointer2 className="absolute top-10 left-10 text-black/5 -rotate-12" size={120} />
            <Zap className="absolute bottom-10 right-10 text-orange/10 rotate-12" size={160} />
        </div>
      </main>

      <Footer />
      
      <IdentityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onComplete={handleModalComplete} 
      />

      <SystemSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </div>
  );
};

export default Landing;
