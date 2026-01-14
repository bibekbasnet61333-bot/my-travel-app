import React from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import BlogDetail from '../../components/blogs/BlogDetail';
import useBlogDetail from '../../hooks/blogs/useBlogDetail';
import ErrorBoundary from '../../components/ui/ErrorBoundary';

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const { blog, relatedBlogs, loading, error } = useBlogDetail(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => navigate('/blogs')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-8">The blog you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blogs')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary fallbackMessage="Unable to load this blog post. Please try again or return to the blogs page.">
      <BlogDetail blog={blog} relatedBlogs={relatedBlogs} searchQuery={searchQuery} />
    </ErrorBoundary>
  );
}
