import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Workflow, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { smoothScrollTo } from '../../components/common/SmoothScroll';
import FloatingScrollTop from '../../components/common/FloatingScrollTop';

// Assets
import aiPageBg from '../../assets/Ai-Implementations/AI-page-Bg.png';
import vdPageBg from '../../assets/Ai-Implementations/vd-page Background.png';
import agentforceLogo from '../../assets/Ai-Implementations/agentforce logo.png';
import aigencyLogo from '../../assets/Ai-Implementations/aigency-logo-optimized.webp';
import amerpThumbnail from '../../assets/Ai-Implementations/AMERP-Screenshots/AMERPThumbnail.png';
import claudeforceImg from '../../assets/Ai-Implementations/Claudeforce.webp';
import SEO from '../../components/common/SEO';
import { seoRoutes } from '../../utils/seoConfig';

/**
 * Scalable implementation data model.
 * Easy to append new case studies, implementations, and transformation projects.
 */
const implementations = [
  {
    id: 'claudeforce',
    company: 'Claudeforce',
    category: 'AI IMPLEMENTATION · ANTHROPIC CLAUDE + SALESFORCE · MCP',
    pillCategory: 'Claude + Salesforce',
    title: 'Using Claude Effectively Inside Salesforce',
    description:
      'We integrate Anthropic Claude with Salesforce through MCP to bring AI-powered reasoning, automation, and agent capabilities into existing CRM workflows.',
    ctaText: 'View Implementation',
    href: '/ai-implementations/claudeforce',
    isExternal: false,
    image: claudeforceImg,
    isCustomThumbnail: true,
    workflowVisual: 'CRM Trigger / Query → Model Context Protocol (MCP) → Claude Reasoning → Automated Salesforce Action',
    badge: 'Enterprise Integration',
  },
  {
    id: 'vd-projekte',
    company: 'VD Projekte GmbH',
    category: 'CASE STUDY · AI AUTOMATION · CONSTRUCTION',
    pillCategory: 'AI Automation',
    title: 'AI-Powered Quote Automation',
    description:
      'Turned a manual construction quotation process into an AI-assisted workflow that researches material requirements, generates quote line items, and routes the result for manager approval.',
    ctaText: 'View Case Study',
    href: '/ai-implementations/vd-projekte',
    isExternal: false,
    image: vdPageBg,
    workflowVisual: 'Construction Inquiry → AI Research → Quantity Estimation → Quote Approval',
    badge: 'Case Study',
  },
  {
    id: 'arrayminds-erp',
    company: 'ArrayMinds ERP',
    category: 'AI IMPLEMENTATION · AGENTFORCE · MANUFACTURING',
    pillCategory: 'AI + ERP',
    title: 'AI-Powered Manufacturing & Production Planning',
    description:
      'Used Agentforce to simplify and automate manufacturing and production planning — connecting demand, inventory, materials, and production decisions inside the ERP workflow.',
    ctaText: 'View Implementation',
    href: '/ai-implementations/agentforce',
    isExternal: false,
    image: amerpThumbnail,
    isCustomThumbnail: true,
    workflowVisual: 'Demand Signals → Agentforce Planning → Materials → Production',
    badge: 'AI Implementation',
  },
  {
    id: 'aigency-global',
    company: 'AiGency Global',
    category: 'AI IMPLEMENTATION · STRATEGIC DELIVERY PARTNER · AI AGENTS',
    pillCategory: 'Strategic Partner',
    title: 'Building the AI Workforce Behind AiGency',
    description:
      'How ArrayMinds works with AiGency Global as the technical delivery and implementation partner — designing and building AI agents, automations, and system integrations.',
    ctaText: 'View Case Study',
    href: '/ai-implementations/aigency',
    isExternal: false,
    image: aigencyLogo,
    isLogoHero: true,
    workflowVisual: 'AiGency Strategy → ArrayMinds AI Engineering → Business Systems → Production Workflows',
    badge: 'Partnership Case Study',
  },
];

const categories = ['All Solutions', 'Claude + Salesforce', 'AI Automation', 'AI + ERP', 'Strategic Partner'];

