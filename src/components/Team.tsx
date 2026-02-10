'use client';

import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

export function Team() {
  const teamMembers = [
    {
      name: 'Dr. Radhika Vashisth',
      role: 'Chief Pathologist',
      qualification: 'MBBS, MD (Pathology)',
      bio: 'Over 20 years of experience in clinical pathology and laboratory medicine.',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&auto=format',
    },
     {
      name: 'Dr. Ankit Sangwan',
      role: 'Microbiologist',
      qualification: 'MSc, PhD (Microbiology)',
      bio: 'Expert in infectious disease diagnostics and antimicrobial testing.',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&h=300&fit=crop&auto=format',
    },
    {
      name: 'Ms. Manisha Saini',
      role: 'Senior Medical Biochemist',
      qualification: 'MSc(Medical Biotechnology)',
      bio: 'Specialist in hormone analysis and metabolic disorders testing.',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&auto=format',
    },
  ];

  return (
    <section id="team" className="relative py-20 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-accent-purple/10 px-4 py-2 rounded-full mb-6">
            <Users className="w-4 h-4 text-accent-purple" />
            <span className="text-sm font-medium text-accent-purple">Our Experts</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet Our Medical Team
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals dedicated to accurate diagnostics and patient care
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-3 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              {/* Photo */}
              <div className="relative mb-4 mx-auto">
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden ring-4 ring-secondary group-hover:ring-accent-teal gentle-animation">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Info */}
              <h3 className="font-bold text-lg text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-accent-teal font-medium text-sm mb-1">
                {member.role}
              </p>
              <p className="text-xs text-muted-foreground mb-3 bg-secondary/50 inline-block px-3 py-1 rounded-full">
                {member.qualification}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
