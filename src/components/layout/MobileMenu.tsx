'use client';

import { FileDown } from 'lucide-react';
import { Button } from '../ui/button';
import { navigation } from '@/data/website-content';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

export function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div 
        className="lg:hidden fixed inset-0 bg-black/50 z-[80] animate-fade-in"
        onClick={onClose}
      />

      {/* Mobile Menu Panel */}
      <div 
        className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-[90] shadow-xl animate-slide-in-right"
      >
        <div className="flex flex-col h-full p-6 pt-20">
          <div className="flex flex-col space-y-2">
            {navigation.links.map((link) => (
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
      </div>
    </>
  );
}
