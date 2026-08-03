import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, Code, ShoppingCart, Check, ExternalLink, Sparkles } from 'lucide-react';

export default function LivePreviewModal({ template, onClose, onBuyNow }) {
  const [device, setDevice] = useState('desktop'); // desktop, tablet, mobile
  const [viewTab, setViewTab] = useState('preview'); // preview, code

  if (!template) return null;

  const deviceWidths = {
    desktop: 'w-full max-w-5xl h-[580px]',
    tablet: 'w-[768px] h-[580px]',
    mobile: 'w-[375px] h-[580px]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A0F]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-[#0E1420] border border-[#A0C4FF]/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Control Header Bar */}
        <div className="px-6 py-4 border-b border-[#A0C4FF]/15 flex flex-wrap items-center justify-between gap-4 bg-[#070A0F]/90">
          
          {/* Template Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#A0C4FF] to-[#38BDF8] p-0.5">
              <img src={template.image} alt={template.name} className="w-full h-full object-cover rounded-[10px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-base">{template.name}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#A0C4FF]/15 text-[#A0C4FF] border border-[#A0C4FF]/30 font-semibold">
                  {template.category}
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">{template.tagline}</p>
            </div>
          </div>

          {/* View Toggles & Device Mode */}
          <div className="flex items-center gap-3">
            {/* Preview vs Code Tab */}
            <div className="flex items-center bg-[#070A0F] p-1 rounded-xl border border-[#A0C4FF]/20 text-xs">
              <button
                onClick={() => setViewTab('preview')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  viewTab === 'preview' ? 'bg-[#A0C4FF]/20 text-white border border-[#A0C4FF]/30' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Interactive UI
              </button>
              <button
                onClick={() => setViewTab('code')}
                className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                  viewTab === 'code' ? 'bg-[#A0C4FF]/20 text-white border border-[#A0C4FF]/30' : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </button>
            </div>

            {/* Device Switcher */}
            {viewTab === 'preview' && (
              <div className="hidden sm:flex items-center bg-[#070A0F] p-1 rounded-xl border border-[#A0C4FF]/20">
                <button
                  onClick={() => setDevice('desktop')}
                  className={`p-1.5 rounded-lg transition-all ${
                    device === 'desktop' ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevice('tablet')}
                  className={`p-1.5 rounded-lg transition-all ${
                    device === 'tablet' ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDevice('mobile')}
                  className={`p-1.5 rounded-lg transition-all ${
                    device === 'mobile' ? 'bg-[#38BDF8]/20 text-[#38BDF8]' : 'text-[#94A3B8] hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBuyNow(template);
              }}
              className="btn-pastel-primary px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Buy (${template.price})</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#070A0F] text-[#94A3B8] hover:text-white hover:bg-white/10 border border-[#A0C4FF]/20 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* View Content Area */}
        <div className="p-6 bg-[#070A0F]/60 flex-1 overflow-y-auto flex items-center justify-center min-h-[480px]">
          {viewTab === 'preview' ? (
            <div className={`transition-all duration-300 mx-auto ${deviceWidths[device]} glass-panel rounded-2xl overflow-hidden border border-[#A0C4FF]/25 shadow-2xl flex flex-col bg-[#070A0F]`}>
              
              {/* Browser Header Bar */}
              <div className="px-4 py-2.5 bg-[#070A0F] border-b border-[#A0C4FF]/15 flex items-center justify-between text-xs text-[#94A3B8]">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="px-6 py-1 rounded-md bg-[#0E1420] border border-[#A0C4FF]/10 text-[11px] text-[#A0C4FF] font-mono truncate max-w-xs">
                  https://preview.blacklinecreative.dev/{template.id}
                </div>
                <div className="text-[10px] text-[#38BDF8] font-bold">100% Live Mock</div>
              </div>

              {/* Live Interactive Preview Workspace Canvas */}
              <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#070A0F] to-[#0E1420] space-y-6">
                
                {/* Simulated Web Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#A0C4FF]/15">
                  <div className="flex items-center gap-2 font-bold text-white">
                    <Sparkles className="w-5 h-5 text-[#38BDF8]" />
                    <span>{template.name} Demo</span>
                  </div>
                  <div className="flex gap-3 text-xs text-[#94A3B8]">
                    <span>Features</span>
                    <span>Pricing</span>
                    <span>Docs</span>
                    <span className="text-[#A0C4FF] font-semibold">Contact</span>
                  </div>
                </div>

                {/* Simulated Hero */}
                <div className="py-8 text-center space-y-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-[#A0C4FF]/15 text-[#A0C4FF] border border-[#A0C4FF]/30 font-semibold">
                    {template.tagline}
                  </span>
                  <h1 className="text-3xl font-extrabold text-white max-w-xl mx-auto leading-tight">
                    The Ultimate Web Solution for Your Next Project
                  </h1>
                  <p className="text-xs text-[#94A3B8] max-w-md mx-auto">
                    Built with clean architecture, modern React 18, and ready for instant deployment to Vercel and GitHub.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button className="btn-pastel-primary px-5 py-2 rounded-xl text-xs">Get Started Free</button>
                    <button className="btn-pastel-secondary px-5 py-2 rounded-xl text-xs">View Components</button>
                  </div>
                </div>

                {/* Feature Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#A0C4FF]/15">
                  {template.features.map((feat, idx) => (
                    <div key={idx} className="glass-panel p-3 rounded-xl flex items-center gap-2.5 text-xs text-white border border-[#A0C4FF]/15">
                      <Check className="w-4 h-4 text-[#38BDF8]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          ) : (
            <div className="w-full max-w-4xl glass-panel p-6 rounded-2xl border border-[#A0C4FF]/20 bg-[#070A0F] font-mono text-xs text-[#B9D6F2] overflow-x-auto space-y-3">
              <div className="flex items-center justify-between text-[#94A3B8] pb-3 border-b border-[#A0C4FF]/15">
                <span>src/components/{template.name.replace(/\s+/g, '')}.jsx</span>
                <span className="text-[#38BDF8]">React 18 + Vite</span>
              </div>
              <pre className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
                {template.demoCode || `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="bg-slate-900 text-white p-8">\n      <h1>Welcome to ${template.name}</h1>\n    </div>\n  );\n}`}
              </pre>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
