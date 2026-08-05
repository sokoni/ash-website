import React from 'react';

export default function BrandLogo({ className = "h-10 w-auto", showText = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 cursor-pointer group shrink-0 ${onClick ? 'hover:opacity-95' : ''}`}
    >
      <div className="relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
        <img
          src="/logo.png"
          alt="BlackLine Creative Logo"
          className={`${className} object-contain filter drop-shadow-[0_0_12px_rgba(255,46,212,0.35)]`}
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none select-none">
          <div className="font-extrabold text-base sm:text-lg tracking-[0.18em] text-white uppercase">
            BLACKL<span className="pink-i">ı</span>NE
          </div>

          {/* Signature Multi-Color Gradient Divider Line */}
          <div className="my-1.5 w-full">
            <div className="w-full h-[2.5px] rounded-full bg-gradient-to-r from-[#FFF37A] via-[#FFB347] via-[#FF2ED4] via-[#9B51E0] to-[#30BBFF] shadow-sm shadow-[#FF2ED4]/40" />
          </div>

          <div className="font-medium text-sm sm:text-base tracking-tight text-white flex items-center pt-0.5">
            <span>Creat<span className="pink-i">ı</span>ve</span>
          </div>
        </div>
      )}
    </div>
  );
}
