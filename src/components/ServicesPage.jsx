import React from 'react';
import { Sparkles, Code, Server, Layout, ShieldCheck, ArrowRight, CheckCircle2, Cpu, Wrench } from 'lucide-react';

export default function ServicesPage({ onBookConsultation }) {
  const services = [
    {
      id: 'custom-web-app',
      title: 'Custom Web Application Development',
      badge: 'Full-Stack Engineering',
      description: 'Bespoke React & Vite web applications tailored with dynamic glassmorphism UI, custom REST APIs, state persistence, and responsive interactive workflows.',
      features: [
        'Single Page Applications (SPA) & Next.js/Vite',
        'Custom Tailwind & Vanilla CSS Design Systems',
        'State persistence & client session management',
        'Responsive mobile-first layout optimization'
      ],
      icon: Code
    },
    {
      id: 'docker-backend',
      title: 'Docker Containerized Backend Infrastructure',
      badge: 'DevOps & Storage',
      description: 'Containerized Node.js REST API servers with persistent volume storage for user sign-in authentication, database management, and automated email notifications.',
      features: [
        'Docker & Docker Compose containerization',
        'Node.js & Express REST API architecture',
        'Persistent database volume volume mapping',
        'Secure multi-tier authentication endpoints'
      ],
      icon: Server
    },
    {
      id: 'strategy-audit',
      title: '1-on-1 Strategy Consultation & Audits',
      badge: 'Executive Advisory',
      description: 'Direct video strategy sessions to plan product roadmap, system architecture, UX conversion funnels, and technical execution blueprints.',
      features: [
        'Live system architecture & codebase review',
        'UX conversion funnel optimization',
        'Google Meet video consultation call',
        'Calendar event & .ics export integration'
      ],
      icon: Cpu
    },
    {
      id: 'design-system',
      title: 'UI/UX Design Systems & Micro-Animations',
      badge: 'Aesthetics & Motion',
      description: 'Premium UI component libraries featuring curated HSL color schemes, sleek dark mode aesthetics, interactive hover animations, and micro-interactions.',
      features: [
        'Curated dark mode & glassmorphism palettes',
        'Canvas confetti & celebratory micro-interactions',
        'Accessible, semantic HTML5 structure',
        'Frictionless user flow wireframing'
      ],
      icon: Layout
    }
  ];

  return (
    <div className="py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/25 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <Wrench className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Core Capabilities & Offerings</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
          BlackLine <span className="pastel-glow-text">Services</span>
        </h1>

        <p className="text-base text-[#94A3B8] leading-relaxed">
          From concept architecture to containerized backend deployment, we deliver high-impact web software tailored to your growth objectives.
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/20 space-y-6 flex flex-col justify-between hover:border-[#38BDF8]/50 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-lg shadow-[#38BDF8]/20">
                    <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#A0C4FF] group-hover:rotate-6 transition-transform" />
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#A0C4FF]/10 text-[#A0C4FF] text-[10px] font-bold uppercase tracking-wider border border-[#A0C4FF]/20">
                    {service.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white">{service.title}</h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">{service.description}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#A0C4FF]/15">
                  <span className="text-[11px] font-bold text-[#A0C4FF] uppercase tracking-wider">Includes</span>
                  <ul className="space-y-1.5">
                    {service.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs text-[#94A3B8]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => onBookConsultation && onBookConsultation({ id: service.id, name: service.title })}
                className="btn-pastel-primary w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-4 h-4 text-[#070A0F]" />
                <span>Book Consultation for this Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
