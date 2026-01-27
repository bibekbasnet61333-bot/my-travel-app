import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import BlogHeader from './layout/BlogHeader';
import BlogContent from './content/BlogContent';
import BlogMeta from './ui/BlogMeta';
import RelatedBlogs from './features/RelatedBlogs';
import BlogTOC from './content/BlogTOC';
import BlogAuthorBio from './ui/BlogAuthorBio';
import BlogCTA from './features/BlogCTA';
import ReadingProgress from './content/ReadingProgress';
import ErrorBoundary from '../ui/ErrorBoundary';

const slugify = (text) => {
  if (!text) return 'section';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const DEFAULT_READ_TIME = 5;

const BlogDetail = ({ blog, relatedBlogs, searchQuery = '' }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [showProgress, setShowProgress] = useState(false);
  const [tocItems, setTocItems] = useState([]);

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

  useEffect(() => {
    if (!blog?.content) {
      setTocItems([]);
      return;
    }

    const generateTOC = () => {
      const headings = [];
      const parser = new DOMParser();
      const doc = parser.parseFromString(blog.content, 'text/html');
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
    };

    const items = generateTOC();
    setTocItems(items);

    // Inject data-section attributes into the rendered content
    const injectDataSection = () => {
      const contentDiv = document.querySelector('.blog-content, .prose');
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
    };

    // Small delay to ensure content is rendered
    const timer = setTimeout(injectDataSection, 100);
    return () => clearTimeout(timer);
  }, [blog?.content]);

  if (!blog) {
    return (
      <div className="min-h-screen warm-cream flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold elegant-navy mb-4">Story Not Found</h1>
          <p className="text-slate-600 mb-8">The adventure story you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const readTimeText = blog.readTime ? `${blog.readTime} min read` : `${DEFAULT_READ_TIME} min read`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: blog.image,
    author: { '@type': 'Person', name: blog.author },
    publisher: {
      '@type': 'Organization',
      name: 'SASA Travel',
      logo: { '@type': 'ImageObject', url: `${window.location.origin}/sasa_logo.png` },
    },
    datePublished: blog.date,
    dateModified: blog.date,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${window.location.origin}/blogs/${blog.id}` },
    articleSection: blog.category,
    keywords: blog.tags?.join(', '),
    wordCount: blog.readTime ? blog.readTime * 200 : DEFAULT_READ_TIME * 200,
  };

  const showSidebar = tocItems.length > 0;

  return (
    <>
      <Helmet>
        <title>{blog.title} | Premium Travel Stories | SASA Travel</title>
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.tags?.join(', ')} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={blog.image} />
        <meta name="author" content={blog.author} />
        <link rel="canonical" href={`${window.location.origin}/blogs/${blog.id}`} />
      </Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      {showProgress && <ReadingProgress progress={readingProgress} />}
      <ErrorBoundary>
        <article className="min-h-screen warm-cream">
          <BlogHeader blog={blog} />
          <div className="container mx-auto px-6 pb-16 pt-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar - Table of Contents */}
                {showSidebar && (
                  <aside className="lg:w-64 flex-shrink-0">
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
                
                {/* Main Content */}
                <main className={showSidebar ? 'lg:flex-1' : 'w-full'}>
                  <header className="mb-8">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <span className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 rounded-full text-sm font-semibold capitalize border border-cyan-200">{blog.category}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{blog.author?.charAt(0)?.toUpperCase()}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-slate-700">{blog.author}</span>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{readTimeText}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">{blog.title}</h1>
                    <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-4xl">{blog.excerpt}</p>
                  </header>
                  <div className="prose prose-lg max-w-none mb-12">
                    <BlogContent content={blog.content} searchQuery={searchQuery} />
                  </div>
                  <BlogMeta author={blog.author} tags={blog.tags} date={blog.date} />
                  <BlogAuthorBio author={blog.author} />
                  <BlogCTA />
                  <RelatedBlogs blogs={relatedBlogs} searchQuery={searchQuery} />
                </main>
              </div>
            </div>
          </div>
        </article>
      </ErrorBoundary>
    </>
  );
};

export default BlogDetail;

