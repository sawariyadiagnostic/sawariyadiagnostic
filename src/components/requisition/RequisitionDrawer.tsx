import { useMemo } from 'react';
import { ClipboardList, Trash2, Camera, Syringe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { siteConfig, whatsappHref } from '@/config/site';
import { formatInr } from '@/lib/utils';
import { useRequisition } from './RequisitionContext';

export function RequisitionDrawer() {
  const { selectedTests, clearRequest, toggleTest, isOpen, setOpen } = useRequisition();
  const subtotal = useMemo(() => selectedTests.reduce((sum, test) => sum + test.price, 0), [selectedTests]);

  const vacutainerRequirements = useMemo(() => {
    let hasEdta = false;
    let hasSerum = false;
    let hasFluoride = false;
    let hasCitrate = false;
    let hasContainer = false;

    for (const test of selectedTests) {
      const combined = `${test.name} ${test.category || ''}`.toLowerCase();
      if (combined.includes('urine') || combined.includes('stool')) {
        hasContainer = true;
      } else if (combined.includes('sugar') || combined.includes('glucose')) {
        hasFluoride = true;
      } else if (combined.includes('cbc') || combined.includes('esr') || combined.includes('platelet') || combined.includes('hemoglobin') || combined.includes('blood count') || combined.includes('hba1c')) {
        hasEdta = true;
      } else if (combined.includes('pt') || combined.includes('inr') || combined.includes('aptt') || combined.includes('coagulation') || combined.includes('d-dimer')) {
        hasCitrate = true;
      } else {
        hasSerum = true;
      }
    }

    const bloodTubesCount = (hasEdta ? 1 : 0) + (hasSerum ? 1 : 0) + (hasFluoride ? 1 : 0) + (hasCitrate ? 1 : 0);
    return {
      hasEdta,
      hasSerum,
      hasFluoride,
      hasCitrate,
      hasContainer,
      bloodTubesCount,
    };
  }, [selectedTests]);

  const message = selectedTests.length
    ? `*${siteConfig.name} — TEST REQUEST*\n\n${selectedTests.map((test, index) => `${index + 1}. ${test.name} — ${formatInr(test.price)}`).join('\n')}\n\nPublished test-price subtotal: ${formatInr(subtotal)}\n\nPlease confirm availability, final collection charges, preparation instructions, and the appointment with the lab desk. No appointment is booked until the lab confirms.`
    : '';
  const whatsappUrl = whatsappHref(message);
  const prescriptionWhatsappUrl = whatsappHref("Hello Sawariya Diagnostic, I have a doctor's prescription slip and would like to share a photo to confirm test prices and book home collection.");

  return <>
    {selectedTests.length > 0 && <div className="fixed right-3 bottom-[calc(env(safe-area-inset-bottom,0px)+5rem)] z-[105] sm:bottom-4">
      <Button type="button" onClick={() => setOpen(true)} aria-label={`Review test request, ${selectedTests.length} selected`} className="btn-primary squircle-btn apple-pressable min-h-12 h-auto px-4 py-2.5 rounded-[18px] shadow-2xl active:scale-[0.96] flex items-center gap-2">
        <ClipboardList className="h-4 w-4" />
        <span>Review request · {selectedTests.length}</span>
        <span className="text-[10px] font-medium">{formatInr(subtotal)}</span>
      </Button>
    </div>}

    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent aria-label="Test request" style={{ backgroundColor: 'var(--surface-white)' }} className="flex max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-lg flex-col overflow-hidden p-0 sm:max-h-[calc(100dvh-2rem)] apple-squircle-modal rounded-[28px]">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-[#FFF9F3] px-5 py-4 sm:px-6">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#155E9A]"><ClipboardList className="h-3.5 w-3.5" /> Test request</div>
            <DialogTitle className="text-xl font-black text-[#102A43]">Review your selected tests</DialogTitle>
            <DialogDescription className="mt-1 text-xs text-slate-500">{selectedTests.length} individual test{selectedTests.length === 1 ? '' : 's'} selected</DialogDescription>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto bg-white p-5 sm:p-6">
          {selectedTests.length ? <>
            {/* Vacutainer Tube Physics & Single Puncture Confirmation */}
            {vacutainerRequirements.bloodTubesCount > 0 && (
              <div className="mb-4 rounded-[16px] border border-slate-200/90 bg-slate-50/90 p-3.5 space-y-2 apple-squircle-inner">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#102A43] inline-flex items-center gap-1.5">
                    <Syringe className="w-3.5 h-3.5 text-amber-600" />
                    <span>Physical Vacutainer Tube Dock:</span>
                  </span>
                  <span className="text-[10.5px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    1 Single Needle Puncture
                  </span>
                </div>

                <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                  {vacutainerRequirements.hasEdta && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-900 border border-purple-200">
                      <span className="w-2 h-2 rounded-full vacutainer-dot-edta" />
                      Lavender EDTA
                    </span>
                  )}
                  {vacutainerRequirements.hasSerum && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200">
                      <span className="w-2 h-2 rounded-full vacutainer-dot-serum" />
                      Gold SST (Serum)
                    </span>
                  )}
                  {vacutainerRequirements.hasFluoride && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 text-slate-800 border border-slate-300">
                      <span className="w-2 h-2 rounded-full vacutainer-dot-fluoride" />
                      Grey Fluoride
                    </span>
                  )}
                  {vacutainerRequirements.hasCitrate && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 border border-blue-200">
                      <span className="w-2 h-2 rounded-full bg-sky-500" />
                      Blue Citrate
                    </span>
                  )}
                  {vacutainerRequirements.hasContainer && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 border border-stone-200">
                      <span className="w-2 h-2 rounded-full bg-amber-700" />
                      Clean Container
                    </span>
                  )}
                </div>

                <p className="text-[10.5px] text-slate-500 leading-normal">
                  All selected blood investigations are collected sequentially during <strong>one single vein entry</strong> using multi-sample vacuum adapter needles.
                </p>
              </div>
            )}

            <ul className="space-y-2" aria-label="Selected tests">
              {selectedTests.map((test) => <li key={test.id} className="flex items-center justify-between gap-3 rounded-[14px] border border-slate-200 p-3 apple-squircle-inner">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-snug text-[#102A43]">{test.name}</h3>
                  <button type="button" onClick={() => toggleTest(test.id)} aria-label={`Remove ${test.name} from request`} className="mt-2 min-h-11 px-2.5 py-1 text-xs font-bold text-[#C62828] hover:bg-red-50 rounded-[10px] squircle-btn apple-pressable active:scale-[0.96] cursor-pointer inline-flex items-center">Remove</button>
                </div>
                <strong className="shrink-0 text-sm text-[#102A43]">{formatInr(test.price)}</strong>
              </li>)}
            </ul>
            <p className="mt-5 rounded-[14px] border border-[#D7C7B8] bg-[#FFF9F3] p-3 text-sm font-semibold text-[#102A43] apple-squircle-inner">Published test-price subtotal: {formatInr(subtotal)}</p>
            <div className="mt-3 rounded-[14px] border border-slate-200/80 bg-slate-50 p-3 flex items-center justify-between gap-3 text-xs apple-squircle-inner">
              <span className="text-slate-600 font-medium">Have a handwritten doctor's prescription slip?</span>
              <a href={prescriptionWhatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-emerald-700 hover:underline shrink-0">
                Send photo
              </a>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">The lab confirms availability and any collection charges; no appointment is booked until confirmed.</p>
          </> : <div className="space-y-4">
            <p className="rounded-[16px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 apple-squircle-inner">No tests selected. Return to the catalog to choose tests.</p>
            <div className="rounded-[16px] border border-emerald-200 bg-emerald-50/60 p-4 space-y-2 apple-squircle-inner">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
                <Camera className="w-4 h-4 text-emerald-700" />
                <span>Have a Doctor's Prescription Slip?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Skip manual test searches. Share a photo of your doctor's slip on WhatsApp to confirm tests and collection times.
              </p>
              <Button asChild className="btn-secondary squircle-btn apple-pressable min-h-11 w-full text-xs font-bold text-white rounded-[14px] active:scale-[0.96]">
                <a href={prescriptionWhatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Share doctor prescription on WhatsApp">
                  <Camera className="w-4 h-4 mr-1.5" />
                  <span>Send prescription photo on WhatsApp</span>
                </a>
              </Button>
            </div>
          </div>}
        </div>

        <footer className="flex flex-col gap-2 border-t border-slate-200 bg-white p-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] sm:flex-row sm:p-5">
          {selectedTests.length > 0 && <Button type="button" variant="outline" onClick={clearRequest} className="action-button btn-outline squircle-btn apple-pressable min-h-11 rounded-[14px] font-bold"><Trash2 className="mr-2 h-4 w-4" /> Clear tests</Button>}
          {whatsappUrl && <Button asChild className="btn-secondary squircle-btn apple-pressable min-h-12 w-full px-4 font-bold text-white rounded-[16px] active:scale-[0.96] sm:min-w-0 sm:flex-1 sm:px-5">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Send test request on WhatsApp"><ClipboardList className="mr-2 h-4 w-4" /> Send test request on WhatsApp</a>
          </Button>}
        </footer>
      </DialogContent>
    </Dialog>
  </>;
}
