import React from 'react';
import { Sparkles, Zap, Target, ArrowRight, Code, Cpu, Eye, Compass } from 'lucide-react';
import ProcessTimeline from './ProcessTimeline';

export default function BlackLineTheory({ onBookConsultation }) {
  const pillars = [
    {
      icon: Eye,
      title: "Visual Gravitas",
      tagline: "First Impressions Are Final Impressions",
      description: "We craft interfaces with deep HSL contrast, vibrant glow dynamics, glassmorphism overlays, and precise typography. Every pixel commands immediate authority.",
      color: "from-sky-400 to-indigo-500"
    },
    {
      icon: Zap,
      title: "Sub-100ms Velocity",
      tagline: "Uncompromising Performance Architecture",
      description: "Speed is a core feature, not a post-launch optimization. We build lean, ultra-fast client applications optimized for perfect Core Web Vitals and zero render jank.",
      color: "from-indigo-400 to-sky-400"
    },
    {
      icon: Target,
      title: "Conversion Psychology",
      tagline: "Engage, Persuade, & Retain",
      description: "Design without strategy is art. We structure UX flows based on cognitive micro-interactions, seamless consultation funnels, and frictionless action pathways.",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Cpu,
      title: "Scalable Core Architecture",
      tagline: "Engineered for Longevity",
      description: "Clean component hierarchies, decoupled state management, and containerized Docker backend services ensure your application scales without tech debt.",
      color: "from-purple-400 to-[#38BDF8]"
    }
  ];

  return (
    <div className="py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/25 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Agency Philosophy & Methodology</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          The <span className="pastel-glow-text">BlackLine Theory</span>
        </h1>

        <p className="text-base text-[#94A3B8] leading-relaxed">
          The BlackLine Theory is our proprietary blueprint for building digital web experiences that bridge elite aesthetics, lightning performance, and high-impact business conversion.
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={pillar.title}
              className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/20 space-y-4 relative overflow-hidden group hover:border-[#38BDF8]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${pillar.color} p-0.5 shadow-lg`}>
                  <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#A0C4FF] group-hover:scale-110 transition-transform" />
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-[#A0C4FF]/60">PILLAR 0{index + 1}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">{pillar.title}</h3>
                <p className="text-xs font-semibold text-[#38BDF8]">{pillar.tagline}</p>
              </div>

              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Process & Timeline Roadmap */}
      <ProcessTimeline />

      {/* Philosophy Principles */}
      <div className="glass-panel max-w-4xl mx-auto p-8 rounded-3xl border border-[#A0C4FF]/20 bg-gradient-to-br from-[#0E1420] to-[#070A0F] space-y-6">
        <div className="flex items-center gap-3">
          <Code className="w-6 h-6 text-[#38BDF8]" />
          <h2 className="text-xl font-bold text-white">Why Conventional Templates Fail</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#94A3B8]">
          <div className="p-4 rounded-2xl bg-[#070A0F] border border-[#A0C4FF]/15 space-y-2">
            <span className="font-bold text-red-400">Generic Templates</span>
            <p>Bloated scripts, generic stock layouts, slow mobile load speeds, zero strategic brand identity.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#070A0F] border border-[#A0C4FF]/15 space-y-2">
            <span className="font-bold text-amber-400">Basic Freelancers</span>
            <p>Unmaintained codebases, lack of containerized backend infrastructure, missing security standards.</p>
          </div>
          <div className="p-4 rounded-2xl bg-[#070A0F] border border-emerald-500/30 space-y-2">
            <span className="font-bold text-emerald-400">BlackLine Execution</span>
            <p>Tailored custom frontend design, containerized Docker architecture, 1-on-1 strategic consultation guidance.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="pt-4 border-t border-[#A0C4FF]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-white">Ready to apply BlackLine Theory to your web application?</h4>
            <p className="text-xs text-[#94A3B8]">Schedule a 1-on-1 strategy consultation with our senior lead engineers.</p>
          </div>
          <button
            onClick={() => onBookConsultation && onBookConsultation({ id: 'theory-consult', name: 'BlackLine Theory Strategy Call' })}
            className="btn-pastel-primary px-6 py-3 rounded-xl text-xs font-bold shrink-0 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#070A0F]" />
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
