'use client';

import { siteConfig, telHref } from '@/config/site';
import { Clock, PhoneCall, MapPin, Navigation, ExternalLink, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { footer } from '@/data/website-content';

export function Contact() {
  return (
    <section id="contact" className="relative fluid-section bg-[#F5F5F7] overflow-hidden">
      {/* Liquid Organic Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FFF9F3]0/10 blur-[100px]  mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#155E9A]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Lab Center &amp; Visiting Hours</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Visit Our Central Diagnostic Facility
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Located on Loharu Road, opposite R.S. Sangwan Hospital. Central laboratory is open 24*7 for walk-in patients and emergency from hospitals.
          </p>
        </div>

        {/* Interactive Google Map Embed & Location Card */}
        <div className="max-w-5xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="glass-card bg-white/60 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-white/80 p-5 sm:p-8">
            <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Location Details (5 cols) */}
              <div className="lg:col-span-5 space-y-4 sm:space-y-6 min-w-0">
                <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <MapPin className="w-3.5 h-3.5 text-[#155E9A]" />
                  <span className="text-xs font-bold text-[#1D1D1F]">Lab Center Location</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1F] tracking-tight">
                    Visit Our Diagnostic Facility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    Located on Loharu Road, opposite R.S. Sangwan Hospital. Central laboratory is open 24*7 for walk-in patients and emergency from hospitals.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 border-y border-slate-100 py-3.5">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <MapPin className="w-4 h-4 text-[#102A43] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Address:</span>
                      <span className="text-[#032B65] leading-relaxed break-words">{footer.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 min-w-0">
                    <Clock className="w-4 h-4 text-[#068174] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Operating Hours:</span>
                      <span className="text-[#155E9A] font-bold block">{siteConfig.claims.operatingHours}</span>
                      <span className="text-xs text-slate-500 font-medium block">Lab open 24*7 for walk-in patients and emergency from hospitals</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 min-w-0">
                    <PhoneCall className="w-4 h-4 text-[#155E9A] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Lab contact:</span>
                      <a href={telHref(siteConfig.contact.phone)} className="text-[#155E9A] font-bold hover:underline">
                        {siteConfig.contact.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 min-w-0">
                    <Phone className="w-4 h-4 text-[#AF6106] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Additional contact:</span>
                      <a href={telHref(siteConfig.contact.emergencyPhone)} className="text-[#7F3304] font-semibold hover:underline">
                        {siteConfig.contact.emergencyPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 min-w-0">
                    <Mail className="w-4 h-4 text-[#102A43] flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <span className="font-semibold text-slate-900 block">Official Lab Email:</span>
                      <a href={`mailto:${siteConfig.contact.email}`} className="text-[#102A43] font-medium hover:underline break-all">
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="w-full pt-1">
                  <Button
                    asChild
                    className="action-button btn-primary squircle-btn apple-pressable min-h-11 sm:min-h-12 h-auto px-4 sm:px-6 text-xs sm:text-sm font-bold rounded-[16px] shadow-md hover:shadow-lg active:scale-[0.96] w-full sm:w-auto max-w-full"
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
