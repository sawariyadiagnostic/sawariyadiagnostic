'use client';

import { motion } from 'framer-motion';
import { Search, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Navbar } from './layout/Navbar';
import { MobileMenu } from './layout/MobileMenu';
import { hero } from '@/data/website-content';

export function Hero() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
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
    if (searchQuery.trim()) {
      const testsSection = document.getElementById('tests');
      testsSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[hsl(174,75%,95%)] via-white to-[hsl(199,89%,95%)]">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-emerald/5 rounded-full blur-3xl" />
      </div>

      {/* Modular Navbar */}
      <Navbar 
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        scrollToSection={scrollToSection}
      />

      {/* Modular Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        scrollToSection={scrollToSection}
      />

      {/* Hero Content */}
      <div className="relative z-10 pt-32 pb-20 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-accent-teal/10 px-4 py-2 rounded-full">
                <Shield className="w-4 h-4 text-accent-teal" />
                <span className="text-sm font-medium text-accent-teal">NABL Accredited Lab</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
                Your Health,
                <br />
                <span className="text-accent-teal">Our Priority</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Accurate diagnostics with state-of-the-art technology. 
                Get lab-quality tests from the comfort of your home.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for Vitamin D, CBC, Thyroid..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-14 rounded-full border-2 border-border focus:border-accent-teal bg-white text-base"
                />
              </form>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="btn-primary h-14 px-8 text-base"
                  onClick={() => scrollToSection('home-collection')}
                >
                  Book Home Collection
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="btn-outline h-14 px-8 text-base"
                  onClick={() => scrollToSection('tests')}
                >
                  View Health Packages
                </Button>
              </div>

              {/* Trust Indicators - Now Data Driven */}
              <div className="flex flex-wrap gap-6 pt-4">
                {hero.trustIndicators.map((indicator) => (
                  <div key={indicator.title} className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full bg-${indicator.color}/10 flex items-center justify-center`}>
                      <indicator.icon className={`w-5 h-5 text-${indicator.color}`} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm">{indicator.title}</p>
                      <p className="text-xs text-muted-foreground">{indicator.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:flex items-center justify-center"
            >
              <div className="relative">
                {/* Main Visual Card */}
                <div className="w-[400px] h-[500px] bg-gradient-to-br from-accent-teal/20 to-accent-blue/20 rounded-3xl flex items-center justify-center relative overflow-hidden">
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-8 left-8 w-20 h-20 bg-white/80 rounded-2xl shadow-lg flex items-center justify-center">
                    <div className="w-12 h-12 bg-accent-teal/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl">🧪</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-8 right-8 w-24 h-24 bg-white/80 rounded-2xl shadow-lg flex items-center justify-center">
                    <div className="w-14 h-14 bg-accent-emerald/20 rounded-full flex items-center justify-center">
                      <span className="text-3xl">💉</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-5xl">🏥</span>
                      <p className="text-sm font-semibold text-foreground mt-2">Trusted Care</p>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -left-4 top-1/3 bg-white rounded-xl shadow-lg px-4 py-3 float-gentle">
                    <p className="text-2xl font-bold text-accent-teal">50K+</p>
                    <p className="text-xs text-muted-foreground">Tests Done</p>
                  </div>
                  
                  <div className="absolute -right-4 bottom-1/3 bg-white rounded-xl shadow-lg px-4 py-3 float-gentle animation-delay-1000">
                    <p className="text-2xl font-bold text-accent-emerald">5+</p>
                    <p className="text-xs text-muted-foreground">Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
