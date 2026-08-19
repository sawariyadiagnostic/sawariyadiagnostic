import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileDown, Loader2, ShieldCheck, Lock, QrCode, Sparkles } from 'lucide-react';
import { LISClient } from '@/lib/lis-client';
import { Analytics } from '@/lib/analytics';

export function ReportDownloadModal({ trigger }: { trigger?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [reportId, setReportId] = useState('');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await LISClient.downloadReport(patientId, reportId);
    } catch (error) {
      // Error handled by toast in service
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (val: boolean) => {
    setOpen(val);
    if (val) {
      Analytics.track("REPORT_MODAL_OPEN");
    }
  };

  const handleQuickDemo = () => {
    setPatientId('SD-2026-9082');
    setReportId('REP-CKD-4412');
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button
            className="flex-1 flex items-center justify-center gap-1.5 bg-[#082A45]/90 active:bg-[#051C2E] border border-[#0D5C75]/40 rounded-[20px] h-12 px-2 text-xs font-semibold text-slate-100 transition-transform active:scale-[0.96] select-none"
            aria-label="Download Report"
          >
            <div className="w-6 h-6 rounded-lg bg-[#0D5C75]/50 flex items-center justify-center text-teal-300 flex-shrink-0">
              <FileDown className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[8px] text-teal-300 font-bold uppercase tracking-wider">Reports</span>
              <span className="text-[11px] font-bold text-white whitespace-nowrap">Download</span>
            </div>
          </button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.2)] rounded-[32px]">
        {/* Apple Health Modal Header */}
        <div className="bg-[#072448] p-6 text-white text-center relative overflow-hidden">
          {/* Liquid Header Glow */}
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#00A896] rounded-full blur-[40px] animate-liquid mix-blend-screen" />
          </div>

          <div className="w-14 h-14 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[20px] flex items-center justify-center mx-auto mb-3 shadow-md shadow-black/10 relative z-10">
            <ShieldCheck className="w-7 h-7 text-[#00A896]" />
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight text-white mb-1 relative z-10">
            Download Certified Lab Report
          </DialogTitle>
          <DialogDescription className="text-teal-100/90 text-xs leading-relaxed max-w-xs mx-auto relative z-10">
            Directly retrieve doctor-signed, QR-verified pathology records from our secure LIS server.
          </DialogDescription>
        </div>

        {/* Form Container */}
        <form onSubmit={handleDownload} className="p-5 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="patientId" className="text-xs font-bold text-slate-800">
                Patient UHID / ID
              </Label>
              <button 
                type="button" 
                onClick={handleQuickDemo}
                className="text-[10.5px] font-bold text-[#0A6E5C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 text-[#D97706]" /> Auto-fill Sample ID
              </button>
            </div>
            <Input 
              id="patientId"
              placeholder="e.g. SD-2026-9082" 
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              required
              className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] text-sm font-medium rounded-[14px]"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="reportId" className="text-xs font-bold text-slate-800">
              Report Reference / Barcode ID
            </Label>
            <Input 
              id="reportId"
              placeholder="e.g. REP-CKD-4412" 
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              required
              className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] text-sm font-medium rounded-[14px]"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={loading}
            className="w-full h-12 btn-primary rounded-[16px] font-bold text-sm shadow-md active:scale-[0.98] transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Validating LIS Connection...
              </>
            ) : (
              <>
                <span>Retrieve Digital PDF Report</span>
                <FileDown className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
          
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-600" /> 256-Bit Encrypted
            </span>
            <span className="flex items-center gap-1">
              <QrCode className="w-3 h-3 text-blue-600" /> ICMR QR Verified
            </span>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
