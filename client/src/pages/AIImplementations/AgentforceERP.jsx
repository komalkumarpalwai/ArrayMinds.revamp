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
  Cpu, 
  Layers, 
  TrendingUp, 
  Workflow, 
  ExternalLink,
  Bot,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Check,
  X,
  Database,
  Calendar,
  Package,
  FileSpreadsheet,
  Zap,
  ChevronRight,
  ArrowDown,
  Building2,
  Boxes,
  Factory,
  BarChart3,
  Sliders,
  Maximize2,
  Eye
} from 'lucide-react';
import FloatingScrollTop from '../../components/common/FloatingScrollTop';

// Dedicated AMERP Screenshots & Video
import amerpBgVideo from '../../assets/Ai-Implementations/AMERP-Screenshots/AMERP-Agentforce-bg-video.mp4';
import mainPlanningScreenImg from '../../assets/Ai-Implementations/AMERP-Screenshots/Main Manufacturing Planning Screen.png';
import agentforcePlannerImg from '../../assets/Ai-Implementations/AMERP-Screenshots/Agentforce Manufacturing Planner.png';
import bomAllocationImg from '../../assets/Ai-Implementations/AMERP-Screenshots/BOM & Production Allocation.png';
import inventoryAvailabilityImg from '../../assets/Ai-Implementations/AMERP-Screenshots/Inventory & Material Availability.png';
import agentforceAutomationImg from '../../assets/Ai-Implementations/AMERP-Screenshots/Agentforce Production Planning Automation.png';
import humanApprovalPlanImg from '../../assets/Ai-Implementations/AMERP-Screenshots/Human Approval & Final Production Plan.png';

// Partner / Brand Logos
import agentforceLogo from '../../assets/Ai-Implementations/agentforce logo.png';
import salesforceLogo from '../../assets/Partnerships/salesforce logo.png';
import arrayMindsLogo from '../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';
import SEO from '../../components/common/SEO';
import { seoRoutes } from '../../utils/seoConfig';

