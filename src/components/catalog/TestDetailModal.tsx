import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  TestTube,
  ShieldCheck,
  Home, 
  Check, 
  Sparkles, 
  Calendar, 
  HelpCircle, 
  Share2, 
  ArrowRight,
  ArrowLeft,
  Stethoscope
} from 'lucide-react';
import { medicalTests, type MedicalTest } from '@/data/publishedCatalog';
import { TestBookingModal } from '../booking/TestBookingModal';
import { formatInr } from '@/lib/utils';
import { buildTestShareUrl } from '@/config/site';
import { copyText } from '@/lib/clipboard';
import { toast } from 'sonner';

interface TestDetailModalProps {
  item: MedicalTest | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TestDetailModal({ item, isOpen, onClose }: TestDetailModalProps) {
  const [showBooking, setShowBooking] = useState(false);

  if (!item) return null;

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
        <DialogContent className="w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] max-w-[min(760px,calc(100vw-2rem))] max-h-[calc(100dvh-1rem)] sm:max-h-[calc(100dvh-2rem)] min-h-0 p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[24px] sm:rounded-[32px] flex flex-col">
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
                <DialogDescription className="text-xs text-blue-100/90 mt-1">
                  Documented laboratory protocols • Reports verified within 12 hours
                </DialogDescription>
              </div>

              <div className="text-right flex-shrink-0">
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

            {/* Test Specific Details */}
            <div className="grid min-w-0 grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 text-xs">
              <div className="min-w-0 bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs break-words">
                <span className="text-[10px] text-slate-400 block font-medium">Sample Collection:</span>
                <span className="min-w-0 font-bold text-slate-800 flex items-start gap-1 mt-0.5 break-words">
                  <Home className="w-3.5 h-3.5 text-[#C62828] flex-shrink-0" />
                  <span className="min-w-0 break-words">{item.specimen || 'Home collection: 06:30 AM–08:00 PM'}</span>
                </span>
              </div>

              <div className="min-w-0 bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs break-words">
                <span className="text-[10px] text-slate-400 block font-medium">Methodology:</span>
                <span className="min-w-0 font-bold text-slate-800 mt-0.5 block break-words">
                  <span className="break-words">{item.method || 'Documented laboratory protocols'}</span>
                </span>
              </div>

              <div className="min-w-0 bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs break-words">
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
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-wrap gap-2 flex-shrink-0">
            <Button
              variant="outline"
              onClick={onClose}
              className="action-button min-h-11 h-auto px-3 rounded-[14px] text-xs font-bold gap-1.5 border-slate-300 text-[#102A43] hover:bg-[#E8F1F8] hover:text-[#0F4775]"
              title="Return to catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleShare}
              className="action-button h-auto min-h-11 px-3.5 rounded-[14px] text-xs font-bold gap-1.5 border-slate-200"
              title="Copy canonical share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>

            <Button
              onClick={() => setShowBooking(true)}
              className="action-button flex-1 min-h-11 h-auto btn-primary rounded-[14px] text-xs sm:text-sm font-bold shadow-md gap-1.5"
            >
              <span>Book Appointment ({formatInr(item.price)})</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Modal */}
      {showBooking && (
        <TestBookingModal
          testName={item.name}
          price={item.price}
          originalPrice={item.originalPrice}

          isOpen={showBooking}
          onOpenChange={(v) => setShowBooking(v)}
        />
      )}
    </>
  );
}
