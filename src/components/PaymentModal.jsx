import React, { useState } from 'react';
import { X, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ConsultationModal({ item, onClose }) {
  const [iframeLoading, setIframeLoading] = useState(true);

  if (!item) return null;

  const calUrl = "https://cal.com/blackline-creative-llc/30min";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl h-[90vh] max-h-[750px] bg-[#0E1420] border border-[#38BDF8]/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#070A0F]/90 border-b border-[#A0C4FF]/15 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF2ED4] via-[#38BDF8] to-[#A0C4FF] p-0.5 shadow-md">
              <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-[#38BDF8]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">Schedule 1-on-1 Strategy Call</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#38BDF8]/10 text-[#38BDF8] text-[10px] font-bold border border-[#38BDF8]/20">
                  Cal.com Live Sync
                </span>
              </div>
              <p className="text-xs text-[#94A3B8]">
                {item.name || 'BlackLine Creative Consultation'} • Real-time calendar availability & anti-double booking
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={calUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#18181C] hover:bg-[#222228] border border-[#A0C4FF]/20 text-[#A0C4FF] text-xs font-semibold transition-all"
              title="Open in new window"
            >
              <span>Open in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-[#18181C] hover:bg-[#222228] border border-[#A0C4FF]/20 text-[#94A3B8] hover:text-white transition-all"
              aria-label="Close scheduler"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {iframeLoading && (
          <div className="absolute inset-0 top-[73px] bg-[#0E1420] flex flex-col items-center justify-center space-y-3 z-10">
            <div className="w-10 h-10 border-3 border-[#38BDF8]/20 border-t-[#38BDF8] rounded-full animate-spin"></div>
            <p className="text-xs text-[#94A3B8] font-medium">Connecting to BlackLine Creative Cal.com Scheduler...</p>
          </div>
        )}

        {/* Cal.com Embedded Scheduler Iframe */}
        <div className="flex-1 w-full h-full relative bg-[#070A0F]">
          <iframe
            src="https://cal.com/blackline-creative-llc/30min?embed=true"
            title="BlackLine Creative Consultation Scheduler"
            className="w-full h-full border-0"
            onLoad={() => setIframeLoading(false)}
            allow="camera; microphone; autoplay; clipboard-write; encrypted-media"
          />
        </div>

        {/* Modal Footer Banner */}
        <div className="p-3 bg-[#070A0F]/90 border-t border-[#A0C4FF]/15 flex items-center justify-between text-xs text-[#94A3B8] shrink-0 px-5">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Instant Google Calendar Sync for <strong className="text-white">contact@blackline-creative.com</strong></span>
          </div>
          <a
            href={calUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#38BDF8] hover:underline font-semibold flex items-center gap-1 sm:hidden"
          >
            <span>Open Link</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>
    </div>
  );
}
