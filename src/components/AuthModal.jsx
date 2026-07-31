import React, { useState } from 'react';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, Shield, ArrowRight } from 'lucide-react';

export default function AuthModal({ initialMode = 'signin', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userProfile = {
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: name || (email ? email.split('@')[0] : 'Individual Creator'),
        email: email || 'user@websphere.dev',
        role: 'Individual Developer Account',
        createdAt: new Date().toLocaleDateString()
      };
      onLoginSuccess(userProfile);
    }, 1000);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr_demo_88',
        name: 'Alex Morgan',
        email: 'alex.morgan@dev.io',
        role: 'Pro Individual Creator',
        createdAt: '2026-07-15'
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A0F]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0E1420] border border-[#A0C4FF]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#A0C4FF]/15 flex items-center justify-between bg-[#070A0F]">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#38BDF8]" />
            <span className="font-extrabold text-white text-base">Individual Account</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {/* Tab Selector */}
          <div className="flex bg-[#070A0F] p-1 rounded-2xl border border-[#A0C4FF]/20">
            <button
              onClick={() => setMode('signin')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-[#A0C4FF] to-[#38BDF8] text-[#070A0F] shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-[#A0C4FF] to-[#38BDF8] text-[#070A0F] shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              Create Individual Account
            </button>
          </div>

          {/* Preset Quick Demo Login Trigger */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-[#A0C4FF]/10 hover:bg-[#A0C4FF]/20 border border-[#A0C4FF]/30 text-[#A0C4FF] text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#38BDF8]" />
            <span>1-Click Demo Account Login</span>
          </button>

          <div className="relative flex items-center justify-center text-[10px] uppercase text-[#94A3B8]">
            <div className="border-t border-[#A0C4FF]/15 w-full" />
            <span className="bg-[#0E1420] px-3 shrink-0">Or enter credentials</span>
            <div className="border-t border-[#A0C4FF]/15 w-full" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'signup' && (
              <div>
                <label className="block text-xs text-[#94A3B8] font-semibold mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A0C4FF]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs text-[#94A3B8] font-semibold mb-1">Individual Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A0C4FF]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@creator.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#94A3B8] font-semibold mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A0C4FF]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-pastel-primary w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In to Account' : 'Register Individual Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center text-[11px] text-[#94A3B8]">
            By signing in, you agree to WebSphere's terms of service and commercial license agreement.
          </div>

        </div>

      </div>
    </div>
  );
}
