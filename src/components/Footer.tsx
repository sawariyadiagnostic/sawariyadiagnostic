'use client';

import { useState } from 'react';
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
      <footer className="relative py-[clamp(2.5rem,1.5rem+3vw,4.5rem)] bg-[#071A2E] text-slate-300 border-t border-white/10 overflow-hidden">
        {/* Liquid Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-0 right-[20%] w-[40vw] h-[40vw] bg-[#00A896]/15 rounded-full blur-[100px] animate-liquid mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[10%] w-[50vw] h-[50vw] bg-[#0A3663]/40 rounded-full blur-[100px] animate-liquid mix-blend-screen" style={{ animationDelay: '-5s' }} />
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
                    className="inline-flex items-center gap-2 bg-[#0A6E5C] hover:bg-[#085a4b] text-white px-4 py-2.5 rounded-[16px] text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <FileDown className="w-4 h-4 text-emerald-200" />
                    <span>Online Booking & Reports</span>
                  </button>
                } />
                <a
                  href={contact.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-slate-200 px-3.5 py-2.5 rounded-[16px] text-xs font-semibold transition-all hover:text-white"
                >
                  <MapPin className="w-3.5 h-3.5 text-teal-300" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5 text-slate-400" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>NABL Accredited & ICMR Registered Lab</span>
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
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00A896]" />
                    {service.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info (3 cols) */}
            <div className="lg:col-span-3 space-y-2.5">
              <h3 className="font-bold text-[12px] uppercase tracking-wider text-slate-200">24*7 Calling Desk & Center</h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                  <div>
                    <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-[#A1CDFB] hover:text-teal-300 font-bold transition-colors">
                      {contact.phone}
                    </a>
                    <p className="text-[11px] text-[#F6F6F6] font-medium">24*7 Helpline & Home Collection</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <PhoneCall className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <a href={`tel:${contact.emergencyPhone.replace(/\s/g, '')}`} className="text-[#FDF2C6] hover:text-amber-300 font-semibold transition-colors">
                      {contact.emergencyPhone}
                    </a>
                    <p className="text-[11px] text-slate-400">Lab Director / Escalation line</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Mail className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                  <a href={`mailto:${contact.email}`} className="text-[#B2D3FC] hover:text-teal-300 transition-colors break-all">
                    {contact.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-teal-300 flex-shrink-0 mt-0.5" />
                  <a 
                    href={contact.mapsLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[#CDF1D4] hover:text-teal-300 transition-colors leading-relaxed"
                  >
                    {contact.address}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div className="text-slate-300 space-y-0.5">
                    <p className="text-[#B5F3DC] font-bold text-[12px]">Open 24*7 Always</p>
                    <p className="text-[12px] text-slate-400">Emergency & walk-in samples anytime</p>
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
                className="hover:text-slate-200 text-slate-400 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => setActiveModal('terms')}
                className="hover:text-slate-200 text-slate-400 transition-colors cursor-pointer"
              >
                Terms & Patient Rights
              </button>
              <button 
                onClick={() => setActiveModal('charter')}
                className="hover:text-slate-200 text-slate-400 transition-colors cursor-pointer"
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
