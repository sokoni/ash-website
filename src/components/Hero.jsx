import React from 'react';
import { ArrowRight, Calendar, UserCheck, ShieldCheck, Zap, Sparkles, MessageSquare, Video } from 'lucide-react';

export default function Hero({ onExplore, onViewPricing, onBookConsultation }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#9E9E9E]/20">
      {/* BlackLine Creative Ambient Glow Orbs */}
      <div className="bg-orb-blue w-[500px] h-[500px] bg-[#FF2ED4]/15 -top-32 -left-32 animate-pulse-glow" />
      <div className="bg-orb-blue w-[600px] h-[600px] bg-[#30BBFF]/15 top-10 right-0 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Palette Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#FF2ED4]/30 text-xs font-semibold text-[#F5F5F5] shadow-xl shadow-[#FF2ED4]/10 animate-float">
            <Sparkles className="w-4 h-4 text-[#FFA530] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Strategy. Websites. Search. Growth.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2ED4] animate-ping" />
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Build Brands <br />
            <span className="pastel-glow-text">That Get Found.</span>
          </h1>

          {/* Subtitle / Description */}
          <p className="text-lg sm:text-xl text-[#9E9E9E] max-w-2xl mx-auto leading-relaxed">
            Helping ambitious brands build digital experiences that people remember and search engines understand.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onBookConsultation}
              className="btn-pastel-primary w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-3 group"
            >
              <Calendar className="w-5 h-5 text-[#0F0F0F]" />
              <span>Book Strategy Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewPricing}
              className="btn-pastel-secondary w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold flex items-center justify-center gap-2"
            >
              <UserCheck className="w-5 h-5 text-[#30BBFF]" />
              <span>Explore Engagement Packages</span>
            </button>
          </div>

          {/* Feature Badges Grid */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-[#9E9E9E]/20">
              <div className="w-10 h-10 rounded-xl bg-[#FF2ED4]/10 flex items-center justify-center text-[#FF2ED4] shrink-0">
                <Video className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Brand Strategy</div>
                <div className="text-xs text-[#9E9E9E]">Positioning & Design</div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-[#9E9E9E]/20">
              <div className="w-10 h-10 rounded-xl bg-[#30BBFF]/10 flex items-center justify-center text-[#30BBFF] shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Web Development</div>
                <div className="text-xs text-[#9E9E9E]">High-Velocity Platforms</div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-[#9E9E9E]/20">
              <div className="w-10 h-10 rounded-xl bg-[#FFA530]/10 flex items-center justify-center text-[#FFA530] shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Technical & Local SEO</div>
                <div className="text-xs text-[#9E9E9E]">AI Search Optimization</div>
              </div>
            </div>

            <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 border border-[#9E9E9E]/20">
              <div className="w-10 h-10 rounded-xl bg-[#FF2ED4]/10 flex items-center justify-center text-[#FF2ED4] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-white">Lead Generation</div>
                <div className="text-xs text-[#9E9E9E]">Automation & Analytics</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
