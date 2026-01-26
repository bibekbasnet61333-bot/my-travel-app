import DOMPurify from 'dompurify';
import { useMemo } from 'react';

const BlogContent = ({ content, searchQuery = '' }) => {
  const processedContent = useMemo(() => {
    if (!content) return '';
    const sanitizedContent = DOMPurify.sanitize(content);

    if (!searchQuery || !searchQuery.trim()) {
      return sanitizedContent;
    }

    const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(term => term.length > 0);
    if (terms.length === 0) return sanitizedContent;

    const escapedTerms = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');

    return sanitizedContent.replace(regex, '<mark class="bg-yellow-200 text-black px-1 rounded">$1</mark>');
  }, [content, searchQuery]);

  return (
    <div
      className="prose prose-slate max-w-none bg-white p-4 sm:p-6 lg:p-8 rounded-xl border border-slate-200 space-y-5
                 prose-headings:text-slate-800 prose-headings:font-bold prose-headings:leading-tight
                 prose-h1:text-xl sm:text-2xl prose-h1:mb-4 prose-h1:mt-6 prose-h1:border-b prose-h1:border-slate-300 prose-h1:pb-3 prose-h1:bg-slate-50 prose-h1:p-4 prose-h1:rounded-lg
                 prose-h2:text-lg sm:text-xl prose-h2:mb-3 prose-h2:mt-8 prose-h2:text-slate-800 prose-h2:border-l-4 prose-h2:border-cyan-600 prose-h2:pl-4 prose-h2:bg-cyan-50 prose-h2:py-3 prose-h2:rounded-r-lg prose-h2:font-bold
                 prose-h3:text-base sm:text-lg prose-h3:mb-2 prose-h3:mt-6 prose-h3:text-slate-800 prose-h3:font-semibold prose-h3:border-b prose-h3:border-slate-200 prose-h3:pb-2
                 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-justify prose-p:text-sm sm:text-base
                 prose-p:first-of-type:text-slate-800 prose-p:first-of-type:border-l-4 prose-p:first-of-type:border-cyan-500 prose-p:first-of-type:pl-4 prose-p:first-of-type:bg-cyan-50/50 prose-p:first-of-type:py-3 prose-p:first-of-type:rounded-r-lg prose-p:first-of-type:font-medium prose-p:first-of-type:text-sm sm:text-base prose-p:first-of-type:leading-relaxed prose-p:first-of-type:mb-5
                 prose-ul:space-y-2 prose-ul:my-4 prose-ul:pl-4
                 prose-ol:space-y-2 prose-ol:my-4 prose-ol:pl-4
                 prose-li:text-slate-700 prose-li:leading-relaxed prose-li:text-sm sm:text-base prose-li:marker:text-cyan-600
                 prose-strong:text-slate-800 prose-strong:font-bold prose-strong:bg-yellow-200 prose-strong:px-1 prose-strong:rounded
                 prose-a:text-cyan-700 prose-a:hover:text-cyan-900 prose-a:font-semibold prose-a:underline-offset-4 prose-a:decoration-cyan-600 prose-a:decoration-2
                 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-amber-900 prose-blockquote:font-medium prose-blockquote:my-6
                 prose-code:bg-slate-800 prose-code:text-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:text-sm prose-code:font-mono
                 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:text-xs sm:text-sm prose-pre:border prose-pre:border-slate-700 prose-pre:my-6
                 prose-mark:bg-yellow-200 prose-mark:text-black prose-mark:px-1 prose-mark:rounded prose-mark:font-semibold"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default BlogContent;

