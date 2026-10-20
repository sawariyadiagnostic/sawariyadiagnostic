import { useState, useEffect, useMemo } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, Coffee, Droplets, ExternalLink, Home, MapPin, MessageCircle, Phone, Pill, Search, ShieldCheck, Sparkles, Syringe } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { homeCollection } from '@/data/website-content';
import { Button } from './ui/button';
import Cal, { getCalApi } from "@calcom/embed-react";

interface CatchmentVillage {
  name: string;
  block: string;
  distance: string;
  routeTiming: string;
}

const CATCHMENT_VILLAGES: CatchmentVillage[] = [
  { name: 'Badhra', block: 'Badhra Tehsil', distance: '22 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Bhandwa', block: 'Badhra Tehsil', distance: '24 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Berla', block: 'Badhra Tehsil', distance: '20 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Kari Mod', block: 'Badhra Tehsil', distance: '18 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Chandwas', block: 'Badhra Tehsil', distance: '25 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Hansawas Kalan', block: 'Badhra Tehsil', distance: '23 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Gopi', block: 'Badhra Tehsil', distance: '26 km', routeTiming: '07:30 AM – 10:00 AM' },
  { name: 'Jhojhu Kalan', block: 'Jhojhu Kalan Sub-Tehsil', distance: '16 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Jhojhu Khurd', block: 'Jhojhu Kalan Sub-Tehsil', distance: '17 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Tiwala', block: 'Jhojhu Kalan Sub-Tehsil', distance: '14 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Atela Khurd', block: 'Jhojhu Kalan Sub-Tehsil', distance: '12 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Atela Kalan', block: 'Jhojhu Kalan Sub-Tehsil', distance: '13 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Kadma', block: 'Jhojhu Kalan Sub-Tehsil', distance: '20 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Chandeni', block: 'Jhojhu Kalan Sub-Tehsil', distance: '15 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Bond Kalan', block: 'Bond Kalan Sub-Tehsil', distance: '18 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Ranila', block: 'Bond Kalan Sub-Tehsil', distance: '20 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Sanjarwas', block: 'Bond Kalan Sub-Tehsil', distance: '16 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Missri', block: 'Bond Kalan Sub-Tehsil', distance: '14 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Asawari', block: 'Bond Kalan Sub-Tehsil', distance: '17 km', routeTiming: '07:30 AM – 10:30 AM' },
  { name: 'Rawaldhi', block: 'Bhiwani & Narnaul Corridors', distance: '6 km', routeTiming: '07:00 AM – 11:00 AM' },
  { name: 'Imlota', block: 'Bhiwani & Narnaul Corridors', distance: '10 km', routeTiming: '07:00 AM – 11:00 AM' },
  { name: 'Morwala', block: 'Bhiwani & Narnaul Corridors', distance: '12 km', routeTiming: '07:00 AM – 11:00 AM' },
  { name: 'Mandola', block: 'Bhiwani & Narnaul Corridors', distance: '14 km', routeTiming: '07:00 AM – 11:00 AM' },
  { name: 'Balali', block: 'Bhiwani & Narnaul Corridors', distance: '15 km', routeTiming: '07:00 AM – 11:00 AM' },
  { name: 'Khatiwas', block: 'Bhiwani & Narnaul Corridors', distance: '8 km', routeTiming: '07:00 AM – 11:00 AM' },
  { name: 'Charkhi Village', block: 'Charkhi Dadri Central', distance: '4 km', routeTiming: '07:00 AM – 11:30 AM' },
  { name: 'Loharu Road & Civil Hospital Area', block: 'Charkhi Dadri Central', distance: '1 km', routeTiming: '07:00 AM – 12:00 PM' },
];

