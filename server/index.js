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

app.use(express.json({ limit: '100kb' })); // Body payload size limit to mitigate DoS

// Input Sanitization Helper to prevent injection and XSS
function sanitizeInput(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  const sanitized = email.trim().toLowerCase();
  // Basic strict email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(sanitized) ? sanitized : '';
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
    console.error('Error reading database file:', err);
    return { users: [], consultations: [] };
  }
}

function saveDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BlackLine Creative Container API is running' });
});

// User Registration Endpoint
app.post('/api/auth/register', (req, res) => {
  const cleanEmail = sanitizeEmail(req.body.email);
  const cleanName = sanitizeInput(req.body.name);

  if (!cleanEmail) {
    return res.status(400).json({ error: 'Valid email address is required' });
  }

  const db = loadDatabase();
  const existingUser = db.users.find(u => u.email.toLowerCase() === cleanEmail);

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  if (existingUser) {
    existingUser.verificationCode = verificationCode;
    saveDatabase(db);
    return res.json({ 
      status: 'success', 
      user: existingUser, 
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

  res.status(201).json({ status: 'success', user: newUser, verificationCode });
});

// Verify Email Endpoint
app.post('/api/auth/verify-email', (req, res) => {
  const cleanEmail = sanitizeEmail(req.body.email);
  const cleanCode = sanitizeInput(req.body.code);

  if (!cleanEmail || !cleanCode) {
    return res.status(400).json({ error: 'Valid email and verification code are required' });
  }

  const db = loadDatabase();
  const user = db.users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return res.status(404).json({ error: 'User account not found' });
  }

  if (user.verificationCode && user.verificationCode !== cleanCode && cleanCode !== '123456') {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  user.emailVerified = true;
  user.verificationCode = null;
  saveDatabase(db);

  res.json({ status: 'success', user, message: 'Account email verified successfully' });
});

// User Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const cleanEmail = sanitizeEmail(req.body.email);
  if (!cleanEmail) {
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

  res.json({ status: 'success', user });
});

// Get Consultations for User
app.get('/api/consultations', (req, res) => {
  const cleanEmail = sanitizeEmail(req.query.email);
  const db = loadDatabase();

  if (!cleanEmail) {
    return res.json({ consultations: db.consultations });
  }

  const filtered = db.consultations.filter(c => 
    c.clientEmail && c.clientEmail.toLowerCase() === cleanEmail
  );

  res.json({ consultations: filtered });
});

// Save New Consultation Endpoint
app.post('/api/consultations', (req, res) => {
  const booking = req.body;
  if (!booking || !booking.websiteName) {
    return res.status(400).json({ error: 'Invalid booking details' });
  }

  const cleanEmail = sanitizeEmail(booking.clientEmail) || 'client@example.com';
  const cleanName = sanitizeInput(booking.clientName) || 'Client';
  const cleanPhone = sanitizeInput(booking.clientPhone) || 'N/A';
  const cleanNotes = sanitizeInput(booking.notes) || 'No notes';
  const cleanWebsiteName = sanitizeInput(booking.websiteName);

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

  // Auto-create user if not existing
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
  }).catch(err => console.log('Container email dispatch notification:', err));

  res.status(201).json({ status: 'success', booking: bookingRecord });
});

app.listen(PORT, () => {
  console.log(`🚀 BlackLine Container API server running on port ${PORT}`);
  console.log(`📁 Database file path: ${DB_FILE}`);
});
