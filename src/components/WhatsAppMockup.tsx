'use client';

import React, { useState, useEffect, useRef } from 'react';

// Configuration
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || "";
const OPENROUTER_MODEL_ID = "x-ai/grok-3-mini-beta";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface WhatsAppMockupProps {
  initialMessage?: string;
  systemPrompt?: string;
}

export default function WhatsAppMockup({
  initialMessage = "👋 Hey there! This is our AI WhatsApp customer service demo. How can I assist you today?",
  systemPrompt = "You are a helpful customer service AI assistant for a business. Respond in a friendly, professional manner. Keep responses concise and helpful, typical of WhatsApp business messages (short and to the point). You should act like a WhatsApp business assistant for a company called 'LFG Tech'. If asked about pricing, mention that the WhatsApp AI service starts at $299/month and custom solutions are tailored to business needs. If asked about products, mention AI solutions for WhatsApp, websites, and custom business automations."
}: WhatsAppMockupProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial greeting message
  useEffect(() => {
    setMessages([
      {
        id: "initial-message",
        content: initialMessage,
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, [initialMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to call OpenRouter API
  const fetchAIResponse = async (userMessage: string) => {
    setIsLoading(true);
    
    try {
      // Check if API key is available
      if (!OPENROUTER_API_KEY) {
        console.error("OpenRouter API key is not set. Please add NEXT_PUBLIC_OPENROUTER_API_KEY to your environment variables.");
        return "Sorry, the AI service is not properly configured. Please contact the administrator.";
      }
      
      const response = await fetch(OPENROUTER_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
          'X-Title': 'WhatsApp Customer Service AI'
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL_ID,
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.content
            })),
            { role: "user", content: userMessage }
          ]
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: { message: `HTTP error ${response.status}` } }));
        throw new Error(`API error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
      
      const data = await response.json();
      const aiResponseContent = data.choices[0]?.message?.content || "Sorry, I couldn't process that request.";
      
      return aiResponseContent;
    } catch (error) {
      console.error("Error fetching AI response:", error);
      return "Sorry, there was an error connecting to the AI service. Please try again later.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userInput = inputValue.trim();
    setInputValue('');

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);

    // Get AI response
    const aiContent = await fetchAIResponse(userInput);
    
    // Add AI response
    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      content: aiContent,
      sender: 'ai',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiResponse]);
  };

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[350px] mx-auto">
      {/* iPhone SVG frame */}
      <svg width="100%" height="auto" viewBox="0 0 592 1051" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_1_10)">
          <g clipPath="url(#clip0_1_10)">
            <rect x="129" y="72" width="393.652" height="852.388" rx="53.5367" fill="#2C2B78"/>
            <rect x="247.62" y="57.3037" width="157.461" height="47.2382" rx="23.6191" fill="#F8F8F8"/>
            <rect x="273.864" y="903.393" width="103.924" height="4.19895" rx="2.09948" fill="#F8F8F8"/>
            
            {/* WhatsApp UI background */}
            <rect x="160" y="104" width="100" height="644" rx="0" fill="#E4DDD6"/>
            
            {/* WhatsApp Header */}
            <rect x="160" y="104" width="100" height="20" rx="0" fill="#075E54"/>
            
            {/* Profile icon */}
            <circle cx="170" cy="114" r="5" fill="#CCCCCC"/>
            
            {/* WhatsApp Input area */}
            <rect x="160" y="728" width="100" height="20" rx="0" fill="#F0F2F5"/>
            <rect x="165" y="732" width="85" height="12" rx="6" fill="#FFFFFF"/>
            <circle cx="255" cy="738" r="5" fill="#25D366"/>
          </g>
          <rect x="129" y="72" width="393.652" height="852.388" rx="53.5367" stroke="#F8F8F8" strokeWidth="16.7958"/>
        </g>
        <defs>
          <filter id="filter0_d_1_10" x="0.931952" y="0.617802" width="591.003" height="1049.74" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="-29.3927" dy="27.2932"/>
            <feGaussianBlur stdDeviation="45.1387"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.13 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_10"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_10" result="shape"/>
          </filter>
          <clipPath id="clip0_1_10">
            <rect x="129" y="72" width="393.652" height="852.388" rx="53.5367" fill="white"/>
          </clipPath>
        </defs>
      </svg>
      
      {/* WhatsApp UI inside iPhone frame */}
      <div className="absolute" style={{ 
        top: '124px', 
        left: '160px', 
        width: '100px', 
        height: '604px',
        overflow: 'hidden'
      }}>
        {/* Messages container */}
        <div className="h-full overflow-y-auto p-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-1 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-1 rounded-lg max-w-[80%] text-[6px] ${
                  message.sender === 'user'
                    ? 'bg-[#DCF8C6] text-gray-800'
                    : 'bg-white text-gray-800'
                }`}
              >
                {message.content}
                <div className="text-[4px] text-gray-500 text-right mt-0.5">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  {message.sender === 'user' && (
                    <span className="ml-0.5">✓✓</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center mb-1 justify-start">
              <div className="bg-white p-1 rounded-lg max-w-[80%] text-[6px]">
                <div className="flex space-x-0.5">
                  <div className="w-0.5 h-0.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-0.5 h-0.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* WhatsApp Input area - positioned at the bottom of the WhatsApp UI */}
      <form 
        onSubmit={handleSubmit} 
        className="absolute" 
        style={{ 
          bottom: '124px', 
          left: '165px', 
          width: '90px',
          height: '12px'
        }}
      >
        <div className="flex items-center h-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            className="flex-1 text-[6px] bg-transparent focus:outline-none text-gray-700 h-full"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="text-white rounded-full w-3 h-3 flex items-center justify-center"
            disabled={!inputValue.trim() || isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>
      
      {/* WhatsApp Header text - positioned at the top of the WhatsApp UI */}
      <div className="absolute" style={{ top: '106px', left: '175px' }}>
        <h3 className="font-medium text-[7px] text-white">AI Customer Service</h3>
        <p className="text-[5px] text-white opacity-75">Online</p>
      </div>
    </div>
  );
} 