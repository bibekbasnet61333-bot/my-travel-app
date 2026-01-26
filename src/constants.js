// Application Constants

// Search Fields - Centralized for DRY principle
export const SEARCH_FIELDS = {
  BLOG: ['title', 'excerpt', 'tags'],
  GALLERY: ['name', 'description', 'country'],
  PACKAGE: ['name', 'shortDescription', 'longDescription', 'category'],
  DESTINATION: ['name', 'description', 'country'],
};

// LocalStorage Keys
export const STORAGE_KEYS = {
  CONTACT_SUBMISSIONS: 'contactSubmissions',
};

// Timing Constants (in milliseconds)
export const TIMINGS = {
  FORM_SUBMIT_DELAY: 1500,
  SUCCESS_MESSAGE_DURATION: 5000,
  DROPDOWN_HOVER_DELAY: 200,
};

// Form Validation Constants
export const FORM_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 2000,
  PHONE_MIN_LENGTH: 7,
  PHONE_MAX_LENGTH: 15,
};

// Contact Form Destinations
export const DESTINATIONS = [
  { value: '', label: 'Select Destination' },
  { value: 'nepal', label: 'Nepal' },
  { value: 'bhutan', label: 'Bhutan' },
  { value: 'tibet', label: 'Tibet' },
  { value: 'india', label: 'India' },
  { value: 'thailand', label: 'Thailand' },
  { value: 'maldives', label: 'Maldives' },
  { value: 'dubai', label: 'Dubai' },
  { value: 'singapore', label: 'Singapore' },
  { value: 'europe', label: 'Europe Tour' },
  { value: 'other', label: 'Other' },
];

// Pagination
export const ITEMS_PER_PAGE = 20;

// Contact Phone Numbers - Centralized for maintainability
// Note: In production, these values should come from environment variables
// Use import.meta.env for Vite environment variables
const getWhatsAppNumber = () => {
  const envPhone = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER;
  if (!envPhone && process.env.NODE_ENV === 'production') {
    throw new Error('VITE_WHATSAPP_PHONE_NUMBER is required in production');
  }
  return envPhone || '+977 9817653406';
};

export const CONTACT_PHONES = {
  WHATSAPP: getWhatsAppNumber(),
  PRIMARY: '+977 9813641003',
  WHATSAPP_LINK: `https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE_NUMBER || '9779817653406'.replace(/\D/g, '')}`,
};

// Social Media Links - Centralized for maintainability
// Note: In production, these values should come from environment variables
// Use import.meta.env for Vite environment variables
export const SOCIAL_LINKS = {
  FACEBOOK: import.meta.env.VITE_SOCIAL_FACEBOOK || 'https://facebook.com/sasatravel',
  INSTAGRAM: import.meta.env.VITE_SOCIAL_INSTAGRAM || 'https://instagram.com/sasatravel',
  TWITTER: import.meta.env.VITE_SOCIAL_TWITTER || 'https://twitter.com/sasatravel',
  TIKTOK: import.meta.env.VITE_SOCIAL_TIKTOK || 'https://tiktok.com/@sasatravel',
  YOUTUBE: import.meta.env.VITE_SOCIAL_YOUTUBE || 'https://youtube.com/@sasatravel',
  FACEBOOK_STORIES: import.meta.env.VITE_SOCIAL_FACEBOOK_STORIES || 'https://facebook.com/stories/sasatravel',
};

// Navigation Links - External
export const EXTERNAL_LINKS = {
  GALLERY: '/gallery',
};

// Contact Emails - Centralized for maintainability
export const CONTACT_EMAILS = {
  INFO: 'info@sasatravel.com',
  SUPPORT: 'support@sasatravel.com',
};

// Contact Form Constants - Destination Page
export const DESTINATION_CONTACT_FORM = {
  // WhatsApp configuration - use centralized constants
  WHATSAPP_LINK: CONTACT_PHONES.WHATSAPP_LINK,
  WHATSAPP_NUMBER: CONTACT_PHONES.WHATSAPP.replace(/\D/g, ''),

  // Submit button states
  SUBMIT_STATES: {
    IDLE: 'Send Enquiry',
    SUBMITTING: 'Sending enquiry...',
    SUCCESS: 'Sent successfully!',
  },

  // Validation messages
  VALIDATION: {
    NAME_REQUIRED: 'Name is required',
    NAME_MIN_LENGTH: 'Name must be at least 2 characters',
    PHONE_REQUIRED: 'Phone number is required',
    PHONE_INVALID: 'Please enter a valid phone number',
    MESSAGE_REQUIRED: 'Message is required',
    MESSAGE_MIN_LENGTH: 'Message must be at least 10 characters',
    DATE_REQUIRED: 'Travel date is required',
    TRAVELERS_INVALID: 'Please enter a valid number of travelers (minimum 1)',
  },

  // Success messages
  SUCCESS_MESSAGES: {
    TITLE: 'Thank You!',
    MESSAGE: 'Your enquiry has been submitted successfully. We will contact you soon.',
  },

  // Form placeholders
  PLACEHOLDERS: {
    NAME: 'Your Name *',
    PHONE: 'Phone Number *',
    TRAVELERS: 'No. of Travelers',
    MESSAGE: 'Tell us about your travel plans... *',
  },
};

// Button gradients - using CSS custom properties for consistency
export const GRADIENTS = {
  PRIMARY: 'linear-gradient(to right, #f97316, #ef4444)',
  SECONDARY: 'linear-gradient(to right, #ef4444, #dc2626)',
};

// Form theme defaults
export const FORM_THEME = {
  DEFAULT: {
    headingColor: '#c2410c',
    borderColor: '#fed7aa',
    inputBorderColor: '#fed7aa',
    cardBorder: 'border-orange-100',
    formBgGradient: '#fff7ed, #ffedd5, #fed7aa',
  },
};
