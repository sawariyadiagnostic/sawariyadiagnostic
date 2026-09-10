import { toast } from 'sonner';
import { siteConfig, whatsappHref } from '@/config/site';

/**
 * Dynamic Third-Party Form Submission Service
 * Direct integration with Web3Forms and Formspree (No backend server required for static sites)
 */

export interface FormSubmissionPayload {
  name: string;
  phone: string;
  email?: string;
  address?: string;
  serviceType: string;
  message?: string;
  date?: string;
}

export const FormsService = {
  /**
   * Submit to Web3Forms / Formspree
   */
  submitForm: async (
    payload: FormSubmissionPayload,
    apiKey?: string
  ): Promise<{ success: boolean; message: string }> => {
    // If user provided a real Web3Forms access key
    if (apiKey) {
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `New Diagnostic Booking from ${payload.name} (${payload.phone})`,
            from_name: 'Sawariya Lab Portal',
            ...payload
          })
        });

        const data = await response.json();
        if (data.success) {
          toast.success('Your booking request was received! Confirmation SMS sent.');
          return { success: true, message: 'Request submitted via Web3Forms' };
        }
      } catch (err) {
        console.warn('Web3Forms direct submission fallback', err);
      }
    }

    const whatsappUrl = whatsappHref(
      `New booking request: ${payload.name} | ${payload.phone} | ${payload.serviceType} | ${payload.address || 'Lab walk-in'}`
    );
    const message = whatsappUrl
      ? 'No online form provider is configured. WhatsApp is ready as a manual handoff.'
      : `Request captured locally only. Configure VITE_WEB3FORMS_ACCESS_KEY or ${siteConfig.contact.whatsapp}.`;
    return { success: false, message };
  },

  /**
   * Open direct WhatsApp dispatch with pre-filled booking details
   */
  dispatchToWhatsApp: (payload: FormSubmissionPayload) => {
    const text = `🏥 *NEW LAB APPOINTMENT REQUEST*\n\n*Patient Name:* ${payload.name}\n*Phone:* ${payload.phone}\n*Service/Test:* ${payload.serviceType}\n*Address:* ${payload.address || 'Lab Walk-in'}\n*Date:* ${payload.date || 'Earliest available'}\n\nPlease confirm my sample collection slot!`;
    const url = whatsappHref(text);
    if (url && typeof window !== 'undefined') { window.open(url, '_blank'); }
    return url;
  }
};
