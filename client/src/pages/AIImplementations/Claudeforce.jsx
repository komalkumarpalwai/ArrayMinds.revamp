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
  Workflow, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Database, 
  Terminal, 
  Zap, 
  Check, 
  Code2, 
  Lock, 
  Activity, 
  Server, 
  Search, 
  Sliders, 
  ChevronRight,
  ChevronDown,
  UserCheck,
  TrendingUp,
  FileText,
  Clock,
  MessageSquare,
  BarChart3,
  Briefcase,
  Users,
  Send,
  HelpCircle,
  FolderGit2,
  Boxes
} from 'lucide-react';
import { smoothScrollTo } from '../../components/common/SmoothScroll';
import FloatingScrollTop from '../../components/common/FloatingScrollTop';
import SEO from '../../components/common/SEO';
import { seoRoutes } from '../../utils/seoConfig';

// Assets
import claudeforceImg from '../../assets/Ai-Implementations/Claudeforce.webp';
import claudeforceBgImg from '../../assets/Ai-Implementations/Claudeforce-bg-image.png';
import claudeforceBgVideo from '../../assets/Ai-Implementations/claudeforce-bg-video.mp4';
import arrayMindsLogo from '../../assets/Company Logos/array_minds_logo_FOR_DARK_NAVY_SITE-removebg-preview.png';

