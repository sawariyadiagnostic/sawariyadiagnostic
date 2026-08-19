'use client';

import { useState, useEffect } from 'react';
import { Calendar, FileCheck, Home, Clock, PhoneCall, ChevronRight, MapPin, Navigation, ExternalLink, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import Cal, { getCalApi } from "@calcom/embed-react";
import { footer } from '@/data/website-content';

export function Contact() {
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"sawariya-booking"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const infoCards = [
    {
      icon: FileCheck,
      title: '1. Select Test / Package',
      description: 'Choose routine panels or custom doctor prescriptions.',
      style: {
        iconBg: 'bg-blue-50 text-[#0A3663] border-blue-200/80',
        accentBar: 'bg-[#0A3663]',
      }
    },
    {
      icon: Home,
      title: '2. Lab or Home Sample',
      description: 'Visit our 24*7 modern facility or book doorstep collection.',
      style: {
        iconBg: 'bg-emerald-50 text-[#0A6E5C] border-emerald-200/80',
        accentBar: 'bg-[#0A6E5C]',
      }
    },
    {
      icon: Clock,
      title: '3. Express WhatsApp Report',
      description: 'Get verified digital PDF reports with direct QR validation.',
      style: {
        iconBg: 'bg-amber-50 text-[#D97706] border-amber-200/80',
        accentBar: 'bg-[#D97706]',
      }
    },
  ];

  return (
    <section id="contact" className="relative fluid-section bg-[#F5F5F7] overflow-hidden">
      {/* Liquid Organic Mesh Gradient Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-amber-500/10 blur-[100px] animate-liquid mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs">
            <Calendar className="w-3.5 h-3.5 text-[#0A6E5C]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">24*7 Appointments & Location</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Schedule Your Test or Visit Us
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Open 24*7 always. Walk-in samples, home collections, and doctor consultations.
          </p>
        </div>

        {/* Booking Widget (Apple Card Frame) */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14 relative z-10">
          <div className="glass-panel bg-white/70 rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-white/80">
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-teal-500/30">
              <div className="space-y-0.5">
                <h3 className="text-sm sm:text-lg font-bold text-white flex items-center gap-2">
                  <span>Online Appointment & Doctor Desk</span>
                  <span className="bg-white/20 text-[#FDE047] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-teal-300/30">
                    24*7 Active
                  </span>
                </h3>
                <p className="text-[11px] sm:text-xs text-teal-100 font-normal">
                  Instant confirmation • Helpline: +91 99919 41207
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white">
                <span className="w-2 h-2 bg-[#FDE047] rounded-full animate-pulse" />
                <span className="font-semibold">Always Open (24*7)</span>
              </div>
            </div>
            
            {/* Cal.com Embed Container or Facade */}
            <div className="p-5 sm:p-10 bg-white/40 backdrop-blur-md min-h-[380px] sm:min-h-[420px] flex items-center justify-center">
              {!showCalendar ? (
                <div className="text-center max-w-md mx-auto space-y-4 sm:space-y-5 py-4">
                   <div className="w-14 h-14 sm:w-16 sm:h-16 bg-slate-50 rounded-[20px] flex items-center justify-center mx-auto border border-slate-200 shadow-2xs">
                     <Calendar className="w-7 h-7 sm:w-8 sm:h-8 text-[#0A6E5C]" />
                   </div>
                    
                    <div className="space-y-1.5">
                      <h4 className="text-lg sm:text-2xl font-black text-[#1D1D1F] tracking-tight">Choose Your Date & Time</h4>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                        Check live available time slots for our Charkhi Dadri center or request a dedicated home visit.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
                      <Button 
                        className="btn-primary h-12 px-7 text-xs sm:text-sm font-bold rounded-[16px] shadow-sm hover:shadow-md active:scale-[0.98]"
                        onClick={() => setShowCalendar(true)}
                      >
                        <span>Launch Interactive Calendar</span>
                        <ChevronRight className="w-4 h-4 ml-1.5" />
                      </Button>
                      <Button 
                        asChild
                        variant="outline"
                        className="btn-outline h-12 px-6 text-xs sm:text-sm font-bold rounded-[16px] shadow-2xs hover:shadow-sm"
                      >
                        <a href="tel:+919991941207">
                          <PhoneCall className="w-4 h-4 mr-2 text-[#0A6E5C]" />
                          <span>Call Desk (+91 99919 41207)</span>
                        </a>
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
                    namespace="sawariya-booking"
                    calLink="sawariya-lab/30min"
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
              <div className="lg:col-span-5 space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <MapPin className="w-3.5 h-3.5 text-[#0A6E5C]" />
                  <span className="text-xs font-bold text-[#1D1D1F]">Lab Center Location</span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-xl sm:text-2xl font-black text-[#1D1D1F] tracking-tight">
                    Visit Our Diagnostic Facility
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                    Centrally located on Loharu Road, right opposite R.S. Sangwan Hospital with dedicated patient parking and sample collection rooms.
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700 border-y border-slate-100 py-3.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#0A3663] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Address:</span>
                      <span className="text-slate-500 leading-relaxed">{footer.contact.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#00A896] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Operating Hours:</span>
                      <span className="text-emerald-700 font-bold">24*7 Active (Always Open)</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <PhoneCall className="w-4 h-4 text-[#0A6E5C] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">24*7 Lab Helpline:</span>
                      <a href="tel:+919991941207" className="text-[#0A6E5C] font-bold hover:underline">
                        +91 99919 41207
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Emergency & Lab Director:</span>
                      <a href="tel:+917015290782" className="text-amber-800 font-semibold hover:underline">
                        +91 70152 90782 (Director/Manager)
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#0A3663] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Official Lab Email:</span>
                      <a href="mailto:sawariyadiagnosticckd11@gmail.com" className="text-[#0A3663] font-medium hover:underline break-all">
                        sawariyadiagnosticckd11@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  <Button
                    asChild
                    className="btn-primary h-11 sm:h-12 px-6 text-xs sm:text-sm font-bold rounded-[16px] shadow-sm hover:shadow-md active:scale-[0.98]"
                  >
                    <a href={footer.contact.mapsLink} target="_blank" rel="noopener noreferrer">
                      <Navigation className="w-4 h-4 mr-2" />
                      <span>Get Live Google Maps Directions</span>
                      <ExternalLink className="w-3.5 h-3.5 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Embedded Google Map Iframe (7 cols) */}
              <div className="lg:col-span-7">
                <div className="w-full h-[320px] sm:h-[400px] rounded-[22px] overflow-hidden border border-white/80 shadow-[inset_0_2px_12px_rgba(0,0,0,0.08)] relative bg-white/40 backdrop-blur-md">
                  <iframe
                    title="Sawariya Diagnostic Lab Google Maps Location"
                    src={footer.contact.mapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, opacity: 0.9 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* 3 Step Workflow Bento Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto relative z-10">
          {infoCards.map((card) => (
            <div 
              key={card.title}
              className="glass-card p-5 text-center flex flex-col items-center justify-between bg-white/70 rounded-[24px] border border-white/80 shadow-[0_4px_16px_rgba(0,0,0,0.03)] relative overflow-hidden transition-all hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${card.style.accentBar}`} />

              <div className={`w-11 h-11 mx-auto mb-3 rounded-[16px] border flex items-center justify-center ${card.style.iconBg}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-[#1D1D1F] mb-1 leading-snug">{card.title}</h4>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-normal">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
