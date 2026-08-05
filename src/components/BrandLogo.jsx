import React from 'react';

export default function BrandLogo({ className = "h-40 sm:h-48 md:h-56 lg:h-64 w-auto", onClick }) {
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none shrink-0 ${onClick ? 'hover:opacity-90' : ''}`}
    >
      <img
        src="/blackline-logo.png"
        alt="BlackLine Creative Official Logo"
        className={`${className} object-contain max-h-[20rem] sm:max-h-[24rem] w-auto`}
      />
    </div>
  );
}
