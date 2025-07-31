'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

// Import StarField component from main page
const StarField = ({ speedFactor = 0.05, starCount = 1000 }) => {
  useEffect(() => {
    const canvas = document.getElementById('starfield') as HTMLCanvasElement;

    if (canvas) {
      const c = canvas.getContext('2d');

      if (c) {
        let w = window.innerWidth;
        let h = window.innerHeight;

        const setCanvasExtents = () => {
          canvas.width = w;
          canvas.height = h;
        };

        setCanvasExtents();

        window.onresize = () => {
          w = window.innerWidth;
          h = window.innerHeight;
          setCanvasExtents();
        };

        const makeStars = (count: number) => {
          const out = [];
          for (let i = 0; i < count; i++) {
            const s = {
              x: Math.random() * 1600 - 800,
              y: Math.random() * 900 - 450,
              z: Math.random() * 1000,
            };
            out.push(s);
          }
          return out;
        };

        let stars = makeStars(starCount);

        const clear = () => {
          c.fillStyle = '#0D0D0D'; // Near black background
          c.fillRect(0, 0, canvas.width, canvas.height);
        };

        const putPixel = (x: number, y: number, brightness: number) => {
          const rgb = `rgba(0, 255, 65, ${brightness})`; // Lime green for stars
          c.fillStyle = rgb;
          c.fillRect(x, y, 1, 1);
        };

        const moveStars = (distance: number) => {
          const count = stars.length;
          for (var i = 0; i < count; i++) {
            const s = stars[i];
            s.z -= distance;
            while (s.z <= 1) {
              s.z += 1000;
            }
          }
        };

        let prevTime: number;
        const init = (time: number) => {
          prevTime = time;
          requestAnimationFrame(tick);
        };

        const tick = (time: number) => {
          let elapsed = time - prevTime;
          prevTime = time;

          moveStars(elapsed * speedFactor);

          clear();

          const cx = w / 2;
          const cy = h / 2;

          const count = stars.length;
          for (var i = 0; i < count; i++) {
            const star = stars[i];

            const x = cx + star.x / (star.z * 0.001);
            const y = cy + star.y / (star.z * 0.001);

            if (x < 0 || x >= w || y < 0 || y >= h) {
              continue;
            }

            const d = star.z / 1000.0;
            const b = 1 - d * d;

            putPixel(x, y, b);
          }

          requestAnimationFrame(tick);
        };

        requestAnimationFrame(init);

        return () => {
          window.onresize = null;
        };
      }
    }
  }, [starCount, speedFactor]);

  return (
    <canvas
      id="starfield"
      style={{
        padding: 0,
        margin: 0,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        opacity: 0.7,
        pointerEvents: 'none',
      }}
    ></canvas>
  );
};

export default function WebsiteDemo() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center">
      {/* Star background */}
      <StarField starCount={1500} speedFactor={0.03} />
      
      <div className="max-w-7xl mx-auto relative z-10 py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/#services" className="text-[#00FF41] hover:underline mb-10 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Services
          </Link>
          
          <div className="max-w-3xl mx-auto bg-[#0D0D0D] bg-opacity-80 p-8 sm:p-12 rounded-lg border border-[#00FF41] shadow-md">
            <h1 className="text-4xl sm:text-5xl font-bold mb-10 text-white">
              Plot Twist!
            </h1>
            
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-[#00FF41] rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#0D0D0D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            
            <p className="text-2xl sm:text-3xl mb-8 text-[#00FF41] font-semibold">
              You're already looking at our website demo!
            </p>
            
            <p className="text-lg sm:text-xl mb-10 text-white">
              This modern, responsive site with its sleek animations, custom components, 
              and intuitive navigation is exactly what we can build for your business.
            </p>
            
            <div className="bg-[#1A1A1A] border-l-4 border-[#00FF41] p-6 mb-8 text-left">
              <p className="text-white text-lg">
                <span className="text-[#00FF41] font-semibold">Fun fact:</span> The stars in the background aren't just for show - they're 
                rendered in real-time using canvas animation. That's the level of detail and interactivity we bring to every project.
              </p>
            </div>
            
            <Link 
              href="/#contact-section" 
              className="bg-[#00FF41] text-[#0D0D0D] font-bold py-3 px-8 rounded-lg hover:bg-opacity-90 transition-colors duration-300 inline-block text-center text-lg"
            >
              I want a website like this
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 