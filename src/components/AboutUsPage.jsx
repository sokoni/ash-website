import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, ArrowRight, Code, Server, Heart, Target } from 'lucide-react';

export default function AboutUsPage({ onBookConsultation }) {
  const stats = [
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Average Core Web Vital', value: '99/100' },
    { label: 'Docker Container Backend', value: 'Port 5001' },
    { label: 'Strategy Calls Delivered', value: '150+' }
  ];

  return (
    <div className="py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/25 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Agency Story & Values</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          About <span className="pastel-glow-text">BlackLine Creative</span>
        </h1>

        <p className="text-base text-[#94A3B8] leading-relaxed">
          We are a full-stack digital web strategy and design agency dedicated to replacing generic templates with custom, high-velocity web applications and containerized backend infrastructure.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="glass-panel p-6 rounded-2xl border border-[#A0C4FF]/20 text-center space-y-1"
          >
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">{stat.value}</div>
            <div className="text-[11px] font-bold text-[#A0C4FF] uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Story & Philosophy Section */}
      <div className="glass-panel max-w-5xl mx-auto p-8 sm:p-10 rounded-3xl border border-[#A0C4FF]/20 space-y-8 bg-gradient-to-b from-[#0E1420] to-[#070A0F]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              <Target className="w-4 h-4" /> Our Mission
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Crafting Software That Demands Attention & Drives Growth
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              BlackLine Creative was founded on a simple principle: modern web software should never compromise between visual beauty, extreme speed, and containerized backend stability.
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We work 1-on-1 with founders, product leaders, and businesses to architect custom frontend experiences and deploy robust Docker REST API backends.
            </p>
          </div>

          <div className="space-y-4 glass-panel p-6 rounded-2xl border border-[#A0C4FF]/15 bg-[#070A0F]/80">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Core Agency Guarantees
            </h3>
            <ul className="space-y-3 text-xs text-[#94A3B8]">
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>No Generic Placeholders:</strong> Every line of CSS and JavaScript is custom-tuned.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Containerized Security:</strong> Docker backend API isolation for user data and bookings.</span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Direct Senior Access:</strong> Work directly with our lead architects during 1-on-1 calls.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Footer Banner */}
        <div className="pt-6 border-t border-[#A0C4FF]/15 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Let's Build Something Exceptional Together</h3>
          <p className="text-xs text-[#94A3B8] max-w-xl mx-auto">
            Book a complimentary 1-on-1 Strategy Consultation to discuss your vision, review technical requirements, and receive a custom roadmap.
          </p>
          <button
            onClick={() => onBookConsultation && onBookConsultation({ id: 'about-consult', name: '1-on-1 Strategy Consultation' })}
            className="btn-pastel-primary px-8 py-3.5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#070A0F]" />
            <span>Book Free Strategy Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
