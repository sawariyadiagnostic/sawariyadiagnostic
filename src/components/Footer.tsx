'use client';

import { Phone, Mail, MapPin, Clock, FileDown } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#' },
    { label: 'Tests & Packages', href: '#tests' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  const services = [
    'Blood Tests',
    'Health Packages',
    'Home Collection',
    'Corporate Wellness',
    'Specialized Tests',
  ];

  return (
    <footer className="relative py-16 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-accent-teal rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl">Sawariya Diagnostics</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed mb-6">
              Your trusted partner for accurate diagnostics. NABL accredited lab with 
              state-of-the-art technology and compassionate care.
            </p>
            
            {/* Download Report Button */}
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-accent-teal hover:bg-accent-teal/90 text-white px-4 py-2 rounded-full text-sm font-medium gentle-animation"
            >
              <FileDown className="w-4 h-4" />
              Download Report
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-background/70 hover:text-background text-sm gentle-animation"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service} className="text-background/70 text-sm">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-background">+91 98765 43210</p>
                  <p className="text-xs text-background/60">24/7 Support</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                <p className="text-sm text-background">info@sawariya.com</p>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                <p className="text-sm text-background/70">
                  123 Medical Plaza, Main Road,<br />
                  City - 123456
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-accent-teal flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-background">Mon - Sat: 7AM - 9PM</p>
                  <p className="text-sm text-background/70">Sun: 8AM - 2PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-background/70">
              © 2025 Sawariya Diagnostics. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-background/70 hover:text-background gentle-animation">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-background/70 hover:text-background gentle-animation">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
