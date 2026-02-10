'use client';

import { useEffect } from 'react';
import { Calendar, FileCheck, Home, Clock } from 'lucide-react';

export function Contact() {
  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { 
        let p = function (a, ar) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window, "https://app.cal.com/embed/embed.js", "init");
      
      Cal("init", "sawariya-booking", {origin:"https://app.cal.com"});
      
      Cal.ns["sawariya-booking"]("inline", {
        elementOrSelector:"#sawariya-booking-embed",
        config: {"layout":"month_view"},
        calLink: "sawariya-lab/30min",
      });
      
      Cal.ns["sawariya-booking"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    `;
    
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
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
          <div className="bg-background rounded-3xl overflow-hidden shadow-lg border border-border">
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
            
            {/* Cal.com Embed Container */}
            <div className="p-0 bg-white">
              <div 
                style={{
                  width: '100%',
                  height: '600px',
                  overflow: 'scroll'
                }} 
                id="sawariya-booking-embed"
              />
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
