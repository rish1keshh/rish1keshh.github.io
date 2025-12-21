/**
 * Secure Logging Utilities
 *
 * Provides secure logging methods that prevent sensitive data leakage
 * and integrate with error monitoring services.
 *
 * Best Practices:
 * - Never log passwords, tokens, or API keys
 * - Sanitize user input before logging
 * - Use different log levels for different environments
 * - Send errors to monitoring service in production
 */

/**
 * Sensitive data patterns to redact
 */
const SENSITIVE_PATTERNS = {
  password: /password["\s:=]+([^\s,"'}]+)/gi,
  token: /(bearer\s+)?([a-zA-Z0-9_-]{20,})/gi,
  apiKey: /(api[_-]?key["\s:=]+)([^\s,"'}]+)/gi,
  creditCard: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g,
  ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
  email: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
  ipAddress: /\b(?:\d{1,3}\.){3}\d{1,3}\b/g,
  jwt: /eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g,
};

/**
 * Redact sensitive information from strings
 *
 * @param {string} message - The message to sanitize
 * @returns {string} - Sanitized message
 */
export const redactSensitiveData = (message) => {
  if (typeof message !== 'string') {
    return message;
  }

  let sanitized = message;

  // Replace sensitive patterns
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.password, 'password=***REDACTED***');
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.token, '***TOKEN_REDACTED***');
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.apiKey, '$1***REDACTED***');
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.creditCard, '****-****-****-****');
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.ssn, '***-**-****');
  sanitized = sanitized.replace(SENSITIVE_PATTERNS.jwt, '***JWT_REDACTED***');

  return sanitized;
};

/**
 * Log levels
 */
export const LogLevel = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
  CRITICAL: 'critical',
};

/**
 * Secure logger class
 */
export class SecureLogger {
  constructor(options = {}) {
    this.appName = options.appName || 'App';
    this.environment = options.environment || (typeof process !== 'undefined' ? process.env.NODE_ENV : 'development');
    this.enableConsole = options.enableConsole !== false;
    this.enableRemote = options.enableRemote || false;
    this.remoteEndpoint = options.remoteEndpoint || null;
    this.minLevel = options.minLevel || LogLevel.INFO;
  }

  /**
   * Format log entry
   */
  formatLogEntry(level, message, metadata = {}) {
    const timestamp = new Date().toISOString();
    const sanitizedMessage = redactSensitiveData(message);

    // Sanitize metadata
    const sanitizedMetadata = {};
    for (const [key, value] of Object.entries(metadata)) {
      if (typeof value === 'string') {
        sanitizedMetadata[key] = redactSensitiveData(value);
      } else if (typeof value === 'object') {
        sanitizedMetadata[key] = JSON.parse(
          redactSensitiveData(JSON.stringify(value))
        );
      } else {
        sanitizedMetadata[key] = value;
      }
    }

    return {
      timestamp,
      level,
      app: this.appName,
      environment: this.environment,
      message: sanitizedMessage,
      metadata: sanitizedMetadata,
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
      url: typeof window !== 'undefined' ? window.location.href : 'N/A',
    };
  }

  /**
   * Log to console
   */
  logToConsole(level, entry) {
    if (!this.enableConsole) return;

    const consoleMethod = {
      [LogLevel.DEBUG]: 'debug',
      [LogLevel.INFO]: 'info',
      [LogLevel.WARN]: 'warn',
      [LogLevel.ERROR]: 'error',
      [LogLevel.CRITICAL]: 'error',
    }[level] || 'log';

    console[consoleMethod](`[${entry.timestamp}] [${level.toUpperCase()}]`, entry.message, entry.metadata);
  }

