import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlogHero from '../../components/blogs/features/BlogHero';
import BlogGrid from '../../components/blogs/ui/BlogGrid';
import Pagination from '../../components/ui/Pagination';
import ErrorBoundary from '../../components/ui/ErrorBoundary';
import useBlogs from '../../hooks/blogs/useBlogs';
import { formatDateShort } from '../../utils/dateUtils';
import { useSearch } from '../../utils/searchUtils';
import { SEARCH_FIELDS } from '../../constants';

// Number of blogs per page
const ITEMS_PER_PAGE = 6;

export default function Blogs() {
  const navigate = useNavigate();
  const [heroCategory, setHeroCategory] = useState('nepal');
  const [currentPage, setCurrentPage] = useState(1);
  const { blogs, loading } = useBlogs();

  const categoryFilteredBlogs = useMemo(() => {
    if (heroCategory === 'all') return blogs;
    return blogs.filter(blog => blog.category === heroCategory);
  }, [blogs, heroCategory]);

  const { query, setQuery, filteredItems: filteredBlogs, filteredCount } = useSearch(categoryFilteredBlogs, SEARCH_FIELDS.BLOG);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleHeroCategoryChange = (category) => {
    setHeroCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const handleClearSearch = () => {
    setQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of blog section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const featuredBlogs = useMemo(() => {
    return blogs.filter(blog => blog.featured);
  }, [blogs]);

  const handleBlogClick = (blog) => {
    navigate(`/blogs/${blog.id}`);
  };

  const handleFeaturedBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <Helmet>
        <title>Travel Blogs - Nepal & International Adventures | SASA Travel</title>
        <meta name="description" content="Discover amazing travel stories from Nepal and around the world." />
        <link rel="canonical" href={`${window.location.origin}/blogs`} />
      </Helmet>

      <BlogHero category={heroCategory} onCategoryChange={handleHeroCategoryChange} />

      <section className="py-20 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots-amber opacity-30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-800">Featured Stories</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Discover unique travel experiences and insider tips from our expert travel writers
            </p>
          </div>

          {featuredBlogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredBlogs.map((blog, index) => (
                <div key={blog.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-amber-100/50 overflow-hidden cursor-pointer group" style={{ animationDelay: `${index * 200}ms` }} onClick={() => handleFeaturedBlogClick(blog.id)}>
                  <div className="aspect-video overflow-hidden relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-cyan-600 group-hover:text-amber-500 transition-colors duration-300" />
                        <span className="text-sm font-semibold text-cyan-600 uppercase group-hover:text-amber-600 transition-colors duration-300">
                          {blog.category === 'nepal' ? 'NEPAL' : 'INTERNATIONAL'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-slate-500 group-hover:text-slate-700 transition-colors duration-300">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDateShort(blog.date)}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3 line-clamp-2 group-hover:text-cyan-700 transition-colors duration-300">{blog.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4 group-hover:text-slate-700 transition-colors duration-300">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors duration-300">By {blog.author}</span>
                      <div className="flex items-center gap-2 text-cyan-600 group-hover:text-amber-600 transition-colors duration-300">
                        <span className="text-sm font-medium">Read More</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold text-slate-800 mb-8">Explore All Stories</h3>
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Search for blogs by destination, activity, or theme..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-8 py-6 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-200 shadow-2xl border-2 border-amber-100 bg-white text-lg text-slate-700 transition-all duration-300 hover:shadow-3xl"
                aria-label="Search blogs"
              />
              {query && (
                <button onClick={() => setQuery('')} className="absolute right-6 top-1/2 transform -translate-y-1/2 transition-colors text-amber-600 hover:text-amber-800" aria-label="Clear search">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {query && (
        <section className="py-8 bg-white border-b border-amber-100 shadow-sm">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <p className="text-slate-600 text-lg">
                Found <span className="font-bold text-amber-700">{filteredCount}</span> amazing stor{filteredCount !== 1 ? 'ies' : 'y'} for "{query}"
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Pagination info */}
      {filteredBlogs.length > 0 && (
        <section className="py-4 bg-slate-50 border-b border-amber-100">
          <div className="container mx-auto px-6">
            <div className="text-center text-sm text-slate-600">
              Showing <span className="font-semibold text-amber-700">{startIndex + 1}</span> to <span className="font-semibold text-amber-700">{Math.min(startIndex + ITEMS_PER_PAGE, filteredBlogs.length)}</span> of <span className="font-semibold text-amber-700">{filteredBlogs.length}</span> stories
            </div>
          </div>
        </section>
      )}

      <ErrorBoundary fallbackMessage="Unable to load blog stories. Please refresh the page.">
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="container mx-auto px-6">
            <BlogGrid
              blogs={paginatedBlogs}
              loading={loading}
              searchQuery={query}
              onBlogClick={handleBlogClick}
              onClearSearch={handleClearSearch}
            />

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 pt-8 border-t border-amber-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  showFirstLast={true}
                  showPrevNext={true}
                  maxVisiblePages={5}
                  className="py-4"
                />
              </div>
            )}
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary fallbackMessage="Unable to load CTA section. Please refresh the page.">
        <section className="py-20 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern-dots-white opacity-50"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Next Adventure?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Let our travel experts craft your perfect journey through Nepal and beyond
            </p>
            <button onClick={() => navigate('/contact')} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-2xl hover:scale-105 text-lg font-semibold">
              Start Planning Today
            </button>
          </div>
        </section>
      </ErrorBoundary>
    </div>
  );
}

