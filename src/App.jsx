import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './app/routes/Landing';
import Dashboard from './app/routes/Dashboard';
import Editor from './app/routes/Editor';
import NotFound from './app/routes/NotFound';
import ErrorBoundary from './components/errors/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
          {/* Catch-all route for any undefined path */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
