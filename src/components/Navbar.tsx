"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if user has a preference stored
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);

    // Listen for theme changes
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Set up a MutationObserver to watch for class changes on the html element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          handleThemeChange();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="container mx-auto px-6 py-6">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <div className="relative w-8 h-8 mr-2">
            <Image 
              src={isDarkMode ? "/images/projects/personal-logo.png" : "/images/projects/logo-light.png"} 
              alt="Yousef Owili" 
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">Yousef Owili</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
            Home
          </Link>
          <Link href="#about" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
            About
          </Link>
          <Link href="#projects" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
            Projects
          </Link>
          <Link href="#contact" className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
            Contact
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button 
            onClick={toggleMenu}
            className="ml-4 text-gray-800 dark:text-white"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4 absolute left-4 right-4 z-10 transform transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex flex-col space-y-4">
          <Link 
            href="/" 
            className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="#about" 
            className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link 
            href="#projects" 
            className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            href="#contact" 
            className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
} 