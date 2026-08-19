'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ShieldCheck, Clock, CheckCircle2, Phone, User, Sparkles, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { homeCollection } from '@/data/website-content';

export function HomeCollection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking call / WhatsApp forwarding
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '', address: '' });
    }, 4000);
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'NABL & ICMR Protocols',
      description: 'Sterile, single-use vacuum tubes',
      cardStyle: 'bg-white/10 border-white/15 text-white',
      iconStyle: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    },
    {
      icon: CheckCircle2,
      title: 'Certified Phlebotomists',
      description: 'Painless, hygienic sample collection',
      cardStyle: 'bg-white/10 border-white/15 text-white',
      iconStyle: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    },
    {
      icon: Clock,
      title: '30-Min Arrival Window',
      description: 'On-time 24*7 home service at your door',
      cardStyle: 'bg-white/10 border-white/15 text-white',
      iconStyle: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    },
  ];

  const serviceAreas = homeCollection.features;

  return (
    <section id="home-collection" className="relative fluid-section bg-[#072448] text-white overflow-hidden border-y border-white/10">
      
      {/* Liquid Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[40vw] h-[40vw] bg-[#0A3663]/40 rounded-full blur-[100px] animate-liquid mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-[50vw] h-[50vw] bg-[#00A896]/30 rounded-full blur-[120px] animate-liquid mix-blend-screen" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-teal-500/10 rounded-full blur-[140px] animate-liquid mix-blend-screen" style={{ animationDelay: '-10s' }} />
      </div>
      
      <div className="fluid-container relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 shadow-[0_2px_12px_rgba(0,0,0,0.1)]">
              <Home className="w-3.5 h-3.5 text-teal-300" />
              <span className="text-xs font-bold text-teal-100">Free Doorstep Collection • Zero Extra Charges</span>
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
                Avoid crowded waiting rooms. Certified phlebotomists follow strict sterile protocols and vacuum sealed tube technology to guarantee sample integrity and same-day report accuracy.
              </p>
            </div>
            
            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {benefits.map((benefit) => (
                <div key={benefit.title} className={`glass-panel-dark rounded-[24px] p-4 space-y-1.5`}>
                  <div className={`w-9 h-9 rounded-[12px] flex items-center justify-center border ${benefit.iconStyle}`}>
                    <benefit.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-white leading-tight">{benefit.title}</h4>
                  <p className="text-[11px] text-slate-300 leading-normal font-normal">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            {/* Service Areas */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-teal-100 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Column - Booking Form (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="glass-card p-5 sm:p-7 rounded-[32px] sm:rounded-[36px] shadow-[0_32px_80px_rgba(0,0,0,0.4)] text-slate-900 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/90 backdrop-blur-3xl z-[-1]" />
              <div className="mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-black text-[#1D1D1F] tracking-tight">
                    Schedule Home Visit
                  </h3>
                  <span className="bg-emerald-50 text-emerald-800 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Same-Day Slots
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Serving all sectors and localities across Charkhi Dadri.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 mx-auto bg-emerald-50 rounded-[16px] flex items-center justify-center border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">Appointment Requested!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Our team is reviewing your request and will call you shortly to confirm sample collection timing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Patient Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10 h-11 sm:h-12 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#0A6E5C] text-slate-900"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Mobile Number (for WhatsApp report)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="tel"
                        placeholder="e.g. 99919 41207"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10 h-11 sm:h-12 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#0A6E5C] text-slate-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Pickup Address in Charkhi Dadri
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. Loharu Road / Model Town / Sector 8"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="h-11 sm:h-12 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#0A6E5C] px-3.5 text-slate-900"
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-13 text-sm sm:text-base font-bold btn-primary mt-2 shadow-md hover:shadow-lg active:scale-[0.98] rounded-[18px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin text-[#FDE047]" /> Scheduling Home Visit...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Confirm Home Sample Visit</span>
                        <Send className="w-4 h-4 ml-1" />
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-[11px] text-center text-slate-500 pt-1 font-medium">
                    Helpline: <a href="tel:+919991941207" className="text-[#0A6E5C] font-bold hover:underline">+91 99919 41207</a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
