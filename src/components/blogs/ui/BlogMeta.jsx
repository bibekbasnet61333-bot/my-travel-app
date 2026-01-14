import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../../../utils/dateUtils';

const BlogMeta = ({ author, tags, date }) => {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium">By {author}</span>
          <span className="mx-2">•</span>
          <time dateTime={date}>
            {formatDate(date)}
          </time>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                {tag}
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

