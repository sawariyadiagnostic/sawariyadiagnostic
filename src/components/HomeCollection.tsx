'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Shield, Clock, CheckCircle, Phone, User } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function HomeCollection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 3000);
  };

  const benefits = [
    {
      icon: Shield,
      title: 'NABL Accredited Labs',
      description: 'Quality assurance you can trust',
    },
    {
      icon: CheckCircle,
      title: 'Vaccinated Phlebotomists',
      description: 'Safe and trained professionals',
    },
    {
      icon: Clock,
      title: 'On-Time Guarantee',
      description: 'We respect your schedule',
    },
  ];

  const serviceAreas = [
    'All major localities covered',
    'Same day collection available',
    'Flexible timing slots',
    'No extra charges',
  ];

  return (
    <section id="home-collection" className="relative py-20 bg-gradient-to-br from-accent-teal to-[hsl(174,75%,25%)] text-white overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">Home Sample Collection</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Get Tested at
              <br />
              <span className="text-white/90">Your Doorstep</span>
            </h2>
            
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Skip the waiting room. Our trained phlebotomists come to your home, 
              office, or any convenient location for safe and hygienic sample collection.
            </p>
            
            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <benefit.icon className="w-8 h-8 mb-3 text-white/90" />
                  <h4 className="font-semibold text-sm mb-1">{benefit.title}</h4>
                  <p className="text-xs text-white/70">{benefit.description}</p>
                </div>
              ))}
            </div>
            
            {/* Service Areas */}
            <div className="flex flex-wrap gap-3">
              {serviceAreas.map((area) => (
                <div key={area} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/80" />
                  <span className="text-sm text-white/80">{area}</span>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Request a Callback
              </h3>
              <p className="text-muted-foreground mb-6">
                Leave your details and we'll call you within 30 minutes
              </p>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent-emerald/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-accent-emerald" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Thank You!</h4>
                  <p className="text-muted-foreground">
                    We'll call you within 30 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Your Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-12 h-12 rounded-xl border-2 text-foreground"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-12 h-12 rounded-xl border-2 text-foreground"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 text-base font-semibold btn-primary"
                  >
                    {isSubmitting ? 'Submitting...' : 'Call Me Back'}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    By submitting, you agree to our{' '}
                    <a href="#" className="text-accent-teal hover:underline">Terms & Conditions</a>
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
