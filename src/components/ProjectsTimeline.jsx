import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';

const TIMELINE_PROJECTS = [
  {
    id: "belay-diagnostics",
    title: "Belay Diagnostics",
    client: "Belay Diagnostics Inc.",
    industry: "Healthcare / Biotech",
    description: "Genomic Science Digital Transformation platform communicating technical science into high-converting commercial experiences.",
    services: ["Website Strategy", "HubSpot Automation", "SEO & Analytics"],
    technologies: ["React", "HubSpot", "GA4 Analytics", "SEO"],
    completionDate: "Q3 2025",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/preview/belay-diagnostics"
  },
  {
    id: "d-johnson-funeral",
    title: "D. Johnson Funeral Services",
    client: "D. Johnson Enterprises",
    industry: "Funeral Services & Care",
    description: "Compassionate digital experience and brand elevation focused on trust, family guidance, and seamless consultation booking.",
    services: ["Brand Messaging", "Website Design", "Contact Workflows"],
    technologies: ["React", "CSS Modules", "Tailwind CSS"],
    completionDate: "Q4 2025",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/preview/d-johnson"
  },
  {
    id: "aura-creative",
    title: "Aura Executive Portfolio",
    client: "Aura Creative Agency",
    industry: "Portfolio & Agency",
    description: "Minimalist modern agency showcase built for high-velocity performance, custom masonry grids, and brand authority.",
    services: ["UX Architecture", "Masonry Showcases", "100/100 Lighthouse"],
    technologies: ["React 18", "Vanilla CSS", "Vite"],
    completionDate: "Q1 2026",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/preview/aura"
  },
  {
    id: "pulse-ai",
    title: "Pulse AI Enterprise UI",
    client: "Pulse Technologies",
    industry: "SaaS & Artificial Intelligence",
    description: "Next-gen enterprise chat wrapper and prompt engineering suite with real-time API integrations and model selectors.",
    services: ["AI UI Design", "API Workflows", "User Dashboard"],
    technologies: ["React", "Vite", "REST Client"],
    completionDate: "Q2 2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/preview/pulseai"
  },
  {
    id: "zenith-hospitality",
    title: "Zenith Dining & Venue Portal",
    client: "Zenith Group",
    industry: "Hospitality & Dining",
    description: "Luxury dining catalog and VIP venue reservation engine complete with digital menus and interactive booking.",
    services: ["Digital Menus", "Reservation System", "Maps Integration"],
    technologies: ["React", "Google Maps Embed", "CSS Modules"],
    completionDate: "Q3 2026",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
    projectUrl: "https://example.com/preview/zenith"
  }
];

