import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Edit3, 
  Trash2, 
  RefreshCw, 
  ExternalLink, 
  Search, 
  AlertCircle,
  Calendar,
  User,
  CheckCircle2,
  Archive,
  BookOpen
} from 'lucide-react';
import api from '../../../services/api';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/blogs?all=true');
      setBlogs(response.data || []);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError(
        err.response?.data?.message || 'Failed to load blog posts.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete the blog post "${title}" from Salesforce?`)) {
      return;
    }

    setDeletingId(id);
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => (b.id !== id && b._id !== id)));
    } catch (err) {
      console.error('Error deleting blog post:', err);
      alert(err.response?.data?.message || 'Failed to delete blog post from Salesforce.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStatusChange = async (blog, nextStatus) => {
    const blogId = blog.id || blog._id;
    setUpdatingId(blogId);
    try {
      const response = await api.put(`/blogs/${blogId}`, { status: nextStatus });
      setBlogs((prev) =>
        prev.map((b) => ((b.id === blogId || b._id === blogId) ? response.data : b))
      );
    } catch (err) {
      console.error('Error updating status:', err);
      alert(err.response?.data?.message || 'Failed to update blog status in Salesforce.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query) ||
      blog.status?.toLowerCase().includes(query)
    );
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'draft':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-300';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. HEADER BAR */}
      {/* ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-[#2D1B54] text-xs font-bold uppercase tracking-wider mb-2">
            <FileText className="w-3.5 h-3.5 text-[#EC1557]" />
            <span>Salesforce Website_Blog__c CRM</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#2D1B54]">
            Blog & Article Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, publish, and archive technical thought leadership articles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            disabled={loading}
            className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <Link
            to="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EC1557] hover:bg-[#d0104a] text-white text-xs font-bold shadow-lg shadow-[#EC1557]/30 transition-all transform hover:-translate-y-0.5"
          >
            <Plus className="w-4 h-4" />
            <span>Write New Article</span>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEARCH & PREVIEW BAR */}
      {/* ========================================================================= */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 flex items-center justify-between gap-4 shadow-xs">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, author, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-[#F8F9FD] border border-gray-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6C4AB6]"
          />
        </div>

        <Link
          to="/blog"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-[#6C4AB6] hover:underline inline-flex items-center gap-1.5 whitespace-nowrap"
        >
          <span>Preview Live Blog Hub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* ========================================================================= */}
      {/* 3. BLOGS TABLE */}
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
              Loading blog articles...
            </p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-16 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-pink-50 text-[#EC1557] flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-[#2D1B54]">No blog posts found</p>
              <p className="text-xs text-gray-500 mt-1">
                {searchQuery ? 'Try clearing your search query.' : 'Click "Write New Article" above to create your first post in Salesforce.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-[#F8F9FD] text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Article Title & Excerpt</th>
                  <th className="px-6 py-4">Author</th>
                  <th className="px-6 py-4">Slug</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredBlogs.map((blog) => {
                  const blogId = blog.id || blog._id;
                  return (
                    <tr key={blogId} className="hover:bg-purple-50/40 transition-colors">
                      
                      {/* Title & Excerpt */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-bold text-sm text-[#2D1B54]">{blog.title}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-1 max-w-xs mt-0.5">
                            {blog.excerpt || 'No excerpt provided'}
                          </p>
                        </div>
                      </td>

                      {/* Author */}
                      <td className="px-6 py-4 text-gray-700 font-medium">
                        {blog.author}
                      </td>

                      {/* Slug */}
                      <td className="px-6 py-4 font-mono text-[11px] text-[#6C4AB6]">
                        {blog.slug}
                      </td>

                      {/* Status Dropdown / Toggle */}
                      <td className="px-6 py-4">
                        <select
                          value={blog.status}
                          disabled={updatingId === blogId}
                          onChange={(e) => handleStatusChange(blog, e.target.value)}
                          className={`px-3 py-1 rounded-full text-xs font-bold border focus:outline-none transition-all ${getStatusBadge(
                            blog.status
                          )}`}
                        >
                          <option value="published">🟢 Published</option>
                          <option value="draft">🟡 Draft</option>
                          <option value="archived">⚪ Archived</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/blog/${blog.slug}`}
                            target="_blank"
                            className="p-2 rounded-xl bg-gray-50 hover:bg-gray-200 text-gray-700 transition-all border border-gray-200"
                            title="View Live"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>

                          <Link
                            to={`/admin/blogs/edit/${blogId}`}
                            className="p-2 rounded-xl bg-purple-50 hover:bg-[#2D1B54] text-[#2D1B54] hover:text-white transition-all border border-purple-200 hover:border-transparent"
                            title="Edit Article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </Link>

                          <button
                            onClick={() => handleDelete(blogId, blog.title)}
                            disabled={deletingId === blogId}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-600 text-red-600 hover:text-white transition-all border border-red-200 hover:border-transparent"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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

    </div>
  );
};

export default BlogManagement;
