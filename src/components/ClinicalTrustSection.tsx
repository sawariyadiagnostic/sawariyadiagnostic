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
  { id: 'cbc', label: 'Complete Blood Count (CBC)', sublabel: 'Hemoglobin, Platelets & TLC', queryKeyword: 'CBC' },
  { id: 'thyroid', label: 'Thyroid & Hormones', sublabel: 'TSH, FT3 & FT4 Profiles', queryKeyword: 'Thyroid' },
  { id: 'diabetes', label: 'Diabetes & Sugar', sublabel: 'HbA1c & Fasting Glucose', queryKeyword: 'Sugar' },
  { id: 'fever', label: 'Fever & Infection', sublabel: 'CBC, Dengue & Typhoid', queryKeyword: 'Fever' },
  { id: 'vitamins', label: 'Vitamins & Bone Health', sublabel: 'Vitamin D, B12 & Calcium', queryKeyword: 'Vitamin' },
  { id: 'heart-liver', label: 'Lipid, Liver & Kidney', sublabel: 'Cholesterol, LFT & KFT', queryKeyword: 'Lipid' },
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
                className={`flex flex-col items-start shrink-0 rounded-[14px] px-3.5 py-2 text-left transition-all cursor-pointer squircle-btn apple-pressable active:scale-[0.96] ${
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
        <div className="peacock-test-card spine-biochem apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-teal-50 p-2.5 text-[#0B6E66] border border-teal-100 flex-shrink-0">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Processed In-House</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Zero out-of-town transit delay. Samples tested directly at our central Loharu Road hub.
            </p>
          </div>
        </div>

        <div className="peacock-test-card spine-clia apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-cyan-50 p-2.5 text-[#0A6C82] border border-cyan-100 flex-shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">CLIA &amp; 5-Part Hematology</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Chemiluminescence hormone immunoassays, biochemistry &amp; hematology with daily calibrations.
            </p>
          </div>
        </div>

        <div className="peacock-test-card spine-metabolic apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-amber-50 p-2.5 text-[#B4690E] border border-amber-100 flex-shrink-0">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Same-Day Digital Reports</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Routine blood counts ready in 2–4 hours; PDF reports delivered directly to your WhatsApp.
            </p>
          </div>
        </div>

        <div className="peacock-test-card spine-hematology apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-rose-50 p-2.5 text-[#C81E1E] border border-rose-100 flex-shrink-0">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Doorstep Blood Collection</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Safe vacutainer collection at your home across Charkhi Dadri (07:00 AM–07:00 PM).
            </p>
          </div>
        </div>
      </div>

      {showFilters && (
        <div className="mt-6">
          <SymptomFilterBar activeFilter={activeFilter} onSelectFilter={onSelectFilter} />
        </div>
      )}
    </section>
  );
};

