import { motion } from 'framer-motion';
import { Microscope, ShieldCheck, Users, ClipboardCheck, Truck, Stethoscope, FlaskConical, UserRound } from 'lucide-react';
import { teamStructure, type TeamRole } from '@/data/team-structure';

const governanceIcons = [Stethoscope, ShieldCheck, ClipboardCheck, Microscope, Truck];
const operationsIcons = [FlaskConical, Microscope, UserRound, Users];

function RoleCard({ role, index }: { role: TeamRole; index: number }) {
  const Icon = role.tier === 'governance' ? governanceIcons[index % governanceIcons.length] : operationsIcons[index % operationsIcons.length];
  const isGovernance = role.tier === 'governance';
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-40px' }}
      className={`relative flex h-full flex-col overflow-hidden rounded-[22px] border p-5 shadow-[0_8px_28px_rgba(16,42,67,0.06)] ${isGovernance ? 'border-[#102A43]/10 bg-[#102A43] text-[#F5F5F7]' : 'border-[#D7C7B8]/70 bg-white/90 text-[#1D1D1F]'}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${isGovernance ? 'bg-[#C62828]' : 'bg-[#155E9A]'}`} />
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border ${isGovernance ? 'border-white/15 bg-white/10 text-[#B9D9FF]' : 'border-[#155E9A]/15 bg-[#E8F1F8] text-[#0F4775]'}`}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {role.publishState === 'owner-review' && <span className={`rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${isGovernance ? 'bg-white/10 text-[#E8C8AE]' : 'bg-[#FFF9F3] text-[#7A4B2A]'}`}>Role profile</span>}
      </div>
      <h3 className="text-base font-bold leading-tight">{role.label}</h3>
       <p className={`mt-2 text-xs leading-relaxed ${isGovernance ? 'text-white' : 'text-slate-600'}`}>{role.shortDescription}</p>
       <ul className={`mt-4 space-y-2 border-t pt-4 text-[11px] leading-relaxed ${isGovernance ? 'border-white/15 text-white' : 'border-slate-100 text-slate-600'}`}>
        {role.responsibilities.map((item) => <li key={item} className="flex gap-2"><span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${isGovernance ? 'bg-[#E54848]' : 'bg-[#155E9A]'}`} />{item}</li>)}
      </ul>
    </motion.article>
  );
}

export function Team() {
  const governance = teamStructure.filter((role) => role.tier === 'governance' && role.publishState === 'public');
  const operations = teamStructure.filter((role) => role.tier === 'operations' && role.publishState === 'public');
  return (
    <section id="team" aria-labelledby="team-heading" className="relative overflow-hidden bg-[#FBFBFD] fluid-section">
      <div className="pointer-events-none absolute left-[-10%] top-[20%] h-[40vw] w-[40vw] bg-[#155E9A]/5 blur-[80px]" />
      <div className="relative z-10 fluid-container">
        <header className="mx-auto mb-9 max-w-3xl space-y-3 text-center sm:mb-12">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#155E9A]/20 bg-white/70 px-3.5 py-1 shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#155E9A]" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#155E9A]">Laboratory Team &amp; Quality Structure</span>
          </div>
          <h2 id="team-heading" className="text-[clamp(1.75rem,1.2rem+2.5vw,2.75rem)] font-black leading-tight tracking-tight text-[#1D1D1F]">A quality system built around accountable roles.</h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">Clinical oversight, quality ownership, technical control, and coordinated collection—working together across the diagnostic journey.</p>
        </header>

        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-3"><span className="h-px flex-1 bg-[#D7C7B8]" /><h3 className="shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-[#102A43]">Clinical &amp; Laboratory Governance</h3><span className="h-px flex-1 bg-[#D7C7B8]" /></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{governance.map((role, index) => <RoleCard key={role.id} role={role} index={index} />)}</div>

          <div className="mt-10 rounded-[26px] border border-[#D7C7B8]/70 bg-white/90 p-5 shadow-[0_8px_28px_rgba(16,42,67,0.05)] sm:mt-12 sm:p-7">
            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#155E9A]">Core operations team</p><h3 className="mt-1 text-xl font-bold tracking-tight text-[#1D1D1F]">The people behind every controlled handoff.</h3></div><p className="max-w-md text-xs leading-relaxed text-slate-500">Defined roles support the journey from patient identification and collection through technical workflow and report delivery.</p></div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{operations.map((role, index) => <RoleCard key={role.id} role={role} index={index} />)}</div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-[#102A43]/10 bg-[#102A43] px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-[#F5F5F7] sm:gap-5"><span>Clinical oversight</span><span className="text-[#E54848]">·</span><span>Quality ownership</span><span className="text-[#E54848]">·</span><span>Technical control</span><span className="text-[#E54848]">·</span><span>Coordinated collection</span></div>
        </div>
      </div>
    </section>
  );
}
