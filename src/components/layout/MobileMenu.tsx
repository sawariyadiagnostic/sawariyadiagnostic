'use client';

import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { FileDown, Phone, ShieldCheck, X, Home, Calendar, MessageCircle, ChevronRight, Activity, TestTube, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Logo } from '../ui/Logo';
import { navigation } from '@/data/website-content';
import { ReportDownloadModal } from '../ui/ReportDownloadModal';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

export function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps) {
  if (!isOpen) return null;

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent('Hi, I want to book a blood test or health package at Sawariya Diagnostic.');
    const url = whatsappHref('Hi, I want to book a test at Sawariya Diagnostic.'); if (url) window.open(url, '_blank');
    onClose();
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-[120] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sheet Drawer */}
      <div 
        className="lg:hidden fixed top-0 right-0 h-full w-[340px] max-w-[88vw] bg-white/70 backdrop-blur-[40px] border-l border-white/60 z-[130] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col justify-between overflow-y-auto pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] transition-transform duration-300"
      >
        <div className="p-5">
          {/* Header with Logo */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <Logo variant="horizontal" size="xs" showTagline={true} />
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-700 bg-white/60 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-90 transition-surface cursor-pointer border border-white/80"
              aria-label="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-1.5 pt-4">
            {navigation.links.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  scrollToSection(link.href);
                  onClose();
                }}
                className="flex items-center justify-between px-4 py-3 text-slate-800 hover:text-[#155E9A] hover:bg-white/60 active:bg-white/80 rounded-[16px] font-semibold text-sm transition-surface duration-150 active:scale-[0.98] border border-transparent hover:border-white/60 hover:shadow-2xs cursor-pointer"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          {/* Direct Action Buttons */}
          <div className="mt-5 space-y-2.5 pt-4 border-t border-black/[0.06]">
            <Button
              className="w-full btn-primary h-12 text-sm font-bold shadow-md rounded-[16px] active:scale-[0.97]"
              onClick={() => {
                scrollToSection('home-collection');
                onClose();
              }}
            >
              <Home className="w-4 h-4 mr-2" />
              Book Home Sample Visit
            </Button>

            <ReportDownloadModal trigger={
              <button
                className="action-button w-full min-h-12 h-auto bg-white hover:bg-slate-50 border border-slate-200 rounded-[16px] text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.97] transition-surface shadow-2xs cursor-pointer"
                onClick={onClose}
              >
                <FileDown className="w-4 h-4 text-[#155E9A]" />
                <span>Report assistance</span>
              </button>
            } />

            <button
              onClick={handleWhatsApp}
              className="action-button w-full min-h-12 h-auto btn-secondary text-xs sm:text-sm font-bold rounded-[16px] flex items-center justify-center gap-2 active:scale-[0.97] shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" fill="white" />
              <span>WhatsApp Doctor Consultation</span>
            </button>
          </div>
        </div>

        {/* Bottom 24*7 Calling Card */}
        <div className="glass-card p-4 m-3 bg-white/60 rounded-[20px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#155E9A] font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#C62828] animate-pulse" />
              Diagnostic Laboratory
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Charkhi Dadri</span>
          </div>

          <a
            href={telHref(siteConfig.contact.phone)}
            className="flex items-center justify-center gap-2 bg-[#102A43] text-white rounded-[14px] py-3 px-4 text-xs font-bold shadow-xs hover:bg-[#102A43] active:scale-[0.97] transition-surface"
          >
            <Phone className="w-4 h-4 text-[#F1C27D]" />
            <span>Contact lab: {siteConfig.contact.phone}</span>
          </a>

          <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            <span>Diagnostic facility details to be confirmed</span>
          </div>
        </div>
      </div>
    </>
  );
}
