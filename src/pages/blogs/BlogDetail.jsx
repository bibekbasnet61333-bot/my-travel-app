import { useState, useEffect, useCallback, memo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { blogs } from '../../data/blogs/blogsData';
import { formatDate, formatDateShort } from '../../utils/dateUtils';

// =============================================================================
// Utility Functions
// =============================================================================

const slugify = (text) => {
  if (!text) return 'section';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// =============================================================================
// HTML Sanitization - Security Critical
// =============================================================================

const sanitizeBlogContent = (htmlContent) => {
  if (typeof window === 'undefined') return htmlContent;
  
  if (typeof DOMPurify === 'undefined') {
    return htmlContent
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<iframe[^>]*>/gi, '')
      .replace(/<object[^>]*>/gi, '')
      .replace(/<embed[^>]*>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/on\w+='[^']*'/gi, '')
      .replace(/javascript:[^\s]*/gi, '')
      .replace(/data:[^\s]*/gi, '');
  }
  
  return DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'img', 'div', 'span'],
    ALLOWED_ATTR: ['href', 'title', 'src', 'alt', 'class', 'id', 'data-section'],
    ALLOW_DATA_ATTR: true,
    ADD_ATTR: ['target', 'id', 'data-section'],
  });
};

// =============================================================================
// Reading Progress Component
// =============================================================================

