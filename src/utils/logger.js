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
    const masked = maskClientData(details);
    if (import.meta.env.DEV) {
      console.log(`[INFO] ${message}`, masked);
    }
    try {
      if (Sentry.logger && Sentry.logger.info) {
        Sentry.logger.info(message, masked);
      }
    } catch {}
  },

  warn: (message, details = {}) => {
    const masked = maskClientData(details);
    console.warn(`[WARN] ${message}`, masked);
    try {
      if (Sentry.logger && Sentry.logger.warn) {
        Sentry.logger.warn(message, masked);
      }
    } catch {}
  },

  error: (message, error = null, details = {}) => {
    const maskedDetails = maskClientData(details);
    console.error(`[ERROR] ${message}`, error?.message || error || '', maskedDetails);

    try {
      if (Sentry.logger && Sentry.logger.error) {
        Sentry.logger.error(message, maskedDetails);
      }
      Sentry.captureException(error || new Error(message), { extra: maskedDetails });
    } catch {}
  }
};

/**
 * Send a test Sentry log
 */
export function sendTestSentryLog() {
  if (Sentry.logger && Sentry.logger.info) {
    Sentry.logger.info('User triggered test log', { log_source: 'sentry_test' });
  } else {
    Sentry.captureMessage('User triggered test log', { extra: { log_source: 'sentry_test' } });
  }
}

export default logger;
