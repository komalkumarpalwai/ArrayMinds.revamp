import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  ShieldCheck, 
  Target, 
  Lightbulb, 
  Users, 
  Award, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  Globe, 
  Building2, 
  Cpu, 
  Workflow, 
  Layers, 
  RefreshCw,
  Quote,
  Check,
  Zap,
  Clock,
  Compass
} from 'lucide-react';

// Brand & Client Logos
import salesforceLogo from '../../assets/salesforce-logo2.png';
import databricksLogo from '../../assets/databricks-logo2.png';
import emeraldLogo from '../../assets/emerland.avif';
import aesLogo from '../../assets/AES.avif';
import propelLogo from '../../assets/propel.avif';
import autotexLogo from '../../assets/Autotex-Logo1.png';

const About = () => {
  // Testimonials Carousel State
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
        "Array Minds delivered a truly transformative digital experience for our operations. Their deep Salesforce engineering proficiency, proactive communication, and ability to map complex industrial workflows gave us unprecedented clarity across our global delivery pipelines. Highly recommended for enterprise-scale CRM implementations.",
      author: "Executive Leadership",
      role: "Managing Director",
      company: "Autotex Machinery Pvt. Ltd.",
      badge: "Industrial CRM & Automation",
      logo: autotexLogo,
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

  const coreValues = [
    {
      title: "Inquisitive & Research-Driven",
      desc: "We approach every task with deep curiosity, thorough investigation, and technical consciousness during the finding phase.",
      icon: <Compass className="w-6 h-6 text-[#00C2CB]" />
    },
    {
      title: "Constant Stakeholder Collaboration",
      desc: "We believe in close collaboration at every sprint milestone with continuous improvement, intervention, and transparent feedback.",
      icon: <Users className="w-6 h-6 text-[#1B3B6F]" />
    },
    {
      title: "Proper Planning & Execution",
      desc: "Leaving no stone unturned — our structured execution and architectural rigor turn complex enterprise roadmaps into tangible ROI.",
      icon: <Target className="w-6 h-6 text-[#00C2CB]" />
    },
    {
      title: "Multi-Cloud & AI Innovation",
      desc: "Certified excellence across Salesforce Multi-Cloud, Databricks Lakehouse data engineering, and autonomous Agentforce AI.",
      icon: <Cpu className="w-6 h-6 text-[#1B3B6F]" />
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Inquisitive Discovery & Finding Phase",
      desc: "An in-depth interpretation of your methods, systems, and technology ecosystem to uncover root operational bottlenecks.",
      deliverable: "Architecture Gap Assessment & Technical Discovery Report"
    },
    {
      step: "02",
      title: "Tailored Suggestions & Proposal Design",
      desc: "Formulating customized architectural suggestions and roadmap proposals that directly map to your business objectives.",
      deliverable: "Multi-Cloud Solution Blueprint & SOW Milestones"
    },
    {
      step: "03",
      title: "Agile Sprints & Continuous Intervention",
      desc: "Iterative two-week agile development cycles with regular demos, stakeholder feedback loops, and automated CI/CD validation.",
      deliverable: "Working Code, LWC Interfaces & Staging Sandbox Demos"
    },
    {
      step: "04",
      title: "Execution, Optimisation & SLA Support",
      desc: "Zero-downtime production cutover, continuous optimization, regression testing, and dedicated SLA-backed managed services.",
      deliverable: "Production Deployment & 24/7 SLA Maintenance"
    }
  ];

  const certifiedMetrics = [
    { count: '03', title: 'Certified Architects', desc: 'System & Technical Architecture' },
    { count: '22', title: 'Certified Developers', desc: 'Apex, LWC & Integration Specialists' },
    { count: '22', title: 'Certified Administrators', desc: 'Multi-Cloud & Security Governance' },
    { count: '02', title: 'AI Specialists', desc: 'Agentforce & Databricks ML Experts' },
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-about-hero',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          
          {/* Dual Partner Cards */}
          <div className="gsap-about-hero flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <div className="bg-white hover:bg-white/95 text-[#0A1128] p-5 sm:p-7 px-8 sm:px-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 min-w-[210px] sm:min-w-[250px]">
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

            <div className="bg-white hover:bg-white/95 text-[#0A1128] p-5 sm:p-7 px-8 sm:px-12 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 min-w-[210px] sm:min-w-[250px]">
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

          <div className="gsap-about-hero space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Empowered by Expertise. <br />
              <span className="bg-gradient-to-r from-[#7FE4EA] via-[#00C2CB] to-[#7FE4EA] bg-clip-text text-transparent">
                Guided by Inquisitive Innovation.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-[#C7CDDA] font-light max-w-3xl mx-auto leading-relaxed">
              At Array Minds, we acknowledge that the industry needs of each customer are distinct and an in-depth interpretation of your methods, systems, and technology ecosystem is crucial to take well-informed pathways on the journey.
            </p>
          </div>

          {/* Action Button */}
          <div className="gsap-about-hero pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 text-[#032B2E]" />
            </Link>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PHILOSOPHY & CONSULTING APPROACH */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] text-xs font-bold uppercase tracking-wider border border-[#00C2CB]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2CB]" />
              <span>Our Consulting Approach</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128] leading-tight">
              Inquisitive, Research-Driven & Conscious Discovery.
            </h2>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              As your <strong className="text-[#0A1128]">Salesforce & Databricks Consulting Partner</strong>, we approach every task with an inquisitive, researching, and conscious mindset during the finding phase. We do not apply generic templates; we take time to interpret your business mechanics and provide suggestions and proposals tailored directly to your operational ecosystem.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1.5">
                <CheckCircle2 className="w-5 h-5 text-[#00C2CB]" />
                <h4 className="font-bold text-sm text-[#0A1128]">Distinct Industry Focus</h4>
                <p className="text-xs text-gray-600">Tailored solutions matching your specific regulatory and industry realities.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm space-y-1.5">
                <CheckCircle2 className="w-5 h-5 text-[#1B3B6F]" />
                <h4 className="font-bold text-sm text-[#0A1128]">Conscious Findings</h4>
                <p className="text-xs text-gray-600">Rigorous analysis of existing technical debt before suggesting architectures.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Strategic Partnership Card */}
          <div className="lg:col-span-5">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0A1128] to-[#1B3B6F] text-white shadow-2xl relative overflow-hidden space-y-6 border border-white/[0.08]">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#00C2CB]/15 rounded-full blur-2xl"></div>

              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA]">Core Philosophy</span>
                <span className="text-xs font-mono text-[#7FE4EA]">Agile Excellence</span>
              </div>

              <h3 className="text-2xl font-bold leading-snug text-white">
                "Leaving No Stone Unturned in Getting the Results You Want."
              </h3>

              <p className="text-xs sm:text-sm text-[#C7CDDA] leading-relaxed font-light">
                Array Minds believes in continuous collaboration with stakeholders at each step. Continuous improvement, timely intervention, and proper planning, optimization, and execution ensure your transformation succeeds.
              </p>

              <div className="space-y-3 pt-2 border-t border-white/[0.08] text-xs text-[#C7CDDA]">
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#00C2CB]" />
                  <span>High-Velocity Agile Sprints</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#00C2CB]" />
                  <span>Real-Time Stakeholder Collaboration</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 text-[#00C2CB]" />
                  <span>Uncompromising Engineering Quality</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE ARRAY MINDS PROCESS (AGILE METHODOLOGY) */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00838F] bg-[#E0F7FA] px-3 py-1 rounded-full border border-[#00C2CB]/30">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128]">
              Let Us Tell You About Our Process
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light leading-relaxed">
              Array Minds believes in agile methodology to make your plan a success. We foster constant collaboration with our stakeholders in each step with continuous improvement and intervention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, sIdx) => (
              <div 
                key={sIdx}
                className="animate-fade-in-up card-hover-lift p-7 rounded-3xl bg-[#F8FAFC] border border-gray-200/80 hover:border-[#00C2CB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <span className="text-4xl font-black text-[#1B3B6F]/30 group-hover:text-[#00C2CB] transition-colors">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-[#0A1128] leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-5 mt-6 border-t border-gray-200">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Key Deliverable</p>
                  <p className="text-xs font-semibold text-[#0A1128] mt-1">{step.deliverable}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. CORE ENTERPRISE VALUES */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00838F] bg-[#E0F7FA] px-3 py-1 rounded-full border border-[#00C2CB]/30">
            Our Foundational Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128]">
            Values That Drive Every Engagement
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val, vIdx) => (
            <div 
              key={vIdx}
              className="p-7 rounded-3xl bg-white border border-gray-200/80 hover:border-[#00C2CB] shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-gray-100 w-fit">
                {val.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0A1128]">{val.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CERTIFIED PEOPLE & TRUST METRICS */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-br from-[#0A1128] via-[#0D1B3E] to-[#1B3B6F] text-white border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA]">
              Certified Talent
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Number of Certified Professionals
            </h2>
            <p className="text-sm text-[#C7CDDA] font-light">
              Our engineering hubs house certified Salesforce architects, developers, administrators, and Databricks data specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifiedMetrics.map((stat, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-white/[0.04] border border-white/[0.08] space-y-2 hover:bg-white/[0.08] transition-all">
                <span className="text-4xl sm:text-5xl font-black text-white">{stat.count}</span>
                <h3 className="text-base font-bold text-[#7FE4EA]">{stat.title}</h3>
                <p className="text-xs text-[#8A99B5]">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLIENT TESTIMONIALS SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 bg-[#F8FAFC] text-[#0A1128] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] text-xs font-bold uppercase tracking-wider border border-[#00C2CB]/30">
              <Quote className="w-3.5 h-3.5 text-[#00C2CB]" />
              <span>Client Success Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0A1128]">
              What Our Clients Say
            </h2>
          </div>

          {/* Interactive Testimonial Slider Container */}
          <div 
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
            className="relative p-6 sm:p-12 rounded-3xl bg-white border border-gray-200 shadow-xl overflow-hidden"
          >
            <Quote className="w-12 h-12 text-[#00C2CB]/30 mb-3 ml-2" />
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((item, idx) => (
                  <div key={idx} className="w-full flex-shrink-0 px-2 sm:px-4">
                    <p className="text-base sm:text-xl text-gray-700 leading-relaxed italic font-light min-h-[140px] sm:min-h-[110px]">
                      "{item.quote}"
                    </p>

                    {/* Embedded Client Logo */}
                    {item.logo && (
                      <div className="my-6 flex justify-center">
                        <div className="w-48 h-16 p-2.5 px-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 shadow-xs flex items-center justify-center">
                          <img 
                            src={item.logo} 
                            alt={item.company} 
                            className="max-h-9 max-w-[140px] w-auto h-auto object-contain"
                          />
                        </div>
                      </div>
                    )}

                    <div className="pt-6 mt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-bold text-[#0A1128]">
                          {item.author}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600">
                          {item.role} — <span className="text-[#00838F] font-semibold">{item.company}</span>
                        </p>
                      </div>

                      <span className="self-start sm:self-auto text-xs font-bold px-3 py-1 rounded-full bg-[#E0F7FA] border border-[#00C2CB]/30 text-[#00838F]">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clean Animated Slide Indicators with Progress Drain */}
            <div className="flex items-center justify-center gap-2.5 pt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 overflow-hidden relative ${
                    currentTestimonial === idx 
                      ? 'w-10 bg-gray-200' 
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                >
                  {currentTestimonial === idx && (
                    <div 
                      key={currentTestimonial}
                      className={`h-full bg-[#00C2CB] rounded-full ${
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
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden border border-white/[0.08]">
          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to Transform Your Enterprise Journey?
            </h2>
            <p className="text-[#C7CDDA] text-sm sm:text-base font-light">
              Let us analyze your methods and technology ecosystem to architect your optimal pathway to growth.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-base font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
