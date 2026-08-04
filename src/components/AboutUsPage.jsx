import React from 'react';
import { Sparkles, Users, Award, ShieldCheck, ArrowRight, Code, Server, Heart, Target } from 'lucide-react';

export default function AboutUsPage({ onBookConsultation }) {
  const stats = [
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Average Core Web Vital', value: '99/100' },
    { label: 'Brand Growth Systems', value: '100%' },
    { label: 'Strategy Consultations', value: '150+' }
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#38BDF8] uppercase tracking-wider">
              <Target className="w-4 h-4" /> Strategic Foundation
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Every Great Brand <span className="pastel-glow-text">Starts with a Line.</span>
            </h2>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Every design decision is guided by strategy, ensuring the final outcome not only looks great but also strengthens brand recognition, improves customer experience, and supports long-term business growth.
            </p>
            <div className="space-y-1.5 pt-2 border-t border-[#A0C4FF]/10 text-xs text-[#B9D6F2] font-medium">
              <p>Before an architect designs a building, they draw a line.</p>
              <p>Before a musician writes a song, they write a line.</p>
              <p>Before a product launches, someone creates a blueprint.</p>
            </div>
            <p className="text-xs text-[#A0C4FF] font-semibold pt-1">
              The same is true for marketing.
            </p>
          </div>

          <div className="space-y-4 glass-panel p-6 rounded-2xl border border-[#A0C4FF]/15 bg-[#070A0F]/80">
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Too many businesses jump straight into websites, social media, advertising, or logos without first building a strategy.
            </p>
            <p className="text-xs font-bold text-white">
              BlackLine Creative exists to change that.
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              We help businesses create digital foundations that support long-term growth through <strong>Brand Strategy</strong>, <strong>Website Design</strong>, <strong>Website Development</strong>, <strong>SEO</strong> (including <strong>Technical SEO</strong> and <strong>Local SEO</strong>), <strong>AI Search Optimization</strong>, data <strong>Analytics</strong>, <strong>Marketing Automation</strong>, and high-converting <strong>Lead Generation</strong> systems.
            </p>
            <div className="p-3.5 rounded-xl bg-[#A0C4FF]/10 border border-[#A0C4FF]/20 space-y-1">
              <p className="text-xs font-semibold text-[#A0C4FF]">We don't just build websites.</p>
              <p className="text-xs font-bold text-white">
                We build businesses that are easier to find, easier to understand, and easier to grow.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Footer Banner */}
        <div className="pt-6 border-t border-[#A0C4FF]/15 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Let's Build Something <br />
            <span className="pastel-glow-text">People Remember.</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
            Whether you're launching a startup, modernizing your business, or looking to dominate search, BlackLine Creative is ready to help.
          </p>
          <button
            onClick={() => onBookConsultation && onBookConsultation({ id: 'about-consult', name: 'Start My Project Consultation' })}
            className="btn-pastel-primary px-8 py-3.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-[#070A0F]" />
            <span>Start My Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
