import DOMPurify from 'dompurify';
import { useMemo } from 'react';

const BlogContent = ({ content, searchQuery = '' }) => {
  // Memoized function to highlight search terms in HTML content
  const processedContent = useMemo(() => {
    if (!content) return '';

    // Sanitize once upfront
    const sanitizedContent = DOMPurify.sanitize(content);

    // If no search query, return sanitized content
    if (!searchQuery || !searchQuery.trim()) {
      return sanitizedContent;
    }

    const terms = searchQuery.toLowerCase().trim().split(/\s+/).filter(term => term.length > 0);
    if (terms.length === 0) return sanitizedContent;

    // Create a regex that matches any of the search terms (case insensitive)
    const escapedTerms = terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escapedTerms.join('|')})`, 'gi');

    // Use string replacement instead of DOM manipulation for better performance
    return sanitizedContent.replace(regex, '<mark class="bg-yellow-200 text-black px-1 rounded">$1</mark>');
  }, [content, searchQuery]);

  return (
    <div
      className="prose prose-lg max-w-none bg-white p-8 rounded-xl border border-slate-200 space-y-8
                 prose-headings:text-black prose-headings:font-bold prose-headings:leading-tight
                 prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12 prose-h1:border-b-2 prose-h1:border-slate-400 prose-h1:pb-4 prose-h1:text-black prose-h1:bg-slate-50 prose-h1:p-6 prose-h1:rounded-lg
                 prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-16 prose-h2:text-black prose-h2:border-l-4 prose-h2:border-cyan-600 prose-h2:pl-6 prose-h2:bg-cyan-50 prose-h2:py-4 prose-h2:rounded-r-lg prose-h2:font-bold prose-h2:shadow-sm
                 prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-12 prose-h3:text-black prose-h3:font-semibold prose-h3:border-b prose-h3:border-slate-300 prose-h3:pb-2
                 prose-p:text-black prose-p:leading-relaxed prose-p:mb-6 prose-p:text-justify prose-p:font-medium prose-p:text-lg
                 prose-p:first-of-type:text-black prose-p:first-of-type:border-l-4 prose-p:first-of-type:border-cyan-500 prose-p:first-of-type:pl-6 prose-p:first-of-type:bg-cyan-50/30 prose-p:first-of-type:py-4 prose-p:first-of-type:rounded-r-lg prose-p:first-of-type:font-semibold prose-p:first-of-type:text-lg prose-p:first-of-type:leading-relaxed prose-p:first-of-type:mb-8
                 prose-ul:space-y-3 prose-ol:space-y-3 prose-ul:my-6 prose-ol:my-6
                 prose-li:text-black prose-li:leading-relaxed prose-li:font-medium prose-li:text-lg
                 prose-strong:text-black prose-strong:font-bold prose-strong:bg-yellow-200 prose-strong:px-1 prose-strong:rounded
                 prose-a:text-cyan-800 prose-a:hover:text-cyan-900 prose-a:font-semibold prose-a:underline-offset-4 prose-a:decoration-cyan-600 prose-a:decoration-2
                 prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-amber-50 prose-blockquote:p-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-amber-900 prose-blockquote:font-medium prose-blockquote:my-8
                 prose-code:bg-slate-800 prose-code:text-slate-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-slate-600
                 prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto prose-pre:border prose-pre:border-slate-700 prose-pre:my-8
                 prose-mark:bg-yellow-200 prose-mark:text-black prose-mark:px-1 prose-mark:rounded prose-mark:font-semibold"
      dangerouslySetInnerHTML={{ __html: processedContent }}
    />
  );
};

export default BlogContent;
