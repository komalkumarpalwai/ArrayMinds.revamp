import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  RefreshCw, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  X, 
  Trash2, 
  FileText, 
  Briefcase, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  Calendar, 
  Edit3, 
  Eye, 
  Inbox,
  UserCheck,
  UserX
} from 'lucide-react';
import api from '../../../services/api';

const STATUS_CONFIG = {
  'Submitted': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  'Under Review': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  'Shortlisted': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
  'Rejected': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200', dot: 'bg-rose-500' },
  'Hired': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
};

const CareerSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [careersList, setCareersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCareerFilter, setSelectedCareerFilter] = useState('ALL');

  // Modal State
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [modalNotes, setModalNotes] = useState('');
  const [modalStatus, setModalStatus] = useState('New');
  const [savingStatus, setSavingStatus] = useState(false);

  const fetchSubmissionsAndCareers = async () => {
    try {
      setRefreshing(true);
      const [submissionsRes, careersRes] = await Promise.allSettled([
        api.get('/career-submissions'),
        api.get('/careers?all=true'),
      ]);

      if (submissionsRes.status === 'fulfilled') {
        setSubmissions(submissionsRes.value.data || []);
      } else {
        console.error('Failed to fetch career submissions:', submissionsRes.reason);
      }

      if (careersRes.status === 'fulfilled') {
        setCareersList(careersRes.value.data || []);
      }
    } catch (error) {
      console.error('Error fetching admin career submissions:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSubmissionsAndCareers();
  }, []);

  // Update Status and Notes
  const handleUpdateStatus = async (id, status, notes) => {
    try {
      setSavingStatus(true);
      const res = await api.patch(`/career-submissions/${id}`, {
        status,
        notes,
      });

      setSubmissions((prev) =>
        prev.map((sub) => (sub.id === id ? { ...sub, status, notes } : sub))
      );

      if (selectedSubmission && selectedSubmission.id === id) {
        setSelectedSubmission((prev) => ({ ...prev, status, notes }));
      }
    } catch (error) {
      console.error('Failed to update submission status:', error);
      alert('Error updating status in Salesforce.');
    } finally {
      setSavingStatus(false);
    }
  };

  // Delete Submission
  const handleDeleteSubmission = async (id) => {
    if (!window.confirm('Are you sure you want to delete this applicant record from Salesforce?')) {
      return;
    }

    try {
      await api.delete(`/career-submissions/${id}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    } catch (error) {
      console.error('Failed to delete submission:', error);
      alert('Error deleting submission from Salesforce.');
    }
  };

  // Filter Submissions
  const filteredSubmissions = submissions.filter((sub) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (sub.candidateName || '').toLowerCase().includes(q) ||
      (sub.email || '').toLowerCase().includes(q) ||
      (sub.phone || '').toLowerCase().includes(q) ||
      (sub.careerTitle || '').toLowerCase().includes(q) ||
      (sub.name || '').toLowerCase().includes(q);

    const matchesStatus = selectedStatus === 'ALL' || sub.status === selectedStatus;
    const matchesCareer =
      selectedCareerFilter === 'ALL' || sub.careerId === selectedCareerFilter;

    return matchesSearch && matchesStatus && matchesCareer;
  });

  // Calculate Metrics
  const totalCount = submissions.length;
  const newCount = submissions.filter((s) => s.status === 'New').length;
  const reviewCount = submissions.filter((s) => s.status === 'Under Review').length;
  const shortlistedCount = submissions.filter((s) => s.status === 'Shortlisted' || s.status === 'Interview').length;
  const selectedCount = submissions.filter((s) => s.status === 'Selected').length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* ========================================================================= */}
      {/* HEADER SECTION */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#6C4AB6] text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Talent Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B54]">
            Career Applications & Talent Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time candidate submissions and resume applications
          </p>
        </div>

        <button
          onClick={fetchSubmissionsAndCareers}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 shadow-xs transition-all w-fit"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-[#6C4AB6]' : ''}`} />
          <span>{refreshing ? 'Syncing...' : 'Refresh from Salesforce'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* STATS METRIC CARDS */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-600">Total Applications</span>
          <p className="text-2xl font-black text-[#2D1B54]">{totalCount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">New Submissions</span>
          <p className="text-2xl font-black text-emerald-700">{newCount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Under Review</span>
          <p className="text-2xl font-black text-amber-700">{reviewCount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-200/80 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">Interviewing</span>
          <p className="text-2xl font-black text-purple-700">{shortlistedCount}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-blue-200/80 shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Selected / Hired</span>
          <p className="text-2xl font-black text-blue-700">{selectedCount}</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SEARCH AND FILTERS */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-white border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate, role, email, phone..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            />
          </div>

          {/* Job Role Filter Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">Filter Role:</span>
            <select
              value={selectedCareerFilter}
              onChange={(e) => setSelectedCareerFilter(e.target.value)}
              className="px-3 py-2 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            >
              <option value="ALL">All Open Positions</option>
              {careersList.map((c) => (
                <option key={c.id || c._id} value={c.id || c._id}>
                  {c.title || c.name}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Status Tab Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-gray-100">
          {['ALL', 'Submitted', 'Under Review', 'Shortlisted', 'Rejected', 'Hired'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedStatus === st
                  ? 'bg-[#2D1B54] text-white shadow-xs'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUBMISSIONS TABLE */}
      {/* ========================================================================= */}
      <div className="rounded-2xl bg-white border border-gray-200/80 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#6C4AB6] animate-spin mx-auto" />
            <p className="text-xs text-gray-500 font-medium">Loading candidate applications from Salesforce...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="py-20 text-center space-y-3">
            <div className="p-4 rounded-full bg-purple-50 text-[#6C4AB6] w-fit mx-auto">
              <Inbox className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-gray-900">No Applications Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              {searchQuery || selectedStatus !== 'ALL' || selectedCareerFilter !== 'ALL'
                ? 'No candidate applications match the selected filter criteria.'
                : 'When candidates apply on the public Careers page, their profiles and resumes will appear here automatically.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F9FD] border-b border-gray-200 text-gray-600 uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="px-6 py-4">Submission & Candidate</th>
                  <th className="px-6 py-4">Applied Position</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Resume</th>
                  <th className="px-6 py-4">Submitted Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubmissions.map((sub) => {
                  const statusStyle = STATUS_CONFIG[sub.status] || STATUS_CONFIG['Submitted'];

                  return (
                    <tr key={sub.id || sub._id} className="hover:bg-purple-50/20 transition-colors">
                      
                      {/* Submission ID & Candidate Name & Contact */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            {sub.submissionNumber && (
                              <span className="px-1.5 py-0.5 rounded bg-purple-100 text-[#4E2F94] font-mono text-[10px] font-bold">
                                {sub.submissionNumber}
                              </span>
                            )}
                            <span className="font-bold text-gray-900 text-sm">{sub.candidateName}</span>
                          </div>
                          <div className="flex flex-col gap-0.5 text-gray-500 text-[11px]">
                            <span className="flex items-center gap-1.5">
                              <Mail className="w-3 h-3 text-gray-400" />
                              {sub.email}
                            </span>
                            {sub.phone && (
                              <span className="flex items-center gap-1.5">
                                <Phone className="w-3 h-3 text-gray-400" />
                                {sub.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Applied Role */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="font-semibold text-[#2D1B54] text-xs">
                            {sub.careerTitle || 'General Application'}
                          </span>
                          {sub.careerDepartment && (
                            <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-[#6C4AB6] text-[10px] font-bold">
                              {sub.careerDepartment}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Dropdown / Badge */}
                      <td className="px-6 py-4">
                        <select
                          value={sub.status}
                          onChange={(e) => handleUpdateStatus(sub.id, e.target.value, sub.notes)}
                          className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border} focus:outline-none cursor-pointer`}
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Hired">Hired</option>
                        </select>
                      </td>

                      {/* Resume / Links */}
                      <td className="px-6 py-4">
                        {sub.resumeUrl ? (
                          <a
                            href={sub.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#6C4AB6] font-bold text-xs transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Resume</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <span className="text-gray-400 italic text-[11px]">No file</span>
                        )}
                      </td>

                      {/* Submitted Date */}
                      <td className="px-6 py-4 text-gray-500 whitespace-nowrap text-[11px]">
                        {sub.submittedDate
                          ? new Date(sub.submittedDate).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : 'Recent'}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedSubmission(sub);
                              setModalNotes(sub.notes || '');
                              setModalStatus(sub.status || 'New');
                            }}
                            className="p-2 rounded-xl text-gray-600 hover:text-[#6C4AB6] hover:bg-purple-50 transition-colors"
                            title="View Full Application"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSubmission(sub.id)}
                            className="p-2 rounded-xl text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CANDIDATE DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-up">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#2D1B54] to-[#4E2F94] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD1DE]">
                  Candidate Application
                </span>
                <h3 className="text-xl font-bold">{selectedSubmission.candidateName}</h3>
                <p className="text-xs text-purple-200">
                  Applied for: {selectedSubmission.careerTitle || 'Open Position'}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Contact & Social Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Contact Details</span>
                  <div className="space-y-1 text-xs text-gray-800">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#6C4AB6]" />
                      <a href={`mailto:${selectedSubmission.email}`} className="text-[#6C4AB6] hover:underline font-semibold">
                        {selectedSubmission.email}
                      </a>
                    </p>
                    {selectedSubmission.phone && (
                      <p className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#6C4AB6]" />
                        <span>{selectedSubmission.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200/80 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-600">Professional Links</span>
                  <div className="space-y-1 text-xs">
                    {selectedSubmission.linkedInUrl && (
                      <p className="flex items-center gap-2">
                        <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                        <a href={selectedSubmission.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold truncate">
                          LinkedIn Profile
                        </a>
                      </p>
                    )}
                    {selectedSubmission.portfolioUrl && (
                      <p className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-purple-600" />
                        <a href={selectedSubmission.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline font-semibold truncate">
                          Portfolio / GitHub
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Resume Download Action */}
              {selectedSubmission.resumeUrl && (
                <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white text-[#6C4AB6] shadow-xs">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900">Uploaded Resume / CV</h4>
                      <p className="text-[11px] text-gray-600">Verified applicant file stored securely</p>
                    </div>
                  </div>
                  <a
                    href={selectedSubmission.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-[#6C4AB6] hover:bg-[#5B3BA8] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download / View</span>
                  </a>
                </div>
              )}

              {/* Cover Letter / Notes */}
              {selectedSubmission.coverLetter && (
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Candidate Cover Note & Summary
                  </span>
                  <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200/80 text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
                    {selectedSubmission.coverLetter}
                  </div>
                </div>
              )}

              {/* Internal Recruitment Notes Editor */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                    Internal Recruiter Notes (Stored in Salesforce)
                  </label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value)}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[#F8F9FD] border border-gray-200 text-gray-800"
                  >
                    <option value="Submitted">Submitted</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Hired">Hired</option>
                  </select>
                </div>

                <textarea
                  rows="3"
                  value={modalNotes}
                  onChange={(e) => setModalNotes(e.target.value)}
                  placeholder="Add internal feedback, interview score, or next steps..."
                  className="w-full p-3.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                ></textarea>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleUpdateStatus(selectedSubmission.id, modalStatus, modalNotes)}
                    disabled={savingStatus}
                    className="px-6 py-2 rounded-xl bg-[#2D1B54] hover:bg-[#4E2F94] text-white text-xs font-bold shadow-xs transition-all"
                  >
                    {savingStatus ? 'Saving to Salesforce...' : 'Save Notes & Status'}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default CareerSubmissions;
