import { toast } from 'sonner';

/**
 * Third-Party Payments Integration
 * Supports Razorpay Standard Checkout modal, UPI QR codes, & Stripe Payment Links
 */

export interface PaymentOptions {
  amount: number; // in INR
  testName: string;
  patientName: string;
  patientPhone: string;
  patientEmail?: string;
  onSuccess: (transactionId: string) => void;
  onFailure?: (error: string) => void;
}

interface RazorpayResponse {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface CustomWindow extends Window {
  Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
}

export const PaymentsClient = {
  /**
   * Initiate Razorpay Checkout
   */
  openRazorpay: (options: PaymentOptions) => {
    options.onFailure?.('Online payment is not configured yet. Please use pay-on-collection or contact the lab.');
    toast.error('Online payment is not configured. No payment was taken.');
  },

  /**
   * Stripe Payment Link Redirection
   */
  redirectToStripe: (options: PaymentOptions) => {
    options.onFailure?.('Stripe is not configured yet.');
    toast.error('Online payment is not configured. No payment was taken.');
  },

  /**
   * Direct UPI App Intent / QR Payload Generator
   */
  generateUPIUrl: (amount: number, testName: string) => {
    const upiId = import.meta.env.VITE_LAB_UPI_ID || '';
    if (!upiId) return ''; 
    const payeeName = 'Sawariya Diagnostic';
    const note = encodeURIComponent(`Test Booking: ${testName.slice(0, 25)}`);
    return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tn=${note}`;
  }
};
