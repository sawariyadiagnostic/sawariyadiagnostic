import { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Microscope, ShieldCheck, Users, ClipboardCheck, Truck, Stethoscope, FlaskConical, UserRound, ChevronDown, ChevronUp } from 'lucide-react';
import { teamStructure, type TeamRole } from '@/data/team-structure';

const governanceIcons = [Stethoscope, ShieldCheck, ClipboardCheck, Microscope, Truck];
const operationsIcons = [FlaskConical, Microscope, UserRound, Users];

function RoleCard({ role, index }: { role: TeamRole; index: number }) {
  const Icon = role.tier === 'governance' ? governanceIcons[index % governanceIcons.length] : operationsIcons[index % operationsIcons.length];
  const isGovernance = role.tier === 'governance';
  
  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className={`peacock-test-card ${isGovernance ? 'spine-clia' : 'spine-biochem'} flex flex-col justify-between rounded-2xl bg-white border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs hover:shadow-md transition-all duration-200 relative overflow-hidden`}
    >
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2.5">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border ${
              isGovernance 
                ? 'border-cyan-200/80 bg-cyan-50 text-[#0A6C82]' 
                : 'border-teal-200/80 bg-teal-50 text-[#0B6E66]'
            }`}>
              <Icon className="h-4 w-4" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0A1128] leading-tight tracking-tight">
                {role.label}
              </h3>
              <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider ${
                isGovernance ? 'text-[#0A6C82]' : 'text-[#0B6E66]'
              }`}>
                {isGovernance ? 'Governance' : 'Operations'}
              </span>
            </div>
          </div>

          {role.publishState === 'owner-review' && (
            <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800">
              Role profile
            </span>
          )}
        </div>
        
        <p className="text-xs leading-relaxed text-slate-600 font-normal">
          {role.shortDescription}
        </p>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1">
        {role.responsibilities.map((item) => (
          <span
            key={item}
            className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/70"
          >
            {item}
          </span>
        ))}
      </div>
    </m.article>
  );
}

export function Team() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTier, setActiveTier] = useState<'all' | 'governance' | 'operations'>('all');

  const governance = teamStructure.filter((role) => role.tier === 'governance' && role.publishState === 'public');
  const operations = teamStructure.filter((role) => role.tier === 'operations' && role.publishState === 'public');

  const displayedRoles = activeTier === 'all'
    ? [...governance, ...operations]
    : activeTier === 'governance'
      ? governance
      : operations;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#team') {
      setIsExpanded(true);
    }
    const handleHash = () => {
      if (window.location.hash === '#team') {
        setIsExpanded(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <section id="team" aria-labelledby="team-heading" className="relative overflow-hidden bg-[#FBFBFD] py-6 sm:py-10 border-t border-slate-200/60">
      <div className="pointer-events-none absolute left-[-10%] top-[20%] h-[40vw] w-[40vw] bg-teal-600/5 blur-[80px]" />
      
      <div className="relative z-10 fluid-container">
        {/* Compact Header */}
        <header className="mx-auto mb-4 max-w-2xl space-y-2 text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1 shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-[#0B6E66]" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Laboratory Quality Structure</span>
          </div>
          
          <h2 id="team-heading" className="text-[clamp(1.35rem,1rem+1.8vw,2rem)] font-black leading-tight tracking-tight text-[#0A1128]">
            A Quality System Built Around Accountable Roles
          </h2>
          
          <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
            Clinical oversight, quality ownership, technical control, and coordinated collection working together across the diagnostic journey.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 squircle-btn apple-pressable px-4 py-2 rounded-[14px] text-xs font-bold bg-white border border-slate-200/90 text-[#0A1128] hover:border-slate-300 shadow-2xs hover:shadow-sm cursor-pointer active:scale-[0.96] transition-all"
            >
              <span>{isExpanded ? 'Hide Role Profiles' : `View Quality Roles & Structure (${governance.length + operations.length} Roles)`}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
            </button>
          </div>
        </header>

        {isExpanded && (
          <div className="pt-4 animate-fade-in">

        {/* Space-Saving Segmented Filter Tabs */}
        <div className="mx-auto mb-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTier('all')}
            className={`cursor-pointer squircle-btn apple-pressable rounded-[14px] px-3.5 py-1.5 text-xs font-bold transition-all active:scale-[0.96] ${
              activeTier === 'all'
                ? 'bg-[#0A1128] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_2px_8px_rgba(10,17,40,0.25)] border border-white/20'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 shadow-[inset_0_1px_0_0_#FFFFFF,0_1px_3px_rgba(0,0,0,0.03)]'
            }`}
          >
            All Roles ({governance.length + operations.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTier('governance')}
            className={`cursor-pointer squircle-btn apple-pressable rounded-[14px] px-3.5 py-1.5 text-xs font-bold transition-all active:scale-[0.96] ${
              activeTier === 'governance'
                ? 'bg-[#0F2537] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_2px_8px_rgba(15,37,55,0.25)] border border-white/20'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 shadow-[inset_0_1px_0_0_#FFFFFF,0_1px_3px_rgba(0,0,0,0.03)]'
            }`}
          >
            Clinical Governance ({governance.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTier('operations')}
            className={`cursor-pointer squircle-btn apple-pressable rounded-[14px] px-3.5 py-1.5 text-xs font-bold transition-all active:scale-[0.96] ${
              activeTier === 'operations'
                ? 'bg-[#00686B] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_2px_8px_rgba(0,104,107,0.25)] border border-white/20'
                : 'bg-white text-slate-600 border border-slate-200/80 hover:border-slate-300 shadow-[inset_0_1px_0_0_#FFFFFF,0_1px_3px_rgba(0,0,0,0.03)]'
            }`}
          >
            Operations &amp; Collection ({operations.length})
          </button>
        </div>

        {/* Compact Responsive Grid: takes minimal vertical space */}
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="popLayout">
            <m.div
              key={activeTier}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            >
              {displayedRoles.map((role, index) => (
                <RoleCard key={role.id} role={role} index={index} />
              ))}
            </m.div>
          </AnimatePresence>
        </div>
          </div>
        )}
      </div>
    </section>
  );
}

