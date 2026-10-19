'use client';

import { siteConfig, telHref } from '@/config/site';
import { Clock, PhoneCall, MapPin, Navigation, ExternalLink, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { footer } from '@/data/website-content';

export function Contact() {
  return (
    <section id="contact" className="relative fluid-section bg-[#F8FAFC] overflow-hidden">
      {/* Liquid Organic Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#155E9A]/5 blur-[100px] mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-slate-200/80 px-3.5 py-1 rounded-full shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#155E9A]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Central Laboratory Location</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#102A43] tracking-tight leading-tight">
            Visit Our Central Diagnostic Facility
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Conveniently situated on Loharu Road for immediate walk-in sampling, clinical queries, and hospital emergencies.
          </p>
        </div>

        {/* Interactive Google Map Embed & Location Card */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="glass-card bg-white rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-slate-200/80 p-5 sm:p-8">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Location Details (5 cols) */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-5 min-w-0">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold shadow-2xs">
                    <span className="flex h-2 w-2 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                    </span>
                    <span>Walk-In &amp; Emergency Desk Open</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#102A43] tracking-tight">
                    Facility Access &amp; Inquiries
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    In-house pathology testing on Loharu Road with zero out-of-town sample transit delay.
                  </p>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700 border-y border-slate-100 py-3.5">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-[10px] bg-blue-50 border border-blue-200/70 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-[#155E9A]" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-0.5">Center Address</span>
                      <span className="text-[#032B65] font-semibold leading-relaxed break-words">{footer.contact.address}</span>
                      <span className="text-[11px] text-slate-500 block mt-0.5 font-medium">Opposite R.S. Sangwan Hospital • 1st Floor</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-[10px] bg-emerald-50 border border-emerald-200/70 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider text-slate-500 mb-0.5">Operating Hours</span>
                      <span className="text-[#155E9A] font-bold block leading-relaxed">{siteConfig.claims.operatingHours}</span>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 pt-1">
                    <a
                      href={telHref(siteConfig.contact.phone)}
                      className="p-2.5 rounded-[14px] bg-slate-50 hover:bg-blue-50/70 border border-slate-200/80 hover:border-blue-300 transition-colors group block cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10.5px] font-semibold uppercase tracking-wider">
                        <PhoneCall className="w-3.5 h-3.5 text-[#155E9A]" />
                        <span>Lab Desk</span>
                      </div>
                      <div className="font-bold text-slate-900 group-hover:text-[#155E9A] text-xs sm:text-sm mt-0.5 tabular-nums">
                        {siteConfig.contact.phone}
                      </div>
                    </a>

                    <a
                      href={telHref(siteConfig.contact.emergencyPhone)}
                      className="p-2.5 rounded-[14px] bg-slate-50 hover:bg-amber-50/70 border border-slate-200/80 hover:border-amber-300 transition-colors group block cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10.5px] font-semibold uppercase tracking-wider">
                        <Phone className="w-3.5 h-3.5 text-[#7A4B2A]" />
                        <span>Emergency Line</span>
                      </div>
                      <div className="font-bold text-slate-900 group-hover:text-[#7A4B2A] text-xs sm:text-sm mt-0.5 tabular-nums">
                        {siteConfig.contact.emergencyPhone}
                      </div>
                    </a>
                  </div>

                  <div className="flex items-center gap-2.5 min-w-0 pt-0.5 text-xs">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="text-slate-500 font-medium">Official Lab Email:</span>
                    <a href={`mailto:${siteConfig.contact.email}`} className="text-[#155E9A] font-semibold hover:underline truncate">
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>

                <div className="w-full pt-1">
                  <Button
                    asChild
                    className="action-button btn-primary squircle-btn apple-pressable min-h-11 sm:min-h-12 h-auto px-5 sm:px-7 text-xs sm:text-sm font-bold rounded-[16px] shadow-md hover:shadow-lg active:scale-[0.96] w-full sm:w-auto max-w-full cursor-pointer"
                  >
                    <a href={footer.contact.mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 max-w-full">
                      <Navigation className="w-4 h-4 shrink-0" />
                      <span>Open Google Maps Directions</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Embedded Google Map Iframe (7 cols) */}
              <div className="lg:col-span-7">
                <div className="w-full h-[320px] sm:h-[400px] rounded-[22px] overflow-hidden border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative bg-slate-50">
                  <div className="absolute top-3 right-3 z-10 pointer-events-auto">
                    <a
                      href={footer.contact.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px] squircle-btn apple-pressable bg-white/95 backdrop-blur-md text-xs font-semibold text-[#155E9A] shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_10px_rgba(0,0,0,0.12)] hover:bg-white hover:text-[#0A3663] transition-colors border border-slate-200/60 active:scale-[0.96]"
                      aria-label="View larger map in Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>View larger map</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <iframe
                    title="Sawariya Diagnostic Lab Google Maps Location"
                    src={footer.contact.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full block"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
