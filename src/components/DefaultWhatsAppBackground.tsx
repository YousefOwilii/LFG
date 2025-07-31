import React from 'react';

// This component creates a WhatsApp-like background pattern in case the actual image is not available
export default function DefaultWhatsAppBackground() {
  return (
    <div 
      className="absolute inset-0 z-0"
      style={{
        backgroundColor: '#E4DDD6', // WhatsApp light gray background
        backgroundImage: `
          linear-gradient(
            rgba(0, 0, 0, 0.02) 1px, 
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.02) 1px, 
            transparent 1px
          ),
          linear-gradient(
            to right,
            rgba(0, 0, 0, 0.03),
            rgba(0, 0, 0, 0.03)
          )
        `,
        backgroundSize: '15px 15px, 15px 15px, 100% 100%',
        opacity: 0.8,
      }}
    />
  );
} 