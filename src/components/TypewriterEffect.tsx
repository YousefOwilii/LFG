'use client';

import { useState, useEffect } from 'react';

interface TypewriterEffectProps {
  strings: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenStrings?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  strings,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetweenStrings = 1000,
}) => {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = strings[currentStringIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentString.length) {
          setCurrentText(currentString.substring(0, currentText.length + 1));
        } else {
          // Start deleting after delay
          setTimeout(() => {
            setIsDeleting(true);
          }, delayBetweenStrings);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentString.substring(0, currentText.length - 1));
        } else {
          // Move to next string
          setIsDeleting(false);
          setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentStringIndex, strings, typingSpeed, deletingSpeed, delayBetweenStrings]);

  return (
    <span className="text-blue-600 dark:text-blue-400">
      {currentText}
      <span className="animate-blink">|</span>
    </span>
  );
};

export default TypewriterEffect; 