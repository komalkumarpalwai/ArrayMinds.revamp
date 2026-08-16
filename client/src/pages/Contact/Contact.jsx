import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck, 
  Building2, 
  Globe, 
  Sparkles,
  ArrowRight,
  MessageSquare,
  Lock,
  Headphones
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import api from '../../services/api';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: 'Salesforce Implementation & Agentforce',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const subjects = [
    'Salesforce Implementation & Agentforce',
    'Databricks Lakehouse & Data Engineering',
    'AI/BI Reports & Dashboards in Databricks',
    'WhatsApp & Telegram CRM Integrations',
    'AWS Connect & Cloud Telephony',
    'Payment Gateway & FinTech Integrations',
    'SAP Integration with Salesforce',
    'Custom AppExchange Product Engineering',
    'Admin Support & 24/7 Managed Services',
    'Salesforce Consultation & Health Check',
    'General Inquiry'
  ];

  const offices = [
    {
      city: 'London, United Kingdom',
      flag: '🇬🇧',
      type: 'Global Headquarters',
      address: '20-22 Wenlock Road, London, N1 7GU, United Kingdom',
      phone: '+44 20 8144 0407',
      telLink: '+442081440407',
      email: 'info@arrayminds.co.uk',
      hours: 'Mon - Fri: 9:00 AM - 6:00 PM GMT'
    },
    {
      city: 'Coimbatore, India',
      flag: '🇮🇳',
      type: 'Engineering Center',
      address: 'SF No. 370/3, Ground Floor, Sri Andal Nagar, Kalapatti, Coimbatore - 641048',
      phone: '+91 8754 380 969',
      telLink: '+918754380969',
      email: 'india@arrayminds.com',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST'
    },
    {
      city: 'Hyderabad, India',
      flag: '🇮🇳',
      type: 'Data & AI Excellence Hub',
      address: '7-96/5, Heeba Villa, Shankar Nagar Colony, Uppal Depot, Hyderabad, Telangana 500039',
      phone: '+91 8754 380 969',
      telLink: '+918754380969',
      email: 'hyderabad@arrayminds.com',
      hours: 'Mon - Fri: 9:30 AM - 6:30 PM IST'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      await api.post('/contact', formData);
      setStatus({ loading: false, success: true, error: null });
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: 'Salesforce Implementation & Agentforce',
        message: '',
      });
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      setStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Failed to submit your message. Please check your internet connection or reach us directly via email.',
      });
    }
  };

  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-contact-hero',
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
          
          <div className="gsap-contact-hero inline-flex items-center gap-2 p-1.5 px-5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner">
            <MessageSquare className="w-4 h-4 text-[#FFD1DE]" />
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-white">
              Direct Enterprise Consulting Channel
            </span>
          </div>

          <h1 className="gsap-contact-hero text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Let's Architect Your <br />
            <span className="bg-gradient-to-r from-white via-purple-100 to-[#FFD1DE] bg-clip-text text-transparent">
              Next Digital Breakthrough.
            </span>
          </h1>

          <p className="gsap-contact-hero text-base sm:text-xl text-purple-100/90 font-light max-w-3xl mx-auto leading-relaxed">
            Reach out to our certified Salesforce & Databricks architects. We are ready to analyze your ecosystem, solve technical bottlenecks, and accelerate your business growth.
          </p>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. MAIN CONTACT SECTION: FORM + DIRECT CHANNELS */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Interactive Contact Form (7 Cols) */}
          <div className="animate-fade-in-up lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-200 shadow-xl space-y-8 relative">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EC1557]">
                <Send className="w-4 h-4" />
                <span>Send Us a Message</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B54]">
                Tell Us About Your Project
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                All submissions are stored securely in our enterprise CRM and reviewed by senior architects within 24 hours.
              </p>
            </div>

            {/* Success State Notification */}
            {status.success && (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 animate-fade-in">
                <div className="flex items-center gap-2 font-bold text-base text-emerald-800">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Message Received Successfully!</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-700 leading-relaxed">
                  Thank you for reaching out to Array Minds. Your project requirements have been securely recorded in our system. A senior consultant will review your inquiry and follow up shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus((prev) => ({ ...prev, success: false }))}
                  className="mt-3 text-xs font-bold text-emerald-800 underline hover:text-emerald-900"
                >
                  Send another inquiry
                </button>
              </div>
            )}

            {/* Error State Notification */}
            {status.error && (
              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <p className="font-bold">Submission Error</p>
                  <p className="text-red-700 mt-0.5">{status.error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Full Name <span className="text-[#EC1557]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] focus:border-transparent transition-all"
                  />
                </div>

                {/* Work Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Work Email <span className="text-[#EC1557]">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] focus:border-transparent transition-all"
                  />
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Phone / WhatsApp (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44 20 8144 0407"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] focus:border-transparent transition-all"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Acme Corporation"
                    className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] focus:border-transparent transition-all"
                  />
                </div>

              </div>

              {/* Subject / Area of Interest */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Area of Interest / Service <span className="text-[#EC1557]">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] focus:border-transparent transition-all"
                >
                  {subjects.map((subj, idx) => (
                    <option key={idx} value={subj}>
                      {subj}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Project Scope & Requirements <span className="text-[#EC1557]">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your current systems, objectives, timeline, and any specific requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] focus:border-transparent transition-all"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className={`w-full py-4 rounded-full text-base font-bold text-white shadow-lg transition-all transform flex items-center justify-center gap-2 ${
                  status.loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#EC1557] hover:bg-[#d0104a] shadow-[#EC1557]/40 hover:-translate-y-0.5 active:scale-95'
                }`}
              >
                {status.loading ? (
                  <span>Recording Inquiry Securely...</span>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span>Your information is strictly protected under enterprise NDA standards.</span>
              </p>

            </form>

          </div>

          {/* Right Column: Direct Contact Info & Fast SLA Guarantee (5 Cols) */}
          <div className="animate-fade-in-up lg:col-span-5 space-y-8">
            
            {/* Quick Connect Card */}
            <div className="p-8 rounded-3xl bg-gradient-to-br from-[#2D1B54] to-[#4E2F94] text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#EC1557]/20 rounded-full blur-2xl"></div>

              <div className="space-y-2 relative z-10">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD1DE]">
                  Fast Response Guarantee
                </span>
                <h3 className="text-2xl font-extrabold">
                  Direct Channel Access
                </h3>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed font-light">
                  Need immediate architectural advice? Reach our global consulting teams directly via phone or email.
                </p>
              </div>

              <div className="space-y-4 relative z-10 text-sm">
                <a
                  href="mailto:info@arrayminds.co.uk"
                  className="p-4 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 transition-all flex items-center gap-3.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-[#EC1557] text-white shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-200">Global Inquiries</p>
                    <p className="font-bold text-white group-hover:text-[#FFD1DE] transition-colors">info@arrayminds.co.uk</p>
                  </div>
                </a>

                <a
                  href="tel:+442081440407"
                  className="p-4 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 transition-all flex items-center gap-3.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-[#6C4AB6] text-white shadow-xs">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-200">UK Office Direct</p>
                    <p className="font-bold text-white group-hover:text-[#FFD1DE] transition-colors">+44 20 8144 0407</p>
                  </div>
                </a>

                <a
                  href="tel:+918754380969"
                  className="p-4 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 transition-all flex items-center gap-3.5 group"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-xs">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-purple-200">India Operations Direct</p>
                    <p className="font-bold text-white group-hover:text-[#FFD1DE] transition-colors">+91 8754 380 969</p>
                  </div>
                </a>
              </div>

            </div>

            {/* Why Partner With Us Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-gray-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-base text-[#2D1B54]">
                Enterprise Engagement Standards
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EC1557] flex-shrink-0 mt-0.5" />
                  <span>Full mutual Non-Disclosure Agreement (NDA) before discovery</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6C4AB6] flex-shrink-0 mt-0.5" />
                  <span>Direct access to Senior Certified Technical Architects</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EC1557] flex-shrink-0 mt-0.5" />
                  <span>Transparent milestone-based SOW and sprint tracking</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#6C4AB6] flex-shrink-0 mt-0.5" />
                  <span>24/7 multi-timezone SLA support across UK and India</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. GLOBAL DELIVERY OFFICES SECTION */}
      {/* ========================================================================= */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#EC1557]">
              Visit Our Facilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2D1B54]">
              Global Operating Centers
            </h2>
            <p className="text-sm sm:text-base text-gray-600 font-light">
              Connecting enterprises across the UK, Europe, and Asia through our strategic regional hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((office, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-[#F8F9FD] border border-gray-200/80 hover:border-[#6C4AB6]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{office.flag}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-[#2D1B54] border border-purple-200">
                      {office.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-[#2D1B54] group-hover:text-[#EC1557] transition-colors">
                      {office.city}
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs text-gray-600 pt-2 border-t border-gray-200">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#6C4AB6] flex-shrink-0 mt-0.5" />
                      <span>{office.address}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#EC1557] flex-shrink-0" />
                      <a href={`tel:${office.telLink}`} className="hover:text-[#EC1557] font-semibold">
                        {office.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#6C4AB6] flex-shrink-0" />
                      <a href={`mailto:${office.email}`} className="hover:text-[#6C4AB6] font-semibold">
                        {office.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-2.5 text-gray-500 pt-1">
                      <Clock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                      <span>{office.hours}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
