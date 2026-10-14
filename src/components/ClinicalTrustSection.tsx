import React, { useState } from 'react';
import { ShieldCheck, Clock, Activity, Home } from 'lucide-react';

export interface SymptomCategory {
  id: string;
  label: string;
  sublabel: string;
  queryKeyword: string;
}

export const SYMPTOM_FILTERS: SymptomCategory[] = [
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

export const ClinicalTrustSection: React.FC<Props> = ({ activeFilter: propActiveFilter, onSelectFilter }) => {
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
    <section aria-label="Clinical Quality & Quick Symptom Filters" className="mx-auto max-w-6xl px-4 py-6">
      {/* 4-Pillar Central In-House Advantage Strip */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Processed In-House</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Zero out-of-town transit degradation. Analyzed directly at our Loharu Road hub.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">CLIA &amp; 5-Part Hematology</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              High-precision hormone immunoassays, biochemistry &amp; hematology with daily quality assurance.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="rounded-lg bg-amber-50 p-2.5 text-amber-700">
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Same-Day Digital Reports</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Routine &amp; hormone reports delivered directly to your WhatsApp within hours.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="rounded-lg bg-purple-50 p-2.5 text-purple-700">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm">Doorstep Blood Collection</h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Safe vacutainer collection at your doorstep across Charkhi Dadri.
            </p>
          </div>
        </div>
      </div>

      {/* Patient-Friendly Symptom & Organ Quick-Filter Chips */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Filter by Health Goal or Symptom
          </h2>
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
          {SYMPTOM_FILTERS.map((chip) => {
            const isActive = currentFilter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                onClick={() => handleFilterClick(chip.queryKeyword, chip.id)}
                className={`flex flex-col items-start shrink-0 rounded-xl border px-3.5 py-2 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold">{chip.label}</span>
                <span className={`text-[11px] ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                  {chip.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
