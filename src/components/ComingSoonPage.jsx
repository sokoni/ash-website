import React, { useState } from 'react';
import { Sparkles, Code, ArrowRight, ShieldCheck, Mail, CheckCircle2, Clock, Calendar, Zap, MessageSquare } from 'lucide-react';
import BrandLogo from './BrandLogo';

export default function ComingSoonPage({ onBookConsultation }) {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNotifySubmit = (e) => {
    e.preventDefault();
    if (!notifyEmail) return;

    // Send email notification to admin via FormSubmit
    fetch('https://formsubmit.co/ajax/contact@blackline-creative.com', {
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
    <div className="min-h-screen bg-[#0F0F0F] text-[#FFFFFF] flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Brand Glow Orbs */}
      <div className="bg-orb-blue w-[600px] h-[600px] bg-[#FF2ED4]/15 -top-40 -left-40 animate-pulse-glow" />
      <div className="bg-orb-blue w-[700px] h-[700px] bg-[#30BBFF]/15 bottom-0 right-0 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Header Bar */}
      <header className="w-full border-b border-[#9E9E9E]/20 bg-[#0F0F0F]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
          <BrandLogo className="h-10 sm:h-11 w-auto" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Official Launch Coming Soon</span>
          </div>
        </div>
      </header>

      {/* Main Hero Centerpiece */}
      <main className="flex-1 w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 py-16 flex flex-col justify-center items-center text-center space-y-10 relative z-10">
        
        {/* Brand Pill Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#FF2ED4]/30 text-xs font-semibold text-[#F5F5F5] shadow-xl shadow-[#FF2ED4]/10 animate-float">
          <Sparkles className="w-4 h-4 text-[#FFA530] animate-spin" style={{ animationDuration: '6s' }} />
          <span>Bu<span className="pink-i">ı</span>ld Brands That Get Found<span className="text-[#FF2ED4] inline-block animate-pulse">.</span></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF2ED4] animate-ping" />
        </div>

        {/* Main Title */}
        <div className="space-y-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Someth<span className="pink-i">ı</span>ng Exceptional <br />
            <span className="pastel-glow-text">Is Comıng Soon<span className="text-[#FF2ED4] inline-block animate-pulse">.</span></span>
          </h1>

          <p className="text-base sm:text-xl text-[#9E9E9E] max-w-2xl mx-auto leading-relaxed">
            We are currently putting the final touches on our signature web application. In the meantime, our senior web architects are actively accepting early strategy consultations.
          </p>
        </div>

        {/* Interactive Subscription / Notification Form */}
        <div className="w-full max-w-md glass-panel p-6 rounded-3xl border border-[#9E9E9E]/25 bg-[#18181C]/80 space-y-4 shadow-2xl shadow-[#FF2ED4]/10">
          {subscribed ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Thank you! You will be notified the instant we launch.</span>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="space-y-3">
              <label className="text-xs font-bold text-[#FFA530] uppercase tracking-wider block text-left">
                Get Notıfıed Upon Offıcıal Launch
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-[#9E9E9E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={notifyEmail}
                    onChange={(e) => setNotifyEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0F0F0F] border border-[#9E9E9E]/25 text-white placeholder-[#9E9E9E]/60 focus:outline-none focus:border-[#30BBFF] transition-colors text-xs font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-pastel-primary px-6 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Notify Me</span>
                  <ArrowRight className="w-4 h-4 text-[#0F0F0F]" />
                </button>
              </div>
            </form>
          )}

          {/* Action CTAs */}
          <div className="pt-3 border-t border-[#9E9E9E]/20 flex items-center justify-between text-xs text-[#9E9E9E]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#30BBFF]" /> Status: Launch 98% Ready
            </span>
            <button
              onClick={() => onBookConsultation && onBookConsultation({ id: 'coming-soon-consult', name: 'Early Strategy Consultation' })}
              className="text-[#30BBFF] hover:text-white font-bold underline flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Strategy Call</span>
            </button>
          </div>
        </div>

        {/* Core Services Teaser Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl w-full">
          <div className="glass-panel p-4 rounded-2xl border border-[#9E9E9E]/20 text-left space-y-1 bg-[#18181C]/80">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#30BBFF]" /> Brand Strategy
            </div>
            <p className="text-[11px] text-[#9E9E9E]">Audience research & positioning</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#9E9E9E]/20 text-left space-y-1 bg-[#18181C]/80">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Code className="w-4 h-4 text-[#FF2ED4]" /> Website Design
            </div>
            <p className="text-[11px] text-[#9E9E9E]">High-velocity custom builds</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#9E9E9E]/20 text-left space-y-1 bg-[#18181C]/80">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#FFA530]" /> Technical SEO
            </div>
            <p className="text-[11px] text-[#9E9E9E]">Search & AI optimization</p>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#9E9E9E]/20 text-left space-y-1 bg-[#18181C]/80">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Automation
            </div>
            <p className="text-[11px] text-[#9E9E9E]">Lead generation systems</p>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#9E9E9E]/20 py-6 bg-[#0F0F0F] text-center text-xs text-[#9E9E9E]">
        <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} BlackLine Creative. All Rights Reserved. Bu<span className="pink-i">ı</span>ld Brands That Get Found<span className="text-[#FF2ED4] inline-block animate-pulse">.</span>
          </div>
          <div className="flex items-center gap-4 text-[#30BBFF]">
            <a href="mailto:contact@blackline-creative.com" className="hover:underline flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#30BBFF]" />
              <span>contact@blackline-creative.com</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
