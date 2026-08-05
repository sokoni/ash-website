import React from 'react';

export default function BrandLogo({ onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex flex-col leading-none select-none cursor-pointer group shrink-0 ${onClick ? 'hover:opacity-95' : ''}`}
    >
      <div className="font-extrabold text-base sm:text-lg tracking-[0.18em] text-white uppercase transition-colors">
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
  );
}
