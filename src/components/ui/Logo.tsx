import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  variant?: 'horizontal' | 'full' | 'badge' | 'compact';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  inverted?: boolean;
  showTagline?: boolean;
}

/**
 * Premium Logo for Sawariya Diagnostic
 * Uses sophisticated typography and the new Teal/Emerald theme.
 * - SAWARIYA -> laboratory red
 * - DIAGNOSTIC LAB -> diagnostic blue
 * - Detect / Diagnose / Deliver -> warm brown
 */
export function Logo({
  variant = 'horizontal',
  size = 'md',
  className = '',
  inverted = false,
  showTagline = true,
}: LogoProps) {
  // Brand colors
  const brandColor = inverted ? 'text-[#E54848]' : 'text-[#A61E1E]';
  const diagColor = inverted ? 'text-[#B9D9FF]' : 'text-[#155E9A]';
  const taglineColor = inverted ? 'text-[#E8C8AE]' : 'text-[#7A4B2A]';
  const accentColor = inverted ? 'text-[#E8C8AE]' : 'text-[#7A4B2A]';

  const sizeConfigs = {
    xs: {
      brand: 'text-base sm:text-lg font-black tracking-tight leading-none',
      diag: 'text-xs sm:text-sm font-bold tracking-widest leading-none',
      tagline: 'text-[8px] xs:text-[9px]',
      icon: 'w-[54px] h-[54px] sm:w-[63px] sm:h-[63px]',
    },
    sm: {
      brand: 'text-lg sm:text-xl md:text-2xl font-black tracking-tight leading-none',
      diag: 'text-xs sm:text-sm md:text-base font-bold tracking-widest leading-none',
      tagline: 'text-[8.5px] xs:text-[9.5px] sm:text-[10.5px]',
      icon: 'w-[63px] h-[63px] sm:w-[72px] sm:h-[72px] md:w-[81px] md:h-[81px]',
    },
    md: {
      brand: 'text-xl sm:text-2xl md:text-[26px] font-black tracking-tight leading-none',
      diag: 'text-sm sm:text-base md:text-[17px] font-bold tracking-widest leading-tight',
      tagline: 'text-[10px] sm:text-xs',
      icon: 'w-[72px] h-[72px] sm:w-[81px] sm:h-[81px] md:w-[90px] md:h-[90px]',
    },
    lg: {
      brand: 'text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none',
      diag: 'text-base sm:text-xl lg:text-2xl font-bold tracking-widest leading-none',
      tagline: 'text-xs sm:text-sm',
      icon: 'w-[90px] h-[90px] sm:w-[108px] sm:h-[108px] md:w-[126px] md:h-[126px]',
    },
    xl: {
      brand: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none',
      diag: 'text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest leading-none',
      tagline: 'text-sm sm:text-base',
      icon: 'w-[108px] h-[108px] sm:w-[126px] sm:h-[126px] md:w-[144px] md:h-[144px]',
    },
  };

  const cfg = sizeConfigs[size];
  const dnaMarkSrc = `${import.meta.env.BASE_URL}brand/sawariya-dna-original.svg`;
  const horizontalMarkClass = 'w-[42px] h-[42px] sm:w-[54px] sm:h-[54px] md:w-[63px] md:h-[63px]';

  const gradientDef = (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <linearGradient id="sawariya-dna-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A61E1E" />
          <stop offset="50%" stopColor="#7A4B2A" />
          <stop offset="100%" stopColor="#155E9A" />
        </linearGradient>
      </defs>
    </svg>
  );

  // Compact variant for narrow spaces
  if (variant === 'compact') {
    return (
      <div className={`inline-flex flex-col leading-tight select-none ${className}`}>
        <span className={`font-sans ${brandColor} ${cfg.brand}`}>
          SAWARIYA
        </span>
        <span className={`font-sans uppercase ${diagColor} ${cfg.diag}`}>
          DIAGNOSTIC
        </span>
      </div>
    );
  }

  // Full Stacked Centered Text (Hero, Footer, or Modals)
  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {gradientDef}
        <div className="flex flex-col items-center leading-none space-y-1">
          <img src={dnaMarkSrc} alt="" className={`${cfg.icon} mb-2 object-contain`} aria-hidden="true" />
          <span className={`font-black tracking-tight font-sans text-2xl sm:text-3xl lg:text-4xl ${brandColor}`}>
            SAWARIYA
          </span>
          <span className={`font-bold tracking-widest uppercase font-sans text-base sm:text-lg lg:text-xl ${diagColor}`}>
            DIAGNOSTIC LAB
          </span>
        </div>
        
        {showTagline && (
          <div className="mt-3 flex flex-col items-center">
            <p className={`font-semibold tracking-wide ${taglineColor} ${cfg.tagline}`}>
              Detect <span className="text-slate-400 font-normal">|</span> Diagnose <span className="text-slate-400 font-normal">|</span> Deliver
            </p>
            {/* Minimalist Sub-bar */}
            <div className="flex items-center gap-2 mt-2 w-full max-w-[200px]">
              <div className={`h-[1px] flex-1 ${inverted ? 'bg-white/20' : 'bg-slate-200'}`} />
              <ShieldCheck className={`w-3.5 h-3.5 ${accentColor}`} />
              <div className={`h-[1px] flex-1 ${inverted ? 'bg-white/20' : 'bg-slate-200'}`} />
            </div>
          </div>
        )}
      </div>
    );
  }

  // Badge layout
  if (variant === 'badge') {
    return (
      <div className={`inline-flex flex-col bg-white/70 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] select-none text-left leading-none ${className}`}>
        <span className="font-black tracking-tight text-[#C62828] text-sm sm:text-base">
          SAWARIYA
        </span>
        <span className="font-bold tracking-widest uppercase text-[10px] sm:text-xs text-[#155E9A] mt-0.5">
          DIAGNOSTIC LAB
        </span>
        <span className="text-[8.5px] font-semibold text-slate-500 mt-1.5 flex items-center gap-1">
          <ShieldCheck className="w-2.5 h-2.5 text-[#7A4B2A]" />
          Detect • Diagnose • Deliver
        </span>
      </div>
    );
  }

  // Default: Horizontal Brand Wordmark
  return (
    <div className={`inline-flex flex-col text-left leading-none select-none ${className}`}>
      {gradientDef}
      <div className="flex items-center gap-2 flex-nowrap">
        <img src={dnaMarkSrc} alt="" className={`${horizontalMarkClass} flex-shrink-0 object-contain`} aria-hidden="true" />
        <div className="min-w-0 flex flex-col items-start leading-none">
          <span className={`font-sans tracking-tight ${brandColor} ${cfg.brand}`}>SAWARIYA</span>
          {showTagline && (
            <span className={`mt-1 font-semibold tracking-wide whitespace-nowrap ${taglineColor} ${cfg.tagline}`}>
              Detect <span className="opacity-40">|</span> Diagnose <span className="opacity-40">|</span> Deliver
            </span>
          )}
          <span className={`mt-1 font-sans uppercase ${diagColor} ${cfg.diag}`}>DIAGNOSTIC LAB</span>
        </div>
      </div>
      

    </div>
  );
}
