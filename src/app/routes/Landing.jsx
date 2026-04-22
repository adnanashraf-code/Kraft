import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Code, Type } from 'lucide-react';
import Button from '../../components/common/Button';
import IdentityModal from '../../components/common/IdentityModal';
import mockup from '../../assets/mockup.png';
import FeatureSection from '../../components/landing/FeatureSection';
import CloudHubSection from '../../components/landing/CloudHubSection';
import DesignTemplates from '../../components/dashboard/DesignTemplates';

const AbstractArtwork = ({ className }) => (
  <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="40" width="280" height="320" className="fill-ivory stroke-black" strokeWidth="4" />
    <circle cx="280" cy="120" r="80" className="fill-orange stroke-black" strokeWidth="4" />
    <path d="M40 240 L160 240 L160 360 L40 360 Z" className="fill-teal stroke-black" strokeWidth="4" />
    <path d="M160 160 L240 80 L320 160 Z" className="fill-mustard stroke-black" strokeWidth="4" strokeLinejoin="round" />
    <rect x="80" y="80" width="120" height="20" className="fill-coral stroke-black" strokeWidth="4" />
    <rect x="80" y="120" width="80" height="20" className="fill-black" />
    <circle cx="280" cy="280" r="40" className="fill-ivory stroke-black" strokeWidth="4" />
    <circle cx="280" cy="280" r="10" className="fill-black" />
  </svg>
);

const Landing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-ivory text-black">
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
            <button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange transition-colors">Features</button>
            <button onClick={() => document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange transition-colors">Templates</button>
            <button onClick={() => document.getElementById('cloudhub')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-orange transition-colors">Cloud Hub</button>
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
              <span className="text-teal">Without</span><br/>
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

          <div className="relative z-10 w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center p-8">
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
            <DesignTemplates onBack={() => {}} />
          </div>
        </div>

        {/* Cloud Hub Vault (Phase 7 Replacement) */}
        <CloudHubSection />

        {/* Big CTA */}
        <div className="mt-40 mb-40 text-center">
            <h2 className="font-editorial text-6xl md:text-9xl font-bold mb-12 tracking-tighter italic">Ready to Kraft?</h2>
            <div className="flex justify-center gap-6">
              <Button variant="editorial" className="py-6 px-12 text-2xl" onClick={handleOpenEditor}>Get Started — It's Free</Button>
            </div>
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
