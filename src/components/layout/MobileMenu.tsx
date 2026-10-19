'use client';

import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { FileDown, Phone, ShieldCheck, Home, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Logo } from '../ui/Logo';
import { navigation } from '@/data/website-content';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
  onOpenReportModal?: () => void;
}

export function MobileMenu({ isOpen, onClose, scrollToSection, onOpenReportModal }: MobileMenuProps) {
  const handleWhatsApp = () => {
    const url = whatsappHref('Hi, I want to book a test at Sawariya Diagnostic.');
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        aria-label="Mobile navigation"
        className="mobile-menu-panel lg:hidden fixed top-0 right-0 left-auto h-full w-[340px] max-w-[88vw] translate-x-0 translate-y-0 rounded-none border-l border-slate-200/90 bg-white/95 p-0 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.12)] flex flex-col justify-between overflow-y-auto pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
      >
        <div className="p-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/70">
            <div>
              <Logo variant="horizontal" size="xs" showTagline={true} />
              <DialogTitle className="sr-only">Mobile navigation</DialogTitle>
              <DialogDescription className="sr-only">Navigate to sections and contact actions</DialogDescription>
            </div>
          </div>

          {/* Navigation Links - Inset Grouped List */}
          <div className="flex flex-col space-y-1 pt-3.5">
            {navigation.links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  scrollToSection(link.href);
                }}
                className="ui-control-button squircle-btn apple-pressable flex items-center justify-between px-3.5 py-3 min-h-11 text-slate-800 hover:text-[#155E9A] hover:bg-slate-100/70 active:bg-slate-200/70 rounded-[14px] font-semibold text-sm transition-all duration-150 active:scale-[0.97] border border-transparent hover:border-slate-200/60 cursor-pointer group"
              >
                <span className="group-hover:translate-x-0.5 transition-transform">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#155E9A] transition-colors" />
              </button>
            ))}
          </div>

          {/* Action Stack - Aligned with Single Star Principle */}
          <div className="mt-5 space-y-2.5 pt-4 border-t border-slate-200/70">
            {/* STAR CTA: Request Home Collection in Specular Ruby */}
            <Button
              type="button"
              className="w-full btn-specular-ruby squircle-btn apple-pressable min-h-12 h-auto text-sm font-bold text-white shadow-md rounded-[16px] active:scale-[0.96] cursor-pointer"
              onClick={() => {
                scrollToSection('home-collection');
              }}
            >
              <Home className="w-4 h-4 mr-2" />
              Request home collection
            </Button>

            {/* WhatsApp Lab Contact - Emerald Specular Accent */}
            <button
              type="button"
              onClick={handleWhatsApp}
              className="action-button btn-specular-emerald squircle-btn apple-pressable w-full min-h-12 h-auto text-xs sm:text-sm font-bold text-white rounded-[16px] flex items-center justify-center gap-2 active:scale-[0.96] shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-white" fill="white" />
              <span>WhatsApp lab contact</span>
            </button>

            {/* Secondary Action: Report Assistance in Frosted Slate */}
            <button
              type="button"
              className="action-button squircle-btn apple-pressable w-full min-h-12 h-auto rounded-[16px] bg-slate-100 hover:bg-slate-200/80 active:bg-slate-200 border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 active:scale-[0.96] cursor-pointer transition-colors"
              onClick={() => {
                if (onOpenReportModal) {
                  onOpenReportModal();
                } else {
                  onClose();
                }
              }}
            >
              <FileDown className="w-4 h-4 text-[#155E9A]" />
              <span>Report assistance</span>
            </button>
          </div>
        </div>

        {/* Unified Bottom Lab Hub Card */}
        <div className="p-4 m-3 bg-slate-50/90 rounded-[20px] border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-2.5">
          <div className="flex items-center justify-between text-xs text-[#155E9A] font-bold">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#155E9A] animate-pulse" />
              Central Pathology Hub
            </span>
            <span className="text-[10.5px] text-slate-500 font-medium">Charkhi Dadri</span>
          </div>

          <a
            href={telHref(siteConfig.contact.phone)}
            className="flex items-center justify-center gap-2 bg-[#102A43] hover:bg-[#155E9A] text-white rounded-[14px] py-3 px-4 min-h-11 text-xs font-bold shadow-xs active:scale-[0.96] transition-colors"
          >
            <Phone className="w-4 h-4 text-sky-300" />
            <span>Call Lab Desk: {siteConfig.contact.phone}</span>
          </a>

          <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-slate-500 font-medium text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Home collection 07:00 AM–07:00 PM • Lab open 24*7 for walk-in patients and emergency from hospitals</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