export default function ProjectsTimeline({ onPreviewProject, onBookConsultation }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [autoPreviewActive, setAutoPreviewActive] = useState(true);

  const containerRef = useRef(null);
  const cardRef = useRef(null);

  // Viewport Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Auto-preview first project card for 2 seconds on initial view
  useEffect(() => {
    if (hasAnimated && autoPreviewActive) {
      const timer = setTimeout(() => {
        setAutoPreviewActive(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hasAnimated, autoPreviewActive]);

  const activeIndex = hoveredIndex !== null ? hoveredIndex : activeProjectIndex;
  const currentProject = TIMELINE_PROJECTS[activeIndex];

  const handleNodeSelect = (index) => {
    setActiveProjectIndex(index);
    setAutoPreviewActive(false);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleNodeSelect(index);
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-16 relative overflow-hidden bg-[#000000] text-white"
      aria-label="Interactive Projects Timeline"
    >
      {/* Background Soft Glow Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF2ED4]/10 rounded-full filter blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#30BBFF]/10 rounded-full filter blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF2ED4]/10 border border-[#FF2ED4]/30 text-[#FF2ED4] text-xs font-bold uppercase tracking-widest">
            <Layers className="w-3.5 h-3.5 text-[#30BBFF]" />
            <span>Interactive Portfolio</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Projects <span className="pastel-glow-text">Timeline</span>
          </h2>

          <p className="text-sm sm:text-base text-[#9E9E9E] leading-relaxed max-w-2xl mx-auto">
            Hover over or tap any project node along our chronological timeline to explore flagship digital transformations engineered by BlackLine Creative.
          </p>
        </div>

        {/* Main Timeline Section */}
        <div className="relative pt-12 pb-8 flex flex-col items-center">

          {/* Floating Project Card (Positioned Above Timeline) */}
          <div
            ref={cardRef}
            className="w-full max-w-[420px] mb-8 min-h-[380px] transition-all duration-300 ease-out"
          >
            {currentProject && (
              <div className="relative glass-panel rounded-3xl p-6 border border-[#FF2ED4]/35 bg-[#18181C]/95 backdrop-blur-xl shadow-2xl shadow-[#FF2ED4]/20 transition-all duration-300 transform animate-fadeIn">
                
                {/* Image Showcase */}
                <div className="relative h-44 rounded-2xl overflow-hidden mb-4 border border-[#9E9E9E]/20">
                  <img
                    src={currentProject.image}
                    alt={currentProject.title}
                    loading="lazy"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-75" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#FF2ED4]/40 text-[#FF2ED4] text-[10px] font-bold uppercase tracking-wider">
                      {currentProject.industry}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-[#000000]/80 backdrop-blur-md border border-[#30BBFF]/40 text-[#30BBFF] text-[10px] font-mono font-bold">
                      {currentProject.completionDate}
                    </span>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="space-y-3 text-left">
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">
                      {currentProject.title}
                    </h3>
                    <p className="text-[11px] font-semibold text-[#FFA530] mt-0.5">
                      Client: {currentProject.client}
                    </p>
                  </div>

                  <p className="text-xs text-[#9E9E9E] leading-relaxed line-clamp-3">
                    {currentProject.description}
                  </p>

                  {/* Services Provided */}
                  <div className="space-y-1.5 pt-2 border-t border-[#9E9E9E]/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#30BBFF]">
                      Services Provided
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentProject.services.map((srv, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-lg bg-[#000000] border border-[#9E9E9E]/20 text-[10px] font-medium text-[#F5F5F5]"
                        >
                          • {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  {currentProject.technologies && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#FF2ED4]/10 border border-[#FF2ED4]/20 text-[10px] font-mono text-[#FF2ED4]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* View Project Button */}
                  <div className="pt-3">
                    <button
                      onClick={() => onPreviewProject ? onPreviewProject(currentProject) : onBookConsultation && onBookConsultation(currentProject)}
                      className="btn-pastel-primary w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 group/btn"
                    >
                      <span>View Project</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#000000] group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Floating Bottom Connector Pointer */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#18181C] border-r border-b border-[#FF2ED4]/35 rotate-45" />
              </div>
            )}
          </div>

          {/* The Timeline Track & Nodes (80% Width Centered) */}
          <div className="w-[85%] sm:w-[80%] max-w-4xl relative my-6">

            {/* The Gradient 3px Horizontal Line */}
            <div
              className={`w-full h-[3px] rounded-full bg-gradient-to-r from-[#FFF37A] via-[#FFB347] via-[#FF2ED4] via-[#9B51E0] to-[#30BBFF] shadow-[0_0_15px_rgba(255,46,212,0.5)] transition-all duration-1000 ${
                hasAnimated ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              } transform origin-left`}
            />

            {/* Project Nodes along the Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex items-center justify-between px-2">
              {TIMELINE_PROJECTS.map((project, index) => {
                const isSelected = activeIndex === index;

                return (
                  <button
                    key={project.id}
                    tabIndex={0}
                    aria-label={`View ${project.title} project details`}
                    onClick={() => handleNodeSelect(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="relative group focus:outline-none flex flex-col items-center"
                  >
                    {/* Floating Pulse Ring */}
                    {isSelected && (
                      <span className="absolute w-8 h-8 rounded-full bg-[#FF2ED4]/40 animate-ping pointer-events-none" />
                    )}

                    {/* Circular Project Node Dot (16px) */}
                    <div
                      className={`w-4 sm:w-4.5 h-4 sm:h-4.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#FF2ED4] scale-150 border-2 border-white shadow-[0_0_20px_rgba(255,46,212,0.9)] -translate-y-1'
                          : 'bg-[#FF2ED4]/80 border border-white/70 shadow-[0_0_10px_rgba(255,46,212,0.5)] hover:scale-130 hover:bg-[#FF2ED4] hover:-translate-y-0.5'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white opacity-90" />
                    </div>

                    {/* Date / Label underneath */}
                    <span
                      className={`mt-4 text-[10px] sm:text-xs font-mono font-bold tracking-tight transition-colors duration-200 ${
                        isSelected ? 'text-[#30BBFF] scale-105' : 'text-[#9E9E9E] group-hover:text-white'
                      }`}
                    >
                      {project.completionDate}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {/* Timeline Instruction Footer */}
          <div className="mt-6 text-center text-xs text-[#9E9E9E] flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FFA530]" />
            <span>Hover or tap any pink dot to inspect case study breakdown</span>
          </div>

        </div>

      </div>
    </section>
  );
}
