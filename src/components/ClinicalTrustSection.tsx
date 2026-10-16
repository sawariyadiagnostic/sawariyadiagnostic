import React, { useState } from 'react';
import { ShieldCheck, Clock, Activity, Home } from 'lucide-react';

export interface SymptomCategory {
  id: string;
  label: string;
  sublabel: string;
  queryKeyword: string;
}

const SYMPTOM_FILTERS: SymptomCategory[] = [
  { id: 'all', label: 'All Diagnostic Tests', sublabel: 'Complete Catalog', queryKeyword: '' },
  { id: 'full-body', label: 'Full Body Checkup', sublabel: '84+ Parameters', queryKeyword: 'Full Body' },
  { id: 'thyroid', label: 'Thyroid & Weight', sublabel: 'FT3, FT4, TSH', queryKeyword: 'Thyroid' },
  { id: 'diabetes', label: 'Diabetes (Sugar)', sublabel: 'HbA1c & Fasting', queryKeyword: 'HbA1c' },
  { id: 'fever', label: 'Fever & Weakness', sublabel: 'CBC, Dengue, Typhoid', queryKeyword: 'Fever' },
  { id: 'vitamins', label: 'Hair Fall & Bone', sublabel: 'Vitamin D, B12, Iron', queryKeyword: 'Vitamin' },
  { id: 'heart-liver', label: 'Heart, Liver & Kidney', sublabel: 'Lipid, LFT, KFT', queryKeyword: 'Profile' },
];

interface Props {
  activeFilter?: string;
  onSelectFilter?: (keyword: string, id: string) => void;
}

export const SymptomFilterBar: React.FC<Props> = ({ activeFilter: propActiveFilter, onSelectFilter }) => {
  const [internalFilter, setInternalFilter] = useState('all');
  const currentFilter = propActiveFilter !== undefined ? propActiveFilter : internalFilter;

  const handleFilterClick = (keyword: string, id: string) => {
    setInternalFilter(id);
    if (onSelectFilter) {
      onSelectFilter(keyword, id);
    } else {
      window.dispatchEvent(new CustomEvent('sawariya:search', { detail: { query: keyword } }));
      const catalogEl = document.getElementById('tests');
      if (catalogEl) {
        catalogEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div id="symptom-filters" className="mx-auto max-w-6xl px-4 pt-6 pb-2">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00686B] animate-pulse" />
            Filter by Health Goal or Symptom
          </h2>
          <span className="text-[11px] font-medium text-slate-500 hidden sm:inline">
            Click to filter tests instantly
          </span>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
          {SYMPTOM_FILTERS.map((chip) => {
            const isActive = currentFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleFilterClick(chip.queryKeyword, chip.id)}
                className={`flex flex-col items-start shrink-0 rounded-xl px-3.5 py-2 text-left transition-all cursor-pointer ${
                  isActive
                    ? 'peacock-pill-active shadow-sm scale-[1.02]'
                    : 'peacock-pill-inactive hover:border-[#0A6C82]'
                }`}
              >
                <span className="text-xs font-bold">{chip.label}</span>
                <span className={`text-[11px] ${isActive ? 'text-cyan-100' : 'text-slate-500'}`}>
                  {chip.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ClinicalTrustSection: React.FC<Props & { showFilters?: boolean }> = ({ showFilters = false, activeFilter, onSelectFilter }) => {
  return (
    <section id="about" aria-label="In-House Diagnostic Processing Advantage" className="relative mx-auto max-w-6xl px-4 py-4 sm:py-6">
      <div id="trust" className="sr-only" />

      {/* 4-Pillar Central In-House Advantage Strip */}
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="peacock-test-card spine-biochem flex items-start gap-3.5 rounded-2xl p-4 sm:p-5 shadow-xs bg-white border border-slate-200/80">
          <div className="rounded-xl bg-teal-50 p-2.5 text-[#0B6E66] border border-teal-100 flex-shrink-0">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Processed In-House</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Zero out-of-town transit degradation. Analyzed directly at our Loharu Road hub.
            </p>
          </div>
        </div>

        <div className="peacock-test-card spine-clia flex items-start gap-3.5 rounded-2xl p-4 sm:p-5 shadow-xs bg-white border border-slate-200/80">
          <div className="rounded-xl bg-cyan-50 p-2.5 text-[#0A6C82] border border-cyan-100 flex-shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">CLIA &amp; 5-Part Hematology</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Chemiluminescence hormone immunoassays, biochemistry &amp; hematology with daily quality assurance.
            </p>
          </div>
        </div>

        <div className="peacock-test-card spine-metabolic flex items-start gap-3.5 rounded-2xl p-4 sm:p-5 shadow-xs bg-white border border-slate-200/80">
          <div className="rounded-xl bg-amber-50 p-2.5 text-[#B4690E] border border-amber-100 flex-shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Same-Day Digital Reports</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Routine &amp; hormone reports delivered directly to your WhatsApp within hours.
            </p>
          </div>
        </div>

        <div className="peacock-test-card spine-hematology flex items-start gap-3.5 rounded-2xl p-4 sm:p-5 shadow-xs bg-white border border-slate-200/80">
          <div className="rounded-xl bg-rose-50 p-2.5 text-[#C81E1E] border border-rose-100 flex-shrink-0">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Doorstep Blood Collection</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Safe vacutainer collection at your doorstep across Charkhi Dadri (07:00 AM–07:00 PM). Lab is open 24*7 for walk-in patients and emergency from hospitals.
            </p>
          </div>
        </div>
      </div>

      {/* Compact Operational Badges */}
      <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] sm:text-xs">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50/80 border border-teal-200/70 text-[#074F49] font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0B6E66]" /> Barcoded sample identification
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/80 border border-blue-200/70 text-[#0F2537] font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#0A6C82]" /> Processed in-house at Loharu Road
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50/80 border border-amber-200/70 text-[#854D0E] font-semibold">
          <Home className="w-3.5 h-3.5 text-[#B4690E]" /> Home collection: 07:00 AM–07:00 PM
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50/80 border border-indigo-200/70 text-[#1E3A8A] font-semibold">
          <Activity className="w-3.5 h-3.5 text-[#2563EB]" /> Lab open 24*7 for walk-in patients &amp; hospital emergencies
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/70 text-[#064E3B] font-semibold">
          <Clock className="w-3.5 h-3.5 text-[#04724D]" /> Reports verified within 12 hours
        </span>
      </div>

      {showFilters && (
        <div className="mt-6">
          <SymptomFilterBar activeFilter={activeFilter} onSelectFilter={onSelectFilter} />
        </div>
      )}
    </section>
  );
};

