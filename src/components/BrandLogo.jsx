import React from 'react';

export default function BrandLogo({ className = "h-10 sm:h-14 md:h-18 w-auto", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none shrink-0 max-h-full ${onClick ? 'hover:opacity-90' : ''}`}
    >
      <img
        src="/blackline-logo.png"
        alt="BlackLine Creative Official Logo"
        className={`${className} object-contain max-h-full w-auto`}
      />
    </div>
  );
}

