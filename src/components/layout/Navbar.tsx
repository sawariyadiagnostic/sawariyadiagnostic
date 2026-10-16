'use client';

import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { Menu, X, FileDown, Phone, ShieldCheck, Database } from 'lucide-react';
import { Button } from '../ui/button';
import { Logo } from '../ui/Logo';
import { navigation } from '@/data/website-content';
import { ReportDownloadModal } from '../ui/ReportDownloadModal';

interface NavbarProps {
  isScrolled: boolean;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  scrollToSection: (sectionId: string) => void;
}

export function Navbar({ 
  isScrolled, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  scrollToSection 
}: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-[110] transition-surface duration-300 pt-[env(safe-area-inset-top,0px)]">
      {/* Top Clinical Trust & Operational Status Strip */}
      <div className="bg-[#0A1128] text-slate-200 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 border-b border-[#0A6C82]/30">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-white font-bold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] animate-pulse" />
              <span>07:00 AM–08:00 PM Daily</span>
            </span>
            <span className="text-white/30 hidden md:inline">|</span>
            <span className="text-slate-300 font-medium hidden md:inline truncate">
              Opp. R.S. Sangwan Hospital, Loharu Rd, Charkhi Dadri • Home collection: 06:30 AM–08:00 PM • Reports verified within 12 hours
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a 
              href={telHref(siteConfig.contact.phone)} 
              className="flex items-center gap-1 text-[#FFC300] font-bold hover:underline transition-colors"
              aria-label={`Call lab at ${siteConfig.contact.phone}`}
            >
              <Phone className="w-3 h-3 text-[#FFC300]" />
              <span className="hidden sm:inline">{siteConfig.contact.phone}</span>
              <span className="sm:hidden text-[10.5px]">Call</span>
            </a>
            <span className="text-white/30">|</span>
            <a 
              href={whatsappHref(siteConfig.contact.whatsapp)}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#2DD4BF] font-bold hover:underline transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF] inline-block" />
              <span className="text-[10.5px] sm:text-xs">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Frosted Glass Navbar */}
      <div className={`w-full min-h-[68px] sm:min-h-[76px] py-2 flex items-center px-3.5 sm:px-6 lg:px-8 transition-surface duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-[30px] border-b border-white/60 shadow-[0_4px_32px_rgba(0,0,0,0.06)]' 
          : 'bg-white/80 backdrop-blur-2xl border-b border-white/40 shadow-2xs'
      }`}>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Official Typography Logo */}
          <button
            type="button"
            aria-label="Back to top"
            className="ui-control-button cursor-pointer group flex-shrink-0 flex items-center select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo variant="horizontal" size="sm" showTagline={true} />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/40 p-1 rounded-full border border-white/80 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {navigation.links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="ui-control-button h-auto min-h-11 px-4 py-2 rounded-[var(--radius-control)] text-sm font-bold tracking-tight text-[var(--text-primary)] hover:text-[#155E9A] hover:bg-white/90 hover:shadow-2xs transition-surface duration-300 cursor-pointer active:scale-[0.97]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Report assistance button (desktop & tablet) */}
            <div className="hidden sm:block">
              <ReportDownloadModal trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="action-button inline-flex items-center gap-1.5 text-xs font-bold min-h-9 sm:min-h-10 h-auto px-3 sm:px-4 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-slate-800 hover:border-[#155E9A] hover:bg-white hover:text-[#155E9A] transition-surface shadow-xs active:scale-[0.97] cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#155E9A]" />
                  <span>Report assistance</span>
                </Button>
              } />
            </div>

            {/* Book Now CTA (Tablet & Desktop) */}
            <Button
              size="sm"
              className="hidden md:inline-flex bg-gradient-to-r from-[#102A43] to-[#155E9A] text-white hover:opacity-90 action-button min-h-10 h-auto px-5 rounded-[18px] text-xs font-bold shadow-[0_4px_12px_rgba(10,110,92,0.2)] active:scale-[0.97] transition-surface cursor-pointer"
              onClick={() => scrollToSection('home-collection')}
            >
              <span>Book Home Visit</span>
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ui-control-button lg:hidden w-11 h-11 flex items-center justify-center rounded-[var(--radius-control)] text-slate-700 bg-white/80 backdrop-blur-md hover:bg-white transition-surface border border-slate-200/90 shadow-2xs active:scale-95 cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
