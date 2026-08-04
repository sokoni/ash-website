import React from 'react';
import { ArrowRight, Calendar, UserCheck, ShieldCheck, Zap, Sparkles, MessageSquare, Video } from 'lucide-react';

export default function Hero({ onExplore, onViewPricing, onBookConsultation }) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#9E9E9E]/20">
      {/* BlackLine Creative Ambient Glow Orbs */}
      <div className="bg-orb-blue w-[500px] h-[500px] bg-[#FF2ED4]/15 -top-32 -left-32 animate-pulse-glow" />
      <div className="bg-orb-blue w-[600px] h-[600px] bg-[#30BBFF]/15 top-10 right-0 animate-pulse-glow" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-6">
          
          {/* Palette Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-[#FF2ED4]/30 text-xs font-semibold text-[#F5F5F5] shadow-xl shadow-[#FF2ED4]/10 animate-float">
            <Sparkles className="w-4 h-4 text-[#FFA530] animate-spin" style={{ animationDuration: '6s' }} />
            <span>Strategy. Websites. Search. Growth.</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2ED4] animate-ping" />
          </div>

          {/* Main Title matching brand identity */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]">
            <span className="text-[#30BBFF]">Bu<span className="pink-i">ı</span>ld Brands</span> <br />
            <span className="text-white">That Get Found<span className="text-[#FF2ED4] inline-block animate-pulse">.</span></span>
          </h1>

          {/* Sub-headline in Warm Golden Orange */}
          <div className="text-lg sm:text-2xl font-bold text-[#FFA530] tracking-wide">
            Strategy. Websites. Search. Growth.
          </div>

          {/* Description in Italicized Light Text */}
          <p className="text-base sm:text-lg text-[#F5F5F5]/80 italic max-w-3xl mx-auto leading-relaxed font-light">
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

          {/* 4 Pillars Grid matching Brand Image */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full border-t border-[#9E9E9E]/20 mt-8">
            {/* STRATEGY */}
            <div className="glass-panel p-5 rounded-2xl border border-[#30BBFF]/20 text-left space-y-2 bg-[#18181C]/80 hover:border-[#30BBFF]/50 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#30BBFF]/15 flex items-center justify-center text-[#30BBFF] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-sm font-black tracking-wider uppercase text-white">STRATEGY</div>
              </div>
              <ul className="text-xs text-[#9E9E9E] space-y-1 pl-1">
                <li>• Brand Strategy</li>
                <li>• Messaging & Positioning</li>
                <li>• Audience Research</li>
                <li>• Go-to-Market Systems</li>
              </ul>
            </div>

            {/* WEBSITES */}
            <div className="glass-panel p-5 rounded-2xl border border-[#FF2ED4]/20 text-left space-y-2 bg-[#18181C]/80 hover:border-[#FF2ED4]/50 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FF2ED4]/15 flex items-center justify-center text-[#FF2ED4] shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="text-sm font-black tracking-wider uppercase text-white">WEBSITES</div>
              </div>
              <ul className="text-xs text-[#9E9E9E] space-y-1 pl-1">
                <li>• Custom Web Design</li>
                <li>• Full-Stack Development</li>
                <li>• E-commerce Solutions</li>
                <li>• Responsive UX Systems</li>
              </ul>
            </div>

            {/* SEARCH */}
            <div className="glass-panel p-5 rounded-2xl border border-[#FFA530]/20 text-left space-y-2 bg-[#18181C]/80 hover:border-[#FFA530]/50 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFA530]/15 flex items-center justify-center text-[#FFA530] shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="text-sm font-black tracking-wider uppercase text-white">SEARCH</div>
              </div>
              <ul className="text-xs text-[#9E9E9E] space-y-1 pl-1">
                <li>• Technical SEO</li>
                <li>• AEO / GEO Optimization</li>
                <li>• Local Search Dominance</li>
                <li>• Content Strategy</li>
              </ul>
            </div>

            {/* GROWTH */}
            <div className="glass-panel p-5 rounded-2xl border border-[#30BBFF]/20 text-left space-y-2 bg-[#18181C]/80 hover:border-[#30BBFF]/50 transition-all">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#30BBFF]/15 flex items-center justify-center text-[#30BBFF] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-sm font-black tracking-wider uppercase text-white">GROWTH</div>
              </div>
              <ul className="text-xs text-[#9E9E9E] space-y-1 pl-1">
                <li>• AI Search Optimization</li>
                <li>• Email Marketing</li>
                <li>• Marketing Automation</li>
                <li>• Lead Gen & Analytics</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
