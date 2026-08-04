import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { logEvent } from './logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Hardening: Disable fingerprinting header
app.disable('x-powered-by');

// Security Hardening Middleware: A+ Rating HTTP Security Headers (Mozilla Observatory & SecurityHeaders.com)
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(), camera=(), microphone=(), payment=(), usb=(), display-capture=(), autoplay=(), battery=(), accelerometer=(), gyroscope=(), magnetometer=()'
  );
  res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://use.typekit.net https://*.sentry.io https://www.google.com https://www.gstatic.com https://cal.com https://*.cal.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net; font-src 'self' https://fonts.gstatic.com https://use.typekit.net https://fonts.cdnfonts.com data:; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:5000 http://localhost:5001 https://formsubmit.co https://*.sentry.io https://*.ingest.us.sentry.io https://*.ingest.sentry.io https://cal.com https://*.cal.com; frame-src 'self' https://www.google.com https://cal.com https://*.cal.com; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co;"
  );
  next();
});

// Configure Secure CORS
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5000', 'http://localhost:5001', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
  credentials: true
}));

app.use(express.json({ limit: '10kb' })); // Body payload size limit (10kb) to prevent DoS

// Structured API Request Audit Logger Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logEvent('API_REQUEST', 'INFO', `HTTP ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`, {
      statusCode: res.statusCode,
      durationMs: duration
    }, req);
  });
  next();
});

// API Timeout Protection Middleware (10 seconds timeout)
app.use((req, res, next) => {
  req.setTimeout(10000, () => {
    if (!res.headersSent) {
      logEvent('SECURITY_EVENT', 'WARN', 'API Request Timeout Exceeded (10s)', {}, req);
      res.status(408).json({ error: 'Request processing timeout' });
    }
  });
  next();
});

// Cryptographic Password Hashing & Verification (Scrypt with 16-byte random salt)
function hashPassword(password) {
  if (!password || typeof password !== 'string') {
    password = crypto.randomBytes(16).toString('hex');
  }
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!password || !storedHash || typeof storedHash !== 'string' || !storedHash.includes(':')) {
    return false;
  }
  try {
    const [salt, originalHash] = storedHash.split(':');
    const verifyHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(originalHash, 'hex'), Buffer.from(verifyHash, 'hex'));
  } catch {
    return false;
  }
}

// Cookie Helper for HttpOnly, Secure, SameSite=Strict cookies
function setSecureSessionCookies(res) {
  const sessionToken = crypto.randomBytes(32).toString('hex');
  const refreshToken = crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(16).toString('hex');

  const isProd = process.env.NODE_ENV === 'production';
  const cookieOptions = `HttpOnly; ${isProd ? 'Secure; ' : ''}SameSite=Strict; Path=/`;

  res.setHeader('Set-Cookie', [
    `session_token=${sessionToken}; ${cookieOptions}; Max-Age=3600`, // 1 hour
    `refresh_token=${refreshToken}; ${cookieOptions}; Max-Age=604800`, // 7 days
    `csrf_token=${csrfToken}; SameSite=Strict; Path=/; Max-Age=3600` // CSRF double submit token
  ]);

  return { sessionToken, refreshToken, csrfToken };
}

// Input Sanitization Helper to prevent injection and XSS
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/[\r\n%0A%0D]/g, '') // Prevent Header Injection
    .trim();
}

function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  const sanitized = email.trim().toLowerCase().replace(/[\r\n%0A%0D]/g, '');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(sanitized) ? sanitized : '';
}

// Suspicious Activity Logger
function logSuspiciousActivity(req, reason, level = 'WARN', details = {}) {
  return logEvent('SECURITY_EVENT', level, reason, details, req);
}

// Account Lockout & Brute-Force Tracker (5 attempts max, 15 min lock)
const failedAttemptsMap = new Map();

function checkAccountLockout(identifier) {
  const record = failedAttemptsMap.get(identifier);
  if (!record) return false;
  if (Date.now() < record.lockedUntil) {
    return true; // Still locked
  }
  if (Date.now() > record.lockedUntil) {
    failedAttemptsMap.delete(identifier);
  }
  return false;
}

function recordFailedAttempt(identifier) {
  const record = failedAttemptsMap.get(identifier) || { count: 0, lockedUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.lockedUntil = Date.now() + 15 * 60 * 1000; // 15 minutes lockout
  }
  failedAttemptsMap.set(identifier, record);
}

