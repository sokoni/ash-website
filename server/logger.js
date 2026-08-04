import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sensitive Keys Whitelist to Mask
const SENSITIVE_KEYS = new Set([
  'password',
  'passwordhash',
  'rawpassword',
  'newpassword',
  'token',
  'sessiontoken',
  'refreshtoken',
  'csrftoken',
  'resetpasswordtoken',
  'verificationcode',
  'apikey',
  'secret',
  'dbsecret',
  'cookie',
  'set-cookie',
  'authorization',
  'cardnumber',
  'cvv',
  'ssn'
]);

// Mask Sensitive Data Recursively
export function maskSensitiveData(data) {
  if (data === null || data === undefined) return data;
  if (typeof data === 'string') {
    // Mask potential token/secret strings
    if (/bearer\s+[a-zA-Z0-9._-]+/i.test(data)) {
      return '[MASKED_BEARER_TOKEN]';
    }
    return data;
  }
  if (typeof data !== 'object') return data;

  if (Array.isArray(data)) {
    return data.map(item => maskSensitiveData(item));
  }

  const masked = {};
  for (const [key, value] of Object.entries(data)) {
    const lowerKey = key.toLowerCase();
    if (SENSITIVE_KEYS.has(lowerKey)) {
      masked[key] = '[MASKED_SENSITIVE_DATA]';
    } else if (typeof value === 'object' && value !== null) {
      masked[key] = maskSensitiveData(value);
    } else {
      masked[key] = value;
    }
  }
  return masked;
}

import * as Sentry from '@sentry/node';

// Initialize Node Sentry SDK if SENTRY_DSN is configured
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'production',
    tracesSampleRate: 1.0,
    beforeSend(event) {
      if (event.request && event.request.headers) {
        delete event.request.headers['authorization'];
        delete event.request.headers['cookie'];
        delete event.request.headers['set-cookie'];
      }
      return event;
    }
  });
}

// Sentry & External Logger Forwarding Hook
function forwardToMonitoringService(logEntry) {
  if (process.env.SENTRY_DSN && (logEntry.level === 'ERROR' || logEntry.level === 'CRITICAL')) {
    try {
      Sentry.captureException(new Error(logEntry.message), {
        extra: logEntry.details,
        tags: { category: logEntry.category, clientIp: logEntry.clientIp }
      });
    } catch {}
  }
}

// Ensure Log Directory Exists
const LOG_DIR = process.env.LOG_DIR || path.join(__dirname, 'logs');
if (!fs.existsSync(LOG_DIR)) {
  try {
    fs.mkdirSync(LOG_DIR, { recursive: true, mode: 0o700 });
  } catch {}
}

const LOG_FILE = path.join(LOG_DIR, 'server_audit.log');

// Core Structured Logger
export function logEvent(category, level, message, details = {}, req = null) {
  const timestamp = new Date().toISOString();
  const clientIp = req ? (req.ip || req.socket?.remoteAddress || '127.0.0.1') : 'SYSTEM';
  const method = req ? req.method : '-';
  const url = req ? req.originalUrl : '-';

  const sanitizedDetails = maskSensitiveData(details);

  const logEntry = {
    timestamp,
    category,  // API_REQUEST, AUTH_EVENT, RATE_LIMIT, SECURITY_EVENT, SERVER_INFO, ERROR_LOG
    level,     // INFO, WARN, ERROR, CRITICAL
    message,
    clientIp,
    method,
    url,
    details: sanitizedDetails
  };

  // 1. Console Stream (Structured Output)
  const logLine = `[${timestamp}] [${level}] [${category}] [IP: ${clientIp}] ${message}`;
  if (level === 'ERROR' || level === 'CRITICAL') {
    console.error(logLine, Object.keys(sanitizedDetails).length ? sanitizedDetails : '');
  } else if (level === 'WARN') {
    console.warn(logLine, Object.keys(sanitizedDetails).length ? sanitizedDetails : '');
  } else {
    console.log(logLine);
  }

  // 2. File Stream Persistence
  try {
    fs.appendFileSync(LOG_FILE, JSON.stringify(logEntry) + '\n', { mode: 0o600 });
  } catch {}

  // 3. Forward to Sentry / LogRocket Services
  forwardToMonitoringService(logEntry);

  return logEntry;
}
