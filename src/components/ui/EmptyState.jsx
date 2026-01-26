import React, { memo } from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({
  Icon,
  title,
  description,
  action,
  className = ''
}) => {
  return (
    <div className={`text-center py-16 ${className}`} role="status" aria-live="polite">
      <div className="bg-gray-100 rounded-2xl p-12 max-w-md mx-auto">
        {Icon && (
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
              <Icon className="w-8 h-8 text-gray-400" />
            </div>
          </div>
        )}
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 mb-6">
          {description}
        </p>
        {action && (
          <div className="flex justify-center">
            {action}
          </div>
        )}
      </div>
    </div>
  );
};

EmptyState.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.node,
  className: PropTypes.string
};

export default memo(EmptyState);

