import { describe, expect, it } from 'vitest';
import {
  generateCartChecksum,
  buildWhatsAppBookingUrl,
  type CartItem,
  type PatientBookingDetails,
} from '../../src/utils/whatsappCart';

describe('whatsappCart utility', () => {
  const sampleItems: CartItem[] = [
    {
      code: 'SDL-CBC05',
      name: 'Complete Blood Count (CBC)',
      price: 250,
      fastingRequired: false,
    },
    {
      code: 'SDL-LIPID',
      name: 'Lipid Profile',
      price: 600,
      fastingRequired: true,
    },
  ];

  const samplePatient: PatientBookingDetails = {
    patientName: 'Test Patient',
    age: '35',
    collectionType: 'Home Collection',
    preferredTimeSlot: '07:30 AM',
    address: 'Opp. R.S. Sangwan Hospital, Charkhi Dadri',
  };

  it('generates a deterministic 4-character checksum', () => {
    const hash1 = generateCartChecksum(sampleItems, 850);
    const hash2 = generateCartChecksum(sampleItems, 850);
    expect(hash1).toBe(hash2);
    expect(hash1).toHaveLength(4);
    expect(hash1).toMatch(/^[0-9A-Z]{4}$/);
  });

  it('changes checksum if item prices or codes are altered', () => {
    const hashOriginal = generateCartChecksum(sampleItems, 850);
    const tamperedItems: CartItem[] = [
      { ...sampleItems[0], price: 150 }, // altered price
      sampleItems[1],
    ];
    const hashTampered = generateCartChecksum(tamperedItems, 750);
    expect(hashOriginal).not.toBe(hashTampered);
  });

  it('builds a proper WhatsApp booking URL with prep note and verification hash', () => {
    const url = buildWhatsAppBookingUrl(sampleItems, samplePatient);
    expect(url).toContain('https://wa.me/919991941207?text=');
    const decodedMessage = decodeURIComponent(url.replace('https://wa.me/919991941207?text=', ''));

    expect(decodedMessage).toContain('SAWARIYA DIAGNOSTIC LAB — TEST BOOKING');
    expect(decodedMessage).toContain('Test Patient (35 Yrs)');
    expect(decodedMessage).toContain('*Mode:* Home Collection');
    expect(decodedMessage).toContain('Complete Blood Count (CBC)');
    expect(decodedMessage).toContain('Lipid Profile');
    expect(decodedMessage).toContain('8-10 Hours Fasting Recommended');
    expect(decodedMessage).toContain('[VERIFY: SDL-');
  });

  it('handles non-fasting orders correctly in prep note', () => {
    const nonFastingItems: CartItem[] = [
      {
        code: 'SDL-CBC05',
        name: 'Complete Blood Count (CBC)',
        price: 250,
        fastingRequired: false,
      },
    ];
    const url = buildWhatsAppBookingUrl(nonFastingItems, {
      patientName: 'Jane Doe',
      collectionType: 'Lab Walk-In (Loharu Road)',
    });
    const decodedMessage = decodeURIComponent(url.replace('https://wa.me/919991941207?text=', ''));
    expect(decodedMessage).toContain('No Fasting Required');
  });
});
