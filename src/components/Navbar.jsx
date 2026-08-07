import React, { useState } from 'react';
import { Sparkles, User, LogOut, Code, ShieldCheck, Menu, X } from 'lucide-react';
import BrandLogo from './BrandLogo';

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function Navbar({ 
  user, 
  onOpenAuth, 
  onLogout, 
  activeTab, 
  setActiveTab, 
  purchasedCount 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'marketplace', label: 'Home' },
    { id: 'projects', label: 'Portfolio' },
    { id: 'theory', label: 'BlackLine Theory' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About Us' },
    { id: 'pricing', label: 'Packages' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#9E9E9E]/20 bg-[#0F0F0F]/90 backdrop-blur-md">
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 h-16 sm:h-20 py-1.5 flex items-center justify-between">
        
        {/* Brand Logo */}
        <BrandLogo
          className="h-10 sm:h-14 md:h-16 max-h-full w-auto"
          onClick={() => handleTabClick('marketplace')}
        />

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#18181C]/90 p-1.5 rounded-full border border-[#9E9E9E]/20">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#FF2ED4]/25 to-[#30BBFF]/25 text-white border border-[#FF2ED4]/40 shadow-sm shadow-[#FF2ED4]/20'
                  : 'text-[#9E9E9E] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Account / Auth Actions / Social */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instagram Handle Link */}
          <a
            href="https://instagram.com/blcklinecreative"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#18181C] border border-[#FF2ED4]/30 text-[#FF2ED4] hover:bg-[#FF2ED4]/15 hover:border-[#FF2ED4]/50 transition-all flex items-center gap-1.5 text-xs font-bold"
            title="Follow on Instagram @blcklinecreative"
          >
            <InstagramIcon className="w-4 h-4 text-[#FF2ED4]" />
            <span className="hidden sm:inline text-[11px] font-mono">@blcklinecreative</span>
          </a>

          {/* Scheduled Consultations Badge */}
          {purchasedCount > 0 && (
            <button
              onClick={() => handleTabClick('dashboard')}
              className="relative p-2 sm:p-2.5 rounded-xl bg-[#18181C] border border-[#FF2ED4]/30 text-[#30BBFF] hover:bg-[#222228] transition-all"
              title="My Consultations Portal"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFA530]" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-[#FF2ED4] to-[#30BBFF] text-[#0F0F0F] text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-md">
                {purchasedCount}
              </span>
            </button>
          )}

          {/* Mobile / Tablet Menu Button Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#18181C] text-[#30BBFF] border border-[#9E9E9E]/25 hover:bg-[#222228] transition-all ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile & Tablet Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#9E9E9E]/20 bg-[#0F0F0F]/95 backdrop-blur-xl px-4 py-3 shadow-2xl shadow-black/80 animate-fadeIn">
          <div className="flex flex-col space-y-1.5">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#FF2ED4]/25 via-[#30BBFF]/20 to-[#30BBFF]/10 text-white border border-[#FF2ED4]/40 shadow-sm shadow-[#FF2ED4]/20'
                    : 'bg-[#18181C]/90 text-[#9E9E9E] hover:text-white hover:bg-[#222228] border border-[#9E9E9E]/15'
                }`}
              >
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <span className="w-2 h-2 rounded-full bg-[#FF2ED4] shadow-sm shadow-[#FF2ED4]"></span>
                )}
              </button>
            ))}

            <a
              href="https://instagram.com/blcklinecreative"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-between bg-[#18181C]/90 text-[#FF2ED4] hover:bg-[#FF2ED4]/15 border border-[#FF2ED4]/30 transition-all mt-1"
            >
              <span className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4" />
                <span>@blcklinecreative</span>
              </span>
              <span className="text-[10px] font-mono text-[#9E9E9E]">Instagram</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
