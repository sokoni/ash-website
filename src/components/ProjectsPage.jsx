import React from 'react';
import { Sparkles, Eye, ArrowRight, Layers, CheckCircle2, Star, Code, Server } from 'lucide-react';
import { WEBSITE_TEMPLATES } from '../data/websitesData';

export default function ProjectsPage({ onPreview, onBookConsultation }) {
  return (
    <div className="py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/25 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Case Studies & Work Portfolio</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          Featured <span className="pastel-glow-text">Projects</span>
        </h1>

        <p className="text-base text-[#94A3B8] leading-relaxed">
          Explore flagship web applications engineered by BlackLine Creative. Each concept demonstrates our principles of speed, glassmorphism design, and scalable containerized architecture.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {WEBSITE_TEMPLATES.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-3xl border border-[#A0C4FF]/20 overflow-hidden flex flex-col justify-between hover:border-[#38BDF8]/50 transition-all duration-300 group"
          >
            {/* Visual Cover Header */}
            <div className={`p-8 bg-gradient-to-br ${project.badgeColor || 'from-[#0E1420] to-[#070A0F]'} border-b border-[#A0C4FF]/15 flex flex-col justify-between min-h-[160px] relative overflow-hidden`}>
              <div className="flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-[#070A0F]/80 backdrop-blur-md text-[#A0C4FF] text-[10px] font-bold uppercase tracking-wider border border-[#A0C4FF]/20">
                  {project.category}
                </span>
                <div className="flex items-center gap-1 bg-[#070A0F]/80 px-2.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-400/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{project.rating}</span>
                </div>
              </div>

              <div className="z-10 mt-6">
                <h3 className="text-2xl font-black text-white group-hover:text-[#A0C4FF] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 font-medium">{project.tagline}</p>
              </div>

              <div className="absolute right-0 bottom-0 opacity-10 text-white font-mono text-7xl font-black select-none pointer-events-none transform translate-x-4 translate-y-4">
                {project.id.split('-')[0].toUpperCase()}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between bg-[#0E1420]/60">
              <div className="space-y-4">
                <p className="text-xs text-[#94A3B8] leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#A0C4FF] tracking-wider">Tech Architecture</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.features.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/15 text-[11px] font-mono text-[#B9D6F2]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#A0C4FF]/15 flex items-center gap-3">
                <button
                  onClick={() => onPreview && onPreview(project)}
                  className="btn-pastel-secondary flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#A0C4FF]" />
                  <span>Interactive Preview</span>
                </button>

                <button
                  onClick={() => onBookConsultation && onBookConsultation(project)}
                  className="btn-pastel-primary flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#070A0F]" />
                  <span>Request Similar Concept</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
