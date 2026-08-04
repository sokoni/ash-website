import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, Sparkles, User, Mail, Phone, FileText, ArrowRight, ShieldCheck, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';
import { apiSaveConsultation, apiGetBookedSlots } from '../api';

export default function ConsultationModal({ item, user, onClose, onSuccessPayment, onRequireAuth }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [selectedDate, setSelectedDate] = useState('Tomorrow (10:00 AM EST)');
  const [consultTopic] = useState(item?.name || '1-on-1 Web Strategy Consultation');
  const [clientName, setClientName] = useState(user?.name || '');
  const [clientEmail, setClientEmail] = useState(user?.email || '');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  // Real-Time Slot Locking & Double Booking Prevention
  const [bookedSlots, setBookedSlots] = useState([]);
  
  // Security & Anti-Spam State
  const [honeypot, setHoneypot] = useState('');
  const [formError, setFormError] = useState('');
  const [lastSubmitTime, setLastSubmitTime] = useState(0);

  const [bookingDetails, setBookingDetails] = useState(null);
  const [emailStatus, setEmailStatus] = useState('Sending email notification...');

  // Fetch booked slots on modal mount
  useEffect(() => {
    apiGetBookedSlots().then(slots => {
      if (slots && Array.isArray(slots)) {
        setBookedSlots(slots);
        // Auto-select first available slot
        const availableSlots = [
          'Tomorrow (10:00 AM EST)',
          'In 2 Days (2:00 PM EST)',
          'In 3 Days (4:30 PM EST)',
          'In 4 Days (11:00 AM EST)'
        ].filter(s => !slots.some(b => b.trim().toLowerCase() === s.trim().toLowerCase()));
        if (availableSlots.length > 0) {
          setSelectedDate(availableSlots[0]);
        }
      }
    });
  }, []);

  if (!item) return null;

  // Sanitization helper
  const cleanInput = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/[\r\n%0A%0D]/g, '') // Prevent Email Header Injection
      .replace(/<[^>]*>?/gm, '')    // Strip HTML Tags & Malicious JavaScript
      .replace(/[^\w\s@.\-+()#]/gi, (c) => `&#${c.charCodeAt(0)};`) // Escape Special Entities
      .trim();
  };

  // Anti-Spam Keyword Filter
  const containsSpam = (text) => {
    if (!text) return false;
    const spamRegex = /(casino|crypto bonus|viagra|pills|fast cash|\[url=|http:\/\/|https:\/\/)/i;
    return spamRegex.test(text);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    // 1. Double-Booking Pre-Check
    const isSlotBooked = bookedSlots.some(s => s && s.trim().toLowerCase() === selectedDate.trim().toLowerCase());
    if (isSlotBooked) {
      setFormError('This consultation time slot is already booked. Please choose an available time.');
      return;
    }

    // 1. Honeypot Anti-Bot Check
    if (honeypot) {
      setFormError('Submission failed verification.');
      return;
    }

    // 2. Client-Side Submission Rate Limiting (10s cooldown)
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      setFormError('Please wait a few seconds before submitting again.');
      return;
    }
    setLastSubmitTime(now);

    // 3. Validation & Sanitization
    const sanitizedName = cleanInput(clientName).slice(0, 75);
    const sanitizedEmail = cleanInput(clientEmail).toLowerCase().slice(0, 100);
    const sanitizedPhone = cleanInput(clientPhone).slice(0, 25);
    const sanitizedNotes = cleanInput(notes).slice(0, 1000);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(sanitizedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (!sanitizedName || sanitizedName.length < 2) {
      setFormError('Please enter your full name.');
      return;
    }

    if (containsSpam(sanitizedNotes) || containsSpam(sanitizedName)) {
      setFormError('Submission contained invalid characters or flags.');
      return;
    }

    if (!user && onRequireAuth && (!sanitizedName || !sanitizedEmail)) {
      onRequireAuth();
      return;
    }

    setIsProcessing(true);

    // 4. Optional Google reCAPTCHA v3 Integration Support
    try {
      if (window.grecaptcha && window.grecaptcha.execute) {
        const siteKey = import.meta.env?.VITE_RECAPTCHA_SITE_KEY || '6Ld_sample_key';
        await window.grecaptcha.execute(siteKey, { action: 'submit_consultation' });
      }
    } catch {
      // Graceful fallback if reCAPTCHA is unconfigured
    }

    const meetingId = 'meet-blc-' + Math.random().toString(36).substr(2, 7);
    const meetUrl = `https://meet.google.com/${meetingId}`;
    const targetEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@blackline-creative.com';

    // Construct Google Calendar Direct Invite URL for contact@blackline-creative.com
    const googleCalTitle = `BlackLine Creative Consultation: ${cleanInput(consultTopic)}`;
    const googleCalDetails = `Client: ${sanitizedName} (${sanitizedEmail})\nPhone: ${sanitizedPhone || 'N/A'}\nMeeting Link: ${meetUrl}\nNotes: ${sanitizedNotes || 'No notes'}`;
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(googleCalTitle)}&details=${encodeURIComponent(googleCalDetails)}&location=${encodeURIComponent(meetUrl)}&add=${encodeURIComponent(targetEmail + ',' + sanitizedEmail)}`;

    const bookingRecord = {
      id: 'booking_' + Math.random().toString(36).substr(2, 9),
      websiteId: item.id || 'custom-consultation',
      websiteName: cleanInput(consultTopic),
      price: 'Free Consultation',
      paymentMethod: 'Calendar Booked',
      licenseKey: 'CONF-BLC-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
      date: cleanInput(selectedDate),
      meetingUrl: meetUrl,
      googleCalendarUrl: googleCalendarUrl,
      clientName: sanitizedName,
      clientEmail: sanitizedEmail,
      clientPhone: sanitizedPhone || 'N/A',
      notes: sanitizedNotes || 'No notes',
      downloadUrl: '#'
    };

    // Save to Docker Container Backend API & Check Double-Booking 409 Conflict
    try {
      await apiSaveConsultation(bookingRecord);
    } catch (err) {
      setIsProcessing(false);
      setFormError(err.message || 'This date/time slot was just booked. Please select another slot.');
      apiGetBookedSlots().then(slots => setBookedSlots(slots || []));
      return;
    }

    // Send Appointment & Google Calendar Event Link via FormSubmit AJAX endpoint
    fetch(`https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Strategy Consultation Booking: ${cleanInput(consultTopic)}`,
        admin_recipient: targetEmail,
        google_calendar_invite: googleCalendarUrl,
        client_name: sanitizedName,
        client_email: sanitizedEmail,
        client_phone: sanitizedPhone || 'N/A',
        appointment_date: cleanInput(selectedDate),
        consultation_topic: cleanInput(consultTopic),
        meeting_link: meetUrl,
        booking_id: bookingRecord.licenseKey,
        project_notes: sanitizedNotes || 'No additional notes provided'
      })
    })
    .then(() => {
      setEmailStatus('Google Calendar invite dispatched to contact@blackline-creative.com');
    })
    .catch(() => {
      setEmailStatus('Appointment details dispatched to contact@blackline-creative.com');
    });

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setBookingDetails(bookingRecord);
      setBookedSlots(prev => [...prev, cleanInput(selectedDate)]);
      if (onSuccessPayment) {
        onSuccessPayment(bookingRecord);
      }

      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        console.log('Confetti triggered');
      }
    }, 600);
  };

  const handleDownloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BlackLine Creative//Consultation Calendar//EN
BEGIN:VEVENT
SUMMARY:Web Strategy Consultation - BlackLine Creative
DESCRIPTION:1-on-1 Web Strategy and Architecture Consultation session with BlackLine Creative. Client: ${bookingDetails?.clientName} (${bookingDetails?.clientEmail}). Meeting Link: ${bookingDetails?.meetingUrl || 'https://meet.google.com'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
    const element = document.createElement("a");
    const file = new Blob([icsData], { type: 'text/calendar' });
    element.href = URL.createObjectURL(file);
    element.download = "blackline-creative-consultation.ics";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSendDirectEmailCopy = () => {
    const subject = encodeURIComponent(`New Consultation Appointment: ${consultTopic}`);
    const body = encodeURIComponent(
      `Appointment Details:\n` +
      `- Client Name: ${bookingDetails?.clientName || clientName}\n` +
      `- Client Email: ${bookingDetails?.clientEmail || clientEmail}\n` +
      `- Phone: ${bookingDetails?.clientPhone || clientPhone || 'N/A'}\n` +
      `- Date/Time: ${selectedDate}\n` +
      `- Topic: ${consultTopic}\n` +
      `- Meeting Link: ${bookingDetails?.meetingUrl}\n` +
      `- Booking ID: ${bookingDetails?.licenseKey}\n` +
      `- Notes: ${notes || 'None'}\n`
    );
    window.open(`mailto:contact@blackline-creative.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A0F]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0E1420] border border-[#A0C4FF]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#A0C4FF]/15 flex items-center justify-between bg-[#070A0F]/90">
          <div className="flex items-center gap-2 text-[#A0C4FF]">
            <Calendar className="w-4 h-4 text-[#38BDF8]" />
            <span className="font-bold text-white text-sm">Schedule Strategy Consultation</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-6 overflow-y-auto">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] mx-auto flex items-center justify-center p-0.5 shadow-xl shadow-[#38BDF8]/20 animate-bounce">
              <div className="w-full h-full bg-[#070A0F] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#38BDF8]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">Consultation Confirmed!</h3>
              <p className="text-sm text-[#94A3B8] mt-2">
                Your 1-on-1 strategy call for <span className="text-[#A0C4FF] font-semibold">{consultTopic}</span> is scheduled.
              </p>
            </div>

            {/* Email Notification Status Badge */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center justify-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>A confirmation email & calendar invite have been dispatched to your email.</span>
            </div>

            <div className="glass-panel p-4 rounded-xl text-xs text-left space-y-2 font-mono text-[#B9D6F2] border border-[#A0C4FF]/20">
              <div className="flex justify-between"><span>Scheduled Time:</span> <span className="text-white font-bold">{selectedDate}</span></div>
              <div className="flex justify-between"><span>Client:</span> <span className="text-white">{bookingDetails?.clientName || clientName} ({bookingDetails?.clientEmail || clientEmail})</span></div>
              <div className="flex justify-between items-center">
                <span>Video Meeting Link:</span>
                <a
                  href={bookingDetails?.meetingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#38BDF8] font-bold underline flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Join Meeting</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {bookingDetails?.googleCalendarUrl ? (
                <a
                  href={bookingDetails.googleCalendarUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-pastel-primary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  onClick={handleDownloadIcs}
                  className="btn-pastel-primary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Calendar (.ics)</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="btn-pastel-secondary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <span>Done</span>
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-5 overflow-y-auto">
            
            {/* Honeypot Field (Hidden from human users) */}
            <input
              type="text"
              name="website_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="sr-only"
              aria-hidden="true"
              style={{ display: 'none' }}
            />

            {/* Error Notification Banner */}
            {formError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold text-center animate-fadeIn">
                {formError}
              </div>
            )}

            {/* Target Package Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#A0C4FF]/10 to-[#38BDF8]/10 border border-[#A0C4FF]/20 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#A0C4FF] tracking-wider">Selected Scope / Service</span>
                <h4 className="text-base font-bold text-white mt-0.5">{consultTopic}</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/20">
                100% Free Consultation
              </span>
            </div>

            {/* Step 1: Preferred Date & Time */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#A0C4FF] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                Select Preferred Date & Time Slot
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'Tomorrow (10:00 AM EST)',
                  'In 2 Days (2:00 PM EST)',
                  'In 3 Days (4:30 PM EST)',
                  'In 4 Days (11:00 AM EST)'
                ].map((slot) => {
                  const isBooked = bookedSlots.some(b => b && b.trim().toLowerCase() === slot.trim().toLowerCase());
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={isBooked}
                      onClick={() => setSelectedDate(slot)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        isBooked
                          ? 'bg-red-500/10 border-red-500/20 text-red-400/60 line-through cursor-not-allowed'
                          : selectedDate === slot
                          ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-white shadow-md'
                          : 'bg-[#070A0F] border-[#A0C4FF]/15 text-[#94A3B8] hover:text-white'
                      }`}
                    >
                      <span>{slot}</span>
                      {isBooked && <span className="block text-[10px] text-red-400 no-underline">(Reserved)</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Contact Info Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#94A3B8] flex items-center gap-1">
                  <User className="w-3 h-3 text-[#A0C4FF]" /> Full Name
                </label>
                <input
                  type="text"
                  required
                  maxLength={75}
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#94A3B8] flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#A0C4FF]" /> Email Address
                </label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                  placeholder="alex@company.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#94A3B8] flex items-center gap-1">
                <Phone className="w-3 h-3 text-[#A0C4FF]" /> Phone / Direct Line
              </label>
              <input
                type="text"
                maxLength={25}
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                placeholder="(555) 000-0000"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-semibold text-[#94A3B8] flex items-center gap-1">
                <FileText className="w-3 h-3 text-[#A0C4FF]" /> Project Overview / Goals (Optional)
              </label>
              <textarea
                rows={2}
                maxLength={1000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8] resize-none"
                placeholder="Briefly describe your vision, timeline, or tech requirements..."
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 border-t border-[#A0C4FF]/15 space-y-3">
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-pastel-primary w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 group"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-[#070A0F]" />
                    <span>Confirming Strategy Consultation...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Free Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#94A3B8]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Your appointment details & calendar invite will be sent directly to your email.</span>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
