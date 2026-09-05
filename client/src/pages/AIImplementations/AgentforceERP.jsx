import React from 'react';
import { Link } from 'react-router-dom';
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
  ChevronDown
} from 'lucide-react';
import { smoothScrollTo } from '../../components/common/SmoothScroll';
import FloatingScrollTop from '../../components/common/FloatingScrollTop';

import erpPlanningImg from '../../assets/ERP-Project/13_hero_manufacturing_planning.png';
import agentforceLogo from '../../assets/Ai-Implementations/agentforce logo.png';

const AgentforceERP = () => {
  const capabilities = [
    {
      step: '01',
      title: 'Real-time Demand Ingestion',
      desc: 'Connects sales order demand and forecasts directly into the autonomous planning queue.',
      icon: <TrendingUp className="w-5 h-5 text-[#00C2CB]" />
    },
    {
      step: '02',
      title: 'Agentforce Inventory Reasoner',
      desc: 'Analyzes live inventory balances, safety stocks, and lead times across warehouse locations.',
      icon: <Bot className="w-5 h-5 text-[#7FE4EA]" />
    },
    {
      step: '03',
      title: 'Autonomous Material Allocation',
      desc: 'Matches BOM components, flags shortages, and generates automated purchase requisitions.',
      icon: <Layers className="w-5 h-5 text-cyan-300" />
    },
    {
      step: '04',
      title: 'Production Schedule Generation',
      desc: 'Calculates optimal manufacturing schedules and machine capacity routing seamlessly.',
      icon: <Workflow className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#070B19] text-white selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA]">
      
      {/* 1. HERO SECTION */}
      <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden border-b border-white/[0.08]">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00C2CB]/15 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <Link
            to="/ai-implementations"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8A99B5] hover:text-[#7FE4EA] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to AI Implementations</span>
          </Link>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30 flex items-center gap-1.5">
              <img src={agentforceLogo} alt="Agentforce" className="h-3.5 w-auto" />
              <span>AI IMPLEMENTATION · AGENTFORCE</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-[#C7CDDA] border border-white/10">
              ERP & Manufacturing Planning
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            Agentforce-Powered Manufacturing &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              Production Planning
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C7CDDA] max-w-3xl leading-relaxed">
            How ArrayMinds embedded Salesforce Agentforce into core ERP operations — uniting demand forecasts, real-time inventory balances, material planning, and production decisions into an automated, conversational workflow.
          </p>

          {/* Hero CTAs with Smooth Scroll */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => smoothScrollTo('#planning-loop')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all duration-300 shadow-xl shadow-[#00C2CB]/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Explore Planning Loop</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
            <a
              href="/AMERP"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#C7CDDA] hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-colors"
            >
              <span>Explore ArrayMinds ERP Platform</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#00C2CB]" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CASE OVERVIEW & UI PREVIEW */}
      <section id="overview" className="py-16 md:py-20 border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
            {/* Visual Media */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0D152E] border border-white/[0.1] p-3 shadow-2xl overflow-hidden">
              <div className="relative rounded-xl overflow-hidden bg-black/60">
                <img
                  src={erpPlanningImg}
                  alt="ArrayMinds ERP Manufacturing Planning"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0D152E]/80 border border-white/[0.1] p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00C2CB]" />
                <span>Architecture Summary</span>
              </h3>

              <div className="space-y-4 text-sm text-[#C7CDDA]">
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Solution</p>
                  <p className="text-white font-medium mt-0.5">ArrayMinds ERP + Salesforce Agentforce</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Operational Domain</p>
                  <p className="text-white font-medium mt-0.5">Manufacturing, Supply Chain & Work Order Fulfillment</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Intelligence Engine</p>
                  <p className="text-white font-medium mt-0.5">Autonomous Agentforce Planning Agents</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Key Impact</p>
                  <p className="text-white font-medium mt-0.5">Instant material allocation & automated PO draft generation</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WORKFLOW STAGES */}
      <section id="planning-loop" className="py-16 md:py-20 border-b border-white/[0.08] bg-[#0A1432]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest text-[#00C2CB] uppercase block mb-2">
                Workflow Automation
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                End-to-End Autonomous Planning Loop
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((s) => (
              <div 
                key={s.step} 
                className="p-6 rounded-2xl bg-[#0D152E]/60 border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between hover:-translate-y-1 duration-200 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-[#00C2CB]">{s.step}</span>
                    <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                      {s.icon}
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{s.title}</h4>
                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. KEY CAPABILITIES */}
      <section id="capabilities" className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.1] backdrop-blur-xl shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Core Capabilities Delivered
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Conversational queries on current shop-floor bottlenecks and capacity</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Automated BOM shortage detection with smart replacement suggestions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Direct synchronization with Salesforce CRM and manufacturing orders</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Zero-friction supervisor override with complete audit logs</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section id="cta" className="py-16 border-t border-white/[0.08] bg-[#0A1128]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Looking to power your ERP with Agentforce?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-[#C7CDDA]">
            Talk to ArrayMinds enterprise engineers to design your custom Agentforce solution.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all shadow-lg shadow-[#00C2CB]/25 hover:scale-105"
            >
              <span>Schedule an Agentforce Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/ai-implementations"
              className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium text-white/80 hover:text-white bg-white/[0.06] border border-white/10 transition-all"
            >
              Back to Overview
            </Link>
          </div>
        </div>
      </section>

      {/* Floating Smooth Scroll to Top */}
      <FloatingScrollTop />

    </div>
  );
};

export default AgentforceERP;
