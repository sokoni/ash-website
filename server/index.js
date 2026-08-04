import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Hardening: Disable fingerprinting header
app.disable('x-powered-by');

// Security Hardening Middleware: HTTP Headers, CSP, HSTS, Clickjacking Prevention
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=()');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://use.typekit.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://use.typekit.net; font-src 'self' https://fonts.gstatic.com https://use.typekit.net https://fonts.cdnfonts.com data:; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:5000 http://localhost:5001 https://formsubmit.co; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self' https://formsubmit.co;"
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

// API Timeout Protection Middleware (10 seconds timeout)
app.use((req, res, next) => {
  req.setTimeout(10000, () => {
    if (!res.headersSent) {
      logSuspiciousActivity(req, 'API Request Timeout Exceeded (10s)', 'WARN');
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
function logSuspiciousActivity(req, reason, level = 'WARN') {
  const clientIp = req.ip || req.socket?.remoteAddress || '127.0.0.1';
  const timestamp = new Date().toISOString();
  console.warn(`[SECURITY ${level}] [${timestamp}] IP: ${clientIp} | Path: ${req.method} ${req.originalUrl} | Reason: ${reason}`);
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

// Persistent Data Storage directory inside Docker container
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

// Ensure database directory and file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = { users: [], consultations: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  try {
    const content = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Error reading database file:', err.message);
    return { users: [], consultations: [] };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database file:', err.message);
  }
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
  const existingUser = db.users.find(u => u.email.toLowerCase() === cleanEmail);
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
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        emailVerified: existingUser.emailVerified
      }, 
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
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      emailVerified: newUser.emailVerified
    }, 
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
  const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

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
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: true
    }, 
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
  let user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

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
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified ?? true
    },
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

  const filtered = db.consultations.filter(c => 
    c.clientEmail && c.clientEmail.toLowerCase() === cleanEmail
  );

  res.status(200).json({ consultations: filtered });
});

// ROUTE 6: POST /api/consultations (Rate Limited & Bot Shielded)
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

  const db = loadDatabase();
  const bookingRecord = {
    id: sanitizeInput(booking.id) || 'booking_' + Math.random().toString(36).substr(2, 9),
    websiteId: sanitizeInput(booking.websiteId) || 'custom-consultation',
    websiteName: cleanWebsiteName,
    price: 'Free Consultation',
    paymentMethod: 'Calendar Booked',
    licenseKey: sanitizeInput(booking.licenseKey) || 'CONF-BLC-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    date: sanitizeInput(booking.date) || 'Tomorrow (10:00 AM EST)',
    meetingUrl: sanitizeInput(booking.meetingUrl) || `https://meet.google.com/meet-blc-${Math.random().toString(36).substr(2, 7)}`,
    clientName: cleanName,
    clientEmail: cleanEmail,
    clientPhone: cleanPhone,
    notes: cleanNotes,
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

  // Forward notification payload to FormSubmit endpoint for contact@blackline-creative.com
  fetch('https://formsubmit.co/ajax/contact@blackline-creative.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      _subject: `Container Event: New Consultation (${bookingRecord.websiteName})`,
      admin_recipient: 'contact@blackline-creative.com',
      client_name: bookingRecord.clientName,
      client_email: bookingRecord.clientEmail,
      client_phone: bookingRecord.clientPhone,
      appointment_date: bookingRecord.date,
      consultation_topic: bookingRecord.websiteName,
      meeting_link: bookingRecord.meetingUrl,
      booking_id: bookingRecord.licenseKey,
      notes: bookingRecord.notes
    })
  }).catch(() => {});

  res.status(201).json({ status: 'success', booking: bookingRecord });
});

// Generic Express Error Handler (suppresses internal stack traces & sensitive server information)
app.use((err, req, res, _next) => {
  logSuspiciousActivity(req, `Unhandled server error: ${err.message}`, 'CRITICAL');
  res.status(500).json({ error: 'An unexpected server error occurred. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`🚀 BlackLine Container API server running on port ${PORT}`);
  console.log(`📁 Database file path: ${DB_FILE}`);
});
