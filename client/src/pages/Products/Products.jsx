import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Cloud, 
  CheckCircle2, 
  ExternalLink, 
  Play, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Database, 
  Clock, 
  Filter, 
  FileSpreadsheet, 
  Layers, 
  RefreshCw, 
  Search, 
  Check, 
  Award,
  Lock,
  Cpu
} from 'lucide-react';

// Product Logo Assets
import dataDriftLogo from '../../assets/Partnerships/data drift logo.avif';
import batchMeLogo from '../../assets/Partnerships/BatchMe-logo.avif';
import productFinderLogo from '../../assets/Partnerships/product_finder logo.avif';

const Products = () => {
  const [activeTab, setActiveTab] = useState('all');

  const productsData = [
    {
      id: 'datadrift',
      name: 'Data Drift',
      badge: 'Data Management',
      pricing: 'Free',
      pricingSub: 'Never requires payment',
      headline: 'The Ultimate Salesforce Data Management Tool',
      tagline: 'Your go-to tool for streamlined Salesforce data uploads and management.',
      description: 'Data Drift is a powerful Salesforce application designed to simplify data uploads and management. It seamlessly integrates with Salesforce, allowing you to import data from CSV files, map fields, and handle multiple objects effortlessly. With an intuitive interface and real-time status updates, Data Drift provides Salesforce admins with an efficient solution for managing data operations without ever leaving the Salesforce platform.',
      logo: dataDriftLogo,
      youtubeId: 'drk6N1dMn0E',
      appExchangeUrl: 'https://appexchange.salesforce.com/appxListingDetail?listingId=79d9918a-4bbb-4c06-bc97-878a560f54f3',
      tryUrl: 'https://appexchange.salesforce.com/try?listingId=79d9918a-4bbb-4c06-bc97-878a560f54f3',
      features: [
        {
          title: 'Effortless CSV Imports',
          desc: 'Easily upload bulk data into Salesforce from CSV files for Leads, Accounts, Contacts, or Opportunities.',
          icon: <FileSpreadsheet className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Streamlined Field Mapping',
          desc: 'Automatically map CSV headers to standard and custom Salesforce fields for accurate data placement.',
          icon: <RefreshCw className="w-5 h-5 text-[#1B3B6F]" />
        },
        {
          title: 'Flexible Operations (Insert, Update, Upsert)',
          desc: 'Choose from insert, update, or upsert operations matching your exact business workflow requirements.',
          icon: <Layers className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Real-Time Progress Tracking',
          desc: 'Live upload execution indicators, percentage progress, and immediate notifications upon completion.',
          icon: <Clock className="w-5 h-5 text-[#1B3B6F]" />
        },
        {
          title: 'Comprehensive Error Logging',
          desc: 'Access detailed error logs and export row-level diagnostic reports for fast troubleshooting.',
          icon: <ShieldCheck className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Multi-Object Batch Support',
          desc: 'Manage and orchestrate data uploads across up to three related Salesforce objects simultaneously.',
          icon: <Database className="w-5 h-5 text-[#1B3B6F]" />
        }
      ],
      highlights: [
        '100% Native Salesforce Architecture',
        'Zero External Data Storage',
        'Intuitive Lightning UI',
        'Instant Admin Deployment'
      ]
    },
    {
      id: 'batchme',
      name: 'Batch Me',
      badge: 'Batch Automation',
      pricing: 'Free',
      pricingSub: 'Never requires payment',
      headline: 'The Premier Salesforce Batch Management Tool',
      tagline: 'Your essential tool for seamless Salesforce batch management.',
      description: 'Batch Me is an innovative Salesforce native tool that streamlines batch scheduling and execution. It offers a user-friendly interface for configuring, running, and monitoring batch jobs across standard and custom Salesforce objects. Perfect for administrators, Batch Me boosts operational productivity and reduces complexity without writing a single line of code.',
      logo: batchMeLogo,
      youtubeId: 'dNLP99Mviug',
      appExchangeUrl: 'https://appexchange.salesforce.com/appxListingDetail?listingId=484f1269-32ec-4ccb-8aaa-6d877d1377e6',
      tryUrl: 'https://appexchange.salesforce.com/try?listingId=484f1269-32ec-4ccb-8aaa-6d877d1377e6',
      features: [
        {
          title: 'Effortless Batch Scheduling',
          desc: 'Configure, schedule, and automate recurring batch jobs directly within Salesforce with just a few clicks.',
          icon: <Clock className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Automate Data Operations',
          desc: 'Execute and orchestrate batch operations for both standard and custom Salesforce objects seamlessly.',
          icon: <Zap className="w-5 h-5 text-[#1B3B6F]" />
        },
        {
          title: 'Streamlined Workflows',
          desc: 'Simplify complex data manipulation pipelines and eliminate repetitive manual data maintenance tasks.',
          icon: <RefreshCw className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Real-Time Job Monitoring',
          desc: 'Track batch execution statuses, throughput, and performance with built-in dashboard telemetry.',
          icon: <Layers className="w-5 h-5 text-[#1B3B6F]" />
        },
        {
          title: 'Built-in Error Recovery',
          desc: 'Benefit from automated error handling and resilient rollback mechanisms for reliable data integrity.',
          icon: <ShieldCheck className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'No Coding Required',
          desc: 'Empower Salesforce admins with a visual interface that minimizes reliance on specialized developers.',
          icon: <Cpu className="w-5 h-5 text-[#1B3B6F]" />
        }
      ],
      highlights: [
        'No Developer Coding Required',
        'Standard & Custom Object Support',
        'Salesforce Security Review Passed',
        'Lightning Experience Ready'
      ]
    },
    {
      id: 'productfinder',
      name: 'Product Finder',
      badge: 'Sales Acceleration',
      pricing: '$2,999',
      pricingSub: 'USD / company / year (Nonprofit discounts available)',
      headline: 'The Ultimate Salesforce Tool for Efficient Product Selection',
      tagline: 'Streamlining product selection with smart filters and an intuitive interface.',
      description: 'Product Finder is a robust Salesforce application designed to optimize how sales reps select and manage line items within Opportunities, Quotes, and Orders. Featuring multi-criteria filtering, unified single-screen actions, and automated duplicate prevention, Product Finder drives faster CPQ cycles and eliminates quoting errors.',
      logo: productFinderLogo,
      youtubeId: 'VVMij-1UHew',
      appExchangeUrl: 'https://appexchange.salesforce.com/appxListingDetail?listingId=e5c3d5bb-acf5-40a8-ad01-ed75801898f5',
      tryUrl: 'https://appexchange.salesforce.com/try?listingId=e5c3d5bb-acf5-40a8-ad01-ed75801898f5',
      features: [
        {
          title: 'Fast Multi-Filter Search',
          desc: 'Use advanced multi-attribute filters to instantly locate catalog products for Opportunities, Quotes, and Orders.',
          icon: <Search className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Unified Single-Screen Actions',
          desc: 'Add, edit, adjust quantities, discount lines, and delete products all within a high-speed modal interface.',
          icon: <Layers className="w-5 h-5 text-[#1B3B6F]" />
        },
        {
          title: 'Automated Duplicate Prevention',
          desc: 'Intelligent validation rules automatically prevent duplicate product line items from entering finalized quotes.',
          icon: <ShieldCheck className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Flexible Viewing Modes',
          desc: 'Seamlessly switch between popup overlay windows and dedicated tab views depending on user preference.',
          icon: <Filter className="w-5 h-5 text-[#1B3B6F]" />
        },
        {
          title: 'Auto-Populate Data Fields',
          desc: 'Automatically cascade pre-configured fields and pricebook tiers for quick, error-free data entry.',
          icon: <Zap className="w-5 h-5 text-[#00C2CB]" />
        },
        {
          title: 'Pricebook & Multi-Currency Ready',
          desc: 'Full enterprise compatibility with standard/custom pricebooks, localized currencies, and volume pricing.',
          icon: <Award className="w-5 h-5 text-[#1B3B6F]" />
        }
      ],
      highlights: [
        'Accelerates Quote Generation by 3x',
        'Prevents Costly Quoting Errors',
        'Enterprise Security & Scale',
        '30-Day Free Trial on AppExchange'
      ]
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? productsData 
    : productsData.filter(p => p.id === activeTab);

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-products-hero',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      const target = document.getElementById(tabId === 'all' ? 'products-showcase' : tabId);
      if (target) {
        const yOffset = -100;
        const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div ref={containerRef} className="w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          {/* AppExchange Partner Ribbon */}
          <div className="gsap-products-hero inline-flex items-center gap-2 p-1.5 px-5 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md shadow-inner">
            <Cloud className="w-4 h-4 text-[#7FE4EA]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              Official Salesforce AppExchange Applications
            </span>
          </div>

          <h1 className="gsap-products-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Engineered on Salesforce. <br />
            <span className="bg-gradient-to-r from-[#7FE4EA] via-[#00C2CB] to-[#7FE4EA] bg-clip-text text-transparent">
              Built for Enterprise Performance.
            </span>
          </h1>

          <p className="gsap-products-hero text-base sm:text-xl text-[#C7CDDA] font-light max-w-3xl mx-auto leading-relaxed">
            Discover our suite of proprietary Salesforce AppExchange tools designed to eliminate operational friction, automate complex batch jobs, and accelerate data workflows.
          </p>

          {/* Quick Jump Buttons */}
          <div className="gsap-products-hero flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => handleTabClick('all')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-[#00C2CB] text-[#032B2E] shadow-lg scale-105'
                  : 'bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.2]'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleTabClick('datadrift')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'datadrift'
                  ? 'bg-[#00C2CB] text-[#032B2E] shadow-lg scale-105'
                  : 'bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.2]'
              }`}
            >
              Data Drift (Free)
            </button>
            <button
              onClick={() => handleTabClick('batchme')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'batchme'
                  ? 'bg-[#00C2CB] text-[#032B2E] shadow-lg scale-105'
                  : 'bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.2]'
              }`}
            >
              Batch Me (Free)
            </button>
            <button
              onClick={() => handleTabClick('productfinder')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'productfinder'
                  ? 'bg-[#00C2CB] text-[#032B2E] shadow-lg scale-105'
                  : 'bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.2]'
              }`}
            >
              Product Finder
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PRODUCT SHOWCASES SECTION */}
      {/* ========================================================================= */}
      <section id="products-showcase" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24 scroll-mt-24">
        
        {filteredProducts.map((product, index) => (
          <div 
            key={product.id}
            id={product.id}
            className="animate-fade-in-up bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden hover:border-[#00C2CB] transition-all duration-300"
          >
            
            {/* Product Top Header Bar */}
            <div className="bg-gradient-to-r from-[#0A1128] to-[#1B3B6F] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/[0.08]">
              
              <div className="flex items-center gap-5">
                <div className="p-3 sm:p-4 bg-white rounded-2xl shadow-md flex items-center justify-center flex-shrink-0">
                  <img 
                    src={product.logo} 
                    alt={product.name} 
                    className="h-12 sm:h-16 w-auto object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                      {product.name}
                    </h2>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00C2CB] text-[#032B2E]">
                      {product.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#8A99B5] mt-1">
                    By <span className="font-semibold text-white">Array Minds Limited</span> • Official Salesforce AppExchange Package
                  </p>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="md:text-right bg-white/[0.08] p-3.5 px-5 rounded-2xl border border-white/[0.1] flex-shrink-0">
                <div className="flex items-baseline md:justify-end gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-white">{product.pricing}</span>
                  {product.pricing !== 'Free' && <span className="text-xs text-[#8A99B5] font-medium">/ year</span>}
                </div>
                <p className="text-[11px] text-[#7FE4EA] font-semibold">{product.pricingSub}</p>
              </div>

            </div>

            {/* Product Body: Narrative, Video & Features Grid */}
            <div className="p-6 sm:p-10 space-y-10">
              
              {/* Value Proposition Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Column: Narrative & Highlights */}
                <div className="lg:col-span-6 space-y-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A1128] leading-snug">
                    {product.headline}
                  </h3>
                  
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Highlights Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {product.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2CB] flex-shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <a
                      href={product.appExchangeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>Get It on AppExchange</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Embedded YouTube Video Demo */}
                <div className="lg:col-span-6">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-900 aspect-video relative group">
                    <iframe
                      src={`https://www.youtube.com/embed/${product.youtubeId}`}
                      title={`${product.name} Video Demo`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center gap-1.5">
                    <Play className="w-3 h-3 text-[#00C2CB]" />
                    <span>Watch official walkthrough demo for {product.name}</span>
                  </p>
                </div>

              </div>

              {/* Comprehensive Features Grid */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-base font-bold text-[#0A1128] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00C2CB]" />
                  <span>Key Architectural Features & Capabilities</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {product.features.map((feat, fIdx) => (
                    <div 
                      key={fIdx}
                      className="p-5 rounded-2xl bg-[#F8FAFC] border border-gray-200/80 hover:border-[#00C2CB] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="p-2.5 rounded-xl bg-white w-fit shadow-xs border border-gray-100">
                          {feat.icon}
                        </div>
                        <h5 className="font-bold text-sm text-[#0A1128]">
                          {feat.title}
                        </h5>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        ))}

      </section>

      {/* ========================================================================= */}
      {/* 3. ENTERPRISE SECURITY & COMPLIANCE SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-br from-[#0A1128] via-[#0D1B3E] to-[#1B3B6F] text-white border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA]">
              AppExchange Compliance
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Enterprise Trust & Security Standards
            </h2>
            <p className="text-sm sm:text-base text-[#C7CDDA] font-light">
              All Array Minds applications adhere strictly to Salesforce ISV security guidelines and rigorous security review protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#00C2CB]" />
              <h3 className="font-bold text-base text-white">Salesforce Security Review</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Thoroughly audited and verified against OWASP and Salesforce vulnerability standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3">
              <Lock className="w-8 h-8 text-[#7FE4EA]" />
              <h3 className="font-bold text-base text-white">Zero External Data Storage</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Your data stays entirely within your Salesforce instance with zero external server transit.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3">
              <Cloud className="w-8 h-8 text-[#00C2CB]" />
              <h3 className="font-bold text-base text-white">100% Lightning Native</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Engineered with modern Lightning Web Components (LWC) for maximum speed and seamless UX.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3">
              <Award className="w-8 h-8 text-emerald-400" />
              <h3 className="font-bold text-base text-white">Continuous Upgrades</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Regular seasonal releases ensuring 100% compatibility with latest Salesforce updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CUSTOM APPEXCHANGE PRODUCT DEVELOPMENT CTA */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden border border-white/[0.08]">
          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Looking for Custom AppExchange Product Engineering?
            </h2>
            <p className="text-[#C7CDDA] text-sm sm:text-base font-light">
              We design, build, test, and pass the Salesforce Security Review for ISVs and enterprise clients looking to publish bespoke AppExchange applications.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-base font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Consult an ISV Architect
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Products;
