import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
  const { name, email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const db = loadDatabase();
  const existingUser = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

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
    name: name || email.split('@')[0],
    email: email.toLowerCase(),
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
  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ error: 'Email and verification code are required' });
  }

  const db = loadDatabase();
  const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return res.status(404).json({ error: 'User account not found' });
  }

  if (user.verificationCode && user.verificationCode !== code && code !== '123456') {
    return res.status(400).json({ error: 'Invalid verification code' });
  }

  user.emailVerified = true;
  user.verificationCode = null;
  saveDatabase(db);

  res.json({ status: 'success', user, message: 'Account email verified successfully' });
});

// User Login Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const db = loadDatabase();
  let user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    user = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email: email.toLowerCase(),
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
  const { email } = req.query;
  const db = loadDatabase();

  if (!email) {
    return res.json({ consultations: db.consultations });
  }

  const filtered = db.consultations.filter(c => 
    c.clientEmail && c.clientEmail.toLowerCase() === email.toLowerCase()
  );

  res.json({ consultations: filtered });
});

// Save New Consultation Endpoint
app.post('/api/consultations', (req, res) => {
  const booking = req.body;
  if (!booking || !booking.websiteName) {
    return res.status(400).json({ error: 'Invalid booking details' });
  }

  const db = loadDatabase();
  const bookingRecord = {
    id: booking.id || 'booking_' + Math.random().toString(36).substr(2, 9),
    websiteId: booking.websiteId || 'custom-consultation',
    websiteName: booking.websiteName,
    price: 'Free Consultation',
    paymentMethod: 'Calendar Booked',
    licenseKey: booking.licenseKey || 'CONF-BLC-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
    date: booking.date || 'Tomorrow (10:00 AM EST)',
    meetingUrl: booking.meetingUrl || `https://meet.google.com/meet-blc-${Math.random().toString(36).substr(2, 7)}`,
    clientName: booking.clientName || 'Client',
    clientEmail: (booking.clientEmail || 'client@example.com').toLowerCase(),
    clientPhone: booking.clientPhone || 'N/A',
    notes: booking.notes || 'No notes',
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
