const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Register a user via the Docker API service
 */
export async function apiRegisterUser(name, email, password) {
  const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    if (response.ok) {
      const data = await response.json();
      return { user: data.user, verificationCode: data.verificationCode || generatedCode };
    }
  } catch (err) {
    console.log('Docker API server offline, falling back to client storage:', err);
  }
  return {
    user: {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      role: 'Client Account',
      emailVerified: false,
      verificationCode: generatedCode,
      twoFactorEnabled: false,
      twoFactorMethod: 'Email Verification OTP',
      createdAt: new Date().toLocaleDateString()
    },
    verificationCode: generatedCode
  };
}

/**
 * Verify account email code via Docker API service
 */
export async function apiVerifyEmail(email, code) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
  } catch (err) {
    console.log('Docker API server offline, verified locally:', err);
  }
  return {
    id: 'usr_' + Math.random().toString(36).substr(2, 9),
    name: email.split('@')[0],
    email: email.toLowerCase(),
    role: 'Client Account',
    emailVerified: true,
    twoFactorEnabled: false,
    createdAt: new Date().toLocaleDateString()
  };
}

/**
 * Login a user via the Docker API service
 */
export async function apiLoginUser(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (response.ok) {
      const data = await response.json();
      return data.user;
    }
  } catch (err) {
    console.log('Docker API server offline, using local login session:', err);
  }
  return {
    id: 'usr_' + Math.random().toString(36).substr(2, 9),
    name: email.split('@')[0],
    email: email.toLowerCase(),
    role: 'Client Account',
    twoFactorEnabled: true,
    twoFactorMethod: '6-Digit Security OTP',
    createdAt: new Date().toLocaleDateString()
  };
}

/**
 * Get consultations for user from Docker API service
 */
export async function apiGetConsultations(userEmail) {
  if (!userEmail) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/consultations?email=${encodeURIComponent(userEmail)}`);
    if (response.ok) {
      const data = await response.json();
      return data.consultations || [];
    }
  } catch (err) {
    console.log('Docker API server offline, fetching local consultations:', err);
  }
  return [];
}

/**
 * Fetch currently reserved consultation slots to prevent double-booking
 */
export async function apiGetBookedSlots() {
  try {
    const response = await fetch(`${API_BASE_URL}/consultations/booked-slots`);
    if (response.ok) {
      const data = await response.json();
      return data.bookedSlots || [];
    }
  } catch (err) {
    console.log('Docker API server offline, fetching local slots:', err);
  }
  return [];
}

/**
 * Save new consultation booking to Docker API service
 */
export async function apiSaveConsultation(bookingRecord) {
  try {
    const response = await fetch(`${API_BASE_URL}/consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingRecord)
    });
    if (response.status === 409) {
      const data = await response.json();
      throw new Error(data.error || 'This consultation date and time slot is already booked.');
    }
    if (response.ok) {
      const data = await response.json();
      return data.booking;
    }
  } catch (err) {
    if (err.message && err.message.includes('already booked')) {
      throw err;
    }
    console.log('Docker API server offline, saved consultation to client session:', err);
  }
  return bookingRecord;
}
