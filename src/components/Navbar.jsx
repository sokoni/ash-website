import React from 'react';
import { Sparkles, ShoppingBag, User, LogOut, Code, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Navbar({ 
  user, 
  onOpenAuth, 
  onLogout, 
  activeTab, 
  setActiveTab, 
  purchasedCount 
}) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-[#A0C4FF]/15 bg-[#070A0F]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('marketplace')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-lg shadow-[#38BDF8]/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-[#070A0F] rounded-[10px] flex items-center justify-center">
              <Code className="w-5 h-5 text-[#A0C4FF] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-white">BlackLine <span className="pastel-glow-text">Creative</span></span>
            </div>
            <span className="text-[11px] text-[#94A3B8] font-medium tracking-wide">Web Strategy & Custom Design Agency</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0E1420]/80 p-1.5 rounded-full border border-[#A0C4FF]/15">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'marketplace'
                ? 'bg-gradient-to-r from-[#A0C4FF]/20 to-[#38BDF8]/20 text-white border border-[#A0C4FF]/40 shadow-sm shadow-[#38BDF8]/10'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            Service Concepts
          </button>
          
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === 'pricing'
                ? 'bg-gradient-to-r from-[#A0C4FF]/20 to-[#38BDF8]/20 text-white border border-[#A0C4FF]/40 shadow-sm shadow-[#38BDF8]/10'
                : 'text-[#94A3B8] hover:text-white hover:bg-white/5'
            }`}
          >
            Consultation Packages
          </button>
        </nav>

        {/* User Account / Auth Actions */}
        <div className="flex items-center gap-3">
          {/* Scheduled Consultations Badge */}
          {purchasedCount > 0 && (
            <button
              onClick={() => setActiveTab('dashboard')}
              className="relative p-2.5 rounded-xl bg-[#0E1420] border border-[#A0C4FF]/20 text-[#A0C4FF] hover:bg-[#141C2E] transition-all"
              title="My Consultations Portal"
            >
              <Sparkles className="w-5 h-5 text-[#38BDF8]" />
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#A0C4FF] text-[#070A0F] text-xs font-bold flex items-center justify-center shadow-md">
                {purchasedCount}
              </span>
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-sm font-semibold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-[#A0C4FF]/20 border-[#A0C4FF] text-white shadow-lg shadow-[#A0C4FF]/10'
                    : 'bg-[#0E1420] border-[#A0C4FF]/20 text-[#B9D6F2] hover:border-[#A0C4FF]/40 hover:text-white'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] text-[#070A0F] font-bold flex items-center justify-center text-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="max-w-[90px] truncate">{user.name || user.email}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" title="2-Step Verified Session" />
              </button>

              <button
                onClick={onLogout}
                className="px-3.5 py-2 rounded-xl bg-[#0E1420] border border-red-500/25 text-red-400 hover:bg-red-500/15 hover:border-red-500/50 text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Sign Out of Customer Account"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenAuth('signin')}
                className="px-4 py-2 text-sm font-semibold text-[#B9D6F2] hover:text-white transition-colors"
              >
                Customer Sign In
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="btn-pastel-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
