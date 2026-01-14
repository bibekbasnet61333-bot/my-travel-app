/**
 * Input Validation Utilities - UX Validation Only
 *
 * Frontend validation is for user experience (immediate feedback).
 * Real security/sanitization happens on the backend.
 *
 * These functions validate input format and length for UX purposes.
 * They do NOT provide XSS protection - that requires proper output encoding
 * and server-side sanitization.
 */

import { useState, useCallback, useMemo } from 'react';
import { FORM_VALIDATION } from '../constants';

// =============================================================================
// Sanitization Functions - XSS Prevention
// =============================================================================

/**
 * Sanitize string to remove potentially dangerous HTML/script content
 * @param {string} input - String to sanitize
 * @returns {string} - Sanitized string
 */
export const sanitizeString = (input) => {
  if (typeof input !== 'string') return '';

  return input
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove script tags and their content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove event handlers (onclick, onerror, etc.)
    .replace(/\s*on\w+\s*=\s*(['"])[^'"]*\1/gi, '')
    // Remove javascript: URLs
    .replace(/javascript:[^\s]*/gi, '')
    // Remove data: URLs (potential XSS)
    .replace(/data:[^\s]*/gi, '')
    // Remove HTML entities that could be used for XSS
    .replace(/&#[xX]?[0-9a-fA-F]+;/g, '')
    // Trim whitespace
    .trim();
};

/**
 * Sanitize phone number - allow only valid characters
 * @param {string} phone - Phone number to sanitize
 * @returns {string} - Sanitized phone number
 */
export const sanitizePhone = (phone) => {
  if (typeof phone !== 'string') return '';

  // Remove all characters except digits, +, -, (, ), and spaces
  return phone.replace(/[^\d+\-\(\)\s]/g, '').trim();
};

/**
 * Sanitize name - allow only letters, spaces, dots, apostrophes, and hyphens
 * @param {string} name - Name to sanitize
 * @returns {string} - Sanitized name
 */
export const sanitizeName = (name) => {
  if (typeof name !== 'string') return '';

  // Only allow letters, spaces, dots, apostrophes, hyphens
  return name.replace(/[^a-zA-Z\s.'-]/g, '').trim();
};

/**
 * Sanitize message - allow letters, numbers, punctuation, but no HTML
 * @param {string} message - Message to sanitize
 * @returns {string} - Sanitized message
 */
export const sanitizeMessage = (message) => {
  if (typeof message !== 'string') return '';

  return sanitizeString(message);
};

/**
 * Sanitize email - remove potentially dangerous characters
 * @param {string} email - Email to sanitize
 * @returns {string} - Sanitized email
 */
export const sanitizeEmail = (email) => {
  if (typeof email !== 'string') return '';

  // Only allow valid email characters
  return email.replace(/[^\w@.\-]/g, '').trim().toLowerCase();
};

// =============================================================================
// Validation Functions
// =============================================================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

/**
 * Validate phone number format
 * Allows +, digits, spaces, and dashes (7-15 characters)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export const isValidPhone = (phone) => {
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^[+\d\s-]{7,15}$/;
  return phoneRegex.test(phone.trim());
};

/**
 * Validate name format
 * Allows letters, spaces, dots, apostrophes, and hyphens
 * @param {string} name - Name to validate
 * @returns {boolean} - True if valid name format
 */
export const isValidName = (name) => {
  if (typeof name !== 'string') return false;
  const nameRegex = /^[a-zA-Z\s.'-]+$/;
  return nameRegex.test(name.trim());
};

/**
 * Validate message length
 * @param {string} message - Message to validate
 * @param {number} minLength - Minimum allowed length
 * @param {number} maxLength - Maximum allowed length
 * @returns {boolean} - True if message length is within bounds
 */
export const isValidMessageLength = (message, minLength = 10, maxLength = 2000) => {
  if (typeof message !== 'string') return false;
  return message.length >= minLength && message.length <= maxLength;
};

/**
 * Trim whitespace from value
 * @param {string} value - Value to trim
 * @returns {string} - Trimmed value or empty string if not a string
 */
export const trimValue = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

/**
 * Check if value is not empty after trimming
 * @param {string} value - Value to check
 * @returns {boolean} - True if value is not empty
 */
export const isNotEmpty = (value) => {
  if (typeof value !== 'string') return false;
  return value.trim().length > 0;
};

/**
 * Validate a single field and return error message
 * @param {string} fieldName - Name of the field to validate
 * @param {string} value - Value to validate
 * @param {Object} options - Additional validation options
 * @returns {string} - Error message if invalid, empty string if valid
 */
export const validateField = (fieldName, value, options = {}) => {
  const { minLength, maxLength } = options;

  switch (fieldName) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < FORM_VALIDATION.NAME_MIN_LENGTH) {
        return `Name must be at least ${FORM_VALIDATION.NAME_MIN_LENGTH} characters`;
      }
      if (!isValidName(value)) {
        return 'Please enter a valid name (letters only)';
      }
      return '';

    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!isValidEmail(value)) {
        return 'Please enter a valid email address';
      }
      return '';

    case 'phone':
      if (!value.trim()) return 'Phone number is required';
      if (!isValidPhone(value)) {
        return 'Please enter a valid phone number';
      }
      return '';

    case 'message':
      if (!value.trim()) return 'Message is required';
      const minMsg = minLength ?? FORM_VALIDATION.MESSAGE_MIN_LENGTH;
      const maxMsg = maxLength ?? FORM_VALIDATION.MESSAGE_MAX_LENGTH;
      if (!isValidMessageLength(value, minMsg, maxMsg)) {
        return `Message must be between ${minMsg} and ${maxMsg} characters`;
      }
      return '';

    case 'destination':
      if (!value) return 'Please select a destination';
      return '';

    case 'travelDate':
      if (!value) return 'Travel date is required';
      return '';

    case 'travelers':
      if (value && (isNaN(value) || parseInt(value) < 1)) {
        return 'Please enter a valid number of travelers';
      }
      return '';

    case 'date':
      if (!value) return 'Date is required';
      return '';

    default:
      return '';
  }
};

/**
 * Validate entire form and return error object
 * @param {Object} formData - Form data object
 * @param {string[]} fieldNames - Array of field names to validate
 * @returns {Object} - Object with field names as keys and error messages as values
 */
export const validateForm = (formData, fieldNames) => {
  const errors = {};

  fieldNames.forEach((fieldName) => {
    const error = validateField(fieldName, formData[fieldName] || '');
    if (error) {
      errors[fieldName] = error;
    }
  });

  return errors;
};

// =============================================================================
// Custom Hook: useFormValidation
// =============================================================================

/**
 * Custom hook for form validation
 * Provides validation state and functions for form fields
 *
 * @param {Object} initialValues - Initial form values
 * @param {Object} options - Hook options
 * @param {string[]} options.fields - Array of field names to validate
 * @param {Function} options.validate - Custom validation function
 * @returns {Object} - Validation state and helpers
 */
export const useFormValidation = (initialValues = {}, options = {}) => {
  const { fields = [], validate: customValidate } = options;

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /**
   * Validate a single field
   * @param {string} fieldName - Name of the field to validate
   * @param {string} value - Value to validate
   * @returns {string} - Error message or empty string
   */
  const validateFieldValue = useCallback((fieldName, value) => {
    if (customValidate) {
      return customValidate(fieldName, value);
    }
    return validateField(fieldName, value);
  }, [customValidate]);

  /**
   * Validate a field and update errors
   * @param {string} fieldName - Name of the field
   * @param {string} value - Value to validate
   */
  const validateFieldWithError = useCallback((fieldName, value) => {
    const error = validateFieldValue(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
    return error;
  }, [validateFieldValue]);

  /**
   * Validate entire form
   * @param {Object} formData - Form data to validate
   * @returns {boolean} - True if form is valid
   */
  const validateAll = useCallback((formData) => {
    const newErrors = {};

    fields.forEach((fieldName) => {
      const error = validateFieldValue(fieldName, formData[fieldName] || '');
      if (error) {
        newErrors[fieldName] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, validateFieldValue]);

  /**
   * Set error for a specific field
   * @param {string} fieldName - Field name
   * @param {string} message - Error message
   */
  const setFieldError = useCallback((fieldName, message) => {
    setErrors((prev) => ({
      ...prev,
      [fieldName]: message,
    }));
  }, []);

  /**
   * Clear error for a specific field or all errors
   * @param {string|undefined} fieldName - Field name to clear, or undefined for all
   */
  const clearError = useCallback((fieldName) => {
    if (fieldName) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    } else {
      setErrors({});
    }
  }, []);

  /**
   * Mark a field as touched
   * @param {string} fieldName - Field name
   */
  const markTouched = useCallback((fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  }, []);

  /**
   * Handle blur event for a field
   * @param {Object} event - React focus event
   */
  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    markTouched(name);
    validateFieldWithError(name, value);
  }, [markTouched, validateFieldWithError]);

  /**
   * Handle change event for a field
   * @param {Object} event - React change event
   * @param {Function} setValue - Function to update form value
   */
  const handleChange = useCallback((event, setValue) => {
    const { name, value } = event.target;
    if (setValue) {
      setValue((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      clearError(name);
    }
  }, [errors, clearError]);

  /**
   * Reset validation state
   */
  const reset = useCallback(() => {
    setErrors({});
    setTouched({});
  }, []);

  /**
   * Check if form is valid
   */
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  /**
   * Check if a field has been touched
   */
  const isFieldTouched = useCallback((fieldName) => {
    return touched[fieldName] === true;
  }, [touched]);

  /**
   * Check if a field has an error and has been touched
   */
  const isFieldInvalid = useCallback((fieldName) => {
    return touched[fieldName] === true && !!errors[fieldName];
  }, [touched, errors]);

  return {
    errors,
    touched,
    isValid,
    validateField: validateFieldWithError,
    validateForm: validateAll,
    setFieldError,
    clearError,
    markTouched,
    handleBlur,
    handleChange,
    reset,
    isFieldTouched,
    isFieldInvalid,
  };
};

export default {
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidMessageLength,
  trimValue,
  isNotEmpty,
  validateField,
  validateForm,
  useFormValidation,
  sanitizeString,
  sanitizePhone,
  sanitizeName,
  sanitizeMessage,
  sanitizeEmail,
};

