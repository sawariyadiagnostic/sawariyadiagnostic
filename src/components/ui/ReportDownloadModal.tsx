import { FileDown, Mail, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, telHref, whatsappHref } from '@/config/site';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export function ReportDownloadModal({ trigger }: { trigger?: React.ReactNode }) {
  const whatsappUrl = whatsappHref('Hello Sawariya Diagnostic, I need help accessing a laboratory report.');

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#082A45]/90 border border-[#155E9A]/40 rounded-[20px] h-12 px-2 text-xs font-semibold text-slate-100">
            <FileDown className="w-3.5 h-3.5" />
            <span>Report assistance</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl rounded-[32px]">
        <div className="bg-[#102A43] p-6 text-white text-center">
          <FileDown className="w-8 h-8 mx-auto mb-3 text-blue-200" />
          <DialogTitle className="text-xl font-bold tracking-tight text-white">Report assistance</DialogTitle>
          <DialogDescription className="text-blue-100/90 text-xs leading-relaxed max-w-xs mx-auto mt-1">
            The public website does not store or display patient reports. Contact the lab through a verified channel for report assistance.
          </DialogDescription>
        </div>
        <div className="p-5 sm:p-6 space-y-3">
          <Button asChild className="action-button w-full min-h-12 h-auto btn-primary rounded-[16px] font-bold text-sm">
            <a href={telHref(siteConfig.contact.phone)}><Phone className="w-4 h-4 mr-2" />Call report desk</a>
          </Button>
          <Button asChild variant="outline" className="action-button w-full min-h-12 h-auto rounded-[16px] font-bold text-sm">
            <a href={`mailto:${siteConfig.contact.email}`}><Mail className="w-4 h-4 mr-2 text-[#155E9A]" />Email the lab</a>
          </Button>
          <Button asChild variant="outline" className="action-button w-full min-h-12 h-auto rounded-[16px] font-bold text-sm">
            <a href={whatsappUrl || telHref(siteConfig.contact.phone)} target={whatsappUrl ? '_blank' : undefined} rel={whatsappUrl ? 'noopener noreferrer' : undefined}>
              <MessageCircle className="w-4 h-4 mr-2 text-[#128C7E]" />Ask on WhatsApp
            </a>
          </Button>
          <p className="text-[11px] text-center text-slate-500 pt-1">Report availability and identity verification are handled by the lab team.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
