'use client';

import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Layers, Plus, ShieldCheck, Sparkles, Syringe } from 'lucide-react';
import { clinicalPanels, type ClinicalPanel } from '@/data/clinicalPanelManifest';
import { useRequisition } from '../requisition/RequisitionContext';
import { formatInr } from '@/lib/utils';
import { Button } from '../ui/button';

export function ClinicalPanelSection() {
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

  return (
    <div className="mb-10 sm:mb-14">
      <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200/90 px-3.5 py-1 rounded-full shadow-2xs">
          <Layers className="w-4 h-4 text-[#155E9A]" />
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
            Accredited Diagnostic Batteries (Multi-Test Panels)
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#102A43] tracking-tight">
          Single-Prick Multi-Analyte Panels
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Standardized clinical test batteries from our central laboratory SOPs. Sister tests share the exact same physical vacutainer tube — <strong>only 1 needle prick</strong> required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {clinicalPanels.map((panel) => {
          const isExpanded = expandedPanelId === panel.id;
          const allSelected = areAllTestsSelected(panel);

          return (
            <div
              key={panel.id}
              className={`peacock-test-card glass-card apple-squircle-card p-4 flex flex-col justify-between bg-white rounded-[22px] border border-slate-200/90 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] hover:shadow-[inset_0_1px_0_0_#FFFFFF,0_8px_20px_-4px_rgba(10,108,130,0.14)] transition-all ${panel.spineClass}`}
            >
              <div>
                {/* Header row: Dept badge + Needle Poke Counter */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-[8px] border inline-flex items-center gap-1.5 ${panel.deptBadgeClass}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${panel.tubeColorClass}`} />
                    {panel.department}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-200/80 text-[10px] font-extrabold px-2 py-0.5 rounded-[8px] shrink-0">
                    <Syringe className="w-2.5 h-2.5 text-amber-700" />
                    1 Single Prick
                  </span>
                </div>

                {/* Panel Title & Vernacular Name */}
                <h4 className="text-sm sm:text-[15px] font-bold text-[#102A43] leading-snug">
                  {panel.name}
                </h4>
                <p className="text-[11px] text-[#0A6C82] font-semibold mt-0.5 mb-2">
                  {panel.hindiName}
                </p>

                {/* Specimen Tube & Parameters count */}
                <div className="text-[10.5px] text-slate-600 space-y-1 mb-2.5 bg-slate-50/80 rounded-[12px] p-2 border border-slate-100">
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-500">Vacutainer:</span>
                    <span className="font-semibold text-slate-800 text-right">{panel.vacutainerTube}</span>
                  </div>
                  <div className="flex items-center justify-between font-medium">
                    <span className="text-slate-500">Parameters:</span>
                    <span className="font-bold text-[#155E9A]">{panel.parameters.length} Analytes</span>
                  </div>
                </div>

                {/* Fasting & Chai Status */}
                <div className="flex items-center gap-1.5 mb-3 flex-wrap">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    💧 Water: Allowed
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${panel.chaiAllowed ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                    ☕ Chai: {panel.chaiAllowed ? 'Yes' : 'Hold'}
                  </span>
                  {panel.fastingHours > 0 ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800">
                      Fasting: {panel.fastingHours}h
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800">
                      Non-Fasting
                    </span>
                  )}
                </div>

                {/* Clinical Pearl */}
                <p className="text-[11px] text-slate-600 leading-relaxed italic mb-3">
                  &ldquo;{panel.clinicalPearl}&rdquo;
                </p>

                {/* Expandable Constituent Analytes Accordion */}
                <button
                  type="button"
                  onClick={() => toggleExpand(panel.id)}
                  className="w-full text-left text-[11px] font-bold text-[#155E9A] hover:text-[#0A6C82] flex items-center justify-between py-1.5 px-2 rounded-[10px] bg-blue-50/60 border border-blue-100/70 mb-3 active:scale-[0.98] transition-transform cursor-pointer"
                >
                  <span>{isExpanded ? 'Hide Analyte List' : `View All ${panel.parameters.length} Analytes`}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <div className="mb-3 p-2.5 bg-slate-50 rounded-[12px] border border-slate-200/80 space-y-1 text-[10.5px]">
                    <p className="font-bold text-slate-700 text-[10px] uppercase tracking-wider mb-1">
                      Constituent Parameters (NABL Itemized):
                    </p>
                    <ul className="space-y-0.5 text-slate-600 list-disc list-inside">
                      {panel.parameters.map((param) => (
                        <li key={param} className="truncate">{param}</li>
                      ))}
                    </ul>
                    <p className="pt-1.5 text-[9.5px] text-slate-500 border-t border-slate-200/70">
                      {panel.fastingNote}
                    </p>
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
                    {panel.turnaroundEstimate}
                  </span>
                </div>

                <Button
                  type="button"
                  size="sm"
                  onClick={() => handleTogglePanel(panel)}
                  className={`action-button squircle-btn apple-pressable h-auto min-h-10 w-full min-w-0 rounded-[14px] px-2 text-[11px] font-bold active:scale-[0.96] cursor-pointer ${
                    allSelected
                      ? 'bg-[#EFF7F2] text-[#185B3B] border border-emerald-300/80 hover:bg-[#E2F1E7]'
                      : 'btn-primary'
                  }`}
                >
                  {allSelected ? (
                    <>
                      <Check className="h-3.5 w-3.5 mr-1.5 shrink-0 stroke-[2.5]" />
                      <span>All Battery Tests Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                      <span>Add Battery to Request</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
