
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCTA = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 md:p-12 mb-12 text-center text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400 rounded-full -translate-x-16 -translate-y-16"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full translate-x-12 -translate-y-12"></div>
        <div className="absolute bottom-0 left-1/4 w-20 h-20 bg-cyan-300 rounded-full translate-y-10"></div>
        <div className="absolute bottom-0 right-1/3 w-16 h-16 bg-blue-300 rounded-full translate-y-8"></div>
      </div>

      <div className="relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Create Your Own
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
            Travel Story?
          </span>
        </h3>

        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Let us help you plan the perfect adventure. From dream destinations to unforgettable experiences,
          we're here to make your travel dreams a reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:shadow-xl hover:scale-105 font-semibold text-lg flex items-center gap-3"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Start Planning Today
          </button>

          <button
            onClick={() => navigate('/destinations')}
            className="px-8 py-4 border-2 border-white/30 text-white rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105 font-semibold text-lg"
          >
            Explore Destinations
          </button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Expert Guidance</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Custom Itineraries</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCTA;
