import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Layers, Code, Type } from 'lucide-react';
import Button from '../../components/common/Button';
import mockup from '../../assets/mockup.png';

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
            <a href="#" className="hover:text-orange transition-colors">Features</a>
            <a href="#" className="hover:text-orange transition-colors">Templates</a>
            <a href="#" className="hover:text-orange transition-colors">Showcase</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="font-medium hover:text-orange hidden md:block" onClick={() => navigate('/dashboard')}>Log in</button>
            <Button variant="editorial" className="py-2 px-5 text-sm" onClick={() => navigate('/editor')}>Open Editor</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center max-w-[1440px] mx-auto px-6 pt-12 pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="max-w-2xl relative z-10">
            <div className="inline-block bg-coral text-white px-3 py-1 font-bold text-sm uppercase tracking-wider mb-6 border-2 border-black rotate-[-2deg]">
              Beta 2.0 Now Live
            </div>
            <h1 className="font-editorial text-5xl md:text-8xl font-extrabold leading-[0.9] text-black mb-8">
              Design <br/>
              <span className="text-teal">Without</span><br/>
              Compromise.
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-md leading-relaxed">
              A premium, browser-based visual editor built for creative teams who demand bold aesthetics and absolute structural control.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="editorial" onClick={() => navigate('/editor')} icon={ArrowRight}>Start Creating</Button>
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

        {/* What is KRAFT & How it's different */}
        <div className="mt-32 mb-20">
          <div className="bg-ivory border-y-4 border-black py-20 px-6 sm:px-12 md:flex gap-16 relative">
            <div className="md:w-1/2 static z-10">
              <div className="inline-block bg-teal text-white px-3 py-1 font-bold text-sm uppercase tracking-wider mb-6 border-2 border-black rotate-[-1deg]">
                The Kraft Difference
              </div>
              <h2 className="font-editorial text-4xl md:text-6xl font-extrabold mb-8 leading-[1.1]">
                Not just another <br/> design tool.
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6 font-medium">
                Most web editors are heavy, slow, and limit you to basic templates. KRAFT is different. It is a high-fidelity, state-driven interaction engine built purely on React and Zustand.
              </p>
              <ul className="space-y-4 text-lg text-gray-600 font-medium mb-12">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 mt-1 bg-coral border-2 border-black shrink-0" />
                  <span><strong>Blazing Fast 60fps Engine:</strong> No DOM lag. Elements are managed via a centralized state for seamless Drag, Resize, and Rotate.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 mt-1 bg-mustard border-2 border-black shrink-0" />
                  <span><strong>True 3D Workspace:</strong> Upcoming 3D perspective mode allows Z-axis manipulation, destroying the flat 2D barrier.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 mt-1 bg-teal border-2 border-black shrink-0" />
                  <span><strong>Export to Reality:</strong> Don't just design. Export your artboards directly into semantic HTML/CSS code.</span>
                </li>
              </ul>
            </div>

            <div className="md:w-1/2 relative flex flex-col justify-center mt-12 md:mt-0">
              <h3 className="font-editorial text-3xl font-bold mb-8">How to use it?</h3>
              <div className="space-y-6 relative z-10">
                <div className="bg-white border-2 border-black p-6 solid-shadow-sm flex gap-6 items-center">
                  <div className="font-editorial text-5xl font-black text-gray-200">01</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Set the Stage</h4>
                    <p className="text-gray-600">Open the editor and setup your infinite canvas layout.</p>
                  </div>
                </div>
                <div className="bg-white border-2 border-black p-6 solid-shadow-sm flex gap-6 items-center ml-4">
                  <div className="font-editorial text-5xl font-black text-gray-200">02</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Build Visually</h4>
                    <p className="text-gray-600">Use the toolbar to drop elements, resize them via handles, and tweak properties.</p>
                  </div>
                </div>
                <div className="bg-white border-2 border-black p-6 solid-shadow-sm flex gap-6 items-center ml-8">
                  <div className="font-editorial text-5xl font-black text-gray-200">03</div>
                  <div>
                    <h4 className="font-bold text-xl mb-1">Export Production Code</h4>
                    <p className="text-gray-600">Download the absolute-positioned HTML ready for your projects.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Feature Showcase */}
        <div className="mt-40 mb-20" id="features">
          <div className="bg-black text-white p-12 md:p-20 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-orange to-transparent" />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="font-editorial text-5xl md:text-7xl font-bold mb-8 leading-none">
                  Advanced <br/>
                  <span className="text-orange italic">Substance.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-orange flex items-center justify-center shrink-0">
                      <Layers className="text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 uppercase">Layer Management 2.0</h3>
                      <p className="text-gray-400">Search, filter, lock, and hide layers. Professional drag-and-drop stack management with dimensional metadata.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-teal flex items-center justify-center shrink-0">
                      <Type className="text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 uppercase">Editorial Typography</h3>
                      <p className="text-gray-400">40+ premium typefaces including Satoshi and Clash Display. Full control over kerning, leading, and transforms.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-mustard flex items-center justify-center shrink-0">
                      <Code className="text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 uppercase">Power Tools</h3>
                      <p className="text-gray-400">Style Copy/Paste, Aspect Ratio locking, and Drop Shadow engine for high-fidelity interactive elements.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 border border-white/10 rounded-2xl rotate-3" />
                <img 
                  src={mockup} 
                  alt="KRAFT Editor Interface" 
                  className="rounded-xl border-4 border-white shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Templates & Showcase Teaser */}
        <div className="mt-40 mb-20 grid md:grid-cols-2 gap-12">
          <div className="bg-mustard border-4 border-black p-10 solid-shadow flex flex-col justify-between" id="templates">
            <div>
              <h2 className="font-editorial text-5xl font-bold mb-6">Built-in <br/>Templates</h2>
              <p className="text-lg font-medium mb-8">Access a growing library of high-end layouts, hero sections, and UI components optimized for KRAFT.</p>
            </div>
            <Button variant="editorial" onClick={() => navigate('/editor')} className="w-fit bg-white text-black">Browse Templates</Button>
          </div>
          
          <div className="bg-teal border-4 border-black p-10 solid-shadow flex flex-col justify-between" id="showcase">
            <div>
              <h2 className="font-editorial text-5xl font-bold mb-6">Premium <br/>Showcase</h2>
              <p className="text-lg font-medium mb-8 text-white/90">Explore a curated gallery of world-class designs built solely inside the KRAFT engine by our community.</p>
            </div>
            <Button variant="editorial" onClick={() => navigate('/dashboard')} className="w-fit bg-black text-white px-8">Coming Soon</Button>
          </div>
        </div>

        {/* Big CTA */}
        <div className="mt-40 mb-40 text-center">
            <h2 className="font-editorial text-6xl md:text-9xl font-bold mb-12 tracking-tighter italic">Ready to Kraft?</h2>
            <div className="flex justify-center gap-6">
              <Button variant="editorial" className="py-6 px-12 text-2xl" onClick={() => navigate('/editor')}>Get Started — It's Free</Button>
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
    </div>
  );
};

export default Landing;
