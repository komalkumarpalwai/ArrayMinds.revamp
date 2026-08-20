import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  MessageSquare, 
  Briefcase, 
  FileText, 
  ArrowRight, 
  Plus, 
  RefreshCw, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Building2,
  Mail,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Database
} from 'lucide-react';
import api from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const AdminDashboard = () => {
  const { admin } = useAuth();
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    newSubmissions: 0,
    totalCareers: 0,
    activeCareers: 0,
    totalApplications: 0,
    newApplications: 0,
  });
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [recentCareers, setRecentCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [submissionsRes, careersRes, applicationsRes] = await Promise.allSettled([
        api.get('/contact'),
        api.get('/careers?all=true'),
        api.get('/career-submissions'),
      ]);

      const subs = submissionsRes.status === 'fulfilled' ? submissionsRes.value.data || [] : [];
      const careers = careersRes.status === 'fulfilled' ? careersRes.value.data || [] : [];
      const apps = applicationsRes.status === 'fulfilled' ? applicationsRes.value.data || [] : [];

      setStats({
        totalSubmissions: subs.length,
        newSubmissions: subs.filter(s => s.status === 'new').length,
        totalCareers: careers.length,
        activeCareers: careers.filter(c => c.status === 'active').length,
        totalApplications: apps.length,
        newApplications: apps.filter(a => a.status === 'New').length,
      });

      setRecentSubmissions(subs.slice(0, 5));
      setRecentCareers(careers.slice(0, 4));
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8">
      
      {/* ========================================================================= */}
      {/* 1. WELCOME BANNER */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#2D1B54] via-[#381D66] to-[#4E2F94] text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#EC1557]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-bold uppercase tracking-wider text-[#FFD1DE]">
            <Sparkles className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Array Minds Executive Cockpit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Welcome back, {admin?.name || 'Administrator'}!
          </h1>
          <p className="text-xs sm:text-sm text-purple-200 font-light">
            Monitor client inquiries, orchestrate career recruitment postings, and maintain live content.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          
          <Link
            to="/admin/careers/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EC1557] hover:bg-[#d0104a] text-white text-xs font-bold shadow-lg shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post New Job</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. STATS KPI CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Inquiries (Leads) */}
        <Link 
          to="/admin/contact-submissions"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-xl hover:border-[#6C4AB6]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Client Inquiries
            </span>
            <div className="p-2.5 rounded-2xl bg-purple-50 text-[#6C4AB6] group-hover:bg-[#6C4AB6] group-hover:text-white transition-colors">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-[#2D1B54]">{stats.totalSubmissions}</p>
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <span>{stats.newSubmissions} new leads</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>

        {/* Candidate Submissions */}
        <Link 
          to="/admin/career-submissions"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-xl hover:border-indigo-500/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Candidate Applications
            </span>
            <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-indigo-900">{stats.totalApplications}</p>
            <p className="text-xs text-indigo-600 mt-1 flex items-center gap-1 font-semibold">
              <span>{stats.newApplications} new candidates</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>

        {/* Active Careers */}
        <Link 
          to="/admin/careers"
          className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs hover:shadow-xl hover:border-[#EC1557]/50 transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Active Job Postings
            </span>
            <div className="p-2.5 rounded-2xl bg-pink-50 text-[#EC1557] group-hover:bg-[#EC1557] group-hover:text-white transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-black text-[#2D1B54]">{stats.activeCareers}</p>
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              <span>{stats.totalCareers} total listings</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>

        {/* Salesforce Status */}
        <div className="p-6 rounded-3xl bg-white border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">
              Salesforce CRM
            </span>
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-lg font-extrabold text-[#2D1B54]">Connected & Active</p>
            </div>
            <p className="text-xs text-gray-600 mt-1 font-mono">SOQL & REST Live</p>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. RECENT ACTIVITY: INQUIRIES & CAREERS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Inquiries (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#2D1B54]">Recent Contact Inquiries</h3>
              <p className="text-xs text-gray-500 mt-0.5">Latest leads recorded in Salesforce CRM</p>
            </div>
            <Link
              to="/admin/contact-submissions"
              className="text-xs font-bold text-[#EC1557] hover:underline inline-flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentSubmissions.length === 0 ? (
            <div className="text-center py-10 text-xs text-gray-500">
              No recent submissions found.
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {recentSubmissions.map((sub) => (
                <div key={sub._id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-bold text-xs text-[#2D1B54]">{sub.name}</p>
                    <p className="text-[11px] text-gray-500 flex items-center gap-2">
                      <span>{sub.email}</span>
                      {sub.company && <span>• {sub.company}</span>}
                    </p>
                    <span className="inline-block text-[10px] font-semibold text-[#6C4AB6]">
                      {sub.subject}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    sub.status === 'new' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Active Job Postings (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="text-lg font-bold text-[#2D1B54]">Career Postings</h3>
              <p className="text-xs text-gray-500 mt-0.5">Live recruitment opportunities</p>
            </div>
            <Link
              to="/admin/careers"
              className="text-xs font-bold text-[#EC1557] hover:underline inline-flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentCareers.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <p className="text-xs text-gray-500">No career postings found.</p>
              <Link
                to="/admin/careers/create"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D1B54] text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create First Job</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentCareers.map((job) => (
                <div key={job._id} className="p-3.5 rounded-2xl bg-[#F8F9FD] border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#2D1B54]">{job.title}</h4>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      job.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500">{job.department} • {job.location}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
