import { useState } from 'react';
import { Check, ClipboardList, Home, Layers } from 'lucide-react';
import { Button } from './button';
import type { MedicalTest } from '@/data/publishedCatalog';
import { clinicalPanels } from '@/data/clinicalPanelManifest';
import { TestDetailModal } from '../catalog/TestDetailModal';
import { formatInr } from '@/lib/utils';

interface TestCardProps {
  test: MedicalTest;
  isSelected: boolean;
  onToggleRequest: (testId: string) => void;
  onViewDetails?: (test: MedicalTest) => void;
}
interface DepartmentInfo {
  name: string;
  badgeClass: string;
}

function getDepartmentInfo(category = '', name = ''): DepartmentInfo {
  const combined = `${category} ${name}`.toLowerCase();
  const baseBadge = 'bg-slate-100 text-slate-700 border-slate-200/90';
  if (combined.includes('hemat') || combined.includes('cbc') || combined.includes('blood count') || combined.includes('esr') || combined.includes('platelet') || combined.includes('hemoglobin') || combined.includes('smear') || combined.includes('rbc') || combined.includes('wbc')) {
    return { name: 'Hematology', badgeClass: baseBadge };
  }
  if (combined.includes('thyroid') || combined.includes('vitamin') || combined.includes('hormone') || combined.includes('clia') || combined.includes('ferritin') || combined.includes('hcg') || combined.includes('psa') || combined.includes('prolactin') || combined.includes('fsh') || combined.includes('lh') || combined.includes('t3') || combined.includes('t4') || combined.includes('tsh') || combined.includes('b12') || combined.includes('d3')) {
    return { name: 'Endocrinology', badgeClass: baseBadge };
  }
  if (combined.includes('sugar') || combined.includes('glucose') || combined.includes('hba1c') || combined.includes('diabet')) {
    return { name: 'Diabetes Care', badgeClass: baseBadge };
  }
  if (combined.includes('lipid') || combined.includes('cholesterol') || combined.includes('triglyceride') || combined.includes('lft') || combined.includes('kft') || combined.includes('liver') || combined.includes('kidney') || combined.includes('creatinine') || combined.includes('uric') || combined.includes('bilirubin') || combined.includes('sgot') || combined.includes('sgpt') || combined.includes('protein') || combined.includes('albumin') || combined.includes('calcium') || combined.includes('amylase') || combined.includes('lipase') || combined.includes('iron') || combined.includes('urea') || combined.includes('egfr')) {
    return { name: 'Biochemistry', badgeClass: baseBadge };
  }
  if (combined.includes('fever') || combined.includes('dengue') || combined.includes('malaria') || combined.includes('typhoid') || combined.includes('urine') || combined.includes('stool') || combined.includes('widal') || combined.includes('culture') || combined.includes('hiv') || combined.includes('antibody') || combined.includes('crp') || combined.includes('rheumatoid') || combined.includes('ige')) {
    return { name: 'Microbiology', badgeClass: baseBadge };
  }
  return { name: 'Pathology', badgeClass: baseBadge };
}

function getDepartmentSpine(category = '', name = ''): string {
  const combined = `${category} ${name}`.toLowerCase();
  if (combined.includes('hemat') || combined.includes('cbc') || combined.includes('blood count') || combined.includes('esr')) {
    return 'spine-hematology';
  }
  if (combined.includes('thyroid') || combined.includes('vitamin') || combined.includes('hormone') || combined.includes('clia') || combined.includes('ferritin') || combined.includes('hcg')) {
    return 'spine-clia';
  }
  if (combined.includes('sugar') || combined.includes('glucose') || combined.includes('hba1c') || combined.includes('diabet')) {
    return 'spine-metabolic';
  }
  if (combined.includes('fever') || combined.includes('dengue') || combined.includes('malaria') || combined.includes('typhoid') || combined.includes('urine')) {
    return 'spine-micro';
  }
  return 'spine-biochem';
}

function getVacutainerDot(category = '', name = ''): { colorClass: string; label: string } {
  const combined = `${category} ${name}`.toLowerCase();
  if (combined.includes('urine') || combined.includes('stool')) {
    return { colorClass: 'vacutainer-dot-container', label: 'Standard Container' };
  }
  if (combined.includes('cbc') || combined.includes('blood count') || combined.includes('esr') || combined.includes('platelet') || combined.includes('hba1c')) {
    return { colorClass: 'vacutainer-dot-edta', label: 'Lavender EDTA' };
  }
  if (combined.includes('sugar') || combined.includes('glucose')) {
    return { colorClass: 'vacutainer-dot-fluoride', label: 'Grey Fluoride' };
  }
  return { colorClass: 'vacutainer-dot-serum', label: 'Gold Serum' };
}

