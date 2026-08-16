import React, { useState, useEffect, useRef } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  Users, 
  Zap, 
  ShieldCheck, 
  Search, 
  Filter, 
  Send, 
  X, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  ChevronRight,
  RefreshCw,
  Inbox
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../../services/api';

gsap.registerPlugin(ScrollTrigger);

const Careers = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applyLoading, setApplyLoading] = useState(false);

  const [applicationData, setApplicationData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    linkedinUrl: '',
    experienceYears: '3-5 years',
    message: '',
  });

  const fetchPublicCareers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/careers');
      // Only display active jobs on public page
      const activeJobs = (response.data || []).filter((c) => c.status === 'active');
      setCareers(activeJobs);
    } catch (err) {
      console.error('Error fetching live careers:', err);
      setError('Could not load current open positions. Please check back shortly.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicCareers();
  }, []);

  const departments = [
    'all',
    ...new Set(careers.map((c) => c.department).filter(Boolean)),
  ];

  const filteredCareers = activeDepartment === 'all'
    ? careers
    : careers.filter((c) => c.department === activeDepartment);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplyLoading(true);

    try {
      // Record candidate inquiry into MongoDB Atlas submissions or send notification
      await api.post('/contact', {
        name: applicationData.candidateName,
        email: applicationData.candidateEmail,
        phone: applicationData.candidatePhone,
        company: `Applicant for: ${selectedJob?.title} (${applicationData.experienceYears} exp)`,
        subject: `Job Application: ${selectedJob?.title}`,
        message: `Candidate LinkedIn: ${applicationData.linkedinUrl}\nExperience: ${applicationData.experienceYears}\n\nCover Note:\n${applicationData.message}`,
      });

      setApplySuccess(true);
      setApplicationData({
        candidateName: '',
        candidateEmail: '',
        candidatePhone: '',
        linkedinUrl: '',
        experienceYears: '3-5 years',
        message: '',
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit application. Please email careers@arrayminds.com directly.');
    } finally {
      setApplyLoading(false);
    }
  };

  const perks = [
    {
      title: 'Global Team Synergy',
      desc: 'Collaborate with enterprise teams across London HQ, Coimbatore, and Hyderabad delivery centers.',
      icon: <Globe className="w-6 h-6 text-[#EC1557]" />
    },
    {
      title: '100% Certification Support',
      desc: 'We sponsor exam vouchers, hands-on sandboxes, and bootcamps for Salesforce & Databricks certifications.',
      icon: <Award className="w-6 h-6 text-[#6C4AB6]" />
    },
    {
      title: 'Autonomous AI Projects',
      desc: 'Build next-generation Agentforce autonomous bots, Data Cloud pipelines, and Databricks Lakehouse ML models.',
      icon: <Sparkles className="w-6 h-6 text-[#EC1557]" />
    },
    {
      title: 'Flexible Work Culture',
      desc: 'Balanced hybrid and agile rhythms designed to nurture continuous learning and personal growth.',
      icon: <Users className="w-6 h-6 text-[#6C4AB6]" />
    }
  ];

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-careers-hero',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', clearProps: 'all' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-[#F8F9FD] text-[#1E113F] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#4E2F94] via-[#5B3BA8] to-[#6C4AB6] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#EC1557]/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#6C4AB6]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="gsap-careers-hero inline-flex items-center gap-2 p-1.5 px-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
            <Briefcase className="w-4 h-4 text-[#FFD1DE]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              Array Minds Careers & Global Talent
            </span>
          </div>

          <h1 className="gsap-careers-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Build the Future of <br />
            <span className="bg-gradient-to-r from-white via-purple-100 to-[#FFD1DE] bg-clip-text text-transparent">
              Enterprise Cloud & Lakehouse AI.
            </span>
          </h1>

          <p className="gsap-careers-hero text-base sm:text-xl text-purple-100/90 font-light max-w-3xl mx-auto leading-relaxed">
            Join an elite family of certified architects, engineers, and AI trailblazers orchestrating transformative solutions for global enterprises across the UK, Europe, and India.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHY WORK AT ARRAY MINDS */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#EC1557]">
            Culture & Engineering Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B54]">
            Why Join Array Minds?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-light">
            We provide the resources, mentorship, and high-impact enterprise projects that allow your career to accelerate.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, pIdx) => (
            <div 
              key={pIdx}
              className="p-7 rounded-3xl bg-white border border-gray-200/80 hover:border-[#6C4AB6]/60 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-100 w-fit">
                {perk.icon}
              </div>
              <h3 className="text-lg font-bold text-[#2D1B54]">{perk.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OPEN POSITIONS DIRECTORY (MONGODB ATLAS LIVE) */}
      {/* ========================================================================= */}
      <section id="open-positions" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#6C4AB6]">
                Current Openings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B54]">
                Explore Available Roles
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                Live positions managed directly by our talent acquisition directors
              </p>
            </div>

            {/* Department Filter Tabs */}
            {departments.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                {departments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => setActiveDepartment(dept)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      activeDepartment === dept
                        ? 'bg-[#2D1B54] text-white shadow-md'
                        : 'bg-[#F8F9FD] text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {dept === 'all' ? 'All Roles' : dept}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Job Postings Grid */}
          {loading ? (
            <div className="p-16 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#EC1557] animate-spin mx-auto" />
              <p className="text-xs font-semibold text-gray-500">
                Fetching open roles from MongoDB Atlas...
              </p>
            </div>
          ) : filteredCareers.length === 0 ? (
            <div className="p-16 text-center bg-[#F8F9FD] rounded-3xl border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-[#EC1557] flex items-center justify-center mx-auto">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#2D1B54]">
                  No open positions currently listed in this category
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  We are always open to meeting extraordinary Salesforce architects and Databricks engineers. Send your resume to <strong className="text-[#2D1B54]">careers@arrayminds.com</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCareers.map((job) => (
                <div
                  key={job._id}
                  className="animate-fade-in-up card-hover-lift bg-[#F8F9FD] p-8 rounded-3xl border border-gray-200 hover:border-[#6C4AB6]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-[#2D1B54] border border-purple-200">
                        {job.department}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-pink-100 text-[#EC1557] border border-pink-200">
                        {job.employmentType}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#2D1B54] group-hover:text-[#EC1557] transition-colors leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#EC1557]" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                      {job.description}
                    </p>

                    {/* Preview Requirements */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="pt-2 border-t border-gray-200 space-y-1.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Highlights
                        </p>
                        <div className="space-y-1">
                          {job.requirements.slice(0, 2).map((req, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2 text-xs text-gray-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#EC1557] flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setApplySuccess(false);
                      }}
                      className="text-xs font-bold text-[#6C4AB6] hover:text-[#2D1B54] hover:underline"
                    >
                      View Full Details
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setApplyModalOpen(true);
                        setApplySuccess(false);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-md shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedJob && !applyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-up">
            
            <div className="bg-gradient-to-r from-[#2D1B54] to-[#4E2F94] text-white p-6 sm:p-8 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD1DE]">
                  {selectedJob.department}
                </span>
                <h3 className="text-xl font-bold">{selectedJob.title}</h3>
                <p className="text-xs text-purple-200 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#EC1557]" />
                  <span>{selectedJob.location} • {selectedJob.employmentType}</span>
                </p>
              </div>

              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Role Overview</h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {selectedJob.description}
                </p>
              </div>

              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Key Responsibilities</h4>
                  <ul className="space-y-1.5">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#6C4AB6] flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Qualifications & Requirements</h4>
                  <ul className="space-y-1.5">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#EC1557] flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>
                <button
                  onClick={() => setApplyModalOpen(true)}
                  className="px-8 py-3 rounded-full text-xs font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-md shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
                >
                  Apply For This Position
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. APPLICATION MODAL */}
      {/* ========================================================================= */}
      {applyModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-up">
            
            <div className="bg-gradient-to-r from-[#2D1B54] to-[#4E2F94] text-white p-6 sm:p-8 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD1DE]">
                  Direct Application
                </span>
                <h3 className="text-xl font-bold">Apply: {selectedJob.title}</h3>
              </div>

              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {applySuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-lg text-emerald-800">Application Submitted!</h4>
                  <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                    Thank you for applying to Array Minds. Your candidate profile has been recorded directly into our recruitment system. Our talent acquisition team will review your qualifications and reach out.
                  </p>
                  <button
                    onClick={() => {
                      setApplyModalOpen(false);
                      setSelectedJob(null);
                    }}
                    className="mt-4 px-6 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Full Name <span className="text-[#EC1557]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.candidateName}
                      onChange={(e) => setApplicationData({ ...applicationData, candidateName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Email Address <span className="text-[#EC1557]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationData.candidateEmail}
                        onChange={(e) => setApplicationData({ ...applicationData, candidateEmail: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={applicationData.candidatePhone}
                        onChange={(e) => setApplicationData({ ...applicationData, candidatePhone: e.target.value })}
                        placeholder="+44 7700 900077"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        LinkedIn Profile URL <span className="text-[#EC1557]">*</span>
                      </label>
                      <input
                        type="url"
                        required
                        value={applicationData.linkedinUrl}
                        onChange={(e) => setApplicationData({ ...applicationData, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Years of Experience
                      </label>
                      <select
                        value={applicationData.experienceYears}
                        onChange={(e) => setApplicationData({ ...applicationData, experienceYears: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                      >
                        <option value="1-2 years">1-2 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5-8 years">5-8 years</option>
                        <option value="8+ years">8+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                      Cover Note / Summary
                    </label>
                    <textarea
                      rows="3"
                      value={applicationData.message}
                      onChange={(e) => setApplicationData({ ...applicationData, message: e.target.value })}
                      placeholder="Highlight relevant certifications, projects, and why you'd be a great fit for Array Minds..."
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setApplyModalOpen(false)}
                      className="px-5 py-2.5 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={applyLoading}
                      className="px-8 py-3 rounded-full text-xs font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-md shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
                    >
                      {applyLoading ? 'Submitting Application...' : 'Submit Application'}
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. GENERAL TALENT POOL CTA */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-[#4E2F94] via-[#5B3BA8] to-[#6C4AB6] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Don't See the Exact Role for You?
            </h2>
            <p className="text-purple-100 text-sm sm:text-base font-light">
              We are constantly scouting for exceptional Salesforce architects, Apex developers, Databricks specialists, and delivery directors.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <a
              href="mailto:careers@arrayminds.com?subject=Spontaneous Application - Array Minds Talent Pool"
              className="px-8 py-3.5 rounded-full text-base font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/40 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              Send Resume to careers@arrayminds.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Careers;
