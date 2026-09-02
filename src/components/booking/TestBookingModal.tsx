import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Home, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  IndianRupee,
  Building2,
  QrCode,
  Banknote
} from 'lucide-react';
import { ServerlessDB } from '@/lib/serverless-db';
import { FormsService } from '@/lib/forms';
import { toast } from 'sonner';

interface TestBookingModalProps {
  testName: string;
  price: number;
  originalPrice?: number;
  isPackage?: boolean;
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function TestBookingModal({
  testName,
  price,
  originalPrice,
  isPackage,
  trigger,
  isOpen: externalOpen,
  onOpenChange: externalOnOpenChange
}: TestBookingModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const [step, setStep] = useState<'DETAILS' | 'REVIEW' | 'CONFIRMED'>('DETAILS');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [visitType, setVisitType] = useState<'HOME' | 'LAB'>('HOME');
  const [selectedSlot, setSelectedSlot] = useState('Morning (07:00 AM - 09:30 AM)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  const slots = [
    'Morning (07:00 AM - 09:30 AM)',
    'Mid-day (10:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 05:00 PM)',
    'Evening (05:00 PM - 08:00 PM)'
  ];

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (!patientName.trim()) {
      toast.error('Please enter patient name');
      return;
    }
    if (!cleanPhone || cleanPhone.length < 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    if (visitType === 'HOME' && !address.trim()) {
      toast.error('Please enter your home address in Charkhi Dadri');
      return;
    }
    setStep('REVIEW');
  };

  const handleQuickWhatsAppBook = () => {
    const text = `Hi Sawariya Diagnostic, I would like to book the test "${testName}" (₹${price}) with doorstep collection in Charkhi Dadri.`;
    window.open(`https://wa.me/919991941207?text=${encodeURIComponent(text)}`, '_blank');
    setOpen(false);
  };

  const handleFinalBooking = async () => {
    setIsProcessing(true);

    try {
      const booking = await ServerlessDB.createBooking({
        patientName: patientName.trim(),
        phone: phone.trim(),
        address: visitType === 'HOME' ? address.trim() || 'Charkhi Dadri' : 'Lab Walk-in (Opp. R.S. Sangwan Hospital)',
        testNames: [testName],
        totalAmount: price,
        paymentMethod: 'CASH_ON_COLLECTION',
        paymentStatus: 'PENDING',
        slotTime: selectedSlot
      });

      // Trigger notification
      FormsService.dispatchToWhatsApp({
        name: patientName,
        phone,
        address: visitType === 'HOME' ? address : 'Lab Walk-in',
        serviceType: `${testName} (₹${price}) - Pay on Sample Collection`,
        date: selectedSlot
      });

      setConfirmedBookingId(booking.id);
      setStep('CONFIRMED');
      toast.success('Appointment booked successfully!');
    } catch (err) {
      console.error('Booking failed', err);
      toast.error('Could not complete booking record. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setStep('DETAILS');
    setPatientName('');
    setPhone('');
    setAddress('');
    setVisitType('HOME');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) resetModal(); else setOpen(val); }}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="w-[calc(100vw-32px)] sm:max-w-[480px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[28px] sm:rounded-[32px] mx-auto">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] p-4 sm:p-5 text-white relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10 gap-3">
            <div className="min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                {isPackage ? 'Health Package Booking' : 'Diagnostic Test Booking'}
              </span>
              <DialogTitle className="text-base sm:text-xl font-bold text-white tracking-tight leading-snug truncate">
                {testName}
              </DialogTitle>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xl sm:text-2xl font-black text-white">₹{price}</span>
              {originalPrice && (
                <span className="text-xs text-teal-200 line-through block font-normal">₹{originalPrice}</span>
              )}
            </div>
          </div>
          <DialogDescription className="text-xs text-teal-100/80 mt-1 relative z-10">
            NABL accredited lab • Free doorstep collection • Express digital report
          </DialogDescription>
        </div>

