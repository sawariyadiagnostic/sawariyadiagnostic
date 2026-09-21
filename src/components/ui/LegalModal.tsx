import { useEffect, useRef } from 'react';
import { ArrowLeft, FileText, HeartHandshake, ShieldCheck } from 'lucide-react';
import { privacyPolicyText } from '@/data/privacy-policy';
import { qualityCommunityCharterText } from '@/data/quality-community-charter';
import { termsPatientRightsText } from '@/data/terms-patient-rights';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

export type PolicyType = 'privacy' | 'terms' | 'charter' | null;

interface LegalModalProps {
  type: PolicyType;
  onClose: () => void;
}

const policyCopy = {
  privacy: {
    icon: ShieldCheck,
    title: 'Privacy & Medical Data Policy',
    description: 'Version 2.0-Operative Standard • Effective October 1, 2025 • Republic of India',
    status: 'Privacy Policy',
    content: privacyPolicyText,
  },
  terms: {
      icon: FileText,
      title: 'Terms of Service & Patient Rights',
      description: 'Version 2.0-Legal Standard • Effective October 1, 2025 • Republic of India',
      status: 'Terms & Patient Rights — approved',
      content: termsPatientRightsText,
    },
  charter: {
    icon: HeartHandshake,
    title: 'Patient Quality & Community Charter',
    description: 'SDL-QMS-CC-2026-V2 • Effective October 1, 2025 • Republic of India',
    status: 'Quality & Community Charter — approved; effective October 1, 2025',
    content: qualityCommunityCharterText,
  },
} as const;

export function LegalModal({ type, onClose }: LegalModalProps) {
  const triggerRef = useRef<HTMLElement | null>(null);
  const previousType = useRef<PolicyType>(type);
  const policy = type ? policyCopy[type] : null;
  const Icon = policy?.icon;

  const closeModal = () => {
    if (window.history.state?.legalModal) window.history.back();
    else onClose();
  };

  useEffect(() => {
    if (type && !previousType.current) {
      window.history.pushState({ legalModal: true }, '', window.location.href);
    }

    const handlePopState = () => {
      if (type) onClose();
    };

    window.addEventListener('popstate', handlePopState);
    if (previousType.current && !type) requestAnimationFrame(() => triggerRef.current?.focus());
    previousType.current = type;
    return () => window.removeEventListener('popstate', handlePopState);
  }, [type, onClose]);

  return (
    <Dialog open={Boolean(type)} onOpenChange={(open) => !open && closeModal()}>
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
                <DialogDescription className="text-xs text-slate-400">{policy.description}</DialogDescription>
              </div>
            </div>
          </div>

          <div className="min-h-0 overflow-y-auto bg-white/50 p-6 sm:p-8 text-sm leading-relaxed text-slate-600">
            <div className="mb-5 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-emerald-950" role="status" aria-label={policy.status.toUpperCase()}>
              {policy.status}
            </div>
            <article aria-label={`${policy.title} content`}>
              <pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed text-slate-700">{policy.content}</pre>
            </article>
          </div>
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap gap-2 flex-shrink-0">
            <Button
              variant="outline"
              onClick={closeModal}
              className="action-button min-h-11 h-auto px-3 rounded-[14px] text-xs font-bold gap-1.5 border-slate-300 text-[#102A43] hover:bg-[#E8F1F8] hover:text-[#0F4775]"
              aria-label={`Back from ${policy.title}`}
              title="Return to legal links"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Back</span>
            </Button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
