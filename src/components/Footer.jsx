import React from 'react';
import { ShieldCheck } from 'lucide-react';
import BrandLogo from './BrandLogo';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

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
    <footer className="border-t border-[#9E9E9E]/20 bg-[#0F0F0F] py-12 relative overflow-hidden">
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start justify-between">
          
          {/* Company & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <BrandLogo className="h-20 sm:h-26 w-auto" onClick={() => onNavigate && onNavigate('marketplace')} />
            <p className="text-sm font-semibold text-[#FFA530] tracking-tight">
              Build Brands That Get Found.
            </p>
            <p className="text-xs text-[#9E9E9E] leading-relaxed">
              Strategic web development, brand positioning, search optimization, and scalable growth systems.
            </p>
            <div className="pt-1">
              <a
                href="https://instagram.com/blcklinecreative"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#18181C] border border-[#FF2ED4]/30 text-[#FF2ED4] hover:bg-[#FF2ED4]/15 hover:border-[#FF2ED4]/50 transition-all text-xs font-bold font-mono"
              >
                <InstagramIcon className="w-4 h-4 text-[#FF2ED4]" />
                <span>@blcklinecreative</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="md:col-span-1">
            <h4 className="text-xs font-bold text-[#FF2ED4] uppercase tracking-wider mb-3">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#9E9E9E]">
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
            <h4 className="text-xs font-bold text-[#30BBFF] uppercase tracking-wider mb-1">Advisory Status</h4>
            <div className="glass-panel p-4 rounded-2xl border border-[#9E9E9E]/20 text-xs text-[#F5F5F5] space-y-2 bg-[#18181C]/60">
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
        <div className="pt-8 border-t border-[#9E9E9E]/15 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E9E9E] gap-4 mb-6">
          <div>
            © 2026 BlackLine Creative. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/blcklinecreative"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#FF2ED4] hover:underline font-medium"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>@blcklinecreative</span>
            </a>
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#30BBFF]" /> SSL Protected</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>

      {/* Signature Brand Bottom Strip matching Brand Image */}
      <div className="w-full bg-[#30BBFF] py-3.5 text-[#0F0F0F] text-center font-bold text-xs tracking-wider flex items-center justify-center gap-2 uppercase">
        <span className="w-4 h-4 rounded-full bg-[#0F0F0F] text-[#30BBFF] flex items-center justify-center text-[10px] font-black">🌐</span>
        <span>blackline-creative.com</span>
      </div>
    </footer>
  );
}
