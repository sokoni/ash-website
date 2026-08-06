import React from 'react';

export default function BrandLogo({ className = "h-24 sm:h-32 md:h-40 w-auto", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none shrink-0 ${onClick ? 'hover:opacity-90' : ''}`}
    >
      <img
        src="/blackline-logo.png"
        alt="BlackLine Creative Official Logo"
        className={`${className} object-contain max-h-40 sm:max-h-48 w-auto`}
      />
    </div>
  );
}
