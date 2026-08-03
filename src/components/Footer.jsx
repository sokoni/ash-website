import React from 'react';
import { Code, GitBranch, Layers, ShieldCheck, Heart, CreditCard, Wallet, Coins } from 'lucide-react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-[#A0C4FF]/15 bg-[#070A0F] py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] p-0.5">
                <div className="w-full h-full bg-[#070A0F] rounded-[6px] flex items-center justify-center">
                  <Code className="w-4 h-4 text-[#A0C4FF]" />
                </div>
              </div>
              <span className="font-extrabold text-lg text-white">BlackLine <span className="pastel-glow-text">Creative</span></span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Premium website template marketplace featuring 3 payment options, individual sign-in, and instant source code ZIP downloads.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[#A0C4FF] uppercase tracking-wider mb-3">Marketplace</h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li><button onClick={() => onNavigate('marketplace')} className="hover:text-white transition-colors">Browse Templates</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">3 Payment Tiers</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Customer Dashboard</button></li>
            </ul>
          </div>

          {/* Payment Gateways */}
          <div>
            <h4 className="text-xs font-bold text-[#A0C4FF] uppercase tracking-wider mb-3">3 Payment Options</h4>
            <ul className="space-y-2 text-xs text-[#94A3B8]">
              <li className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5 text-[#38BDF8]" /> <span>Stripe Credit / Debit Card</span></li>
              <li className="flex items-center gap-2"><Wallet className="w-3.5 h-3.5 text-[#A0C4FF]" /> <span>PayPal & Apple Pay Express</span></li>
              <li className="flex items-center gap-2"><Coins className="w-3.5 h-3.5 text-[#64DFDF]" /> <span>Crypto USDT / ETH / SOL</span></li>
            </ul>
          </div>

          {/* Platform Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A0C4FF] uppercase tracking-wider mb-1">Status & Support</h4>
            <div className="glass-panel p-3 rounded-xl border border-[#A0C4FF]/15 text-xs text-[#B9D6F2] space-y-1.5">
              <div className="flex items-center justify-between">
                <span>Code Package Delivery:</span>
                <span className="text-emerald-400 font-bold text-[10px]">Instant</span>
              </div>
              <div className="flex items-center justify-between">
                <span>License Key Generator:</span>
                <span className="text-emerald-400 font-bold text-[10px]">Operational</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#A0C4FF]/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#94A3B8] gap-4">
          <div>
            © {new Date().getFullYear()} BlackLine Creative Inc. All rights reserved. Styled in Pastel Blue & Obsidian Black.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#38BDF8]" /> SSL Protected</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
