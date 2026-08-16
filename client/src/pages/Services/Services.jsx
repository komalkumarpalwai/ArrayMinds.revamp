import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
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
  Headphones,
  CreditCard,
  Truck,
  BarChart3,
  Send,
  PhoneCall,
  Check,
  Server,
  Lock,
  LifeBuoy,
  RefreshCw,
  Search,
  Code2,
  Quote
} from 'lucide-react';

// Client Logos
import emeraldLogo from '../../assets/emerland.avif';
import aesLogo from '../../assets/AES.avif';
import propelLogo from '../../assets/propel.avif';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  const testimonials = [
    {
      quote:
        "We are delighted with the service of your partner Array Minds Ltd in the implementation of the salesforce program. We appreciate their thorough understanding of the Salesforce package and also their ability to map our requirements thus serving the end objectives to our satisfaction. The enthusiasm and proactiveness which they showed all through the implementation process is commendable. We would recommend Array Minds to any of your prospective clients and our best wishes to their team.",
      author: "Eswarakrishnan.D",
      role: "President",
      company: "Emerald Tyre Manufacturers Ltd., Chennai",
      badge: "Salesforce Multi-Cloud Implementation",
      logo: emeraldLogo,
    },
    {
      quote:
        "Good work from the team. Array Minds demonstrated strong technical depth in streamlining our CRM processes and aligning data architectures seamlessly.",
      author: "Enterprise Delivery Leadership",
      role: "Operations Director",
      company: "AES Global",
      badge: "Enterprise Modernisation",
      logo: aesLogo,
    },
    {
      quote:
        "Very co-operative and friendly partner. Exceptional support, prompt issue resolution, and deep knowledge across integrations.",
      author: "Digital Transformation Team",
      role: "Lead Architect",
      company: "Propel Global",
      badge: "Integration & Advisory",
      logo: propelLogo,
    },
  ];

  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isTestimonialHovered, testimonials.length]);

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'salesforce', name: 'Salesforce & Multi-Cloud' },
    { id: 'databricks', name: 'Databricks & Lakehouse AI' },
    { id: 'crm-platforms', name: 'HubSpot & Zoho CRM' },
    { id: 'messaging', name: 'WhatsApp, Telegram & CTI' },
    { id: 'integrations', name: 'Integrations, SAP & APIs' },
    { id: 'support', name: 'Admin Support & Health Check' },
  ];

  const servicesData = [
    // 1. Salesforce Implementation & Multi-Cloud
    {
      id: 'sf-implementation',
      title: 'Salesforce Implementation & Rollouts',
      category: 'salesforce',
      tag: 'Core Implementation',
      icon: <Cloud className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'End-to-end architecture, multi-cloud deployment, and seamless onboarding across Sales, Service, and Experience Clouds.',
      fullDesc: 'We architect and execute turnkey Salesforce rollouts tailored to your business model. From requirement analysis and data schema modeling to multi-cloud configuration, we ensure your Salesforce ecosystem delivers maximum user adoption and operational efficiency from day one.',
      deliverables: [
        'Sales Cloud, Service Cloud & Experience Cloud configuration',
        'Custom object architecture and automated validation rules',
        'Role hierarchy, sharing rules, and enterprise profile governance',
        'User onboarding workflows and change management enablement'
      ],
      techStack: ['Salesforce Core', 'Service Cloud', 'Flow Builder', 'Omni-Studio']
    },

    // 2. Development & Customisation (Apex / LWC)
    {
      id: 'sf-development',
      title: 'Development & Customisation (Apex & LWC)',
      category: 'salesforce',
      tag: 'Custom Engineering',
      icon: <Code2 className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'High-performance Apex controllers, modern Lightning Web Components (LWC), and asynchronous batch jobs.',
      fullDesc: 'When out-of-the-box declarative tools fall short, our certified architects build bespoke, scalable programmatic solutions. We adhere to strict enterprise design patterns (Domain, Service, Selector layers) to eliminate governor limit bottlenecks and reduce technical debt.',
      deliverables: [
        'Custom Lightning Web Components (LWC) for bespoke user interfaces',
        'Apex triggers with standardized handler frameworks and bulkification',
        'Asynchronous Apex (Queueable, Batchable, Schedulable engines)',
        'Comprehensive unit testing suites with >90% code coverage'
      ],
      techStack: ['Apex', 'Lightning Web Components', 'JavaScript', 'SOQL / SOSL']
    },

    // 3. WhatsApp & Telegram Conversational Integrations
    {
      id: 'messaging-integrations',
      title: 'WhatsApp & Telegram CRM Integrations',
      category: 'messaging',
      tag: 'Conversational Commerce',
      icon: <Send className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Real-time 2-way messaging, automated lead generation, conversational AI bots, and customer support via WhatsApp & Telegram.',
      fullDesc: 'Transform customer engagement by bringing your global audience directly into Salesforce via official WhatsApp Business APIs and Telegram Bot APIs. Power automated lead capture, instant case creation, order tracking alerts, payment link dispatch, and seamless agent handoff within the Service Cloud Console.',
      deliverables: [
        'Official WhatsApp Cloud API & Telegram Bot webhook pipelines',
        'Automated 2-way conversation capture to Leads, Contacts & Cases',
        'Agentforce AI conversational bots with instant fallback to live agents',
        'Broadcast marketing campaigns, payment receipts & order notifications'
      ],
      techStack: ['WhatsApp Business API', 'Telegram Bot API', 'Salesforce Digital Engagement', 'Webhooks']
    },

    // 4. AWS Connect via Service Cloud
    {
      id: 'aws-connect',
      title: 'AWS Connect Voice & Contact Center',
      category: 'messaging',
      tag: 'AWS & Voice CTI',
      icon: <Headphones className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'Cloud telephony, intelligent IVR, omni-channel routing, and real-time voice analytics embedded inside Service Cloud.',
      fullDesc: 'Modernize your call center by integrating Amazon Connect directly into Salesforce Service Cloud Voice. Empower support representatives with screen pops, automated call logging, real-time sentiment analysis, and intelligent IVR flows powered by AWS Contact Lens.',
      deliverables: [
        'Amazon Connect instance provisioning and CTI adapter deployment',
        'Intelligent Interactive Voice Response (IVR) and skill-based routing',
        'Real-time voice transcription and AI-powered sentiment scoring',
        'Click-to-dial, automatic call recording, and historical reporting'
      ],
      techStack: ['Amazon Connect', 'Service Cloud Voice', 'AWS Lambda', 'Contact Lens']
    },

    // 5. Databricks Lakehouse & Data Engineering
    {
      id: 'databricks-lakehouse',
      title: 'Databricks Lakehouse & Data Engineering',
      category: 'databricks',
      tag: 'Databricks Partner',
      icon: <Database className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Unified data platform implementation, Delta Lake architecture, and scalable ETL pipelines for zero-copy data federation.',
      fullDesc: 'As certified Databricks partners, we build robust data platforms that bridge enterprise data silos. We engineer high-throughput Delta Lake pipelines that synchronize operational CRM records with massive enterprise data lakes, giving your teams a single, accurate source of truth.',
      deliverables: [
        'Delta Lake medallion architecture (Bronze, Silver, Gold layers)',
        'Real-time and batch ETL pipelines using Apache Spark and PySpark',
        'Zero-copy data sharing between Databricks and Salesforce Data Cloud',
        'Data governance, security policies, and Unity Catalog implementation'
      ],
      techStack: ['Databricks Delta Lake', 'Apache Spark', 'Unity Catalog', 'PySpark / SQL']
    },

    // 6. AI/BI Reports & Dashboards in Databricks
    {
      id: 'databricks-bi',
      title: 'AI/BI Level Reports & Dashboards in Databricks',
      category: 'databricks',
      tag: 'Databricks BI & AI',
      icon: <BarChart3 className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'Executive Lakehouse BI dashboards, predictive KPI modeling, and Databricks SQL real-time operational reporting.',
      fullDesc: 'Turn raw big data into executive clarity. We build AI/BI dashboards and Databricks SQL visualizations that monitor customer lifetime value, churn risk, revenue forecasts, and supply chain telemetry with sub-second query performance.',
      deliverables: [
        'Databricks AI/BI interactive executive dashboards & metric visualizations',
        'Automated Databricks SQL queries and materialized views for lightning speed',
        'Predictive churn and revenue forecasting models embedded into reports',
        'Scheduled automated report distributions to executive stakeholders'
      ],
      techStack: ['Databricks AI/BI', 'Databricks SQL', 'Lakeview Dashboards', 'MLflow']
    },

    // 7. BOTs, Einstein AI & Agentforce
    {
      id: 'ai-bots',
      title: 'BOTs, Einstein AI & Agentforce Agents',
      category: 'salesforce',
      tag: 'Autonomous AI',
      icon: <Bot className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Autonomous Agentforce AI agents, Einstein predictive bots, and generative AI copilot setups for sales and service.',
      fullDesc: 'Deploy intelligent autonomous agents that act on behalf of your customers and employees. We configure Salesforce Agentforce and Einstein Chatbots to resolve support cases, qualify high-intent sales prospects, and execute complex workflows without human intervention.',
      deliverables: [
        'Agentforce autonomous bot topics, instructions, and guardrail configuration',
        'Einstein Bots for multi-lingual 24/7 web chat and mobile support',
        'Prompt engineering and grounding with Salesforce Data Cloud',
        'Intelligent case routing, auto-summarization, and sentiment detection'
      ],
      techStack: ['Agentforce', 'Einstein 1 Platform', 'Data Cloud', 'Einstein Bot Builder']
    },

    // 8. Payment Gateway Integrations
    {
      id: 'payments-integration',
      title: 'Payment Gateway & FinTech Integrations',
      category: 'integrations',
      tag: 'FinTech & Payments',
      icon: <CreditCard className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'PCI-compliant checkout pipelines connecting Stripe, PayPal, Adyen, and Razorpay directly with Salesforce CPQ and Billing.',
      fullDesc: 'Enable seamless digital checkout, automated invoice collections, and subscription billing within your CRM. We build secure payment pipelines that synchronize transactions, issue automated receipts, and trigger downstream fulfillment workflows.',
      deliverables: [
        'PCI-DSS compliant payment gateways (Stripe, PayPal, Adyen, Razorpay)',
        'Integration with Salesforce Billing, Revenue Cloud, and CPQ',
        'Automated dunning management and failed payment recovery workflows',
        'Real-time transaction settlement telemetry and reconciliation reporting'
      ],
      techStack: ['Stripe API', 'PayPal SDK', 'Razorpay', 'Salesforce Billing']
    },

    // 9. Live Delivery & Logistics Fleet Tracking
    {
      id: 'logistics-tracking',
      title: 'Live Delivery & Logistics Tracking Integrations',
      category: 'integrations',
      tag: 'Logistics & Fleet',
      icon: <Truck className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Real-time carrier webhooks (FedEx, DHL, custom fleets) and GPS telemetry synced into the Salesforce Order Management cockpit.',
      fullDesc: 'Give your operations and support reps complete visibility into parcel transit. We connect major logistics APIs and IoT fleet trackers into Salesforce to display real-time map positions, estimated delivery milestones, and automated exception notifications.',
      deliverables: [
        'Carrier integrations with FedEx, DHL, UPS, and custom delivery fleets',
        'Live GPS tracking telemetry and route progress map components',
        'Automated SMS / WhatsApp delivery milestone notifications',
        'Exception handling workflows for delayed or returned shipments'
      ],
      techStack: ['FedEx / DHL APIs', 'IoT Telemetry', 'Order Management', 'Google Maps API']
    },

    // 10. SAP Integration with Salesforce
    {
      id: 'sap-integration',
      title: 'SAP Integration with Salesforce',
      category: 'integrations',
      tag: 'Enterprise ERP Sync',
      icon: <Server className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'Bidirectional synchronization of ERP master data, inventory levels, sales orders, and invoices between SAP and Salesforce.',
      fullDesc: 'Eliminate manual data re-entry between your front-office CRM and back-office ERP. We build high-throughput, bidirectional middleware pipelines between SAP ECC / S4HANA and Salesforce, ensuring inventory, pricing tiers, and credit checks are always in sync.',
      deliverables: [
        'Real-time master data synchronization (Accounts, Materials, Pricing)',
        'Bi-directional Order-to-Cash workflow automation',
        'OData / REST / IDoc middleware connector setup via MuleSoft or custom APIs',
        'Error resilience, retry queues, and automated payload validation'
      ],
      techStack: ['SAP S/4HANA', 'SAP ECC', 'MuleSoft', 'OData / REST']
    },

    // 11. Admin Support & 24/7 Managed Services
    {
      id: 'admin-support',
      title: 'Admin Support & Managed Maintenance',
      category: 'support',
      tag: 'Managed Services',
      icon: <LifeBuoy className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Dedicated Salesforce administration, routine maintenance, release updates, user permissions, and 24/7 SLA-backed support.',
      fullDesc: 'Ensure your CRM environment runs smoothly without the overhead of hiring an in-house team. Our certified administrators manage day-to-day user tickets, configure reports, monitor system health, and implement seasonal release features proactively.',
      deliverables: [
        'Dedicated certified Salesforce administrators with guaranteed SLA response times',
        'User management, profile updates, permission sets, and SSO governance',
        'Reports and dashboard customization for sales, service, and executive teams',
        'Seasonal Salesforce release audit and regression testing'
      ],
      techStack: ['Admin 201 / 301', 'Security Governance', 'Helpdesk SLA', 'Release Readiness']
    },

    // 12. Salesforce Consultation & Health Check
    {
      id: 'health-check',
      title: 'Salesforce Consultation & Health Check',
      category: 'support',
      tag: 'Audit & Review',
      icon: <ShieldCheck className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'Technical debt audits, governor limit health assessments, security reviews, and architectural optimization roadmaps.',
      fullDesc: 'Is your Salesforce instance slowing down, hitting governor limits, or burdened with legacy technical debt? Our senior architects perform an exhaustive 360-degree audit across your codebase, schema, and security settings to deliver an actionable remediation plan.',
      deliverables: [
        'Comprehensive Apex code review and governor limit stress testing',
        'Schema optimization, unused field identification, and object relationship cleanups',
        'Security health assessment (OWASP, sharing model, data visibility)',
        'Executive roadmap outlining high-ROI refactoring priorities'
      ],
      techStack: ['Code Analyzer', 'Security Health Check', 'Architecture Review', 'Schema Builder']
    },

    // 13. AppExchange Product Development (ISV)
    {
      id: 'appexchange-dev',
      title: 'AppExchange Product Development (ISV)',
      category: 'salesforce',
      tag: 'AppExchange Packaging',
      icon: <Award className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Design, 2GP managed packaging, security review preparation, and licensing architecture for commercial AppExchange products.',
      fullDesc: 'Turn your software product into a thriving Salesforce AppExchange business. Having built and published multiple top-rated AppExchange tools (Data Drift, Batch Me, Product Finder), we guide ISVs through the entire lifecycle from architecture to passing the Salesforce Security Review.',
      deliverables: [
        'Second-Generation (2GP) managed packaging and namespace configuration',
        'Salesforce Security Review preparation, false-positive documentation & submission',
        'License Management App (LMA) and Feature Management (FMO) setup',
        'AppExchange listing optimization and trialforce setup'
      ],
      techStack: ['2GP Managed Packaging', 'LMA / FMO', 'Security Review', 'ISVforce']
    },

    // 14. Sprout & Third-Party Integration
    {
      id: 'sprout-integrations',
      title: 'Sprout Social & Omnichannel Marketing Integration',
      category: 'integrations',
      tag: 'Marketing Integrations',
      icon: <Workflow className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'Connecting Sprout Social, marketing engines, and customer listening streams directly into Salesforce CRM records.',
      fullDesc: 'Bridge your social marketing intelligence with customer accounts. We connect Sprout Social, social listening streams, and advertising pipelines directly into Salesforce to trigger automatic lead scoring, customer sentiment alerts, and proactive outreach.',
      deliverables: [
        'Sprout Social to Salesforce Contact and Lead mapping pipelines',
        'Social listening alert triggers for high-value client mentions',
        'Unified customer sentiment analytics in Service Cloud',
        'Automated case creation from negative social feedback'
      ],
      techStack: ['Sprout Social API', 'Salesforce Marketing Cloud', 'Webhooks', 'REST APIs']
    },

    // 15. Experience Cloud Portals with Custom SSO
    {
      id: 'experience-cloud',
      title: 'Experience Cloud with Enterprise SSO',
      category: 'salesforce',
      tag: 'Portals & SSO',
      icon: <Users className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Branded customer, partner, and vendor portals with enterprise SAML / OAuth Single Sign-On and granular security.',
      fullDesc: 'Build high-performance self-service portals and partner communities. We deploy customized Experience Cloud sites integrated with your corporate identity providers (Okta, Azure AD, Ping Identity) for effortless single sign-on.',
      deliverables: [
        'Bespoke Experience Cloud design matching corporate branding and guidelines',
        'Enterprise SAML 2.0 and OAuth OpenID Connect Single Sign-On integration',
        'Self-service knowledge base, ticket submission, and community forums',
        'Partner PRM portals for deal registration and co-selling'
      ],
      techStack: ['Experience Cloud', 'SAML 2.0', 'Okta / Azure AD', 'LWC Community Components']
    },

    // 16. Salesforce Migration & Zero-Downtime Data Cleanup
    {
      id: 'migration-cleanup',
      title: 'Salesforce Migration & Data Cleanup',
      category: 'salesforce',
      tag: 'Zero-Downtime Migration',
      icon: <RefreshCw className="w-6 h-6 text-[#6C4AB6]" />,
      shortDesc: 'Flawless data transition from legacy CRMs with automated deduplication, normalization, and relational schema mapping.',
      fullDesc: 'Migrating from HubSpot, Microsoft Dynamics, Zoho, or legacy on-prem systems? We ensure zero data loss and minimal business interruption through rigorous ETL mapping, data deduplication, and staging validation before final production cutover.',
      deliverables: [
        'Source system data extraction, sanitization, and deduplication',
        'Complex relational mapping and historical record ID preservation',
        'Dry-run rehearsal migrations in Full Sandbox environments',
        'Delta data synchronization during final production cutover'
      ],
      techStack: ['ETL Engines', 'Data Loader', 'Python Scripts', 'Sandbox Verification']
    },

    // 17. Slack Migration & Workflow Automation
    {
      id: 'slack-automation',
      title: 'Slack Migration & Workflow Automation',
      category: 'messaging',
      tag: 'Team Collaboration',
      icon: <MessageSquare className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Connecting Slack directly with Salesforce records for real-time deal alerts, approvals, and team swarm workflows.',
      fullDesc: 'Empower your sales and support teams to work where they already communicate. We deploy bidirectional Slack + Salesforce integrations that deliver real-time deal stage notifications, case swarming channels, and 1-click approvals directly within Slack.',
      deliverables: [
        'Slack-First Salesforce workflow automation and custom bot triggers',
        'Automated deal win alerts, quote discount approvals, and pipeline updates',
        'Support case swarming channels in Slack linked to Salesforce Cases',
        'Interactive Slack modals for rapid Salesforce record creation'
      ],
      techStack: ['Slack API', 'Salesforce for Slack', 'Workflow Builder', 'Webhook Triggers']
    },

    // 18. HubSpot CRM & Marketing Automation
    {
      id: 'hubspot-consulting',
      title: 'HubSpot CRM & Marketing Automation',
      category: 'crm-platforms',
      tag: 'Growth & Inbound',
      icon: <Sparkles className="w-6 h-6 text-[#FF7A59]" />,
      shortDesc: 'Turnkey HubSpot CRM setup, marketing automation pipelines, customer journey orchestration, and bidirectional Salesforce sync.',
      fullDesc: 'Empower your revenue teams with full-lifecycle HubSpot implementation. We configure Sales Hub, Marketing Hub, Service Hub, and Operations Hub with custom lead scoring, automated sequences, advanced reporting dashboards, and frictionless integrations.',
      deliverables: [
        'Sales Hub, Marketing Hub & Service Hub deployment',
        'Custom pipeline modeling & lead scoring automation',
        'Email sequence workflows & inbound campaign tracking',
        'Bidirectional HubSpot-to-Salesforce data synchronization'
      ],
      techStack: ['HubSpot CRM', 'Marketing Hub', 'Sales Hub', 'HubSpot API', 'Workflow Automation']
    },

    // 19. Zoho CRM & Ecosystem Architecture
    {
      id: 'zoho-crm-solutions',
      title: 'Zoho CRM & Ecosystem Architecture',
      category: 'crm-platforms',
      tag: 'Enterprise Scalability',
      icon: <Layers className="w-6 h-6 text-[#EC1557]" />,
      shortDesc: 'Custom Zoho CRM deployment, Deluge scripting, blueprint orchestration, and multi-app Zoho One integrations.',
      fullDesc: 'Accelerate business agility with bespoke Zoho CRM and Zoho One solutions. From automated lead distribution and custom module creation to Deluge scripting, third-party ERP integrations, and custom analytics dashboards.',
      deliverables: [
        'Custom Zoho CRM module creation & layout rules',
        'Deluge script custom functions & webhook automation',
        'Zoho Blueprints for standardized sales processes',
        'Multi-app integrations across Zoho Books, Desk & ERP'
      ],
      techStack: ['Zoho CRM', 'Zoho One', 'Deluge Scripting', 'Zoho Creator', 'Zoho Desk']
    }
  ];

  const filteredServices = servicesData.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-service-hero',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const target = document.getElementById('services-grid');
    if (target) {
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    scrollToServices();
  };

  return (
    <div ref={containerRef} className="w-full bg-[#F8F9FD] text-[#1E113F] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#4E2F94] via-[#5B3BA8] to-[#6C4AB6] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#EC1557]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#6C4AB6]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          {/* Alliance Badge */}
          <div className="gsap-service-hero inline-flex items-center gap-3 p-1.5 px-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFD1DE]" />
              <span>Full-Lifecycle Enterprise Solutions</span>
            </span>
          </div>

          <h1 className="gsap-service-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Comprehensive Services. <br />
            <span className="bg-gradient-to-r from-white via-purple-100 to-[#FFD1DE] bg-clip-text text-transparent">
              Engineered for Enterprise Scale.
            </span>
          </h1>

          <p className="gsap-service-hero text-base sm:text-xl text-purple-100/90 font-light max-w-3xl mx-auto leading-relaxed">
            From multi-cloud Salesforce architectures and Databricks Lakehouse data engineering to WhatsApp/Telegram conversational pipelines and 24/7 managed support.
          </p>

          {/* Interactive Search Bar Form */}
          <div className="gsap-service-hero max-w-xl mx-auto pt-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search services (e.g. WhatsApp, Databricks, SAP, Apex, Payments)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchSubmit(e);
                  }
                }}
                className="w-full pl-12 pr-28 py-3.5 rounded-full bg-white text-gray-800 placeholder-gray-400 text-sm shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#EC1557]"
              />
              <button
                type="submit"
                className="absolute right-2 px-5 py-2 rounded-full bg-[#EC1557] hover:bg-[#d0104a] text-white text-xs font-bold shadow-md transition-all transform hover:scale-105 active:scale-95"
              >
                Search
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER TABS (CLEAN WRAP LAYOUT - NO SCROLLBAR) */}
      {/* ========================================================================= */}
      <section className="py-5 bg-white border-b border-gray-200 sticky top-20 z-40 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'bg-[#2D1B54] text-white shadow-md scale-105'
                    : 'bg-[#F8F9FD] text-gray-700 hover:bg-purple-50 hover:text-[#2D1B54] border border-gray-200 hover:border-purple-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SERVICES DEEP-DIVE GRID */}
      {/* ========================================================================= */}
      <section id="services-grid" className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-28">
        
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <p className="text-xl font-bold text-gray-700">No services match your search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="px-6 py-2.5 rounded-full bg-[#EC1557] text-white font-bold text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="animate-fade-in-up bg-white rounded-3xl border border-gray-200/80 hover:border-[#6C4AB6]/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group transform hover:-translate-y-1"
              >
                {/* Card Top Section */}
                <div className="p-7 space-y-5">
                  
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-100 shadow-xs group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-50 text-[#2D1B54] border border-purple-200/60">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-extrabold text-[#2D1B54] group-hover:text-[#EC1557] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {service.fullDesc}
                    </p>
                  </div>

                  {/* Key Deliverables Checklist */}
                  <div className="space-y-2.5 pt-3 border-t border-gray-100">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Key Deliverables
                    </p>
                    <div className="space-y-2">
                      {service.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#EC1557] flex-shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Card Bottom: Tech Stack & CTA */}
                <div className="p-6 bg-[#F8F9FD] border-t border-gray-100 space-y-4">
                  <div className="flex flex-wrap gap-1.5">
                    {service.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-white border border-gray-200 text-gray-700">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-between w-full p-3 px-4 rounded-xl bg-[#2D1B54] hover:bg-[#EC1557] text-white text-xs sm:text-sm font-bold transition-all duration-300 shadow-xs"
                  >
                    <span>Inquire About This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* ========================================================================= */}
      {/* 4. 4-STEP DELIVERY METHODOLOGY */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EC1557]">
            Proven Engineering Framework
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#2D1B54]">
            How We Deliver Enterprise Excellence
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-light">
            Our battle-tested 4-step delivery lifecycle ensures transparent communication, agile velocity, and zero-downtime go-lives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-md space-y-4 relative">
            <span className="text-3xl font-black text-[#6C4AB6]/20">01</span>
            <h3 className="text-lg font-bold text-[#2D1B54]">Discovery & Architecture Audit</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              We analyze your systems, data models, and business objectives to design a bulletproof architectural roadmap.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-md space-y-4 relative">
            <span className="text-3xl font-black text-[#EC1557]/20">02</span>
            <h3 className="text-lg font-bold text-[#2D1B54]">Agile Sprints & Development</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Two-week sprint cycles with live demos, transparent backlog tracking, and rigorous peer code reviews.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-md space-y-4 relative">
            <span className="text-3xl font-black text-[#6C4AB6]/20">03</span>
            <h3 className="text-lg font-bold text-[#2D1B54]">Testing & Staging Sandbox</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Comprehensive end-to-end regression, security checks, and mock migrations in full sandbox environments.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-md space-y-4 relative">
            <span className="text-3xl font-black text-[#EC1557]/20">04</span>
            <h3 className="text-lg font-bold text-[#2D1B54]">Zero-Downtime Launch & SLA</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Seamless production deployment backed by dedicated post-launch support and continuous SLA monitoring.
            </p>
          </div>

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
                      ? 'w-10 bg-white/20' 
                      : 'w-2.5 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  {currentTestimonial === idx && (
                    <div 
                      key={currentTestimonial}
                      className={`h-full bg-gradient-to-r from-[#EC1557] to-[#FF6B8B] rounded-full ${
                        isTestimonialHovered ? 'w-full' : 'animate-reduce-bar'
                      }`}
                    ></div>
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
          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Accelerate Your Enterprise Architecture?
            </h2>
            <p className="text-purple-100 text-sm sm:text-base font-light">
              Connect with our certified Salesforce & Databricks architects for a comprehensive discovery session.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-base font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/40 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Schedule an Architectural Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Services;
