import React, { useState } from 'react';
import { User, Key, Download, GitBranch, ExternalLink, ShieldCheck, Layers, CheckCircle2, Sparkles, Code, Lock, Shield, Smartphone } from 'lucide-react';

export default function UserDashboard({ user, purchases, onOpenDeploy, onSelectMarketplace }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.twoFactorEnabled ?? true);
  const [showBackupCodes, setShowBackupCodes] = useState(false);

  const backupCodes = [
    'WS-2FA-9821-4401',
    'WS-2FA-1092-8832',
    'WS-2FA-7714-3091',
    'WS-2FA-5520-1184'
  ];

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadCode = (purchasedItem) => {
    setDownloadingId(purchasedItem.id);
    
    // Simulate ZIP file creation and download trigger
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([
        `// WebSphere Package Bundle: ${purchasedItem.websiteName}\n// License Key: ${purchasedItem.licenseKey}\n// Date: ${purchasedItem.date}\n\nexport default function App() {\n  return <div>Welcome to your website codebase!</div>;\n}`
      ], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${purchasedItem.websiteName.toLowerCase().replace(/\s+/g, '-')}-source-code.zip`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      setDownloadingId(null);
    }, 1200);
  };

  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Account & 2-Step Security Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/25 bg-gradient-to-r from-[#0E1420] via-[#141C2E] to-[#0E1420] relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-xl shadow-[#38BDF8]/20 shrink-0">
              <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center text-white font-extrabold text-2xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{user?.name || 'Customer Account'}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A0C4FF]/15 text-[#A0C4FF] border border-[#A0C4FF]/30">
                  Verified Customer Account
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">{user?.email}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#A0C4FF] font-mono mt-2">
                <span>Member Since: {user?.createdAt || '2026'}</span>
                <span>•</span>
                <span>Licenses Active: {purchases.length}</span>
                <span>•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  2-Step Verification Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenDeploy}
              className="btn-pastel-primary px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4" />
              <span>Deploy to GitHub & Vercel</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2-Step Verification Security Settings Panel */}
      <div className="glass-panel p-6 rounded-2xl border border-[#A0C4FF]/20 bg-[#0E1420]/80 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#A0C4FF]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">2-Step Verification (2FA)</h3>
                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold border uppercase ${
                  is2FAEnabled ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {is2FAEnabled ? 'Protected' : 'Disabled'}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-0.5">
                Protects your customer account by requiring a 6-digit verification code on sign in.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowBackupCodes(!showBackupCodes)}
              className="px-4 py-2 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-[#A0C4FF] hover:bg-[#141C2E] text-xs font-semibold"
            >
              {showBackupCodes ? 'Hide Recovery Keys' : 'View 2FA Backup Keys'}
            </button>

            <button
              onClick={() => setIs2FAEnabled(!is2FAEnabled)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                is2FAEnabled
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30'
                  : 'btn-pastel-primary'
              }`}
            >
              {is2FAEnabled ? '2FA Enabled' : 'Enable 2-Step Verification'}
            </button>
          </div>
        </div>

        {/* 2FA Backup Security Codes Drawer */}
        {showBackupCodes && (
          <div className="p-4 bg-[#070A0F] rounded-xl border border-[#A0C4FF]/15 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-[#94A3B8]">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#38BDF8]" />
                Emergency 2-Step Recovery Codes
              </span>
              <span>Use if you lose access to your email/authenticator</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs text-[#38BDF8]">
              {backupCodes.map((code, idx) => (
                <div key={idx} className="p-2 bg-[#0E1420] rounded-lg border border-[#A0C4FF]/10 text-center font-bold">
                  {code}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid: My Purchased Websites */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-[#38BDF8]" />
              <span>My Purchased Websites & Source Code</span>
            </h3>
            <p className="text-xs text-[#94A3B8] mt-0.5">
              Download ZIP source code packages and manage deployment licenses.
            </p>
          </div>

          <button
            onClick={onSelectMarketplace}
            className="btn-pastel-secondary px-4 py-2 rounded-xl text-xs font-bold"
          >
            + Buy Another Website
          </button>
        </div>

        {purchases.length === 0 ? (
          <div className="text-center py-16 glass-panel rounded-2xl border border-[#A0C4FF]/15 space-y-4">
            <Layers className="w-12 h-12 text-[#A0C4FF]/40 mx-auto" />
            <h4 className="text-lg font-bold text-white">No purchased websites yet</h4>
            <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
              Browse our catalog of 6+ pre-built websites with 3 payment options to start building immediately.
            </p>
            <button
              onClick={onSelectMarketplace}
              className="btn-pastel-primary px-6 py-2.5 rounded-xl text-xs font-bold"
            >
              Explore Website Catalog
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {purchases.map((item) => (
              <div
                key={item.id}
                className="glass-panel p-6 rounded-2xl border border-[#A0C4FF]/20 flex flex-col justify-between space-y-4 bg-[#0E1420]/90"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold uppercase">
                        License Active
                      </span>
                      <h4 className="text-lg font-bold text-white mt-2">{item.websiteName}</h4>
                      <p className="text-xs text-[#94A3B8]">Purchased on {item.date} via {item.paymentMethod.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-white">${item.price}</span>
                    </div>
                  </div>

                  {/* License Key Box */}
                  <div className="mt-4 p-3 bg-[#070A0F] rounded-xl border border-[#A0C4FF]/15 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-[#94A3B8] uppercase tracking-wider font-semibold block">Commercial License Key</span>
                      <span className="font-mono text-xs text-[#38BDF8] font-bold">{item.licenseKey}</span>
                    </div>
                    <button
                      onClick={() => handleCopyKey(item.licenseKey)}
                      className="px-3 py-1 rounded-lg bg-[#A0C4FF]/10 text-[#A0C4FF] hover:bg-[#A0C4FF]/20 text-[11px] font-semibold border border-[#A0C4FF]/20"
                    >
                      {copiedKey === item.licenseKey ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="pt-3 border-t border-[#A0C4FF]/15 flex items-center gap-3">
                  <button
                    onClick={() => handleDownloadCode(item)}
                    disabled={downloadingId === item.id}
                    className="btn-pastel-primary flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                  >
                    {downloadingId === item.id ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <span>Preparing ZIP Package...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download ZIP Code</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onOpenDeploy}
                    className="btn-pastel-secondary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                    title="Deploy to GitHub & Vercel"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>Deploy</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
}
