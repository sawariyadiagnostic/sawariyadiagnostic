import { m } from 'framer-motion';
import { Microscope, ShieldCheck, Users, ClipboardCheck, Truck, Stethoscope, FlaskConical, UserRound } from 'lucide-react';
import { teamStructure, type TeamRole } from '@/data/team-structure';

const governanceIcons = [Stethoscope, ShieldCheck, ClipboardCheck, Microscope, Truck];
const operationsIcons = [FlaskConical, Microscope, UserRound, Users];

function RoleCard({ role, index }: { role: TeamRole; index: number }) {
  const Icon = role.tier === 'governance' ? governanceIcons[index % governanceIcons.length] : operationsIcons[index % operationsIcons.length];
  const isGovernance = role.tier === 'governance';
  
  return (
    <m.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      viewport={{ once: true, margin: '-40px' }}
      className={`relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-4.5 transition-all duration-200 hover:shadow-md ${
        isGovernance 
          ? 'border-slate-800 bg-[#0A1128] text-white shadow-xs' 
          : 'border-slate-200/90 bg-white text-[#0A1128] shadow-xs'
      }`}
    >
      <div>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
            isGovernance 
              ? 'border-white/15 bg-white/10 text-cyan-300' 
              : 'border-teal-200/80 bg-teal-50 text-[#0B6E66]'
          }`}>
            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
          </div>
          {role.publishState === 'owner-review' && (
            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
              isGovernance ? 'bg-white/10 text-amber-300' : 'bg-amber-50 text-amber-800'
            }`}>
              Role profile
            </span>
          )}
        </div>
        
        <h3 className={`text-sm sm:text-base font-bold leading-snug tracking-tight ${isGovernance ? 'text-white' : 'text-[#0A1128]'}`}>
          {role.label}
        </h3>
        
        <p className={`mt-1 text-xs leading-relaxed font-normal ${isGovernance ? 'text-slate-300' : 'text-slate-600'}`}>
          {role.shortDescription}
        </p>
      </div>

      <ul className={`mt-3 space-y-1 border-t pt-2.5 text-[11px] leading-snug font-normal ${
        isGovernance ? 'border-white/10 text-slate-200' : 'border-slate-100 text-slate-600'
      }`}>
        {role.responsibilities.map((item) => (
          <li key={item} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isGovernance ? 'bg-[#38BDF8]' : 'bg-[#0B6E66]'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </m.article>
  );
}

export function Team() {
  const governance = teamStructure.filter((role) => role.tier === 'governance' && role.publishState === 'public');
  const operations = teamStructure.filter((role) => role.tier === 'operations' && role.publishState === 'public');

  return (
    <section id="team" aria-labelledby="team-heading" className="relative overflow-hidden bg-[#FBFBFD] py-8 sm:py-12">
      <div className="pointer-events-none absolute left-[-10%] top-[20%] h-[40vw] w-[40vw] bg-teal-600/5 blur-[80px]" />
      
      <div className="relative z-10 fluid-container">
        {/* Compact Header */}
        <header className="mx-auto mb-6 max-w-2xl space-y-2 text-center sm:mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1 shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0B6E66]" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Laboratory Quality Structure</span>
          </div>
          
          <h2 id="team-heading" className="text-[clamp(1.5rem,1.1rem+2vw,2.25rem)] font-black leading-tight tracking-tight text-[#0A1128]">
            A Quality System Built Around Accountable Roles
          </h2>
          
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
            Clinical oversight, quality ownership, technical control, and coordinated collection working together across the diagnostic journey.
          </p>
        </header>

        <div className="mx-auto max-w-6xl">
          {/* Section Divider: Governance */}
          <div className="mb-3.5 flex items-center gap-3">
            <span className="h-px flex-1 bg-slate-200" />
            <h3 className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0A1128]">
              Clinical &amp; Laboratory Governance
            </h3>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          {/* 5-Column Governance Grid */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {governance.map((role, index) => (
              <RoleCard key={role.id} role={role} index={index} />
            ))}
          </div>

          {/* Core Operations Container */}
          <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-xs sm:mt-7 sm:p-5">
            <div className="mb-3.5 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B6E66]">Core operations team</p>
                <h3 className="text-base sm:text-lg font-bold tracking-tight text-[#0A1128]">
                  The professionals behind every controlled handoff
                </h3>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-slate-500">
                Coordinated workflow from patient identification and collection through technical workflow and report delivery.
              </p>
            </div>
            
            {/* 4-Column Operations Grid */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {operations.map((role, index) => (
                <RoleCard key={role.id} role={role} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

