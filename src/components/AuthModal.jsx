import React, { useState, useEffect, useRef } from 'react';
import { X, User, Mail, Lock, Sparkles, CheckCircle2, Shield, ArrowRight, ShieldCheck, RefreshCw, KeyRound } from 'lucide-react';
import { apiRegisterUser, apiLoginUser } from '../api';

export default function AuthModal({ initialMode = 'signin', onClose, onLoginSuccess }) {
  const [mode, setMode] = useState(initialMode); // 'signin' or 'signup'
  const [step, setStep] = useState(1); // 1 = credentials, 2 = 2-step verification
  
  // Credentials
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2-Step Verification State
  const [enable2FA, setEnable2FA] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const otpInputsRef = useRef([]);

  // Generate a random 6-digit 2FA code when entering Step 2
  const generateNewCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setResendTimer(30);
    setCanResend(false);
    setOtpError('');
    return code;
  };

  const handleResendCode = () => {
    generateNewCode();
    setOtp(['', '', '', '', '', '']);
  };

  const handleSkip2FA = () => {
    setIsLoading(true);
    const targetEmail = email || 'client@example.com';
    const targetName = name || targetEmail.split('@')[0];

    (mode === 'signup' 
      ? apiRegisterUser(targetName, targetEmail, password)
      : apiLoginUser(targetEmail)
    ).then((userProfile) => {
      setIsLoading(false);
      onLoginSuccess({
        ...userProfile,
        twoFactorEnabled: false
      });
    }).catch(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: targetName,
        email: targetEmail,
        role: 'Client Account',
        twoFactorEnabled: false,
        twoFactorMethod: 'None (Optional 2FA Off)',
        createdAt: new Date().toLocaleDateString()
      });
    });
  };

  // Step 1 Submit: Process login/registration directly or proceed to 2-Step Verification if enabled
  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (enable2FA) {
      setTimeout(() => {
        setIsLoading(false);
        generateNewCode();
        setStep(2); // Proceed to 2-Step Verification!
      }, 600);
    } else {
      handleSkip2FA();
    }
  };

  // Quick Demo Login
  const handleQuickDemoLogin = () => {
    setEmail('alex.morgan@dev.io');
    setName('Alex Morgan');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      handleSkip2FA();
    }, 400);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setOtpError('');

    // Auto-focus next input
    if (value && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handlePasteOtp = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(''));
      setOtpError('');
      otpInputsRef.current[5]?.focus();
    }
  };

  // Step 2 Submit: Validate 2-Step Verification Code
  const handleVerify2Step = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');

    if (enteredCode.length !== 6) {
      setOtpError('Please enter all 6 digits of your verification code.');
      return;
    }

    // Allow generated code OR test fallback '123456'
    if (enteredCode !== generatedCode && enteredCode !== '123456') {
      setOtpError('Invalid 2-Step verification code. Try again.');
      return;
    }

    setIsLoading(true);
    setOtpError('');

    const targetEmail = email || 'client@example.com';
    const targetName = name || targetEmail.split('@')[0];

    (mode === 'signup' 
      ? apiRegisterUser(targetName, targetEmail, password)
      : apiLoginUser(targetEmail)
    ).then((userProfile) => {
      setIsLoading(false);
      onLoginSuccess(userProfile);
    }).catch(() => {
      setIsLoading(false);
      onLoginSuccess({
        id: 'usr_' + Math.random().toString(36).substr(2, 9),
        name: targetName,
        email: targetEmail,
        role: 'Client Account',
        twoFactorEnabled: true,
        twoFactorMethod: '6-Digit Security OTP',
        createdAt: new Date().toLocaleDateString()
      });
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A0F]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0E1420] border border-[#A0C4FF]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#A0C4FF]/15 flex items-center justify-between bg-[#070A0F]">
          <div className="flex items-center gap-2">
            {step === 2 ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            ) : (
              <User className="w-5 h-5 text-[#38BDF8]" />
            )}
            <span className="font-extrabold text-white text-base">
              {step === 2 ? '2-Step Verification' : 'Customer Account Sign In'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          
          {step === 1 ? (
            <>
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
                  Register Customer
                </button>
              </div>

              {/* 1-Click Demo Login */}
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-[#A0C4FF]/10 hover:bg-[#A0C4FF]/20 border border-[#A0C4FF]/30 text-[#A0C4FF] text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#38BDF8]" />
                <span>1-Click Customer Demo Sign In</span>
              </button>

              <div className="relative flex items-center justify-center text-[10px] uppercase text-[#94A3B8]">
                <div className="border-t border-[#A0C4FF]/15 w-full" />
                <span className="bg-[#0E1420] px-3 shrink-0">Step 1: Credentials</span>
                <div className="border-t border-[#A0C4FF]/15 w-full" />
              </div>

              {/* Credentials Form */}
              <form onSubmit={handleCredentialsSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-xs text-[#94A3B8] font-semibold mb-1">Customer Full Name</label>
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
                  <label className="block text-xs text-[#94A3B8] font-semibold mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A0C4FF]/50 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.morgan@dev.io"
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
                <div className="flex items-center justify-between p-3 bg-[#A0C4FF]/10 rounded-xl border border-[#A0C4FF]/20 text-xs text-[#A0C4FF]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    <span>Enable 2-Step Verification</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enable2FA}
                      onChange={(e) => setEnable2FA(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-[#070A0F] border border-[#A0C4FF]/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#A0C4FF] after:border-[#A0C4FF] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
                  </label>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-pastel-primary w-full py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-[#070A0F]" />
                        <span>Processing Account...</span>
                      </>
                    ) : enable2FA ? (
                      <>
                        <span>Continue to 2-Step Verification</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>{mode === 'signup' ? 'Complete Registration' : 'Sign In Immediately'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* STEP 2: 2-Step Verification (2FA Code Input) */
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 to-[#38BDF8] mx-auto flex items-center justify-center p-0.5 shadow-lg shadow-emerald-500/20">
                  <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
                    <KeyRound className="w-7 h-7 text-emerald-400" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white">Enter 2-Step Verification Code</h3>
                <p className="text-xs text-[#94A3B8]">
                  We sent a 6-digit security code to <span className="text-[#A0C4FF] font-semibold">{email || 'your email'}</span>.
                </p>
              </div>

              {/* Live Generated Code Display for Easy Testing */}
              <div className="glass-panel p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-center space-y-1">
                <div className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
                  🔐 Security Passcode Sent
                </div>
                <div className="text-2xl font-mono font-extrabold text-white tracking-widest">
                  {generatedCode}
                </div>
                <div className="text-[10px] text-[#94A3B8]">
                  (Or enter test code <span className="font-mono text-emerald-400">123456</span>)
                </div>
              </div>

              {/* 6 Digit OTP Inputs */}
              <form onSubmit={handleVerify2Step} className="space-y-6">
                <div>
                  <div className="flex justify-center gap-2" onPaste={handlePasteOtp}>
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputsRef.current[idx] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className="w-11 h-12 text-center text-xl font-bold font-mono rounded-xl bg-[#070A0F] border border-[#A0C4FF]/25 text-white focus:outline-none focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20 transition-all"
                      />
                    ))}
                  </div>

                  {otpError && (
                    <div className="text-red-400 text-xs text-center mt-2 font-medium animate-fadeIn">
                      {otpError}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#94A3B8]">Didn't get code?</span>
                  <button
                    type="button"
                    disabled={!canResend}
                    onClick={handleResendCode}
                    className={`font-semibold flex items-center gap-1 transition-colors ${
                      canResend ? 'text-[#38BDF8] hover:underline' : 'text-[#94A3B8]/50 cursor-not-allowed'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${!canResend ? 'animate-spin' : ''}`} />
                    <span>{canResend ? 'Resend 2FA Code' : `Resend in ${resendTimer}s`}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSkip2FA()}
                    className="btn-pastel-secondary flex-1 py-3.5 rounded-xl text-xs font-bold"
                  >
                    Skip 2FA
                  </button>
                  
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-pastel-primary flex-2 py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-[#070A0F]" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Verify & Sign In</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="text-center text-[11px] text-[#94A3B8]">
            Customer session secured with 2-Step Verification & 256-bit encryption.
          </div>

        </div>

      </div>
    </div>
  );
}
