import { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

const FormSelect = forwardRef(function FormSelect({ label, error, id, options, required, ...props }, ref) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        ref={ref}
        id={id}
        required={required}
        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.value === ''}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
});

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
};

export default memo(FormSelect);
