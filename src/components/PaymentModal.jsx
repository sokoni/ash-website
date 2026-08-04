import React, { useState } from 'react';
import { X, Calendar, Clock, Video, CheckCircle2, Sparkles, User, Mail, Phone, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

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

  const [bookingDetails, setBookingDetails] = useState(null);

  if (!item) return null;

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!user && onRequireAuth && (!clientName || !clientEmail)) {
      onRequireAuth();
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      const meetingId = 'meet-blc-' + Math.random().toString(36).substr(2, 7);
      const meetUrl = `https://meet.google.com/${meetingId}`;

      const bookingRecord = {
        id: 'booking_' + Math.random().toString(36).substr(2, 9),
        websiteId: item.id || 'custom-consultation',
        websiteName: consultTopic,
        price: 'Free Consultation',
        paymentMethod: 'Calendar Booked',
        licenseKey: 'CONF-BLC-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        date: selectedDate,
        meetingUrl: meetUrl,
        downloadUrl: '#'
      };

      setBookingDetails(bookingRecord);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti triggered');
      }

      // Record in User State
      setTimeout(() => {
        onSuccessPayment(bookingRecord);
      }, 1500);

    }, 1800);
  };

  const handleDownloadIcs = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BlackLine Creative//Consultation Calendar//EN
BEGIN:VEVENT
SUMMARY:Web Strategy Consultation - BlackLine Creative
DESCRIPTION:1-on-1 Web Strategy and Architecture Consultation session with BlackLine Creative. Meeting Link: ${bookingDetails?.meetingUrl || 'https://meet.google.com'}
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

            <div className="glass-panel p-4 rounded-xl text-xs text-left space-y-2 font-mono text-[#B9D6F2] border border-[#A0C4FF]/20">
              <div className="flex justify-between"><span>Scheduled Time:</span> <span className="text-white font-bold">{selectedDate}</span></div>
              <div className="flex justify-between"><span>Client:</span> <span className="text-white">{clientName} ({clientEmail})</span></div>
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
              <button
                onClick={handleDownloadIcs}
                className="btn-pastel-primary w-full py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="btn-pastel-secondary w-full py-3 rounded-xl text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-5 overflow-y-auto">
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  'Tomorrow (10:00 AM EST)',
                  'In 2 Days (2:00 PM EST)',
                  'In 3 Days (4:30 PM EST)'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedDate(slot)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                      selectedDate === slot
                        ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-white shadow-md'
                        : 'bg-[#070A0F] border-[#A0C4FF]/15 text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
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
                    <span>Scheduling Consultation Call...</span>
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
                <span>No credit card required. Free video meeting invite instantly generated.</span>
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
