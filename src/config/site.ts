export const siteConfig = {
  name: 'Sawariya Diagnostic Lab',
  shortName: 'Sawariya Diagnostic',
  tagline: 'Detect • Diagnose • Deliver',
  location: {
    address: 'Opposite R.S. Sangwan Hospital, Loharu Road, Charkhi Dadri, Haryana 127306',
    city: 'Charkhi Dadri',
    region: 'Haryana',
    postalCode: '127306',
    country: 'IN',
    mapsUrl: 'https://maps.app.goo.gl/Kcxzwy1dq65FB6g8A',
  },
  contact: {
    phone: import.meta.env.VITE_LAB_PHONE || '+91 99919 41207',
    emergencyPhone: import.meta.env.VITE_EMERGENCY_PHONE || '+91 70152 90782',
    whatsapp: import.meta.env.VITE_LAB_WHATSAPP || '919991941207',
    email: import.meta.env.VITE_LAB_EMAIL || 'sawariyadiagnosticckd11@gmail.com',
  },
  brand: { red: '#C62828', blue: '#155E9A', brown: '#7A4B2A', navy: '#102A43', cream: '#FFF9F3' },
  integrations: {
    bookingUrl: import.meta.env.VITE_BOOKING_URL || '',
    web3FormsAccessKey: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '',
  },
  claims: {
    accreditation: import.meta.env.VITE_ACCREDITATION_CLAIM || 'Accreditation details available on request',
    operatingHours: import.meta.env.VITE_OPERATING_HOURS || 'Open 24 hours',
    reportTurnaround: import.meta.env.VITE_REPORT_TAT || 'Turnaround depends on the test',
    serviceArea: import.meta.env.VITE_SERVICE_AREA || 'Service area to be confirmed',
  },
} as const;

export function telHref(value: string) {
  return value.startsWith('YOUR_') ? undefined : `tel:${value.replace(/\s/g, '')}`;
}

export function whatsappHref(message: string) {
  if (siteConfig.contact.whatsapp.startsWith('YOUR_')) return undefined;
  return `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
