import { useEffect, useRef } from 'react';
import { ShieldCheck, FileText, HeartHandshake, X } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export type PolicyType = 'privacy' | 'terms' | 'charter' | null;

interface LegalModalProps {
  type: PolicyType;
  onClose: () => void;
}

const policyCopy = {
  privacy: { icon: ShieldCheck, title: 'Privacy & Medical Data Policy' },
  terms: { icon: FileText, title: 'Terms of Service & Patient Rights' },
  charter: { icon: HeartHandshake, title: 'Patient Quality & Community Charter' },
} as const;

export function LegalModal({ type, onClose }: LegalModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousType = useRef<PolicyType>(type);
  const policy = type ? policyCopy[type] : null;
  const Icon = policy?.icon;

  useEffect(() => {
    if (previousType.current && !type) requestAnimationFrame(() => triggerRef.current?.focus());
    previousType.current = type;
  }, [type]);

  return (
    <Dialog open={Boolean(type)} onOpenChange={(open) => !open && onClose()}>
      {type && policy && Icon && (
        <DialogContent
          className="w-[calc(100vw-32px)] sm:max-w-2xl bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.2)] border border-white/60 overflow-hidden max-h-[85vh] p-0 flex flex-col"
          onOpenAutoFocus={() => {
            triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          }}
          onCloseAutoFocus={(event) => {
            if (triggerRef.current) {
              event.preventDefault();
              triggerRef.current.focus();
            }
          }}
        >
          <div className="p-6 bg-[#102A43] text-white flex items-center justify-between relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <Icon className="w-6 h-6 text-blue-300" aria-hidden="true" />
              <div>
                <DialogTitle className="text-lg font-bold text-white">{policy.title}</DialogTitle>
                <DialogDescription className="text-xs text-slate-400">Sawariya Diagnostic Lab • Charkhi Dadri</DialogDescription>
              </div>
            </div>
            <DialogClose asChild>
              <button aria-label="Close policy dialog" className="p-2 rounded-full hover:bg-white/20 text-slate-300 hover:text-white transition-colors relative z-10">
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </DialogClose>
          </div>

          <div className="p-6 sm:p-8 space-y-4 text-sm text-slate-600 leading-relaxed bg-white/50">
            <h4 className="font-bold text-slate-900 text-base">Review required before publication</h4>
            <p>
              This policy text is being prepared for owner and qualified legal review. The public site does not treat this draft as a legal notice, compliance certificate, or complete statement of rights and obligations.
            </p>
            <p>
              For current questions about privacy, appointments, reports, services, or patient rights, contact the lab directly through the published phone or email channels.
            </p>
          </div>

          <div className="p-4 sm:p-5 bg-white/70 border-t border-white/80 flex justify-end">
            <DialogClose asChild>
              <button className="px-6 py-2 rounded-full bg-[#102A43] text-white text-xs font-semibold hover:bg-[#155E9A] transition-colors shadow-md shadow-[#102A43]/20">
                Close
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
