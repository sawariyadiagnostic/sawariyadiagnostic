export const siteConfig = {
  name: 'Sawariya Diagnostic Lab',
  shortName: 'Sawariya Diagnostic',
  tagline: 'Detect • Diagnose • Deliver',
  publicBasePath: '/sawariyadiagnostic/',
  legalReviewStatus: 'owner-review-required',
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
    calNamespace: 'sawariya-booking',
    calLink: 'sawariya-lab/30min',
  },
  claims: {
    accreditation: import.meta.env.VITE_ACCREDITATION_CLAIM || 'Accreditation details available on request',
    operatingHours: import.meta.env.VITE_OPERATING_HOURS || 'Hours and service availability subject to confirmation',
    reportTurnaround: import.meta.env.VITE_REPORT_TAT || 'Turnaround depends on the test',
    serviceArea: import.meta.env.VITE_SERVICE_AREA || 'Service area to be confirmed',
  },
} as const;

export function validateSiteConfig(config = siteConfig) {
  const required = [
    config.name,
    config.shortName,
    config.location.address,
    config.location.city,
    config.location.region,
    config.location.postalCode,
    config.contact.phone,
    config.contact.emergencyPhone,
    config.contact.whatsapp,
    config.contact.email,
  ];
  if (required.some((value) => !value.trim())) throw new Error('Required public site configuration is missing');
  if (!config.publicBasePath.startsWith('/') || !config.publicBasePath.endsWith('/')) throw new Error('Invalid public base path');
  if (!config.integrations.calNamespace.trim() || !config.integrations.calLink.trim()) throw new Error('Appointment provider is not configured');
  if (!config.claims.operatingHours.trim()) throw new Error('Operating hours are missing');
  if (config.legalReviewStatus !== 'owner-review-required') throw new Error('Legal review status must remain explicit');
  if (config.location.country !== 'IN') throw new Error('Unsupported site country');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(config.contact.email)) throw new Error('Invalid public contact email');
  if (config.contact.phone.replace(/\D/g, '').length < 10) throw new Error('Invalid public lab phone');
  if (config.contact.emergencyPhone.replace(/\D/g, '').length < 10) throw new Error('Invalid public emergency phone');
  if (config.contact.whatsapp.replace(/\D/g, '').length < 10) throw new Error('Invalid public WhatsApp number');
  return config;
}

validateSiteConfig();

export function telHref(value: string) {
  return value.startsWith('YOUR_') ? undefined : `tel:${value.replace(/\s/g, '')}`;
}

export function whatsappHref(message: string) {
  if (siteConfig.contact.whatsapp.startsWith('YOUR_')) return undefined;
  return `https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
}
