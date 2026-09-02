'use client';

import { useState, useEffect } from 'react';
import { Search, Shield, Sparkles, CheckCircle2, Clock, ArrowRight, FileCheck, Stethoscope, Activity, Heart, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Navbar } from './layout/Navbar';
import { MobileMenu } from './layout/MobileMenu';
import { Logo } from './ui/Logo';

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const testsSection = document.getElementById('tests');
    testsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickTagClick = (tag: string) => {
    setSearchQuery(tag);
    const testsSection = document.getElementById('tests');
    testsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const quickSearchTags = [
    { label: 'CBC Blood Count', color: 'bg-blue-50 text-blue-900 border-blue-200/80 hover:bg-blue-100' },
    { label: 'Thyroid (T3 T4 TSH)', color: 'bg-purple-50 text-purple-900 border-purple-200/80 hover:bg-purple-100' },
    { label: 'Vitamin D3 & B12', color: 'bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100' },
    { label: 'Lipid (Cholesterol)', color: 'bg-emerald-50 text-emerald-900 border-emerald-200/80 hover:bg-emerald-100' },
    { label: 'HbA1c Diabetes', color: 'bg-cyan-50 text-cyan-900 border-cyan-200/80 hover:bg-cyan-100' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FBFBFD]">
      {/* Liquid Organic Mesh Gradient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 mix-blend-multiply">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-teal-300/30 blur-[100px] animate-liquid mix-blend-multiply" />
        <div className="absolute top-[20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-200/20 blur-[100px] animate-liquid mix-blend-multiply" style={{ animationDelay: '-6s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] bg-cyan-200/20 blur-[120px] animate-liquid mix-blend-multiply" style={{ animationDelay: '-12s' }} />
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
      />

      {/* Hero Content Area */}
      <div className="relative z-10 pt-[clamp(6rem,4rem+6vw,9rem)] pb-[clamp(3rem,2rem+4vw,6rem)] fluid-container">
        <div className="w-full glass-card p-[clamp(1rem,4vw,3rem)] rounded-[clamp(1.25rem,1rem+2vw,3rem)] border border-white/60 relative overflow-hidden">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column - Main Value Proposition (7 cols) */}
            <div className="lg:col-span-7 w-full min-w-0 space-y-5 sm:space-y-6 animate-slide-in-left">
              
              {/* Apple Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 px-3.5 py-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] max-w-full">
                <span className="flex h-2 w-2 relative flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A896] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0A6E5C]"></span>
                </span>
                <span className="text-[10.5px] sm:text-[11.5px] md:text-xs font-bold tracking-tight text-slate-800 truncate">
                  NABL Certified Quality <span className="text-slate-400">•</span> <span className="text-[#0A6E5C]">24*7 Active Lab</span>
                  <span className="hidden sm:inline text-slate-400"> • </span><span className="hidden sm:inline">Charkhi Dadri</span>
                </span>
              </div>

              {/* Display Headline */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-[clamp(2rem,1.3rem+3.5vw,3.75rem)] font-black text-[#1D1D1F] tracking-tight leading-[1.08] break-words">
                  Precision Pathology.
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#072448] via-[#0A6E5C] to-[#00A896]">
                    Peace of Mind at Home.
                  </span>
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-slate-700 max-w-xl font-medium leading-relaxed">
                  Doctor-verified pathology reports with 99.9% clinical accuracy. Free doorstep sample collection across Charkhi Dadri and same-day WhatsApp report delivery.
                </p>
              </div>

              {/* Clean Apple-Optimized Search Bar inside Glass */}
              <div className="space-y-2.5 w-full max-w-xl">
                <form onSubmit={handleSearch} className="relative">
                  <div className="relative flex items-center bg-white/70 backdrop-blur-md border border-white/60 rounded-[20px] sm:rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:border-[#0A6E5C]/40 focus-within:bg-white focus-within:border-[#0A6E5C] focus-within:ring-2 focus-within:ring-[#0A6E5C]/15 transition-all p-1 sm:p-1.5 duration-300">
                    <Search className="w-4 h-4 text-slate-500 ml-2.5 sm:ml-3 flex-shrink-0" />
                    <Input
                      type="text"
                      placeholder="Search tests..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="border-0 shadow-none focus-visible:ring-0 text-slate-900 font-bold text-xs sm:text-sm placeholder:text-slate-500 bg-transparent px-2 sm:px-2.5 h-10 sm:h-12 w-full min-w-0"
                    />
                    <Button 
                      type="submit" 
                      className="bg-gradient-to-r from-[#072448] to-[#0A6E5C] text-white hover:opacity-90 rounded-[14px] sm:rounded-[18px] px-3.5 sm:px-6 h-10 sm:h-12 text-xs sm:text-sm font-bold flex-shrink-0 shadow-[0_4px_12px_rgba(10,110,92,0.2)] active:scale-95 transition-all"
                    >
                      <Search className="w-3.5 h-3.5 mr-1 hidden sm:inline" />
                      <span>Find Test</span>
                    </Button>
                  </div>
                </form>

                {/* Quick search suggestion pills: touch-friendly horizontal scroll */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 w-full max-w-full scrollbar-none text-xs">
                  <span className="font-bold text-slate-500 mr-1 text-[11px] uppercase tracking-wider whitespace-nowrap flex-shrink-0">Popular:</span>
                  {quickSearchTags.map((tag) => (
                    <button
                      key={tag.label}
                      type="button"
                      onClick={() => handleQuickTagClick(tag.label)}
                      className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-[12px] bg-white/50 backdrop-blur-sm border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)] text-[10.5px] sm:text-[11px] font-bold text-slate-700 hover:bg-white/80 hover:text-[#0A6E5C] hover:border-[#0A6E5C]/30 transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center whitespace-nowrap flex-shrink-0`}
                    >
                      {tag.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Primary & Secondary */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-1 w-full max-w-xl">
                <Button
                  size="xl"
                  className="btn-primary w-full sm:w-auto h-12 sm:h-14 px-5 sm:px-8 text-xs sm:text-sm md:text-base font-bold rounded-[18px] sm:rounded-[20px] shadow-md hover:shadow-lg active:scale-[0.97] min-w-0"
                  onClick={() => scrollToSection('home-collection')}
                >
                  <span className="truncate">Book Doorstep Sample</span>
                  <ArrowRight className="w-4 h-4 ml-1.5 shrink-0" />
                </Button>

                <Button
                  size="xl"
                  variant="outline"
                  className="w-full sm:w-auto h-12 sm:h-14 px-5 sm:px-8 text-xs sm:text-sm md:text-base font-bold rounded-[18px] sm:rounded-[20px] bg-white hover:bg-slate-50 border-black/[0.08] text-slate-800 shadow-2xs hover:shadow-sm active:scale-[0.97] min-w-0"
                  onClick={() => scrollToSection('tests')}
                >
                  <span className="truncate">Explore Health Packages</span>
                </Button>
              </div>

              {/* Apple Health Trust Micro-Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-black/[0.06] w-full max-w-xl">
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-blue-50 flex items-center justify-center border border-blue-200/80 flex-shrink-0">
                    <Clock className="w-4 h-4 text-blue-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">Same Day</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">6h Digital Report</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-emerald-50 flex items-center justify-center border border-emerald-200/80 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">99.9%</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Clinical Accuracy</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-[12px] bg-amber-50 flex items-center justify-center border border-amber-200/80 flex-shrink-0">
                    <ShieldCheck className="w-4 h-4 text-amber-700" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm leading-tight truncate">7,000+</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">Patients in 2026</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column - Apple Health Specimen Card Preview (5 cols) */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0 w-full min-w-0">
              <div className="relative w-full max-w-full sm:max-w-[430px] mx-auto min-w-0">
                
                {/* Background Ambient Aura */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#0D5C75]/20 via-[#00A896]/15 to-[#EA580C]/15 rounded-[34px] blur-2xl opacity-70 pointer-events-none" />

                {/* Primary Apple Glass Card */}
                <div className="relative bg-white/95 backdrop-blur-2xl rounded-[22px] sm:rounded-[27px] border-0 shadow-[0_20px_50px_rgba(0,0,0,0.08)] p-4 sm:p-6 space-y-3.5 sm:space-y-4 overflow-hidden">
                  
                  {/* Card Header with Official Wordmark & Verified Pill */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="min-w-0 flex-1">
                      <Logo variant="horizontal" size="xs" showTagline={false} />
                      <p className="text-[10px] text-slate-400 mt-0.5 font-medium truncate">Sample #SD-2026-9082 • MD Sign-off</p>
                    </div>
                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-[10px] sm:text-[10.5px] font-bold px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-200 shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" /> Verified
                    </span>
                  </div>

                  {/* Patient Sample Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 bg-slate-50/90 p-3 rounded-[16px] border border-slate-100 text-xs">
                    <div className="min-w-0">
                      <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Test Specimen</span>
                      <span className="font-bold text-slate-800 text-xs sm:text-sm truncate block">Complete Blood Count</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-slate-400 block text-[9.5px] uppercase font-bold tracking-wider">Collection Mode</span>
                      <span className="font-bold text-[#0A6E5C] text-xs sm:text-sm flex items-center gap-1 truncate">
                        <span className="w-2 h-2 rounded-full bg-[#00A896] animate-pulse shrink-0" /> Free Home Visit (₹0)
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Metric Bars */}
                  <div className="space-y-2.5 sm:space-y-3">
                    {/* Hemoglobin */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 text-xs font-bold">Hemoglobin (Hb)</span>
                        <span className="text-teal-900 font-bold text-xs">14.2 g/dL <span className="text-slate-400 font-normal">(Optimal)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#00A896] to-[#0D5C75] h-full rounded-full w-[78%]" />
                      </div>
                    </div>

                    {/* Thyroid */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 text-xs font-bold">Thyroid (TSH)</span>
                        <span className="text-purple-900 font-bold text-xs">2.4 mIU/L <span className="text-slate-400 font-normal">(Normal)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#581C87] to-[#A855F7] h-full rounded-full w-[60%]" />
                      </div>
                    </div>

                    {/* Fasting Glucose */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span className="text-slate-700 text-xs font-bold">Fasting Glucose</span>
                        <span className="text-emerald-900 font-bold text-xs">92 mg/dL <span className="text-slate-400 font-normal">(Healthy)</span></span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-[#065F46] to-[#10B981] h-full rounded-full w-[52%]" />
                      </div>
                    </div>
                  </div>

                  {/* Verification Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#0A3663]/10 flex items-center justify-center text-[#0A3663] shrink-0">
                        <Stethoscope className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 truncate">Dr. Radhika Vashisth</p>
                        <p className="text-[10px] text-slate-500 truncate">Chief Pathologist (MD)</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[9px] text-slate-400 block font-medium">Verification</span>
                      <span className="text-[10px] sm:text-[10.5px] font-mono font-bold text-[#0A6E5C] flex items-center gap-1 justify-end">
                        <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> QR-Secured
                      </span>
                    </div>
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
