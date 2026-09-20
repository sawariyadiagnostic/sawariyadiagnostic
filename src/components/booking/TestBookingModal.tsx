import { useState } from 'react';
import { Calendar, CheckCircle2, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatInr } from '@/lib/utils';

interface TestBookingModalProps {
  testName: string;
  price: number;
  originalPrice?: number;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TestBookingModal({
  testName,
  price,
  originalPrice,
  trigger,
  isOpen: externalOpen,
  onOpenChange: externalOnOpenChange,
}: TestBookingModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;
  const whatsappUrl = whatsappHref(`Hello Sawariya Diagnostic, I would like to ask about ${testName}.`);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="w-[calc(100vw-32px)] sm:max-w-[480px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[28px] sm:rounded-[32px] mx-auto">
        <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-4 sm:p-5 text-white">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-100 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
            Diagnostic Test
          </span>
          <div className="flex items-start justify-between gap-3">
            <DialogTitle className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug">{testName}</DialogTitle>
            <div className="text-right shrink-0">
              <span className="text-xl sm:text-2xl font-black text-white">{formatInr(price)}</span>
              {originalPrice !== undefined && originalPrice > price && <span className="text-xs text-blue-100 line-through block">{formatInr(originalPrice)}</span>}
            </div>
          </div>
          <DialogDescription className="text-xs text-blue-100/90 mt-1">
            Choose an appointment channel. Patient details are entered only through the selected contact or booking provider.
          </DialogDescription>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="rounded-[18px] border border-blue-100 bg-blue-50/60 p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#155E9A] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">No patient form on this page</h3>
                <p className="text-xs leading-relaxed text-slate-600 mt-1">
                  The website does not store names, phone numbers, addresses, or medical details. Home collection is available 06:30 AM–08:00 PM.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2.5">
            <Button asChild className="action-button w-full min-h-12 h-auto btn-primary rounded-[16px] font-bold text-sm">
              <a href="#contact" onClick={() => setOpen(false)}>
                <Calendar className="w-4 h-4 mr-2" />
                Open appointment calendar
              </a>
            </Button>
            <div className="grid sm:grid-cols-2 gap-2.5">
              <Button asChild variant="outline" className="action-button min-h-12 h-auto rounded-[16px] text-xs font-bold">
                <a href={telHref(siteConfig.contact.phone)}>
                  <Phone className="w-4 h-4 mr-2 text-[#155E9A]" />
                  Call lab desk
                </a>
              </Button>
              <Button asChild variant="outline" className="action-button min-h-12 h-auto rounded-[16px] text-xs font-bold">
                <a href={whatsappUrl || telHref(siteConfig.contact.phone)} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>
                  <MessageCircle className="w-4 h-4 mr-2 text-[#128C7E]" />
                  Ask on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
            Price shown is the current public catalog price; reports are verified within 12 hours.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
