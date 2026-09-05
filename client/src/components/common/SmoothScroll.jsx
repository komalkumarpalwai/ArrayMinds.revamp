import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

let lenisInstance = null;

export const getLenis = () => lenisInstance;

/**
 * Universal smooth scroll helper function
 * @param {string|number|HTMLElement} target - CSS selector, pixel offset, or DOM element
 * @param {Object} options - Options including offset, duration, immediate, easing
 */
export const smoothScrollTo = (target, options = {}) => {
  const { offset = -85, duration = 1.2, immediate = false } = options;
  const lenis = getLenis();

  if (lenis) {
    lenis.scrollTo(target, { offset, duration, immediate });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: immediate ? 'auto' : 'smooth' });
    } else {
      const element = typeof target === 'string' ? document.querySelector(target) : target;
      if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset + offset;
        window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
      }
    }
  }
};

const SmoothScroll = ({ children }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Initialize Lenis with modern fluid physics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisInstance = lenis;

    let animationFrameId;

    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    // Global anchor link smooth scroll handler for #hash links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href*="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Handle pure hash links like href="#section"
      if (href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          smoothScrollTo(targetElement, { offset: -85 });
          window.history.pushState(null, '', href);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // On page change or hash change, handle scroll
  useEffect(() => {
    if (hash) {
      // Delay slightly to let the target page DOM render
      const timer = setTimeout(() => {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
          smoothScrollTo(targetElement, { offset: -85 });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return <>{children}</>;
};

export default SmoothScroll;

