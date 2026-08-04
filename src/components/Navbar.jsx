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
    // { id: 'projects', label: 'Projects' }, // Commented out
    { id: 'about', label: 'About Us' },
    { id: 'pricing', label: 'Packages' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#9E9E9E]/20 bg-[#0F0F0F]/90 backdrop-blur-md">
      <div className="w-full max-w-none px-4 sm:px-8 lg:px-12 xl:px-16 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTabClick('marketplace')}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#FF2ED4] via-[#30BBFF] to-[#FFA530] p-0.5 shadow-lg shadow-[#FF2ED4]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#0F0F0F] rounded-[10px] flex items-center justify-center">
              <Code className="w-4 h-4 sm:w-5 sm:h-5 text-[#30BBFF] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <div className="font-extrabold text-base sm:text-lg tracking-widest text-white uppercase relative pb-1 border-b-2 border-[#30BBFF]">
              BLACKLINE
            </div>
            <div className="font-medium text-sm sm:text-base tracking-tight text-white flex items-center pt-1">
              <span>Creative</span><span className="w-1.5 h-1.5 rounded-full bg-[#FF2ED4] ml-0.5 inline-block animate-pulse"></span>
            </div>
          </div>
        </div>

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

        {/* User Account / Auth Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
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

          {/* {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTabClick('dashboard')}
                className={`flex items-center gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#FF2ED4]/20 border-[#FF2ED4] text-white shadow-lg shadow-[#FF2ED4]/10'
                    : 'bg-[#18181C] border-[#9E9E9E]/25 text-[#F5F5F5] hover:border-[#30BBFF]/50 hover:text-white'
                }`}
              >
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-tr from-[#FF2ED4] to-[#30BBFF] text-[#0F0F0F] font-bold flex items-center justify-center text-[10px] sm:text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="max-w-[70px] sm:max-w-[90px] truncate">{user.name || user.email}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 hidden sm:inline" title="Verified Session" />
              </button>

              <button
                onClick={onLogout}
                className="px-2.5 sm:px-3.5 py-2 rounded-xl bg-[#18181C] border border-red-500/25 text-red-400 hover:bg-red-500/15 hover:border-red-500/50 text-xs font-bold flex items-center gap-1.5 transition-all"
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
                className="px-2.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#F5F5F5] hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn-pastel-primary px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0F0F0F]" />
                <span>Register</span>
              </button>
            </div>
          )} */}

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
          </div>
        </div>
      )}
    </header>
  );
}
