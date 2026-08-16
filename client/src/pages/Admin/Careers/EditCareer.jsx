import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Briefcase, 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import api from '../../../services/api';

const EditCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    department: 'Salesforce Multi-Cloud',
    location: 'London, UK (Hybrid)',
    employmentType: 'full-time',
    status: 'active',
    description: '',
    responsibilities: [''],
    requirements: [''],
  });

  const departments = [
    'Salesforce Multi-Cloud',
    'Databricks & Lakehouse AI',
    'Integrations & Messaging (WhatsApp/Telegram)',
    'Developer Operations & DevOps',
    'Delivery, Agile & QA',
    'Consulting & Enterprise Architecture',
    'Sales & Solutions Engineering'
  ];

  const locations = [
    'London, UK (Hybrid)',
    'London, UK (On-site)',
    'Coimbatore, India (On-site)',
    'Coimbatore, India (Hybrid)',
    'Hyderabad, India (On-site)',
    'Hyderabad, India (Hybrid)',
    'Remote (Worldwide)',
    'Remote (UK Only)',
    'Remote (India Only)'
  ];

  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await api.get(`/careers/${id}`);
        const data = response.data;
        setFormData({
          title: data.title || '',
          department: data.department || 'Salesforce Multi-Cloud',
          location: data.location || 'London, UK (Hybrid)',
          employmentType: data.employmentType || 'full-time',
          status: data.status || 'active',
          description: data.description || '',
          responsibilities: data.responsibilities?.length ? data.responsibilities : [''],
          requirements: data.requirements?.length ? data.requirements : [''],
        });
      } catch (err) {
        console.error('Error fetching career:', err);
        setError('Failed to load career details from MongoDB Atlas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCareer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleListChange = (field, index, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addListItem = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ''],
    }));
  };

  const removeListItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...formData,
      responsibilities: formData.responsibilities.filter((r) => r.trim().length > 0),
      requirements: formData.requirements.filter((r) => r.trim().length > 0),
    };

    try {
      await api.put(`/careers/${id}`, payload);
      navigate('/admin/careers');
    } catch (err) {
      console.error('Error updating career:', err);
      setError(
        err.response?.data?.message || 'Failed to update career in MongoDB Atlas.'
      );
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-[#EC1557] animate-spin mx-auto" />
        <p className="text-xs font-semibold text-gray-500">Loading career details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/careers"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#2D1B54] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Job Postings</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-8">
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#2D1B54] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Update Career Listing</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B54]">
            Edit: {formData.title}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Updates will sync live across the Array Minds public recruitment page
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Job Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Job Title <span className="text-[#EC1557]">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Senior Salesforce Technical Architect"
              className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            />
          </div>

          {/* Department & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Department <span className="text-[#EC1557]">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              >
                {departments.map((dept, idx) => (
                  <option key={idx} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Location <span className="text-[#EC1557]">*</span>
              </label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              >
                {locations.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Employment Type & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Employment Type
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              >
                <option value="full-time">Full-Time</option>
                <option value="contract">Contract / Freelance</option>
                <option value="part-time">Part-Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Publication Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              >
                <option value="active">Active (Visible on Website)</option>
                <option value="draft">Draft (Hidden)</option>
                <option value="closed">Closed</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Role Overview & Summary <span className="text-[#EC1557]">*</span>
            </label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a comprehensive summary of the role, team context, and key impact areas..."
              className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            ></textarea>
          </div>

          {/* Key Responsibilities */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Key Responsibilities
              </label>
              <button
                type="button"
                onClick={() => addListItem('responsibilities')}
                className="text-xs font-bold text-[#EC1557] hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Responsibility</span>
              </button>
            </div>

            {formData.responsibilities.map((resp, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleListChange('responsibilities', idx, e.target.value)}
                  placeholder={`Responsibility #${idx + 1}`}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                />
                {formData.responsibilities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem('responsibilities', idx)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Requirements & Qualifications */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Required Qualifications & Skills
              </label>
              <button
                type="button"
                onClick={() => addListItem('requirements')}
                className="text-xs font-bold text-[#EC1557] hover:underline inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Requirement</span>
              </button>
            </div>

            {formData.requirements.map((req, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => handleListChange('requirements', idx, e.target.value)}
                  placeholder={`Requirement #${idx + 1}`}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                />
                {formData.requirements.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeListItem('requirements', idx)}
                    className="p-2 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/careers"
              className="px-6 py-3 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving Changes...' : 'Save Job Updates'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default EditCareer;