  /**
   * Send log to remote service
   */
  async logToRemote(entry) {
    if (!this.enableRemote || !this.remoteEndpoint) return;

    try {
      await fetch(this.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entry),
      });
    } catch (error) {
      // Fail silently to avoid infinite logging loops
      if (this.environment === 'development') {
        console.error('Failed to send log to remote service:', error);
      }
    }
  }

  /**
   * Core logging method
   */
  log(level, message, metadata = {}) {
    const entry = this.formatLogEntry(level, message, metadata);

    // Log to console
    this.logToConsole(level, entry);

    // Log to remote service in production
    if (this.environment === 'production') {
      this.logToRemote(entry);
    }
  }

  /**
   * Convenience methods
   */
  debug(message, metadata = {}) {
    if (this.environment === 'development') {
      this.log(LogLevel.DEBUG, message, metadata);
    }
  }

  info(message, metadata = {}) {
    this.log(LogLevel.INFO, message, metadata);
  }

  warn(message, metadata = {}) {
    this.log(LogLevel.WARN, message, metadata);
  }

  error(message, metadata = {}) {
    this.log(LogLevel.ERROR, message, metadata);
  }

  critical(message, metadata = {}) {
    this.log(LogLevel.CRITICAL, message, metadata);

    // In production, you might want to send alerts for critical errors
    if (this.environment === 'production') {
      // Send to alerting service (e.g., PagerDuty, Slack)
    }
  }

  /**
   * Log security events
   */
  security(event, metadata = {}) {
    this.log(LogLevel.WARN, `SECURITY EVENT: ${event}`, {
      ...metadata,
      securityEvent: true,
    });
  }
}

/**
 * Create default logger instance
 */
export const logger = new SecureLogger({
  appName: 'Cybersecurity Portfolio',
  environment: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.MODE : 'development',
  enableConsole: true,
  enableRemote: false, // Enable when you have a logging service
  remoteEndpoint: typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_LOG_ENDPOINT : null,
});

/**
 * Error logging helper for ErrorBoundary
 *
 * @param {Error} error - The error object
 * @param {object} errorInfo - React error info
 */
export const logErrorToService = (error, errorInfo) => {
  // Sanitize error message and stack trace
  const sanitizedError = {
    name: error.name,
    message: redactSensitiveData(error.message),
    stack: redactSensitiveData(error.stack || ''),
    componentStack: redactSensitiveData(errorInfo?.componentStack || ''),
  };

  logger.error('React Error Boundary caught an error', {
    error: sanitizedError,
    timestamp: Date.now(),
  });

  // In production, send to error monitoring service
  const isProduction = typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.MODE === 'production'
    : false;

  if (isProduction) {
    // Example: Sentry integration
    // Sentry.captureException(error, { contexts: { react: errorInfo } });
  }
};

/**
 * Performance monitoring helper
 *
 * @param {string} metricName - Name of the metric
 * @param {number} duration - Duration in milliseconds
 * @param {object} metadata - Additional metadata
 */
export const logPerformance = (metricName, duration, metadata = {}) => {
  logger.debug(`Performance: ${metricName}`, {
    duration,
    metric: metricName,
    ...metadata,
  });

  // In production, send to performance monitoring service
  const isProduction = typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.MODE === 'production'
    : false;

  if (isProduction) {
    // Example: Send to analytics or performance monitoring
  }
};

/**
 * Security event types for logging
 */
export const SecurityEvents = {
  AUTH_FAILED: 'Authentication Failed',
  AUTH_SUCCESS: 'Authentication Successful',
  INVALID_TOKEN: 'Invalid Token Detected',
  RATE_LIMIT_EXCEEDED: 'Rate Limit Exceeded',
  XSS_ATTEMPT: 'Potential XSS Attack Detected',
  SQL_INJECTION_ATTEMPT: 'Potential SQL Injection Detected',
  CSRF_VIOLATION: 'CSRF Token Validation Failed',
  UNAUTHORIZED_ACCESS: 'Unauthorized Access Attempt',
  FILE_UPLOAD_REJECTED: 'File Upload Rejected',
  SUSPICIOUS_INPUT: 'Suspicious Input Detected',
};
