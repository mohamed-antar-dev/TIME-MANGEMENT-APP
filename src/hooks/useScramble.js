import { useState, useEffect } from 'react';

/**
 * useScramble: Animates a string from random characters to final text.
 * Provides that "hacker/SaaS" text-generation effect.
 */
export const useScramble = (text, speed = 40) => {
  const [output, setOutput] = useState('');
  const chars = '.'; // The "scramble" character pool

  useEffect(() => {
    let iteration = 0;
    
    // Set up the interval for the animation
    const interval = setInterval(() => {
      setOutput(
        text
          .split('')
          .map((letter, index) => {
            // If we've reached this part of the string, show the real letter
            if (index < iteration) return text[index];
            
            // Otherwise, show a random character from the pool
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      
      // Stop the interval once the entire string is revealed
      if (iteration >= text.length) clearInterval(interval);
      
      // Increment iteration; lower numbers = slower reveal
      iteration += 1 / 3;
    }, speed);

    // Cleanup: clear interval if the component unmounts
    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
};