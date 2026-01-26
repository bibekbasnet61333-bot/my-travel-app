import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/dateUtils';

const BlogMeta = ({ author, tags, date }) => {
  return (
    <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center text-sm md:text-base text-slate-600">
          <span className="font-medium text-slate-800">By {author}</span>
          <span className="mx-2 hidden sm:inline">•</span>
          <time dateTime={date} className="hidden sm:inline">
            {formatDate(date)}
          </time>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full text-xs md:text-sm font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

BlogMeta.propTypes = {
  author: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  date: PropTypes.string.isRequired,
};

export default BlogMeta;

