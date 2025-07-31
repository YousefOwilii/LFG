import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Configuration - You'll need to add your OpenRouter API key and model ID here
const OPENROUTER_API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || ""; // Use environment variable
const OPENROUTER_MODEL_ID = "x-ai/grok-3-mini-beta";
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const toggleChat = () => {
    setIsAnimating(true);
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Reset welcome screen when opening if chat is empty
      if (messages.length === 0) {
        setShowWelcome(true);
      }
    }
    
    // Reset animation state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const dismissWelcome = () => {
    setShowWelcome(false);
  };

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
          'X-Title': 'AI Version of Yousef'
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL_ID,
          messages: [
            { role: "system", content: "When they say hi who are you, say your name, don't start stating all the information you have in one go.  Do not mention all the information about me unless they ask about it. If someone speaks in any language, say that you only reply in English sorry. No hyperbole. Avoid overusing emojis. Avoid over reacting. You're an AI version of someone called Yousef Owili. You're super funny in a normal way, witty and charistmatic. make the replies max like two sentence, very small indeed. You're a senior CS student at the british university in egypt. You're born in 12/12/2004, you're 20. You're Egyptian. You're a copy of him, but there are somethings the real yousef didn't tell you about. Right now you're inside his website, yousefowili.me. His website has a home, which has a cool typerwriter animation, and an about, and a contact section where you can shoot the real yousef an email if you want to conatct him, and a projects tab of all the projects I've done so far. If anyone asks you about yousef's love life, say that you're pretty sure he's a baller with girls but he doesn't tell anyone. You life caramel frappuchinos. You go to the gym and take creatine and on your jouney to become jacked as fuck. You absolutely and utterly honor your word. You answer only the questions you're asked nothing more. Seem a little bit professional not that much." },
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
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat toggle button with pulse animation */}
      <button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all duration-300 focus:outline-none relative ${
          !isOpen && !isAnimating ? 'animate-pulse-subtle' : ''
        } ${isAnimating ? 'scale-90' : 'scale-100'}`}
        aria-label="Open chat"
      >
        <div className={`absolute inset-0 rounded-full bg-indigo-400 animate-ping-slow opacity-75 ${isOpen ? 'hidden' : 'block'}`}></div>
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Chat container with improved animations */}
      <div 
        ref={chatContainerRef}
        className={`absolute bottom-16 right-0 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-all duration-500 ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ height: isOpen ? '500px' : '0', maxHeight: '80vh' }}
      >
        {/* Welcome overlay with blur effect */}
        {showWelcome && (
          <div className="absolute inset-0 z-10 backdrop-blur-sm bg-black/30 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-xs transform transition-all duration-500 animate-fade-in-up">
              <h3 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">Welcome!</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                You're now chatting with the AI version of me. Feel free to ask anything!
              </p>
              <button
                onClick={dismissWelcome}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                Let's Chat
              </button>
            </div>
          </div>
        )}

        {/* Chat header */}
        <div className="bg-indigo-600 text-white p-4 flex items-center">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 shadow-md">
            <span className="text-indigo-600 font-bold text-sm">AI</span>
          </div>
          <div>
            <h3 className="font-medium">AI Assistant</h3>
            <p className="text-xs opacity-75">AI version of Yousef</p>
          </div>
        </div>

        {/* Messages container */}
        <div className="flex-1 p-4 overflow-y-auto" style={{ height: 'calc(500px - 132px)' }}>
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-center text-gray-500 dark:text-gray-400">
              <div className="animate-fade-in-up">
                <p>No messages yet.</p>
                <p className="text-sm">Start a conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : ''
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`inline-block p-3 rounded-lg max-w-[80%] ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.content}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex items-center mb-4 animate-fade-in-up">
              <div className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-3 rounded-lg rounded-bl-none max-w-[80%] inline-block">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? "AI is thinking..." : "Type a message..."}
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700 dark:text-gray-300"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!inputValue.trim() || isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 