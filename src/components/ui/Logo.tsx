import React from 'react';
import { ShieldCheck, Dna } from 'lucide-react';

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
 * - "SAWARIYA" -> Reddish Brown (#7E2222) / White
 * - "DIAGNOSTIC" -> Emerald (#00A896) / Teal (#0A6E5C)
 */
export function Logo({
  variant = 'horizontal',
  size = 'md',
  className = '',
  inverted = false,
  showTagline = true,
}: LogoProps) {
  // Brand colors
  const brandColor = inverted ? 'text-white' : 'text-[#7E2222]';
  const diagColor = inverted ? 'text-blue-200' : 'text-[#17365D]';
  const taglineColor = inverted ? 'text-teal-100/90' : 'text-slate-500';
  const accentColor = inverted ? 'text-teal-400' : 'text-[#00A896]';

  const sizeConfigs = {
    xs: {
      brand: 'text-sm xs:text-base font-black tracking-tight leading-none',
      diag: 'text-[10px] xs:text-xs font-bold tracking-widest leading-none',
      tagline: 'text-[8px] xs:text-[9px]',
      icon: 'w-6 h-6 -rotate-45',
    },
    sm: {
      brand: 'text-base xs:text-lg sm:text-xl font-black tracking-tight leading-none',
      diag: 'text-[11px] xs:text-xs sm:text-sm font-bold tracking-widest leading-none',
      tagline: 'text-[8.5px] xs:text-[9.5px] sm:text-[10.5px]',
      icon: 'w-8 h-8 -rotate-45',
    },
    md: {
      brand: 'text-xl sm:text-2xl font-black tracking-tight leading-none',
      diag: 'text-sm sm:text-base font-bold tracking-widest leading-none',
      tagline: 'text-[10.5px] sm:text-xs',
      icon: 'w-10 h-10 -rotate-45',
    },
    lg: {
      brand: 'text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none',
      diag: 'text-base sm:text-xl lg:text-2xl font-bold tracking-widest leading-none',
      tagline: 'text-xs sm:text-sm',
      icon: 'w-14 h-14 -rotate-45',
    },
    xl: {
      brand: 'text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-none',
      diag: 'text-xl sm:text-2xl lg:text-3xl font-bold tracking-widest leading-none',
      tagline: 'text-sm sm:text-base',
      icon: 'w-16 h-16 -rotate-45',
    },
  };

  const cfg = sizeConfigs[size];

  const gradientDef = (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        <linearGradient id="sawariya-dna-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E11D48" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#3B82F6" />
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
          <Dna className={`${cfg.icon} mb-2`} stroke="url(#sawariya-dna-gradient)" strokeWidth={2.2} />
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
        <span className="font-black tracking-tight text-[#7E2222] text-sm sm:text-base">
          SAWARIYA
        </span>
        <span className="font-bold tracking-widest uppercase text-[10px] sm:text-xs text-[#17365D] mt-0.5">
          DIAGNOSTIC LAB
        </span>
        <span className="text-[8.5px] font-semibold text-slate-500 mt-1.5 flex items-center gap-1">
          <ShieldCheck className="w-2.5 h-2.5 text-[#00A896]" />
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
        <Dna className={`${cfg.icon} flex-shrink-0`} stroke="url(#sawariya-dna-gradient)" strokeWidth={2.2} />
        <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap">
          <span className={`font-sans tracking-tight ${brandColor} ${cfg.brand}`}>
            SAWARIYA
          </span>
          <span className={`font-sans uppercase ${diagColor} ${cfg.diag}`}>
            DIAGNOSTIC
          </span>
        </div>
      </div>
      
      {showTagline && (
        <div className="hidden sm:flex items-center gap-1.5 mt-1.5 ml-1 leading-none pl-6 sm:pl-8">
          <span className={`font-semibold tracking-wide whitespace-nowrap ${taglineColor} ${cfg.tagline}`}>
            Detect <span className="opacity-40">|</span> Diagnose <span className="opacity-40">|</span> Deliver
          </span>
        </div>
      )}
    </div>
  );
}
