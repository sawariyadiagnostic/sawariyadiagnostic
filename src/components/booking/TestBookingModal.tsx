import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  CreditCard, 
  Home, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  Send,
  IndianRupee,
  Building2
} from 'lucide-react';
import { PaymentsClient } from '@/lib/payments';
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

  const [step, setStep] = useState<'DETAILS' | 'PAYMENT' | 'CONFIRMED'>('DETAILS');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [visitType, setVisitType] = useState<'HOME' | 'LAB'>('HOME');
  const [selectedSlot, setSelectedSlot] = useState('Morning (07:00 AM - 09:30 AM)');
  const [paymentMethod, setPaymentMethod] = useState<'RAZORPAY' | 'STRIPE' | 'CASH'>('RAZORPAY');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  const slots = [
    'Morning (07:00 AM - 09:30 AM)',
    'Mid-day (10:00 AM - 01:00 PM)',
    'Afternoon (02:00 PM - 05:00 PM)',
    'Evening (05:00 PM - 08:00 PM)'
  ];

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !phone) {
      toast.error('Please enter patient name and mobile number');
      return;
    }
    setStep('PAYMENT');
  };

  const handleFinalBooking = async () => {
    setIsProcessing(true);

    const onPaymentComplete = async (txnId: string) => {
      try {
        const booking = await ServerlessDB.createBooking({
          patientName,
          phone,
          address: visitType === 'HOME' ? address || 'Charkhi Dadri' : 'Lab Walk-in (Opp. R.S. Sangwan Hospital)',
          testNames: [testName],
          totalAmount: price,
          paymentMethod: paymentMethod === 'RAZORPAY' ? 'ONLINE_RAZORPAY' : paymentMethod === 'STRIPE' ? 'ONLINE_STRIPE' : 'CASH_ON_COLLECTION',
          paymentStatus: paymentMethod === 'CASH' ? 'PENDING' : 'PAID',
          slotTime: selectedSlot
        });

        // Trigger notification
        FormsService.dispatchToWhatsApp({
          name: patientName,
          phone,
          address: visitType === 'HOME' ? address : 'Lab Walk-in',
          serviceType: `${testName} (₹${price}) - ${paymentMethod}`,
          date: selectedSlot
        });

        setConfirmedBookingId(booking.id);
        setStep('CONFIRMED');
      } catch (err) {
        console.error('Booking failed', err);
        toast.error('Could not complete booking record');
      } finally {
        setIsProcessing(false);
      }
    };

    if (paymentMethod === 'RAZORPAY') {
      PaymentsClient.openRazorpay({
        amount: price,
        testName,
        patientName,
        patientPhone: phone,
        onSuccess: (txnId) => onPaymentComplete(txnId),
        onFailure: (err) => {
          setIsProcessing(false);
          toast.error(err || 'Payment was cancelled');
        }
      });
    } else if (paymentMethod === 'STRIPE') {
      PaymentsClient.redirectToStripe({
        amount: price,
        testName,
        patientName,
        patientPhone: phone,
        onSuccess: (txnId) => onPaymentComplete(txnId)
      });
    } else {
      // Pay on collection
      setTimeout(() => {
        onPaymentComplete('CASH_COLLECTION');
      }, 600);
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

      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_32px_80px_rgba(0,0,0,0.25)] rounded-[32px]">
        {/* Header Strip */}
        <div className="bg-gradient-to-r from-[#072448] via-[#0D5C75] to-[#0A6E5C] p-5 text-white relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200 bg-white/10 px-2 py-0.5 rounded-full inline-block mb-1">
                {isPackage ? 'Health Package Booking' : 'Diagnostic Test Booking'}
              </span>
              <DialogTitle className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
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
            NABL accredited lab • Free home collection • Express WhatsApp report
          </DialogDescription>
        </div>

        {/* STEP 1: PATIENT & VISIT DETAILS */}
        {step === 'DETAILS' && (
          <form onSubmit={handleProceedToPayment} className="p-5 sm:p-6 space-y-4">
            {/* Visit Type Toggle */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-[18px]">
              <button
                type="button"
                onClick={() => setVisitType('HOME')}
                className={`py-2 px-3 rounded-[14px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  visitType === 'HOME'
                    ? 'bg-white text-[#0A6E5C] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home Collection (Free)</span>
              </button>
              <button
                type="button"
                onClick={() => setVisitType('LAB')}
                className={`py-2 px-3 rounded-[14px] text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  visitType === 'LAB'
                    ? 'bg-white text-[#0A6E5C] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Lab Walk-in (24*7)</span>
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
                  className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] rounded-[14px] mt-1 text-sm font-medium"
                />
              </div>

              <div>
                <Label htmlFor="b-phone" className="text-xs font-bold text-slate-700">Mobile Number (for SMS & Reports)</Label>
                <Input
                  id="b-phone"
                  type="tel"
                  placeholder="e.g. 99919 41207"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] rounded-[14px] mt-1 text-sm font-medium"
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
                    className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-[#0A6E5C] rounded-[14px] mt-1 text-sm font-medium"
                  />
                </div>
              )}

              <div>
                <Label htmlFor="b-slot" className="text-xs font-bold text-slate-700">Preferred Time Slot</Label>
                <select
                  id="b-slot"
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="w-full h-11 bg-slate-50 border border-slate-200 focus:border-[#0A6E5C] rounded-[14px] px-3 mt-1 text-xs font-medium text-slate-800"
                >
                  {slots.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 btn-primary rounded-[16px] font-bold text-sm shadow-md mt-2"
            >
              <span>Continue to Payment & Confirmation</span>
            </Button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {step === 'PAYMENT' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-[18px] p-3.5 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Amount Payable:</span>
                <span className="text-[#0A6E5C] font-black text-base">₹{price}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Patient: {patientName}</span>
                <span>Slot: {selectedSlot.split(' ')[0]}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-800">Select Payment Method</Label>
              
              {/* Razorpay Card */}
              <label 
                onClick={() => setPaymentMethod('RAZORPAY')}
                className={`flex items-center justify-between p-3.5 rounded-[16px] border cursor-pointer transition-all ${
                  paymentMethod === 'RAZORPAY' 
                    ? 'border-[#0A6E5C] bg-teal-50/50 ring-1 ring-[#0A6E5C]' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                    UPI
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Razorpay (UPI / Cards / NetBanking)</div>
                    <div className="text-[11px] text-slate-500">Instant confirmation via GPay, PhonePe, Paytm</div>
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === 'RAZORPAY'} readOnly className="text-[#0A6E5C]" />
              </label>

              {/* Stripe Card */}
              <label 
                onClick={() => setPaymentMethod('STRIPE')}
                className={`flex items-center justify-between p-3.5 rounded-[16px] border cursor-pointer transition-all ${
                  paymentMethod === 'STRIPE' 
                    ? 'border-[#0A6E5C] bg-teal-50/50 ring-1 ring-[#0A6E5C]' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Stripe Payment Link</div>
                    <div className="text-[11px] text-slate-500">Global debit/credit card support</div>
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === 'STRIPE'} readOnly className="text-[#0A6E5C]" />
              </label>

              {/* Cash On Collection */}
              <label 
                onClick={() => setPaymentMethod('CASH')}
                className={`flex items-center justify-between p-3.5 rounded-[16px] border cursor-pointer transition-all ${
                  paymentMethod === 'CASH' 
                    ? 'border-[#0A6E5C] bg-teal-50/50 ring-1 ring-[#0A6E5C]' 
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-800">
                    <IndianRupee className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-slate-900">Pay on Sample Collection</div>
                    <div className="text-[11px] text-slate-500">Pay via Cash / QR code to phlebotomist at doorstep</div>
                  </div>
                </div>
                <input type="radio" checked={paymentMethod === 'CASH'} readOnly className="text-[#0A6E5C]" />
              </label>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('DETAILS')}
                className="h-12 rounded-[16px] text-xs font-bold"
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
                    <Sparkles className="w-4 h-4 animate-spin text-[#FDE047]" /> Authorizing...
                  </span>
                ) : (
                  <span>
                    {paymentMethod === 'CASH' ? `Confirm Booking (₹${price})` : `Pay ₹${price} Now`}
                  </span>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: BOOKING CONFIRMED */}
        {step === 'CONFIRMED' && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-200 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900">Booking Successfully Placed!</h3>
              <p className="text-xs text-slate-500">
                Booking ID: <span className="font-mono font-bold text-[#0A6E5C]">{confirmedBookingId}</span>
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-[20px] p-4 text-left space-y-2 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{patientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Test / Package:</span>
                <span className="font-bold text-slate-900">{testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Time Slot:</span>
                <span className="font-semibold text-slate-900">{selectedSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Status:</span>
                <span className="font-bold text-emerald-700">
                  {paymentMethod === 'CASH' ? 'Pay on Collection (₹' + price + ')' : 'PAID ONLINE (₹' + price + ')'}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Our Phlebotomy desk has received your order. We have sent the confirmation summary to your WhatsApp & Mobile SMS.
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
