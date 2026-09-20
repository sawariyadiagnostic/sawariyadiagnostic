'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Users, Clock, Award, CheckCircle2, Microscope, Sparkles } from 'lucide-react';

export function TrustIndicators() {
  const stats = [
    {
      icon: Users,
      value: 'Patient-first',
      label: 'Diagnostic testing',
      subtext: 'Clear service information',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white',
        iconBg: 'bg-blue-50 text-blue-800 border-blue-200/80',
        accentBar: 'bg-[#102A43]',
      }
    },
    {
      icon: Microscope,
      value: 'Available',
      label: 'Test menu',
      subtext: 'Current test menu',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white',
        iconBg: 'bg-blue-50 text-cyan-800 border-blue-200/80',
        accentBar: 'bg-[#C62828]',
      }
    },
    {
      icon: Clock,
      value: 'Patient-first',
      label: 'Lab & Home Sample',
      subtext: '06:30 AM–08:00 PM',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white',
        iconBg: 'bg-green-50 text-green-800 border-green-200/80',
        accentBar: 'bg-[#155E9A]',
      }
    },
    {
      icon: Award,
      value: 'Documented',
      label: 'Quality Process',
      subtext: 'Reports verified within 12 hours',
      theme: {
        card: 'hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] bg-white',
        iconBg: 'bg-[#FFF9F3] text-[#7A4B2A] border-[#D7C7B8]',
        accentBar: 'bg-[#7A4B2A]',
      }
    },
  ];

  const certifications = [
    { name: 'Quality process documented', tag: 'bg-green-50 text-[#102A43] border-green-200/90', iconColor: 'text-green-700' },
    { name: 'Current test menu', tag: 'bg-blue-50 text-blue-900 border-blue-200/90', iconColor: 'text-blue-600' },
    { name: 'Patient information handled carefully', tag: 'bg-blue-50 text-[#102A43] border-blue-200/90', iconColor: 'text-blue-700' },
    { name: 'Reports verified within 12 hours', tag: 'bg-[#FFF9F3] text-[#7A4B2A] border-[#D7C7B8]', iconColor: 'text-[#7A4B2A]' },
  ];

  return (
    <section id="trust" className="relative py-[clamp(2.5rem,1.5rem+3vw,4.5rem)] bg-[#F5F5F7] border-y border-white/40 overflow-hidden">
      
      {/* Liquid Abstract Underlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[#155E9A]/5 rounded-full blur-[100px]  mix-blend-multiply" />
      </div>

      <div className="relative fluid-container z-10">
        
        {/* Apple Health Bento Stats Grid */}
        <div className="fluid-grid-cards-sm mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`glass-card rounded-[24px] p-5 sm:p-6 border border-white/80 transition-surface duration-300 relative overflow-hidden group ${stat.theme.card}`}
            >
              {/* Subtle top accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${stat.theme.accentBar} opacity-80 group-hover:opacity-100 transition-opacity`} />
              
              <div className={`w-10 h-10 sm:w-11 sm:h-11 mb-3.5 rounded-[14px] flex items-center justify-center border shadow-sm ${stat.theme.iconBg}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-[#1D1D1F] tracking-tight mb-0.5">{stat.value}</p>
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-snug">{stat.label}</p>
              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">{stat.subtext}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="glass-panel bg-white/70 rounded-[24px] p-4 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 relative overflow-hidden"
        >
          <div className="flex items-center gap-3.5 text-center md:text-left relative z-10">
            <div className="w-12 h-12 rounded-[16px] bg-gradient-to-br from-[#102A43] via-[#155E9A] to-[#155E9A] text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-[#155E9A]/20">
              <ShieldCheck className="w-6 h-6 text-green-300" />
            </div>
            <div>
              <h3 className="font-bold text-[#1D1D1F] text-sm sm:text-base tracking-tight">Documented Quality Process</h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Home collection is available 06:30 AM–08:00 PM.</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 relative z-10">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className={`flex items-center gap-1.5 border px-3.5 py-1.5 rounded-full transition-colors cursor-default bg-white/50 backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${cert.tag}`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${cert.iconColor}`} />
                <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap">{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
