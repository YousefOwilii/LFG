'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

// StarField component for animated background
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
          c.fillStyle = 'black';
          c.fillRect(0, 0, canvas.width, canvas.height);
        };

        const putPixel = (x: number, y: number, brightness: number) => {
          const rgb = `rgba(255, 255, 255, ${brightness})`;
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
        opacity: 1,
        pointerEvents: 'none',
      }}
    ></canvas>
  );
};

// Scroll to the next section
const scrollToSection = (sectionRef: React.RefObject<HTMLElement>) => {
  if (sectionRef.current) {
    sectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function AICustomerService() {
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  
  // Disable normal scrolling
  useEffect(() => {
    const preventDefault = (e: Event) => {
      e.preventDefault();
    };
    
    // Prevent default scrolling
    document.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      // Clean up event listeners when component unmounts
      document.removeEventListener('wheel', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);
  
  // Handle scroll button click
  const handleScrollDown = () => {
    const nextSection = currentSection + 1;
    if (nextSection === 1 && section2Ref.current) {
      scrollToSection(section2Ref);
      setCurrentSection(1);
    } else if (nextSection === 2 && section3Ref.current) {
      scrollToSection(section3Ref);
      setCurrentSection(2);
    } else if (nextSection === 3 && section4Ref.current) {
      scrollToSection(section4Ref);
      setCurrentSection(3);
    }
  };

  return (
    <div className="bg-black text-white h-screen w-full overflow-hidden">
      {/* Star background */}
      <StarField starCount={1500} speedFactor={0.03} />
      
      {/* Main content with snap scroll */}
      <div className="snap-y snap-mandatory h-screen overflow-y-hidden" style={{ position: 'relative', zIndex: 10 }}>
        {/* Section 1: Hero - WhatsApp Customer Service */}
        <div ref={section1Ref} className="snap-start h-screen w-full flex flex-col items-center justify-center px-4 py-6 sm:py-0">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-white">
              Overwhelmed with WhatsApp inquires?
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300">
              Make AI reply for you.
            </p>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 sm:mb-10 text-gray-300">
              No missed messages, 24/7, and completely aware of your business's details.
            </p>
            <button 
              onClick={handleScrollDown}
              className="bg-white text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto">
              I Want This
            </button>
          </div>
          
          {/* Centered arrow for section 1 */}
          {currentSection === 0 && (
            <button 
              onClick={handleScrollDown}
              className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-50"
              aria-label="Scroll to next section"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 sm:h-10 sm:w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>
          )}
        </div>
        
        {/* Section 2: Features - Why Use AI */}
        <div ref={section2Ref} className="snap-start h-screen w-full flex flex-col items-center justify-center px-4 py-8 sm:py-0">
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-10 text-center">Why Use AI?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">24/7 Availability</h3>
                <p className="text-sm sm:text-base text-gray-300">Our AI never sleeps, ensuring your customers get support anytime, anywhere.</p>
              </div>
              
              <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Instant Responses</h3>
                <p className="text-sm sm:text-base text-gray-300">No more waiting. Get immediate answers to customer queries.</p>
              </div>
              
              <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Multilingual Support</h3>
                <p className="text-sm sm:text-base text-gray-300">Communicate with customers in their preferred language.</p>
              </div>
              
              <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Cost Effective</h3>
                <p className="text-sm sm:text-base text-gray-300">Reduce support costs while improving customer satisfaction.</p>
              </div>
            </div>
          </div>
          
          {/* Centered arrow for section 2 */}
          {currentSection === 1 && (
            <button 
              onClick={handleScrollDown}
              className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-50"
              aria-label="Scroll to next section"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 sm:h-10 sm:w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>
          )}
        </div>
        
        {/* Section 3: Custom Website (NEW) */}
        <div ref={section3Ref} className="snap-start h-screen w-full flex flex-col items-center justify-center px-4 py-6 sm:py-0">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Custom Website</h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-10 text-gray-300">
              Get a professionally designed website tailored to your business needs, complete with AI integration and modern features.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-2xl mx-auto mb-8">
              <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">Responsive Design</h3>
                <p className="text-sm sm:text-base text-gray-300">Looks perfect on all devices from mobile to desktop.</p>
              </div>
              
              <div className="bg-black bg-opacity-60 p-4 sm:p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">SEO Optimized</h3>
                <p className="text-sm sm:text-base text-gray-300">Built to rank higher in search engines and attract more visitors.</p>
              </div>
            </div>
            <button 
              onClick={handleScrollDown}
              className="bg-white text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto">
              Tell Me More
            </button>
          </div>
          
          {/* Centered arrow for section 3 */}
          {currentSection === 2 && (
            <button 
              onClick={handleScrollDown}
              className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-50"
              aria-label="Scroll to next section"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 sm:h-10 sm:w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                />
              </svg>
            </button>
          )}
        </div>
        
        {/* Section 4: Call to Action (previously Section 3) */}
        <div ref={section4Ref} className="snap-start h-screen w-full flex flex-col items-center justify-center px-4 py-6 sm:py-0">
          <div className="max-w-3xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">Ready to add this to your business?</h2>
            <p className="text-base sm:text-xl mb-6 sm:mb-10 text-gray-300">
              Join the businesses that have already transformed their customer support experience with our AI-powered solutions.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button onClick={() => {
                window.location.href = 'https://www.yousefowili.me/#contact';
              }} className="bg-white text-black font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-lg sm:text-xl hover:bg-gray-200 transition-colors duration-300 w-full sm:w-auto">
                Okay, I want to know more.
              </button>
              {/* <Link href="/" className="bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-full text-xl hover:bg-white hover:bg-opacity-10 transition-colors duration-300">
                Learn More
              </Link> */}
            </div>
          </div>
          
          {/* Back to top button - only show on last section */}
          {currentSection === 3 && (
            <button 
              onClick={() => {
                scrollToSection(section1Ref);
                setCurrentSection(0);
              }}
              className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-50"
              aria-label="Back to top"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-8 w-8 sm:h-10 sm:w-10" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 