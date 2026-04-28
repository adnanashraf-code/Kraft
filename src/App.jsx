import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/errors/ErrorBoundary';

// Lazy load main routes for better performance
const Landing = lazy(() => import('./app/routes/Landing'));
const Dashboard = lazy(() => import('./app/routes/Dashboard'));
const Editor = lazy(() => import('./app/routes/Editor'));
const Whiteboard = lazy(() => import('./app/routes/Whiteboard'));
const Docs = lazy(() => import('./app/routes/Docs'));
const Privacy = lazy(() => import('./app/routes/Privacy'));
const NotFound = lazy(() => import('./app/routes/NotFound'));

import loadingSplash from './assets/loading_splash.png';

// Loading Screen Component - Premium Splash Screen
const LoadingScreen = () => (
  <div className="h-screen w-screen bg-[#0a0a0a] flex flex-col items-center justify-center relative overflow-hidden font-sans">
    {/* Background Visual */}
    <img 
      src={loadingSplash} 
      className="absolute inset-0 w-full h-full object-cover opacity-50 scale-110"
      alt="Loading..."
    />
    
    <div className="relative z-10 flex flex-col items-center">
      {/* Animated Core */}
      <div className="w-20 h-20 bg-black border-4 border-orange flex items-center justify-center mb-12 animate-pulse neo-shadow-lg">
         <div className="w-6 h-6 bg-teal animate-spin" />
      </div>

      {/* Brand & Status */}
      <div className="text-center mb-8">
        <h2 className="font-editorial text-4xl font-black text-white uppercase tracking-tighter mb-2">KRAFT</h2>
        <div className="h-[2px] w-40 bg-white/10 mx-auto overflow-hidden">
          <div className="h-full bg-orange w-1/2 animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <span className="text-[10px] font-black uppercase tracking-[0.6em] text-orange/60 animate-pulse">
        Initializing_Core_Engine...
      </span>
    </div>

    {/* Decorative Elements */}
    <div className="absolute bottom-10 left-10 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
      Kernel_v1.0.4 // 256-bit Encryption
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
            <Route path="/whiteboard" element={<Whiteboard />} />
            <Route path="/whiteboard/:id" element={<Whiteboard />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* Catch-all route for any undefined path */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
