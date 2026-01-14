import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

const FormTextarea = forwardRef(function FormTextarea({ label, error, id, rows = 4, ...props }, ref) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white resize-vertical ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

FormTextarea.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default memo(FormTextarea);
