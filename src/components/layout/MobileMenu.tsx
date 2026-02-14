'use client';

import { motion } from 'framer-motion';
import { FileDown } from 'lucide-react';
import { Button } from '../ui/button';
import { navigation } from '@/data/website-content';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  scrollToSection: (sectionId: string) => void;
}

export function MobileMenu({ isOpen, onClose, scrollToSection }: MobileMenuProps) {
  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-[80]"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-[90] shadow-xl"
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
      </motion.div>
    </>
  );
}
