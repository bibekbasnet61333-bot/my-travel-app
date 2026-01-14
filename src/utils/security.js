
export {
  isValidEmail,
  isValidPhone,
  isValidName,
  isValidMessageLength,
  trimValue,
  isNotEmpty,
  validateField,
  validateForm,
  useFormValidation,
} from './inputValidation';

// Re-export shared security utilities for frontend use
export {
  sanitizeInput,
  generateFormId,
  isValidPhoneNumber,
  isValidEmailAddress,
  validateMessageContent,
} from '../../shared/security.js';

