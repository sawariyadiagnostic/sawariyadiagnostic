'use client';

import { motion } from 'framer-motion';
import { Menu, X, FileDown } from 'lucide-react';
import { Button } from '../ui/button';
import { navigation } from '@/data/website-content';

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
                Sawariya Diagnostic
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.links.map((link) => (
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
  );
}
