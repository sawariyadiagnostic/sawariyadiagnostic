import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  TestTube,
  Check,
  Share2,
  ArrowLeft,
  ClipboardList,
  Layers,
  Clock,
} from 'lucide-react';
import { type MedicalTest } from '@/data/publishedCatalog';
import { getPanelsForTest } from '@/data/clinicalPanelManifest';
import { useRequisition } from '../requisition/RequisitionContext';
import { formatInr } from '@/lib/utils';
import { buildTestShareUrl } from '@/config/site';
import { copyText } from '@/lib/clipboard';
import { toast } from 'sonner';
import { getTestTurnaround, getTestParameters, getTestParameterScope } from '@/utils/clinicalMetadata';

interface TestDetailModalProps {
  item: MedicalTest | null;
  isOpen: boolean;
  onClose: () => void;
}

function getBiologicalSpecimen(item: MedicalTest): string {
  if (item.specimen) return item.specimen;
  const combined = `${item.name} ${item.category || ''}`.toLowerCase();
  if (combined.includes('urine')) return 'Clean-catch midstream urine';
  if (combined.includes('stool')) return 'Stool specimen in standard collection container';
  if (combined.includes('cbc') || combined.includes('esr') || combined.includes('platelet') || combined.includes('hemoglobin') || combined.includes('blood count')) {
    return 'Blood (Lavender EDTA vacuum tube)';
  }
  if (combined.includes('glucose') || combined.includes('sugar')) {
    return 'Blood (Grey Sodium Fluoride tube)';
  }
  return 'Blood (Serum / Clot Activator tube)';
}

