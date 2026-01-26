import { memo, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePackages } from '../components/packages/hooks';
import { CONTACT_PHONES, CONTACT_EMAILS } from '../constants';
import { colors } from '../constants/colors';
import ErrorBoundary from '../components/ui/ErrorBoundary';

// Inner component wrapped in ErrorBoundary
function PackageDetailContent() {
  const { id } = useParams();
  const { packages, loading, error } = usePackages();
  const [activeTab, setActiveTab] = useState('overview');
  const [imageError, setImageError] = useState(false);

  const pkg = useMemo(() => {
    if (!packages.length) return null;
    return packages.find(p => p.id === id);
  }, [packages, id]);

  // Handle loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary[600] }}></div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white border border-red-200 rounded-xl p-8 max-w-md mx-auto text-center shadow-sm">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Unable to Load Package</h2>
          <p className="text-slate-600 mb-4">{error.message || 'An error occurred while loading the package details.'}</p>
          <Link
            to="/packages"
            className="inline-block px-6 py-2.5 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.error[500], color: 'white' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.error[600]}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.error[500]}
          >
            Back to Packages
          </Link>
        </div>
      </div>
    );
  }

  // Handle package not found
  if (!pkg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="bg-white border border-yellow-200 rounded-xl p-8 max-w-md mx-auto text-center shadow-sm">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-.966-5.5-2.5M12 7v.01" />
          </svg>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">Package Not Found</h2>
          <p className="text-slate-600 mb-4">The package you're looking for doesn't exist or may have been removed.</p>
          <Link
            to="/packages"
            className="inline-block px-6 py-2.5 rounded-lg font-medium transition-colors"
            style={{ backgroundColor: colors.warning[500], color: 'white' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.warning[600]}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.warning[500]}
          >
            Browse All Packages
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', content: pkg.longDescription },
    { id: 'itinerary', label: 'Itinerary', content: pkg.itinerary },
    { id: 'inclusions', label: 'Inclusions', content: pkg.inclusions },
    { id: 'accommodation', label: 'Accommodation', content: pkg.accommodation },
    { id: 'testimonials', label: 'Reviews', content: pkg.testimonials },
  ].filter(tab => {
    if (tab.id === 'itinerary' && (!pkg.itinerary || pkg.itinerary.length === 0)) return false;
    if (tab.id === 'inclusions' && (!pkg.inclusions || pkg.inclusions.length === 0)) return false;
    if (tab.id === 'accommodation' && (!pkg.accommodation || !pkg.accommodation.highlights || pkg.accommodation.highlights.length === 0)) return false;
    if (tab.id === 'testimonials' && (!pkg.testimonials || pkg.testimonials.length === 0)) return false;
    return true;
  });

  return (
    <>
      <Helmet>
        <title>{pkg.name} | Sasa Travel</title>
        <meta name="description" content={pkg.shortDescription} />
        <meta property="og:title" content={`${pkg.name} | Sasa Travel`} />
        <meta property="og:description" content={pkg.shortDescription} />
        <meta property="og:image" content={pkg.heroImage} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`https://sasatravel.com/packages/${pkg.id}`} />
        <link rel="alternate" href={`android-app://com.sasatravel/https/sasatravel.com/packages/${pkg.id}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${pkg.name} | Sasa Travel`} />
        <meta name="twitter:description" content={pkg.shortDescription} />
        <meta name="twitter:image" content={pkg.heroImage} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <section className="relative h-[500px] overflow-hidden">
          {imageError ? (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <svg className="w-24 h-24 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${pkg.heroImage})` }}
              role="img"
              aria-label={`Hero image for ${pkg.name}`}
              onError={() => setImageError(true)}
            />
          )}
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-4xl">
                <div className="mb-4">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                    {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)} Experience
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {pkg.name}
                </h1>
                <p className="text-xl text-gray-200 mb-6 max-w-2xl">
                  {pkg.shortDescription}
                </p>
        <div className="flex flex-wrap gap-6 text-white">
                  <div>
                    <div className="text-sm opacity-75">Duration</div>
                    <div className="font-semibold">{pkg.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Group Size</div>
                    <div className="font-semibold">{pkg.groupSize}</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-75">Difficulty</div>
                    <div className="font-semibold">{pkg.difficulty}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Package details tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        role="tab"
                        aria-selected={activeTab === tab.id}
                        aria-controls={`${tab.id}-panel`}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                          activeTab === tab.id
                            ? 'bg-indigo-600 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="min-h-[400px]">
                    {activeTab === 'overview' && (
                      <div id="overview-panel" role="tabpanel" aria-labelledby="overview-tab" className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed">{pkg.longDescription}</p>

                        <div className="mt-8">
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Experience Highlights</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pkg.highlights && pkg.highlights.map((highlight, index) => (
                              <div key={index} className="flex items-start">
                                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-700">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'itinerary' && (
                      <div id="itinerary-panel" role="tabpanel" aria-labelledby="itinerary-tab" className="space-y-6">
                        {pkg.itinerary && pkg.itinerary.map((day, index) => (
                          <div key={index} className="border-l-4 border-indigo-500 pl-6 pb-6">
                            <div className="flex items-center mb-2">
                              <div className="bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                                {day.day}
                              </div>
                              <h4 className="text-xl font-bold text-gray-900">{day.title}</h4>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{day.description}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === 'inclusions' && (
                      <div id="inclusions-panel" role="tabpanel" aria-labelledby="inclusions-tab">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">What&apos;s Included</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {pkg.inclusions && pkg.inclusions.map((inclusion, index) => (
                            <div key={index} className="flex items-center">
                              <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-700">{inclusion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'accommodation' && (
                      <div id="accommodation-panel" role="tabpanel" aria-labelledby="accommodation-tab">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">{pkg.accommodation?.type}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {pkg.accommodation?.highlights && pkg.accommodation.highlights.map((highlight, index) => (
                            <div key={index} className="bg-gray-50 rounded-xl p-4">
                              <span className="text-gray-700">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeTab === 'testimonials' && (
                      <div id="testimonials-panel" role="tabpanel" aria-labelledby="testimonials-tab" className="space-y-6">
                        {pkg.testimonials && pkg.testimonials.map((testimonial, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-6">
                            <div className="flex items-center mb-4">
                              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4" aria-hidden="true">
                                <span className="text-indigo-600 font-bold">
                                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                <div className="text-sm text-gray-500">{testimonial.location}</div>
                              </div>
                              <div className="ml-auto flex" aria-label={`Rating: ${testimonial.rating} out of 5 stars`}>
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 italic">"{testimonial.text}"</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Duration</span>
                        <span className="font-semibold">{pkg.duration}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Group Size</span>
                        <span className="font-semibold">{pkg.groupSize}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Difficulty</span>
                        <span className="font-semibold">{pkg.difficulty}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Link
                        to="/contact"
                        className="block w-full bg-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-indigo-700 transition-colors text-center"
                      >
                        Enquire Now
                      </Link>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3">Why Choose Us</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Expert local guides
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          24/7 support
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Flexible booking
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 text-center">
                      <p className="text-sm text-gray-600 mb-2">Need more information?</p>
                      <div className="text-sm">
                        <div className="font-semibold text-gray-900">Call us: {CONTACT_PHONES.PRIMARY}</div>
                        <div className="text-gray-500">Email: {CONTACT_EMAILS.INFO}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {(() => {
                const sameCategoryPackages = packages.filter(p => p.id !== pkg.id && p.category === pkg.category);

                if (sameCategoryPackages.length >= 3) {
                  return sameCategoryPackages.slice(0, 3);
                }

                const otherPackages = packages.filter(p => p.id !== pkg.id && p.category !== pkg.category);
                const combinedPackages = [...sameCategoryPackages, ...otherPackages].slice(0, 3);

                return combinedPackages;
              })()
                .map((relatedPkg) => (
                  <Link
                    key={relatedPkg.id}
                    to={`/packages/${relatedPkg.id}`}
                    className="group block bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={relatedPkg.image}
                        alt={`View details for ${relatedPkg.name}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {relatedPkg.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {relatedPkg.shortDescription}
                      </p>
                      <div className="flex justify-center items-center">
                        <span className="text-sm text-gray-500">{relatedPkg.duration?.split(' / ')[0]}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

// Wrapped export with ErrorBoundary for production safety
function PackageDetail() {
  return (
    <ErrorBoundary
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="bg-white border border-red-200 rounded-xl p-8 max-w-md mx-auto text-center shadow-sm">
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: colors.error[500] }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h2>
            <p className="text-slate-600 mb-4">An unexpected error occurred. Please try again.</p>
            <Link
              to="/packages"
              className="inline-block px-6 py-2.5 rounded-lg font-medium transition-colors"
              style={{ backgroundColor: colors.error[500], color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.error[600]}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.error[500]}
            >
              Back to Packages
            </Link>
          </div>
        </div>
      }
    >
      <PackageDetailContent />
    </ErrorBoundary>
  );
}

export default memo(PackageDetail);

