import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  Network, 
  Workflow, 
  ShieldCheck, 
  ExternalLink,
  Layers,
  Cpu,
  Database,
  Terminal,
  Zap,
  Check,
  X,
  Users,
  Building2,
  ArrowUpRight,
  GitBranch,
  Radio,
  Sliders,
  Maximize2,
  Lock,
  Mail,
  MessageSquare,
  Share2,
  Activity,
  Server,
  FileCode,
  LineChart,
  ChevronDown
} from 'lucide-react';
import { smoothScrollTo, getLenis } from '../../components/common/SmoothScroll';
import FloatingScrollTop from '../../components/common/FloatingScrollTop';

// Assets
import aigencyLogo from '../../assets/Ai-Implementations/aigency-logo-optimized.webp';
import arrayMindsLogo from '../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';
import openclawLogo from '../../assets/Ai-Implementations/openclaw.webp';
import aigencyBgVideo from '../../assets/Ai-Implementations/Aiagency-bg-video.mp4';
import SEO from '../../components/common/SEO';
import { seoRoutes } from '../../utils/seoConfig';

const AiGency = () => {
  const containerRef = useRef(null);
  const modalContentRef = useRef(null);
  // Active implementation detail modal / expand state
  const [selectedImpl, setSelectedImpl] = useState(null);

  // Auto-scroll to popup and manage scroll locking
  useEffect(() => {
    const lenis = getLenis();
    if (selectedImpl) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();

      // Smoothly auto-scroll viewport and popup into center view
      requestAnimationFrame(() => {
        if (modalContentRef.current) {
          modalContentRef.current.scrollTop = 0;
          modalContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [selectedImpl]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImpl) {
        setSelectedImpl(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImpl]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Elements Entrance
      gsap.fromTo(
        '.gsap-aigency-hero-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Partnership 4-Stage Pipeline Cards
      gsap.fromTo(
        '.gsap-aigency-partner-step',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#partnership',
            start: 'top 85%'
          }
        }
      );

      // 3. Problem Section Cluster
      gsap.fromTo(
        '.gsap-aigency-problem-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#problem',
            start: 'top 85%'
          }
        }
      );

      // 4. Technical Capabilities Cards
      gsap.fromTo(
        '.gsap-aigency-cap-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#capabilities',
            start: 'top 85%'
          }
        }
      );

      // 5. Implementation Showcase Cards
      gsap.fromTo(
        '.gsap-aigency-impl-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#implementations',
            start: 'top 85%'
          }
        }
      );

      // 6. Architecture 7-Step Horizontal Flow
      gsap.fromTo(
        '.gsap-aigency-arch-step',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#architecture',
            start: 'top 85%'
          }
        }
      );

      // 7. Ecosystem Tools
      gsap.fromTo(
        '.gsap-aigency-eco-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#ecosystem',
            start: 'top 85%'
          }
        }
      );

      // 8. Governance Columns
      gsap.fromTo(
        '.gsap-aigency-gov-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#governance',
            start: 'top 85%'
          }
        }
      );

      // 9. Delivery 5-Stage Lifecycle
      gsap.fromTo(
        '.gsap-aigency-delivery-step',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#delivery',
            start: 'top 85%'
          }
        }
      );

      // 10. Value Collaborative Block
      gsap.fromTo(
        '.gsap-aigency-value-box',
        { opacity: 0, scale: 0.98, y: 25 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#value',
            start: 'top 85%'
          }
        }
      );

      // 11. Final CTA
      gsap.fromTo(
        '.gsap-aigency-cta',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#cta',
            start: 'top 85%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Real implementation showcase projects (extensible data structure)
  const implementationProjects = [
    {
      id: 'hubspot-automation',
      title: 'HubSpot + AI Automation',
      category: 'AI SALES · MARKETING AUTOMATION',
      tag: 'CRM & Pipeline',
      description: 'Connected AI agents with HubSpot to automate marketing and sales workflows with minimal manual intervention.',
      deliverables: [
        'Automated lead qualification & enrichment via HubSpot API',
        'Dynamic CRM stage progression triggered by buyer intent signals',
        'Personalized multi-channel follow-up generation with guardrails'
      ],
      systems: ['HubSpot CRM', 'Claude 3.5 Sonnet', 'Webhook Dispatcher', 'Email Gateway'],
      architectureType: 'Bidirectional CRM Sync',
      externalUrl: 'https://aigency.global/'
    },
    {
      id: 'agent-workforce',
      title: 'AI Agent Workforce',
      category: 'AI AGENTS · BUSINESS AUTOMATION',
      tag: 'Role-Based Agents',
      description: 'Designed and built multiple AI agents around specific business roles, workflows and operational requirements.',
      deliverables: [
        'Domain-specialized agents (Research, Outreach, Operations, Invoicing)',
        'Deterministic state machine for multi-agent delegation & handoffs',
        'Persistent memory & session context retention across workflow steps'
      ],
      systems: ['Custom Agent Framework', 'Vector Embeddings', 'Operational Router', 'Slack Bot'],
      architectureType: 'Multi-Agent Orchestration',
      externalUrl: 'https://aigency.global/'
    },
    {
      id: 'openclaw-automation',
      title: 'OpenClaw + Business Automation',
      category: 'AI AUTOMATION · OPENCLAW',
      tag: 'Autonomous Execution',
      description: 'Connected AI-driven workflows with business systems to automate repetitive execution across marketing and sales operations.',
      deliverables: [
        'OpenClaw execution pipelines tied to real-time marketing triggers',
        'End-to-end task routing without manual copy-pasting across apps',
        'Automated status logging, telemetry, and fallback error handling'
      ],
      systems: ['OpenClaw Engine', 'CRM Connector', 'Task Queue', 'Notification Node'],
      architectureType: 'Trigger-to-Action Pipeline',
      externalUrl: 'https://aigency.global/'
    },
    {
      id: 'revops-automation',
      title: 'Sales & Marketing Operations',
      category: 'REVOPS · AI AUTOMATION',
      tag: 'Revenue Operations',
      description: 'Automated repetitive sales and marketing execution so workflows can progress without constant human intervention.',
      deliverables: [
        'Lead ingestion to CRM data normalization within seconds',
        'Automated scoring & assignment to respective account executives',
        'Automated daily pipeline health reporting and anomaly detection'
      ],
      systems: ['Salesforce', 'HubSpot', 'Custom Webhooks', 'Automated Scheduler'],
      architectureType: 'Lead → Agent → CRM → Action',
      externalUrl: 'https://aigency.global/'
    },
    {
      id: 'custom-mcp-integrations',
      title: 'Custom AI Integrations',
      category: 'AI INTEGRATION · MCP · WORKFLOWS',
      tag: 'Tool Connectivity',
      description: 'Built custom integrations and tool-connected AI workflows around the systems used by each client.',
      deliverables: [
        'Model Context Protocol (MCP) server integration for proprietary databases',
        'Sandboxed tool execution layers with role-based authorization',
        'Unified API connector bridging legacy SQL systems to modern LLMs'
      ],
      systems: ['MCP Protocol', 'Internal SQL Databases', 'REST APIs', 'Cloud Functions'],
      architectureType: 'MCP Tool Gateway',
      externalUrl: 'https://aigency.global/'
    }
  ];

  // Systems & Tech ecosystem
  const techEcosystem = [
    { name: 'HubSpot', role: 'CRM & Marketing Suite', badge: 'CRM' },
    { name: 'Salesforce', role: 'Enterprise Cloud CRM', badge: 'Enterprise' },
    { name: 'OpenClaw', role: 'Automation Engine', badge: 'Automation' },
    { name: 'Claude', role: 'Reasoning & Intelligence', badge: 'LLM Engine' },
    { name: 'MCP', role: 'Model Context Protocol Tools', badge: 'Tool Access' },
    { name: 'Slack', role: 'Human Review & Alerts', badge: 'Comms' },
    { name: 'WhatsApp', role: 'Direct Messaging Gateway', badge: 'Messaging' },
    { name: 'Email', role: 'Inbound & Outbound Sync', badge: 'Email' },
    { name: 'Internal Systems', role: 'Custom Client Databases & ERP', badge: 'Data' }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070B19] text-white selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA] relative overflow-x-hidden">
      <SEO {...seoRoutes.aigency} />
      
      {/* Background Video Layer - Full Frame with Symmetrical Cinematic Edge Fades */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-75 filter brightness-105 contrast-105 saturate-110"
        >
          <source src={aigencyBgVideo} type="video/mp4" />
        </video>

        {/* 1. Global Ambient Base Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/55 via-[#0A1128]/65 to-[#070B19]/80" />

        {/* 2. Symmetrical Left & Right Cinematic Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-[#070B19] via-[#070B19]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-[#070B19] via-[#070B19]/70 to-transparent" />

        {/* 3. Soft Radial Vignette for Center Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#070B19_95%)]" />
      </div>
      
      {/* ==================================================
          1. HERO SECTION & STRATEGIC PARTNERSHIP BADGE
          ================================================== */}
      <section id="hero" className="relative z-10 pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden border-b border-white/[0.08]">
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-[#00C2CB]/15 via-[#1B3B6F]/20 to-cyan-500/10 blur-[140px] rounded-full pointer-events-none -z-0" />

        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top navigation back link */}
          <Link
            to="/ai-implementations"
            className="gsap-aigency-hero-item inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A99B5] hover:text-[#7FE4EA] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to AI Implementations</span>
          </Link>

          {/* Strategic Partnership Header Pill: ArrayMinds x AiGency Global */}
          <div className="gsap-aigency-hero-item flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-[#00C2CB]/30 backdrop-blur-md shadow-sm">
              <div className="flex items-center gap-2">
                <img 
                  src={arrayMindsLogo} 
                  alt="Array Minds" 
                  className="h-4 sm:h-5 w-auto object-contain"
                />
                <span className="text-xs sm:text-sm font-bold text-white tracking-wide">Array Minds</span>
              </div>
              <span className="text-[#00C2CB] font-bold text-sm">×</span>
              <div className="flex items-center gap-2">
                <img 
                  src={aigencyLogo} 
                  alt="AiGency Global" 
                  className="h-4 sm:h-5 w-auto object-contain brightness-110"
                />
                <span className="text-xs sm:text-sm font-bold text-[#7FE4EA] tracking-wide">AiGency Global</span>
              </div>
            </div>

            <span className="px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-bold bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30 uppercase tracking-wider">
              AI IMPLEMENTATION · STRATEGIC DELIVERY PARTNER · AI AGENTS
            </span>
          </div>

          {/* Main Hero Title */}
          <h1 className="gsap-aigency-hero-item text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.12] max-w-4xl">
            Building the AI Workforce Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              AiGency
            </span>
          </h1>

          {/* Subtitle */}
          <p className="gsap-aigency-hero-item mt-6 text-base sm:text-xl text-[#C7CDDA] max-w-3xl leading-relaxed font-normal">
            How ArrayMinds works with AiGency Global to design, build and deploy AI-powered business workflows across CRM, marketing, sales and operations.
          </p>

          {/* Value Highlights Strip */}
          <div className="gsap-aigency-hero-item mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="p-3.5 rounded-xl bg-[#0D152E]/80 border border-white/[0.08] text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#7FE4EA] block">AI Agents</span>
              <span className="text-xs text-[#94A3B8] mt-0.5 block">Role-Specialized</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D152E]/80 border border-white/[0.08] text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#7FE4EA] block">Automation</span>
              <span className="text-xs text-[#94A3B8] mt-0.5 block">Zero Busywork</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D152E]/80 border border-white/[0.08] text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#7FE4EA] block">Integrations</span>
              <span className="text-xs text-[#94A3B8] mt-0.5 block">CRM & Systems</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0D152E]/80 border border-white/[0.08] text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#7FE4EA] block">Workflows</span>
              <span className="text-xs text-[#94A3B8] mt-0.5 block">End-to-End Execution</span>
            </div>
          </div>

          {/* Hero CTAs with Smooth Scroll */}
          <div className="gsap-aigency-hero-item mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => smoothScrollTo('#implementations')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all shadow-lg shadow-[#00C2CB]/20 hover:scale-[1.03] active:scale-95 cursor-pointer"
            >
              <span>Explore Deliveries</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
            <a
              href="https://aigency.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white/90 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 transition-all"
            >
              <span>Visit AiGency Global</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00C2CB]" />
            </a>
          </div>

        </div>
      </section>


      {/* ==================================================
          2. THE PARTNERSHIP
          ================================================== */}
      <section id="partnership" className="py-16 md:py-24 border-b border-white/[0.08] relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              Strategic Delivery Model
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              From AI Projects to Production Systems
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              AiGency Global brings real business opportunities and client requirements. ArrayMinds provides the technical implementation layer—designing and building the integrations, AI agents, workflows and supporting systems needed to turn those requirements into working solutions.
            </p>
          </div>

          {/* Visual Architecture Flow: Client Need -> AiGency -> ArrayMinds -> Production */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0D152E]/90 border border-white/[0.1] shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
              
              {/* Step 1 */}
              <div className="gsap-aigency-partner-step p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between relative group hover:border-[#00C2CB]/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#8A99B5] tracking-wider uppercase">Stage 01</span>
                    <Building2 className="w-4 h-4 text-[#8A99B5]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">Client Need</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    Business challenges, high manual overhead, or CRM scaling friction.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-[#7FE4EA] font-semibold">
                  Origin of Project
                </div>
              </div>

              {/* Step 2 */}
              <div className="gsap-aigency-partner-step p-5 rounded-xl bg-[#00C2CB]/5 border border-[#00C2CB]/20 flex flex-col justify-between relative group hover:border-[#00C2CB]/50 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#00C2CB] tracking-wider uppercase">Stage 02</span>
                    <Users className="w-4 h-4 text-[#00C2CB]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">AiGency Global</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    Client relationships, business requirements, and strategic workflow scope.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#00C2CB]/20 text-[11px] text-[#00C2CB] font-semibold">
                  Business & Strategy
                </div>
              </div>

              {/* Step 3 */}
              <div className="gsap-aigency-partner-step p-5 rounded-xl bg-gradient-to-b from-[#00C2CB]/10 to-transparent border border-[#00C2CB]/40 flex flex-col justify-between relative shadow-lg shadow-[#00C2CB]/5">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#7FE4EA] tracking-wider uppercase">Stage 03</span>
                    <Cpu className="w-4 h-4 text-[#7FE4EA]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">ArrayMinds</h3>
                  <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                    AI engineering, custom agent development, tool integrations & execution pipelines.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#00C2CB]/30 text-[11px] text-[#7FE4EA] font-semibold">
                  Engineering & Implementation
                </div>
              </div>

              {/* Step 4 */}
              <div className="gsap-aigency-partner-step p-5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between relative group hover:border-emerald-400/40 transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-emerald-400 tracking-wider uppercase">Stage 04</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">Production Workflow</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    Connected to the client's existing business systems, running in live operation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/[0.06] text-[11px] text-emerald-400 font-semibold">
                  Operational AI Solution
                </div>
              </div>

            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8A99B5]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Deterministic, verified engineering delivery layer
              </span>
              <span className="text-white/60">
                Seamless collaboration between strategic advisory & deep technical execution
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          3. THE PROBLEM
          ================================================== */}
      <section id="problem" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08] bg-[#0A1128]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              The Implementation Reality
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Is Only Useful When It Can Actually Do the Work
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              Businesses already have systems, data, and processes. The challenge is not simply adding another isolated AI chatbot. The real challenge is connecting AI agents directly to the software and systems where daily business work already happens.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Business Systems Cluster */}
            <div className="gsap-aigency-problem-box lg:col-span-6 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A99B5] mb-4">
                Where Business Work Already Happens:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { name: 'CRM', desc: 'Leads & Deals', icon: <Database className="w-4 h-4 text-[#00C2CB]" /> },
                  { name: 'MARKETING', desc: 'Campaigns & Content', icon: <Share2 className="w-4 h-4 text-[#7FE4EA]" /> },
                  { name: 'SALES', desc: 'Outreach & Pipelines', icon: <LineChart className="w-4 h-4 text-cyan-300" /> },
                  { name: 'OPERATIONS', desc: 'Tasks & Logistics', icon: <Workflow className="w-4 h-4 text-indigo-400" /> },
                  { name: 'COMMUNICATION', desc: 'Slack, Email, WhatsApp', icon: <MessageSquare className="w-4 h-4 text-emerald-400" /> },
                  { name: 'DATA', desc: 'Databases & Schemas', icon: <Server className="w-4 h-4 text-amber-400" /> }
                ].map((item) => (
                  <div key={item.name} className="p-4 rounded-xl bg-[#0D152E]/85 border border-white/[0.08] hover:border-white/20 transition-all backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-1.5">
                      {item.icon}
                      <span className="text-xs font-bold text-white tracking-wide">{item.name}</span>
                    </div>
                    <span className="text-[11px] text-[#8A99B5]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection Bridge Visual */}
            <div className="gsap-aigency-problem-box lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#0D152E]/90 to-[#131F42]/90 border border-[#00C2CB]/30 shadow-2xl backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="p-2 rounded-lg bg-[#00C2CB]/10 text-[#00C2CB]">
                  <Zap className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">The Integration Bridge</h3>
                  <p className="text-xs text-[#8A99B5]">Connecting intelligence with execution</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#070B19]/80 border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#7FE4EA]">AI AGENTS</span>
                  <span className="text-[#8A99B5]">↔ Tool APIs & Protocols ↔</span>
                  <span className="font-bold text-white">EXISTING BUSINESS SYSTEMS</span>
                </div>
                
                <div className="h-2 w-full bg-white/[0.05] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#00C2CB] to-[#7FE4EA] w-full animate-pulse" />
                </div>

                <p className="text-xs text-[#C7CDDA] leading-relaxed">
                  Instead of forcing teams to learn new standalone interfaces, ArrayMinds embeds autonomous execution directly into the CRM, messaging channels, and operational backends your team already relies on.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          4. WHAT ARRAYMINDS BUILDS
          ================================================== */}
      <section id="capabilities" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              Technical Capabilities
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Engineering AI Into the Existing Workflow
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              We design and engineer specialized technical components that bridge abstract language models with deterministic business operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Area 1: AI Agents */}
            <div className="gsap-aigency-cap-card p-6 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-[#00C2CB]/10 border border-[#00C2CB]/20 w-fit text-[#00C2CB] mb-4">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">AI Agents</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Custom agents designed around specific business roles and workflows, equipped with explicit system prompts and stateful memory.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-semibold text-[#7FE4EA]">
                Role-Specialized Logic
              </div>
            </div>

            {/* Area 2: CRM Integrations */}
            <div className="gsap-aigency-cap-card p-6 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 w-fit text-cyan-400 mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">CRM Integrations</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Connecting AI agents directly with platforms such as HubSpot and Salesforce to read context, update records, and log activities.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-semibold text-cyan-300">
                HubSpot & Salesforce APIs
              </div>
            </div>

            {/* Area 3: Workflow Automation */}
            <div className="gsap-aigency-cap-card p-6 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 w-fit text-indigo-400 mb-4">
                  <Workflow className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Workflow Automation</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Automating repetitive marketing, sales, and operational processes so requests move forward without manual bottlenecking.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-semibold text-indigo-300">
                Deterministic Pipelines
              </div>
            </div>

            {/* Area 4: Tool & System Connectivity */}
            <div className="gsap-aigency-cap-card p-6 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 w-fit text-emerald-400 mb-4">
                  <Network className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Tool & System Connectivity</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Using robust integration layers and MCP-based tool access where required to query live databases, web services, and internal APIs.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-semibold text-emerald-300">
                MCP & REST Interfaces
              </div>
            </div>

            {/* Area 5: Custom AI Skills */}
            <div className="gsap-aigency-cap-card p-6 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between lg:col-span-2">
              <div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 w-fit text-amber-400 mb-4">
                  <FileCode className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Custom AI Skills</h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  Building reusable domain-specific skills and tool definitions that allow AI agents to perform actual business tasks—such as parsing quotation specifications, calculating volume pricing, and formatting executive summaries.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-white/[0.06] text-xs font-semibold text-amber-300">
                Reusable Business Skill Modules
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          5. IMPLEMENTATION SHOWCASE (GRID OF REAL CARDS)
          ================================================== */}
      <section id="implementations" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08] bg-[#0A1128]/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
                Production Deliveries
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                AI Implementations Delivered With AiGency
              </h2>
              <p className="mt-3 text-base text-[#C7CDDA] max-w-2xl">
                A selection of real implementation projects engineered by ArrayMinds to power AiGency client engagements.
              </p>
            </div>
            <div className="text-xs text-[#8A99B5] font-mono">
              [ 05 Implementations Documented ]
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {implementationProjects.map((item, idx) => (
              <div 
                key={item.id}
                className="gsap-aigency-impl-card rounded-2xl bg-[#0D152E]/90 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/50 transition-all flex flex-col justify-between overflow-hidden group shadow-lg"
              >
                {/* Visual Header / Mockup Banner */}
                <div className="p-5 bg-gradient-to-b from-white/[0.04] to-transparent border-b border-white/[0.06] relative">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/[0.06] text-[#7FE4EA] border border-white/10">
                      Card 0{idx + 1}
                    </span>
                    <span className="text-xs text-[#8A99B5] font-mono">
                      {item.architectureType}
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-[#00C2CB] uppercase tracking-wider mb-1">
                    {item.category}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#7FE4EA] transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                    {item.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-semibold text-[#8A99B5] uppercase tracking-wider">Connected Systems:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.systems.map((sys) => (
                        <span key={sys} className="px-2 py-0.5 rounded text-[11px] bg-white/[0.04] text-[#C7CDDA] border border-white/5">
                          {sys}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedImpl(item)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7FE4EA] hover:text-white transition-colors cursor-pointer"
                    >
                      <span>View Implementation</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>

                    <a
                      href={item.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8A99B5] hover:text-white transition-colors p-1"
                      title="Open project context in new tab"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Interactive Modal / Drawer for Implementation Details */}
          {selectedImpl && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
              onClick={() => setSelectedImpl(null)}
              role="dialog"
              aria-modal="true"
            >
              <div 
                ref={modalContentRef}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#0D152E] border border-[#00C2CB]/40 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
                data-lenis-prevent="true"
              >
                
                <button
                  onClick={() => setSelectedImpl(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-[#8A99B5] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs font-bold text-[#00C2CB] uppercase tracking-wider mb-2">
                  <span>{selectedImpl.category}</span>
                  <span>•</span>
                  <span>{selectedImpl.tag}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  {selectedImpl.title}
                </h3>

                <p className="text-sm text-[#C7CDDA] leading-relaxed mb-6">
                  {selectedImpl.description}
                </p>

                <div className="space-y-4 mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A99B5]">Implementation Highlights:</h4>
                  <ul className="space-y-2">
                    {selectedImpl.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#C7CDDA]">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A99B5] mb-2">Systems Stack:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedImpl.systems.map((s) => (
                      <span key={s} className="px-2.5 py-1 rounded-md text-xs bg-[#00C2CB]/10 text-[#7FE4EA] border border-[#00C2CB]/20 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
                  <a
                    href="https://aigency.global/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all"
                  >
                    <span>View AiGency Showcase</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setSelectedImpl(null)}
                    className="text-xs font-semibold text-[#8A99B5] hover:text-white transition-colors cursor-pointer"
                  >
                    Close Overview
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </section>

      {/* ==================================================
          6. THE AGENT ARCHITECTURE
          ================================================== */}
      <section id="architecture" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              Execution Mechanics
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Agents That Can Actually Execute
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              The goal is not simply to generate AI responses. The agents are designed to understand a business task, access the required tools and systems, perform the necessary actions and return structured output.
            </p>
          </div>

          {/* Stepped Horizontal Architecture Flow */}
          <div className="p-6 sm:p-10 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.1] shadow-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              
              {[
                { step: '01', title: 'BUSINESS EVENT', sub: 'Webhook / Trigger', icon: <Radio className="w-4 h-4 text-[#00C2CB]" /> },
                { step: '02', title: 'AI AGENT', sub: 'Context & Role', icon: <Bot className="w-4 h-4 text-[#7FE4EA]" /> },
                { step: '03', title: 'REASONING', sub: 'Plan & Validate', icon: <Cpu className="w-4 h-4 text-cyan-300" /> },
                { step: '04', title: 'MCP / TOOLS', sub: 'Protocol Access', icon: <Network className="w-4 h-4 text-indigo-400" /> },
                { step: '05', title: 'BUSINESS SYSTEMS', sub: 'CRM / Databases', icon: <Database className="w-4 h-4 text-amber-400" /> },
                { step: '06', title: 'ACTION', sub: 'API Mutation', icon: <Workflow className="w-4 h-4 text-emerald-400" /> },
                { step: '07', title: 'RESULT', sub: 'Structured Output', icon: <CheckCircle2 className="w-4 h-4 text-teal-300" /> }
              ].map((stage) => (
                <div key={stage.title} className="gsap-aigency-arch-step p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between hover:border-[#00C2CB]/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono text-[#8A99B5] font-bold">{stage.step}</span>
                      {stage.icon}
                    </div>
                    <p className="text-xs font-bold text-white leading-tight mb-1">{stage.title}</p>
                  </div>
                  <span className="text-[10px] text-[#94A3B8] font-mono mt-2 block">{stage.sub}</span>
                </div>
              ))}

            </div>

            <div className="mt-8 p-4 rounded-xl bg-[#070B19]/60 border border-white/[0.06] text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
              <strong className="text-white">Deterministic Execution Loop:</strong> When an event occurs (e.g., lead submission, deal change, or invoice upload), the agent initializes with verified enterprise context, selects the appropriate tool via MCP standards, verifies write permissions, and executes deterministic updates.
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          7. REAL SYSTEMS (BUILT AROUND TOOLS USED)
          ================================================== */}
      <section id="ecosystem" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08] bg-[#0A1128]/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              Technology Ecosystem
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built Around the Tools Businesses Already Use
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              We engineer integrations directly into established enterprise platforms so workflows leverage your existing investments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techEcosystem.map((tech) => (
              <div 
                key={tech.name}
                className="gsap-aigency-eco-item p-5 rounded-xl bg-[#0D152E]/90 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-colors flex items-center justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-0.5">{tech.name}</h3>
                  <p className="text-xs text-[#8A99B5]">{tech.role}</p>
                </div>
                <span className="px-2.5 py-1 rounded text-[11px] font-mono font-medium bg-white/[0.04] text-[#7FE4EA] border border-white/10">
                  {tech.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Explicit Clarification / Guardrail Notice */}
          <div className="mt-8 p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-3 text-xs text-[#94A3B8]">
            <span className="w-2 h-2 rounded-full bg-[#00C2CB] shrink-0" />
            <span>
              <strong>Implementation Note:</strong> Platforms and protocols are deployed strictly based on each client's specific enterprise tech stack; individual implementations utilize the subset of systems relevant to their business architecture.
            </span>
          </div>

        </div>
      </section>

      {/* ==================================================
          8. HUMAN VS AUTOMATION (CONTROL WHERE IT MATTERS)
          ================================================== */}
      <section id="governance" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              Operational Governance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Automate the Work. Keep Control Where It Matters.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              AI handles the repetitive data gathering and continuous background execution. Human leaders and managers remain in complete control of critical decisions, client relationships, and approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Automated Column */}
            <div className="gsap-aigency-gov-box p-6 sm:p-8 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-[#00C2CB]/30 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono font-bold text-[#00C2CB] tracking-wider uppercase">Continuous Execution</span>
                  <h3 className="text-xl font-bold text-white mt-1">AUTOMATED BY AI</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-[#00C2CB]/10 text-[#00C2CB]">
                  <Bot className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Research',
                  'Data processing',
                  'Lead qualification',
                  'Follow-ups',
                  'Content workflows',
                  'CRM updates',
                  'Task execution',
                  'Reporting'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/[0.03] text-xs text-[#C7CDDA]">
                    <Check className="w-4 h-4 text-[#00C2CB] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Human Oversight Column */}
            <div className="gsap-aigency-gov-box p-6 sm:p-8 rounded-2xl bg-[#0D152E]/80 backdrop-blur-md border border-white/[0.1] shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase">Strategic Oversight</span>
                  <h3 className="text-xl font-bold text-white mt-1">HUMAN IN CONTROL</h3>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-400/10 text-amber-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Exceptions', desc: 'Handling anomalous data, out-of-policy cases, and escalation paths.' },
                  { name: 'Approvals', desc: 'Final review before outbound communication or contractual changes.' },
                  { name: 'Strategic decisions', desc: 'Setting pricing rules, priority segments, and commercial terms.' },
                  { name: 'Client relationships', desc: 'Direct human rapport, negotiation, and high-trust consultations.' },
                  { name: 'Final oversight', desc: 'System governance, KPI auditing, and policy adjustments.' }
                ].map((item) => (
                  <div key={item.name} className="p-3 rounded-lg bg-white/[0.03] text-xs">
                    <span className="font-bold text-white block mb-0.5">{item.name}</span>
                    <span className="text-[#94A3B8]">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-8 text-center text-xs sm:text-sm text-[#8A99B5]">
            <span className="text-white font-semibold">Core Principle:</span> AI handles execution. People remain in control of important decisions.
          </div>

        </div>
      </section>

      {/* ==================================================
          9. HOW WE DELIVER (FROM REQUIREMENT TO PRODUCTION)
          ================================================== */}
      <section id="delivery" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08] bg-[#0A1128]/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              Delivery Methodology
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Requirement to Production
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              A structured 5-stage engineering delivery lifecycle that ensures business safety, determinism, and seamless adoption.
            </p>
          </div>

          {/* Continuous Case-Study Delivery Pipeline */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                title: 'Understand',
                desc: "Map the client's business requirement and existing workflow."
              },
              {
                title: 'Design',
                desc: 'Design the AI agent, tools, integrations and execution flow.'
              },
              {
                title: 'Build',
                desc: 'Develop the required agents, skills, MCP connections and automations.'
              },
              {
                title: 'Integrate',
                desc: "Connect the solution with the client's existing systems."
              },
              {
                title: 'Deploy & Improve',
                desc: 'Deploy into the real workflow and continuously refine it based on usage.'
              }
            ].map((step) => (
              <div 
                key={step.title}
                className="gsap-aigency-delivery-step p-5 rounded-2xl bg-[#0D152E]/90 backdrop-blur-md border border-white/[0.08] hover:border-[#00C2CB]/40 transition-colors flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00C2CB] mb-4" />
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          10. PARTNERSHIP VALUE
          ================================================== */}
      <section id="value" className="relative z-10 py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="gsap-aigency-value-box p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0D152E]/90 via-[#0E1738]/90 to-[#070B19]/90 backdrop-blur-md border border-white/[0.1] shadow-2xl">
            
            <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-3">
              The Collaborative Advantage
            </span>
            
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
              A Technical Delivery Layer for AiGency
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm sm:text-base text-[#C7CDDA] leading-relaxed mb-10">
              <p>
                <strong className="text-white">AiGency</strong> focuses on bringing AI opportunities and business requirements together—engaging with forward-thinking enterprises seeking workforce transformation.
              </p>
              <p>
                <strong className="text-white">ArrayMinds</strong> focuses on turning those requirements into technically sound, production-ready implementations—ensuring high reliability, data security, and seamless API interoperability.
              </p>
            </div>

            {/* Progression Strip */}
            <div className="p-5 rounded-2xl bg-[#070B19]/80 border border-white/[0.08]">
              <p className="text-xs font-mono font-bold text-[#8A99B5] uppercase tracking-wider mb-4">
                Together, the model allows AI solutions to move from:
              </p>
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-white border border-white/10">IDEA</span>
                <span className="text-[#00C2CB]">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-white border border-white/10">BUSINESS REQUIREMENT</span>
                <span className="text-[#00C2CB]">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-white border border-white/10">AI DESIGN</span>
                <span className="text-[#00C2CB]">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-white border border-white/10">IMPLEMENTATION</span>
                <span className="text-[#00C2CB]">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/[0.05] text-white border border-white/10">INTEGRATION</span>
                <span className="text-[#00C2CB]">→</span>
                <span className="px-3 py-1.5 rounded-lg bg-[#00C2CB]/20 text-[#7FE4EA] border border-[#00C2CB]/40">PRODUCTION</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          11. FINAL CTA SECTION
          ================================================== */}
      <section id="cta" className="relative z-10 py-20 bg-[#070B19]/90 backdrop-blur-md">
        <div className="gsap-aigency-cta max-w-4xl mx-auto px-4 text-center">
          
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30 uppercase tracking-wider mb-6 inline-block">
            Start Your Implementation
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Building Something With AI?
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] max-w-2xl mx-auto leading-relaxed">
            Have an AI workflow, automation requirement or business process that needs to move from idea to production?
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all shadow-xl shadow-[#00C2CB]/25 hover:scale-105"
            >
              <span>Talk to ArrayMinds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://aigency.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white/90 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 transition-all"
            >
              <span>Explore AiGency Global</span>
              <ExternalLink className="w-4 h-4 text-[#7FE4EA]" />
            </a>
          </div>

        </div>
      </section>

      {/* Floating Smooth Scroll to Top */}
      <FloatingScrollTop />

    </div>
  );
};

export default AiGency;

