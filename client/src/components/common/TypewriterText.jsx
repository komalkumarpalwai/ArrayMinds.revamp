import React, { useState, useEffect } from 'react';

/**
 * Ultra-Smooth Cinematic Typewriter Component
 * Features organic velocity curves, smooth character pacing, and a glowing cyan cursor.
 */
const TypewriterText = ({
  words = [
    'Salesforce & Agentforce AI.',
    'Databricks & Lakehouse BI.',
    'Enterprise AI Automation.',
    'Retail & Cloud Architecture.'
  ],
  typingSpeed = 65,
  deletingSpeed = 30,
  pauseTime = 2400,
  className = "",
  cursorClassName = "text-[#00C2CB]"
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex] || '';
    let timeout;

    if (!isDeleting && currentText === word) {
      // Completed typing full phrase: pause comfortably
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (isDeleting && currentText === '') {
      // Completed deletion: brief pause before starting next word
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 350);
    } else {
      // Calculate dynamic smooth typing speed (natural humanized cadence)
      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting) {
        const lastChar = word.charAt(currentText.length - 1);
        // Subtle micro-pause after spaces or punctuation for natural flow
        if (lastChar === ' ' || lastChar === '&' || lastChar === ',') {
          speed += 40;
        } else if (lastChar === '.') {
          speed += 80;
        }
      }

      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? word.substring(0, prev.length - 1)
            : word.substring(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`inline-flex items-center select-none ${className}`}>
      <span className="tracking-tight transition-all duration-75">
        {currentText}
      </span>
      <span
        className={`ml-1 inline-block font-mono font-normal transition-opacity duration-300 ${cursorClassName}`}
        style={{
          filter: 'drop-shadow(0 0 8px rgba(0, 194, 203, 0.8))',
          animation: 'cursorBlink 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite'
        }}
        aria-hidden="true"
      >
        |
      </span>
    </span>
  );
};

export default TypewriterText;
