
// ============================================================================
// CONFIGURATION
// ============================================================================

export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_TIMEZONE = 'Asia/Kathmandu';

/**
 * Get date from input (handles Date objects, ISO strings, timestamps)
 * @param {Date|string|number} input - Date input
 * @returns {Date} Date object
 */
export const getDate = (input) => {
  if (input instanceof Date) return input;
  if (typeof input === 'number') return new Date(input);
  return new Date(input);
};

// ============================================================================
// SAFE PARSING
// ============================================================================

/**
 * Safely parse a date string to Date object
 * Handles browser inconsistencies (especially Safari)
 * @param {string|Date|number} input - Date input
 * @returns {Date|null} Date object or null if invalid
 */
export const parseDate = (input) => {
  if (!input) return null;
  if (input instanceof Date) {
    return Number.isNaN(input.getTime()) ? null : input;
  }
  const date = new Date(input);
  return Number.isNaN(date.getTime()) ? null : date;
};

/**
 * Check if date string is valid
 * @param {string|Date|number} input - Date input
 * @returns {boolean} True if valid date
 */
export const isValidDate = (input) => {
  if (!input) return false;
  const date = input instanceof Date ? input : new Date(input);
  return !Number.isNaN(date.getTime());
};

/**
 * Parse ISO string with timezone awareness
 * Prevents off-by-one-day bugs
 * @param {string} isoString - ISO date string
 * @returns {Date|null} Date object or null if invalid
 */
export const parseISOString = (isoString) => {
  if (!isoString) return null;
  // Ensure we have timezone info
  if (!isoString.includes('Z') && !isoString.includes('+') && !isoString.includes('-', 10)) {
    isoString = isoString + 'T00:00:00.000Z';
  }
  const date = new Date(isoString);
  return Number.isNaN(date.getTime()) ? null : date;
};

// ============================================================================
// FORMATTING FUNCTIONS
// ============================================================================

/**
 * Format date to long format (e.g., "January 1, 2024")
 * @param {string|Date|number} input - Date input
 * @param {string} locale - Locale for formatting
 * @returns {string} Formatted date string (empty string for invalid dates)
 */
export const formatDate = (input, locale = DEFAULT_LOCALE) => {
  if (!input) return '';
  const date = getDate(input);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date to short format (e.g., "Jan 1, 2024")
 * @param {string|Date|number} input - Date input
 * @param {string} locale - Locale for formatting
 * @returns {string} Formatted date string (empty string for invalid dates)
 */
export const formatDateShort = (input, locale = DEFAULT_LOCALE) => {
  if (!input) return '';
  const date = getDate(input);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

/**
 * Format date with time (e.g., "January 1, 2024, 10:30 AM")
 * @param {string|Date|number} input - Date input
 * @param {string} locale - Locale for formatting
 * @returns {string} Formatted date and time string (empty string for invalid dates)
 */
export const formatDateTime = (input, locale = DEFAULT_LOCALE) => {
  if (!input) return '';
  const date = getDate(input);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format date for HTML input field (YYYY-MM-DD)
 * @param {string|Date|number} input - Date input
 * @returns {string} Formatted date string (empty string for invalid dates)
 */
export const formatForInput = (input) => {
  if (!input) return '';
  const date = getDate(input);
  if (Number.isNaN(date.getTime())) return '';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// ============================================================================
// RELATIVE TIME (using Intl.RelativeTimeFormat)
// ============================================================================

/**
 * Get relative time string using Intl.RelativeTimeFormat
 * (e.g., "2 hours ago", "in 3 days")
 * @param {string|Date|number} input - Date input
 * @param {string} locale - Locale for formatting
 * @returns {string} Relative time string (empty string for invalid dates)
 */
export const timeAgo = (input, locale = DEFAULT_LOCALE) => {
  if (!input) return '';
  const date = getDate(input);
  if (Number.isNaN(date.getTime())) return '';

  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffSec >= -60 && diffSec < 60) return diffSec <= 0 ? 'just now' : rtf.format(Math.ceil(diffSec / 60), 'minute');
  if (diffMin >= -60 && diffMin < 60) return rtf.format(-diffMin, 'minute');
  if (diffHour >= -24 && diffHour < 24) return rtf.format(-diffHour, 'hour');
  if (diffDay >= -7 && diffDay < 7) return rtf.format(-diffDay, 'day');
  if (diffWeek >= -4 && diffWeek < 4) return rtf.format(-diffWeek, 'week');
  if (diffMonth >= -12 && diffMonth < 12) return rtf.format(-diffMonth, 'month');
  return rtf.format(-diffYear, 'year');
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get current date at midnight in local timezone
 * @returns {Date} Today's date at midnight local time
 */
export const getTodayMidnight = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * Get date string in YYYY-MM-DD format for HTML date input (local timezone)
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getTodayDateString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Check if date string is in the future or today (local timezone aware)
 * @param {string|Date|number} input - Date input
 * @returns {boolean} True if date is in the future or today
 */
export const isFutureDate = (input) => {
  if (!input) return false;
  const date = getDate(input);
  if (Number.isNaN(date.getTime())) return false;
  const today = getTodayMidnight();
  return date >= today;
};

/**
 * Get current year
 * @returns {number} Current year
 */
export const getCurrentYear = () => new Date().getFullYear();

/**
 * Get difference in days between two dates
 * @param {string|Date|number} date1 - First date
 * @param {string|Date|number} date2 - Second date (defaults to now)
 * @returns {number} Difference in days
 */
export const getDaysDiff = (date1, date2 = new Date()) => {
  const d1 = getDate(date1);
  const d2 = getDate(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default {
  DEFAULT_LOCALE,
  DEFAULT_TIMEZONE,
  getDate,
  parseDate,
  isValidDate,
  parseISOString,
  formatDate,
  formatDateShort,
  formatDateTime,
  formatForInput,
  timeAgo,
  getCurrentYear,
  getTodayMidnight,
  isFutureDate,
  getDaysDiff,
};
