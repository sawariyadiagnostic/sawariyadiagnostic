'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Clock, Home, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { homeCollection } from '@/data/website-content';
import { Button } from './ui/button';

export function HomeCollection() {
  const whatsappUrl = whatsappHref('Hello Sawariya Diagnostic, I would like to ask about home sample collection.');

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Documented Collection Protocols',
      description: 'Collection supplies and process for each home visit',
      iconStyle: 'bg-green-600/20 text-green-400 border-green-600/40',
    },
    {
      icon: CheckCircle2,
      title: 'Phlebotomy Team',
      description: 'Home collection is available 06:30 AM–08:00 PM',
      iconStyle: 'bg-blue-500/20 text-cyan-400 border-cyan-500/40',
    },
    {
      icon: Clock,
      title: 'Collection Hours',
      description: '06:30 AM–08:00 PM',
      iconStyle: 'bg-[#7A4B2A]/15 text-[#F1C27D] border-[#7A4B2A]/30',
    },
  ];

  return (
    <section id="home-collection" className="relative fluid-section bg-[#102A43] text-white overflow-hidden border-y border-white/10">
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[40vw] h-[40vw] bg-[#102A43]/40 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-[50vw] h-[50vw] bg-[#C62828]/30 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#155E9A]/10 rounded-full blur-[140px] mix-blend-screen" />
      </div>

      <div className="fluid-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
              <Home className="w-3.5 h-3.5 text-blue-200" />
               <span className="text-xs font-bold text-blue-100">Home collection • 06:30 AM–08:00 PM</span>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-[clamp(1.9rem,1.3rem+3.2vw,3.25rem)] font-black text-white tracking-tight leading-[1.1]">
                Comfortable Diagnostics.
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-emerald-300 to-amber-200">
                  Directly At Your Home.
                </span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-xl font-medium leading-relaxed">
                Request a convenient home visit through the appointment desk or contact the lab directly. Home collection is available from 06:30 AM to 08:00 PM.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="glass-panel-dark rounded-[24px] p-4 space-y-1.5">
                  <div className={`w-9 h-9 rounded-[12px] flex items-center justify-center border ${benefit.iconStyle}`}>
                    <benefit.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-white leading-tight">{benefit.title}</h3>
                  <p className="text-[11px] text-slate-300 leading-normal font-normal">{benefit.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
              {homeCollection.features.map((area) => (
                <div key={area} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-blue-100 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="glass-card ui-card p-5 sm:p-7 shadow-[0_32px_80px_rgba(0,0,0,0.4)] text-slate-900 relative overflow-hidden bg-white">
              <div className="mb-5 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-black text-[#1D1D1F] tracking-tight">Arrange a Home Visit</h3>
                  <span className="bg-blue-50 text-[#102A43] text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                    06:30 AM–08:00 PM
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  This website does not store patient details. Use the appointment desk or contact the lab to share information through the selected channel.
                </p>
              </div>

              <div className="space-y-3">
                <Button asChild className="action-button w-full min-h-12 h-auto text-sm font-bold btn-primary rounded-[18px]">
                  <a href="#contact">
                    <Calendar className="w-4 h-4 mr-2" />
                    Open appointment calendar
                  </a>
                </Button>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="action-button min-h-12 h-auto rounded-[18px] text-xs font-bold">
                    <a href={telHref(siteConfig.contact.phone)}>
                      <Phone className="w-4 h-4 mr-2 text-[#155E9A]" />
                      Call lab desk
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="action-button min-h-12 h-auto rounded-[18px] text-xs font-bold">
                    <a href={whatsappUrl || telHref(siteConfig.contact.phone)} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>
                      <MessageCircle className="w-4 h-4 mr-2 text-[#128C7E]" />
                      Ask on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <p className="text-[11px] text-center text-slate-500 pt-3 font-medium">
                Home collection is available 06:30 AM–08:00 PM. Reports are verified within 12 hours.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
