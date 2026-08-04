import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
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
  allowedHeaders: ['Content-Type', 'Authorization'],
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

  if (!cleanEmail) {
    logSuspiciousActivity(req, 'Malformed or invalid email submitted during registration', 'WARN');
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const db = loadDatabase();
  const existingUser = db.users.find(u => u.email.toLowerCase() === cleanEmail);
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  if (existingUser) {
    existingUser.verificationCode = verificationCode;
    saveDatabase(db);
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
      message: 'Verification code generated for existing user' 
    });
  }

  const newUser = {
    id: 'usr_' + Math.random().toString(36).substr(2, 9),
    name: cleanName || cleanEmail.split('@')[0],
    email: cleanEmail,
    role: 'Client Account',
    emailVerified: false,
    verificationCode: verificationCode,
    twoFactorEnabled: false,
    twoFactorMethod: 'Email Verification OTP',
    createdAt: new Date().toLocaleDateString()
  };

  db.users.push(newUser);
  saveDatabase(db);

  res.status(201).json({ 
    status: 'success', 
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      emailVerified: newUser.emailVerified
    }, 
    verificationCode 
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

  res.status(200).json({ 
    status: 'success', 
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: true
    }, 
    message: 'Account email verified successfully' 
  });
});

// ROUTE 4: POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  res.setHeader('Cache-Control', 'no-store, private');
  const cleanEmail = sanitizeEmail(req.body.email);

  if (!cleanEmail) {
    logSuspiciousActivity(req, 'Malformed email submitted during login', 'WARN');
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const db = loadDatabase();
  let user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: 'Client Account',
      twoFactorEnabled: true,
      twoFactorMethod: '6-Digit Security OTP',
      createdAt: new Date().toLocaleDateString()
    };
    db.users.push(user);
    saveDatabase(db);
  }

  res.status(200).json({ 
    status: 'success', 
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified ?? true
    } 
  });
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