export function HomeCollection() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarError, setCalendarError] = useState(false);
  const [useDirectEmbed, setUseDirectEmbed] = useState(false);
  const [activeBentoTab, setActiveBentoTab] = useState<'fasting' | 'opd'>('fasting');
  const [selectedBlock, setSelectedBlock] = useState<string>('all');
  const [villageSearch, setVillageSearch] = useState<string>('');
  const [activeVillage, setActiveVillage] = useState<CatchmentVillage | null>(null);

  const filteredVillages = useMemo(() => {
    return CATCHMENT_VILLAGES.filter((v) => {
      const matchesBlock = selectedBlock === 'all' || v.block === selectedBlock;
      const matchesSearch = !villageSearch.trim() || v.name.toLowerCase().includes(villageSearch.toLowerCase().trim());
      return matchesBlock && matchesSearch;
    });
  }, [selectedBlock, villageSearch]);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: siteConfig.integrations.calNamespace });
        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        cal("ui", {
          "hideEventTypeDetails": false,
          "layout": isMobile ? "column_view" : "month_view"
        });
      } catch {
        setCalendarError(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (showCalendar && !useDirectEmbed) {
      // If the embed script is blocked by an ad-blocker or hangs, automatically switch to direct iframe
      const timer = setTimeout(() => {
        const calIframe = document.querySelector('.cal-inline-container iframe, iframe[src*="cal.com"]');
        if (!calIframe) {
          setUseDirectEmbed(true);
        }
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [showCalendar, useDirectEmbed]);

  const whatsappUrl = whatsappHref('Hello Sawariya Diagnostic, I would like to ask about home sample collection.');

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Single-Use Vacuum Tubes',
      description: 'Fresh sealed vacutainer supplies opened in your direct presence',
      iconStyle: 'bg-green-600/20 text-green-400 border-green-600/40',
    },
    {
      icon: CheckCircle2,
      title: 'Gentle Phlebotomy',
      description: 'Experienced collection care for seniors, children & delicate veins',
      iconStyle: 'bg-blue-500/20 text-cyan-400 border-cyan-500/40',
    },
    {
      icon: Clock,
      title: 'Cold-Chain Sample Transit',
      description: 'Temperature-controlled transport directly to our central lab',
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
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
              <Home className="w-3.5 h-3.5 text-blue-200" />
              <span className="text-xs font-bold text-blue-100">Single-Prick Multi-Test Consolidation • Sealed Cold-Chain Transit</span>
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
                Schedule a gentle doorstep visit at your preferred morning or evening slot. All blood and biological specimens are collected using single-use vacuum tubes and transferred with temperature logs to our central laboratory.
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
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="glass-card ui-card apple-squircle-card p-5 sm:p-7 shadow-[0_32px_80px_rgba(0,0,0,0.4)] text-slate-900 relative overflow-hidden bg-white rounded-[28px]">
              <div className="mb-5 space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg sm:text-xl font-black text-[#1D1D1F] tracking-tight">Arrange a Home Visit</h3>
                  <span className="bg-emerald-50 text-emerald-800 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Phlebotomy Active Now
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Direct coordination via phone or WhatsApp. Our collection team confirms your preferred morning or evening time slot immediately.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="action-button btn-primary squircle-btn apple-pressable w-full min-h-12 h-auto text-sm font-bold rounded-[16px] active:scale-[0.96] cursor-pointer flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{showCalendar ? 'Hide appointment calendar' : 'Open appointment calendar'}</span>
                  {showCalendar ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
                </Button>

                {showCalendar && (
                  <div className="pt-2 animate-fade-in space-y-2">
                    <div className="rounded-[20px] bg-slate-50 border border-slate-200/90 p-2 sm:p-3 shadow-inner overflow-hidden">
                      <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-200/60 mb-2 gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#155E9A]" />
                          <span>Choose Date &amp; Time</span>
                        </span>
                        <div className="flex items-center gap-2 text-[11px]">
                          <button
                            type="button"
                            onClick={() => setUseDirectEmbed(!useDirectEmbed)}
                            className="font-semibold text-slate-500 hover:text-[#155E9A] underline decoration-dotted cursor-pointer transition-colors"
                          >
                            {useDirectEmbed ? 'Switch to widget' : 'Trouble loading? Direct view'}
                          </button>
                          <span className="text-slate-300">•</span>
                          <a
                            href={`https://cal.com/${siteConfig.integrations.calLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-[#155E9A] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Full window</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                      {calendarError ? (
                        <div role="alert" className="text-center py-6 px-4 space-y-3">
                          <Calendar className="w-8 h-8 text-[#155E9A] mx-auto" />
                          <div className="space-y-1">
                            <h4 className="font-bold text-sm text-[#1D1D1F]">Calendar temporarily unavailable</h4>
                            <p className="text-xs text-slate-500">
                              Please call the lab desk to confirm an appointment or collection slot.
                            </p>
                          </div>
                          <Button asChild size="sm" className="action-button btn-primary squircle-btn rounded-[12px] font-bold text-xs">
                            <a href={telHref(siteConfig.contact.phone)}>
                              <Phone className="w-3.5 h-3.5 mr-1.5" />
                              Call Lab Desk ({siteConfig.contact.phone})
                            </a>
                          </Button>
                        </div>
                      ) : (
                        <div className="w-full h-[620px] min-h-[600px] rounded-[16px] overflow-hidden bg-white shadow-inner relative">
                          {useDirectEmbed ? (
                            <iframe
                              src={`https://cal.com/${siteConfig.integrations.calLink}?embed=true`}
                              className="w-full h-full min-h-[600px] border-0"
                              title="Sawariya Diagnostics Appointment Booking"
                            />
                          ) : (
                            <div className="w-full h-[620px] min-h-[600px] overflow-auto touch-pan-y">
                              <Cal
                                namespace={siteConfig.integrations.calNamespace}
                                calLink={siteConfig.integrations.calLink}
                                style={{ width: '100%', height: '100%', minHeight: '600px' }}
                                config={{ layout: typeof window !== 'undefined' && window.innerWidth < 768 ? 'column_view' : 'month_view' }}
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-3">
                  <Button asChild variant="outline" className="action-button btn-outline squircle-btn apple-pressable min-h-12 h-auto rounded-[16px] text-xs font-bold active:scale-[0.96]">
                    <a href={telHref(siteConfig.contact.phone)}>
                      <Phone className="w-4 h-4 mr-2 text-[#155E9A]" />
                      Call lab desk
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="action-button btn-outline squircle-btn apple-pressable min-h-12 h-auto rounded-[16px] text-xs font-bold active:scale-[0.96]">
                    <a href={whatsappUrl || telHref(siteConfig.contact.phone)} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>
                      <MessageCircle className="w-4 h-4 mr-2 text-[#128C7E]" />
                      Ask on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              <p className="text-[11px] text-center text-slate-500 pt-3 font-medium flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline shrink-0" />
                <span>Sealed Cold-Chain Transit • Morning fasting guidance provided with slot confirmation</span>
              </p>
            </div>
          </m.div>
        </div>

        {/* Caregiver Pre-Analytical Clarity & Evening OPD Catchment Grid */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10">
          {/* Mobile Bento Tab Switcher */}
          <div className="flex md:hidden gap-1.5 p-1 bg-white/10 backdrop-blur-md rounded-[16px] mb-4 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveBentoTab('fasting')}
              className={`flex-1 py-2 px-2.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer ${
                activeBentoTab === 'fasting'
                  ? 'bg-white text-[#102A43] shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              💧 Fasting &amp; Chai Rules
            </button>
            <button
              type="button"
              onClick={() => setActiveBentoTab('opd')}
              className={`flex-1 py-2 px-2.5 rounded-[12px] text-xs font-bold transition-all cursor-pointer ${
                activeBentoTab === 'opd'
                  ? 'bg-white text-[#102A43] shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              ⏱️ Evening OPD Timeline
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Caregiver Fasting Checklist */}
            <div className={`glass-panel-dark rounded-[24px] p-5 sm:p-6 space-y-4 border border-white/15 ${activeBentoTab === 'fasting' ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Coffee className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Caregiver Clarity: &quot;Can Dad Drink Chai or Take His BP Pill?&quot;
                </h4>
                <p className="text-[11px] text-slate-300">
                  Pre-analytical morning guidance for fasting blood draws
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 p-2.5 rounded-[14px] bg-white/5 border border-white/10">
                <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white">Plain Drinking Water: Allowed</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    1–2 glasses of water are recommended. Well-hydrated veins plump up, making needle insertion smooth and virtually painless.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-[14px] bg-white/5 border border-white/10">
                <span className="p-1 rounded-full bg-rose-500/20 text-rose-400 mt-0.5 shrink-0">
                  <Coffee className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white">Morning Chai, Coffee &amp; Milk: Hold Until After Draw</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Milk fat, caffeine, and sugar interfere with lipid, enzyme, and glucose assays. Please have morning tea right after sample collection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-[14px] bg-white/5 border border-white/10">
                <span className="p-1 rounded-full bg-blue-500/20 text-cyan-400 mt-0.5 shrink-0">
                  <Pill className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white">Blood Pressure &amp; Heart Meds: Take With Water</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Never skip routine blood pressure medicines. Take with a small sip of water, unless your cardiologist specifically directs otherwise.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-[14px] bg-white/5 border border-white/10">
                <span className="p-1 rounded-full bg-amber-500/20 text-amber-400 mt-0.5 shrink-0">
                  <Syringe className="w-3.5 h-3.5" />
                </span>
                <div>
                  <strong className="text-white">Diabetic Medication &amp; Insulin: Hold for Breakfast</strong>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Fasting glucose must reflect your natural morning baseline. Keep morning diabetes pills or insulin ready to take with breakfast right after the prick.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Evening OPD Catchment Clock */}
          <div className={`glass-panel-dark rounded-[24px] p-5 sm:p-6 space-y-4 border border-white/15 ${activeBentoTab === 'opd' ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-[10px] bg-blue-500/20 text-cyan-300 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  Evening OPD Clock: In Time for Doctor&apos;s Clinic
                </h4>
                <p className="text-[11px] text-slate-300">
                  Predictable workflow so you never have to visit the doctor twice
                </p>
              </div>
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/20">
              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-teal-400 ring-4 ring-slate-900" />
                <div className="text-xs">
                  <span className="font-extrabold text-teal-300">07:00 AM – 10:30 AM • Doorstep Draw</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Sample collected at your home and sealed in a temperature-monitored cold-chain box.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-blue-400 ring-4 ring-slate-900" />
                <div className="text-xs">
                  <span className="font-extrabold text-blue-300">11:00 AM • Central Laboratory Accession</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Centrifuged and run on central in-house calibrated analyzers following NABL standard protocols.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-amber-400 ring-4 ring-slate-900" />
                <div className="text-xs">
                  <span className="font-extrabold text-amber-300">02:00 PM • Digital Report Verification</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Doctor-verified PDF report delivered straight to your WhatsApp with full biomarker breakdown.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-slate-900" />
                <div className="text-xs">
                  <span className="font-extrabold text-emerald-300">05:00 PM • Ready for Doctor&apos;s Evening OPD</span>
                  <p className="text-slate-300 text-[11px] mt-0.5">
                    Walk into your treating doctor&apos;s clinic with completed diagnostic reports ready on your phone.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded-[12px] bg-white/5 border border-white/10 text-[11px] text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Single-prick multi-analyte panels save elderly patients from repeated venipunctures.</span>
            </div>
          </div>
        </div>

        {/* Rural Village Catchment Directory across Charkhi Dadri District */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10">
          <div className="glass-panel-dark rounded-[24px] p-5 sm:p-7 space-y-5 border border-white/15">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider mb-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Doorstep Catchment Area</span>
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
                  Rural Home Sample Collection Across Charkhi Dadri District
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                  Covering 40+ rural villages and sub-tehsils with daily scheduled morning phlebotomy routes. Samples are transported in temperature-monitored cold-chain carriers directly to our Loharu Road central lab.
                </p>
              </div>

              {/* Village Quick Search Input */}
              <div className="w-full md:w-72 relative shrink-0">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Find your village…"
                  value={villageSearch}
                  onChange={(e) => setVillageSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-[14px] bg-white/10 border border-white/20 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>
            </div>

            {/* Sub-District Block Filters */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none items-center flex-nowrap sm:flex-wrap">
              {[
                { id: 'all', label: 'All 40+ Villages' },
                { id: 'Badhra Tehsil', label: 'Badhra Tehsil' },
                { id: 'Jhojhu Kalan Sub-Tehsil', label: 'Jhojhu Kalan Corridor' },
                { id: 'Bond Kalan Sub-Tehsil', label: 'Bond Kalan & Ranila' },
                { id: 'Bhiwani & Narnaul Corridors', label: 'Rawaldhi & Corridors' },
                { id: 'Charkhi Dadri Central', label: 'Dadri Central' },
              ].map((tab) => {
                const isActive = selectedBlock === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedBlock(tab.id)}
                    className={`min-h-8 px-3 rounded-[12px] text-xs font-bold transition-all cursor-pointer whitespace-nowrap active:scale-[0.96] ${
                      isActive ? 'bg-teal-500 text-slate-950 shadow-sm' : 'bg-white/10 text-slate-300 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Village Pill Badges Grid */}
            <div className="flex flex-wrap gap-2 pt-1 max-h-48 overflow-y-auto pr-1">
              {filteredVillages.map((v) => {
                const isSelected = activeVillage?.name === v.name;
                return (
                  <button
                    key={v.name}
                    type="button"
                    onClick={() => setActiveVillage(isSelected ? null : v)}
                    className={`px-3 py-1.5 rounded-[12px] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 border active:scale-[0.96] ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-sm'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>{v.name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">({v.distance})</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Village Route Details Banner */}
            {activeVillage && (
              <div className="p-4 rounded-[18px] bg-gradient-to-r from-teal-950/70 to-slate-900/80 border border-teal-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-teal-300">Village {activeVillage.name} ({activeVillage.block})</span>
                    <span className="text-[10.5px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 font-semibold">Morning Route Confirmed</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Phlebotomist Arrival Window: <strong className="text-white">{activeVillage.routeTiming}</strong> • Cold-chain transport directly to Central Lab
                  </p>
                </div>
                <a
                  href={whatsappHref(`Hello Sawariya Diagnostic, I would like to request home collection in Village ${activeVillage.name} (${activeVillage.block}). Please share available morning slots.`)}
                  className="action-button btn-whatsapp squircle-btn apple-pressable min-h-10 px-4 rounded-[14px] font-bold text-xs inline-flex items-center justify-center gap-2 text-white shrink-0 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Request collection in {activeVillage.name}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
