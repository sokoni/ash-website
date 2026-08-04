import * as Sentry from '@sentry/react';

/**
 * Client-Side Production Structured Logger & Error Monitoring Hook
 * Connected to @sentry/react
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

    if (import.meta.env.VITE_SENTRY_DSN) {
      try {
        Sentry.captureException(error || new Error(message), { extra: maskedDetails });
      } catch {}
    }
  }
};

export default logger;
