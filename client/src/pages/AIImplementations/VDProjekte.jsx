import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  Search, 
  Calculator, 
  UserCheck, 
  Building2,
  ExternalLink,
  ShieldCheck,
  Check,
  X,
  Workflow,
  Cpu,
  Layers,
  Bot,
  MessageSquare,
  Send,
  Database,
  ArrowDown,
  Terminal,
  Activity,
  Play,
  RotateCcw,
  Smartphone,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Assets
import vdProjekteImg from '../../assets/Ai-Implementations/VD-1.png';
import vdPageBg from '../../assets/Ai-Implementations/vd-page Background.png';
import vdHeroVideo from '../../assets/Ai-Implementations/VD Projekte GmbH.mp4';

const VDProjekte = () => {
  // State for interactive 8-stage stepper
  const [activeStage, setActiveStage] = useState(0);

  // State for Slack Human-in-the-Loop interactive approval widget
  const [approvalStatus, setApprovalStatus] = useState('pending'); // 'pending' | 'approved' | 'adjust'

  // State for Before vs After tab switcher
  const [comparisonMode, setComparisonMode] = useState('after'); // 'before' | 'after' | 'side-by-side'

  const workflowStages = [
    {
      num: '01',
      title: 'QUALIFIED LEAD',
      shortTitle: 'Lead Ingestion',
      desc: 'A qualified construction inquiry in Salesforce triggers the automated workflow.',
      icon: <FileText className="w-5 h-5 text-[#00C2CB]" />,
      system: 'Salesforce CRM',
      simulationData: {
        event: 'Salesforce Lead Status Changed → "Qualified Inquiry"',
        input: {
          inquiryId: 'VD-INQ-2024-884',
          projectType: 'Commercial Façade & Thermal Renovation',
          siteDimensions: '420 m² surface area, 3-story building',
          requestedMaterials: ['Thermal Insulation Panels', 'Facing Brickwork', 'Adhesive Mortar'],
          clientRegion: 'Baden-Württemberg, Germany'
        },
        output: 'Webhook dispatched to ArrayMinds MCP Orchestrator.'
      }
    },
    {
      num: '02',
      title: 'AI AGENT',
      shortTitle: 'Agent Ignition',
      desc: 'The AI agent is initiated using Claude.',
      icon: <Bot className="w-5 h-5 text-[#7FE4EA]" />,
      system: 'Claude 3.5 Engine',
      simulationData: {
        agentStatus: 'Active Session Initialized',
        contextLoaded: 'VD Projekte Renovation Standards & German Construction Guidelines (DIN)',
        executionPlan: [
          'Parse project blueprint dimensions (420 m²)',
          'Query current German supplier catalog for facing bricks & mortar',
          'Compute material density and waste factor (+7%)'
        ]
      }
    },
    {
      num: '03',
      title: 'RESEARCH',
      shortTitle: 'Material Research',
      desc: 'The agent researches relevant information from the internet based on the requirements of the inquiry.',
      icon: <Search className="w-5 h-5 text-cyan-300" />,
      system: 'Internet & Supplier DB',
      simulationData: {
        queriesExecuted: [
          'Current supplier price / unit for Class A facing bricks (Germany)',
          'DIN standard thickness for commercial façade thermal insulation panels',
          'Standard cement mortar ratio and per-m² consumption'
        ],
        resultsMatched: '3 verified supplier catalogs indexed with real-time unit pricing.'
      }
    },
    {
      num: '04',
      title: 'QUANTITY ESTIMATION',
      shortTitle: 'Quantity Math',
      desc: 'The agent determines the required quantities for the construction-related materials.',
      icon: <Calculator className="w-5 h-5 text-[#00C2CB]" />,
      system: 'ArrayMinds Calc Engine',
      simulationData: {
        calculations: [
          { material: 'Facing Brickwork', formula: '420 m² × 48 bricks/m² (+5% reserve)', qty: '21,168 units' },
          { material: 'Thermal Insulation Panels (160mm)', formula: '420 m² (+3% waste factor)', qty: '432.6 m²' },
          { material: 'Facade Adhesive & Reinforcing Mortar', formula: '420 m² × 4.5 kg/m²', qty: '1,890 kg' }
        ]
      }
    },
    {
      num: '05',
      title: 'QUOTE CREATION',
      shortTitle: 'Line Item Draft',
      desc: 'The resulting quantities are converted into quotation line items.',
      icon: <Layers className="w-5 h-5 text-[#7FE4EA]" />,
      system: 'Quote Line Generator',
      simulationData: {
        draftQuoteId: 'VD-QT-2024-884',
        linesGenerated: [
          { item: '01. Facing Brickwork Installation', qty: '21,168 pcs', unit: 'Catalog Rate', status: 'Mapped' },
          { item: '02. Thermal Insulation Layer (DIN 4108)', qty: '433 m²', unit: 'Catalog Rate', status: 'Mapped' },
          { item: '03. Mineral Adhesive & Mortar Compound', qty: '1,890 kg', unit: 'Catalog Rate', status: 'Mapped' }
        ],
        state: 'Ready for supervisor sign-off'
      }
    },
    {
      num: '06',
      title: 'MANAGER REVIEW',
      shortTitle: 'Review Request',
      desc: 'Once the quote is sufficiently prepared, the manager receives a review request through the configured communication channel.',
      icon: <MessageSquare className="w-5 h-5 text-amber-400" />,
      system: 'Slack / WhatsApp Gateway',
      simulationData: {
        channel: 'Slack #vd-quote-approvals (or WhatsApp Business)',
        notificationPayload: {
          title: '🔔 New Quote Draft for Review: Inquiry #VD-884',
          summary: 'Commercial Façade Renovation (420 m²)',
          actionButtons: ['[ Approve & Send ]', '[ Edit Line Items ]', '[ Re-calculate ]']
        }
      }
    },
    {
      num: '07',
      title: 'APPROVAL',
      shortTitle: 'Manager Sign-off',
      desc: 'The manager reviews and approves the generated quotation.',
      icon: <UserCheck className="w-5 h-5 text-emerald-400" />,
      system: 'Human Oversight Gate',
      simulationData: {
        approvalStatus: 'APPROVED by Construction Supervisor',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        auditLog: 'Supervisor checked quantities, confirmed margin, and signed off with 1 click.'
      }
    },
    {
      num: '08',
      title: 'CUSTOMER',
      shortTitle: 'Customer Delivery',
      desc: 'After approval, the quotation can be sent to the customer.',
      icon: <Send className="w-5 h-5 text-[#00C2CB]" />,
      system: 'Salesforce Outbox',
      simulationData: {
        deliveryMethod: 'Customer Portal & Direct Email',
        salesforceRecordUpdated: 'Quote status → "Delivered to Customer"',
        outcome: 'Lead seamlessly progressed without manual spreadsheet research.'
      }
    }
  ];

  const techStack = [
    {
      name: 'Salesforce',
      role: 'Business Context & Trigger',
      desc: 'Provides the business context and workflow trigger when a lead is qualified.',
      icon: <Database className="w-5 h-5 text-[#00A1E0]" />,
      badge: 'CRM Layer'
    },
    {
      name: 'Claude',
      role: 'Core AI Intelligence',
      desc: 'Provides the cognitive reasoning used by the AI agent to parse construction specs.',
      icon: <Bot className="w-5 h-5 text-[#D97706]" />,
      badge: 'LLM Reasoning'
    },
    {
      name: 'MCP (Model Context Protocol)',
      role: 'Tool & Protocol Bridge',
      desc: 'Connects the agent securely with required tools, search endpoints, and internal databases.',
      icon: <Cpu className="w-5 h-5 text-[#00C2CB]" />,
      badge: 'Integration Bridge'
    },
    {
      name: 'ArrayMinds Custom Skills',
      role: 'Domain Logic & Estimation',
      desc: 'Specialized capabilities for construction quantity calculation and quote mapping.',
      icon: <Workflow className="w-5 h-5 text-[#7FE4EA]" />,
      badge: 'Custom Architecture'
    },
    {
      name: 'Business Workflow',
      role: 'Operational Integration',
      desc: 'Real-world execution integrated directly into the day-to-day business operations.',
      icon: <Layers className="w-5 h-5 text-emerald-400" />,
      badge: 'Execution'
    }
  ];

  const beforeSteps = [
    { title: 'Manual inquiry review', desc: 'Team manually reads incoming emails/forms without structured parsing.' },
    { title: 'Search for material requirements', desc: 'Browsing supplier PDF catalogs and online price sheets by hand.' },
    { title: 'Calculate quantities', desc: 'Manual spreadsheet math for brick counts, mortar ratios, and waste reserves.' },
    { title: 'Manually update quote lines', desc: 'Typing each line item one-by-one into quotation forms.' },
    { title: 'Prepare quote', desc: 'Manually assembling PDFs and formatting tables.' },
    { title: 'Send to customer', desc: 'Delivered after multiple days of turnaround delay.' }
  ];

  const afterSteps = [
    { title: 'Qualified lead in Salesforce', desc: 'Workflow triggers automatically the second a lead reaches qualified stage.' },
    { title: 'AI agent starts automatically', desc: 'Claude is invoked with project specifications and context.' },
    { title: 'Autonomous research', desc: 'Fetches verified supplier pricing and DIN construction standards.' },
    { title: 'Quantity estimation', desc: 'Exact formulaic math computes required materials and safety buffers.' },
    { title: 'Quote line items created', desc: 'Auto-generates structured quote line items mapped to CRM records.' },
    { title: 'Manager review via Slack/WhatsApp', desc: 'Supervisor gets an instant summary card with 1-click action buttons.' },
    { title: 'Approved quote sent to customer', desc: 'Delivered with full human approval in a fraction of previous time.' }
  ];

  const businessImpacts = [
    {
      title: 'Reduced Repetitive Manual Research',
      desc: 'Eliminated manual catalog browsing and repetitive quantity math for every incoming construction project.'
    },
    {
      title: 'Automated Quotation Preparation Steps',
      desc: 'Streamlined the entire draft generation from inquiry ingestion to line item creation.'
    },
    {
      title: 'Connected AI Directly to Salesforce',
      desc: 'Operates natively inside the CRM ecosystem rather than in disconnected external tools.'
    },
    {
      title: 'Kept Managers in Control',
      desc: 'Maintained strict human-in-the-loop oversight through fast Slack/WhatsApp approval channels.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#081026] text-white selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA] relative overflow-x-hidden">
      
      {/* Background Video Layer - Full Frame with Symmetrical Cinematic Edge Fades */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80 filter brightness-105 contrast-105 saturate-110"
        >
          <source src={vdHeroVideo} type="video/mp4" />
        </video>

        {/* 1. Global Ambient Base Tint */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1432]/35 via-[#0D1C44]/40 to-[#081026]/60" />

        {/* 2. Symmetrical Left & Right Cinematic Edge Blends */}
        <div className="absolute inset-y-0 left-0 w-40 sm:w-72 bg-gradient-to-r from-[#081026] via-[#081026]/50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-40 sm:w-72 bg-gradient-to-l from-[#081026] via-[#081026]/70 to-transparent" />

        {/* 3. Soft Radial Vignette for Natural Center-Focused Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#081026_95%)]" />
      </div>

      {/* ==================================================
          HERO SECTION
          ================================================== */}
      <section className="relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-white/[0.08]">
        {/* Ambient Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[340px] bg-gradient-to-tr from-[#00C2CB]/20 via-[#1B3B6F]/30 to-blue-800/20 blur-[140px] rounded-full pointer-events-none -z-0" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back Navigation */}
          <Link
            to="/ai-implementations"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A99B5] hover:text-[#7FE4EA] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to AI Implementations</span>
          </Link>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30 tracking-wider uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2CB]" />
              <span>AI IMPLEMENTATION · AI AGENTS · CONSTRUCTION</span>
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.05] text-[#C7CDDA] border border-white/10 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#00C2CB]" />
              <span>VD Projekte GmbH</span>
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-4xl">
            From Manual Quote Research to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              AI-Powered Quote Automation
            </span>
          </h1>

          {/* Short Hero Description */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#C7CDDA] max-w-3xl leading-relaxed">
            How ArrayMinds used Claude, Salesforce, MCP and custom AI skills to automate a previously manual construction quotation workflow.
          </p>

          {/* Quick Specification Pill Bar */}
          <div className="mt-8 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <p className="text-[10px] font-mono text-[#8A99B5] uppercase">Client / Domain</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">VD Projekte (Building Renovation)</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#8A99B5] uppercase">Trigger CRM</p>
              <p className="text-xs sm:text-sm font-bold text-[#7FE4EA] mt-0.5">Salesforce Qualified Lead</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#8A99B5] uppercase">Intelligence Engine</p>
              <p className="text-xs sm:text-sm font-bold text-white mt-0.5">Claude + MCP Architecture</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#8A99B5] uppercase">Oversight Channel</p>
              <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">Slack / WhatsApp Sign-off</p>
            </div>
          </div>

          {/* Hero Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-200 shadow-xl shadow-[#00C2CB]/20 hover:scale-105 active:scale-95"
            >
              <span>Talk to ArrayMinds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://vd-projekte.de/en/homepage-en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#C7CDDA] hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
            >
              <span>VD Projekte Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Hero Implementation Visual Frame */}
          <div className="mt-14 rounded-2xl bg-[#0D152E] border border-white/[0.12] p-2.5 sm:p-4 shadow-2xl overflow-hidden">
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.08] mb-3 bg-[#0A1024] rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-[#8A99B5] ml-2">
                  VD Projekte — Automated Quotation Workflow
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30">
                  Live Implementation
                </span>
              </div>
            </div>

            {/* Implementation Image */}
            <div className="relative rounded-xl overflow-hidden bg-black/60">
              <img
                src={vdPageBg}
                alt="VD Projekte AI Quote Automation Implementation"
                className="w-full h-auto object-cover max-h-[560px]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          THE CHALLENGE
          ================================================== */}
      <section className="relative z-10 py-16 md:py-20 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              The Challenge
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            A Manual Process Behind Every Quote
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed max-w-4xl">
            <p>
              When a construction-related inquiry came into VD Projekte, preparing a quote involved significant manual research.
            </p>
            <p>
              For a project, the team had to research the required construction materials and quantities — for example, determining how much brick, cement and other materials would be needed for a given project size.
            </p>
            <p>
              The team would search for the required information, work out the quantities, and manually update each quotation line item before sending the quote to the customer.
            </p>
          </div>

          {/* "Before" Workflow Visualization */}
          <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#0E1A38]/80 backdrop-blur-md border border-white/[0.09] shadow-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-[#8A99B5] mb-5">
              The Previous Repetitive Workflow
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                'Construction Inquiry',
                'Manual Research',
                'Quantity Estimation',
                'Manual Quote Line Creation',
                'Quote Preparation',
                'Customer'
              ].map((step, idx, arr) => (
                <div key={step} className="flex flex-col items-center text-center p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.06] relative">
                  <span className="text-[10px] font-mono text-[#8A99B5] mb-1">Step {idx + 1}</span>
                  <span className="text-xs font-semibold text-white/90">{step}</span>
                  {idx < arr.length - 1 && (
                    <span className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-[#8A99B5] text-xs font-bold z-10">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          THE ARRAYMINDS SOLUTION
          ================================================== */}
      <section className="relative z-10 py-16 md:py-20 border-b border-white/[0.08] bg-[#0A1432]/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              The Solution
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Turning the Process into an AI Workflow
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed max-w-4xl">
            <p>
              ArrayMinds designed and implemented an AI-assisted workflow that connects the qualified lead process in Salesforce with Claude and custom skills built by ArrayMinds.
            </p>
            <p>
              Once a lead is qualified, the workflow automatically initiates the next steps instead of requiring the team to manually perform the research.
            </p>
          </div>

          {/* Capabilities of the AI agent */}
          <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#0E1B3E]/85 backdrop-blur-md border border-white/[0.1] shadow-xl">
            <p className="text-sm font-bold uppercase tracking-wider text-[#7FE4EA] mb-4">
              The AI agent can:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {[
                'Understand the qualified inquiry',
                'Research the required information from the internet',
                'Determine the required material quantities',
                'Create the appropriate quotation line items',
                'Prepare the quote for review'
              ].map((cap) => (
                <div key={cap} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  <CheckCircle2 className="w-4 h-4 text-[#00C2CB] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-white/90 font-medium">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Message Callout */}
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#00C2CB]/15 via-[#1B3B6F]/25 to-transparent border-l-4 border-[#00C2CB] border-y border-r border-white/[0.09] backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA] mb-1">
              The Core Philosophy
            </p>
            <p className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              The AI does not replace the business process. It becomes part of the business process.
            </p>
          </div>

        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS (INTERACTIVE 8-STAGE WORKFLOW PIPELINE)
          ================================================== */}
      <section className="relative z-10 py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              How It Works
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                From Qualified Lead to Customer-Ready Quote
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mt-2">
                Click on any stage below to inspect the real-time AI execution data and system handoffs.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#00C2CB] bg-[#00C2CB]/10 px-3 py-1.5 rounded-full border border-[#00C2CB]/30 shrink-0">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>Interactive Workflow Simulator</span>
            </div>
          </div>

          {/* 8-Stage Stepper Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 mb-8">
            {workflowStages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stage.num}
                  type="button"
                  onClick={() => setActiveStage(idx)}
                  className={`p-3.5 rounded-xl text-left transition-all duration-200 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#00C2CB]/20 border-[#00C2CB] ring-2 ring-[#00C2CB]/30 shadow-lg shadow-[#00C2CB]/15 -translate-y-1 backdrop-blur-md'
                      : 'bg-[#0E1A38]/80 backdrop-blur-sm border-white/[0.08] hover:bg-[#122248] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-[#7FE4EA]' : 'text-[#8A99B5]'}`}>
                      {stage.num}
                    </span>
                    <div className="scale-75 origin-right">
                      {stage.icon}
                    </div>
                  </div>
                  <p className={`text-xs font-bold leading-tight line-clamp-2 ${isSelected ? 'text-white' : 'text-[#C7CDDA]'}`}>
                    {stage.shortTitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Simulation Inspector Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A122A]/90 backdrop-blur-xl border border-[#00C2CB]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00C2CB]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#00C2CB]/15 border border-[#00C2CB]/30">
                  {workflowStages[activeStage].icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#00C2CB]">STAGE {workflowStages[activeStage].num}</span>
                    <span className="text-xs text-[#8A99B5]">·</span>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/[0.06] text-[#C7CDDA]">
                      {workflowStages[activeStage].system}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                    {workflowStages[activeStage].title}
                  </h3>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={activeStage === 0}
                  onClick={() => setActiveStage((prev) => Math.max(0, prev - 1))}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-white transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  disabled={activeStage === workflowStages.length - 1}
                  onClick={() => setActiveStage((prev) => Math.min(workflowStages.length - 1, prev + 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#00C2CB] hover:bg-[#7FE4EA] disabled:opacity-30 disabled:pointer-events-none text-xs font-bold text-[#032B2E] transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>

            {/* Stage Description & Live Terminal Payload */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-sm sm:text-base text-[#C7CDDA] leading-relaxed">
                  {workflowStages[activeStage].desc}
                </p>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#7FE4EA]">Why this step matters</p>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Automating this specific touchpoint guarantees seamless data integrity between Salesforce CRM records and the quote line items.
                  </p>
                </div>
              </div>

              {/* Terminal Data Inspector */}
              <div className="lg:col-span-7 rounded-xl bg-[#060C1E]/95 border border-white/[0.1] p-4 font-mono text-xs overflow-x-auto shadow-inner">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/[0.08] text-[#8A99B5] text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#00C2CB]" />
                    <span>Live Execution Payload</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">● REAL-TIME HANDOFF</span>
                </div>
                <pre className="text-[#C7CDDA] leading-relaxed text-[11px] whitespace-pre-wrap">
                  {JSON.stringify(workflowStages[activeStage].simulationData, null, 2)}
                </pre>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          THE TECHNOLOGY ARCHITECTURE
          ================================================== */}
      <section className="relative z-10 py-16 md:py-20 border-b border-white/[0.08] bg-[#0A1432]/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              Technology Architecture
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            AI Connected to the Systems That Run the Business
          </h2>

          <p className="text-base sm:text-lg text-[#C7CDDA] max-w-3xl mb-10 leading-relaxed">
            The solution seamlessly ties together enterprise CRM triggers, foundation intelligence, tool integration protocols, and custom domain skills.
          </p>

          {/* Interactive Technology Architecture Cards */}
          <div className="space-y-3.5">
            {techStack.map((tech, idx) => (
              <div
                key={tech.name}
                className="p-4 sm:p-5 rounded-xl bg-[#0E1A38]/85 backdrop-blur-md border border-white/[0.09] hover:border-[#00C2CB]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] shrink-0">
                    {tech.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white">{tech.name}</h3>
                      <span className="text-[10px] font-semibold text-[#7FE4EA] px-2 py-0.5 rounded bg-[#00C2CB]/10 border border-[#00C2CB]/20">
                        {tech.badge}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">{tech.desc}</p>
                  </div>
                </div>
                <div className="sm:text-right shrink-0">
                  <span className="text-[10px] font-mono text-[#8A99B5] uppercase tracking-wider px-2 py-1 rounded bg-white/[0.04]">
                    Layer 0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          HUMAN IN THE LOOP (INTERACTIVE SLACK / WHATSAPP APPROVAL WIDGET)
          ================================================== */}
      <section className="relative z-10 py-16 md:py-24 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              Human Oversight
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-6">
            Automation With Human Oversight
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#C7CDDA] leading-relaxed max-w-4xl mb-10">
            <p>
              The AI-generated quotation is not blindly sent to the customer.
            </p>
            <p>
              Once the quotation is prepared, the system sends a review request to the responsible manager through the configured communication channel, such as Slack or WhatsApp.
            </p>
            <p>
              The manager reviews the generated information and approves it. Only after approval is the quote sent to the customer.
            </p>
          </div>

          {/* Interactive Chat / Slack Notification Simulation Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Chat Frame */}
            <div className="lg:col-span-7 rounded-3xl bg-[#091126]/90 backdrop-blur-xl border border-white/[0.12] p-5 sm:p-6 shadow-2xl">
              
              {/* Slack / Chat Channel Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-white">#vd-quote-approvals</span>
                  <span className="text-[10px] font-mono text-[#8A99B5]">Slack / WhatsApp Gateway</span>
                </div>
                <span className="text-[10px] text-[#8A99B5]">Just Now</span>
              </div>

              {/* Bot Message Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#00C2CB] flex items-center justify-center text-[#032B2E] font-bold text-[10px]">
                    AM
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>ArrayMinds AI Assistant</span>
                      <span className="text-[9px] font-mono bg-[#00C2CB]/20 text-[#7FE4EA] px-1.5 py-0.5 rounded">BOT</span>
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs space-y-1.5">
                  <p className="font-semibold text-[#7FE4EA]">
                    📋 Quotation Prepared for Review: <span className="text-white">Inquiry #VD-884</span>
                  </p>
                  <p className="text-[#C7CDDA]">
                    <strong>Project:</strong> Commercial Façade Renovation (420 m²)
                  </p>
                  <p className="text-[#C7CDDA]">
                    <strong>Estimated Materials:</strong> 21,168 Bricks · 433 m² Thermal Panels · 1,890 kg Mortar
                  </p>
                  <p className="text-[#8A99B5] text-[11px]">
                    All unit prices mapped from current verified German supplier database.
                  </p>
                </div>

                {/* Interactive Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setApprovalStatus('approved')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      approvalStatus === 'approved'
                        ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30'
                        : 'bg-emerald-600/90 hover:bg-emerald-500 text-white'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{approvalStatus === 'approved' ? '✓ Quote Approved' : 'Approve & Send to Client'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setApprovalStatus('adjust')}
                    className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      approvalStatus === 'adjust'
                        ? 'bg-amber-500 text-black font-bold'
                        : 'bg-white/[0.06] hover:bg-white/[0.1] text-[#C7CDDA]'
                    }`}
                  >
                    <span>Request Adjustment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setApprovalStatus('pending')}
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#8A99B5] hover:text-white text-xs"
                    title="Reset Simulator"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Status Banner */}
              {approvalStatus === 'approved' && (
                <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong>Verified Sign-off:</strong> Quote dispatched to customer portal & logged in Salesforce CRM.
                  </span>
                </div>
              )}

              {approvalStatus === 'adjust' && (
                <div className="mt-4 p-3.5 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-300 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Feedback Routed:</strong> Prompt agent initiated revision for supervisor notes.
                  </span>
                </div>
              )}

            </div>

            {/* Explanatory Callout */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-[#0E1A38]/85 backdrop-blur-md border border-white/[0.08] space-y-3 shadow-xl">
                <div className="flex items-center gap-2 text-[#7FE4EA] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#00C2CB]" />
                  <span>Controlled Automation Principle</span>
                </div>
                <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed">
                  Zero AI quotations are ever sent to customers without explicit human authorization.
                </p>
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  By bringing the review directly into Slack or WhatsApp, managers make decisions in seconds on their phone or laptop without logging into complex tools.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <UserCheck className="w-4 h-4" />
                </div>
                <p className="text-xs text-white/90 font-medium">
                  Controlled AI Automation Loop · 100% Manager Visibility
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================
          BEFORE VS AFTER (INTERACTIVE COMPARISON)
          ================================================== */}
      <section className="relative z-10 py-16 md:py-20 border-b border-white/[0.08] bg-[#0A1432]/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              Comparison
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              A Simpler Way to Prepare Construction Quotes
            </h2>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-white/[0.05] border border-white/[0.08] shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setComparisonMode('after')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  comparisonMode === 'after' ? 'bg-[#00C2CB] text-[#032B2E]' : 'text-[#C7CDDA] hover:text-white'
                }`}
              >
                AI Workflow
              </button>
              <button
                type="button"
                onClick={() => setComparisonMode('before')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  comparisonMode === 'before' ? 'bg-red-500/80 text-white' : 'text-[#C7CDDA] hover:text-white'
                }`}
              >
                Old Manual Way
              </button>
              <button
                type="button"
                onClick={() => setComparisonMode('side-by-side')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  comparisonMode === 'side-by-side' ? 'bg-white/20 text-white' : 'text-[#C7CDDA] hover:text-white'
                }`}
              >
                Side-by-Side
              </button>
            </div>
          </div>

          {/* Comparative Cards Grid */}
          <div className={`grid gap-6 ${comparisonMode === 'side-by-side' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
            
            {/* BEFORE COLUMN */}
            {(comparisonMode === 'before' || comparisonMode === 'side-by-side') && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1A38]/80 backdrop-blur-md border border-red-500/20 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-red-500/20">
                  <h3 className="text-base font-bold text-red-400 uppercase tracking-wider">
                    BEFORE: Manual Effort
                  </h3>
                  <span className="text-xs text-[#8A99B5]">Repetitive & Fragmented</span>
                </div>
                <div className="space-y-3">
                  {beforeSteps.map((step, idx) => (
                    <div key={step.title} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-semibold text-white/90">{step.title}</span>
                      </div>
                      <p className="text-xs text-[#8A99B5] ml-7.5">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AFTER COLUMN */}
            {(comparisonMode === 'after' || comparisonMode === 'side-by-side') && (
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0E1B3E]/90 backdrop-blur-md border border-emerald-500/30 shadow-xl shadow-emerald-500/5">
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-emerald-500/20">
                  <h3 className="text-base font-bold text-emerald-400 uppercase tracking-wider">
                    AFTER: ArrayMinds AI Workflow
                  </h3>
                  <span className="text-xs text-emerald-300 font-medium">Automated & Supervised</span>
                </div>
                <div className="space-y-3">
                  {afterSteps.map((step) => (
                    <div key={step.title} className="p-3 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                          ✓
                        </span>
                        <span className="text-sm font-semibold text-white">{step.title}</span>
                      </div>
                      <p className="text-xs text-[#A0ABC0] ml-7.5">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ==================================================
          BUSINESS IMPACT
          ================================================== */}
      <section className="relative z-10 py-16 md:py-20 border-b border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 mb-2">
            <span className="w-5 h-[2px] bg-[#00C2CB]" />
            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#00C2CB] uppercase">
              Business Impact
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-8">
            What Changed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {businessImpacts.map((impact) => (
              <div 
                key={impact.title}
                className="p-6 rounded-2xl bg-[#0E1A38]/85 backdrop-blur-md border border-white/[0.09] flex flex-col justify-between hover:border-[#00C2CB]/40 transition-colors shadow-lg"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-xl bg-[#00C2CB]/10 border border-[#00C2CB]/30 shrink-0">
                      <Check className="w-4 h-4 text-[#00C2CB]" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {impact.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {impact.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          FINAL CTA
          ================================================== */}
      <section className="relative z-10 py-20 bg-gradient-to-b from-[#081026]/85 via-[#0A1432]/90 to-[#0D1C44]/95 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Have a Business Workflow Worth Automating?
          </h2>
          
          <p className="mt-4 text-base sm:text-lg text-[#C7CDDA] max-w-xl mx-auto">
            ArrayMinds helps businesses move AI from experimentation into real operational workflows.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-200 shadow-xl shadow-[#00C2CB]/25 hover:scale-105 active:scale-95"
            >
              <span>Talk to ArrayMinds</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-implementations"
              className="inline-flex items-center px-6 py-3.5 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all"
            >
              Back to AI Implementations
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default VDProjekte;