const Claudeforce = () => {
  const containerRef = useRef(null);
  // Active manager prompt tab
  const [activePromptTab, setActivePromptTab] = useState('pipeline');
  
  // Active automation stage highlight
  const [activeAutoStage, setActiveAutoStage] = useState(2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Hero Text Elements Stagger
      gsap.fromTo(
        '.gsap-cf-hero-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Hero Right Architecture Stack
      gsap.fromTo(
        '.gsap-cf-arch-card',
        { opacity: 0, scale: 0.96, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.9, delay: 0.25, ease: 'power2.out', clearProps: 'all' }
      );

      // 3. Why Claudeforce 4 Cards
      gsap.fromTo(
        '.gsap-cf-why-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#why-claudeforce',
            start: 'top 85%'
          }
        }
      );

      // 4. Skills Metric Formula Box
      gsap.fromTo(
        '.gsap-cf-skills-box',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#skills-section',
            start: 'top 85%'
          }
        }
      );

      // 5. Manager Chat Experience Window
      gsap.fromTo(
        '.gsap-cf-chat-box',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#manager-experience',
            start: 'top 85%'
          }
        }
      );

      // 6. Automation Flow Step Cards
      gsap.fromTo(
        '.gsap-cf-pipeline-step',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#automation-pipeline',
            start: 'top 85%'
          }
        }
      );

      // 7. Role Cards Stagger
      gsap.fromTo(
        '.gsap-cf-role-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#role-cards',
            start: 'top 85%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const managerScenarios = {
    pipeline: {
      question: "Give me the current sales pipeline and highlight the opportunities that need my attention.",
      context: "Salesforce CRM · Opportunity Pipeline · Q3 FY26",
      answer: {
        summary: "Current active pipeline is £1.42M across 14 deals. 3 high-value opportunities require immediate executive attention:",
        highlights: [
          {
            name: "Meridian Global - Enterprise Cloud Migration (£320k)",
            status: "Stalled in Negotiation for 11 days. Competitor discount requested.",
            action: "Recommended: Schedule executive alignment call with VP IT."
          },
          {
            name: "Apex Logistics - Fleet Telematics (£185k)",
            status: "Contract sent. Legal review has 2 custom SLA redlines pending.",
            action: "Action: Auto-drafted approval waiver sent to Head of Legal."
          },
          {
            name: "Vanguard Retail - AM ERP Pilot (£95k)",
            status: "Technical evaluation passed 100%. Decision maker signed off.",
            action: "Next Step: Ready for signature dispatch via DocCrafter."
          }
        ],
        meta: "Generated via MCP Tool: salesforce_pipeline_intelligence · 18 records evaluated in 0.8s"
      }
    },
    inactivity: {
      question: "Which opportunities have not had activity in the last 14 days?",
      context: "Salesforce CRM · Activity Telemetry · Stalled Deals",
      answer: {
        summary: "Found 4 enterprise accounts with zero logged calls, emails, or tasks in the last 14 days (£410k total value):",
        highlights: [
          {
            name: "NorthStar Energy (£160k)",
            status: "Last contact 16 days ago with Lead Architect.",
            action: "Auto-drafted personalized check-in email queued for AE review."
          },
          {
            name: "Solaria Health (£135k)",
            status: "No response to proposal sent on 22nd Aug.",
            action: "Created high-priority follow-up task for Account Executive."
          }
        ],
        meta: "Generated via MCP Tool: salesforce_dormancy_scanner · Auto-tasks staged in CRM"
      }
    },
    performance: {
      question: "Summarize this month's sales performance against target.",
      context: "Salesforce CRM · Target vs Actual · EMEA & APAC",
      answer: {
        summary: "Month-to-date closed revenue stands at £540,000 (92% of monthly target with 6 working days remaining):",
        highlights: [
          {
            name: "Top Performing Region",
            status: "UK & Northern Europe (108% of quota attained).",
            action: "Driven by 2 enterprise multi-cloud migrations."
          },
          {
            name: "Conversion Rate Milestone",
            status: "Proposal-to-Close velocity improved from 28 days to 17 days.",
            action: "AI-assisted quote generation reduced draft cycle by 65%."
          }
        ],
        meta: "Generated via MCP Tool: salesforce_executive_revenue_summary · Live Salesforce Data"
      }
    }
  };

  const workflowStages = [
    { id: 1, label: 'Lead Ingestion', status: 'Completed', detail: 'Inbound inquiry captured & normalized' },
    { id: 2, label: 'AI Qualification', status: 'Completed', detail: 'BANT scoring & intent signals verified' },
    { id: 3, label: 'Deep Research', status: 'Processing', detail: 'Company financials & tech stack mapped' },
    { id: 4, label: 'Opportunity Created', status: 'Updating', detail: 'Auto-populated fields & pricebooks' },
    { id: 5, label: 'Follow-Up Drafted', status: 'Queued', detail: 'Customized email & technical deck' },
    { id: 6, label: 'CRM Sync', status: 'Queued', detail: 'Tasks & pipeline stages updated' },
    { id: 7, label: 'Manager Alert', status: 'Queued', detail: 'Executive Slack summary dispatched' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#070B19] text-white selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA] relative overflow-x-hidden font-sans">
      <SEO
        title="Claudeforce: Enterprise Anthropic Claude & Salesforce Integration | ArrayMinds"
        description="How ArrayMinds uses and extends Claudeforce (Salesforce × Anthropic) with custom business skills and MCP to create practical AI employees for enterprise CRM."
        keywords="Claudeforce, Anthropic Claude Salesforce, Salesforce AI Employees, Model Context Protocol MCP, Claude CRM Integration, ArrayMinds Salesforce AI"
        canonicalPath="/ai-implementations/claudeforce"
      />

      {/* Background Video & Image Layer - Full Frame with Symmetrical Cinematic Edge Fades */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={claudeforceBgImg}
          className="w-full h-full object-cover opacity-75 filter brightness-105 contrast-105 saturate-110"
        >
          <source src={claudeforceBgVideo} type="video/mp4" />
        </video>

        {/* 1. Global Ambient Base Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070B19]/55 via-[#0A1128]/65 to-[#070B19]/80" />

        {/* 2. Symmetrical Left & Right Cinematic Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-[#070B19] via-[#070B19]/60 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-[#070B19] via-[#070B19]/70 to-transparent" />

        {/* 3. Soft Radial Vignette for Center Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#070B19_95%)]" />
      </div>

      <div className="relative z-10">

        {/* ==================================================
            1. HERO SECTION
            ================================================== */}
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Top Navigation */}
            <div className="flex items-center justify-between mb-8">
              <Link
                to="/ai-implementations"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A99B5] hover:text-[#7FE4EA] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to AI Implementations</span>
              </Link>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-mono text-[#7FE4EA]">
                  <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
                  Salesforce × Anthropic Claude
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Heading, Value Prop, CTAs */}
              <div className="lg:col-span-6 space-y-6 text-left">
                
                {/* Eyebrow Badge */}
                <div className="gsap-cf-hero-item inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00C2CB]/30 backdrop-blur-md shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#7FE4EA] uppercase">
                    AI IMPLEMENTATION · CLAUDEFORCE · SALESFORCE · ANTHROPIC CLAUDE · MCP
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="gsap-cf-hero-item text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                  From AI Assistant <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
                    to AI Employee
                  </span>
                </h1>

                {/* Subheading */}
                <p className="gsap-cf-hero-item text-base sm:text-lg text-white font-medium leading-relaxed">
                  How ArrayMinds uses Claudeforce to connect Claude with Salesforce and turn business processes into intelligent, automated work.
                </p>

                {/* Supporting Text */}
                <p className="gsap-cf-hero-item text-sm sm:text-base text-[#C7CDDA] leading-relaxed font-normal">
                  We extend the capabilities of Claudeforce with custom business skills, MCP-connected workflows, and Salesforce integrations — enabling AI employees to handle sales, CRM administration, reporting, research, and repetitive business operations.
                </p>

                {/* CTAs */}
                <div className="gsap-cf-hero-item pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => smoothScrollTo('#what-is-claudeforce')}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-300 shadow-xl shadow-[#00C2CB]/25 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>Explore How It Works</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
                  >
                    <span>Talk to ArrayMinds</span>
                    <ArrowRight className="w-4 h-4 text-[#00C2CB]" />
                  </Link>
                </div>

              </div>

              {/* Right Column: Premium Enterprise Architecture Visual */}
              <div className="lg:col-span-6">
                <div className="gsap-cf-arch-card relative rounded-3xl bg-[#0A1024]/95 border border-white/[0.12] p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
                  
                  {/* Top Window Bar */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08] mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-[#8A99B5] ml-2">enterprise-architecture-map.live</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00C2CB]/10 text-[#7FE4EA] border border-[#00C2CB]/30">
                      CONNECTED ECOSYSTEM
                    </span>
                  </div>

                  {/* Architecture Diagram Pipeline */}
                  <div className="space-y-2.5 text-xs font-mono">
                    
                    {/* 1. Salesforce */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#00A1E0]/20 flex items-center justify-center text-[#00A1E0] font-bold">SF</div>
                        <div>
                          <span className="text-white font-bold block">SALESFORCE</span>
                          <span className="text-[11px] text-[#8A99B5]">Enterprise CRM Data & Core Foundation</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Core Data</span>
                    </div>

                    <div className="text-center text-[#00C2CB] text-sm">↓</div>

                    {/* 2. Claudeforce & Claude */}
                    <div className="p-3 rounded-xl bg-[#00C2CB]/[0.08] border border-[#00C2CB]/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#D97706]/20 flex items-center justify-center text-[#F59E0B] font-bold">✴</div>
                        <div>
                          <span className="text-[#7FE4EA] font-bold block">CLAUDEFORCE × ANTHROPIC CLAUDE</span>
                          <span className="text-[11px] text-[#C7CDDA]">Salesforce-Anthropic Intelligence & Reasoning</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#7FE4EA] bg-[#00C2CB]/15 px-2 py-0.5 rounded">Capability</span>
                    </div>

                    <div className="text-center text-[#00C2CB] text-sm">↓</div>

                    {/* 3. MCP */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center text-[#00C2CB]">
                          <Server className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-white font-bold block">MODEL CONTEXT PROTOCOL (MCP)</span>
                          <span className="text-[11px] text-[#8A99B5]">Secure Connection Layer to Business Tools</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#C7CDDA] bg-white/[0.06] px-2 py-0.5 rounded">Protocol</span>
                    </div>

                    <div className="text-center text-[#00C2CB] text-sm">↓</div>

                    {/* 4. ArrayMinds Custom Skills */}
                    <div className="p-3 rounded-xl bg-gradient-to-r from-[#00C2CB]/20 to-[#1B3B6F]/40 border border-[#00C2CB]/40 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-[#00C2CB] flex items-center justify-center text-[#032B2E] font-bold">AM</div>
                        <div>
                          <span className="text-white font-bold block">ARRAYMINDS CUSTOM SKILLS</span>
                          <span className="text-[11px] text-[#7FE4EA]">50+ Bespoke Workflows & Business Logic</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-white bg-[#00C2CB] font-bold px-2 py-0.5 rounded text-[#032B2E]">ArrayMinds Layer</span>
                    </div>

                    <div className="text-center text-[#00C2CB] text-sm">↓</div>

                    {/* 5. AI Employee Outcome */}
                    <div className="p-3.5 rounded-xl bg-emerald-500/[0.1] border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-white font-bold block">AI EMPLOYEE → REAL BUSINESS WORK</span>
                          <span className="text-[11px] text-emerald-300">Automated Pipeline, CRM Admin, Reports & Actions</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">Live Execution</span>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            2. WHAT IS CLAUDEFORCE?
            ================================================== */}
        <section id="what-is-claudeforce" className="py-20 md:py-24 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                Understanding the Technology
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Claude Meets Salesforce
              </h2>
              <p className="text-sm sm:text-base text-[#C7CDDA] leading-relaxed">
                Claudeforce brings Anthropic's Claude intelligence into the Salesforce ecosystem, allowing AI to work with business context, CRM data, workflows, and governed actions.
              </p>
            </div>

            {/* 3-Part Architecture Formula */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Part 1: Salesforce */}
              <div className="md:col-span-3 p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#00A1E0]/15 flex items-center justify-center text-[#00A1E0] mx-auto font-bold text-lg">
                  SF
                </div>
                <h3 className="text-lg font-bold text-white">Salesforce</h3>
                <p className="text-xs text-[#8A99B5] leading-relaxed">
                  Business data, CRM records, workflows and business context
                </p>
              </div>

              {/* Plus Symbol */}
              <div className="md:col-span-1 text-center text-2xl font-black text-[#00C2CB]">
                +
              </div>

              {/* Part 2: Claude */}
              <div className="md:col-span-3 p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#D97706]/15 flex items-center justify-center text-[#F59E0B] mx-auto text-xl font-bold">
                  ✴
                </div>
                <h3 className="text-lg font-bold text-white">Claude</h3>
                <p className="text-xs text-[#8A99B5] leading-relaxed">
                  Reasoning, analysis and natural-language interaction
                </p>
              </div>

              {/* Plus Symbol */}
              <div className="md:col-span-1 text-center text-2xl font-black text-[#00C2CB]">
                +
              </div>

              {/* Part 3: MCP */}
              <div className="md:col-span-4 p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#00C2CB]/15 flex items-center justify-center text-[#00C2CB] mx-auto">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">MCP</h3>
                <p className="text-xs text-[#8A99B5] leading-relaxed">
                  The connection layer that allows Claude to work with business systems and tools
                </p>
              </div>

            </div>

            {/* Equals Banner */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-[#00C2CB]/10 via-[#1B3B6F]/20 to-[#00C2CB]/10 border border-[#00C2CB]/30 text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8A99B5] block mb-1">= Result</span>
              <p className="text-lg sm:text-xl font-extrabold text-white">
                AI-Powered Salesforce Work
              </p>
            </div>

          </div>
        </section>


        {/* ==================================================
            3. WHY WE USE IT
            ================================================== */}
        <section id="why-claudeforce" className="py-20 md:py-24 bg-white/[0.02] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Why Claudeforce?
              </h2>
              <p className="text-base sm:text-lg text-[#7FE4EA] font-medium">
                Because AI becomes far more useful when it can work with the business itself.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="gsap-cf-why-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/10 text-[#00C2CB] flex items-center justify-center">
                    <Database className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#7FE4EA] transition-colors uppercase tracking-wider">
                    1. Salesforce Context
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                    Claude can work with relevant Salesforce business information instead of operating in isolation.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="gsap-cf-why-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/10 text-[#00C2CB] flex items-center justify-center">
                    <Workflow className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#7FE4EA] transition-colors uppercase tracking-wider">
                    2. Less Manual CRM Work
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                    Automate repetitive sales and administrative activities that normally require people to constantly work inside Salesforce.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="gsap-cf-why-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/10 text-[#00C2CB] flex items-center justify-center">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#7FE4EA] transition-colors uppercase tracking-wider">
                    3. Direct Access to BI
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                    Managers can ask questions and get Salesforce insights through Claude without repeatedly navigating through CRM screens and reports.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="gsap-cf-why-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/10 text-[#00C2CB] flex items-center justify-center">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#7FE4EA] transition-colors uppercase tracking-wider">
                    4. AI That Can Act
                  </h3>
                  <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                    Move beyond simple answers toward AI-assisted actions across business workflows.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            4. FROM PREBUILT SKILLS TO CUSTOM SKILLS
            ================================================== */}
        <section id="skills-section" className="py-20 md:py-24 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                Extension & Specialization
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                We Don't Stop at the Pre-Built Skills
              </h2>
              <p className="text-sm sm:text-base text-[#C7CDDA]">
                Salesforce provides a foundation of pre-built sales capabilities. ArrayMinds extends that foundation with additional custom skills designed around specific business requirements and workflows.
              </p>
            </div>

            {/* Visual Formula Block */}
            <div className="gsap-cf-skills-box rounded-3xl bg-[#0A1024] border border-white/[0.12] p-8 sm:p-12 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-center">
                
                {/* 37 Prebuilt */}
                <div className="md:col-span-3 space-y-2">
                  <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">37</div>
                  <div className="text-xs sm:text-sm font-bold tracking-wider text-[#8A99B5] uppercase">
                    Pre-Built Sales Skills
                  </div>
                  <span className="text-[11px] text-[#64748B] block">Provided by Foundation</span>
                </div>

                {/* Plus */}
                <div className="md:col-span-1 text-3xl font-black text-[#00C2CB]">
                  +
                </div>

                {/* 50+ Custom Skills */}
                <div className="md:col-span-4 space-y-2 p-5 rounded-2xl bg-[#00C2CB]/10 border border-[#00C2CB]/30">
                  <div className="text-5xl sm:text-6xl font-black text-[#00C2CB] tracking-tight">50+</div>
                  <div className="text-xs sm:text-sm font-bold tracking-wider text-[#7FE4EA] uppercase">
                    Custom Business Skills
                  </div>
                  <span className="text-[11px] text-[#C7CDDA] block">Engineered by ArrayMinds</span>
                </div>

                {/* Equals */}
                <div className="md:col-span-1 text-3xl font-black text-[#00C2CB]">
                  =
                </div>

                {/* Result */}
                <div className="md:col-span-3 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-base sm:text-lg font-black text-white uppercase tracking-tight">
                    Business-Specific AI Employees
                  </div>
                  <span className="text-[11px] text-emerald-300 block">Tailored to How You Operate</span>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* ==================================================
            5. HOW WE USE CLAUDEFORCE: WE GIVE AI A JOB TO DO
            ================================================== */}
        <section className="py-20 md:py-24 bg-white/[0.02] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                Operational Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                We Give AI a Job to Do
              </h2>
              <p className="text-sm sm:text-base text-[#8A99B5]">
                Represented not as a chatbot, but as an active software employee operating across Salesforce and connected business tools.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Sales Responsibilities */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-[#00C2CB]">
                    <TrendingUp className="w-5 h-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Sales Responsibilities</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#C7CDDA]">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Research opportunities</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Analyze pipeline</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Prepare follow-ups</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Update CRM</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Create tasks</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-[#7FE4EA]">
                    <BarChart3 className="w-5 h-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Management Oversight</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#C7CDDA]">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7FE4EA]" /> Pipeline analysis</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7FE4EA]" /> Sales reports</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7FE4EA]" /> Opportunity insights</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#7FE4EA]" /> Priority identification</li>
                  </ul>
                </div>
              </div>

              {/* Center: AI Employee Cockpit Visual */}
              <div className="lg:col-span-4 text-center">
                <div className="p-8 rounded-3xl bg-[#0D152E] border-2 border-[#00C2CB]/40 shadow-2xl space-y-6 relative overflow-hidden">
                  <div className="w-20 h-20 rounded-2xl bg-[#00C2CB]/20 text-[#00C2CB] flex items-center justify-center mx-auto shadow-inner border border-[#00C2CB]/40">
                    <Bot className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-[#7FE4EA] uppercase tracking-widest block mb-1">
                      Connected Agent Core
                    </span>
                    <h4 className="text-xl font-black text-white">
                      AI Business Employee
                    </h4>
                    <p className="text-xs text-[#8A99B5] mt-2">
                      Operating via MCP Protocol across Salesforce standard & custom objects
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Active Background Worker
                  </div>
                </div>
              </div>

              {/* Right Column: Administrative Responsibilities */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] space-y-3">
                  <div className="flex items-center gap-2 text-[#00C2CB]">
                    <FileText className="w-5 h-5" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">Administration Responsibilities</h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#C7CDDA]">
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Update records</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Prepare summaries</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Organize information</li>
                    <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#00C2CB]" /> Reduce repetitive CRM work</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#101B3A] to-[#0A1128] border border-[#00C2CB]/30 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7FE4EA] block">
                    ArrayMinds Guarantee
                  </span>
                  <p className="text-xs text-[#C7CDDA] leading-relaxed">
                    Zero custom code maintenance on your end. We configure the workflows and security boundaries around your existing Salesforce setup.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            6. MANAGER EXPERIENCE: ASK CLAUDE. GET THE BUSINESS ANSWER.
            ================================================== */}
        <section id="manager-experience" className="py-20 md:py-28 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                Executive & Manager Experience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Ask Claude. Get the Business Answer.
              </h2>
            </div>

            {/* Key Highlight Callout */}
            <div className="mb-12 p-6 rounded-3xl bg-gradient-to-r from-[#00C2CB]/15 via-[#102450] to-[#00C2CB]/15 border border-[#00C2CB]/40 text-center shadow-xl">
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                "The CRM comes to the manager — <br className="hidden sm:block" />
                <span className="text-[#7FE4EA]">instead of the manager going to the CRM."</span>
              </p>
            </div>

            {/* Claude-Style Conversation Interface */}
            <div className="gsap-cf-chat-box rounded-3xl bg-[#0B1228] border border-white/[0.1] shadow-2xl overflow-hidden">
              
              {/* Question Tab Selector */}
              <div className="flex border-b border-white/[0.08] bg-[#060A16] overflow-x-auto">
                <button
                  onClick={() => setActivePromptTab('pipeline')}
                  className={`px-6 py-3.5 text-xs sm:text-sm font-semibold transition-colors border-r border-white/[0.08] whitespace-nowrap ${
                    activePromptTab === 'pipeline' ? 'bg-[#0B1228] text-[#7FE4EA] border-b-2 border-b-[#00C2CB]' : 'text-[#8A99B5] hover:text-white'
                  }`}
                >
                  Prompt 1: Pipeline Attention
                </button>
                <button
                  onClick={() => setActivePromptTab('inactivity')}
                  className={`px-6 py-3.5 text-xs sm:text-sm font-semibold transition-colors border-r border-white/[0.08] whitespace-nowrap ${
                    activePromptTab === 'inactivity' ? 'bg-[#0B1228] text-[#7FE4EA] border-b-2 border-b-[#00C2CB]' : 'text-[#8A99B5] hover:text-white'
                  }`}
                >
                  Prompt 2: Inactive Opportunities
                </button>
                <button
                  onClick={() => setActivePromptTab('performance')}
                  className={`px-6 py-3.5 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                    activePromptTab === 'performance' ? 'bg-[#0B1228] text-[#7FE4EA] border-b-2 border-b-[#00C2CB]' : 'text-[#8A99B5] hover:text-white'
                  }`}
                >
                  Prompt 3: Month's Sales Performance
                </button>
              </div>

              {/* Chat Canvas */}
              <div className="p-6 sm:p-8 space-y-6">
                
                {/* User Message */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs text-white shrink-0">
                    VP
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-white/[0.05] border border-white/10 text-sm text-white max-w-2xl font-medium">
                    "{managerScenarios[activePromptTab].question}"
                  </div>
                </div>

                {/* Claude Response */}
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#D97706]/20 text-[#F59E0B] flex items-center justify-center font-bold text-sm shrink-0 border border-[#D97706]/40">
                    ✴
                  </div>
                  <div className="space-y-4 max-w-3xl flex-1">
                    <div className="p-5 rounded-2xl rounded-tl-none bg-[#070D1E] border border-white/[0.08] space-y-4 text-xs sm:text-sm text-[#C7CDDA]">
                      
                      <div className="text-[11px] font-mono text-[#00C2CB]">
                        {managerScenarios[activePromptTab].context}
                      </div>

                      <p className="text-white font-medium">
                        {managerScenarios[activePromptTab].answer.summary}
                      </p>

                      <div className="space-y-3 pt-2">
                        {managerScenarios[activePromptTab].answer.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                            <span className="font-bold text-[#7FE4EA] block">{h.name}</span>
                            <span className="text-slate-300 block">{h.status}</span>
                            <span className="text-[11px] font-mono text-emerald-400 block pt-0.5">→ {h.action}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-white/[0.06] text-[10px] font-mono text-[#8A99B5]">
                        {managerScenarios[activePromptTab].answer.meta}
                      </div>

                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            7. SALESFORCE AUTOMATION FLOW
            ================================================== */}
        <section id="automation-pipeline" className="py-20 md:py-24 bg-white/[0.02] border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                End-to-End Automation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Automate the Work Behind the Sales Team
              </h2>
              <p className="text-sm sm:text-base text-[#8A99B5]">
                Watch how repetitive tasks move autonomously through the pipeline with live execution states.
              </p>
            </div>

            {/* 7-Step Pipeline Visual */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {workflowStages.map((stage, idx) => (
                <div 
                  key={stage.id}
                  className={`gsap-cf-pipeline-step p-4 rounded-2xl border transition-all duration-300 text-left flex flex-col justify-between ${
                    stage.status === 'Completed'
                      ? 'bg-[#0B1228] border-emerald-500/30'
                      : stage.status === 'Processing' || stage.status === 'Updating'
                      ? 'bg-[#00C2CB]/10 border-[#00C2CB] shadow-lg shadow-[#00C2CB]/20'
                      : 'bg-[#0B1228]/50 border-white/[0.06] opacity-70'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono font-bold text-[#8A99B5]">0{stage.id}</span>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                        stage.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' :
                        stage.status === 'Processing' ? 'bg-[#00C2CB]/20 text-[#7FE4EA] animate-pulse' :
                        stage.status === 'Updating' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-white/5 text-slate-400'
                      }`}>
                        {stage.status}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{stage.label}</h4>
                    <p className="text-[11px] text-[#A0ABC0] leading-snug">{stage.detail}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>


        {/* ==================================================
            8. THE ARRAYMINDS LAYER: WHERE ARRAYMINDS COMES IN
            ================================================== */}
        <section className="py-20 md:py-28 border-b border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                Our Role & Value Add
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Where ArrayMinds Comes In
              </h2>
              <p className="text-sm sm:text-base text-[#C7CDDA] leading-relaxed">
                ArrayMinds designs and implements the business-specific layer around these technologies — connecting systems, creating custom skills, defining workflows, and shaping AI employees around how each organization actually operates.
              </p>
            </div>

            {/* Architecture Stack */}
            <div className="max-w-4xl mx-auto space-y-3 font-mono text-xs sm:text-sm">
              
              <div className="p-4 rounded-2xl bg-[#0B1228] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">1. Salesforce</span>
                  <span className="text-xs text-[#8A99B5]">Business Data + CRM Core</span>
                </div>
                <span className="text-xs text-slate-400">Foundation</span>
              </div>

              <div className="text-center text-[#00C2CB]">↓</div>

              <div className="p-4 rounded-2xl bg-[#0B1228] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="font-bold text-[#7FE4EA] block">2. Claudeforce</span>
                  <span className="text-xs text-[#C7CDDA]">Claude + Salesforce Intelligence</span>
                </div>
                <span className="text-xs text-slate-400">Capability</span>
              </div>

              <div className="text-center text-[#00C2CB]">↓</div>

              <div className="p-4 rounded-2xl bg-[#0B1228] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">3. MCP</span>
                  <span className="text-xs text-[#8A99B5]">Secure Tool / System Connectivity</span>
                </div>
                <span className="text-xs text-slate-400">Protocol</span>
              </div>

              <div className="text-center text-[#00C2CB]">↓</div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#00C2CB]/25 to-[#102450] border-2 border-[#00C2CB] flex items-center justify-between shadow-xl">
                <div>
                  <span className="font-bold text-white text-base block">4. ArrayMinds Implementation</span>
                  <span className="text-xs text-[#7FE4EA]">Custom Skills + Business Logic + Workflow Design</span>
                </div>
                <span className="text-xs font-bold text-[#032B2E] bg-[#00C2CB] px-3 py-1 rounded-full">Our Core Value</span>
              </div>

              <div className="text-center text-[#00C2CB]">↓</div>

              <div className="p-4 rounded-2xl bg-[#0B1228] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">5. AI Employees</span>
                  <span className="text-xs text-[#8A99B5]">Role-Specific Business Automation</span>
                </div>
                <span className="text-xs text-slate-400">Deployment</span>
              </div>

              <div className="text-center text-[#00C2CB]">↓</div>

              <div className="p-4 rounded-2xl bg-emerald-500/[0.1] border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-300 block">6. Business Outcomes</span>
                  <span className="text-xs text-white">Less Manual Work · Faster Execution · Better Visibility</span>
                </div>
                <span className="text-xs text-emerald-400 font-bold">ROI</span>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            9. AI EMPLOYEE EXAMPLES
            ================================================== */}
        <section id="role-cards" className="py-20 md:py-24 bg-white/[0.02] border-b border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                Specialized Roles
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                AI Employees for Real Business Roles
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Sales AI Employee */}
              <div className="gsap-cf-role-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/15 text-[#00C2CB] flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  Sales AI Employee
                </h3>
                <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                  Works with CRM information, opportunities, follow-ups and pipeline activities.
                </p>
              </div>

              {/* Marketing AI Employee */}
              <div className="gsap-cf-role-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#7FE4EA]/15 text-[#7FE4EA] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  Marketing AI Employee
                </h3>
                <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                  Supports research, content workflows, campaign operations and repetitive marketing tasks.
                </p>
              </div>

              {/* Research AI Employee */}
              <div className="gsap-cf-role-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00C2CB]/15 text-[#00C2CB] flex items-center justify-center font-bold">
                  <Search className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  Research AI Employee
                </h3>
                <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                  Finds, processes and summarizes relevant business information.
                </p>
              </div>

              {/* Manager AI Employee */}
              <div className="gsap-cf-role-card p-6 rounded-2xl bg-[#0B1228] border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all duration-300 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#7FE4EA]/15 text-[#7FE4EA] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  Manager AI Employee
                </h3>
                <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                  Provides business insights, reports, summaries and decision-support directly through Claude.
                </p>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            10. BEFORE VS AFTER COMPARISON
            ================================================== */}
        <section className="py-20 md:py-24 border-b border-white/[0.08]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#00C2CB] bg-[#00C2CB]/10 px-3.5 py-1 rounded-full border border-[#00C2CB]/30">
                The Shift
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                From CRM Administration to Business Execution
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* BEFORE */}
              <div className="p-8 rounded-3xl bg-[#0B1228] border border-red-500/20 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-sm font-bold uppercase tracking-widest text-red-400">BEFORE</span>
                  <span className="text-xs text-red-400/80 font-mono">Manual CRM Overhead</span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-[#C7CDDA]">
                  <p>Open CRM</p>
                  <p className="text-[#8A99B5]">→ Find records</p>
                  <p className="text-[#8A99B5]">→ Build reports</p>
                  <p className="text-[#8A99B5]">→ Analyze data</p>
                  <p className="text-[#8A99B5]">→ Update records</p>
                  <p className="text-[#8A99B5]">→ Create tasks</p>
                  <p className="text-[#8A99B5]">→ Follow up manually</p>
                </div>
              </div>

              {/* AFTER */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0D1B3E] to-[#070D1E] border-2 border-[#00C2CB]/50 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#00C2CB]/30">
                  <span className="text-sm font-bold uppercase tracking-widest text-[#00C2CB]">AFTER</span>
                  <span className="text-xs text-emerald-400 font-mono">AI Employee Automation</span>
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-white font-medium">
                  <p className="text-[#7FE4EA] font-bold">Ask Claude</p>
                  <p>→ AI understands business context</p>
                  <p>→ AI analyzes Salesforce data</p>
                  <p>→ AI performs configured actions</p>
                  <p>→ AI updates workflows</p>
                  <p className="text-emerald-400 font-bold">→ Manager reviews when required</p>
                </div>
              </div>

            </div>

          </div>
        </section>


        {/* ==================================================
            11. CORE PHILOSOPHY
            ================================================== */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#0A1128] via-[#0E1A38] to-[#070B19] border-b border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              "Don't give AI a prompt. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
                Give AI a job."
              </span>
            </h2>

            <p className="text-base sm:text-xl text-[#C7CDDA] leading-relaxed max-w-2xl mx-auto font-normal">
              The goal is not another chatbot. The goal is to create AI employees that understand a business process, have access to the right systems and tools, follow defined rules, and complete meaningful work.
            </p>

          </div>
        </section>


        {/* ==================================================
            12. FINAL CTA
            ================================================== */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-r from-[#0E1A38] via-[#102450] to-[#0A1228] border border-[#00C2CB]/40 p-8 sm:p-14 text-center overflow-hidden shadow-2xl space-y-6">
              
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#00C2CB]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-3xl sm:text-4xl font-black text-white max-w-xl mx-auto leading-tight">
                Ready to Build Your AI Employees?
              </h2>

              <p className="text-sm sm:text-base text-[#C7CDDA] max-w-xl mx-auto leading-relaxed">
                ArrayMinds helps businesses turn Salesforce, Claude, MCP, and custom AI capabilities into practical systems that automate real work.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/contact"
                  className="px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-300 shadow-xl shadow-[#00C2CB]/25 hover:scale-105"
                >
                  Build With ArrayMinds →
                </Link>
                <Link
                  to="/ai-implementations"
                  className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 transition-colors"
                >
                  Explore AI Implementations →
                </Link>
              </div>

            </div>
          </div>
        </section>

      </div>

      <FloatingScrollTop />
    </div>
  );
};

export default Claudeforce;
