'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import WhatsAppMockupNew from '@/components/WhatsAppMockupNew';

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

export default function WhatsAppDemo() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex items-center">
      {/* Star background */}
      <StarField starCount={1500} speedFactor={0.03} />
      
      <div className="max-w-7xl mx-auto relative z-10 py-16 px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Left side content */}
          <div className="w-full md:w-1/2 bg-[#0D0D0D] bg-opacity-80 p-8 rounded-lg border border-[#00FF41] shadow-md">
            <Link href="/#services" className="text-[#00FF41] hover:underline mb-6 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Services
            </Link>
            
            <h1 className="text-3xl font-bold text-white mb-6">WhatsApp AI Customer Service</h1>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-lg mb-4 text-[#00FF41]">
                Our AI-powered WhatsApp customer service solution provides 24/7 support for your business, handling common customer inquiries instantly.
              </p>
              
              <h2 className="text-xl font-semibold mt-6 mb-4 text-white">Key Benefits:</h2>
              <ul className="list-disc pl-5 space-y-2 text-white">
                <li>24/7 automated responses</li>
                <li>Multilingual support</li>
                <li>Seamless human handoff for complex issues</li>
                <li>Integration with your knowledge base</li>
                <li>Appointment scheduling and data collection</li>
                <li>Customized to match your brand voice</li>
              </ul>
              
              <div className="mt-8 bg-[#1A1A1A] border-l-4 border-[#00FF41] p-4">
                <p className="text-[#00FF41]">
                  <strong>Try it yourself!</strong> Use the interactive WhatsApp demo on the right to experience our AI customer service in action.
                </p>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 text-white">Ready to transform your customer service?</h2>
                <Link 
                  href="/#contact-section" 
                  className="bg-[#00FF41] text-[#0D0D0D] font-bold py-3 px-5 rounded-lg hover:bg-opacity-90 transition-colors duration-300 inline-block text-center"
                >
                  Contact us for pricing
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side: WhatsApp iPhone mockup */}
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <WhatsAppMockupNew 
              initialMessage="👋 Hey there! This is our AI WhatsApp customer service demo. How can I assist you today?"
              systemPrompt="You are a helpful customer service AI assistant for a business. Respond in a friendly, professional manner. Keep responses concise and helpful, typical of WhatsApp business messages (short and to the point). You should act like a WhatsApp business assistant for a company called 'Your Business'. If asked about pricing, mention that the WhatsApp AI service starts at $299/month and custom solutions are tailored to business needs. If asked about products, mention AI solutions for WhatsApp, websites, and custom business automations."
            />
          </div>
        </div>
      </div>
    </div>
  );
} 