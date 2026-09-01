import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { 
  Users, 
  Linkedin, 
  MapPin, 
  Briefcase, 
  Award, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Building2,
  CheckCircle2,
  ExternalLink,
  Bot,
  TestTube2,
  Code2
} from 'lucide-react';

// Team Member Headshot Images
import selvaImg from '../../assets/selva.jfif';
import rajImg from '../../assets/raj.png';
import yousufImg from '../../assets/yousuf.jfif';
import nawazImg from '../../assets/nawaz.jfif';
import radhaImg from '../../assets/radha-selva.jfif';
import bharathImg from '../../assets/bharath.png';
import vaishnaviImg from '../../assets/Vaishnavi.jfif';
import ramImg from '../../assets/Ram-gandham.jfif';
import kalyanImg from '../../assets/kalyan-ceo.jpeg';
import preethaImg from '../../assets/Preetha.jfif';
import saiImg from '../../assets/sai3.png';
import tharunImg from '../../assets/tharun3.png';

const Team = () => {
  const [activeDepartment, setActiveDepartment] = useState('all');

  const departments = [
    { id: 'all', name: 'All Team' },
    { id: 'directors', name: 'Board of Directors' },
    { id: 'delivery', name: 'Delivery Leadership' },
    { id: 'regional', name: 'Developer Operations' },
    { id: 'leads', name: 'Technical & Engineering Leads' },
  ];

  const teamMembers = [
    // 1. Board of Directors (4 Directors)
    {
      id: 'selvakumar',
      name: 'Selvakumar Nadarajan',
      role: 'Founder & Director',
      category: 'directors',
      location: 'London, UK 🇬🇧',
      linkedin: 'https://www.linkedin.com/in/selvakumarnadarajan/',
      bio: 'Visionary co-founder guiding global strategy, client success, and enterprise alliances across the UK and European markets.',
      expertise: ['Enterprise Architecture', 'Strategic Growth', 'Multi-Cloud Alliances'],
      image: selvaImg,
      initials: 'SN'
    },
    {
      id: 'rajasekar',
      name: 'Rajasekar Mohan',
      role: 'Founder & Director',
      category: 'directors',
      location: 'London, UK 🇬🇧',
      linkedin: 'https://www.linkedin.com/in/rajasekarmohankumar/',
      bio: 'Co-founder directing global operations, technology transformation roadmaps, and enterprise client engagements.',
      expertise: ['Salesforce Architecture', 'Enterprise Program Delivery', 'ISV Product Strategy'],
      image: rajImg,
      initials: 'RM'
    },
    {
      id: 'yousuf',
      name: 'Yousuf Mohammad',
      role: 'Director & Developer Operations',
      category: 'directors',
      location: 'Hyderabad, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/yousufmohammad-jah/',
      bio: 'Leading DevOps, technical architecture, and programmatic engineering standards across development centers.',
      expertise: ['Developer Operations', 'Apex / LWC Engineering', 'CI/CD Pipelines'],
      image: yousufImg,
      initials: 'YM'
    },
    {
      id: 'nawaz',
      name: 'Nawaz Ahmed',
      role: 'Founder & Director',
      category: 'directors',
      location: 'Hyderabad, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/nawaz-ahmed-am/',
      bio: 'Co-founder driving technical delivery governance, solutions architecture, and enterprise cloud initiatives.',
      expertise: ['Cloud Infrastructure', 'Technical Solutions', 'Enterprise Delivery'],
      image: nawazImg,
      initials: 'NA'
    },

    // 2. Delivery & Growth Leadership
    {
      id: 'radhamani',
      name: 'Radhamani Selvakumar',
      role: 'Delivery Head',
      category: 'delivery',
      location: 'Global Delivery 🌐',
      linkedin: 'https://www.linkedin.com/in/radhamaniselvakumar/',
      bio: 'Overseeing global project delivery velocity, agile sprint governance, and quality assurance across client engagements.',
      expertise: ['Agile Delivery Governance', 'Resource Management', 'Quality Assurance'],
      image: radhaImg,
      initials: 'RS'
    },
    {
      id: 'bharath',
      name: 'Bharath Rangarajan Karur',
      role: 'Senior Service Delivery Manager',
      category: 'delivery',
      location: 'Global Delivery & Marketing 🌐',
      linkedin: 'https://www.linkedin.com/in/bharath-rangarajan-karur-3131715/',
      bio: 'Leading service delivery orchestration, client relations, and marketing initiatives to scale enterprise reach.',
      expertise: ['Service Delivery Management', 'Marketing & Growth', 'Client Relationship'],
      image: bharathImg,
      initials: 'BR'
    },

    // 3. Developer Operations (Regional Engineering Hubs)
    {
      id: 'vaishnavi',
      name: 'Vaishnavi R',
      role: 'Head of Developer Operations',
      category: 'regional',
      location: 'Coimbatore Hub, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/vaishnavi-r-154ab247/',
      bio: 'Leading Developer Operations and software engineering at the Coimbatore development center, managing sprint coordination, developer mentoring, and agile development cadence.',
      expertise: ['Developer Operations', 'Coimbatore Engineering Center', 'Agile Development'],
      image: vaishnaviImg,
      initials: 'VR'
    },
    {
      id: 'ram',
      name: 'Ram Gandham',
      role: 'Developer Operations & Engineering Lead',
      category: 'regional',
      location: 'Hyderabad Hub, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/ramgandham93/',
      bio: 'Co-leading Developer Operations and technical development at the Hyderabad development center alongside Kalyan, managing Data Cloud engineering, Databricks pipelines, and developer workflows.',
      expertise: ['Developer Operations', 'Data & AI Development', 'Technical Engineering'],
      image: ramImg,
      initials: 'RG'
    },
    {
      id: 'kalyan',
      name: 'Kalyan Sivapuram',
      role: 'Developer Operations & Engineering Lead',
      category: 'regional',
      location: 'Hyderabad Hub, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/kalyan-sivapuram-177904216/',
      bio: 'Co-leading Developer Operations and software development at the Hyderabad development center alongside Ram, managing Salesforce programmatic engineering, Apex/LWC development, and developer workflows.',
      expertise: ['Developer Operations', 'Apex & LWC Development', 'Salesforce Engineering'],
      image: kalyanImg,
      initials: 'KS'
    },

    // 4. Technical & Engineering Leads (LEADS SECTION - LAST TAB)
    {
      id: 'tharun',
      name: 'Tharun Maddela',
      role: 'Agentforce & AI Specialist',
      category: 'leads',
      location: 'Hyderabad Hub, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/tharun-maddela-17a592271/',
      bio: 'Architecting Salesforce Agentforce autonomous agents, generative AI prompts, and Data Cloud AI workflows to supercharge enterprise productivity.',
      expertise: ['Agentforce & Autonomous AI', 'Generative AI Workflows', 'Prompt Builder & Apex AI'],
      image: tharunImg,
      imgPos: 'object-[center_25%]',
      initials: 'TM'
    },
    {
      id: 'preetha',
      name: 'Preetha S',
      role: 'Quality Assurance Lead & Tester',
      category: 'leads',
      location: 'Coimbatore Hub, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/preethas1903/',
      bio: 'Governing end-to-end software quality assurance, test automation, and regression suites across Salesforce multi-cloud and custom ERP deployments.',
      expertise: ['Quality Assurance (QA)', 'Salesforce Test Automation', 'Regression & UAT Testing'],
      image: preethaImg,
      imgPos: 'object-[center_20%]',
      initials: 'PS'
    },
    {
      id: 'sai',
      name: 'S G Lakshman Punati (Sai)',
      role: 'Software Developer & QA Specialist',
      category: 'leads',
      location: 'Hyderabad Hub, India 🇮🇳',
      linkedin: 'https://www.linkedin.com/in/s-g-lakshman-punati-776661212/',
      bio: 'Full-stack Salesforce developer and testing engineer driving Apex, LWC components, automated test scripts, and robust enterprise feature delivery.',
      expertise: ['Salesforce Development', 'QA Testing & Automation', 'Apex & Lightning Web Components'],
      image: saiImg,
      imgPos: 'object-[center_15%]',
      initials: 'SP'
    }
  ];

  const containerRef = useRef(null);
  const statRefs = useRef([]);

  const statItems = [
    { value: 4, suffix: '', label: 'Board Directors' },
    { value: 3, suffix: '', label: 'Global Delivery Hubs' },
    { value: 50, suffix: '+', label: 'Certified Specialists' },
    { value: 100, suffix: '%', label: 'Agile Delivery' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-team-hero',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );

      // GSAP Count-Up Animation for Metrics
      statRefs.current.forEach((el, index) => {
        if (!el) return;
        const target = statItems[index].value;
        const suffix = statItems[index].suffix;
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            el.innerText = `${Math.floor(counter.val)}${suffix}`;
          },
          onComplete: () => {
            el.innerText = `${target}${suffix}`;
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const filteredMembers = activeDepartment === 'all'
    ? teamMembers
    : teamMembers.filter(m => m.category === activeDepartment);

  return (
    <div ref={containerRef} className="w-full bg-[#F8F9FD] text-[#0F172A] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="gsap-team-hero inline-flex items-center gap-2 p-1.5 px-5 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md shadow-inner">
            <Users className="w-4 h-4 text-[#7FE4EA]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              Array Minds Leadership & Global Delivery
            </span>
          </div>

          <h1 className="gsap-team-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            The Minds Behind <br />
            <span className="bg-gradient-to-r from-[#7FE4EA] via-[#00C2CB] to-[#7FE4EA] bg-clip-text text-transparent">
              Enterprise Excellence.
            </span>
          </h1>

          <p className="gsap-team-hero text-base sm:text-xl text-[#C7CDDA] font-light max-w-3xl mx-auto leading-relaxed">
            Meet the founders, delivery directors, and engineering leads orchestrating transformative Salesforce, Agentforce AI & Databricks solutions across the UK and India.
          </p>

          {/* Quick Metrics with GSAP Count-Up */}
          <div className="gsap-team-hero grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
            {statItems.map((stat, i) => (
              <div 
                key={i} 
                className="p-4 rounded-2xl bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.1] hover:border-[#00C2CB]/40 backdrop-blur-md transition-all duration-300 group"
              >
                <span 
                  ref={(el) => (statRefs.current[i] = el)}
                  className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#7FE4EA] transition-colors tabular-nums block"
                >
                  0{stat.suffix}
                </span>
                <p className="text-xs text-[#8A99B5] group-hover:text-[#C7CDDA] transition-colors mt-1 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. CATEGORY FILTER BAR */}
      {/* ========================================================================= */}
      <section className="py-5 bg-white border-b border-gray-200 sticky top-16 sm:top-20 z-40 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setActiveDepartment(dept.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                  activeDepartment === dept.id
                    ? 'bg-[#0A1128] text-white shadow-md scale-105'
                    : 'bg-[#F8FAFC] text-gray-700 hover:bg-slate-100 hover:text-[#0A1128] border border-gray-200 hover:border-slate-300'
                }`}
              >
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. TEAM MEMBERS GRID */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="animate-fade-in-up card-hover-lift bg-white rounded-3xl border border-gray-200/80 hover:border-[#00C2CB] shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                
                {/* Photo Frame Container */}
                <div className="relative aspect-[4/4] bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] overflow-hidden">
                  
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover ${member.imgPos || 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                    />
                  ) : (
                    <div className="w-full h-full p-6 flex flex-col items-center justify-center relative">
                      {/* Subtle Geometric Glow */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#00C2CB]/20 rounded-full blur-xl pointer-events-none"></div>
                      
                      {/* Avatar Frame with Initials Badge */}
                      <div className="w-24 h-24 rounded-2xl bg-white/10 border-2 border-white/30 backdrop-blur-md shadow-2xl flex items-center justify-center text-white text-3xl font-black tracking-wider transition-transform duration-300 group-hover:scale-110 group-hover:border-white/60">
                        <span>{member.initials}</span>
                      </div>
                    </div>
                  )}

                  {/* Location Badge Overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1.5 shadow-md">
                    <MapPin className="w-3 h-3 text-[#00C2CB]" />
                    <span>{member.location}</span>
                  </div>

                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0A1128] group-hover:text-[#1B3B6F] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1B3B6F] mt-1">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Core Focus
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.map((exp, eIdx) => (
                        <span 
                          key={eIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F8FAFC] border border-gray-200 text-gray-700"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Card Footer: LinkedIn Action */}
              <div className="p-6 pt-0">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full p-2.5 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5] text-[#0077B5] hover:text-white text-xs font-bold transition-all duration-300 border border-[#0077B5]/20 group/btn"
                >
                  <Linkedin className="w-3.5 h-3.5 fill-current" />
                  <span>Connect on LinkedIn</span>
                  <ExternalLink className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                </a>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. GLOBAL DELIVERY HUBS SPOTLIGHT */}
      {/* ========================================================================= */}
      <section className="py-16 bg-gradient-to-br from-[#0A1128] via-[#0D1B3E] to-[#1B3B6F] text-white border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA]">
              Global Presence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Our Strategic Delivery Hubs
            </h2>
            <p className="text-sm text-[#C7CDDA] font-light">
              Connected across time zones to provide continuous engineering velocity and localized enterprise client management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Hub 1: London */}
            <div className="p-7 rounded-3xl bg-white/[0.04] border border-white/[0.08] space-y-4 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇬🇧</span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  Global HQ
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">London, United Kingdom</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Strategic leadership, European enterprise client management, ISV partnerships, and executive consulting.
              </p>
            </div>

            {/* Hub 2: Coimbatore */}
            <div className="p-7 rounded-3xl bg-white/[0.04] border border-white/[0.08] space-y-4 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇮🇳</span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#00C2CB]/20 text-[#7FE4EA] border border-[#00C2CB]/30">
                  Engineering Center
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Coimbatore, India</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Core development center specializing in Salesforce programmatic engineering, Apex, LWC, and QA automation.
              </p>
            </div>

            {/* Hub 3: Hyderabad */}
            <div className="p-7 rounded-3xl bg-white/[0.04] border border-white/[0.08] space-y-4 hover:bg-white/[0.08] transition-all">
              <div className="flex items-center justify-between">
                <span className="text-3xl">🇮🇳</span>
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Data & AI Hub
                </span>
              </div>
              <h3 className="text-xl font-bold text-white">Hyderabad, India</h3>
              <p className="text-xs text-[#8A99B5] leading-relaxed">
                Databricks Lakehouse architecture, Agentforce AI implementation, Data Cloud engineering, and 24/7 managed support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. CAREERS CALL TO ACTION BANNER */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden border border-white/[0.08]">
          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Want to Join Our Elite Global Team?
            </h2>
            <p className="text-[#C7CDDA] text-sm sm:text-base font-light">
              We are constantly seeking certified Salesforce developers, Databricks engineers, and AI architects to join our growing global family.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/careers"
              className="px-8 py-3.5 rounded-full text-base font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-lg shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Explore Open Positions
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Team;
