import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import GalleryHero from '../../components/gallery/GalleryHero';
import GalleryTabs from '../../components/gallery/GalleryTabs';
import GalleryGrid from '../../components/gallery/GalleryGrid';
import ErrorBoundary from '../../components/ui/ErrorBoundary';
import { getDestinationsByCategory, getThemeByCategory } from '../../data/gallery';
import { useSearch } from '../../utils/searchUtils';
import { SEARCH_FIELDS } from '../../constants';

const GalleryPage = () => {
  const [category, setCategory] = useState('international');
  const destinations = useMemo(() => getDestinationsByCategory(category), [category]);
  const { query, setQuery, filteredItems: filteredDestinations, filteredCount } = useSearch(destinations, SEARCH_FIELDS.GALLERY);
  const theme = useMemo(() => getThemeByCategory(category), [category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-amber-50">
      <Helmet>
        <title>Gallery - Explore Destinations | SASA Travel</title>
        <meta name="description" content="Browse our gallery of stunning destination photos from around the world." />
        <link rel="canonical" href={`${window.location.origin}/gallery`} />
      </Helmet>

      <GalleryHero category={category} isLoading={false} />

      <div className="text-center py-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Gallery - Explore the images below
        </h2>
      </div>

      <section className="py-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <GalleryTabs activeTab={category} onTabChange={setCategory} theme={theme} />

          <div className="max-w-2xl mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search destinations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-amber-400 focus:outline-none transition-colors shadow-sm"
                aria-label="Search destinations"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {query && (
            <p className="text-center text-gray-600 mb-8">
              Found <span className="font-semibold text-amber-600">{filteredCount}</span> destination{filteredCount !== 1 ? 's' : ''} for "{query}"
            </p>
          )}

          <GalleryGrid destinations={filteredDestinations} searchQuery={query} />
        </div>
      </section>

      <ErrorBoundary fallbackMessage="Unable to load gallery section. Please refresh the page.">
        <section className="py-16 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white">
          <div className="container mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for Your Dream Vacation?</h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Let our travel experts help you plan the perfect trip to any of these amazing destinations.
              </p>
              <a href="/contact" className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 hover:shadow-lg hover:scale-105">
                Start Planning Today
              </a>
            </motion.div>
          </div>
        </section>
      </ErrorBoundary>
    </div>
  );
};

export default GalleryPage;

