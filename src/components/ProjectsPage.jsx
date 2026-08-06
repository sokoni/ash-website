import React from 'react';
import { Sparkles, Eye, ArrowRight, Layers, CheckCircle2 } from 'lucide-react';
import { WEBSITE_TEMPLATES } from '../data/websitesData';
import ProjectsTimeline from './ProjectsTimeline';

export default function ProjectsPage({ onPreview, onBookConsultation }) {
  return (
    <div className="py-8 space-y-16 animate-fadeIn">
      
      {/* Flagship Interactive Projects Timeline */}
      <ProjectsTimeline
        onPreviewProject={(project) => onPreview && onPreview(project)}
        onBookConsultation={(target) => onBookConsultation && onBookConsultation(target)}
      />

      {/* Header Banner for Case Studies Grid */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4 pt-8 border-t border-[#9E9E9E]/20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFA530]/10 border border-[#FFA530]/25 text-[#FFA530] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#30BBFF]" />
          <span>Detailed Case Studies</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Client Work & <span className="pastel-glow-text">Architectural Breakdown</span>
        </h2>

        <p className="text-base text-[#9E9E9E] leading-relaxed">
          Detailed technical breakdowns, services provided, and measurable outcomes for each featured platform.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {WEBSITE_TEMPLATES.map((project) => (
          <div
            key={project.id}
            className="glass-panel rounded-3xl border border-[#9E9E9E]/20 overflow-hidden flex flex-col justify-between hover:border-[#FF2ED4]/50 transition-all duration-300 group"
          >
            {/* Visual Cover Header */}
            <div className={`p-8 bg-gradient-to-br ${project.badgeColor || 'from-[#18181C] to-[#000000]'} border-b border-[#9E9E9E]/20 flex flex-col justify-between min-h-[160px] relative overflow-hidden`}>
              <div className="flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md text-[#30BBFF] text-[10px] font-bold uppercase tracking-wider border border-[#30BBFF]/30">
                  {project.category}
                </span>
              </div>

              <div className="z-10 mt-6">
                <h3 className="text-2xl font-black text-white group-hover:text-[#FF2ED4] transition-colors">
                  {project.name}
                </h3>
                <p className="text-xs text-[#FFA530] mt-1 font-medium">{project.tagline}</p>
              </div>

              <div className="absolute right-0 bottom-0 opacity-10 text-white font-mono text-7xl font-black select-none pointer-events-none transform translate-x-4 translate-y-4">
                {project.id.split('-')[0].toUpperCase()}
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6 space-y-5 flex-1 flex flex-col justify-between bg-[#18181C]/60">
              <div className="space-y-4">
                {/* Meta Badges: Role & Industry */}
                {project.role && (
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FF2ED4]/10 text-[#FF2ED4] font-semibold border border-[#FF2ED4]/20">
                      Role: {project.role}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#30BBFF]/10 text-[#30BBFF] font-semibold border border-[#30BBFF]/20">
                      Industry: {project.category}
                    </span>
                  </div>
                )}

                {/* Challenge Section */}
                {project.challenge ? (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-[#FFA530] tracking-wider">Challenge</span>
                    <p className="text-xs text-[#9E9E9E] leading-relaxed font-medium">
                      {project.challenge}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-[#9E9E9E] leading-relaxed">
                    {project.description}
                  </p>
                )}

                {/* Services Provided Section */}
                {project.servicesProvided ? (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#30BBFF] tracking-wider">Services Provided</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.servicesProvided.map((service) => (
                        <span
                          key={service}
                          className="px-2.5 py-1 rounded-xl bg-[#000000] border border-[#9E9E9E]/20 text-[11px] font-mono text-[#F5F5F5]"
                        >
                          • {service}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-[#30BBFF] tracking-wider">Tech Architecture</span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.features.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-xl bg-[#000000] border border-[#9E9E9E]/20 text-[11px] font-mono text-[#F5F5F5]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Impact Highlights Section */}
                {project.impact && (
                  <div className="space-y-2 pt-2 border-t border-[#9E9E9E]/20">
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Impact & Results</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {project.impact.map((item) => (
                        <li key={item} className="flex items-center gap-1.5 text-xs text-[#9E9E9E]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#9E9E9E]/20 flex items-center gap-3">
                <button
                  onClick={() => onPreview && onPreview(project)}
                  className="btn-pastel-secondary flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4 text-[#30BBFF]" />
                  <span>Interactive Preview</span>
                </button>

                <button
                  onClick={() => onBookConsultation && onBookConsultation(project)}
                  className="btn-pastel-primary flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#000000]" />
                  <span>Request Similar Case Study</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
