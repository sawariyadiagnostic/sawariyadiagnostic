'use client';

import { motion } from 'framer-motion';
import { Menu, X, Search, FileDown, Phone, Clock, Shield } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

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

  const navLinks = [
    { label: 'Tests', href: 'tests' },
    { label: 'About', href: 'about' },
    { label: 'Services', href: 'services' },
    { label: 'Our Team', href: 'team' },
    { label: 'Contact', href: 'contact' },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[hsl(174,75%,95%)] via-white to-[hsl(199,89%,95%)]">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-emerald/5 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ${
          isScrolled ? 'glass-navbar shadow-sm' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-accent-teal rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <span className="text-foreground font-bold text-xl hidden sm:block">
                  Sawariya Diagnostics
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/80 hover:text-accent-teal font-medium gentle-animation"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Download Report Button - Desktop */}
              <Button
                variant="outline"
                className="hidden md:flex items-center gap-2 btn-outline"
                onClick={() => window.open('#', '_blank')}
              >
                <FileDown className="w-4 h-4" />
                Download Report
              </Button>

              {/* Book Now CTA */}
              <Button
                className="hidden sm:flex btn-primary px-6"
                onClick={() => scrollToSection('contact')}
              >
                Book Test
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl hover:bg-secondary gentle-animation"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-[90] shadow-xl"
      >
        <div className="flex flex-col h-full p-6 pt-20">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-left px-4 py-3 text-foreground hover:bg-secondary rounded-xl font-medium gentle-animation"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full btn-outline"
              onClick={() => window.open('#', '_blank')}
            >
              <FileDown className="w-4 h-4 mr-2" />
              Download Report
            </Button>
            <Button
              className="w-full btn-primary"
              onClick={() => scrollToSection('contact')}
            >
              Book Test
            </Button>
          </div>
        </div>
      </motion.div>

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

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent-emerald/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-accent-emerald" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Same Day</p>
                    <p className="text-xs text-muted-foreground">Reports</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">100% Accurate</p>
                    <p className="text-xs text-muted-foreground">Results</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent-purple/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-accent-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">24/7 Support</p>
                    <p className="text-xs text-muted-foreground">Available</p>
                  </div>
                </div>
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
