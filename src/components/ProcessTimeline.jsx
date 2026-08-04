import React from 'react';
import { Compass, Palette, Layout, CheckCircle2, ArrowDown, Clock } from 'lucide-react';

export default function ProcessTimeline() {
  const steps = [
    {
      id: 'step-1',
      title: 'Discovery',
      duration: '1 Week',
      description: 'Uncovering business goals, audience research, competitive positioning, and strategic roadmap.',
      icon: Compass,
      color: 'from-sky-400 to-indigo-500'
    },
    {
      id: 'step-2',
      title: 'Brand Identity',
      duration: '2 Weeks',
      description: 'Crafting visual guidelines, logo systems, typography hierarchy, and compelling brand messaging.',
      icon: Palette,
      color: 'from-[#A0C4FF] to-sky-400'
    },
    {
      id: 'step-3',
      title: 'Website Design',
      duration: '3 Weeks',
      description: 'Designing and engineering high-velocity, responsive web pages with custom micro-interactions.',
      icon: Layout,
      color: 'from-indigo-400 to-[#38BDF8]'
    },
    {
      id: 'step-4',
      title: 'Final Delivery',
      duration: '1 Week',
      description: 'Final QA testing, containerized backend deployment, search engine indexing, and launch.',
      icon: CheckCircle2,
      color: 'from-emerald-400 to-teal-500'
    }
  ];

  return (
    <section className="py-12 max-w-4xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/25 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Execution Roadmap</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Our Agency <span className="pastel-glow-text">Process & Timeline</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
          A structured 7-week end-to-end framework built for predictability, speed, and long-term brand growth.
        </p>
      </div>

      {/* Timeline Steps Stack with Vertical Flow Arrows */}
      <div className="space-y-4 relative">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Process Step Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-[#A0C4FF]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 hover:border-[#38BDF8]/50 transition-all duration-300 group relative overflow-hidden bg-gradient-to-r from-[#0E1420] via-[#0E1420]/90 to-[#070A0F]">
                
                {/* Left: Icon & Title */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${step.color} p-0.5 shadow-lg shrink-0`}>
                    <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
                      <Icon className="w-7 h-7 text-[#A0C4FF] group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold text-white">{step.title}</h3>
                    </div>
                    <p className="text-xs text-[#94A3B8] mt-1 max-w-md leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Right: Duration Pill Badge */}
                <div className="shrink-0 self-end sm:self-center">
                  <div className="px-4 py-2 rounded-2xl bg-[#070A0F] border border-[#A0C4FF]/30 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-md">
                    <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Duration: <strong className="text-[#A0C4FF]">{step.duration}</strong></span>
                  </div>
                </div>

              </div>

              {/* Downward Connector Arrow */}
              {!isLast && (
                <div className="flex justify-center py-2">
                  <div className="w-9 h-9 rounded-full bg-[#0E1420] border border-[#A0C4FF]/25 flex items-center justify-center text-[#38BDF8] shadow-lg animate-bounce">
                    <ArrowDown className="w-5 h-5" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