const AgentforceERP = () => {
  const containerRef = useRef(null);
  // Active callout pill highlight in Screen Showcase
  const [activeCallout, setActiveCallout] = useState(null);
  const [activeScreenTab, setActiveScreenTab] = useState('main');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Left Elements Entrance
      gsap.fromTo(
        '.gsap-amerp-hero-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Hero Right Mockup Frame
      gsap.fromTo(
        '.gsap-amerp-mockup-frame',
        { opacity: 0, scale: 0.96, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.9, delay: 0.25, ease: 'power2.out', clearProps: 'all' }
      );

      // 3. Overview Strip 5 Metric Cards
      gsap.fromTo(
        '.gsap-amerp-metric-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#overview-strip',
            start: 'top 90%'
          }
        }
      );

      // 4. Problem Points
      gsap.fromTo(
        '.gsap-amerp-problem-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#business-problem',
            start: 'top 85%'
          }
        }
      );

      // 5. Workflow Step Cards
      gsap.fromTo(
        '.gsap-amerp-workflow-step',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#workflow-steps',
            start: 'top 85%'
          }
        }
      );

      // 6. Architecture Steps
      gsap.fromTo(
        '.gsap-amerp-arch-step',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#architecture-section',
            start: 'top 85%'
          }
        }
      );

      // 7. Screen Showcase Frame
      gsap.fromTo(
        '.gsap-amerp-screen-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#screen-showcase',
            start: 'top 85%'
          }
        }
      );

      // 8. Transformation Before/After
      gsap.fromTo(
        '.gsap-amerp-compare-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#transformation-section',
            start: 'top 85%'
          }
        }
      );

      // 9. Exceptions Automation Cards
      gsap.fromTo(
        '.gsap-amerp-exception-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.09,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#exceptions-section',
            start: 'top 85%'
          }
        }
      );

      // 10. Business Impact Blocks
      gsap.fromTo(
        '.gsap-amerp-impact-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#impact-section',
            start: 'top 85%'
          }
        }
      );

      // 11. Tech Stack Cards
      gsap.fromTo(
        '.gsap-amerp-tech-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#tech-stack-section',
            start: 'top 85%'
          }
        }
      );

      // 12. Final CTA
      gsap.fromTo(
        '.gsap-amerp-cta',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#final-cta',
            start: 'top 85%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 1. Implementation Overview Metrics
  const overviewMetrics = [
    { label: 'IMPLEMENTATION', value: 'Manufacturing Planning', sub: 'End-to-End Workflow' },
    { label: 'PLATFORM', value: 'ArrayMinds ERP', sub: 'Core Operations Engine' },
    { label: 'AI LAYER', value: 'Agentforce', sub: 'Reasoning & Planning' },
    { label: 'DOMAIN', value: 'Manufacturing', sub: 'Industrial & Discrete' },
    { label: 'FOCUS', value: 'Production Planning', sub: 'Demand-to-Execution' }
  ];

  // 2. The Business Problem Points
  const problemPoints = [
    { id: 'demand', title: 'Demand changes', desc: 'Volatile sales forecasts and customer order shifts introduce daily volatility.' },
    { id: 'inventory', title: 'Inventory uncertainty', desc: 'Multi-warehouse stock balances, lead times, and reserved items lack unified visibility.' },
    { id: 'material', title: 'Material availability', desc: 'Missing components and Bill of Materials (BOM) shortages stall scheduled line runs.' },
    { id: 'production', title: 'Production constraints', desc: 'Machine capacity limits, tooling changeovers, and shift bottlenecks create delays.' },
    { id: 'decisions', title: 'Manual planning decisions', desc: 'Planners spend hours manually calculating spreadsheets instead of resolving bottlenecks.' }
  ];

  // 3. What We Built - 7 Workflow Steps
  const workflowSteps = [
    { num: '01', title: 'Demand', desc: 'Sales orders & demand signals ingested into the planning queue.' },
    { num: '02', title: 'BOM', desc: 'Multi-level Bill of Materials exploded and validated.' },
    { num: '03', title: 'Inventory', desc: 'Live warehouse balances & on-order stock cross-checked.' },
    { num: '04', title: 'Material Availability', desc: 'Shortages flagged with lead-time gap calculations.' },
    { num: '05', title: 'Production Plan', desc: 'Machine routing & manufacturing orders auto-scheduled.' },
    { num: '06', title: 'Procurement', desc: 'Automated PO drafts triggered for component shortages.' },
    { num: '07', title: 'Execution', desc: 'Work orders dispatched directly to the shop floor.' }
  ];

  // 4. Architecture Pipeline Steps
  const architecturePipeline = [
    { layer: 'Input Data', name: 'Business Data', desc: 'Sales orders, forecasts, warehouse balances, supplier lead times.', isAi: false },
    { layer: 'Core Platform', name: 'ArrayMinds ERP', desc: 'Centralized manufacturing, inventory, and production database.', isAi: false },
    { layer: 'AI Intelligence Layer', name: 'Salesforce Agentforce', desc: 'Autonomous reasoning engine analyzing real-time constraints and trade-offs.', isAi: true },
    { layer: 'Decision Engine', name: 'Planning Intelligence', desc: 'Dynamic line capacity routing, BOM matching, and inventory allocation.', isAi: false },
    { layer: 'Action Generation', name: 'Recommended Actions', desc: 'Suggested batch sizes, alternate components, and schedule adjustments.', isAi: false },
    { layer: 'Human Oversight', name: 'Planner Approval', desc: 'Human-in-the-loop review: 1-click accept, adjust, or override recommendations.', isAi: false },
    { layer: 'Operational Output', name: 'Execution', desc: 'Purchase orders generated, shop-floor work orders dispatched.', isAi: false }
  ];

  // 5. Annotated Callout Labels
  const screenCallouts = [
    { id: 'demand', title: 'Demand', desc: 'Aggregated demand signals from confirmed sales orders and buffer forecasts.' },
    { id: 'inventory', title: 'Inventory', desc: 'Real-time on-hand, allocated, and in-transit inventory counts across facilities.' },
    { id: 'bom', title: 'BOM', desc: 'Full multi-level Bill of Materials decomposition with scrap factor allowances.' },
    { id: 'stock', title: 'Available Stock', desc: 'Net available to promise (ATP) calculated automatically per component.' },
    { id: 'qty', title: 'Production Quantity', desc: 'Economic lot sizes computed based on machine capacity and shift routing.' },
    { id: 'procure', title: 'Procurement', desc: 'Automated requisition drafts generated for supplier lead-time buffers.' },
    { id: 'date', title: 'Planning Date', desc: 'Backward and forward scheduling timelines locked to target delivery dates.' },
    { id: 'exceptions', title: 'Exceptions', desc: 'Proactive flags for component delays, machine overloads, and material shortages.' }
  ];

  // 6. Real Manufacturing Exceptions
  const exceptions = [
    {
      title: 'Material Shortage',
      category: 'BOM Component Shortage',
      issue: 'Critical electronic sub-assembly for Work Order #MO-408 is short by 120 units due to supplier shipment delay.',
      recommendation: 'Allocate 120 units from secondary safety reserve at Warehouse B, and expedite replacement batch via Supplier 2.',
      action: 'Planner approves inventory transfer & auto-generates expedited PO with 1 click.'
    },
    {
      title: 'Production Constraint',
      category: 'Machine Line Overload',
      issue: 'CNC Machining Center 03 exceeds 100% capacity on Thursday shift due to back-to-back urgent runs.',
      recommendation: 'Shift Batch #4092 to parallel Line 04 which has 42% available capacity, maintaining delivery on-schedule.',
      action: 'Planner confirms line re-route; updated work order instructions push to operator terminals.'
    },
    {
      title: 'Insufficient Inventory',
      category: 'Safety Stock Threshold',
      issue: 'Raw steel coil inventory drops below minimum safety threshold (7 days) due to unexpected surge in sales orders.',
      recommendation: 'Trigger automated PO draft for 15 metric tons based on verified contract pricing and 4-day delivery window.',
      action: 'Planner reviews vendor pricing tier and submits draft directly to purchasing.'
    },
    {
      title: 'Demand Change',
      category: 'Priority Order Expedite',
      issue: 'Tier-1 customer requests order dispatch 3 days earlier than initial confirmed production date.',
      recommendation: 'Re-sequence assembly queue priority; swap scheduling slot with standard stocking order with zero penalty.',
      action: 'Planner confirms updated manufacturing timeline and updates customer promise date.'
    }
  ];

  // 7. Business Impact Blocks
  const impacts = [
    {
      tag: 'EFFICIENCY',
      title: 'FASTER PLANNING',
      desc: 'Eliminate manual spreadsheet math and repetitive calculations across shifts, allowing planners to generate optimized production schedules in minutes rather than hours.'
    },
    {
      tag: 'TRANSPARENCY',
      title: 'BETTER VISIBILITY',
      desc: 'Unite sales demand, real-time inventory balances, BOM components, and shop-floor machine capacities into a single, cohesive operational view.'
    },
    {
      tag: 'DECISION SUPPORT',
      title: 'SMARTER DECISIONS',
      desc: 'Leverage AI-assisted reasoning to surface bottlenecks and evaluate trade-offs proactively, providing planners with clear, contextual recommendations.'
    },
    {
      tag: 'ALIGNMENT',
      title: 'CONNECTED OPERATIONS',
      desc: 'Keep manufacturing schedules, procurement orders, warehouse transfers, and customer commitments continuously synchronized with zero manual friction.'
    }
  ];

  // Screen Showcase Tab Definitions
  const screenTabs = [
    { id: 'main', label: 'Main Planning Cockpit', image: mainPlanningScreenImg, subtitle: 'Unified Demand, BOM, Machine Routing & Exception Console' },
    { id: 'bom', label: 'BOM & Material Allocation', image: bomAllocationImg, subtitle: 'Multi-Level BOM Breakdown & Component Allocation Matrix' },
    { id: 'approval', label: 'Approval & Execution', image: humanApprovalPlanImg, subtitle: 'Human-in-the-Loop Review & Work Order Authorization' }
  ];

  const currentTab = screenTabs.find(t => t.id === activeScreenTab) || screenTabs[0];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070B19] text-white selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA] relative overflow-x-hidden">
      <SEO {...seoRoutes.agentforce} />
      
      {/* Background Video Layer - Full Frame with Symmetrical Cinematic Edge Fades */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 filter brightness-105 contrast-105 saturate-110"
        >
          <source src={amerpBgVideo} type="video/mp4" />
        </video>

        {/* 1. Global Ambient Base Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/60 via-[#0A1128]/70 to-[#070B19]/85" />

        {/* 2. Symmetrical Left & Right Cinematic Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-[#070B19] via-[#070B19]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-[#070B19] via-[#070B19]/70 to-transparent" />

        {/* 3. Soft Radial Vignette for Center Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#070B19_95%)]" />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10">
      
      {/* ==================================================
          1. HERO SECTION
          ================================================== */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-white/[0.08]">
        {/* Subtle Ambient Background Lighting */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[380px] bg-gradient-to-tr from-[#00C2CB]/15 via-[#1B3B6F]/25 to-blue-900/15 blur-[140px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back Navigation */}
          <Link
            to="/ai-implementations"
            className="gsap-amerp-hero-item inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A99B5] hover:text-[#7FE4EA] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to AI Implementations</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Headline, Badges, Summary, CTAs */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              {/* Eyebrow Badge */}
              <div className="gsap-amerp-hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00C2CB]/30 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
                <span className="text-[11px] font-bold tracking-widest text-[#7FE4EA] uppercase">
                  AI IMPLEMENTATION · AGENTFORCE · MANUFACTURING
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="gsap-amerp-hero-item text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                AI-Powered Manufacturing &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
                  Production Planning
                </span>
              </h1>

              {/* Description */}
              <p className="gsap-amerp-hero-item text-base sm:text-lg text-[#C7CDDA] leading-relaxed max-w-xl font-normal">
                Used Agentforce to simplify and automate manufacturing and production planning — connecting demand, inventory, materials, and production workflows in one intelligent system.
              </p>

              {/* Action Buttons */}
              <div className="gsap-amerp-hero-item pt-2 flex flex-wrap items-center gap-4">
                <a
                  href="/AMERP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-200 shadow-xl shadow-[#00C2CB]/20 hover:scale-105 active:scale-95"
                >
                  <span>View Live Implementation</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <Link
                  to="/ai-implementations"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#C7CDDA] hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
                >
                  <span>Back to Implementations</span>
                  <ChevronRight className="w-4 h-4 text-[#8A99B5]" />
                </Link>
              </div>

            </div>

            {/* Right Column: Premium Enterprise ERP Mockup Frame (Main Planning Screen) */}
            <div className="lg:col-span-6">
              <div className="gsap-amerp-mockup-frame rounded-2xl bg-[#0D152E]/95 border border-white/[0.12] p-3 sm:p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl relative overflow-hidden group">
                
                {/* Browser / App Header Chrome */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-3 bg-[#0A1024] rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-[#8A99B5] ml-2 hidden sm:inline">
                      ArrayMinds ERP · Manufacturing Planning Cockpit
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30 text-[10px] font-mono uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB] animate-ping" />
                      Live Production ERP
                    </span>
                  </div>
                </div>

                {/* Screenshot Frame */}
                <div className="relative rounded-xl overflow-hidden bg-black/60 shadow-inner">
                  <img
                    src={mainPlanningScreenImg}
                    alt="ArrayMinds ERP Manufacturing and Production Planning Interface"
                    className="w-full h-auto object-cover max-h-[480px] transition-transform duration-700 group-hover:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D152E]/30 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          2. IMPLEMENTATION OVERVIEW STRIP
          ================================================== */}
      <section id="overview-strip" className="py-10 border-b border-white/[0.08] bg-[#0A122A]/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {overviewMetrics.map((m) => (
              <div
                key={m.label}
                className="gsap-amerp-metric-item p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex flex-col justify-between"
              >
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#00C2CB] uppercase block mb-1">
                  {m.label}
                </span>
                <p className="text-sm sm:text-base font-bold text-white tracking-tight">
                  {m.value}
                </p>
                <span className="text-[11px] text-[#8A99B5] mt-1 block font-medium">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          3. THE BUSINESS PROBLEM
          ================================================== */}
      <section id="business-problem" className="py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              Operational Reality
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-12">
            Planning Shouldn't Be Manual.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Clear Business Explanation */}
            <div className="lg:col-span-6 space-y-5 text-[#C7CDDA] text-base leading-relaxed">
              <p>
                In traditional manufacturing environments, production planners are burdened with fragmented data spread across sales order backlogs, multi-warehouse inventory spreadsheets, and disparate supplier lead-time sheets.
              </p>
              <p>
                When a customer order is expedited, a raw material shipment is delayed, or a machine line faces unexpected downtime, determining the cascading impact takes hours of manual re-calculation.
              </p>
              <p>
                By the time decisions are made, production schedules are already obsolete — leading to line stoppages, excess rush procurement costs, and missed delivery commitments.
              </p>

              <div className="p-5 rounded-xl bg-[#0D152E] border border-white/[0.08] mt-6">
                <p className="text-xs font-bold text-[#7FE4EA] uppercase tracking-wider mb-1">
                  The Core Challenge
                </p>
                <p className="text-sm text-white font-medium">
                  Disconnected information creates friction at every single handoff from customer demand to factory floor execution.
                </p>
              </div>
            </div>

            {/* Right: Visual Problem Flow with Subtle Connectors */}
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs font-bold text-[#8A99B5] uppercase tracking-wider mb-4">
                The Compounding Operational Chain:
              </p>

              {problemPoints.map((pt, idx, arr) => (
                <div key={pt.id} className="gsap-amerp-problem-card relative">
                  
                  <div className="p-4 rounded-xl bg-[#0D152E]/80 border border-white/[0.08] hover:border-red-500/30 transition-colors flex items-start gap-3.5 shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center shrink-0 text-xs font-mono font-bold">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">{pt.title}</h3>
                      <p className="text-xs text-[#94A3B8] leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>

                  {idx < arr.length - 1 && (
                    <div className="w-full flex justify-center py-1">
                      <ArrowDown className="w-3.5 h-3.5 text-[#8A99B5]/40" />
                    </div>
                  )}

                </div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          4. WHAT WE BUILT (FROM DEMAND TO PRODUCTION)
          ================================================== */}
      <section id="workflow-steps" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#0A122A]/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#00C2CB]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                The Solution Architecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Demand to Production.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              ArrayMinds connected the entire manufacturing lifecycle into a continuous automated loop, allowing demand changes to immediately propagate into material calculations and production schedules.
            </p>
          </div>

          {/* 7-Step Workflow Progression Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 mb-14">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="gsap-amerp-workflow-step p-4 rounded-xl bg-[#0D152E]/90 border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold text-[#00C2CB] group-hover:text-[#7FE4EA]">
                      Step {step.num}
                    </span>
                    <span className="text-[10px] text-[#8A99B5]">→</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Showcase 1: Inventory & Material Availability */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl bg-[#0D152E]/80 border border-white/[0.1] shadow-xl mb-8">
            
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00C2CB]/10 border border-[#00C2CB]/30 text-[#7FE4EA] text-[11px] font-mono uppercase">
                <Boxes className="w-3.5 h-3.5" />
                <span>Inventory & Material Availability</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Live Material Balances & Shortage Analysis
              </h3>
              <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                As demand flows into the system, the material engine immediately cross-references multi-warehouse inventory, evaluates reserved safety stock, and highlights lead-time gaps with precise shortage indicators.
              </p>
              
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0" />
                  <span>Real-time component shortage calculations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0" />
                  <span>Cross-warehouse stock visibility & reservation checks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0" />
                  <span>Automated vendor reorder alerts before shortages stop lines</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7 rounded-xl overflow-hidden bg-black/50 border border-white/[0.08] shadow-2xl group">
              <img
                src={inventoryAvailabilityImg}
                alt="ArrayMinds Inventory & Material Availability Screen"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

          </div>

          {/* Showcase 2: BOM & Production Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-2xl bg-[#0D152E]/80 border border-white/[0.1] shadow-xl">
            
            <div className="lg:col-span-7 order-2 lg:order-1 rounded-xl overflow-hidden bg-black/50 border border-white/[0.08] shadow-2xl group">
              <img
                src={bomAllocationImg}
                alt="ArrayMinds BOM and Production Allocation Engine"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#00C2CB]/10 border border-[#00C2CB]/30 text-[#7FE4EA] text-[11px] font-mono uppercase">
                <Layers className="w-3.5 h-3.5" />
                <span>BOM & Allocation Engine</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Deconstructed BOMs & Automated Batch Sizing
              </h3>
              <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                Multi-level Bill of Materials are automatically parsed, calculating exact component yields, scrap allowances, and machine setup times to schedule production batches with zero manual recalculations.
              </p>
              
              <ul className="space-y-2 pt-2 text-xs sm:text-sm text-[#94A3B8]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0" />
                  <span>Dynamic economic batch sizing per machine center</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0" />
                  <span>Multi-tier component allocation & scrap factor offsets</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0" />
                  <span>Direct work order creation with full component traceability</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          5. AI-POWERED PLANNING (AGENTFORCE REASONING)
          ================================================== */}
      <section id="architecture-section" className="py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#00C2CB]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                Agentforce Integration
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              AI Where Decisions Happen.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              Agentforce is embedded directly into the ERP workflow to evaluate scheduling options, verify BOM constraints, and generate actionable recommendations — with human planners maintaining complete oversight.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Agentforce Screenshot in App Frame */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0D152E] border border-white/[0.12] p-3 sm:p-4 shadow-2xl relative overflow-hidden group">
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-3 bg-[#0A1024] rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-[#8A99B5] ml-2">
                    Agentforce Manufacturing Planner UI
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00C2CB] text-[#032B2E] uppercase">
                  Agentic AI
                </span>
              </div>

              <div className="relative rounded-xl overflow-hidden bg-black/60 shadow-inner">
                <img
                  src={agentforcePlannerImg}
                  alt="Agentforce Manufacturing Planner Interface"
                  className="w-full h-auto object-cover max-h-[500px] transition-transform duration-500 group-hover:scale-[1.01]"
                />
              </div>

              <div className="mt-4 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs text-[#8A99B5]">
                <span className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#00C2CB]" />
                  <span>Autonomous reasoning over manufacturing constraints</span>
                </span>
                <span className="text-[#7FE4EA] font-mono text-[11px]">Real-Time Assist</span>
              </div>
            </div>

            {/* Right: Architecture Pipeline */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#0D152E]/90 border border-white/[0.1] shadow-2xl space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#8A99B5] mb-4">
                The Agentforce Decision Pipeline:
              </p>

              <div className="space-y-3">
                {architecturePipeline.map((pipe, idx, arr) => (
                  <div key={pipe.name} className="gsap-amerp-arch-step relative">
                    
                    <div className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      pipe.isAi
                        ? 'bg-gradient-to-r from-[#00C2CB]/15 via-[#1B3B6F]/30 to-[#00C2CB]/10 border-[#00C2CB] ring-2 ring-[#00C2CB]/30 shadow-lg shadow-[#00C2CB]/10'
                        : 'bg-white/[0.02] border-white/[0.06]'
                    }`}>
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                          pipe.isAi
                            ? 'bg-[#00C2CB] text-[#032B2E]'
                            : 'bg-white/[0.05] text-[#8A99B5] border border-white/10'
                        }`}>
                          0{idx + 1}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-bold text-white">{pipe.name}</h3>
                            {pipe.isAi && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#00C2CB] text-[#032B2E] tracking-wide uppercase">
                                Agentforce Layer
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#94A3B8] mt-0.5">{pipe.desc}</p>
                        </div>
                      </div>

                      <div className="sm:text-right shrink-0">
                        <span className="text-[10px] font-mono text-[#8A99B5] uppercase px-2 py-0.5 rounded bg-white/[0.04]">
                          {pipe.layer}
                        </span>
                      </div>

                    </div>

                    {idx < arr.length - 1 && (
                      <div className="w-full flex justify-center py-0.5">
                        <ArrowDown className="w-3 h-3 text-[#8A99B5]/40" />
                      </div>
                    )}

                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#8A99B5]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Deterministic ERP logic + Human Oversight</span>
                </span>
                <span className="text-white/60 text-[11px]">Auditability Logged</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          6. MANUFACTURING PLANNING SCREEN (ANNOTATED SHOWCASE & TABS)
          ================================================== */}
      <section id="screen-showcase" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#0A122A]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-[2px] bg-[#00C2CB]" />
                <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                  Production Interface Showcase
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Manufacturing Planning, Connected.
              </h2>
              <p className="mt-3 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
                A single operational control plane uniting demand forecasts, component availability, production quantity routing, and live exception handling.
              </p>
            </div>

            {/* Interactive View Mode Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#0D152E] border border-white/[0.1] shrink-0">
              {screenTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveScreenTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeScreenTab === tab.id
                      ? 'bg-[#00C2CB] text-[#032B2E] shadow-md shadow-[#00C2CB]/20'
                      : 'text-[#8A99B5] hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive / Annotated Callout Grid (Applicable when Main screen is active) */}
          {activeScreenTab === 'main' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-6">
              {screenCallouts.map((c) => {
                const isSelected = activeCallout === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveCallout(isSelected ? null : c.id)}
                    className={`p-3 rounded-xl text-left transition-all duration-200 border cursor-pointer ${
                      isSelected
                        ? 'bg-[#00C2CB]/20 border-[#00C2CB] ring-2 ring-[#00C2CB]/40 shadow-lg shadow-[#00C2CB]/15 text-white'
                        : 'bg-[#0D152E] border-white/[0.08] hover:border-white/20 text-[#C7CDDA]'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-[#00C2CB] block mb-1">
                      ● Callout
                    </span>
                    <p className="text-xs font-bold leading-tight truncate">{c.title}</p>
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Callout Detail Banner */}
          {activeCallout && activeScreenTab === 'main' && (
            <div className="mb-6 p-4 rounded-xl bg-[#00C2CB]/10 border border-[#00C2CB]/30 flex items-center justify-between text-xs sm:text-sm animate-fadeIn">
              <div className="flex items-center gap-2 text-white">
                <span className="font-bold text-[#7FE4EA]">
                  {screenCallouts.find((c) => c.id === activeCallout)?.title}:
                </span>
                <span>{screenCallouts.find((c) => c.id === activeCallout)?.desc}</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveCallout(null)}
                className="text-xs text-[#8A99B5] hover:text-white ml-4"
              >
                ✕
              </button>
            </div>
          )}

          {/* Large Screen Container */}
          <div className="gsap-amerp-screen-box rounded-2xl bg-[#0D152E] border border-white/[0.12] p-3 sm:p-5 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-3 bg-[#0A1024] rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-[#8A99B5] ml-2">
                  {currentTab.subtitle}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30">
                {currentTab.label}
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden bg-black/60 shadow-inner">
              <img
                src={currentTab.image}
                alt={currentTab.label}
                className="w-full h-auto object-cover max-h-[640px]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          7. BEFORE → AFTER (CLEAN SPLIT LAYOUT)
          ================================================== */}
      <section id="transformation-section" className="py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#00C2CB]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                Transformation
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Measurable Operational Shift.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              Moving from fragmented manual firefighting to unified, predictive manufacturing planning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* BEFORE COLUMN */}
            <div className="gsap-amerp-compare-box p-6 sm:p-8 rounded-2xl bg-[#0D152E]/70 border border-red-500/20 shadow-xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-red-500/20">
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  TRADITIONAL APPROACH
                </span>
                <span className="text-sm font-extrabold text-white">BEFORE</span>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'Manual planning', desc: 'Planners re-calculate schedules manually on disconnected spreadsheets.' },
                  { title: 'Disconnected information', desc: 'Sales demand, warehouse inventory, and machine capacity exist in silos.' },
                  { title: 'Repeated calculations', desc: 'Every minor sales order shift requires re-running manual BOM math.' },
                  { title: 'Delayed decisions', desc: 'Shortages are discovered on the shop floor only when lines are about to run.' },
                  { title: 'Limited visibility', desc: 'No live tracking of component lead times against customer delivery promises.' }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="w-5 h-5 rounded-full bg-red-500/15 text-red-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✕
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white/90">{item.title}</h4>
                      <p className="text-xs text-[#8A99B5] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AFTER COLUMN */}
            <div className="gsap-amerp-compare-box p-6 sm:p-8 rounded-2xl bg-[#0D152E]/90 border border-emerald-500/30 shadow-xl shadow-emerald-500/5">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-emerald-500/20">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  ARRAYMINDS + AGENTFORCE
                </span>
                <span className="text-sm font-extrabold text-white">AFTER</span>
              </div>

              <div className="space-y-4">
                {[
                  { title: 'AI-assisted planning', desc: 'Agentforce generates optimized production proposals based on real constraints.' },
                  { title: 'Connected ERP data', desc: 'Demand, inventory balances, BOMs, and work orders unite in one system.' },
                  { title: 'Automated calculations', desc: 'Material requirements and machine load balances compute in real time.' },
                  { title: 'Faster decisions', desc: 'Exceptions are flagged with immediate, actionable resolution recommendations.' },
                  { title: 'Real-time visibility', desc: 'Complete transparency from raw material POs to final work order delivery.' }
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-500/[0.05] border border-emerald-500/20">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{item.title}</h4>
                      <p className="text-xs text-[#C7CDDA] mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          8. EXCEPTIONS & AUTOMATION (SURFACE EXCEPTIONS. ACT FASTER)
          ================================================== */}
      <section id="exceptions-section" className="py-16 md:py-24 border-b border-white/[0.08] bg-[#0A122A]/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#00C2CB]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                Decision Support & Automation
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Surface Exceptions. Act Faster.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              The system doesn't just display raw data — it analyzes bottlenecks, provides contextual recommendations, and assists planners in taking immediate corrective action.
            </p>
          </div>

          {/* Exception Automation Screenshot Showcase */}
          <div className="mb-12 rounded-2xl bg-[#0D152E] border border-white/[0.1] p-4 sm:p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00C2CB]" />
                <span className="text-sm font-bold text-white">Agentforce Production Planning Automation Screen</span>
              </div>
              <span className="text-[11px] font-mono text-[#7FE4EA] px-2 py-0.5 rounded bg-[#00C2CB]/10 border border-[#00C2CB]/20 uppercase">
                Automated Exception Resolution
              </span>
            </div>
            <div className="rounded-xl overflow-hidden bg-black/50 border border-white/[0.08]">
              <img
                src={agentforceAutomationImg}
                alt="Agentforce Production Planning Automation Screen"
                className="w-full h-auto object-cover max-h-[520px]"
              />
            </div>
          </div>

          {/* 4 Real World Manufacturing Exception Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exceptions.map((ex) => (
              <div
                key={ex.title}
                className="gsap-amerp-exception-card p-6 rounded-2xl bg-[#0D152E] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  
                  {/* Header Badge */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06]">
                    <span className="text-[11px] font-mono text-[#7FE4EA] font-semibold uppercase tracking-wide">
                      {ex.category}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#00C2CB]/10 text-[#00C2CB] border border-[#00C2CB]/20">
                      Live Exception
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">
                    {ex.title}
                  </h3>

                  {/* 3-Step Decision Flow: Issue -> Recommendation -> Action */}
                  <div className="space-y-3 text-xs sm:text-sm">
                    
                    {/* 1. Issue */}
                    <div className="p-3 rounded-xl bg-red-500/[0.05] border border-red-500/20">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-400 block mb-1">
                        1. Detected Issue
                      </span>
                      <p className="text-[#C7CDDA] text-xs leading-relaxed">{ex.issue}</p>
                    </div>

                    {/* 2. AI Recommendation */}
                    <div className="p-3 rounded-xl bg-[#00C2CB]/10 border border-[#00C2CB]/30">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#7FE4EA] block mb-1">
                        2. Agentforce Recommendation
                      </span>
                      <p className="text-white text-xs leading-relaxed font-medium">{ex.recommendation}</p>
                    </div>

                    {/* 3. Planner Action */}
                    <div className="p-3 rounded-xl bg-emerald-500/[0.06] border border-emerald-500/20">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block mb-1">
                        3. Planner Action
                      </span>
                      <p className="text-[#C7CDDA] text-xs leading-relaxed">{ex.action}</p>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          9. BUSINESS IMPACT (4 LARGE IMPACT BLOCKS)
          ================================================== */}
      <section id="impact-section" className="py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[2px] bg-[#00C2CB]" />
              <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
                Real Results
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for Real Operations.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed">
              Engineered to bring verifiable operational speed, inventory accuracy, and workflow alignment directly to industrial manufacturing teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impacts.map((imp) => (
              <div
                key={imp.title}
                className="gsap-amerp-impact-card p-7 sm:p-8 rounded-2xl bg-[#0D152E]/80 border border-white/[0.08] hover:border-[#00C2CB]/40 transition-colors flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded bg-[#00C2CB]/10 text-[#00C2CB] border border-[#00C2CB]/20">
                      {imp.tag}
                    </span>
                    <CheckCircle2 className="w-5 h-5 text-[#00C2CB]" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {imp.title}
                  </h3>

                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {imp.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          10. TECHNOLOGY STACK (BUILT WITH)
          ================================================== */}
      <section id="tech-stack-section" className="py-16 md:py-20 border-b border-white/[0.08] bg-[#0A122A]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-2">
            Technology Stack
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-10">
            Built With.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* 1. ArrayMinds ERP */}
            <div className="gsap-amerp-tech-card p-6 rounded-2xl bg-[#0D152E] border border-white/[0.08] flex flex-col items-center text-center shadow-lg">
              <div className="h-14 flex items-center justify-center mb-4">
                <img
                  src={arrayMindsLogo}
                  alt="ArrayMinds ERP"
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-white mb-1">ArrayMinds ERP</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Core manufacturing, inventory control, and work order fulfillment system.
              </p>
            </div>

            {/* 2. Salesforce */}
            <div className="gsap-amerp-tech-card p-6 rounded-2xl bg-[#0D152E] border border-white/[0.08] flex flex-col items-center text-center shadow-lg">
              <div className="h-14 flex items-center justify-center mb-4">
                <img
                  src={salesforceLogo}
                  alt="Salesforce"
                  className="max-h-9 w-auto object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Salesforce</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Enterprise CRM foundation, customer order streams, and master accounts.
              </p>
            </div>

            {/* 3. Salesforce Agentforce */}
            <div className="gsap-amerp-tech-card p-6 rounded-2xl bg-[#0D152E] border border-white/[0.08] flex flex-col items-center text-center shadow-lg">
              <div className="h-14 flex items-center justify-center mb-4">
                <img
                  src={agentforceLogo}
                  alt="Salesforce Agentforce"
                  className="max-h-10 w-auto object-contain"
                />
              </div>
              <h3 className="text-base font-bold text-white mb-1">Salesforce Agentforce</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Autonomous planning agents and contextual reasoning layer.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          11. FINAL CTA SECTION
          ================================================== */}
      <section id="final-cta" className="gsap-amerp-cta py-20 bg-[#070B19] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30 uppercase tracking-wider mb-6 inline-block">
            Start Your Transformation
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Build Your Next<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              Intelligent Operation.
            </span>
          </h2>
          
          <p className="mt-5 text-base sm:text-lg text-[#C7CDDA] max-w-2xl mx-auto leading-relaxed">
            From planning and procurement to sales and operations, ArrayMinds builds AI-powered systems around the way your business actually works.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-200 shadow-xl shadow-[#00C2CB]/25 hover:scale-105 active:scale-95"
            >
              <span>Start a Conversation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/ai-implementations"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold text-white/90 hover:text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 transition-all"
            >
              <span>Explore More Implementations</span>
              <ChevronRight className="w-4 h-4 text-[#7FE4EA]" />
            </Link>
          </div>

        </div>
      </section>

      </div>

      {/* Floating Smooth Scroll to Top */}
      <FloatingScrollTop />

    </div>
  );
};

export default AgentforceERP;

