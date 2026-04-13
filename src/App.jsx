import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './app/routes/Landing';
import Dashboard from './app/routes/Dashboard';
import Editor from './app/routes/Editor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/editor/:id" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
