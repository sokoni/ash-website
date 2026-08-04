import React from 'react';
import { Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

export default function ContactSection({ onBookConsultation }) {
  return (
    <section id="contact" className="py-16 w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#9E9E9E]/25 bg-gradient-to-br from-[#18181C] via-[#222228] to-[#0F0F0F] text-center space-y-6 relative overflow-hidden shadow-2xl shadow-[#FF2ED4]/10">
        
        {/* Palette Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2ED4]/10 border border-[#FF2ED4]/30 text-[#F5F5F5] text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-[#30BBFF]" />
          <span>Get In Touch</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let's Build Something <br />
          <span className="pastel-glow-text">People Remember.</span>
        </h2>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#9E9E9E] max-w-2xl mx-auto leading-relaxed">
          Whether you're launching a startup, modernizing your business, or looking to dominate search, BlackLine Creative is ready to help.
        </p>

        {/* Primary CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onBookConsultation && onBookConsultation({ id: 'contact-project', name: 'Start My Project Consultation' })}
            className="btn-pastel-primary px-8 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-3 group shadow-xl shadow-[#FF2ED4]/20"
          >
            <Sparkles className="w-4 h-4 text-[#0F0F0F]" />
            <span>Start My Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-[#9E9E9E] pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>1-on-1 Strategy Session • Zero Obligation Consultation</span>
        </div>

      </div>
    </section>
  );
}
