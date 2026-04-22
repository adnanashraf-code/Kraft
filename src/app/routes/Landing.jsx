import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Code, Type, Zap, Command, MousePointer2 } from 'lucide-react';
import Button from '../../components/common/Button';
import IdentityModal from '../../components/common/IdentityModal';
import mockup from '../../assets/mockup.png';
import FeatureSection from '../../components/landing/FeatureSection';
import CloudHubSection from '../../components/landing/CloudHubSection';
import DesignTemplates from '../../components/dashboard/DesignTemplates';

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

    const dots = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 3 + 2, // Smaller, subtle dots
    }));

    // Lifecycle Logic: Spawn every 1s, Delete every 2s
    const spawnInterval = setInterval(() => {
      if (dots.length < 250) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2 + 1,
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
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['Without', 'Beyond', 'Above', 'Absolute'];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2700);
    return () => clearInterval(interval);
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
    <div className="min-h-screen flex flex-col relative bg-ivory text-black">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-mustard rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal rounded-full opacity-20 blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full border-b-2 border-black bg-white/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-orange border-2 border-black flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-editorial font-bold text-2xl tracking-tighter">KRAFT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-medium">
            <a href="#features" className="hover:text-orange transition-colors">Features</a>
            <a href="#templates" className="hover:text-orange transition-colors">Templates</a>
            <a href="#cloudhub" className="hover:text-orange transition-colors">Cloud Hub</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="editorial" className="py-2 px-5 text-sm" onClick={handleOpenEditor}>Open Editor</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 pt-12 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="max-w-2xl relative z-10">

            <h1 className="font-editorial text-5xl md:text-8xl font-extrabold leading-[0.9] text-black mb-8">
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
            <p className="text-xl text-gray-600 mb-6 max-w-md leading-relaxed">
              A premium, browser-based visual editor built for creative teams who demand bold aesthetics and absolute structural control.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="editorial" onClick={handleOpenEditor} icon={ArrowRight}>Start Creating</Button>
              <Button variant="secondary" onClick={() => navigate('/dashboard')}>View Workspace</Button>
            </div>
          </div>

          <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center p-10 -mt-6">
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

        {/* Features Detail Section (Phase 5) */}
        <FeatureSection />

        {/* Templates Section (Phase 6) */}
        <div id="templates" className="py-32 px-6 border-y-4 border-black">
          <div className="max-w-[1440px] mx-auto">
            <DesignTemplates onBack={() => {}} isLight={true} />
          </div>
        </div>

        {/* Cloud Hub Vault (Phase 7 Replacement) */}
        <CloudHubSection />

        {/* Big CTA */}
        <div className="relative mt-20 mb-20 py-24 border-y-4 border-black overflow-hidden bg-ivory min-h-[80vh] flex items-center">
            <InteractiveDots />
            <div className="relative z-10 text-center px-6 w-full">
                <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                  <Command size={12} /> Final_Protocol
                </div>
                
                <div className="relative inline-block mb-12">
                  <h2 className="font-editorial text-6xl md:text-[8rem] font-black tracking-tighter leading-tight relative z-10">
                    Ready to <br />
                    <span className="text-orange italic block mt-4">Kraft?</span>
                  </h2>
                  <div className="absolute -inset-1 text-black opacity-10 font-editorial text-6xl md:text-[8rem] font-black tracking-tighter leading-tight select-none translate-x-2 translate-y-2 pointer-events-none">
                    Ready to <br />
                    <span className="italic block mt-4">Kraft?</span>
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

      <footer className="border-t-2 border-black bg-white py-12">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-black flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="font-editorial font-bold text-xl tracking-tighter">KRAFT.STUDIO</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            © 2026 Kraft Design Platform. No generic templates allowed.
          </div>
        </div>
      </footer>
      <IdentityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onComplete={handleModalComplete} 
      />
    </div>
  );
};

export default Landing;
