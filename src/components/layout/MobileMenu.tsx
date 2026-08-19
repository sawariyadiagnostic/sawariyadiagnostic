'use client';

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
    window.open(`https://wa.me/919991941207?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-[120] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Apple iOS Native Sheet Drawer */}
      <div 
        className="lg:hidden fixed top-0 right-0 h-full w-[340px] max-w-[88vw] bg-white/70 backdrop-blur-[40px] border-l border-white/60 z-[130] shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col justify-between overflow-y-auto pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)] transition-transform duration-300"
      >
        <div className="p-5">
          {/* Header with Logo & iOS-styled Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <Logo variant="horizontal" size="xs" showTagline={false} />
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full text-slate-700 bg-white/60 hover:bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-90 transition-all cursor-pointer border border-white/80"
              aria-label="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links with large 48px iOS list style touch targets */}
          <div className="flex flex-col space-y-1.5 pt-4">
            {navigation.links.map((link) => (
              <button
                key={link.href}
                onClick={() => {
                  scrollToSection(link.href);
                  onClose();
                }}
                className="flex items-center justify-between px-4 py-3 text-slate-800 hover:text-[#0A6E5C] hover:bg-white/60 active:bg-white/80 rounded-[16px] font-semibold text-sm transition-all duration-150 active:scale-[0.98] border border-transparent hover:border-white/60 hover:shadow-2xs"
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
                className="w-full h-12 bg-white hover:bg-slate-50 border border-slate-200 rounded-[16px] text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.97] transition-all shadow-2xs"
                onClick={onClose}
              >
                <FileDown className="w-4 h-4 text-[#0A6E5C]" />
                <span>Download Lab Reports</span>
              </button>
            } />

            <button
              onClick={handleWhatsApp}
              className="w-full h-12 btn-emerald text-xs sm:text-sm font-bold rounded-[16px] flex items-center justify-center gap-2 active:scale-[0.97] shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" fill="white" />
              <span>WhatsApp Doctor Consultation</span>
            </button>
          </div>
        </div>

        {/* Bottom 24*7 Calling Card */}
        <div className="glass-card p-4 m-3 bg-white/60 rounded-[20px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.04)] space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#0A6E5C] font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse" />
              Open 24*7 Laboratory
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Charkhi Dadri</span>
          </div>

          <a
            href="tel:+919991941207"
            className="flex items-center justify-center gap-2 bg-[#072448] text-white rounded-[14px] py-3 px-4 text-xs font-bold shadow-xs hover:bg-[#0A3663] active:scale-[0.97] transition-all"
          >
            <Phone className="w-4 h-4 text-[#FDE047]" />
            <span>24*7 Emergency: +91 99919 41207</span>
          </a>

          <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>NABL Certified Diagnostic Facility</span>
          </div>
        </div>
      </div>
    </>
  );
}
