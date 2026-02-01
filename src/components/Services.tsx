'use client';

import { motion } from 'framer-motion';
import { 
  Droplets, 
  Activity, 
  Heart, 
  Dna, 
  Pill, 
  Baby,
  Building2,
  Stethoscope,
  Home
} from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Droplets,
      title: 'Blood Tests & Pathology',
      description: 'Complete blood count, lipid profile, liver & kidney function tests, and more.',
      color: 'accent-teal',
      homeCollection: true,
    },
    {
      icon: Activity,
      title: 'Hormone & Thyroid Testing',
      description: 'Comprehensive hormone panels including thyroid, fertility, and metabolic hormones.',
      color: 'accent-blue',
      homeCollection: true,
    },
    {
      icon: Heart,
      title: 'Cardiac Health Screening',
      description: 'Heart health markers, lipid profiles, and cardiac risk assessment tests.',
      color: 'accent-purple',
      homeCollection: true,
    },
    {
      icon: Dna,
      title: 'Genetic Diagnostics',
      description: 'Advanced genetic testing for hereditary conditions and personalized medicine.',
      color: 'accent-emerald',
      homeCollection: false,
    },
    {
      icon: Pill,
      title: 'Diabetes Screening',
      description: 'HbA1c, fasting glucose, glucose tolerance tests for diabetes management.',
      color: 'accent-orange',
      homeCollection: true,
    },
    {
      icon: Baby,
      title: 'Allergy & Immunology',
      description: 'Food allergy panels, environmental allergens, and immune function tests.',
      color: 'accent-teal',
      homeCollection: true,
    },
    {
      icon: Building2,
      title: 'Corporate Wellness',
      description: 'Customized health checkup packages for organizations and employees.',
      color: 'accent-blue',
      homeCollection: true,
    },
    {
      icon: Stethoscope,
      title: 'Doctor Consultation',
      description: 'Expert consultation with our panel of specialist doctors for test interpretation.',
      color: 'accent-purple',
      homeCollection: false,
    },
  ];

  return (
    <section id="services" className="relative py-20 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-blue/10 px-4 py-2 rounded-full mb-6">
            <Activity className="w-4 h-4 text-accent-blue" />
            <span className="text-sm font-medium text-accent-blue">Our Services</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Comprehensive Diagnostic Services
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From routine checkups to specialized diagnostics, we offer a complete range of laboratory services
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative glass-card rounded-2xl p-6 gentle-animation hover:shadow-lg cursor-pointer"
            >
              {/* Home Collection Badge */}
              {service.homeCollection && (
                <div className="absolute -top-2 -right-2 flex items-center gap-1 bg-accent-emerald text-white text-xs font-medium px-2 py-1 rounded-full">
                  <Home className="w-3 h-3" />
                  <span>Home</span>
                </div>
              )}
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl bg-${service.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 gentle-animation`}>
                <service.icon className={`w-7 h-7 text-${service.color}`} />
              </div>
              
              {/* Content */}
              <h3 className="font-bold text-lg text-foreground mb-2 group-hover:text-accent-teal gentle-animation">
                {service.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
