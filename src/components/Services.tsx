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
            Diagnostic services listed in the current catalog with home collection available 07:00 AM–07:00 PM.
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
                  <div className={`w-[48px] h-[44px] rounded-[14px] border flex items-center justify-center transition-colors duration-200 ${service.theme.iconBg}`}>
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  {service.methodBadge && (
                    <span className={`flex items-center gap-1 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border shadow-2xs ${service.theme.badge}`}>
                      <ShieldCheck className="w-3 h-3 text-[#0B6E66]" /> {service.methodBadge}
                    </span>
                  )}
                </div>
                
                {/* Content */}
                <h3 className="font-bold text-base sm:text-lg text-[#0A1128] mb-1.5 group-hover:text-[#0A6C82] transition-colors leading-snug">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {service.description}
                </p>

                {/* Clickable Biomarker Tags */}
                {service.biomarkers && service.biomarkers.length > 0 && (
                  <div className="mt-3.5 pt-3 border-t border-slate-100">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
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
                          className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-50 border border-slate-200/90 text-slate-700 hover:bg-[#0A1128] hover:text-white hover:border-[#0A1128] transition-colors cursor-pointer shadow-2xs"
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
                <span className="text-[11px] sm:text-xs text-slate-600 font-medium">
                  Verified Lab Menu
                </span>
                <span className="flex items-center gap-1 text-[#0A6C82] group-hover:text-[#0B6E66] font-bold transition-transform group-hover:translate-x-0.5 text-[11px] sm:text-xs">
                  View Department Tests <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}

