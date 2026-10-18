import { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, ChevronUp, Clock, Coffee, Droplets, ExternalLink, Home, MessageCircle, Phone, Pill, ShieldCheck, Sparkles, Syringe } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { homeCollection } from '@/data/website-content';
import { Button } from './ui/button';
import Cal, { getCalApi } from "@calcom/embed-react";

export function HomeCollection() {
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarError, setCalendarError] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: siteConfig.integrations.calNamespace });
        cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
      } catch {
        setCalendarError(true);
      }
    })();
  }, []);

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
                      <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-200/60 mb-2">
                        <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#155E9A]" />
                          <span>Choose Date &amp; Time</span>
                        </span>
                        <a
                          href={`https://cal.com/${siteConfig.integrations.calLink}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-semibold text-[#155E9A] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Full window</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
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
                        <div style={{ width: '100%', height: '100%', minHeight: '480px', overflow: 'scroll' }}>
                          <Cal
                            namespace={siteConfig.integrations.calNamespace}
                            calLink={siteConfig.integrations.calLink}
                            style={{ width: '100%', height: '100%', minHeight: '480px', overflow: 'scroll' }}
                            config={{ layout: 'month_view' }}
                          />
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
        <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10 grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Caregiver Fasting Checklist */}
          <div className="glass-panel-dark rounded-[24px] p-5 sm:p-6 space-y-4 border border-white/15">
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
          <div className="glass-panel-dark rounded-[24px] p-5 sm:p-6 space-y-4 border border-white/15">
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
      </div>
    </section>
  );
}
