import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calendar, 
  User, 
  ArrowRight, 
  Search, 
  RefreshCw, 
  BookOpen, 
  Sparkles,
  Inbox
} from 'lucide-react';
import LogoLoader from '../../components/common/LogoLoader';
import SEO from '../../components/common/SEO';
import { seoRoutes, organizationSchema } from '../../utils/seoConfig';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data || []);
    } catch (err) {
      console.error('Error fetching blogs from Salesforce:', err);
      setError('Could not load blog articles. Please check back shortly.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const query = searchQuery.toLowerCase();
    return (
      blog.title?.toLowerCase().includes(query) ||
      blog.excerpt?.toLowerCase().includes(query) ||
      blog.author?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-20">
      <SEO {...seoRoutes.blog} />
      
      {/* ========================================================================= */}
      {/* 1. HERO BANNER */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white overflow-hidden shadow-xl">
        {/* Background Glow Orbs */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#1B3B6F]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.1] text-xs font-bold uppercase tracking-widest text-[#7FE4EA] backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#00C2CB]" />
            <span>Array Minds Insights & Tech Digest</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
            Salesforce, AI & Cloud <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#7FE4EA] via-[#00C2CB] to-[#7FE4EA] bg-clip-text text-transparent">
              Thought Leadership
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#C7CDDA] max-w-2xl mx-auto font-light leading-relaxed">
            Deep-dives, architectural best practices, and enterprise trends straight from our consulting engineering teams.
          </p>

          {/* Search Bar */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/15 border border-white/20 text-sm text-white placeholder-slate-300/70 focus:bg-white/25 focus:outline-none focus:ring-2 focus:ring-[#00C2CB] backdrop-blur-md transition-all shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. BLOG DIRECTORY */}
      {/* ========================================================================= */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        
        {/* State: Loading */}
        {loading && (
          <LogoLoader text="Loading insights & articles..." size="md" />
        )}

        {/* State: Error */}
        {error && (
          <div className="p-8 rounded-3xl bg-red-50 border border-red-200 text-red-700 text-center space-y-3">
            <p className="text-base font-bold">{error}</p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0A1128] text-white text-xs font-bold shadow-md hover:bg-[#1B3B6F] transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Try Again</span>
            </button>
          </div>
        )}

        {/* State: Empty */}
        {!loading && !error && filteredBlogs.length === 0 && (
          <div className="p-20 text-center bg-white rounded-3xl border border-gray-200 shadow-sm space-y-4 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#E0F7FA] text-[#00838F] flex items-center justify-center mx-auto">
              <Inbox className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#0A1128]">No Articles Found</h3>
              <p className="text-xs sm:text-sm text-gray-500 mt-1.5">
                {searchQuery
                  ? 'No published posts matched your search criteria. Try clearing your search.'
                  : 'There are no published articles available at the moment. Please check back soon.'}
              </p>
            </div>
          </div>
        )}

        {/* State: Blogs Grid */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.id || blog._id}
                className="bg-white rounded-3xl border border-gray-200 hover:border-[#00C2CB] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Featured Image */}
                {blog.featuredImage ? (
                  <div className="h-52 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-52 w-full bg-gradient-to-br from-[#0A1128] to-[#1B3B6F] flex items-center justify-center text-white p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00C2CB]/10 opacity-50"></div>
                    <BookOpen className="w-12 h-12 text-[#7FE4EA] opacity-80" />
                  </div>
                )}

                {/* Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Meta info */}
                    <div className="flex items-center gap-4 text-[11px] font-semibold text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#00C2CB]" />
                        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-[#1B3B6F]" />
                        {blog.author}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-lg sm:text-xl font-bold text-[#0A1128] group-hover:text-[#1B3B6F] transition-colors leading-snug">
                      <Link to={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    {blog.excerpt && (
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed font-light">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/blog/${blog.slug}`}
                      className="text-xs font-bold text-[#00838F] group-hover:text-[#00C2CB] inline-flex items-center gap-1.5"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

      </main>

    </div>
  );
};

export default Blog;
