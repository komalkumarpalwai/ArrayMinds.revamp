import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft, 
  Save, 
  AlertCircle,
  Sparkles,
  RefreshCw,
  Image,
  User,
  Globe
} from 'lucide-react';
import api from '../../../services/api';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    author: 'Array-Minds Editorial Team',
    status: 'draft',
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await api.get(`/blogs/${id}`);
        const data = response.data;
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          excerpt: data.excerpt || '',
          content: data.content || '',
          featuredImage: data.featuredImage || '',
          author: data.author || 'Array-Minds Editorial Team',
          status: data.status || 'draft',
        });
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog details.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      await api.put(`/blogs/${id}`, formData);
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Error updating blog post:', err);
      setError(
        err.response?.data?.message || 'Failed to update blog post.'
      );
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-16 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-[#EC1557] animate-spin mx-auto" />
        <p className="text-xs font-semibold text-gray-500">
          Loading article...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/blogs"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#2D1B54] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-gray-200 shadow-xl space-y-8">
        
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-[#2D1B54] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Update Salesforce Article</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B54]">
            Edit: {formData.title || 'Article'}
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Modifications will sync directly to Salesforce Website_Blog__c
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Article Title <span className="text-[#EC1557]">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Architecting Multi-Cloud Salesforce Integrations"
              className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            />
          </div>

          {/* Slug & Author */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                URL Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="multi-cloud-salesforce-databricks"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Author
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Sarah Chen"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>
          </div>

          {/* Featured Image URL & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Featured Image URL
              </label>
              <input
                type="url"
                name="featuredImage"
                value={formData.featuredImage}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
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
                <option value="draft">Draft (Saved in Salesforce, hidden publicly)</option>
                <option value="published">Published (Visible on public website)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Short Summary / Excerpt
            </label>
            <textarea
              name="excerpt"
              rows="3"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A brief teaser to appear on article cards..."
              className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
            ></textarea>
          </div>

          {/* Full Article Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
              Article Content <span className="text-[#EC1557]">*</span>
            </label>
            <textarea
              name="content"
              required
              rows="12"
              value={formData.content}
              onChange={handleChange}
              placeholder="Full article content..."
              className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] font-sans"
            ></textarea>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
            <Link
              to="/admin/blogs"
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
              <span>{saving ? 'Updating Salesforce...' : 'Save Article Changes'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default EditBlog;
