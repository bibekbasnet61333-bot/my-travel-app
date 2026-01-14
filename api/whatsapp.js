// Vercel Serverless Function - Secure WhatsApp Message API
// Phone number stays hidden on server - never exposed to browser

import {
  sanitizeInput,
  isValidPhoneNumber,
  isValidEmailAddress,
  validateMessageContent,
  generateFormId,
  checkRateLimit,
  clearSensitiveData,
} from '../shared/security.js';

// Rate limiting store (NOTE: Resets on cold start in serverless)
// For production, use Redis-based rate limiting with shared state
const rateLimitStore = new Map();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60000;
const WHATSAPP_URL_MAX_LENGTH = 4000;

// Environment-only constants (never exposed to client)
const PHONE_NUMBER = process.env.WHATSAPP_PHONE_NUMBER;

// Fail fast if phone number not configured - prevents data leakage
if (!PHONE_NUMBER) {
  throw new Error('WHATSAPP_PHONE_NUMBER environment variable is required');
}

/**
 * Normalize client IP address
 */
const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || 'unknown';
};

/**
 * Validate travelDate format (YYYY-MM-DD)
 */
const isValidDateFormat = (dateStr) => {
  if (!dateStr || dateStr === 'Not specified') return true;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateStr);
};

/**
 * Sanitize and validate form data
 */
const sanitizeAndValidateData = (data) => {
  const sanitized = {
    name: null,
    email: null,
    phone: null,
    destination: null,
    travelDate: null,
    message: null,
  };

  // Name: required, max 100 chars
  if (!data.name || typeof data.name !== 'string') {
    return { valid: false, error: 'Name is required', sanitized: null };
  }
  sanitized.name = sanitizeInput(data.name.trim()).slice(0, 100);
  if (sanitized.name.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters', sanitized: null };
  }

  // Email: optional, valid format
  if (data.email && typeof data.email === 'string') {
    const email = data.email.trim();
    if (email && isValidEmailAddress(email)) {
      sanitized.email = sanitizeInput(email);
    } else {
      sanitized.email = 'Not provided';
    }
  } else {
    sanitized.email = 'Not provided';
  }

  // Phone: required, valid format
  if (!data.phone || typeof data.phone !== 'string') {
    return { valid: false, error: 'Phone number is required', sanitized: null };
  }
  sanitized.phone = sanitizeInput(data.phone.trim());
  if (!isValidPhoneNumber(sanitized.phone)) {
    return { valid: false, error: 'Invalid phone number format', sanitized: null };
  }

  // Destination: required
  if (!data.destination || typeof data.destination !== 'string') {
    return { valid: false, error: 'Destination is required', sanitized: null };
  }
  sanitized.destination = sanitizeInput(data.destination.trim()).slice(0, 100);

  // TravelDate: optional, must be valid format if provided
  if (data.travelDate && typeof data.travelDate === 'string') {
    const date = data.travelDate.trim();
    if (date && !isValidDateFormat(date)) {
      return { valid: false, error: 'Invalid travel date format (expected YYYY-MM-DD)', sanitized: null };
    }
    sanitized.travelDate = date || 'Not specified';
  } else {
    sanitized.travelDate = 'Not specified';
  }

  // Message: optional, validate content
  if (data.message && typeof data.message === 'string') {
    const msgValidation = validateMessageContent(data.message);
    if (!msgValidation.valid) {
      return { valid: false, error: msgValidation.reason, sanitized: null };
    }
    sanitized.message = sanitizeInput(data.message.trim()).slice(0, 2000);
  } else {
    sanitized.message = null;
  }

  return { valid: true, sanitized };
};

/**
 * Build WhatsApp message from sanitized data
 */
const buildWhatsAppMessage = (data, formId) => {
  const lines = [
    '* Enquiry - SASA Travel*',
    '----------------------',
    `*ID:* ${formId}`,
    '',
    `*Name:* ${data.name}`,
    `*Email:* ${data.email}`,
    `*Phone:* ${data.phone}`,
    `*Destination:* ${data.destination}`,
    `*Travel Date:* ${data.travelDate}`,
    '',
  ];

  if (data.message) {
    lines.push('*Message:*');
    lines.push(data.message);
  }

  return lines.join('\n');
};

/**
 * Build WhatsApp URL server-side (phone never exposed to client)
 */
const buildWhatsAppUrl = (message) => {
  const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);

  const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  if (url.length > WHATSAPP_URL_MAX_LENGTH) {
    throw new Error('Message too long for WhatsApp');
  }

  return url;
};

/**
 * Main request handler
 */
export default async function handler(req, res) {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check rate limit (note: resets on cold start in serverless)
  const ip = getClientIp(req);
  const { allowed, remaining } = checkRateLimit(rateLimitStore, ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW);
  res.setHeader('X-RateLimit-Remaining', remaining);

  if (!allowed) {
    return res.status(429).json({
      error: 'Too many requests. Please try again later.'
    });
  }

  try {
    // Sanitize and validate input
    const validation = sanitizeAndValidateData(req.body);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error });
    }

    const { sanitized } = validation;

    // Generate form ID
    const formId = generateFormId();

    // Build message (sanitized data is already safe)
    const message = buildWhatsAppMessage(sanitized, formId);

    // Build URL
    const whatsappUrl = buildWhatsAppUrl(message);

    // Clear sensitive data from memory (best effort)
    clearSensitiveData(req.body);
    clearSensitiveData(sanitized);

    // Return URL for client to open
    return res.status(200).json({
      success: true,
      url: whatsappUrl
    });

  } catch (error) {
    console.error('WhatsApp API error:', error.message);

    const message = error.message.includes('Message too long')
      ? 'Message is too long. Please shorten your message.'
      : 'Failed to process request';

    return res.status(500).json({
      error: message
    });
  }
}

