import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = ''
}) => {
  if (totalPages <= 1) {
    return null;
  }

  // Calculate visible page range
  const getPageNumbers = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={`flex items-center justify-center gap-2 ${className}`}
      aria-label="Pagination"
    >
      {/* First Page Button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-sm font-medium transition-colors
                     text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed
                     hidden sm:inline-flex items-center"
          aria-label="Go to first page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Previous Page Button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg text-sm font-medium transition-colors
                     text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-1"
          aria-label="Go to previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden sm:inline">Prev</span>
        </button>
      )}

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {/* Left ellipsis */}
        {pageNumbers[0] > 1 && (
          <span className="px-3 py-2 text-slate-400" aria-hidden="true">
            ...
          </span>
        )}

        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all duration-200
                       ${
                         page === currentPage
                           ? 'bg-amber-500 text-white shadow-md transform scale-105'
                           : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                       }`}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}

        {/* Right ellipsis */}
        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <span className="px-3 py-2 text-slate-400" aria-hidden="true">
            ...
          </span>
        )}
      </div>

      {/* Next Page Button */}
      {showPrevNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-sm font-medium transition-colors
                     text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center gap-1"
          aria-label="Go to next page"
        >
          <span className="hidden sm:inline">Next</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Last Page Button */}
      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg text-sm font-medium transition-colors
                     text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed
                     hidden sm:inline-flex items-center"
          aria-label="Go to last page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7m-8-14l7 7-7 7" />
          </svg>
        </button>
      )}
    </nav>
  );
};

export default Pagination;