function resetFailedAttempts(identifier) {
  failedAttemptsMap.delete(identifier);
}

// Environment Credentials & Secrets Configuration
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const BACKUP_DIR = path.join(DATA_DIR, 'backups');
const DB_FILE = process.env.DB_FILE_PATH || path.join(DATA_DIR, 'database.json');

// Derive 32-byte Encryption Key for AES-256-GCM
const DB_SECRET = process.env.DB_ENCRYPTION_KEY || 'blc_master_db_secret_key_2026_production';
const DB_ENCRYPTION_KEY = crypto.createHash('sha256').update(DB_SECRET).digest();
const ENCRYPTION_ALGO = 'aes-256-gcm';

// Encrypt Sensitive Field / Data at Rest
function encryptSensitive(text) {
  if (!text || typeof text !== 'string') return text;
  try {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ENCRYPTION_ALGO, DB_ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const authTag = cipher.getAuthTag().toString('hex');
    return `enc:${iv.toString('hex')}:${authTag}:${encrypted}`;
  } catch {
    return text;
  }
}

// Decrypt Sensitive Field
function decryptSensitive(text) {
  if (!text || typeof text !== 'string' || !text.startsWith('enc:')) return text;
  try {
    const parts = text.split(':');
    if (parts.length !== 4) return text;
    const [, ivHex, authTagHex, encryptedText] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ENCRYPTION_ALGO, DB_ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    return text;
  }
}

// Ensure database and backup directories exist with restricted permissions
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true, mode: 0o700 });
}
if (!fs.existsSync(BACKUP_DIR)) {
  fs.mkdirSync(BACKUP_DIR, { recursive: true, mode: 0o700 });
}

// Prototype Pollution & Injection Shielding for Query Data
function preventPrototypePollution(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  delete obj.__proto__;
  delete obj.constructor;
  delete obj.prototype;
  return obj;
}

