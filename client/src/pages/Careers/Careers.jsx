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
  Inbox,
  UploadCloud,
  FileText,
  Trash2
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../../services/api';
import LogoLoader from '../../components/common/LogoLoader';
import { getLenis } from '../../components/common/SmoothScroll';

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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    const isModalActive = !!selectedJob || applyModalOpen;
    const lenis = getLenis();

    if (isModalActive) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) lenis.start();
    };
  }, [selectedJob, applyModalOpen]);

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

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');

  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    setResumeError('');
    if (!file) {
      setResumeFile(null);
      return;
    }

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    const allowedExts = ['.pdf', '.doc', '.docx'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();

    if (!allowedExts.includes(ext) && !allowedTypes.includes(file.type)) {
      setResumeError('Invalid file format. Please upload PDF, DOC, or DOCX only.');
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setResumeError('File size exceeds 5MB limit. Please upload a smaller file.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setApplyLoading(true);
    setResumeError('');

    try {
      const formData = new FormData();
      formData.append('candidateName', applicationData.candidateName);
      formData.append('email', applicationData.candidateEmail);
      formData.append('phone', applicationData.candidatePhone || '');
      formData.append('careerId', selectedJob?.id || selectedJob?._id || '');
      formData.append('linkedInUrl', applicationData.linkedinUrl || '');
      formData.append('portfolioUrl', applicationData.portfolioUrl || '');
      formData.append('coverLetter', `Experience: ${applicationData.experienceYears}\n\nCover Note:\n${applicationData.message || ''}`);
      
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }

      // Record candidate application into Salesforce Website_Career_Submission__c
      await api.post('/career-submissions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setApplySuccess(true);
      setResumeFile(null);
      setApplicationData({
        candidateName: '',
        candidateEmail: '',
        candidatePhone: '',
        linkedinUrl: '',
        portfolioUrl: '',
        experienceYears: '3-5 years',
        message: '',
      });
    } catch (err) {
      console.error('Error submitting application:', err);
      alert(err.response?.data?.message || 'Failed to submit application. Please email info@arrayminds.com directly.');
    } finally {
      setApplyLoading(false);
    }
  };

  const perks = [
    {
      title: 'Global Team Synergy',
      desc: 'Collaborate with enterprise teams across London HQ, Coimbatore, and Hyderabad delivery centers.',
      icon: <Globe className="w-6 h-6 text-[#00C2CB]" />
    },
    {
      title: '100% Certification Support',
      desc: 'We sponsor exam vouchers, hands-on sandboxes, and bootcamps for Salesforce & Databricks certifications.',
      icon: <Award className="w-6 h-6 text-[#1B3B6F]" />
    },
    {
      title: 'Autonomous AI Projects',
      desc: 'Build next-generation Agentforce autonomous bots, Data Cloud pipelines, and Databricks Lakehouse ML models.',
      icon: <Sparkles className="w-6 h-6 text-[#00C2CB]" />
    },
    {
      title: 'Flexible Work Culture',
      desc: 'Balanced hybrid and agile rhythms designed to nurture continuous learning and personal growth.',
      icon: <Users className="w-6 h-6 text-[#1B3B6F]" />
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
    <div ref={containerRef} className="w-full bg-[#F8FAFC] text-[#0F172A] overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. HERO HEADER SECTION */}
      {/* ========================================================================= */}
      <section className="relative bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden shadow-xl">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          
          <div className="gsap-careers-hero inline-flex items-center gap-2 p-1.5 px-5 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md shadow-inner">
            <Briefcase className="w-4 h-4 text-[#7FE4EA]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              Array Minds Careers & Global Talent
            </span>
          </div>

          <h1 className="gsap-careers-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Build the Future of <br />
            <span className="bg-gradient-to-r from-[#7FE4EA] via-[#00C2CB] to-[#7FE4EA] bg-clip-text text-transparent">
              Enterprise Cloud & Lakehouse AI.
            </span>
          </h1>

          <p className="gsap-careers-hero text-base sm:text-xl text-[#C7CDDA] font-light max-w-3xl mx-auto leading-relaxed">
            Join an elite family of certified architects, engineers, and AI trailblazers orchestrating transformative solutions for global enterprises across the UK, Europe, and India.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHY WORK AT ARRAY MINDS */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00838F] bg-[#E0F7FA] px-3 py-1 rounded-full border border-[#00C2CB]/30">
            Culture & Engineering Growth
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128]">
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
              className="p-7 rounded-3xl bg-white border border-gray-200/80 hover:border-[#00C2CB] shadow-sm hover:shadow-xl transition-all duration-300 space-y-4"
            >
              <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-gray-100 w-fit">
                {perk.icon}
              </div>
              <h3 className="text-lg font-bold text-[#0A1128]">{perk.title}</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. OPEN POSITIONS DIRECTORY (SALESFORCE LIVE) */}
      {/* ========================================================================= */}
      <section id="open-positions" className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1B3B6F]">
                Current Openings
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1128]">
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
                        ? 'bg-[#0A1128] text-white shadow-md'
                        : 'bg-[#F8FAFC] text-gray-700 hover:bg-slate-100 border border-gray-200'
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
            <LogoLoader text="Loading career opportunities..." size="md" />
          ) : filteredCareers.length === 0 ? (
            <div className="p-16 text-center bg-[#F8FAFC] rounded-3xl border border-gray-200 space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#E0F7FA] text-[#00838F] flex items-center justify-center mx-auto">
                <Inbox className="w-6 h-6" />
              </div>
              <div>
                <p className="text-lg font-bold text-[#0A1128]">
                  No open positions currently listed in this category
                </p>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  We are always open to meeting extraordinary Salesforce architects and Databricks engineers. Send your resume to <strong className="text-[#0A1128]">info@arrayminds.com</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredCareers.map((job) => (
                <div
                  key={job._id}
                  className="animate-fade-in-up card-hover-lift bg-[#F8FAFC] p-8 rounded-3xl border border-gray-200 hover:border-[#00C2CB] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E0F7FA] text-[#00838F] border border-[#00C2CB]/30">
                        {job.department}
                      </span>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {job.employmentType}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#0A1128] group-hover:text-[#1B3B6F] transition-colors leading-snug">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#00C2CB]" />
                        <span>{job.location}</span>
                      </div>
                    </div>

                    {job.description && (
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {job.description}
                      </p>
                    )}

                    {/* Skills & Experience from Salesforce Record */}
                    {(job.experienceRequired || (job.skills && job.skills.length > 0)) && (
                      <div className="pt-2 border-t border-gray-200/80 flex flex-wrap items-center gap-1.5">
                        {job.experienceRequired && (
                          <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-semibold">
                            Exp: {job.experienceRequired}
                          </span>
                        )}
                        {job.skills && job.skills.slice(0, 3).map((skill, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-0.5 rounded-md bg-[#E0F7FA] text-[#00838F] text-[11px] font-bold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Requirements from Salesforce Record */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="space-y-1">
                        {job.requirements.slice(0, 2).map((req, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2 text-xs text-gray-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00C2CB] flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{req}</span>
                          </div>
                        ))}
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
                      className="text-xs font-bold text-[#1B3B6F] hover:text-[#0A1128] hover:underline"
                    >
                      View Full Details
                    </button>

                    <button
                      onClick={() => {
                        setSelectedJob(job);
                        setApplyModalOpen(true);
                        setApplySuccess(false);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-md shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5"
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
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overscroll-contain"
        >
          <div 
            data-lenis-prevent="true"
            className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto overscroll-contain animate-scale-up light-scrollbar"
          >
            
            <div className="bg-gradient-to-r from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white p-6 sm:p-8 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA]">
                  {selectedJob.department}
                </span>
                <h3 className="text-xl font-bold">{selectedJob.title}</h3>
                <p className="text-xs text-[#C7CDDA] flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#00C2CB]" />
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
              
              {/* Role Overview */}
              {selectedJob.description && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Role Overview & Description</h4>
                  <div className="text-xs sm:text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedJob.description}
                  </div>
                </div>
              )}

              {/* Job Key Attributes Grid from Salesforce Record */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#F8FAFC] border border-gray-200/80 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400">Department</span>
                  <p className="font-bold text-[#0A1128] mt-0.5">{selectedJob.department}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400">Location</span>
                  <p className="font-bold text-[#0A1128] mt-0.5">{selectedJob.location}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400">Employment Type</span>
                  <p className="font-bold text-[#00838F] capitalize mt-0.5">{selectedJob.employmentType}</p>
                </div>

                {selectedJob.experienceRequired && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">Experience Required</span>
                    <p className="font-bold text-gray-800 mt-0.5">{selectedJob.experienceRequired}</p>
                  </div>
                )}

                {selectedJob.salaryRange && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">Salary Range</span>
                    <p className="font-bold text-emerald-700 mt-0.5">{selectedJob.salaryRange}</p>
                  </div>
                )}

                {selectedJob.jobType && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">Job Type</span>
                    <p className="font-bold text-[#1B3B6F] mt-0.5">{selectedJob.jobType}</p>
                  </div>
                )}

                {selectedJob.applicationDeadline && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-gray-400">Application Deadline</span>
                    <p className="font-semibold text-rose-600 mt-0.5">
                      {new Date(selectedJob.applicationDeadline).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                )}

                {selectedJob.applicationEmail && (
                  <div className="col-span-2 sm:col-span-3 pt-2 border-t border-gray-200/60">
                    <span className="text-[10px] font-bold uppercase text-gray-400">Direct Inquiries</span>
                    <p className="font-semibold text-gray-800 mt-0.5">{selectedJob.applicationEmail}</p>
                  </div>
                )}
              </div>

              {/* Skills from Salesforce Record */}
              {selectedJob.skills && selectedJob.skills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Required Skills & Tools</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1 rounded-lg bg-[#E0F7FA] text-[#00838F] border border-[#00C2CB]/30 text-xs font-bold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Responsibilities from Salesforce Record */}
              {selectedJob.responsibilities && selectedJob.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Key Responsibilities</h4>
                  <ul className="space-y-2">
                    {selectedJob.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2CB] flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qualifications & Requirements from Salesforce Record */}
              {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase text-gray-500 tracking-wider">Qualifications & Requirements</h4>
                  <ul className="space-y-2">
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00C2CB] flex-shrink-0 mt-0.5" />
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
                  className="px-8 py-3 rounded-full text-xs font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-md shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5"
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
        <div 
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overscroll-contain"
        >
          <div 
            data-lenis-prevent="true"
            className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto overscroll-contain animate-scale-up light-scrollbar"
          >
            
            <div className="bg-gradient-to-r from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white p-6 sm:p-8 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7FE4EA]">
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
                      Full Name <span className="text-[#00C2CB]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applicationData.candidateName}
                      onChange={(e) => setApplicationData({ ...applicationData, candidateName: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Email Address <span className="text-[#00C2CB]">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={applicationData.candidateEmail}
                        onChange={(e) => setApplicationData({ ...applicationData, candidateEmail: e.target.value })}
                        placeholder="sarah@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
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
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        LinkedIn Profile URL <span className="text-[#00C2CB]">*</span>
                      </label>
                      <input
                        type="url"
                        required
                        value={applicationData.linkedinUrl}
                        onChange={(e) => setApplicationData({ ...applicationData, linkedinUrl: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Portfolio / GitHub URL
                      </label>
                      <input
                        type="url"
                        value={applicationData.portfolioUrl || ''}
                        onChange={(e) => setApplicationData({ ...applicationData, portfolioUrl: e.target.value })}
                        placeholder="https://github.com/username or personal site"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
                      />
                    </div>
                  </div>

                  {/* Resume / CV Secure File Upload */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Upload Resume / CV <span className="text-[#00C2CB]">*</span>
                      </label>
                      <span className="text-[10px] text-gray-500 font-medium">PDF, DOC, DOCX (Max 5MB)</span>
                    </div>

                    <div className="relative">
                      {!resumeFile ? (
                        <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-cyan-200 hover:border-[#00C2CB] rounded-2xl bg-[#F8FAFC]/60 hover:bg-cyan-50/40 cursor-pointer transition-all">
                          <UploadCloud className="w-8 h-8 text-[#00C2CB] mb-2 animate-bounce-subtle" />
                          <span className="text-xs font-semibold text-gray-700">
                            Click to upload <span className="text-[#00C2CB] font-bold">or drag and drop</span>
                          </span>
                          <span className="text-[11px] text-gray-600 mt-0.5">
                            Securely uploaded & stored with end-to-end verification
                          </span>
                          <input
                            type="file"
                            required
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleResumeChange}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="flex items-center justify-between p-3.5 px-4 rounded-2xl bg-[#E0F7FA]/60 border border-[#00C2CB]/30 text-xs">
                          <div className="flex items-center gap-3 truncate">
                            <div className="p-2 rounded-xl bg-white text-[#00838F] shadow-xs">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="truncate">
                              <p className="font-bold text-gray-900 truncate">{resumeFile.name}</p>
                              <p className="text-[11px] text-gray-600">{(resumeFile.size / 1024).toFixed(1)} KB • Ready to submit</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setResumeFile(null)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-rose-600 hover:bg-white transition-colors"
                            title="Remove file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {resumeError && (
                      <p className="text-[11px] text-rose-500 font-semibold mt-1">{resumeError}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                        Years of Experience
                      </label>
                      <select
                        value={applicationData.experienceYears}
                        onChange={(e) => setApplicationData({ ...applicationData, experienceYears: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00C2CB]"
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
                      className="px-8 py-3 rounded-full text-xs font-bold text-[#032B2E] bg-[#00C2CB] hover:bg-[#7FE4EA] shadow-md shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5"
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
    </div>
  );
};

export default Careers;
