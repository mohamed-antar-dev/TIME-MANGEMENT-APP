import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal: A Senior-level hook using IntersectionObserver
 * for high-performance scroll animations.
 */
export const useScrollReveal = (options = { threshold: 0.15 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    // Create an observer that triggers once when the section enters the viewport
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Unobserve after it's revealed to save browser resources
        if (elementRef.current) observer.unobserve(elementRef.current);
      }
    }, options);

    const currentTarget = elementRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [options]);

  return [elementRef, isVisible];
};