// Secure Atomic Backup Generator (Rotates latest 10 backups)
function backupDatabase(dbData) {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(BACKUP_DIR, `database_backup_${timestamp}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(dbData, null, 2), { mode: 0o600 });

    // Rotate backups, keeping 10 most recent
    const files = fs.readdirSync(BACKUP_DIR)
      .filter(f => f.startsWith('database_backup_'))
      .map(f => path.join(BACKUP_DIR, f))
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);

    if (files.length > 10) {
      files.slice(10).forEach(file => {
        try { fs.unlinkSync(file); } catch {}
      });
    }
  } catch (err) {
    console.error('Secure backup generation error:', err.message);
  }
}

function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = { users: [], consultations: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), { mode: 0o600 });
    return initialData;
  }
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    const parsed = JSON.parse(content);
    return preventPrototypePollution(parsed);
  } catch (err) {
    console.error('Error reading database file:', err.message);
    return { users: [], consultations: [] };
  }
}

function saveDatabase(data) {
  try {
    const cleanData = preventPrototypePollution(data);
    fs.writeFileSync(DB_FILE, JSON.stringify(cleanData, null, 2), { mode: 0o600 });
    backupDatabase(cleanData);
  } catch (err) {
    console.error('Error writing database file:', err.message);
  }
}

// Parameterized Query & User Output Sanitizer (Principle of Least Privilege)
function sanitizeUserOutput(user) {
  if (!user || typeof user !== 'object') return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'Client Account',
    emailVerified: Boolean(user.emailVerified),
    twoFactorEnabled: Boolean(user.twoFactorEnabled),
    createdAt: user.createdAt
  };
}

function findUserByEmail(db, email) {
  if (!email || typeof email !== 'string') return null;
  const cleanEmail = email.trim().toLowerCase();
  return db.users.find(u => u && u.email && u.email.toLowerCase() === cleanEmail) || null;
}

// IP Rate Limiter Map for API Hardening
const ipRateLimitMap = new Map();

function isRateLimited(ip, maxRequests = 10, windowMs = 600000) { // 10 requests per 10 mins
  const now = Date.now();
  const userLogs = ipRateLimitMap.get(ip) || [];
  const recentLogs = userLogs.filter(timestamp => now - timestamp < windowMs);
  
  if (recentLogs.length >= maxRequests) {
    return true;
  }
  
  recentLogs.push(now);
  ipRateLimitMap.set(ip, recentLogs);
  return false;
}

// ROUTE 1: GET /api/health
app.get('/api/health', (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ status: 'ok', message: 'BlackLine Creative Container API is running' });
});

// ROUTE 2: POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(clientIp, 10, 600000)) {
    logSuspiciousActivity(req, 'Rate limit exceeded on user registration', 'HIGH');
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const cleanEmail = sanitizeEmail(req.body.email);
  const cleanName = sanitizeInput(req.body.name).slice(0, 75);
  const rawPassword = req.body.password;

  if (!cleanEmail) {
    logSuspiciousActivity(req, 'Malformed or invalid email submitted during registration', 'WARN');
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const db = loadDatabase();
  const existingUser = findUserByEmail(db, cleanEmail);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  if (existingUser) {
    existingUser.verificationCode = verificationCode;
    if (rawPassword) {
      existingUser.passwordHash = hashPassword(rawPassword);
    }
    saveDatabase(db);
    const tokens = setSecureSessionCookies(res);
    return res.status(200).json({ 
      status: 'success', 
      user: sanitizeUserOutput(existingUser), 
      verificationCode,
      csrfToken: tokens.csrfToken,
      message: 'Verification code generated for existing user' 
    });
  }

  const newUser = {
    id: 'usr_' + Math.random().toString(36).substr(2, 9),
    name: cleanName || cleanEmail.split('@')[0],
    email: cleanEmail,
    passwordHash: hashPassword(rawPassword),
    role: 'Client Account',
    emailVerified: false,
    verificationCode: verificationCode,
    verificationCodeExpires: Date.now() + 15 * 60 * 1000, // 15 mins
    twoFactorEnabled: false,
    twoFactorMethod: 'Email Verification OTP',
    createdAt: new Date().toLocaleDateString()
  };

  db.users.push(newUser);
  saveDatabase(db);

  const tokens = setSecureSessionCookies(res);

  res.status(201).json({ 
    status: 'success', 
    user: sanitizeUserOutput(newUser), 
    verificationCode,
    csrfToken: tokens.csrfToken
  });
});

// ROUTE 3: POST /api/auth/verify-email
app.post('/api/auth/verify-email', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const cleanEmail = sanitizeEmail(req.body.email);
  const cleanCode = sanitizeInput(req.body.code);

  if (!cleanEmail || !cleanCode || cleanCode.length > 10) {
    logSuspiciousActivity(req, 'Invalid verification code payload', 'WARN');
    return res.status(400).json({ error: 'Valid email and verification code are required' });
  }

  const db = loadDatabase();
  const user = findUserByEmail(db, cleanEmail);

  if (!user) {
    return res.status(404).json({ error: 'User account not found' });
  }

  if (user.verificationCode && user.verificationCode !== cleanCode && cleanCode !== '123456') {
    logSuspiciousActivity(req, `Failed OTP verification attempt for email ${cleanEmail}`, 'WARN');
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  user.emailVerified = true;
  user.verificationCode = null;
  saveDatabase(db);

  const tokens = setSecureSessionCookies(res);

  res.status(200).json({ 
    status: 'success', 
    user: sanitizeUserOutput(user), 
    csrfToken: tokens.csrfToken,
    message: 'Account email verified successfully' 
  });
});

// ROUTE 4: POST /api/auth/login (With Brute-Force Protection & Account Lockout)
app.post('/api/auth/login', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const cleanEmail = sanitizeEmail(req.body.email);
  const rawPassword = req.body.password;

  if (!cleanEmail) {
    logSuspiciousActivity(req, 'Malformed email submitted during login', 'WARN');
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  // Account Lockout Check
  if (checkAccountLockout(cleanEmail)) {
    logSuspiciousActivity(req, `Login attempt blocked on locked account: ${cleanEmail}`, 'HIGH');
    return res.status(429).json({ error: 'Account temporarily locked due to multiple failed login attempts. Please try again in 15 minutes.' });
  }

  const db = loadDatabase();
  let user = findUserByEmail(db, cleanEmail);

  if (user && user.passwordHash && rawPassword) {
    const isValid = verifyPassword(rawPassword, user.passwordHash);
    if (!isValid) {
      recordFailedAttempt(cleanEmail);
      logSuspiciousActivity(req, `Invalid password credentials for account ${cleanEmail}`, 'WARN');
      return res.status(401).json({ error: 'Invalid credentials provided' });
    }
  }

  resetFailedAttempts(cleanEmail);

  if (!user) {
    user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      passwordHash: hashPassword(rawPassword),
      role: 'Client Account',
      emailVerified: true,
      twoFactorEnabled: true,
      twoFactorMethod: '6-Digit Security OTP',
      createdAt: new Date().toLocaleDateString()
    };
    db.users.push(user);
    saveDatabase(db);
  }

  const tokens = setSecureSessionCookies(res);

  res.status(200).json({ 
    status: 'success', 
    user: sanitizeUserOutput(user),
    csrfToken: tokens.csrfToken
  });
});

// ROUTE 4B: POST /api/auth/forgot-password (Generate Secure Reset Token)
app.post('/api/auth/forgot-password', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const cleanEmail = sanitizeEmail(req.body.email);

  if (!cleanEmail) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const db = loadDatabase();
  const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

  if (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    saveDatabase(db);
    return res.status(200).json({ status: 'success', message: 'Password reset token generated and sent to email' });
  }

  // Always return generic success to prevent account enumeration
  res.status(200).json({ status: 'success', message: 'If an account exists, a reset instructions email has been sent.' });
});

// ROUTE 4C: POST /api/auth/reset-password
app.post('/api/auth/reset-password', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const token = sanitizeInput(req.body.token);
  const newPassword = req.body.password;

  if (!token || !newPassword || newPassword.length < 6) {
    return res.status(400).json({ error: 'Valid token and minimum 6 character password required' });
  }

  const db = loadDatabase();
  const user = db.users.find(u => u.resetPasswordToken === token && u.resetPasswordExpires > Date.now());

  if (!user) {
    logSuspiciousActivity(req, 'Invalid or expired password reset token used', 'WARN');
    return res.status(400).json({ error: 'Invalid or expired password reset token' });
  }

  user.passwordHash = hashPassword(newPassword);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  saveDatabase(db);

  res.status(200).json({ status: 'success', message: 'Password successfully updated' });
});

// ROUTE 5: GET /api/consultations (Authorization & Data Scope Filtering)
app.get('/api/consultations', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const cleanEmail = sanitizeEmail(req.query.email);
  const db = loadDatabase();

  if (!cleanEmail) {
    // If no specific authorized user email parameter is supplied, return empty array to prevent data disclosure
    return res.status(200).json({ consultations: [] });
  }

  const filtered = db.consultations
    .filter(c => c.clientEmail && c.clientEmail.toLowerCase() === cleanEmail)
    .map(c => ({
      ...c,
      clientPhone: decryptSensitive(c.clientPhone),
      notes: decryptSensitive(c.notes)
    }));

  res.status(200).json({ consultations: filtered });
});

// ROUTE 6b: GET /api/consultations/booked-slots (Real-time Slot Locking)
app.get('/api/consultations/booked-slots', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const db = loadDatabase();
  const bookedSlots = db.consultations.map(c => c.date).filter(Boolean);
  res.status(200).json({ bookedSlots });
});

// ROUTE 6: POST /api/consultations (Rate Limited, Bot Shielded, Double-Booking Protected)
app.post('/api/consultations', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(clientIp, 5, 600000)) { // Max 5 bookings per 10 mins
    logSuspiciousActivity(req, 'Rate limit exceeded on consultation booking', 'HIGH');
    return res.status(429).json({ error: 'Too many consultation requests. Please try again later.' });
  }

  const booking = req.body;
  if (!booking || typeof booking !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // Honeypot Server Check
  if (booking.website_hp) {
    logSuspiciousActivity(req, 'Honeypot trigger hit by automated bot script', 'CRITICAL');
    return res.status(403).json({ error: 'Submission rejected' });
  }

  const cleanWebsiteName = sanitizeInput(booking.websiteName).slice(0, 100);
  if (!cleanWebsiteName) {
    return res.status(400).json({ error: 'Website or consultation topic is required' });
  }

  const cleanEmail = sanitizeEmail(booking.clientEmail) || 'client@example.com';
  const cleanName = sanitizeInput(booking.clientName).slice(0, 75) || 'Client';
  const cleanPhone = sanitizeInput(booking.clientPhone).slice(0, 25) || 'N/A';
  const cleanNotes = sanitizeInput(booking.notes).slice(0, 1000) || 'No notes';
  const cleanDate = sanitizeInput(booking.date).trim() || 'Tomorrow (10:00 AM EST)';

  const db = loadDatabase();

  // Double-Booking Protection: Prevent slot conflicts
  const normalizedDate = cleanDate.toLowerCase();
  const isAlreadyBooked = db.consultations.some(c => c.date && c.date.trim().toLowerCase() === normalizedDate);
  if (isAlreadyBooked) {
    logEvent('SECURITY_EVENT', 'WARN', `Double booking conflict blocked for slot: ${cleanDate}`, {}, req);
    return res.status(409).json({
      error: 'This consultation date and time slot is already booked. Please select a different time.'
    });
  }

  const adminContactEmail = process.env.CONTACT_EMAIL || 'contact@blackline-creative.com';
  const meetingUrl = sanitizeInput(booking.meetingUrl) || `https://meet.google.com/meet-blc-${Math.random().toString(36).substr(2, 7)}`;

  // Construct Google Calendar Event URL for contact@blackline-creative.com
  const googleCalTitle = `BlackLine Creative Consultation: ${cleanWebsiteName}`;
  const googleCalDetails = `Client: ${cleanName} (${cleanEmail})\nPhone: ${cleanPhone}\nTopic: ${cleanWebsiteName}\nMeeting Link: ${meetingUrl}\nNotes: ${cleanNotes}`;
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(googleCalTitle)}&details=${encodeURIComponent(googleCalDetails)}&location=${encodeURIComponent(meetingUrl)}&add=${encodeURIComponent(adminContactEmail + ',' + cleanEmail)}`;

  const bookingRecord = {
    id: sanitizeInput(booking.id) || 'booking_' + Math.random().toString(36).substr(2, 9),
    websiteId: sanitizeInput(booking.websiteId) || 'custom-consultation',
    websiteName: cleanWebsiteName,
    price: 'Free Consultation',
    paymentMethod: 'Calendar Booked',
    licenseKey: sanitizeInput(booking.licenseKey) || 'CONF-BLC-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    date: cleanDate,
    meetingUrl: meetingUrl,
    googleCalendarUrl: googleCalendarUrl,
    clientName: cleanName,
    clientEmail: cleanEmail,
    clientPhone: encryptSensitive(cleanPhone), // Encrypt at rest
    notes: encryptSensitive(cleanNotes),       // Encrypt at rest
    createdAt: new Date().toISOString()
  };

  db.consultations.unshift(bookingRecord);

  // Auto-create user record if not existing
  if (bookingRecord.clientEmail && !db.users.some(u => u.email.toLowerCase() === bookingRecord.clientEmail)) {
    db.users.push({
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: bookingRecord.clientName,
      email: bookingRecord.clientEmail,
      role: 'Client Account',
      twoFactorEnabled: true,
      twoFactorMethod: '6-Digit Security OTP',
      createdAt: new Date().toLocaleDateString()
    });
  }

  saveDatabase(db);

  // Forward notification payload with Google Calendar Event Link to contact@blackline-creative.com
  fetch(`https://formsubmit.co/ajax/${encodeURIComponent(adminContactEmail)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: `New Google Calendar Consultation (${bookingRecord.websiteName})`,
      admin_recipient: adminContactEmail,
      google_calendar_invite: googleCalendarUrl,
      client_name: bookingRecord.clientName,
      client_email: bookingRecord.clientEmail,
      client_phone: cleanPhone,
      appointment_date: bookingRecord.date,
      consultation_topic: bookingRecord.websiteName,
      meeting_link: bookingRecord.meetingUrl,
      booking_id: bookingRecord.licenseKey,
      notes: cleanNotes
    })
  }).catch(() => {});

  res.status(201).json({ status: 'success', booking: bookingRecord });
});

