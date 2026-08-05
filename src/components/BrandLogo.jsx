import React from 'react';

export default function BrandLogo({ className = "h-12 sm:h-16 w-auto", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none shrink-0 ${onClick ? 'hover:opacity-90' : ''}`}
    >
      <img
        src="/blackline-logo.png"
        alt="BlackLine Creative Official Logo"
        className={`${className} object-contain max-h-16 sm:max-h-20 w-auto`}
      />
    </div>
  );
}
