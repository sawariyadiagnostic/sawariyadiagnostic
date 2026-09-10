'use client';

import { useState } from 'react';
import { siteConfig, telHref } from '@/config/site';
import { motion } from 'framer-motion';
import { Home, ShieldCheck, Clock, CheckCircle2, Phone, User, Sparkles, Send, MapPin, MessageCircle } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { homeCollection } from '@/data/website-content';
import { FormsService } from '@/lib/forms';
import { toast } from 'sonner';

export function HomeCollection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    testRequired: 'Full Body / Routine Blood Test'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.name.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await FormsService.submitForm({
        name: formData.name,
        phone: formData.phone,
        address: formData.address || 'Charkhi Dadri',
        serviceType: formData.testRequired,
        message: 'Home Sample Collection Request'
      }, import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

      if (!result.success) {
        const handoff = FormsService.dispatchToWhatsApp({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          serviceType: formData.testRequired
        });
        toast.info(handoff ? 'WhatsApp opened. Send the prepared request to finish booking.' : result.message);
        return;
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Home collection error', err);
      toast.error('Failed to submit appointment request');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: 'Documented Collection Protocols',
      description: 'Sterile, single-use vacuum tubes',
      iconStyle: 'bg-green-600/20 text-green-400 border-green-600/40',
    },
    {
      icon: CheckCircle2,
      title: 'Certified Phlebotomists',
      description: 'Painless, hygienic sample collection',
      iconStyle: 'bg-blue-500/20 text-cyan-400 border-cyan-500/40',
    },
    {
      icon: Clock,
      title: '30-Min Arrival Window',
      description: 'Collection timing is confirmed during booking',
      iconStyle: 'bg-[#7A4B2A]/15 text-[#F1C27D] border-[#7A4B2A]/30',
    },
  ];

  const serviceAreas = homeCollection.features;

  return (
    <section id="home-collection" className="relative fluid-section bg-[#102A43] text-white overflow-hidden border-y border-white/10">
      
      {/* Liquid Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-[40vw] h-[40vw] bg-[#102A43]/40 rounded-full blur-[100px]  mix-blend-screen" />
        <div className="absolute bottom-10 right-10 w-[50vw] h-[50vw] bg-[#C62828]/30 rounded-full blur-[120px]  mix-blend-screen" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#155E9A]/10 rounded-full blur-[140px]  mix-blend-screen" style={{ animationDelay: '-10s' }} />
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
              <Home className="w-3.5 h-3.5 text-blue-200" />
              <span className="text-xs font-bold text-blue-100">Free Doorstep Collection • Zero Extra Charges</span>
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
                Request a convenient home visit. Collection staff follow the lab's documented hygiene and sample-handling procedures; report timing depends on the test.
              </p>
            </div>
            
            {/* Benefits Grid */}
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
            
            {/* Service Areas */}
            <div className="pt-2 border-t border-white/10 flex flex-wrap gap-2">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-xs text-blue-100 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
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
            <div className="glass-card p-5 sm:p-7 rounded-[32px] sm:rounded-[36px] shadow-[0_32px_80px_rgba(0,0,0,0.4)] text-slate-900 relative overflow-hidden bg-white">
              <div className="mb-4 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-black text-[#1D1D1F] tracking-tight">
                    Schedule Home Visit
                  </h3>
                  <span className="bg-green-50 text-green-800 text-[10.5px] font-bold px-2.5 py-0.5 rounded-full border border-green-200">
                    Same-Day Slots
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-normal">
                  Serving all sectors and localities across Charkhi Dadri.
                </p>
              </div>
              
              {isSubmitted ? (
                <div className="text-center py-6 space-y-3">
                  <div className="w-14 h-14 mx-auto bg-green-50 rounded-[20px] flex items-center justify-center border border-green-200 shadow-sm">
                    <CheckCircle2 className="w-7 h-7 text-green-700" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">Appointment Confirmed!</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    Your request was sent to the lab team. We will contact you using the details provided.
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', phone: '', address: '', testRequired: 'Routine Blood Test' });
                    }}
                    variant="outline"
                    className="rounded-full text-xs font-bold"
                  >
                    Book Another Appointment
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
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
                        className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] text-slate-900"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Mobile Number (10 Digits for WhatsApp Report)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="tel"
                        maxLength={10}
                        placeholder="e.g. your mobile number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                        className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-mono font-medium focus:border-[#155E9A] text-slate-900"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Required Test / Health Package
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g. CBC, Lipid Profile, Thyroid, or Full Body"
                      value={formData.testRequired}
                      onChange={(e) => setFormData({ ...formData, testRequired: e.target.value })}
                      className="h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] px-3.5 text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 mb-1 block">
                      Pickup Address in Charkhi Dadri
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="text"
                        placeholder="e.g. Loharu Road / Model Town / Sector 8"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="pl-10 h-11 rounded-[16px] border border-slate-200 bg-slate-50 text-sm font-medium focus:border-[#155E9A] text-slate-900"
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="action-button w-full min-h-12 h-auto text-sm font-bold btn-primary mt-2 shadow-md hover:shadow-lg active:scale-[0.98] rounded-[18px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin text-[#F1C27D]" /> Registering Home Visit...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <span>Confirm Home Sample Visit</span>
                        <Send className="w-4 h-4 ml-1" />
                      </span>
                    )}
                  </Button>
                  
                  <p className="text-[11px] text-center text-slate-500 pt-0.5 font-medium">
                    Lab contact: <a href={telHref(siteConfig.contact.phone)} className="text-[#155E9A] font-bold hover:underline">{siteConfig.contact.phone}</a>
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
