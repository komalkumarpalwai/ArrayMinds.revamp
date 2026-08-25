import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  RefreshCw, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  ExternalLink,
  Search
} from 'lucide-react';
import api from '../../../services/api';

const CareerManagement = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const fetchCareers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/careers');
      setCareers(response.data);
    } catch (err) {
      console.error('Error fetching careers:', err);
      setError(
        err.response?.data?.message || 'Failed to load career listings from Salesforce.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the job listing "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/careers/${id}`);
      setCareers((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error('Error deleting career:', err);
      alert(err.response?.data?.message || 'Failed to delete job posting.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusToggle = async (job) => {
    const nextStatus = job.status === 'active' ? 'closed' : 'active';
    try {
      const response = await api.put(`/careers/${job._id}`, { status: nextStatus });
      setCareers((prev) =>
        prev.map((c) => (c._id === job._id ? response.data : c))
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update job status.');
    }
  };

  const filteredCareers = careers.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.department?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#2D1B54] text-xs font-bold uppercase tracking-wider mb-2">
            <Briefcase className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Recruitment & Careers Management</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2D1B54]">
            Job Postings Directory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and publish enterprise roles directly to the live website
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchCareers}
            disabled={loading}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
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

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles by title, department, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F8F9FD] border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
          />
        </div>

        <Link
          to="/careers"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#6C4AB6] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>Preview Live Careers Page</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Careers Table / Grid */}
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
              Loading active job listings...
            </p>
          </div>
        ) : filteredCareers.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-[#EC1557] flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-[#2D1B54]">No job listings found</p>
              <p className="text-xs text-gray-500 mt-1">
                {searchQuery ? 'Try clearing your search query.' : 'Click "Post New Job" above to create your first listing.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#F8F9FD] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Job Title & Details</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredCareers.map((job) => (
                  <tr key={job._id} className="hover:bg-purple-50/40 transition-colors">
                    
                    {/* Title */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-sm text-[#2D1B54]">{job.title}</p>
                        <p className="text-[11px] text-gray-500 line-clamp-1 max-w-xs mt-0.5">
                          {job.description}
                        </p>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#2D1B54] font-semibold text-[11px]">
                        {job.department}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#EC1557]" />
                        <span>{job.location}</span>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4 text-gray-600 uppercase font-semibold text-[11px]">
                      {job.employmentType}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(job)}
                        className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                          job.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                            : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                        }`}
                      >
                        {job.status === 'active' ? '🟢 Active' : '⚪ Closed'}
                      </button>
                    </td>

                    {/* Action Buttons */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/careers/edit/${job._id}`}
                          className="p-2 rounded-xl bg-purple-50 hover:bg-[#2D1B54] text-[#2D1B54] hover:text-white transition-all border border-purple-200 hover:border-transparent"
                          title="Edit Job"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={() => handleDelete(job._id, job.title)}
                          disabled={deletingId === job._id}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-all border border-red-200 hover:border-transparent"
                          title="Delete Job"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};

export default CareerManagement;
