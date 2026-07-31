import React, { useState } from 'react';
import { User, Key, Download, GitBranch, ExternalLink, ShieldCheck, Layers, CheckCircle2, Sparkles, Code, Trash2 } from 'lucide-react';

export default function UserDashboard({ user, purchases, onOpenDeploy, onSelectMarketplace }) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

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
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Account Banner */}
      <div className="glass-panel p-8 rounded-3xl border border-[#A0C4FF]/25 bg-gradient-to-r from-[#0E1420] via-[#141C2E] to-[#0E1420] relative overflow-hidden mb-10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-xl shadow-[#38BDF8]/20 shrink-0">
              <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center text-white font-extrabold text-2xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-extrabold text-white">{user?.name || 'Individual Creator'}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#A0C4FF]/15 text-[#A0C4FF] border border-[#A0C4FF]/30">
                  Verified Individual Account
                </span>
              </div>
              <p className="text-xs text-[#94A3B8] mt-1">{user?.email}</p>
              <div className="flex items-center gap-3 text-[11px] text-[#A0C4FF] font-mono mt-2">
                <span>Member Since: {user?.createdAt || '2026'}</span>
                <span>•</span>
                <span>Licenses Active: {purchases.length}</span>
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
                    <Github className="w-4 h-4" />
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
