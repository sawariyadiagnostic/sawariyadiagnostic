'use client';

import { motion } from 'framer-motion';
import { CalendarCheck, Home, Microscope, FileCheck, CheckCircle2, Award } from 'lucide-react';

export function About() {
  const journeySteps = [
    {
      icon: CalendarCheck,
      title: '1. Select Test',
      description: 'Book online or via WhatsApp with instant 24*7 slot confirmation.',
      theme: {
        bg: 'bg-white',
        iconBg: 'bg-blue-50 text-blue-800 border-blue-200/80',
        accentBar: 'bg-[#0A3663]',
      }
    },
    {
      icon: Home,
      title: '2. Home Sample',
      description: 'A trained, vaccinated phlebotomist collects your sample securely.',
      theme: {
        bg: 'bg-white',
        iconBg: 'bg-cyan-50 text-cyan-800 border-cyan-200/80',
        accentBar: 'bg-[#00A896]',
      }
    },
    {
      icon: Microscope,
      title: '3. NABL Processing',
      description: 'Automated 5-part analyzers ensure zero cross-contamination.',
      theme: {
        bg: 'bg-white',
        iconBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
        accentBar: 'bg-[#0A6E5C]',
      }
    },
    {
      icon: FileCheck,
      title: '4. Digital Delivery',
      description: 'Receive doctor-verified QR-coded report on WhatsApp in 6h.',
      theme: {
        bg: 'bg-white',
        iconBg: 'bg-amber-50 text-amber-800 border-amber-200/80',
        accentBar: 'bg-[#D97706]',
      }
    },
  ];

  const features = [
    'Fully Automated 5-Part Hematology Analyzers',
    'Certified MD Pathologists on Active Duty',
    'Barcode-Tracked Sterile Vacutainer Tubes',
    'Same-Day WhatsApp & Email Digital Delivery',
    'Free Doorstep Home Collection in Charkhi Dadri',
    '24*7 Open Lab & Direct Doctor Consultation',
  ];

  return (
    <section id="about" className="relative fluid-section bg-[#FBFBFD] overflow-hidden">
      
      {/* Liquid Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-teal-500/5 blur-[80px] animate-liquid mix-blend-multiply" />
        <div className="absolute top-[30%] right-[0%] w-[30vw] h-[30vw] bg-emerald-500/5 blur-[80px] animate-liquid mix-blend-multiply" style={{ animationDelay: '-12s' }} />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-white/80 px-3.5 py-1 rounded-full shadow-2xs">
            <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">How It Works</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Diagnostic Care, Simplified for You
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            From doorstep sample collection to certified digital reports in 4 seamless steps
          </p>
        </div>

        {/* Journey Timeline (Apple Bento Step Cards) */}
        <div className="fluid-grid-cards-sm mb-10 sm:mb-14">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`glass-card rounded-[24px] p-5 sm:p-6 border border-white/80 transition-all duration-300 relative group overflow-hidden ${step.theme.bg}`}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${step.theme.accentBar}`} />

              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-[16px] flex items-center justify-center mb-3.5 sm:mb-4 border shadow-sm ${step.theme.iconBg}`}>
                <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-bold text-sm sm:text-base text-[#1D1D1F] mb-1 leading-snug">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-normal">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Features & Quality Assurance Container in Apple Dark Mode Material */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-[#072448] text-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.2)] relative overflow-hidden border border-white/10"
        >
          {/* Liquid Liquid Glow inside Dark Container */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#00A896]/20 rounded-full blur-[100px] animate-liquid mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0A6E5C]/20 rounded-full blur-[100px] animate-liquid mix-blend-screen" style={{ animationDelay: '-7s' }} />
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
            {/* Left - Quality Commitment */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full backdrop-blur-md border border-white/15">
                <Award className="w-3.5 h-3.5 text-teal-300" />
                <span className="text-xs font-bold text-teal-100">Certified Quality Standards</span>
              </div>

              <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white leading-snug">
                Precision Testing & Complete Patient Trust
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                At Sawariya Diagnostic, our laboratory adheres strictly to National Accreditation Board for Testing and Calibration Laboratories (NABL) guidelines. Each sample undergoes multi-level internal quality controls before doctor validation.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3 pt-1">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 font-normal leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Quality Metric Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[24px] p-5 sm:p-7 space-y-4 text-center shadow-2xl">
                <div className="w-14 h-14 rounded-[18px] bg-gradient-to-br from-[#0A3663] to-[#0A6E5C] border border-teal-300/30 flex items-center justify-center mx-auto text-teal-300 shadow-md">
                  <Microscope className="w-7 h-7" />
                </div>
                
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-0.5">NABL Accredited Facility</h4>
                  <p className="text-[11px] sm:text-xs text-slate-300">Opposite R.S. Sangwan Hospital, Loharu Road</p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-emerald-400">10,000+</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-300">Samples Processed</p>
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-black text-amber-300">180+</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-300">Validated Profiles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
