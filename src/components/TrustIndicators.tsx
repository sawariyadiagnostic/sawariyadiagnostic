'use client';

import { m } from 'framer-motion';
import { ShieldCheck, Clock, CheckCircle2, Microscope, Home } from 'lucide-react';

export function TrustIndicators() {
  const stats = [
    {
      icon: ShieldCheck,
      value: 'Barcoded',
      label: 'Vacutainer Collection',
      subtext: 'Error-free sample identity',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white peacock-test-card spine-biochem',
        iconBg: 'bg-teal-50 text-[#0B6E66] border-teal-200/80',
        accentBar: 'bg-[#00686B]',
      }
    },
    {
      icon: Home,
      value: 'Zero Transit',
      label: 'In-House Testing',
      subtext: 'Analyzed on-site at Loharu Road hub',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white peacock-test-card spine-clia',
        iconBg: 'bg-cyan-50 text-[#0A6C82] border-cyan-200/80',
        accentBar: 'bg-[#0F2537]',
      }
    },
    {
      icon: Microscope,
      value: 'CLIA & 5-Part',
      label: 'Central Analyzer Care',
      subtext: 'Immunoassays & hematology',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white peacock-test-card spine-metabolic',
        iconBg: 'bg-amber-50 text-[#B4690E] border-amber-200/80',
        accentBar: 'bg-[#B4690E]',
      }
    },
    {
      icon: Clock,
      value: '12-Hour',
      label: 'Verified Digital Delivery',
      subtext: 'Reports verified within 12 hours',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white peacock-test-card spine-hematology',
        iconBg: 'bg-rose-50 text-[#C81E1E] border-rose-200/80',
        accentBar: 'bg-[#C8102E]',
      }
    },
  ];

  const certifications = [
    { name: 'Barcoded sample identification', tag: 'bg-teal-50 text-[#074F49] border-teal-200/90', iconColor: 'text-[#0B6E66]' },
    { name: 'Processed in-house at Loharu Road', tag: 'bg-blue-50 text-[#0F2537] border-blue-200/90', iconColor: 'text-[#0A6C82]' },
    { name: 'Home collection: 07:00 AM–07:00 PM', tag: 'bg-amber-50 text-[#854D0E] border-amber-200/90', iconColor: 'text-[#B4690E]' },
    { name: 'Reports verified within 12 hours', tag: 'bg-emerald-50 text-[#064E3B] border-emerald-200/90', iconColor: 'text-[#04724D]' },
  ];

  return (
    <section id="about" className="relative py-[clamp(2.5rem,1.5rem+3vw,4.5rem)] bg-[#F5F5F7] border-y border-white/40 overflow-hidden">
      <div id="trust" className="sr-only" />
      
      {/* Liquid Abstract Underlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#155E9A]/5 rounded-full blur-[100px]  mix-blend-multiply" />
      </div>

      <div className="relative fluid-container z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-slate-200/80 px-3.5 py-1 rounded-full shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E66]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Clinical Standards &amp; Quality</span>
          </div>
          <h2 className="text-[clamp(1.5rem,1.1rem+2vw,2.25rem)] font-black text-[#0A1128] tracking-tight leading-tight">
            Diagnostic Accuracy &amp; Transparency
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            Standardized vacutainer sample collection, zero out-of-town transit, and reports verified within 12 hours.
          </p>
        </div>

        {/* Quality Bento Stats Grid */}
        <div className="fluid-grid-cards-sm mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <m.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`rounded-[24px] p-5 sm:p-6 border border-slate-200/80 transition-surface duration-300 relative overflow-hidden group ${stat.theme.card}`}
            >
              <div className={`w-10 h-10 sm:w-11 sm:h-11 mb-3.5 rounded-[14px] flex items-center justify-center border shadow-xs ${stat.theme.iconBg}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#0A1128] tracking-tight mb-0.5">{stat.value}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{stat.label}</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">{stat.subtext}</p>
            </m.div>
          ))}
        </div>

        {/* Quality Standards Bar */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="glass-panel bg-white/80 rounded-[24px] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 relative overflow-hidden border border-slate-200/70"
        >
          <div className="flex items-center gap-3.5 text-center md:text-left relative z-10">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#0A1128] via-[#0A6C82] to-[#0B6E66] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#0A6C82]/20">
              <ShieldCheck className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-[#0A1128] text-sm sm:text-base tracking-tight">Central Clinical Quality Process</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Home collection: 07:00 AM–07:00 PM across Charkhi Dadri.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 relative z-10">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className={`flex items-center gap-1.5 border px-3.5 py-1.5 rounded-full transition-colors cursor-default bg-white/80 backdrop-blur-md shadow-2xs ${cert.tag}`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${cert.iconColor}`} />
                <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">{cert.name}</span>
              </div>
            ))}
          </div>
        </m.div>
      </div>
    </section>
  );
}
