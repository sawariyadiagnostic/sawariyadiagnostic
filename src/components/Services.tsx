'use client';

import { m } from 'framer-motion';
import { Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { services } from '@/data/website-content';

export function Services() {
  const servicesList = services.list;

  const navigateToTests = (query?: string) => {
    if (query) {
      window.dispatchEvent(new CustomEvent('sawariya:search', { detail: { query } }));
    }
    const catalogElement = document.getElementById('tests');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="relative fluid-section bg-[#FBFBFD] overflow-hidden">
      
      {/* Liquid Mesh Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-600/5 blur-[80px] mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-slate-200/80 px-3.5 py-1 rounded-full shadow-2xs">
            <Activity className="w-3.5 h-3.5 text-[#0B6E66]" />
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">Clinical Specialities</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#0A1128] tracking-tight leading-tight">
            Comprehensive Diagnostic Care
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            From routine preventive health monitoring to specialized hormonal chemiluminescence, all investigations are performed directly on our central analyzers opposite R.S. Sangwan Hospital.
          </p>
        </div>

        {/* Services Grid with Peacock Department Spines & Biomarker Tags */}
        <div className="fluid-grid-cards-sm">
          {servicesList.map((service, index) => (
            <m.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => navigateToTests(service.searchQuery)}
              className={`peacock-test-card ${service.spineClass || 'spine-biochem'} p-5 sm:p-6 cursor-pointer flex flex-col justify-between group rounded-[24px] bg-white border border-slate-200/80 transition-all duration-300 hover:shadow-lg relative overflow-hidden`}
            >
              <div>
                {/* Header: Icon + Method Badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-[48px] h-[44px] rounded-[14px] border border-slate-200/90 bg-slate-50 text-[#102A43] flex items-center justify-center group-hover:bg-[#102A43] group-hover:text-white transition-colors duration-200 shadow-2xs">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  {service.methodBadge && (
                    <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-slate-200/80 bg-slate-100 text-slate-700 shadow-2xs">
                      <ShieldCheck className="w-3 h-3 text-[#155E9A]" /> {service.methodBadge}
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-base sm:text-lg text-[#0A1128] mb-1.5 group-hover:text-[#155E9A] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Clickable Biomarker Tags */}
                {service.biomarkers && service.biomarkers.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Key Biomarkers &amp; Tests:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.biomarkers.map((biomarker) => (
                        <button
                          key={biomarker}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToTests(biomarker);
                          }}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-[10px] bg-slate-50 border border-slate-200/90 text-slate-700 hover:bg-[#0A1128] hover:text-white hover:border-[#0A1128] transition-colors cursor-pointer shadow-2xs squircle-btn apple-pressable active:scale-[0.96]"
                        >
                          {biomarker}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Action Hint */}
              <div className="pt-3.5 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-[11px] text-slate-500 font-medium">
                  In-House Testing
                </span>
                <span className="flex items-center gap-1 text-[#155E9A] group-hover:text-[#0F4775] font-bold transition-transform group-hover:translate-x-0.5 text-xs">
                  View Tests <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </m.div>
          ))}
        </div>

        {/* The Star CTA of the Services Section */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            type="button"
            onClick={() => navigateToTests('')}
            className="action-button btn-specular-sapphire squircle-btn apple-pressable px-6 py-3.5 text-xs sm:text-sm font-bold active:scale-[0.96] shadow-md inline-flex items-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-cyan-200" />
            <span>Explore All 74 Individual Diagnostic Tests</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

