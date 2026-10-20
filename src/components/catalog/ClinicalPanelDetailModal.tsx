import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Check,
  Plus,
  HelpCircle,
  Clock,
  Coffee,
  Droplets,
  Sparkles,
  Syringe,
  Pill,
} from 'lucide-react';
import type { ClinicalPanel } from '@/data/clinicalPanelManifest';
import { useRequisition } from '../requisition/RequisitionContext';
import { formatInr } from '@/lib/utils';

interface ClinicalPanelDetailModalProps {
  panel: ClinicalPanel | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ClinicalPanelDetailModal({
  panel,
  isOpen,
  onClose,
}: ClinicalPanelDetailModalProps) {
  const { isSelected, toggleTest } = useRequisition();

  if (!panel) return null;

  const allSelected =
    panel.constituentTestIds.length > 0 &&
    panel.constituentTestIds.every((testId) => isSelected(testId));

  const handleTogglePanel = () => {
    panel.constituentTestIds.forEach((testId) => {
      const currentlySelected = isSelected(testId);
      if (allSelected && currentlySelected) {
        toggleTest(testId);
      } else if (!allSelected && !currentlySelected) {
        toggleTest(testId);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-[min(760px,calc(100vw-2rem))] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] min-h-0 p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] ui-panel apple-squircle-modal rounded-[28px] flex flex-col">
        {/* Compact Header: High Density, Sleek & Fully Informative */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] px-4 py-3 sm:px-6 sm:py-3.5 text-white relative overflow-hidden flex-shrink-0">
          <div className="relative z-10 space-y-1.5 pr-8 sm:pr-12">
            {/* Top row: Name & ShortCode + Price */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <DialogTitle className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                  {panel.name}
                </DialogTitle>
                {panel.shortCode && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-[6px] bg-white/15 text-blue-100 text-[10px] font-bold border border-white/20">
                    {panel.shortCode}
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1.5 shrink-0">
                <span className="font-heading text-lg sm:text-2xl font-black text-white tracking-tight tabular-nums">
                  {formatInr(panel.transparentPrice)}
                </span>
              </div>
            </div>

            <DialogDescription className="sr-only">
              {panel.name} clinical panel parameters, turnaround time, and pre-test advice
            </DialogDescription>

            {/* Bottom row: Badges strip */}
            <div className="flex items-center gap-1.5 flex-wrap text-[10px] sm:text-[11px]">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-emerald-500/25 text-emerald-100 border border-emerald-400/40">
                <Clock className="w-3 h-3 text-emerald-300" />
                <span>{panel.turnaroundEstimate}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold bg-white/10 text-blue-100 border border-white/20">
                <span>{panel.fastingHours > 0 ? `${panel.fastingHours}h Fasting` : 'Non-Fasting'}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold bg-white/10 text-blue-100 border border-white/20">
                <span className={`w-1.5 h-1.5 rounded-full ${panel.tubeColorClass}`} />
                <span>1 Prick Draw</span>
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {/* Doctor Question & Answer Box */}
          <div className="p-4 rounded-[18px] bg-white border border-slate-200 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-[#155E9A]">
              <HelpCircle className="w-4 h-4 shrink-0 text-[#155E9A]" />
              <span>{panel.doctorQuestion}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {panel.doctorAnswer}
            </p>
            {panel.clinicalPearl && (
              <div className="pt-2 mt-2 border-t border-slate-100 text-xs text-slate-500 flex items-start gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Clinical Pearl:</strong> {panel.clinicalPearl}</span>
              </div>
            )}
          </div>

          {/* Included Analytes Checklist */}
          <div className="p-4 rounded-[18px] bg-white border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Included Parameters ({panel.parameters.length})
              </span>
              <span className="text-[11px] font-semibold text-slate-500">
                {panel.vacutainerTube}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              {panel.parameters.map((param) => (
                <div
                  key={param}
                  className="flex items-center gap-2 p-2 rounded-[10px] bg-slate-50 border border-slate-100 text-slate-700 font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                  <span className="truncate">{param}</span>
                </div>
              ))}
            </div>

            {panel.costToCompleteTip && (
              <div className="p-3 rounded-[12px] bg-amber-50/90 border border-amber-200 text-xs text-amber-900 font-medium flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>{panel.costToCompleteTip.message}</span>
              </div>
            )}
          </div>

          {/* Pre-Analytical Fasting & Medication Guidelines */}
          <div className="p-4 rounded-[18px] bg-white border border-slate-200 shadow-2xs space-y-2.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Fasting &amp; Pre-Collection Guidelines
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-start gap-2 p-2.5 rounded-[12px] bg-slate-50 border border-slate-100">
                <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">
                    {panel.fastingHours > 0 ? `${panel.fastingHours}h Fasting Required` : 'No Fasting Required'}
                  </strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {panel.fastingNote || 'Sample can be collected at any convenient time.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-[12px] bg-slate-50 border border-slate-100">
                <Droplets className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">
                    {panel.waterAllowed ? 'Plain Water: Allowed' : 'Water Restrictions Apply'}
                  </strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Well-hydrated veins facilitate smooth single-prick collection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-[12px] bg-slate-50 border border-slate-100">
                <Coffee className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">
                    {panel.chaiAllowed ? 'Morning Chai: Permitted' : 'Morning Chai/Milk: Hold'}
                  </strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Have morning tea right after sample collection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 p-2.5 rounded-[12px] bg-slate-50 border border-slate-100">
                <Pill className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Prescription Medicines</strong>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {panel.bpMedsAllowed ? 'BP medicines allowed with water. ' : ''}
                    {panel.diabetesMedsHold ? 'Hold diabetes insulin until breakfast.' : 'Consult your doctor.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center justify-between gap-3 flex-shrink-0">
          <div className="text-xs text-slate-600 font-medium hidden sm:block">
            <span className="font-bold text-[#102A43]">{panel.parameters.length}</span> parameters included
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="action-button btn-outline squircle-btn min-h-10 sm:min-h-11 rounded-[14px] font-bold text-xs flex-1 sm:flex-initial"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                handleTogglePanel();
                onClose();
              }}
              className={`squircle-btn apple-pressable min-h-10 sm:min-h-11 rounded-[14px] font-bold text-xs px-5 shadow-md flex-1 sm:flex-initial ${
                allSelected ? 'btn-specular-emerald text-white' : 'action-isolated-primary'
              }`}
            >
              {allSelected ? (
                <>
                  <Check className="h-4 w-4 mr-1.5 stroke-[2.5]" />
                  <span>Panel Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1.5" />
                  <span>Add Complete Panel</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
