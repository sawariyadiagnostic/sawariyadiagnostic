'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Clock, HelpCircle, Home, Layers, Plus, ShieldCheck, Sparkles, Syringe } from 'lucide-react';
import { clinicalPanels, type ClinicalPanel } from '@/data/clinicalPanelManifest';
import { useRequisition } from '../requisition/RequisitionContext';
import { formatInr } from '@/lib/utils';
import { Button } from '../ui/button';

export function ClinicalPanelSection({ searchQuery = '' }: { searchQuery?: string } = {}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedPanelId, setExpandedPanelId] = useState<string | null>(null);
  const { isSelected, toggleTest } = useRequisition();

  const toggleExpand = (id: string) => {
    setExpandedPanelId(expandedPanelId === id ? null : id);
  };

  const areAllTestsSelected = (panel: ClinicalPanel) => {
    return panel.constituentTestIds.every((testId) => isSelected(testId));
  };

  const handleTogglePanel = (panel: ClinicalPanel) => {
    const allSelected = areAllTestsSelected(panel);
    for (const testId of panel.constituentTestIds) {
      const selected = isSelected(testId);
      if (allSelected && selected) {
        toggleTest(testId);
      } else if (!allSelected && !selected) {
        toggleTest(testId);
      }
    }
  };

  const categories = [
    { id: 'all', label: 'All 8 Health Profiles' },
    { id: 'hematology', label: 'Blood & Clotting' },
    { id: 'biochem', label: 'Liver, Kidney & Heart' },
    { id: 'metabolic', label: 'Diabetes & Metabolism' },
    { id: 'endocrine', label: 'Thyroid & Vitamins' },
  ];

  const filteredPanels = clinicalPanels.filter((panel) => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        panel.name.toLowerCase().includes(q) ||
        panel.hindiName.toLowerCase().includes(q) ||
        panel.parameters.some((p) => p.toLowerCase().includes(q)) ||
        panel.doctorQuestion.toLowerCase().includes(q) ||
        panel.doctorAnswer.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'hematology') return panel.department === 'Hematology';
    if (selectedCategory === 'biochem') return panel.department === 'Biochemistry' && panel.id !== 'panel-diabetes';
    if (selectedCategory === 'metabolic') return panel.id === 'panel-diabetes' || panel.id === 'panel-lipid';
    if (selectedCategory === 'endocrine') return panel.department === 'Endocrinology';
    return true;
  });

  return (
    <div className="mb-10 sm:mb-14">
      {/* Header section */}
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/90 px-3.5 py-1 rounded-full shadow-2xs">
          <Layers className="w-4 h-4 text-[#155E9A]" />
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            Accredited Clinical Profiles (Multi-Analyte Panels)
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#102A43] tracking-tight">
          Single-Prick Multi-Analyte Health Profiles
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Standardized clinical profiles from our central laboratory SOPs. Sister tests share the exact same physical vacutainer tube — <strong>only 1 gentle needle prick</strong> required.
        </p>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 pt-2 scrollbar-none items-center justify-center flex-wrap">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`min-h-9 px-3.5 squircle-btn apple-pressable rounded-[14px] text-xs font-bold transition-all cursor-pointer inline-flex items-center active:scale-[0.96] ${
                  isActive ? 'peacock-pill-active' : 'peacock-pill-inactive'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Clinical Profiles */}
      {filteredPanels.length === 0 ? (
        <div role="status" className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm max-w-xl mx-auto">
          <h4 className="text-base font-bold text-[#102A43]">No clinical profiles match &quot;{searchQuery}&quot;</h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">Try switching to Individual Tests tab to search across all 74 individual lab tests.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {filteredPanels.map((panel) => {
          const isExpanded = expandedPanelId === panel.id;
          const allSelected = areAllTestsSelected(panel);

          return (
            <div
              key={panel.id}
              className={`peacock-test-card glass-card apple-squircle-card p-4 flex flex-col justify-between bg-white rounded-[22px] border border-slate-200/90 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] hover:shadow-[inset_0_1px_0_0_#FFFFFF,0_8px_20px_-4px_rgba(10,108,130,0.14)] transition-all ${panel.spineClass}`}
            >
              <div>
                {/* 3-Token Micro-Glyph Header */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pb-2 mb-2 border-b border-slate-100">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {panel.fastingHours > 0 ? `${panel.fastingHours}h Fasting` : 'Non-Fasting'}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Home className="w-3 h-3 text-blue-500" />
                    Home Collection
                  </span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    {panel.turnaroundEstimate}
                  </span>
                </div>

                {/* Top Row: Department + 1-Prick Badge */}
                <div className="flex items-center justify-between gap-1.5 mb-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-[8px] border inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-200/90">
                    <span className={`w-1.5 h-1.5 rounded-full ${panel.tubeColorClass}`} />
                    {panel.department}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/80 text-[10px] font-extrabold px-2 py-0.5 rounded-[8px] shrink-0">
                    <Syringe className="w-2.5 h-2.5 text-amber-700" />
                    1 Single Prick
                  </span>
                </div>

                {/* Title and Vernacular Hindi */}
                <h4 className="text-sm sm:text-[15px] font-bold text-[#102A43] leading-snug">
                  {panel.name}
                </h4>
                <p className="text-[11px] text-[#0A6C82] font-semibold mt-0.5 mb-2">
                  {panel.hindiName}
                </p>

                {/* Plain-Language Doctor Question Box */}
                <div className="p-2.5 rounded-[12px] bg-slate-50 border border-slate-100 text-[11px] text-slate-700 space-y-1 mb-2.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#155E9A]">
                    <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{panel.doctorQuestion}</span>
                  </div>
                  <p className="text-[10.5px] text-slate-600 leading-relaxed font-normal">
                    {panel.doctorAnswer}
                  </p>
                </div>

                {/* Vacutainer & Parameter Pill */}
                <div className="text-[10.5px] text-slate-600 space-y-1 mb-2.5 bg-white rounded-[12px] p-2 border border-slate-100">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-500">Vacutainer:</span>
                    <span className="font-semibold text-slate-800 text-right">{panel.vacutainerTube}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-500">Parameters:</span>
                    <span className="font-bold text-[#155E9A]">
                      {panel.measuredAnalytes.length} Measured + {panel.calculatedRatios.length} Ratios
                    </span>
                  </div>
                </div>

                {/* Fasting & Chai Status */}
                <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    💧 Water: Allowed
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${panel.chaiAllowed ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                    ☕ Chai: {panel.chaiAllowed ? 'Yes' : 'Hold'}
                  </span>
                  {panel.bpMedsAllowed && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800">
                      💊 BP Meds: Take
                    </span>
                  )}
                </div>

                {/* Expandable Parameter Ledger */}
                <button
                  type="button"
                  onClick={() => toggleExpand(panel.id)}
                  className="w-full text-left text-[11px] font-bold text-[#155E9A] hover:text-[#0A6C82] flex items-center justify-between py-1.5 px-2 rounded-[10px] bg-blue-50/60 border border-blue-100/70 mb-3 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Analyte Ledger' : `View Full Analyte Ledger (${panel.parameters.length})`}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="mb-3 p-3 bg-slate-50 rounded-[14px] border border-slate-200/90 space-y-2.5 text-[10.5px]">
                    <div>
                      <p className="font-bold text-slate-700 text-[10px] uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Measured Laboratory Assays ({panel.measuredAnalytes.length}):</span>
                        <span className="text-emerald-700 font-extrabold">Physical Tests</span>
                      </p>
                      <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                        {panel.measuredAnalytes.map((analyte) => (
                          <li key={analyte} className="truncate">{analyte}</li>
                        ))}
                      </ul>
                    </div>

                    {panel.calculatedRatios.length > 0 && (
                      <div className="pt-2 border-t border-slate-200/70">
                        <p className="font-bold text-slate-700 text-[10px] uppercase tracking-wider mb-1 flex items-center justify-between">
                          <span>Calculated Clinical Formulas ({panel.calculatedRatios.length}):</span>
                          <span className="text-blue-700 font-bold">Zero-Cost Math</span>
                        </p>
                        <ul className="space-y-0.5 text-slate-500 list-disc list-inside">
                          {panel.calculatedRatios.map((ratio) => (
                            <li key={ratio} className="truncate">{ratio}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200/70 space-y-1">
                      <p className="text-[9.5px] text-slate-600 font-medium">
                        <strong>Needle Spec:</strong> {panel.needleSpec}
                      </p>
                      <p className="text-[9.5px] text-slate-500">
                        {panel.fastingNote}
                      </p>
                    </div>

                    {panel.costToCompleteTip && (
                      <div className="p-2 rounded-[10px] bg-amber-50/90 border border-amber-200/80 text-[10px] text-amber-900 font-medium flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                        <span>{panel.costToCompleteTip.message}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Price & Action */}
              <div className="pt-2.5 mt-auto border-t border-slate-100 flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-medium block">Itemized Sum</span>
                    <span className="text-lg font-extrabold text-[#102A43] tracking-tight">
                      {formatInr(panel.transparentPrice)}
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#0B6E66] bg-emerald-50/80 border border-emerald-200/60 rounded-md px-1.5 py-0.5">
                    Central In-House Lab
                  </span>
                </div>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleTogglePanel(panel)}
                  className={`action-button squircle-btn apple-pressable h-auto min-h-11 w-full min-w-0 rounded-[14px] px-2 text-[11px] font-bold active:scale-[0.96] cursor-pointer shadow-md ${
                    allSelected
                      ? 'btn-specular-emerald text-white'
                      : 'btn-primary'
                  }`}
                >
                  {allSelected ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5 shrink-0 stroke-[2.5]" />
                      <span>All Profile Tests Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                      <span>Add Complete Profile to Request</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
}