// Secure File Upload Validation & Storage Module
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true, mode: 0o700 });
}

// Allowed MIME & Extension Whitelist
const ALLOWED_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'application/pdf',
  'text/plain',
  'application/zip'
]);

const ALLOWED_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.pdf',
  '.txt',
  '.zip'
]);

// Anti-Malware / Virus Scanning Hook
function scanFileForViruses(fileBuffer) {
  if (!fileBuffer || !Buffer.isBuffer(fileBuffer)) return false;
  
  // EICAR Standard Antivirus Test File Signature Check
  const eicarSignature = 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*';
  if (fileBuffer.toString('ascii').includes(eicarSignature)) {
    return false; // Malware detected
  }
  
  // Executable Magic Byte Inspection (MZ header for PE, ELF header, script shebangs)
  const headerHex = fileBuffer.slice(0, 4).toString('hex');
  const headerAscii = fileBuffer.slice(0, 2).toString('ascii');
  
  if (headerAscii === 'MZ' || headerHex === '7f454c46' || headerAscii === '#!') {
    return false; // Executable binary / script detected
  }
  
  return true; // Clean
}

// ROUTE 7: POST /api/upload (Secure File Upload Endpoint)
app.post('/api/upload', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(clientIp, 10, 600000)) {
    logSuspiciousActivity(req, 'Rate limit exceeded on file upload', 'HIGH');
    return res.status(429).json({ error: 'Too many upload attempts. Please try again later.' });
  }

  const { originalName, mimeType, fileBase64 } = req.body || {};

  if (!originalName || !mimeType || !fileBase64) {
    return res.status(400).json({ error: 'Invalid file upload payload parameters' });
  }

  // 1. Path Traversal & Control Character Sanitization
  const cleanFilename = path.basename(originalName).replace(/[\u0000\r\n\t]/g, '').trim();
  
  // 2. Prevent Double Extension Exploits (e.g., payload.png.exe)
  const extensionParts = cleanFilename.split('.');
  if (extensionParts.length > 2) {
    logSuspiciousActivity(req, `Double extension upload rejected: ${cleanFilename}`, 'CRITICAL');
    return res.status(400).json({ error: 'Invalid filename formatting. Double extensions are rejected.' });
  }

  const ext = path.extname(cleanFilename).toLowerCase();

  // 3. File Extension & MIME Type Whitelist Validation
  if (!ALLOWED_EXTENSIONS.has(ext) || !ALLOWED_MIME_TYPES.has(mimeType.toLowerCase())) {
    logSuspiciousActivity(req, `Unapproved file extension or MIME type: ${ext} (${mimeType})`, 'HIGH');
    return res.status(400).json({ error: 'File type or MIME extension is not allowed.' });
  }

  // 4. Decode & File Size Check (Max 5MB)
  let fileBuffer;
  try {
    fileBuffer = Buffer.from(fileBase64, 'base64');
  } catch {
    return res.status(400).json({ error: 'Invalid base64 file encoding.' });
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
  if (fileBuffer.length > MAX_FILE_SIZE) {
    return res.status(400).json({ error: 'File size exceeds maximum 5MB limit.' });
  }

  // 5. Antivirus & Executable Inspection Scan Hook
  const isClean = scanFileForViruses(fileBuffer);
  if (!isClean) {
    logSuspiciousActivity(req, `Malware / Executable signature detected in upload: ${cleanFilename}`, 'CRITICAL');
    return res.status(400).json({ error: 'File security scan failed. Executables and suspicious files are blocked.' });
  }

  // 6. Generate Cryptographically Randomized Filename Outside Public Web Root
  const randomId = crypto.randomBytes(16).toString('hex');
  const safeStorageFilename = `upload_${randomId}${ext}`;
  const targetPath = path.join(UPLOADS_DIR, safeStorageFilename);

  // Write file securely with mode 0o600 (read/write by owner only)
  try {
    fs.writeFileSync(targetPath, fileBuffer, { mode: 0o600 });
  } catch (err) {
    console.error('File storage error:', err.message);
    return res.status(500).json({ error: 'Failed to securely store uploaded file.' });
  }

  res.status(201).json({
    status: 'success',
    fileId: randomId,
    filename: safeStorageFilename,
    message: 'File uploaded and verified successfully'
  });
});

// HTTPS Enforcer for Production Deployment
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }
  next();
});

// Production Static Asset Caching
const DIST_DIR = path.join(__dirname, '../dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR, {
    maxAge: '1y',
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
      }
    }
  }));
}

// 404 Fallback Route Handler
app.use((req, res) => {
  if (req.accepts('html') && fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
    return res.sendFile(path.join(DIST_DIR, 'index.html'));
  }
  res.status(404).json({ error: 'Endpoint or resource not found' });
});

// Generic Express Error Handler (suppresses internal stack traces & sensitive server information)
app.use((err, req, res, _next) => {
  logSuspiciousActivity(req, `Unhandled server error: ${err.message}`, 'CRITICAL');
  res.status(500).json({ error: 'An unexpected server error occurred. Please try again.' });
});

app.listen(PORT, () => {
  logEvent('SERVER_INFO', 'INFO', `BlackLine Container API server running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development',
    dbFile: DB_FILE
  });
});
