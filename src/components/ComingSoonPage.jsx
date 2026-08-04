import React, { useState } from 'react';
import { Sparkles, Code, ArrowRight, ShieldCheck, Mail, CheckCircle2, Clock, Calendar, Zap, MessageSquare } from 'lucide-react';

export default function ComingSoonPage({ onBookConsultation }) {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!notifyEmail) return;

    // Send email notification to admin via FormSubmit
    fetch('https://formsubmit.co/ajax/babbztest@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: `New Coming Soon Launch Subscriber: ${notifyEmail}`,
        email: notifyEmail,
        timestamp: new Date().toLocaleString()
      })
    }).catch(() => {});

    setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-[#070A0F] text-[#F0F6FC] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Pastel Blue Ambient Glow Orbs */}
      <div className="bg-orb-blue w-[600px] h-[600px] bg-[#38BDF8]/15 -top-40 -left-40 animate-pulse-glow" />
      <div className="bg-orb-blue w-[700px] h-[700px] bg-[#A0C4FF]/10 bottom-0 right-0 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Header Bar */}
      <header className="w-full border-b border-[#A0C4FF]/15 bg-[#070A0F]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-lg shadow-[#38BDF8]/20">
              <div className="w-full h-full bg-[#070A0F] rounded-[10px] flex items-center justify-center">
                <Code className="w-5 h-5 text-[#A0C4FF]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-white">BlackLine <span className="pastel-glow-text">Creative</span></span>
              <span className="text-[11px] text-[#94A3B8] font-medium tracking-wide">Web Strategy & Custom Design Agency</span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Official Launch Coming Soon</span>
          </div>
        </div>
      </header>

      {/* Main Hero Centerpiece */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-16 flex flex-col justify-center items-center text-center space-y-10 relative z-10">
        
        {/* Pastel Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#A0C4FF]/30 text-xs font-bold text-[#B9D6F2] shadow-xl shadow-[#A0C4FF]/5 animate-float">
          <Sparkles className="w-4 h-4 text-[#38BDF8] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Build Brands That Get Found.</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
        </div>

        {/* Main Title */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Something Exceptional <br />
            <span className="pastel-glow-text">Is Coming Soon.</span>
          </h1>

          <p className="text-base sm:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            We are currently putting the final touches on our signature web application. In the meantime, our senior web architects are actively accepting early strategy consultations.
          </p>
        </div>

        {/* Interactive Subscription / Notification Form */}
        <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-[#A0C4FF]/25 bg-[#0E1420]/80 space-y-4 shadow-2xl">
          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you! You will be notified the instant we launch.</span>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="space-y-3">
              <label className="text-xs font-bold text-[#A0C4FF] uppercase tracking-wider block text-left">
                Get Notified Upon Official Launch
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#38BDF8] transition-colors text-xs font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-pastel-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Notify Me</span>
                  <ArrowRight className="w-4 h-4 text-[#070A0F]" />
                </button>
              </div>
            </form>
          )}

          {/* Action CTAs */}
          <div className="pt-3 border-t border-[#A0C4FF]/15 flex items-center justify-between text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#38BDF8]" /> Status: Launch 98% Ready
            </span>
            <button
              onClick={() => onBookConsultation && onBookConsultation({ id: 'coming-soon-consult', name: 'Early Strategy Consultation' })}
              className="text-[#A0C4FF] hover:text-white font-bold underline flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>

        {/* Core Services Teaser Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full">
          <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/15 text-left space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#38BDF8]" /> Brand Strategy
            </div>
            <p className="text-[11px] text-[#94A3B8]">Audience research & positioning</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/15 text-left space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#A0C4FF]" /> Website Design
            </div>
            <p className="text-[11px] text-[#94A3B8]">High-velocity custom builds</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/15 text-left space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#38BDF8]" /> Technical SEO
            </div>
            <p className="text-[11px] text-[#94A3B8]">Search & AI optimization</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/15 text-left space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Automation
            </div>
            <p className="text-[11px] text-[#94A3B8]">Lead generation systems</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#A0C4FF]/10 py-6 bg-[#070A0F] text-center text-xs text-[#94A3B8]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} BlackLine Creative. All Rights Reserved. Build Brands That Get Found.
          </div>
          <div className="flex items-center gap-4 text-[#A0C4FF]">
            <a href="mailto:babbztest@gmail.com" className="hover:underline flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Direct Inquiries</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
