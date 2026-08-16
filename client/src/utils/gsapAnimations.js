import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

/**
 * Animate elements on initial page load (hero entrance)
 */
export const animatePageHero = (containerRef) => {
  if (!containerRef || !containerRef.current) return;

  const ctx = gsap.context(() => {
    gsap.from('.gsap-hero-badge', {
      opacity: 0,
      y: -25,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.gsap-hero-title', {
      opacity: 0,
      y: 35,
      duration: 1,
      delay: 0.2,
      ease: 'power3.out',
    });

    gsap.from('.gsap-hero-sub', {
      opacity: 0,
      y: 25,
      duration: 0.9,
      delay: 0.4,
      ease: 'power3.out',
    });

    gsap.from('.gsap-hero-cta', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 0.6,
      ease: 'back.out(1.7)',
    });
  }, containerRef);

  return () => ctx.revert();
};

/**
 * Stagger animate cards as they enter the viewport
 */
export const animateCardGrid = (containerRef, cardSelector = '.gsap-card') => {
  if (!containerRef || !containerRef.current) return;

  const ctx = gsap.context(() => {
    gsap.from(cardSelector, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power3.out',
    });
  }, containerRef);

  return () => ctx.revert();
};

/**
 * Smooth scroll-in reveal for section blocks
 */
export const animateSectionReveal = (sectionRef) => {
  if (!sectionRef || !sectionRef.current) return;

  const ctx = gsap.context(() => {
    gsap.from(sectionRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
    });
  }, sectionRef);

  return () => ctx.revert();
};

export default gsap;
