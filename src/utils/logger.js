/**
 * Client-Side Production Structured Logger & Error Monitoring Hook
 * Prepared for Sentry and LogRocket Integration
 */

const SENSITIVE_FIELDS = new Set(['password', 'token', 'secret', 'code', 'creditcard', 'ssn']);

export function maskClientData(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  const masked = { ...obj };
  for (const key of Object.keys(masked)) {
    if (SENSITIVE_FIELDS.has(key.toLowerCase())) {
      masked[key] = '[MASKED_SECRET]';
    }
  }
  return masked;
}

export const logger = {
  info: (message, details = {}) => {
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, maskClientData(details));
    }
  },

  warn: (message, details = {}) => {
    console.warn(`[WARN] ${message}`, maskClientData(details));
  },

  error: (message, error = null, details = {}) => {
    const maskedDetails = maskClientData(details);
    console.error(`[ERROR] ${message}`, error?.message || error || '', maskedDetails);

    // Sentry / LogRocket Production Integration Hook
    if (window.Sentry) {
      try {
        window.Sentry.captureException(error || new Error(message), { extra: maskedDetails });
      } catch {}
    }

    if (window.LogRocket) {
      try {
        window.LogRocket.captureException(error || new Error(message));
      } catch {}
    }
  }
};

export default logger;
