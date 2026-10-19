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
                    ? 'bg-gradient-to-r from-[#0A1128] via-[#102A43] to-[#155E9A] text-white shadow-md border border-blue-400/40 scale-[1.02]'
                    : 'bg-slate-50 text-slate-700 border border-slate-200/90 hover:bg-white hover:border-[#155E9A]/60'
                }`}
                style={isActive ? { boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.4), 0 4px 14px rgba(16, 42, 67, 0.25)' } : undefined}
              >
                <span className="text-xs font-bold">{chip.label}</span>
                <span className={`text-[11px] ${isActive ? 'text-cyan-200' : 'text-slate-500'}`}>
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
        {/* PILLAR 1 (THE STAR): Processed In-House Central Advantage */}
        <div className="peacock-test-card card-star-highlight apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 bg-white border border-[#155E9A]/30">
          <div className="apple-squircle-inner rounded-[12px] bg-gradient-to-br from-[#0A1128] via-[#102A43] to-[#155E9A] p-2.5 text-white border border-blue-400/30 shadow-xs flex-shrink-0">
            <Activity className="h-5 w-5 text-cyan-200" />
          </div>
          <div>
            <div className="mb-1 inline-flex items-center gap-1 text-[9.5px] font-black uppercase tracking-wider text-[#155E9A] bg-blue-50 border border-blue-200/70 rounded-full px-2 py-0.5">
              <span>Central Hub Moat</span>
            </div>
            <h3 className="font-bold text-[#0A1128] text-sm">Processed In-House</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Zero out-of-town transit delay. Samples tested directly at our central Loharu Road hub.
            </p>
          </div>
        </div>

        {/* PILLAR 2: CLIA & 5-Part Hematology (Calm Clinical Slate) */}
        <div className="peacock-test-card apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-slate-100 p-2.5 text-[#102A43] border border-slate-200 flex-shrink-0">
            <ShieldCheck className="h-5 w-5 text-[#155E9A]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">CLIA &amp; 5-Part Hematology</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Chemiluminescence hormone immunoassays, biochemistry &amp; hematology with daily calibrations.
            </p>
          </div>
        </div>

        {/* PILLAR 3: Same-Day Digital Reports (Calm Clinical Slate) */}
        <div className="peacock-test-card apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-slate-100 p-2.5 text-[#102A43] border border-slate-200 flex-shrink-0">
            <Clock className="h-5 w-5 text-[#155E9A]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Same-Day Digital Reports</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Routine blood counts ready in 2–4 hours; PDF reports delivered directly to your WhatsApp.
            </p>
          </div>
        </div>

        {/* PILLAR 4: Doorstep Blood Collection (Calm Clinical Slate) */}
        <div className="peacock-test-card apple-squircle-card flex items-start gap-3.5 rounded-[20px] p-4 sm:p-5 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] bg-white border border-slate-200/80">
          <div className="apple-squircle-inner rounded-[12px] bg-slate-100 p-2.5 text-[#102A43] border border-slate-200 flex-shrink-0">
            <Home className="h-5 w-5 text-[#155E9A]" />
          </div>
          <div>
            <h3 className="font-bold text-[#0A1128] text-sm">Doorstep Blood Collection</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Single-prick vacutainer collection at your home across Charkhi Dadri with cold-chain box.
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

