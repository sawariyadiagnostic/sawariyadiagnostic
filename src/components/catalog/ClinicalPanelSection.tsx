'use client';

import { useEffect, useState } from 'react';
import { Check, Clock, Plus } from 'lucide-react';
import { clinicalPanels, type ClinicalPanel } from '@/data/clinicalPanelManifest';
import { useRequisition } from '../requisition/RequisitionContext';
import { formatInr } from '@/lib/utils';
import { Button } from '../ui/button';
import { MetricDisplay } from '../ui/MetricDisplay';
import { ClinicalPanelDetailModal } from './ClinicalPanelDetailModal';

export interface ClinicalPanelSectionProps {
  searchQuery?: string;
  selectedCategory?: string;
  targetPanel?: { id: string; timestamp: number } | null;
  onClearTargetPanel?: () => void;
}

export function ClinicalPanelSection({
  searchQuery = '',
  selectedCategory = 'all',
  targetPanel = null,
  onClearTargetPanel,
}: ClinicalPanelSectionProps = {}) {
  const [highlightedPanelId, setHighlightedPanelId] = useState<string | null>(null);
  const [detailPanel, setDetailPanel] = useState<ClinicalPanel | null>(null);
  const { isSelected, toggleTest } = useRequisition();

  useEffect(() => {
    if (!targetPanel?.id) return;
    const targetId = targetPanel.id;

    setHighlightedPanelId(targetId);

    const timer = setTimeout(() => {
      const el = document.getElementById(`panel-${targetId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
      } else {
        const catalog = document.getElementById('tests');
        catalog?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);

    const highlightTimer = setTimeout(() => {
      setHighlightedPanelId(null);
      onClearTargetPanel?.();
    }, 3200);

    return () => {
      clearTimeout(timer);
      clearTimeout(highlightTimer);
    };
  }, [targetPanel, onClearTargetPanel]);

  const areAllTestsSelected = (panel: ClinicalPanel) => {
    return (
      panel.constituentTestIds.length > 0 &&
      panel.constituentTestIds.every((testId) => isSelected(testId))
    );
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

  const filteredPanels = clinicalPanels.filter((panel) => {
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const match =
        panel.name.toLowerCase().includes(q) ||
        panel.hindiName.toLowerCase().includes(q) ||
        panel.parameters.some((p) => p.toLowerCase().includes(q)) ||
        panel.doctorQuestion.toLowerCase().includes(q) ||
        panel.doctorAnswer.toLowerCase().includes(q) ||
        (panel.keywords && panel.keywords.some((k) => k.toLowerCase().includes(q)));
      if (!match) return false;
    }
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'cbc-blood' || selectedCategory === 'hematology') return panel.department === 'Hematology';
    if (selectedCategory === 'sugar-diabetes') return panel.id === 'panel-diabetes';
    if (selectedCategory === 'thyroid-hormones' || selectedCategory === 'endocrine') return panel.department === 'Endocrinology';
    if (selectedCategory === 'liver-lft') return panel.id === 'panel-lft';
    if (selectedCategory === 'kidney-kft') return panel.id === 'panel-kft';
    if (selectedCategory === 'cholesterol-heart') return panel.id === 'panel-lipid';
    if (selectedCategory === 'vitamins-fatigue') return panel.id === 'panel-senior-vitality' || panel.id === 'panel-fever-infection';
    if (selectedCategory === 'biochem') return panel.department === 'Biochemistry' && panel.id !== 'panel-diabetes';
    if (selectedCategory === 'metabolic') return panel.id === 'panel-diabetes' || panel.id === 'panel-lipid';
    return true;
  });

  return (
    <div className="mb-8 sm:mb-12">
      {/* Mobile Sideways Swipe Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2 px-1 md:hidden">
        <span>Showing {filteredPanels.length} test panels</span>
        <span className="inline-flex items-center gap-1 text-[#155E9A] font-bold">
          <span>Swipe sideways</span>
          <span>➔</span>
        </span>
      </div>

      {/* Panels Track: Sideways on Mobile, Responsive Grid on Desktop */}
      {filteredPanels.length === 0 ? (
        <div role="status" className="rounded-[24px] border border-slate-200 bg-white p-8 text-center shadow-sm max-w-xl mx-auto">
          <h4 className="text-base font-bold text-[#102A43]">No test panels match &quot;{searchQuery}&quot;</h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">Try switching to Individual Tests tab to search across all individual lab tests.</p>
        </div>
      ) : (
        <div className="flex md:grid overflow-x-auto md:overflow-x-visible snap-x snap-mandatory md:snap-none gap-3.5 sm:gap-4 pb-4 pt-1 px-1 -mx-4 sm:-mx-6 md:mx-0 px-4 sm:px-6 md:px-0 scrollbar-none md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 scroll-smooth overscroll-x-contain">
          {filteredPanels.map((panel) => {
            const allSelected = areAllTestsSelected(panel);

            return (
              <div
                key={panel.id}
                id={`panel-${panel.id}`}
                className={`w-[85vw] sm:w-[320px] md:w-auto shrink-0 snap-center md:shrink peacock-test-card glass-card apple-squircle-card p-4 flex flex-col justify-between bg-white rounded-[22px] border scroll-mt-28 transition-all duration-300 ${
                  highlightedPanelId === panel.id
                    ? 'ring-4 ring-[#0A6C82] shadow-[0_0_35px_rgba(10,108,130,0.35)] scale-[1.015] border-[#0A6C82]/60 bg-cyan-50/30'
                    : 'border-slate-200/90 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] hover:shadow-[inset_0_1px_0_0_#FFFFFF,0_8px_20px_-4px_rgba(10,108,130,0.14)]'
                } ${panel.spineClass}`}
              >
                <div className="space-y-2.5">
                  {/* Top Meta Bar: 1x Fasting + Department Pill (Zero TAT redundancy here) */}
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-[8px] border inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 border-slate-200/90">
                      <span className={`w-1.5 h-1.5 rounded-full ${panel.tubeColorClass}`} />
                      {panel.department}
                    </span>
                    <span className="inline-flex items-center gap-1 text-slate-500 font-semibold text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {panel.fastingHours > 0 ? `${panel.fastingHours}h Fasting` : 'Non-Fasting'}
                    </span>
                  </div>

                  {/* Title & ShortCode Pill */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setDetailPanel(panel)}
                      className="text-left group/title w-full cursor-pointer focus:outline-none"
                      aria-label={`View details for ${panel.name}`}
                    >
                      <div className="flex items-center gap-1.5 flex-wrap min-h-[2.5rem]">
                        <h4 className="text-sm sm:text-[15px] font-bold text-[#102A43] group-hover/title:text-[#155E9A] leading-snug transition-colors line-clamp-2" title={panel.name}>
                          {panel.name}
                        </h4>
                        {panel.shortCode && (
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-[6px] bg-slate-100 text-slate-700 text-[10px] font-bold tracking-tight border border-slate-200/80">
                            {panel.shortCode}
                          </span>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Compact Parameters Scope */}
                  <div className="p-2 rounded-[12px] bg-slate-50 border border-slate-100 apple-squircle-inner">
                    <MetricDisplay size="sm" value={panel.parameters.length} label="Parameters included" />
                  </div>

                  {/* Clean Trigger Button to Full Clinical Detail Modal */}
                  <button
                    type="button"
                    onClick={() => setDetailPanel(panel)}
                    aria-label={`View clinical details for ${panel.name}`}
                    className="w-full py-1.5 px-2.5 rounded-[10px] bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200/60 text-xs font-bold text-[#155E9A] flex items-center justify-between transition-colors cursor-pointer active:scale-[0.98]"
                  >
                    <span>View {panel.parameters.length} Analytes &amp; Advice</span>
                    <span>➔</span>
                  </button>
                </div>

                {/* Price, Single TAT Tag, and Action Button */}
                <div className="pt-2.5 mt-3 border-t border-slate-100 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-xl sm:text-2xl font-black text-[#102A43] tracking-tight tabular-nums">
                      {formatInr(panel.transparentPrice)}
                    </span>
                    <span className="badge-neutral-clinical inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                      <span>{panel.turnaroundEstimate}</span>
                    </span>
                  </div>

                  <Button
                    type="button"
                    size="sm"
                    onClick={() => handleTogglePanel(panel)}
                    className={`squircle-btn apple-pressable h-auto min-h-11 w-full min-w-0 rounded-[14px] px-2 text-xs font-bold active:scale-[0.96] cursor-pointer shadow-md ${
                      allSelected ? 'btn-specular-emerald text-white' : 'action-isolated-primary'
                    }`}
                  >
                    {allSelected ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1.5 shrink-0 stroke-[2.5]" />
                        <span>All Panel Tests Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-3.5 w-3.5 mr-1.5 shrink-0" />
                        <span>Add Complete Panel</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rich Clinical Panel Detail Modal */}
      {detailPanel && (
        <ClinicalPanelDetailModal
          panel={detailPanel}
          isOpen={Boolean(detailPanel)}
          onClose={() => setDetailPanel(null)}
        />
      )}
    </div>
  );
}
