import { useEffect, useRef } from 'react';
import { ShieldCheck, FileText, HeartHandshake } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

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
                <DialogDescription className="text-xs text-slate-400">
                  Sawariya Diagnostic Lab • Charkhi Dadri
                </DialogDescription>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4 text-sm text-slate-600 leading-relaxed bg-white/50">
            <div
              role="status"
              aria-label="DRAFT — REVIEW REQUIRED BEFORE PUBLICATION"
              className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-950"
            >
              Draft — review required before publication
            </div>
            <p>
              This policy text is being prepared for owner and qualified legal review. The public site does not treat this draft as a legal notice, compliance certificate, or complete statement of rights and obligations.
            </p>
            <p>
              For current questions about privacy, appointments, reports, services, or patient rights, contact the lab directly through the published phone or email channels.
            </p>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
