import React, { useState, useEffect, useCallback } from 'react';
import useEditorStore from '../../../store/useEditorStore';
import { THEMES } from '../../../utils/themes';
import { ChevronRight, ChevronLeft, X, Sparkles } from 'lucide-react';

const TOUR_STEPS = [
  {
    title: "Welcome to KRAFT",
    content: "Let's take a 60-second tour of your new high-fidelity design environment.",
    target: "center",
  },
  {
    title: "Text Typography",
    content: "Add elegant typography to your canvas. Customize fonts, weights, and alignment in the inspector.",
    target: "#tool-text",
  },
  {
    title: "The Shape Picker",
    content: "Click this Hexagon to access 20+ specialized geometric shapes like Stars, Kites, and Octagons.",
    target: "#tool-shapes",
  },
  {
    title: "Ready-made Templates",
    content: "Jumpstart your workflow with professional layouts and editorial designs.",
    target: "#tool-templates",
  },
  {
    title: "Asset Vault",
    content: "Instantly add premium UI components and color gradients to your canvas from here.",
    target: "#tool-assets",
  },
  {
    title: "Global Search",
    content: "Quickly find layers, templates, or commands using the search bar (or press CTRL+K).",
    target: "#tool-search",
  },
  {
    title: "Shortcuts & Guide",
    content: "Master the KRAFT hotkeys (Ctrl+G, Ctrl+D, Ctrl+Z) to design 10x faster. You can find the full list here!",
    target: "#tool-shortcuts",
  },
  {
    title: "Infinite Canvas",
    content: "You're all set! Drag with Space to pan, use the wheel to zoom, and build something beautiful.",
    target: "center",
  }
];

const OnboardingTour = () => {
  const { isOnboardingOpen, setOnboardingOpen, currentOnboardingStep, setOnboardingStep, uiTheme } = useEditorStore();
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const theme = THEMES[uiTheme];
  const isLight = uiTheme === 'light' || uiTheme === 'gray';

  const updatePosition = useCallback(() => {
    const step = TOUR_STEPS[currentOnboardingStep];
    if (step.target === "center") {
      setCoords({ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' });
      return;
    }

    const el = document.querySelector(step.target);
    if (el) {
      const rect = el.getBoundingClientRect();
      setCoords({
        top: rect.top + rect.height / 2,
        left: rect.right + 20,
        transform: 'translateY(-50%)'
      });
    }
  }, [currentOnboardingStep]);

  useEffect(() => {
    if (isOnboardingOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
    }
    return () => window.removeEventListener('resize', updatePosition);
  }, [isOnboardingOpen, updatePosition]);

  if (!isOnboardingOpen) return null;

  const step = TOUR_STEPS[currentOnboardingStep];
  const isLastStep = currentOnboardingStep === TOUR_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      setOnboardingOpen(false);
      localStorage.setItem('kraft_onboarded', 'true');
    } else {
      setOnboardingStep(currentOnboardingStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentOnboardingStep > 0) {
      setOnboardingStep(currentOnboardingStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none">
      {/* Dimmed Background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto" onClick={() => setOnboardingOpen(false)} />

      {/* Tooltip Content */}
      <div 
        className={`
          absolute p-6 w-80 rounded-3xl shadow-2xl border pointer-events-auto
          ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/10'}
          transition-all duration-500 ease-out
        `}
        style={coords}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500 mr-3">
              <Sparkles size={20} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${theme.text} opacity-50`}>
              Step {currentOnboardingStep + 1} of {TOUR_STEPS.length}
            </span>
          </div>
          <button onClick={() => setOnboardingOpen(false)} className={`p-1 rounded-lg hover:bg-black/5 ${theme.text}`}>
            <X size={16} />
          </button>
        </div>

        <h3 className={`text-lg font-black tracking-tight mb-2 ${isLight ? 'text-gray-900' : 'text-white'}`}>{step.title}</h3>
        <p className={`text-[13px] leading-relaxed opacity-70 mb-6 ${theme.text}`}>{step.content}</p>

        <div className="flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={currentOnboardingStep === 0}
            className={`p-2 rounded-xl transition-colors ${currentOnboardingStep === 0 ? 'opacity-0' : `hover:${isLight ? 'bg-gray-100' : 'bg-white/5'} ${theme.text}`}`}
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            onClick={handleNext}
            className={`
              flex items-center px-6 py-2.5 rounded-xl font-bold text-sm transition-all
              ${isLastStep 
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'}
            `}
          >
            {isLastStep ? "Get Started" : "Next"}
            {!isLastStep && <ChevronRight size={18} className="ml-1" />}
          </button>
        </div>

        {/* Arrow (only if not centered) */}
        {step.target !== "center" && (
          <div 
            className={`absolute w-4 h-4 rotate-45 -left-2 top-1/2 -translateY-1/2 border-l border-b ${isLight ? 'bg-white border-gray-200' : 'bg-[#1a1a1a] border-white/10'}`}
          />
        )}
      </div>
    </div>
  );
};

export default OnboardingTour;
