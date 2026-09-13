'use client';

import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { Phone, MessageCircle, Home, FileText } from 'lucide-react';
import { footer } from '@/data/website-content';
import { ReportDownloadModal } from '../ui/ReportDownloadModal';

export function MobileBottomDock() {
  const scrollToHomeCollection = () => {
    const el = document.getElementById('home-collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent('Hi, I would like to book a blood test / health package at Sawariya Diagnostic.');
    const url = whatsappHref('Hi, I want to book a test at Sawariya Diagnostic.'); if (url) window.open(url, '_blank');
  };

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[100] px-2.5 pt-2 pb-[max(0.5rem,calc(env(safe-area-inset-bottom,0px)+4px))] pointer-events-none">
      {/* Floating Glass Bar */}
      <div className="w-full max-w-[420px] mx-auto pointer-events-auto bg-[#102A43]/85 backdrop-blur-[30px] border border-white/20 rounded-[22px] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)] flex items-center justify-between gap-1 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-[-1] pointer-events-none opacity-50 mix-blend-screen">
          <div className="absolute top-[-50%] left-[-20%] w-[100px] h-[100px] bg-[#155E9A]/20 rounded-full blur-[40px] " />
          <div className="absolute bottom-[-50%] right-[-20%] w-[120px] h-[120px] bg-[#155E9A]/50 rounded-full blur-[40px] " style={{ animationDelay: '-3s' }} />
        </div>
        
        {/* Report assistance button */}
        <ReportDownloadModal trigger={
          <button
            className="flex-1 flex items-center justify-center gap-1 min-[360px]:gap-1.5 bg-white/10 hover:bg-white/15 active:bg-white/5 border border-white/10 rounded-[18px] h-11 min-[360px]:h-12 px-1 text-xs font-semibold text-slate-100 transition-surface duration-150 active:scale-[0.95] select-none cursor-pointer min-w-0"
            aria-label="Patient Lab Portal"
          >
            <div className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6 rounded-[8px] bg-[#155E9A]/12 flex items-center justify-center text-blue-200 shrink-0">
              <FileText className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5" />
            </div>
            <span className="text-[10px] min-[360px]:text-xs font-bold text-white truncate">Reports</span>
          </button>
        } />

        {/* Primary CTA: Book Home Sample */}
        <button
          onClick={scrollToHomeCollection}
          className="flex-[1.2] flex items-center justify-center gap-1 min-[360px]:gap-1.5 bg-white text-[#102A43] rounded-[18px] h-11 min-[360px]:h-12 px-1.5 min-[360px]:px-2.5 text-xs font-bold shadow-[0_4px_12px_rgba(255,255,255,0.2)] transition-surface duration-150 hover:bg-white/90 active:scale-[0.95] select-none border border-white cursor-pointer min-w-0"
          aria-label="Book Doorstep Home Sample"
        >
          <Home className="w-3.5 h-3.5 text-[#102A43] shrink-0" />
          <span className="truncate tracking-tight font-bold text-[10px] min-[360px]:text-xs">Book Visit</span>
        </button>

        {/* 24*7 Quick Call */}
        <a
          href={telHref(siteConfig.contact.phone)}
          className="w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 shrink-0 flex items-center justify-center bg-white/10 hover:bg-white/15 active:bg-white/5 border border-white/10 rounded-[18px] transition-surface duration-150 active:scale-[0.95] select-none"
          aria-label="Call 24*7 Helpline"
        >
          <Phone className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 text-[#F1C27D]" />
        </a>

        {/* WhatsApp Quick Chat */}
        <button
          onClick={handleWhatsApp}
          className="w-11 h-11 min-[360px]:w-12 min-[360px]:h-12 shrink-0 flex items-center justify-center bg-[#25D366] hover:bg-[#20bd5a] rounded-[18px] transition-surface duration-150 active:scale-[0.95] shadow-xs select-none border border-[#25D366] cursor-pointer"
          aria-label="Chat with Doctor on WhatsApp"
        >
          <MessageCircle className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 text-white" fill="white" />
        </button>
      </div>
    </div>
  );
}
