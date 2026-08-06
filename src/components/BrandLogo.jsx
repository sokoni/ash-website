import React from 'react';

export default function BrandLogo({ className = "h-16 sm:h-20 md:h-24 w-auto", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none shrink-0 ${onClick ? 'hover:opacity-90' : ''}`}
    >
      <img
        src="/blackline-logo.png"
        alt="BlackLine Creative Official Logo"
        className={`${className} object-contain max-h-24 sm:max-h-28 w-auto`}
      />
    </div>
  );
}
