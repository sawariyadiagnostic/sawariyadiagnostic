import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Layers,
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
import { MetricDisplay } from '../ui/MetricDisplay';

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
        {/* Header */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-5 sm:p-6 text-white relative overflow-hidden flex-shrink-0">
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold text-blue-200 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>{panel.department.toUpperCase()} CLINICAL PROFILE</span>
              </div>
              <DialogTitle className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                {panel.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-blue-100 mt-1">
                {panel.hindiName} • Consolidated Single Vacutainer Draw
              </DialogDescription>
            </div>

            <div className="text-right flex-shrink-0 pt-10 sm:pt-0 sm:pr-12">
              <div className="text-2xl sm:text-3xl font-black text-white">{formatInr(panel.transparentPrice)}</div>
              <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/40 px-2 py-0.5 rounded-full inline-block mt-1">
                {panel.turnaroundEstimate}
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
        <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <MetricDisplay
            size="md"
            value={formatInr(panel.transparentPrice)}
            label="Profile Rate"
            sublabel={`${panel.parameters.length} parameters included`}
          />

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="action-button btn-outline squircle-btn min-h-11 rounded-[14px] font-bold text-xs flex-1 sm:flex-initial"
            >
              Close
            </Button>
            <Button
              type="button"
              onClick={() => {
                handleTogglePanel();
                onClose();
              }}
              className={`squircle-btn apple-pressable min-h-11 rounded-[14px] font-bold text-xs px-5 shadow-md flex-1 sm:flex-initial ${
                allSelected ? 'btn-specular-emerald text-white' : 'action-isolated-primary'
              }`}
            >
              {allSelected ? (
                <>
                  <Check className="h-4 w-4 mr-1.5 stroke-[2.5]" />
                  <span>Profile Added</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-1.5" />
                  <span>Add Complete Profile</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