const AIImplementations = () => {
  const containerRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All Solutions');

  const filteredImplementations = implementations.filter((item) => {
    if (selectedCategory === 'All Solutions') return true;
    return item.pillCategory === selectedCategory;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Elements Entrance
      gsap.fromTo(
        '.gsap-ai-hero-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Showcase Frame Reveal
      gsap.fromTo(
        '.gsap-ai-showcase-frame',
        { opacity: 0, scale: 0.96, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.9, delay: 0.35, ease: 'power2.out', clearProps: 'all' }
      );

      // 3. Grid Cards Stagger Reveal
      gsap.fromTo(
        '.gsap-ai-card',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#implementations',
            start: 'top 85%',
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070B19] text-white flex flex-col selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA]">
      <SEO {...seoRoutes.aiImplementations} />
      
      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-white/[0.06]">
        {/* Background Image Ambient Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={aiPageBg} 
            alt="AI Implementations Background" 
            className="w-full h-full object-cover object-top opacity-20 filter blur-[2px]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/70 via-[#070B19]/90 to-[#070B19]" />
        </div>

        {/* Subtle Ambient Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-[#00C2CB]/15 via-[#1B3B6F]/25 to-blue-900/15 blur-[140px] rounded-full pointer-events-none z-0" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow badge */}
          <div className="gsap-ai-hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00C2CB]/30 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#7FE4EA] uppercase">
              AI IMPLEMENTATIONS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="gsap-ai-hero-item text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Real AI. Real Business Problems.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              Real Implementations.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="gsap-ai-hero-item mt-6 text-base sm:text-lg md:text-xl text-[#C7CDDA] max-w-2xl mx-auto font-normal leading-relaxed">
            Explore AI implementations where ArrayMinds turns real business challenges into intelligent, production-ready workflows.
          </p>

          {/* Hero Action Buttons with Smooth Scroll */}
          <div className="gsap-ai-hero-item mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => smoothScrollTo('#implementations')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-300 shadow-xl shadow-[#00C2CB]/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Implementations</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#C7CDDA] hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
            >
              <span>Talk to Our AI Engineers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured Implementation Visual Showcase Frame */}
          <div className="gsap-ai-showcase-frame mt-12 max-w-5xl mx-auto rounded-2xl bg-[#0D152E]/90 border border-white/[0.12] p-2.5 sm:p-4 shadow-2xl overflow-hidden backdrop-blur-xl">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-3 bg-[#0A1024] rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-[#8A99B5] ml-2">
                  ArrayMinds AI Implementations — Production Ecosystem
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30">
                  Live Workflows
                </span>
              </div>
            </div>

            {/* Implementation Image Showcase */}
            <div className="relative rounded-xl overflow-hidden bg-black/60 shadow-inner">
              <img
                src={aiPageBg}
                alt="ArrayMinds AI Implementations Architecture & Workflows"
                className="w-full h-auto object-cover max-h-[580px]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          2. SELECTED IMPLEMENTATIONS (3-CARD GRID)
          ================================================== */}
      <section id="implementations" className="py-16 md:py-24 relative flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Intro */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#00C2CB]" />
                <h2 className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                  Featured Work
                </h2>
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                Selected AI Implementations
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#94A3B8] max-w-2xl leading-relaxed">
                From intelligent agents to workflow automation, we build AI directly into the systems businesses already depend on.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#00C2CB] text-[#032B2E] shadow-md shadow-[#00C2CB]/20 font-bold scale-105'
                        : 'bg-white/[0.05] text-[#C7CDDA] hover:text-white hover:bg-white/[0.1] border border-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Card Portfolio Grid (Desktop: 3-col, Tablet: 2-col, Mobile: 1-col) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {filteredImplementations.map((item) => {
              const CardWrapper = item.isExternal ? 'a' : Link;
              const linkProps = item.isExternal
                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                : { to: item.href };

              return (
                <CardWrapper
                  key={item.id}
                  {...linkProps}
                  className="gsap-ai-card group flex flex-col rounded-2xl bg-[#0D152E]/80 hover:bg-[#101B3A] border border-white/[0.1] hover:border-[#00C2CB]/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#00C2CB]/10 overflow-hidden text-left transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/50"
                >
                  
                  {/* Visual Media Header */}
                  <div className="relative w-full h-52 sm:h-56 bg-[#090E20] border-b border-white/[0.08] overflow-hidden flex items-center justify-center p-3 sm:p-4">
                    {item.isCustomThumbnail ? (
                      /* Dedicated Designed Card Thumbnail */
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40 border border-white/[0.06] flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    ) : item.isLogoHero ? (
                      /* Clean Platform Graphic for AiGency */
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.05]">
                        <img 
                          src={item.image} 
                          alt={item.company}
                          className="max-h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-110 filter drop-shadow-md"
                        />
                        <div className="mt-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" />
                          <span className="text-[10px] font-medium text-[#C7CDDA] tracking-wider uppercase">
                            AI Platform Evolution
                          </span>
                        </div>
                      </div>
                    ) : (
                      /* Implementation Screenshot with subtle zoom */
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40 border border-white/[0.06]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#090E20] via-transparent to-black/20" />
                        
                        {/* Optional Overlay Logo badge */}
                        {item.logoOverlay && (
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-[#0A1128]/90 border border-white/15 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                            <img src={item.logoOverlay} alt="Agentforce" className="h-3.5 w-auto object-contain" />
                            <span className="text-[10px] font-semibold text-white tracking-wide">Agentforce</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Top Badge (when not custom thumbnail) */}
                    {!item.isCustomThumbnail && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0A1128]/90 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[#7FE4EA]">
                          {item.pillCategory}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category metadata */}
                      <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#00C2CB] uppercase mb-1.5">
                        {item.category}
                      </p>

                      {/* Company Name */}
                      <p className="text-xs sm:text-sm font-semibold text-[#8A99B5] mb-2">
                        {item.company}
                      </p>

                      {/* Title */}
                      <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#7FE4EA] transition-colors mb-3">
                        {item.title}
                      </h4>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#A0ABC0] leading-relaxed line-clamp-3 mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* CTA Footer */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between mt-auto">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#7FE4EA] group-hover:text-[#00C2CB] transition-colors">
                        <span>{item.ctaText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                      {item.isExternal ? (
                        <span className="text-[10px] font-medium text-[#64748B] uppercase tracking-wider">
                          Opens new tab ↗
                        </span>
                      ) : (
                        <span className="text-[10px] font-medium text-[#8A99B5] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08]">
                          {item.badge || 'Project'}
                        </span>
                      )}
                    </div>

                  </div>

                </CardWrapper>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          3. BOTTOM CTA
          ================================================== */}
      <section id="cta" className="py-16 md:py-20 bg-gradient-to-b from-[#070B19] via-[#0A1128] to-[#0D1B3E] border-t border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Have a workflow worth automating?
          </h2>
          
          <p className="mt-3 text-base sm:text-lg text-[#C7CDDA] max-w-xl mx-auto">
            Let's turn it into an AI implementation.
          </p>

          <div className="mt-8 flex items-center justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-200 shadow-xl shadow-[#00C2CB]/20 hover:scale-105 active:scale-95"
            >
              <span>Talk to ArrayMinds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* Floating Smooth Scroll to Top */}
      <FloatingScrollTop />

    </div>
  );
};

export default AIImplementations;
