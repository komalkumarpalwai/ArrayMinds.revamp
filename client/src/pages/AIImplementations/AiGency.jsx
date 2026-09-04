import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  Network, 
  Workflow, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';
import aigencyLogo from '../../assets/Ai-Implementations/aigency-logo-optimized.webp';

const AiGency = () => {
  const pillars = [
    {
      step: '01',
      title: 'Agent Orchestration Framework',
      desc: 'Architecting multi-agent collaboration protocols to ensure deterministic outcomes for enterprise tasks.',
      icon: <Bot className="w-5 h-5 text-[#00C2CB]" />
    },
    {
      step: '02',
      title: 'Business System Integrations',
      desc: 'Seamlessly connecting AI workforce capabilities into CRM, ERP, and communication platforms.',
      icon: <Network className="w-5 h-5 text-[#7FE4EA]" />
    },
    {
      step: '03',
      title: 'Task Execution Pipelines',
      desc: 'Automating high-volume back-office and customer-facing workflows with real-time feedback loops.',
      icon: <Workflow className="w-5 h-5 text-cyan-300" />
    },
    {
      step: '04',
      title: 'Governance & Security Guardrails',
      desc: 'Enterprise-grade access controls, prompt sanitization, and continuous audit mechanisms.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#070B19] text-white selection:bg-[#00C2CB]/30 selection:text-[#7FE4EA]">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden border-b border-white/[0.08]">
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
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#00C2CB]/15 text-[#7FE4EA] border border-[#00C2CB]/30">
              AI TRANSFORMATION · AI AGENTS
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.05] text-[#C7CDDA] border border-white/10">
              Enterprise AI Workforce Platform
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
            Advancing an AI Operating Platform with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2CB] via-[#7FE4EA] to-cyan-300">
              AiGency Global
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-[#C7CDDA] max-w-3xl leading-relaxed">
            How ArrayMinds partnered with AiGency Global to advance its AI employee operating model — establishing robust agent execution loops, enterprise tool integration, and scalable workflow automation.
          </p>

          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://aigency.global/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#7FE4EA] hover:text-white transition-colors"
            >
              <span>Visit AiGency Global</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. CASE OVERVIEW & PLATFORM HIGHLIGHTS */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            {/* Visual Media / Logo Showcase */}
            <div className="lg:col-span-7 rounded-2xl bg-[#0D152E] border border-white/[0.1] p-8 shadow-2xl overflow-hidden flex flex-col items-center justify-center min-h-[300px] text-center">
              <div className="p-8 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/[0.08] max-w-md w-full">
                <img
                  src={aigencyLogo}
                  alt="AiGency Global"
                  className="h-16 sm:h-20 w-auto mx-auto object-contain filter drop-shadow-xl"
                />
                <p className="mt-6 text-sm text-[#C7CDDA]">
                  Specialized AI workforce operating platform embedding digital employees into enterprise workflows.
                </p>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#0D152E]/80 border border-white/[0.1] p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#00C2CB]" />
                <span>Transformation Focus</span>
              </h3>

              <div className="space-y-4 text-sm text-[#C7CDDA]">
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Partner</p>
                  <p className="text-white font-medium mt-0.5">AiGency Global</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Domain</p>
                  <p className="text-white font-medium mt-0.5">Managed AI Workforce & Agent Ecosystems</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">ArrayMinds Contribution</p>
                  <p className="text-white font-medium mt-0.5">Operating Model Architecture & Enterprise Integrations</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#8A99B5] uppercase tracking-wider">Platform Vision</p>
                  <p className="text-white font-medium mt-0.5">Seamless agent delegation with full operational oversight</p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. CORE ARCHITECTURE PILLARS */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-8">
              Key Transformation Pillars
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pillars.map((s) => (
                <div 
                  key={s.step} 
                  className="p-6 rounded-2xl bg-[#0D152E]/60 border border-white/[0.08] hover:border-[#00C2CB]/40 transition-all flex flex-col justify-between"
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

          {/* 4. KEY DELIVERABLES */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-white/[0.1] backdrop-blur-xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
              Enterprise Outcomes Delivered
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Unified agent lifecycle management and orchestration logic</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Standardized API wrappers for enterprise tool execution</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Resilient multi-agent handoffs for cross-functional business jobs</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB] shrink-0 mt-0.5" />
                <span className="text-sm text-[#C7CDDA]">Production-grade monitoring, telemetry, and error-recovery</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. BOTTOM CTA */}
      <section className="py-16 border-t border-white/[0.08] bg-[#0A1128]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Scaling your enterprise AI agent workforce?
          </h3>
          <p className="mt-3 text-sm sm:text-base text-[#C7CDDA]">
            Partner with ArrayMinds to architect and deploy production-ready AI agents into your business.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] transition-all shadow-lg shadow-[#00C2CB]/25 hover:scale-105"
            >
              <span>Discuss AI Transformation</span>
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

    </div>
  );
};

export default AiGency;
