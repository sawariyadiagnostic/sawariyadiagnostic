'use client';

import { useState } from 'react';
import { telHref } from '@/config/site';
import { Phone, Mail, MapPin, Clock, FileDown, ShieldCheck, ExternalLink, PhoneCall } from 'lucide-react';
import { footer } from '@/data/website-content';
import { LegalModal, PolicyType } from './ui/LegalModal';
import { Logo } from './ui/Logo';
import { ReportDownloadModal } from './ui/ReportDownloadModal';

export function Footer() {
  const { quickLinks, services, contact, description } = footer;
  const [activeModal, setActiveModal] = useState<PolicyType>(null);

  return (
    <>
      <footer className="relative pt-[clamp(2.5rem,1.5rem+3vw,4.5rem)] pb-[calc(env(safe-area-inset-bottom,16px)+6.5rem)] sm:pb-[clamp(2.5rem,1.5rem+3vw,4.5rem)] bg-[#102A43] text-slate-300 border-t border-white/10 overflow-hidden">
        {/* Liquid Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-[20%] w-[40vw] h-[40vw] bg-[#C62828]/10 rounded-full blur-[100px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] bg-[#102A43]/40 rounded-full blur-[100px] mix-blend-screen" style={{ animationDelay: '-5s' }} />
        </div>

        <div className="fluid-container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10">
            
            {/* Brand & Mission (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Logo variant="horizontal" inverted size="md" />
              
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-normal">
                {description}
              </p>
              
              <div className="pt-2 flex flex-wrap gap-2.5">
                <ReportDownloadModal trigger={
                  <button
                    className="inline-flex items-center gap-2 bg-[#155E9A] hover:bg-[#085a4b] text-white px-4 py-2.5 rounded-[16px] text-xs font-bold transition-surface shadow-md active:scale-95 cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-emerald-200" />
                    <span>Report assistance</span>
                  </button>
                } />
                <a
                  href={contact.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 px-3.5 py-2.5 rounded-[16px] text-xs font-semibold transition-surface hover:text-white"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-200" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Quality-focused diagnostic testing</span>
              </div>
            </div>

            {/* Quick Links (2 cols) */}
            <div className="lg:col-span-2 space-y-2.5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Quick Links</h3>
              <ul className="space-y-1.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={`#${link.href}`} 
                      className="text-slate-400 hover:text-white text-xs transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services (3 cols) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-200">Lab Specialities</h3>
              <ul className="space-y-1.5">
                {services.map((service) => (
                  <li key={service.label} className="text-slate-400 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C62828]" />
                    {service.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info (3 cols) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="font-bold text-[12px] uppercase tracking-wider text-slate-200">Contact & availability</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                  <div>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-[#A1CDFB] hover:text-blue-200 font-bold transition-colors">
                      {contact.phone}
                    </a>
                    <p className="text-[11px] text-[#F6F6F6] font-medium">Home collection support</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <PhoneCall className="w-4 h-4 text-[#F1C27D] flex-shrink-0 mt-0.5" />
                  <div>
                    <a href={`tel:${contact.emergencyPhone.replace(/\s/g, '')}`} className="text-[#FDF2C6] hover:text-[#F1C27D] font-semibold transition-colors">
                      {contact.emergencyPhone}
                    </a>
                    <p className="text-[11px] text-slate-400">Additional contact</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${contact.email}`} className="text-[#B2D3FC] hover:text-blue-200 transition-colors break-all">
                    {contact.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-blue-200 flex-shrink-0 mt-0.5" />
                  <a 
                    href={contact.mapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#CDF1D4] hover:text-blue-200 transition-colors leading-relaxed"
                  >
                    {contact.address}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-slate-300 space-y-0.5">
                    <p className="text-[#B5F3DC] font-bold text-[12px]">Home collection: 06:30 AM–08:00 PM</p>
                    <p className="text-[11px] text-slate-400">Reports verified within 12 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 sm:pt-8 mt-10 flex flex-col sm:flex-row justify-between items-center gap-3.5 text-xs text-slate-400">
            <p className="text-center sm:text-left text-[13px]">
              © {new Date().getFullYear()} Sawariya Diagnostic Lab. All diagnostic reports are confidential.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <button 
                onClick={() => setActiveModal('privacy')}
                className="hover:text-slate-200 text-slate-400 transition-colors cursor-pointer min-h-11 px-2 py-2 text-center"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setActiveModal('terms')}
                className="hover:text-slate-200 text-slate-400 transition-colors cursor-pointer min-h-11 px-2 py-2 text-center"
              >
                Terms & Patient Rights
              </button>
              <button 
                onClick={() => setActiveModal('charter')}
                className="hover:text-slate-200 text-slate-400 transition-colors cursor-pointer min-h-11 px-2 py-2 text-center"
              >
                Quality Charter & Charity Camps
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Modal */}
      <LegalModal 
        type={activeModal} 
        onClose={() => setActiveModal(null)} 
      />
    </>
  );
}