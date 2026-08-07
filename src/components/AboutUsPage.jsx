import React from 'react';
import { Sparkles, Users, ArrowRight, Target, Mail, Quote, UserCheck, Code2, Briefcase } from 'lucide-react';

const LinkedInIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const GithubIcon = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function AboutUsPage({ onBookConsultation }) {
  const stats = [
    { label: 'Client Satisfaction', value: '100%' },
    { label: 'Average Core Web Vital', value: '99/100' },
    { label: 'Brand Growth Systems', value: '100%' },
    { label: 'Strategy Consultations', value: '150+' }
  ];

  const founders = [
    {
      roleTag: 'Co-Founder & CEO',
      name: '[ Co-Founder Name ]',
      title: 'Co-Founder / Brand Strategy & Creative Director',
      image: '/founder-placeholder.png',
      accentColor: 'from-[#38BDF8] to-[#A0C4FF]',
      borderColor: 'border-[#38BDF8]/30',
      badgeBg: 'bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30',
      bio: 'Placeholder bio for the Co-Founder. Share her origin story, vision for BlackLine Creative, strategic positioning expertise, and background leading high-velocity brand transformations here.',
      expertise: ['Brand Strategy', 'Creative Direction', 'Digital Architecture', 'Client Growth'],
      quote: '"Building digital foundations that elevate brands and create lasting market impact."',
      socials: {
        linkedin: '#',
        twitter: '#',
        email: 'mailto:cofounder@blacklinecreative.com'
      }
    },
    {
      roleTag: 'Co-Founder & CTO',
      name: '[ Co-Founder Name ]',
      title: 'Co-Founder / Head of Technology & Engineering',
      image: '/cofounder-placeholder.png',
      accentColor: 'from-[#C084FC] to-[#F472B6]',
      borderColor: 'border-[#C084FC]/30',
      badgeBg: 'bg-[#C084FC]/10 text-[#C084FC] border-[#C084FC]/30',
      bio: 'Placeholder bio for the Co-Founder. Detail his technical expertise, software architecture leadership, containerized backend systems, and web performance engineering here.',
      expertise: ['Full-Stack Dev', 'Containerized Systems', 'Technical SEO', 'Performance Ops'],
      quote: '"Engineering ultra-fast, robust web applications built to scale effortlessly."',
      socials: {
        linkedin: '#',
        github: '#',
        email: 'mailto:cofounder2@blacklinecreative.com'
      }
    }
  ];

  return (
    <div className="py-12 space-y-16 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#A0C4FF]/10 border border-[#A0C4FF]/25 text-[#A0C4FF] text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-[#38BDF8]" />
          <span>Agency Story & Leadership</span>
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

      {/* Founder & Co-Founder Section */}
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/20 text-[#38BDF8] text-[11px] font-extrabold uppercase tracking-widest">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Leadership & Founders</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Meet Our <span className="pastel-glow-text">Founders</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto">
            The driving force behind BlackLine Creative's strategy, design, and technical engineering.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {founders.map((person, index) => (
            <div
              key={index}
              className={`glass-panel p-8 rounded-3xl border ${person.borderColor} bg-gradient-to-b from-[#0E1420] to-[#070A0F] space-y-6 relative overflow-hidden transition-all duration-300 hover:border-opacity-60 hover:shadow-2xl hover:shadow-[#38BDF8]/10 group`}
            >
              {/* Background Glow Accent */}
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br from-[#38BDF8]/10 to-[#C084FC]/10 blur-3xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              {/* Profile Top Row */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[#A0C4FF]/20 shadow-xl group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-[#070A0F] border border-[#A0C4FF]/20 text-[#38BDF8]">
                    {index === 0 ? <Briefcase className="w-3.5 h-3.5" /> : <Code2 className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${person.badgeBg}`}>
                    {person.roleTag}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {person.name}
                  </h3>
                  <p className="text-xs font-medium text-[#A0C4FF]">
                    {person.title}
                  </p>
                </div>
              </div>

              {/* Bio Placeholder */}
              <div className="p-4 rounded-2xl bg-[#070A0F]/80 border border-[#A0C4FF]/10 space-y-2">
                <p className="text-xs text-[#94A3B8] leading-relaxed italic">
                  "{person.bio}"
                </p>
              </div>

              {/* Expertise Tags */}
              <div className="space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">Core Expertise</div>
                <div className="flex flex-wrap gap-2">
                  {person.expertise.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-[#A0C4FF]/5 border border-[#A0C4FF]/15 text-[11px] font-medium text-[#CBD5E1]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vision Quote */}
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gradient-to-r from-[#A0C4FF]/5 to-transparent border-l-2 border-[#38BDF8]">
                <Quote className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                <p className="text-xs text-[#E2E8F0] font-medium leading-relaxed">
                  {person.quote}
                </p>
              </div>

              {/* Social / Contact Links */}
              <div className="pt-4 border-t border-[#A0C4FF]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#64748B] font-semibold">Connect with {person.roleTag.split(' ')[0]}</span>
                <div className="flex items-center gap-2">
                  {person.socials.linkedin && (
                    <a
                      href={person.socials.linkedin}
                      className="p-2 rounded-lg bg-[#A0C4FF]/10 border border-[#A0C4FF]/20 text-[#A0C4FF] hover:text-white hover:bg-[#38BDF8]/20 transition-all"
                      title="LinkedIn Profile Placeholder"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {person.socials.twitter && (
                    <a
                      href={person.socials.twitter}
                      className="p-2 rounded-lg bg-[#A0C4FF]/10 border border-[#A0C4FF]/20 text-[#A0C4FF] hover:text-white hover:bg-[#38BDF8]/20 transition-all"
                      title="Twitter/X Profile Placeholder"
                    >
                      <TwitterIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {person.socials.github && (
                    <a
                      href={person.socials.github}
                      className="p-2 rounded-lg bg-[#A0C4FF]/10 border border-[#A0C4FF]/20 text-[#A0C4FF] hover:text-white hover:bg-[#38BDF8]/20 transition-all"
                      title="GitHub Profile Placeholder"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {person.socials.email && (
                    <a
                      href={person.socials.email}
                      className="p-2 rounded-lg bg-[#A0C4FF]/10 border border-[#A0C4FF]/20 text-[#A0C4FF] hover:text-white hover:bg-[#38BDF8]/20 transition-all"
                      title="Direct Email Placeholder"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Notice Info Banner */}
        <div className="p-4 rounded-2xl bg-[#38BDF8]/5 border border-[#38BDF8]/20 text-center space-y-1">
          <p className="text-xs font-bold text-[#38BDF8]">
            💡 Co-Founders Placeholders Active
          </p>
          <p className="text-[11px] text-[#94A3B8]">
            When you're ready, simply pass your actual names, headshots, bio stories, and social links to replace these co-founder placeholders!
          </p>
        </div>
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
            Let's Bu<span className="pink-i">ı</span>ld Someth<span className="pink-i">ı</span>ng <br />
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


