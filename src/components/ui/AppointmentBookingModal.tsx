'use client';

import { useState, useEffect } from 'react';
import { Calendar, Phone, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { siteConfig, telHref } from '@/config/site';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './dialog';
import { Button } from './button';

interface AppointmentBookingModalProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AppointmentBookingModal({
  trigger,
  isOpen,
  onOpenChange,
}: AppointmentBookingModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [calendarError, setCalendarError] = useState(false);

  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange !== undefined ? onOpenChange : setInternalOpen;

  useEffect(() => {
    if (open) {
      (async function () {
        try {
          const cal = await getCalApi({ namespace: siteConfig.integrations.calNamespace });
          cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
        } catch {
          setCalendarError(true);
        }
      })();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-white/95 backdrop-blur-2xl ui-panel border border-slate-200/90 shadow-2xl rounded-[28px]">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] text-white p-5 sm:p-6 text-left border-b border-white/10">
          <div className="flex items-center justify-between gap-3 mb-1">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-0.5 rounded-full text-[11px] font-bold text-white border border-white/20">
              <Calendar className="w-3.5 h-3.5 text-cyan-300" />
              <span>Doorstep Collection &amp; Lab Visit Scheduler</span>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] text-emerald-300 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              {siteConfig.claims.operatingHours}
            </span>
          </div>
          <DialogTitle className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
            Reserve Your Appointment or Home Visit Slot
          </DialogTitle>
          <DialogDescription className="text-slate-200 text-xs sm:text-sm leading-relaxed mt-1 font-normal">
            Select a preferred morning fasting or evening time slot. Our collection team verifies your address and confirms the exact slot.
          </DialogDescription>
        </div>

        {/* Calendar Body */}
        <div className="p-3 sm:p-6 bg-slate-50/50 min-h-[440px] flex items-center justify-center">
          {calendarError ? (
            <div role="alert" className="text-center max-w-md mx-auto space-y-4 py-8">
              <div className="w-14 h-14 bg-blue-50 text-[#155E9A] rounded-[20px] flex items-center justify-center mx-auto border border-blue-100">
                <Calendar className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#1D1D1F]">Calendar temporarily unavailable</h4>
                <p className="text-xs sm:text-sm text-slate-500">
                  Please call the lab collection desk directly to confirm your morning fasting or home sample slot.
                </p>
              </div>
              <Button asChild className="action-button btn-primary squircle-btn apple-pressable min-h-12 h-auto px-6 text-xs sm:text-sm font-bold rounded-[16px]">
                <a href={telHref(siteConfig.contact.phone)}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call Collection Desk ({siteConfig.contact.phone})
                </a>
              </Button>
            </div>
          ) : (
            <div className="w-full bg-white rounded-[20px] p-2 sm:p-3 border border-slate-200 shadow-inner">
              <Cal
                namespace={siteConfig.integrations.calNamespace}
                calLink={siteConfig.integrations.calLink}
                style={{ width: '100%', height: '100%', minHeight: '440px', overflow: 'scroll' }}
                config={{ layout: 'month_view' }}
              />
            </div>
          )}
        </div>

        {/* Reassuring Footer */}
        <div className="px-5 py-3.5 bg-slate-100/90 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Single-use vacuum tubes opened in your presence</span>
          </div>
          <span className="text-[10.5px] text-slate-500">
            No appointment is booked until the lab confirms.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
