import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  TestTube, 
  Clock, 
  ShieldCheck, 
  Home, 
  Check, 
  Sparkles, 
  Calendar, 
  HelpCircle, 
  Share2, 
  Code,
  ArrowRight,
  Stethoscope
} from 'lucide-react';
import type { MedicalTest, HealthPackage } from '@/data/mockTests';
import { SEOManager } from '@/lib/seo-ssg';
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
  const [showSchemaPreview, setShowSchemaPreview] = useState(false);

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

  const schemaJson = isPackage 
    ? SEOManager.generatePackageSchema(item as HealthPackage)
    : SEOManager.generateTestSchema(item as MedicalTest);

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
          <div className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] p-6 text-white relative overflow-hidden flex-shrink-0">
            <div className="flex items-start justify-between gap-4 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold text-teal-200 mb-2">
                  <TestTube className="w-3.5 h-3.5" />
                  <span>{isPackage ? 'PREVENTIVE HEALTH PACKAGE' : `${(item as MedicalTest).category?.toUpperCase()} PATHOLOGY`}</span>
                </div>
                <DialogTitle className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {item.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-teal-100/90 mt-1">
                  NABL Certified • ICMR Approved Laboratory Protocols
                </DialogDescription>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-2xl sm:text-3xl font-black text-white">₹{item.price}</div>
                {item.originalPrice && (
                  <div className="text-xs text-teal-200 line-through">₹{item.originalPrice}</div>
                )}
                {discountPercent && (
                  <span className="text-[10px] font-bold bg-[#FDE047] text-[#072448] px-2 py-0.5 rounded-full inline-block mt-1">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-medium">Turnaround Time:</span>
                <span className="font-bold text-[#0A6E5C] flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isPackage ? '12-24 hours' : (item as MedicalTest).turnaroundTime}</span>
                </span>
              </div>

              <div className="bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs">
                <span className="text-[10px] text-slate-400 block font-medium">Sample Collection:</span>
                <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Home className="w-3.5 h-3.5 text-[#00A896]" />
                  <span>Free Doorstep</span>
                </span>
              </div>

              <div className="bg-white p-3 rounded-[16px] border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-medium">Fasting Advice:</span>
                <span className="font-bold text-slate-800 mt-0.5 block">
                  {item.name.toLowerCase().includes('lipid') || item.name.toLowerCase().includes('sugar') || item.name.toLowerCase().includes('glucose')
                    ? '10-12 Hrs Fasting'
                    : 'No Fasting Needed'}
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
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium">{param}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schema.org SSG Preview Toggle */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowSchemaPreview(!showSchemaPreview)}
                className="text-[11px] font-bold text-[#0A6E5C] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Code className="w-3 h-3" />
                <span>{showSchemaPreview ? 'Hide' : 'View'} Schema.org Structured Data & SEO Preview</span>
              </button>

              {showSchemaPreview && (
                <div className="mt-2 bg-slate-900 text-slate-200 p-3.5 rounded-[16px] text-[10px] font-mono overflow-x-auto max-h-[160px]">
                  <pre>{JSON.stringify(schemaJson, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="p-4 bg-white border-t border-slate-200 flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              onClick={handleShare}
              className="h-11 px-3.5 rounded-[14px] text-xs font-bold gap-1.5 border-slate-200"
              title="Copy canonical share link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </Button>

            <Button
              onClick={() => setShowBooking(true)}
              className="flex-1 h-11 btn-primary rounded-[14px] text-xs sm:text-sm font-bold shadow-md gap-1.5"
            >
              <span>Book & Pay Online (₹{item.price})</span>
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
