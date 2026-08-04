import React from 'react';
import { Code, ShieldCheck } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('pricing');
    }
  };

  return (
    <footer className="border-t border-[#A0C4FF]/15 bg-[#070A0F] py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start justify-between">
          
          {/* Company & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-lg shadow-[#38BDF8]/20">
                <div className="w-full h-full bg-[#070A0F] rounded-[6px] flex items-center justify-center">
                  <Code className="w-4 h-4 text-[#A0C4FF]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">BlackLine <span className="pastel-glow-text">Creative</span></span>
            </div>
            <p className="text-sm font-semibold text-[#38BDF8] tracking-tight">
              Build Brands That Get Found.
            </p>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Strategic web development, brand positioning, search optimization, and scalable growth systems.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold text-[#A0C4FF] uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#94A3B8]">
              <li>
                <button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>About</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Services</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button onClick={scrollToContact} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Security & Advisory Status */}
          <div className="space-y-3 md:col-span-1">
            <h4 className="text-xs font-bold text-[#A0C4FF] uppercase tracking-wider mb-1">Advisory Status</h4>
            <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/15 text-xs text-[#B9D6F2] space-y-2 bg-[#0E1420]/60">
              <div className="flex items-center justify-between">
                <span>Senior Architect Advisory:</span>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">Open Slots</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Strategy Consultation Scheduling:</span>
                <span className="text-emerald-400 font-bold text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">Active</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Text */}
        <div className="pt-8 border-t border-[#A0C4FF]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <div>
            © 2026 BlackLine Creative. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#38BDF8]" /> SSL Protected</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
