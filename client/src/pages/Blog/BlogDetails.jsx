import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  RefreshCw, 
  Share2, 
  Sparkles,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import api from '../../services/api';
import LogoLoader from '../../components/common/LogoLoader';
import SEO from '../../components/common/SEO';
import { organizationSchema, SITE_DOMAIN, DEFAULT_OG_IMAGE } from '../../utils/seoConfig';

const ensureUrl = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
};

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/blogs/${slug}`);
        setBlog(response.data);
      } catch (err) {
        console.error('Error fetching blog details from Salesforce:', err);
        setError(
          err.response?.data?.message || 'The requested article could not be found or has not been published.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <LogoLoader text="Loading article..." size="lg" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2D1B54]">Article Unavailable</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed">
              {error || 'The requested article could not be found.'}
            </p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2D1B54] text-white text-xs font-bold shadow-md hover:bg-[#381D66] transition-all w-full"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = blog ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || blog.title,
    image: blog.coverImage || DEFAULT_OG_IMAGE,
    datePublished: blog.publishedAt || blog.createdAt,
    dateModified: blog.updatedAt || blog.publishedAt || blog.createdAt,
    author: {
      '@type': 'Person',
      name: blog.author || 'ArrayMinds Editorial'
    },
    publisher: organizationSchema,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_DOMAIN}/blog/${slug}`
    }
  } : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-sans pb-24">
      <SEO
        title={`${blog.seoTitle || blog.title} | ArrayMinds Tech Insights`}
        description={blog.seoDescription || blog.excerpt || `Read ${blog.title} on the ArrayMinds blog covering Salesforce, Databricks, and Enterprise AI.`}
        keywords={blog.tags && blog.tags.length > 0 ? (Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags) : `${blog.title}, Salesforce, Databricks, Enterprise AI, ArrayMinds`}
        canonicalPath={`/blog/${slug}`}
        ogImage={blog.featuredImage || DEFAULT_OG_IMAGE}
        ogType="article"
        structuredData={articleSchema}
      />
      
      {/* ========================================================================= */}
      {/* 1. ARTICLE HEADER */}
      {/* ========================================================================= */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-[#0A1128] via-[#10224A] to-[#1B3B6F] text-white overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2CB]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          
          {/* Back Link & Share */}
          <div className="flex items-center justify-between">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#7FE4EA] hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Knowledge Hub</span>
            </Link>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold backdrop-blur-sm transition-all"
            >
              {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            {blog.title}
          </h1>

          {/* Excerpt */}
          {blog.excerpt && (
            <p className="text-sm sm:text-base text-[#C7CDDA] font-light leading-relaxed">
              {blog.excerpt}
            </p>
          )}

          {/* Author & Date Bar */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/15 text-xs text-[#C7CDDA]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white border border-white/20">
                {blog.author ? blog.author.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="font-semibold text-white">{blog.author || 'Array-Minds Editorial'}</span>

              {/* Quick Header Social Icons */}
              {(blog.authorLinkedInUrl || blog.authorXUrl) && (
                <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/20">
                  {blog.authorLinkedInUrl && (
                    <a
                      href={ensureUrl(blog.authorLinkedInUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md bg-white/10 hover:bg-[#0A66C2] text-white transition-colors"
                      title="Author LinkedIn Profile"
                      aria-label="Author LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {blog.authorXUrl && (
                    <a
                      href={ensureUrl(blog.authorXUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md bg-white/10 hover:bg-black text-white transition-colors"
                      title="Author X Profile"
                      aria-label="Author X"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#00C2CB]" />
              <span>
                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ARTICLE BODY CONTENT */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 max-h-[480px] bg-white">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 shadow-xl space-y-8">
          <div className="prose max-w-none text-gray-800 leading-relaxed font-sans text-sm sm:text-base whitespace-pre-wrap">
            {blog.content}
          </div>

          {/* ========================================================================= */}
          {/* AUTHOR PROFILE & SOCIAL LINKS (BELOW ARTICLE) */}
          {/* ========================================================================= */}
          <div className="pt-8 border-t border-gray-200">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#F8F9FD] border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2D1B54] to-[#6C4AB6] text-white flex items-center justify-center font-black text-xl shadow-md shadow-[#2D1B54]/20 flex-shrink-0">
                  {blog.author ? blog.author.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6C4AB6]">
                    Written By
                  </p>
                  <h3 className="text-base sm:text-lg font-black text-[#0A1128]">
                    {blog.author || 'Array-Minds Editorial'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    Enterprise Cloud, Salesforce & AI Practice at Array Minds
                  </p>
                </div>
              </div>

              {/* Public Author Links: Author_LinkedIn_URL__c & Author_X_URL__c */}
              {(blog.authorLinkedInUrl || blog.authorXUrl) && (
                <div className="flex flex-wrap items-center gap-3 sm:self-center">
                  {blog.authorLinkedInUrl && (
                    <a
                      href={ensureUrl(blog.authorLinkedInUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold shadow-md shadow-[#0A66C2]/20 transition-all transform hover:-translate-y-0.5"
                      aria-label={`Connect with ${blog.author} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4 fill-current" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  )}

                  {blog.authorXUrl && (
                    <a
                      href={ensureUrl(blog.authorXUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0F1419] hover:bg-black text-white text-xs font-bold shadow-md shadow-black/20 transition-all transform hover:-translate-y-0.5"
                      aria-label={`Follow ${blog.author} on X`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>Follow on X</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* End-of-article Box */}
          <div className="pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Array Minds Advisory & Solutions
              </p>
              <p className="text-sm font-bold text-[#0A1128]">
                Ready to transform your enterprise architecture?
              </p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00C2CB] hover:bg-[#7FE4EA] text-[#032B2E] text-xs font-bold shadow-lg shadow-[#00C2CB]/30 transition-all transform hover:-translate-y-0.5"
            >
              <span>Consult Our Architects</span>
            </Link>
          </div>

        </div>

      </main>

    </div>
  );
};

export default BlogDetails;
