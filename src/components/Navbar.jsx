import React, { useState } from 'react';
import { Sparkles, User, LogOut, Code, ShieldCheck, Menu, X } from 'lucide-react';

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
    { id: 'theory', label: 'BlackLine Theory' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Us' },
    { id: 'pricing', label: 'Packages' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#A0C4FF]/15 bg-[#070A0F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('marketplace')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-lg shadow-[#38BDF8]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#070A0F] rounded-[10px] flex items-center justify-center">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-[#A0C4FF] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">BlackLine <span className="pastel-glow-text">Creative</span></span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-[#94A3B8] font-medium tracking-wide">Web Strategy & Custom Design Agency</span>
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#0E1420]/80 p-1.5 rounded-full border border-[#A0C4FF]/15">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#A0C4FF]/20 to-[#38BDF8]/20 text-white border border-[#A0C4FF]/40 shadow-sm shadow-[#38BDF8]/10'
                  : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* User Account / Auth Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Scheduled Consultations Badge */}
          {purchasedCount > 0 && (
            <button
              onClick={() => handleTabClick('dashboard')}
              className="relative p-2 sm:p-2.5 rounded-xl bg-[#0E1420] border border-[#A0C4FF]/20 text-[#A0C4FF] hover:bg-[#141C2E] transition-all"
              title="My Consultations Portal"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8]" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#A0C4FF] text-[#070A0F] text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-md">
                {purchasedCount}
              </span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTabClick('dashboard')}
                className={`flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#A0C4FF]/20 border-[#A0C4FF] text-white shadow-lg shadow-[#A0C4FF]/10'
                    : 'bg-[#0E1420] border-[#A0C4FF]/20 text-[#B9D6F2] hover:border-[#A0C4FF]/40 hover:text-white'
                }`}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] text-[#070A0F] font-bold flex items-center justify-center text-[10px] sm:text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="max-w-[70px] sm:max-w-[90px] truncate">{user.name || user.email}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" title="Verified Session" />
              </button>

              <button
                onClick={onLogout}
                className="px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#0E1420] border border-red-500/25 text-red-400 hover:bg-red-500/15 hover:border-red-500/50 text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#B9D6F2] hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn-pastel-primary px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#070A0F]" />
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Mobile / Tablet Menu Button Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#0E1420] text-[#A0C4FF] border border-[#A0C4FF]/20 hover:bg-[#141C2E] transition-all ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#A0C4FF]/15 bg-[#070A0F]/95 backdrop-blur-xl px-4 py-4 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#A0C4FF]/15">
            {navItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#A0C4FF]/25 to-[#38BDF8]/25 text-white border border-[#A0C4FF]/40'
                    : 'bg-[#0E1420] text-[#94A3B8] hover:text-white border border-[#A0C4FF]/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Sub-Navigation Pill Bar for Quick Phone Browsing */}
      <div className="lg:hidden px-4 py-2 bg-[#0E1420]/60 border-t border-[#A0C4FF]/10 overflow-x-auto no-scrollbar flex items-center gap-2">
        {navItems.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-all ${
              activeTab === tab.id
                ? 'bg-[#38BDF8]/20 text-white border border-[#38BDF8]/40'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
}
