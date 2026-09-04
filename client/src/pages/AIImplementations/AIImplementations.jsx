import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowRight, 
  Sparkles, 
  Bot, 
  Workflow, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

// Assets
import vdPageBg from '../../assets/Ai-Implementations/vd-page Background.png';
import agentforceLogo from '../../assets/Ai-Implementations/agentforce logo.png';
import aigencyLogo from '../../assets/Ai-Implementations/aigency-logo-optimized.webp';
import erpPlanningImg from '../../assets/ERP-Project/13_hero_manufacturing_planning.png';

/**
 * Scalable implementation data model.
 * Easy to append new case studies, implementations, and transformation projects.
 */
const implementations = [
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
    image: erpPlanningImg,
    logoOverlay: agentforceLogo,
    workflowVisual: 'Demand Signals → Agentforce Planning → Materials → Production',
    badge: 'AI Implementation',
  },
  {
    id: 'aigency-global',
    company: 'AiGency Global',
    category: 'AI TRANSFORMATION · AI AGENTS · AUTOMATION',
    pillCategory: 'AI Transformation',
    title: 'Taking an AI Platform to the Next Level',
    description:
      'Worked with AiGency Global to evolve its AI operating model and strengthen how AI agents, workflows, and business systems work together.',
    ctaText: 'View Implementation',
    href: '/ai-implementations/aigency',
    isExternal: false,
    image: aigencyLogo,
    isLogoHero: true,
    workflowVisual: 'AI Agents → Business Workflows → Enterprise Systems → Execution',
    badge: 'AI Transformation',
  },
];

const AIImplementations = () => {
  return (
    <div className="min-h-screen bg-[#070B19] text-white flex flex-col selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA]">
      
      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden border-b border-white/[0.06]">
        {/* Subtle Ambient Background */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-[#00C2CB]/15 via-[#1B3B6F]/25 to-blue-900/15 blur-[140px] rounded-full pointer-events-none -z-0" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00C2CB]/30 backdrop-blur-md mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#7FE4EA] uppercase">
              AI IMPLEMENTATIONS
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
            Real AI. Real Business Problems.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              Real Implementations.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#C7CDDA] max-w-2xl mx-auto font-normal leading-relaxed">
            Explore AI implementations where ArrayMinds turns real business challenges into intelligent, production-ready workflows.
          </p>

        </div>
      </section>

      {/* ==================================================
          2. SELECTED IMPLEMENTATIONS (3-CARD GRID)
          ================================================== */}
      <section className="py-16 md:py-24 relative flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading & Intro */}
          <div className="mb-12 md:mb-16">
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

          {/* 3-Card Portfolio Grid (Desktop: 3-col, Tablet: 2-col, Mobile: 1-col) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {implementations.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl bg-[#0D152E]/80 hover:bg-[#101B3A] border border-white/[0.1] hover:border-[#00C2CB]/50 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[#00C2CB]/10 overflow-hidden text-left transform hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-[#00C2CB]/50"
              >
                
                {/* Visual Media Header */}
                <div className="relative w-full h-52 sm:h-56 bg-[#090E20] border-b border-white/[0.08] overflow-hidden flex items-center justify-center p-4">
                  {item.isLogoHero ? (
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

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#0A1128]/90 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#7FE4EA]">
                      {item.pillCategory}
                    </span>
                  </div>
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
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                    <span className="text-[10px] font-medium text-[#64748B] uppercase tracking-wider">
                      Opens new tab ↗
                    </span>
                  </div>

                </div>

              </a>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          3. BOTTOM CTA
          ================================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-[#070B19] via-[#0A1128] to-[#0D1B3E] border-t border-white/[0.08]">
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

    </div>
  );
};

export default AIImplementations;
