'use client';

import React, { useState, useEffect, useRef } from 'react';
import DefaultWhatsAppBackground from './DefaultWhatsAppBackground';

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

interface WhatsAppChatInterfaceProps {
  className?: string;
  initialMessage?: string;
  systemPrompt?: string;
}

export default function WhatsAppChatInterface({
  className = '',
  initialMessage = "👋 Hey there! This is our AI WhatsApp customer service demo. Ask me anything about our services!",
  systemPrompt = "You are a helpful customer service AI assistant for a business. Respond in a friendly, professional manner. Keep responses concise and helpful. You should act like a WhatsApp business assistant. If asked about pricing, mention that our WhatsApp AI service starts at $299/month and our custom solutions are tailored to business needs."
}: WhatsAppChatInterfaceProps) {
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
    <div className={`flex flex-col h-full w-full ${className}`} style={{ maxWidth: '100%' }}>
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] text-white p-1.5 flex items-center">
        <div className="w-5 h-5 rounded-full bg-gray-300 mr-1.5 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h3 className="font-medium text-[8px]">AI Customer Service</h3>
          <p className="text-[6px] opacity-75">Online</p>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 p-1.5 overflow-y-auto relative">
        {/* Fallback background in case image is not available */}
        <DefaultWhatsAppBackground />
        {/* Message content */}
        <div className="relative z-10">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-1 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-1 rounded-lg max-w-[80%] text-[7px] ${
                  message.sender === 'user'
                    ? 'bg-[#DCF8C6] text-gray-800'
                    : 'bg-white text-gray-800'
                }`}
              >
                {message.content}
                <div className="text-[5px] text-gray-500 text-right mt-0.5">
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
              <div className="bg-white p-1 rounded-lg max-w-[80%] text-[7px]">
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
      
      {/* WhatsApp Input area */}
      <form onSubmit={handleSubmit} className="bg-[#F0F2F5] p-0.5 flex items-center">
        <div className="flex-1 bg-white rounded-full px-1.5 py-0.5 mr-0.5 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message"
            className="flex-1 text-[7px] bg-transparent focus:outline-none text-gray-700"
            disabled={isLoading}
          />
          <button
            type="button"
            className="text-gray-500 p-0.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <button
          type="submit"
          className="bg-[#25D366] text-white rounded-full w-4 h-4 flex items-center justify-center"
          disabled={!inputValue.trim() || isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
} 