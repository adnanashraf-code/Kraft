import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/errors/ErrorBoundary';

// Lazy load main routes for better performance
const Landing = lazy(() => import('./app/routes/Landing'));
const Dashboard = lazy(() => import('./app/routes/Dashboard'));
const Editor = lazy(() => import('./app/routes/Editor'));
const NotFound = lazy(() => import('./app/routes/NotFound'));

// Loading Screen Component
const LoadingScreen = () => (
  <div className="h-screen w-screen bg-white flex flex-col items-center justify-center font-sans">
    <div className="w-12 h-12 bg-black flex items-center justify-center animate-bounce mb-6">
       <div className="w-4 h-4 bg-yellow-400 rounded-full" />
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Synchronizing_Workspace...</span>
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
