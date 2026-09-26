import { useMemo } from 'react';
import { ClipboardList, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { siteConfig, whatsappHref } from '@/config/site';
import { formatInr } from '@/lib/utils';
import { useRequisition } from './RequisitionContext';

export function RequisitionDrawer() {
  const { selectedTests, clearRequest, toggleTest, isOpen, setOpen } = useRequisition();
  const subtotal = useMemo(() => selectedTests.reduce((sum, test) => sum + test.price, 0), [selectedTests]);
  const message = selectedTests.length
    ? `*${siteConfig.name} — TEST REQUEST*\n\n${selectedTests.map((test, index) => `${index + 1}. ${test.name} — ${formatInr(test.price)}`).join('\n')}\n\nPublished test-price subtotal: ${formatInr(subtotal)}\n\nPlease confirm availability, final collection charges, preparation instructions, and the appointment with the lab desk. No appointment is booked until the lab confirms.`
    : '';
  const whatsappUrl = whatsappHref(message);

  return <>
    {selectedTests.length > 0 && <div className="fixed right-3 bottom-[calc(env(safe-area-inset-bottom,0px)+5rem)] z-[105] sm:bottom-4">
      <Button type="button" onClick={() => setOpen(true)} aria-label={`Review test request, ${selectedTests.length} selected`} className="min-h-11 shadow-lg">
        <ClipboardList className="h-4 w-4" />
        <span>Review request · {selectedTests.length}</span>
        <span className="text-[10px] font-medium">{formatInr(subtotal)}</span>
      </Button>
    </div>}

    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent aria-label="Test request" className="flex max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-lg flex-col overflow-hidden p-0 sm:max-h-[calc(100dvh-2rem)]">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
          <div>
            <div className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#155E9A]"><ClipboardList className="h-3.5 w-3.5" /> Test request</div>
            <DialogTitle className="text-xl font-black text-[#102A43]">Review your selected tests</DialogTitle>
            <DialogDescription className="mt-1 text-xs text-slate-500">{selectedTests.length} individual test{selectedTests.length === 1 ? '' : 's'} selected</DialogDescription>
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
          {selectedTests.length ? <>
            <ul className="space-y-2" aria-label="Selected tests">
              {selectedTests.map((test) => <li key={test.id} className="flex items-center justify-between gap-3 rounded-[14px] border border-slate-200 p-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-snug text-[#102A43]">{test.name}</h3>
                  <button type="button" onClick={() => toggleTest(test.id)} aria-label={`Remove ${test.name} from request`} className="mt-2 min-h-11 text-xs font-semibold text-[#C62828] underline">Remove</button>
                </div>
                <strong className="shrink-0 text-sm text-[#102A43]">{formatInr(test.price)}</strong>
              </li>)}
            </ul>
            <p className="mt-5 rounded-[14px] border border-slate-200 bg-slate-50 p-3 text-sm font-semibold text-slate-800">Published test-price subtotal: {formatInr(subtotal)}</p>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">The lab confirms availability and any collection charges; no appointment is booked until confirmed.</p>
          </> : <p className="rounded-[14px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">No tests selected. Return to the catalog to choose tests.</p>}
        </div>

        <footer className="flex flex-wrap gap-2 border-t border-slate-200 bg-white p-4 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)] sm:p-5">
          {selectedTests.length > 0 && <Button type="button" variant="outline" onClick={clearRequest} className="min-h-11"><Trash2 className="mr-2 h-4 w-4" /> Clear tests</Button>}
          {whatsappUrl && <Button asChild className="min-h-11 flex-1 bg-[#128C7E] font-bold text-white hover:bg-[#0F766E]">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Send test request on WhatsApp"><ClipboardList className="mr-2 h-4 w-4" /> Send test request on WhatsApp</a>
          </Button>}
        </footer>
      </DialogContent>
    </Dialog>
  </>;
}