export function TestDetailModal({ item, isOpen, onClose }: TestDetailModalProps) {
  const { isSelected, toggleTest } = useRequisition();

  if (!item) return null;

  const parentPanels = getPanelsForTest(item.id);
  const turnaround = getTestTurnaround(item);
  const parameters = getTestParameters(item);
  const scope = getTestParameterScope(item);

  const discountPercent = item.originalPrice > item.price
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : null;

  const handleShare = async () => {
    const url = buildTestShareUrl(item.id);
    try {
      if (await copyText(url)) toast.success('Canonical link copied to clipboard!');
      else throw new Error('clipboard unavailable');
    } catch {
      toast.error('Could not copy the link. Please copy the page URL manually.');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-[min(760px,calc(100vw-2rem))] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] min-h-0 p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] ui-panel apple-squircle-modal rounded-[28px] flex flex-col">
          {/* Compact Header: High Density, Sleek & Fully Informative */}
          <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] px-4 py-3 sm:px-6 sm:py-3.5 text-white relative overflow-hidden flex-shrink-0">
            <div className="relative z-10 space-y-1.5 pr-8 sm:pr-12">
              {/* Top row: Name + Price */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <DialogTitle className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                    {item.name}
                  </DialogTitle>
                  <DialogDescription className="sr-only">
                    {item.name} laboratory investigation parameters, turnaround time, and pre-test advice
                  </DialogDescription>
                </div>

                <div className="flex items-baseline gap-1.5 shrink-0">
                  <span className="font-heading text-lg sm:text-2xl font-black text-white tracking-tight tabular-nums">
                    {formatInr(item.price)}
                  </span>
                  {item.originalPrice > item.price && (
                    <span className="text-xs text-blue-200 line-through tabular-nums font-semibold">
                      {formatInr(item.originalPrice)}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="text-[10px] font-bold bg-[#FDE047] text-[#102A43] px-1.5 py-0.5 rounded-full inline-block">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom row: Badges strip */}
              <div className="flex items-center gap-1.5 flex-wrap text-[10px] sm:text-[11px]">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold bg-emerald-500/25 text-emerald-100 border border-emerald-400/40">
                  <Clock className="w-3 h-3 text-emerald-300" />
                  <span>{turnaround}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold bg-white/10 text-blue-100 border border-white/20">
                  <TestTube className="w-3 h-3 text-blue-300" />
                  <span>{getBiologicalSpecimen(item).split('(')[0].trim()}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold bg-white/10 text-blue-100 border border-white/20">
                  <span>{scope.label}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-slate-50">
            {/* Description */}
            <div className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs space-y-1.5">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                Clinical Overview & Purpose
              </span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Parent Clinical Profile Recommendations */}
            {parentPanels.length > 0 && (
              <div className="bg-gradient-to-r from-cyan-50/90 via-sky-50/80 to-blue-50/80 p-3.5 sm:p-4 rounded-[20px] border border-cyan-200/90 shadow-2xs space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A6C82]">
                  <Layers className="w-4 h-4 text-[#0A6C82] shrink-0" />
                  <span>Available in Complete Clinical Health Profile</span>
                </div>
                <div className="space-y-2">
                  {parentPanels.map((panel) => (
                    <div
                      key={panel.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-[14px] bg-white/95 border border-cyan-100 shadow-2xs"
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold text-[#102A43] truncate">
                          {panel.name}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {panel.parameters.length} Parameters • 1 Single Needle Prick • {panel.turnaroundEstimate}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          window.dispatchEvent(
                            new CustomEvent('sawariya:search', {
                              detail: { tab: 'panels', panelId: panel.id, query: '' }
                            })
                          );
                        }}
                        className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-[10px] bg-[#155E9A] hover:bg-[#0F4775] text-white text-xs font-bold transition-all cursor-pointer active:scale-[0.96] shrink-0 self-start sm:self-auto shadow-2xs"
                      >
                        <span>View Profile</span>
                        <span className="text-[10px]">➔</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Specific Details */}
            <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 text-xs">
              <div className="min-w-0 bg-white p-3.5 rounded-[14px] border border-slate-200/90 shadow-2xs break-words apple-squircle-inner">
                <span className="text-[10px] text-slate-400 block font-medium">Biological Specimen:</span>
                <span className="min-w-0 font-bold text-slate-800 flex items-start gap-1.5 mt-0.5 break-words">
                  <TestTube className="w-3.5 h-3.5 text-[#155E9A] flex-shrink-0 mt-0.5" />
                  <span className="min-w-0 break-words">{getBiologicalSpecimen(item)}</span>
                </span>
              </div>

              <div className="min-w-0 bg-white p-3.5 rounded-[14px] border border-slate-200/90 shadow-2xs break-words apple-squircle-inner">
                <span className="text-[10px] text-slate-400 block font-medium">Methodology:</span>
                <span className="min-w-0 font-bold text-slate-800 mt-0.5 block break-words">
                  <span className="break-words">{item.method || 'Documented laboratory protocols'}</span>
                </span>
              </div>

              <div className="min-w-0 bg-white p-3.5 rounded-[14px] border border-slate-200/90 shadow-2xs break-words apple-squircle-inner">
                <span className="text-[10px] text-slate-400 block font-medium">Preparation:</span>
                <span className="min-w-0 font-bold text-slate-800 mt-0.5 block break-words">
                  <span className="break-words">{item.preparation || 'Preparation instructions are provided with the appointment'}</span>
                </span>
              </div>
            </div>

            {/* Parameters or Included Tests */}
            <div className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                {scope.isMultiParameter ? `Diagnostic Parameters Measured (${parameters.length}):` : 'Diagnostic Parameter Measured:'}
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {parameters.map((param, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-[12px] border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                    <span className="font-medium">{param}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer CTAs */}
          <div className="flex flex-wrap gap-2 p-3 sm:p-4 bg-white border-t border-slate-200 flex-shrink-0">
            <Button
              variant="outline"
              onClick={onClose}
              className="action-button btn-outline squircle-btn apple-pressable min-h-11 h-auto px-3 rounded-[14px] text-xs font-bold gap-1.5 border-slate-300 text-[#102A43] hover:bg-[#E8F1F8] hover:!text-[#0F4775] focus-visible:!text-[#0F4775] active:scale-[0.96]"
              title="Return to catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="action-button btn-outline squircle-btn apple-pressable h-auto min-h-11 px-3.5 rounded-[14px] text-xs font-bold gap-1.5 border-slate-200 active:scale-[0.96]"
              title="Copy canonical share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>

            {isSelected(item.id) ? (
              <div role="status" aria-live="polite" className="action-button flex min-h-11 flex-1 basis-full items-center justify-center gap-1.5 rounded-[14px] border border-emerald-300/80 bg-[#EFF7F2] px-3 py-2 text-xs font-bold text-[#185B3B] sm:basis-auto sm:text-sm shadow-[inset_0_1px_0_0_#FFFFFF,0_2px_8px_rgba(5,150,105,0.12)]">
                <Check className="h-4 w-4 shrink-0" />
                <span>Added to Request</span>
              </div>
            ) : (
              <Button
                type="button"
                onClick={() => { toggleTest(item.id); onClose(); }}
                className="action-button btn-primary squircle-btn apple-pressable min-h-11 h-auto flex-1 basis-full gap-1.5 rounded-[14px] text-xs font-bold sm:basis-auto sm:text-sm active:scale-[0.96] shadow-md"
              >
                <ClipboardList className="h-4 w-4 shrink-0" />
                <span>Add to Request</span>
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
