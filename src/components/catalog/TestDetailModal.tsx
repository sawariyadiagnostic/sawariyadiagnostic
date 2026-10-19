import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  TestTube,
  Check,
  Share2,
  ArrowLeft,
  ClipboardList,
  Layers,
} from 'lucide-react';
import { type MedicalTest } from '@/data/publishedCatalog';
import { getPanelsForTest } from '@/data/clinicalPanelManifest';
import { useRequisition } from '../requisition/RequisitionContext';
import { formatInr } from '@/lib/utils';
import { buildTestShareUrl } from '@/config/site';
import { copyText } from '@/lib/clipboard';
import { toast } from 'sonner';

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
          {/* Header */}
          <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-6 text-white relative overflow-hidden flex-shrink-0">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold text-blue-200 mb-2">
                  <TestTube className="w-3.5 h-3.5" />
                  <span>{item.category?.toUpperCase()} PATHOLOGY</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {item.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-[var(--text-on-dark)] mt-1">
                  Documented laboratory protocols • Reports verified within 12 hours
                </DialogDescription>
              </div>

              <div className="text-right flex-shrink-0 pt-11 sm:pt-0 sm:pr-14">
                <div className="text-2xl sm:text-3xl font-black text-white">{formatInr(item.price)}</div>
                {item.originalPrice > item.price && (
                  <div className="text-xs text-blue-200 line-through">{formatInr(item.originalPrice)}</div>
                )}
                {discountPercent && (
                  <span className="text-[10px] font-bold bg-[#FDE047] text-[#102A43] px-2 py-0.5 rounded-full inline-block mt-1">
                    Save {discountPercent}%
                  </span>
                )}
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
                              detail: { tab: 'panels', query: panel.name.split('(')[0].trim() }
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
                {'Diagnostic Parameters Measured:'}
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {(item.parameters || [item.name]).map((param, i) => (
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
