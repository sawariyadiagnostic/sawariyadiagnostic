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
import type { MedicalTest, HealthPackage } from '@/data/mockTests';
import { SEOHead } from '../seo/SEOHead';
import { TestBookingModal } from '../booking/TestBookingModal';
import { toast } from 'sonner';

interface TestDetailModalProps {
  item: MedicalTest | HealthPackage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function TestDetailModal({ item, isOpen, onClose }: TestDetailModalProps) {
  const [showBooking, setShowBooking] = useState(false);

  if (!item) return null;

  const isPackage = 'testsIncluded' in item;
  const discountPercent = item.originalPrice 
    ? Math.round((1 - item.price / item.originalPrice) * 100) 
    : null;

  const handleShare = () => {
    const url = `${window.location.origin}/#/${isPackage ? 'package' : 'test'}/${item.id}`;
    navigator.clipboard.writeText(url);
    toast.success('Canonical link copied to clipboard!');
  };

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': isPackage ? 'Product' : 'MedicalTest',
    name: item.name,
    description: item.description,
    offers: { '@type': 'Offer', price: item.price, priceCurrency: 'INR' },
  };

  return (
    <>
      {isOpen && (
        <SEOHead
          title={`${item.name} - Price ₹${item.price} | Sawariya Diagnostic`}
          description={item.description || `Book ${item.name} test at Sawariya Diagnostic Lab with free home sample collection.`}
          canonicalUrl={`https://sawariyadiagnostic.github.io/sawariyadiagnostic/${isPackage ? 'package' : 'test'}/${item.id}.html`}
          jsonLd={schemaJson}
        />
      )}
      <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
        <DialogContent className="sm:max-w-[620px] max-h-[90vh] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px] flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#102A43] via-[#155E9A] to-[#155E9A] p-6 text-white relative overflow-hidden flex-shrink-0">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold text-blue-200 mb-2">
                  <TestTube className="w-3.5 h-3.5" />
                  <span>{isPackage ? 'PREVENTIVE HEALTH PACKAGE' : `${(item as MedicalTest).category?.toUpperCase()} PATHOLOGY`}</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {item.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-blue-100/90 mt-1">
                  Documented laboratory protocols • Confirm current scope with the lab
                </DialogDescription>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl sm:text-3xl font-black text-white">₹{item.price}</div>
                {item.originalPrice && (
                  <div className="text-xs text-blue-200 line-through">₹{item.originalPrice}</div>
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
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-50">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">

              <div className="bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-medium">Sample Collection:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Home className="w-3.5 h-3.5 text-[#C62828]" />
                  <span>Doorstep collection • Confirmation required</span>
                </span>
              </div>

              <div className="bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-medium">Preparation:</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  Confirm current preparation with the lab
                </span>
              </div>
            </div>

            {/* Parameters or Included Tests */}
            <div className="bg-white p-4 rounded-[20px] border border-slate-200 shadow-2xs space-y-2">
              <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider block">
                {isPackage ? `Tests Included in Package (${(item as HealthPackage).testsIncluded.length})` : 'Diagnostic Parameters Measured:'}
              </span>
              <div className="grid sm:grid-cols-2 gap-2">
                {(isPackage ? (item as HealthPackage).testsIncluded : ((item as MedicalTest).parameters || [(item as MedicalTest).name])).map((param, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-[12px] border border-slate-100">
                    <Check className="w-3.5 h-3.5 text-green-700 flex-shrink-0" />
                    <span className="font-medium">{param}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Footer CTAs */}
          <div className="p-4 bg-white border-t border-slate-200 flex gap-2 flex-shrink-0">
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
              <span>Book Appointment (₹{item.price})</span>
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
          isPackage={isPackage}
          isOpen={showBooking}
          onOpenChange={(v) => setShowBooking(v)}
        />
      )}
    </>
  );
}
