'use client';

import { useState, useEffect } from 'react';
import { siteConfig, telHref } from '@/config/site';
import { Calendar, Clock, PhoneCall, ChevronRight, MapPin, Navigation, ExternalLink, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import Cal, { getCalApi } from "@calcom/embed-react";
import { footer } from '@/data/website-content';

export function Contact() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarError, setCalendarError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: siteConfig.integrations.calNamespace });
        cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
      } catch {
        setCalendarError(true);
      }
    })();
  }, []);

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
            <Calendar className="w-3.5 h-3.5 text-[#155E9A]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Appointments & Location</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Schedule Your Test or Visit Us
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Book an appointment or request doorstep sample collection with our laboratory reception team.
          </p>
        </div>

        {/* Booking Widget (Apple Card Frame) */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="glass-panel ui-panel apple-squircle-panel rounded-[28px] bg-white/70 overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-white/80">
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-white px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm sm:lg font-bold text-white">Appointment Desk</h3>
                  <span className="bg-[#155E9A] text-[var(--accent-on-dark)] text-xs font-bold px-2.5 py-0.5 rounded-full border border-white/20 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD98A] animate-pulse" />
                    Direct Lab Desk
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-[var(--text-on-dark)] font-normal">
                  Reports verified within 12 hours • Helpline: {siteConfig.contact.phone}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white shrink-0">
                <span className="w-2 h-2 bg-[#FDE047] rounded-full animate-pulse" />
                <span className="font-semibold">{siteConfig.claims.operatingHours}</span>
              </div>
            </div>
            
            {/* Cal.com Embed Container or Facade */}
            <div className="p-5 sm:p-10 bg-white/40 backdrop-blur-md min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
              {calendarError ? (
                <div role="alert" className="text-center max-w-md mx-auto space-y-4 py-4">
                  <Calendar className="w-10 h-10 text-[#155E9A] mx-auto" />
                  <div className="space-y-1.5">
                    <h4 className="text-lg sm:text-2xl font-black text-[#1D1D1F] tracking-tight">Calendar temporarily unavailable</h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">Please call the lab desk to confirm an appointment or collection slot.</p>
                  </div>
                  <Button asChild className="btn-primary squircle-btn apple-pressable action-button min-h-12 h-auto px-7 text-xs sm:text-sm font-bold rounded-[16px] active:scale-[0.96]">
                    <a href={telHref(siteConfig.contact.phone)}>
                      <PhoneCall className="w-4 h-4 mr-2" />
                      Call Desk ({siteConfig.contact.phone})
                    </a>
                  </Button>
                </div>
              ) : !showCalendar ? (
                <div className="text-center max-w-md mx-auto space-y-4 sm:space-y-5 py-4">
                   <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-[20px] flex items-center justify-center mx-auto border border-slate-200 shadow-2xs">
                     <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-[#155E9A]" />
                   </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-lg sm:text-2xl font-black text-[#1D1D1F] tracking-tight">Choose Your Date & Time</h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        Select a convenient time slot for doorstep sample collection or schedule your visit to our central diagnostic facility.
                      </p>
                    </div>

                    <div className="pt-2 flex justify-center">
                      <Button 
                        className="btn-primary squircle-btn apple-pressable action-button min-h-12 h-auto px-8 text-xs sm:text-sm font-bold rounded-[16px] shadow-md hover:shadow-lg active:scale-[0.96] cursor-pointer"
                        onClick={() => setShowCalendar(true)}
                      >
                        <span>Launch Interactive Calendar</span>
                        <ChevronRight className="w-4 h-4 ml-1.5" />
                      </Button>
                    </div>
                </div>
              ) : (
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '540px',
                    overflow: 'scroll'
                  }} 
                >
                  <Cal 
                    namespace={siteConfig.integrations.calNamespace}
                    calLink={siteConfig.integrations.calLink}
                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                    config={{layout: 'month_view'}}
                  />
                </div>
              )}
            </div>
          </div>
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
