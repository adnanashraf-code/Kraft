import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateStars = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + Math.random(),
    size: Math.random() * 2 + 1, // 1-3px
    top: `${Math.random() * 50}%`,
    left: `${Math.random() * 100}%`,
    duration: Math.random() * 3 + 4,
    delay: Math.random() * 4,
    direction: Math.random() > 0.5 ? "topLeft" : "topRight",
  }));
};

const NotFound = () => {
  // Use functional initializer for instant rendering without mount lag
  const [stars, setStars] = useState(() => generateStars(35));
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Pre-load large assets to prevent flickering
    const urls = [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9770934.jpg-Wl31ERQfbntJABIblVId5PIBjqP5Gx.jpeg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8794272-p5k6GdbD8O2RIat5GWtUGJGkDgXoxf.png"
    ];
    
    Promise.all(urls.map(url => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
      });
    })).then(() => setImagesLoaded(true));

    const interval = setInterval(() => {
      setStars((prev) => [...prev.slice(-25), ...generateStars(10)]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Background Image Layer */}
      <div className="absolute inset-0 bg-space opacity-60"></div>

      {/* Falling Stars Layer */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute ${star.direction === "topLeft" ? "animate-fall-topLeft" : "animate-fall-topRight"}`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          >
            <div className="h-full w-full rounded-full bg-white opacity-40 shadow-[0_0_8px_white]" />
          </div>
        ))}
      </div>

      {/* UFO Layer */}
      <div className="absolute top-[33%] left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float pointer-events-none z-10">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8794272-p5k6GdbD8O2RIat5GWtUGJGkDgXoxf.png"
          alt="UFO"
          className="w-[200px] md:w-[350px] opacity-90 animate-tilt"
        />
        {/* Glow behind UFO */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-purple-500/20 blur-[60px] -z-10 rounded-full"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-w-2xl">
        <h1 className="mb-4 text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter">
          404
        </h1>
        <div className="h-1 w-24 bg-purple-600 mb-8 rounded-full shadow-[0_0_20px_#9333ea]"></div>
        <p className="mb-10 text-xl md:text-2xl font-bold text-gray-400 max-w-md mx-auto leading-relaxed">
          Oops! Looks like this page got lost in space.
        </p>
        
        <button 
          onClick={() => navigate('/')}
          className="group relative px-10 py-4 bg-white text-black font-black uppercase tracking-[0.2em] text-xs rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">Return Home</span>
        </button>
      </div>
      
      {/* Decorative Gradient Overlays */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default NotFound;
