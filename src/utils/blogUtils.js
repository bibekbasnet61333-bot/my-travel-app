/**
 * Utility function to extract table of contents items from blog content
 * @param {string} content - HTML content string
 * @param {number} maxItems - Maximum number of items to return (default: 6)
 * @returns {Array} Array of heading objects with id, text, and level
 */
export const extractHeadings = (content, maxItems = 6) => {
  if (!content) return [];

  const headings = [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, 'text/html');
  const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');

  let count = 0;
  headingElements.forEach((heading, index) => {
    if (count >= maxItems) return;

    const level = parseInt(heading.tagName.charAt(1));
    const text = heading.textContent?.trim() || '';

    // Skip if text is completely empty
    if (!text) return;

    // Create slugified id - strip emojis and special characters for clean IDs
    const slugify = (text) => {
      // Remove emoji characters and other non-Latin characters for ID generation
      const cleanText = text
        .replace(/[^\w\s\u0600-\u06FF\u4e00-\u9fa5]/g, '') // Keep alphanumeric, Arabic, Chinese
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim();

      if (cleanText.length === 0) {
        // Fallback: generate ID from heading level and index
        return `section-${level}-${count}`;
      }

      return cleanText.toLowerCase();
    };

    const id = heading.getAttribute('id') || slugify(text);

    // Only include h2 and h3 for cleaner TOC (skip h1 as it's the title)
    if (level <= 3) {
      headings.push({ id, text, level });
      count++;
    }
  });

  return headings;
};

/**
 * Calculate estimated reading progress based on scroll position
 * @param {number} scrollTop - Current scroll position
 * @param {number} docHeight - Document height
 * @param {number} winHeight - Window height
 * @returns {number} Progress percentage (0-100)
 */
export const calculateReadingProgress = (scrollTop, docHeight, winHeight) => {
  if (!docHeight || docHeight === 0) return 0;
  const progress = Math.round((scrollTop / (docHeight - winHeight)) * 100);
  return Math.min(100, Math.max(0, progress));
};

/**
 * Format section count for display
 * @param {number} count - Number of sections
 * @returns {string} Formatted string
 */
export const formatSectionCount = (count) => {
  if (count === 0) return 'No sections';
  if (count === 1) return '1 section';
  return `${count} sections`;
};