        {/* STEP 1: PATIENT & VISIT DETAILS */}
        {step === 'DETAILS' && (
          <form onSubmit={handleProceedToReview} className="p-4 sm:p-6 space-y-4">
            {/* 10-Second WhatsApp Fast Track Option */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-[18px] p-3 flex items-center justify-between gap-2.5">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Fast Booking Option
                </span>
                <p className="text-[10.5px] text-emerald-800 truncate">Book directly with our coordinator in 10 seconds</p>
              </div>
              <button
                type="button"
                onClick={handleQuickWhatsAppBook}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Visit Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-[18px]">
              <button
                type="button"
                onClick={() => setVisitType('HOME')}
                className={`py-2 px-2.5 rounded-[14px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  visitType === 'HOME'
                    ? 'bg-white text-[#0A6E5C] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Home Collection (Free)</span>
              </button>
              <button
                type="button"
                onClick={() => setVisitType('LAB')}
                className={`py-2 px-2.5 rounded-[14px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  visitType === 'LAB'
                    ? 'bg-white text-[#0A6E5C] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">Lab Walk-in (24*7)</span>
              </button>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="b-patient-name" className="text-xs font-bold text-slate-700">Patient Full Name</Label>
                <Input
                  id="b-patient-name"
                  placeholder="e.g. Ramesh Kumar"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  required
                  className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] rounded-[14px] mt-1 text-sm font-medium text-slate-900"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="b-phone" className="text-xs font-bold text-slate-700">Mobile Number (10 Digits)</Label>
                  <span className="text-[10px] text-slate-400">For SMS & Reports</span>
                </div>
                <Input
                  id="b-phone"
                  type="tel"
                  maxLength={10}
                  placeholder="e.g. 9991941207"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  required
                  className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] rounded-[14px] mt-1 text-sm font-medium text-slate-900 font-mono"
                />
              </div>

              {visitType === 'HOME' && (
                <div>
                  <Label htmlFor="b-address" className="text-xs font-bold text-slate-700">Home Address in Charkhi Dadri</Label>
                  <Input
                    id="b-address"
                    placeholder="e.g. Loharu Road / Model Town / Sector 8"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] rounded-[14px] mt-1 text-sm font-medium text-slate-900"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="b-slot" className="text-xs font-bold text-slate-700">Preferred Time Slot</Label>
                <select
                  id="b-slot"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-[#0A6E5C] rounded-[14px] px-3 mt-1 text-xs font-medium text-slate-900"
                >
                  {slots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 btn-primary rounded-[16px] font-bold text-sm shadow-md mt-2 cursor-pointer"
            >
              <span>Continue to Confirmation (Pay on Collection)</span>
            </Button>
          </form>
        )}

        {/* STEP 2: REVIEW & PAY ON SAMPLE COLLECTION */}
        {step === 'REVIEW' && (
          <div className="p-4 sm:p-6 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-[18px] p-3.5 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount Payable:</span>
                <span className="text-[#0A6E5C] font-black text-base">₹{price}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Patient: {patientName}</span>
                <span>Slot: {selectedSlot.split(' ')[0]}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Mode: {visitType === 'HOME' ? 'Home Doorstep Sample' : 'Lab Walk-in'}</span>
                <span>Advance: ₹0 (No Prepayment)</span>
              </div>
            </div>

            {/* Exclusive Payment Method Card: Pay on Sample Collection */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-800">Payment Mode</Label>
              
              <div className="p-4 rounded-[18px] border-2 border-[#0A6E5C] bg-teal-50/60 ring-2 ring-[#00A896]/20 transition-all">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0A6E5C] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">Pay on Sample Collection</span>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-300">
                        Default
                      </span>
                    </div>
                    <p className="text-[11.5px] text-slate-600 leading-relaxed font-normal">
                      Pay <strong className="text-slate-900 font-bold">₹{price}</strong> via <strong className="text-slate-800">Cash</strong> or <strong className="text-slate-800">UPI QR Code</strong> (GPay, PhonePe, Paytm) directly to the certified phlebotomist when your sample is collected.
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] text-[#0A6E5C] font-semibold pt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Zero advance fee • 100% Secure & Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('DETAILS')}
                className="h-12 rounded-[16px] text-xs font-bold px-4"
              >
                Back
              </Button>
              <Button
                type="button"
                onClick={handleFinalBooking}
                disabled={isProcessing}
                className="flex-1 h-12 btn-primary rounded-[16px] text-xs sm:text-sm font-bold shadow-md"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-[#FDE047]" /> Confirming...
                  </span>
                ) : (
                  <span>Confirm Booking (Pay ₹{price} on Collection)</span>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMED */}
        {step === 'CONFIRMED' && (
          <div className="p-5 sm:p-6 text-center space-y-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">Booking Confirmed!</h3>
              <p className="text-xs text-slate-500">
                Booking ID: <span className="font-mono font-bold text-[#0A6E5C]">{confirmedBookingId}</span>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-3.5 sm:p-4 text-left space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Test / Package:</span>
                <span className="font-bold text-slate-900 truncate max-w-[200px]">{testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Slot:</span>
                <span className="font-semibold text-slate-900">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-emerald-700">
                  Pay ₹{price} on Sample Collection
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Our Phlebotomy desk has scheduled your visit. A confirmation summary has been dispatched to your WhatsApp number.
            </p>

            <Button
              onClick={resetModal}
              className="w-full h-11 btn-primary rounded-[16px] text-xs font-bold"
            >
              Done & Return to Test Catalog
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
