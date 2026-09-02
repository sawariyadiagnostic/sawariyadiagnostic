'use client';

import { motion } from 'framer-motion';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { services } from '@/data/website-content';

export function Services() {
  const servicesList = services.list;

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="relative fluid-section bg-[#FBFBFD] overflow-hidden">
      
      {/* Liquid Mesh Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-emerald-500/5 blur-[80px] animate-liquid mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-[#0A6E5C]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Clinical Specialities</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Comprehensive Diagnostic Care
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Advanced pathology testing powered by high-throughput analyzers with multi-point QC verification
          </p>
        </div>

        {/* Services Grid with Apple Squircles */}
        <div className="fluid-grid-cards-sm">
          {servicesList.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              viewport={{ once: true }}
              onClick={scrollToContact}
              className="glass-card p-5 sm:p-6 cursor-pointer flex flex-col justify-between group rounded-[24px] border border-white/80 transition-all duration-300 active:scale-[0.98] relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${service.theme.accentBar}`} />

              <div>
                {/* Icon Container */}
                <div className={`w-[52px] h-[48px] rounded-[16px] border flex items-center justify-center mb-4 transition-all duration-200 ${service.theme.iconBg}`}>
                  <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-base sm:text-lg text-[#1D1D1F] mb-1.5 group-hover:text-[#0A6E5C] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                  {service.description}
                </p>
              </div>

              {/* Bottom Action Hint */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span className={`flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full border ${service.theme.badge}`}>
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> NABL Calibrated
                </span>
                <span className="flex items-center gap-1 group-hover:translate-x-0.5 text-[#0A6E5C] font-bold transition-transform text-[11px] sm:text-xs">
                  Book <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
