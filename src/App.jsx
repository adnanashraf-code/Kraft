import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/errors/ErrorBoundary';

// Lazy load main routes for better performance
const Landing = lazy(() => import('./app/routes/Landing'));
const Dashboard = lazy(() => import('./app/routes/Dashboard'));
const Editor = lazy(() => import('./app/routes/Editor'));
const NotFound = lazy(() => import('./app/routes/NotFound'));

// Enhanced Landing Message (Splash Screen)
const LoadingScreen = () => (
  <div className="h-screen w-screen bg-black flex flex-col items-center justify-center font-sans relative overflow-hidden">
    {/* Abstract Background Detail */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-400/5 -skew-x-12 translate-x-1/2" />
    <div className="absolute bottom-0 left-0 w-1/2 h-full bg-cyan-400/5 skew-x-12 -translate-x-1/2" />
    
    <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in-95 duration-1000">
      <div className="w-20 h-20 bg-yellow-400 flex items-center justify-center neo-shadow rotate-3 mb-12">
         <div className="w-8 h-8 bg-black rounded-full animate-ping opacity-20" />
         <div className="absolute w-4 h-4 bg-black rounded-full" />
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-white font-editorial text-4xl font-bold tracking-tighter uppercase mb-4">
          KRAFT<span className="text-yellow-400">.</span>STUDIO
        </h1>
        <div className="flex items-center gap-4">
          <div className="w-32 h-1 bg-white/10 overflow-hidden">
            <div className="h-full bg-yellow-400 w-full animate-shimmer origin-left" />
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 mt-6 animate-pulse">Initializing_Creative_Core</span>
      </div>
    </div>

    {/* Bottom Status Layer */}
    <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
       <div className="flex flex-col gap-1">
          <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">System Status</span>
          <span className="text-[10px] font-black text-green-400 uppercase tracking-tighter">Ready For Input</span>
       </div>
       <div className="flex gap-4">
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />
          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse delay-75" />
          <div className="w-1.5 h-1.5 bg-magenta-500 rounded-full animate-pulse delay-150" />
       </div>
    </div>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/editor/:id" element={<Editor />} />
            {/* Catch-all route for any undefined path */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
