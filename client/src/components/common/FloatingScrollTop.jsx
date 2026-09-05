import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { smoothScrollTo } from './SmoothScroll';

/**
 * Sleek, modern floating back-to-top button with scroll progress ring
 */
const FloatingScrollTop = ({ threshold = 300 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      setIsVisible(scrollTop > threshold);
      
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    smoothScrollTo(0, { duration: 1.2 });
  };

  if (!isVisible) return null;

  // Calculate circle circumference for SVG progress
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-8 right-8 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="relative group p-3.5 rounded-full bg-[#0A1128]/90 text-[#7FE4EA] hover:text-white border border-[#00C2CB]/40 hover:border-[#00C2CB] shadow-xl shadow-cyan-950/60 backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/50"
      >
        {/* Circular Progress SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-0.5"
          viewBox="0 0 44 44"
        >
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-white/10"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-[#00C2CB] transition-all duration-150 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <ArrowUp className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
};

export default FloatingScrollTop;
