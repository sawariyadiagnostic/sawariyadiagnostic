'use client';

import { useState, useEffect } from 'react';
import { Search, CheckCircle2, Clock, ArrowRight, ShieldCheck, Camera } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Navbar } from './layout/Navbar';
import { MobileMenu } from './layout/MobileMenu';
import { ReportDownloadModal } from './ui/ReportDownloadModal';
import { Logo } from './ui/Logo';
import { whatsappHref } from '@/config/site';

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sawariya:search', { detail: { query: searchQuery, tab: 'tests' } }));
    }
    const testsSection = document.getElementById('tests');
    testsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sawariya:search', { detail: { query: tag, tab: 'tests' } }));
    }
    const testsSection = document.getElementById('tests');
    testsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const wasMenuOpen = isMobileMenuOpen;
    setIsMobileMenuOpen(false);
    const cleanId = sectionId.replace(/^#/, '');

    const performScroll = () => {
      const section = document.getElementById(cleanId);
      if (section) {
        const header = document.querySelector('header');
        const headerOffset = header ? header.getBoundingClientRect().height : 80;
        const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
        const targetScroll = Math.max(0, elementPosition - headerOffset - 12);

        window.scrollTo({
          top: targetScroll,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      }
    };

    if (wasMenuOpen) {
      setTimeout(performScroll, 180);
    } else {
      performScroll();
    }
  };

  const handleOpenReportModal = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      setTimeout(() => setIsReportModalOpen(true), 200);
    } else {
      setIsReportModalOpen(true);
    }
  };

  const quickSearchTags = [
    { label: 'CBC Blood Count', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
    { label: 'Thyroid (T3 T4 TSH)', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
    { label: 'Vitamin D3 & B12', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
    { label: 'Lipid (Cholesterol)', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
    { label: 'HbA1c Diabetes', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
    { label: 'Liver (LFT)', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
    { label: 'Kidney (KFT)', color: 'peacock-pill-inactive hover:border-[#0A6C82]' },
  ];

  const whatsappPrescriptionUrl = whatsappHref("Hello Sawariya Diagnostic, I would like to share a photo of my doctor's prescription slip to ask about test pricing and home collection.");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--surface-canvas)]">
      {/* Liquid Organic Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[#155E9A]/5 blur-[100px] mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-[#C62828]/4 blur-[100px] mix-blend-multiply" style={{ animationDelay: '-6s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-[#7A4B2A]/4 blur-[120px] mix-blend-multiply" style={{ animationDelay: '-12s' }} />
      </div>

      {/* Modular Navbar */}
      <Navbar 
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Modular Mobile Menu Drawer */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        scrollToSection={scrollToSection}
        onOpenReportModal={handleOpenReportModal}
      />

      {/* Controlled Report Assistance Modal */}
      <ReportDownloadModal
        open={isReportModalOpen}
        onOpenChange={setIsReportModalOpen}
      />

      {/* Hero Content Area */}
      <div className="relative z-10 pt-[clamp(7.5rem,5.5rem+6vw,10.5rem)] pb-[clamp(3rem,2rem+4vw,6rem)] fluid-container">
        <div className="w-full glass-card ui-panel p-[clamp(1rem,4vw,3rem)] border border-white/60 relative overflow-hidden">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column - Main Value Proposition (7 cols) */}
            <div className="lg:col-span-7 w-full min-w-0 space-y-5 sm:space-y-6 animate-slide-in-left">
              
              {/* Apple Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 px-3.5 py-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-full">
                <span className="flex h-2 w-2 relative flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C62828] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#155E9A]"></span>
                </span>
                <span className="min-w-0 text-[10.5px] sm:text-[11.5px] md:text-xs font-bold tracking-tight text-slate-800 text-wrap">
                  Home collection: 07:00 AM–07:00 PM <span className="text-slate-400">•</span> <span className="text-[#7A4B2A]">Lab open 24*7 for walk-in patients &amp; hospital emergencies</span>
                </span>
              </div>

              {/* Display Headline */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-[clamp(2rem,1.3rem+3.5vw,3.75rem)] font-black text-[#1D1D1F] tracking-tight leading-[1.08] break-words">
                  Precision Pathology.
                  <br />
                  <span className="bg-clip-text text-transparent bg-[image:var(--brand-spectrum)]">
                    Peace of Mind at Home.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-xl font-medium leading-relaxed">
                  Clear test information, convenient collection requests, and secure report access when connected to the lab workflow.
                </p>
              </div>

              {/* Clean Apple-Optimized Search Bar inside Glass */}
              <div className="space-y-2.5 w-full max-w-xl">
                <form onSubmit={handleSearch} className="relative">
                  <div className="peacock-search-input relative flex items-center rounded-[20px] sm:rounded-[24px] p-1 sm:p-1.5 duration-300">
                    <Search className="w-4 h-4 text-[#0A6C82] ml-2.5 sm:ml-3 flex-shrink-0" />
                    <Input
                      type="text"
                      placeholder="Ask about an individual test…"
                      name="catalog-search"
                      autoComplete="off"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ui-control border-0 shadow-none focus-visible:ring-0 text-[var(--text-primary)] font-semibold text-xs sm:text-sm bg-transparent px-2 sm:px-2.5 h-auto w-full min-w-0"
                    />
                    <Button 
                      type="submit" 
                      className="action-button btn-peacock-iris squircle-btn apple-pressable rounded-[16px] sm:rounded-[18px] px-3.5 sm:px-6 min-h-11 sm:min-h-12 h-auto text-xs sm:text-sm font-bold flex-shrink-0 active:scale-[0.96] cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 mr-1 hidden sm:inline" />
                      <span>Ask the lab</span>
                    </Button>
                  </div>
                </form>

                {/* Quick search suggestion pills: touch-friendly horizontal scroll */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 w-full max-w-full scrollbar-none text-xs">
                  <span className="font-bold text-slate-500 mr-1 text-[11px] uppercase tracking-wider whitespace-nowrap flex-shrink-0">Ask about:</span>
                  {quickSearchTags.map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handleQuickTagClick(tag.label)}
                      className={`ui-control-button squircle-btn apple-pressable h-auto min-h-11 px-3 rounded-[14px] ${tag.color} shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_rgba(0,0,0,0.04)] text-[10.5px] sm:text-[11px] font-bold text-slate-700 hover:text-[#0A6C82] transition-surface duration-200 active:scale-[0.96] cursor-pointer inline-flex items-center whitespace-nowrap flex-shrink-0`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Primary & Secondary */}
              {/* Action Buttons: Primary, Secondary & Instant Prescription Photo */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 w-full max-w-xl flex-wrap">
                <Button
                  size="xl"
                  className="btn-primary squircle-btn apple-pressable w-full sm:w-auto action-button min-h-12 h-auto px-5 sm:px-7 text-xs sm:text-sm font-bold rounded-[16px] shadow-md hover:shadow-lg active:scale-[0.96] min-w-0"
                  onClick={() => scrollToSection('home-collection')}
                >
                  <span>Request home collection</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="btn-outline squircle-btn apple-pressable w-full sm:w-auto action-button min-h-12 h-auto px-5 sm:px-7 text-xs sm:text-sm font-bold rounded-[16px] active:scale-[0.96] min-w-0"
                  onClick={() => scrollToSection('tests')}
                >
                  <span>Ask about individual tests</span>
                </Button>

                {whatsappPrescriptionUrl && (
                  <Button
                    asChild
                    size="xl"
                    className="btn-secondary squircle-btn apple-pressable w-full sm:w-auto action-button min-h-12 h-auto px-4 sm:px-5 text-xs sm:text-sm font-bold text-white rounded-[16px] active:scale-[0.96] min-w-0 shadow-sm"
                  >
                    <a
                      href={whatsappPrescriptionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Send doctor prescription photo on WhatsApp"
                    >
                      <Camera className="w-4 h-4 mr-1.5 shrink-0" />
                      <span>Send prescription photo</span>
                    </a>
                  </Button>
                )}
              </div>

              {/* Apple Health Trust Micro-Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-black/[0.06] w-full max-w-xl">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-blue-50 flex items-center justify-center border border-blue-200/80 flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">Current estimates</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Confirmed by test</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-green-50 flex items-center justify-center border border-green-200/80 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">Standards</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Documented protocols</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-[#F8FAFC] flex items-center justify-center border border-slate-200 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#7A4B2A]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">Doorstep Care</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Charkhi Dadri visits</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Illustrative test preview */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0 w-full min-w-0">
              <div className="relative w-full max-w-full sm:max-w-[430px] mx-auto min-w-0">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#155E9A]/20 via-[#C62828]/15 to-[#C62828]/15 rounded-[34px] blur-2xl opacity-70 pointer-events-none" />

                <div className="relative bg-white/95 backdrop-blur-2xl rounded-[22px] sm:rounded-[27px] border-0 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-hidden">
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="min-w-0">
                      <Logo variant="horizontal" size="xs" showTagline={true} />
                      <p className="text-[10px] text-slate-500 mt-0.5 font-medium">Illustrative test preview</p>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-200 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-blue-700 shrink-0" /> Test menu
                    </span>
                  </div>

                  <div className="rounded-[16px] bg-slate-50/90 p-3 border border-slate-100">
                    <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Featured test views</span>
                    <span className="font-bold text-slate-800 text-sm">CBC • Thyroid • Glucose</span>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 text-xs font-bold">Hemoglobin (Hb)</span>
                        <span className="text-[#C62828] font-bold text-xs">CBC marker</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#C62828] to-[#155E9A] h-full rounded-full w-[78%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 text-xs font-bold">Thyroid (TSH)</span>
                        <span className="text-[#7A4B2A] font-bold text-xs">Thyroid marker</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#C62828] to-[#155E9A] h-full rounded-full w-[60%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 text-xs font-bold">Fasting Glucose</span>
                        <span className="text-[#102A43] font-bold text-xs">Glucose marker</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#C62828] to-[#155E9A] h-full rounded-full w-[52%]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-700 shrink-0" />
                    <span>Reports verified within 12 hours.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
