/**
 * Security Utilities
 *
 * This file contains security helper functions for input validation,
 * sanitization, and protection against common web attacks.
 *
 * Use these utilities when implementing forms, authentication, or
 * handling any user input in the future.
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * Removes potentially dangerous HTML tags and attributes
 *
 * @param {string} html - The HTML string to sanitize
 * @returns {string} - Sanitized HTML string
 */
export const sanitizeHTML = (html) => {
  if (typeof html !== 'string') return '';

  // Create a temporary div element
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

/**
 * Escape HTML special characters
 * Prevents XSS by converting special characters to HTML entities
 *
 * @param {string} str - The string to escape
 * @returns {string} - Escaped string
 */
export const escapeHTML = (str) => {
  if (typeof str !== 'string') return '';

  const htmlEscapeMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return str.replace(/[&<>"'\/]/g, (char) => htmlEscapeMap[char]);
};

/**
 * Validate email format
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;

  // RFC 5322 compliant email regex (simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Validate URL format
 *
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid URL format
 */
export const isValidURL = (url) => {
  if (typeof url !== 'string') return false;

  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

/**
 * Validate password strength
 * Enforces strong password policy
 *
 * @param {string} password - The password to validate
 * @returns {object} - Validation result with isValid and errors
 */
export const validatePasswordStrength = (password) => {
  const result = {
    isValid: true,
    errors: [],
    strength: 0,
  };

  if (typeof password !== 'string') {
    return { isValid: false, errors: ['Invalid password type'], strength: 0 };
  }

  // Minimum length
  if (password.length < 12) {
    result.errors.push('Password must be at least 12 characters long');
    result.isValid = false;
  } else {
    result.strength += 25;
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain at least one uppercase letter');
    result.isValid = false;
  } else {
    result.strength += 25;
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    result.errors.push('Password must contain at least one lowercase letter');
    result.isValid = false;
  } else {
    result.strength += 25;
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    result.errors.push('Password must contain at least one number');
    result.isValid = false;
  } else {
    result.strength += 12.5;
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    result.errors.push('Password must contain at least one special character');
    result.isValid = false;
  } else {
    result.strength += 12.5;
  }

  return result;
};

/**
 * Generate CSRF token
 * Use this for form submissions to prevent CSRF attacks
 *
 * @returns {string} - Random CSRF token
 */
export const generateCSRFToken = () => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Validate CSRF token
 * Compare submitted token with stored token
 *
 * @param {string} token - The token to validate
 * @param {string} storedToken - The stored token to compare against
 * @returns {boolean} - True if tokens match
 */
export const validateCSRFToken = (token, storedToken) => {
  if (typeof token !== 'string' || typeof storedToken !== 'string') {
    return false;
  }

  // Use constant-time comparison to prevent timing attacks
  if (token.length !== storedToken.length) {
    return false;
  }

  let result = 0;
  for (let i = 0; i < token.length; i++) {
    result |= token.charCodeAt(i) ^ storedToken.charCodeAt(i);
  }

  return result === 0;
};

/**
 * Sanitize file name
 * Remove potentially dangerous characters from file names
 *
 * @param {string} fileName - The file name to sanitize
 * @returns {string} - Sanitized file name
 */
export const sanitizeFileName = (fileName) => {
  if (typeof fileName !== 'string') return 'unknown';

  return fileName
    .replace(/[^a-zA-Z0-9._-]/g, '_') // Replace invalid characters
    .replace(/\.{2,}/g, '.') // Prevent directory traversal
    .substring(0, 255); // Limit length
};

/**
 * Validate file type
 * Check if file type is in allowed list
 *
 * @param {string} fileName - The file name
 * @param {Array<string>} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - True if file type is allowed
 */
export const isAllowedFileType = (fileName, allowedTypes) => {
  if (typeof fileName !== 'string' || !Array.isArray(allowedTypes)) {
    return false;
  }

  const extension = fileName.split('.').pop()?.toLowerCase();
  const mimeTypeMap = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
    csv: 'text/csv',
    json: 'application/json',
    xml: 'application/xml',
  };

  const mimeType = mimeTypeMap[extension];
  return mimeType && allowedTypes.includes(mimeType);
};

/**
 * Advanced file upload security validation
 */
export const FileUploadSecurity = {
  /**
   * Maximum file sizes by type (in bytes)
   */
  MAX_FILE_SIZES: {
    'image/jpeg': 5 * 1024 * 1024, // 5MB
    'image/png': 5 * 1024 * 1024,
    'image/gif': 2 * 1024 * 1024,
    'application/pdf': 10 * 1024 * 1024, // 10MB
    'text/plain': 1 * 1024 * 1024, // 1MB
    'text/csv': 5 * 1024 * 1024,
    'application/json': 1 * 1024 * 1024,
  },

  /**
   * Dangerous file extensions that should never be allowed
   */
  DANGEROUS_EXTENSIONS: [
    'exe', 'bat', 'cmd', 'com', 'pif', 'scr', 'vbs', 'js', 'jar',
    'sh', 'bash', 'csh', 'ksh', 'dll', 'so', 'dylib', 'app',
    'php', 'asp', 'aspx', 'jsp', 'cgi', 'pl', 'py', 'rb',
    'htaccess', 'config', 'ini', 'sys', 'drv',
  ],

  /**
   * Magic number signatures for file type verification
   * First few bytes of files identify their true type
   */
  MAGIC_NUMBERS: {
    'image/jpeg': ['FFD8FF'],
    'image/png': ['89504E47'],
    'image/gif': ['474946383761', '474946383961'], // GIF87a, GIF89a
    'application/pdf': ['25504446'],
    'application/zip': ['504B0304', '504B0506', '504B0708'],
  },

  /**
   * Validate file size
   *
   * @param {File} file - The file object
   * @param {number} maxSize - Maximum size in bytes (optional)
   * @returns {object} - Validation result
   */
  validateFileSize(file, maxSize = null) {
    if (!(file instanceof File)) {
      return { isValid: false, error: 'Invalid file object' };
    }

    const limit = maxSize || this.MAX_FILE_SIZES[file.type] || 5 * 1024 * 1024;

    if (file.size > limit) {
      return {
        isValid: false,
        error: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds limit (${(limit / 1024 / 1024).toFixed(2)}MB)`,
      };
    }

    if (file.size === 0) {
      return { isValid: false, error: 'File is empty' };
    }

    return { isValid: true, error: null };
  },

  /**
   * Check if file extension is dangerous
   *
   * @param {string} fileName - The file name
   * @returns {boolean} - True if extension is dangerous
   */
  isDangerousExtension(fileName) {
    if (typeof fileName !== 'string') return true;

    const extension = fileName.split('.').pop()?.toLowerCase();
    return this.DANGEROUS_EXTENSIONS.includes(extension);
  },

  /**
   * Validate file by magic number (file signature)
   * Prevents file type spoofing
   *
   * @param {File} file - The file object
   * @returns {Promise<object>} - Validation result
   */
  async validateMagicNumber(file) {
    if (!(file instanceof File)) {
      return { isValid: false, error: 'Invalid file object' };
    }

    // Only validate files we have magic numbers for
    const expectedMagicNumbers = this.MAGIC_NUMBERS[file.type];
    if (!expectedMagicNumbers) {
      return { isValid: true, error: null }; // Skip validation for unknown types
    }

    try {
      // Read first 8 bytes
      const blob = file.slice(0, 8);
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Convert to hex string
      const hex = Array.from(uint8Array)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
        .toUpperCase();

      // Check if file signature matches expected magic numbers
      const isValid = expectedMagicNumbers.some(magic => hex.startsWith(magic));

      if (!isValid) {
        return {
          isValid: false,
          error: `File type mismatch: ${file.type} does not match file signature`,
        };
      }

      return { isValid: true, error: null };
    } catch (error) {
      return { isValid: false, error: 'Failed to read file signature' };
    }
  },

  /**
   * Comprehensive file validation
   *
   * @param {File} file - The file object
   * @param {object} options - Validation options
   * @returns {Promise<object>} - Validation result
   */
  async validateFile(file, options = {}) {
    const {
      allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
      maxSize = null,
      checkMagicNumber = true,
    } = options;

    // Check if file exists
    if (!(file instanceof File)) {
      return { isValid: false, error: 'Invalid file object', errors: [] };
    }

    const errors = [];

    // 1. Check for dangerous extension
    if (this.isDangerousExtension(file.name)) {
      errors.push('File extension is not allowed for security reasons');
    }

    // 2. Sanitize filename
    const sanitizedName = sanitizeFileName(file.name);
    if (sanitizedName !== file.name) {
      errors.push('File name contains invalid characters');
    }

    // 3. Validate file type
    if (!allowedTypes.includes(file.type)) {
      errors.push(`File type ${file.type} is not allowed`);
    }

    // 4. Validate file size
    const sizeResult = this.validateFileSize(file, maxSize);
    if (!sizeResult.isValid) {
      errors.push(sizeResult.error);
    }

    // 5. Validate magic number (file signature)
    if (checkMagicNumber) {
      const magicResult = await this.validateMagicNumber(file);
      if (!magicResult.isValid) {
        errors.push(magicResult.error);
      }
    }

    return {
      isValid: errors.length === 0,
      error: errors.length > 0 ? errors[0] : null,
      errors,
      sanitizedName,
    };
  },

  /**
   * Create secure FormData with validation
   *
   * @param {File} file - The file to upload
   * @param {object} options - Upload options
   * @returns {Promise<FormData | null>} - FormData object or null if validation fails
   */
  async createSecureFormData(file, options = {}) {
    const validation = await this.validateFile(file, options);

    if (!validation.isValid) {
      console.error('File validation failed:', validation.errors);
      return null;
    }

    const formData = new FormData();
    formData.append('file', file, validation.sanitizedName);

    // Add CSRF token if available
    const csrfToken = options.csrfToken || sessionStorage.getItem('csrfToken');
    if (csrfToken) {
      formData.append('csrfToken', csrfToken);
    }

    return formData;
  },
};

/**
 * Rate limiter class
 * Implements token bucket algorithm for rate limiting
 */
export class RateLimiter {
  constructor(maxRequests, windowMs, storageKey) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.storageKey = storageKey;
  }

  checkLimit() {
    try {
      const data = localStorage.getItem(this.storageKey);
      if (!data) return true;

      const { count, timestamp } = JSON.parse(data);
      const now = Date.now();

      // Reset if window has passed
      if (now - timestamp > this.windowMs) {
        return true;
      }

      // Check if limit exceeded
      return count < this.maxRequests;
    } catch (error) {
      return true;
    }
  }

  recordRequest() {
    try {
      const data = localStorage.getItem(this.storageKey);
      const now = Date.now();

      if (!data) {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify({ count: 1, timestamp: now })
        );
        return;
      }

      const { count, timestamp } = JSON.parse(data);

      // Reset if window has passed
      if (now - timestamp > this.windowMs) {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify({ count: 1, timestamp: now })
        );
      } else {
        localStorage.setItem(
          this.storageKey,
          JSON.stringify({ count: count + 1, timestamp })
        );
      }
    } catch (error) {
      // Silently fail if localStorage is unavailable
    }
  }
}

/**
 * Prevent clickjacking by checking if page is in iframe
 *
 * @returns {boolean} - True if page is in iframe
 */
export const isInIframe = () => {
  try {
    return window.self !== window.top;
  } catch (error) {
    return true;
  }
};

/**
 * Secure random string generator
 *
 * @param {number} length - Length of the random string
 * @returns {string} - Random string
 */
export const generateSecureRandomString = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Prevent path traversal attacks
 * Validates that a path doesn't contain directory traversal sequences
 *
 * @param {string} path - The path to validate
 * @returns {boolean} - True if path is safe
 */
export const isSafePath = (path) => {
  if (typeof path !== 'string') return false;

  // Check for directory traversal patterns
  const dangerousPatterns = [
    '../',
    '..\\',
    '%2e%2e/',
    '%2e%2e\\',
    '..%2f',
    '..%5c',
    '%252e%252e/',
    '..;/',
  ];

  const normalizedPath = path.toLowerCase();
  return !dangerousPatterns.some(pattern => normalizedPath.includes(pattern));
};

/**
 * Sanitize input for SQL queries (for future backend implementation)
 * NOTE: Always use parameterized queries instead of string concatenation
 *
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeSQLInput = (input) => {
  if (typeof input !== 'string') return '';

  // Remove SQL special characters and keywords
  return input
    .replace(/['";\\]/g, '') // Remove quotes and backslashes
    .replace(/--/g, '') // Remove SQL comments
    .replace(/\/\*/g, '') // Remove block comment start
    .replace(/\*\//g, '') // Remove block comment end
    .trim();
};

/**
 * Validate JSON structure to prevent JSON injection
 *
 * @param {string} jsonString - The JSON string to validate
 * @returns {object} - { isValid: boolean, data: any, error: string }
 */
export const validateJSON = (jsonString) => {
  if (typeof jsonString !== 'string') {
    return { isValid: false, data: null, error: 'Input must be a string' };
  }

  try {
    // Check for excessive nesting (DoS protection)
    const maxDepth = 20;
    let depth = 0;
    let maxDepthReached = 0;

    for (let char of jsonString) {
      if (char === '{' || char === '[') {
        depth++;
        maxDepthReached = Math.max(maxDepthReached, depth);
      } else if (char === '}' || char === ']') {
        depth--;
      }

      if (maxDepthReached > maxDepth) {
        return { isValid: false, data: null, error: 'JSON nesting too deep' };
      }
    }

    const data = JSON.parse(jsonString);
    return { isValid: true, data, error: null };
  } catch (error) {
    return { isValid: false, data: null, error: error.message };
  }
};

/**
 * Prevent command injection by validating input
 *
 * @param {string} input - The input to validate
 * @returns {boolean} - True if input appears safe
 */
export const isSafeCommandInput = (input) => {
  if (typeof input !== 'string') return false;

  // Check for shell metacharacters and command separators
  const dangerousChars = /[;&|`$(){}[\]<>!\\]/;
  const dangerousPatterns = /(\$\(|\$\{|`|\|\||&&|;|>|<)/;

  return !dangerousChars.test(input) && !dangerousPatterns.test(input);
};

/**
 * Validate phone number format
 *
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - True if valid phone format
 */
export const isValidPhoneNumber = (phone) => {
  if (typeof phone !== 'string') return false;

  // E.164 format with optional + prefix
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  const cleaned = phone.replace(/[\s\-()]/g, '');

  return phoneRegex.test(cleaned);
};

/**
 * Sanitize user input for display (prevent XSS)
 * More aggressive than escapeHTML for untrusted content
 *
 * @param {string} input - The input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeUserInput = (input) => {
  if (typeof input !== 'string') return '';

  return input
    .replace(/[<>]/g, '') // Remove angle brackets entirely
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:/gi, '') // Remove data: protocol
    .trim()
    .substring(0, 1000); // Limit length
};

/**
 * Validate Content Security Policy nonce
 *
 * @param {string} nonce - The nonce to validate
 * @returns {boolean} - True if nonce is valid format
 */
export const isValidCSPNonce = (nonce) => {
  if (typeof nonce !== 'string') return false;

  // Nonce should be base64 encoded and at least 128 bits (16 bytes)
  const base64Regex = /^[A-Za-z0-9+/]{22,}={0,2}$/;
  return base64Regex.test(nonce) && nonce.length >= 22;
};

/**
 * Generate a cryptographic nonce for CSP
 *
 * @returns {string} - Base64 encoded nonce
 */
export const generateCSPNonce = () => {
  const array = new Uint8Array(16); // 128 bits
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode.apply(null, array));
};

/**
 * Session security utilities
 */
export const SessionSecurity = {
  /**
   * Generate a secure session ID
   *
   * @returns {string} - Secure session ID
   */
  generateSessionId() {
    return generateSecureRandomString(48);
  },

  /**
   * Validate session timeout
   *
   * @param {number} lastActivity - Timestamp of last activity
   * @param {number} timeoutMinutes - Session timeout in minutes
   * @returns {boolean} - True if session is still valid
   */
  isSessionValid(lastActivity, timeoutMinutes = 30) {
    const now = Date.now();
    const timeout = timeoutMinutes * 60 * 1000;
    return (now - lastActivity) < timeout;
  },

  /**
   * Create secure cookie options
   *
   * @param {boolean} isProduction - Whether in production environment
   * @returns {object} - Cookie configuration object
   */
  getSecureCookieOptions(isProduction = true) {
    return {
      httpOnly: true, // Prevent JavaScript access
      secure: isProduction, // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: 30 * 60 * 1000, // 30 minutes
      path: '/',
    };
  },
};

/**
 * Password security utilities
 */
export const PasswordSecurity = {
  /**
   * Check if password has been compromised (for future API integration)
   * This is a placeholder for Have I Been Pwned API integration
   *
   * @param {string} password - The password to check
   * @returns {Promise<boolean>} - True if password appears compromised
   */
  async isPasswordCompromised(password) {
    // In production, integrate with Have I Been Pwned API
    // For now, check against common passwords
    const commonPasswords = [
      'password', '123456', '12345678', 'qwerty', 'abc123',
      'password123', 'admin', 'letmein', 'welcome', 'monkey',
    ];

    return commonPasswords.includes(password.toLowerCase());
  },

  /**
   * Generate password hash configuration
   * NOTE: Actual hashing should be done server-side with bcrypt
   *
   * @returns {object} - Recommended bcrypt configuration
   */
  getBcryptConfig() {
    return {
      saltRounds: 12, // Good balance between security and performance
      maxPasswordLength: 72, // bcrypt limit
    };
  },

  /**
   * Validate password complexity
   *
   * @param {string} password - The password to validate
   * @returns {object} - Detailed validation result
   */
  validateComplexity(password) {
    const result = validatePasswordStrength(password);

    // Additional checks
    const hasRepeatedChars = /(.)\1{2,}/.test(password);
    const hasSequentialChars = /(abc|bcd|cde|123|234|345|456|567|678|789|890)/i.test(password);

    if (hasRepeatedChars) {
      result.errors.push('Password contains too many repeated characters');
      result.isValid = false;
      result.strength = Math.max(0, result.strength - 20);
    }

    if (hasSequentialChars) {
      result.errors.push('Password contains sequential characters');
      result.isValid = false;
      result.strength = Math.max(0, result.strength - 15);
    }

    return result;
  },
};

/**
 * Input validation utilities
 */
export const InputValidation = {
  /**
   * Validate integer input
   *
   * @param {any} input - The input to validate
   * @param {number} min - Minimum value (optional)
   * @param {number} max - Maximum value (optional)
   * @returns {boolean} - True if valid integer
   */
  isValidInteger(input, min = null, max = null) {
    const num = parseInt(input, 10);
    if (isNaN(num)) return false;
    if (min !== null && num < min) return false;
    if (max !== null && num > max) return false;
    return true;
  },

  /**
   * Validate alphanumeric string
   *
   * @param {string} input - The input to validate
   * @param {number} maxLength - Maximum length
   * @returns {boolean} - True if valid alphanumeric
   */
  isAlphanumeric(input, maxLength = 255) {
    if (typeof input !== 'string') return false;
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(input) && input.length <= maxLength;
  },

  /**
   * Validate UUID format
   *
   * @param {string} uuid - The UUID to validate
   * @returns {boolean} - True if valid UUID
   */
  isValidUUID(uuid) {
    if (typeof uuid !== 'string') return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  },

  /**
   * Validate date string
   *
   * @param {string} dateString - The date string to validate
   * @returns {boolean} - True if valid date
   */
  isValidDate(dateString) {
    if (typeof dateString !== 'string') return false;
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
  },

  /**
   * Sanitize and validate numeric input
   *
   * @param {any} input - The input to validate
   * @param {object} options - Validation options
   * @returns {object} - { isValid: boolean, value: number, error: string }
   */
  validateNumeric(input, options = {}) {
    const { min = null, max = null, allowDecimals = true } = options;

    const num = allowDecimals ? parseFloat(input) : parseInt(input, 10);

    if (isNaN(num)) {
      return { isValid: false, value: null, error: 'Invalid number' };
    }

    if (min !== null && num < min) {
      return { isValid: false, value: null, error: `Number must be at least ${min}` };
    }

    if (max !== null && num > max) {
      return { isValid: false, value: null, error: `Number must be at most ${max}` };
    }

    return { isValid: true, value: num, error: null };
  },
};
