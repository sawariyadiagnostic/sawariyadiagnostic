'use client';

import { motion } from 'framer-motion';
import { Shield, Users, Clock, Award, CheckCircle, Microscope } from 'lucide-react';

export function TrustIndicators() {
  const stats = [
    {
      icon: Users,
      value: '50,000+',
      label: 'Happy Patients',
      color: 'accent-teal',
    },
    {
      icon: Microscope,
      value: '100+',
      label: 'Tests Available',
      color: 'accent-blue',
    },
    {
      icon: Clock,
      value: '6 Hours',
      label: 'Avg. Report Time',
      color: 'accent-emerald',
    },
    {
      icon: Award,
      value: '10+',
      label: 'Years Experience',
      color: 'accent-purple',
    },
  ];

  const certifications = [
    { name: 'NABL Accredited', verified: true },
    { name: 'ISO 9001:2015', verified: true },
    { name: 'CAP Certified', verified: true },
    { name: 'ICMR Approved', verified: true },
  ];

  return (
    <section id="trust" className="relative py-16 bg-gradient-to-br from-accent-teal/5 to-accent-blue/5">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Stats Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-3 rounded-2xl bg-${stat.color}/10 flex items-center justify-center`}>
                <stat.icon className={`w-7 h-7 text-${stat.color}`} />
              </div>
              <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-accent-teal" />
              <div>
                <h3 className="font-bold text-foreground">Certified & Accredited</h3>
                <p className="text-sm text-muted-foreground">Quality you can trust</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-2 bg-secondary/50 hover:bg-secondary px-4 py-2 rounded-full gentle-animation cursor-default"
                >
                  <CheckCircle className="w-4 h-4 text-accent-emerald" />
                  <span className="text-sm font-medium text-foreground">{cert.name}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