const ReadingProgress = memo(function ReadingProgress({ progress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div
        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
});

// =============================================================================
// Table of Contents Component
// =============================================================================

const BlogTOC = memo(function BlogTOC({ items, activeSection, readingProgress, title = "Table of Contents", showProgress = true }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          {title}
        </h3>

        {showProgress && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-500 mb-1">
              <span>Reading Progress</span>
              <span>{readingProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <nav>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 text-sm group ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-l-4 border-amber-500 shadow-sm transform scale-[1.02]'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 hover:shadow-sm'
                }`}
                style={{
                  paddingLeft: `${(item.level - 1) * 12 + 12}px`,
                  fontSize: item.level === 1 ? '14px' : item.level === 2 ? '13px' : '12px',
                  fontWeight: item.level === 1 ? '600' : '500'
                }}
              >
                <span className={`inline-block transition-transform duration-200 ${
                  activeSection === item.id ? 'translate-x-1' : 'group-hover:translate-x-0.5'
                }`}>
                  {item.text}
                </span>
                {activeSection === item.id && (
                  <span className="inline-block ml-2 w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 pt-6 border-t border-slate-200">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          Back to Top
        </button>
      </div>
    </div>
  );
});

// =============================================================================
// Related Blogs Component
// =============================================================================

const RelatedBlogs = memo(function RelatedBlogs({ currentBlogId, category }) {
  const relatedBlogs = blogs
    .filter(blog => blog.id !== currentBlogId && blog.category === category)
    .slice(0, 3);

  if (relatedBlogs.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Related Stories</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedBlogs.map(blog => (
          <Link 
            key={blog.id} 
            to={`/blogs/${blog.id}`}
            className="group block"
          >
            <div className="aspect-video overflow-hidden rounded-lg mb-3">
              <img 
                src={blog.image} 
                alt={blog.title}
                loading="lazy"
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <h4 className="font-semibold text-gray-800 group-hover:text-amber-600 transition-colors line-clamp-2">
              {blog.title}
            </h4>
            <p className="text-sm text-gray-500 mt-1">{formatDateShort(blog.date)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
});

// =============================================================================
// Blog Content Renderer
// =============================================================================

const BlogContent = memo(function BlogContent({ content }) {
  const [sanitizedContent, setSanitizedContent] = useState('');

  useEffect(() => {
    setSanitizedContent(sanitizeBlogContent(content));
  }, [content]);

  const blogStyles = `
    .blog-content {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.8;
      color: #374151;
    }
    .blog-content h1 { font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem; color: #111827; }
    .blog-content h2 { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 1rem; color: #1f2937; }
    .blog-content h3 { font-size: 1.25rem; font-weight: 600; margin: 1.25rem 0 0.75rem; color: #374151; }
    .blog-content p { margin: 1rem 0; }
    .blog-content ul, .blog-content ol { margin: 1rem 0; padding-left: 1.5rem; }
    .blog-content li { margin: 0.5rem 0; }
    .blog-content a { color: #d97706; text-decoration: underline; }
    .blog-content a:hover { color: #b45309; }
    .blog-content blockquote {
      border-left: 4px solid #f59e0b;
      padding-left: 1rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #4b5563;
      background: #fffbeb;
      padding: 1rem;
      border-radius: 0.5rem;
    }
    .blog-content .blogger-tip {
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 0.5rem;
      padding: 1rem;
      margin: 1.5rem 0;
    }
    .blog-content .blogger-tip strong { color: #1d4ed8; }
    .blog-content .section-title {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 2rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #fbbf24;
    }
    .blog-content .section-icon { font-size: 1.5rem; }
    .blog-content .text-arrow { margin-right: 0.25rem; }
    .blog-content .section-text { margin: 0.75rem 0; }
  `;

  return (
    <>
      <style>{blogStyles}</style>
      <div 
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </>
  );
});

// =============================================================================
// Share Component
// =============================================================================

const ShareButtons = memo(function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url: window.location.href });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  }, [title]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Share this article"
        disabled={!navigator.share}
      >
        <Share2 className="w-5 h-5 text-gray-600" />
      </button>
      <button
        onClick={handleCopy}
        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="Copy link"
      >
        {copied ? (
          <span className="text-green-600 text-sm font-medium">Copied!</span>
        ) : (
          <span className="text-gray-600 text-sm">Copy</span>
        )}
      </button>
    </div>
  );
});

// =============================================================================
// Main Blog Detail Page
// =============================================================================

function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [tocItems, setTocItems] = useState([]);

  // Generate TOC from content
  const generateTOC = useCallback((content) => {
    if (!content) return [];
    const headings = [];
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

    headingElements.forEach((heading, index) => {
      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent.trim();
      const existingId = heading.getAttribute('id');
      const id = existingId || slugify(text) || `section-${index}`;

      headings.push({ id, text, level });
      heading.id = id;
      heading.setAttribute('data-section', id);
    });

    return headings;
  }, []);

  // Inject data-section attributes into rendered content
  const injectDataSection = useCallback(() => {
    const contentDiv = document.querySelector('.blog-content');
    if (contentDiv) {
      const headings = contentDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
      headings.forEach((heading, index) => {
        if (!heading.getAttribute('data-section')) {
          const text = heading.textContent.trim();
          const id = slugify(text) || `section-${index}`;
          heading.setAttribute('data-section', id);
          heading.id = id;
        }
      });
    }
  }, []);

  // Scroll handler
  useEffect(() => {
    const updateReadingProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (totalHeight) {
        const progress = Math.round((windowScrollTop / totalHeight) * 100);
        setReadingProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowProgress(windowScrollTop > window.innerHeight * 0.05);
    };

    const handleScroll = () => {
      updateReadingProgress();
      const sections = document.querySelectorAll('[data-section]');
      let currentSection = '';

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.getAttribute('data-section');
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    updateReadingProgress();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate TOC when blog content changes
  useEffect(() => {
    if (blog?.content) {
      const items = generateTOC(blog.content);
      setTocItems(items);
      setTimeout(injectDataSection, 100);
    }
  }, [blog?.content, generateTOC, injectDataSection]);

  // Fetch blog data
  useEffect(() => {
    setLoading(true);
    setError(null);

    const timer = setTimeout(() => {
      const foundBlog = blogs.find(b => b.id === id);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        setError('Blog post not found');
      }
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-200 rounded-xl mb-8 animate-pulse" />
            <div className="h-10 bg-gray-200 rounded mb-4 animate-pulse" />
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-8 animate-pulse" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">{error || 'Blog post not found'}</p>
            <Link 
              to="/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const showSidebar = tocItems.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-amber-50">
      <Helmet>
        <title>{blog.title} | SASA Travel</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <link rel="canonical" href={`${window.location.origin}/blogs/${blog.id}`} />
      </Helmet>

      {showProgress && <ReadingProgress progress={readingProgress} />}

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] max-h-[600px]">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Navigation & Share */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <Link 
            to="/blogs"
            className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="hidden sm:inline">Back to Blogs</span>
          </Link>
          <ShareButtons title={blog.title} />
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-amber-500 text-white text-sm font-medium rounded-full">
                {blog.category === 'nepal' ? 'NEPAL' : 'INTERNATIONAL'}
              </span>
              {blog.featured && (
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(blog.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{blog.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Table of Contents */}
            {showSidebar && (
              <aside className="lg:w-64 flex-shrink-0 hidden lg:block">
                <div className="lg:sticky lg:top-20">
                  <BlogTOC 
                    items={tocItems} 
                    activeSection={activeSection} 
                    readingProgress={readingProgress} 
                    title="Table of Contents" 
                    showProgress={true} 
                  />
                </div>
              </aside>
            )}
            
            {/* Main Article Content */}
            <main className={showSidebar ? 'lg:flex-1' : 'max-w-4xl mx-auto'}>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-medium">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {blog.tags?.slice(0, 6).map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <article className="bg-white rounded-2xl shadow-lg p-6 md:p-10 lg:p-12 mb-12">
                <BlogContent content={blog.content} />
              </article>

              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 rounded-xl p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {blog.author?.charAt(0) || 'A'}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">{blog.author}</h4>
                    <p className="text-gray-600 text-sm">
                      Travel writer and adventure enthusiast sharing stories from around the world.
                    </p>
                  </div>
                </div>
              </div>

              <RelatedBlogs currentBlogId={blog.id} category={blog.category} />

              <div className="mt-12 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 md:p-10 text-white text-center">
                <h3 className="text-2xl font-bold mb-4">Ready for Your Adventure?</h3>
                <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                  Let our travel experts help you plan the perfect trip to any of these amazing destinations.
                </p>
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold"
                >
                  Start Planning Today
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </Link>
              </div>
            </main>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(BlogDetailPage);

