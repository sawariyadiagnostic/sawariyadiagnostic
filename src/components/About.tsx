'use client';

import { motion } from 'framer-motion';
import { CalendarCheck, Home, Microscope, FileCheck, ArrowRight } from 'lucide-react';

export function About() {
  const journeySteps = [
    {
      icon: CalendarCheck,
      title: 'Book Online',
      description: 'Schedule your test online or call us anytime',
      color: 'accent-teal',
    },
    {
      icon: Home,
      title: 'Sample Collection',
      description: 'Our trained phlebotomist visits your home',
      color: 'accent-blue',
    },
    {
      icon: Microscope,
      title: 'Lab Analysis',
      description: 'Samples processed in our NABL certified lab',
      color: 'accent-emerald',
    },
    {
      icon: FileCheck,
      title: 'Get Reports',
      description: 'Receive results on WhatsApp & Email',
      color: 'accent-purple',
    },
  ];

  const features = [
    'State-of-the-art equipment',
    'Experienced pathologists',
    'Quick turnaround time',
    'Affordable pricing',
    'Home sample collection',
    'Digital reports',
  ];

  return (
    <section id="about" className="relative py-20 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-emerald/10 px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium text-accent-emerald">Why Choose Us</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Your Path to Better Health
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Simple, convenient, and reliable diagnostic services right at your doorstep
          </p>
        </div>

        {/* Journey Timeline */}
        <div className="relative max-w-5xl mx-auto mb-20">
          {/* Connection Line - Desktop */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-border" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className="relative z-10 mx-auto mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-2xl bg-${step.color}/10 flex items-center justify-center relative`}>
                    <step.icon className={`w-8 h-8 text-${step.color}`} />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                </div>
                
                {/* Arrow - Mobile/Tablet */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden sm:block lg:hidden absolute top-8 -right-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
                
                <h3 className="font-bold text-lg text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-accent-teal/5 to-accent-blue/5 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Committed to Excellence in Diagnostics
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                At Sawariya Diagnostic, we combine cutting-edge technology with 
                compassionate care to deliver accurate results you can trust. 
                Our team of experienced professionals ensures every test is 
                performed with precision and care.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-teal rounded-full" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right - Visual */}
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto bg-white rounded-3xl shadow-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-accent-teal/10 rounded-full flex items-center justify-center">
                    <Microscope className="w-12 h-12 text-accent-teal" />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">NABL Certified</h4>
                  <p className="text-sm text-muted-foreground">
                    Quality assurance at every step
                  </p>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
                    <div>
                      <p className="text-2xl font-bold text-accent-teal">99.9%</p>
                      <p className="text-xs text-muted-foreground">Accuracy Rate</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-accent-emerald">24/7</p>
                      <p className="text-xs text-muted-foreground">Support</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-md px-4 py-2 float-gentle">
                <p className="text-sm font-semibold text-foreground">ISO Certified</p>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-md px-4 py-2 float-gentle" style={{ animationDelay: '1s' }}>
                <p className="text-sm font-semibold text-foreground">10+ Years</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
