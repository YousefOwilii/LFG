import React from 'react';

interface StylizedQuoteProps {
  children: React.ReactNode;
}

const StylizedQuote: React.FC<StylizedQuoteProps> = ({ children }) => {
  return (
    <div className="relative py-8 px-6 md:px-10 my-8 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md">
      <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-4">
        <span className="text-6xl text-blue-500 dark:text-blue-400 leading-none">"</span>
      </div>
      <div className="relative z-10 text-gray-700 dark:text-gray-300 italic">
        {children}
      </div>
      <div className="absolute bottom-0 right-0 transform translate-y-1/2 -translate-x-4">
        <span className="text-6xl text-blue-500 dark:text-blue-400 leading-none">"</span>
      </div>
    </div>
  );
};

export default StylizedQuote; 