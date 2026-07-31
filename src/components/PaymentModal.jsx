import React, { useState } from 'react';
import { X, CreditCard, Wallet, Coins, Lock, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ item, user, onClose, onSuccessPayment, onRequireAuth }) {
  const [selectedMethod, setSelectedMethod] = useState('card'); // card, paypal, crypto
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Card Form State
  const [cardName, setCardName] = useState(user?.name || 'Alex Morgan');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  // Crypto State
  const [walletConnected, setWalletConnected] = useState(false);

  if (!item) return null;

  const itemPrice = item.price || 49;
  const itemName = item.name || 'Website License';

  const handlePaySubmit = (e) => {
    e.preventDefault();

    if (!user) {
      onRequireAuth();
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (err) {
        console.log('Confetti triggered');
      }

      // Record Order in User State
      setTimeout(() => {
        onSuccessPayment({
          id: 'ord_' + Math.random().toString(36).substr(2, 9),
          websiteId: item.id || 'web-custom',
          websiteName: itemName,
          price: itemPrice,
          paymentMethod: selectedMethod,
          licenseKey: 'WS-LIC-' + Math.random().toString(36).substr(2, 10).toUpperCase(),
          date: new Date().toLocaleDateString(),
          downloadUrl: '#'
        });
      }, 1500);

    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#070A0F]/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0E1420] border border-[#A0C4FF]/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#A0C4FF]/15 flex items-center justify-between bg-[#070A0F]/90">
          <div className="flex items-center gap-2 text-[#A0C4FF]">
            <Lock className="w-4 h-4 text-[#38BDF8]" />
            <span className="font-bold text-white text-sm">256-Bit SSL Checkout</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success View */}
        {isSuccess ? (
          <div className="p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#A0C4FF] mx-auto flex items-center justify-center p-0.5 shadow-xl shadow-[#38BDF8]/20 animate-bounce">
              <div className="w-full h-full bg-[#070A0F] rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#38BDF8]" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-white">Payment Successful!</h3>
              <p className="text-sm text-[#94A3B8] mt-2">
                Your website license for <span className="text-[#A0C4FF] font-semibold">{itemName}</span> has been added to your individual account.
              </p>
            </div>
            <div className="glass-panel p-4 rounded-xl text-xs text-left space-y-1 font-mono text-[#B9D6F2] border border-[#A0C4FF]/20">
              <div className="flex justify-between"><span>Status:</span> <span className="text-emerald-400 font-bold">PAID</span></div>
              <div className="flex justify-between"><span>Payment Method:</span> <span className="uppercase text-white">{selectedMethod}</span></div>
              <div className="flex justify-between"><span>License Key:</span> <span className="text-[#38BDF8]">WS-LIC-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span></div>
            </div>
            <div className="text-xs text-[#94A3B8] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38BDF8] animate-spin" />
              <span>Redirecting to your Account Dashboard...</span>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Summary Box */}
            <div className="glass-panel p-4 rounded-2xl border border-[#A0C4FF]/20 flex items-center justify-between bg-[#070A0F]/50">
              <div>
                <span className="text-[10px] text-[#A0C4FF] uppercase tracking-wider font-semibold">Selected Package</span>
                <h4 className="font-bold text-white text-base">{itemName}</h4>
                <p className="text-xs text-[#94A3B8]">Full React 18 Source Code + Deployment Guide</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-white">${itemPrice}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">One-time payment</span>
              </div>
            </div>

            {/* 3 Payment Options Selector */}
            <div>
              <label className="block text-xs font-bold text-[#A0C4FF] uppercase tracking-wider mb-3">
                Choose Payment Option (1 of 3)
              </label>

              <div className="grid grid-cols-3 gap-2">
                
                {/* Option 1: Credit Card */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedMethod === 'card'
                      ? 'bg-[#A0C4FF]/15 border-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/10'
                      : 'bg-[#070A0F] border-[#A0C4FF]/15 text-[#94A3B8] hover:border-[#A0C4FF]/30'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 ${selectedMethod === 'card' ? 'text-[#38BDF8]' : 'text-[#94A3B8]'}`} />
                  <div className="mt-2">
                    <div className="text-xs font-bold">Credit Card</div>
                    <div className="text-[9px] opacity-75">Stripe 256-Bit</div>
                  </div>
                </button>

                {/* Option 2: PayPal / Apple Pay */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('paypal')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedMethod === 'paypal'
                      ? 'bg-[#A0C4FF]/15 border-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/10'
                      : 'bg-[#070A0F] border-[#A0C4FF]/15 text-[#94A3B8] hover:border-[#A0C4FF]/30'
                  }`}
                >
                  <Wallet className={`w-5 h-5 ${selectedMethod === 'paypal' ? 'text-[#A0C4FF]' : 'text-[#94A3B8]'}`} />
                  <div className="mt-2">
                    <div className="text-xs font-bold">PayPal / Apple</div>
                    <div className="text-[9px] opacity-75">1-Click Express</div>
                  </div>
                </button>

                {/* Option 3: Crypto */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('crypto')}
                  className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                    selectedMethod === 'crypto'
                      ? 'bg-[#A0C4FF]/15 border-[#38BDF8] text-white shadow-md shadow-[#38BDF8]/10'
                      : 'bg-[#070A0F] border-[#A0C4FF]/15 text-[#94A3B8] hover:border-[#A0C4FF]/30'
                  }`}
                >
                  <Coins className={`w-5 h-5 ${selectedMethod === 'crypto' ? 'text-[#64DFDF]' : 'text-[#94A3B8]'}`} />
                  <div className="mt-2">
                    <div className="text-xs font-bold">Crypto USDT</div>
                    <div className="text-[9px] text-[#64DFDF] font-semibold">5% Off</div>
                  </div>
                </button>

              </div>
            </div>

            {/* Payment Method Forms */}
            <form onSubmit={handlePaySubmit} className="space-y-4">
              
              {selectedMethod === 'card' && (
                <div className="space-y-3 glass-panel p-4 rounded-xl border border-[#A0C4FF]/15 bg-[#070A0F]">
                  <div>
                    <label className="block text-[11px] text-[#94A3B8] mb-1 font-semibold">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0E1420] border border-[#A0C4FF]/20 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#94A3B8] mb-1 font-semibold">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-[#0E1420] border border-[#A0C4FF]/20 text-white text-xs font-mono focus:outline-none focus:border-[#38BDF8]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1 font-semibold">Expiry Date</label>
                      <input
                        type="text"
                        required
                        value={cardExp}
                        onChange={(e) => setCardExp(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0E1420] border border-[#A0C4FF]/20 text-white text-xs font-mono focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#94A3B8] mb-1 font-semibold">CVC / CVV</label>
                      <input
                        type="text"
                        required
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-[#0E1420] border border-[#A0C4FF]/20 text-white text-xs font-mono focus:outline-none focus:border-[#38BDF8]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'paypal' && (
                <div className="glass-panel p-6 rounded-xl border border-[#A0C4FF]/15 text-center space-y-4 bg-[#070A0F]">
                  <Wallet className="w-10 h-10 text-[#A0C4FF] mx-auto" />
                  <p className="text-xs text-[#94A3B8]">
                    Clicking complete will launch the secure PayPal or Apple Pay checkout window.
                  </p>
                  <div className="px-4 py-2 bg-amber-400/10 border border-amber-400/30 rounded-lg text-amber-300 text-xs font-semibold">
                    1-Click Fast Express Checkout Ready
                  </div>
                </div>
              )}

              {selectedMethod === 'crypto' && (
                <div className="glass-panel p-4 rounded-xl border border-[#64DFDF]/20 space-y-3 bg-[#070A0F]">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#94A3B8]">Accepted Tokens:</span>
                    <span className="font-mono text-[#64DFDF] font-bold">USDT / ETH / SOL</span>
                  </div>
                  <div className="p-3 bg-[#0E1420] rounded-lg border border-[#A0C4FF]/10 font-mono text-[11px] text-[#A0C4FF] break-all">
                    0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                  </div>
                  <div className="text-[10px] text-[#94A3B8] text-center">
                    Instant automated verification on block confirmation.
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="btn-pastel-primary w-full py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Processing Payment Option...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Complete Purchase (${itemPrice})</span>
                  </>
                )}
              </button>

            </form>

            <div className="text-center text-[11px] text-[#94A3B8] flex items-center justify-center gap-2 pt-2 border-t border-[#A0C4FF]/10">
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
              <span>Instant source code access granted immediately upon confirmation.</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
