'use client';

import { Menu, X, FileDown, Phone, ShieldCheck, Database } from 'lucide-react';
import { Button } from '../ui/button';
import { Logo } from '../ui/Logo';
import { navigation } from '@/data/website-content';
import { PatientReportPortal } from '../portal/PatientReportPortal';

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
    <header className="fixed top-0 left-0 right-0 w-full z-[110] transition-all duration-300 pt-[env(safe-area-inset-top,0px)]">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] text-slate-200 text-xs py-1.5 px-4 hidden sm:block border-b border-teal-500/25">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 text-[#FDE047] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A896] animate-pulse" />
              NABL Certified Diagnostic Center • 24*7 Open Lab
            </span>
            <span className="text-teal-400/50">|</span>
            <span className="text-teal-100 font-medium">Free Doorstep Home Sample Collection in Charkhi Dadri</span>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="tel:+919991941207" 
              className="flex items-center gap-1.5 text-[#FDE047] font-bold hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>24*7 Helpline: +91 99919 41207</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Frosted Glass Navbar */}
      <div className={`w-full min-h-[68px] sm:min-h-[76px] py-2 flex items-center px-3.5 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-[30px] border-b border-white/60 shadow-[0_4px_32px_rgba(0,0,0,0.06)]' 
          : 'bg-white/80 backdrop-blur-2xl border-b border-white/40 shadow-2xs'
      }`}>
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Official Typography Logo */}
          <div
            className="cursor-pointer group flex-shrink-0 flex items-center select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Logo variant="horizontal" size="sm" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-white/40 p-1 rounded-full border border-white/80 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
            {navigation.links.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-1.5 rounded-full text-xs font-bold tracking-tight text-slate-700 hover:text-[#0A6E5C] hover:bg-white/90 hover:shadow-2xs transition-all duration-300 cursor-pointer active:scale-[0.97]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Side Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
            
            {/* Patient Portal / Download Report Button (Desktop & Tablet) */}
            <div className="hidden sm:block">
              <PatientReportPortal trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="inline-flex items-center gap-1.5 text-xs font-bold h-9 sm:h-10 px-3 sm:px-4 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 text-slate-800 hover:border-[#0A6E5C] hover:bg-white hover:text-[#0A6E5C] transition-all shadow-xs active:scale-[0.97] cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 text-[#0A6E5C]" />
                  <span>Patient Portal</span>
                </Button>
              } />
            </div>

            {/* Book Now CTA (Tablet & Desktop) */}
            <Button
              size="sm"
              className="hidden md:inline-flex bg-gradient-to-r from-[#072448] to-[#0A6E5C] text-white hover:opacity-90 h-10 px-5 rounded-[18px] text-xs font-bold shadow-[0_4px_12px_rgba(10,110,92,0.2)] active:scale-[0.97] transition-all cursor-pointer"
              onClick={() => scrollToSection('home-collection')}
            >
              <span>Book Home Visit</span>
            </Button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-[14px] text-slate-700 bg-white/80 backdrop-blur-md hover:bg-white transition-all border border-slate-200/90 shadow-2xs active:scale-95 cursor-pointer"
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
