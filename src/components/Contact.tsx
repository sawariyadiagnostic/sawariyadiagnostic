'use client';

import { useState, useEffect } from 'react';
import { Calendar, FileCheck, Home, Clock } from 'lucide-react';
import { Button } from './ui/button';
import Cal, { getCalApi } from "@calcom/embed-react";


export function Contact() {
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"sawariya-booking"});
      cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

  const infoCards = [
    {
      icon: FileCheck,
      title: 'Choose Your Tests',
      description: 'Select from our comprehensive test menu or health packages',
      color: 'accent-teal',
    },
    {
      icon: Home,
      title: 'Home or Lab Visit',
      description: 'Get sample collected at home or visit our nearest center',
      color: 'accent-blue',
    },
    {
      icon: Clock,
      title: 'Quick Reports',
      description: 'Receive accurate reports within 6-24 hours on WhatsApp',
      color: 'accent-emerald',
    },
  ];

  return (
    <section id="contact" className="relative py-20 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent-teal/10 px-4 py-2 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-accent-teal" />
            <span className="text-sm font-medium text-accent-teal">Book Appointment</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Schedule Your Test Today
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a convenient time slot and we'll handle the rest
          </p>
        </div>

        {/* Booking Widget */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="bg-background rounded-3xl overflow-hidden shadow-lg border border-border min-h-[400px]">
            {/* Widget Header */}
            <div className="bg-gradient-to-r from-accent-teal/10 to-accent-blue/10 px-8 py-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    Sawariya Diagnostic - Book Appointment
                  </h3>
                  <p className="text-muted-foreground">
                    30 minutes • Video or Phone Call • Free consultation
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <div className="w-3 h-3 bg-accent-emerald rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground font-medium">Available now</span>
                </div>
              </div>
            </div>
            
            {/* Cal.com Embed Container or Facade */}
            <div className="p-0 bg-white min-h-[500px] flex items-center justify-center">
              {!showCalendar ? (
                <div className="text-center p-8 space-y-6">
                   <div className="w-20 h-20 bg-accent-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Calendar className="w-10 h-10 text-accent-teal" />
                   </div>
                   <h4 className="text-2xl font-bold text-foreground">Ready to Schedule?</h4>
                   <p className="text-muted-foreground max-w-md mx-auto">
                     Click below to load the interactive booking calendar. 
                     Check available slots for Home Collection or Lab Visit.
                   </p>
                   <Button 
                     size="lg" 
                     className="bg-gradient-to-r from-accent-teal to-accent-emerald hover:from-accent-teal/90 hover:to-accent-emerald/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 px-8 py-6 text-lg rounded-full"
                     onClick={() => setShowCalendar(true)}
                   >
                     View Available Slots
                   </Button>
                </div>
              ) : (
                <div 
                  style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '600px',
                    overflow: 'scroll'
                  }} 
                >
                  <Cal 
                    namespace="sawariya-booking"
                    calLink="sawariya-lab/30min"
                    style={{width:"100%",height:"100%",overflow:"scroll"}}
                    config={{layout: 'month_view'}}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {infoCards.map((card) => (
            <div 
              key={card.title}
              className="bg-background rounded-2xl p-6 border border-border shadow-sm text-center"
            >
              <div className={`w-14 h-14 mx-auto mb-4 rounded-2xl bg-${card.color}/10 flex items-center justify-center`}>
                <card.icon className={`w-7 h-7 text-${card.color}`} />
              </div>
              <h4 className="font-bold text-foreground mb-2">{card.title}</h4>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
