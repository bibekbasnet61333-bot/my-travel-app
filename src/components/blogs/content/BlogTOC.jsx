import React from 'react';

const BlogTOC = ({ items, activeSection, readingProgress, title = "Table of Contents", showProgress = true }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sticky top-28">
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
        <div className="space-y-2">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to Top
          </button>

          <button
            onClick={() => window.print()}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Article
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogTOC;

