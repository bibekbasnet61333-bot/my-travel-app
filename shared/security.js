// Shared Security Utilities - Used by both API and Frontend
// Browser-safe implementation with Node.js (v18+) support

// =============================================================================
// Environment Detection & Setup
// =============================================================================

const isBrowser = typeof window !== 'undefined';

// Setup crypto for Node.js (v18+ has global crypto, older needs webcrypto)
const webCrypto = isBrowser
  ? crypto
  : (await import('crypto')).webcrypto;

// =============================================================================
// Buffer Helpers (Browser-safe - no Buffer usage)
// =============================================================================

const bufferToHex = (buffer) => {
  if (buffer instanceof Uint8Array) {
    return [...buffer].map(b => b.toString(16).padStart(2, '0')).join('');
  }
  return '';
};

const hexToBuffer = (hex) => {
  if (typeof hex !== 'string') return new Uint8Array(0);
  const bytes = hex.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || [];
  return new Uint8Array(bytes);
};

// =============================================================================
// TextEncoder/TextDecoder (Node 18+ has global, browsers have it)
// =============================================================================

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// =============================================================================
// Key Length Validation (AES-256 requires 32 bytes)
// =============================================================================

const validateAesKey = (keyBytes) => {
  if (!(keyBytes instanceof Uint8Array)) {
    throw new Error('Invalid key format');
  }
  if (keyBytes.length !== 32) {
    throw new Error('Invalid AES-256 key length (expected 32 bytes, got ' + keyBytes.length + ')');
  }
  return keyBytes;
};

// =============================================================================
// Secure Key Generation
// =============================================================================

export const generateSecureKey = async () => {
  const array = new Uint8Array(32);
  webCrypto.getRandomValues(array);
  return bufferToHex(array);
};

// =============================================================================
// Derive Key from Password (PBKDF2, 100k iterations)
// =============================================================================

export const deriveKeyFromPassword = async (password, salt) => {
  const passwordBytes = encoder.encode(password);
  const saltBytes = encoder.encode(salt);

  const baseKey = await webCrypto.importKey(
    'raw',
    passwordBytes,
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  const derivedKey = await webCrypto.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBytes,
      iterations: 100000,
      hash: 'SHA-256'
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );

  const exportedKey = await webCrypto.exportKey('raw', derivedKey);
  return bufferToHex(new Uint8Array(exportedKey));
};

// =============================================================================
// AES-256-GCM Encryption (128-bit auth tag)
// =============================================================================

export const encryptAesGcm = async (plaintext, keyHex) => {
  const plaintextBytes = encoder.encode(plaintext);
  const keyBytes = hexToBuffer(keyHex);
  validateAesKey(keyBytes);

  const iv = webCrypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await webCrypto.encrypt(
    { name: 'AES-GCM', iv, tagLength: 128 },
    await webCrypto.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['encrypt']),
    plaintextBytes
  );

  const combined = new Uint8Array(iv.length + ciphertext.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(ciphertext), iv.length);

  return bufferToHex(combined);
};

// =============================================================================
// AES-256-GCM Decryption (128-bit auth tag)
// =============================================================================

export const decryptAesGcm = async (encryptedHex, keyHex) => {
  const encryptedBytes = hexToBuffer(encryptedHex);
  const keyBytes = hexToBuffer(keyHex);
  validateAesKey(keyBytes);

  if (encryptedBytes.length < 12) {
    throw new Error('Invalid encrypted data: too short');
  }

  const iv = encryptedBytes.slice(0, 12);
  const ciphertext = encryptedBytes.slice(12);

  try {
    const decrypted = await webCrypto.decrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      await webCrypto.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt']),
      ciphertext
    );
    return decoder.decode(decrypted);
  } catch (e) {
    throw new Error('Decryption failed: invalid data or key');
  }
};

// =============================================================================
// SHA-256 Hashing
// =============================================================================

export const secureHash = async (data) => {
  const dataBytes = encoder.encode(data);
  const hashBuffer = await webCrypto.digest('SHA-256', dataBytes);
  return bufferToHex(new Uint8Array(hashBuffer));
};

// =============================================================================
// Form ID Generation
// =============================================================================

export const generateFormId = () => {
  const timestamp = Date.now().toString(36);
  const randomPart = Array.from(webCrypto.getRandomValues(new Uint8Array(8)))
    .map(b => b.toString(36).padStart(2, '0'))
    .join('');
  return `FORM-${timestamp}-${randomPart}`.toUpperCase();
};

// =============================================================================
// Phone/Email Validation
// =============================================================================

export const isValidPhoneNumber = (phone) => {
  if (typeof phone !== 'string') return false;
  const phoneRegex = /^[+\d\s-]{7,15}$/;
  return phoneRegex.test(phone.trim());
};

export const isValidEmailAddress = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// =============================================================================
// Input Sanitization (XSS Prevention - correct order)
// =============================================================================

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s*on\w+\s*=\s*(['"])[^'"]*\1/gi, '')
    .replace(/javascript:[^\s]*/gi, '')
    .replace(/data:[^\s]*/gi, '')
    .replace(/&#[xX]?[0-9a-fA-F]+;/g, '')
    .trim();
};

// =============================================================================
// Message Validation (Spam/Malicious Content)
// =============================================================================

export const validateMessageContent = (message) => {
  if (typeof message !== 'string') {
    return { valid: false, reason: 'Invalid message format' };
  }

  if (message.length > 2000) {
    return { valid: false, reason: 'Message too long' };
  }

  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner|prize)\b/i,
    /(https?:\/\/[^\s]+)/g,
    /(.)\1{10,}/i,
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(message)) {
      return { valid: false, reason: 'Message contains prohibited content' };
    }
  }

  const sqlPattern = /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|EXEC)\b)|(')|(--)|(\/\*)/i;
  if (sqlPattern.test(message)) {
    return { valid: false, reason: 'Message contains prohibited patterns' };
  }

  return { valid: true };
};

// =============================================================================
// Rate Limiting (Server-side only)
// =============================================================================

export const checkRateLimit = (store, ip, maxRequests = 10, windowMs = 60000) => {
  if (isBrowser) {
    return { allowed: true, remaining: maxRequests };
  }

  const now = Date.now();
  const windowStart = now - windowMs;

  if (!store.has(ip)) {
    store.set(ip, []);
  }

  const timestamps = store.get(ip).filter(ts => ts > windowStart);

  if (store.size > 500) {
    for (const [key, times] of store.entries()) {
      if (times.length > 0 && times[0] < windowStart) {
        store.delete(key);
      }
    }
  }

  timestamps.push(now);
  store.set(ip, timestamps);

  const remaining = Math.max(0, maxRequests - timestamps.length);
  return { allowed: timestamps.length <= maxRequests, remaining };
};

// =============================================================================
// Memory Security Note
// =============================================================================

export const clearSensitiveData = (data) => {
  if (typeof data === 'object' && data !== null) {
    Object.keys(data).forEach(key => {
      data[key] = null;
    });
  }
};

