import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { createServer } from 'http';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  sanitizeInput,
  isValidPhoneNumber,
  isValidEmailAddress,
  validateMessageContent,
  generateFormId,
  checkRateLimit,
  clearSensitiveData,
} from './shared/security.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// =============================================================================
// Startup Time Tracking
// =============================================================================

const startTime = Date.now();
let nodeInitTime = null;
let viteReadyTime = null;

const formatDuration = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
  return `${Math.floor(ms / 60000)}m ${((ms % 60000) / 1000).toFixed(2)}s`;
};

// =============================================================================
// Environment Configuration
// =============================================================================

// Fail fast if phone number is not configured
const PHONE_NUMBER = process.env.WHATSAPP_PHONE_NUMBER;
if (!PHONE_NUMBER) {
  console.error('WHATSAPP_PHONE_NUMBER environment variable is required');
  process.exit(1);
}

nodeInitTime = Date.now() - startTime;

// =============================================================================
// Rate Limiting Store (Serverless-compatible)
// =============================================================================

const rateLimitStore = new Map();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW = 60000;
const WHATSAPP_URL_MAX_LENGTH = 4000;

// =============================================================================
// Express App Setup
// =============================================================================

const app = express();
const server = createServer(app);

// =============================================================================
// Security Middleware
// =============================================================================

// Body size limit to prevent DoS
app.use(express.json({ limit: '5kb' }));

// CORS - restrict to known origins in production
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL].filter(Boolean)
  : ['http://localhost:3000', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://127.0.0.1:5173'];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  methods: ['POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// Rate limiting per IP
const apiRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW,
  max: RATE_LIMIT_MAX,
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
  // Use default IP detection which handles IPv4/IPv6 properly
});

// =============================================================================
// Helper Functions
// =============================================================================

const getClientIp = (req) => {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (realIp) {
    return realIp.trim();
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
};

const isValidDateFormat = (dateStr) => {
  if (!dateStr || dateStr === 'Not specified') return true;
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(dateStr);
};

// =============================================================================
// Input Validation & Sanitization
// =============================================================================

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

// =============================================================================
// WhatsApp API Handler
// =============================================================================

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

const buildWhatsAppUrl = (message) => {
  const cleanPhone = PHONE_NUMBER.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
  if (url.length > WHATSAPP_URL_MAX_LENGTH) {
    throw new Error('Message too long for WhatsApp');
  }
  return url;
};

// Apply rate limiter to WhatsApp API
app.use('/api/whatsapp', apiRateLimiter);

app.post('/api/whatsapp', async (req, res) => {
  // Set security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Pragma', 'no-cache');

  // Check rate limit
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

    const errorMessage = error.message.includes('Message too long')
      ? 'Message is too long. Please shorten your message.'
      : 'Failed to process request';

    return res.status(500).json({
      error: errorMessage
    });
  }
});

// =============================================================================
// Vite Dev Server (SPA Mode)
// =============================================================================

const vite = await createViteServer({
  server: { middlewareMode: true },
  appType: 'spa',
  root: path.join(__dirname),
});

viteReadyTime = Date.now() - startTime;

// Use Vite's connect instance as middleware
app.use(vite.middlewares);

// SPA fallback - serve index.html for all non-API routes
app.use('*', async (req, res, next) => {
  try {
    // Only handle non-API routes
    if (!req.path.startsWith('/api/')) {
      const indexPath = path.join(__dirname, 'index.html');
      const html = await vite.transformIndexHtml(req.url, await vite.fs.readFile(indexPath, 'utf-8'));
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    }
    next();
  } catch (error) {
    console.error('SPA fallback error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// =============================================================================
// Server Startup
// =============================================================================

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  const totalTime = Date.now() - startTime;
  const viteTime = viteReadyTime - nodeInitTime;
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`API endpoint: POST http://localhost:${PORT}/api/whatsapp`);
  console.log(`[${formatDuration(nodeInitTime)}] Node.js initialized`);
  console.log(`[${formatDuration(viteTime)}] Vite dev server ready`);
  console.log(`[${formatDuration(totalTime)}] Server ready`);
});

