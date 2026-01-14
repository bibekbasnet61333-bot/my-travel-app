import { useState, useCallback } from 'react';
import { TIMINGS } from '../constants';
import { validateField, useFormValidation } from '../utils/inputValidation';
import { isFutureDate } from '../utils/dateUtils';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  destination: '',
  travelDate: '',
  message: '',
};

const contactFormFields = ['name', 'email', 'phone', 'destination', 'travelDate', 'message'];

// Custom validation for contact form fields
const validateContactField = (fieldName, value) => {
  if (fieldName === 'travelDate') {
    if (!value) return 'Travel date is required';
    if (!isFutureDate(value)) return 'Please select a future date';
    return '';
  }
  return validateField(fieldName, value);
};

export default function useContactForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  const {
    errors,
    validateForm: validateAll,
    setFieldError,
    clearError,
    reset: resetValidation,
  } = useFormValidation(initialFormState, {
    fields: contactFormFields,
    validate: validateContactField,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearError(name);
    setError(null);
  }, [clearError]);

  // Handle form submission - calls server API to get WhatsApp URL
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateAll(formData)) {
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call server API to generate WhatsApp URL (phone number stays on server)
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if response is OK before parsing JSON to avoid "Unexpected end of JSON input"
      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, use status text or fallback
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Open WhatsApp with the URL from server
      if (data.url) {
        window.open(data.url, '_blank');
      }

      setSubmitSuccess(true);

      setTimeout(() => {
        setFormData(initialFormState);
        resetValidation();
        setSubmitSuccess(false);
      }, TIMINGS.SUCCESS_MESSAGE_DURATION);
    } catch (err) {
      setError('Failed to send message. Please try again or contact us directly.');
      setFieldError('submit', err.message);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateAll, setFieldError, resetValidation]);

  return {
    formData,
    errors,
    isSubmitting,
    submitSuccess,
    error,
    handleChange,
    handleSubmit,
  };
}

