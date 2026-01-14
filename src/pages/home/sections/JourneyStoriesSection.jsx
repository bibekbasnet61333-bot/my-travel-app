
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import AnimatedText from '../../../components/animations/AnimatedText';
import FloatingElement from '../../../components/animations/FloatingElement';
import { blogs } from '../../../data/blogs/blogsData';

// Get featured blog (Bali) and related blogs (Japan, Everest, Annapurna)
const featuredBlog = blogs.find(b => b.id === 'bali-cultural-journey');
const relatedBlogs = blogs.filter(b => 
  ['japan-traditional-modern', 'everest-base-camp-trek', 'annapurna-base-camp-trek'].includes(b.id)
);

const JourneyStoriesSection = memo(() => {
  if (!featuredBlog) return null;

  return (
    <section id="journey-stories" className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900/30 to-black/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <AnimatedText
            text="Journey Stories"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 text-white drop-shadow-lg block"
            type="slideUp"
            delay={200}
          />
          <p className="text-gray-200 max-w-xl sm:max-w-2xl mx-auto text-base sm:text-lg font-medium px-2 drop-shadow-md">
            Real stories from travelers who have experienced the world with SASA Travel
          </p>
        </div>

        {/* Featured Blog - Large Banner */}
        <FloatingElement
          intensity={0.2}
          speed={0.12}
          direction="y"
          range={15}
          delay={100}
        >
          <article className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] rounded-xl sm:rounded-2xl overflow-hidden mb-6 sm:mb-8 group">
            {/* Image */}
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col justify-end">
              {/* Tags */}
              <div className="absolute top-3 xs:top-4 left-3 xs:left-4 sm:top-6 sm:left-6 flex flex-wrap gap-1.5 xs:gap-2">
                <span className="px-2 xs:px-2.5 py-0.5 xs:py-1 bg-[#4F46E5] rounded-full text-[10px] xs:text-xs font-medium text-white">
                  Featured
                </span>
                <span className="px-2 xs:px-2.5 py-0.5 xs:py-1 bg-[#4F46E5] rounded-full text-[10px] xs:text-xs font-medium text-white">
                  {featuredBlog.category}
                </span>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-1.5 xs:gap-2 text-[10px] xs:text-xs sm:text-sm text-gray-200 mb-1.5 xs:mb-2 flex-wrap">
                <span>{featuredBlog.date}</span>
                <span className="w-0.5 h-0.5 xs:w-1 xs:h-1 bg-gray-400 rounded-full" />
                <span>{featuredBlog.readTime} min</span>
                <span className="w-0.5 h-0.5 xs:w-1 xs:h-1 bg-gray-400 rounded-full hidden xs:inline" />
                <span className="hidden xs:inline">{featuredBlog.author}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-1.5 xs:mb-2 sm:mb-4 max-w-full sm:max-w-4xl line-clamp-2">
                {featuredBlog.title}
              </h2>

              {/* Excerpt */}
              <p className="text-gray-200 text-[10px] xs:text-xs sm:text-sm md:text-base mb-2 xs:mb-3 sm:mb-6 max-w-full sm:max-w-3xl line-clamp-1 xs:line-clamp-2 sm:line-clamp-3 hidden xs:block">
                {featuredBlog.excerpt}
              </p>

              {/* Read More Button */}
              <Link
                to={`/blogs/${featuredBlog.id}`}
                className="inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-[10px] xs:text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-fit"
              >
                Read More
                <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </article>
        </FloatingElement>

        {/* Related Blogs - 3 Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6">
          {relatedBlogs.map((blog, index) => (
            <FloatingElement
              key={blog.id}
              intensity={0.1}
              speed={0.08}
              direction="y"
              range={8}
              delay={300 + index * 100}
            >
              <Link
                to={`/blogs/${blog.id}`}
                className="group relative overflow-hidden rounded-lg xs:rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 block h-full"
              >
                {/* Image Container */}
                <div className="relative h-36 xs:h-40 sm:h-48 md:h-52 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-2 xs:top-3 left-2 xs:left-3 px-2 xs:px-2.5 py-0.5 xs:py-1 bg-[#4F46E5] rounded-full text-[9px] xs:text-xs font-medium text-white">
                    {blog.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-3 xs:p-4 sm:p-5 bg-white">
                  <h3 className="text-xs xs:text-sm sm:text-base font-bold text-[#000000] mb-1 xs:mb-2 group-hover:text-[#4F46E5] transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-[9px] xs:text-xs sm:text-sm text-gray-600 font-medium">
                    <span>{blog.date}</span>
                    <span className="w-0.5 h-0.5 xs:w-1 xs:h-1 bg-gray-400 rounded-full" />
                    <span>{blog.readTime} min</span>
                  </div>
                </div>
              </Link>
            </FloatingElement>
          ))}
        </div>

        {/* View All Stories Button */}
        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Stories
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
});

JourneyStoriesSection.displayName = 'JourneyStoriesSection';

export default JourneyStoriesSection;

