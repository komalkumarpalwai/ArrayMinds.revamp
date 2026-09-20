import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FileText, 
  ArrowLeft, 
  Save, 
  AlertCircle,
  Sparkles,
  Image,
  User,
  Globe,
  Linkedin,
  Twitter
} from 'lucide-react';
import api from '../../../services/api';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    status: 'draft',
    category: 'Technology',
    tags: '',
    readingTime: 5,
    isFeatured: false,
    author: 'Array-Minds Editorial Team',
    authorLinkedInUrl: '',
    authorXUrl: '',
    featuredImage: '',
    excerpt: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const val = type === 'checkbox' ? checked : value;
      const updated = { ...prev, [name]: val };
      // Auto-generate slug from title if slug hasn't been manually typed
      if (name === 'title' && !prev.manualSlug) {
        updated.slug = value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      if (name === 'slug') {
        updated.manualSlug = true;
      }
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.post('/blogs', formData);
      navigate('/admin/blogs');
    } catch (err) {
      console.error('Error creating blog post in Salesforce:', err);
      setError(
        err.response?.data?.message || 'Failed to create blog post in Salesforce.'
      );
      setLoading(false);
    }
  };

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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#2D1B54] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Salesforce Website_Blog__c</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2D1B54]">
            Compose New Article
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Fields marked with <span className="text-[#EC1557] font-bold text-sm">*</span> are required in Salesforce and on the website
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: CORE ARTICLE DETAILS */}
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#2D1B54]">
                1. Core Article Information
              </h2>
            </div>

            {/* Title (Title__c) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Article Title <span className="text-[#EC1557] font-bold">*</span>
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Architecting Multi-Cloud Salesforce Integrations with Databricks"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>

            {/* Slug & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Slug__c */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  URL Slug <span className="text-[#EC1557] font-bold">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="multi-cloud-salesforce-databricks"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-xs font-mono text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                />
              </div>

              {/* Status__c */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Publication Status <span className="text-[#EC1557] font-bold">*</span>
                </label>
                <select
                  name="status"
                  required
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

            {/* Category, Reading Time, and Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Category__c */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                >
                  <option value="Technology">Technology</option>
                  <option value="Salesforce">Salesforce</option>
                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="AI & Data">AI & Data</option>
                  <option value="Development">Development</option>
                  <option value="Company News">Company News</option>
                </select>
              </div>

              {/* Reading_Time__c */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Reading Time (Mins)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  name="readingTime"
                  value={formData.readingTime}
                  onChange={handleChange}
                  placeholder="5"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                />
              </div>

              {/* Is_Featured__c */}
              <div className="space-y-1.5 flex flex-col justify-end">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Featured Article
                </label>
                <label className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F9FD] border border-gray-200 cursor-pointer hover:bg-white transition-colors">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#EC1557] rounded border-gray-300 focus:ring-[#EC1557]"
                  />
                  <span className="text-xs font-semibold text-gray-800">Highlight on Knowledge Hub</span>
                </label>
              </div>
            </div>

            {/* Tags__c */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Tags (Comma-Separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Salesforce, Data Cloud, Agentforce, Integrations"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
            </div>
          </div>

          {/* SECTION 2: AUTHOR & SOCIAL PROFILES */}
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#2D1B54]">
                2. Author & Attribution
              </h2>
            </div>

            {/* Article Author (Salesforce Article_Author__c Text(255)) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Article Author
                </label>
                <span className="text-[10px] text-gray-400 font-medium">Text (Max 255)</span>
              </div>
              <input
                type="text"
                name="author"
                maxLength={255}
                value={formData.author}
                onChange={handleChange}
                placeholder="e.g. Sarah Chen, Enterprise Architect or Array-Minds Editorial Team"
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              />
              <p className="text-[11px] text-gray-400">Custom field (Article_Author__c) displayed publicly on the blog article</p>
            </div>

            {/* Author Social Media Profiles (Salesforce Author_LinkedIn_URL__c & Author_X_URL__c) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>Author LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  name="authorLinkedInUrl"
                  value={formData.authorLinkedInUrl}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]"
                />
                <p className="text-[11px] text-gray-400">Publicly linked on the article card & footer</p>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Twitter className="w-3.5 h-3.5 text-[#0F1419]" />
                  <span>Author X (Twitter) Profile URL</span>
                </label>
                <input
                  type="url"
                  name="authorXUrl"
                  value={formData.authorXUrl}
                  onChange={handleChange}
                  placeholder="https://x.com/username"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <p className="text-[11px] text-gray-400">Publicly linked on the article card & footer</p>
              </div>
            </div>
          </div>

          {/* SECTION 3: MEDIA & SUMMARY */}
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#2D1B54]">
                3. Cover Media & Summary
              </h2>
            </div>

            {/* Featured Image URL (Featured_Image_URL__c) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Featured Cover Image URL
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

            {/* Excerpt (Excerpt__c) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Short Summary / Excerpt (Max 500 characters)
              </label>
              <textarea
                name="excerpt"
                rows="3"
                maxLength={500}
                value={formData.excerpt}
                onChange={handleChange}
                placeholder="A brief 1-2 sentence teaser to appear on article cards and search snippets..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
              ></textarea>
            </div>
          </div>

          {/* SECTION 4: FULL ARTICLE CONTENT */}
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#2D1B54]">
                4. Article Content
              </h2>
            </div>

            {/* Content (Content__c) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Article Content <span className="text-[#EC1557] font-bold">*</span>
              </label>
              <textarea
                name="content"
                required
                rows="12"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write or paste your full article content here (paragraphs, sections, code snippets)..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8F9FD] border border-gray-200 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6] font-sans"
              ></textarea>
            </div>
          </div>

          {/* SECTION 5: SEO & METADATA */}
          <div className="space-y-6">
            <div className="border-b border-gray-100 pb-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#2D1B54]">
                5. Search Engine Optimization (SEO)
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 p-4 rounded-2xl bg-[#F8F9FD] border border-gray-200">
              {/* SEO_Title__c */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Custom SEO Meta Title (Max 255 chars)
                </label>
                <input
                  type="text"
                  name="seoTitle"
                  maxLength={255}
                  value={formData.seoTitle}
                  onChange={handleChange}
                  placeholder="Defaults to Article Title if left empty"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                />
              </div>

              {/* SEO_Description__c */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                  Custom SEO Meta Description (Max 500 chars)
                </label>
                <textarea
                  name="seoDescription"
                  rows="2"
                  maxLength={500}
                  value={formData.seoDescription}
                  onChange={handleChange}
                  placeholder="Defaults to Excerpt if left empty"
                  className="w-full px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
                ></textarea>
              </div>
            </div>
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
              disabled={loading}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-[#EC1557] hover:bg-[#d0104a] shadow-lg shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving in Salesforce...' : 'Save Article'}</span>
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};

export default CreateBlog;
