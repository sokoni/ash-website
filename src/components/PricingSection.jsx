import React from 'react';
import { Check, Sparkles, Calendar, UserCheck, ShieldCheck, Video, Clock } from 'lucide-react';
import { CONSULTATION_PACKAGES, CONSULTATION_TYPES } from '../data/websitesData';

export default function PricingSection({ onSelectTier, onSelectPaymentMethod }) {
  return (
    <section id="pricing" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/30 text-xs font-bold text-[#A0C4FF]">
          <Sparkles className="w-4 h-4 text-[#38BDF8]" />
          <span>Consultation & Engagement Models</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Strategy Consultations & <br />
          <span className="pastel-glow-text">Custom Service Options</span>
        </h2>
        <p className="text-[#94A3B8] text-base leading-relaxed">
          Book a 1-on-1 strategy call with senior software architects. Choose the engagement level that fits your goals.
        </p>
      </div>

      {/* Consultation Options Bar */}
      <div className="mb-16 glass-panel p-6 rounded-2xl border border-[#A0C4FF]/20 bg-gradient-to-r from-[#0E1420] via-[#121A2B] to-[#0E1420]">
        <div className="text-center mb-6">
          <h3 className="text-sm font-extrabold uppercase tracking-widest text-[#A0C4FF]">
            Available Consultation Formats
          </h3>
          <p className="text-xs text-[#94A3B8] mt-1">Select a consultation format to book immediately</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONSULTATION_TYPES.map((type) => (
            <div
              key={type.id}
              onClick={() => onSelectPaymentMethod(type.id)}
              className="glass-panel glass-panel-hover p-5 rounded-xl border border-[#A0C4FF]/15 flex items-start gap-4 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A0C4FF]/20 to-[#38BDF8]/20 border border-[#A0C4FF]/30 flex items-center justify-center text-[#A0C4FF] shrink-0 group-hover:scale-110 transition-transform">
                {type.id === 'strategy-call' && <Video className="w-6 h-6 text-[#38BDF8]" />}
                {type.id === 'custom-build-consult' && <UserCheck className="w-6 h-6 text-[#A0C4FF]" />}
                {type.id === 'code-audit-consult' && <ShieldCheck className="w-6 h-6 text-[#64DFDF]" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm group-hover:text-[#A0C4FF] transition-colors">
                    {type.name}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#A0C4FF]/10 text-[#A0C4FF] border border-[#A0C4FF]/20">
                    {type.fee}
                  </span>
                </div>
                <p className="text-xs text-[#94A3B8] mt-1">{type.subtext}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Packages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {CONSULTATION_PACKAGES.map((tier) => (
          <div
            key={tier.id}
            className={`glass-panel rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
              tier.recommended
                ? 'border-[#38BDF8] bg-gradient-to-b from-[#141C2E] to-[#0E1420] shadow-2xl shadow-[#38BDF8]/15 scale-105 z-10'
                : 'border-[#A0C4FF]/15 bg-[#0E1420]/80 hover:border-[#A0C4FF]/30'
            }`}
          >
            {tier.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#A0C4FF] to-[#38BDF8] text-[#070A0F] font-extrabold text-xs tracking-wide shadow-md">
                {tier.badgeText}
              </div>
            )}

            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                  <span className="text-xs text-[#A0C4FF] font-medium">{tier.badgeText}</span>
                </div>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                {tier.description}
              </p>

              <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-[#A0C4FF]/15">
                <span className="text-4xl sm:text-5xl font-extrabold text-white">{tier.price}</span>
                <span className="text-xs text-[#94A3B8] font-medium">/ {tier.period}</span>
              </div>

              {/* Feature Checklist */}
              <ul className="space-y-3 mb-8">
                {tier.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-[#E2EEFF]">
                    <div className="w-5 h-5 rounded-full bg-[#A0C4FF]/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#38BDF8]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => onSelectTier(tier)}
              className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                tier.recommended
                  ? 'btn-pastel-primary'
                  : 'btn-pastel-secondary'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{tier.ctaText}</span>
            </button>
          </div>
        ))}
      </div>

      {/* Guarantee Footer Banner */}
      <div className="mt-16 text-center glass-panel p-6 rounded-2xl border border-[#A0C4FF]/15 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
        <ShieldCheck className="w-8 h-8 text-[#38BDF8] shrink-0" />
        <div className="text-left text-xs">
          <div className="font-bold text-white text-sm">BlackLine Consultation Guarantee</div>
          <p className="text-[#94A3B8]">Every strategy session is conducted by senior software architects with zero sales pressure and actionable technical recommendations.</p>
        </div>
      </div>

    </section>
  );
}
