import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ContactSection({ onBookConsultation }) {
  return (
    <section id="contact" className="py-16 max-w-5xl mx-auto px-4">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#A0C4FF]/25 bg-gradient-to-br from-[#0E1420] via-[#141C2E] to-[#070A0F] text-center space-y-6 relative overflow-hidden shadow-2xl shadow-[#38BDF8]/10">
        
        {/* Pastel Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/30 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Get In Touch</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <span className="pastel-glow-text">People Remember.</span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
          Whether you're launching a startup, modernizing your business, or looking to dominate search, BlackLine Creative is ready to help.
        </p>

        {/* Primary CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onBookConsultation && onBookConsultation({ id: 'contact-project', name: 'Start My Project Consultation' })}
            className="btn-pastel-primary px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-3 group shadow-xl shadow-[#38BDF8]/20"
          >
            <Sparkles className="w-4 h-4 text-[#070A0F]" />
            <span>Start My Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-[#94A3B8] pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>1-on-1 Strategy Session • Zero Obligation Consultation</span>
        </div>

      </div>
    </section>
  );
}
