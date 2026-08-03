import React, { useState } from 'react';
import { Calendar, Video, Download, ShieldCheck, Layers, Sparkles, Lock, Clock, ArrowRight } from 'lucide-react';

export default function UserDashboard({ user, purchases, onSelectMarketplace }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.twoFactorEnabled ?? true);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const backupCodes = [
    'BLC-2FA-9821-4401',
    'BLC-2FA-1092-8832',
    'BLC-2FA-7714-3091',
    'BLC-2FA-5520-1184'
  ];

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadBrief = (item) => {
    setDownloadingId(item.id);
    
    // Generate Strategy Brief & Calendar Invite download
    setTimeout(() => {
      const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BlackLine Creative//Consultation Calendar//EN
BEGIN:VEVENT
SUMMARY:${item.websiteName} - Strategy Session
DESCRIPTION:Web Strategy Consultation with BlackLine Creative. Meeting Link: ${item.meetingUrl || 'https://meet.google.com'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
      const element = document.createElement("a");
      const file = new Blob([icsData], { type: 'text/calendar' });
      element.href = URL.createObjectURL(file);
      element.download = `${item.websiteName.toLowerCase().replace(/\s+/g, '-')}-consultation.ics`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setDownloadingId(null);
    }, 1000);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Client Account & Security Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/25 bg-gradient-to-r from-[#0E1420] via-[#141C2E] to-[#0E1420] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-xl shadow-[#38BDF8]/20 shrink-0">
              <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center text-white font-extrabold text-2xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{user?.name || 'Client Portal'}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A0C4FF]/15 text-[#A0C4FF] border border-[#A0C4FF]/30">
                  Verified Client Account
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">{user?.email}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#A0C4FF] font-mono mt-2">
                <span>Member Since: {user?.createdAt || '2026'}</span>
                <span>•</span>
                <span>Scheduled Consultations: {purchases.length}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>2FA Security Enabled</span>
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/15 space-y-2 text-xs">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[#94A3B8]">2-Step Account Protection:</span>
              <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase ${
                is2FAEnabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                {is2FAEnabled ? 'Protected' : 'Disabled'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#A0C4FF]/10">
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="text-[#A0C4FF] hover:underline text-[11px] font-semibold"
              >
                {showBackupCodes ? 'Hide Recovery Keys' : 'View 2FA Backup Keys'}
              </button>
            </div>
          </div>

        </div>

        {/* 2FA Backup Security Codes Drawer */}
        {showBackupCodes && (
          <div className="mt-6 p-4 bg-[#070A0F] rounded-xl border border-[#A0C4FF]/15 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
                Emergency 2-Step Recovery Codes
              </span>
              <span>Use if you lose access to your email/authenticator</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-[#38BDF8]">
              {backupCodes.map((code, idx) => (
                <div key={idx} className="p-2 bg-[#0E1420] rounded-lg border border-[#A0C4FF]/10 text-center font-bold">
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: My Scheduled Consultations */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#38BDF8]" />
              <span>My Scheduled Consultations & Strategy Briefs</span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Access scheduled 1-on-1 video call links and download calendar invites.
            </p>
          </div>

          <button
            onClick={onSelectMarketplace}
            className="btn-pastel-secondary px-4 py-2 rounded-xl text-xs font-bold"
          >
            + Book Another Consultation
          </button>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-[#A0C4FF]/15 space-y-4">
            <Calendar className="w-12 h-12 text-[#A0C4FF]/40 mx-auto" />
            <h4 className="text-lg font-bold text-white">No scheduled consultations yet</h4>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              Schedule a 100% free strategy session with senior web architects at BlackLine Creative.
            </p>
            <button
              onClick={onSelectMarketplace}
              className="btn-pastel-primary px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              Book Free Strategy Consultation
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchases.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl border border-[#A0C4FF]/20 flex flex-col justify-between space-y-4 bg-[#0E1420]/90"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                        Confirmed Session
                      </span>
                      <h4 className="text-lg font-bold text-white mt-2">{item.websiteName}</h4>
                      <p className="text-xs text-[#94A3B8] flex items-center gap-1.5 mt-1">
                        <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Scheduled for {item.date}</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400">100% Free</span>
                    </div>
                  </div>

                  {/* Confirmation Code Box */}
                  <div className="mt-4 p-3 bg-[#070A0F] rounded-xl border border-[#A0C4FF]/15 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-[#94A3B8] uppercase tracking-wider font-semibold block">Consultation Booking ID</span>
                      <span className="font-mono text-xs text-[#38BDF8] font-bold">{item.licenseKey}</span>
                    </div>
                    <button
                      onClick={() => handleCopyKey(item.licenseKey)}
                      className="px-3 py-1 rounded-lg bg-[#A0C4FF]/10 text-[#A0C4FF] hover:bg-[#A0C4FF]/20 text-[11px] font-semibold border border-[#A0C4FF]/20"
                    >
                      {copiedKey === item.licenseKey ? 'Copied!' : 'Copy ID'}
                    </button>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-[#A0C4FF]/15 flex items-center gap-3">
                  <a
                    href={item.meetingUrl || 'https://meet.google.com'}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-pastel-primary flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    <span>Join Video Call</span>
                  </a>

                  <button
                    onClick={() => handleDownloadBrief(item)}
                    disabled={downloadingId === item.id}
                    className="btn-pastel-secondary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    title="Download Calendar Invite (.ics)"
                  >
                    <Download className="w-4 h-4" />
                    <span>.ICS Calendar</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
