import React from 'react';

export default function BrandLogo({ className = "h-9 w-auto", showText = true, onClick }) {
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
        <div className="flex flex-col leading-none">
          <div className="font-extrabold text-base sm:text-lg tracking-widest text-white uppercase relative pb-1 border-b-2 border-[#30BBFF]">
            BLACKL<span className="pink-i">ı</span>NE
          </div>
          <div className="font-medium text-sm sm:text-base tracking-tight text-white flex items-center pt-1">
            <span>Creat<span className="pink-i">ı</span>ve</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF2ED4] ml-0.5 inline-block animate-pulse"></span>
          </div>
        </div>
      )}
    </div>
  );
}
