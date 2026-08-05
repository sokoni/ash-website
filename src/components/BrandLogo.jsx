import React from 'react';

export default function BrandLogo({ onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col leading-none select-none cursor-pointer group shrink-0 ${onClick ? 'hover:opacity-95' : ''}`}
    >
      <div className="font-extrabold text-base sm:text-lg tracking-[0.18em] text-white uppercase">
        BLACKL<span className="pink-i">ı</span>NE
      </div>

      {/* Embedded Unedited Signature Accent Image */}
      <img
        src="/line-accent.png"
        alt="BlackLine Accent"
        className="w-full h-auto object-contain my-0.5 drop-shadow-[0_0_8px_rgba(255,46,212,0.4)]"
      />

      <div className="font-medium text-sm sm:text-base tracking-tight text-white flex items-center">
        <span>Creat<span className="pink-i">ı</span>ve</span>
      </div>
    </div>
  );
}
