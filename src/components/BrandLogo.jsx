import React from 'react';

export default function BrandLogo({ className = "w-[280px] sm:w-[420px] md:w-[560px] lg:w-[680px] h-auto", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none shrink-0 py-2 ${onClick ? 'hover:opacity-90' : ''}`}
    >
      <img
        src="/blackline-logo.png"
        alt="BlackLine Creative Official Logo"
        className={`${className} object-contain scale-[3.5] sm:scale-[4] transform origin-center transition-transform duration-300`}
      />
    </div>
  );
}
