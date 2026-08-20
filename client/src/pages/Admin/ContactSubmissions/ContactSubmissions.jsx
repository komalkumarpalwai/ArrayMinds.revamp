import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  RefreshCw, 
  Mail, 
  Phone, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  X,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Inbox,
  User
} from 'lucide-react';
import api from '../../../services/api';

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/contact');
      setSubmissions(response.data);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setError(
        err.response?.data?.message || 'Failed to load leads from Salesforce CRM. Please ensure the server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      const response = await api.put(`/contact/${id}`, { status: newStatus });
      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === id ? response.data : sub))
      );
      if (selectedSubmission?._id === id) {
        setSelectedSubmission(response.data);
      }
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update submission status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      sub.name?.toLowerCase().includes(query) ||
      sub.email?.toLowerCase().includes(query) ||
      sub.company?.toLowerCase().includes(query) ||
      sub.subject?.toLowerCase().includes(query) ||
      sub.message?.toLowerCase().includes(query) ||
      sub.phone?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const counts = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === 'new').length,
    inProgress: submissions.filter((s) => s.status === 'in-progress').length,
    read: submissions.filter((s) => s.status === 'read').length,
    archived: submissions.filter((s) => s.status === 'archived').length,
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'read':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & METRICS */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#2D1B54] text-xs font-bold uppercase tracking-wider mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Salesforce CRM Leads</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2D1B54]">
            Contact Form Submissions
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Real-time client leads and project inquiries stored in Salesforce Org
          </p>
        </div>

        <button
          onClick={fetchSubmissions}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2D1B54] hover:bg-[#381D66] text-white text-xs font-bold shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div 
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'all' ? 'border-[#EC1557] ring-2 ring-[#EC1557]/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-xs font-bold text-gray-500 uppercase">Total Submissions</p>
          <p className="text-2xl font-black text-[#2D1B54] mt-1">{counts.total}</p>
        </div>

        <div 
          onClick={() => setStatusFilter('new')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'new' ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-700 uppercase">New Inquiries</p>
            {counts.new > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            )}
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-1">{counts.new}</p>
        </div>

        <div 
          onClick={() => setStatusFilter('in-progress')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'in-progress' ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-xs font-bold text-blue-700 uppercase">In Progress</p>
          <p className="text-2xl font-black text-blue-700 mt-1">{counts.inProgress}</p>
        </div>

        <div 
          onClick={() => setStatusFilter('archived')}
          className={`p-4 rounded-2xl bg-white border cursor-pointer transition-all ${
            statusFilter === 'archived' ? 'border-gray-500 ring-2 ring-gray-500/20 shadow-md' : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <p className="text-xs font-bold text-gray-500 uppercase">Archived</p>
          <p className="text-2xl font-black text-gray-600 mt-1">{counts.archived}</p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & FILTER CONTROLS */}
      {/* ========================================================================= */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        
        {/* Search */}
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, company, subject, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F8F9FD] border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {['all', 'new', 'in-progress', 'read', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === status
                  ? 'bg-[#2D1B54] text-white shadow-xs'
                  : 'bg-[#F8F9FD] text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </button>
          ))}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 3. SUBMISSIONS TABLE / LIST */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        
        {error && (
          <div className="p-6 bg-red-50 border-b border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {loading ? (
          <div className="p-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-[#EC1557] animate-spin mx-auto" />
            <p className="text-xs font-semibold text-gray-500">
              Retrieving live leads from Salesforce CRM...
            </p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-[#6C4AB6] flex items-center justify-center mx-auto">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-[#2D1B54]">No submissions found</p>
              <p className="text-xs text-gray-500 mt-1">
                {searchQuery || statusFilter !== 'all'
                  ? 'Try clearing your search query or status filter.'
                  : 'Incoming submissions from the Contact Us page will appear here.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#F8F9FD] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Client / Prospect</th>
                  <th className="px-6 py-4">Area of Interest</th>
                  <th className="px-6 py-4">Message Snippet</th>
                  <th className="px-6 py-4">Date Received</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubmissions.map((sub) => (
                  <tr 
                    key={sub._id} 
                    className="hover:bg-purple-50/40 transition-colors cursor-pointer group"
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    
                    {/* Client Info */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-sm text-[#2D1B54] group-hover:text-[#EC1557] transition-colors">
                          {sub.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                          <Mail className="w-3 h-3 text-[#6C4AB6]" />
                          <span>{sub.email}</span>
                        </div>
                        {sub.company && (
                          <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                            <Building2 className="w-3 h-3 text-gray-400" />
                            <span>{sub.company}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Subject */}
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#2D1B54] font-semibold text-[11px]">
                        {sub.subject}
                      </span>
                    </td>

                    {/* Message Preview */}
                    <td className="px-6 py-4 max-w-xs">
                      <p className="line-clamp-2 text-gray-600 leading-relaxed">
                        {sub.message}
                      </p>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 font-mono text-[11px]">
                      {new Date(sub.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      <span className="block text-[10px] text-gray-400">
                        {new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={sub.status}
                        disabled={updatingId === sub._id}
                        onChange={(e) => handleStatusChange(sub._id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border focus:outline-none transition-all ${getStatusBadge(
                          sub.status
                        )}`}
                      >
                        <option value="new">🟢 New</option>
                        <option value="in-progress">🔵 In Progress</option>
                        <option value="read">🟣 Read</option>
                        <option value="archived">⚪ Archived</option>
                      </select>
                    </td>

                    {/* Action Button */}
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedSubmission(sub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-[#2D1B54] text-[#2D1B54] hover:text-white font-bold transition-all text-xs border border-purple-200 hover:border-transparent shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* 4. FULL SUBMISSION DETAIL MODAL */}
      {/* ========================================================================= */}
      {selectedSubmission && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-up">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#2D1B54] to-[#4E2F94] text-white p-6 sm:p-8 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#FFD1DE]">
                  Inquiry Details
                </span>
                <h3 className="text-xl font-bold">
                  {selectedSubmission.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* Contact Meta Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200 text-xs">
                <div>
                  <p className="font-bold text-gray-500 uppercase">Work Email</p>
                  <a
                    href={`mailto:${selectedSubmission.email}`}
                    className="font-bold text-[#EC1557] hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedSubmission.email}</span>
                  </a>
                </div>

                {selectedSubmission.phone && (
                  <div>
                    <p className="font-bold text-gray-500 uppercase">Phone / WhatsApp</p>
                    <a
                      href={`tel:${selectedSubmission.phone}`}
                      className="font-bold text-[#2D1B54] hover:underline flex items-center gap-1.5 mt-0.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedSubmission.phone}</span>
                    </a>
                  </div>
                )}

                {selectedSubmission.company && (
                  <div>
                    <p className="font-bold text-gray-500 uppercase">Company</p>
                    <p className="font-bold text-gray-800 mt-0.5 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>{selectedSubmission.company}</span>
                    </p>
                  </div>
                )}

                <div>
                  <p className="font-bold text-gray-500 uppercase">Submission Timestamp</p>
                  <p className="font-semibold text-gray-700 mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>{new Date(selectedSubmission.createdAt).toLocaleString()}</span>
                  </p>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase">Area of Interest / Subject</p>
                <div className="p-3 rounded-xl bg-purple-50 text-[#2D1B54] font-bold text-sm border border-purple-200">
                  {selectedSubmission.subject}
                </div>
              </div>

              {/* Full Message */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase">Project Scope & Requirements</p>
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedSubmission.message}
                </div>
              </div>

              {/* Status Update & Direct Actions */}
              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <label className="text-xs font-bold uppercase text-gray-600 whitespace-nowrap">
                    Update Status:
                  </label>
                  <select
                    value={selectedSubmission.status}
                    onChange={(e) => handleStatusChange(selectedSubmission._id, e.target.value)}
                    className="text-xs font-bold px-3 py-2 rounded-xl bg-[#F8F9FD] border border-gray-300 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="read">Read</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`mailto:${selectedSubmission.email}?subject=RE: ${encodeURIComponent(selectedSubmission.subject)} - Array Minds Consulting`}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#EC1557] hover:bg-[#d0104a] text-white text-xs font-bold shadow-md transition-all w-full sm:w-auto"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ContactSubmissions;
