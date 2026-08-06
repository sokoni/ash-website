import React, { useState } from 'react';
import { Sparkles, Eye, ArrowRight, Layers, CheckCircle2, Star, Code, Server, Check, Calendar } from 'lucide-react';
import { WEBSITE_TEMPLATES } from '../data/websitesData';

export default function ProjectsPage({ onPreview, onBookConsultation }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const currentProject = WEBSITE_TEMPLATES[hoveredIndex !== null ? hoveredIndex : activeProjectIndex];

  return (
    <div className="py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2ED4]/10 border border-[#FF2ED4]/30 text-[#FF2ED4] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-[#30BBFF]" />
          <span>Case Studies & Work Portfolio</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Interactive <span className="pastel-glow-text">Portfolio Line</span>
        </h1>

        <p className="text-base text-[#9E9E9E] leading-relaxed">
          Hover over each <span className="text-[#FF2ED4] font-bold">pink dot</span> along the BlackLine project timeline to preview completed case studies, technical architecture, and real business results.
        </p>
      </div>

      {/* Interactive Line with Pink Dots */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 border border-[#9E9E9E]/20 bg-[#18181C]/80 shadow-2xl">
          
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFA530]">
              Project Timeline Line • Select or Hover Any Dot
            </span>
          </div>

          {/* The Main Gradient Line */}
          <div className="relative my-12 w-full flex items-center justify-between">
            {/* Background Multi-Color Gradient Bar */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[3.5px] bg-gradient-to-r from-[#FFF37A] via-[#FFB347] via-[#FF2ED4] via-[#9B51E0] to-[#30BBFF] rounded-full shadow-lg shadow-[#FF2ED4]/30" />

            {/* Interactive Pink Dots across the Line */}
            {WEBSITE_TEMPLATES.map((project, index) => {
              const isSelected = activeProjectIndex === index;
              const isHovered = hoveredIndex === index;
              const isActive = isSelected || isHovered;

              return (
                <div
                  key={project.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setActiveProjectIndex(index)}
                  className="relative z-10 flex flex-col items-center cursor-pointer group"
                >
                  {/* Floating Hover Label above dot */}
                  <div
                    className={`absolute -top-12 px-3 py-1.5 rounded-xl bg-[#0F0F0F] border text-[11px] font-bold whitespace-nowrap transition-all duration-200 shadow-xl pointer-events-none ${
                      isActive
                        ? 'border-[#FF2ED4] text-white scale-110 -translate-y-1 shadow-[#FF2ED4]/40'
                        : 'border-[#9E9E9E]/30 text-[#9E9E9E] opacity-70 group-hover:opacity-100'
                    }`}
                  >
                    {project.name}
                  </div>

                  {/* Pink Dot Element */}
                  <div className="relative flex items-center justify-center">
                    {/* Glowing pulse ring when active */}
                    {isActive && (
                      <span className="absolute w-8 h-8 rounded-full bg-[#FF2ED4]/40 animate-ping" />
                    )}
                    
                    {/* The Interactive Pink Dot */}
                    <div
                      className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'bg-[#FF2ED4] scale-150 shadow-lg shadow-[#FF2ED4] border-2 border-white'
                          : 'bg-[#FF2ED4]/80 border-2 border-[#18181C] hover:scale-125 hover:bg-[#FF2ED4]'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  </div>

                  {/* Category Label below dot */}
                  <span className="mt-4 text-[10px] font-semibold text-[#9E9E9E] group-hover:text-white transition-colors">
                    {project.category.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Active Hover / Selected Project Preview Card */}
          {currentProject && (
            <div className="mt-8 glass-panel rounded-2xl p-6 sm:p-8 border border-[#FF2ED4]/30 bg-[#0F0F0F]/90 transition-all duration-300 shadow-2xl animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Project Image Preview */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden group border border-[#9E9E9E]/20 shadow-xl">
                  <img
                    src={currentProject.image}
                    alt={currentProject.name}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-[#FF2ED4]/20 text-[#FF2ED4] border border-[#FF2ED4]/40 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                      {currentProject.category}
                    </span>
                    <h4 className="text-xl font-black text-white mt-2">
                      {currentProject.name}
                    </h4>
                  </div>
                </div>

                {/* Project Details & Metrics */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#30BBFF]/10 text-[#30BBFF] text-[11px] font-semibold border border-[#30BBFF]/20">
                        Role: {currentProject.role || 'Web & Brand Architecture'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFA530]/10 text-[#FFA530] text-[11px] font-semibold border border-[#FFA530]/20">
                        ★ {currentProject.rating || 5.0} Score
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {currentProject.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FFA530] font-medium mt-1">
                      {currentProject.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#9E9E9E] leading-relaxed">
                    {currentProject.challenge || currentProject.description}
                  </p>

                  {/* Impact Highlights */}
                  {currentProject.impact && (
                    <div className="space-y-2 pt-2 border-t border-[#9E9E9E]/20">
                      <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                        Key Impact & Results
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {currentProject.impact.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F5F5]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Services / Tech Stack */}
                  <div className="space-y-2 pt-2 border-t border-[#9E9E9E]/20">
                    <span className="text-[10px] font-bold uppercase text-[#30BBFF] tracking-wider">
                      Services & Architecture
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(currentProject.servicesProvided || currentProject.features).slice(0, 5).map((srv, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-xl bg-[#18181C] border border-[#9E9E9E]/20 text-[11px] font-mono text-[#F5F5F5]"
                        >
                          • {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => onPreview && onPreview(currentProject)}
                      className="btn-pastel-secondary w-full sm:flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4 text-[#30BBFF]" />
                      <span>Interactive Preview</span>
                    </button>

                    <button
                      onClick={() => onBookConsultation && onBookConsultation(currentProject)}
                      className="btn-pastel-primary w-full sm:flex-1 py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-[#0F0F0F]" />
                      <span>Request Similar Case Study</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* Full Case Studies Showcase Grid */}
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            All Completed Case Studies
          </h2>
          <p className="text-xs sm:text-sm text-[#9E9E9E]">
            Browse all digital transformations engineered by BlackLine Creative
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {WEBSITE_TEMPLATES.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => {
                setActiveProjectIndex(idx);
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="glass-panel rounded-3xl border border-[#9E9E9E]/20 overflow-hidden flex flex-col justify-between hover:border-[#FF2ED4]/50 transition-all duration-300 group cursor-pointer"
            >
              {/* Visual Cover Header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-[#0F0F0F]/80 backdrop-blur-md text-[#FF2ED4] text-[10px] font-bold uppercase tracking-wider border border-[#FF2ED4]/30">
                    {project.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-black text-white group-hover:text-[#30BBFF] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-[#FFA530] font-medium mt-0.5">{project.tagline}</p>
                </div>
              </div>

              {/* Details & Actions */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-[#18181C]/60">
                <p className="text-xs text-[#9E9E9E] leading-relaxed line-clamp-2">
                  {project.challenge || project.description}
                </p>

                <div className="pt-4 border-t border-[#9E9E9E]/20 flex items-center justify-between">
                  <span className="text-xs text-[#30BBFF] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>View on Interactive Line</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPreview && onPreview(project);
                    }}
                    className="btn-pastel-secondary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#30BBFF]" />
                    <span>Preview</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
