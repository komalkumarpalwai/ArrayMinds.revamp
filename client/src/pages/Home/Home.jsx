import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Cloud, 
  Database, 
  Bot, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Award, 
  MessageSquare, 
  Workflow, 
  Zap, 
  Globe, 
  Quote,
  Headphones,
  CreditCard,
  Truck,
  BarChart3
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Brand & Client Logos
import salesforceLogo from '../../assets/salesforce-logo2.png';
import databricksLogo from '../../assets/databricks-logo2.png';
import emeraldLogo from '../../assets/emerland.avif';
import aesLogo from '../../assets/AES.avif';
import propelLogo from '../../assets/propel.avif';

const Home = () => {
  const containerRef = useRef(null);

  // Testimonials Carousel State with Auto-Slide and Hover-Pause
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);
  const [activeServiceTab, setActiveServiceTab] = useState('all');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero elements safe animation on load
      gsap.fromTo(
        '.gsap-hero-item',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      quote: "We are delighted with the service of your partner Array Minds Ltd in the implementation of the salesforce program. We appreciate their thorough understanding of the Salesforce package and also their ability to map our requirements thus serving the end objectives to our satisfaction. The enthusiasm and proactiveness which they showed all through the implementation process is commendable. We would recommend Array Minds to any of your prospective clients and our best wishes to their team.",
      author: "Eswarakrishnan. D",
      role: "President",
      company: "Emerald Tyre Manufacturers Ltd., Chennai",
      badge: "Salesforce Core Implementation",
      logo: emeraldLogo,
    },
    {
      quote: "Good work from the team. Very co-operative and friendly partner. Updates progress on-time throughout the rollout and always proactive with architectural solutions.",
      author: "Executive Leadership",
      role: "Operations Director",
      company: "AES Global",
      badge: "Enterprise Salesforce & Cloud",
      logo: aesLogo,
    },
    {
      quote: "Exceptional delivery on complex Salesforce integration, custom reporting pipelines, and seamless user adoption across global teams.",
      author: "Head of Systems",
      role: "VP Technology",
      company: "Propel Global",
      badge: "Custom Integration & Analytics",
      logo: propelLogo,
    },
  ];

  // Auto-slide interval with hover pause
  useEffect(() => {
    if (isTestimonialHovered) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isTestimonialHovered, testimonials.length]);

  const clientLogos = [
    { name: "Emerald Tyre Manufacturers", logo: emeraldLogo },
    { name: "AES Global", logo: aesLogo },
    { name: "Propel Global", logo: propelLogo },
  ];

  const certifiedStats = [
    {
      count: "03",
      title: "Salesforce & Enterprise Architects",
      desc: "Certified technical architects designing scalable multi-cloud and data systems.",
      bg: "bg-[#4A2B8E]",
      icon: <Layers className="w-8 h-8 text-white/90" />,
    },
    {
      count: "22",
      title: "Salesforce & Cloud Developers",
      desc: "Specialized Apex, LWC, Agentforce, and custom API engineering specialists.",
      bg: "bg-[#EC1557]",
      icon: <Cpu className="w-8 h-8 text-white/90" />,
    },
    {
      count: "22",
      title: "Salesforce & Databricks Admins",
      desc: "Certified platform administrators managing enterprise configurations and governance.",
      bg: "bg-[#381E73]",
      icon: <ShieldCheck className="w-8 h-8 text-white/90" />,
    },
    {
      count: "02",
      title: "AI Associates & Specialists",
      desc: "Dedicated AI specialists driving Salesforce Agentforce & Lakehouse AI workflows.",
      bg: "bg-[#E91E63]",
      icon: <Bot className="w-8 h-8 text-white/90" />,
    },
  ];

  const services = [
    {
      title: "Salesforce Implementation & Agentforce",
      category: "salesforce",
      desc: "End-to-end multi-cloud rollout, autonomous Agentforce AI setup, and workflow optimization.",
      tag: "Agentforce AI",
      icon: <Bot className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Databricks Lakehouse & Data Engineering",
      category: "databricks",
      desc: "Unified data & AI platform implementation, Lakehouse ETL pipelines, and real-time analytics.",
      tag: "Databricks Partner",
      icon: <Database className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "AWS Connect via Service Cloud",
      category: "salesforce",
      desc: "Deploying Amazon Connect CTI, intelligent IVR, omni-channel voice routing, and AI speech analytics inside Salesforce Service Cloud.",
      tag: "AWS & Voice CTI",
      icon: <Headphones className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "AI/BI Reports & Dashboards in Databricks",
      category: "databricks",
      desc: "Executive Lakehouse BI visualizations, ML-powered predictive KPIs, and Databricks SQL real-time operational reporting.",
      tag: "Databricks BI & AI",
      icon: <BarChart3 className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "Payment Gateway Integrations",
      category: "integrations",
      desc: "PCI-compliant checkout pipelines connecting Stripe, PayPal, Adyen, and Razorpay directly with Salesforce Billing and CPQ.",
      tag: "FinTech & Payments",
      icon: <CreditCard className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Live Delivery & Fleet Tracking Integrations",
      category: "integrations",
      desc: "Real-time carrier webhooks (FedEx, DHL, custom fleets) and GPS telemetry synced into Salesforce Order Management cockpit.",
      tag: "Logistics & Fleet",
      icon: <Truck className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "Digital Transformation Strategy",
      category: "salesforce",
      desc: "Comprehensive roadmap planning and enterprise modernisation for measurable ROI.",
      tag: "Advisory",
      icon: <TrendingUp className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Salesforce Custom Development",
      category: "salesforce",
      desc: "Apex, Lightning Web Components (LWC), custom business logic, and flow automation.",
      tag: "Apex / LWC",
      icon: <Cpu className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "Sprout & Third-Party Integration",
      category: "integrations",
      desc: "Seamlessly connecting Sprout Social, marketing engines, and ERPs with Salesforce.",
      tag: "Integrations",
      icon: <Workflow className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "AppExchange Solutions & Product Development",
      category: "salesforce",
      desc: "Design, security review readiness, and packaging for public or private AppExchange apps.",
      tag: "AppExchange",
      icon: <Award className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "LIO Integration & Omnichannel Systems",
      category: "integrations",
      desc: "Unifying lead, inventory, and order systems into a unified 360-degree customer cockpit.",
      tag: "Omnichannel",
      icon: <Layers className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Salesforce Cross-Platform Integration",
      category: "integrations",
      desc: "Robust REST/SOAP API pipelines linking Salesforce with Databricks, SAP, AWS, and SQL.",
      tag: "API Pipelines",
      icon: <Globe className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "Experience Cloud with Custom SSO",
      category: "salesforce",
      desc: "Interactive customer, partner, and vendor portals with enterprise SAML/OAuth Single Sign-On.",
      tag: "Portals & SSO",
      icon: <Users className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Salesforce Migration & Data Cleanup",
      category: "salesforce",
      desc: "Zero-downtime data transition from legacy CRMs with data deduplication and schema mapping.",
      tag: "Migration",
      icon: <Database className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "AI Integration & Autonomous Workflows",
      category: "databricks",
      desc: "Custom LLM integrations, predictive scoring, and Databricks MLflow model operationalization.",
      tag: "AI & ML",
      icon: <Sparkles className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Salesforce Consultation & Health Check",
      category: "salesforce",
      desc: "Technical debt audits, governor limit health assessments, and architectural code reviews.",
      tag: "Audit & Review",
      icon: <CheckCircle2 className="w-6 h-6 text-[#6C4AB6]" />,
    },
    {
      title: "Slack Migration & Workflow Automation",
      category: "integrations",
      desc: "Connecting Slack directly with Salesforce records for real-time deal alerts and team workflows.",
      tag: "Slack Automations",
      icon: <MessageSquare className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "HubSpot CRM & Marketing Automation",
      category: "crm-platforms",
      desc: "Turnkey HubSpot CRM setup, marketing automation pipelines, customer journey orchestration, and bidirectional Salesforce sync.",
      tag: "HubSpot",
      icon: <Sparkles className="w-6 h-6 text-[#EC1557]" />,
    },
    {
      title: "Zoho CRM & Ecosystem Architecture",
      category: "crm-platforms",
      desc: "Custom Zoho CRM deployment, Deluge scripting, blueprint orchestration, and multi-app Zoho One integrations.",
      tag: "Zoho CRM",
      icon: <Layers className="w-6 h-6 text-[#6C4AB6]" />,
    },
  ];

  const filteredServices = activeServiceTab === 'all' 
    ? services 
    : services.filter(s => s.category === activeServiceTab);

  return (
    <div ref={containerRef} className="w-full bg-[#F8F9FD] text-[#1E113F] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#4E2F94] via-[#5B3BA8] to-[#6C4AB6] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#EC1557]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#6C4AB6]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-6xl mx-auto text-center space-y-8">
          
          {/* Official Dual Partner Badges (Big Images with PARTNER Label Underneath) */}
          <div className="gsap-hero-item flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            
            {/* Salesforce Partner Card */}
            <div className="bg-white hover:bg-white/95 text-[#2D1B54] p-5 sm:p-7 px-8 sm:px-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 min-w-[210px] sm:min-w-[250px]">
              <div className="h-20 sm:h-24 w-full flex items-center justify-center py-1">
                <img 
                  src={salesforceLogo} 
                  alt="Salesforce" 
                  className="h-full max-h-20 sm:max-h-24 w-auto max-w-[170px] sm:max-w-[210px] object-contain scale-110 sm:scale-125"
                />
              </div>
              <span className="text-xs sm:text-sm font-black text-[#00A1E0] uppercase tracking-[0.25em] border-t border-gray-100 pt-2.5 w-full text-center">
                PARTNER
              </span>
            </div>

            {/* Databricks Partner Card */}
            <div className="bg-white hover:bg-white/95 text-[#2D1B54] p-5 sm:p-7 px-8 sm:px-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 min-w-[210px] sm:min-w-[250px]">
              <div className="h-20 sm:h-24 w-full flex items-center justify-center py-1">
                <img 
                  src={databricksLogo} 
                  alt="Databricks" 
                  className="h-full max-h-20 sm:max-h-24 w-auto max-w-[170px] sm:max-w-[210px] object-contain scale-110 sm:scale-125"
                />
              </div>
              <span className="text-xs sm:text-sm font-black text-[#FF3621] uppercase tracking-[0.25em] border-t border-gray-100 pt-2.5 w-full text-center">
                PARTNER
              </span>
            </div>

          </div>

          {/* Main Headline */}
          <div className="gsap-hero-item space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Architecting the Future of <br />
              <span className="bg-gradient-to-r from-white via-purple-100 to-[#FFD1DE] bg-clip-text text-transparent">
                Salesforce, Databricks & Enterprise AI.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-purple-100/90 font-light max-w-3xl mx-auto leading-relaxed">
              We architect, implement, and scale the Salesforce Platform & Databricks Lakehouse with autonomous AI agents tailored to your business objectives.
            </p>
          </div>

          {/* Call To Action Buttons */}
          <div className="gsap-hero-item flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-[#2D1B54] bg-white hover:bg-purple-50 shadow-lg shadow-black/10 transition-all transform hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-4 h-4 text-[#EC1557]" />
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/40 transition-all transform hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>

          {/* Technology Capabilities Strip */}
          <div className="gsap-hero-item pt-10 border-t border-white/15 mt-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-200/80 mb-4">
              Enterprise Ecosystem Competencies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-medium text-white/90">
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10">Agentforce Autonomous AI</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10">Salesforce Data Cloud</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10">Databricks Lakehouse</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10">Apex & LWC Architecture</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10">MuleSoft & Custom APIs</span>
              <span className="px-3.5 py-1.5 rounded-lg bg-white/10 border border-white/10">Experience Cloud</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. TRUSTED BY INDUSTRY LEADERS (CLIENT LOGO STRIP) */}
      {/* ========================================================================= */}
      <section className="py-10 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
            Trusted by Forward-Thinking Industry Leaders
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {clientLogos.map((client) => (
              <div 
                key={client.name} 
                className="p-3 px-6 rounded-2xl bg-[#F8F9FD] border border-gray-200/70 hover:border-[#6C4AB6] shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center group"
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT & STRATEGIC METHODOLOGY SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Strategic Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6C4AB6] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#EC1557]" />
              <span>About Array Minds</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B54] tracking-tight leading-tight">
              Optimize Your Salesforce & Databricks Experience
            </h2>

            <div className="space-y-4 text-gray-700 text-base leading-relaxed">
              <p>
                At <strong>Array Minds</strong>, we acknowledge that the industry needs of each customer are distinct. An in-depth interpretation of your methods, system, and technology ecosystem is crucial to take well-informed pathways on your digital transformation journey.
              </p>
              <p>
                As your <strong>Salesforce & Databricks Consulting Partner</strong>, we approach every task with curiosity, deep research, and consciousness during the discovery phase — providing tailor-made proposals, robust architectures, and future-proof implementations.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#EC1557] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B54]">In-Depth Discovery</h4>
                  <p className="text-xs text-gray-600">Thorough auditing of processes before writing code.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6C4AB6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B54]">Agentforce & Data Cloud</h4>
                  <p className="text-xs text-gray-600">Connecting unified customer data with autonomous AI.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#6C4AB6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B54]">Databricks Lakehouse</h4>
                  <p className="text-xs text-gray-600">Enterprise data engineering and real-time AI pipelines.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#EC1557] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#2D1B54]">On-Time Delivery</h4>
                  <p className="text-xs text-gray-600">Agile sprints with transparent communication milestones.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-bold text-[#6C4AB6] hover:text-[#EC1557] transition-colors"
              >
                <span>Learn more about our methodology</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Strategic Partnership Card */}
          <div className="lg:col-span-5">
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-[#2D1B54] to-[#4E2F94] text-white shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#EC1557]/20 rounded-full blur-2xl"></div>

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#FFD1DE]">Ecosystem Alliance</span>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#00A1E0]/20 text-[#60cdff] text-xs font-bold border border-[#00A1E0]/30">
                      Salesforce
                    </span>
                    <span className="text-white/40 text-xs font-light">×</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[#FF3621]/20 text-[#ff8f82] text-xs font-bold border border-[#FF3621]/30">
                      Databricks
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold leading-snug">
                  Unifying Enterprise CRM & Lakehouse Intelligence
                </h3>

                <p className="text-sm text-purple-100 leading-relaxed font-light">
                  We bridge the gap between Salesforce Customer 360 and Databricks scalable Lakehouse data architecture, unleashing real-time data sync, predictive modeling, and autonomous Agentforce workflows.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-[#EC1557]" />
                    <span>Real-time Zero Copy Data Federation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-[#EC1557]" />
                    <span>Autonomous Agentforce Agents for Sales & Service</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Zap className="w-4 h-4 text-[#EC1557]" />
                    <span>Enterprise AppExchange Package Engineering</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link
                    to="/contact"
                    className="block text-center w-full py-3 rounded-full text-sm font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-md transition-all"
                  >
                    Request Architectural Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE SERVICES & CAPABILITIES SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6C4AB6] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#EC1557]" />
              <span>Comprehensive Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B54] tracking-tight">
              Our Professional Services
            </h2>
            <p className="text-base text-gray-600">
              End-to-end consulting, engineering, migration, and artificial intelligence solutions across Salesforce & Databricks.
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setActiveServiceTab('all')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeServiceTab === 'all'
                    ? 'bg-[#2D1B54] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Services
              </button>
              <button
                onClick={() => setActiveServiceTab('salesforce')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeServiceTab === 'salesforce'
                    ? 'bg-[#2D1B54] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Salesforce & Agentforce
              </button>
              <button
                onClick={() => setActiveServiceTab('databricks')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeServiceTab === 'databricks'
                    ? 'bg-[#2D1B54] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Databricks & AI
              </button>
              <button
                onClick={() => setActiveServiceTab('integrations')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeServiceTab === 'integrations'
                    ? 'bg-[#2D1B54] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Integrations & APIs
              </button>
              <button
                onClick={() => setActiveServiceTab('crm-platforms')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeServiceTab === 'crm-platforms'
                    ? 'bg-[#2D1B54] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                HubSpot & Zoho CRM
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.title}
                className="animate-fade-in-up card-hover-lift p-6 rounded-2xl bg-[#F8F9FD] border border-gray-200 hover:border-[#6C4AB6] hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:scale-105 transition-transform">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white text-[#6C4AB6] border border-gray-200 shadow-2xs">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#2D1B54] group-hover:text-[#EC1557] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-200/60">
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6C4AB6] group-hover:text-[#EC1557] transition-colors"
                  >
                    <span>View Service Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. NUMBER OF CERTIFIED PEOPLE (TRUST METRICS) */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#6C4AB6] text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Proven Bench Strength</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B54] tracking-tight">
            Number Of Certified People
          </h2>
          <p className="text-base text-gray-600">
            Our certified engineering and architecture specialists bring vetted expertise to your enterprise Salesforce and Databricks engagements.
          </p>
        </div>

        {/* 4 Certified Numbers Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifiedStats.map((stat) => (
            <div
              key={stat.title}
              className={`animate-fade-in-up card-hover-lift ${stat.bg} text-white p-8 rounded-3xl shadow-xl transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden`}
            >
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xl sm:text-5xl font-black tracking-tight">{stat.count}</span>
                  <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                    {stat.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold leading-snug">
                  {stat.title}
                </h3>
              </div>

              <p className="text-xs text-purple-100/80 leading-relaxed pt-6 mt-4 border-t border-white/20">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLIENT TESTIMONIALS SECTION (SMOOTH HORIZONTAL SLIDER WITH HOVER PAUSE & DRAIN TIMER) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#2D1B54] text-white relative overflow-hidden shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#FFD1DE] text-xs font-bold uppercase tracking-wider border border-white/20">
              <Quote className="w-3.5 h-3.5 text-[#EC1557]" />
              <span>Client Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              What Our Clients Say
            </h2>
          </div>

          {/* Interactive Testimonial Slider Container with Hover Pause */}
          <div 
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
            className="relative p-6 sm:p-12 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-xl shadow-2xl overflow-hidden"
          >
            <Quote className="w-12 h-12 text-[#EC1557]/40 mb-3 ml-2" />
            
            {/* Smooth Sliding Viewport */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((item, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <p className="text-base sm:text-xl text-purple-100 leading-relaxed italic font-light min-h-[140px] sm:min-h-[110px]">
                      "{item.quote}"
                    </p>

                    {/* Embedded Client Logo */}
                    {item.logo && (
                      <div className="my-6 flex justify-center">
                        <div className="p-3 px-6 rounded-2xl bg-white shadow-md flex items-center justify-center">
                          <img 
                            src={item.logo} 
                            alt={item.company} 
                            className="h-10 md:h-12 w-auto object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {item.author}
                        </h4>
                        <p className="text-xs sm:text-sm text-purple-200">
                          {item.role} — <span className="text-[#FFD1DE] font-semibold">{item.company}</span>
                        </p>
                      </div>

                      <span className="self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-[#EC1557]/20 border border-[#EC1557]/40 text-[#FFD1DE]">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Animated Slide Indicators with 4-3-2-1 Countdown Progress Drain */}
            <div className="flex items-center justify-center gap-2.5 pt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 overflow-hidden relative ${
                    currentTestimonial === idx 
                      ? 'w-12 bg-white/20' 
                      : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {currentTestimonial === idx && (
                    <span 
                      key={`timer-${currentTestimonial}`}
                      className="block h-full bg-[#EC1557] rounded-full animate-reduce-bar"
                      style={{
                        animationPlayState: isTestimonialHovered ? 'paused' : 'running',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#4E2F94] via-[#5B3BA8] to-[#6C4AB6] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden">
          <div className="space-y-2 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Accelerate with Salesforce & Databricks?
            </h2>
            <p className="text-purple-100 text-sm sm:text-base font-light">
              Connect with our certified architects to explore custom implementation, Agentforce AI automation, or Databricks data integration.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-base font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/40 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Schedule a Consultation
            </Link>
            <Link
              to="/careers"
              className="px-6 py-3.5 rounded-full text-base font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/30 transition-all whitespace-nowrap"
            >
              Join Our Certified Team
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
