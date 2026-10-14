export interface CartItem {
  code: string;       // e.g., "SDL-PKG-GOLD84" or "SDL-CBC05"
  name: string;       // e.g., "Sawariya Gold Full Body Package (84 Parameters)"
  price: number;      // Official rate in INR
  fastingRequired: boolean;
}

export interface PatientBookingDetails {
  patientName: string;
  age?: string;
  collectionType: 'Home Collection' | 'Lab Walk-In (Loharu Road)';
  preferredTimeSlot?: string;
  address?: string;
}

// Deterministic 4-char checksum so reception immediately spots edited prices in WhatsApp
export function generateCartChecksum(items: CartItem[], total: number): string {
  const canonicalPayload = items
    .map((i) => `${i.code}:${i.price}`)
    .sort()
    .join('|') + `|TOTAL:${total}|SALT:SAWARIYA2026`;

  let hash = 2166136261;
  for (let i = 0; i < canonicalPayload.length; i++) {
    hash ^= canonicalPayload.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0).toString(36).toUpperCase().slice(0, 4).padStart(4, '0');
}

export function buildWhatsAppBookingUrl(
  items: CartItem[],
  patient: PatientBookingDetails,
  labPhone = '919991941207'
): string {
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
  const needsFasting = items.some((item) => item.fastingRequired);
  const checksum = generateCartChecksum(items, totalAmount);

  const itemLines = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.name}* [${item.code}] — ₹${item.price}${
          item.fastingRequired ? ' _(Fasting)_' : ''
        }`
    )
    .join('\n');

  const message = [
    `*SAWARIYA DIAGNOSTIC LAB — TEST BOOKING*`,
    `----------------------------------------`,
    `*Patient:* ${patient.patientName}${patient.age ? ` (${patient.age} Yrs)` : ''}`,
    `*Mode:* ${patient.collectionType}`,
    patient.preferredTimeSlot ? `*Preferred Slot:* ${patient.preferredTimeSlot}` : null,
    patient.address ? `*Location:* ${patient.address}` : null,
    ``,
    `*Selected Tests / Packages (${items.length}):*`,
    itemLines,
    `----------------------------------------`,
    `*Estimated Total:* *₹${totalAmount}*`,
    `*Prep Note:* ${
      needsFasting
        ? '8-10 Hours Fasting Recommended (Water allowed)'
        : 'No Fasting Required'
    }`,
    `*Security Hash:* [VERIFY: SDL-${checksum}]`,
    ``,
    `_Sent via Sawariya Lab Online Booking Desk_`
  ]
    .filter(Boolean)
    .join('\n');

  return `https://wa.me/${labPhone}?text=${encodeURIComponent(message)}`;
}
