'use client';

import { motion } from 'framer-motion';
import { Stethoscope, ShieldCheck } from 'lucide-react';
import { team } from '@/data/website-content';

export function Team() {
  const teamMembers = team.members;

  return (
    <section id="team" className="relative fluid-section bg-[#FBFBFD] overflow-hidden">
      
      {/* Liquid Mesh Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-blue-300/10 blur-[80px] animate-liquid mix-blend-multiply" />
      </div>

      <div className="fluid-container relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-md border border-[#0A6E5C]/20 px-3.5 py-1 rounded-full shadow-2xs">
            <Stethoscope className="w-3.5 h-3.5 text-[#0A6E5C]" />
            <span className="text-[11px] font-bold text-[#0A6E5C] uppercase tracking-wider">Clinical Leadership</span>
          </div>
          
          <h2 className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black text-[#1D1D1F] tracking-tight leading-tight">
            Led by Experienced Medical Specialists
          </h2>
          
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Every test report is evaluated, validated, and signed by qualified pathologists and diagnostic consultants
          </p>
        </div>

        {/* Team Grid */}
        <div className="fluid-grid-cards-md max-w-5xl mx-auto">
          {teamMembers.map((member, index) => {
            const memberThemes = [
              {
                ring: 'ring-blue-100 group-hover:ring-blue-300',
                roleColor: 'text-[#0A3663]',
                avatarBg: '0A3663',
                avatarText: '93C5FD',
                qualTag: 'bg-blue-50 text-blue-900 border-blue-200/80',
                accentBar: 'bg-[#0A3663]',
              },
              {
                ring: 'ring-emerald-100 group-hover:ring-emerald-300',
                roleColor: 'text-[#0A6E5C]',
                avatarBg: '0A6E5C',
                avatarText: 'A7F3D0',
                qualTag: 'bg-emerald-50 text-emerald-900 border-emerald-200/80',
                accentBar: 'bg-[#0A6E5C]',
              },
              {
                ring: 'ring-purple-100 group-hover:ring-purple-300',
                roleColor: 'text-[#581C87]',
                avatarBg: '581C87',
                avatarText: 'E9D5FF',
                qualTag: 'bg-purple-50 text-purple-900 border-purple-200/80',
                accentBar: 'bg-[#581C87]',
              },
            ];
            const theme = memberThemes[index % memberThemes.length];

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center group flex flex-col justify-between bg-white/70 rounded-[26px] border border-white/80 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accentBar}`} />

                <div>
                  {/* Avatar */}
                  <div className="relative mb-4 mx-auto">
                    <div className={`w-24 h-24 mx-auto rounded-full overflow-hidden ring-4 ${theme.ring} transition-all flex items-center justify-center shadow-md`}>
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=${theme.avatarBg}&color=${theme.avatarText}&size=200&bold=true`}
                        alt={`Portrait of ${member.name}, ${member.role} at Sawariya Diagnostic Lab`}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                  
                  {/* Info */}
                  <h3 className="font-bold text-lg text-[#1D1D1F] mb-0.5 leading-snug">
                    {member.name}
                  </h3>
                  <p className={`font-bold text-xs sm:text-sm mb-2 ${theme.roleColor}`}>
                    {member.role}
                  </p>
                  <div className="mb-3">
                    <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full inline-block border ${theme.qualTag}`}>
                      {member.qualification}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs text-slate-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>NABL Quality Sign-off</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