export function TestCard({ test, isSelected, onToggleRequest, onViewDetails }: TestCardProps) {
  const [showDetail, setShowDetail] = useState(false);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(test);
    } else {
      setShowDetail(true);
    }
  };

  const hasParameters = Boolean(test.parameters && test.parameters.length > 0);

  const dept = getDepartmentInfo(test.category, test.name);
  const vac = getVacutainerDot(test.category, test.name);
  const parentPanel = clinicalPanels.find((panel) => panel.constituentTestIds.some((id) => id.toLowerCase() === test.id.toLowerCase()));

  return (
    <>
      <div 
        data-selected={isSelected}
        className={`peacock-test-card glass-card ui-card apple-squircle-card p-3.5 sm:p-4 flex flex-col justify-between h-full group bg-white/95 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 relative overflow-hidden rounded-[22px] border border-slate-200/80 shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_-2px_rgba(10,17,40,0.05)] hover:shadow-[inset_0_1px_0_0_#FFFFFF,0_8px_20px_-4px_rgba(10,108,130,0.14)] ${getDepartmentSpine(test.category, test.name)}`}
      >
        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A6C82]/0 to-[#0B6E66]/0 group-hover:from-[#0A6C82]/[0.03] group-hover:to-[#0B6E66]/[0.03] transition-colors duration-300 pointer-events-none" />
        
        <div className="flex-1 flex flex-col">
          {/* Top Badges Row */}
          <div className="flex items-center justify-between gap-1.5 mb-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className={`text-[10px] sm:text-[10.5px] font-bold px-2 py-0.5 rounded-[8px] border shrink-0 inline-flex items-center gap-1.5 ${dept.badgeClass}`}>
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${vac.colorClass}`} title={vac.label} />
                {dept.name}
              </span>
              {test.popular && (
                <span className="inline-flex items-center gap-0.5 rounded-[8px] bg-[#0A1128] px-2 py-0.5 text-[9.5px] sm:text-[10px] font-extrabold text-[#FFC300] border border-white/20 shadow-2xs shrink-0">
                  ★ Popular
                </span>
              )}
            </div>

            {test.homeCollection && (
              <span className="inline-flex items-center gap-1 bg-blue-50/80 text-blue-800 border border-blue-200/70 text-[9.5px] sm:text-[10px] font-semibold px-2 py-0.5 rounded-[8px] shrink-0">
                <Home className="w-2.5 h-2.5 text-[#155E9A]" /> Home Visit
              </span>
            )}
          </div>

          {/* Title & Description with balanced vertical alignment */}
          <h3 aria-label={test.name} className="mb-1 text-[15px] sm:text-base font-bold leading-snug text-[#102A43] group-hover:text-[#0A6C82] transition-colors">
            <button
              type="button"
              aria-label={`View details for ${test.name}`}
              onClick={handleCardClick}
              className="text-left line-clamp-2 min-h-[2.5rem] underline-offset-4 hover:underline focus-visible:underline w-full"
            >
              {test.name}
            </button>
          </h3>

          {parentPanel && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                window.dispatchEvent(
                  new CustomEvent('sawariya:search', {
                    detail: { tab: 'panels', query: parentPanel.name.split('(')[0].trim() }
                  })
                );
              }}
              title={`View ${parentPanel.name} profile`}
              className="mb-2 inline-flex items-center gap-1 bg-cyan-50/90 hover:bg-cyan-100/90 border border-cyan-200/80 text-[10.5px] text-[#0A6C82] hover:text-[#085363] font-semibold px-2 py-0.5 rounded-[8px] w-fit max-w-full transition-all cursor-pointer group/panel active:scale-[0.97]"
            >
              <Layers className="w-3 h-3 text-[#0A6C82] shrink-0 group-hover/panel:scale-110 transition-transform" />
              <span className="truncate">Also in {parentPanel.name.split('(')[0].trim()}</span>
              <span className="text-[9px] text-[#0A6C82]/80 font-bold ml-0.5">➔</span>
            </button>
          )}

          {/* Compact Parameters Preview / Verification note */}
          <div className="mb-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 gap-1.5 min-w-0">
            {hasParameters ? (
              <>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                  {test.parameters.length} Params
                </span>
                <div className="flex items-center gap-1 overflow-hidden truncate">
                  <span className="truncate text-slate-600 font-medium text-[10.5px]">
                    {test.parameters.slice(0, 2).join(' • ')}
                  </span>
                  {test.parameters.length > 2 && (
                    <span className="shrink-0 text-[9.5px] font-bold text-[#0A6C82] bg-teal-50 border border-teal-200/80 rounded px-1 py-0.2">
                      +{test.parameters.length - 2}
                    </span>
                  )}
                </div>
              </>
            ) : (
              <span className="text-[10px] font-medium text-slate-400">
                Central in-house analyzer • Verified in 12h
              </span>
            )}
          </div>
        </div>
        
        {/* Price & Action Section */}
        <div className="pt-2.5 mt-auto border-t border-slate-100/90 flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-[22px] font-extrabold text-[#102A43] tracking-tight">
                  {formatInr(test.price)}
                </span>
                {test.originalPrice && test.originalPrice > test.price && (
                  <span className="text-xs text-slate-400 line-through font-normal">
                    {formatInr(test.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            <span className="text-[10px] font-semibold text-[#0B6E66] bg-emerald-50/80 border border-emerald-200/60 rounded-md px-1.5 py-0.5">
              Ready in 2–6 hrs
            </span>
          </div>

          {/* Request actions */}
          <div className="action-row">
            {isSelected ? (
              <div role="status" aria-live="polite" className="btn-specular-emerald flex min-h-11 w-full items-center justify-center gap-2 rounded-[14px] px-3 py-2 text-xs font-bold text-white">
                <Check className="h-4 w-4 shrink-0 stroke-[2.5]" />
                <span>Added to Request</span>
              </div>
            ) : (
              <Button
                type="button"
                size="sm"
                aria-pressed={false}
                onClick={() => onToggleRequest(test.id)}
                className="action-button squircle-btn apple-pressable h-auto min-h-11 w-full min-w-0 rounded-[14px] px-2 text-[11px] font-bold sm:px-3 sm:text-xs shadow-md active:scale-[0.96] cursor-pointer"
              >
                <ClipboardList className="h-3.5 w-3.5 shrink-0" />
                <span className="min-w-0">Add to Request</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <TestDetailModal
        item={test}
        isOpen={showDetail}
        onClose={() => setShowDetail(false)}
      />
    </>
  );
}
